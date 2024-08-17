import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Character, getCharacters } from "./api/character";
import { getLocations, Location } from "./api/location";
import { Episode, getEpisodes } from "./api/episode";
import { randomInt, shuffle } from "@/utils";
import { Link, Stack } from "@chakra-ui/react";
import CharacterCard from "./character/components/CharacterCard";
import LocationCard from "./location/components/LocationCard";
import EpisodeCard from "./episode/components/EpisodeCard";
import CardsCarousel from "@/components/CardsCarousel";
import NextLink from "next/link";
import { FC, PropsWithChildren } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

interface CarouselWrapperProps extends PropsWithChildren {
  title: string;
  href: string;
}
const CarouselWrapper: FC<CarouselWrapperProps> = ({
  title,
  href,
  children,
}) => {
  return (
    <Stack gap={4}>
      <Link
        as={NextLink}
        width="max-content"
        href={href}
        fontSize="4xl"
        fontWeight={700}
        rounded={"md"}
        color="blue.300"
        _hover={{
          textDecoration: "none",
          color: "blue.200",
        }}
      >
        {title}
      </Link>
      <CardsCarousel>{children}</CardsCarousel>
    </Stack>
  );
};

export default function Home({
  randomCharacters,
  randomLocations,
  randomEpisodes,
}: Props) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Stack gap={8} mb={8}>
        <CarouselWrapper title="Characters" href="/character">
          {randomCharacters.map((character) => (
            <CharacterCard character={character} key={character.id} size="sm" />
          ))}
        </CarouselWrapper>

        <CarouselWrapper title="Locations" href="/location">
          {randomLocations.map((location) => (
            <LocationCard location={location} key={location.id} size="sm" />
          ))}
        </CarouselWrapper>

        <CarouselWrapper title="Episodes" href="/episode">
          {randomEpisodes.map((episode) => (
            <EpisodeCard episode={episode} key={episode.id} size="sm" />
          ))}
        </CarouselWrapper>
      </Stack>
    </>
  );
}
interface PropsType {
  randomCharacters: Character[];
  randomLocations: Location[];
  randomEpisodes: Episode[];
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
  const firstCharacters = await getCharacters();
  let characters = firstCharacters.results;
  if (firstCharacters.info) {
    const randomCharactersPage = randomInt(1, firstCharacters.info.pages - 1);
    if (randomCharactersPage !== 1) {
      characters = (await getCharacters({ page: randomCharactersPage }))
        .results;
    }
  }
  const randomCharacters = shuffle(characters ?? []).slice(0, 10);

  const firstLocations = await getLocations();
  let locations = firstLocations.results;
  if (firstLocations.info) {
    const randomLocationsPage = randomInt(1, firstLocations.info.pages - 1);
    if (randomLocationsPage !== 1) {
      locations = (await getLocations({ page: randomLocationsPage })).results;
    }
  }
  const randomLocations = shuffle(locations ?? []).slice(0, 10);

  const firstEpisodes = await getEpisodes();
  let episodes = firstEpisodes.results;
  if (firstEpisodes.info) {
    const randomEpisodesPage = randomInt(1, firstEpisodes.info.pages - 1);
    if (randomEpisodesPage !== 1) {
      episodes = (await getEpisodes({ page: randomEpisodesPage })).results;
    }
  }
  const randomEpisodes = shuffle(episodes ?? []).slice(0, 10);

  return {
    props: { randomCharacters, randomLocations, randomEpisodes },
  };
};
