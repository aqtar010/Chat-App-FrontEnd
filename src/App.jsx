import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./routes/navbar.component/navbar.component";
import Home from "./components/Home/home.component";
import Auth from "./components/Authentication/auth.component";
import ChatRoom from "./components/Chatroom/chatroom.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />}/>
        <Route path="auth" element={<Auth/>} />
        <Route path="chatroom" element={<ChatRoom/>}/>
      </Route>
    </Routes>
  );
}

export default App;
