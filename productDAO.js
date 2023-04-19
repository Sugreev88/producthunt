const mysql = require("mysql");
const util = require("util");
const { v4: uuidv4 } = require("uuid");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dhruvi12",
  database: "project_producthunt",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});
const query = util.promisify(connection.query).bind(connection);

//get
let getProductFromDB = async (id) => {
  let sqlQuery = `select product.name , product.small_desp, tag.title  from product
    left join tag on  product.id = tag.id ;`;
  // let sqlQuery = "SELECT * FROM product";
  sqlQuery = id ? sqlQuery + ` WHERE id = "${id}" ` : sqlQuery;

  let result = await query(sqlQuery);
  // console.log(result);
  return result;
};

//add
let validateName = async (product) => {
  let productName = product.name.trim();
  let sqlQuery = `(SELECT COUNT(name) as count FROM product WHERE name = '${productName}') `;
  // let sqlQuery = `SELECT name FROM product WHERE EXISTS ( SELECT name FROM product WHERE name = "${productName}") `;
  let result = await query(sqlQuery);
  console.log(result[0].count);
  return result[0].count;
};
let addProductToDB = async (productInput) => {
  //validation for duplicate entry (Business Logic)
  // let countOfProductByName = await query(
  //   getNoOfProductsQuery + `WHERE name = "${productInput["name"]}" `
  // );
  // if (countOfProductByName[0].cp) return "err1";
  // let countOfProductByUrl = await query(
  //   getNoOfProductsQuery + `WHERE visit_url = "${productInput["visit_url"]}" `
  // );
  // if (countOfProductByUrl[0].cp) return "err2";
  const userId = uuidv4(); ///creating own id's using uuid method
  let columnQuery = "id,";
  let valuesQuery = `"${userId}",`;
  columnQuery += `name, small_desp, long_desp, logo, url, created_on, created_by, updated_on, updated_by`;
  valuesQuery += `"${productInput["name"]}","${productInput["small_desp"]}","${productInput["long_desp"]}","${productInput["logo"]}","${productInput["url"]}","${productInput["created_on"]}","${productInput["created_by"]}","${productInput["updated_on"]}", "${productInput["updated_by"]}"`;
  let defaultSqlQuery = "SELECT * FROM product";
  let sqlQuery = `INSERT INTO product (${columnQuery}) VALUES (${valuesQuery}) `;
  sqlQuery = productInput ? sqlQuery : defaultSqlQuery;
  let result = await query(sqlQuery);
  // result["id"] = userId; // adding generated id's in result
  return result;
};
// let addProductToDB = async (product) => {
//   const userId = uuidv4();
//   let columnQuery = "id,";
//   let valuesQuery = `"${userId}",`;
//   // console.log(validateName(productInput));
//   // console.log(columnQuery, valuesQuery);
//   for (let key in product) {
//     columnQuery += `${key},`;
//     let value = product[key];
//     valuesQuery += `"${value}",`;
//   }
//   let columnQueryupdated = columnQuery.substring(0, columnQuery.length - 1);
//   let valuesQueryupdated = valuesQuery.substring(0, valuesQuery.length - 1);

//   // console.log(columnQueryupdated);
//   // console.log(valuesQueryupdated);
//   // console.log(`dao file : ${product.id}`);
//   let defaultSqlQuery = "SELECT * FROM product";
//   let sqlQuery = `INSERT INTO product (${columnQueryupdated}) VALUES(${valuesQueryupdated})`;
//   // let sqlQuery = `INSERT INTO product (${columnQueryupdated}) VALUES(${valuesQueryupdated}) WHERE NOT EXISTS (SELECT name FROM product WHERE name = ${productInput.name})`;
//   sqlQuery = product ? sqlQuery : defaultSqlQuery;
//   console.log(sqlQuery);

//   let result = await query(sqlQuery);
//   return result;
// };

//delete
let deleteProductFromDB = async (id) => {
  let sqlQuery1 = "SELECT * FROM product";
  let sqlQuery = "DELETE FROM product";
  sqlQuery = id ? sqlQuery + ` WHERE id = "${id}" ` : sqlQuery1;

  let result = await query(sqlQuery);
  // console.log(result);
  return result;
};

//alter
let changeProductFromDB = async (id, product) => {
  let sqlQuery1 = "SET ";
  for (let key in product) {
    let value = product[key];
    sqlQuery1 += `${key} = "${value}",`;
  }
  let sqlQuery1updated = sqlQuery1.substring(0, sqlQuery1.length - 1);
  console.log(sqlQuery1updated);

  let sqlQuery = "UPDATE product " + sqlQuery1updated + ` WHERE id = "${id}"`;
  console.log(sqlQuery);
  let result = await query(sqlQuery);
  console.log(result);
  return result;
};

module.exports = {
  getProductFromDB,
  addProductToDB,
  deleteProductFromDB,
  changeProductFromDB,
  validateName,
};
