import { createContext, useContext } from "react";
import { DogContextType } from "./types";
export const DogContext = createContext<DogContextType | undefined>(undefined);

export const useDogContext = () => {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error("useDogContext must be used within a DogContextProvider");
  }
  return context;
};

//this should not be seen in other branches.s
