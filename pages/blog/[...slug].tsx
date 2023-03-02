import { MDXComponents } from "components/mdx-components";
import { allBlogs } from "contentlayer/generated";
import ComponentDocsLayout from "layouts/mdx";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { getDocDoc } from "utils/contentlayer-utils";
import { uniq } from "utils/js-utils";

export default function Page({
  doc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc?.body?.code);
  return (
    <ComponentDocsLayout frontmatter={doc?.frontmatter}>
      <Component components={MDXComponents} />
    </ComponentDocsLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = uniq(allBlogs.flatMap((doc) => [doc.slug]));
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      doc: getDocDoc(ctx.params.slug as string),
    },
  };
};
