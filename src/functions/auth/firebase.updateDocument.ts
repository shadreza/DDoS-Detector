import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
export const updateDocumnet = async (collectionName:string, passedId:string, updatedJson:any) => {
  const collectionDoc = doc(db, collectionName, passedId)
  try {
    await updateDoc(collectionDoc, updatedJson).then(async res => {
      return await true
    }).catch(async err => { 
      console.log(err.message)
      return await false
    })
  } catch (err) {
    console.log(err)
    return await false
  }
}  