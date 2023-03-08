import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setHasStatsBeenRegistered, setResultJson } from "../../../redux/features/dataJson";
import { setMaxStepCount, setStepCount } from "../../../redux/features/instructionInfo";
import { clearMessageForModal, setMessageForModal, setShowModal } from "../../../redux/features/modalMessage";
import { RootState } from "../../../redux/store";
import LoadingAnimation from "../../animations/LoadingAnimation";

const Model = () => {

  const baseURL = "https://ddos-be.onrender.com"

  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)

  const [post, setPost] = useState(null)
  const [connectionState, setConnectionState] = useState(false)
  const [hasDataBeenSent, setHasDataBeenSent] = useState(false)
  const [responseFromBE, setResponseFromBE] = useState([])
  const { dataJson } = useSelector((state: RootState) => state.dataStore)
  const { impFeatureSet, featureNameConsistency } = useSelector((state: RootState) => state.impFeatureStore)
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

    let dataFoundFromFile = 0

    let oneDataArray = []
    for (let i = 0; i < dataJson.length; i++) {
      let newObj: any = {}
      for (let j = 0; j < impFeatureSet.length; j++) { 
        if (dataJson[i][impFeatureSet[j]]) {
            newObj[impFeatureSet[j]] = dataJson[i][impFeatureSet[j]].replace('\r','')
            dataFoundFromFile = dataFoundFromFile + 1
        } else if (dataJson[i][impFeatureSet[j]+'\r']) {
          newObj[impFeatureSet[j]] = dataJson[i][impFeatureSet[j]+'\r'].replace('\r','')
            dataFoundFromFile = dataFoundFromFile + 1
        } else {
          let newValue = '-0'
          for (let k = 0; k < featureNameConsistency.length; k++) {
            let newName = featureNameConsistency[k].replace('\r', '')
            if (featureNameConsistency[k] === impFeatureSet[j] || featureNameConsistency[k] === impFeatureSet[j]+'\r' || featureNameConsistency[k + 1] === impFeatureSet[j] || featureNameConsistency[k + 1] === impFeatureSet[j]+'\r' || newName === impFeatureSet[j] || newName === impFeatureSet[j]+'\r') {
              if (dataJson[i][featureNameConsistency[k + 1]]) {
                newValue = dataJson[i][featureNameConsistency[k + 1]].replace('\r','')
                dataFoundFromFile = dataFoundFromFile + 1
                break
              }
            }
            k++
          }
          newObj[impFeatureSet[j]] = newValue
        }
      }
      oneDataArray.push(newObj)
    }

    if (dataFoundFromFile !== (dataJson.length * impFeatureSet.length)) {
      dispatch(clearMessageForModal)
      dispatch(setMessageForModal(['Warning','Your dataset was not totally formatted and some features were missing. So default value inserted. ' + Math.abs(Math.round(impFeatureSet.length - (dataFoundFromFile/dataJson.length))) + ' out of ' + impFeatureSet.length +' features are not named properly. So results may come inaccurate. Please follow the CIC-DoS Column Name Convention' ]))
      dispatch(setShowModal(true))
      dataFoundFromFile = 0
    }
    setHasDataBeenSent(true)
    await axios
      .post((baseURL + "/data"), {
        data: oneDataArray,
        param: par
      })
      .then((response) => {
        const responseData = response.data
        dispatch(setHasStatsBeenRegistered(false))
        setResponseFromBE(responseData)
        dispatch(setResultJson(responseData))
        dispatch(setMaxStepCount(3))
        dispatch(setStepCount(3))
      })
      .catch((e) => {
        dispatch(setHasStatsBeenRegistered(false))
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
          <div className="bg-cyan-100 dark:bg-emerald-200 rounded-xl max-w-fit p-4 flex-reverse max-h-[60vh] overflow-y-auto sm:flex sm:justify-around sm:items-center mt-4 m-auto text-center">

            {
              connectionState ?
              <>

                <div onClick={() => { sendDataToBE(0) }} className="cursor-pointer hover:bg-[#FD8A8A] p-4 m-auto mt-2 mb-2 text-center max-w-fit bg-[#F5EAEA] sm:mr-4 rounded-xl">

                  <button onClick={() => { sendDataToBE(0) }} className="p-2 rounded-xl bg-red-100 border-orange-400 border-4 animate-pulse hover:shadow-lg mb-2"> <span className="hover-font-bold">Machine Learning Model</span> </button>
                  <div className="grid grid-cols-3 sm:grid-cols-0 gap-2">
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
              
                <div onClick={() => { sendDataToBE(0) }} className="cursor-pointer hover:bg-[#FD8A8A] p-4 m-auto mt-2 mb-2 text-center max-w-fit bg-[#F5EAEA] sm:ml-4 rounded-xl">

                  <button onClick={() => { sendDataToBE(0) }} className="p-2 rounded-xl bg-red-100 border-sky-400 border-4 animate-pulse hover:shadow-lg mb-2"> <span className="hover-font-bold">Deep Learning Model</span> </button>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-0 gap-2">
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
                      Bi-GRU
                      </div>
                      <div className="col-span-2 ... p-2 rounded-xl m-1  bg-indigo-300">
                        Ensemble Technique
                      </div>
                  </div>
                    
                  </div>
                    

                </>
                
                :

                <div className="rounded-full p-1 text-center m-auto flex justify-center items-center">
                  <LoadingAnimation/>
                </div>

              
            }

          </div>
          
      }
    </>
  )
}

export default Model