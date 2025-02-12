const usersRouter = require("express").Router();
const User = require("../models/user");
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");

usersRouter.post("/users", async (request, response) => {
  const { username, name, password } = request.body;
  if (password.length >= 3) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
      blogs: [],
    });
    const result = await user.save();
    response.status(201).json(result);
  } else {
    response.status(400).json({ error: "Bad Request" });
  }
});

usersRouter.get("/users", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
