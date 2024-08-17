import { useSearchStore } from "@/store/searchStore";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useEffect } from "react";

interface Props {
  delay?: number;
}

const SearchInput: FC<Props> = ({ delay = 300 }) => {
  const { searchValue, setSearchValue, fetchItems, setFocus } =
    useSearchStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchItems();
    }, delay);
    return () => clearTimeout(timer);
  }, [searchValue, delay, fetchItems]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
  };

  return (
    <InputGroup borderRadius={5} minWidth={300}>
      <Input
        value={searchValue}
        onFocus={() => setFocus(true)}
        onChange={handleInputChange}
        type="text"
        placeholder="Characters, locations, episodes"
        border="1px solid"
        borderColor={useColorModeValue("gray.400", "gray.700")}
      />
      <InputRightElement>
        <Search2Icon color={useColorModeValue("gray.400", "gray.700")} />
      </InputRightElement>
    </InputGroup>
  );
};

export default observer(SearchInput);
