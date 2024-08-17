import { enableStaticRendering } from "mobx-react-lite";

export const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

let clientStores: { [key: string]: any } = {};

export const initStore = <T>(Store: new () => T, storeKey: string): T => {
  const store: T = clientStores[storeKey] ?? new Store();
  if (isServer) return store;
  if (!clientStores[storeKey]) clientStores[storeKey] = store;
  return store;
};
