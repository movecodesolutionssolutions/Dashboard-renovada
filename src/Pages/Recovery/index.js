import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Form } from "@unform/web";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import * as yup from "yup";
import { makeValidation } from "../../utils";

export default function Recovery() {
  const [loading, setLoading] = useState(false);
  const formRefLogin = useRef(null);

  const toastOptions = {
    autoClose: 4000,
    position: toast.POSITION.TOP_CENTER,
  };

  const validationSchemaRecovery = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
  });

  const handRecovery = async (formData) => {
    const isValid = await makeValidation(
      validationSchemaRecovery,
      formData,
      formRefLogin
    );

    if (!isValid) {
      return;
    }
    setLoading(true);
    const { email } = formData;
    try {
      const response = await api.post(`/auth/recovery/${email}`);
      toast.success("E-mail enviado com sucesso!", toastOptions);
    } catch (err) {
      toast.error("Ocorreu um erro ao enviar o e-mail. Motivo" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form ref={formRefLogin} onSubmit={handRecovery}>
        <C.Container>
          <C.Label>RECUPERAR SENHA</C.Label>

          <C.Content>
            <Input type="email" label="Digite seu e-mail" name="email" />

            <Button
              Text={loading ? "Enviando..." : "Enviar"}
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
