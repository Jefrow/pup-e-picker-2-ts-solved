import { Dog } from "./types";
import { toast } from "react-hot-toast";

export const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  return fetch(`${baseUrl}/dogs`).then((res) => {
    if (!res.ok) {
      toast.error(`HTTP request failed with status ${res.status}!`);
    }
    return res.json();
  });
};

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      toast.error(`HTTP request failed with status ${res.status}!`);
    }
    return res.json();
  });
};

const deleteDogRequest = (dog: Dog) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      toast.error(`HTTP request failed with status ${res.status}!`);
    }
    return res.json();
  });
};

const patchFavoriteForDog = (dog: Pick<Dog, "id" | "isFavorite">) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    body: JSON.stringify(dog),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      toast.error(`HTTP request failed with status ${res.status}!`);
    }
    return res.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
