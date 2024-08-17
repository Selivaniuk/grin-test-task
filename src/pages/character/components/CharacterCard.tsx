import ViewedBadge from "@/components/ViewedBadge";
import { Character, CharacterStatus } from "@/pages/api/character";
import {
  Badge,
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
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  character: Character;
  size?: "md" | "sm";
}

export const getStatusColor = (status: CharacterStatus) => {
  switch (status) {
    case "Alive":
      return "green";
    case "Dead":
      return "red";
    case "unknown":
      return "yellow";
  }
};
const CharacterCard: React.FC<CardProps> = ({ character, size = "md" }) => {
  const statusColor = getStatusColor(character.status);
  return (
    <Card size={size} minWidth={"fit-content"}>
      <CardBody>
        <Flex
          w={"100%"}
          h={size === "md" ? 300 : 150}
          position="relative"
          bgColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Image
            // layout="fill"
            // objectFit="fill"
            style={{
              objectFit: "contain",
              width: "100%",
            }}
            width={size === "md" ? 300 : 150}
            height={size === "md" ? 300 : 150}
            src={character.image}
            alt={character.name}
          />
        </Flex>

        <Stack mt={4}>
          <HStack>
            <Heading size="md">{character.name}</Heading>
            <ViewedBadge page="character" id={character.id} />
          </HStack>

          {size === "md" && (
            <>
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
            </>
          )}
        </Stack>
      </CardBody>
      <CardFooter>
        <Link href={`/character/${character.id}`}>
          <Button variant="solid">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
