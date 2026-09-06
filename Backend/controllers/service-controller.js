const Service = require("../models/service-model");

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services || services.length === 0) {
      return res.status(404).json({
        message: "No services found",
      });
    }

    return res.status(200).json({
      message: "Services fetched successfully",
      services: services,
    });

  } catch (error) {
    console.log("SERVICE ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = getServices;