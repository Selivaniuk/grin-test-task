import { BaseFilter, fetchData, Info, ResourceBase } from "../index";
const url = "/episode";

export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: string[];
}

export interface EpisodeFilter extends Pick<BaseFilter, "name" | "page"> {
  episode?: string;
}

export type Episodes = Info<Episode[]>;
export const getEpisodes = async (params?: EpisodeFilter) => {
  const data = await fetchData<Episodes>(url, { params });
  return data;
};

export const getEpisode = async <T extends number | number[]>(id: T) => {
  const data = await fetchData<T extends number ? Episode : Episode[]>(
    `${url}/${id}`
  );
  return data;
};
