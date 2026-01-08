const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commonController = require("../controllers/common");
const userController = require("../controllers/user");
const category = require("../controllers/category");
const agents = require("../controllers/agents");
const reviews = require("../controllers/reviews");
const testimonial = require("../controllers/testimonial");
const emirates = require("../controllers/emirates");
const location = require("../controllers/location");
const hotel = require("../controllers/hotel");
const itinerary = require("../controllers/itinerary");
const destination = require("../controllers/destination");
const tour = require("../controllers/tour");
const faq = require("../controllers/faq");
const attraction = require("../controllers/attraction");
const fileController = require("../controllers/file.controller");
const booking = require("../controllers/booking");
const ask = require("../controllers/ask");
const language = require("../controllers/language");
const touristvisa = require("../controllers/touristvisa");
const destinationnew = require("../controllers/destinationnew");
const countries = require("../controllers/countries");
const {
  emiratesValidataion,
  testimonialValidataion,
  reviewsValidataion,
  agentsupdateValidataion,
  agentssignUpValidataion,
  loginUpValidataion,
  categoryUpValidataion,
  locationValidataion,
  hotelValidataion,
  itineraryValidataion,
  destinationValidataion,
  faqValidataion,
  AttractionValidataion,
  lanValidataion,
  destinationnewValidataion,
} = require("../helper/validation");

router.get("/api/v0/getAllActiveCountry", commonController.getAllActiveCountry);
router.post("/login", loginUpValidataion, userController.getUserLogin);
router.get("/welcome", auth.verifyToken, userController.welcome);
router.post("/logout", userController.logout);

router.get("/all/user-list", userController.get_all_user);
router.get("/ask/list", ask.get);
/* files upload/download Route */

router.post("/upload", fileController.upload);
router.get("/files", fileController.getListFiles);
router.get("/files/:name", fileController.download);
router.delete("/files/:name", fileController.remove);

//  Catgory Route =================

router.post(
  "/add-category",
  categoryUpValidataion,
  auth.verifyToken,
  category.addcategory
);
router.get("/list-category", auth.verifyToken, category.getcategory);
router.get("/edit-category/:id", auth.verifyToken, category.editcategory);
router.put("/update-category/:id", auth.verifyToken, category.updatecategory);
router.delete(
  "/delete-category/:id",
  auth.verifyToken,
  category.deletecategory
);
router.put("/status-category/:id", auth.verifyToken, category.status);

//  Agents Route =================

router.post(
  "/add-agents",
  agentssignUpValidataion,
  auth.verifyToken,
  agents.register
);
router.get("/list-agents", auth.verifyToken, agents.get);
router.get("/edit-agents/:id", auth.verifyToken, agents.edit);
router.put(
  "/update-agents/:id",
  agentsupdateValidataion,
  auth.verifyToken,
  agents.update
);
router.delete("/delete-agents/:id", auth.verifyToken, agents.delete);
router.put("/status-agents/:id", auth.verifyToken, agents.status);

//  Reviews Route =================

router.post(
  "/add-reviews",
  reviewsValidataion,
  auth.verifyToken,
  reviews.register
);
router.get("/list-reviews", auth.verifyToken, reviews.get);
router.get("/edit-reviews/:id", auth.verifyToken, reviews.edit);
router.put(
  "/update-reviews/:id",
  reviewsValidataion,
  auth.verifyToken,
  reviews.update
);
router.delete("/delete-reviews/:id", auth.verifyToken, reviews.delete);
router.put("/status-reviews/:id", auth.verifyToken, reviews.status);

//   Testimonials Route =================

router.post(
  "/add-testimonial",
  testimonialValidataion,
  auth.verifyToken,
  testimonial.register
);
router.get("/list-testimonial", auth.verifyToken, testimonial.get);
router.get("/edit-testimonial/:id", auth.verifyToken, testimonial.edit);
router.put(
  "/update-testimonial/:id",
  testimonialValidataion,
  auth.verifyToken,
  testimonial.update
);
router.delete("/delete-testimonial/:id", auth.verifyToken, testimonial.delete);
router.put("/status-testimonial/:id", auth.verifyToken, testimonial.status);

//   FAQ Route =================

router.post("/add-faq", faqValidataion, auth.verifyToken, faq.register);
router.get("/list-faq", auth.verifyToken, faq.get);
router.get("/edit-faq/:id", auth.verifyToken, faq.edit);
router.put("/update-faq/:id", faqValidataion, auth.verifyToken, faq.update);
router.delete("/delete-faq/:id", auth.verifyToken, faq.delete);
router.put("/status-faq/:id", auth.verifyToken, faq.status);

//   Language Route =================

router.post(
  "/add-language",
  lanValidataion,
  auth.verifyToken,
  language.register
);
router.get("/list-language", auth.verifyToken, language.get);
router.get("/edit-language/:id", auth.verifyToken, language.edit);
router.put(
  "/update-language/:id",
  lanValidataion,
  auth.verifyToken,
  language.update
);
router.delete("/delete-language/:id", auth.verifyToken, language.delete);
router.put("/status-language/:id", auth.verifyToken, language.status);

//   Popular Attraction Route =================

router.post(
  "/add-popular-attraction",
  AttractionValidataion,
  auth.verifyToken,
  attraction.register
);
router.get("/list-popular-attraction", auth.verifyToken, attraction.get);
router.get("/edit-popular-attraction/:id", auth.verifyToken, attraction.edit);
router.put(
  "/update-popular-attraction/:id",
  faqValidataion,
  auth.verifyToken,
  attraction.update
);
router.delete(
  "/delete-popular-attraction/:id",
  auth.verifyToken,
  attraction.delete
);
router.put(
  "/status-popular-attraction/:id",
  auth.verifyToken,
  attraction.status
);

