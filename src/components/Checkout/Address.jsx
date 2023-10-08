import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import phonepe from '../../images/phonepe.png'
import paytm from '../../images/paytm.png'
import stripe from '../../images/stripe.png'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button
  } from '@chakra-ui/react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Address = (props) => {
  const auth = getAuth(app);
  const [checkLoggedInUser, setLoggedInUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [err, setErr] = useState('')

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure() 
  
  const showBoughtMessage = () => {
    toast.success("Successfully Ordered ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  // Radio Btn's 
  
  const [chooseVal, setChooseVal] = useState('PhonePe')

  const pay = () => {
    const address = document.getElementById("add")

    if(!address.checked){
        setErr("** Please select your address")
    } else {
        setErr('')
        onOpen()
    }
  }

  const handlePayment = (e) => {
    setChooseVal(e.target.value)
  }

  const yesPay = () => {
    onClose()

    const t = setTimeout(() => {
        showBoughtMessage()
    }, 1000);    

    const time = setTimeout(() => {
        navigate('/')
    }, 2000);
  }

  useEffect(() => {
    async function fetchDataIfLoggedIn() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const getData = await getDocs(
            query(
              collection(db, "/user-data"),
              where("email", "==", user.email)
            )
          );

          getData.forEach((doc) => {
            setUserDetails(doc.data());
          });
          setLoggedInUser(user);          
        } else {
          setLoggedInUser(null);
          navigate("/login-user")
        }
      });
    }

    fetchDataIfLoggedIn();    
  }, []);

  return (
    <>     
        <section>
          <div className="flex gap-x-5 w-full bg-gray-100 p-5 pt-10">
            <div className="bg-white flex flex-col w-1/2 h-[16rem]">
              <div className="flex flex-col mt-[2rem] px-5">
                <div className="text-2xl font-semibold">Address Summary</div>
              </div>

              <div className="mt-5">
                <hr className="opacity-5 border-0 h-[1px] bg-black" />
              </div>

              <div className="flex px-5 mt-5">
                <div>
                  <input type="radio" value={'address'} id="add" />
                </div>
                <div className="flex flex-col ml-3 mb-6">
                  <div className="flex font-semibold gap-x-2">
                    <div>{userDetails?.name}</div>
                    <div>{userDetails?.phone}</div>
                  </div>
                  <div className="mt-1">{userDetails?.address}</div>
                </div>
              </div>              

              <div className="mb-4 px-5 text-red-500 font-semibold flex justify-center">{err}</div>
             
            </div>

            <div className="bg-white h-fit w-1/2">
              <div className="flex flex-col mt-[1rem] px-5">
                <div className="text-xl font-semibold text-gray-400">
                  PAYMENT OPTIONS
                </div>

                <div className="mt-5">
                <hr className="opacity-5 border-0 h-[1px] bg-black" />
              </div>

              <div className="flex justify-between px-5 mt-6">
                <div className="flex gap-x-4"><input type="radio" defaultChecked name="payment" value={'Phonepe'} onChange={handlePayment} /><img src={phonepe} alt="phonepe" className="w-[5rem] rounded-full" /></div>
                <div className="flex gap-x-4"><input type="radio" name="payment" value={'Paytm'} onChange={handlePayment} /><img src={paytm} alt="paytm" className="w-[5rem] rounded-full" /></div>
                <div className="flex gap-x-4"><input type="radio" name="payment" value={'Stripe'} onChange={handlePayment} /><img src={stripe} alt="paytm" className="w-[5rem] rounded-full" /></div>
              </div>

            <div className="mt-5 flex justify-center mb-5">
            <button                
                  className={`font-semibold bg-white border-2 text-primary border-primary rounded-xl h-12 flex justify-center items-center text-lg w-56 slide-right-home-navbar hover:text-white hover:border-white`}
                  onClick={pay}
                >
                  PAY ₹{props.amount}
                </button>

                <AlertDialog
        motionPreset='slideInBottom'     
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Payment Confirmation</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to pay ₹{props.amount} via {chooseVal}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={yesPay}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
            </div>

              </div>              
              
            </div>
          </div>
        </section>  
        <ToastContainer />    
    </>
  );
};

export default Address;
