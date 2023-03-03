import { Image } from "@nature-ui/core";

export const Zigzag = ({ className = "", children, ...props }) => {
  return (
    <h1 className="text-6xl font-bold zigzag relative">
      <Image
        src="/zigzag.png"
        alt={children}
        className="absolute -top-5 -left-8"
      />
      <span className={"z-10 relative " + className} {...props}>
        {children}
      </span>
    </h1>
  );
};
