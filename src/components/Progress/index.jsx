import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CenterComponent from "../Center";

export default function Progress({ forceCenter, ...props }) {
  return (
    <CenterComponent {...props} force={forceCenter}>
      <CircularProgress />
    </CenterComponent>
  );
}
