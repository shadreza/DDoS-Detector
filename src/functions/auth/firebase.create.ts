import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase.config';
export const insertIntoFirebase = async (collectionName:string, data:Object) => {
  const collectionRef = collection(db, collectionName)
  try {
    const result = await addDoc(
      collectionRef,
      data
    )
    return ["ok", result]
  } catch (err) {
    return ["err", err]
  }
}  