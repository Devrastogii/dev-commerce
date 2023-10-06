import React, { useEffect, useState } from "react";
import NavbarForPages from "../Nav/NavbarForPages";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
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

const Cart = () => {
  const [count, setCount] = useState();
  const [load, setLoad] = useState(true);

  const [productDetails, setProductDetails] = useState([]);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [currentIndex, setCurrentIndex] = useState();
  const [productcount, setProductCount] = useState(1);

  const [totalAmount, setTotalAmount] = useState();

  function minus() {
    if (productcount === 1 || productcount <= 0) {
      setProductCount(1);
      return false;
    } else {
      setProductCount(productcount - 1);
    }
  }

  function add() {
    setProductCount(productcount + 1);
  }

  const navigate = useNavigate();

  const showCartMessage = () => {
    toast.success("Removed From Cart ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getDocs(collection(db, "cart"));
        setProductDetails(products.docs);
        setCount(products.docs.length);
        console.log(products.docs);

        products.docs.forEach((doc) => {
          totalAmount += parseInt(doc.data().productOfferPrice);
          // console.log(doc.data());
        });

        // console.log(products.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(false);
      }
    }

    fetchData();

    console.log(totalAmount);
  }, []);

  const [showDeleteAlert, setshowDeleteAlert] = useState(false);

  const handleItemClick = (
    event,
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
    fullImageName,
    i
  ) => {

    console.log(fullImageName, image, category, newImageName);
  
    if (event.target.tagName === "DIV") {
      navigateProductPage(
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
      );
    } else if (event.target.tagName === "I") {
      showDeleteModel(i);
    }
  };

  const showDeleteModel = (i) => {
    setshowDeleteAlert(true);
    setCurrentIndex(i);

    if (showDeleteAlert) {
      onToggle();
    }
  };

  const deleteFromCart = async (i, fullImageName, e) => {
    try {
      const deleteFromCart = await getDocs(
        query(
          collection(db, "/cart"),
          where("fullImageName", "==", fullImageName)
        )
      );

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

    console.log(fullImageName, image, category, newImageName);

    {fullImageName ? navigate("/product-page", {
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
    }) : navigate("/product-page", {
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
        id: 8,
        'origin': 'sale'        
      },
    });}
    
  };

  return (
    <>
      <NavbarForPages />
      <br /> <br />
      {load ? (
        <Loading />
      ) : (
        <section>
          <div className="flex gap-x-5 w-full bg-gray-100 p-5 pt-10">
            <div className="w-2/3 bg-white flex flex-col">
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
                            ) : (
                              <img
                                src={require(`../../all/${v.data().image}.jpg`)}
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
                              handleItemClick(
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
                                v.data().fullImageName,                               
                                i                              
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
                                  value={productcount}
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
                              <i class="bi bi-trash3-fill text-gray-500 hover:text-red-600"></i>
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
                                        onClick={(e) =>
                                          deleteFromCart(
                                            i,
                                            v.data().fullImageName,
                                            e
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
                      <hr className="opacity-10 border-0 h-[1px] bg-black" />
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
                  <div>Price (1 item)</div>
                  <div>Delivery Charges</div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>₹4000</div>
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
                <div>₹{totalAmount}</div>
              </div>

              <div className="mt-6 flex justify-center w-full">
                <hr className="opacity-10 border-0 h-[1px] bg-black w-11/12" />
              </div>

              <div className="mt-5 flex justify-between font-semibold text-lg px-5 text-primary mb-5">
                <div>You will save ₹4000 on this order</div>
              </div>
            </div>
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Cart;
