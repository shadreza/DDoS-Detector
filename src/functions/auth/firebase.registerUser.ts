import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { UserInterface } from '../../interfaces/user';
export const registerUser = async (passedUser: UserInterface) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      passedUser.email,
      passedUser.password
    ).then(res => {
      return true
    }).catch(err => { 
      return false
    })
  } catch (err) {
    return false
  }
} 