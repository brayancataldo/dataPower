import React, { useEffect, useState } from "react";
import "../../global/styles.css";
import { Menu } from "../../components/Menu";
import { Redirect } from "react-router-dom";
import api, { getCookieSessionData } from "../../service/api";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";

export default function Home() {
  const usuario = getCookieSessionData();
  const [location, setLocation] = useState();
  const [distancia, setDistancia] = useState();
  const [showModal, setShowModal] = useState(false);

  function getDistanceFromLatLonInKm(position1, position2) {
    "use strict";
    var deg2rad = function (deg) {
        return deg * (Math.PI / 180);
      },
      R = 6371,
      dLat = deg2rad(position2.lat - position1.lat),
      dLng = deg2rad(position2.lng - position1.lng),
      a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(position1.lat)) *
          Math.cos(deg2rad(position1.lat)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c * 1000).toFixed();
  }

  const handleClick = () => {
    console.log({ lat: location.latitude, lng: location.longitude });
    setDistancia(
      getDistanceFromLatLonInKm(
        { lat: location.latitude, lng: location.longitude },
        { lat: -22.46949, lng: -43.149583 }
      )
    );
  };

  useEffect(() => {
    if (location) {
      setShowModal(false);
    } else {
      setShowModal(true);
      navigator.geolocation.getCurrentPosition(async (location) => {
        console.log(location);
        setLocation(location.coords);
        setShowModal(false);
        try {
          await api.put(`/usuario/update/${usuario.id}`, {
            usuario: {
              latitude: `${location.latitude}`,
              longitude: `${location.longitude}`,
            },
          });
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, []);

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
      {!usuario ? <Redirect push to="/login" /> : null}
    </>
  );
}
