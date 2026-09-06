
import { useState } from "react";
import { useAuth } from "../store/auth";
import "../index.css";

const Contact = () => {
  const { user } = useAuth();

  const [contact, setContact] = useState({
    message: "",
  });

  // Input change
  const handleInput = (e) => {
    const { name, value } = e.target;

    setContact((previousContact) => ({
      ...previousContact,
      [name]: value,
    }));
  };

  // Form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const contactData = {
        username: user?.username || "",
        email: user?.email || "",
        message: contact.message,
      };

      console.log("SENDING CONTACT DATA:", contactData);

      const response = await fetch(
        "http://localhost:5000/api/auth/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      console.log("CONTACT STATUS:", response.status);

      const data = await response.json();

      console.log("CONTACT RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Message not delivered"
        );
      }

      alert("Message sent successfully");

      // Message reset
      setContact({
        message: "",
      });

    } catch (error) {
      console.log("CONTACT ERROR:", error);

      alert(
        error.message || "Something went wrong"
      );
    }
  };

  return (
    <section className="contact">
      <div className="container">

        <h1>Contact Us</h1>

        <div className="contact-content">

          {/* Left side - Image */}
          <div className="contact-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2e7lqdt7l1LP4LVDCJOnS_IHnLD5iC_3Hy8hz45M_C_VT4ZsFIDWXPVU&s=10"
              alt="Contact us"
            />
          </div>

          {/* Right side - Form */}
          <div className="contact-form">

            <form onSubmit={handleFormSubmit}>

              {/* Username */}
              <div>
                <label htmlFor="username">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  id="username"
                  value={user?.username || ""}
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user?.email || ""}
                  readOnly
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  value={contact.message}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <div>
                <button type="submit">
                  Submit
                </button>
              </div>

            </form>

          </div>
        </div>

        {/* Google Maps */}
        <div className="map">
          <iframe
            title="location-map"
            src="https://www.google.com/maps/embed?pb=YOUR_EMBED_LINK_HERE"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Contact;

