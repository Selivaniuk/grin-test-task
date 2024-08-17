import { createContext, FC, PropsWithChildren, useContext } from "react";
import { initStore } from "../index";
import viewedPagesStore from "./store";

const store = initStore(viewedPagesStore, "viewedPages");

export const ViewedPagesContext = createContext(store);

export const useViewedPagesStore = () => {
  const context = useContext(ViewedPagesContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your component with ViewedPagesProvider"
    );
  }
  return context;
};

export const ViewedPagesProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ViewedPagesContext.Provider value={store}>
      {children}
    </ViewedPagesContext.Provider>
  );
};

export default ViewedPagesProvider;
