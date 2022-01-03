import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserByToken, userSelector, clearState } from '../store/features/auth'
import { useNavigate } from 'react-router-dom'
import Loader from 'react-loader-spinner'

export default function Home(props) {
  console.log('Home props', props)
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // const { email, name, isFetching, isError } = useSelector(
  //   userSelector
  // )


  // useEffect(() => {
  //   dispatch(fetchUserByToken({ token: window.localStorage.getItem('token') }))
  //   // console.log("window token", window.localStorage)
  // }, [])

  // useEffect(() => {
  //   if (isError) {
  //     navigate('/signin')
  //     dispatch(clearState())
  //   }
  // }, [isError])


  // const onLogOut = () => {
  //   localStorage.removeItem('token');
  //   navigate('/signin')
  // };

//   return (

//     <div className="container mx-auto">
//       {isFetching ? (
//         <Loader type="Puff" color="#00BFFF" height={100} width={100} />
//       ) : (
//         <>
//           <div className="container mx-auto">
//             Welcome back <h3>{name}</h3>
//           </div>

//           <button
//             onClick={onLogOut}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Log Out
//           </button>
//         </>
//       )}
//     </div>
//   );
return (
  <div>
    <h1>Home</h1>
  </div>
)
}
