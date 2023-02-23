import { searchOneIntoFirebase } from "./firebase.search"

export const checkAdminState = async (passedUserMail: string, role: string) => {
  const collectionName = 'admin-users'
  const user = await searchOneIntoFirebase(collectionName, { email: passedUserMail }, ['email', '__role__admin'])
  if (user) {
    if (user[0]) {
      if (user[2]['role'] === role) {
        return await true 
      }
    }
  }
  return await false
}