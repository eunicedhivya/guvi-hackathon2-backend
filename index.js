import express from "express";
import { productsRouter } from "./routes/products.js";
import { usersRouter } from "./routes/users.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// Initiate express
const app = express();

app.use(cors());

// Port for localhost
const PORT = process.env.PORT;

// mongoDB atlas connection
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.use(express.json());

app.get("/", function (request, response) {
  response.send("Hello World!!!");
});

app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log("Server is started in " + PORT));
