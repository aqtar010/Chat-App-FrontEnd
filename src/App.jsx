import { Routes,Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./routes/navbar.component/navbar.component";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navbar/>}/>
    </Routes>
    
  );
}

export default App;
