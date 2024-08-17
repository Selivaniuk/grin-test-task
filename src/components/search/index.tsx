import SearchProvider from "@/store/searchStore";
import SearchWrapper from "./SearchWrapper";

const Search = () => {
  return (
    <SearchProvider>
      <SearchWrapper />
    </SearchProvider>
  );
};

export default Search;
