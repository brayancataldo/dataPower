import React, { useEffect, useState } from "react";
import { handleLongDate } from "../../util/format";

export function GraficoRetangulo(props) {
  const [data, setData] = useState();
  const [maiorAlta, setMaiorAlta] = useState();
  const [menorAlta, setMenorAlta] = useState();
  const [medioAlta, setMedioAlta] = useState();

  useEffect(() => {
    if (props.data != undefined) {
      setData(props.data);
      const array = props.data.map((each) => each.high);
      setMedioAlta(
        array.sort((a, b) => a - b)[Math.round(array.length / 2 - 1)]
      );
      console.log(
        array.sort((a, b) => a - b)[Math.round(array.length / 2 - 1)]
      );
      setMaiorAlta(
        Math.max.apply(
          Math,
          props.data.map(function (o) {
            return o.high;
          })
        )
      );
      setMenorAlta(
        Math.min.apply(
          Math,
          props.data.map(function (o) {
            return o.high;
          })
        )
      );
      console.log(props.data);
      console.log(maiorAlta);
    }
  }, [props.data]);

  if (!props.news) return;

  return (
    <>
      <div className="container-neo-retangulo">
        <div className="values">
          <p>R${maiorAlta}</p>
          <p>R${medioAlta}</p>
          <p>R${menorAlta}</p>
        </div>
        <div
          style={{
            flexDirection: "row",
            height: "200px",
            width: "700px",
          }}
        >
          {data &&
            props.news &&
            data.map((each, index) => {
              return (
                <>
                  <div className="tooltips">
                    <svg
                      id="svg-retangulo"
                      height={`${
                        (each.high - (menorAlta - menorAlta / 100)) * 600
                      }%`}
                      width="18px"
                    />
                    <span>
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
                      </a>
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
