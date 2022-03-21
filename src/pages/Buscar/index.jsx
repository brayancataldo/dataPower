import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { CardProfile } from "../../components/CardProfile";
import { CardRow } from "../../components/CardRow";
import { Menu } from "../../components/Menu";
import api from "../../service/api";

export const Buscar = () => {
  const { search } = useParams();
  const history = useHistory();
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [resultados, setResultados] = useState();

  const listarUsuarios = async () => {
    try {
      const response = await api.get(`/usuario`);
      setListaUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const pesquisarUsuario = () => {
    if (listaUsuarios.length > 0 && search != undefined && search != "") {
      console.log(search);
      const filtrado = listaUsuarios?.filter(
        (each) =>
          each.nome?.toLowerCase().includes(search.toLowerCase()) ||
          each.nomeUsuario?.toLowerCase().includes(search.toLowerCase())
      );
      console.log(filtrado);
      setResultados(filtrado);
      return;
    }
    setResultados([]);
  };

  useEffect(() => {
    pesquisarUsuario();
  }, [search, listaUsuarios]);

  return (
    <>
      <title>Buscar</title>
      <Menu />
      <main>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Buscar"
            onChange={(e) => history.push(`/buscar/${e.target.value}`)}
            value={search}
          />
          <Button placeholder="Pesquisar" onClick={pesquisarUsuario} />
          <div style={{ display: "flex" }}>
            {resultados &&
              resultados.map((each) => (
                <CardProfile
                  nome={each.nome}
                  user={each.nomeUsuario}
                  src={each.foto}
                  onClick={() => history.push(`/${each.nomeUsuario}`)}
                />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};
