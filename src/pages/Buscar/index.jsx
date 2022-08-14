import orderBy from "lodash/orderBy";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { CardProfile } from "../../components/CardProfile";
import { CardRow } from "../../components/CardRow";
import { Menu } from "../../components/Menu";
import api, { getCookieSessionData } from "../../service/api";
import { getDistanceFromLatLonInKm } from "../../util/location";

export const Buscar = () => {
  const { search } = useParams();
  const history = useHistory();
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [resultados, setResultados] = useState();
  const usuario = getCookieSessionData();

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
      let lista = listaUsuarios;
      if (usuario.latitude && usuario.longitude) {
        lista = listaUsuarios?.map((each) => {
          return {
            ...each,
            distanceBetweenUser: +getDistanceFromLatLonInKm(
              { lat: each.latitude, lng: each.longitude },
              { lat: usuario.latitude, lng: usuario.longitude }
            ),
          };
        });
      }
      const filtradoPorDistancia = orderBy(lista, "distanceBetweenUser");
      const filtrado = filtradoPorDistancia?.filter(
        (each) =>
          each.id != usuario.id &&
          (each.nome
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            each.nomeUsuario?.toLowerCase().includes(search.toLowerCase()))
      );
      setResultados(filtrado);
      return;
    }
    setResultados([]);
  };

  useEffect(() => {
    pesquisarUsuario();
  }, [search, listaUsuarios]);

  return (
    <div className="container1">
      <title>Buscar</title>
      <Menu />
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
    </div>
  );
};
