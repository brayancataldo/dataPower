import React, { useEffect, useState } from "react";
import "../../global/styles.css";
import { Menu } from "../../components/Menu";
import { Redirect } from "react-router-dom";
import api, { getCookieSessionData } from "../../service/api";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import axios from "axios";

export default function Home() {
  const usuario = getCookieSessionData();
  const [showModal, setShowModal] = useState(false);
  const { latitude, longitude } = getCookieSessionData();

  useEffect(() => {
    if (latitude & longitude) {
      setShowModal(false);
    } else {
      setShowModal(true);
      navigator.geolocation.getCurrentPosition(async (location) => {
        console.log(location);
        sendCords(location.coords.latitude, location.coords.longitude);
        setShowModal(false);
      });
    }
  }, [latitude, longitude]);

  // useEffect(async () => {
  //   const response = await axios.get(
  //     "https://spotify-charts.p.rapidapi.com/brasil-top-200",
  //     {
  //       "X-RapidAPI-Host": "spotify-charts.p.rapidapi.com",
  //       "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
  //     }
  //   );
  // }, []);

  // const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://spotify-charts.p.rapidapi.com/dominican-republic-top-200",
    headers: {
      "X-RapidAPI-Host": "spotify-charts.p.rapidapi.com",
      "X-RapidAPI-Key": "a68324b7fdmsh804c8fc779d4681p1234f5jsn7df530ae9241",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const sendCords = async (lat, lng) => {
    try {
      await api.put(
        `/usuario/update-lat-long/${usuario.id}?latitude=${lat}&longitude=${lng}`
      );
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
