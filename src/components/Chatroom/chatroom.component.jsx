import { useState } from "react";
import "./chatroom.styles.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatComponent from "../chat.component/chat.component";
import ChatList from "../chatList.component/chatList.component";
import { io } from "socket.io-client";
import { json } from "react-router-dom";

const newSocket = io("http://localhost:5050", { autoConnect: false });
const ChatRoom = () => {
  const signedInUser = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const listItemClickHandler = (elem) => {
    console.log(elem);
    setSelectedChat(elem);
  };
  useEffect(() => {
    if (isLoggedIn) {
      newSocket.connect();
      newSocket.emit("setUsername", signedInUser);
      newSocket.on("privateMessage", (eventData) => {
        console.log("a new message recieve");
        setMessages((prev) => [...prev, JSON.parse(eventData)]);
      });
      newSocket.onAny((eventName, ...args) => {
        console.log(eventName);
      });
      newSocket.on("connectedClients", (users) => {
        if (users) {
          setUserList(users);
        }
      });
    }
    return () => {
      newSocket.off("privateMessage");
      newSocket.off("connectedClients");
      newSocket.disconnect();
    };
  }, []);
  const [userList, setUserList] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  useEffect(() => {
    setActiveUsers(() =>
      userList.filter((elem) => {
        return elem[0] !== newSocket.id;
      })
    );
  }, [userList]);
  const [receivedFile, setReceivedFile] = useState(null);

  useEffect(() => {
    // Listen for file received from the server
    newSocket.on("fileReceived", (data) => {
      console.log(data);
      setReceivedFile(data);
      setMessages((prev) => [...prev, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      newSocket.off("fileReceived");
    };
  }, []);

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h2 className="title-string">Chat Room of {signedInUser.FirstName.toUpperCase()}</h2>
      </div>
      <span className="chatroom-b">
        <ChatList
          listItemClick={(elem) => listItemClickHandler(elem)}
          activeUsers={activeUsers}
        />
        <div className="chat-area-conntainer">
          <ChatComponent
            selectedChat={selectedChat}
            socket={newSocket}
            messages={messages}
            activeUsers={activeUsers}
            receivedFile={receivedFile}
          />
        </div>
      </span>
    </div>
  );
};

const disconnectSocket = () => {
  if (newSocket) {
    newSocket.disconnect();
  }
};
export default ChatRoom;
export { disconnectSocket };
