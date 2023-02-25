import { useState } from "react"
import { ArrowForward } from "react-ionicons"
import { useDispatch, useSelector } from "react-redux"
import { setMaxStepCount, setStepCount } from "../../redux/features/instructionInfo"
import { RootState } from "../../redux/store"

const Table = () => {
  const { dataJson, headers } = useSelector((state: RootState) => state.dataStore)

  const [paginatedDataArray, setPaginatedDataArray] = useState<any[]>([])

  const dispatch = useDispatch()

  const proceedToModelComponent = () => {
    dispatch(setMaxStepCount(2))
    dispatch(setStepCount(2))
  }

  return (
    <div className="h-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh] sm:max-h-[60vh] overflow-y-auto align-center ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
              dataJson.map((data,i) => 
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
        <div>
          Hi
        </div>
      </div>


      <div className="mt-4 text-center p-2 w-fit bg-rose-200 rounded-xl flex justify-center items-center m-auto cursor-pointer" onClick={proceedToModelComponent} >
        <span className="p-1 font-bold">
          Proceed
        </span>
        <ArrowForward shake/>
      </div>
    </div>
  )
}

export default Table