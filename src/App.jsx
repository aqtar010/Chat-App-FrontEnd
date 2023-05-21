import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import Navbar from "./routes/navbar.component/navbar.component";
import Home from "./components/Home/home.component";
import Auth from "./components/Authentication/auth.component";
import ChatRoom from "./components/Chatroom/chatroom.component";
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />}/>
        <Route path="auth" element={<Auth/>} />
        {isLoggedIn ?<Route path="chatroom" element={<ChatRoom/>}/>:null}
        
      </Route>
    </Routes>
  );
}

export default App;
