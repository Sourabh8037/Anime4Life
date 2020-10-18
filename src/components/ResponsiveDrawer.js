import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import TvIcon from "@material-ui/icons/Tv";
import Anime from "../containers/Anime";
import InfoIcon from "@material-ui/icons/Info";
import About from "../containers/About";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Quotes from "../containers/Quotes";
import Manga from "../containers/Manga";
import BookIcon from "@material-ui/icons/Book";
import AnimeInfo from "./AnimeInfo";
import MangaInfo from "./MangaInfo";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    fontFamily: "Patrick Hand",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  linkActive: {
    textDecoration: "none",
    color: "#fff",
    background: "rgba(255,255,255,0.3)",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const menuArr = [
  {
    title: "Anime",
    icon: <TvIcon></TvIcon>,
    path: "/anime",
  },
  {
    title: "Manga",
    icon: <BookIcon></BookIcon>,
    path: "/manga",
  },
  {
    title: "Quotes",
    icon: <FormatQuoteIcon></FormatQuoteIcon>,
    path: "/quotes",
  },
  {
    title: "About",
    icon: <InfoIcon></InfoIcon>,
    path: "/about",
  },
];

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuArr.map((item, index) => (
          <NavLink
            to={item.path}
            key={item.title}
            exact
            activeClassName={classes.linkActive}
            className={classes.link}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title} noWrap>
            Anime 4 Life
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/anime" exact component={Anime}></Route>
          <Route path="/manga" exact component={Manga}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/quotes" exact component={Quotes}></Route>
          <Route path="/animeInfo/:id" exact component={AnimeInfo}></Route>
          <Route path="/mangaInfo/:id" exact component={MangaInfo}></Route>
          <Redirect to="/anime"></Redirect>
        </Switch>
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
