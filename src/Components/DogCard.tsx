import { Dog } from "../types";
import { FavoriteButton } from "./FavoriteButton";
import { TrashButton } from "./TrashButton";
import { UnfavoriteButton } from "./UnfavoriteButton";

export const DogCard = ({
  dog: { name, image, description, isFavorite },
  onTrashIconClick,
  onEmptyHeartClick,
  onHeartClick,
  isLoading,
}: {
  dog: Dog;
  onTrashIconClick: () => void;
  onEmptyHeartClick: () => void;
  onHeartClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="dog-card">
      {isFavorite ? (
        <UnfavoriteButton
          onClick={() => {
            onHeartClick();
          }}
          disabled={isLoading}
        />
      ) : (
        <FavoriteButton
          onClick={() => {
            onEmptyHeartClick();
          }}
          disabled={isLoading}
        />
      )}

      <TrashButton
        onClick={() => {
          onTrashIconClick();
        }}
        disabled={isLoading}
      />

      <div className={`favorite-overlay `}>{"<3"}</div>

      {isLoading && <div className={`loading-overlay`}></div>}

      <div className="unfavorite-overlay">{"</3"}</div>

      <p className="dog-name">{name}</p>

      <img src={image} alt={name} />

      <p className="dog-description">{description}</p>
    </div>
  );
};
