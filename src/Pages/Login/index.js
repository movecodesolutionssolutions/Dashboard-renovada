import React, { useRef, useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Form } from "@unform/web";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function Login() {
  const { signIn, userLogged } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const formRefLogin = useRef(null);

  if (userLogged()) {
    history.push("/users");
  }
  const toastOptions = {
    autoClose: 4000,
    position: toast.POSITION.TOP_CENTER,
  };

  const handleSignIn = async (formData) => {
    setLoading(true);

    const { email, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.info("Por favor, insira um e-mail válido.", toastOptions);
      setLoading(false);
    }
    const data = {
      email,
      password,
    };
    try {
      await signIn(data);
      history.push("/users");
    } catch (error) {
      toast.info("Falha no login. Verifique suas credenciais.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form ref={formRefLogin} onSubmit={handleSignIn}>
        <C.Container>
          <C.Label>IGREJA RENOVADA</C.Label>

          <C.Content>
            <Input type="email" label="Digite seu e-mail:" name="email" />
            <Input type="password" label="Digite sua senha:" name="password" />

            <Button
              Text={loading ? "Carregando..." : "Entrar"}
              onClick={() => formRefLogin.current.submitForm()}
            />

            {/* <C.LabelSignup>
              Não tem uma conta?
              <C.Strong>
                <Link to="/signup">&nbsp;Registre-se</Link>
              </C.Strong>
            </C.LabelSignup>
            <C.LabelSignup>
              <C.Strong>
                <Link to="/recocery">Esqueceu sua senha ?</Link>
              </C.Strong>
            </C.LabelSignup> */}
          </C.Content>
        </C.Container>
      </Form>
    </>
  );
}
