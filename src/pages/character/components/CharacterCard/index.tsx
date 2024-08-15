import { Character, CharacterStatus } from "@/pages/api/character";
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
import Image from "next/image";

interface CardProps {
  character: Character;
}

const getStatusColor = (status: CharacterStatus) => {
  switch (status) {
    case "Alive":
      return "green";
    case "Dead":
      return "red";
    case "unknown":
      return "yellow";
  }
};
const CharacterCard: React.FC<CardProps> = ({ character }) => {
  const statusColor = getStatusColor(character.status);
  return (
    <Card size="sm">
      <CardBody>
        <Image
          width={300}
          height={300}
          src={character.image}
          alt={character.name}
        />
        <Stack mt={4}>
          <Heading size="md">{character.name}</Heading>
          <Badge width="max-content" colorScheme={statusColor}>
            {character.status}
          </Badge>
          <HStack>
            <Text>Gender:</Text>
            <Text>{character.gender}</Text>
          </HStack>
          <HStack>
            <Text>Species:</Text>
            <Text>{character.species}</Text>
          </HStack>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button variant="solid">Details</Button>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
