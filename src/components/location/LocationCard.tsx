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
  size?: "md" | "sm";
}

const LocationCard: React.FC<CardProps> = ({
  location,
  charactersImages,
  size = "md",
}) => {
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
            alt={location.name}
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
            {location.name}
          </Heading>
          <ViewedBadge page="location" id={location.id} />
          {isMD && (
            <>
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
            </>
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
