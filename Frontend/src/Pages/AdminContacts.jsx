import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "../index.css";

const AdminContacts = () => {
  const { authorizationToken } = useAuth();

  const [contactData, setContactData] = useState([]);

  // =========================
  // Get All Contacts
  // =========================
  useEffect(() => {
    if (!authorizationToken) return;

    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "http://https://ed-backend-r5j2.onrender.com/api/admin/contacts",
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
        console.log("GET CONTACT ERROR:", error);
      }
    };

    fetchContacts();
  }, [authorizationToken]);

  // =========================
  // Delete Contact
  // =========================
  const deleteContactById = async (id) => {
    try {
      console.log("DELETE CONTACT ID:", id);

      const response = await fetch(
        `http://https://ed-backend-r5j2.onrender.com/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      console.log("DELETE STATUS:", response.status);

      const data = await response.json();

      console.log("DELETE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Contact not deleted"
        );
      }

      // Remove deleted contact from UI immediately
      setContactData((previousContacts) =>
        previousContacts.filter(
          (contact) => contact._id !== id
        )
      );

      console.log("Contact deleted successfully");
    } catch (error) {
      console.log("DELETE CONTACT ERROR:", error);
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
                        >
                          Delete
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