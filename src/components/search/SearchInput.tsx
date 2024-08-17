import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  onAfterChange?: (value: string) => void;
  onFocus?: () => void;
  delay?: number;
}

const SearchInput: FC<Props> = ({
  value,
  onChange,
  onAfterChange,
  delay = 300,
  onFocus,
}) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  useEffect(() => {
    onChange?.(inputValue);
    const timer = setTimeout(() => {
      onAfterChange?.(inputValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue, delay, onAfterChange]);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value ?? "");
    }
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <InputGroup borderRadius={5} minWidth={300}>
      <Input
        value={inputValue}
        onFocus={onFocus}
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

export default SearchInput;
