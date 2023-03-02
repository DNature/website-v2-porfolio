import { Container, Icon } from "@nature-ui/core";
import {
  IoLogoDiscord,
  IoLogoDribbble,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";

import siteConfig from "configs/site-config";

import MainLayout from "layouts/main";

const Link = ({ href, children, icon }) => (
  <p className="text-primary-500 hover:underline mb-3">
    <a href={href} target="_blank">
      <Icon as={icon} size="lg" className="text-gray-400 mr-3 inline-flex" />
      {children}
    </a>
  </p>
);

export const links = [
  {
    icon: IoLogoTwitter,
    label: "Twitter",
    href: "//twitter.com/DivineHycenth",
  },
  {
    icon: IoLogoGithub,
    label: "Github",
    href: "//github.com/dnature",
  },

  {
    icon: IoLogoLinkedin,
    label: "Linkedin",
    href: "//linkedin.com/in/dnature",
  },
  {
    icon: IoLogoDribbble,
    label: "Dribbble",
    href: "https://dribbble.com/DNature",
  },
  {
    icon: IoLogoDiscord,
    label: "Discord",
    href: siteConfig.discord.url,
  },
];

const Contact = ({}) => {
  return (
    <MainLayout title="Contact me">
      <Container
        size="sm"
        centered
        className="relative z-20 my-12 px-6 lg:px-0"
      >
        <h1>Email me on</h1>
        <h3>
          <a
            href="mailto:contact@divinehycenth.com"
            className="text-primary-500 hover:underline"
          >
            contact@divinehycenth.com
          </a>
        </h3>

        <h3 className="mt-12 mb-6">You can also find me on</h3>
        <ol>
          {links.map(({ href, label, icon }) => (
            <li key={label}>
              <Link href={href} icon={icon}>
                {label}
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </MainLayout>
  );
};

export default Contact;
