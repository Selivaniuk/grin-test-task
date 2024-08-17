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
  const isMD = size === "md";
  return (
    <Card
      size={size}
      minW={isMD ? 340 : 240}
      maxW={isMD ? 340 : 240}
      bgColor={useColorModeValue("gray.50", "gray.700")}
    >
      <CardBody>
        <Flex
          w={isMD ? 300 : 216}
          h={isMD ? 300 : 200}
          position="relative"
          bgColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Image
            fill
            priority
            style={{ objectFit: "contain" }}
            src={character.image}
            alt={character.name}
            sizes={isMD ? "50vw" : "10vw"}
          />
        </Flex>

        <Stack mt={4}>
          <Heading
            size={size}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW={isMD ? 300 : 216}
          >
            {character.name}
          </Heading>
          <HStack>
            <Badge width="max-content" colorScheme={statusColor}>
              {character.status}
            </Badge>
            <ViewedBadge page="character" id={character.id} />
          </HStack>

          {isMD && (
            <>
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
