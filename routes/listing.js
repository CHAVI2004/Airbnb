const express = require("express");
const router = express.Router(); 
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner , validateListing,} = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer = require("multer");
const {storage} = require("../cloudconfig.js");
// const upload = multer({dest: "uploads/"});
const upload = multer({storage});


// route.route containing router.get and router.post with "/"
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);
// .post(upload.single("listing[image]"), (req,res) => {
//   res.send(req.file);
// })

 //New Route
 router.get("/new", isLoggedIn, listingController.renderNewForm);

// router.route with show route, update route, and delete route with route "/:id"
router.route("/:id")
.get( wrapAsync(listingController.showListing))
 .put(
   isLoggedIn, 
   isOwner,
   upload.single("listing[image]"),
   validateListing,
   wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner,wrapAsync(listingController.deleteListing));


  //Edit Route
  router.get("/:id/edit", 
    isLoggedIn, 
    isOwner, 
  //  upload.single("listing[image]"),
    wrapAsync(listingController.renderEditForm));
  

  module.exports = router;
  