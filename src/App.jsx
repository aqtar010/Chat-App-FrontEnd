import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./routes/navbar.component/navbar.component";
import Home from "./components/Home/home.component";
import SignIn from "./components/SignIn/sign-in.component";
import SignUp from './components/Signup/signup.component'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />}/>
        <Route path="sign-in" element={<SignIn/>} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
