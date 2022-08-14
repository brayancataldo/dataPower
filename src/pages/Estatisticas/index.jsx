import React, { useEffect, memo } from "react";
import { Menu } from "../../components/Menu";
import "../../global/styles.css";
import { MdCoronavirus } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { Redirect, useHistory } from "react-router-dom";
import { getCookieSessionData } from "../../service/api";
import { CardRow } from "../../components/CardRow";
import { Button } from "../../components/Button";

function Estatisticas() {
  const history = useHistory();
  const usuario = getCookieSessionData();

  return (
    <div className="container1">
      <title>Estatísticas</title>
      <Menu />
      <div>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Buscar"
            // onChange={(e) => setTopico(e.target.value)}
            // value={topico}
          />
          <Button placeholder="Enviar" />
        </div>
        <CardRow
          onClick={() => {
            history.push("/estatisticas/covid");
          }}
          title="Covid-19"
        />
        <CardRow
          onClick={() => {
            history.push("/cotacao");
          }}
          title="Cotação"
        />
        {/* <div
            className="card"
            onClick={() => {
              history.push("/estatisticas/covid");
            }}
          >
            Covid-19
            <MdCoronavirus
              color="#14af00"
              size="20px"
              style={{ margin: "5px" }}
            />
          </div>
          <div
            className="card"
            onClick={() => {
              history.push("/cotacao");
            }}
          >
            Dólar + tópico
            <AiFillDollarCircle
              color="#14af00"
              size="20px"
              style={{ margin: "5px" }}
            />
          </div> */}
      </div>
    </div>
  );
}

export default memo(Estatisticas);
