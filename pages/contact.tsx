import { Container, Icon } from "@nature-ui/core";
import Link from "next/link";
import {
  IoLogoDiscord,
  IoLogoDribbble,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";

import siteConfig from "configs/site-config";

import MainLayout from "layouts/main";

const ContactLink = ({ href, children, icon }) => (
  <p className="text-primary-500 hover:underline mb-3">
    <Link href={href} target="_blank">
      <Icon as={icon} size="lg" className="text-gray-400 mr-3 inline-flex" />
      {children}
    </Link>
  </p>
);

export const links = [
  {
    icon: IoLogoTwitter,
    label: "Twitter",
    href: "https://twitter.com/built_divine",
  },
  {
    icon: IoLogoGithub,
    label: "Github",
    href: "https://github.com/dnature",
  },

  {
    icon: IoLogoLinkedin,
    label: "Linkedin",
    href: "https://linkedin.com/in/dnature",
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
              <ContactLink href={href} icon={icon}>
                {label}
              </ContactLink>
            </li>
          ))}
        </ol>
      </Container>
    </MainLayout>
  );
};

export default Contact;
