import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import { auth } from "./firebase.config";
import { searchIntoFirebase } from "./functions/firebase.search";
import About from "./pages/individualPages/About";
import Admin from "./pages/individualPages/Admin";
import Error from "./pages/errorPages/Error";
import Home from "./pages/individualPages/Home";
import Login from "./pages/authPages/Login";
import Logout from "./pages/authPages/Logout";
import Prediction from "./pages/individualPages/Prediction";
import Register from "./pages/authPages/Register";
import Stats from "./pages/individualPages/Stats";
import UnAuthorized from "./pages/errorPages/UnAuthorized";
import { setloggedInUserJson } from "./redux/features/loggedInUser";
import { RootState } from "./redux/store";
import ProtectedAdminRoutes from "./routes/ProtectedAdminRoutes";

function App() {

  const { appReady } = useSelector((state: RootState) => state.loggedInUserStore)
  const dispatch = useDispatch();

  const getTheFullUserInfo = async (passedUserEmail: any) => {
    const collectionName = 'registered-users'
    return await searchIntoFirebase(collectionName, { email: passedUserEmail }, ['email'])
  }

  const changeAuthState = async () => {
    onAuthStateChanged(auth, async (currentUser) => {
      const userInfo = await getTheFullUserInfo(currentUser?.email)
      if (userInfo[0]) {
        dispatch(setloggedInUserJson(userInfo[2]))
      } else {
        dispatch(setloggedInUserJson(null))
      }
    })
  }

  useEffect(() => {
    changeAuthState()
  }, [auth])
  

  return (
    <>
    {
      appReady &&
        <div className = "h-screen bg-white dark:bg-black" >
        <Router>
          <Nav />
          <div className="relative top-20">
            <Modal />
          </div>
          <div className="relative top-20 z-0 p-2">
            <Routes>
              {/* anu user can see -> homepage, login, register, about */}
              <Route path="/" element={<Home/>}></Route>
              <Route path="/about" element={<About />}></Route>
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
    }
  </>
  );
}

export default App;
