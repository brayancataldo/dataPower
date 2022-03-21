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
      setMedioAlta(
        props.data.sort((a, b) => a - b)[Math.round(props.data.length / 2 - 1)]
      );
      setMaiorAlta(Math.max.apply(Math, props.data));
      setMenorAlta(Math.min.apply(Math, props.data));
    }
  }, [props.data]);

  if (!props.news) return;

  return (
    <div className="container-neo-retangulo">
      <div className="values">
        <p>R${maiorAlta}</p>
        <p>R${medioAlta}</p>
        <p>R${menorAlta}</p>
      </div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {data &&
          props.news &&
          data.map((each, index) => {
            const objAtual = props.news.find(
              (each) => each.date === props.datas[index]
            );
            return (
              <>
                <div className="tooltips">
                  <svg
                    id="svg-retangulo"
                    height={`${(each - (menorAlta - menorAlta / 300)) * 250}px`}
                    width={`${data / 100}px`}
                  />
                  {objAtual ? (
                    <span>
                      <p className="date">{handleLongDate(objAtual.date)}</p>
                      <p className="titleNews">{objAtual.title}</p>
                      <a className="link" href={objAtual.link} target="_blank">
                        <p>Ver notícia</p>
                      </a>
                    </span>
                  ) : (
                    <span>
                      <div className="titleNews">Sem informações</div>
                    </span>
                  )}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
