import { useState } from "react";
import "./chatroom.styles.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatComponent from "../chat.component/chat.component";
import ChatList from "../chatList.component/chatList.component";

const ChatRoom = () => {
  const [chatInput, setChatInput] = useState({
    text: "",
    timestamp: "",
    sender_id: "",
  });
  const send_id = useSelector((state) => state.user.user._id);
  const handleChatSend = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/chatroom/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatInput),
      });
      if (!response.ok) {
        throw new Error("Message sending failed");
      }
      const data = await response.json();
      console.log("Message sent Success:", data);

      setChatInput({ text: "", timestamp: "", sender_id: "" });
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error, show error message to the user, etc.
    }
  };
  useEffect(() => {
    console.log(chatInput);
  }, [chatInput]);
  
  const handleChatInputChange = (e) => {
    setChatInput((values) => {
      return {
        ...values,
        text: e.target.value,
        timestamp: Date.now(),
        sender_id: send_id,
      };
    });
  };
  const listItemClickHandler=(elem)=>{
    console.log(elem);
  }
  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h1>Chat Room</h1>
      </div>
      <span>
        <ChatList listItemClick={(elem)=>listItemClickHandler(elem)}/>
        <div className="chat-area-conntainer">
          <ChatComponent />
          <form type="submit" onSubmit={handleChatSend}>
            <input
              type="textarea"
              placeholder="Enter Message"
              value={chatInput.text}
              onChange={handleChatInputChange}
            ></input>
            <button>Enter</button>
          </form>
        </div>
      </span>
    </div>
  );
};
export default ChatRoom;
