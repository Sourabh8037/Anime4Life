import {
  CircularProgress,
  Grid,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  dropDown: {
    width: "100%",
    height: "2rem",
  },
}));

const Manga = (props) => {
  const classes = useStyles();
  const [recommendations, setRecommendations] = useState([]);
  const [mangaId, setMangaId] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [mangaList, setMangaList] = useState([]);
  const [mangaText, setMangaText] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getRecommendations();
  }, []);
  const onClickManga = (mal_id) => {
    props.history.push(`/mangaInfo/${mal_id}`);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getList = async (text) => {
    await fetch(
      `https://api.jikan.moe/v3/search/manga?q=${text}&page=1&limit=20`
    ).then(async (response) => {
      const res = await response.json();
      setMangaList(res.results);
    });
  };
  const getRecommendations = async () => {
    setLoading(true);
    await fetch("https://api.jikan.moe/v3/manga/1/recommendations").then(
      async (response) => {
        const res = await response.json();
        setRecommendations(res.recommendations.slice());
      }
    );
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <CircularProgress size={80} thickness={5} />
      ) : (
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"No Manga Selected!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please select a manga first.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container>
            <Grid item xs={10}>
              <Autocomplete
                id="combo-box-demo"
                className={classes.dropDown}
                options={mangaList}
                value={mangaText}
                onChange={(event, newValue) => {
                  setMangaText(newValue);
                }}
                onInputChange={(event, value, reason) => {
                  console.log(value);
                  if (value.length > 2) {
                    getList(value);
                  }
                }}
                getOptionLabel={(option) => {
                  setMangaId(option.mal_id);
                  return option.title;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Manga"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => {
                  if (mangaId !== undefined) {
                    onClickManga(mangaId);
                  } else {
                    handleClickOpen();
                  }
                }}>
                <SearchIcon></SearchIcon>
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            {recommendations.map((item) => (
              <Grid item xs={12} sm={4} md={3}>
                <Card anime={item} onCardClick={onClickManga} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Manga;
