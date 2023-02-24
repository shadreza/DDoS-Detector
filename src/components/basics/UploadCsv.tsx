import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDataJson, clearHeaders, setDataJson, setFileInfo, setHasDataProcessingStarted, setHeaders, setIsDataReadyForTable } from '../../redux/features/dataJson';
import { setMaxStepCount, setStepCount } from '../../redux/features/instructionInfo';
import { RootState } from '../../redux/store';

const UploadCsv = () => {
  const dispatch = useDispatch();
  const {fileInfo} = useSelector((state: RootState) => state.dataStore)

  const [csvFile, setCsvFile] = useState<File>(new File([], ''))

  const calculatedFileSize = (sizeInBytes: number) => {
    let unit = "B"
    let i = 0
    for (i = 0; i <= 6; i++) {
      if ((sizeInBytes / Math.pow(10, i * 3)) < 1) {
        break
      }
    }
    if (i !== 0) {
      i--
    }
    if (i === 1) {
      unit = "K" + unit
    } else if (i === 2) {
      unit = "M" + unit
    } else if (i === 3) { 
      unit = "G" + unit
    } else if (i === 4) { 
      unit = "T" + unit
    } else if (i === 5) { 
      unit = "P" + unit
    } else { 
      unit = "E" + unit
    }
    return (sizeInBytes / Math.pow(10,i*3)).toFixed(2).toString() + " " + unit
  }

  const handleCsvFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setFileInfo({name: e.target.files[0].name, size: calculatedFileSize(e.target.files[0].size)}))
      setCsvFile(e.target.files[0])
    }
  }

  const clearCsvFile = () => {
    dispatch(setFileInfo({name: "", size: ""}))
    dispatch(setIsDataReadyForTable(false))
    dispatch(clearDataJson())
    dispatch(clearHeaders())
    dispatch(setMaxStepCount(0))
    dispatch(setStepCount(0))
  }

  const uploadCsvFile = () => {
    dispatch(setHasDataProcessingStarted(true))
    dispatch(setIsDataReadyForTable(false))
    dispatch(clearDataJson())
    dispatch(clearHeaders())
    dispatch(setMaxStepCount(0))
    dispatch(setStepCount(0))

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
    dispatch(setMaxStepCount(0))
    dispatch(setStepCount(0))
    
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
    dispatch(setMaxStepCount(1))
    dispatch(setStepCount(1))
  }
  return (
    <div className='text-center'>

      {
        fileInfo && fileInfo.name && fileInfo.size ?
          <>
            <div className='mt-2 m-auto max-w-lg p-4 rounded-xl bg-[#FFE7CC]'>
              <div className='flex justify-between items-center bg-emerald-100 p-2 rounded-xl mt-1 mb-1'>
                <p className='uppercase font-bold'>File Name</p>
                <p>{fileInfo.name}</p>
              </div>

              <div className='flex justify-between items-center bg-violet-100 p-2 rounded-xl mt-1 mb-1'>
                <p className='uppercase font-bold'>File Size</p>
                <p>{ fileInfo.size }</p>
              </div>
            </div>
          
            <div className='mt-2 m-auto max-w-lg p-4 rounded-xl bg-[#FFE7CC] flex justify-around items-center'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if(csvFile) uploadCsvFile()
                }}
                className="bg-emerald-100 p-2 shadow-2xl rounded-xl hover:shadow-xl hover:text-indigo-400 font-bold"
              >
                Process File
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  clearCsvFile()  
                }}
                className="bg-rose-200 p-2 shadow-2xl rounded-xl hover:shadow-xl hover:text-orange-400 font-bold"
              >
                Clear File
              </button>
            </div>
          </>
          :
          <div className='mt-2 m-auto max-w-lg p-4 rounded-xl bg-[#FFE7CC]'>
            <span className='cursor-pointer'>
              <input
                type="file"
                accept= ".csv"
                id='csvFileInput'
                onChange={handleCsvFileChange}
              />
            </span>
          </div>
      }

    </div>
  )
}

export default UploadCsv