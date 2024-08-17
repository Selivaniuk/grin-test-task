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
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import CharacterImageList from "@/components/CharactersImages";

interface Props {
  isLoading?: boolean;
}
const EpisodeCardSkeleton: FC<Props> = ({ isLoading }) => {
  return (
    <Card size="md" bgColor={useColorModeValue("gray.50", "gray.700")}>
      <CardBody>
        <Stack>
          <Skeleton isLoaded={!isLoading}>
            <Box h={200} />
          </Skeleton>
          <Stack mt={4}>
            <Skeleton isLoaded={!isLoading}>
              <Heading size="md">Loading...</Heading>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Text>Loading...</Text>
            </Skeleton>
          </Stack>
          <CharacterImageList characters={[]} isLoading={isLoading} />
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

export default EpisodeCardSkeleton;
