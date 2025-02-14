import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = (token) => {
  const request = axios
    .get(baseUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
  return request.then((response) => response.data);
};

const addBlog = (token, blog) => {
  const request = axios.post(baseUrl, blog, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return request.then((response) => response.data);
};

const addComment = (token, blog) => {
  const url = baseUrl + `/${blog.id}/comments`;
  const request = axios.put(url, blog, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return request.then((response) => response.data);
};

const addLike = (token, blog) => {
  const url = baseUrl + `/${blog.id}`;
  const request = axios.put(url, blog, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return request.then((response) => response.data);
};

const deleteBlog = (token, blogId) => {
  const url = baseUrl + `/${blogId}`;
  const request = axios.delete(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return request.then((response) => response.data);
};

export default { getAll, addBlog, addLike, deleteBlog, addComment };
