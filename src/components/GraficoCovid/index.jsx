import React, { useEffect, useState } from "react";

export function GraficoCovid(props) {
  const [maiorConfirmed, setMaiorConfirmed] = useState();
  const [maiorDeaths, setMaiorDeaths] = useState();
  const [menorConfirmed, setMenorConfirmed] = useState();
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    if (props.data != undefined) {
      setData(props.data.slice(0, 30));
      console.log(props.data.slice(0, 30));
      setMaiorConfirmed(
        Math.max.apply(
          Math,
          props.data.slice(0, 30).map(function (o) {
            return o.Confirmed;
          })
        )
      );
      setMenorConfirmed(
        Math.min.apply(
          Math,
          props.data.slice(0, 30).map(function (o, index) {
            console.log(
              o.Confirmed -
                props.data.slice(0, 30)[index === 0 ? 0 : index - 1]?.Confirmed
            );
            return o.Confirmed;
          })
        )
      );
      setMaiorDeaths(
        Math.max.apply(
          Math,
          props.data.slice(0, 30).map(function (o) {
            return o.Deaths;
          })
        )
      );
      // for (var i = 0; i < props.data.slice(0, 30).length; i++) {
      //   if (
      //     props.data[i].Date?.includes("-01-01") ||
      //     props.data[i].Date?.includes("-06-01")
      //   ) {
      //     datas.push(
      //       props.data[i].Date.split("T")[0]?.split("-")[2] +
      //         "/" +
      //         props.data[i].Date.split("T")[0]?.split("-")[1] +
      //         "/" +
      //         props.data[i].Date.split("T")[0]?.split("-")[0]
      //     );
      //   }
      // }
    }
  }, [props.data]);

  const handleLongDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("pt-Br", { dateStyle: "long" });
  };

  const handleShortDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("pt-Br", { dateStyle: "short" });
  };

  return (
    <>
      <div className="container-neo-retangulo">
        <div className="values">
          <p>R$11</p>
          <p>R$33</p>
          <p>R$66</p>
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
                      // height={
                      //   props.value === "Confirmed"
                      //     ? `${
                      //         (each.Confirmed -
                      //           data[index === 0 ? 0 : index - 1].Confirmed) /
                      //         1400
                      //       }%`
                      //     : `${(each.Deaths / maiorDeaths) * 100}%`
                      // }
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
                      <div>
                        {((each.Confirmed ===
                        data[index === 0 ? 0 : index - 1]?.Confirmed
                          ? each.Confirmed
                          : each.Confirmed -
                            data[index === 0 ? 0 : index - 1]?.Confirmed) -
                          (menorConfirmed - menorConfirmed)) *
                          0.2}
                      </div>
                      <div>
                        {each.Confirmed ===
                        data[index === 0 ? 0 : index - 1]?.Confirmed
                          ? each.Confirmed
                          : each.Confirmed -
                            data[index === 0 ? 0 : index - 1]?.Confirmed}
                      </div>
                      {/* <div>R${each.high}</div>
                      {props.news[index]?.date && (
                        <div className="date">
                          {handleLongDate(props.news[index]?.date)}
                        </div>
                      )}
                      <div className="titleNews">
                        {props.news[index]?.title}
                      </div>
                      <a
                        className="link"
                        href={props.news[index]?.link}
                        target="_blank"
                      >
                        Ver notícia
                      </a>{" "} */}
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
