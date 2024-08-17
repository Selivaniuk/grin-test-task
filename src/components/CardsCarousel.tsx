import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FC, PropsWithChildren, useRef } from "react";

const CardsCarousel: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      position="relative"
      width="100%"
    >
      {/* <Box
        left={0}
        zIndex={1}
        position="absolute"
        w={200}
        h="100%"
        bgGradient={`linear(to-r, ${useColorModeValue(
          "gray.200",
          "gray.800"
        )}, transparent)`}
      /> */}
      <IconButton
        aria-label="Scroll Left"
        onClick={scrollLeft}
        icon={
          <ChevronLeftIcon
            color={useColorModeValue("gray.800", "gray.200")}
            h={6}
            w={6}
          />
        }
        position="absolute"
        left={-6}
        zIndex={1}
        bg={useColorModeValue("gray.200", "gray.800")}
        boxShadow="md"
        _hover={{ bg: useColorModeValue("gray.300", "gray.700") }}
        size="lg"
        borderRadius="full"
      />

      <Flex
        ref={ref}
        gap={4}
        overflowX="auto"
        alignItems="center"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {children}
      </Flex>
      {/* <Box
        right={0}
        zIndex={1}
        position="absolute"
        w={200}
        h="100%"
        bgGradient={`linear(to-l, ${useColorModeValue(
          "gray.200",
          "gray.800"
        )}, transparent)`}
      /> */}
      <IconButton
        aria-label="Scroll Right"
        onClick={scrollRight}
        icon={
          <ChevronRightIcon
            color={useColorModeValue("gray.800", "gray.200")}
            h={6}
            w={6}
          />
        }
        position="absolute"
        right={-6}
        zIndex={1}
        bg={useColorModeValue("gray.200", "gray.800")}
        boxShadow="md"
        _hover={{ bg: useColorModeValue("gray.300", "gray.700") }}
        size="lg"
        borderRadius="full"
      />
    </Flex>
  );
};

export default CardsCarousel;
