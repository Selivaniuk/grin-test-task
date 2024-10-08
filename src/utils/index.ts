import { Character, CharacterFilter } from "@/pages/api/character";
import { Episodes } from "@/pages/api/episode";
import { Locations } from "@/pages/api/location";

export const validateQueryParams = <T>(
  value: string[] | string | undefined,
  validValues: T[]
): T | null => {
  const v = Array.isArray(value) ? value[0] : value;
  return v && validValues.includes(v as T) ? (v as T) : null;
};

type ValueOf<T> = T[keyof T];
type Entries<T> = [keyof T, ValueOf<T>][];

export const generateQueryParams = (filter: CharacterFilter) => {
  const params = [];
  const entries = Object.entries(filter) as Entries<CharacterFilter>;
  for (const [key, value] of entries) {
    if (value !== undefined && value !== null && value !== "") {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  if (params.length === 0) {
    return "";
  }
  return `?${params.join("&")}`;
};

export const getIdInUrl = (url: string): number => {
  const parts = url.split("/");
  return Number(parts[parts.length - 1]);
};

export const getCharactersIdsInLocations = (
  locations: Locations["results"]
) => {
  if (!locations) return null;
  return [
    ...new Set(
      locations.flatMap((ep) =>
        ep.residents.slice(0, 4).map((url) => getIdInUrl(url))
      )
    ),
  ];
};

export const getCharactersIdsInEpisodes = (episodes: Episodes["results"]) => {
  if (!episodes) return null;
  return [
    ...new Set(
      episodes.flatMap((ep) =>
        ep.characters.slice(0, 4).map((url) => {
          const parts = url.split("/");
          const charactersId = Number(parts[parts.length - 1]);
          return charactersId;
        })
      )
    ),
  ];
};

export type CharactersImages = Record<string, { url: string; name: string }>;

export const charactersImagesFromCharacters = (
  characters: Character[] | Character
): CharactersImages => {
  const charactersArray = Array.isArray(characters) ? characters : [characters];
  if (charactersArray.length === 0) {
    return {};
  }

  return Object.fromEntries(
    charactersArray.map((character) => {
      return [character.id, { name: character.name, url: character.image }];
    })
  );
};

export const randomInt = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const shuffle = <T>(array: T[]): T[] => {
  const res = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
};
