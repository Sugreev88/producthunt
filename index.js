const express = require("express");
const service = require("./productService");
const app = express();

const port = 3000;
app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/product", async (req, res) => {
  let product = await service.getProducts();
  res.send(product);
});

app.get("/product/:id", async (req, res) => {
  let idp = req.params.id;
  let product = await service.getProductById(idp);
  res.send(product);
});

app.post("/addProduct", async (req, res) => {
  let product = req.body;
  let check1 = service.check(product);
  if (check1 == `nameLError`) {
    return "product name is too lengthy or empty";
  } else if (check1 == `smalllError`) {
    return "short description is too long";
  } else if (check1 == `longDspError`) {
    return "long description is to long";
  } else {
    let result = await service.addProduct(product);
    // service.addProduct(product);
    res.status(201).send(result);
  }
});

app.delete("/product/:id", async (req, res) => {
  let idp = req.params.id;
  let pro = service.getProductById(idp);
  if (!pro) {
    res.status(404).send("product not found");
  }
  //   let result = await service.deleteProductById(idp);
  service.deleteProductById(idp);
  res.status(200).send(`succesfully deleted the product with id ${idp}`);
});

app.patch("/products/:id", async (req, res) => {
  let id = req.params.id;
  let productInput = req.body;
  let product = await service.getProductById(id);
  if (!product || !product[0]) {
    service.addProduct(productInput);
    res.status(200).send(productInput);
  } else {
    service.changeProductById(id, productInput);
    res.status(200).send(`Product:${id} updated  Successfully `);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
