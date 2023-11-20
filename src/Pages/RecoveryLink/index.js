import React, { useState, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { makeValidation } from "../../utils";
import { toast } from "react-toastify";
// Importe seu objeto de API aqui
import * as C from "./styles";
import { api } from "../../services/api";

const Recovery = () => {
  const location = useLocation();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [recoveryLink, setRecoveryLink] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const recoveryLinkParam = searchParams.get("recoveryLink");
    setRecoveryLink(recoveryLinkParam);
  }, [location.search]);

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("A senha é obrigatória"),
  });

  const handleRecovery = async (formData) => {
    const isValid = await makeValidation(validationSchema, formData, formRef);

    if (!isValid) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.put(
        "/auth/update-password-recover",
        {
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${recoveryLink}`,
          },
        }
      );

      toast.success("Senha recuperada com sucesso!");
      history.push("/");
    } catch (error) {
      toast.error("Ocorreu um erro ao recuperar a senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleRecovery}>
      <C.Container>
        <C.Label>Recuperação de Senha</C.Label>

        <C.Content>
          <Input
            type="password"
            name="password"
            label="Digite sua nova senha:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            Text={loading ? "Alterando..." : "Alterar"}
            onClick={() => formRef.current.submitForm()}
          />
        </C.Content>
      </C.Container>
    </Form>
  );
};

export default Recovery;
