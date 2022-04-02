import { client } from "./index.js";

async function getAllProducts() {
  return await client.db("lendkart").collection("products").find({}).toArray();
}

async function addProducts(newProduct) {
  return await client
    .db("lendkart")
    .collection("products")
    .insertMany(newProduct);
}

export { addProducts, getAllProducts };
