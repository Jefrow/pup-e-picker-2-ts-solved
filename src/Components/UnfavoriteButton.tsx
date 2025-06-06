import { Icons } from "../icons";

export const UnfavoriteButton = ({
  onClick,
  disabled,
}: {
  disabled: boolean;
  onClick: () => void;
}) => (
  <img
    src={Icons.Heart}
    alt=""
    className="unfavorite-button"
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
