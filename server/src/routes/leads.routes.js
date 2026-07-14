const express = require("express");
const router = express.Router();
const leadsController = require("../controllers/leads.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", leadsController.getAllLeads);
router.post("/", leadsController.createLead);
router.get("/:id", leadsController.getLeadById);
router.put("/:id", leadsController.updateLead);

module.exports = router;
