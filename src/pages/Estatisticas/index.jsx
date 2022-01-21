import React, { useEffect } from "react";
import { Menu } from "../../components/Menu";
import "../../global/styles.css";
import { MdCoronavirus } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { Redirect, useHistory } from "react-router-dom";
import { getCookieSessionData } from "../../service/usuario";

export function Estatisticas() {
  const history = useHistory();
  const nome = getCookieSessionData();

  return (
    <>
      <Menu />
      <main>
        <div style={{ display: "flex" }}>
          <div
            className="card"
            onClick={() => {
              history.push("/covid");
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
          </div>
        </div>
      </main>
      {/* {!nome ? <Redirect push to="/cadastrar" /> : null} */}
    </>
  );
}
