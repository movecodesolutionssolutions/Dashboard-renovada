import React, { useState } from "react";

const ImageInput = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onImageSelect(reader.result); // Notifica o componente pai sobre a imagem selecionada
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="imageUpload"
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full block w-full text-center"
      >
        Escolher Imagem
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {selectedImage && (
        <div className="mt-4">
          <img
            src={selectedImage}
            alt="Uploaded"
            className="rounded-md max-h-32 mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
