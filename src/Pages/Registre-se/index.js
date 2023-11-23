import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Form } from "@unform/web";
import { Link, useHistory } from "react-router-dom";
import DarkDatePicker from "../../components/DatePicker";
import FormSelect from "../../components/FormSelect";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import formatarData, { makeValidation } from "../../utils";
// validation.js

import * as yup from "yup";

const Registre = () => {
  const { register } = useAuth();
  const formRefRegister = useRef(null);
  const [dataDoEvento, setDataDoEvento] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const validationSchemaRegister = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
    gender: yup.string().required("O genero é obrigatório"),
  });

  const options = [
    { value: "male", label: "Masculino" },
    { value: "feminine", label: "Feminino" },
  ];

  const handleRegister = async (formData) => {
    const isValid = await makeValidation(
      validationSchemaRegister,
      formData,
      formRefRegister
    );

    if (!isValid) {
      return;
    }
    setLoading(true);
    const dataDoEventoFormatada = formatarData(dataDoEvento);

    const data = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      birthday: dataDoEventoFormatada,
      gender: formData.gender,
    };
    try {
      await register(data);
      toast.success("Usuário cadastrado com sucesso!");
      history.push("/news");
    } catch (err) {
      toast.error("Ocorreu um erro ao criar usuáro. Motivo" + err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form ref={formRefRegister} onSubmit={handleRegister}>
      <C.Container>
        <C.Label>IGREJA RENOVADA</C.Label>

        <C.Content>
          <Input type="email" label="Digite seu e-mail:" name="email" />
          <Input type="text" label="Nome:" name="name" />
          <Input type="password" name="password" label="Digite sua Senha:" />
          <DarkDatePicker
            selectedDate={new Date()}
            onChange={(date) => setDataDoEvento(date)}
            label="Data de nascimento"
          />
          <FormSelect
            name="gender"
            label="Escolha seu genero:"
            options={options}
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
          />

          <Button
            Text={loading ? "Carregando..." : "Inscrever-se"}
            onClick={() => formRefRegister.current.submitForm()}
          />
          <C.LabelSignin>
            Já tem uma conta?
            <C.Strong>
              <Link to="/">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignin>
        </C.Content>
      </C.Container>
    </Form>
  );
};

export default Registre;
