import { LogoFirebase, LogoFlickr, LogoReact } from "react-ionicons"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  return (
    <div className="text-red-400 text-center">
      <p className="text-[60px] animate-pulse uppercase tracking-[20px] mt-10">DDoS ___ Detector</p>
      <div className="mt-20 m-auto md:flex md:justify-evenly w-[60%] items-center">
        <span className="animate-spin">

        <LogoReact width="80px" height="80px" color="cyan"  />
        </span>
        <span className="animate-ping">

        <LogoFlickr width="80px" height="80px" color="maroon"  />
        </span>
        <span className="animate-pulse">

        <LogoFirebase  width="80px" height="80px" color="orange" />
        </span>
        
      </div>
      <div className="mt-40 text-center cursor-pointer">
        <span className="bg-indigo-500 p-4 rounded-xl text-2xl font-bold animate-pulse" onClick={() => { navigate('/predict', { replace:true})}}> Get Started !</span>
      </div>
    </div>
  )
}

export default Home