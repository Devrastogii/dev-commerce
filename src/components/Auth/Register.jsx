import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // Firestore Collection

  const usersCollection = collection(db, "user-data");

  // Toast Messages

  const showAccountPresentMessage = () => {
    toast.error("Account already present, please log in !! ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const showToastErrorMessage = () => {
    toast.error("Please fill all details correctly !! ", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };


  //   const navigate = useNavigate();

  // //   useEffect(() => {
  // //     async function getData() {
  // //       const tokenDoc = await axios.get('/login-token');
  // //       if(tokenDoc.data !== ""){
  // //         alert('Already logged in !!!');
  // //         navigate('/account')
  // //       }
  // //       }

  // //     getData();
  // //   }, []);

  let name, value;

  const postData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const [show, setShow] = useState(true); 
  // const [navigateAfterRegister, setNavigateAfterRegister] = useState(false)
  const navigate = useNavigate()

  async function userRegistration(e) {
    e.preventDefault();
    setShow(false);

    const { name, phone, email, password, cpassword } = userData;    

    // Regex Validation

    const namePattern = /^[A-Za-z\s\-']+$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberPattern = /^\d{10}$/;

    if (
      name !== "" &&
      phone !== "" &&
      email !== "" &&
      password !== "" &&
      cpassword !== "" &&
      password === cpassword &&
      phone.length === 10 &&
      namePattern.test(name) &&
      emailPattern.test(email) &&
      phoneNumberPattern.test(phone)
    ) {
      // Checking if account is already present through email and phone, used getDocs for getting multiple docs else use getDoc

      const checkAccount = await getDocs(
        query(collection(db, "/user-data"), where("email", "==", email))
      );
    
      if (checkAccount.size == 0) {
        await addDoc(usersCollection, { name, phone, email, password });        

        const showAccountCreatedMessage = () => {
          toast.success("Account created successfully !! ", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        };

        setShow(true);
        showAccountCreatedMessage(); 
        
        const time = setTimeout(() => {
          navigate('/', {state: {
            navState: true
          }})
        }, 2000);
      } else {
        setShow(true);
        showAccountPresentMessage();
      }
    } else {
      setShow(true);
      showToastErrorMessage();
    }
  }

  return (
    <>
      {show ? (
        <>
          <div className="flex justify-center font-bold text-2xl mt-10 text-black">
            CREATE YOUR ACCOUNT
          </div>

          <div className="flex justify-center mt-2 text-md text-black opacity-60">
            Fill your details and get started
          </div>

          <div className="flex justify-center mt-8">
            <form onSubmit={userRegistration} method="POST">
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <label className="block text-gray-400">Name:</label>
                  <input
                    type="text"
                    className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                    value={userData.name}
                    onChange={postData}
                    name="name"
                    autoComplete="off"
                  />
                  {userData.name === "" && (
                    <div className="mt-2 text-sm text-red-500">
                      ** Name can't be blank
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-gray-400">Phone Number:</label>
                  <input
                    type="number"
                    className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                    value={userData.phone}
                    onChange={postData}
                    name="phone"
                    autoComplete="off"
                  />
                  {userData.phone === "" && (
                    <div className="mt-2 text-sm text-red-500">
                      ** Phone Number can't be blank
                    </div>
                  )}
                </div>
              </div>
              <label className="block mt-3 text-gray-400">Email Address:</label>
              <input
                type="email"
                className="border border-gray-200 mt-2 w-full outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={userData.email}
                onChange={postData}
                name="email"
                autoComplete="off"
              />
              {userData.email === "" && (
                <div className="mt-2 text-sm text-red-500">
                  ** Email can't be blank
                </div>
              )}
              <div className="grid grid-cols-2 gap-12 mt-3">
                <div>
                  <label className="block text-gray-400">Password:</label>
                  <input
                    type="password"
                    className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                    value={userData.password}
                    onChange={postData}
                    name="password"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                    value={userData.cpassword}
                    onChange={postData}
                    name="cpassword"
                  />
                </div>
              </div>

              {userData.password !== userData.cpassword && (
                <div className="mt-2 text-sm text-red-500">
                  ** Passwords do not match
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  onClick={userRegistration}
                  className="font-semibold bg-white border-[1px] border-neutral-800 rounded-xl h-12 flex justify-center items-center text-lg w-60 slide-right hover:text-white hover:border-white"
                >
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center my-4">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}

      <ToastContainer theme="light" />
    </>
  );
};

export default Register;
