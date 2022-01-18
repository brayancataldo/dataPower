import React, { useEffect, useState } from "react";
import "../../global/styles.css";
import { Cadastro } from "../../service/usuario";

export function Login() {
  const [user, setUser] = useState({});
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async () => {
    setMensagem("Cadastrando...");
    try {
      const response = await Cadastro(user);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setMensagem("Cadastrado com sucesso!");
    }
  };

  return (
    <>
      <div className="container-centralizado">
        <div className="login">
          <input
            className="input"
            type="text"
            placeholder="Nome completo"
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
            value={user.nome}
          />
          <input
            className="input"
            type="text"
            placeholder="Nome de usuário"
            onChange={(e) => setUser({ ...user, nomeUsuario: e.target.value })}
            value={user.nomeUsuario}
          />
          <input
            className="input"
            type="text"
            placeholder="E-mail"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
          <input
            className="input"
            type="date"
            placeholder="Data de nascimento"
            onChange={(e) =>
              setUser({ ...user, dataNascimento: e.target.value })
            }
            value={user.dataNascimento}
          />
          <input
            className="input"
            type="text"
            placeholder="Senha"
            onChange={(e) => setUser({ ...user, senha: e.target.value })}
            value={user.senha}
          />
          <input
            className="input"
            type="text"
            placeholder="Repita a senha"
            onChange={(e) => setSenhaRepetida(e.target.value)}
            value={senhaRepetida}
          />
          <button className="input" onClick={handleCadastro}>
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}
