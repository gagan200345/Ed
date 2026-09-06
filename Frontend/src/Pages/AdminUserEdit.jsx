import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../index.css";

const BASE_URL = "https://ed-backend-r5j2.onrender.com";

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();

  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ==========================================
  // GET SINGLE USER
  // ==========================================
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/admin/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to get user");
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

      const response = await fetch(`${BASE_URL}/api/admin/users/${id}`, {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "User not updated");
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

  // ==========================================
  // DELETE USER  👈 NEW
  // ==========================================
  const handleDelete = async () => {
    if (!id) {
      alert("User ID not found");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      setDeleting(true);

      const response = await fetch(`${BASE_URL}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        // 👇 agar backend token check karta hai to ye uncomment karo
        // headers: { Authorization: authorizationToken },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "User not deleted");
      }

      alert("User deleted successfully");
      navigate("/admin/users"); // apni actual users-list route yahan daalo
    } catch (error) {
      console.error("DELETE USER ERROR:", error);
      alert(error.message || "User not deleted");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="admin-user-edit-page">
      <div className="admin-user-edit-container">
        <h1>Edit User</h1>

        <form className="admin-user-edit-form" onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div className="admin-form-group">
            <label htmlFor="username">Username</label>
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
            <label htmlFor="phone">Phone</label>
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
            <label htmlFor="email">Email</label>
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
          <button className="admin-update-btn" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update User"}
          </button>

          {/* DELETE BUTTON 👈 NEW */}
          <button
            className="admin-delete-btn"
            type="button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete User"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminUserEdit;