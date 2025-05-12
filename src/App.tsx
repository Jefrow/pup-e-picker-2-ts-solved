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
    previousDogs: () => void
  ) => {
    setIsLoading(true);
    updateUI();

    return request
      .then(() => toast.success(successMessage))
      .catch((error) => {
        previousDogs();
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const createDog = (dog: Omit<Dog, "id">): Promise<unknown> => {
    const prevState = [...allDogs];
    const tempId = `temp-${Date.now()}`;
    const tempDog = { ...dog, isFavorite: false, id: tempId };

    return handleRequest(
      () => setAllDogs([...allDogs, tempDog]),
      Requests.postDog({ ...dog, isFavorite: false }).then((savedDog) => {
        setAllDogs((dogs) => dogs.map((d) => (d.id === tempId ? savedDog : d)));
      }),
      "You have created a dog.",
      () => setAllDogs(prevState)
    );
  };

  const deleteDog = (dog: Dog): Promise<unknown> => {
    const prevState = [...allDogs];
    const deletedDog: Dog[] = allDogs.filter((d) => d.id !== dog.id);

    return handleRequest(
      () => setAllDogs(deletedDog),
      Requests.deleteDogRequest(dog),
      "You have deleted a dog",
      () => setAllDogs(prevState)
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
      () => setAllDogs(prevState)
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
