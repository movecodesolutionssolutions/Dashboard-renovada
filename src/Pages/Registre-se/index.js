import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import DateInput from "../../components/DatePicker";
import moment from "moment";

const Registre = () => {
  const [dataNasc, setDatanasc] = useState(new Date());

  const formRefRegister = useRef(null);

  const handleDateChange = (date) => {
    // Faça algo com a data selecionada, se necessário
    console.log("Data selecionada:", date);
  };
  return (
    <Form ref={formRefRegister}>
      <C.Container>
        <C.Label>IGREJA RENOVADA</C.Label>

        <C.Content>
          <Input type="email" placeholder="Digite seu e-mail" name="email1" />
          <Input type="email" placeholder="Nome" name="name" />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            name="password"
          />
          <DateInput
            label="Data de nascimento"
            onChange={handleDateChange}
            selectedDate={dataNasc}
          />
          <Input type="email" placeholder="Genero" name="gender" />
          <Input type="email" placeholder="Papeis" name="roles" />

          <Button Text="Inscrever-se" />
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
