import { readFromFirebase } from './firebase.read';
export const searchIntoFirebase = async (collectionName:string, passedData:any, propsForCheck:string[]) => {
  const result = await readFromFirebase(collectionName)
  const datas: any = result[1]
  for (let i = 0; i < datas.docs.length; i++) {
    const doc = datas.docs[i]
    for (let j = 0; j < propsForCheck.length; j++) {
      if (doc.data()[propsForCheck[j]] === passedData[propsForCheck[j]]) {
        return [true, propsForCheck[j], doc.data()]
      }
    }
  }
  return [false, "", {}]
}  