import React from "react";
import "./styles.css";

export function Modal({ children, show }) {
  return (
    <>
      {show && (
        <div className="modal-container">
          <div className="modal">{children}</div>
        </div>
      )}
    </>
  );
}
