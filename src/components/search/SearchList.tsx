import { Character } from "@/pages/api/character";
import { Episode } from "@/pages/api/episode";
import { Location } from "@/pages/api/location";
import { useSearchStore } from "@/store/searchStore";
import { Heading, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import NextLink from "next/link";
import { FC } from "react";

const UlLink = ({
  href,
  label,
  onClose,
}: {
  href: string;
  label: string;
  onClose: () => void;
}) => (
  <Link
    as={NextLink}
    href={href}
    px={2}
    py={1}
    rounded={"md"}
    onClick={onClose}
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
  onClose,
}: {
  title: string;
  url: string;
  values: Character[] | Location[] | Episode[];
  onClose: () => void;
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
            onClose={onClose}
          />
        ))}
      </Stack>
    </Stack>
  );
};

const SearchList: FC = () => {
  const { characters, episodes, locations, close } = useSearchStore();
  const hasCharacters = characters.length > 0;
  const hasEpisodes = episodes.length > 0;
  const hasLocations = locations.length > 0;
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
      {hasCharacters && (
        <ResultBlock
          title="Characters"
          url="/character"
          values={characters}
          onClose={close}
        />
      )}
      {hasLocations && (
        <ResultBlock
          title="Locations"
          url="/location"
          values={locations}
          onClose={close}
        />
      )}
      {hasEpisodes && (
        <ResultBlock
          title="Episodes"
          url="/episode"
          values={episodes}
          onClose={close}
        />
      )}
      {!hasCharacters && !hasLocations && !hasEpisodes && (
        <Heading size="sm">No results</Heading>
      )}
    </Stack>
  );
};

export default observer(SearchList);
