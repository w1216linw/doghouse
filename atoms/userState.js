import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: false,
});

export const userAccount = atom({
  key: "userAccount",
  default: {},
});

export const likedDogsState = atom({
  key: "likedDogsState",
  default: [],
});

export const matchedDogState = atom({
  key: "matchedDogState",
  default: "",
});
