import React, { useEffect, useState } from 'react'
import { app, db } from '../../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import NavbarForPages from '../Nav/NavbarForPages'
import Loading from '../Loading/Loading'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {

  const auth = getAuth(app)
  const navigate = useNavigate()
  const location = useLocation()  

  const [checkLoggedInUser, setLoggedInUser] = useState(null)
  const [userDetails, setUserDetails] = useState([])
  const [load, setLoad] = useState(true)  
  const [newUserData, setNewUserData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })

  useEffect(() => {    

    const comingEmail = location.state.email

    async function fetchDataIfLoggedIn() {
        const getData = await getDocs(query(collection(db, '/user-data'), where("email", "==", comingEmail)))

        getData.forEach((doc) => {
            setUserDetails(doc.data());
        })
                   
    }

    onAuthStateChanged(auth, user => {
      if(user) {
        setLoggedInUser(user)
      }

      else {
        setLoggedInUser(null)
      }
     
    })   
    
    fetchDataIfLoggedIn()

    const time = setTimeout(() => {
      setLoad(false)
    }, 3000);

    return () => {
      clearTimeout(time)
    }

  }, [])

  // Toast Messages

  const showDetailsUpdateMessage = () => {
    toast.success("Details updated successfully !! ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const showDetailsErrorMessage = () => {
    toast.error("Error in updating documents !! ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const [handleReadOnly, setHandleReadOnly] = useState(true)
  const [disable, setDisable] = useState(false)
  const [saveDisable, setSaveDisable] = useState(true)

  const userInfoChange = (e) => {
    e.preventDefault()

    setHandleReadOnly(false)
    setDisable(true)
  }

  const changeData = (e) => {
    let name = e.target.name
    let val = e.target.value

    setNewUserData({...newUserData, [name]:val})
    setSaveDisable(false)
  }

  const saveInfoChange = async (e) => {
    e.preventDefault()
    setSaveDisable(false)

    const userDocRef = doc(db, 'user-data', checkLoggedInUser.uid);

    const updatedUser = {
        name: newUserData.name,
        phone: newUserData.phone,
        address: newUserData.address
    }

    await updateDoc(userDocRef, updatedUser)
    .then(() => {
        showDetailsUpdateMessage()
        setSaveDisable(true)
        setDisable(false)
    })
    .catch((error) => {
        showDetailsErrorMessage()
        setSaveDisable(false)
    });
  }

  return (
    <>  

    <NavbarForPages />
      <br /> <br />
    
    {load ? <Loading /> : 

        (checkLoggedInUser !== null ? <>           

          <div className="flex justify-center font-bold text-2xl mt-[3.5rem] text-black">
            PERSONAL INFORMATION
          </div>

          <div className="flex justify-center mt-2 text-md text-black opacity-60">
            Don't worry, your information is secured with us
          </div>

          <div className="flex justify-center mt-8">
            <form onSubmit={userInfoChange} method="POST">
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <label className="block text-gray-400">Name:</label>
                  <input
                    type="text"
                    className={`border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 ${handleReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                    value={handleReadOnly ? userDetails.name : newUserData.name}
                    onChange={changeData}
                    name="name"
                    autoComplete="off"
                    readOnly={handleReadOnly}
                  />

                </div>
                <div>
                  <label className="block text-gray-400">Phone Number:</label>
                  <input
                    type="number"
                    className={`border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 ${handleReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                    value={handleReadOnly ? userDetails.phone : newUserData.phone}
                    onChange={changeData}
                    name="phone"
                    autoComplete="off"
                    readOnly={handleReadOnly}
                  />
                 
                </div>
              </div>

              <label className="block mt-8 text-gray-400">Email Address:</label>
              <input
                type="email"
                className={`border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8`}
                value={checkLoggedInUser.email}          
                name="email"
                autoComplete="off"               
              />
                        
                <div className='mt-8'>
                  <label className="block text-gray-400">Address:</label>
                  <textarea
                    cols={58}                                     
                    className={`border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-40 ${handleReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                    value={newUserData.address}
                    onChange={changeData}
                    name="address"
                    readOnly={handleReadOnly}
                  />
                </div>                                       

              <div className="flex justify-center mt-8 gap-x-5 mb-10">

              <div> 
                <button
                  onClick={userInfoChange}
                  className={`font-semibold bg-white border-[1px] border-neutral-800 rounded-xl h-12 flex justify-center items-center text-lg w-56 slide-right hover:text-white hover:border-white ${disable ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={disable}
                >
                  Change Details
                </button>
              </div>

              <div>
              <button
                  onClick={saveInfoChange}
                  className={`font-semibold bg-white border-[1px] border-neutral-800 rounded-xl h-12 flex justify-center items-center text-lg w-56 slide-right hover:text-white hover:border-white ${saveDisable ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={saveDisable}
                >
                  SAVE
                </button>
              </div>
               
              </div>
            </form>
          </div>

          <ToastContainer />
        
        </> : navigate('/login-user'))}      
    </>
  )
}

export default Account
