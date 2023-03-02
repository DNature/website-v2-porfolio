import {
  Button,
  IconButton,
  Stack,
  clsx,
  nature,
  useDisclosure,
  useUpdateEffect,
} from "@nature-ui/core";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/router";
import { FaMoon, FaSun } from "react-icons/fa";
import { Logo } from "./Logo";
import { Search } from "./algolia-search";
import { useColorMode, useColorModeValue } from "./color-mode/color-mode";
import { MobileNavButton, MobileNaveContent } from "./mobile-nav";

const NavLink = ({ children, href, className = "", ...props }) => {
  const { pathname } = useRouter();
  return (
    <Button
      as={Link}
      className={clsx("font-medium hidden sm:inline-flex", className, {
        [`text-gradient`]: pathname.includes(href),
      })}
      {...props}
      href={href}
    >
      {children}
    </Button>
  );
};

const Header = () => {
  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  const mobileNav = useDisclosure();

  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);
  return (
    <nature.header
      css={{
        backdropFilter: "blur(10px)",
      }}
      className="sticky top-0 left-0 w-full z-50 bg-glass"
    >
      <nav className="w-full max-w-screen-lg px-4 md:px-0 md:mx-auto py-3">
        <div className="flex items-center justify-between xl:px-0">
          <Stack row spacing="6px" className="items-center">
            <Logo />
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/works">Works</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Stack>
          <div className="md:w-2/5 flex items-center justify-end">
            <Search />
            <IconButton
              size="md"
              className="text-lg sm:ml-3"
              text="current"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <MobileNavButton
              ref={mobileNavBtnRef}
              aria-label="Open Menu"
              onClick={mobileNav.onOpen}
            />
          </div>
        </div>
      </nav>

      <MobileNaveContent
        isOpen={mobileNav.isOpen}
        onClose={mobileNav.onClose}
      />
    </nature.header>
  );
};

export default Header;
