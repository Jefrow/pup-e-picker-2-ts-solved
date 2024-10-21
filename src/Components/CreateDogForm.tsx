import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogContext } from "../context";
import { toast } from "react-hot-toast";

const defaultImage = dogPictures.BlueHeeler;
export const CreateDogForm = () => {
  const { isLoading, createDog } = useDogContext();

  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const isValidName = nameInput.length > 3;
  const isValidDescription = descriptionInput.length > 3;
  const isValidDog = isValidName && isValidDescription;

  const resetDogForm = () => {
    setNameInput(""), setDescriptionInput(""), setSelectedImage(defaultImage);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
          name: nameInput,
          image: selectedImage,
          description: descriptionInput,
          isFavorite: false,
        })
          .then(() => {
            resetDogForm();
          })
          .catch(() => toast.error("There is no connection to the server!"));
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        name="name"
        id="name"
        type="text"
        disabled={isLoading}
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="description"
        cols={80}
        rows={10}
        disabled={isLoading}
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        name="picture"
        id="picture"
        value={selectedImage}
        onChange={(e) => {
          setSelectedImage(e.target.value);
        }}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" disabled={isLoading || !isValidDog} />
    </form>
  );
};
