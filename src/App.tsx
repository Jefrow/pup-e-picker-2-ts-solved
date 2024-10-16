import { Section } from "./Components/Section";
import { createContext, useEffect, useState, useContext } from "react";
import { Requests } from "./api";
import { toast } from "react-hot-toast";
import { Dog, TactiveTab } from "./types";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";

type DogContextType = {
  allDogs: Dog[];
  activeTab: TactiveTab;
  isLoading: boolean;
  setActiveTab: (tab: TactiveTab) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<unknown>;
  deleteDog: (dog: Dog) => Promise<unknown>;
  updateDog: (dog: Pick<Dog, "id" | "isFavorite">) => Promise<unknown>;
  dogList: Record<TactiveTab, Dog[]>;
};

const DogContext = createContext<DogContextType | undefined>(undefined);

export const useDogContext = () => {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error("useDogContext must be used within a DogProvider");
  }
  return context;
};

export function App() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TactiveTab>("all");
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    return Requests.getAllDogs().then((dog) => {
      setAllDogs(dog);
    });
  };

  const handleRequest = (request: Promise<unknown>, successMessage: string) => {
    setIsLoading(true);
    return request
      .then(() => refetchData())
      .then(() => toast.success(successMessage))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchData();
  }, []);

  const createDog = (dog: Omit<Dog, "id">): Promise<unknown> => {
    return handleRequest(Requests.postDog(dog), "You have created a dog!");
  };

  const deleteDog = (dog: Dog): Promise<unknown> => {
    return handleRequest(
      Requests.deleteDogRequest(dog),
      "You have deleted a dog!"
    );
  };

  const updateDog = (dog: Pick<Dog, "id" | "isFavorite">): Promise<unknown> => {
    return handleRequest(
      Requests.patchFavoriteForDog(dog),
      dog.isFavorite ? "You have liked a dog" : "You have un-liked a dog"
    );
  };

  const favorited = allDogs.filter((dog) => dog.isFavorite);
  const unfavorited = allDogs.filter((dog) => !dog.isFavorite);

  const dogList: Record<string, Dog[]> = {
    all: allDogs,
    favorited,
    unfavorited,
    create: [],
  };

  return (
    <DogContext.Provider
      value={{
        allDogs,
        activeTab,
        isLoading,
        setActiveTab,
        createDog,
        deleteDog,
        updateDog,
        dogList,
      }}
    >
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <Section label={"Dogs: "}>
          {activeTab === "create" ? <CreateDogForm /> : <Dogs />}
        </Section>
      </div>
    </DogContext.Provider>
  );
}
