import React, { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import "../../global/styles.css";
import api, { Cadastrar } from "../../service/api";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function Cadastro() {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [senhasDiferentes, setSenhasDiferentes] = useState(false);
  const [formInvalid, setFormInvalid] = useState(false);
  const [usuarioUsado, setUsuarioUsado] = useState(false);
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const history = useHistory();

  const handleCadastro = async () => {
    console.log("enviar");
    console.log(user);
    if (
      !user.nome ||
      !user.nomeUsuario ||
      !user.email ||
      !user.dataNascimento ||
      !user.senha ||
      usuarioUsado ||
      senhasDiferentes
    ) {
      setFormInvalid(true);
      return;
    }
    try {
      const response = await Cadastrar(user);
      console.log(response);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const verificaNomeUsuario = async () => {
    try {
      const response = await api.get(
        `/usuario/verifica-nome-usuario/${user.nomeUsuario}`
      );
      console.log(response);
      setUsuarioUsado(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    verificaNomeUsuario();
  }, [user.nomeUsuario]);

  useEffect(() => {
    if (user.senha != senhaRepetida) {
      setSenhasDiferentes(true);
      return;
    } else {
      setSenhasDiferentes(false);
    }
  }, [user.senha, senhaRepetida]);

  return (
    <>
      <title>Cadastro</title>
      <Modal show={showModal} title="Cadastrado com sucesso">
        <button
          className="button"
          onClick={() => {
            history.push("/home");
          }}
        >
          OK
        </button>
      </Modal>
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
          <Input
            type="text"
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
            value={user.nome}
            title="Nome completo"
            required
          />
          <Input
            type="text"
            onChange={(e) => setUser({ ...user, nomeUsuario: e.target.value })}
            value={user.nomeUsuario}
            title="Nome de usuário"
            isInvalid={usuarioUsado}
            error="Usuário já existente"
            required
          />
          <Input
            type="text"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            title="E-mail"
            required
          />
          <Input
            type="date"
            onChange={(e) =>
              setUser({ ...user, dataNascimento: e.target.value })
            }
            value={user.dataNascimento}
            title="Data de Nascimento"
            required
          />
          <Input
            type="password"
            onChange={(e) => setUser({ ...user, senha: e.target.value })}
            value={user.senha}
            title="Senha"
            isInvalid={senhasDiferentes && user.senha}
            error="As senhas não coincidem"
            required
          />
          <Input
            type="password"
            onChange={(e) => setSenhaRepetida(e.target.value)}
            value={senhaRepetida}
            title="Repita a senha"
            isInvalid={senhasDiferentes && senhaRepetida}
            error="As senhas não coincidem"
            required
          />
          <Button placeholder="Enviar" onClick={handleCadastro} />
        </div>
      </div>
    </>
  );
}
