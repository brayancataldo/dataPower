import React, { useEffect, useState } from "react";
import "./styles.css";

export function Grafico(props) {
  const [data, setData] = useState();
  const [maiorConfirmed, setMaiorConfirmed] = useState();
  const [maiorDeaths, setMaiorDeaths] = useState();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (props.data != undefined) {
      setData(props.data);
      setMaiorConfirmed(
        Math.max.apply(
          Math,
          props.data.map(function (o) {
            return o.Confirmed;
          })
        )
      );
      setMaiorDeaths(
        Math.max.apply(
          Math,
          props.data.map(function (o) {
            return o.Deaths;
          })
        )
      );
      for (var i = 0; i < props.data.length; i++) {
        if (
          props.data[i].Date.includes("-01-01") ||
          props.data[i].Date.includes("-06-01")
        ) {
          datas.push(
            props.data[i].Date.split("T")[0].split("-")[2] +
              "/" +
              props.data[i].Date.split("T")[0].split("-")[1] +
              "/" +
              props.data[i].Date.split("T")[0].split("-")[0]
          );
        }
      }
    }
  }, [props.data]);

  return (
    <>
      <div className="container-neo-retangulo">
        <div> {props.value === "Confirmed" ? "Casos" : "Mortes"}</div>
        <div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              height: "180px",
              transform: "rotate(180deg) scaleX(-1)",
            }}
          >
            {data &&
              data.map((each, index) => {
                return (
                  <>
                    <svg
                      id="svg"
                      height={
                        props.value === "Confirmed"
                          ? `${
                              (each.Confirmed -
                                data[index === 0 ? 0 : index - 1].Confirmed) /
                              1400
                            }%`
                          : `${(each.Deaths / maiorDeaths) * 100}%`
                      }
                      width="0.70px"
                    ></svg>
                  </>
                );
              })}
          </div>
          <div className="info">
            {datas &&
              datas.map((each) => {
                return (
                  <>
                    <p id="info-data">{each}</p>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
