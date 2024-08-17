import { enableStaticRendering } from "mobx-react-lite";
import SearchStore from "./store";

const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

let clientStore: SearchStore;
export const initSearchStore = () => {
  const store = clientStore ?? new SearchStore();
  if (isServer) return store;
  if (!clientStore) clientStore = store;
  return store;
};
