import { BaseFilter, fetchData, Info, ResourceBase } from "../index";

const url = "/character";

export interface CharacterLocation {
  name: string;
  url: string;
}

export type CharacterStatus = "Dead" | "Alive" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface Character extends ResourceBase {
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface CharacterFilter extends BaseFilter {
  species?: string | null;
  status?: CharacterStatus | null;
  gender?: CharacterGender | null;
}

export type Characters = Info<Character[]>;
export const getCharacters = async (params?: CharacterFilter) => {
  const data = await fetchData<Characters>(url, {
    params,
  });
  return data;
};

export const getCharacter = async <T extends number | number[]>(id: T) => {
  const data = await fetchData<T extends number ? Character : Character[]>(
    `${url}/${id.toString()}`
  );
  return data;
};
