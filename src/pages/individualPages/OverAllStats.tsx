import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import Stats from './Stats'

const OverAllStats = () => {
  const { resultJson, dataJson } = useSelector((state: RootState) => state.dataStore)
  const [showLocalStats, setShowLocalStats] = useState(true)

  const navigate = useNavigate()
  
  return (
    <div className='bg-rose-100 p-2 rounded-xl m-auto lg:max-w-[80%] max-w-[90%] max-h-[90vh]'>
      <p className='text-center uppercase font-bold text-xl'>Get To Know Statistics</p>
      <div className='flex justify-evenly items-center mt-5 mb-5'>
        <button onClick={()=>{setShowLocalStats(true)}} className='ml-1 mr-1 p-2 rounded-lg bg-indigo-200'>See Local Stats</button>
        <button onClick={()=>{setShowLocalStats(false)}} className='ml-1 mr-1 p-2 rounded-lg bg-indigo-200'>See Historical Stats</button>
      </div>
      {
        showLocalStats ? 
          <>
            {
              dataJson.length > 0 && resultJson.length > 0 ?
                <Stats propValue="Local" />
                :
                <div className='text-center'>
                  <p className='text-center animate-pulse text-red-500'>You haven't done any local prediction with the model</p>
                  <button onClick={()=>{navigate("/predict", { replace: true })}} className='p-2 bg-orange-600 rounded-xl mt-4 text-white'>Predict</button>
                </div>
            }
          </>
          :

          <Stats propValue="Historical" />

      }
    </div>
  )
}

export default OverAllStats