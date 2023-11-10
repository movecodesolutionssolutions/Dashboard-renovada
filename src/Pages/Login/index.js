import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";

export default function Login() {
  //  const { signin } = useAuth();
  //  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = () => {
  //   if (!email | !senha) {
  //     setError("Preencha todos os campos");
  //     return;
  //   }

  //   // const res = signin(email, senha);

  //   if (res) {
  //     setError(res);
  //     return;
  //   }

  //   // navigate("/home");
  // };
  return (
    <>
      <C.Container>
        <C.Label>IGREJA RENOVADA</C.Label>
        <C.Content>
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Entrar" />
          <C.LabelSignup>
            Não tem uma conta?
            <C.Strong>
              <Link to="/signup">&nbsp;Registre-se</Link>
            </C.Strong>
          </C.LabelSignup>
        </C.Content>
      </C.Container>
    </>
  );
}
