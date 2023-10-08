import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app } from "../../firebase";
import { Spinner } from "@chakra-ui/react";
import NavbarForPages from "../Nav/NavbarForPages";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const auth = getAuth(app)

  // Toast Messages

  const showToastErrorMessage = () => {
    toast.error("Please fill all details correctly !! ", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
 
  const showAccountNotPresentMessage = (err) => {
    toast.error({err}, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  // Loading

  const [show, setShow] = useState(true); 

  async function loginform(e) {

    setShow(false)
    e.preventDefault()

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email !== "" && password !== "" && emailPattern.test(email)) {
    signInWithEmailAndPassword(auth, email, password).then(() => navigate('/profile')).catch((err) => showAccountNotPresentMessage(err), setShow(false))

    } else {
      showToastErrorMessage();
    }
  }

  return (
    <>
      {show ? (
        <>
          <NavbarForPages />
          <br /> <br />
          <div className="flex justify-center font-bold text-2xl mt-[3.5rem] text-black">
            WELCOME BACK
          </div>
          <div className="flex justify-center mt-2 text-md text-black opacity-60">
            Login to your account and enjoy our free services
          </div>
          <div className="flex justify-center mt-8">
            <form onSubmit={loginform}>
              <label className="block mt-3 text-gray-400">Email Address:</label>
              <input
                type="email"
                className="border border-gray-200 mt-2 w-96 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email === "" && (
                <div className="mt-2 text-sm text-red-500">
                  ** Email can't be blank
                </div>
              )}
              <div>
                <label className="block text-gray-400 mt-5">Password:</label>
                <input
                  type="password"
                  className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 w-96"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {password === "" && (
                <div className="mt-2 text-sm text-red-500">
                  ** Password can't be blank
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  onClick={loginform}
                  className="font-semibold bg-white border-[1px] border-neutral-800 rounded-xl h-12 flex justify-center items-center text-lg w-60 slide-right hover:text-white hover:border-white"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center mt-2 mb-5">
            <h1 className="text-sm">
              New User?{" "}
              <Link
                to={"/new-user-register"}
                className="text-black text-sm font-bold underline hover:-translate-y-1 transition-all duration-500"
              >
                SIGN UP
              </Link>
            </h1>
          </div>
        </>
      ) : (
        <>
          <NavbarForPages />
          <br /> <br />
          <div className="flex w-full justify-center h-[80vh] items-center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        </>
      )}

      <ToastContainer theme="light" />
    </>
  );
};

export default Login;
