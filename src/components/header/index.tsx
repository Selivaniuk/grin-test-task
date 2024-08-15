import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import SearchInput from "../searchInput";
import NextLink from "next/link";

interface LinkI {
  label: string;
  href: string;
}
const LINKS: LinkI[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Characters",
    href: "/character",
  },
  {
    label: "Locations",
    href: "/location",
  },
  {
    label: "Episodes",
    href: "/episode",
  },
];

const NavLink: FC<LinkI> = (link) => {
  return (
    <Link
      as={NextLink}
      href={link.href}
      px={2}
      py={1}
      fontSize={18}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {link.label}
    </Link>
  );
};

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      h={16}
      px={8}
      alignItems="center"
      justifyContent="space-between"
      gap={8}
    >
      <Flex alignItems="center" gap={4} as="nav">
        {LINKS.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </Flex>
      <SearchInput />

      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Header;
