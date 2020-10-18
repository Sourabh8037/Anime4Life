import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: "1rem",
  },
  title: {
    fontFamily: "Patrick Hand",
  },
}));

const Quotes = (props) => {
  const classes = useStyles();
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    addQuotes();
  }, []);

  const getQuote = async () => {
    await fetch("https://animechanapi.xyz/api/quotes/random").then(
      async (response) => {
        const res = await response.json();
        setQuote((quote) => quote.concat(res.data[0]));
      }
    );
  };

  const addQuotes = async () => {
    setLoading(true);
    setQuote([]);
    for (let index = 0; index < 5; index++) {
      await getQuote();
    }
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress size={80} thickness={5} />
      ) : (
        quote.map((item) => (
          <div key={item.anime}>
            <Typography variant="h5" className={classes.title}>
              {item.quote}
            </Typography>
            <Typography variant="h6" align="right">
              -{item.character}
            </Typography>
            <Divider style={{ margin: "1rem auto" }}></Divider>
          </div>
        ))
      )}
      {loading ? null : (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={addQuotes}>
          View New Quotes
        </Button>
      )}
    </div>
  );
};

export default Quotes;
