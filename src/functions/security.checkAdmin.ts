import { searchOneIntoFirebase } from "./firebase.search"

export const checkAdminState = async (passedUserMail: string, roles: string[]) => {
  const collectionName = 'users'
  const user = await searchOneIntoFirebase(collectionName, { email: passedUserMail }, ['email', '__role__admin', '__role__master'])
  if (user) {
    if (user[0]) {
      for (let i = 0; i < roles.length; i++) { 
        if (user[2]['role'] === roles[i]) {
          return await true 
        }
      }
    }
  }
  return await false
}