import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/context.js";
import { Link } from "react-router-dom";
import axios from "axios";
import "./allConversations.css";

export default function AllConversations() {
  const { user, setUser } = useContext(MyContext);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const deleteConversation = async (conversationId) => {
    try {
      await axios.delete(
        `http://localhost:3000/conversations/${conversationId}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      const updatedUser = { ...user };
      updatedUser.conversations = updatedUser.conversations.filter(
        (c) => c._id !== conversationId
      );
      setUser(updatedUser);
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  return (
    <div className="conversations">
      <h3 className="conversations-banner">Conversations</h3>
      <div
        className={`conversation-list ${
          hasNewMessage ? "has-new-message" : ""
        }`}
      >
        {user?.conversations.map((c) => (
          <div className="single-conversation" key={c._id}>
            <Link to={`/messenger/${c._id}`} className="conversation-link">
              <div className="conversation-info">
                <h2 className="users-conversation">
                  {c?.guest.userName} started a conversation with{" "}
                  {c?.host.userName}
                </h2>
              </div>
            </Link>
            <button
              className="delete-button"
              onClick={() => deleteConversation(c._id)}
            >
              <svg
                viewBox="0 0 15 17.5"
                height="17.5"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
              >
                <path
                  transform="translate(-2.5 -1.25)"
                  d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                  id="Fill"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
