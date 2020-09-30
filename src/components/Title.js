import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flex: "wrap",
    flexDirection: "column",
    padding: "8px 20px 8px 20px",
    alignItems: "center",
    backgroundColor: "#4648aa",
    color: "white",
  },
  bold: {
    fontWeight: "700",
  },
  light: {
    fontWeight: "200",
  },
}));

export default function Title() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="inherit">
        <span className={classes.bold}>Focus</span>
        <span className={classes.light}>alarm</span>
      </Typography>
      <Typography variant="h6" color="inherit">
      An alarm for <span className={classes.bold}>Focus</span><span className={classes.light}>mate</span>
      </Typography>
    </div>
  );
}
