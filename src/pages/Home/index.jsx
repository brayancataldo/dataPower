import React, { useEffect, useState } from "react";
import "../../global/styles.css";
import { Menu } from "../../components/Menu";
import { Redirect } from "react-router-dom";
import api, {
  getCookieSessionData,
  setCookiesSessionData,
} from "../../service/api";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";

export default function Home() {
  const usuario = getCookieSessionData();
  const [showModal, setShowModal] = useState(false);
  const { latitude, longitude } = getCookieSessionData();

  useEffect(() => {
    if (!latitude & !longitude) {
      setShowModal(true);
      navigator.geolocation.getCurrentPosition(async (location) => {
        console.log(location);
        sendCords(location.coords.latitude, location.coords.longitude);
        setShowModal(false);
      });
    }
  }, [latitude, longitude]);

  const sendCords = async (lat, lng) => {
    try {
      await api.put(
        `/usuario/update-lat-long/${usuario.id}?latitude=${lat}&longitude=${lng}`
      );
      const response = await api.get(`/usuario/${usuario.id}`);
      setCookiesSessionData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <title>Home</title>
      <Menu />
      <Modal show={showModal} title="Permita acesso a localização">
        <p>Usamos sua localização para aprimorar o algoritmo</p>
        <Button placeholder="Ok" onClick={() => setShowModal(false)}>
          OK
        </Button>
      </Modal>
      <main>a</main>
    </>
  );
}
