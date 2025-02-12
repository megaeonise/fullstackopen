const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else {
    const compareFunc = (a, b) => {
      return b.likes - a.likes;
    };
    blogs.sort(compareFunc);
    return blogs[0];
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else {
    const compareFunc = (a, b) => {
      return b.blogs - a.blogs;
    };
    let author_list = _.uniq(blogs.map((blog) => blog.author));
    let author_object = [];
    author_list.forEach((author_name) =>
      author_object.push({ author: author_name, blogs: 0 }),
    );
    blogs.forEach(
      (blog) =>
        (author_object[
          author_object.findIndex((authors) => authors.author === blog.author)
        ].blogs += 1),
    );
    return author_object.sort(compareFunc)[0];
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else {
    const compareFunc = (a, b) => {
      return b.likes - a.likes;
    };
    const author_list = _.uniq(blogs.map((blog) => blog.author));
    let author_object = [];
    author_list.forEach((author_name) =>
      author_object.push({ author: author_name, likes: 0 }),
    );
    blogs.forEach(
      (blog) =>
        (author_object[
          author_object.findIndex((authors) => authors.author === blog.author)
        ].likes += blog.likes),
    );
    return author_object.sort(compareFunc)[0];
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
