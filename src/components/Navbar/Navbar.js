import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import useStyles from "./styles";

import games from "../../images/games.png";
import gamesTitle from "../../images/gamestitle.png";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  // console.log(user?.token);
  // console.log(user);

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("token")));

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    // console.log(token);
  }, [location]);
  // console.log(user.token);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <div style={{ marginTop: "12px" }}>
          <img
            src={gamesTitle}
            alt="GAMES"
            component={Link}
            to="/"
            className={classes.heading}
          />
        </div>

        <div>
          <img
            src={games}
            className={classes.image}
            alt="memories"
            height="60"
          />
        </div>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Typography className={classes.userName} variant="h6">
              {user.result.name ? user.result.name : "Cannot get Your Name"}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
              // onMouseOver={classes.over}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
