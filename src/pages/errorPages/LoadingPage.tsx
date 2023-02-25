import LoadingAnimation from "../../components/animations/LoadingAnimation"

const LoadingPage = () => {
  return (

    <div className="bg-white dark:bg-black z-100">
      <div className="bg-white dark:bg-black flex justify-center mt-[40vh]">
        <LoadingAnimation />
      </div>
      <div className="bg-white dark:bg-black mt-10 text-center animate-ping animate-bounce text-indigo-400">
        LOADING
      </div>
    </div>

  )
}

export default LoadingPage