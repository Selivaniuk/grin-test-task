import { enableStaticRendering } from "mobx-react-lite";

export const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

const clientStores: { [key: string]: object } = {};

export const initStore = <T>(Store: new () => T, storeKey: string): T => {
  let clientStore = clientStores[storeKey] as T;
  const store: T = clientStore ?? new Store();
  if (isServer) return store;
  if (!clientStore) clientStore = store;
  return store;
};
