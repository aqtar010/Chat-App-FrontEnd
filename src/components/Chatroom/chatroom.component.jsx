import { useState } from "react";
import "./chatroom.styles.scss";
import { useEffect } from "react";
const ChatRoom = () => {
  const [chatInput, setChatInput] = useState({});
  const handleChatSend = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/chatroom/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatInput),
      });
      if(!response.ok){
        
        throw new Error("Message sending failed");
      }
      const data = await response.json();
        console.log("Message sent Success:", data);
        
        setChatInput({text:"",timestamp:""})

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
      return { ...values, text: e.target.value, timestamp: Date.now() };
    });
  };
  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h1>Chat Room</h1>
      </div>
      <span>
        <div className="chat-list-container">
          <ul>
            <li>rama</li>
            <li>Bheema</li>
            <li>sooma</li>
          </ul>
        </div>
        <div className="chat-area-conntainer">
          <form type="submit" onSubmit={handleChatSend}>
            <div></div>
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
