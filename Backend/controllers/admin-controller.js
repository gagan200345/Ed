const User = require("../models/user-model");
const Contact = require("../models/contact-model");


//user logic
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    console.log("USERS:", users);

    return res.status(200).json({
      users,
    });

  } catch (error) {
    console.log("ADMIN ERROR:", error);
    next(error);
  }
};




//contact logic
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({
        message: "No contacts found",
      });
    }

    console.log("CONTACTS:", contacts);

    return res.status(200).json({
      contacts,
    });

  } catch (error) {
    console.log("ADMIN CONTACT ERROR:", error);
    next(error);
  }
};


// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("DELETE USER ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Get single user by ID because update
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(
      id,
      { password: 0 }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });

  } catch (error) {
    console.log("GET USER BY ID ERROR:", error);
    next(error);
  }
};

// Update user by ID
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    console.log("USER ID:", id);
    console.log("UPDATED DATA:", data);

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          username: data.username,
          phone: data.phone,
          email: data.email,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("UPDATE USER ERROR:", error);
    next(error);
  }
};

// Get all contacts
const getAllContactss = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    return res.status(200).json({
      contacts,
    });
  } catch (error) {
    console.log("GET ALL CONTACTS ERROR:", error);
    next(error);
  }
};


// Delete contact by ID
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;

    console.log("CONTACT ID:", id);

    const deletedContact = await Contact.findOneAndDelete({
      _id: id,
    });

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      message: "Contact deleted successfully",
      contact: deletedContact,
    });
  } catch (error) {
    console.log("DELETE CONTACT ERROR:", error);
    next(error);
  }
};




module.exports = {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,getAllContactss,deleteContactById
};