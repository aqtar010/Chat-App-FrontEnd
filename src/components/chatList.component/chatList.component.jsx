import { useEffect, useState } from "react";
import { socket } from "../chat.component/chat.component";

const ChatList = ({ listItemClick }) => {
  const [userList, setUserList] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  useEffect(() => {
    setActiveUsers(() =>
      userList.filter((elem) => {
        return elem[0] !== socket.id;
      })
    );
    console.log(activeUsers);
  }, [userList]);
  socket.on("connectedClients", (users) => {
    //console.log("New user:",users);
    setUserList(users);
  });

  const groupChatHandler = () => {};
  return (
    <div className="chat-list-container">
      <span>Active users list</span>
      <ul>
        <li onClick={listItemClick}>Group Chat</li>
        {activeUsers.map((elem) => (
          <li onClick={()=>listItemClick(elem)}>{elem[1]}</li>
        ))}
      </ul>
    </div>
  );
};
export default ChatList;
