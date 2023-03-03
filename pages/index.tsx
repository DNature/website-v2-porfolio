import Button from "@custom/button";
import { Alert, Container, Stack } from "@nature-ui/core";
import { BlurLeft, BlurRight } from "components/BlurEffect";

import { Search } from "components/algolia-search";
import { HomePostCards } from "components/cards/home-post-cards";
import { HomeWorksCard } from "components/cards/works-card";
import works from "configs/works.json";
import { allBlogs } from "contentlayer/generated";
import MainLayout from "layouts/main";
import Link from "next/link";

const Index = () => {
  return (
    <MainLayout>
      <main className="grid place-items-center md:pb-32 pb-12 px-4 md:px-0 relative mb-20">
        <BlurLeft className="absolute bottom-0 -mb-32 left-0 lg:left-64 xl:left-80 2xl:left-96" />
        <BlurRight className="absolute bottom-0 -mb-32 right-0 lg:right-64 xl:right-80 2xl:right-96" />
        <Container size="sm" className="z-10 text-center mt-32 md:mt-48 mb-16">
          <h1 className="mb-3">
            Hi 👋, I’m{" "}
            <span className="text-gradient shadow-text">Divine.</span>
          </h1>
          <h3>I’m a full-stack engineer that wears many hats 🎩🪄</h3>
          <p className="mt-2">
            I build blockchain apps (Smart Contracts, Solidity, Dapps, Web3),
            Web apps using React, Typescript, & Nodejs, and I have a great eye
            for designs due to my background in graphic designs. I've been
            working professionally in different company sizes for 5+ years and
            I'm currently located in the Netherlands
          </p>
          <Link className="text-primary-500 font-bold" href="/about">
            Read more about me -&gt;
          </Link>

          <div className="mt-12 mx-auto px-6 md:hidden">
            <Search />
          </div>
        </Container>
      </main>
      <Container as="section" size="sm" className="my-20 mx-auto p-6 md:p-0">
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
          {allBlogs.slice(0, 4).map((item) => (
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
        </div>
        <Alert status="warning" className="mb-6">
          These projects are freelance and personal projects. It does not
          account for my professional roles.
        </Alert>
        <Stack spacing="1rem" col>
          {works.slice(0, 3).map((item) => (
            <HomeWorksCard work={item} key={item.title} />
          ))}
        </Stack>

        <Button href="/works" as={Link} className="mt-8 bg-gradient rounded-md">
          See all -&gt;
        </Button>
      </Container>
    </MainLayout>
  );
};

export default Index;
