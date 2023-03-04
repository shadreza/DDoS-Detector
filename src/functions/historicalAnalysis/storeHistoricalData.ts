import { readFromFirebase } from "../auth/firebase.read"

export const storeHistoricalData = (data: any[]) => {
  const rawData = data[0]
  const resData = data[1]

  // result stats
  readFromFirebase("attacks").then((res:any) => {
    const prevResData = res[1].docs

  }).catch((err) => {
    const prevResData = null
  })

  // for (let i = 0; i < rawData.length; i++) { 

  // }

}