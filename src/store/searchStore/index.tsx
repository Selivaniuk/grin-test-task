import { createContext, FC, PropsWithChildren, useContext } from "react";
import { initStore } from "../index";
import SearchStore from "./store";

const store = initStore(SearchStore, "search");

export const SearchContext = createContext(store);

export const useSearchStore = () => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your component with SearchProvider"
    );
  }
  return context;
};

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SearchContext.Provider value={store}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
