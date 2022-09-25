import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";
import Pagination from "../Pagination";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
  // console.log(useNavigate());
};
// console.log(useQuery());

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  // console.log(tags);
  // console.log(useLocation());
  // console.log(page);
  // console.log(query);
  // console.log(query);
  // console.log(searchQuery);

  const handleClear = () => {
    setSearch("");
    setTags([]);
    navigate("/");
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${
          tags.join(",") || "none"
        }`
      );
    } else {
      navigate("/posts");
    }
  };

  const handleKeyPass = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  useEffect(() => {}, [page, query]);

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPass}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
              <Button
                onClick={handleClear}
                className={classes.searchButton}
                color="secondary"
                variant="contained"
                style={{ marginTop: "5px" }}
              >
                Clear
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagnination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
