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
  episode?: Episode;
  charactersImages?: CharactersImages;
  size?: "md" | "sm";
}
const EpisodeCard: FC<Props> = ({ episode, charactersImages, size = "md" }) => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  if (!episode) {
    return null;
  }
  return (
    <Card size={size} minWidth={"fit-content"}>
      <CardBody>
        <Flex w={"100%"} h={size === "md" ? 200 : 150} bgColor={bgColor}>
          <Image
            style={{
              objectFit: "contain",
              width: "100%",
              height: "auto",
            }}
            width={size === "md" ? 360 : 270}
            height={size === "md" ? 200 : 150}
            src="/images/noImg.jpg"
            alt={episode.name}
          />
        </Flex>
        <Stack mt={4}>
          <HStack>
            <Heading size="md">{episode.name}</Heading>
            <ViewedBadge page="episode" id={episode.id} />
          </HStack>
          {size === "md" && (
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
