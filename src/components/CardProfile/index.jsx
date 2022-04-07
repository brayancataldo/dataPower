import React from "react";
import "./styles.css";

export const CardProfile = ({ onClick, nome, user, src }) => {
  return (
    <div className="cardPerfis" onClick={onClick}>
      <img
        id="imgProfile"
        src={src || "https://oneflix.com.br/v3/media/img/content/user.jpg"}
      />
      <div>
        <p className="name">{nome}</p>
        <p className="user">@{user}</p>
      </div>
    </div>
  );
};
