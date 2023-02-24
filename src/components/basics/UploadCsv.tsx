import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDataJson, clearHeaders, setDataJson, setHasDataProcessingStarted, setHeaders, setIsDataReadyForTable } from '../../redux/features/dataJson';
import { RootState } from '../../redux/store';

const UploadCsv = () => {
  const dispatch = useDispatch();
  const { dataJson } = useSelector((state: RootState) => state.dataStore)
  

  const [csvFile, setCsvFile] = useState<File>(new File([], ''))

  const handleCsvFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0])
    }
  }

  const clearCsvFile = () => {
    dispatch(setIsDataReadyForTable(false))
    dispatch(clearDataJson())
    dispatch(clearHeaders())
  }

  const uploadCsvFile = () => {
    dispatch(setHasDataProcessingStarted(true))
    dispatch(setIsDataReadyForTable(false))
    dispatch(clearDataJson())
    dispatch(clearHeaders())

    const file : File = csvFile
    const reader = new FileReader()

    reader.onload = (e) => {
      let text= e.target?.result
      if (typeof (text) != 'string') {
        text = ''
      }
      processCsvFile(text)
    }

    reader.readAsText(file)

  }

  const isArrayEmpty = (array: any[]) => {
    let emptyValues = 0
    for (let i = 0; i < array.length; i++) { 
      if (!array[i]) {
        if (array[i].toString() === '0') {
          continue
        }
        emptyValues += 1
      }
    }
    if (emptyValues === array.length) {
      return true
    }
    return  false
  }  

  const processCsvFile = (str: string, delim = ',') => {
    dispatch(setIsDataReadyForTable(false))
    dispatch(clearDataJson())
    dispatch(clearHeaders())
    
    const headers = str.slice(0, str.indexOf('\n',)).split(delim)
    if (headers[0] === '') {
      headers[0] = 'Index No'
    }

    dispatch(setHeaders(headers))

    const rows = str.slice(str.indexOf('\n')+1).split('\n')

    const seperatedRows: object[] = []
    const dataArray: Object[] = []

    for (let i = 0; i < rows.length; i++) { 
      const tempRow = rows[i].split(delim)
      seperatedRows.push(tempRow)
    }
    
    seperatedRows.forEach(row => {
      const el = Object.values(row)
      if (!isArrayEmpty(el)) {
        const tempObj: Object = {}
        for (let i = 0; i < el.length; i++) {
          Object.defineProperty(tempObj, headers[i], {
            value: el[i],
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
        dataArray.push(tempObj)
      }
    })
    dispatch(setDataJson(dataArray))
    dispatch(setIsDataReadyForTable(true))
    dispatch(setHasDataProcessingStarted(false))
  }
  return (
    <div>
      <p>Upload Csv</p>
      
      
      <input
        type="file"
        accept= ".csv"
        id='csvFileInput'
        onChange={handleCsvFileChange}
      />
      <button
        onClick={(e) => {
        e.preventDefault()
        if(csvFile) uploadCsvFile()
        }}
      >
        Process
      </button>
      <button
          onClick={(e) => {
          e.preventDefault()
          clearCsvFile()
          }}
        >
          Clear CSV File
        </button>
      <p className='text-red-400'>Total data : { dataJson.length }</p>
    </div>
  )
}

export default UploadCsv