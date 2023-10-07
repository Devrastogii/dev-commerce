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

const Wishlist = () => {
  const [count, setCount] = useState();
  const [load, setLoad] = useState(true);

  const [productDetails, setProductDetails] = useState([]);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [currentIndex, setCurrentIndex] = useState();
  const [hoverState, setHoverState] = useState(false);
  const [indepIndex, setIndepIndex] = useState();

  const navigate = useNavigate();
  const auth = getAuth(app);
  const [checkLoggedInUser, setLoggedInUser] = useState(null);

  const showWishlistMessage = () => {
    toast.success("Removed From Wishlist ", {
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

    async function fetchData() {
      try {
        const products = await getDocs(collection(db, "wishlist"));
        setProductDetails(products.docs);
        setCount(productDetails.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(false);
      }
    }

    fetchData();
  }, [productDetails]);

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
    i,
    fullImageName
  ) => {
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

  const deleteFromWishlist = async (i, fullImageName, e) => {
    try {
      const deleteFromWishlist = await getDocs(
        query(
          collection(db, "/wishlist"),
          where("fullImageName", "==", fullImageName)
        )
      );

      deleteFromWishlist.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      setshowDeleteAlert(false);
      showWishlistMessage();
    } catch (error) {
      window.alert("Error deleting product:", error);
    }
  };

  const handleHover = (text, index) => {
    if (text == "yes") {
      setHoverState(true);
      setIndepIndex(index);
    } else setHoverState(false);
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
              category: category,
              id: id,
              newImageName: newImageName,
              origin: "sale",
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
        <section>
          <div className="flex flex-col mt-[3rem] px-10">
            <div className="text-2xl font-semibold">Wishlist({count})</div>
          </div>

          {count === 0 ? (
            <div className="flex w-full flex-col justify-center items-center h-[23rem]">
              <div>
                <i class="bi bi-basket text-[8rem] text-gray-400"></i>
              </div>
              <div className="font-semibold text-xl text-gray-400">
                YOUR WISHLIST IS EMPTY
              </div>
            </div>
          ) : (
            <div className="mt-10 px-10">
              {productDetails.map((v, i) => {
                return (
                  <>
                    <div
                      className="flex gap-x-20 bg-white drop-shadow-lg p-4 pt-6 cursor-pointer"
                      onMouseEnter={() => handleHover("yes", i)}
                      onMouseLeave={() => handleHover("no", i)}
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
                          v.data().productId,
                          v.data().image_category,
                          v.data().newImageName,
                          v.data().id,
                          i,
                          v.data().fullImageName
                        )
                      }
                    >
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
                              src={require(`../../all/${
                                v.data().productId
                              }.jpg`)}
                              className="h-[8rem]"
                              loading="lazy"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col w-[50rem]">
                        <div
                          className={`font-semibold ${
                            hoverState && indepIndex === i
                              ? "text-primary"
                              : "text-black"
                          }`}
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
                      </div>

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
                                        deleteFromWishlist(
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
                    <hr className="opacity-[0.01] border-0 h-[0.8px] bg-black" />
                  </>
                );
              })}
            </div>
          )}
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Wishlist;
