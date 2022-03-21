import React from "react";

export const CardRow = ({ onClick, title }) => {
  return (
    <div className="card" onClick={onClick}>
      <p>{title}</p>
    </div>
  );
};
