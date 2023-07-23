import { useEffect, useState } from "react";

const ChatList = ({ listItemClick, activeUsers }) => {
  // const [userList, setUserList] = useState([]);
  // const [activeUsers, setActiveUsers] = useState([]);
  // useEffect(() => {
  //   console.log("user list effect ran",userList);
  //   setActiveUsers(() =>
  //     userList.filter((elem) => {
  //       return elem[0] !== socket.id;
  //     })
  //   );
  // }, [userList]);
  
  

  const groupChatHandler = () => {};
  return (
    <div className="chat-list-container">
      <span>Active users list</span>
      <ul>
        <li onClick={() => listItemClick(activeUsers)}>Group Chat</li>
        {activeUsers.map((elem, index) => (
          <li key={elem[0]} onClick={() => listItemClick(elem)}>
            {elem[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ChatList;
