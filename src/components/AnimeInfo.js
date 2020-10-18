import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  CardMedia,
  Card,
  Typography,
  Divider,
  CardContent,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    padding: "1rem",
    margin: "1rem 0",
  },
  cardImage: {
    margin: "1rem",
  },
  title: {
    fontFamily: "Acme",
    color: "#fff",
    textDecoration: "none",
  },
  synopsis: {
    letterSpacing: 2,
    fontFamily: "Open Sans",
  },
});

const AnimeInfo = (props) => {
  const classes = useStyles();
  const [anime, setAnimeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  useEffect(() => {
    getAnimeInfo();
  }, []);
  const getAnimeInfo = async () => {
    setLoading(true);
    await fetch(`https://api.jikan.moe/v3/anime/${props.match.params.id}`).then(
      async (response) => {
        const res = await response.json();
        setAnimeInfo(res);
      }
    );
    await fetch(
      `https://api.jikan.moe/v3/anime/${props.match.params.id}/characters_staff`
    ).then(async (response) => {
      const res = await response.json();
      if (res.characters.length > 18) {
        res.characters = res.characters.splice(0, 18);
      }
      setCharacters(res);
    });
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <CircularProgress size={80} thickness={5} />
      ) : (
        <div>
          <Card elevation={20} className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <CardMedia
                  component="img"
                  alt={anime.english_title}
                  height="90%"
                  image={anime.image_url}
                  title={anime.english_title}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="h4" className={classes.title}>
                  {anime.title_english}
                </Typography>
                <Divider style={{ margin: "1rem auto" }}></Divider>
                <Typography
                  component="p"
                  align="left"
                  className={classes.synopsis}>
                  {anime.synopsis}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Card elevation={20} className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6" align="left" className={classes.title}>
                  Information
                </Typography>
                <Divider></Divider>
                <Typography align="left" variant="subtitle1">
                  Type : {anime.type}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Episodes : {anime.episodes}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Status : {anime.status}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Aired : {anime.aired.string}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Premiered : {anime.premiered}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Broadcast : {anime.broadcast}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Producers : {anime.producers.map((item) => item.name + ", ")}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Studios : {anime.studios.map((item) => item.name + ", ")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6" align="left" className={classes.title}>
                  Statistics
                </Typography>
                <Divider></Divider>
                <Typography align="left" variant="subtitle1">
                  Score : {anime.score}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Rank : #{anime.rank}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Popularity : #{anime.popularity}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Members : {anime.members}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Favorites : {anime.favorites}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Card elevation={20} className={classes.card}>
            <Grid container>
              {characters.characters.map((character) => (
                <Grid item xs={6} sm={2}>
                  <img src={character.image_url} height={80}></img>
                  <CardContent>
                    <Button fullWidth href={character.url}>
                      <Typography variant="h6" className={classes.title}>
                        {character.name}
                      </Typography>
                    </Button>
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnimeInfo;
