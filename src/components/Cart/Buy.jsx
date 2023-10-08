import React, { useEffect, useState } from "react";
import NavbarForPages from "../Nav/NavbarForPages";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import Address from "../Checkout/Address";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";

const Buy = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const name = location?.state?.name;
  const offer = location?.state?.offer;
  const price = location?.state?.price;
  const off = location?.state?.off;
  const image = location?.state?.image;
  const category = location?.state?.category;
  const newImgName = location?.state?.newImgName;
  const sale = location?.state?.origin;
  const frequent = location?.state?.forigin;

  const auth = getAuth(app)
  const [checkLoggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) {
        setLoggedInUser(user)
      }

      else {
        setLoggedInUser(null)
      }     
    })
  })

  function minus() {
    if (quantity === 1 || quantity <= 0) {
      setQuantity(1);
      return false;
    } else {
      setQuantity(quantity - 1);
    }
  }

  function add() {
    if (quantity === 5) {
      setQuantity(quantity);
      return false;
    }
    setQuantity(quantity + 1);
  }

  const [showDeleteAlert, setshowDeleteAlert] = useState(false);

  const showDeleteModel = () => {
    setshowDeleteAlert(true);

    if (!isOpen) {
      onOpen();
    }
  };

  return (
    <>
      <NavbarForPages />
      <br /> <br />
      <section>
        <div className="flex gap-x-5 w-full bg-gray-100 p-5 pt-10">
          <div className="w-2/3 bg-white flex flex-col">
            <div className="flex flex-col mt-[2rem] px-5">
              <div className="text-2xl font-semibold">Order Summary</div>
            </div>

            <div className="mt-5">
              <hr className="opacity-5 border-0 h-[1px] bg-black" />
            </div>

            <div className="mt-10 px-10">
              <div className="flex gap-x-20 p-4 pt-6">
                <div className="px-1 w-[10rem] h-[10rem] flex justify-center gap-x-7">
                  <div>
                    {sale ? (
                      <img
                        src={require(`../../all/${image}.jpg`)}
                        className="h-[8rem]"
                        loading="lazy"
                      />
                    ) : frequent ? (
                      <img
                        src={require(`../../frequent_images/${image}.jpg`)}
                        className="h-[8rem]"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={require(`../../cat_images/${category}/${newImgName}${image}.jpg`)}
                        className="h-[8rem]"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-[50rem]">
                  <div className="font-semibold">{name}</div>

                  <div className="mt-4">
                    <div className="flex gap-x-2">
                      <div className="font-bold text-lg">₹{offer}</div>

                      <div className="flex gap-x-2 mt-1">
                        <div className="line-through text-gray-500 text-sm font-semibold">
                          ₹{price}
                        </div>
                        <div className="text-primary text-sm font-semibold">
                          {off}% off
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-x-5 mt-5 items-center">
                    {/* Counter */}

                    <div className="flex gap-x-6">
                      <div
                        className="w-8 h-8 rounded-full border border-gray-300 flex justify-center items-center"
                        onClick={minus}
                      >
                        <svg
                          class="fill-current text-gray-600 w-3 cursor-pointer"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>

                      <div>
                        <input
                          type="number"
                          name=""
                          id="input"
                          value={quantity}
                          className="w-12 blur-0 border border-gray-300 mt-1 outline-primary text-center h-7"
                        />
                      </div>

                      <div
                        className="w-8 h-8 rounded-full border border-gray-300 flex justify-center items-center"
                        onClick={add}
                      >
                        <svg
                          class="fill-current text-gray-600 w-3 cursor-pointer"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Del Button */}

                <div className="flex flex-col">
                  <div>
                    <button>
                      <i
                        class="bi bi-trash3-fill text-gray-500 hover:text-red-600"
                        onClick={showDeleteModel}
                      ></i>
                    </button>
                  </div>

                  <div>
                    {showDeleteAlert && (
                      <>
                        <AlertDialog
                          motionPreset="slideInBottom"
                          onClose={onClose}
                          isOpen={isOpen}
                          isCentered
                        >
                          <AlertDialogOverlay />

                          <AlertDialogContent padding={2}>
                            <AlertDialogBody>
                              Are you sure you want to remove this product?
                            </AlertDialogBody>
                            <AlertDialogFooter>
                              <Button
                                onClick={onClose}
                                width={"3rem"}
                                height={"2rem"}
                                fontSize={"0.9rem"}
                              >
                                NO
                              </Button>
                              <Button
                                colorScheme="red"
                                height={"2rem"}
                                ml={3}
                                fontSize={"0.9rem"}
                                onClick={() => navigate("/cart")}
                              >
                                YES, REMOVE
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              </div>           
            </div>
          </div>

          <div className="w-1/3 bg-white h-fit">
            <div className="flex flex-col mt-[1rem] px-5">
              <div className="text-xl font-semibold text-gray-400">
                PRICE DETAILS
              </div>
            </div>

            <div className="mt-5">
              <hr className="opacity-5 border-0 h-[1px] bg-black" />
            </div>

            <div className="flex justify-between mt-5 px-6 w-full">
              <div className="flex flex-col gap-y-3">
                <div>Price (1 item)</div>
                <div>Discount</div>
                <div>Delivery Charges</div>
              </div>

              <div className="flex flex-col gap-y-3">
                <div className="flex justify-end">
                  ₹{(price * quantity).toLocaleString()}
                </div>
                <div className="flex justify-end">
                  - ₹{((price - offer) * quantity).toLocaleString()}
                </div>
                <div className="text-primary font-semibold w-full flex justify-end">
                  FREE
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center w-full">
              <hr className="opacity-10 border-0 h-[1px] bg-black w-11/12" />
            </div>

            <div className="mt-5 flex justify-between font-semibold text-lg px-5">
              <div>Total Amount</div>
              <div>₹{(offer * quantity).toLocaleString()}</div>
            </div>

            <div className="mt-6 flex justify-center w-full">
              <hr className="opacity-10 border-0 h-[1px] bg-black w-11/12" />
            </div>

            <div className="mt-5 flex justify-between font-semibold text-lg px-5 text-primary mb-5">
              <div>
                You will save ₹{((price - offer) * quantity).toLocaleString()}{" "}
                on this order
              </div>
            </div>
          </div>
        </div>
      </section>
     <Address amount={(offer * quantity).toLocaleString()} />
      <ToastContainer />
    </>
  );
};

export default Buy;
