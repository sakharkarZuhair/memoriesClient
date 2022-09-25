import axios from "axios";

// const url = "https://memories-project-zuhair.herokuapp.com/posts";
const API = axios.create({ baseURL: "http://localhost:5000" });
// const url = "http://localhost:5000/posts";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).token
    }`;
  }
  // console.log(req.headers.Authroization);
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags || "none"
    }`
  );

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/users/signIn", formData);

export const signUp = (formData) => API.post("/users/signUp", formData);
