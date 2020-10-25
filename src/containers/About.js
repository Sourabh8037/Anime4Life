import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "4rem",
    margin: "1.5rem auto 1rem",
    fontWeight: "500",
    fontFamily: "Patrick Hand",
    textShadow: "0 0 10px #ff0, 0 0 50px #ff0",
  },
  image: {
    [theme.breakpoints.up("sm")]: {
      height: 400,
      width: 600,
    },
    [theme.breakpoints.down("sm")]: {
      height: 200,
      width: 300,
    },
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <div>
      <img
        src={require("../assets/images/animeCharacters.jpg")}
        className={classes.image}
      />
      <Typography className="title">
        ANIME 4 LIFE
      </Typography>
    </div>
  );
};

export default About;
