import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Recommend from "./Recommend";
import Loading from "../Loading/Loading";
import NavbarForPages from "../Nav/NavbarForPages";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@chakra-ui/react";

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const name = location.state.name;
  const rating = location.state.rating;
  const totalRating = location.state.totalRating;
  const description = location.state.description;
  const offer = location.state.offer;
  const price = location.state.price;
  const off = location.state.off;
  const image = location.state.image;
  const category = location.state.category;
  const newImgName = location.state.newImageName;
  const id = location?.state?.id;

  const [pincode, setPincode] = useState();
  const [pinErr, showPinErr] = useState("");

  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayArr = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const day = new Date().getDay();

  const [show, setShow] = useState(true);

  // Toast Message

  const showAddToCartMessage = () => {
    toast.success("Added to Cart ", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const [productDetails, setProductDetails] = useState([]);
  const [changeCartText, setChangeCardText] = useState("ADD TO CART");

  useEffect(() => {

    async function fetchData() {
      try {
        const products = await getDocs(collection(db, "cart"));
        setProductDetails(products.docs);       

        let fullImageName = newImgName + image
  
        products.docs.forEach((doc) => {
            if(fullImageName === doc.data().fullImageName){
                setChangeCardText("GO TO CART")
            }
        });
         
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();

    const f = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => {
      clearTimeout(f);
    };
  }, []);

  const [addLoadCartBtn, setAddLoadCartBtn] = useState(false);
  const [goToCartBtn, setGoToCartBtn] = useState(false);  

  const addToCart = async (
    productName,
    productRating,
    productTotalRating,
    productDescription,
    productOfferPrice,
    productPrice,
    productOff,
    image_category,
    newImageName
  ) => {

    if (changeCartText == "ADD TO CART") {
      setAddLoadCartBtn(true);

      let checkInDB = false;
      let fullImageName = newImageName + image;

      const getAllDoc = await getDocs(collection(db, "/cart"));

      getAllDoc.forEach((doc) => {
        if (fullImageName === doc.data().fullImageName) {
          checkInDB = true;
        }
      });

      if (!checkInDB) {
        const querySnapshot = await addDoc(collection(db, "/cart"), {
          productName,
          productRating,
          productTotalRating,
          productDescription,
          productOfferPrice,
          productPrice,
          productOff,
          image_category,
          fullImageName,
          id,
          image,
          newImageName,
        });

        showAddToCartMessage();
        setAddLoadCartBtn(false);
        setChangeCardText("GO TO CART");
      }

    } else {
      navigate("/cart");
    }
  };

  function validatePincode(pincode) {
    var regexPattern = /^[1-9][0-9]{5}$/;
    return regexPattern.test(pincode);
  }

  const handlePinCode = (e) => {
    let val = e.target.value;
    setPincode(parseInt(val));

    if (val < 0) {
      setPincode("");
    }

    {
      validatePincode(val)
        ? showPinErr("")
        : showPinErr("** Please provide correct pin code");
    }

    // Scroll Disable

    const numberInput = document.getElementById("delivery");

    numberInput.addEventListener("wheel", (e) => {
      e.preventDefault();
    });
  };

  const buynow = async (
    productName,
    productRating,
    productTotalRating,
    productDescription,
    productOfferPrice,
    productPrice,
    productOff,
    image_category,
    newImageName
  ) => {

    setGoToCartBtn(true);
    let checkInDB = false;
    let fullImageName = newImgName + image;

    const getAllDoc = await getDocs(collection(db, "/cart"));

    getAllDoc.forEach((doc) => {
      if (fullImageName === doc.data().fullImageName) {
        checkInDB = true;
      }
    });

    if (!checkInDB) {
      const querySnapshot = await addDoc(collection(db, "/cart"), {
        productName,
        productRating,
        productTotalRating,
        productDescription,
        productOfferPrice,
        productPrice,
        productOff,
        image_category,
        fullImageName,
        id,
        image,
        newImageName,
      });

      setGoToCartBtn(false);

      navigate("/buy-now", {
        state: {
          name: productName,
          offer: productOfferPrice,
          price: productPrice,
          off: productOff,
          category: image_category,
          newImgName: newImageName,
          image: image,
        },
      });
    }
  };

  return (
    <>
      {show ? (
        <Loading />
      ) : (
        <>
          <NavbarForPages />
          <br /> <br />
          <section className="mt-10">
            <div className="flex w-full px-4">
              <div className="w-1/3 flex flex-col justify-center items-center h-[30rem]">
                <div
                  className={`border border-black border-opacity-10 h-[30rem] w-full flex flex-col justify-center items-center`}
                >
                  <img
                    src={require(`../../cat_images/${category}/${newImgName}${image}.jpg`)}
                    loading="lazy"
                    alt="product-image"
                  />

                  <div className="flex mt-10 gap-x-5">
                    {goToCartBtn ? (
                      <Button
                        isLoading
                        loadingText="BUY NOW"
                        colorScheme="dark"
                        variant="outline"
                        spinnerPlacement="start"
                      ></Button>
                    ) :  <button
                      className="bg-orange-600 hover:bg-orange-700 transition-all duration-500 w-[10rem] h-[2.5rem] text-lg text-white flex justify-center items-center"
                      onClick={() =>
                        buynow(
                          name,
                          rating,
                          totalRating,
                          description,
                          offer,
                          price,
                          off,
                          category,
                          newImgName,
                          image
                        )
                      }
                    >
                      <i class="bi bi-lightning-fill mr-1"></i> BUY NOW
                    </button>}                   

                    {addLoadCartBtn ? (
                      <Button
                        isLoading
                        loadingText="ADD TO CART"
                        colorScheme="dark"
                        variant="outline"
                        spinnerPlacement="start"
                      ></Button>
                    ) : (
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-500 w-[10rem] h-[2.5rem] text-lg text-white flex justify-center items-center"
                        onClick={() =>
                          addToCart(
                            name,
                            rating,
                            totalRating,
                            description,
                            offer,
                            price,
                            off,
                            category,
                            newImgName,
                            image
                          )
                        }
                      >
                        <i class="bi bi-cart-plus-fill mr-1"></i>{" "}
                        {changeCartText}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-2/3 flex flex-col py-4 px-6">
                {/* Product Name */}

                <div className="text-xl">{name}</div>

                {/* Ratings */}

                <div className="flex gap-x-4 mt-2 h-auto items-center">
                  <div className="bg-primary text-white rounded-lg w-[3.2rem] h-6 text-xs flex justify-center items-center">
                    {rating} <i class="bi bi-star-fill text-xs ml-1"></i>
                  </div>
                  <div className="text-gray-500 font-semibold -mt-1">
                    {totalRating} Ratings
                  </div>
                </div>

                {/* Extra */}

                <div className="text-primary font-semibold mt-8">
                  Extra ₹{price - offer} off
                </div>

                {/* Amount */}

                <div className="flex gap-x-4 items-end">
                  <div className="font-bold text-3xl">₹{offer}</div>
                  <div className="text-lg opacity-50 line-through font-semibold">
                    ₹{price}
                  </div>
                  <div className="text-lg text-primary font-semibold">
                    {off}% off
                  </div>
                </div>

                {/* Offers */}

                <div className="flex flex-col mt-8">
                  <div className="font-semibold underline">
                    Available Offers
                  </div>
                  <div className="mt-2">
                    <div>
                      <span className="text-primary">
                        <i class="bi bi-tags-fill"></i>
                      </span>
                      <span className="font-semibold ml-2">Bank Offer</span>
                      <span> 5% Cashback on Flipkart Axis Bank Card </span>{" "}
                      <span className="text-primary font-semibold">T&C</span>
                    </div>
                    <div>
                      <span className="text-primary">
                        <i class="bi bi-tags-fill"></i>
                      </span>
                      <span className="font-semibold ml-2">Special Offer</span>
                      <span>
                        {" "}
                        Get extra ₹7401 off (price inclusive of cashback/coupon){" "}
                      </span>{" "}
                      <span className="text-primary font-semibold">T&C</span>
                    </div>
                    <div>
                      <span className="text-primary">
                        <i class="bi bi-tags-fill"></i>
                      </span>
                      <span className="font-semibold ml-2">Partner Offer</span>
                      <span>
                        {" "}
                        Sign-up for Flipkart Pay Later & get free Times Prime
                        Benefits worth ₹10,000*{" "}
                      </span>{" "}
                      <span className="text-primary font-semibold">
                        Know More
                      </span>
                    </div>
                    <div>
                      <span className="text-primary">
                        <i class="bi bi-tags-fill"></i>
                      </span>
                      <span className="font-semibold ml-2">Partner Offer</span>
                      <span>
                        {" "}
                        Purchase now & get 1 surprise cashback coupon in Future{" "}
                      </span>{" "}
                      <span className="text-primary font-semibold">
                        Know More
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery */}

                <div className="flex gap-x-10 mt-8">
                  <div className="opacity-50 font-bold">Delivery</div>
                  <div className="flex flex-col">
                    <div className="flex gap-x-5">
                      <div>
                        <i class="bi bi-search text-primary absolute"></i>
                        <input
                          type="number"
                          placeholder="Enter Delivery Pincode"
                          className="text-sm pl-6 pb-1 border-t-0 border-l-0 border-r-0 border-b-primary border-2 outline-none"
                          value={pincode}
                          onChange={handlePinCode}
                          id="delivery"
                        />
                      </div>

                      {pinErr != "" ? (
                        <div className="text-sm text-red-500">{pinErr}</div>
                      ) : null}
                    </div>
                    <div className="text-sm mt-2 font-semibold">
                      <span>
                        Delivery by {(date + 5) % 31} {monthArr[month - 1]},{" "}
                        {dayArr[day - 1]}
                      </span>{" "}
                      | <span className="text-primary">Free</span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}

                <div className="flex gap-x-10 mt-8">
                  <div className="opacity-50 font-bold">Highlights</div>
                  <div className="grid grid-cols-2 gap-x-20">
                    <div>
                      <ul className="list-disc">
                        {description?.slice(0, 7).map((v, i) => {
                          return (
                            <>
                              <li className="text-sm mt-1">{v}</li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc">
                        {description?.slice(7, 14).map((v, i) => {
                          return (
                            <>
                              <li className="text-sm mt-1">{v}</li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Recommend
            name={name}
            image={image}
            category={category}
            id={id}
            newImgName={newImgName}
            text={setChangeCardText}
          />
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default ProductPage;
