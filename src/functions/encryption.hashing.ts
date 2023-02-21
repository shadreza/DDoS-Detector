import bcrypt from 'bcryptjs';

export const generateHash = async (string: string) => {
  return await bcrypt.hash(string, 10)
}

export const comparePassword = async (plainString:string, hashedString:string) =>  {
  return await bcrypt.compare(plainString, hashedString);
}