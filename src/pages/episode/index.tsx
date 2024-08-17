import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";
import { EpisodeFilter, Episodes, getEpisodes } from "../api/episode";
import { getCharacter } from "../api/character";
import { Flex, Grid, useToast } from "@chakra-ui/react";
import Pagination from "@/components/Pagination";
import EpisodeCard from "@/components/episode/EpisodeCard";
import EpisodeCardSkeleton from "@/components/episode/EpisodeCardSkeleton";
import {
  CharactersImages,
  charactersImagesFromCharacters,
  generateQueryParams,
  getCharactersIdsInEpisodes,
} from "@/utils";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const EpisodesPage = ({
  initialEpisodes,
  initialCharactersImages,
  initialFilters,
}: Props) => {
  const toast = useToast();
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
        (id) => !Object.keys(charactersImages || {}).includes(id.toString())
      );

      if (charactersIds && charactersIds.length > 0) {
        const resultCharacters = await getCharacter(charactersIds);
        setCharactersImages((prev) => ({
          ...prev,
          ...charactersImagesFromCharacters(resultCharacters),
        }));
      }

      const newUrl = window.location.pathname + generateQueryParams(newFilter);
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        "",
        newUrl
      );
    } catch (e) {
      const error = e as Error;
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFilter = (
    value: number | string | null,
    key: keyof EpisodeFilter
  ) => {
    if (value === episodesFilter[key]) return;
    const newFilter = { ...episodesFilter, [key]: value };
    if (key !== "page") newFilter.page = 1;
    void updateEpisodes(newFilter);
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
        <Grid
          width="100%"
          paddingX={8}
          templateColumns="repeat(auto-fill, minmax(360px, 1fr));"
          gap={6}
        >
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, i) => <EpisodeCardSkeleton key={i} isLoading />)
            : episodes.results.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  charactersImages={charactersImages}
                />
              ))}
        </Grid>

        <Pagination
          currentPage={episodesFilter.page ?? 1}
          pageCount={episodes.info.pages}
          changePage={(page) => handleChangeFilter(page, "page")}
        />
      </Flex>
    </>
  );
};

interface PropsType {
  initialEpisodes: Episodes;
  initialCharactersImages?: CharactersImages;
  initialFilters: EpisodeFilter;
}

export const getServerSideProps: GetServerSideProps<PropsType> = async ({
  query,
}) => {
  const initialPage = isNaN(Number(query.page)) ? 1 : Number(query.page);
  const initialFilters: EpisodeFilter = {
    page: initialPage,
  };

  const initialEpisodes = await getEpisodes(initialFilters);

  const charactersIds = getCharactersIdsInEpisodes(initialEpisodes.results);

  if (!charactersIds) {
    return {
      props: {
        initialEpisodes,
        initialFilters,
      },
    };
  }

  const resultCharacters = await getCharacter(charactersIds);
  const initialCharactersImages =
    charactersImagesFromCharacters(resultCharacters);

  return {
    props: {
      initialEpisodes,
      initialFilters,
      initialCharactersImages,
    },
  };
};

export default EpisodesPage;
