import CharacterImageList from "@/components/CharactersImages";
import ViewedBadge from "@/components/ViewedBadge";
import { Location } from "@/pages/api/location";
import { CharactersImages } from "@/utils";
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
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  location: Location;
  charactersImages?: CharactersImages;
}

const LocationCard: React.FC<CardProps> = ({ location, charactersImages }) => {
  return (
    <Card size="sm">
      <CardBody>
        <Flex
          w={"100%"}
          h={200}
          bgColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Image
            style={{
              objectFit: "contain",
              width: "100%",
            }}
            width={360}
            height={200}
            src="/images/noImg.jpg"
            alt={location.name}
          />
        </Flex>
        <Stack mt={4}>
          <HStack>
            <Heading size="md">{location.name}</Heading>
            <ViewedBadge page="location" id={location.id} />
          </HStack>
          {location.dimension && (
            <HStack>
              <Text>Dimension:</Text>
              <Text>{location.dimension}</Text>
            </HStack>
          )}
          {location.type && (
            <HStack>
              <Text>Type:</Text>
              <Text>{location.type}</Text>
            </HStack>
          )}

          <CharacterImageList
            characters={location.residents}
            charactersImages={charactersImages}
          />
        </Stack>
      </CardBody>
      <CardFooter>
        <Link href={`/location/${location.id}`}>
          <Button variant="solid">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
