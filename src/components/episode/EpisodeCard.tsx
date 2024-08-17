import { Episode } from "@/pages/api/episode";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { CharactersImages } from "@/utils";
import CharacterImageList from "@/components/CharactersImages";
import Link from "next/link";
import Image from "next/image";
import ViewedBadge from "@/components/ViewedBadge";

interface Props {
  episode: Episode;
  charactersImages?: CharactersImages;
  size?: "md" | "sm";
}
const EpisodeCard: FC<Props> = ({ episode, charactersImages, size = "md" }) => {
  const isMD = size === "md";
  return (
    <Card
      size={size}
      minW={isMD ? 340 : 300}
      maxW={isMD ? 340 : 300}
      h={isMD ? "auto" : 350}
      bgColor={useColorModeValue("gray.50", "gray.700")}
    >
      <CardBody>
        <Flex
          position="relative"
          w={isMD ? 300 : 276}
          h={200}
          bgColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Image
            style={{ objectFit: "contain" }}
            fill
            priority
            src="/images/noImg.jpg"
            alt={episode.name}
            sizes={isMD ? "50vw" : "10vw"}
          />
        </Flex>
        <Stack mt={4}>
          <Heading
            size={size}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW={isMD ? 300 : 276}
          >
            {episode.name}
          </Heading>
          <ViewedBadge page="episode" id={episode.id} />
          {isMD && (
            <>
              <Text>{episode.episode}</Text>
              <CharacterImageList
                characters={episode.characters}
                charactersImages={charactersImages}
              />
            </>
          )}
        </Stack>
      </CardBody>
      <CardFooter>
        <Link href={`/episode/${episode.id}`}>
          <Button>Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EpisodeCard;
