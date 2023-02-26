import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setResultJson } from "../../../redux/features/dataJson";
import { setMaxStepCount, setStepCount } from "../../../redux/features/instructionInfo";
import { RootState } from "../../../redux/store";
import LoadingAnimation from "../../animations/LoadingAnimation";

const Model = () => {

  // const baseURL = "https://ddos-be.onrender.com"
  const baseURL = "http://127.0.0.1:8000"
  const additionOfPostURL = ["data"]

  const [post, setPost] = useState(null)
  const [connectionState, setConnectionState] = useState(false)
  const [hasDataBeenSent, setHasDataBeenSent] = useState(false)
  const [responseFromBE, setResponseFromBE] = useState([])

  const { dataJson } = useSelector((state: RootState) => state.dataStore)
  const dispatch = useDispatch()
  
  const getDataFromBE = async () => {
    await axios
      .get(`${baseURL}`)
      .then((response) => {
        setPost(response.data["data"])
        setConnectionState(true)
      })
      .catch((err) => {
        setConnectionState(false)
      })
  }

  useEffect(() => {
    getDataFromBE()
    dispatch(setMaxStepCount(2))
    dispatch(setStepCount(2))
  }, []);

  const sendDataToBE = async (par: number) => {
    const oneData = dataJson
        setHasDataBeenSent(true)
    await axios
      .post((baseURL + "/data"), {
        data: oneData,
        param: par
      })
      .then((response) => {
        setResponseFromBE(response.data)
        dispatch(setResultJson(response.data))
        dispatch(setMaxStepCount(3))
        dispatch(setStepCount(3))
      })
      .catch((e) => {
        setHasDataBeenSent(false)
      })
  }
  
  return (
    <>
      {
        hasDataBeenSent === true && responseFromBE.length === 0 ?
          <div className="flex justify-center mt-20">
            <LoadingAnimation />
          </div>
          :
          <div className="bg-cyan-100 dark:bg-emerald-200 rounded-xl max-w-fit p-4 flex-reverse sm:flex sm:justify-around sm:items-center mt-4 m-auto text-center">

            {
              connectionState &&
              <>

                <div onClick={() => { sendDataToBE(0) }} className="cursor-pointer hover:bg-[#FD8A8A] p-4 m-auto mt-2 mb-2 text-center max-w-fit bg-[#F5EAEA] sm:mr-4 rounded-xl">

                  <button onClick={() => { sendDataToBE(0) }} className="p-2 rounded-xl bg-red-100 border-orange-400 border-4 animate-pulse hover:shadow-lg mb-2"> <span className="hover-font-bold">Machine Learning Model</span> </button>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="... p-2 rounded-xl m-1 bg-indigo-300">
                      Decision Tree
                    </div>
                    <div className="... p-2 rounded-xl m-1  bg-indigo-300">
                      Random Forest
                    </div>
                    <div className="... p-2 rounded-xl m-1  bg-indigo-300">
                      Extra Tree Classifier
                    </div>
                    <div className="col-span-2 ... p-2 rounded-xl m-1  bg-indigo-300">
                      LightGBM
                    </div>
                    <div className="... p-2 rounded-xl m-1  bg-indigo-300">
                      XgBoost
                    </div>
                    <div className="... p-2 rounded-xl m-1  bg-indigo-300">
                      AdaBoost
                    </div>
                    <div className="col-span-2 ... p-2 rounded-xl m-1  bg-indigo-300">
                      HistGradiantBoost
                    </div>
                    <div className="col-span-3 p-2 rounded-xl m-1  bg-indigo-300">
                      Ensemble Technique
                    </div>
                  </div>
                    
                </div>
              
                <div onClick={() => { sendDataToBE(1) }} className="cursor-pointer hover:bg-[#FD8A8A] p-4 m-auto mt-2 mb-2 text-center max-w-fit bg-[#F5EAEA] sm:ml-4 rounded-xl">

                  <button onClick={() => { sendDataToBE(1) }} className="p-2 rounded-xl bg-red-100 border-sky-400 border-4 animate-pulse hover:shadow-lg mb-2"> <span className="hover-font-bold">Deep Learning Model</span> </button>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="... p-2 rounded-xl m-1 bg-indigo-300">
                      LSTM
                    </div>
                    <div className="... p-2 rounded-xl m-1  bg-indigo-300">
                      GRU
                    </div>
                    <div className="... p-2 rounded-xl m-1  bg-indigo-300">
                      Bi-LSTM
                    </div>
                    <div className="... p-2 rounded-xl m-1  bg-indigo-300">
                      Ensemble Technique
                    </div>
                    <div className="col-span-2 ... p-2 rounded-xl m-1  bg-indigo-300">
                      Bi-GRU
                    </div>
                  </div>
                    
                  </div>
                    

              </>

              
            }

          </div>
          
      }
    </>
  )
}

export default Model