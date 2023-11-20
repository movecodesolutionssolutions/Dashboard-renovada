import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import Modal from "../../components/Modal";
import ImageInput from "../../components/ImageInput";
import Input from "../../components/Input";
import Checkbox from "../../components/CheckBox";
import { Form } from "@unform/web";
import Button from "../../components/Button";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const User = () => {
  const { acountComplet, setAcountComplet, User } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisitor, setIsVisitor] = useState(true);
  const [isShepherd, setIsShepherd] = useState(true);
  const [isAcceptedJesus, setIsAcceptedJesus] = useState(true);
  const [isBaptized, setIsBaptized] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const formRefRegister = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAcountComplet(false);
  };

  useEffect(() => {
    if (acountComplet) {
      openModal();
    }
  }, [acountComplet]);

  const handleImageSelect = (image) => {
    // Handle the selected image in the parent component
    setSelectedImage(image);
  };

  const handleCompletRegister = async (formData) => {
    const { phone, address } = formData;
    try {
      // Convert the selected image to a base64-encoded string
      const base64Image = selectedImage.split(",")[1];

      // Upload the base64-encoded image string
      const responseImage = await api.post("/image/upload", {
        image: base64Image,
      });
      console.log(responseImage);

      // Now, you can use the response from the image upload to get the image path or other details
      const imagePath = responseImage.data.path;

      // Now, you can use the response from the image upload to get the image path or other details
      // const imagePath = responseImage.data.path;

      // const reponse = api.puth("/user/me", {
      //   name: User.name,
      //   roles: User.roles,
      //   avatar: "string",
      //   gender: User.gender,
      //   birthday: User.birthday,
      //   email: User.email,
      //   phone: phone,
      //   address: address,
      //   isVisitor: isVisitor,
      //   isShepherd: isShepherd,
      //   isAcceptedJesus: isAcceptedJesus,
      //   isBaptized: isBaptized,
      //   isCompleted: true,
      // });
      toast.success("Cadastro completo!");
    } catch (error) {
      console.log("Erro ao concluir cadastro. Motivo" + error);
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Form ref={formRefRegister} onSubmit={handleCompletRegister}>
          <h2 className="text-2xl font-bold mb-4">Complete Seu Cadastro</h2>
          <p className="mb-4">
            Estamos quase lá! Por favor, preencha os campos
          </p>
          <Input label="Telefone" name="phone" type="phone" />
          <Input label="Endereço" name="address" />

          <div className="ml-3 mb-4">
            <Checkbox
              label="Você é um visitante?"
              onChange={() => setIsVisitor(true)}
            />
            <Checkbox
              label="Você é um pastor(a)?"
              onChange={() => setIsShepherd(true)}
            />
            <Checkbox
              label="Já aceitou Jesus?"
              onChange={() => setIsAcceptedJesus(true)}
            />
            <Checkbox
              label="É batizado(a)?"
              onChange={() => setIsBaptized(true)}
            />
          </div>

          <div className="mb-6">
            <ImageInput onImageSelect={handleImageSelect} />
          </div>
          <Button
            Text="Enviar"
            onClick={() => formRefRegister.current.submitForm()}
          />
        </Form>
      </Modal>
    </>
  );
};

export default User;
