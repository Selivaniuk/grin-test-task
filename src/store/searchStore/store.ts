import { Character, getCharacters } from "@/pages/api/character";
import { getLocations, Location } from "@/pages/api/location";
import { Episode, getEpisodes } from "@/pages/api/episode";
import { action, makeAutoObservable, runInAction } from "mobx";

class SearchStore {
  searchValue: string = "";
  isFocus: boolean = false;
  characters: Character[] = [];
  locations: Location[] = [];
  episodes: Episode[] = [];

  constructor() {
    makeAutoObservable(this, {
      fetchInitialItems: action,
      fetchItems: action,
    });

    this.searchValue = "";
    this.isFocus = false;
    this.fetchInitialItems();
  }

  fetchInitialItems = async () => {
    const characters = await getCharacters();

    runInAction(() => {
      this.characters = characters.results ?? [];
      this.locations = [];
      this.episodes = [];
    });
  };

  fetchItems = async () => {
    if (this.searchValue === "") {
      return this.fetchInitialItems();
    }
    const [characters, locations, episodes] = await Promise.all([
      getCharacters({ name: this.searchValue })
        .then((e) => e.results)
        .catch(() => {
          return undefined;
        }),
      getLocations({ name: this.searchValue })
        .then((e) => e.results)
        .catch(() => {
          return undefined;
        }),
      getEpisodes({ name: this.searchValue })
        .then((e) => e.results)
        .catch(() => {
          return undefined;
        }),
    ]);

    runInAction(() => {
      this.characters = characters ?? [];
      this.locations = locations ?? [];
      this.episodes = episodes ?? [];
    });
  };

  setSearchValue = (value: string) => {
    this.searchValue = value;
  };

  setFocus = (value: boolean) => {
    this.isFocus = value;
  };

  close = () => {
    this.searchValue = "";
    this.isFocus = false;
    this.fetchInitialItems();
  };
}

export default SearchStore;
