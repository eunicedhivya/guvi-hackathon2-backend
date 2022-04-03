import express from "express";

import { auth } from "../middleware/auth.js";

import { addProducts, getAllProducts } from "../helper.js";

const router = express.Router();

// const DB_NAME = "assignmentor";

router.get("/", async function (request, response) {
  try {
    const result = await getAllProducts();
    response.send(result);
  } catch {
    response.status(400).send({
      message: error,
    });
  }
});

router.post("/", auth, async function (request, response) {
  const newProduct = request.body;
  // console.log(request.body);
  const result = await addProducts(newProduct);
  response.send(result);
});

export const productsRouter = router;
