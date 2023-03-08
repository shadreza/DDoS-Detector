import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Charts from "../../components/charts/Charts";
import { readFromFirebase } from "../../functions/auth/firebase.read";
import { storeHistoricalData } from "../../functions/historicalAnalysis/storeHistoricalData";
import { clearHistoricalDataJson, setHasStatsBeenRegistered, setHistoricalDataJson } from "../../redux/features/dataJson";
import { clearMessageForModal, setMessageForModal, setShowModal } from "../../redux/features/modalMessage";
import { RootState } from "../../redux/store";

type Props = {
  propValue: string;
};

const Stats = (prop: Props) => {

  const { resultJson, dataJson, hasStatsRegistered, dataHistoricalJson } = useSelector((state: RootState) => state.dataStore)
  const { maxStepCount } = useSelector((state: RootState) => state.instructionInfoStore)
  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)

  const [resultName, setResultName] = useState([''])
  const [resultCount, setResultCount] = useState([0])

  const [timeName, setTimeName] = useState([''])
  const [timeCount, setTimeCount] = useState([0])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const attackChartDefault = [
    "Attack Name",
    "Count",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [attacksStatsData, setAttacksStatsData] = useState([attackChartDefault])
  const attackOptions = {
    title: "All Attack Records Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Attack Count",
      minValue: 0,
    },
    vAxis: {
      title: "DDoS Attacks",
    },
    height: "40vh",
    width: "100%"
  }



  const attackDataChartDefault = [
    "Attack Name",
    "Attack Count",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [attacksStatsDataCount, setAttacksStatsDataCount] = useState([attackDataChartDefault])
  const attackCountOptions = {
    title: "All Attack Records Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Attack Count",
      minValue: 0,
    },
    vAxis: {
      title: "DDoS Attacks",
    },
    height: "40vh",
    width: "100%"
  }


  const srcIpDataDefault = [
    "Src Ip Name",
    "Src Ip Count",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [srcIpData, setSrcIpData] = useState([srcIpDataDefault])
  const srcIpDataOptions = {
    title: "All Src Ip During Attack Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Src Ip Count",
      minValue: 0,
    },
    vAxis: {
      title: "Src Ip",
    },
    height: "40vh",
    width: "100%"
  }


  const srcIpDataRatioDefault = [
    "Src Ip Name",
    "Src Ip Ratio",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [srcIpDataRatio, setSrcIpDataRatio] = useState([srcIpDataRatioDefault])
  const srcIpDataRatioOptions = {
    title: "All Src Ip During Attack Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Src Ip  Ratio",
      minValue: 0,
    },
    vAxis: {
      title: "Src Ip ",
    },
    height: "40vh",
    width: "100%"
  }


  const dstIpDataDefault = [
    "Dst Ip Name",
    "Dst Ip Count",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [dstIpData, setDstIpData] = useState([dstIpDataDefault])
  const dstIpDataOptions = {
    title: "All Dst Ip During Attack Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Dst Ip Count",
      minValue: 0,
    },
    vAxis: {
      title: "Dst Ip",
    },
    height: "40vh",
    width: "100%"
  }


  const dstIpDataRatioDefault = [
    "Dst Ip Name",
    "Dst Ip Ratio",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [dstIpDataRatio, setDstIpDataRatio] = useState([dstIpDataRatioDefault])
  const dstIpDataRatioOptions = {
    title: "All Dst Ip During Attack Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Dst Ip  Ratio",
      minValue: 0,
    },
    vAxis: {
      title: "Dst Ip ",
    },
    height: "40vh",
    width: "100%"
  }


  const protocolDataDefault = [
    "Protocol Name",
    "Protocol Count",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [protocolData, setProtocolData] = useState([protocolDataDefault])
  const protocolDataOptions = {
    title: "All Protocols During Attack Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Protocol Count",
      minValue: 0,
    },
    vAxis: {
      title: "Protocols",
    },
    height: "40vh",
    width: "100%"
  }


  const protocolDataRatioDefault = [
    "Protocol Name",
    "Protocol Ratio",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [protocolDataRatio, setProtocolDataRatio] = useState([protocolDataRatioDefault])
  const protocolDataRatioOptions = {
    title: "All Protocols During Attack Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Protocol Ratio",
      minValue: 0,
    },
    vAxis: {
      title: "Protocols",
    },
    height: "40vh",
    width: "100%"
  }




  const timeStampDataDefault = [
    "Time (Hours)",
    "Attack Counts",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [timeStampData, setTimeStampData] = useState([timeStampDataDefault])
  const timeStampDataOptions = {
    title: "All Attack Hours Time Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Time [Hours]",
      minValue: 0,
    },
    vAxis: {
      title: "Attack Counts",
    },
    height: "40vh",
    width: "150%"
  }


  const timeStampDataRatioDefault = [
    "Time (Hours) Name",
    "Time (Hours) Ratio",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ]
  const [timeStampDataRatio, setTimeStampDataRatio] = useState([timeStampDataRatioDefault])
  const timeStampDataRatioOptions = {
    title: "All Attack Hours Time Registered",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    is3d: true,
    hAxis: {
      title: "Time (Hours) Ratio",
      minValue: 0,
    },
    vAxis: {
      title: "Time (Hours)",
    },
    height: "40vh",
    width: "100%"
  }

  const resetHistoricalData = () => {
    if (loggedInUserJson.role === 'master') {
      if (Object.keys(dataHistoricalJson['attacks']).length === 0) {
        dispatch(clearMessageForModal())
        dispatch(setMessageForModal(["Warning", "Historical data is empty. Nothing to reset"]))
        dispatch(setShowModal(true))
        setTimeout(() => {
          dispatch(setShowModal(false))
        }, 3000)
      } else {
        storeHistoricalData([dataJson, resultJson], false).then((res: any) => {
          if (res) {
            dispatch(clearHistoricalDataJson())
            dispatch(clearMessageForModal())
            setAttacksStatsData([attackChartDefault])
            setAttacksStatsDataCount([attackDataChartDefault])
            navigate("/stats", { replace: true })
            dispatch(setMessageForModal(["Success", "Historical data has been reseted"]))
            dispatch(setShowModal(true))
            setTimeout(() => {
              dispatch(setShowModal(false))
            }, 3000)
          } else {
            dispatch(clearMessageForModal())
            dispatch(setMessageForModal(["Failure", "Historical data could not be reseted"]))
            dispatch(setShowModal(true))
            setTimeout(() => {
              dispatch(setShowModal(false))
            }, 3000)
          }
        })
      }
    }
  }

  const registerGlobalHistory = () => {
    if (loggedInUserJson.role === 'admin' || loggedInUserJson.role === 'master' || loggedInUserJson.role === 'registered') {
      storeHistoricalData([dataJson, resultJson], true).then((res: any) => {
        if (res) {
          dispatch(clearMessageForModal())
          dispatch(setMessageForModal(["Success", "Stats of your data has been registered"]))
          dispatch(setShowModal(true))
          dispatch(setHasStatsBeenRegistered(true))
          setTimeout(() => {
            dispatch(setShowModal(false))
          }, 3000)
        } else {
          dispatch(clearMessageForModal())
          dispatch(setMessageForModal(["Failure", "Stats of your data could not be registered"]))
          dispatch(setShowModal(true))
          setTimeout(() => {
            dispatch(setShowModal(false))
          }, 3000)
        }
      })
    }
  }

  const setLabelCount = async () => {

    let nameArray:string[] = ['']

    for (let i = 0; i < dataJson.length; i++) { 
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


    




    let timeArray:string[] = ['']

    for (let i = 0; i < dataJson.length; i++) { 
      let found = 0

      for (let j = 0; j < timeArray.length; j++) {
        if ((new Date(dataJson[i]['Timestamp']).toLocaleTimeString('it-IT')).split(':')[0] === timeArray[j]) {
          found = 1
          break
        } else if ((new Date(dataJson[i][' Timestamp']).toLocaleTimeString('it-IT')).split(':')[0] === timeArray[j]) {
          found = 1
          break
        }
      }

      if (!found) {
        if (dataJson[i]['Timestamp']) {
          timeArray.push((new Date(dataJson[i]['Timestamp']).toLocaleTimeString('it-IT')).split(':')[0])
        } else if (dataJson[i][' Timestamp']) {
          timeArray.push((new Date(dataJson[i][' Timestamp']).toLocaleTimeString('it-IT')).split(':')[0])
        }         
      }
      
    }

    let timeCountArray: number[] = []
    
    for (let i = 0; i < timeArray.length; i++) { 
      if (timeArray[i] === '') {
        timeArray.splice(i, 1)
        break
      } 
    }

    for (let i = 0; i < timeArray.length; i++) {

      let count = 0
      for (let j = 0; j < dataJson.length; j++) {
        if (dataJson[j][' Timestamp']) { 
          if ((new Date(dataJson[j][' Timestamp']).toLocaleTimeString('it-IT')).split(':')[0] === timeArray[i]) {
            count = count + 1
          }
        } else if (dataJson[j]['Timestamp']) { 
          if ((new Date(dataJson[i]['Timestamp']).toLocaleTimeString('it-IT')).split(':')[0] === timeArray[i]) {
            count = count + 1
          }
        } 
      }
      timeCountArray.push(count)
    }

    setTimeName(timeArray)
    setTimeCount(timeCountArray)

  }

  const loadHistoricalData = async () => {
    dispatch(clearHistoricalDataJson()) 
    try {
      readFromFirebase("attacks").then(async (res: any) => {
        if (res[0] === 'ok') {
          const result = res[1].docs[0].data()
          dispatch(setHistoricalDataJson(result))

          let docCounter = 0

          let doc = result['attacks']

          if (doc) {
            let attack: any = []
            let attackRatio: any = []

            attack.push(attackChartDefault)
            attackRatio.push(attackDataChartDefault)

            let count = 0
            for (const key of Object.keys(doc)) {
              count += doc[key]
            }
            let i = 0
            for (const key of Object.keys(doc)) {
              let color = 'skyblue'
              if (i % 2) {
                color = 'orange'
              }
              attackRatio.push([key.toString(), 100*(parseFloat(doc[key])/count), color, null])
              attack.push([key.toString(), parseFloat(doc[key]), color, null])
              i++
            }
            setAttacksStatsData(attack)
            setAttacksStatsDataCount(attackRatio)

            docCounter ++
          }

          doc = result['protocols']
          
          if (doc) {
            let protocol: any = []
            let protocolRatio: any = []

            protocol.push(protocolDataDefault)
            protocolRatio.push(protocolDataRatioDefault)

            let count = 0
            for (const key of Object.keys(doc)) {
              count += doc[key]
            }
            let i = 0
            for (const key of Object.keys(doc)) {
              let color = 'skyblue'
              if (i % 2) {
                color = 'orange'
              }
              protocolRatio.push([key.toString(), 100*(parseFloat(doc[key])/count), color, null])
              protocol.push([key.toString(), parseFloat(doc[key]), color, null])
              i++
            }
            setProtocolData(protocol)
            setProtocolDataRatio(protocolRatio)

            docCounter ++
          }

          doc = result['source_ip']
          
          if (doc) {
            let srcIp: any = []
            let srcIpRatio: any = []

            srcIp.push(srcIpDataDefault)
            srcIpRatio.push(srcIpDataRatioDefault)

            let count = 0
            for (const key of Object.keys(doc)) {
              count += doc[key]
            }
            let i = 0
            for (const key of Object.keys(doc)) {
              let color = 'skyblue'
              if (i % 2) {
                color = 'orange'
              }
              srcIpRatio.push([key.toString(), 100*(parseFloat(doc[key])/count), color, null])
              srcIp.push([key.toString(), parseFloat(doc[key]), color, null])
              i++
            }
            setSrcIpData(srcIp)
            setSrcIpDataRatio(srcIpRatio)

            docCounter ++
          }

          doc = result['destination_ip']
          
          if (doc) {
            let dstIp: any = []
            let dstIpRatio: any = []

            dstIp.push(dstIpDataDefault)
            dstIpRatio.push(dstIpDataRatioDefault)

            let count = 0
            for (const key of Object.keys(doc)) {
              count += doc[key]
            }
            let i = 0
            for (const key of Object.keys(doc)) {
              let color = 'skyblue'
              if (i % 2) {
                color = 'orange'
              }
              dstIpRatio.push([key.toString(), 100*(parseFloat(doc[key])/count), color, null])
              dstIp.push([key.toString(), parseFloat(doc[key]), color, null])
              i++
            }
            setDstIpData(dstIp)
            setDstIpDataRatio(dstIpRatio)

            docCounter ++
          }


          doc = result['timestamps']
          
          if (doc) {
            let timeStamp: any = []
            let timeStampRatio: any = []

            timeStamp.push(timeStampDataDefault)
            timeStampRatio.push(timeStampDataRatioDefault)

            let count = 0
            for (const key of Object.keys(doc)) {
              count += doc[key]
            }
            let i = 0
            for (const key of Object.keys(doc)) {
              let color = 'skyblue'
              if (i % 2) {
                color = 'orange'
              }
              timeStampRatio.push([key.toString(), 100*(parseFloat(doc[key])/count), color, null])
              timeStamp.push([key.toString(), parseFloat(doc[key]), color, null])
              i++
            }
            setTimeStampData(timeStamp)
            setTimeStampDataRatio(timeStampRatio)

            docCounter ++
          }

          if (docCounter === 0) {
            dispatch(clearHistoricalDataJson())
            return
          }

        } else {
          dispatch(clearHistoricalDataJson()) 
        }
      })
    } catch {
      dispatch(clearHistoricalDataJson()) 
    }
  }

  useEffect(() => {
    loadHistoricalData()  
    setLabelCount()
  }, [])

  useEffect(() => {
    // if (resultJson.length <= 0 || maxStepCount < 3) {
    //   navigate("/", { replace: true })
    // }
    
  }, [resultJson, maxStepCount])

  return (
    <div className="p-2 rounded-xl text-center bg-white dark:bg-black">
      <p className="text-xl font-bold tracking-widest animate-pulse uppercase text-red-500">Statistics of <span className="text-xl">{prop.propValue}</span> Log File</p>
      <p onClick={() => { navigate("/", { replace: true }) }} className="mt-5 mb-5 cursor-pointer p-2 bg-rose-100 pl-4 pr-4 rounded-xl animate-pulse uppercase font-bold w-fit m-auto">Go To Home Page</p>
      {
        loggedInUserJson.role === 'master' && prop.propValue === 'Historical' && Object.keys(dataHistoricalJson['attacks']).length > 0 &&
        <p
            className="mt-5 mb-5 cursor-pointer p-2 bg-red-400 pl-4 pr-4 rounded-xl uppercase font-bold w-fit m-auto"
            onClick={() => {
              resetHistoricalData()
            }}
          >
            Reset Historical Data
          </p>
      }
      
      {
        prop.propValue === 'Local' && resultJson.length ?
          
          
          
          <div className="mt-4 max-h-[45vh] sm:max-h-[60vh] p-4 overflow-y-auto overflow-x-auto bg-orange-200 rounded-xl">
            {
              (loggedInUserJson.role === 'admin' || loggedInUserJson.role === 'master' || loggedInUserJson.role === 'registered') &&
              (!hasStatsRegistered) &&
              <div className="mb-4">
                <button onClick={()=>{registerGlobalHistory()}} className="bg-green-100 p-2 rounded-xl font-bold">Register Stats</button>
              </div>
            }
            <p className="font-bold mb-6">Total Packets : <span className="text-red-600">{resultJson.length}</span></p>

            {
              resultName.length > 0 &&
              <div className="m-auto w-full sm:w-[70%] bg-rose-50 mt-4 mb-4 p-2 rounded-xl">
                <p className="uppercase font-bold animate-pulse text-orange-500">Attack Analysis</p>
                {
                  resultName.map((res, i) =>
                    <div key={i} className="sm:flex p-1 justify-center items-center m-auto mt-2">
                      <span className="block sm:inline mt-1 mb-1  sm:w-40 sm:mr-auto p-2 bg-rose-300 rounded-xl">{res}</span>
                      <span className="block sm:inline mt-1 mb-1  sm:w-40 sm:ml-1 sm:mr-1 p-2 bg-indigo-300 rounded-xl">{resultCount[i]} packets</span>
                      <span className="block sm:inline mt-1 mb-1  sm:w-40 sm:ml-auto p-2 bg-indigo-300 rounded-xl"> [ ~ {(100 * resultCount[i] / resultJson.length).toFixed(4)} % ]</span>
                    </div>
                  )
                }
              </div>
            }

            {
              timeName.length > 0 &&
              <div className="m-auto w-full sm:w-[70%] bg-indigo-50 mt-4 mb-4 p-2 rounded-xl">
                <p className="uppercase font-bold animate-pulse text-orange-500">Hourly Attack Analysis</p>
                {
                  timeName.map((res, i) =>
                    <div key={i} className="sm:flex p-1 justify-center items-center m-auto mt-2">
                      <span className="block sm:inline mt-1 mb-1  sm:w-40 sm:mr-auto p-2 bg-rose-300 rounded-xl">{res}</span>
                      <span className="block sm:inline mt-1 mb-1  sm:w-40 sm:ml-1 sm:mr-1 p-2 bg-indigo-300 rounded-xl">{timeCount[i]} packets</span>
                      <span className="block sm:inline mt-1 mb-1  sm:w-40 sm:ml-auto p-2 bg-indigo-300 rounded-xl"> [ ~ {(100 * timeCount[i] / dataJson.length).toFixed(4)} % ]</span>
                    </div>
                  )
                }
              </div>
            }

          </div>
          :
          <></>
      }

      {
        prop.propValue === 'Historical' && Object.keys(dataHistoricalJson['attacks']).length &&
        <div className="max-h-[40vh] sm:max-h-[60vh] p-2 overflow-y-auto overflow-x-auto"> 
          {
              Object.values(attacksStatsData).length > 1 ?
                <Charts 
                  passedData={attacksStatsData} 
                  passedOptions={attackOptions} 
                  chartName="BarChart" 
                  title="All Attack Counts"
                />
              :
              <></>
          }
          {
            Object.values(attacksStatsDataCount).length > 1 ?
                <Charts 
                  passedData={attacksStatsDataCount} 
                  passedOptions={attackCountOptions} 
                  chartName="PieChart" 
                  title="All Attack Ratio"
                />
              :
              <></>
          }
          {
            Object.values(protocolDataRatio).length > 1 ?
                <Charts 
                  passedData={protocolDataRatio} 
                  passedOptions={protocolDataRatioOptions} 
                  chartName="PieChart" 
                  title="All Protocols Ratio"
                />
              :
              <></>
          }
          {
            Object.values(protocolData).length > 1 ?
                <Charts 
                  passedData={protocolData} 
                  passedOptions={protocolDataOptions} 
                  chartName="BarChart" 
                  title="All Protocols Count"
                />
              :
              <></>
          }
          {
            Object.values(srcIpDataRatio).length > 1 ?
                <Charts 
                  passedData={srcIpDataRatio} 
                  passedOptions={srcIpDataRatioOptions} 
                  chartName="PieChart" 
                  title="All Attack From Src Ip Ratio"
                />
              :
              <></>
          }
          {
            Object.values(srcIpData).length > 1 ?
                <Charts 
                  passedData={srcIpData} 
                  passedOptions={srcIpDataOptions} 
                  chartName="BarChart" 
                  title="All Attack From Src Ip Count"
                />
              :
              <></>
          }
          {
            Object.values(dstIpDataRatio).length > 1 ?
                <Charts 
                  passedData={dstIpDataRatio} 
                  passedOptions={dstIpDataRatioOptions} 
                  chartName="PieChart" 
                  title="All Attack To Dst Ip Ratio"
                />
              :
              <></>
          }
          {
            Object.values(dstIpData).length > 1 ?
                <Charts 
                  passedData={dstIpData} 
                  passedOptions={dstIpDataOptions} 
                  chartName="BarChart" 
                  title="All Attack To Dst Ip Count"
                />
              :
              <></>
          }
          {
            Object.values(timeStampDataRatio).length > 1 ?
                <Charts 
                  passedData={timeStampDataRatio} 
                  passedOptions={timeStampDataRatioOptions} 
                  chartName="PieChart" 
                  title="All Attack Hours Time Ratio"
                />
              :
              <></>
          }
          {
            Object.values(timeStampData).length > 1 ?
                <Charts 
                  passedData={timeStampData} 
                  passedOptions={timeStampDataOptions} 
                  chartName="LineChart" 
                  title="Attack Hours Time Spike"
                />
              :
              <></>
          }
        </div>
      }
        
      </div>
  )
}

export default Stats