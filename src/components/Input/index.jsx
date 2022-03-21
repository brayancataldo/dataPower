import React from "react";
import "./styles.css";

export function Input({ title, error, isInvalid, required, ...props }) {
  return (
    <div className="inputGlobal">
      <p>
        {title}
        {required && <strong>*</strong>}
      </p>
      <input {...props} />
      {isInvalid && <p id="error">{error}</p>}
    </div>
  );
}
