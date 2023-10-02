import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const Navbar = () => {
  const auth = getAuth(app);

  const [checkLoggedInUser, setLoggedInUser] = useState(null);

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

  return (
    <>
      <section>
        <div className="flex w-full justify-around items-center">
          <div>
            <Link to={"/"} className="font-bold text-xl">
              DEV-COMMERCE
            </Link>
          </div>
          <div className="flex gap-x-8">
            <div>
              <input
                type="text"
                placeholder="Search products..."
                className="outline-none p-4 w-[24rem] rounded-xl h-[2.5rem] opacity-60 border border-opacity-25 border-black"
              />
            </div>
          </div>
          <div className="flex gap-x-5 items-center">
            <button onClick={wishlist}>
              <i class="bi bi-heart text-[1.4rem] hover:text-red-500 transition-all duration-500"></i>
            </button>
            <button>
              <i class="bi bi-cart3 text-[1.4rem]"></i>
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
                    <MenuItem className="slide-right-home-navbar transition-all duration-500 hover:text-white">
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>{" "}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
