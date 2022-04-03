import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { auth } from "../middleware/auth.js";

import {
  getAllUsers,
  createUser,
  getUserByName,
  genPassword,
} from "../helper.js";

const router = express.Router();

router.get("/", auth, async function (request, response) {
  try {
    const result = await getAllUsers();
    response.send(result);
  } catch {
    response.status(400).send({
      message: error,
    });
  }
});

router.post("/signup", async function (request, response) {
  //Get Details individually
  const { username, email, password } = request.body;

  //Generate Given Pass Hash
  const hashedPassword = await genPassword(password);
  const newUser = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  try {
    //Insert into MongoDB
    const result = await createUser(newUser);
    response.send(result);
  } catch {
    //If not send message
    response.status(400).send({
      message: error,
    });
  }
});

router.post("/login", async function (request, response) {
  // Get User n Pass individually
  const { username, password } = request.body;

  // Retrieve Info FROM DB
  const dbUser = await getUserByName(username);

  console.log(dbUser);

  if (!dbUser) {
    response.status(401).send({ message: "Invalid Credentials" });
  } else {
    const storedPassword = dbUser.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);

    if (!isPasswordMatch) {
      response.status(401).send({ message: "Invalid Credentials" });
    } else {
      const token = jwt.sign({ id: dbUser._id }, process.env.SECRET_KEY, {
        expiresIn: "5m",
      });
      response.send({ message: "Login Successful", token: token });
    }
  }
});

export const usersRouter = router;
