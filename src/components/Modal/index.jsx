import React from "react";
import "./styles.css";

export function Modal({ children, show, title }) {
  return (
    <>
      {show && (
        <div className="modal-container">
          <div className="modal">
            <h4>{title}</h4>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
