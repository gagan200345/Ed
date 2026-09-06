
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "../index.css";

const API_URL = "https://ed-backend-r5j2.onrender.com";

const AdminContacts = () => {
  const { authorizationToken } = useAuth();

  const [contactData, setContactData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  // =========================
  // Get All Contacts
  // =========================
  useEffect(() => {
    if (!authorizationToken) return;

    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/admin/contacts`,
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );

        console.log("GET CONTACT STATUS:", response.status);

        const data = await response.json();

        console.log("CONTACT DATA:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch contacts"
          );
        }

        setContactData(data.contacts || []);
      } catch (error) {
        console.error("GET CONTACT ERROR:", error);
      }
    };

    fetchContacts();
  }, [authorizationToken]);

  // =========================
  // Delete Contact
  // =========================
  const deleteContactById = async (id) => {
    if (!id) {
      alert("Contact ID not found");
      return;
    }

    if (!authorizationToken) {
      alert("Authorization token not found. Please login again.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      console.log("DELETE CONTACT ID:", id);

      const deleteUrl = `${API_URL}/api/admin/contacts/delete/${id}`;

      console.log("DELETE URL:", deleteUrl);

      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log("DELETE STATUS:", response.status);

      const data = await response.json();

      console.log("DELETE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Contact not deleted"
        );
      }

      // Remove deleted contact from UI
      setContactData((previousContacts) =>
        previousContacts.filter(
          (contact) => contact._id !== id
        )
      );

      alert("Contact deleted successfully");
    } catch (error) {
      console.error("DELETE CONTACT ERROR:", error);

      alert(error.message || "Contact not deleted");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="admin-contacts-page">
      <div className="admin-contacts-container">

        <h1>Contact Data</h1>

        <div className="admin-table-wrapper">
          <table className="admin-contacts-table">

            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {contactData.length > 0 ? (
                contactData.map((currentContact, index) => {
                  const {
                    username,
                    email,
                    message,
                    _id,
                  } = currentContact;

                  return (
                    <tr key={_id || index}>
                      <td>{username}</td>

                      <td>{email}</td>

                      <td className="contact-message">
                        {message}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="admin-contact-delete-btn"
                          onClick={() =>
                            deleteContactById(_id)
                          }
                          disabled={deletingId === _id}
                        >
                          {deletingId === _id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="admin-contacts-empty"
                  >
                    No contact messages found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
};

export default AdminContacts;

