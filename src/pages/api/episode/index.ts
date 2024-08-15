import { CharacterFilter } from "../character";
import { fetchData, Info, ResourceBase } from "../index";
const url = "/episode";

export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: string[];
}

export interface EpisodeFilter extends Pick<CharacterFilter, "name" | "page"> {
  episode?: string;
}

export type Episodes = Info<Episode[]>;
export const getEpisodes = async (params?: EpisodeFilter) => {
  const data = await fetchData<Episodes>(url, { params });
  return data;
};
