import Head from "next/head";
import {
  CharacterFilter,
  CharacterGender,
  Characters,
  CharacterStatus,
  getCharacters,
} from "../api/character";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Flex, Grid, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Pagination from "@/components/pagination";
import CharacterFilters from "./components/CharacterFilters";
import CharacterCard from "./components/CharacterCard";
import { generateQueryParams, validateQueryParams } from "@/utils";
import {
  characterGenders,
  characterSpecies,
  characterStatuses,
} from "@/utils/filterValues";
import CharacterCardSkeleton from "./components/CharacterCardSkeleton";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const CharactersPage = ({ initialCharacters, initialFilters }: Props) => {
  const toast = useToast();
  const [characters, setCharacters] = useState<Characters>(initialCharacters);

  const [charactersFilter, setCharactersFilter] =
    useState<CharacterFilter>(initialFilters);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateCharacters = async (newFilter: CharacterFilter) => {
    try {
      setIsLoading(true);
      const res = await getCharacters(newFilter);
      setCharacters(res);
      setCharactersFilter(newFilter);
      //   router.replace(
      //     {
      //       query: { ...router.query, ...newFilter },
      //     },
      //     undefined,
      //     { shallow: true }
      //   );
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
    key: keyof CharacterFilter
  ) => {
    if (value === charactersFilter[key]) return;
    const newFilter = { ...charactersFilter, [key]: value };
    if (key !== "page") newFilter.page = 1;

    void updateCharacters(newFilter);
  };

  if (!characters.results || !characters.info) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Characters</title>
      </Head>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        pb={4}
      >
        <CharacterFilters
          filterValue={charactersFilter}
          handleChangeFilter={handleChangeFilter}
        />

        <Grid
          width="100%"
          paddingX={8}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr));"
          gap={6}
        >
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, i) => <CharacterCardSkeleton key={i} isLoading />)
            : characters.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
        </Grid>

        <Pagination
          currentPage={charactersFilter.page ?? 1}
          pageCount={characters.info.pages}
          changePage={(page) => handleChangeFilter(page, "page")}
        />
      </Flex>
    </>
  );
};

interface PropsType {
  initialCharacters: Characters;
  initialFilters: CharacterFilter;
}

export const getServerSideProps: GetServerSideProps<PropsType> = async ({
  query,
}) => {
  const initialGender = validateQueryParams<CharacterGender>(
    query.gender,
    characterGenders
  );
  const initialStatus = validateQueryParams<CharacterStatus>(
    query.status,
    characterStatuses
  );
  const initialSpecies = validateQueryParams<string>(
    query.species,
    characterSpecies
  );
  const initialPage = isNaN(Number(query?.page)) ? 1 : Number(query?.page);

  const initialFilters = {
    page: initialPage,
    gender: initialGender,
    status: initialStatus,
    species: initialSpecies,
  };

  const initialCharacters: Characters = await getCharacters(initialFilters);

  return {
    props: {
      initialCharacters,
      initialFilters,
    },
  };
};

export default CharactersPage;
