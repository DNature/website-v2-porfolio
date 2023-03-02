import { allBlogs, Blog } from "contentlayer/generated";

export function getDocByType(id: string) {
  return allBlogs.filter((doc) => doc.slug.startsWith(`/blog/${id}`));
}

export const getDocDoc = (slug: string): Blog | undefined => {
  const doc = allBlogs.find((doc) => doc.slug.endsWith(slug)) as
    | Blog
    | undefined;

  return doc;
};
