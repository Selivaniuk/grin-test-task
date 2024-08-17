import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getLocations, LocationFilter, Locations } from "../api/location";
import { useState } from "react";
import {
  CharactersImages,
  charactersImagesFromCharacters,
  generateQueryParams,
  getCharactersIdsInLocations,
  validateQueryParams,
} from "@/utils";
import { Flex, Grid, useToast } from "@chakra-ui/react";
import Pagination from "@/components/pagination";
import LocationCard from "./components/LocationCard";
import { getCharacter } from "../api/character";
import LocationFilters from "./components/LocationFilters";
import LocationCardSkeleton from "./components/LocationCardSkeleton";
import { locationDimensions, locationTypes } from "@/utils/filterValues";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const LocationsPage = ({
  initialLocations,
  initialFilters,
  initialCharactersImages,
}: Props) => {
  const toast = useToast();
  const [locations, setLocations] = useState<Locations>(initialLocations);
  const [locationFilter, setLocationFilter] =
    useState<LocationFilter>(initialFilters);
  const [charactersImages, setCharactersImages] = useState<
    CharactersImages | undefined
  >(initialCharactersImages);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateLocations = async (newFilter: LocationFilter) => {
    try {
      setIsLoading(true);
      const res = await getLocations(newFilter);
      setLocations(res);
      setLocationFilter(newFilter);
      const charactersIds = getCharactersIdsInLocations(res.results)?.filter(
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

  const handleChangeFilter = (value: any, key: keyof LocationFilter) => {
    if (value === locationFilter[key]) return;
    const newFilter = { ...locationFilter, [key]: value };
    if (key !== "page") newFilter.page = 1;
    updateLocations(newFilter);
  };

  if (!locations.results || !locations.info) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Locations</title>
      </Head>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        pb={4}
      >
        <LocationFilters
          filterValue={locationFilter}
          handleChangeFilter={handleChangeFilter}
        />

        <Grid
          width="100%"
          paddingX={8}
          templateColumns="repeat(auto-fill, minmax(350px, 1fr));"
          gap={6}
        >
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, i) => <LocationCardSkeleton key={i} isLoading />)
            : locations.results.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  charactersImages={charactersImages}
                />
              ))}
        </Grid>

        <Pagination
          currentPage={locationFilter.page ?? 1}
          pageCount={locations.info.pages}
          changePage={(page) => handleChangeFilter(page, "page")}
        />
      </Flex>
    </>
  );
};

interface PropsType {
  initialLocations: Locations;
  initialCharactersImages?: CharactersImages;
  initialFilters: LocationFilter;
}

export const getServerSideProps: GetServerSideProps<PropsType> = async ({
  query,
}) => {
  const initialType = validateQueryParams<string>(query.type, locationTypes);
  const initialDimension = validateQueryParams<string>(
    query.dimension,
    locationDimensions
  );
  const initialPage = isNaN(Number(query.page)) ? 1 : Number(query.page);

  const initialFilters: LocationFilter = {
    page: initialPage,
    type: initialType,
    dimension: initialDimension,
  };
  const initialLocations = await getLocations(initialFilters);

  const charactersIds = getCharactersIdsInLocations(initialLocations.results);
  if (!charactersIds) {
    return {
      props: {
        initialLocations,
        initialFilters,
      },
    };
  }
  const resultCharacters = await getCharacter(charactersIds);
  const initialCharactersImages =
    charactersImagesFromCharacters(resultCharacters);
  return {
    props: {
      initialLocations,
      initialFilters,
      initialCharactersImages,
    },
  };
};

export default LocationsPage;
