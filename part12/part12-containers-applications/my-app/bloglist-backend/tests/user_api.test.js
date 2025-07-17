const { test, describe, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const User = require("../models/user");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

const api = supertest(app);

const initialUsers = [
  {
    username: "test",
    name: "fake",
    password: "asjuidniaosjd",
  },
  {
    username: "singu",
    name: "wasifa",
    password: "test123",
  },
  {
    username: "rikth",
    name: "megaeonise",
    password: "megaonise24",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const promiseArray = initialUsers.map((user) =>
    api.post("/api/users").send(user)
  );

  await Promise.all(promiseArray);
});

describe("when there are some users saved initially", () => {
  test("invalid users are not created", async () => {
    const newUsers = [
      {
        username: "test",
        name: "fake",
        password: "asjuidniaosjd",
      },
      {
        username: "singu",
        name: "wasifa",
        password: "test123",
      },
      {
        username: "rikth",
        name: "megaeonise",
        password: "megaonise24",
      },
    ];

    const promiseArray = newUsers.map((user) =>
      api.post("/api/users").send(user)
    );

    await Promise.all(promiseArray);

    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    console.log(response.body);
    assert.strictEqual(response.body.length, initialUsers.length);
  });

  test("400 expected username to be unique returned if username is not unique", async () => {
    const newUser = {
      username: "test",
      name: "i will break",
      password: "correct password",
    };

    const request = await api.post("/api/users").send(newUser).expect(400);

    assert.strictEqual(request.status, 400);
    assert.strictEqual(
      request.text,
      '{"error":"expected `username` to be unique"}'
    );
  });
  test("400 bad request returned if username is less than 3 characters in length", async () => {
    const newUser = {
      username: "2l",
      name: "i will break",
      password: "correct password",
    };

    const request = await api.post("/api/users").send(newUser).expect(400);

    assert.strictEqual(request.status, 400);
    assert.strictEqual(request.text, '{"error":"Bad Request"}');
  });
  test("400 bad request returned if password is less than 3 characters in length", async () => {
    const newUser = {
      username: "correct username",
      name: "i will break",
      password: "2l",
    };

    const request = await api.post("/api/users").send(newUser).expect(400);

    assert.strictEqual(request.status, 400);
    assert.strictEqual(request.text, '{"error":"Bad Request"}');
  });
});

after(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await mongoose.connection.close();
});
