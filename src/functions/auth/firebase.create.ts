import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase.config';
export const insertIntoFirebase = async (collectionName:string, data:Object) => {
  const collectionRef = collection(db, collectionName)
  let res = {}
  let msg = "err"
  try {
    await addDoc(
      collectionRef,
      data
    ).then((result) => {
      res = result
      msg = "ok"
    }).catch((err) => {
      res = err
      msg = "err"
    })
  } catch (err) {
    res = {}
    msg = "err"
  }
  return [msg, res]
}  