import { Icons } from "../icons";

export const FavoriteButton = ({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) => (
  <img
    src={Icons.EmptyHeart}
    alt=""
    className="favorite-button"
    style={{
      width: 40,
      border: 0,
      cursor: disabled ? "no-drop" : "pointer",
    }}
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
  />
);
