import React, { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import "../../global/styles.css";
import { Cadastrar } from "../../service/usuario";
import { useHistory } from "react-router-dom";

export function Cadastro() {
  const [user, setUser] = useState({});
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [mensagem, setMensagem] = useState("Cadastrar");
  const history = useHistory();

  const handleCadastro = async () => {
    setMensagem("Cadastrando...");
    try {
      const response = await Cadastrar(user);
      console.log(response);
      history.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setMensagem("Cadastrado com sucesso!");
    }
  };

  return (
    <>
      <Modal show={false}>aaaaaaa</Modal>
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
          <input
            className="input2"
            type="text"
            placeholder="Nome completo"
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
            value={user.nome}
          />
          <input
            className="input2"
            type="text"
            placeholder="Nome de usuário"
            onChange={(e) => setUser({ ...user, nomeUsuario: e.target.value })}
            value={user.nomeUsuario}
          />
          <input
            className="input2"
            type="text"
            placeholder="E-mail"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
          <input
            className="input2"
            type="date"
            placeholder="Data de nascimento"
            onChange={(e) =>
              setUser({ ...user, dataNascimento: e.target.value })
            }
            value={user.dataNascimento}
          />
          <input
            className="input2"
            type="password"
            placeholder="Senha"
            onChange={(e) => setUser({ ...user, senha: e.target.value })}
            value={user.senha}
          />
          <input
            className="input2"
            type="password"
            placeholder="Repita a senha"
            onChange={(e) => setSenhaRepetida(e.target.value)}
            value={senhaRepetida}
          />
          <button className="button" onClick={handleCadastro}>
            {mensagem}
          </button>
        </div>
      </div>
    </>
  );
}
