import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 5000,
});

export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface Info<T> {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results?: T;
}

export const fetchData = async <T>(
  url: string,
  options: AxiosRequestConfig = {}
) => {
  try {
    const response = await axiosInstance<T>(url, options);
    return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("Could not get data");
  }
};
