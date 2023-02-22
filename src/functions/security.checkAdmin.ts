import { searchIntoFirebase } from "./firebase.search"

export const checkAdminState = async (passedUserMail: string, role: string) => {
  const collectionName = 'admin-users'
  const user = await searchIntoFirebase(collectionName, { email: passedUserMail }, ['email'])
  if (user) {
    if (user[0]) {
      if (user[2]['role'] === role) {
        return true 
      }
    }
  }
  return false
}