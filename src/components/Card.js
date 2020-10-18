import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 310,
  },
});

export default function AnimeCard(props) {
  const classes = useStyles();
  const { anime } = props;
  return (
    <Card component="button" className={classes.root}>
      <CardActionArea onClick={() => props.onCardClick(anime.mal_id)}>
        <CardMedia
          component="img"
          alt={props.title}
          height="220"
          image={anime.image_url}
          title={anime.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {anime.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
