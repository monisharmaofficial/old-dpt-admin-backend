const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const conn = require("../services/db");

exports.get = (req, res) => {
  const agentUserType = 2;

  let sqlQuery = "SELECT * FROM users WHERE user_type = ?";
  conn.query(sqlQuery, [agentUserType], (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      if (result.length === 0) {
        return res.status(404).send({
          status: "not found",
          message: "No agents found",
        });
      }
      res.status(200).send({
        status: "success",
        data: result,
      });
    }
  });
};

exports.register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  conn.query(
    `SELECT * FROM users WHERE(email) = LOWER(${conn.escape(req.body.email)});`,
    (err, result) => {
      if (result && result.length) {
        return res.status(409).send({
          msg: "This email allresy exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            const user_type = 2;
            const is_verified = 1;
            const date_time = new Date();
            const sqlQuery = `INSERT INTO users (user_type,first_name, country, state, city, zip, address, phoneno, email,discount, is_verified,password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?,?,?)`;
            const values = [
              user_type,
              req.body.first_name,
              req.body.country,
              req.body.state,
              req.body.city,
              req.body.zip,
              req.body.address,
              req.body.phoneno,
              req.body.email,
              req.body.discount,
              is_verified,
              hash,
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
                  msg: "Agent Register successful",
                });
              }
            });
          }
        });
      }
    }
  );
};

exports.edit = (req, res) => {
  let sqlQuery = "SELECT * FROM users WHERE id=" + req.params.id;
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
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      const user_type = 2;
      //const is_verified = 1;
      const date_time = new Date();
      const sqlQuery = `UPDATE users SET user_type = ?, first_name = ?, country = ?, state = ?, city = ?, zip = ?, address = ?, phoneno = ?, email = ?, discount = ?, password = ?, updated_at = ? WHERE id = ?`;
      const values = [
        user_type,
        req.body.first_name,
        req.body.country,
        req.body.state,
        req.body.city,
        req.body.zip,
        req.body.address,
        req.body.phoneno,
        req.body.email,
        req.body.discount,
        // is_verified,
        hash,
        date_time,
        req.params.id,
      ];
      console.log(values);
      conn.query(sqlQuery, values, (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        } else {
          res.status(200).send({
            status: "success",
            msg: "Agent update successful",
            //data: result,
          });
        }
      });
    }
  });
};

exports.delete = (req, res) => {
  let sqlQuery = "DELETE FROM users WHERE id=" + req.params.id + "";

  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Agent delete successful",
      });
    }
  });
};

exports.status = (req, res) => {
  const status = req.body.status; // This should be "active" or "inactive"
  const id = req.params.id;
  const sqlQuery = `UPDATE users SET status = ? WHERE id = ?;`;
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
