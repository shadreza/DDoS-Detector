import { readFromFirebase } from './firebase.read';
export const readAllCertainData = async (collectionName: string, propsForCheck: any[]) => {

  const result = await readFromFirebase(collectionName)
  const datas: any = result[1]
  const resultCollection = []
  for (let i = 0; i < datas.docs.length; i++) {
    const doc = datas.docs[i]
    let numberOfValidationPassed = 0
    for (let j = 0; j < propsForCheck.length; j++) {
      if (propsForCheck[0] === null) {
        numberOfValidationPassed = 1
        break
      } else {
        if (doc.data()[propsForCheck[j].key] === propsForCheck[j].value) {
          numberOfValidationPassed += 1
        }
      }
    }
    if (numberOfValidationPassed === propsForCheck.length) {
      const user = {...doc.data(), id:datas.docs[i].id}
      resultCollection.push(user)
    }
  }
  return resultCollection
}  