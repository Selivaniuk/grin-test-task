import { Character, getCharacters } from "@/pages/api/character";
import { getLocations, Location } from "@/pages/api/location";
import { Episode, getEpisodes } from "@/pages/api/episode";
import { action, makeAutoObservable, runInAction } from "mobx";
import { isServer } from "..";

const LOCAL_STORAGE_KEY = "viewedPages";

export type ViewedPageKey = "character" | "location" | "episode";

class viewedPagesStore {
  viewedPages: Record<ViewedPageKey, number[]> = {
    character: [],
    episode: [],
    location: [],
  };

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  isViewedPage = (page: ViewedPageKey, id: number) => {
    if (!Object.hasOwn(this.viewedPages, page)) return false;
    return this.viewedPages[page].includes(id);
  };

  addPage = (page: ViewedPageKey, id: number) => {
    if (this.isViewedPage(page, id) || isServer) return;

    this.viewedPages[page].push(id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.viewedPages));
  };

  loadFromLocalStorage = () => {
    if (isServer) return;
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return;
    this.viewedPages = JSON.parse(data);
  };
}

export default viewedPagesStore;
