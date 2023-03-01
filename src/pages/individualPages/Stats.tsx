import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

import { RootState } from "../../redux/store";


const Stats = () => {

  const { resultJson } = useSelector((state: RootState) => state.dataStore)
  const { maxStepCount } = useSelector((state: RootState) => state.instructionInfoStore)

  const [resultName, setResultName] = useState ([''])
  const [resultCount, setResultCount] = useState ([0])
  const [pieChartData, setPieChartData] = useState<any[]>([])
  
  const navigate = useNavigate();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;

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
  }, [])

  useEffect(() => {

    if (resultJson.length <= 0 || maxStepCount < 3) {
      navigate("/", { replace: true })
    }
    
  }, [resultJson, maxStepCount])

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index } : any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {resultName[index] + " - " + ((resultCount[index]/resultJson.length)*100).toString() + "%" }
    </text>
  );
};



  return (
    <div className="p-2 rounded-xl text-center bg-black max-h-[90vh] overflow-y-auto">
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

        <p className="text-center text-rose-200 mt-20 mb-2">Attacks in counts</p>
      <div className="overflow-auto">


        <BarChart
          width={1200}
          height={300}
          data={pieChartData}
          margin={{
            top: 5,
            right: 60,
            left: 60,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="title" scale="point" padding={{ left: 20, right: 20 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>

      </div>
        
        <p className="text-center text-rose-200 mt-20 mb-2">Attacks in percentage</p>
      <div className="overflow-auto">


          <PieChart width={800} height={800}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          </PieChart>

      </div>

    </div>
  )
}

export default Stats