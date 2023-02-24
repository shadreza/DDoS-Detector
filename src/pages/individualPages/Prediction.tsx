import { useSelector } from "react-redux"
import LoadingAnimation from "../../components/animations/LoadingAnimation"
import Table from "../../components/basics/Table"
import UploadCsv from "../../components/basics/UploadCsv"
import { RootState } from "../../redux/store"

const Prediction = () => {
  const {isDataReadyForTable, hasDataProcessingStarted} = useSelector((state: RootState) => state.dataStore)
  return (
    <div>
      <UploadCsv />
      {
        isDataReadyForTable ?
          <Table />
          :
          hasDataProcessingStarted ?
            <LoadingAnimation />
            :
            <span>No Data To Show</span>
      }
      
    </div>
  )
}

export default Prediction