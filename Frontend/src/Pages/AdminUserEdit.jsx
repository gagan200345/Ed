
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../index.css";

const API_URL = "https://ed-backend-r5j2.onrender.com";

const AdminUserEdit = () => {
  const { id } = useParams();
  const { authorizationToken } = useAuth();

  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // GET SINGLE USER
  // ==========================================
  useEffect(() => {
    const getUserById = async () => {
      try {
        console.log("GET USER ID:", id);

        const response = await fetch(
          `${API_URL}/api/admin/users/${id}`,
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

        if (data.user) {
          setUser({
            username: data.user.username || "",
            phone: data.user.phone || "",
            email: data.user.email || "",
          });
        }
      } catch (error) {
        console.error("GET USER ERROR:", error);
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

    if (!id) {
      alert("User ID not found");
      return;
    }

    if (!authorizationToken) {
      alert("Authorization token not found. Please login again.");
      return;
    }

    try {
      setLoading(true);

      console.log("UPDATE USER ID:", id);
      console.log("UPDATE USER DATA:", user);

      const updateUrl = `${API_URL}/api/admin/users/${id}`;

      console.log("UPDATE URL:", updateUrl);

      const response = await fetch(updateUrl, {
        method: "PATCH",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          phone: user.phone,
          email: user.email,
        }),
      });

      console.log("PATCH STATUS:", response.status);

      const data = await response.json();

      console.log("PATCH RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "User not updated"
        );
      }

      alert("User updated successfully");

      if (data.user) {
        setUser({
          username: data.user.username || "",
          phone: data.user.phone || "",
          email: data.user.email || "",
        });
      }
    } catch (error) {
      console.error("UPDATE USER ERROR:", error);

      alert(error.message || "User not updated");
    } finally {
      setLoading(false);
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
              required
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
              required
            />
          </div>

          {/* UPDATE BUTTON */}
          <button
            className="admin-update-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update User"}
          </button>

        </form>

      </div>
    </section>
  );
};

export default AdminUserEdit;

