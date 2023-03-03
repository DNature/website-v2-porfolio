/** ** */

import Footer from "components/footer";
import Header from "components/header";
import SEO from "components/seo";
import siteConfig from "configs/site-config";
import { DefaultSeo } from "next-seo";

const Main = ({
  title = "Full-stack developer - Portfolio",
  description = `Hi 👋, I’m a full-stack engineer that wears many hats 🎩🪄.I build blockchain apps (Smart Contracts, Solidity, Dapps, Web3), Web apps using React, Typescript, & Nodejs, and I have a great eye for designs due to my background in graphic designs. I've been working professionally in various company sizes for 5+ years and I'm currently located in the Netherlands`,
  children,
}) => {
  return (
    <>
      <DefaultSeo {...siteConfig.seo} />
      <SEO title={title} description={description} />
      <Header />
      <div className="min-h-screen overflow-x-hidden">{children}</div>
      <Footer />
    </>
  );
};

export default Main;
