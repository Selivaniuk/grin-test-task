import type { NextApiRequest, NextApiResponse } from "next";
import { fetchData, Info, ResourceBase } from "../index";

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

export interface CharacterFilter {
  name?: string | null;
  type?: string | null;
  species?: string | null;
  status?: CharacterStatus | null;
  gender?: CharacterGender | null;
  page?: number | null;
}

export const characterStatuses: CharacterStatus[] = [
  "Alive",
  "Dead",
  "unknown",
];
export const characterGenders: CharacterGender[] = [
  "Male",
  "Female",
  "Genderless",
  "unknown",
];

export type Characters = Info<Character[]>;
export const getCharacters = async (params?: CharacterFilter) => {
  const data = await fetchData<Characters>(url, {
    params,
  });
  return data;
};

export const getCharactersByIds = async (ids: string[]) => {
  const data = await fetchData<Character[] | Character>(
    `${url}/${ids.join(",")}`
  );
  return data;
};
