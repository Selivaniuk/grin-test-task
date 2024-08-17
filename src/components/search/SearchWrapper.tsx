import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import { useSearchStore } from "@/store/searchStore";
import SearchList from "./SearchList";

const SearchWrapper: FC = () => {
  const parentBox = useRef<HTMLDivElement>(null);
  const { close, isFocus } = useSearchStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (parentBox.current && target && !parentBox.current.contains(target)) {
        close();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, parentBox]);

  return (
    <Box ref={parentBox} position="relative">
      <SearchInput />
      {isFocus && <SearchList />}
    </Box>
  );
};

export default observer(SearchWrapper);
