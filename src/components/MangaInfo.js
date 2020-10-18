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
    fontFamily:"Open Sans"
  },
});

const MangaInfo = (props) => {
  const classes = useStyles();
  const [manga, setMangaInfo] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAnimeInfo();
  }, []);
  const getAnimeInfo = async () => {
    setLoading(true);
    await fetch(`https://api.jikan.moe/v3/manga/${props.match.params.id}`).then(
      async (response) => {
        const res = await response.json();
        setMangaInfo(res);
      }
    );
    await fetch(
      `https://api.jikan.moe/v3/manga/${props.match.params.id}/characters`
    ).then(async (response) => {
      let res = await response.json();
      if(res.characters.length > 18){
        res.characters = res.characters.splice(0,18);
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
                  alt={manga.english_title}
                  height="90%"
                  image={manga.image_url}
                  title={manga.english_title}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="h4" className={classes.title}>
                  {manga.title_english}
                </Typography>
                <Divider style={{ margin: "1rem auto" }}></Divider>
                <Typography
                  component="p"
                  align="left"
                  className={classes.synopsis}>
                  {manga.synopsis}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Card elevation={20} className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6" align="left">
                  Information
                </Typography>
                <Divider></Divider>
                <Typography align="left" variant="subtitle1">
                  Authors : {manga.authors.map((item) => item.name + ", ")}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Genres : {manga.genres.map((item) => item.name + ", ")}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Type : {manga.type}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Volumes : {manga.volumes}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Chapters : {manga.chapters}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Published : {manga.published.string}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6" align="left">
                  Statistics
                </Typography>
                <Divider></Divider>
                <Typography align="left" variant="subtitle1">
                  Rating : {manga.score}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Rank : #{manga.rank}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Popularity : #{manga.popularity}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Members : {manga.members}
                </Typography>
                <Typography align="left" variant="subtitle1">
                  Favorites : {manga.favorites}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Card elevation={20} className={classes.card}>
            <Grid container>
              {characters.characters.map((character) => (
                <Grid item xs={3} sm={2}>
                  <img src={character.image_url} height={80} width={50}></img>
                  <CardContent>
                    <Button href={character.url} link fullWidth>
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

export default MangaInfo;
