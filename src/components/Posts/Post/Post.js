import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import Truncate from "react-text-truncate";

const Post = ({ post, setCurrentId }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("token"));
  // console.log(user.result);
  // console.log(post);

  useEffect(() => {}, [location]);

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div onClick={openPost} style={{ cursor: "pointer" }}>
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {post?.creator === user?.result?._id && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography color="textSecondary" component="p">
            <Truncate text={post.message} line={2} />
          </Typography>
        </CardContent>
      </div>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            &nbsp;Delete&nbsp;
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
