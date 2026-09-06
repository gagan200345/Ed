const express = require("express");

const router = express.Router();

const getServices = require("../controllers/service-controller");

// GET all services
router.route("/service").get(getServices);

module.exports = router;