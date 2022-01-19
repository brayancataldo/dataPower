import React from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../../components/Menu";

export const Perfil = () => {
  const { username } = useParams();

  return (
    <>
      <Menu />
      <main>{username}</main>
    </>
  );
};
