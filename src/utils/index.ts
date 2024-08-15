import { CharacterFilter } from "@/pages/api/character";

export const generateQueryParams = (filter: CharacterFilter) => {
  const params = [];
  for (const [key, value] of Object.entries(filter)) {
    if (value !== undefined && value !== null && value !== "") {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  if (params.length === 0) {
    return "";
  }
  return `?${params.join("&")}`;
};
