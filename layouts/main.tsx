/** ** */

import Footer from "components/footer";
import Header from "components/header";
import SEO from "components/seo";
import siteConfig from "configs/site-config";
import { DefaultSeo } from "next-seo";

const Main = ({
  title = "Software Engineer / UIX Designer",
  description = "Hi 👋,  I’m a full stack software engineer, technical writer, and a UI/UX Designer.",
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
