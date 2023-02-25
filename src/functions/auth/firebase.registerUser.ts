import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { UserInterface } from '../../interfaces/user';
export const registerUser = async (passedUser: UserInterface) => {
  let result = false
  try {
    await createUserWithEmailAndPassword(
      auth,
      passedUser.email,
      passedUser.password
    ).then(res => {
      result = true
    }).catch(err => { 
      result = false
    })
  } catch (err) {
    result = false
  }
  return result
} 