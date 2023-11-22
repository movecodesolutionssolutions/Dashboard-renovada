import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import Modal from "../../components/Modal";
import formatarData from "../../utils";
import Input from "../../components/Input";
import Checkbox from "../../components/CheckBox";
import { Form } from "@unform/web";
import Button from "../../components/Button";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const User = () => {
  const { acountComplet, setAcountComplet, user } = useAuth();
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
    if (acountComplet == false) {
      openModal();
    }
  }, [acountComplet]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleCompletRegister = async (formData) => {
    const { phone, address } = formData;

    try {
      let imgId = formData.imgId;

      if (selectedImage) {
        const formDataImage = new FormData();
        formDataImage.append("file", selectedImage);

        const responseImage = await api.post("/image/upload", formDataImage);
        imgId = responseImage.data.id;
      }

      const birthday = formatarData(user.birthday);

      const responseUserUpdate = await api.put("/user/me", {
        name: user.name,
        roles: user.roles,
        avatar: imgId,
        gender: user.gender,
        birthday: birthday,
        email: user.email,
        phone: phone,
        address: address,
        isVisitor: isVisitor,
        isShepherd: isShepherd,
        isAcceptedJesus: isAcceptedJesus,
        isBaptized: isBaptized,
        isCompleted: true,
      });

      if (responseUserUpdate.status === 200) {
        toast.success("Cadastro completo!");
      } else {
        toast.error(
          "Erro ao concluir cadastro. Motivo: Atualização do usuário falhou."
        );
      }
    } catch (error) {
      toast.error("Erro ao concluir cadastro. Motivo: " + error.message);
    } finally {
      closeModal();
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
            <div className="relative mt-4">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full block w-full text-center"
              >
                Escolher Imagem para seu perfil
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
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
