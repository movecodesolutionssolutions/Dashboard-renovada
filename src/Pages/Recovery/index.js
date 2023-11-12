import React, { useContext, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Form } from "@unform/web";
import { AuthContext } from "../../context/auth";
import { toast } from "react-toastify";

export default function Recovery() {
  const formRefLogin = useRef(null);

  const toastOptions = {
    autoClose: 4000,
    position: toast.POSITION.TOP_CENTER,
  };

  const handleSignIn = async (formData) => {
    const { email, password } = formData;
  };

  return (
    <>
      <Form ref={formRefLogin} onSubmit={handleSignIn}>
        <C.Container>
          <C.Label>RECUPERAR SENHA</C.Label>

          <C.Content>
            <Input type="email" placeholder="Digite seu e-mail" name="email" />

            <Button
              Text="Enviar "
              onClick={() => formRefLogin.current.submitForm()}
            />
            <C.LabelSignup>
              <C.Strong>
                <Link to="/">Voltar ao login</Link>
              </C.Strong>
            </C.LabelSignup>
          </C.Content>
        </C.Container>
      </Form>
    </>
  );
}
