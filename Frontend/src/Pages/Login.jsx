import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Login = () =>{

const [user, setUser] =useState({
  email:"",
  password:"",
});

const navigate = useNavigate();
const { storeTokenInLocalStorage } = useAuth();

//handling the input value
const handleInput =(e)=>{
  let name = e.target.name;
  let value = e.target.value;

  setUser({
    ...user,
   [name]:value,
   
  })
};


//handling submit
const handleSubmit = async (e) =>{
 e.preventDefault();
 try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(user),
        }
      );
      

      const data = await response.json();

      console.log("Register Response:", data);

      if (response.ok) {
        alert("Login successful!");
        storeTokenInLocalStorage(data.token);
        console.log("Login Response:", response);
         navigate("/");
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong");
    }
}

  return(
    <>
    
     <div className="Parent-div">
     <div className="container-grid">
      <div className="image">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Qpizsg3NIQ6XDx0V_nhoz3sxPpocNGBmN2DRVuvOLg&s=10" alt="regimage" width={500} height={500}></img>
      </div>
     <div className="register form">
       <h1 className="main-heading">Login form</h1>
       <br></br>

       <form onSubmit={handleSubmit}>
        {/* username filled */}
       

         <div>
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" placeholder="Enter email" required autoComplete="off" value={user.email} onChange={handleInput}></input>
        </div>

         <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" placeholder="Enter password" required autoComplete="off" value={user.password} onChange={handleInput}></input>
        </div>

        <br></br>
        <button className="button" type="submit">Login Now</button>
       </form>
      </div>
     </div>
     </div>
    
    </>
  )
}

export default Login;