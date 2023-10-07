import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Loading from '../Loading/Loading';

const NavbarForPages = () => {

  const navigate = useNavigate()
  const auth = getAuth(app);

  const [checkLoggedInUser, setLoggedInUser] = useState(null);
  const [load, setLoad] = useState(false)

  // Toast Messages

  const showLogOutMessage = () => {
    toast.success("Logged Out Successfully !! ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const wishlist = () => {
    navigate('/wishlist')
  }

  const register = () => {
    // navigate('/')
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
  }, []);

  const logoutUser = () => {
    setLoad(true)
    const time = setTimeout(() => {
      signOut(auth, (user) => {
        console.log(user);
      })

      showLogOutMessage()
      setLoad(false)
      navigate('/')
    }, 2000);   
  }

  return (
    <>
        {load ? <Loading /> : <section>
            <div className='flex w-full justify-between px-12 items-center bg-primary text-white gap-x-[3rem] h-[4rem] fixed top-0 z-10 drop-shadow-lg'>
                <div>
                    <Link to={'/'} className='font-bold text-xl'>DEV-COMMERCE</Link>
                </div>               
                <div className='flex gap-x-5 items-center'>                
                    <button onClick={wishlist} className="w-[6rem] h-[2.5rem] flex justify-center items-center border-opacity-75 font-semibold rounded-lg border border-primary text-primary bg-white">Wishlist</button>
                    <button onClick={() => navigate('/cart')} className="w-[6rem] h-[2.5rem] flex justify-center items-center border-opacity-75 font-semibold rounded-lg border border-primary text-primary bg-white">Cart</button>                    

                    {checkLoggedInUser === null ? (
              <Link
                to={"/new-user-register"}
                className="w-[6rem] h-[2.5rem] flex justify-center items-center border-opacity-75 font-semibold rounded-lg border border-primary text-primary bg-white"
              >
                Sign Up
              </Link>
            ) : (
              <>
                <Menu>
                  <MenuButton
                    as={Button}
                    backgroundColor={"white"}
                    border={"1px"}          
                    borderColor={"#4E4FEB"}
                    color={"#4E4FEB"}
                    _active={{
                      bg: "#fff",
                    }}
                  >
                    Account
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      color={'#4E4FEB'}              
                      onClick={() =>
                        navigate("/profile", {
                          state: { email: checkLoggedInUser.email },
                        })
                      }                     
                    >
                      My Profile
                    </MenuItem>
                    <MenuItem color={'#4E4FEB'} onClick={logoutUser}>
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>{" "}
              </>
            )}
                </div>
            </div>
        </section>
        }

        <ToastContainer />
    </>
  )
}

export default NavbarForPages
