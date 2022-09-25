import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import moment from "moment";
import Truncate from "react-text-truncate";
import useStyles from "./styles";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  // const [recommendedPost, seRecommendedPost] = useState({});
  // console.log("YES", post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  // console.log(id);

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  // useEffect(() => {
  //   seRecommendedPost(suggestPost);
  // }, []);
  const recommendedPost = posts?.filter(({ _id }) => _id !== id); // keep all except the present post // filtering out current post and keeping all post

  // console.log(recommendedPost);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section} elevation={6}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPost?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          {post._id === undefined ? (
            <Paper className={classes.loadingPaper} elevation={6}>
              <CircularProgress />
            </Paper>
          ) : (
            <div className={classes.recommendedPosts}>
              {recommendedPost.map(
                ({ title, message, name, likes, selectedFile, _id }) => {
                  console.log(_id);
                  return (
                    <div
                      style={{ margin: "20px", cursor: "pointer" }}
                      onClick={() => openPost(_id)}
                      key={_id}
                    >
                      <Paper
                        style={{
                          padding: "5px",
                          borderRadius: "6px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        elevation={2}
                      >
                        <Typography gutterBottom variant="h6">
                          {title}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                          {name}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                          <Truncate text={message} line={1} />
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Likes: {likes.length}
                        </Typography>
                        <img
                          style={{ borderRadius: "5px" }}
                          src={selectedFile}
                          width="200px"
                        />
                      </Paper>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
