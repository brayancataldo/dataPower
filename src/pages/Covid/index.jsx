import React, { useEffect, useState } from "react";
import { Grafico } from "../../components/Grafico";
import api from "../../service/covidApi";
import "../../global/styles.css";
import { Menu } from "../../components/Menu";
import Progress from "../../components/Progress";
import { GraficoCovid } from "../../components/GraficoCovid";
import { Alert } from "../../components/Alert";
import axios from "axios";
import { GraficoRetangulo } from "../../components/GraficoCotacao";
import { Button } from "../../components/Button";

export default function Covid() {
  const [casos, setCasos] = useState();
  const [casosNumbers, setCasosNumbers] = useState();
  const [data, setData] = useState();
  const [datasNoticias, setDatasNoticias] = useState();
  const [datas, setDatas] = useState();
  const [estados, setEstados] = useState();
  const [paises, setPaises] = useState();
  const [searchResults, setSearchResults] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [topico, setTopico] = useState("covid");
  const [allCases, setAllCases] = useState();
  const [items, setItems] = useState([]);
  const [numData, setNumData] = useState(10);
  const currentData = allCases?.slice(0, numData);

  const loadMore = () => {
    if (numData < casos.length - 5) {
      setNumData(numData + 5);
    } else {
      setNumData(numData + casos.length - numData);
    }
  };

  useEffect(() => {
    if (casos && searchTerm.trim() != "") {
      const results = casos.filter(
        (each) => each.Date && each.Date.split("T")[0].includes(searchTerm)
      );
      setSearchResults(results);
    }
  }, [searchTerm]);

  const getCovidData = async () => {
    try {
      const response = await api.get(`/dayone/country/brazil`);
      setCasos(response.data.slice(0, 30));
      setDatas(response.data.map((each) => each.Date));
      setCasosNumbers(
        response.data.map((each) => {
          return each.Confirmed;
        })
      );
      setAllCases(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUfs = async () => {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
      );
      setEstados(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaises = async () => {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/paises`
      );
      setPaises(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRss = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    handleUfs();
    handleRss();
    getCovidData();
    handlePaises();
  }, []);

  return (
    <>
      <Menu />
      <title>Covid</title>
      <main>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "1260px",
              height: "680px",
            }}
          >
            <Progress />
          </div>
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
              <select
                name="select"
                className="input"
                style={{ width: "200px" }}
              >
                <option value="0">Global</option>
                {paises &&
                  paises.map((pais) => (
                    <option id={pais.id.M49} value={pais.id.M49}>
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
              <Button placeholder="Enviar" onClick={handleRss} />
            </div>
            <div style={{ display: "flex" }}>
              <GraficoCovid data={casos} news={items} />
              <Alert data={casosNumbers} />
              {/* <GraficoRetangulo
                  data={currentData}
                  news={items}
                  datas={casosNumbers}
                  datasNoticias={datasNoticias}
                /> */}
            </div>
            <div style={{ display: "flex" }}>
              <Grafico data={allCases} value={"Confirmed"} />
              <Grafico data={allCases} value={"Deaths"} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "1280px",
              }}
            >
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
                      {currentData?.map((each, i) => (
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  placeholder="Carregar mais"
                  onClick={loadMore}
                  disabled={casos?.length === numData}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
