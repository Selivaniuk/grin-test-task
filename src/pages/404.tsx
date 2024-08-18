import {
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Heading
        display="inline-block"
        size="2xl"
        bgGradient={`linear(to-r, ${useColorModeValue(
          "teal.400",
          "teal.300"
        )}, teal.600)`}
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px">Page Not Found</Text>
      <Text color={useColorModeValue("gray.500", "gray.400")}>
        The page you&apos;re looking for does not seem to exist.
      </Text>

      <Link style={{ marginTop: 16 }} href={"/"}>
        <Button
          colorScheme="teal"
          bgGradient={useColorModeValue(
            "linear(to-r, teal.400, teal.500, teal.600)",
            "linear(to-r, teal.300, teal.400, teal.500)"
          )}
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Link>
    </Stack>
  );
};
export default Custom404;
