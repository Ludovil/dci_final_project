import React, { useContext, useEffect, useState, useRef } from "react";
import { MyContext } from "../../context/context.js";
import { io } from "socket.io-client";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/message/Message.jsx";
import "./messenger.css";

const socket = io(process.env.REACT_APP_SERVER, { autoConnect: false });

export default function Messenger() {
  const { user } = useContext(MyContext);
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const messageRef = useRef();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("joinConversation", id);
    });

    socket.on("getMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    axios
      .get(`/messages/${id}`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = messageRef.current.value.trim();

    if (text === "") {
      return;
    }

    const message = {
      sender: user._id,
      text,
      conversationId: id,
    };

    socket.emit("sendMessage", id, message);
    messageRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="messenger">
      <div className="chatMenu">
        <Link to="/allconversations" className="backButton">
          ◄
        </Link>
        <h1 className="chat">Chat</h1>
        <div className="messages-messenger">
          {messages.map((message) => (
            <div key={message._id} className="message">
              <Message message={message} own={message.sender === user._id} />
            </div>
          ))}
        </div>
        <form className="form-messenger" onSubmit={handleSubmit}>
          <textarea
            className="input-messenger"
            ref={messageRef}
            type="text"
            placeholder="Your text goes here..."
            onKeyDown={handleKeyPress}
          />
          <div className="send-messenger">
            <button className="send-button" type="submit">
              &#9658;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
