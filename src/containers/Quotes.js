import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import "../App.css";

const Quotes = (props) => {
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
    for (let index = 0; index < 8; index++) {
      await getQuote();
    }
    setLoading(false);
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      padding: "1rem",
    }}>
      {loading ? (
        <CircularProgress size={80} thickness={5} />
      ) : (
        quote.map((item) => (
          <div key={item.anime}>
            <Typography variant="h5" style={{fontFamily:"Patrick Hand"}}>
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
        // <Button
        //   variant="outlined"
        //   color="primary"
        //   fullWidth
        //   size="large"
        //   className={classes.btn}
        //   onClick={addQuotes}>
        //   <Typography className={classes.title}>
        //   View New Quotes
        //   </Typography>
        // </Button>
        <Button
          color="primary"
          fullWidth
          size="large"
          className="linear-gradient-btn"
          onClick={addQuotes}>
          View New Quotes
        </Button>
      )}
    </div>
  );
};

export default Quotes;
