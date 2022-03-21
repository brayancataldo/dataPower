import React, { useEffect, useState } from "react";
import { RiArrowDropUpFill, RiArrowDropDownFill } from "react-icons/ri";
import { BsDot } from "react-icons/bs";

export function Alert(props) {
  const [number, setNumber] = useState();

  useEffect(() => {
    if (props.data) {
      setNumber(
        (
          ((props.data[props.data.length - 1] - props.data[0]) * 100) /
          props.data[0]
        ).toFixed(2)
      );
    }
  }, [props]);

  return (
    <>
      {props.data ? (
        <div className="container-neo-retangulo">
          <h1 className="perc">{number}%</h1>
          {Math.sign(number) === -1 ? (
            <RiArrowDropDownFill size="60px" color="#ed1c24" />
          ) : Math.sign(number) === 1 ? (
            <RiArrowDropUpFill size="60px" color="#06d6a0" />
          ) : (
            <BsDot size="60px" color="#0075c9" />
          )}
        </div>
      ) : (
        <div className="container-neo-retangulo">
          <h1 className="perc">0.00%</h1>
        </div>
      )}
    </>
  );
}
