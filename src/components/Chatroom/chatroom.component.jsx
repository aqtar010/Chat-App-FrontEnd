import "./chatroom.styles.scss";
const ChatRoom = () => {
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
          <form type="submit">
            <input type="textarea" placeholder="Enter Message"></input>
            <button>Enter</button>
          </form>
        </div>
      </span>
    </div>
  );
};
export default ChatRoom;
