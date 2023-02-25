import { readFromFirebase } from './firebase.read';
export const searchOneIntoFirebase = async (collectionName:string, passedData:any, propsForCheck:string[], returnUser=false ) => {
  const result = await readFromFirebase(collectionName)
  const datas: any = result[1]
  for (let i = 0; i < datas.docs.length; i++) {
    const doc = datas.docs[i]
    for (let j = 0; j < propsForCheck.length; j++) {
      if (doc.data()[propsForCheck[j]] === passedData[propsForCheck[j]]) {
        if (returnUser) {
          return [true, propsForCheck[j], doc]
        }
        return [true, propsForCheck[j], doc.data()]
      }
    }
  }
  return [false, "", {}]
}  