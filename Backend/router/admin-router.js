const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admin-controller");
const authmiddleware = require("../middleware/auth-middleware");
const adminmiddleware = require("../middleware/admin-middleware");

// Get all users
router.get("/users",authmiddleware,adminmiddleware,admincontroller.getAllUsers);

// Get all contacts
router.get( "/contacts", authmiddleware, adminmiddleware, admincontroller.getAllContacts);

// Delete user
router.delete("/users/delete/:id",authmiddleware,adminmiddleware,admincontroller.deleteUserById);

// Get single user
router.get( "/users/:id", authmiddleware, adminmiddleware, admincontroller.getUserById);

// Update user
router.patch("/users/:id",authmiddleware,adminmiddleware,admincontroller.updateUserById);

//get contact
router.get( "/contacts/:id", authmiddleware, adminmiddleware, admincontroller.getAllContactss);

// Delete contact
router.delete( "/contacts/delete/:id", authmiddleware, adminmiddleware, admincontroller.deleteContactById );

module.exports = router;