import PageContainer from "components/page-container";
import { Frontmatter } from "types/frontmatter";

interface MDXLayoutProps {
  frontmatter: Frontmatter;
  children: React.ReactNode;
}

const MDXLayout: React.FC<MDXLayoutProps> = (props) => {
  const { frontmatter, children } = props;

  return <PageContainer frontmatter={frontmatter}>{children}</PageContainer>;
};

export default MDXLayout;
