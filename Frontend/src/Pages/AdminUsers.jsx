import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import "../index.css";

const AdminUsers = () => {
  const { authorizationToken } = useAuth();

  const [users, setUsers] = useState([]);

  // Delete user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://ed-backend-r5j2.onrender.com/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await response.json();

      console.log("User deleted:", data);

      // Remove deleted user directly from state
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.log("DELETE USER ERROR:", error);
    }
  };

  // Get all users when page loads
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(
          "http://https://ed-backend-r5j2.onrender.com/api/admin/users",
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        console.log("Users:", data);

        setUsers(data.users);
      } catch (error) {
        console.log("ADMIN USERS ERROR:", error);
      }
    };

    if (authorizationToken) {
      getAllUsers();
    }
  }, [authorizationToken]);

  return (
    <section className="admin-users-page">
      <div className="admin-users-container">

        <h1 className="admin-users-title">
          Users
        </h1>

        <div className="admin-table-wrapper">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map((currentUser, index) => (
                <tr key={currentUser._id || index}>

                  <td>{currentUser.username}</td>

                  <td>{currentUser.phone}</td>

                  <td>{currentUser.email}</td>

                  <td>
                    <Link
                      className="admin-edit-link"
                      to={`/admin/users/${currentUser._id}/edit`}
                    >
                      Edit
                    </Link>
                  </td>

                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() => deleteUser(currentUser._id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default AdminUsers;