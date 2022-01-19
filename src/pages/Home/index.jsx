import React, { useEffect } from "react";
import "../../global/styles.css";
import { Menu } from "../../components/Menu";
import { ModalComponent } from "../../components/Modal";
import { Button, Modal } from "react-bootstrap";
import Covid from "../Covid";
import { Redirect } from "react-router-dom";
import { getCookieSessionData } from "../../service/usuario";

export function Home() {
  const nome = getCookieSessionData();
  return (
    <>
      <Menu />
      <main></main>
      {!nome ? <Redirect push to="/cadastrar" /> : null}
    </>
  );
}
