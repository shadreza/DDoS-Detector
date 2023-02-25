import { useEffect, useState } from 'react'
import { Barbell, ThumbsDown, Trash } from 'react-ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDocument } from '../../functions/auth/firebase.deleteDocument'
import { readAllCertainData } from '../../functions/auth/firebase.readAllCertainData'
import { searchOneIntoFirebase } from '../../functions/auth/firebase.search'
import { updateDocumnet } from '../../functions/auth/firebase.updateDocument'
import { checkAdminState } from '../../functions/checks/security.checkAdmin'
import { getDateTime } from '../../functions/formatter/format.user'
import { clearMessageForModal, setMessageForModal, setShowModal } from '../../redux/features/modalMessage'
import { RootState } from '../../redux/store'

const AdminAccess = () => {

  const dispatch = useDispatch()
  const [isMaster, setIsMaster] = useState(false)

  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)
  
  const checkMaster = () => {
    if (loggedInUserJson !== null) {
      checkAdminState(loggedInUserJson.email, ['master'])
        .then(res => {
          setIsMaster(res)
        }).catch(err => { 
          setIsMaster(false)
        })
    }
  }

  const [documentToggler, setDocumentToggler] = useState(false)

  const { isScreenOnMobile } = useSelector((state: RootState) => state.screenOnMobileInfoStore)

  const [admins, setAdmins] = useState<any[]>([])

  const clearModalWithinSec = (timeInSec:number) => {
    setTimeout(() => {
      dispatch(clearMessageForModal())
      dispatch(setShowModal(false))
    }, timeInSec*1000);
  }

  const getAllAdmins = async () => {
    let collectionName = 'users'
    const propsForCheck = [{"key": "role", "value": ["admin", "master"]}]
    readAllCertainData(collectionName, propsForCheck)
      .then(res => {
        if (res) {
          setAdmins(res)
        } else {
          dispatch(setMessageForModal(["Failed", "Network Issue Failed to Load Registered Admin Database"]))
          dispatch(setShowModal(true))
          clearModalWithinSec(3)
        }
      })
      .catch(err => {
        dispatch(setMessageForModal(["Failed", "Network Issue Failed to Load Registered Admin Database"]))
        dispatch(setShowModal(true))
        clearModalWithinSec(3)
      })
  }

  const alterAdminPrivilage = async (userId: string, role: string) => {
    const updatedRole = { "role": role }
    const collectionName = "users"
    const result = await updateDocumnet(collectionName, userId, updatedRole)
    if (result) {
      let msg = "Remoed From Admin Panel"
      if (role === 'master') {
        msg = "Added to Master Admin"
      }
      dispatch(setMessageForModal(["Success", msg ]))
      dispatch(setShowModal(true))
      clearModalWithinSec(3)
      setDocumentToggler(!documentToggler)
    } else {
      dispatch(setMessageForModal(["Failed", "Admin Privilage could not be changed... Please try again later"]))
      dispatch(setShowModal(true))
      clearModalWithinSec(3)
    }
  }

  

  const deleteAdmin = async (userId: string, userEmail:string ="") => {
    const collectionName = "users"
      await searchOneIntoFirebase(collectionName, { email: userEmail }, ['email'], true).then(async res => {
          await deleteDocument(collectionName, userId).then((result) => {
            if (result) {
              dispatch(setMessageForModal(["Success", "Admin deleted from our database"]))
              dispatch(setShowModal(true))
              clearModalWithinSec(3)
              setDocumentToggler(!documentToggler)
            } else {
              dispatch(setMessageForModal(["Failed", "Admin deleteion could not be done... Please try again later"]))
              dispatch(setShowModal(true))
              clearModalWithinSec(3)
            }
          }).catch(() => {
            dispatch(setMessageForModal(["Failed", "Admin deleteion could not be done... Please try again later"]))
            dispatch(setShowModal(true))
            clearModalWithinSec(3)
          })
      }).catch(() => {
        dispatch(setMessageForModal(["Failed", "User not found... "]))
        dispatch(setShowModal(true))
        clearModalWithinSec(3)
      })
  }

  useEffect(() => {
    checkMaster()
  }, [])

  useEffect(() => {
    getAllAdmins()
  }, [documentToggler])
  

  return (
    <div className='mt-10 p-2 text-center ml-auto mr-auto'>
      {
        admins[0] !== null ?
          <div className='bg-sky-100 rounded p-4'>
            <p className='font-bold tracking-widest mb-2'>Admin Users Controll Room</p>
            <p className='text-sm mb-6'> <span className='font-bold text-orange-500'>{admins.length}</span> { admins.length === 1 ? 'admin is' : 'admins are' } present</p>
            <div className='bg-orange-100 pl-4 pr-4 rounded max-h-[50vh] overflow-y-auto'>
              {
                admins.map((user, i) => 
                  <div key={i} className='flex items-center'>
                    {
                      i % 2 ?
                        <span className='mr-4 font-bold text-xl md:text-4xl text-sky-400'>{ i + 1} </span>
                        :
                        <span className='mr-4 font-bold text-xl md:text-4xl text-indigo-400'>{ i + 1 }</span>
                    }
                    <div className="w-full mb-4 mt-4 border-2 border-orange-300 rounded">
                      {
                        (user && user.name && user.email && user.username && user.role && user.createdAt) && isScreenOnMobile === 'small' ?
                          // mobile view
                          <div  className='w-full mt-4 mb-4'>
                            <div className='max-w-[90%] m-auto mb-2 mt-2 rounded p-2 bg-red-100 flex justify-between items-center'>
                              <p className='uppercase text-sm font-bold'>Name : </p>
                              <span className='text-indigo-700'>{user.name}</span>
                            </div>
                            <div className='max-w-[90%] m-auto mb-2 mt-2 rounded p-2 bg-violet-100 flex justify-between items-center'>
                              <p className='uppercase text-sm font-bold'>Username : </p>
                              <span className='text-indigo-700'>{user.username}</span>
                            </div>
                            <div className='max-w-[90%] m-auto mb-2 mt-2 rounded p-2 bg-red-100 flex justify-between items-center'>
                              <p className='uppercase text-sm font-bold'>Email : </p>
                              <span className='text-indigo-700'>{user.email}</span>
                            </div>
                            <div className='max-w-[90%] m-auto mb-2 mt-2 rounded p-2 bg-violet-100 flex justify-between items-center'>
                              <p className='uppercase text-sm font-bold'>Role : </p>
                              <span className='text-indigo-700'>{user.role}</span>
                            </div>
                            <div className='max-w-[90%] m-auto mb-2 mt-2 rounded p-2 bg-red-100 flex justify-between items-center'>
                              <p className='uppercase text-sm font-bold'>Requested At : </p>
                              <span className='text-indigo-700'>{getDateTime(user.createdAt)[0]}</span>
                            </div>
                            <div className='max-w-[90%] m-auto mb-2 mt-2 rounded p-2 bg-violet-100 flex justify-between items-center'>
                              <p className='uppercase text-sm font-bold'>Requested Time : </p>
                              <span className='text-indigo-700'>{getDateTime(user.createdAt)[1]}</span>
                            </div>
                          </div>
                          :
                          isScreenOnMobile === 'medium' ?
                            // medium screen view
                            <div className='p-2'>
                              <div className='p-2 flex justify-between items-center'>
                                <div className='mr-2 bg-red-100 p-2 rounded flex justify-between items-center w-full'>
                                  <p className='uppercase text-sm font-bold'>Name : </p>
                                  <span className='text-indigo-700'>{user.name}</span>
                                </div>
                                <div className='ml-2 bg-violet-100  p-2 rounded flex justify-between items-center w-full'>
                                  <p className='uppercase text-sm font-bold'>Username : </p>
                                  <span className='text-indigo-700'>{user.username}</span>
                                </div>
                              </div>
                              <div className='p-2 flex justify-between items-center'>
                                <div className='mr-2 bg-red-100 p-2 rounded flex justify-between items-center w-full'>
                                  <p className='uppercase text-sm font-bold'>Email : </p>
                                  <span className='text-indigo-700'>{user.email}</span>
                                </div>
                                <div className='ml-2 bg-violet-100  p-2 rounded flex justify-between items-center w-full'>
                                  <p className='uppercase text-sm font-bold'>Role : </p>
                                  <span className='text-indigo-700'>{user.role}</span>
                                </div>
                              </div>
                              <div className='p-2 flex justify-between items-center'>
                                <div className='mr-2 bg-red-100 p-2 rounded flex justify-between items-center w-full'>
                                  <p className='uppercase text-sm font-bold'>Requested At : </p>
                                  <span className='text-indigo-700'>{getDateTime(user.createdAt)[0]}</span>
                                </div>
                                <div className='ml-2 bg-violet-100  p-2 rounded flex justify-between items-center w-full'>
                                  <p className='uppercase text-sm font-bold'>Requested Time : </p>
                                  <span className='text-indigo-700'>{getDateTime(user.createdAt)[1]}</span>
                                </div>
                              </div>
                            </div>
                            :
                            isScreenOnMobile === 'large' ?
                              // large screen view
                              <div className='p-2'>
                                <div className='p-2 flex justify-between items-center'>
                                  <div className='mr-2 bg-red-100 p-2 rounded flex justify-between items-center w-full'>
                                    <p className='uppercase text-sm font-bold'>Name : </p>
                                    <span className='text-indigo-700'>{user.name}</span>
                                  </div>
                                  <div className='mr-2 bg-violet-100  p-2 rounded flex justify-between items-center w-full'>
                                    <p className='uppercase text-sm font-bold'>Username : </p>
                                    <span className='text-indigo-700'>{user.username}</span>
                                  </div>
                                  <div className='bg-red-100 p-2 rounded flex justify-between items-center w-full'>
                                    <p className='uppercase text-sm font-bold'>Email : </p>
                                    <span className='text-indigo-700'>{user.email}</span>
                                  </div>
                                </div>
                                <div className='p-2 flex justify-between items-center'>
                                  <div className='mr-2 bg-violet-100  p-2 rounded flex justify-between items-center w-full'>
                                    <p className='uppercase text-sm font-bold'>Role : </p>
                                    <span className='text-indigo-700'>{user.role}</span>
                                  </div>
                                  <div className='mr-2 bg-red-100 p-2 rounded flex justify-between items-center w-full'>
                                    <p className='uppercase text-sm font-bold'>Requested At : </p>
                                    <span className='text-indigo-700'>{getDateTime(user.createdAt)[0]}</span>
                                  </div>
                                  <div className='bg-violet-100  p-2 rounded flex justify-between items-center w-full'>
                                    <p className='uppercase text-sm font-bold'>Requested Time : </p>
                                    <span className='text-indigo-700'>{getDateTime(user.createdAt)[1]}</span>
                                  </div>
                                </div>
                              </div>
                              :
                              <div></div>
                        
                      }
                        {
                          user.role === 'admin' && isMaster ?
                            <div className='text-center mb-4'>
                              <div className='flex justify-center items-center'>
                                <span
                                  className='cursor-pointer mr-8 flex items-center hover:bg-violet-200 p-2 rounded'
                                  onClick={()=>alterAdminPrivilage(user.id, 'registered')}
                                >
                                  <span className='mr-4 text-sm font-bold lowercase'>dethrone as admin</span>
                                  <ThumbsDown
                                    color={'#1aa7ec'} 
                                    title="dethrone-admin"
                                    height='28px'
                                    width='28px'
                                  />
                                </span>
                              <span
                                  className='cursor-pointer mr-8 flex items-center hover:bg-orange-200 p-2 rounded'
                                  onClick={()=>alterAdminPrivilage(user.id, 'master')}
                                >
                                  <span className='mr-4 text-sm font-bold lowercase'>make master</span>
                                  <Barbell
                                    color={'#ff781f'} 
                                    title="make-master"
                                    height='28px'
                                    width='28px'
                                  />
                                </span>
                                <span
                                  className='cursor-pointer mr-8 flex items-center hover:bg-rose-200 p-2 rounded'
                                  onClick={()=>deleteAdmin(user.id, user.email)}
                                >
                                  <Trash
                                    color={'#e63b60'} 
                                    title="delete-user"
                                    height='28px'
                                    width='28px'
                                  />
                                  <span className='ml-4 text-sm font-bold lowercase'>Remove user</span>
                                </span>
                              </div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        :
          <div className='font-bold trackinh-wide text-orange-300'>No Interested Users Now !</div>
      }
    </div>
    
  )
}

export default AdminAccess