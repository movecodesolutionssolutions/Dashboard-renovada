import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import DateInput from "../../components/DatePicker";
import FormSelect from "../../components/FormSelect";

const Registre = () => {
  const [dataDoEvento, setDataDoEvento] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Feminino" },
  ];

  const handleDataChange = (event) => {
    setDataDoEvento(event.target.value);
  };

  const formRefRegister = useRef(null);

  const handleRegister = (date) => {
    console.log("Data selecionada:", date);
  };
  return (
    <Form ref={formRefRegister} onSubmit={handleRegister}>
      <C.Container>
        <C.Label>IGREJA RENOVADA</C.Label>

        <C.Content>
          <Input type="email" label="Digite seu e-mail:" name="email1" />
          <Input type="email" label="Nome:" name="name" />
          <Input type="password" name="password" label="Digite sua Senha:" />
          <DateInput
            label="Data de nascimento:"
            id="data-do-evento"
            value={dataDoEvento}
            onChange={handleDataChange}
          />
          <FormSelect
            name="gender"
            label="Escolha seu genero:"
            options={options}
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
          />
          <Input type="email" label="Papeis:" name="roles" />

          <Button
            Text="Inscrever-se"
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
