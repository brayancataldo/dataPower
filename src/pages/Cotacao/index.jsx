import React, { useEffect, useState } from "react";
import "../../global/styles.css";
import Progress from "../../components/Progress";
import axios from "axios";
import { GraficoRetangulo } from "../../components/GraficoCotacao";
import "./styles.css";
import { Alert } from "../../components/Alert";
import { Menu } from "../../components/Menu";
import { formatDate } from "../../util/format";
import uniqBy from "lodash/uniqBy";
import orderBy from "lodash/orderBy";

export default function Cotacao() {
  const [topico, setTopico] = useState("brazil");
  const [dataFim, setDataFim] = useState(new Date());
  const [dataIni, setDataIni] = useState(new Date("01-08-2022"));
  const dateNow = new Date().toISOString();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [moedas, setMoedas] = useState();
  const [compra, setCompra] = useState([]);
  const [venda, setVenda] = useState();
  const [datas, setDatas] = useState([]);
  const [datasNoticias, setDatasNoticias] = useState([]);
  const [selectedMoeda, setSelectedMoeda] = useState("USD");
  const [tipo, setTipo] = useState("Compra");
  const currentData = tipo === "Compra" ? compra : venda;
  const timeDiff = Math.abs(dataFim.getTime() - new Date(dataIni).getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const getMoedas = async () => {
    const { data } = await axios.get(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json`
    );
    setMoedas(data.value);
  };

  const getCotacao = async () => {
    try {
      console.log("Periodo", diffDays);
      const { data } = await axios.get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40moeda=%27${selectedMoeda}%27&%40dataInicial=%27${formatDate(
          dataIni,
          "mm-dd-yyyy"
        )}%27&%40dataFinalCotacao=%27${formatDate(
          dataFim,
          "mm-dd-yyyy"
        )}%27&%24format=json`
      );
      let unique = uniqBy(
        data.value.map((each) => {
          return {
            ...each,
            dataHoraCotacao: each.dataHoraCotacao.split(" ")[0],
          };
        }),
        "dataHoraCotacao"
      );
      setCompra(unique.map((each) => each.cotacaoCompra).slice(0, diffDays));
      setVenda(unique.map((each) => each.cotacaoVenda).slice(0, diffDays));
      setDatas(unique.map((each) => each.dataHoraCotacao).slice(0, diffDays));
      console.log(
        unique.map((each) => each.dataHoraCotacao).slice(0, diffDays)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRss = async () => {
    const res = await fetch(
      `https://api.allorigins.win/get?url=https://news.google.com/rss/search?q=${
        topico + "+when:" + diffDays + "d"
      }`
    );
    const { contents } = await res.json();
    const items = new window.DOMParser()
      .parseFromString(contents, "text/xml")
      .querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      date: el.querySelector("pubDate").innerHTML,
    }));
    const unique = orderBy(
      uniqBy(
        feedItems.map((each) => {
          return {
            ...each,
            date: new Date(each.date).toISOString().split("T")[0],
          };
        }),
        "date"
      ),
      "date"
    );
    setDatasNoticias(unique.map((each) => each.date));
    setItems(unique.slice(0, diffDays));
    console.log(unique.slice(0, diffDays));
  };

  const submit = () => {
    getCotacao();
    handleRss();
  };

  useEffect(() => {
    getCotacao();
  }, [selectedMoeda]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    getMoedas();
    handleRss();
  }, []);

  return (
    <>
      <title>Cotação</title>
      <Menu />
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
              <input
                className="input"
                type="date"
                onChange={(e) => setDataIni(e.target.value)}
                value={formatDate(dataIni, "yyyy-mm-dd")}
              />
              <input
                className="input"
                type="date"
                onChange={(e) => setDataFim(e.target.value)}
                value={formatDate(dataFim, "yyyy-mm-dd")}
                // max={dateNow}
              />
              <select
                name="select"
                className="input"
                style={{ width: "200px" }}
                value={selectedMoeda}
                onChange={(e) => {
                  setSelectedMoeda(e.target.value);
                }}
              >
                {moedas?.length &&
                  moedas.map((each) => (
                    <option key={each.simbolo} value={each.simbolo}>
                      {each.nomeFormatado}
                    </option>
                  ))}
              </select>
              <select
                name="select"
                className="input"
                style={{ width: "200px" }}
                value={tipo}
                onChange={(e) => {
                  setTipo(e.target.value);
                }}
              >
                <option value="Compra">Compra</option>
                <option value="Venda">Venda</option>
              </select>
              <button
                onClick={submit}
                className="input"
                style={{ cursor: "pointer" }}
              >
                Enviar
              </button>
            </div>
            <div style={{ display: "flex" }}>
              {loading ? (
                <Progress />
              ) : (
                <GraficoRetangulo
                  data={currentData}
                  news={items}
                  datas={datas}
                  datasNoticias={datasNoticias}
                />
              )}
              <Alert data={currentData} />
            </div>
          </>
        )}
      </main>
    </>
  );
}
