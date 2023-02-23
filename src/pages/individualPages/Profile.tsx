import { CogSharp } from 'react-ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { checkAdminState } from '../../functions/checks/security.checkAdmin';
import { setAdmin } from '../../redux/features/loggedInUser';
import { RootState } from '../../redux/store';

const Profile = () => {
  const { loggedInUserJson, isAdmin } = useSelector((state: RootState) => state.loggedInUserStore)
  const dispatch = useDispatch();
  if (loggedInUserJson !== null) {
    checkAdminState(loggedInUserJson.email, ['admin', 'master'])
      .then(res => {
        dispatch(setAdmin(res))
      }).catch(err => { 
        dispatch(setAdmin(false))
      })
  }
  return (
    <>
      {
        loggedInUserJson &&
          <div className='text-center'>
            <p className='text-2xl text-center mb-10'>
              <span className='font-mono tracking-[10px] text-indigo-400'>{loggedInUserJson.username}</span>
              <span className='text-sm font-bold block dark:text-orange-300 font-mono mt-2'>Profile</span>
            </p>
            <div className='bg-slate-300 m-auto w-2/3 lg:w-1/2 rounded pt-10 pb-4 '>
              <p className='bg-slate-100 w-[80%] m-auto rounded flex justify-between p-2 mb-6'>
                <span className='font-bold'>Name</span>
                <span>{loggedInUserJson.name.toUpperCase()}</span>
              </p>
              <p className='bg-slate-100 w-[80%] m-auto rounded flex justify-between p-2 mb-6'>
                <span className='font-bold'>Username</span>
                <span>{loggedInUserJson.username}</span>
              </p>
              <p className='bg-slate-100 w-[80%] m-auto rounded flex justify-between p-2 mb-6'>
                <span className='font-bold'>Email</span>
                <span>{loggedInUserJson.email}</span>
              </p>
              <div className='text-center'>
                {
                  isAdmin && 
                    <Link to="/admin">
                      <div
                        className='bg-white hover:bg-orange-200 transition duration-700 w-10 h-10 rounded-full flex items-center justify-center m-auto cursor-pointer animate-bounce'>
                        <CogSharp
                          color={'#048c7f'} 
                          title="admin-mode"
                          rotate
                      />
                      </div>
                    </Link>
                }
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Profile