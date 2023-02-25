import LoadingAnimation from "../../components/animations/LoadingAnimation"

const LoadingPage = () => {
  return (

    <div>
      <div className="flex justify-center mt-[40vh]">
        <LoadingAnimation />
      </div>
      <div className="mt-10 text-center animate-ping animate-bounce text-indigo-400">
        LOADING
      </div>
    </div>

  )
}

export default LoadingPage