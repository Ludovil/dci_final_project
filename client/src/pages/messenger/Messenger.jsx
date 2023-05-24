
import Message from "../../components/message/Message.jsx";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/context.js";
import axios from "axios";
import { io } from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import "./messenger.css";
import { useRef } from "react";
import { Link } from "react-router-dom";


const socket = io("http://localhost:3000", { autoConnect: false });

export default function Messenger() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(MyContext);
  const location = useLocation();
  const Ref = useRef();  
  const { id } = useParams();
  console.log(messages);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("joinConversation", id);
    });
    socket.on("getMessage", (data) => {
      setMessages ( (allMessages)=>[...allMessages, data]);
    });
  }, [socket]);

  useEffect(() => {
    axios.get("http://localhost:3000/messages/" + id).then((res) => {
      console.log(res.data);
      setMessages(res.data);
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: e.target.message.value,
      conversationId: id,
    };
    socket.emit("sendMessage", id, message);
    e.target.message.value = "";
  };

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <h1>Postbox</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input className="input"
              name="message"
              type="text"
              placeholder="your text goes here.."
            />
            <button className="send">send</button>
          </form>
          <div className="messages">
           
            {user &&
              messages.map((m, i) => {
                if (i===messages.length-1) {
                  return (
                <div key={m._id} className="message">
                  <Message message={m} own={m.sender === user._id} />
                </div>)} else {
                  return (
                    <div  key={m._id} className="message">
                    <Message message={m} own={m.sender === user._id} />
                  </div>  
                  )}
                  }
              )}
    
          </div>
        </div>
      </div>
      <div>
      <h3>Conversations</h3>
        {user?.conversations.map((c) => (<Link to={ c._id}><h1> {c?.guest.userName} and {c?.host.userName}</h1></Link>)) }
    </div>
  
    </>
  );
}
