import { Box, Container, Stack } from "@nature-ui/core";

import { Search } from "components/algolia-search";
import { BlogCard } from "components/cards/blog-card";
import { Zigzag } from "components/zigzag";
import { allBlogs } from "contentlayer/generated";
import MainLayout from "layouts/main";

const Blog = () => {
  return (
    <MainLayout title="Blog - Recent Articles">
      <Box
        css={{
          minHeight: "15vh",
        }}
        className="grid place-content-center"
      >
        <Zigzag>Blog</Zigzag>
      </Box>

      <Container className="pt-16 relative px-6 md:hidden" centered>
        <Search />
      </Container>

      <Container as="section" size="sm" className="my-28 mx-auto p-6 md:p-0">
        <Stack col spacing="1rem">
          {allBlogs &&
            allBlogs.map((post) => (
              <BlogCard key={post.title} frontmatter={post.frontmatter} />
            ))}
        </Stack>
      </Container>
    </MainLayout>
  );
};

export default Blog;
