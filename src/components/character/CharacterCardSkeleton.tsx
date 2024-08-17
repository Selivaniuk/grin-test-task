import {
  Badge,
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

const CharacterCardSkeleton: React.FC<CardProps> = ({ isLoading }) => {
  return (
    <Card size="sm">
      <CardBody>
        <Skeleton isLoaded={!isLoading}>
          <Box h={300} />
        </Skeleton>
        <Stack mt={4}>
          <Skeleton isLoaded={!isLoading}>
            <Heading size="md">Loading...</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Badge width="max-content">Loading...</Badge>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Text>Loading...</Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Text>Loading...</Text>
          </Skeleton>
        </Stack>
      </CardBody>
      <CardFooter>
        <Skeleton isLoaded={!isLoading}>
          <Button variant="solid">Details</Button>
        </Skeleton>
      </CardFooter>
    </Card>
  );
};

export default CharacterCardSkeleton;
