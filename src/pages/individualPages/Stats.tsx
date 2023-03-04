import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeHistoricalData } from "../../functions/historicalAnalysis/storeHistoricalData";
import { RootState } from "../../redux/store";


const Stats = () => {

  const { resultJson, dataJson } = useSelector((state: RootState) => state.dataStore)
  const { maxStepCount } = useSelector((state: RootState) => state.instructionInfoStore)
  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)

  const [resultName, setResultName] = useState ([''])
  const [resultCount, setResultCount] = useState ([0])
  
  const navigate = useNavigate();

  const setLabelCount = () => {

    if (loggedInUserJson.role !== 'interested') {
      storeHistoricalData([dataJson, resultJson])
    }
    
    let nameArray:string[] = ['']

    for (let i = 0; i < resultJson.length; i++) { 
      let found = 0

      for (let j = 0; j < nameArray.length; j++) {
        if (resultJson[i] === nameArray[j]) {
          found = 1
          break
        }
      }

      if (!found) {
        nameArray.push(resultJson[i])
      }
      
    }

    let countArray: number[] = []
    
    for (let i = 0; i < nameArray.length; i++) { 
      if (nameArray[i] === '') {
        nameArray.splice(i, 1)
        break
      } 
    }

    for (let i = 0; i < nameArray.length; i++) {

        let count = 0
        for (let j = 0; j < resultJson.length; j++) {
          if (resultJson[j] === nameArray[i]) {
            count = count + 1
          }
        }
        countArray.push(count)


    }

      setResultName(nameArray)
      setResultCount(countArray)

      let pieData = []
      const colors = [ '#F38181', '#FCE38A', '#EAFFD0', '#95E1D3', '#AA96DA', '#FCBAD3', '#30E3CA', '#3282B8', '#C1F4C5', '#28FFBF', '#FFBF86',  '#C2F784']
      let obj = { title: '', value: 0, color: '' }
      for (let i = 0; i < nameArray.length; i++) { 
        obj.title = resultName[i]
        obj.value = resultCount[i]
        obj.color = colors[i]
        pieData.push(obj)
        obj = { title: '', value: 0, color: '' }
      }

  }

    useEffect(() => {
      setLabelCount()
  }, [])

  useEffect(() => {
    if (resultJson.length <= 0 || maxStepCount < 3) {
      navigate("/", { replace: true })
    }
    
  }, [resultJson, maxStepCount])





  return (
    <div className="p-2 rounded-xl text-center bg-black max-h-[90vh] overflow-y-auto">
      <p className="text-xl font-bold tracking-widest animate-pulse uppercase text-red-500">Statistics of Log File</p>
      <div className="mt-4 bg-orange-200 p-2 rounded-xl">

        <p>Total Packets : { resultJson.length }</p>

        <div className="m-auto mb-10">
          {
            resultName.map((res, i) =>
              <div key={i} className="flex sm:max-w-[60%] p-2 bg-indigo-300 rounded-xl justify-center items-center m-auto mt-2 mb-2">
                <span className="ml-1 mr-1">{res}</span>
                <span className="ml-1 mr-1"> : </span>
                <span className="ml-1 mr-1">{resultCount[i]} packets</span> <span> [ ~ { 100 * resultCount[i] / resultJson.length } % ]</span>
              </div>
            )
          }
        </div>

        <p onClick={() => {navigate("/", { replace: true })}} className="mb-5 cursor-pointer p-2 bg-rose-100 pl-4 pr-4 rounded-xl animate-pulse uppercase font-bold w-fit m-auto">Go To Home Page</p>

      </div>

        
      </div>
  )
}

export default Stats