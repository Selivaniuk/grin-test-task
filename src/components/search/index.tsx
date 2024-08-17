import { Character, getCharacters } from "@/pages/api/character";
import { Episode, getEpisodes } from "@/pages/api/episode";
import { Location, getLocations } from "@/pages/api/location";
import SearchInput from "./SearchInput";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchList from "./SearchList";

const Search = () => {
  const parentBox = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [characters, setCharacters] = useState<Character[] | undefined>();
  const [locations, setLocations] = useState<Location[] | undefined>();
  const [episodes, setEpisodes] = useState<Episode[] | undefined>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (parentBox.current && target && !parentBox.current.contains(target)) {
        setIsFocus(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [parentBox]);

  const fetchItems = useCallback(async (name: string) => {
    if (name.length === 0) {
      const characters = await getCharacters();
      setCharacters(characters.results);
      setLocations(undefined);
      setEpisodes(undefined);
      return;
    }
    const [characters, locations, episodes] = await Promise.all([
      getCharacters({ name })
        .then((e) => e.results)
        .catch(() => {
          return undefined;
        }),
      getLocations({ name })
        .then((e) => e.results)
        .catch(() => {
          return undefined;
        }),
      getEpisodes({ name })
        .then((e) => e.results)
        .catch(() => {
          return undefined;
        }),
    ]);
    setCharacters(characters);
    setLocations(locations);
    setEpisodes(episodes);
  }, []);

  return (
    <Box ref={parentBox} position="relative">
      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onAfterChange={fetchItems}
        onFocus={() => setIsFocus(true)}
      />
      {isFocus && (
        <SearchList
          characters={characters}
          episodes={episodes}
          locations={locations}
          onItemClick={() => {
            setInputValue("");
            setIsFocus(false);
          }}
        />
      )}
    </Box>
  );
};

export default Search;