// ==============================

router.get("/tourist-visa", auth.verifyToken, touristvisa.get);
router.delete("/tourist-visa/:id", auth.verifyToken, touristvisa.delete);

//   Emirates Route =================

router.post(
  "/add-emirates",
  emiratesValidataion,
  auth.verifyToken,
  emirates.register
);
router.get("/list-emirates", auth.verifyToken, emirates.get);
router.get("/edit-emirates/:id", auth.verifyToken, emirates.edit);
router.put(
  "/update-emirates/:id",
  emiratesValidataion,
  auth.verifyToken,
  emirates.update
);
router.delete("/delete-emirates/:id", auth.verifyToken, emirates.delete);
router.put("/status-emirates/:id", auth.verifyToken, emirates.status);

//   Location Route =================

router.post(
  "/add-location",
  locationValidataion,
  auth.verifyToken,
  location.register
);
router.get("/list-location", auth.verifyToken, location.get);
router.get("/edit-location/:id", auth.verifyToken, location.edit);
router.put(
  "/update-location/:id",
  locationValidataion,
  auth.verifyToken,
  location.update
);
router.delete("/delete-location/:id", auth.verifyToken, location.delete);
router.put("/status-location/:id", auth.verifyToken, location.status);

//   Hotel Route =================

router.post("/add-hotel", hotelValidataion, auth.verifyToken, hotel.register);
router.get("/list-hotel", auth.verifyToken, hotel.get);
router.get("/edit-hotel/:id", auth.verifyToken, hotel.edit);
router.put(
  "/update-hotel/:id",
  hotelValidataion,
  auth.verifyToken,
  hotel.update
);
router.delete("/delete-hotel/:id", auth.verifyToken, hotel.delete);
router.put("/status-hotel/:id", auth.verifyToken, hotel.status);

//   Itinerary Route =================

router.post(
  "/add-itinerary",
  itineraryValidataion,
  auth.verifyToken,
  itinerary.register
);
router.get("/list-itinerary", auth.verifyToken, itinerary.get);
router.get("/edit-itinerary/:id", auth.verifyToken, itinerary.edit);
router.put(
  "/update-itinerary/:id",
  itineraryValidataion,
  auth.verifyToken,
  itinerary.update
);
router.delete("/delete-itinerary/:id", auth.verifyToken, itinerary.delete);
router.put("/status-itinerary/:id", auth.verifyToken, itinerary.status);

//   Hotel Route =================

router.post("/add-hotel", hotelValidataion, auth.verifyToken, hotel.register);
router.get("/list-hotel", auth.verifyToken, hotel.get);
router.get("/edit-hotel/:id", auth.verifyToken, hotel.edit);
router.put(
  "/update-hotel/:id",
  hotelValidataion,
  auth.verifyToken,
  hotel.update
);
router.delete("/delete-hotel/:id", auth.verifyToken, hotel.delete);
router.put("/status-hotel/:id", auth.verifyToken, hotel.status);

//   Destination Route =================

router.post(
  "/add-destination",
  destinationValidataion,
  auth.verifyToken,
  destination.register
);
router.get("/list-destination", auth.verifyToken, destination.get);
router.get("/edit-destination/:id", auth.verifyToken, destination.edit);
router.put(
  "/update-destination/:id",
  destinationValidataion,
  auth.verifyToken,
  destination.update
);
router.delete("/delete-destination/:id", auth.verifyToken, destination.delete);
router.put("/status-destination/:id", auth.verifyToken, destination.status);

//   Destinationnew Route =================
router.get(
  "/list-destinationnew-countery",
  auth.verifyToken,
  countries.countery
);
router.get("/list-destinationnew-state/:id", auth.verifyToken, countries.state);
router.post(
  "/add-destinationnew",
  destinationnewValidataion,
  auth.verifyToken,
  destinationnew.register
);

router.post("/destinationnew-state-list/", auth.verifyToken, countries.state_1);
router.post("/destinationnew-name-list/", auth.verifyToken, countries.state_2);
router.post(
  "/add-destinationnew",
  destinationnewValidataion,
  auth.verifyToken,
  destinationnew.register
);
router.get("/list-destinationnew", auth.verifyToken, destinationnew.get);
router.get("/edit-destinationnew/:id", auth.verifyToken, destinationnew.edit);
router.put(
  "/update-destinationnew/:id",
  destinationnewValidataion,
  auth.verifyToken,
  destinationnew.update
);
router.delete(
  "/delete-destinationnew/:id",
  auth.verifyToken,
  destinationnew.delete
);
router.put(
  "/status-destinationnew/:id",
  auth.verifyToken,
  destinationnew.status
);

//   Tour Route =================

router.post("/add-tour", auth.verifyToken, tour.register);
router.get("/list-tour", auth.verifyToken, tour.get);
router.get("/edit-tour/:id", auth.verifyToken, tour.edit);
router.put("/update-tour/:id", auth.verifyToken, tour.update);
router.delete("/delete-tour/:id", auth.verifyToken, tour.delete);
router.put("/status-tour/:id", auth.verifyToken, tour.status);

//   Tour Route Booking Route =================
router.get("/order/list-tour", auth.verifyToken, booking.get);
router.post("/order/approve/:id", auth.verifyToken, booking.order_status);
router.get("/booking/list/:id", auth.verifyToken, booking.booking_list);
router.post("/booking/approve/:id", auth.verifyToken, booking.approve);
router.post("/booking/cancel/:id", auth.verifyToken, booking.cancel);
router.get("/booking/:id", auth.verifyToken, booking.booking_detail);
router.get(
  "/booking/delete/:id",
  auth.verifyToken,
  booking.deleteOrderItemById
);

module.exports = router; // export to use in server.js
