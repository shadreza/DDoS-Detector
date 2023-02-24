import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const Table = () => {
  const { impFeatureSet } = useSelector((state: RootState) => state.impFeatureStore)
  const { dataJson, headers } = useSelector((state: RootState) => state.dataStore)
  console.log(dataJson)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {data[headerName]}
                      </th>
                      :
                      <td key={i} scope="col" className="px-6 py-3">
                          {data[headerName]}
                      </td>
                  )
                }
                <td className="px-6 py-4 text-right">
                    <a href="edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            )
          }
          
        </tbody>
      </table>
    </div>
  )
}

export default Table