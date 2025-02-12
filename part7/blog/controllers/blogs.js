const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");

blogsRouter.get("/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/blogs", async (request, response) => {
  if (!request.user.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(request.user.id);
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: user.id,
    likes: request.body.likes,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/blogs/:id", async (request, response) => {
  if (!request.user.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    response.status(404).json({ error: "blog does not exist" });
  }
  if (blog.user.toString() === request.user.id) {
    const user = await User.findById(request.user.id);
    user.blogs = user.blogs.filter((blog_id) => blog_id != request.params.id);
    await user.save();
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    response.status(403).json({ error: "blog does not belong to user" });
  }
});

blogsRouter.put("/blogs/:id", async (request, response) => {
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };
  const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
    runValidators: true,
  });
  response.json(result);
});

module.exports = blogsRouter;
