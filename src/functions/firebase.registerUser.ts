import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { UserInterface } from './../interfaces/user';
export const registerUser = async (passedUser: UserInterface) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      passedUser.email,
      passedUser.password
    )

  } catch (err) {

  }
} 