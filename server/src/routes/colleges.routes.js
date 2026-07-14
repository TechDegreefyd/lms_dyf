const express = require("express");
const router = express.Router();
const collegesController = require("../controllers/colleges.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", collegesController.getAllColleges);
router.get("/brochures", collegesController.getBrochures);

module.exports = router;
