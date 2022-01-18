import React, { useEffect, useState } from "react";
import { Grafico } from "../../components/Grafico";
import api from "../../service/covidApi";
import "../../global/styles.css";
import { Menu } from "../../components/Menu";
import Progress from "../../components/Progress";
import { GraficoCovid } from "../../components/GraficoCovid";
import { Alert } from "../../components/Alert";
import axios from "axios";

export default function Covid() {
  const [casos, setCasos] = useState();
  const [estados, setEstados] = useState();
  const [paises, setPaises] = useState();
  const [searchResults, setSearchResults] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [topico, setTopico] = useState("covid");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [data, setData] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (casos && searchTerm.trim() != "") {
      const results = casos.filter(
        (each) => each.Date && each.Date.split("T")[0].includes(searchTerm)
      );
      console.log(results);
      setSearchResults(results);
    }
  }, [searchTerm]);

  const getCovidData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/dayone/country/brazil`);
      console.log(response.data);
      setCasos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUfs = async () => {
    setLoading(false);
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
      );
      setEstados(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaises = async () => {
    setLoading(false);
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/paises`
      );
      setPaises(response.data);
      console.log(response.data);
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
    handleUfs();
    handleRss();
    getCovidData();
    handlePaises();
  }, []);

  return (
    <>
      <Menu/>
      <title>Covid</title>
      <main>
        {loading && casos && estados && paises ? (
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
              <select
                name="select"
                className="input"
                style={{ width: "200px" }}
              >
                <option value="0">Global</option>
                {paises &&
                  paises.map((pais) => (
                    <option id={pais.id} value={pais.id}>
                      {pais.nome}
                    </option>
                  ))}
              </select>
              <select
                name="select"
                className="input"
                style={{ width: "200px" }}
                value="0"
              >
                <option value="0">Todos</option>
                {estados &&
                  estados.map((estado) => (
                    <option id={estado.id} value={estado.id}>
                      {estado.nome}
                    </option>
                  ))}
              </select>
              <button className="input" style={{ width: "150px" }}>
                Enviar
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <GraficoCovid data={casos} news={items} />
              <Alert data={data} />
            </div>
            <div style={{ display: "flex" }}>
              <Grafico data={casos} value={"Confirmed"} />
              <Grafico data={casos} value={"Deaths"} />
            </div>
            {/* <div>
            <input type="date" onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div> */}
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>Data</th>
                  <th>Casos Totais</th>
                  <th>Novos Casos</th>
                  <th>Mortes Totais</th>
                  <th>Novas Mortes</th>
                </tr>
              </thead>
              {casos &&
                (searchResults ? (
                  <tbody>
                    {searchResults.map((each, i) => (
                      <tr key={each.Id}>
                        <td>{`${new Date(each.Date).toLocaleDateString(
                          "pt-br",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}`}</td>
                        <td>{each.Confirmed}</td>
                        <td>{each.Deaths}</td>
                        <td>
                          {i == 0
                            ? each.Confirmed
                            : casos[i].Confirmed - casos[i - 1].Confirmed}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    {casos.map((each, i) => (
                      <tr key={each.Id}>
                        <td>{`${new Date(each.Date).toLocaleDateString(
                          "pt-br",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}`}</td>
                        <td>{each.Confirmed}</td>
                        <td>{`+${
                          i == 0
                            ? each.Confirmed
                            : casos[i].Confirmed - casos[i - 1].Confirmed
                        }`}</td>
                        <td>{each.Deaths}</td>
                        <td>{`+${
                          i == 0
                            ? each.Deaths
                            : casos[i].Deaths - casos[i - 1].Deaths
                        }`}</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
            </table>
          </>
        )}
      </main>
    </>
  );
}
