import { ArrowBackCircle, ArrowForwardCircle, Book, CloudUpload, Reader, Rocket } from "react-ionicons"
import { useDispatch, useSelector } from "react-redux"
import { setStepCount } from "../../redux/features/instructionInfo"
import { RootState } from "../../redux/store"

const Steps = () => {

  const { stepInfo, stepCount, maxStepCount } = useSelector((state: RootState) => state.instructionInfoStore)
  const dispatch = useDispatch()

  const changeStepNumber = (step: number) => {
    if (step >= 0 && step <= 4) {
      if (step <= maxStepCount) { 
        dispatch(setStepCount(step))
      }
    }
  }
  
  return (
    <div className="tex-center pb-4 mb-4 flex-col">
      <div className="h-full w-full flex justify-center items-center">
        <span className="mr-8 cursor-pointer" onClick={()=>{changeStepNumber(stepCount - 1)}}>
          <ArrowBackCircle title="back" shake color="#FD8A8A"/>
        </span>
        <div className="bg-slate-100 dark:bg-black w-fit flex p-2 rounded-2xl items-center z-0">
          
    <div className="cursor-pointer bg-white dark:bg-slate-100 h-8 w-8 rounded-full shadow z-20 flex items-center justify-center">
      {
        
        (stepCount === 0) ?
          <div>
            <span className="absolute rounded-full animate-ping" onClick={()=>{changeStepNumber(0)}}>
              <CloudUpload title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
            </span>
            <CloudUpload title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
          </div>
          
          :
          (maxStepCount >= 0) ?
            <span onClick={()=>{changeStepNumber(0)}}>
              <CloudUpload title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
            </span>
            :
            <div className="bg-white dark:bg-slate-100 h-8 w-8 rounded-full shadow"></div>
            }
    </div>
    
          {
            maxStepCount > 0 ?
                <div className="w-20 bg-indigo-400 h-1 z-10"></div>
                :
                <div className="w-20 bg-white dark:bg-slate-100  h-1 z-10"></div>
    }
    <div className="cursor-pointer bg-white dark:bg-slate-100 h-8 w-8 rounded-full shadow z-20 flex items-center justify-center">
      {
        
        (stepCount === 1) ?
          <div>
            <span className="absolute rounded-full animate-ping" onClick={()=>{changeStepNumber(1)}}>
              <Reader title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
            </span>
            <Reader title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
          </div>
          
          :
          (maxStepCount >= 1) ?
            <span onClick={()=>{changeStepNumber(1)}}>
              <Reader title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
            </span>
            :
            <div className="bg-white dark:bg-slate-100 h-8 w-8 rounded-full shadow"></div>
            }
    </div>
    
          {
            maxStepCount > 1 ?
                <div className="w-20 bg-indigo-400 h-1 z-10"></div>
                :
                <div className="w-20 bg-white dark:bg-slate-100  h-1 z-10"></div>
    }
    <div className="cursor-pointer bg-white dark:bg-slate-100 h-8 w-8 rounded-full shadow z-20 flex items-center justify-center">
      {
        
        (stepCount === 2) ?
          <div>
            <span className="absolute rounded-full animate-ping" onClick={()=>{changeStepNumber(2)}}>
              <Rocket title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
            </span>
            <Rocket title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
          </div>
          
          :
          (maxStepCount >= 2) ?
            <span onClick={()=>{changeStepNumber(2)}}>
              <Rocket title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
            </span>
            :
            <div className="bg-white dark:bg-slate-100 h-8 w-8 rounded-full shadow"></div>
            }
    </div>
    
          {
            maxStepCount > 2 ?
                <div className="w-20 bg-indigo-400 h-1 z-10"></div>
                :
                <div className="w-20 bg-white dark:bg-slate-100  h-1 z-10"></div>
    }
    <div className="cursor-pointer bg-white dark:bg-slate-100 h-8 w-8 rounded-full shadow z-20 flex items-center justify-center">
      {
        
        (stepCount === 3) ?
          <div>
            <span className="absolute rounded-full animate-ping" onClick={()=>{changeStepNumber(3)}}>
              <Book title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
            </span>
            <Book title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
          </div>
          
          :
          (maxStepCount >= 3) ?
            <span onClick={()=>{changeStepNumber(3)}}>
              <Book title="csv-file-upload" height="24px" width="24px" color="#818cf8" />
            </span>
            :
            <div className="bg-white dark:bg-slate-100 h-8 w-8 rounded-full shadow"></div>
            }
    </div>
    
        </div>
        <span className="ml-8 cursor-pointer" onClick={()=>{changeStepNumber(stepCount + 1)}}>
          <ArrowForwardCircle title="forward" shake color="#FD8A8A"/>
        </span>
      </div>
      <div className="text-center mt-2 text-lg font-bold uppercase tracking-widest text-cyan-500">Step { stepCount + 1 } : { stepInfo }</div>
    </div>
  )
}

export default Steps