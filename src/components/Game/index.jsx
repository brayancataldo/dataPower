import React, { useEffect, useState } from "react";
import "./styles.css";
import { Line } from "../Game/Line";

export default function Game() {
  const [styles, setStyles] = useState({
    color1: "yellow",
    color2: "white",
    color3: "yellow",
    color4: "white",
    color5: "green",
  });
  const [l1, setL1] = useState("");
  const [l2, setL2] = useState("");
  const [l3, setL3] = useState("");
  const [l4, setL4] = useState("");
  const [palavraAtual, setPalavraAtual] = useState(["", "", "", "", ""]);
  const palavraCerta = ["f", "e", "s", "t", "a"];
  // const palavraAtual = ["", "", "", "", ""];
  console.log(palavraAtual.join(""));

  const onSubmit = (p) => {
    console.log(p[1], palavraCerta[1]);
    if (p[1] == palavraCerta[1]) {
      setStyles({ ...styles, color1: "green" });
    }
    if (p[2] == palavraCerta[2]) {
      setStyles({ ...styles, color2: "green" });
    }
    if (p[3] == palavraCerta[3]) {
      setStyles({ ...styles, color3: "green" });
    }
    if (p[4] == palavraCerta[4]) {
      setStyles({ ...styles, color4: "green" });
    }
    if (p[5] == palavraCerta[5]) {
      setStyles({ ...styles, color5: "green" });
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        console.log("enter");
        onSubmit(palavraAtual);
        console.log(styles);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const parseArray = (e, i) => {
    const arr = palavraAtual;
    arr[i] = e.target.value;
    console.log(arr);
    setPalavraAtual(arr);
  };
  console.log(palavraAtual);

  useEffect(() => {}, []);

  return (
    <div className="game">
      {/* <Line
        styles={styles}
        setL1={setL1}
        setL2={setL2}
        setL3={setL3}
        setL4={setL4}
        setL5={setL5}
        l1={l1}
        l2={l2}
        l3={l3}
        l4={l4}
        l5={l5}
      /> */}
      {palavraAtual
        .map((e) => {
          return "";
        })
        .map((each, index) => (
          <div style={{ display: "flex", color: "blue", flexDirection: "row" }}>
            <input
              className="inp"
              style={{ backgroundColor: styles ? styles.color1 : "" }}
              value={each}
              type="text"
              onChange={(e) => parseArray(e, index)}
              // maxLength={1}
            />
          </div>
        ))}
    </div>
  );
}
