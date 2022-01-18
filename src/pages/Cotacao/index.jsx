import React, { useEffect, useState } from "react";
import "../../global/styles.css";
import Progress from "../../components/Progress";
import axios from "axios";
import { GraficoRetangulo } from "../../components/GraficoCotacao";
import "./styles.css";
import { Alert } from "../../components/Alert";
import { Menu } from "../../components/Menu";

export default function Cotacao() {
  const [data, setData] = useState();
  const [searchResults, setSearchResults] = useState();
  const [topico, setTopico] = useState("brazil");
  const [dataInicio, setDataInicio] = useState("2021-11-27");
  const [dataFim, setDataFim] = useState("2021-12-27");
  const [dias, setDias] = useState(30);
  const [loading, setLoading] = useState(false);
  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState([]);

  const getCovidData = async () => {
    setLoading(true);
    try {
      const dataIni = new Date(dataFim);
      const dataF = new Date(dataInicio);
      var timeDiff = Math.abs(dataF.getTime() - dataIni.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const response = await axios.get(
        `https://economia.awesomeapi.com.br/USD-BRL/${diffDays}?start_date=${dataInicio.replace(
          /[^\d]+/g,
          ""
        )}&end_date=${dataFim.replace(/[^\d]+/g, "")}`
      );
      // const response = await axios.get(
      //   `https://economia.awesomeapi.com.br/USD-BRL/30?start_date=20211121&end_date=20211221`
      // );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRss = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.allorigins.win/get?url=https://news.google.com/rss/search?q=${topico}`
    );
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      date: el.querySelector("pubDate").innerHTML,
    }));
    setItems(feedItems.slice(0, 30));
    console.log(feedItems.slice(0, 30));
    setLoading(false);
  };

  useEffect(() => {
    handleRss();
    getCovidData();
  }, []);

  return (
    <>
      <Menu />
      <title>Cotacao</title>
      <main>
        {loading ? (
          <Progress />
        ) : (
          <>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Tópico"
                onChange={(e) => setTopico(e.target.value)}
                value={topico}
              />
              <input
                className="input"
                type="date"
                onChange={(e) => setDataInicio(e.target.value)}
                value={dataInicio}
              />
              <input
                className="input"
                type="date"
                onChange={(e) => setDataFim(e.target.value)}
                value={dataFim}
              />
              {/* <input type="select" className="input" /> */}
              <button onClick={getCovidData} className="input">
                Enviar
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {loading ? (
                <Progress />
              ) : (
                <GraficoRetangulo data={data} news={items} />
              )}
              <Alert data={data} />
            </div>
          </>
        )}
      </main>
    </>
  );
}
