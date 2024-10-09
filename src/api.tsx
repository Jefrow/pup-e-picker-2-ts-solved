import { Dog } from "./types";
export const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  // fill out method
  return fetch(`${baseUrl}/dogs`).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with status ${res.status}`);
    }
    return res.json();
  });
};

const postDog = (dog: Omit<Dog, "id">) => {
  // fill out method
};
const deleteDogRequest = () => {
  // fill out method
};

const patchFavoriteForDog = () => {
  // fill out method
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
