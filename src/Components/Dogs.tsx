// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { useDogContext } from "../App";
import { DogCard } from "./DogCard";

export const Dogs = () =>
  // no props allowed
  {
    const { allDogs, isLoading, updateDog, deleteDog } = useDogContext();
    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {allDogs.map((dog) => {
          <DogCard
            key={dog.id}
            dog={dog}
            isLoading={isLoading}
            onTrashIconClick={() => deleteDog(dog)}
            onEmptyHeartClick={() => updateDog(dog)}
            onHeartClick={() => updateDog(dog)}
          />;
        })}
      </>
    );
  };
