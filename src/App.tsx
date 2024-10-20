import { Section } from "./Components/Section";
import { useEffect, useState } from "react";
import { Requests } from "./api";
import { toast } from "react-hot-toast";
import { Dog, TactiveTab } from "./types";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { DogContext } from "./context";

export function App() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TactiveTab>("all");
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    return Requests.getAllDogs().then((dog) => {
      setAllDogs(dog as Dog[]);
    });
  };

  useEffect(() => {
    refetchData().catch(() => toast.error("failed to fetch dogs"));
  }, []);

  const handleRequest = (
    updateUI: () => void,
    request: Promise<unknown>,
    successMessage: string,
    previousDogs: () => void,
    errorMessage: string
  ) => {
    setIsLoading(true);
    updateUI();

    return request
      .then(() => toast.success(successMessage))
      .catch(() => {
        previousDogs();
        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const createDog = (dog: Omit<Dog, "id">): Promise<unknown> => {
    const prevState = [...allDogs];
    const newDog: Dog = { ...dog, id: Date.now(), isFavorite: false };

    return handleRequest(
      () => setAllDogs([...allDogs, newDog]),
      Requests.postDog(newDog),
      "You have created a dog.",
      () => setAllDogs(prevState),
      "Failed to create dog"
    );
  };

  const deleteDog = (dog: Dog): Promise<unknown> => {
    const prevState = [...allDogs];
    const deletedDog: Dog[] = allDogs.filter((d) => d.id !== dog.id);

    return handleRequest(
      () => setAllDogs(deletedDog),
      Requests.deleteDogRequest(dog),
      "You have deleted a dog",
      () => setAllDogs(prevState),
      "Failed to delete dog"
    );
  };

  const updateDog = (dog: Pick<Dog, "id" | "isFavorite">): Promise<unknown> => {
    const prevState = [...allDogs];
    const updateDogs = allDogs.map((d) =>
      d.id === dog.id ? { ...d, isFavorite: dog.isFavorite } : d
    );

    return handleRequest(
      () => setAllDogs(updateDogs),
      Requests.patchFavoriteForDog(dog),
      dog.isFavorite ? "You have liked a dog" : "You have un-liked a dog",
      () => setAllDogs(prevState),
      dog.isFavorite ? "Failed to un-like a dog" : "Failed to like a dog"
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
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
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
        <Section label={"Dogs: "}>
          {activeTab === "create" ? <CreateDogForm /> : <Dogs />}
        </Section>
      </DogContext.Provider>
    </div>
  );
}
