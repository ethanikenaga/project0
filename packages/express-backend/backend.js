// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.delete("/users/:id", (req, res) => {
  userService
    .removeUser(req.params.id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
        return;
      }

      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/users", (req, res) => {
  userService
    .getUsers(req.query.name, req.query.job)
    .then((users) => {
      res.json({ users_list: users });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
        return;
      }

      res.json(user);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
