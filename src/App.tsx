import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Modal from "./components/Modal";

import Nav from "./components/Nav";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Prediction from "./pages/Prediction";
import Register from "./pages/Register";
import Stats from "./pages/Stats";

function App() {
  return (
    <div className="h-screen bg-white dark:bg-black">
      <Router>
        <Nav />
        <div className="relative top-20">
          <Modal />
        </div>
        <div className="relative top-20 z-0 p-2">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/predict" element={<Prediction/>}></Route>
            <Route path="/stats" element={<Stats/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
