import React, { useEffect, useState } from "react";
import { handleLongDate } from "../../util/format";

export function GraficoCovid(props) {
  const [maiorConfirmed, setMaiorConfirmed] = useState();
  const [maiorDeaths, setMaiorDeaths] = useState();
  const [menorConfirmed, setMenorConfirmed] = useState();
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState();

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
      setMenorConfirmed(
        Math.min.apply(
          Math,
          props.data.map(function (o, index) {
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
    }
  }, [props.data]);

  return (
    <>
      <div className="container-neo-retangulo">
        <div className="values">
          <p>{maiorConfirmed}</p>
          <p>{menorConfirmed}</p>
        </div>
        <div
          style={{
            flexDirection: "row",
            height: "180px",
            width: "700px",
            margin: "10px",
          }}
        >
          {data &&
            data.map((each, index) => {
              return (
                <>
                  <div className="tooltips">
                    <svg
                      id="svg-retangulo"
                      height={`${
                        ((each.Confirmed ===
                        data[index === 0 ? 0 : index - 1]?.Confirmed
                          ? each.Confirmed
                          : each.Confirmed -
                            data[index === 0 ? 0 : index - 1]?.Confirmed) -
                          (menorConfirmed - menorConfirmed)) *
                        0.2
                      }%`}
                      width="18px"
                    />
                    <span>
                      <div className="date">{handleLongDate(each.Date)}</div>
                      <div className="titleNews">
                        {each.Confirmed ===
                        data[index === 0 ? 0 : index - 1]?.Confirmed
                          ? each.Confirmed
                          : each.Confirmed -
                            data[index === 0 ? 0 : index - 1]?.Confirmed}
                        &nbsp; Casos
                      </div>
                    </span>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
