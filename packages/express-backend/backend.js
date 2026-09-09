// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const deletedUserById = (id) => {
    const userIndex = users["users_list"].findIndex(
        (user) => user["id"] === id);
    if (userIndex === -1) {
        return undefined;
    }
    const [deletedUser] = users["users_list"].splice(userIndex, 1);
    return deletedUser;
}
app.delete("/users/:id", (req, res) => {
    const deletedUser = deletedUserById(req.params.id);
    if (deletedUser === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(deletedUser);
    }
});

app.get("/users", (req, res) => {
  const name = req.query.name;

  if (name !== undefined) {
    const result = { users_list: findUserByName(name) };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};