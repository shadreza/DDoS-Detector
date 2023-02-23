import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import AdminAccess from "./components/auth/AdminAccess";
import AdminUserRegister from "./components/auth/AdminUserRegister";
import UserAccess from "./components/auth/UserAccess";
import Modal from "./components/basics/Modal";
import Nav from "./components/basics/Nav";
import { auth } from "./firebase.config";
import { searchOneIntoFirebase } from "./functions/auth/firebase.search";
import { getFormattedUser } from "./functions/formatter/format.user";
import Login from "./pages/authPages/Login";
import Logout from "./pages/authPages/Logout";
import Register from "./pages/authPages/Register";
import Error from "./pages/errorPages/Error";
import LoadingPage from "./pages/errorPages/LoadingPage";
import UnAuthorized from "./pages/errorPages/UnAuthorized";
import About from "./pages/individualPages/About";
import Admin from "./pages/individualPages/Admin";
import Home from "./pages/individualPages/Home";
import Prediction from "./pages/individualPages/Prediction";
import Profile from "./pages/individualPages/Profile";
import Stats from "./pages/individualPages/Stats";
import { setloggedInUserJson } from "./redux/features/loggedInUser";
import { RootState } from "./redux/store";
import ProtectedAdminRoutes from "./routes/ProtectedAdminRoutes";

function App() {

  const { appReady } = useSelector((state: RootState) => state.loggedInUserStore)
  const dispatch = useDispatch();

  const getTheFullUserInfo = async (passedUserEmail: any) => {
    const collectionName = 'users'
    return await searchOneIntoFirebase(collectionName, { email: passedUserEmail }, ['email'])
  }

  const changeAuthState = async () => {
    onAuthStateChanged(auth, async (currentUser) => {
      const userInfo = await getTheFullUserInfo(currentUser?.email)
      if (userInfo[0]) {
        dispatch(setloggedInUserJson(getFormattedUser(userInfo[2])))
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
      appReady ?
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
                  <Route path="/admin" element={<Admin />}>
                    <Route path="/admin/register/users" element={<AdminUserRegister />}></Route>
                    <Route path="/admin/access/admins" element={<AdminAccess />}></Route>
                    <Route path="/admin/access/users" element={<UserAccess />}></Route>
                  </Route>
                  <Route path="/predict" element={<Prediction/>}></Route>
                  <Route path="/stats" element={<Stats/>}></Route>
                  <Route path="/logout" element={<Logout/>}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/unauthorized" element={<UnAuthorized />}></Route>
                </Route>
                {/* Error page -> for all */}
                <Route path="/loading" element={<LoadingPage/>}></Route>
                <Route path="/error" element={<Error />}></Route>
                <Route path="*" element={<Home/>} />
              </Routes>
            </div>
          </Router>
        </div>
      :
      <LoadingPage/>    
          
    }
  </>
  );
}

export default App;
