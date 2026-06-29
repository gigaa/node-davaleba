const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    age: 21,
    name: "gio",
    email: "gio@gmail.com",
    eyecolor: "blue",
  },
  {
    id: 2,
    age: 22,
    name: "nika",
    email: "nika@gmail.com",
    eyecolor: "brown",
  },
  {
    id: 3,
    age: 23,
    name: "max",
    email: "max@gmail.com",
    eyecolor: "green",
  },
  {
    id: 4,
    age: 17,
    name: "jack",
    email: "jack@gmail.com",
    eyecolor: "blue",
  },
  {
    id: 5,
    age: 18,
    name: "kate",
    email: "kate@gmail.com",
    eyecolor: "green",
  },
  {
    id: 6,
    age: 21,
    name: "mia",
    email: "mia@gmail.com",
    eyecolor: "black",
  },
  {
    id: 7,
    age: 25,
    name: "lika",
    email: "lika@gmail.com",
    eyecolor: "blue",
  },
  {
    id: 8,
    age: 30,
    name: "jain",
    email: "jain@gmail.com",
    eyecolor: "brown",
  },
  {
    id: 9,
    age: 25,
    name: "tom",
    email: "tom@gmail.com",
    eyecolor: "green",
  },
];

app.get("/users", (req, res) => {
  let { page = 1, take = 4 } = req.query;
  take > 4 ? (take = 4) : take;
  res.json(users.slice((page - 1) * take, page * take));
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUsers = users.find((el) => el.id === Number(id));
  if (!findUsers) {
    return res.status(400).json({ message: "Users Not Found" });
  }
  res.json({ data: findUsers, message: "Success" });
});

app.post("/users", (req, res) => {
  const { age, name, email, eyecolor } = req.body;
  console.log({ age, name, email, eyecolor });

  if (age > 30 || age < 10) {
    return res.status(400).json({ message: "age must be between 10 to 30" });
  }
  if (!age || !name) {
    return res.status(400).json({ message: "age or name is not filled" });
  }
  const lastID = users[users.length - 1]?.id || 0;
  let newObj = {
    id: lastID + 1,
    age,
    name,
    email,
    eyecolor,
  };
  users.push(newObj);
  res.json({ data: users, message: "User Was Added" });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { age, name, email, eyecolor } = req.body;
  const userIndex = users.findIndex((el) => el.id === Number(id));
  if (userIndex === -1) {
    return res.status(400).json({ message: "ID Is Invalid" });
  }
  users[userIndex] = {
    ...users[userIndex],
    age: age || users[userIndex].age,
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    eyecolor: eyecolor || users[userIndex].eyecolor,
  };

  res.json({ data: users[userIndex], message: "User Was Updated" });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((el) => el.id === Number(id));
  if (userIndex === -1) {
    return res.status(400).json({ message: "ID Is Invalid" });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json({ message: "User Was Deleted", data: deletedUser });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
