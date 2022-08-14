import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Menu } from "../../components/Menu";
import api, { getCookieSessionData } from "../../service/api";
import "./styles.css";

export default function Chat() {
  const [mensagens, setMensagens] = useState([]);
  const [destinatario, setDestinatario] = useState({});
  const [mensagem, setMensagem] = useState("");
  const { usuarioDestino } = useParams();
  const usuario = getCookieSessionData();
  const history = useHistory();

  const getMessages = async () => {
    if (!usuario.id || !destinatario.id) return;

    try {
      const response = await api.get("/mensagens/chat", {
        params: {
          usuarioOrigem: usuario.id,
          usuarioDestino: destinatario.id,
        },
      });
      setMensagens(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/mensagens/save", {
        descricao: mensagem,
        usuarioOrigem: usuario.id,
        usuarioDestino: destinatario.id,
      });
      setMensagem("");
    } catch (error) {
      console.log(error);
    } finally {
      getMessages();
    }
  };

  const findUser = async () => {
    if (!usuarioDestino) return;

    const response = await api.get(
      `/usuario/por-nome-usuario/${usuarioDestino}`
    );
    setDestinatario(response.data);
  };

  useEffect(() => {
    findUser();
  }, [usuarioDestino]);

  let timer;

  useEffect(() => {
    getMessages();
    timer = setInterval(() => {
      getMessages();
    }, 5000);
    return () => clearInterval(timer);
  }, [usuarioDestino, destinatario]);

  return (
    <div className="container1">
      <title>Chat com {destinatario.nomeUsuario}</title>
      <Menu />
      <div className="parte1">
        <div className="head">
          <img
            className="profile-picture"
            src={destinatario.foto || "https://i.stack.imgur.com/l60Hf.png"}
          />
          <div className="container-nome">
            <h4
              className="nome pointer"
              onClick={() => history.push(`/${destinatario.nomeUsuario}`)}
            >
              {destinatario.nome}
            </h4>
            <p
              className="nome-usuario pointer"
              onClick={() => history.push(`/${destinatario.nomeUsuario}`)}
            >
              @{destinatario.nomeUsuario}
            </p>
          </div>
        </div>
        <div className="chat">
          {mensagens &&
            mensagens.map((each) => (
              <div
                className={`rightMsg ${
                  each.usuarioOrigem == usuario.id ? "right" : "left"
                }`}
              >
                <div className="cloud">
                  <p>{each.descricao}</p>
                </div>
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className="input-area">
          <input
            className="input"
            type="text"
            placeholder="Escrever uma mensagem"
            onChange={(e) => setMensagem(e.target.value)}
            value={mensagem}
          />
          <Button placeholder="Enviar" type="submit" />
        </form>
      </div>
      <div className="parte2"></div>
    </div>
  );
}
