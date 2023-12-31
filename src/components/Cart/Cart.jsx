import React, { useEffect, useState } from "react";
import NavbarForPages from "../Nav/NavbarForPages";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app, db } from "../../firebase";
import Loading from "../Loading/Loading";
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
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Address from "../Checkout/Address";

const Cart = () => {
  const [count, setCount] = useState();
  const [load, setLoad] = useState(true);

  const [productDetails, setProductDetails] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentIndex, setCurrentIndex] = useState();
  const [quantity, setQuantity] = useState(1);

  const [totalSum, setTotalSum] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  // Toast Messages

  const showCartMessage = () => {
    toast.success("Removed From Cart ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const showQuantityErrorMessage = () => {
    toast.error("Currently we are accepting only single quantity ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  function add() {
    showQuantityErrorMessage()
  }

  const navigate = useNavigate();  

  const auth = getAuth(app);
  const [checkLoggedInUser, setLoggedInUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
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
            navigate("/login-user");
          }
        });

        const products = await getDocs(
          query(
            collection(db, "cart"),
            where("userId", "==", userDetails.userId)
          )
        );
        setProductDetails(products.docs);
        setCount(products.docs.length);

        // Initialize totalAmount as an array
        const totalAmount = [];
        const totalDiscountAvail = [];

        products.docs.forEach((doc) => {
          const productPrice = parseInt(doc.data().productPrice);
          totalAmount.push(productPrice);
          const productTotalDiscount =
            parseInt(doc.data().productPrice) -
            parseInt(doc.data().productOfferPrice);
          totalDiscountAvail.push(productTotalDiscount);
        });

        // Calculate the sum of totalAmount and update totalSum
        const sum = totalAmount.reduce((acc, price) => acc + price, 0);
        const discount = totalDiscountAvail.reduce(
          (acc, discount) => acc + discount,
          0
        );
        setTotalSum(sum);
        setTotalDiscount(discount);
        setLoad(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [userDetails]);

  const [showDeleteAlert, setshowDeleteAlert] = useState(false);

  const showDeleteModel = (i) => {
    setshowDeleteAlert(true);
    setCurrentIndex(i);

    if (!isOpen) {
      onOpen();
    }
  };

  const deleteFromCart = async (fullImageName, name) => {
    try {
      let deleteFromCart;

      if (fullImageName) {
        deleteFromCart = await getDocs(
          query(
            collection(db, "/cart"),
            where("userId", "==", userDetails.userId),
            where("fullImageName", "==", fullImageName)
          )
        );
      } else {
        deleteFromCart = await getDocs(
          query(
            collection(db, "/cart"),
            where("userId", "==", userDetails.userId),
            where("productName", "==", name)
          )
        );
      }

      deleteFromCart.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      setshowDeleteAlert(false);
      showCartMessage();
    } catch (error) {
      window.alert("Error deleting product:", error);
    }
  };

  const navigateProductPage = (
    e,
    name,
    productRating,
    productTotalRating,
    productDescription,
    productOfferPrice,
    productPrice,
    productOff,
    image,
    category,
    newImageName,
    id,
    fullImageName
  ) => {
    e.preventDefault();

    {
      fullImageName
        ? navigate("/product-page", {
            state: {
              name: name,
              rating: productRating,
              totalRating: productTotalRating,
              description: productDescription,
              offer: productOfferPrice,
              price: productPrice,
              off: productOff,
              image: image,
              category: category,
              id: id,
              newImageName: newImageName,
            },
          })
        : id == 8
        ? navigate("/product-page", {
            state: {
              name: name,
              rating: productRating,
              totalRating: productTotalRating,
              description: productDescription,
              offer: productOfferPrice,
              price: productPrice,
              off: productOff,
              image: image,
              id: id,
              origin: "sale",
            },
          })
        : navigate("/product-page", {
            state: {
              name: name,
              rating: productRating,
              totalRating: productTotalRating,
              description: productDescription,
              offer: productOfferPrice,
              price: productPrice,
              off: productOff,
              image: image,
              id: id,
              forigin: "frequent",
            },
          });
    }
  };

  return (
    <>
      <NavbarForPages />
      <br /> <br />
      {load ? (
        <Loading />
      ) : (
        <>
        <section className="h-screen">
          <div className="flex gap-x-5 w-full bg-gray-100 p-5 pt-10">

          {count === 0 ? (
            <div className="flex w-full flex-col justify-center items-center h-[23rem]">
              <div>
                <i class="bi bi-basket text-[8rem] text-gray-400"></i>
              </div>
              <div className="font-semibold text-xl text-gray-400">
                YOUR CART IS EMPTY
              </div>
            </div>
          ) : (
              <>             
            <div className="w-2/3 bg-white flex flex-col h-fit">
              <div className="flex flex-col mt-[2rem] px-5">
                <div className="text-2xl font-semibold">Cart({count})</div>
              </div>
              
              <div className="mt-5">
                <hr className="opacity-5 border-0 h-[1px] bg-black" />
              </div>

              <div className="mt-10 px-10">
                {productDetails.map((v, i) => {
                  return (
                    <>
                      <div className="flex gap-x-20 p-4 pt-6">
                        <div className="px-1 w-[10rem] h-[10rem] flex justify-center gap-x-7">
                          <div>
                            {v.data().fullImageName ? (
                              <img
                                src={require(`../../cat_images/${
                                  v.data().image_category
                                }/${v.data().fullImageName}.jpg`)}
                                className="h-[8rem]"
                                loading="lazy"
                              />
                            ) : v.data().id === 8 ? (
                              <img
                                src={require(`../../all/${v.data().image}.jpg`)}
                                className="h-[8rem]"
                                loading="lazy"
                              />
                            ) : (
                              <img
                                src={require(`../../frequent_images/${
                                  v.data().image
                                }.jpg`)}
                                className="h-[8rem]"
                                loading="lazy"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col w-[50rem]">
                          <div
                            className="hover:text-primary font-semibold cursor-pointer"
                            onClick={(e) =>
                              navigateProductPage(
                                e,
                                v.data().productName,
                                v.data().productRating,
                                v.data().productTotalRating,
                                v.data().productDescription,
                                v.data().productOfferPrice,
                                v.data().productPrice,
                                v.data().productOff,
                                v.data().image,
                                v.data().image_category,
                                v.data().newImageName,
                                v.data().id,
                                v.data().fullImageName
                              )
                            }
                          >
                            {v.data().productName}
                          </div>

                          <div className="flex gap-x-4 mt-1 items-center h-auto">
                            <div className="bg-primary text-white rounded-lg w-[3.6rem] h-[1.7rem] text-xs flex justify-center items-center">
                              {v.data().productRating}{" "}
                              <i class="bi bi-star-fill text-xs ml-1"></i>
                            </div>
                            <div className="text-gray-500 font-semibold -mt-1">
                              {v.data().productTotalRating} Ratings
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex gap-x-2">
                              <div className="font-bold text-lg">
                                ₹{v.data().productOfferPrice}
                              </div>

                              <div className="flex gap-x-2 mt-1">
                                <div className="line-through text-gray-500 text-sm font-semibold">
                                  ₹{v.data().productPrice}
                                </div>
                                <div className="text-primary text-sm font-semibold">
                                  {v.data().productOff}% off
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-x-5 mt-5 items-center">
                            {/* Counter */}

                            <div className="flex gap-x-6">
                              <div
                                className="w-8 h-8 rounded-full border border-gray-300 flex justify-center items-center"                        
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
                                onClick={() => showDeleteModel(i)}
                              ></i>
                            </button>
                          </div>

                          <div>
                            {showDeleteAlert && currentIndex === i && (
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
                                      Are you sure you want to remove this
                                      product?
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
                                        onClick={() =>
                                          deleteFromCart(
                                            v.data().fullImageName,
                                            v.data().productName
                                          )
                                        }
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
                      <hr className="opacity-10 border-0 h-[1px] bg-black mb-[1.15rem]" />
                    </>
                  );
                })}
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
                  <div>
                    Price ({count}{" "}
                    {count === 1 ? <span>item</span> : <span>items</span>})
                  </div>
                  <div>Discount</div>
                  <div>Delivery Charges</div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div className="flex justify-end">
                    ₹{(totalSum * quantity).toLocaleString()}
                  </div>
                  <div className="flex justify-end">
                    - ₹{(totalDiscount * quantity).toLocaleString()}
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
                <div>
                  ₹
                  {(
                    totalSum * quantity -
                    totalDiscount * quantity
                  ).toLocaleString()}
                </div>
              </div>

              <div className="mt-6 flex justify-center w-full">
                <hr className="opacity-10 border-0 h-[1px] bg-black w-11/12" />
              </div>

              <div className="mt-5 flex justify-between font-semibold text-lg px-5 text-primary mb-5">
                <div>
                  You will save ₹{(totalDiscount * quantity).toLocaleString()}{" "}
                  on this order
                </div>
              </div>
            </div>
            </>)}
          </div>

          <Address amount={(
                    totalSum * quantity -
                    totalDiscount * quantity
                  ).toLocaleString()} />
        </section>

        </>
      )}        
      <ToastContainer />
    </>
  );
};

export default Cart;
