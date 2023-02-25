import { useEffect, useState } from "react"
import { ArrowForward, CaretBackCircleOutline, PlayBackCircleOutline, PlayCircleOutline, PlayForwardCircleOutline } from "react-ionicons"
import { useDispatch, useSelector } from "react-redux"
import { setMaxStepCount, setStepCount } from "../../redux/features/instructionInfo"
import { clearMessageForModal, setMessageForModal, setShowModal } from "../../redux/features/modalMessage"
import { RootState } from "../../redux/store"
import LoadingAnimation from "../animations/LoadingAnimation"

const Table = () => {
  const { dataJson, headers } = useSelector((state: RootState) => state.dataStore)
  const dispatch = useDispatch();

  const [tmpDataJson, setTempDataJson] = useState<any[]>(dataJson)
  const [isTableReady, setIsTableReady] = useState(false)
  const [tableJson, setTableJson] = useState<any[]>([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotaPages] = useState(0)
  
  const getTableJsonFormatted = () => {
    setIsTableReady(false)
    let totalTempArray:any[] = []
    let tmpArray:any[] = []
    for (let i = 1; i <= tmpDataJson.length; i++) { 
      if (((i) % (rowsPerPage)) === 0) {
        tmpArray.push(tmpDataJson[i-1])
        totalTempArray.push(tmpArray)
        tmpArray =[]
      } else {
        tmpArray.push(tmpDataJson[i-1])
      }
    }
    if (tmpArray.length > 0) {
      totalTempArray.push(tmpArray)
    }
    setTableJson(totalTempArray)
    setTotaPages(totalTempArray.length)
    setIsTableReady(true)
  }

  useEffect(() => {
    getTableJsonFormatted()
  }, [dataJson, rowsPerPage])



  const proceedToModelComponent = () => {
    dispatch(setMaxStepCount(2))
    dispatch(setStepCount(2))
  }

  

  const changePage = (pageValue: number) => {
    if (pageValue) {
      if (pageValue < 0) {
        setPage(0)
      } else {
        if (pageValue >= 0 && pageValue < totalPages) {
          setPage(pageValue)
        } else {
          setPage(totalPages-1)
        }
      }
    } else {
      setPage(0)
    }
  };

  const alterPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageValue = parseInt(event.target.value) - 1
    if (pageValue) {
      if (pageValue < 0) {
        setPage(0)
      } else {
        if (pageValue >= 0 && pageValue < totalPages) {
          setPage(pageValue)
        } else {
          setPage(totalPages-1)
        }
      }
    } else {
      setPage(0)
    }
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.target.value
    if (newValue) {
      if (newValue >= 1 && newValue <= 1000) {
        if (newValue > tmpDataJson.length) {
          setRowsPerPage(tmpDataJson.length);
        } else {
          setRowsPerPage(newValue);
        }
      } else if (newValue > 1000) {
        dispatch(setMessageForModal(["Error", "Rows per page can be maxed out at 1000"]))
        dispatch(setShowModal(false))
        setTimeout(() => {
          dispatch(clearMessageForModal())
          dispatch(setShowModal(false))
        }, 3*1000);
        setRowsPerPage(1000);
      } else {
        setRowsPerPage(rowsPerPage);
      }
    } else {
      setRowsPerPage(rowsPerPage);
    }
    getTableJsonFormatted()
  };

  return (
    <>
      {
        isTableReady ?
          <div className="h-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[45vh] sm:max-h-[60vh] overflow-y-auto align-center ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="sticky top-0 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {
                      headers.map((headerName,i) => 
                        <th key={i} scope="col" className="px-6 py-3">
                            {headerName}
                        </th>
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    tableJson[page].map((data:any,i:any) => 
                      <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {
                          headers.map((headerName, i) => 
                            i === 0 ?
                              <th key={i} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data[headerName]}
                              </th>
                              :
                              <td key={i} scope="col" className="px-6 py-3">
                                  {data[headerName]}
                              </td>
                          )
                        }
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center mt-4 max-w-fit m-auto">
              <div className="max-w-full sm:max-w-fit bg-slate-200 p-2 rounded-xl m-auto flex justify-center items-center">
                <span className="ml-4 mr-4 sm:ml-6 sm:mr-6 hover:bg-rose-300 rounded-full cursor-pointer">
                  <PlayBackCircleOutline  onClick={()=>{changePage(0)}}  shake/>
                </span>
                <span className="ml-4 mr-4 sm:ml-6 sm:mr-6 hover:bg-green-300 rounded-full cursor-pointer">
                  <CaretBackCircleOutline  onClick={()=>{changePage(page-1)}} />
                </span>
                <span className="ml-2 mr-2 sm:ml-6 sm:mr-6 cursor-pointer flex items-center">
                  <span className="mr-1 ml-1">page</span>
                  <input className="w-14 mr-1 ml-1 rounded text-center" type="number" value={page + 1} onChange={e => {alterPage(e)}} />
                  <span className="mr-1 ml-1">of</span>
                  <span className="mr-1 ml-1 flex items-center"> {totalPages}</span>
                </span>
                <span className="ml-4 mr-4 sm:ml-6 sm:mr-6 cursor-pointer hover:bg-green-300 rounded-full">
                  <PlayCircleOutline  onClick={()=>{changePage(page+1)}} />
                </span>
                <span className="ml-4 mr-4 sm:ml-6 sm:mr-6 hover:bg-rose-300 rounded-full cursor-pointer">
                  <PlayForwardCircleOutline onClick={()=>{changePage(totalPages)}} shake/>
                </span>
              </div>
              <div>
                <span className="ml-2  cursor-pointer flex items-center bg-slate-200 p-2 rounded-xl">
                  <span className="mr-1 ml-1">Rows Per Page</span>
                  <input className="w-14 mr-1 ml-1 rounded text-center" type="number" value={rowsPerPage} onChange={e => {handleChangeRowsPerPage(e)}} />
                </span>
              </div>
            </div>


            <div className="mt-4 text-center p-2 w-fit hover:bg-blue-200 bg-rose-200 rounded-xl flex justify-center items-center m-auto cursor-pointer" onClick={proceedToModelComponent} >
              <span className="p-1 font-bold">
                Proceed
              </span>
              <ArrowForward shake/>
            </div>
          </div>
          :
          <LoadingAnimation/>
      }
    </>
  )
}

export default Table