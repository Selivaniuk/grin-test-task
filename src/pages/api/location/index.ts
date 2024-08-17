import { BaseFilter, fetchData, Info, ResourceBase } from "../index";
const url = "/location";

export interface Location extends ResourceBase {
  type: string;
  dimension: string;
  residents: string[];
}

export interface LocationFilter extends BaseFilter {
  dimension?: string | null;
}

export type Locations = Info<Location[]>;
export const getLocations = async (params?: LocationFilter) => {
  const data = await fetchData<Locations>(url, { params });
  return data;
};

export const getLocation = async <T extends number | number[]>(id: T) => {
  const data = await fetchData<T extends number ? Location : Location[]>(
    `${url}/${id.toString()}`
  );
  return data;
};
