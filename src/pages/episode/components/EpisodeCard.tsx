import { Episode } from "@/pages/api/episode";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import EpisodeCardCharacters, {
  CharactersImages,
} from "./EpisodeCardCharacters";

interface Props {
  episode: Episode;
  charactersImages?: CharactersImages;
}
const EpisodeCard: FC<Props> = ({ episode, charactersImages }) => {
  return (
    <Card size="sm">
      <CardBody>
        <Stack mt={4}>
          <Heading size="md">{episode.name}</Heading>
          <Text>{episode.episode}</Text>
          <EpisodeCardCharacters
            characters={episode.characters}
            charactersImages={charactersImages}
          />
          <HStack>
            <Text>Air Date:</Text>
            <Text>{episode.air_date}</Text>
          </HStack>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button variant="solid">Details</Button>
      </CardFooter>
    </Card>
  );
};

export default EpisodeCard;
