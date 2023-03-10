/** ** */

import Footer from "components/footer";
import Header from "components/header";
import SEO from "components/seo";
import siteConfig from "configs/site-config";
import { DefaultSeo } from "next-seo";

const Main = ({
  title = "Full-stack developer - Portfolio",
  description = `Hi 👋, I’m a full-stack engineer that wears many hats 🎩🪄. I build Web apps using React (Next.js), Typescript, & Nodejs, and I have a great eye for design due to my background in graphic design. I've been working professionally in various company sizes for 5+ years using SCRUM and AGILE methodologies and I'm currently located in the Netherlands`,
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
