import React from "react";
import "./styles.css";

export function Button({ placeholder, ...props }) {
  return (
    <button className="buttonGlobal" {...props}>
      {placeholder}
    </button>
  );
}
