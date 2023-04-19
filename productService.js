const ProductDAO = require("./productDAO");
const Product = require("./Modal/product");

let getProducts = async () => {
  return await ProductDAO.getProductFromDB();
};

let getProductById = async (id) => {
  console.log("id: " + id);
  return await ProductDAO.getProductFromDB(id);
};
let check = async (productInput) => {
  let name1 = productInput.name;
  let small_desp1 = productInput.small_desp;
  let long_desp1 = productInput.long_desp;
  //   let logo = productInput.logo;
  //   let url = productInput.url;

  if (name1.length > 50 || !name1.length) {
    return await `nameLError`;
  } else if (small_desp1.length > 150 || !small_desp1.length) {
    return await `smalllError`;
  } else if (long_desp1.length > 500 || !long_desp1.length) {
    return await `longDspError`;
  }
};
let addProduct = async (productInput) => {
  let {
    name,
    small_desp,
    long_desp,
    logo,
    url,
    created_on,
    created_by,
    updated_on,
    updated_by,
  } = productInput; //destructuring input json
  const productObject = new Product(
    name,
    small_desp,
    long_desp,
    logo,
    url,
    created_on,
    created_by,
    updated_on,
    updated_by
  );

  try {
    let count = await ProductDAO.validateName(productInput);
    if (count) return { err: "duplicate entry" };
    console.log("no err");
    return await ProductDAO.addProductToDB(productObject);
  } catch (error) {
    throw error;
  }

  // return await ProductDAO.addProductToDB(productInput);
};

let deleteProductById = async (id) => {
  //   console.log("id: " + id)
  return await ProductDAO.deleteProductFromDB(id);
};

let updateProductById = async (id, productInput) => {
  //   console.log("id: " + id);
  return await ProductDAO.updateProductFromDB(id, productInput);
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
  check,
};
