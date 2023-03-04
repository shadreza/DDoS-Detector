import { Close, HelpCircle } from "react-ionicons"
import { useDispatch, useSelector } from "react-redux"
import Model from "../../components/basics/models/Model"
import Steps from "../../components/basics/Steps"
import Table from "../../components/basics/Table"
import UploadCsv from "../../components/basics/UploadCsv"
import { setShowInstruction } from "../../redux/features/instructionInfo"
import { RootState } from "../../redux/store"
import LoadingPage from "../errorPages/LoadingPage"

const Prediction = () => {
  const { isDataReadyForTable, hasDataProcessingStarted, resultJson } = useSelector((state: RootState) => state.dataStore)
  const { instruction, showInstruction, stepCount  } = useSelector((state: RootState) => state.instructionInfoStore)
  const dispatch = useDispatch()
  const toggleInstructionModalSettings = () => {
    dispatch(setShowInstruction(!showInstruction))
  }

  return (
    <div>
      <div className="flex-reverse justify-center items-center">
        <div className='text-center'>
          <p className='text-2xl text-orange-500 uppercase tracking-[20px] mb-2'>
            Prediction
          </p>
        </div>
        <Steps />
      </div>
      <span onClick={toggleInstructionModalSettings} className='absolute top-0 right-4 cursor-pointer'>
        <HelpCircle
          title="help ?"
          height="28px"
          width="28px"
          beat
          color="orange"
        />
      </span>
      {
        showInstruction &&
          <div className='absolute top-8 right-4 p-2 max-w-xs shadow-2xl bg-blue-100 rounded text-right'>
            <span className='p-1 text-slate-600'>
              {instruction}
            </span>
            <span onClick={toggleInstructionModalSettings} className='flex justify-center block mt-2 text-center cursor-pointer'>
                <Close title="close" color="#e3242b"/>
            </span>
          </div>
      }

      <div>
        {
          stepCount <= 0 ?
            <UploadCsv />
            :
            stepCount <= 1 ?
              isDataReadyForTable ?
                <Table />
                :
                hasDataProcessingStarted ?
                  <LoadingPage />
                  :
                  <span>No Data To Show</span>
              :
              stepCount <= 2 ?
                <Model/>
                :
                stepCount <= 3 && resultJson.length > 0 ?
                  <div className="text-center">
                    <Table/>
                  </div>
                  :
                  <></>

        }
      </div>
      
    </div>

  )
}

export default Prediction
