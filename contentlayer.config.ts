import { Octokit } from "@octokit/rest";
import { exec } from "child_process";
import {
  ComputedFields,
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import { format, fromUnixTime } from "date-fns";
import { join } from "path";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import util from "util";
import siteConfig from "./configs/site-config";
import { rehypeMdxCodeMeta } from "./src/utils/rehype-code-meta";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const _exec = util.promisify(exec);

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
};

const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    login: {
      type: "string",
    },
    avatarUrl: {
      type: "string",
    },
    githubUrl: {
      type: "string",
    },
    websiteUrl: {
      type: "string",
    },
    bio: {
      type: "string",
    },
    name: {
      type: "string",
    },
    twitterUsername: {
      type: "string",
    },
  },
}));

const getGithubUserData = async (username: string | undefined) => {
  try {
    const { data } = await octokit.users.getByUsername({
      username,
      headers: {},
    });

    const {
      avatar_url: avatarUrl,
      html_url: githubUrl,
      blog: websiteUrl,
      bio,
      name,
      twitter_username: twitterUsername,
    } = data;

    return {
      login: username,
      avatarUrl,
      githubUrl,
      websiteUrl,
      bio,
      name,
      twitterUsername,
    };
  } catch (err) {
    console.error(err);
  }
};

const getTimestampAndAuthor = (str) => {
  if (!str) return null;

  const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/;

  const temp = str.match(GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX);
  if (!temp || temp.length < 3) return null;

  const [, timestamp, author] = temp;
  const dateStr = fromUnixTime(+timestamp);

  return {
    date: format(dateStr, "MMMM dd, yyyy"),
    author,
  };
};

const getLastEdited = async (filePath) => {
  try {
    const { stdout } = await _exec(
      `git log -1 --format="%ct, %an" --follow "${filePath}"`
    );

    return getTimestampAndAuthor(stdout.trim());
  } catch (er) {
    console.error(er);
  }
};

const getDateCreated = async (filePath) => {
  try {
    const { stdout } = await _exec(
      `git log --reverse --format="%ct, %an" --follow ${filePath} | head -n 1`
    );

    return getTimestampAndAuthor(stdout.trim());
  } catch (er) {
    console.error(er);
  }
};

const calcReadTime = (content) => {
  const wordsPerMinute = 275;
  const words = content.split(" ");
  const textLength = words.length || 1;

  return Math.ceil(textLength / wordsPerMinute);
};

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string" },
    description: { type: "string" },
    imageUrl: { type: "string" },
    tags: {
      type: "list",
      of: { type: "string" },
    },
    author: {
      type: "string",
    },
    datePublished: {
      type: "string",
    },
  },
  computedFields: {
    ...computedFields,
    frontmatter: {
      type: "json",
      resolve: async (doc) => {
        const filePath = join(
          process.cwd(),
          "pages",
          doc._raw.sourceFilePath
        ).replace("/pages/", "/content/");
        const lastEdited = (await getLastEdited(filePath)) || null;
        const dateCreated = (await getDateCreated(filePath)) || null;

        return {
          title: doc.title,
          description: doc.description,
          slug: `/${doc._raw.flattenedPath}`,
          editUrl: `${siteConfig.repo.editUrl}/${doc._id}`,
          imageUrl: doc.imageUrl,
          tags: doc.tags,
          author: doc.author,
          auth: await getGithubUserData(doc.author),
          lastEdited,
          dateCreated,
          readTime: calcReadTime(doc.body.raw),
          datePublished: doc.datePublished,
        };
      },
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    rehypePlugins: [rehypeMdxCodeMeta],
    remarkPlugins: [remarkSlug, remarkEmoji, remarkGfm],
  },
});

export default contentLayerConfig;
