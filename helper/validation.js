const { check } = require("express-validator");

exports.agentssignUpValidataion = [
  check("first_name", "First Name is required").not().isEmpty(),
  // check('last_name','Last Name is required').not().isEmpty(),
  check("country", "Country is required").not().isEmpty(),
  check("state", "State is required").not().isEmpty(),
  check("city", "City is required").not().isEmpty(),
  check("zip", "Zip is required").not().isEmpty(),
  check("address", "Address is required").not().isEmpty(),
  check("phoneno", "Phone no is required").not().isEmpty(),
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").isLength({ min: 5 }),
];

exports.agentsupdateValidataion = [
  check("first_name", "First Name is required").not().isEmpty(),
  // check('last_name','Last Name is required').not().isEmpty(),
  check("country", "Country is required").not().isEmpty(),
  check("state", "State is required").not().isEmpty(),
  check("city", "City is required").not().isEmpty(),
  check("zip", "Zip is required").not().isEmpty(),
  check("address", "Address is required").not().isEmpty(),
  check("phoneno", "Phone no is required").not().isEmpty(),
  check("email", "Email is required").isEmail(),
  //check('password','Password is required').isLength({ min: 5 }),
];

exports.loginUpValidataion = [
  check("email", "Email is required")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password is required").not().isEmpty(),
];

exports.categoryUpValidataion = [
  check("name", "Name is required").not().isEmpty(),
  //check('image','Password is required').not().isEmpty(),
];

exports.reviewsValidataion = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required").isEmail(),
  check("country", "Country is required").not().isEmpty(),
  check("rating", "Rating is required").not().isEmpty(),
  check("comments", "Comments is required").not().isEmpty(),
];

exports.testimonialValidataion = [
  check("name", "Name is required").not().isEmpty(),
  check("description", "Description is required").not().isEmpty(),
  check("rating", "Rating is required").not().isEmpty(),
  check("country", "Country is required").not().isEmpty(),
];

exports.AttractionValidataion = [
  check("name", "Name is required").not().isEmpty(),
  check("description", "Description is required").not().isEmpty(),
  check("image", "Image is required").not().isEmpty(),
];

exports.faqValidataion = [
  check("name", "Question is required").not().isEmpty(),
  check("description", "Answer is required").not().isEmpty(),
];

exports.lanValidataion = [
  check("language_name", "Language Name is required").not().isEmpty(),
];

exports.emiratesValidataion = [
  check("name", "Name is required").not().isEmpty(),
  //check('image','Image is required').not().isEmpty(),
];

exports.locationValidataion = [
  check("location_name", "Location Name is required").not().isEmpty(),
  //check('image','Image is required').not().isEmpty(),
];

exports.locationValidataion = [
  check("location_name", "Location Name is required").not().isEmpty(),
  //check('image','Image is required').not().isEmpty(),
];

exports.hotelValidataion = [
  check("hotel_name", "Hotel Name is required").not().isEmpty(),
  check("location_id", "Location Name is required").not().isEmpty(),
];

exports.itineraryValidataion = [
  check("itinerary_name", "Itinerary Name is required").not().isEmpty(),
  check("itinerary_description", "Itinerary Description is required")
    .not()
    .isEmpty(),
  // check("itinerary_image", "Itinerary Image is required").not().isEmpty(),
];

exports.destinationValidataion = [
  check("destination_name", "Destination Name is required").not().isEmpty(),
  check("destination_description", "Destination is required").not().isEmpty(),
  check("image", "Destination Image is required").not().isEmpty(),
];

exports.destinationnewValidataion = [
  check("country_name", "Destination Name is required").not().isEmpty(),
  check("state", "Destination Name is required").not().isEmpty(),
  check("destination_name", "Destination Name is required").not().isEmpty(),
  check("image", "Destination Image is required").not().isEmpty(),
];
