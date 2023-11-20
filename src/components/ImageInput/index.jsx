import React, { useState } from "react";

const ImageInput = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label className="relative cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Upload imagem
        <input
          type="file"
          className="hidden"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </label>

      {selectedImage && (
        <div className="ml-4">
          <img
            src={selectedImage}
            alt="Uploaded"
            className="rounded-md max-h-32"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
