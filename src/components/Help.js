import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
   margin: theme.spacing(2)
  },
}));

export default function Title() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Typography variant="body2">
     This extension's creator is looking for a job. <a rel="noreferrer noopener" target="_blank" href="https://github.com/yaeluria/Focusalarm">Here's</a> how you can help her get hired.
    </Typography>
    </div>
  );
}
