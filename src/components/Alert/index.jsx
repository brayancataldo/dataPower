import React, { useEffect, useState } from "react";

export function Alert(props) {
  return (
    <>
      {props.data ? (
        <div className="container-neo-retangulo">
          <h1 className="perc">
            {/* {props.data[0]?.high < props.data[props.data.length - 1]?.high
              ? "+"
              : ""} */}
            {(
              ((props.data[props.data.length - 1]?.high - props.data[0]?.high) *
                100) /
              props.data[0]?.high
            ).toFixed(2)}
            %
          </h1>
        </div>
      ) : (
        <div className="container-neo-retangulo">
          <h1 className="perc">0.00%</h1>
        </div>
      )}
    </>
  );
}
