import { Character } from "@/pages/api/character";
import { Episode } from "@/pages/api/episode";
import { Location } from "@/pages/api/location";
import { Heading, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

const UlLink = ({
  href,
  label,
  onItemClick,
}: {
  href: string;
  label: string;
  onItemClick: () => void;
}) => (
  <Link
    as={NextLink}
    href={href}
    px={2}
    py={1}
    rounded={"md"}
    onClick={onItemClick}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.300", "gray.700"),
    }}
  >
    {label}
  </Link>
);
const ResultBlock = ({
  title,
  url,
  values,
  onItemClick,
}: {
  title: string;
  url: string;
  values: Character[] | Location[] | Episode[];
  onItemClick: () => void;
}) => {
  return (
    <Stack>
      <Heading size="sm">{title}</Heading>
      <Stack as="ul">
        {values.map((value) => (
          <UlLink
            key={value.id}
            href={`${url}/${value.id}`}
            label={value.name}
            onItemClick={onItemClick}
          />
        ))}
      </Stack>
    </Stack>
  );
};

interface Props {
  characters?: Character[];
  locations?: Location[];
  episodes?: Episode[];
  onItemClick: () => void;
}

const SearchList: FC<Props> = ({
  characters,
  episodes,
  locations,
  onItemClick,
}) => {
  return (
    <Stack
      position="absolute"
      zIndex={1}
      top="40px"
      maxHeight={300}
      w={300}
      overflowY="auto"
      bgColor={useColorModeValue("gray.100", "gray.900")}
      p={4}
      borderRadius={4}
    >
      {characters && characters.length > 0 && (
        <ResultBlock
          title="Characters"
          url="/character"
          values={characters}
          onItemClick={onItemClick}
        />
      )}
      {locations && locations.length > 0 && (
        <ResultBlock
          title="Locations"
          url="/location"
          values={locations}
          onItemClick={onItemClick}
        />
      )}
      {episodes && episodes.length > 0 && (
        <ResultBlock
          title="Episodes"
          url="/episode"
          values={episodes}
          onItemClick={onItemClick}
        />
      )}
      {!characters && !locations && !episodes && (
        <Heading size="sm">No results</Heading>
      )}
    </Stack>
  );
};

export default SearchList;
