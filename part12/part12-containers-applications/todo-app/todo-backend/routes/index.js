const express = require("express");
const router = express.Router();
const { getAsync } = require("../redis/index");
const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});
router.get("/statistics", async (req, res) => {
  const counter = await getAsync("added_todos");
  if (!counter) {
    res.send({ added_todos: 0 });
  } else {
    res.send({ added_todos: Number(counter) });
  }
});
module.exports = router;
