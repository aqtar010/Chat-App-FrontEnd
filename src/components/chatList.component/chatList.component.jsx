import './chatlist.styles.scss'
const ChatList = ({ listItemClick, activeUsers }) => {
  return (
    <div className="chat-list-container">
      <h3>Active users list</h3>
      <ul>
        {activeUsers.map((elem, index) => (
          <li key={elem[0]} onClick={() => listItemClick(elem)}>
            <div className="chatlist-card">
              <span>
                <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              </span>
              <span>
                <h2>{elem[1]}</h2>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ChatList;
