import React from "react";
import "./styles.css";

export const CardProfile = ({ onClick, nome, user, src }) => {
  return (
    <div className="cardPerfis" onClick={onClick}>
      <img src={src} />
      <div>
        <p className="name">{nome}</p>
        <p className="user">@{user}</p>
      </div>
    </div>
  );
};
