const express = require("express");
const router = express.Router();
// const  {home,register} = require("../controllers/auth-controller")
const  authcontroller = require("../controllers/auth-controller")

const validate = require("../middleware/validate-middleware");
const { signupSchema } = require("../validators/auth-vali");
const { signinSchema } = require("../validators/login-valid");
const authMiddleware = require("../middleware/auth-middleware");


// router.get("/",(req,res)=>{
//   res.send("home this time router");
// });

// router.route("/").get((req,res)=>{
//   res.status(200).send("welcome Gagan")
// });

router.route("/").get(authcontroller.home);
router.route("/register").post(validate(signupSchema),authcontroller .register);
router.route("/login").post(validate(signinSchema),authcontroller.login);
router.route("/contact").post(authcontroller.contact );
//user data get for frontend ma rakhne ka liya
router.route("/user").get(authMiddleware, authcontroller.user);

module.exports = router;