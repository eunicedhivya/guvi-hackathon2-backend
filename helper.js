import { client } from "./index.js";
import bcrypt from "bcrypt";

const DB_NAME = "lendkart";

async function getAllProducts() {
  return await client.db(DB_NAME).collection("products").find({}).toArray();
}

async function addProducts(newProduct) {
  return await client.db(DB_NAME).collection("products").insertMany(newProduct);
}

// Users Section
// =====================================
async function getAllUsers() {
  return await client.db(DB_NAME).collection("users").find({}).toArray();
}

async function createUser(newUser) {
  return await client.db(DB_NAME).collection("users").insertOne(newUser);
}

async function getUserByName(username) {
  return await client
    .db(DB_NAME)
    .collection("users")
    .findOne({ username: username });
}

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt, hashedPassword);
  return hashedPassword;
}

export {
  addProducts,
  getAllProducts,
  getAllUsers,
  createUser,
  getUserByName,
  genPassword,
};
