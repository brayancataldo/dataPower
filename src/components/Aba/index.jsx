import React from "react";

export function Aba(props) {
  return (
    <div className="aba-before" onClick={props.onClick}>
      <div
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.icon}
      </div>
      <div style={{ width: "100%" }}>{props.children}</div>
    </div>
  );
}
