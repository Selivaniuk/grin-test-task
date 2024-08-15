import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { EpisodeFilter, Episodes, getEpisodes } from "../api/episode";
import { Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import Pagination from "@/components/pagination";
import { useState } from "react";
import { generateQueryParams } from "@/utils";
import EpisodeCard from "./components/EpisodeCard";
import { Character, getCharactersByIds } from "../api/character";
import { CharactersImages } from "./components/EpisodeCardCharacters";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const getCharactersIdsInEpisodes = (episodes: Episodes["results"]) => {
  if (!episodes) return null;
  return [
    ...new Set(
      episodes.flatMap((ep) =>
        ep.characters.slice(0, 4).map((url) => {
          const parts = url.split("/");
          const charactersId = parts[parts.length - 1];
          return charactersId;
        })
      )
    ),
  ];
};

const charactersImagesFromCharacters = (
  characters: Character[] | Character
): CharactersImages => {
  const charactersArray = Array.isArray(characters) ? characters : [characters];
  if (charactersArray.length === 0) {
    return {};
  }

  return Object.fromEntries(
    charactersArray.map((character) => {
      return [character.id, { name: character.name, url: character.image }];
    })
  );
};

const Episode = ({
  initialEpisodes,
  initialCharactersImages,
  initialFilters,
}: Props) => {
  const [episodes, setEpisodes] = useState<Episodes>(initialEpisodes);
  const [charactersImages, setCharactersImages] = useState<
    CharactersImages | undefined
  >(initialCharactersImages);
  const [episodesFilter, setEpisodesFilter] =
    useState<EpisodeFilter>(initialFilters);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateEpisodes = async (newFilter: EpisodeFilter) => {
    try {
      setIsLoading(true);
      const res = await getEpisodes(newFilter);
      setEpisodes(res);
      setEpisodesFilter(newFilter);

      const charactersIds = getCharactersIdsInEpisodes(res.results)?.filter(
        (id) => !Object.keys(charactersImages || {}).includes(id)
      );

      if (charactersIds && charactersIds.length > 0) {
        const resultCharacters = await getCharactersByIds(charactersIds);
        setCharactersImages((prev) => ({
          ...prev,
          ...charactersImagesFromCharacters(resultCharacters),
        }));
      }

      const newUrl = `/episode${generateQueryParams(newFilter)}`;
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        "",
        newUrl
      );
    } catch (error) {
      console.log("Error: getEpisodes", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFilter = (value: any, key: keyof EpisodeFilter) => {
    if (value === episodesFilter[key]) return;
    const newFilter = { ...episodesFilter, [key]: value };
    updateEpisodes(newFilter);
  };

  if (!episodes.results || !episodes.info) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Episodes</title>
      </Head>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        pb={4}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          //   <Flex
          //     wrap={"wrap"}
          //     gap={4}
          //     alignItems="center"
          //     justifyContent="center"
          //   >
          <Grid
            width="100%"
            paddingX={8}
            templateColumns="repeat(auto-fit, minmax(350px, 1fr));"
            gap={6}
          >
            {episodes.results.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                charactersImages={charactersImages}
              />
            ))}
          </Grid>

          //   </Flex>
        )}
        <Pagination
          currentPage={episodesFilter.page ?? 1}
          pageCount={episodes.info.pages}
          changePage={(page) => handleChangeFilter(page, "page")}
        />
      </Flex>
    </>
  );
};

export const getServerSideProps = (async ({ query }) => {
  const { page } = query;
  const initialPage = isNaN(Number(page)) ? 1 : Number(page);
  const initialEpisodes = await getEpisodes({ page: initialPage });

  const charactersIds = getCharactersIdsInEpisodes(initialEpisodes.results);

  if (!charactersIds) {
    return {
      props: {
        initialEpisodes,
        initialFilters: {
          page: initialPage,
        },
      },
    };
  }

  const resultCharacters = await getCharactersByIds(charactersIds);
  const initialCharactersImages =
    charactersImagesFromCharacters(resultCharacters);

  return {
    props: {
      initialEpisodes,
      initialCharactersImages,
      initialFilters: {
        page: initialPage,
      },
    },
  };
}) satisfies GetServerSideProps<{
  initialEpisodes: Episodes;
  initialCharactersImages?: CharactersImages;
  initialFilters: {
    page: number;
  };
}>;

export default Episode;
