import React, { useEffect } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

const socket = io("http://localhost:3000", { autoConnect: false });
const ChatComponent = () => {
  const signedInUser = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn);
  // useEffect(() => {
  //   socket.connect();

    
  // }, []);
  useEffect(() => {
    
    if (isLoggedIn) {
      console.log("I Ranm");
      socket.connect();
      socket.emit("setUsername", signedInUser);
    } return () => {
       socket.disconnect();
     };
  }, [isLoggedIn,signedInUser]);

  return <div>{/* Your chat UI components */}</div>;
};
function socketDisconnect() {
  socket.disconnect();
}
export { socketDisconnect, socket };
export default ChatComponent;
