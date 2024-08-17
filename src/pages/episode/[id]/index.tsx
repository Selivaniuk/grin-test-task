import { Character, getCharacter } from "@/pages/api/character";
import { Episode, getEpisode, getEpisodes } from "@/pages/api/episode";
import { getIdInUrl } from "@/utils";
import {
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const EpisodePage = ({ episode, charactersInEpisode }: Props) => {
  const router = useRouter();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  if (!episode) return null;

  return (
    <>
      <Head>
        <title>{episode.name}</title>
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
              alt={episode.name}
            />
          </Flex>

          <Stack alignItems="baseline">
            <Heading size="xl">{episode.name}</Heading>
            <Text fontSize="xl">{episode.episode}</Text>
            <HStack alignItems="baseline">
              <Text fontSize="xl">Air Date:</Text>
              <Text fontSize="xl" fontWeight={700}>
                {episode.air_date}
              </Text>
            </HStack>
          </Stack>
        </Flex>
        {charactersInEpisode && (
          <Stack alignItems="baseline" my={8}>
            <Heading size="lg">Characters</Heading>
            <Grid
              mt={2}
              width="100%"
              maxWidth={1200}
              templateColumns="repeat(auto-fill, minmax(80px, 1fr))"
              gap={4}
            >
              {charactersInEpisode.map((character) => (
                <Tooltip key={character.id} label={character.name}>
                  <Image
                    style={{ borderRadius: "50%", cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/character/${character.id}`);
                    }}
                    width={80}
                    height={80}
                    src={character.image}
                    alt={character.name}
                  />
                </Tooltip>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default EpisodePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const episodesFirstPage = await getEpisodes({ page: 1 });

  if (!episodesFirstPage.info || !episodesFirstPage.results) {
    return { paths: [], fallback: false };
  }

  const totalPages = episodesFirstPage.info.pages;

  const allEpisodeIds: string[] = episodesFirstPage.results.map((c) =>
    c.id.toString()
  );

  for (let page = 2; page <= totalPages; page++) {
    const pageData = await getEpisodes({ page });
    if (!pageData.results) continue;
    pageData.results.forEach((episode) => {
      allEpisodeIds.push(episode.id.toString());
    });
  }

  const paths = allEpisodeIds.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface PropsType {
  episode?: Episode;
  charactersInEpisode?: Character[];
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
  const episode = await getEpisode(numId);
  if (episode.characters.length === 0) {
    return {
      props: { episode },
    };
  }
  const ids = episode.characters.map((url) => getIdInUrl(url));
  const characters = (await getCharacter(ids)) as Character | Character[];
  const charactersInEpisode = Array.isArray(characters)
    ? characters
    : [characters];

  return {
    props: { episode, charactersInEpisode },
  };
};
