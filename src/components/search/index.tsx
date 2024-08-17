import SearchProvider from "@/store/searchStore/provider";
import SearchWrapper from "./SearchWrapper";

const Search = () => {
  return (
    <SearchProvider>
      <SearchWrapper />
    </SearchProvider>
  );
};

export default Search;
