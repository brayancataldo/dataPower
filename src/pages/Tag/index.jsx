import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Menu } from "../../components/Menu";
import api, { getCookieSessionData } from "../../service/api";
import "./styles.css";

export default function Tag() {
  const usuario = getCookieSessionData();
  const [tag, setTag] = useState({});
  const { id } = useParams();

  useEffect(() => {
    findTag();
  }, []);

  const findTag = async () => {
    try {
      const { data } = await api.get(`/tag/${id}`);
      setTag(data);
      console.log(data);
    } catch (error) {}
  };

  return (
    <>
      <title>
        {tag.nome} - {tag.descricao}
      </title>
      <Menu />
      <main>
        <div>
          <h1>{tag.nome}</h1>
          <p>{tag.descricao}</p>
        </div>
      </main>
    </>
  );
}
