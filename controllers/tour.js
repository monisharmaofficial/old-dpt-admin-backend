const AppError = require("../utils/appError");
const multer = require("multer");
const path = require("path");
//const { validationResult } = require("express-validator");
require("dotenv").config();
const slugify = require("slugify");
const conn = require("../services/db");

// Get all toure
exports.get = (req, res) => {
  const query = `
      SELECT
        t.id,
        t.tour_name,
        t.tour_price_aed,
        t.tour_price_usd,
        t.tour_duration,
        t.image,
        t.status,
        t.updated_at
      FROM tours t
    `;

  conn.query(query, (error, results) => {
    if (error) {
      //console.error(error);
      res
        .status(500)
        .send({ status: "error", message: "Internal server error" });
    } else {
      const tours = results.map((row) => ({
        id: row.id,
        tour_name: row.tour_name,
        tour_price_aed: row.tour_price_aed,
        tour_price_usd: row.tour_price_usd,
        tour_duration: row.tour_duration,
        image: row.image,
        status: row.status,
        updated_at: row.updated_at,
      }));

      res.status(200).send({
        status: "success",
        length: results?.length,
        data: tours,
      });
    }
  });
};

// add tour
exports.register = (req, res) => {
  try {
    conn.query(
      "SELECT * FROM tours WHERE tour_name = ?",
      [req.body.tour_name],
      (err, result) => {
        if (err) {
          return res.status(500).send({ msg: err });
        }

        if (result.length > 0) {
          return res.status(409).send({ msg: "This Tour already exists" });
        }

        // Fetch slug from categories table
        conn.query(
          "SELECT slug FROM categories WHERE id = ?",
          [req.body.category_id],
          (err, categoryResult) => {
            if (err) {
              return res.status(500).send({ msg: err });
            }

            if (categoryResult.length === 0) {
              return res.status(404).send({ msg: "Category not found" });
            }

            const categorySlug = categoryResult[0].slug;

            // Continue with insertion into tours table
            const inputArray = req.body.emirates_id;
            const emirates_id = String(inputArray);
            const itinerary = req.body.itinerary_id;
            const itinerary_id = String(itinerary);
            const sticker = req.body.sticker;
            const sticker_name = String(sticker);
            const gallerydata = req.body.gallerydata;
            const Gallerydata = String(gallerydata);
            // Generate slug from the title using slugify
            const slug = slugify(req.body.tour_name, {
              replacement: "-", // replace spaces with -
              lower: true, // convert to lowercase
              remove: /[*+~.()'"!:@#?$&]/g, // remove special characters
            });
            const date_time = new Date();

            const sqlQuery = `INSERT INTO tours (countries,states,destination_name,tour_name, category_id, destination_id, popular_tours, emirates_id, itinerary_id, slug, category_slug, sticker, hastag, discount,no_of_pax, intro, tour_details,additional_charges_info, question, useful, mail_body, included, exclusive, expect, policy, know, asked_questions, tour_price_aed, tour_price_usd, tour_duration,language, image, meta_title, meta_description, meta_keywords, gallerydata, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            const values = [
              req.body.countries,
              req.body.states,
              req.body.destination_name,
              req.body.tour_name,
              req.body.category_id,
              req.body.destination_id,
              req.body.popular_tours,
              emirates_id,
              itinerary_id,
              slug,
              categorySlug, // Use the fetched category slug
              sticker_name,
              req.body.hastag,
              req.body.discount,
              req.body.no_of_pax,
              req.body.intro,
              req.body.tour_details,
              req.body.additional_charges_info,
              req.body.question,
              req.body.useful,
              req.body.mail_body,
              req.body.included,
              req.body.exclusive,
              req.body.expect,
              req.body.policy,
              req.body.know,
              req.body.asked_questions,
              req.body.tour_price_aed,
              req.body.tour_price_usd,
              req.body.tour_duration,
              req.body.language,
              req.body.image,
              req.body.meta_title,
              req.body.meta_description,
              req.body.meta_keywords,
              Gallerydata,
              date_time,
              date_time,
            ];

            conn.query(sqlQuery, values, (err, result) => {
              if (err) {
                return res.status(500).send({ msg: err });
              }

              res.status(200).send({
                status: "success",
                msg: "Tour Register successful",
              });
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

exports.edit = (req, res) => {
  const id = req.params.id;
  const query = `
  SELECT
    t.*,
    c.categories_name,
    c.categories_id,
    d.destinationid,
    d.destinationid,
    d.destinationname,
    e.emirates_name,
    e.emirates_id,
    e.emirates_image,
    i.itinerary_name,
    i.itinerary_id,
    i.itinerary_description,
    i.itinerary_image
  FROM tours t
  LEFT JOIN (
    SELECT t.id AS tour_id,
      GROUP_CONCAT(c.name) AS categories_name,
      GROUP_CONCAT(c.id) AS categories_id
    FROM tours t
    LEFT JOIN categories c ON FIND_IN_SET(c.id, t.category_id)
    GROUP BY t.id
  ) c ON t.id = c.tour_id
  LEFT JOIN (
    SELECT t.id AS tour_id,
      GROUP_CONCAT(d.destination_name) AS destinationname,
      GROUP_CONCAT(d.id) AS destinationid
    FROM tours t
    LEFT JOIN destination d ON FIND_IN_SET(d.id, t.destination_id)
    GROUP BY t.id
  ) d ON t.id = d.tour_id
  LEFT JOIN (
    SELECT t.id AS tour_id,
      GROUP_CONCAT(e.name) AS emirates_name,
      GROUP_CONCAT(e.id) AS emirates_id,
      GROUP_CONCAT(e.image) AS emirates_image
    FROM tours t
    LEFT JOIN emirates e ON FIND_IN_SET(e.id, t.emirates_id)
    GROUP BY t.id
  ) e ON t.id = e.tour_id
  LEFT JOIN (
    SELECT t.id AS tour_id,
      GROUP_CONCAT(i.itinerary_name) AS itinerary_name,
      GROUP_CONCAT(i.id) AS itinerary_id,
      GROUP_CONCAT(i.itinerary_description) AS itinerary_description,
      GROUP_CONCAT(i.image) AS itinerary_image
    FROM tours t
    LEFT JOIN itinerary i ON FIND_IN_SET(i.id, t.itinerary_id)
    GROUP BY t.id
  ) i ON t.id = i.tour_id
  WHERE t.id = ?;  -- Replace 123 with the desired tour ID
`;

  conn.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
    } else {
      //console.log(results);
      const tours = results.map((row) => ({
        id: row.id,
        countries: row.countries,
        states: row.states,
        destination_name: row.destination_name,
        tour_name: row.tour_name,
        gallery_info: row.gallerydata,
        slug: row.slug,
        category_slug: row.category_slug,
        hastag: row.hastag,
        discount: row.discount,
        popular_tours: row.popular_tours,
        intro: row.intro,
        tour_details: row.tour_details,
        no_of_pax: row.no_of_pax,
        additional_charges_info: row.additional_charges_info,
        question: row.question,
        useful: row.useful,
        mail_body: row.mail_body,
        included: row.included,
        exclusive: row.exclusive,
        expect: row.expect,
        policy: row.policy,
        know: row.know,
        asked_questions: row.asked_questions,
        tour_price_aed: row.tour_price_aed,
        tour_price_usd: row.tour_price_usd,
        tour_duration: row.tour_duration,
        language: row.language,
        image: row.image,
        meta_title: row.meta_title,
        meta_description: row.meta_description,
        meta_keywords: row.meta_keywords,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        category_info: row.categories_id
          ? row.categories_id.split(",").map((category_Id, index) => ({
            id: category_Id,
            name: row.categories_name.split(",")[index],
          }))
          : [],
        destination_info: row.destinationid
          ? row.destinationid.split(",").map((destination_Id, index) => ({
            id: destination_Id,
            name: row.destinationname.split(",")[index],
          }))
          : [],
        sticker_info: row.sticker
          ? row.sticker.split(",").map((stickerId, index) => ({
            id: stickerId,
          }))
          : [],
        /* gallery_info: row.gallerydata
          ? row.gallerydata.split(",").map((galleryimage, index) => ({
              galleryimage: galleryimage,
            }))
          : [],*/
        emirates_info: row.emirates_id
          ? row.emirates_id.split(",").map((emirates_Id, index) => ({
            id: emirates_Id,
            name: row.emirates_name.split(",")[index],
            image: row.emirates_image.split(",")[index],
          }))
          : [],
        itinerary_info: row.itinerary_id
          ? row.itinerary_id.split(",").map((itinerary_Id, index) => ({
            id: itinerary_Id,
            name: row.itinerary_name.split(",")[index],
            description: row.itinerary_description.split(",")[index],
            image: row.itinerary_image.split(",")[index],
          }))
          : [],
      }));

      res.status(200).send({
        status: "success",
        length: results?.length,
        data: tours,
      });
    }
  });
};
exports.update = (req, res) => {
  const inputArray = req.body.emirates_id;
  const emirates_id = String(inputArray);
  const itinerary = req.body.itinerary_id;
  const itinerary_id = String(itinerary);
  const sticker = req.body.sticker;
  const sticker_name = String(sticker);
  const gallerydata = req.body.gallerydata;
  const Gallerydata = String(gallerydata);
  // Generate slug from the title using slugify
  const slug = slugify(req.body.tour_name, {
    replacement: "-", // replace spaces with -
    lower: true, // convert to lowercase
    remove: /[*+~%\<>/;.(){}?,'"!:@#^|]/g, // remove special characters
  });
  const date_time = new Date();

  // Fetch slug from categories table
  conn.query(
    "SELECT slug FROM categories WHERE id = ?",
    [req.body.category_id],
    (err, categoryResult) => {
      if (err) {
        return res.status(500).send({ msg: err });
      }

      if (categoryResult.length === 0) {
        return res.status(404).send({ msg: "Category not found" });
      }

      const categorySlug = categoryResult[0].slug;

      const sqlQuery = `UPDATE tours SET countries=?,states=?,destination_name=?, tour_name=?, category_id=?, destination_id=?, popular_tours=?, emirates_id=?, itinerary_id=?, slug=?, category_slug=?, sticker=?, hastag=?, discount=?, no_of_pax = ?, intro=?, tour_details=?,additional_charges_info= ?, question=?, useful=?, mail_body=?, included=?, exclusive=?, expect=?, policy=?, know=?, asked_questions=?, tour_price_aed=?, tour_price_usd=?, tour_duration=?,language =?, image=?, meta_title=?, meta_description=?, meta_keywords=?, gallerydata=?, created_at=?, updated_at=? WHERE id=?`;

      const values = [
        req.body.countries,
        req.body.states,
        req.body.destination_name,
        req.body.tour_name,
        req.body.category_id,
        req.body.destination_id,
        req.body.popular_tours,
        emirates_id,
        itinerary_id,
        slug,
        categorySlug, // Use the fetched category slug
        sticker_name,
        req.body.hastag,
        req.body.discount,
        req.body.no_of_pax,
        req.body.intro,
        req.body.tour_details,
        req.body.additional_charges_info,
        req.body.question,
        req.body.useful,
        req.body.mail_body,
        req.body.included,
        req.body.exclusive,
        req.body.expect,
        req.body.policy,
        req.body.know,
        req.body.asked_questions,
        req.body.tour_price_aed,
        req.body.tour_price_usd,
        req.body.tour_duration,
        req.body.language,
        req.body.image,
        req.body.meta_title,
        req.body.meta_description,
        req.body.meta_keywords,
        Gallerydata,
        date_time,
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
            msg: "Tour update successful",
          });
        }
      });
    }
  );
};

exports.delete = (req, res) => {
  let sqlQuery = "DELETE FROM tours WHERE id=" + req.params.id + "";

  conn.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: "Tour delete successful",
      });
    }
  });
};

exports.status = (req, res) => {
  const status = req.body.status; // This should be "active" or "inactive"
  const id = req.params.id;
  const sqlQuery = `UPDATE tours SET status = ? WHERE id = ?;`;
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
