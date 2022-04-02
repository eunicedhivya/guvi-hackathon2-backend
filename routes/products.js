import express from "express";

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

router.post("/", async function (request, response) {
  //   const result = await getAllMovies();
  //   console.log("result", result);
  const newProduct = request.body;
  const result = await addProducts(newProduct);
  response.send(result);
});

export const productsRouter = router;
