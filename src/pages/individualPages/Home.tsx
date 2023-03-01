import { LogoFirebase, LogoFlickr, LogoReact } from "react-ionicons"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  return (
    <div className="text-red-400 text-center w-full">
      <p className="text-[30px] lg:text-[60px] animate-pulse uppercase tracking-[20px] mt-10">DDoS Detector</p>
      <div className="mt-20 m-auto flex justify-evenly items-center">
        <span className="animate-spin">
          <LogoReact width="40px" height="40px" color="cyan"  />
        </span>
        <span className="animate-ping">
          <LogoFlickr width="40px" height="40px" color="maroon"  />
        </span>
        <span className="animate-pulse">
          <LogoFirebase  width="40px" height="40px" color="orange" />
        </span>
        
      </div>
      <div className="mt-40 text-center cursor-pointer">
        <span className="bg-indigo-500 p-4 rounded-xl text-2xl font-bold animate-pulse" onClick={() => { navigate('/predict', { replace:true})}}> Get Started !</span>
      </div>
    </div>
  )
}

export default Home