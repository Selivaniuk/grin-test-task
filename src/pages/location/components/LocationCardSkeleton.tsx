import CharacterImageList from "@/components/CharactersImages";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

interface CardProps {
  isLoading?: boolean;
}

const LocationCardSkeleton: React.FC<CardProps> = ({ isLoading }) => {
  return (
    <Card size="sm">
      <CardBody>
        <Skeleton>
          <Box h={200} />
        </Skeleton>

        <Stack mt={4}>
          <Skeleton isLoaded={!isLoading}>
            <Heading size="md">Loading...</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Text>Loading...</Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Text>Loading...</Text>
          </Skeleton>
          <CharacterImageList characters={[]} isLoading={isLoading} />
        </Stack>
      </CardBody>
      <CardFooter>
        <Skeleton isLoaded={isLoading}>
          <Button variant="solid">Details</Button>
        </Skeleton>
      </CardFooter>
    </Card>
  );
};

export default LocationCardSkeleton;
