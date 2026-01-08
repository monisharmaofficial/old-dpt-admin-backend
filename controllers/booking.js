const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
require("dotenv").config();
const slugify = require("slugify");
const conn = require("../services/db");

exports.order_status = (req, res) => {
  let tourorderId = req.params.id;
  let newStatus = 1;
  console.log(tourorderId);

  // Update status in tourorder table
  const updateTourOrderQuery = "UPDATE tourorder SET status = ? WHERE id = ?";

  conn.query(
    updateTourOrderQuery,
    [newStatus, tourorderId],
    (err, tourOrderResult) => {
      if (err) {
        console.error("Error updating tourorder:", err);
        return res.status(500).send({
          status: "error",
          msg: "Error updating tourorder status.",
        });
      }

      // Update status in orderitems table
      const updateOrderItemsQuery =
        "UPDATE orderitems SET status = ? WHERE tourorder_id = ?";

      conn.query(
        updateOrderItemsQuery,
        [newStatus, tourorderId],
        (err, orderItemsResult) => {
          if (err) {
            console.error("Error updating orderitems:", err);
            return res.status(500).send({
              status: "error",
              msg: "Error updating orderitems status.",
            });
          }

          res.status(200).send({
            status: "success",
            msg: "Booking approval successful.",
          });
        }
      );
    }
  );
};
exports.get = (req, res) => {
  const sqlQuery = `
    SELECT tourorder.*
    FROM tourorder;`;

  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        length: result?.length || 0,
        data: result || [],
      });
    }
  });
};

exports.booking_list = (req, res) => {
  const tourorder_id = req.params.id;
  let sqlQuery = `
  SELECT orderitems.*,
    tourorder.id AS tourorder_id,
    tourorder.user_type,
    tourorder.first_name,
    tourorder.last_name,
    tourorder.email,
    tourorder.nationality,
    tourorder.discover_us,
    tourorder.country,
    tourorder.cell_no,
    tourorder.special_equest,
    tourorder.currency,
    tourorder.tax,
    tourorder.sub_total,
    tourorder.discount,
    tourorder.total,
    tourorder.created_at
  FROM orderitems 
  JOIN tourorder ON orderitems.tourorder_id = tourorder.id
  WHERE orderitems.tourorder_id = ?;`;
  conn.query(sqlQuery, [tourorder_id], (err, result) => {
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

exports.booking_detail = (req, res) => {
  // Assuming you have a variable `orderItemId` containing the ID you want to filter by
  const orderItemId = req.params.id; // Adjust how you get the order item ID

  const sqlQuery = `
    SELECT orderitems.*,
      tourorder.id AS tourorder_id,
      tourorder.user_type,
      tourorder.first_name,
      tourorder.last_name,
      tourorder.email,
      tourorder.nationality,
      tourorder.discover_us,
      tourorder.country,
      tourorder.cell_no,
      tourorder.special_equest,
      tourorder.currency,
      tourorder.tax,
      tourorder.sub_total,
      tourorder.discount,
      tourorder.total,
      tourorder.created_at
    FROM orderitems 
    JOIN tourorder ON orderitems.tourorder_id = tourorder.id
    WHERE orderitems.id = ?;`;

  conn.query(sqlQuery, [orderItemId], (err, result) => {
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

exports.deleteOrderItemById = (req, res) => {
  const orderIdToDelete = req.params.id; // Assuming you get the ID from the request URL

  const sqlQuery = `
    DELETE FROM orderitems
    WHERE id = ?;
  `;

  conn.query(sqlQuery, [orderIdToDelete], (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      if (result.affectedRows === 0) {
        return res.status(404).send({
          msg: "No Booking item found with the provided ID.",
        });
      } else {
        res.status(200).send({
          status: "success",
          msg: "Booking item deleted successfully.",
        });
      }
    }
  });
};

exports.approve = (req, res) => {
  const status = req.body.status; // This should be "active" or "inactive"
  const id = req.params.id;
  const sqlQuery = `UPDATE orderitems SET status = ? WHERE id = ?;`;
  const values = [1, id];

  conn.query(sqlQuery, values, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Booking  approve successful",
      });
    }
  });
};

exports.cancel = (req, res) => {
  const status = req.body.status; // This should be "active" or "inactive"
  const id = req.params.id;
  const sqlQuery = `UPDATE orderitems SET status = ? WHERE id = ?;`;
  const values = [2, id];

  conn.query(sqlQuery, values, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Booking  cancel successful",
      });
    }
  });
};
