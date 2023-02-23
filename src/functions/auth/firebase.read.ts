import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
export const readFromFirebase = async (collectionName:string) => {
  const collectionRef = collection(db, collectionName)
  try {
    const result = await getDocs(collectionRef)
    return ["ok", result]
  } catch (err) {
    return ["err", err]
  }
}  