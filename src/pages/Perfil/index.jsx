import React, { useEffect, useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { Menu } from "../../components/Menu";
import api, { getCookieSessionData } from "../../service/api";
import "./styles.css";

export default function Perfil() {
  const { username } = useParams();
  const usuario = getCookieSessionData();
  const [user, setUser] = useState({});
  const [tags, setTags] = useState();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    findUser();
    findTags();
  }, []);

  const findUser = async () => {
    try {
      const { data } = await api.get(`/usuario/por-nome-usuario/${username}`);
      setUser(data);
      console.log(data);
    } catch (error) {}
  };

  const findTags = async () => {
    try {
      const { data } = await api.get(`/tag`);
      setTags(data);
      console.log(data);
    } catch (error) {}
  };

  const handleInput = (image) => {
    console.log(image);
  };

  return (
    <div className="container1">
      <title>
        {user.nome} (@{user.nomeUsuario})
      </title>
      <Menu />
      <div className="profile">
        <div id="cont">
          <img
            className="img-default"
            src={user.foto || "https://i.stack.imgur.com/l60Hf.png"}
          />
          <div className="img-hover">
            <div id="wrap" className="img-hover">
              <h3>Editar foto</h3>
              <input
                type="file"
                className="file_upload"
                accept="application/pdf"
                // value={selectedFile}
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
        <div id="infos">
          <div id="numbers">
            {/* <p>{user.tags}</p> */}
            <p>{user.seguidores} seguidores</p>
            <p>{user.seguindo} seguindo</p>
            <p>3 tags</p>
          </div>
          <div>
            <p>{user.nome}</p>
          </div>
          <div>
            <p>@{user.nomeUsuario}</p>
            <button
              onClick={() => history.push(`/chat/${user.nomeUsuario}`)}
              className="input pointer"
            >
              Enviar Mensagem
            </button>
          </div>
          <div>
            <p>{user.bio}</p>
          </div>
          <div id="tags">
            {tags &&
              tags.map((each) => (
                <button
                  title={each.descricao}
                  onClick={() => history.push(`/tag/${each.id}`)}
                >
                  {each.nome}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
