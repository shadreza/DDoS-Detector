import { useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const Stats = () => {

  const { resultJson } = useSelector((state: RootState) => state.dataStore)
  const { maxStepCount } = useSelector((state: RootState) => state.instructionInfoStore)

  const [resultName, setResultName] = useState ([''])
  const [resultCount, setResultCount] = useState ([0])
  const [pieChartData, setPieChartData] = useState<any[]>([])
  
  const navigate = useNavigate();

  let height:string = '350px'
  const setLabelCount = () => {


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
      setPieChartData(pieData)

  }

  useEffect(() => {
    setLabelCount()
    height = "400px"
  }, [])

  useEffect(() => {

    if (resultJson.length <= 0 || maxStepCount < 3) {
      navigate("/", { replace: true })
    }
    
  }, [resultJson, maxStepCount])



  return (
    <div className="p-2 rounded-xl text-center">
      <p className="text-xl font-bold tracking-widest animate-pulse uppercase text-red-500">Statistics of Log File</p>
      <div className="mt-4 bg-orange-200 p-2 rounded-xl">

        <div className="m-auto md:flex md:justify-center md:items-center w-full md:w-[100%] md:overflow-x-auto">
          {
            resultName.map((res, i) =>
              <div key={i} className="flex max-w-[50%] p-2 bg-indigo-300 rounded-xl flex justify-center items-center ml-auto mr-auto m-2 md:ml-2 md:mr-2">
                <span className="ml-1 mr-1">{res}</span>
                <span className="ml-1 mr-1"> : </span>
                <span className="ml-1 mr-1">{resultCount[i]}</span>
              </div>
            )
          }
        </div>
      </div>
        <div className="m-auto mt-10">
        <PieChart data={pieChartData} 
          style={{ height: '500px' }}
          segmentsShift={(index) => (index === 0 ? 4 : 0.5)}
          label={({ dataEntry }) => dataEntry.value}
          labelStyle={(index) => ({
            fill: pieChartData[index].color,
            fontSize: '6px',
            fontFamily: 'sans-serif',
          })}
          radius={36}
          labelPosition={110}
          />
        </div>
    </div>
  )
}

export default Stats