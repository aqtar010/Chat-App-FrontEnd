import { useEffect, useState } from "react";
import "./home.styles.scss";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div className="home">
      <h1>This is home page</h1>
    </div>
  );
};
export default Home;
