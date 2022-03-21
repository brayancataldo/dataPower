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

  return (
    <>
      <title>
        {user.nome} (@{user.nomeUsuario})
      </title>
      <Menu />
      <main>
        <div className="profile">
          <div id="cont">
            <img src={user.foto} />
          </div>
          <div id="infos">
            <div id="numbers">
              {/* <p>{user.tags}</p>
              <p>{user.seguidores}</p>
              <p>{user.seguindo}</p> */}
              <p>3 tags</p>
              <p>192 seguidores</p>
              <p>203 seguindo</p>
            </div>
            <div>
              <p>{user.nome}</p>
            </div>
            <div>
              <p>@{user.nomeUsuario}</p>
            </div>
            <div>
              <p>Dev front end</p>
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
      </main>
      {!usuario ? <Redirect push to="/login" /> : null}
    </>
  );
}
