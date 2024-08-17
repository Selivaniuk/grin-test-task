import { Character, getCharacter } from "@/pages/api/character";
import { Location, getLocation, getLocations } from "@/pages/api/location";
import { getIdInUrl } from "@/utils";
import {
  Heading,
  HStack,
  VStack,
  Text,
  Grid,
  Tooltip,
  useColorModeValue,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const LocationPage = ({ location, charactersInLocation }: Props) => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  if (!location) return null;

  return (
    <>
      <Head>
        <title>{location.name}</title>
      </Head>
      <Stack>
        <Flex gap={8} wrap="wrap-reverse">
          <Flex w={400} h={400} bgColor={bgColor} borderRadius={12}>
            <Image
              style={{
                objectFit: "contain",
                width: "100%",
                borderRadius: "inherit",
              }}
              width={400}
              height={400}
              src="/images/noImg.jpg"
              alt={location.name}
            />
          </Flex>
          <Stack alignItems="baseline">
            <Heading size="xl">{location.name}</Heading>
            <HStack alignItems="baseline">
              <Text fontSize="xl">Dimension:</Text>
              <Text fontSize="xl" fontWeight={700}>
                {location.dimension}
              </Text>
            </HStack>
            <HStack alignItems="baseline">
              <Text fontSize="xl">Type:</Text>
              <Text fontSize="xl" fontWeight={700}>
                {location.type}
              </Text>
            </HStack>
          </Stack>
        </Flex>
        {charactersInLocation && (
          <Stack alignItems="baseline" my={8}>
            <Heading size="lg">Characters</Heading>
            <Grid
              mt={2}
              width="100%"
              maxWidth={1200}
              templateColumns="repeat(auto-fill, minmax(80px, 1fr))"
              gap={4}
            >
              {charactersInLocation.map((character) => (
                <Tooltip key={character.id} label={character.name}>
                  <Link
                    href={`/character/${character.id}`}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={80}
                      height={80}
                      src={character.image}
                      alt={character.name}
                    />
                  </Link>
                </Tooltip>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default LocationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const locationsFirstPage = await getLocations({ page: 1 });

  if (!locationsFirstPage.info || !locationsFirstPage.results) {
    return { paths: [], fallback: false };
  }

  const totalPages = locationsFirstPage.info.pages;

  const allLocationIds: string[] = locationsFirstPage.results.map((c) =>
    c.id.toString()
  );

  for (let page = 2; page <= totalPages; page++) {
    const pageData = await getLocations({ page });
    if (!pageData.results) continue;
    pageData.results.forEach((location) => {
      allLocationIds.push(location.id.toString());
    });
  }

  const paths = allLocationIds.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface PropsType {
  location?: Location;
  charactersInLocation?: Character[];
}
interface ParamsType extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<PropsType, ParamsType> = async ({
  params,
}) => {
  const numId = isNaN(Number(params?.id)) ? null : Number(params?.id);
  if (!numId) {
    return { props: {} };
  }

  const location = await getLocation(numId);
  if (location.residents.length === 0) {
    return {
      props: { location },
    };
  }
  const ids = location.residents.map((url) => getIdInUrl(url));
  const characters = (await getCharacter(ids)) as Character | Character[];
  const charactersInLocation = Array.isArray(characters)
    ? characters
    : [characters];

  return {
    props: { location, charactersInLocation },
  };
};
