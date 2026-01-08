const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
require("dotenv").config();
//const slugify = require("slugify");
const conn = require("../services/db");

exports.get = (req, res) => {
  let sqlQuery = `
    SELECT destinationnew.*, countries.name AS country_name ,countries.id AS country_id
    FROM destinationnew
    LEFT JOIN countries ON destinationnew.country_name = countries.id
  `;

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
  conn.query(
    `SELECT * FROM destinationnew WHERE(destination_name) = LOWER(${conn.escape(
      req.body.destination_name
    )});`,
    (err, result) => {
      if (result && result.length) {
        return res.status(409).send({
          msg: "This Destination already exists",
        });
      } else {
        const title = req.body.destination_name;
        var date_time = new Date();
        const sqlQuery = `INSERT INTO destinationnew (country_name,state,destination_name,image,meta_title,meta_description,meta_keyword,created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
          req.body.country_name,
          req.body.state,
          req.body.destination_name,
          req.body.image,
          req.body.meta_title,
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
              msg: "Destination Register successful",
            });
          }
        });
      }
    }
  );
};

exports.edit = (req, res) => {
  let sqlQuery = "SELECT * FROM destinationnew WHERE id=" + req.params.id;
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
  const title = req.body.destination_name;

  var date_time = new Date();
  const sqlQuery = `UPDATE destinationnew SET country_name = ?, state = ?,destination_name = ?, image= ?,meta_title = ?,meta_description = ?, meta_keyword = ?, updated_at=? WHERE id = ?;`;
  const values = [
    req.body.country_name,
    req.body.state,
    req.body.destination_name,
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
        msg: "Destination update successful",
      });
    }
  });
};

exports.delete = (req, res) => {
  let sqlQuery = "DELETE FROM destinationnew WHERE id=" + req.params.id + "";

  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Destination delete successful",
      });
    }
  });
};

exports.status = (req, res) => {
  const status = req.body.status; // This should be "active" or "inactive"
  const id = req.params.id;
  const sqlQuery = `UPDATE destinationnew SET status = ? WHERE id = ?;`;
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
