import { format } from "timeago.js/lib/index";
import { useContext, useRef } from "react";
import { MyContext } from "../../context/context.js";
import { useParams } from "react-router-dom";
import "./message.css";

import { useEffect } from "react";

export default function Message({ message, own }) {
  const { user } = useContext(MyContext);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div ref={messageRef} className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="messageBar">
          <div className="imgSender">
            <img
              className="messageImg"
              src={
                message?.sender?.profile_image || "../public/avatar.jpg"
              }
              alt=""
            />
            <h4 className="messageSender">{message?.sender?.userName}</h4>
            <div className="messageSender">
              <p>{message?.receiver?.userName}</p>
            </div>
          </div>
          <div className="messageText">
            <h4 className="text">{message?.text}</h4>
          </div>
        </div>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
}
