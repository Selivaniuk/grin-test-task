import Head from "next/head";
import {
  CharacterFilter,
  CharacterGender,
  characterGenders,
  Characters,
  CharacterStatus,
  characterStatuses,
  getCharacters,
} from "../api/character";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Flex, Grid, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import Pagination from "@/components/pagination";
import CharacterFilters from "./components/CharacterFilters";
import CharacterCard from "./components/CharacterCard";
import { generateQueryParams } from "@/utils";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const CharacterPage = ({ initialCharacters, initialFilters }: Props) => {
  //   const router = useRouter();
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

      const newUrl = `/character${generateQueryParams(newFilter)}`;
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        "",
        newUrl
      );
    } catch (error) {
      console.log("Error: getCharacters", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFilter = (value: any, key: keyof CharacterFilter) => {
    if (value === charactersFilter[key]) return;
    const newFilter = { ...charactersFilter, [key]: value };
    updateCharacters(newFilter);
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
          initialFilters={initialFilters}
          handleChangeFilter={handleChangeFilter}
        />

        {isLoading ? (
          <Spinner />
        ) : (
          <Grid
            width="100%"
            paddingX={8}
            templateColumns="repeat(auto-fit, minmax(300px, 1fr));"
            gap={6}
          >
            {characters.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </Grid>
        )}

        <Pagination
          currentPage={charactersFilter.page ?? 1}
          pageCount={characters.info.pages}
          changePage={(page) => handleChangeFilter(page, "page")}
        />
      </Flex>
    </>
  );
};

export const getServerSideProps = (async ({ query }) => {
  const { page, gender, status } = query;

  function validate<T>(
    value: string[] | string | undefined,
    validValues: T[]
  ): T | null {
    const v = Array.isArray(value) ? value[0] : value;
    return v && validValues.includes(v as T) ? (v as T) : null;
  }

  const initialGender = validate<CharacterGender>(gender, characterGenders);
  const initialStatus = validate<CharacterStatus>(status, characterStatuses);
  const initialPage = isNaN(Number(page)) ? 1 : Number(page);

  const initialCharacters: Characters = await getCharacters({
    page: initialPage,
    gender: initialGender,
    status: initialStatus,
  });
  return {
    props: {
      initialCharacters,
      initialFilters: {
        page: initialPage,
        status: initialStatus,
        gender: initialGender,
      },
    },
  };
}) satisfies GetServerSideProps<{
  initialCharacters: Characters;
  initialFilters: {
    page: number;
    status: CharacterStatus | null;
    gender: CharacterGender | null;
  };
}>;

export default CharacterPage;
