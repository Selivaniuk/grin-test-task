import { Character, getCharacter, getCharacters } from "@/pages/api/character";
import {
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
  Badge,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { getStatusColor } from "../components/CharacterCard";
import NextLink from "next/link";
import { getIdInUrl } from "@/utils";
import Head from "next/head";
import { useEffect } from "react";
import { useViewedPagesStore } from "@/store/viewedPagesStore";
import ViewedBadge from "@/components/ViewedBadge";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CharacterPage = ({ character }: Props) => {
  const { addPage } = useViewedPagesStore();
  const bgColor = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    if (!character) return;
    addPage("character", character.id);
  }, [addPage, character]);

  if (!character) return null;
  return (
    <>
      <Head>
        <title>{character.name}</title>
      </Head>
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
            src={character.image}
            alt={character.name}
          />
        </Flex>
        <VStack align="baseline">
          <HStack>
            <Heading size="xl">{character.name}</Heading>
            <ViewedBadge page="character" id={character.id} />
          </HStack>

          <Badge colorScheme={getStatusColor(character.status)}>
            {character.status}
          </Badge>
          <HStack alignItems="baseline">
            <Text fontSize="xl">Gender:</Text>
            <Text fontSize="xl" fontWeight={700}>
              {character.gender}
            </Text>
          </HStack>
          <HStack alignItems="baseline">
            <Text fontSize="xl">Species:</Text>
            <Text fontSize="xl" fontWeight={700}>
              {character.species}
            </Text>
          </HStack>
          {character.type && (
            <HStack alignItems="baseline">
              <Text fontSize="xl">Type:</Text>
              <Text fontSize="xl" fontWeight={700}>
                {character.type}
              </Text>
            </HStack>
          )}
          {character.location && getIdInUrl(character.location.url) !== 0 && (
            <HStack alignItems="baseline">
              <Text fontSize="xl">Location:</Text>
              <Link
                as={NextLink}
                href={`/location/${getIdInUrl(character.location.url)}`}
                fontSize="xl"
                rounded={"md"}
                color="blue.300"
                _hover={{
                  textDecoration: "none",
                  color: "blue.200",
                }}
              >
                {character.location.name}
              </Link>
            </HStack>
          )}
          {character.origin && getIdInUrl(character.origin.url) !== 0 && (
            <HStack alignItems="baseline">
              <Text fontSize="xl">Origin:</Text>
              <Link
                as={NextLink}
                href={`/location/${getIdInUrl(character.origin.url)}`}
                fontSize="xl"
                rounded={"md"}
                color="blue.300"
                _hover={{
                  textDecoration: "none",
                  color: "blue.200",
                }}
              >
                {character.origin.name}
              </Link>
            </HStack>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default CharacterPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const firstPageCharacters = await getCharacters({ page: 1 });

  if (!firstPageCharacters.info || !firstPageCharacters.results) {
    return { paths: [], fallback: false };
  }

  const totalPages = firstPageCharacters.info.pages;

  const allCharacterIds: string[] = firstPageCharacters.results.map((c) =>
    c.id.toString()
  );

  for (let page = 2; page <= totalPages; page++) {
    const pageData = await getCharacters({ page });
    if (!pageData.results) continue;
    pageData.results.forEach((character) => {
      allCharacterIds.push(character.id.toString());
    });
  }

  const paths = allCharacterIds.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface PropsType {
  character?: Character;
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

  const character = await getCharacter(numId);

  return {
    props: { character },
  };
};
