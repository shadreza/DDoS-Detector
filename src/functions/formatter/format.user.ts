export const getDateTime = (firebaseTimeStamp: any) => {
  const fireBaseTime = new Date(
    firebaseTimeStamp.seconds * 1000 + firebaseTimeStamp.nanoseconds / 1000000,
  );
  const date = fireBaseTime.toDateString();
  const time = fireBaseTime.toLocaleTimeString('en-US');
  return [date, time]
}

export const getFormattedUser = (user: any) => {
  if (user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: getDateTime(user.createdAt),
      updatedAt: getDateTime(user.updatedAt),
    }
  } else return null
}