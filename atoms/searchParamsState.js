import { atom } from "recoil";

export const selectedBreedsState = atom({
  key: "selectedBreedsState",
  default: [],
});

export const selectedAgeState = atom({
  key: "selectedAgeState",
  default: { min: 0, max: 20 },
});

export const selectedZipCodesState = atom({
  key: "selectedZipCodesState",
  default: [],
});

export const selectedSortingState = atom({
  key: "selectedSortingState",
  default: "",
});
