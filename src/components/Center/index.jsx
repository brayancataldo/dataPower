import useStyles from "./styles";
import Box from "@mui/material/Box";

export default function CenterComponent({ children, force, height, ...other }) {
  const classes = useStyles({ height, force });

  return (
    <Box {...other} className={classes.root}>
      {children}
    </Box>
  );
}
