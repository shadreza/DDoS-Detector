import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { insertIntoFirebase } from '../../functions/firebase.create';
import { searchOneIntoFirebase } from '../../functions/firebase.search';
import { UserInterface } from '../../interfaces/user';
import { clearMessageForModal, setMessageForModal, setShowModal } from '../../redux/features/modalMessage';
import { RootState } from "../../redux/store";

const Register = () => {

  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUserJson !== null) {
      navigate("/", { replace: true })
    }
  }, [loggedInUserJson])

  const [typedName, setTypedName] = useState<string>("")
  const [typedUsername, setTypedUsername] = useState<string>("")
  const [typedEmail, setTypedEmail] = useState<string>("")
  const [typedPassword, setTypedPassword] = useState<string>("")
  const [typedRePassword, setTypedRePassword] = useState<string>("")

  const [nameError, setNameError] = useState<string>("")
  const [usernameError, setUsernameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [re_passwordError, setRe_passwordError] = useState<string>("")
  const [anyOtherError, setAnyOtherError] = useState<boolean>(false)
  const [dataError, setDataError] = useState<string>("")

  const collectionName = "users"

  const dispatch = useDispatch();

  const isValidated = async () => {

    if (typedName.trim().length > 0) {
      setNameError("")
      setAnyOtherError(false)
      if (typedUsername.trim().length > 0) {
        setUsernameError("")
        setAnyOtherError(false)
        if (typedEmail.trim().length > 0) {
          setEmailError("")
          setAnyOtherError(false)
          if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(typedEmail))) {
            setEmailError("")
            setAnyOtherError(false)
            if (typedPassword.trim().length > 0) {
              setPasswordError("")
              setAnyOtherError(false)
              if (typedPassword.trim().length >= 8) {
                setPasswordError("")
                setAnyOtherError(false)
                if (typedRePassword.trim().length > 0 === typedPassword.trim().length > 0) {

                  // datas of the form are valid by form validation
                  setRe_passwordError("")
                  setDataError("")
                  setAnyOtherError(false)

                  // now duplicacy check
                  const data: UserInterface = {
                    name: typedName,
                    username: typedUsername,
                    email: typedEmail,
                    password: typedPassword
                  }
                  const interestedUsers = await searchOneIntoFirebase(collectionName, data, ['email', 'username']);
                  if (!interestedUsers[0]) {
                    setDataError("")
                    setAnyOtherError(false)
                    return true
                  } else {
                    setAnyOtherError(false)
                    setDataError("Same "+ interestedUsers[1]+ " Found")
                    return false
                  }

                } else {
                  setAnyOtherError(true)
                  setRe_passwordError("Passwords do not match")
                }
              } else {
                setAnyOtherError(true)
                setPasswordError("Password must be atleast of 8 characters")
              }
            } else {
              setAnyOtherError(true)
              setPasswordError("Password can not be empty")
            }
          } else {
            setAnyOtherError(true)
            setEmailError("Email not valid")
          }
        } else {
          setAnyOtherError(true)
          setEmailError("Email can not be empty")
        }
      } else {
        setAnyOtherError(true)
        setUsernameError("Username can not be empty")
      }
    } else {
      setAnyOtherError(true)
      setNameError("Name can not be empty")
    }
    return false
  }

  const resetTheStates = () => {
    setTypedName("")
    setTypedUsername("")
    setTypedEmail("")
    setTypedPassword("")
    setTypedRePassword("")
    setAnyOtherError(false)
    setDataError("")
    setNameError("")
    setUsernameError("")
    setEmailError("")
    setPasswordError("")
    setRe_passwordError("")
  }
  
  const leaveThePage = (route:string, timeInSec:number) => {
    resetTheStates()
    setTimeout(() => {
      navigate(route, { replace: true });
      dispatch(setShowModal(false))
      dispatch(clearMessageForModal())
    }, timeInSec*1000);
  } 

  const createUserWithCreds = async () => {
    const validationMetric = await isValidated()
    if (validationMetric) {
        const interestedUser = {
          name: typedName,
          username: typedUsername,
          email: typedEmail,
          password: typedPassword,
          role: 'interested',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        const res = await insertIntoFirebase(collectionName, interestedUser)
      if (res[0] === 'ok') {  
          resetTheStates()
          dispatch(setMessageForModal(["Almost there !", "Registration Done... You're request has been accepted... Almost there to use the app. The Admin will be taking you onboard soon!"]))
          dispatch(setShowModal(true))
          setAnyOtherError(false)
          setDataError("")
          leaveThePage('/', 5)
          
        } else {
          if (dataError.trim().length === 0) {
            setDataError("There were some issues creating the account. Please try again")
          }
        }
    }
  }  

  return (
    <div className="flex justify-center items-center p-2">
      <div className="w-full md:w-2/3 lg:w-2/5 bg-indigo-200 p-6 rounded-lg max-h-[85vh] overflow-y-auto">
        
        <div>
          <div className="mb-4">
            <p className="text-center font-medium text-xl">Register</p>
          </div>

          <div className="mb-4">
            <label 
              className='uppercase text-xs tracking-widest ml-2 relative bottom-0.5 font-bold' 
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text" name="name" id="name" placeholder="Your name"
              className="bg-gray-100 border-2 w-full p-4 rounded-lg"
              onChange={event => setTypedName(event.target.value)}
            />
            {
              nameError.trim().length > 0 ? 
                <div className="text-red-500 mt-2 text-sm">
                  {nameError}
                </div>
                :
                <></>
            }
            
          </div>

          <div className="mb-4">
            <label 
              className='uppercase text-xs tracking-widest ml-2 relative bottom-0.5 font-bold' 
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text" name="username" id="username" placeholder="Username"
              className="bg-gray-100 border-2 w-full p-4 rounded-lg"
              onChange={event => setTypedUsername(event.target.value)}
            />
            {
              usernameError.trim().length > 0 ? 
                <div className="text-red-500 mt-2 text-sm">
                  {usernameError}
                </div>
                :
                <></>
            }
          </div>

          <div className="mb-4">
            <label 
              className='uppercase text-xs tracking-widest ml-2 relative bottom-0.5 font-bold' 
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email" name="email" id="email" placeholder="Your Email"
              className="bg-gray-100 border-2 w-full p-4 rounded-lg"
              onChange={event => setTypedEmail(event.target.value)}
            />
            {
              emailError.trim().length > 0 ? 
                <div className="text-red-500 mt-2 text-sm">
                  {emailError}
                </div>
                :
                <></>
            }
          </div>

          <div className="mb-4">
            <label 
              className='uppercase text-xs tracking-widest ml-2 relative bottom-0.5 font-bold' 
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password" name="password" id="password" placeholder="Choose Password"
              className="bg-gray-100 border-2 w-full p-4 rounded-lg "
              onChange={event => setTypedPassword(event.target.value)}
            />
            {
              passwordError.trim().length > 0 ? 
                <div className="text-red-500 mt-2 text-sm">
                  {passwordError}
                </div>
                :
                <></>
            }
          </div>

          <div className="mb-4">
            <label 
              className='uppercase text-xs tracking-widest ml-2 relative bottom-0.5 font-bold' 
              htmlFor="password_confirmation"
            >
              Confirm 
            Password</label>
            <input
              type="password" name="password_confirmation" id="password_confirmation"
              placeholder="Repeat Password" className="bg-gray-100 border-2 w-full p-4 rounded-lg"
              onChange={event => setTypedRePassword(event.target.value)}
            />
            {
              re_passwordError.trim().length > 0 ? 
                <div className="text-red-500 mt-2 text-sm">
                  {re_passwordError}
                </div>
                :
                <></>
            }
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
              onClick={createUserWithCreds}
            >
              Register
            </button>
          </div>

          {
            dataError.trim().length > 0 ? 
              <div className="text-red-500 mt-2 text-sm">
                {dataError}
              </div>
              :
              <></>
          }

          <div className='mt-8'>
            <div className="flex items-center">
              <span className='text-xs'>Already have an accout? <span>     </span>
                <Link to="/login">
                  <span className='text-orange-400 cursor-pointer'>Sign In!</span>
                </Link>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register