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
    refetchData();
  }, []);

  const rollbackDogs = (previousState: Dog[]) => {
    setAllDogs(previousState);
  };

  const createDog = (dog: Omit<Dog, "id">): Promise<unknown> => {
    const prevState = [...allDogs];
    const newDog: Dog = { ...dog, id: Date.now(), isFavorite: false };

    setAllDogs([...allDogs, newDog]);

    return Requests.postDog(newDog)
      .then(() => toast.success("You have Created a dog!"))
      .catch(() => {
        rollbackDogs(prevState);
        toast.error("Failed to create a new dog");
      });
  };

  const deleteDog = (dog: Dog): Promise<unknown> => {
    const prevState = [...allDogs];
    const deletedDog: Dog[] = allDogs.filter((d) => d.id !== dog.id);

    setAllDogs(deletedDog);

    return Requests.deleteDogRequest(dog)
      .then(() => toast.success("Deleted a dog!"))
      .catch(() => {
        rollbackDogs(prevState);
        toast.error("Failed to delete a new dog");
      });
  };

  const updateDog = (dog: Pick<Dog, "id" | "isFavorite">): Promise<unknown> => {
    const prevState = [...allDogs];
    const updateDogs = allDogs.map((d) =>
      d.id === dog.id ? { ...d, isFavorite: dog.isFavorite } : d
    );

    setAllDogs(updateDogs);
    return Requests.patchFavoriteForDog(dog)
      .then(() =>
        toast.success(
          dog.isFavorite ? "You have liked a dog" : "You have unliked a dog"
        )
      )
      .catch(() => {
        rollbackDogs(prevState);
        toast.error("Failed to update Dog");
      });
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
