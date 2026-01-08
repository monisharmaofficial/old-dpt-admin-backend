const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
require("dotenv").config();
const conn = require("../services/db");

exports.get = (req, res) => {
  let sqlQuery = "SELECT * FROM  faq";

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

exports.get_all_user = (req, res) => {
  let sqlQuery = "SELECT * FROM  faq";

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
  var date_time = new Date();
  conn.query(
    "SELECT * FROM faq WHERE name = ?",
    req.body.name,
    (err, results) => {
      if (err) {
        console.error("Error checking for existing data: " + err);
        return;
      }

      if (results.length > 0) {
        // console.log("Data already exists");
        res.status(200).send({
          status: "success",
          msg: "FAQ already exists",
        });
      } else {
        // Insert the data if it doesn't exist
        const insertQuery =
          "INSERT INTO faq (name, description,created_at,updated_at) VALUES (?, ?, ?, ?)";
        const values = [
          req.body.name,
          req.body.description,
          date_time,
          date_time,
        ];
        conn.query(insertQuery, values, (err, result) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            res.status(200).send({
              status: "success",
              msg: "FAQ inserted successfully",
            });
          }
        });
      }
    }
  );
};

exports.edit = (req, res) => {
  let sqlQuery = "SELECT * FROM faq WHERE id=" + req.params.id;
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
  var date_time = new Date();
  const sqlQuery = `UPDATE faq SET name = ?,description = ?,updated_at=? WHERE id = ?;`;
  const values = [
    req.body.name,
    req.body.description,
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
        msg: "FAQ update successful",
      });
    }
  });
};

exports.delete = (req, res) => {
  let sqlQuery = "DELETE FROM faq WHERE id=" + req.params.id + "";

  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "FAQ delete successful",
      });
    }
  });
};

exports.status = (req, res) => {
  const status = req.body.status; // This should be "active" or "inactive"
  const id = req.params.id;
  const sqlQuery = `UPDATE faq SET status = ? WHERE id = ?;`;
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
