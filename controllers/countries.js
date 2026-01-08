const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
require("dotenv").config();
//const slugify = require("slugify");
const conn = require("../services/db");

exports.countery = (req, res) => {
  let sqlQuery = "SELECT * FROM  countries";

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

exports.state = (req, res) => {
  let sqlQuery = "SELECT * FROM states WHERE country_id=" + req.params.id;
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

exports.state_1 = (req, res) => {
  const { country_name } = req.body; // Destructure the country_name from the request body

  if (!country_name) {
    return res.status(400).send({
      msg: "country name is required in the request body",
    });
  }

  let sqlQuery = "SELECT state FROM destinationnew WHERE country_name = ?";
  conn.query(sqlQuery, [country_name], (err, result) => {
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

exports.state_2 = (req, res) => {
  const { state, country } = req.body; // Destructure state and country from the request body

  if (!state || !country) {
    return res.status(400).send({
      msg: "Both state and country are required in the request body",
    });
  }

  let sqlQuery = `
    SELECT destination_name 
    FROM destinationnew 
    WHERE state = ? AND country_name = ?
  `;

  conn.query(sqlQuery, [state, country], (err, result) => {
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
