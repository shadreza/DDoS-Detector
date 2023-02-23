import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.config';
import { searchOneIntoFirebase } from '../../functions/auth/firebase.search';
import { getFormattedUser } from '../../functions/formatter/format.user';
import { clearloggedInUserJson, setloggedInUserJson } from '../../redux/features/loggedInUser';
import { clearMessageForModal, setMessageForModal, setShowModal } from '../../redux/features/modalMessage';
import { RootState } from '../../redux/store';

const Login = () => {
  
  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUserJson !== null) {
      navigate("/", { replace: true })
    }
  }, [loggedInUserJson])

  const changeAuthState = async (passedUserEmail: Object) => {
    const collectionName = 'users'
    const user = await searchOneIntoFirebase(collectionName, { email: passedUserEmail }, ['email'])
    if (user) {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser && currentUser.email === passedUserEmail) {
          dispatch(setloggedInUserJson(getFormattedUser(user[2])))
        }
      })
    }
  }

  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");

  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const getTheTrueErrMessage = (str: string) => { 
    let keyword = "auth";
    let position = str.search(keyword);
    let startingPosition = position + keyword.length + 1;
    let errMsg = ""
    for (let i = startingPosition; i < str.length; i++){
      if (str[i] === ')') {
        break;
      }
      errMsg += str[i]
    }
    return errMsg
  }

  const isValidated = () => {
    if (typedEmail.trim().length > 0) {
      setErrorEmail("")
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(typedEmail))) { 
        setErrorEmail("")
        if (typedPassword.trim().length > 0) { 
          setErrorPassword("")
          return true;
        } else {
          setErrorPassword("Enter Password")
        }
      } else {
        setErrorEmail("Invalid Mail");
      }
    } else {
      setErrorEmail("Email can not be empty");
    }
  }

  const leaveThePage = (route: string, timeInSec: number, leaveIt: boolean) => {
    setTimeout(() => {
      if (leaveIt) {
        navigate(route, { replace: true });
      }
      dispatch(clearMessageForModal())
      dispatch(setShowModal(false))
    }, timeInSec*1000);
  } 

  const loginWithCreds = async () => {
    if (isValidated()) {
      try {
        await signInWithEmailAndPassword(
          auth,
          typedEmail,
          typedPassword
        ).then(async res => {
          const userInfo = res.user
          const gottenEmail = userInfo.email
          if (gottenEmail) {
            if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(gottenEmail))) {
              changeAuthState(gottenEmail)
              const modalTitle = "Success"
              const modalMessage = "Login Successfull"
              dispatch(setMessageForModal([modalTitle, modalMessage]))
              dispatch(setShowModal(true))
              leaveThePage('/', 2, true)
            } else {
              const modalTitle = "Failed"
              const modalMessage = "Login Unsuccessfull... There maybe some issues with the connection"
              dispatch(setMessageForModal([modalTitle, modalMessage]))
              dispatch(setShowModal(true))
              leaveThePage('/', 3, true)
            }
          }
        })
          .catch(err => {
          const modalTitle = "Failure"
          const errMsg = getTheTrueErrMessage(err.message)
          dispatch(setMessageForModal([modalTitle, errMsg.toUpperCase()]))
          dispatch(setShowModal(true))
          leaveThePage('/login', 3, false)
        })
      } catch (err) {
        dispatch(clearloggedInUserJson())

      }
    }
  }

  return (
    <div className="flex justify-center items-center p-2">
      <div className="w-full md:w-2/3 lg:w-2/5 bg-indigo-100 p-6 rounded-lg">
        <div>

          <div className="mb-4">
            <p className="text-center font-medium text-xl">Login</p>
          </div>

          <div className="mb-4">
            <input 
              type="email" name="email" id="email"
              placeholder="Your Email"
              className="bg-gray-100 border-2 w-full p-4 rounded-lg"
              onChange={(event)=>setTypedEmail(event.target.value)}
            />
            <div className="text-red-500 mt-2 text-sm">
                { errorEmail }
            </div>
          </div>

          <div className="mb-4">
            <input
              type="password" name="password" id="password"
              placeholder="Choose Password"
              className="bg-gray-100 border-2 w-full p-4 rounded-lg"
              onChange={(event)=>setTypedPassword(event.target.value)}
            />
            <div className="text-red-500 mt-2 text-sm">
                { errorPassword }
            </div>
          </div>


          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
              onClick={loginWithCreds}
            >
              Login
            </button>
          </div>

          <div className='mt-8'>
            <div className="flex items-center">
              <span className='text-xs'>Don't have an accout? <span>     </span>
                <Link to="/register">
                  <span className='text-blue-400 cursor-pointer'>Create One!</span>
                </Link>
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Login