import { format } from "timeago.js";
import { useContext, useRef } from "react";
import { MyContext } from "../../context/context.js";
import { useParams } from "react-router-dom";
import "./message.css";

import { useEffect } from "react";


export default function Message({ message, own }) {
  const { user } = useContext(MyContext);
  const messageRef = useRef(null);

  useEffect(() => {
    if(messageRef.current){ 
      messageRef.current.scrollIntoView({ behavior: "smooth" });  
      }
      }, [message]);

  return (
    <div ref={messageRef} className={own ? "message own" : "message"}>
      <div className="messageTop">
        <>
          <img
            className="messageImg"
            src={
              message?.sender.profile_image
                ? message?.sender.profile_image
                : "../public/avatar.jpg"
            }
            alt=""
          />
          <p className="messageText">{message.text}</p>
          <p className="messageSender">{message?.sender.userName}</p>
          <p className="messageReceiever">{message?.receiver?.userName}</p>
        </>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
