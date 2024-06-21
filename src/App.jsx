import { useState } from "react";
import Navbar from "./Components/Navbar";

const App = () => {
  const [category, setCategory] = useState("general");
  return (
    <div>
      <Navbar category={category} setCategory={setCategory}/>
    </div>
  )
}

export default App;