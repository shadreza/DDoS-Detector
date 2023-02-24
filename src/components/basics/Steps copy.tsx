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
    <>
      
      {
        stepInfo === "Upload Csv File" ?
          <div className="tex-center pb-4 mb-4 flex-col">
            <div className="h-full w-full flex justify-center items-center">
              <div className="bg-slate-100 dark:bg-black w-fit flex p-2 rounded-2xl items-center z-0">
                <div onClick={()=>{changeStepNumber(0)}} className="cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                  {
                    maxStepCount > stepCount ?
                      <CloudUpload title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                      :
                      maxStepCount === stepCount ?
                        <div className="bg-indigo-400 rounded-full h-3 w-3 animate-ping"></div>
                        :
                        <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow"></div>
                  }
                </div>
                {
                  maxStepCount >= 0  && maxStepCount <=1 ?
                      <div className="w-12 bg-white dark:bg-slate-100 bg-indigo-400 h-1 z-10"></div>
                      :
                      <div className="w-12 bg-white dark:bg-slate-100 bg-indigo-400 h-1 z-10"></div>
                }

                <div onClick={()=>{changeStepNumber(1)}} className="cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                  {
                    maxStepCount > stepCount ?
                      <Reader title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                      :
                      maxStepCount === stepCount ?
                        <div className="bg-indigo-400 rounded-full h-3 w-3 animate-ping"></div>
                        :
                        <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow"></div>
                  }
                </div>
                {
                  maxStepCount >= 0  && maxStepCount <=1 ?
                      <div className="w-12 bg-white dark:bg-slate-100 bg-indigo-400 h-1 z-10"></div>
                      :
                      <div className="w-12 bg-white dark:bg-slate-100 bg-indigo-400 h-1 z-10"></div>
                }

                <div onClick={()=>{changeStepNumber(2)}} className="cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                  {
                    maxStepCount > stepCount ?
                      <Rocket title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                      :
                      maxStepCount === stepCount ?
                        <div className="bg-indigo-400 rounded-full h-3 w-3 animate-ping"></div>
                        :
                        <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow"></div>
                  }
                </div>
                {
                  maxStepCount >= 0  && maxStepCount <=1 ?
                      <div className="w-12 bg-white dark:bg-slate-100 bg-indigo-400 h-1 z-10"></div>
                      :
                      <div className="w-12 bg-white dark:bg-slate-100 bg-indigo-400 h-1 z-10"></div>
                }

                <div onClick={()=>{changeStepNumber(3)}} className="cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                  {
                    maxStepCount > stepCount ?
                      <Book title="csv-file-upload" height="18px" width="18px" color="#818cf8" />
                      :
                      maxStepCount === stepCount ?
                        <div className="bg-indigo-400 rounded-full h-3 w-3 animate-ping"></div>
                        :
                        <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow"></div>
                  }
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-lg font-bold uppercase tracking-widest text-cyan-500">Step { stepCount + 1 } : { stepInfo }</div>
          </div>
          :
          stepInfo === "Visualize" ?
            <div className="tex-center pb-4 mb-4 flex-col">
              <div className="h-full w-full flex justify-center items-center">
                <div className="bg-slate-100 dark:bg-black w-fit flex p-2 rounded-2xl items-center z-0">
                  <div onClick={() => changeStepNumber(0)} className=" cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                    <CloudUpload title="csv-file-upload" height="18px" width="18px" color="#818cf8"/>
                  </div>
                  <div className="w-12 bg-white dark:bg-slate-100 bg-indigo-400 h-1 z-10"></div>
                  <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                    <div className="bg-indigo-400 rounded-full h-3 w-3 animate-ping"></div>
                  </div>
                  <div className="w-12 bg-white dark:bg-slate-100 h-1 z-10"></div>
                  <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow">

                  </div>
                  <div className="w-12 bg-white dark:bg-slate-100 h-1 z-10"></div>
                  <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow">

                  </div>
                </div>
              </div>
              <div className="text-center mt-2 text-lg font-bold uppercase tracking-widest text-cyan-500">Step { stepCount + 1 } : { stepInfo }</div>
            </div>
            :
            stepInfo === "Predict With Model" ?
              <div className="tex-center pb-4 mb-4 flex-col">
                <div className="h-full w-full flex justify-center items-center">
                  <div className="bg-slate-100 dark:bg-black w-fit flex p-2 rounded-2xl items-center z-0">
                    <div onClick={() => changeStepNumber(0)} className=" cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                      <CloudUpload title="csv-file-upload" height="18px" width="18px" color="#818cf8"/>
                    </div>
                    <div className="w-12 bg-indigo-400 h-1 z-10"></div>
                    <div onClick={() => changeStepNumber(1)} className=" cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                      <Reader title="csv-file-upload" height="18px" width="18px" color="#818cf8"/>
                    </div>
                    <div className="w-12 bg-indigo-400 h-1 z-10"></div>
                    <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                      <div className="bg-indigo-400 rounded-full h-3 w-3 animate-ping"></div>
                    </div>
                    <div className="w-12 bg-white dark:bg-slate-100 h-1 z-10"></div>
                    <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow">

                    </div>
                  </div>
                </div>
                <div className="text-center mt-2 text-lg font-bold uppercase tracking-widest text-cyan-500">Step { stepCount + 1 } : { stepInfo }</div>
              </div>
              :
              stepInfo === "Result" ?
                <div className="tex-center pb-4 mb-4 flex-col">
                  <div className="h-full w-full flex justify-center items-center">
                    <div className="bg-slate-100 dark:bg-black w-fit flex p-2 rounded-2xl items-center z-0">
                      <div onClick={() => changeStepNumber(0)} className=" cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                        <CloudUpload title="csv-file-upload" height="18px" width="18px" color="#818cf8"/>
                      </div>
                      <div className="w-12 bg-indigo-400 h-1 z-10"></div>
                       <div onClick={() => changeStepNumber(1)} className=" cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                        <Reader title="csv-file-upload" height="18px" width="18px" color="#818cf8"/>
                      </div>
                      <div className="w-12 bg-indigo-400 h-1 z-10"></div>
                      <div className="bg-white dark:bg-black h-6 w-6 rounded-full shadow">
                        <div onClick={() => changeStepNumber(2)} className=" cursor-pointer bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                          <Rocket title="csv-file-upload" height="18px" width="18px" color="#818cf8"/>
                        </div>
                      </div>
                      <div className="w-12 bg-indigo-400 h-1 z-10"></div>
                      <div className="bg-white dark:bg-slate-100 h-6 w-6 rounded-full shadow z-20 flex items-center justify-center">
                        <Book title="csv-file-upload" height="18px" width="18px" color="#818cf8"/>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-lg font-bold uppercase tracking-widest text-cyan-500">Step { stepCount + 1 } : { stepInfo }</div>
                </div>
                :
                <></>
      }
      
    </>
  )
}

export default Steps