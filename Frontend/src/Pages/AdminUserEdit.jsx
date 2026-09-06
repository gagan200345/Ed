import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../index.css";

const AdminUserEdit = () => {
  // URL se user ID
  const { id } = useParams();

  // Authorization token
  const { authorizationToken } = useAuth();

  // User data
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
  });

  // ==========================================
  // GET SINGLE USER
  // ==========================================
  useEffect(() => {
    const getUserById = async () => {
      try {
        console.log("GET USER ID:", id);

        const response = await fetch(
          `http://https://ed-backend-r5j2.onrender.com/api/admin/users/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );

        console.log("GET STATUS:", response.status);

        const data = await response.json();

        console.log("GET RESPONSE:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to get user"
          );
        }

        // Backend se data form mein set
        setUser({
          username: data.user.username || "",
          phone: data.user.phone || "",
          email: data.user.email || "",
        });
      } catch (error) {
        console.log("GET USER ERROR:", error);
      }
    };

    if (authorizationToken && id) {
      getUserById();
    }
  }, [id, authorizationToken]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((previousUser) => ({
      ...previousUser,
      [name]: value,
    }));
  };

  // ==========================================
  // UPDATE USER
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("UPDATE USER ID:", id);
      console.log("UPDATE USER DATA:", user);
      console.log("TOKEN:", authorizationToken);

      const response = await fetch(
        `http://https://ed-backend-r5j2.onrender.com/api/admin/users/${id}`,
        {
          method: "PATCH",

          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },

          body: JSON.stringify(user),
        }
      );

      console.log("PATCH STATUS:", response.status);

      const data = await response.json();

      console.log("PATCH RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "User not updated"
        );
      }

      alert("User updated successfully");

      // Updated data state mein set
      if (data.user) {
        setUser({
          username: data.user.username || "",
          phone: data.user.phone || "",
          email: data.user.email || "",
        });
      }
    } catch (error) {
      console.log("UPDATE USER ERROR:", error);

      alert(error.message || "User not updated");
    }
  };

  return (
    <section className="admin-user-edit-page">
      <div className="admin-user-edit-container">

        <h1>Edit User</h1>

        <form
          className="admin-user-edit-form"
          onSubmit={handleSubmit}
        >

          {/* USERNAME */}
          <div className="admin-form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          {/* PHONE */}
          <div className="admin-form-group">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          {/* EMAIL */}
          <div className="admin-form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          {/* UPDATE BUTTON */}
          <button
            className="admin-update-btn"
            type="submit"
          >
            Update User
          </button>

        </form>

      </div>
    </section>
  );
};

export default AdminUserEdit;