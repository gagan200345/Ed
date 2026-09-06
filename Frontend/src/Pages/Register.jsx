import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";



const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLocalStorage } = useAuth();

  // handling the input value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
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
        storeTokenInLocalStorage(data.token);
        alert("Registration successful!");
        console.log("Register Response:", response);
        navigate("/login");
      } else {
        alert(data.msg || "Registration failed");
      }
    } catch (error) {
      console.error("Register Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="Parent-div">
        <div className="container-grid">

          <div className="image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Qpizsg3NIQ6XDx0V_nhoz3sxPpocNGBmN2DRVuvOLg&s=10"
              alt="regimage"
              width={500}
              height={500}
            />
          </div>

          <div className="register form">
            <h1 className="main-heading">Register form</h1>

            <br></br>

            <form onSubmit={handleSubmit}>

              {/* username field */}
              <div>
                <label htmlFor="username">username</label>

                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username"
                  required
                  autoComplete="off"
                  value={user.username}
                  onChange={handleInput}
                />
              </div>

              {/* email field */}
              <div>
                <label htmlFor="email">email</label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>

              {/* phone field */}
              <div>
                <label htmlFor="phone">phone</label>

                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter phone"
                  required
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInput}
                />
              </div>

              {/* password field */}
              <div>
                <label htmlFor="password">password</label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>

              <br></br>

              <button className="button" type="submit">
                Register Now
              </button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Register;

