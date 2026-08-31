import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminMessages.css";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/contact`;

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      const response = await axios.get(API_URL);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      setMessages((current) =>
        current.filter((message) => message.id !== id)
      );

      alert("Message deleted successfully!");
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("Failed to delete message.");
    }
  };

  if (loading) {
    return (
      <main className="admin-messages-page">
        <p className="messages-loading">Loading messages...</p>
      </main>
    );
  }

  return (
    <main className="admin-messages-page">

      <section className="admin-messages-header">
        <p>ADMIN PANEL</p>

        <h1>Contact Messages</h1>

        <span>
          View messages submitted through the website contact form.
        </span>
      </section>

      <section className="messages-list">

        <div className="messages-title-row">
          <h2>Received Messages</h2>

          <button
            className="refresh-button"
            onClick={loadMessages}
          >
            Refresh
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages received yet.</p>
          </div>
        ) : (
          <div className="messages-grid">

            {messages.map((message) => (

              <article
                className="message-card"
                key={message.id}
              >

                <div className="message-card-header">
                  <h3>{message.subject}</h3>

                  <span>
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleString()
                      : ""}
                  </span>
                </div>

                <div className="message-sender">
                  <p>
                    <strong>Name:</strong> {message.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${message.email}`}>
                      {message.email}
                    </a>
                  </p>
                </div>

                <div className="message-body">
                  <p>{message.message}</p>
                </div>

                <button
                  className="message-delete-button"
                  onClick={() => handleDelete(message.id)}
                >
                  Delete
                </button>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default AdminMessages;