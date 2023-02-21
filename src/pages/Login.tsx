import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { auth } from '../firebase.config';

const Login = () => {

  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");

  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorData, setErrorData] = useState("");

  const isValidated = () => {
    if (typedEmail.trim().length > 0) {
      setErrorEmail("")
      setErrorData("")
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(typedEmail))) { 
        setErrorEmail("")
        setErrorData("")
        if (typedPassword.trim().length > 0) { 
          setErrorPassword("")
          setErrorData("")
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

  const loginWithCreds = async () => {
    if (isValidated()) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          typedEmail,
          typedPassword
        )
        console.log(user)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-4/12 bg-indigo-100 p-6 rounded-lg">
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
              type="text" name="password" id="password"
              placeholder="Choose Password"
              className="bg-gray-100 border-2 w-full p-4 rounded-lg"
              onChange={(event)=>setTypedPassword(event.target.value)}
            />
            <div className="text-red-500 mt-2 text-sm">
                { errorPassword }
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input type="checkbox" name="remember" id="remember" className="mr-2" />
              <span>Remember me</span>
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

          {
            errorData.trim().length > 0 ? 
              <div className="text-red-500 mt-2 text-sm">
                {errorData}
              </div>
              :
              <></>
          }
          
        </div>
      </div>
    </div>
  )
}

export default Login