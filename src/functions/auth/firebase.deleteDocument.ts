import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
export const deleteDocument = async (collectionName:string, passedId:string) => {
  const collectionDoc = doc(db, collectionName, passedId)
  try {
    await deleteDoc(collectionDoc)
    return true
  } catch (err) {
    return false
  }
}  