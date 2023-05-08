var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const v = new Validator();
const { Products } = require("../models");

// GET
router.get("/", async (req, res) => {
 const produts = await Products.findAll();
 return res.json({
  status: 200,
  message: "Show all products",
  data: produts,
 });
});

// GET by id
router.get("/:id", async (req, res) => {
 const id = req.params.id;
 //  check id in table product
 let product = await Products.findByPk(id);
 if (!product) {
  return res.status(404).json({
   status: 404,
   message: "Data not found",
  });
 }
 return res.json({
  status: 200,
  data: product,
 });
});

// POST
router.post("/", async (req, res) => {
 // Validation
 const schema = {
  name: "string",
  brand: "string",
  price: "number",
  stock: "number",
 };

 const validate = v.validate(req.body, schema);
 if (validate.length) {
  res.status(400).json(validate);
 }

 //  Process Create
 const product = await Products.create(req.body);
 res.json({
  status: 201,
  message: "Data created successfully",
  data: product,
 });
});

// Update
router.put("/:id", async (req, res) => {
 const id = req.params.id;
 //  check id in table product
 let product = await Products.findByPk(id);
 if (!product) {
  return res.status(404).json({
   status: 404,
   message: "Data not found",
  });
 }

 //  Validation
 const schema = {
  name: "string|optional",
  brand: "string|optional",
  price: "number|optional",
  stock: "number|optional",
 };

 const validate = v.validate(req.body, schema);
 if (validate.length) {
  return res.status(404).json(validate);
 }

 //  Process Update
 product = await product.update(req.body);
 res.json({
  status: 201,
  message: "Data updated successfully",
  data: product,
 });
});

// DELETE
router.delete("/:id", async (req, res) => {
 const id = req.params.id;
 //  check id in table product
 let product = await Products.findByPk(id);
 if (!product) {
  return res.status(404).json({
   status: 404,
   message: "Data not found",
  });
 }

 //  Process delete
 await product.destroy();
 res.json({
  status: 200,
  message: "Data deleted sucessfully",
 });
});

module.exports = router;
