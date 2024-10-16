import { Dog } from './types';
export const baseUrl = 'http://localhost:3000';

const getAllDogs = () => {
  // fill out method
  return fetch(`${baseUrl}/dogs`).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with status ${res.status}`);
    }
    return res.json();
  });
};

const postDog = (dog: Omit<Dog, 'id'>) => {
  // fill out method
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with status ${res.status}!`);
    }
    return res.json();
  });
};
const deleteDogRequest = (dog: Dog) => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with status ${res.status}!`);
    }
    return res.json();
  });
};

const patchFavoriteForDog = (dog: Pick<Dog, 'id' | 'isFavorite'>) => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    body: JSON.stringify(dog),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed with status ${res.status}!`);
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
