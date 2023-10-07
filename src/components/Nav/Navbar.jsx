import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";

const Navbar = () => {
  const auth = getAuth(app);

  const [checkLoggedInUser, setLoggedInUser] = useState(null);
  const [load, setLoad] = useState(false)

  // Toast Messages

  const showLogOutMessage = () => {
    toast.success("Logged Out Successfully !! ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
  }, []);

  const navigate = useNavigate();

  const wishlist = () => {
    navigate("/wishlist");
  };

  const logoutUser = () => {
    setLoad(true)
    const time = setTimeout(() => {
      signOut(auth, (user) => {
        console.log(user);
      })

      showLogOutMessage()
      setLoad(false)
    }, 2000);   
  }

  return (
    <>
    {load ? <Loading /> : <section>
        <div className="flex w-full justify-between items-center px-20">
          <div>
            <Link to={"/"} className="font-bold text-xl">
              DEV-COMMERCE
            </Link>
          </div>         
          <div className="flex gap-x-5 items-center">
            <button onClick={wishlist} className="w-[6rem] h-[2.5rem] flex justify-center items-center border-opacity-75 font-semibold rounded-lg border border-primary text-primary bg-white slide-right-home-navbar hover:text-white">
              Wishlist
            </button>
            <button onClick={() => navigate('/cart')} className="w-[6rem] h-[2.5rem] flex justify-center items-center border-opacity-75 font-semibold rounded-lg border border-primary text-primary bg-white slide-right-home-navbar hover:text-white">
              Cart
            </button>

            {checkLoggedInUser === null ? (
              <Link
                to={"/new-user-register"}
                className="w-[6rem] h-[2.5rem] flex justify-center items-center border-opacity-75 font-semibold rounded-lg border border-primary text-primary bg-white slide-right-home-navbar hover:text-white"
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
                    className="slide-right-home-navbar hover:text-white"
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
                      onClick={() =>
                        navigate("/profile", {
                          state: { email: checkLoggedInUser.email },
                        })
                      }
                      className="slide-right-home-navbar transition-all duration-500 hover:text-white"
                    >
                      My Profile
                    </MenuItem>
                    <MenuItem className="slide-right-home-navbar transition-all duration-500 hover:text-white" onClick={logoutUser}>
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>{" "}
              </>
            )}
          </div>
        </div>
      </section>}      

      <ToastContainer />
    </>
  );
};

export default Navbar;
