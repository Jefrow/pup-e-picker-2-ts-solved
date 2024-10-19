// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { useDogContext } from '../context';
import { DogCard } from './DogCard';
import { toast } from 'react-hot-toast';

export const Dogs = () =>
  // no props allowed
  {
    const { dogList, isLoading, updateDog, deleteDog, activeTab } =
      useDogContext();
    const filteredDogs = dogList[activeTab] || [];
    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
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
              deleteDog(dog).catch(() =>
                toast.error('There is no connection with the server!')
              );
            }}
            onHeartClick={() => {
              updateDog({
                id: dog.id,
                isFavorite: false,
              }).catch(() =>
                toast.error('There is no connection with the server!')
              );
            }}
            onEmptyHeartClick={() => {
              updateDog({
                id: dog.id,
                isFavorite: true,
              }).catch(() =>
                toast.error('There is no connection with the server!')
              );
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  };
