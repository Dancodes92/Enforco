import React, { useEffect } from 'react';
import { useAuthQuery } from '../store/features/api/apiSlice'

const Home = () => {

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAuthQuery();

  let me; //logged in user
console.log(user)
  if (isLoading) {
    me = <p>...Loading</p>
  } else if (isSuccess) {
    me = <p>{user}</p>
  } else if (isError) {
    me = <p>{error.toString()}</p>
  }

  return (
    <div>
      <div>welcome {me}</div>
    </div>
  )

}

export default Home;
