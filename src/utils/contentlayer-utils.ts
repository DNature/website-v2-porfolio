import { allBlogs, Blog } from "contentlayer/generated";
import { MixedArray, toArray, uniq } from "./js-utils";

export function getDocByType(id: string) {
  return allBlogs.filter((doc) => doc.slug.startsWith(`/blog/${id}`));
}

export const getDocDoc = (slug: MixedArray): Blog | undefined => {
  const params = toArray(slug);
  const _slug = params.join("/");
  const doc = allBlogs.find(
    (doc) => doc.slug.endsWith(_slug) || doc.slug.endsWith(`${_slug}/usage`)
  ) as Blog | undefined;

  return doc;
};

export type MDXData = ReturnType<typeof getComponentMDXData>;

export function getComponentMDXData(slug: MixedArray) {
  const params = toArray(slug);
  const _slug = params.join("/");

  const getSlug = (id: string) => {
    const res = uniq([...params, id]);
    if (res.length > 3) res.splice(2, 1);
    return res;
  };

  const usageSlug = getSlug("usage");

  return {
    id: "usage",
    match: _slug.endsWith("/usage") || params.length === 2,
    href: { query: { slug: usageSlug.slice(1) } },
    label: "Usage",
    doc: getDocDoc(usageSlug),
  };
}
