import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { auth } from '../firebase.config';

const Login = () => {

  const [typedMail, setTypedMail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");

  const loginWithCreds = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        typedMail,
        typedPassword
      )
      console.log(user)
    } catch (err) {
      console.log(err)
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
              onChange={(event)=>setTypedMail(event.target.value)}
            />
            {/* <div className="text-red-500 mt-2 text-sm">
                {{ $message }}
            </div> */}
          </div>

          <div className="mb-4">
            <input
              type="password" name="password" id="password"
              placeholder="Choose Password"
              className="bg-gray-100 border-2 w-full p-4 rounded-lg"
              onChange={(event)=>setTypedPassword(event.target.value)}
            />
            {/* <div className="text-red-500 mt-2 text-sm">
                {{ $message }}
            </div> */}
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
          
        </div>
      </div>
    </div>
  )
}

export default Login