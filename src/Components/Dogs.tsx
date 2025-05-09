import { useDogContext } from "../context";
import { DogCard } from "./DogCard";
import { toast } from "react-hot-toast";

export const Dogs = () => {
  const { dogList, isLoading, updateDog, deleteDog, activeTab } =
    useDogContext();
  const filteredDogs = dogList[activeTab] || [];
  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          dog={{
            id: dog.id,
            image: dog.image,
            description: dog.description,
            isFavorite: dog.isFavorite,
            name: dog.name,
          }}
          key={dog.id}
          onTrashIconClick={() => {
            console.log("Attempling to delete dog:", dog.id);
            deleteDog(dog).catch((err) => {
              console.error("Delete failed:", err);
              toast.error("There is no connection with the server!");
            });
          }}
          onHeartClick={() => {
            updateDog({
              id: dog.id,
              isFavorite: false,
            }).catch(() =>
              toast.error("There is no connection with the server!")
            );
          }}
          onEmptyHeartClick={() => {
            updateDog({
              id: dog.id,
              isFavorite: true,
            }).catch(() =>
              toast.error("There is no connection with the server!")
            );
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
