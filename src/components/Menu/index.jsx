import React, { useState, useEffect } from "react";
import { Aba } from "../Aba";
import { AiFillHome, AiFillFolderOpen, AiFillPushpin } from "react-icons/ai";
import {
  MdSettings,
  MdOutlineBubbleChart,
  MdSupervisorAccount,
} from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineBarChart } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { getCookieSessionData, Logout } from "../../service/api";
import { ImSearch } from "react-icons/im";
import { Redirect } from "react-router-dom";

export function Menu() {
  const history = useHistory();
  const usuario = getCookieSessionData();

  useEffect(() => {
    console.log(usuario);
  }, []);

  return (
    <div className="menu">
      <div className="title" onClick={() => history.push("/")}>
        <MdOutlineBubbleChart
          size="24px"
          style={{ paddingRight: "10px", paddingLeft: "10px" }}
        />
        <p> datapower.com</p>
      </div>
      <Aba
        onClick={() => {
          history.push("/home");
        }}
        icon={<AiFillHome />}
      >
        Início
      </Aba>
      <Aba
        onClick={() => {
          history.push("/buscar");
        }}
        icon={<ImSearch size="14px" />}
      >
        Buscar
      </Aba>
      <Aba
        onClick={() => {
          history.push("/estatisticas");
        }}
        icon={<MdOutlineBarChart />}
      >
        Estatísticas
      </Aba>
      <Aba
        onClick={() => {
          history.push("/meus-arquivos");
        }}
        icon={<AiFillFolderOpen />}
      >
        Meus Arquivos
      </Aba>
      <Aba onClick={() => {}} icon={<AiFillPushpin />}>
        Salvos
      </Aba>
      <Aba onClick={() => {}} icon={<MdSupervisorAccount />}>
        Amigos
      </Aba>
      <Aba
        onClick={() => {
          history.push(`/${usuario.nomeUsuario}`);
        }}
        icon={<RiAccountCircleFill />}
      >
        Perfil
      </Aba>
      <Aba onClick={() => {}} icon={<MdSettings />}>
        Configurações
      </Aba>
      <Aba
        onClick={() => {
          Logout();
          history.push("/login");
        }}
        icon={<IoLogOut />}
      >
        Sair
      </Aba>
      {!usuario ? <Redirect push to="/login" /> : null}
    </div>
  );
}
