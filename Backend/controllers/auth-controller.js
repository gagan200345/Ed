const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Login = require("../models/login-model");
const bcrypt = require("bcryptjs");


//Home logic
const home = async(req,res)=>{
  try{
 res.status(200).send("welcome Gagan home");
  }catch(error){
    console.log(error);
  }
}

//register logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body; //front fill data store in field

    const userExist = await User.findOne({ email: email });  //database check email
    if (userExist) {
      return res.status(400).json({ msg: "email already exist" });
    }

    //password hash
    const saltRound = 10;
    const hash_password = await bcrypt.hash(String(password), saltRound);

    const userCreated = await User.create({ username, email, phone, password: hash_password });//mongodb document store password hasing

    //jwt
    res.status(201).json({
      msg: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Registration failed", error: error.message }); 
  }
};

//login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({
        msg: "invalid credentials",
      });
    }

    // Check password
    const passwordValid = await bcrypt.compare(
      password,
      userExist.password
    );

    if (passwordValid) {

      // Save login information in database
      await Login.create({
        userId: userExist._id,
        email: userExist.email,
        loginAt: new Date(),
      });

      // Generate JWT token
      const token = await userExist.generateToken();

      return res.status(200).json({
        msg: "Login successful",
        token: token,
        userId: userExist._id.toString(),
      });

    } else {
      return res.status(401).json({
        msg: "invalid email or password",
      });
    }

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      msg: "internal server error",
      error: error.message,
    });
  }
};


//contact logic
const contact = async (req, res) => {
  try {
    console.log("CONTACT BODY:", req.body);

    const { username, email, message } = req.body;

    const contactData = await Contact.create({
      username,
      email,
      message,
    });

    console.log("CONTACT SAVED:", contactData);

    return res.status(200).json({
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log("CONTACT ERROR:", error);

    return res.status(500).json({
      message: "Message not delivered",
      error: error.message,
    });
  }
};


//user logic to get user data frontend

const user = async (req, res) => {
  try {
    const userData = req.user;

    return res.status(200).json({
      userData,
    });
  } catch (error) {
    console.log(`Error from the user route: ${error}`);
  }
};





module.exports = {home,register,login, contact, user};
