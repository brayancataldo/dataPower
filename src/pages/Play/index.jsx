import React, { useEffect, useState } from "react";
import "../../global/styles.css";
import { Menu } from "../../components/Menu";
import Game from "../../components/Game";
import "./styles.css";

export default function Home() {
  //   const usuario = getCookieSessionData();

  return (
    <>
      <title>Play</title>
      <Menu />
      <main>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="oval">PALAVRA MISTERIOSA</div>
          <Game />
        </div>
      </main>
    </>
  );
}
