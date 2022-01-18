import React, { useEffect } from "react";
import { Menu } from "../../components/Menu";
import "../../global/styles.css";
import { MdCoronavirus } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";

export function Estatisticas() {
  const history = useHistory();

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
    </>
  );
}
