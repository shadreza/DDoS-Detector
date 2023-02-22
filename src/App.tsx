import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Prediction from "./pages/Prediction";
import Register from "./pages/Register";
import Stats from "./pages/Stats";
import UnAuthorized from "./pages/UnAuthorized";
import ProtectedAdminRoutes from "./routes/ProtectedAdminRoutes";

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
            {/* anu user can see -> homepage, login, register, about */}
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register />}></Route>
            {/* registered && loggedin user can see -> predict & stats */}
            <Route element={<ProtectedAdminRoutes />}>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/predict" element={<Prediction/>}></Route>
              <Route path="/stats" element={<Stats/>}></Route>
              <Route path="/logout" element={<Logout/>}></Route>
              <Route path="/unauthorized" element={<UnAuthorized />}></Route>
            </Route>
            {/* Error page -> for all */}
            <Route path="/error" element={<Error/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
