const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
require("dotenv").config();
const conn = require("../services/db");

exports.get = (req, res) => {
  const query = `
  SELECT
      h.id,
      h.hotel_name,
      h.adults_price_usd,
      h.children_price_usd,
      h.infants_price_usd,
      h.driver_price_usd,
      h.adults_price_aed,
      h.children_price_aed,
      h.infants_price_aed,
      h.driver_price_aed,
      h.location_id as locationId ,
      h.status,
      GROUP_CONCAT(l.location_name) AS location,
      GROUP_CONCAT(l.id) AS locationIds
  FROM
      hotels h
  LEFT JOIN
      locations l ON FIND_IN_SET(l.id, h.location_id)

  GROUP BY
      h.id, h.hotel_name, h.status;
`;

  conn.query(query, (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      const hotels = results.map((row) => ({
        id: row.id,
        hotel_name: row.hotel_name,
        adults_price_usd: row.adults_price_usd,
        children_price_usd: row.children_price_usd,
        infants_price_usd: row.infants_price_usd,
        driver_price_usd: row.driver_price_usd,
        adults_price_aed: row.adults_price_aed,
        children_price_aed: row.children_price_aed,
        infants_price_aed: row.infants_price_aed,
        driver_price_aed: row.driver_price_aed,
        lunch_price_usd: row.lunch_price_usd,
        lunch_price_aed: row.lunch_price_aed,
        status: row.status,
        location_id: row.location_id,
        location: row.location,
        location_info: row.locationIds
          ? row.locationIds.split(",").map((locationId, index) => ({
              id: locationId,
              name: row.location.split(",")[index],
            }))
          : [], // Provide an empty array as a default value if row.location is null
      }));

      res.status(200).send({
        status: "success",
        length: results?.length,
        data: hotels,
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
    `SELECT * FROM hotels WHERE (hotel_name) = LOWER(${conn.escape(
      req.body.hotel_name
    )});`,
    (err, result) => {
      if (result && result.length) {
        return res.status(409).send({
          msg: "This Hotel already exists",
        });
      } else {
        const inputArray = req.body.location_id; // Assuming location_id is an array
        const commaSeparatedString = (newStr = String(inputArray));
        var date_time = new Date();
        const sqlQuery = `INSERT INTO hotels (location_id,hotel_name,adults_price_usd,children_price_usd,infants_price_usd,driver_price_usd,adults_price_aed,children_price_aed,infants_price_aed,driver_price_aed,lunch_price_usd,lunch_price_aed,created_at, updated_at) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?)`;
        const values = [
          commaSeparatedString,
          req.body.hotel_name,
          req.body.adults_price_usd,
          req.body.children_price_usd,
          req.body.infants_price_usd,
          req.body.driver_price_usd,
          req.body.adults_price_aed,
          req.body.children_price_aed,
          req.body.infants_price_aed,
          req.body.driver_price_aed,
          req.body.lunch_price_usd,
          req.body.lunch_price_aed,
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
              msg: "Hotel Register successful",
            });
          }
        });
      }
    }
  );
};

exports.edit = (req, res) => {
  let sqlQuery = "SELECT * FROM hotels WHERE id=" + req.params.id;
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
  const inputArray = req.body.location_id; // Assuming location_id is an array
  const commaSeparatedString = (newStr = String(inputArray));
  var date_time = new Date();
  const sqlQuery = `UPDATE hotels SET location_id = ?,hotel_name = ?,adults_price_usd = ?,children_price_usd = ?,infants_price_usd = ?,driver_price_usd = ?,adults_price_aed = ?,children_price_aed= ?,infants_price_aed = ?,driver_price_aed = ?,lunch_price_usd = ?,lunch_price_aed = ?, updated_at = ? WHERE id = ?;`;
  const values = [
    commaSeparatedString,
    req.body.hotel_name,
    req.body.adults_price_usd,
    req.body.children_price_usd,
    req.body.infants_price_usd,
    req.body.driver_price_usd,
    req.body.adults_price_aed,
    req.body.children_price_aed,
    req.body.infants_price_aed,
    req.body.driver_price_aed,
    req.body.lunch_price_usd,
    req.body.lunch_price_aed,
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
        msg: "Hotel update successful",
      });
    }
  });
};

exports.delete = (req, res) => {
  let sqlQuery = "DELETE FROM hotels WHERE id=" + req.params.id + "";

  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Hotel delete successful",
      });
    }
  });
};

exports.status = (req, res) => {
  const status = req.body.status; // This should be "active" or "inactive"
  const id = req.params.id;
  const sqlQuery = `UPDATE hotels SET status = ? WHERE id = ?;`;
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
