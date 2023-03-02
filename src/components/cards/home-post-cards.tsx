import React from "react";

import { Avatar, Badge, Box, LazyImage, Stack } from "@nature-ui/core";
import Link from "next/link";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { getNChars } from "utils/get-n-chars";

const BottomVariants = {
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: 100 },
};

export const HomePostCards = (props) => {
  const {
    slug,
    tags,
    title,
    description,
    imageUrl,
    auth: { githubUrl, websiteUrl, avatarUrl, name },
    lastEdited,
    readTime,
  } = props.frontmatter;

  let fallbackSrc: any = imageUrl.split(".");

  if (fallbackSrc[fallbackSrc.length - 1] === "gif") {
    fallbackSrc = fallbackSrc.join(".").replace(/\/c_scale.*?\//gis, "/w_50/");
  } else {
    fallbackSrc = imageUrl.replace(/\/c_scale.*?\//gis, "/c_scale,w_0.01/");
  }

  const authorProfile =
    name === "Divine Hycenth"
      ? "/about"
      : `${websiteUrl}/about` || githubUrl || "#";

  const [ref, inView] = useInView();
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else controls.start("hidden");
  }, [controls, inView]);

  return (
    <motion.article
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={BottomVariants}
    >
      <Link href={slug}>
        <div className="grid relative">
          <LazyImage
            fallbackSrc={fallbackSrc}
            src={imageUrl}
            alt={title}
            className="rounded-2xl cursor-pointer w-full h-full object-cover"
          />
          <Badge className="absolute top-3 right-3 lowercase bg-slate-100">
            {readTime} min read
          </Badge>
        </div>
        {tags && (
          <Stack row spacing="8px" className="mt-4">
            {tags.map((tag, i) => (
              <Badge key={tag + i} className="bg-slate-200">
                {tag}
              </Badge>
            ))}
          </Stack>
        )}
        <h3 className="hover:underline font-semibold cursor-pointer mt-3">
          {title}
        </h3>
        <p className="my-4 text-md">{getNChars(description)}</p>
      </Link>
      <Link href={authorProfile}>
        <Stack as="a" row spacing="2" className="items-center">
          <Avatar src={avatarUrl} alt={name} />
          <Box className="pl-2">
            <p className="font-medium">{name}</p>
            <p className="opacity-60 text-sm">{lastEdited?.date}</p>
          </Box>
        </Stack>
      </Link>
    </motion.article>
  );
};
