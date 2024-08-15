import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";

const SearchInput = () => {
  return (
    <InputGroup borderRadius={5} minWidth={300}>
      <Input
        type="text"
        placeholder="Characters, locations, episodes"
        border="1px solid"
        borderColor={useColorModeValue("gray.400", "gray.700")}
      />
      <InputRightElement>
        <Search2Icon
          color={useColorModeValue("gray.400", "gray.700")}
          //   cursor="pointer"
          //   _hover={{
          //     color: useColorModeValue("gray.700", "gray.400"),
          //   }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
