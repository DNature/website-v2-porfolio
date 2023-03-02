import Button from "@custom/button";
import { Box, Container, LazyImage, Stack } from "@nature-ui/core";
import { BlurLeft, BlurRight } from "components/BlurEffect";

import { Search } from "components/algolia-search";
import { HomePostCards } from "components/cards/home-post-cards";
import { HomeWorksCard } from "components/cards/works-card";
import popular from "configs/popular-posts.json";
import works from "configs/works.json";
import { allBlogs } from "contentlayer/generated";
import MainLayout from "layouts/main";
import Link from "next/link";

const Index = () => {
  return (
    <MainLayout>
      <main className="grid place-items-center md:pb-32 pb-12 px-4 md:px-0 relative mb-60">
        <BlurLeft className="absolute bottom-0 -mb-32 left-0 lg:left-64 xl:left-80 2xl:left-96" />
        <BlurRight className="absolute bottom-0 -mb-32 right-0 lg:right-64 xl:right-80 2xl:right-96" />
        <Container size="sm" className="z-10 text-center mt-32 md:mt-48 mb-16">
          <h1 className="mb-3">
            Hi 👋, I’m{" "}
            <span className="text-gradient shadow-text">Divine Hycenth.</span>
          </h1>
          <h2>
            I’m a software engineer, UI/UX Designer, and a Football lover{" "}
            <Link className="text-primary-500 font-bold text-5xl" href="/about">
              &#8594;
            </Link>
          </h2>

          <div className="mt-12 mx-auto px-6 md:hidden">
            <Search />
          </div>
        </Container>
        <Container size="sm" className="mt-20 z-10 -mb-40 w-full">
          <Box className="shadow-lg p-10 rounded-2xl block bg-glass w-full">
            <h3>Popular Posts</h3>

            <Box className="grid md:grid-cols-2 gap-10 mt-6 w-full">
              {popular &&
                popular.map((post) => (
                  <Link key={post.title} href={post.href}>
                    <Box
                      as="a"
                      css={{
                        minHeight: 150,
                      }}
                      className="text-center rounded-xl relative overflow-hidden group cursor-pointer"
                    >
                      <Box className="bg-gray-900 z-10  items-center h-full absolute top-0 left-0 px-3 hidden group-hover:flex">
                        <h3 className="text-gray-100 font-semibold text-xl">
                          {post.title}
                        </h3>
                      </Box>
                      <LazyImage
                        src={post.imageUrl}
                        fallbackSrc={post.fallbackSrc}
                        className="w-full h-full object-cover z-0"
                      />
                    </Box>
                  </Link>
                ))}
            </Box>
          </Box>
        </Container>
      </main>
      <Container as="section" size="sm" className="my-28 mx-auto p-6 md:p-0">
        <div className="flex mb-12">
          <h3>Recent Posts</h3>
          <Button
            href="/blog"
            as={Link}
            className="bg-gradient ml-3 rounded-md"
          >
            See all
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {allBlogs.slice(4).map((item) => (
            <HomePostCards key={item._id} frontmatter={item.frontmatter} />
          ))}
        </div>
      </Container>
      <Container
        as="aside"
        size="sm"
        className="my-28 mx-auto p-6 md:p-0 z-10 relative"
      >
        <div className="flex mb-12">
          <h3>Recent Projects</h3>
          <Button
            href="/works"
            as={Link}
            className="ml-3 bg-gradient rounded-md"
          >
            See all
          </Button>
        </div>
        <Stack spacing="1rem" col>
          {works.slice(0, 2).map((item) => (
            <HomeWorksCard work={item} key={item.title} />
          ))}
          <HomeWorksCard work={works[1]} />
        </Stack>
      </Container>
    </MainLayout>
  );
};

export default Index;
