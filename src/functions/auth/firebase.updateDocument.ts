import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
export const updateDocumnet = async (collectionName:string, passedId:string, updatedJson:any) => {
  const collectionDoc = doc(db, collectionName, passedId)
  try {
    return updateDoc(collectionDoc, updatedJson).then(() => {
      return true
    }).catch(() => { 
      return false
    })
  } catch {
    return false
  }
  
}  