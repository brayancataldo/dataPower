import React, { useState } from "react";
import "../../global/styles.css";
import api, { setCookiesSessionData } from "../../service/api";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({});
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(
        `/usuario/login?nomeUsuario=${user.nomeUsuario}&senha=${user.senha}`
      );
      setCookiesSessionData(response.data);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <title>Login</title>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div></div>
        <div>
          <div className="login">
            <form onSubmit={handleLogin}>
              <Input
                type="text"
                onChange={(e) =>
                  setUser({ ...user, nomeUsuario: e.target.value })
                }
                value={user.nomeUsuario}
                title="Nome de usuário"
                required
              />
              <Input
                type="password"
                onChange={(e) => setUser({ ...user, senha: e.target.value })}
                value={user.senha}
                title="Senha"
                error="As senhas não coincidem"
                required
              />
              <div className="divCentralizada">
                <Button
                  placeholder="Entrar"
                  onClick={handleLogin}
                  type="submit"
                />
              </div>
            </form>
          </div>
          <p className="linkCadastro">
            Ainda não possui conta?{" "}
            <Link id="linkToCadastro" to="/cadastro">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
