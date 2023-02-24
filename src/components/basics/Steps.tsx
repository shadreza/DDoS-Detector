import { Book, CloudUpload, Reader, Rocket } from "react-ionicons"
import { useDispatch, useSelector } from "react-redux"
import { setStepCount } from "../../redux/features/instructionInfo"
import { RootState } from "../../redux/store"

const Steps = () => {

  const { stepInfo, stepCount, maxStepCount } = useSelector((state: RootState) => state.instructionInfoStore)
  const dispatch = useDispatch()

  const changeStepNumber = (step: number) => {
    if (step >= 0 && step <= 4) {
      dispatch(setStepCount(step))
    }
  }
  
  return (
    <div className="tex-center pb-4 mb-4 flex-col">
            <div className="h-full w-full flex justify-center items-center">
              <div className="bg-slate-100 dark:bg-black w-fit flex p-2 rounded-2xl items-center z-0">
                
          <div className="cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
            {
              
              (stepCount === 0) ?
                <span className="p-1 border-sky-200 border-xs rounded-full animate-ping" onClick={()=>{changeStepNumber(0)}}>
                  <CloudUpload title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                </span>
                
                :
                (maxStepCount >= 0) ?
                  <span onClick={()=>{changeStepNumber(0)}}>
                    <CloudUpload title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                  </span>
                  :
                  <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow"></div>
                  }
          </div>
          
                {
                  maxStepCount > 0 ?
                      <div className="w-12 bg-indigo-400 h-1 z-10"></div>
                      :
                      <div className="w-12 bg-white dark:bg-slate-100  h-1 z-10"></div>
          }
          <div className="cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
            {
              
              (stepCount === 1) ?
                <span className="p-1 border-sky-200 border-xs rounded-full animate-ping" onClick={()=>{changeStepNumber(1)}}>
                  <Reader title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                </span>
                
                :
                (maxStepCount >= 1) ?
                  <span onClick={()=>{changeStepNumber(1)}}>
                    <Reader title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                  </span>
                  :
                  <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow"></div>
                  }
          </div>
          
                {
                  maxStepCount > 1 ?
                      <div className="w-12 bg-indigo-400 h-1 z-10"></div>
                      :
                      <div className="w-12 bg-white dark:bg-slate-100  h-1 z-10"></div>
          }
          <div className="cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
            {
              
              (stepCount === 2) ?
                <span className="p-1 border-sky-200 border-xs rounded-full animate-ping" onClick={()=>{changeStepNumber(2)}}>
                  <Rocket title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                </span>
                
                :
                (maxStepCount >= 2) ?
                  <span onClick={()=>{changeStepNumber(2)}}>
                    <Rocket title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                  </span>
                  :
                  <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow"></div>
                  }
          </div>
          
                {
                  maxStepCount > 2 ?
                      <div className="w-12 bg-indigo-400 h-1 z-10"></div>
                      :
                      <div className="w-12 bg-white dark:bg-slate-100  h-1 z-10"></div>
          }
          <div className="cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
            {
              
              (stepCount === 3) ?
                <span className="p-1 border-sky-200 border-xs rounded-full animate-ping" onClick={()=>{changeStepNumber(3)}}>
                  <Book title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                </span>
                
                :
                (maxStepCount >= 3) ?
                  <span onClick={()=>{changeStepNumber(3)}}>
                    <Book title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                  </span>
                  :
                  <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow"></div>
                  }
          </div>
          
              </div>
            </div>
            <div className="text-center mt-2 text-lg font-bold uppercase tracking-widest text-cyan-500">Step { stepCount + 1 } : { stepInfo }</div>
          </div>
  )
}

export default Steps