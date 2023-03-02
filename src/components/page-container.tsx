import { Badge, Box, LazyImage } from "@nature-ui/core";
import { useRouter } from "next/router";
import * as React from "react";

import { EditPageLink } from "components/edit-page-button";
import SEO from "components/seo";
import { Frontmatter } from "src/types/frontmatter";
import Comments from "./comments";
import Footer from "./footer";
import Header from "./header";
import PageTransition from "./page-transition";

function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName("h1"));
      heading?.focus();
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router.events]);
}

interface PageContainerProps {
  frontmatter: Frontmatter;
  children: React.ReactNode;
}

function PageContainer(props: PageContainerProps) {
  const { frontmatter, children } = props;
  useHeadingFocusOnRouteChange();

  const {
    title,
    description,
    editUrl,
    auth,
    lastEdited,
    published,
    readTime,
    imageUrl,
  } = frontmatter;

  let fallbackSrc: any = imageUrl.split(".");

  if (fallbackSrc[fallbackSrc.length - 1] === "gif") {
    fallbackSrc = fallbackSrc.join(".").replace(/\/c_scale.*?\//gis, "/w_50/");
  } else {
    fallbackSrc = imageUrl.replace(/\/c_scale.*?\//gis, "/c_scale,w_0.01/");
  }

  return (
    <>
      <SEO title={title} description={description} />
      <Header />
      <Box as="main" className="h-full">
        <Box centered className="flex max-w-screen-lg mx-auto">
          <Box className="flex-1 w-screen">
            <Box
              id="content"
              className="pt-3 px-5 mt:10 md:mt-16 mx-auto max-w-3xl"
              css={{
                minHeight: "76vh",
              }}
            >
              <PageTransition>
                <h1 className="outline-none text-4xl lg:text-6xl font-bold mb-1">
                  {title}
                </h1>
                {auth && (
                  <>
                    <hr className="my-4 border-dark-600 opacity-30" />

                    <Box className="pl-3 flex items-center">
                      <LazyImage
                        src={auth.avatarUrl}
                        css={{
                          height: 50,
                          width: 50,
                        }}
                        fallbackSrc={fallbackSrc}
                        className="rounded-full object-cover mr-3"
                        alt={title}
                      />
                      <Box className="col-span-6">
                        <p className="opacity-80">
                          <a
                            href={auth.websiteUrl + "/about"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {lastEdited.author}
                          </a>
                          <Badge
                            as="span"
                            className="text-sm font-normal ml-4"
                            color="primary-700"
                            variant="solid"
                          >
                            {readTime} min read
                          </Badge>
                        </p>
                        {published && (
                          <>
                            <p className="opacity-60">
                              Published on {published.date}.
                            </p>
                            {lastEdited && (
                              <p className="opacity-60">
                                Last edited: {lastEdited.date} by:{" "}
                                {lastEdited.author}
                              </p>
                            )}
                          </>
                        )}
                      </Box>
                    </Box>

                    <hr className="my-4 border-dark-600 opacity-30" />
                  </>
                )}
                <div className="mt-12 grid">
                  <LazyImage
                    src={imageUrl}
                    fallbackSrc={fallbackSrc}
                    className="w-full h-full object-cover"
                    alt={title}
                  />
                </div>
                {children}
              </PageTransition>
              <Box className="my-14">
                {editUrl && <EditPageLink href={editUrl} />}
              </Box>
              <Comments className="relative z-10 my-36" />
            </Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PageContainer;
