import React, { useEffect, useState } from "react";
import "./styles.css";

export const Line = ({
  styles,
  setL1,
  setL2,
  setL3,
  setL4,
  setL5,
  l1,
  l2,
  l3,
  l4,
  l5,
}) => {
  const palavraAtual = [l1, l2, l3, l4, l5];
  console.log(palavraAtual);

  return (
    <div className="line">
      <input
        className="inp"
        style={{ backgroundColor: styles ? styles.color1 : "" }}
        value={l1}
        onChange={(e) => setL1(e.target.value)}
        maxLength={1}
      />
      <input
        className="inp"
        style={{ backgroundColor: styles ? styles.color2 : "" }}
        value={l2}
        onChange={(e) => setL2(e.target.value)}
        maxLength={1}
      />
      <input
        className="inp"
        style={{ backgroundColor: styles ? styles.color3 : "" }}
        value={l3}
        onChange={(e) => setL3(e.target.value)}
        maxLength={1}
      />
      <input
        className="inp"
        style={{ backgroundColor: styles ? styles.color4 : "" }}
        value={l4}
        onChange={(e) => setL4(e.target.value)}
        maxLength={1}
      />
      <input
        className="inp"
        style={{ backgroundColor: styles ? styles.color5 : "" }}
        value={l5}
        onChange={(e) => setL5(e.target.value)}
        maxLength={1}
      />
    </div>
  );
};
