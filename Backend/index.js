require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./router/auth-router")
const connectDB = require("./utils/db");
const serviceRouter =  require("./router/service-router")
const adminRouter = require("./router/admin-router");
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ed-frontend-zeta.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

//service page mount
app.use("/api/auth", serviceRouter);
//admin page user
app.use("/api/admin", adminRouter);

//mount the royer->a specific url prefix based on your choice like localhost:5000/api/auth/work etc
app.use("/api/auth",router)

 connectDB().then(()=>{
const PORT = 5000;
app.listen(PORT,()=>{
  console.log(`Server is running at port: ${PORT}`)
});
 });
