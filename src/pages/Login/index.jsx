import React, { useEffect, useState } from "react";
import "../../global/styles.css";
import api, { Entrar, setCookiesSessionData } from "../../service/api";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function Login() {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
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
        <div className="login">
          <form className="commentForm" onSubmit={handleLogin}>
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
            <Button placeholder="Entrar" onClick={handleLogin} type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
