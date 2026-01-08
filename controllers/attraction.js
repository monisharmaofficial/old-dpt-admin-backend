const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
require("dotenv").config();
const slugify = require("slugify");
const conn = require("../services/db");

exports.get = (req, res) => {
  let sqlQuery = "SELECT * FROM  attraction";

  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        length: result?.length,
        data: result,
      });
    }
  });
};

// add category
exports.register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const title = req.body.name;
  // Generate slug from the title using slugify
  const slug = slugify(title, {
    replacement: "-", // replace spaces with -
    lower: true, // convert to lowercase
    remove: /[*+~.()'"!:@#?]/g, // remove special characters
  });
  var date_time = new Date();
  const sqlQuery = `INSERT INTO attraction (name, slug, description, image,meta_title, meta_description, meta_keyword, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    req.body.name,
    slug,
    req.body.description,
    req.body.image,
    req.body.meta_title,
    req.body.meta_description,
    req.body.meta_description,
    req.body.meta_keyword,
    date_time,
    date_time,
  ];
  conn.query(sqlQuery, values, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Popular Attraction Register successful",
      });
    }
  });
};

exports.edit = (req, res) => {
  let sqlQuery = "SELECT * FROM attraction WHERE id=" + req.params.id;
  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        length: result?.length,
        data: result,
      });
    }
  });
};
exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const title = req.body.name;
  // Generate slug from the title using slugify
  const slug = slugify(title, {
    replacement: "-", // replace spaces with -
    lower: true, // convert to lowercase
    remove: /[*+~.()'"!:@#?]/g, // remove special characters
  });
  var date_time = new Date();
  const sqlQuery = `UPDATE attraction SET name = ?,slug = ?,description = ?,image = ?,meta_title = ?,meta_description = ?,meta_keyword = ?,updated_at=? WHERE id = ?;`;
  const values = [
    req.body.name,
    slug,
    req.body.description,
    req.body.image,
    req.body.meta_title,
    req.body.meta_description,
    req.body.meta_keyword,
    date_time,
    req.params.id,
  ];
  conn.query(sqlQuery, values, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Popular Attraction update successful",
      });
    }
  });
};

exports.delete = (req, res) => {
  let sqlQuery = "DELETE FROM attraction WHERE id=" + req.params.id + "";

  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Popular Attraction delete successful",
      });
    }
  });
};

exports.status = (req, res) => {
  const status = req.body.status; // This should be "active" or "inactive"
  const id = req.params.id;
  const sqlQuery = `UPDATE attraction SET status = ? WHERE id = ?;`;
  const values = [status, id];

  conn.query(sqlQuery, values, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Status Update successful",
      });
    }
  });
};
