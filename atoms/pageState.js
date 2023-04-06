import { atom } from "recoil";

export const pageState = atom({
  key: "pageState",
  default: {},
});

export const isSearchedState = atom({
  key: "isSearchedState",
  default: false,
});

export const errorState = atom({
  key: "errorState",
  default: "",
});
