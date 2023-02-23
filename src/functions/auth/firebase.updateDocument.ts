import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
export const updateDocumnet = async (collectionName:string, passedId:string, updatedJson:any) => {
  const collectionDoc = doc(db, collectionName, passedId)
  try {
    await updateDoc(collectionDoc, updatedJson)
    return true
  } catch (err) {
    return false
  }
}  