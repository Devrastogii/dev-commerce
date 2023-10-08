import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from '@chakra-ui/react'
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { app, db } from '../../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const FrequentlyPurchased = () => {

  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [productOfferPrice, setProductOfferPrice] = useState([])
  const [productOff, setProductOff] = useState([])
  const [productRating, setProductRating] = useState([])
  const [productTotalRating, setProductTotalRating] = useState([])
  const [productDescription, setProductDescription] = useState([])
  const [productId, setProductId] = useState([])
  const [singleClick, setSingleClick] = useState(false)
  const [text, setText] = useState("VIEW MORE")

  const [currentIndex, setCurrentIndex] = useState()
  const [spinner, setSpinner] = useState(false)

  const wishlistCollection = collection(db, "wishlist");

  const navigate = useNavigate()
  const auth = getAuth(app)
  const [checkLoggedInUser, setLoggedInUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  // Toast Messages
  
  const showWishlistMessage = (num) => {

    {num == 1 ? toast.success("Added To Wishlist ", {
        position: toast.POSITION.BOTTOM_CENTER,
      }) : toast.success("Removed From Wishlist ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });}
    
  };

  useEffect(() => {
    async function start(){

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
        }
      });

        const res = await axios.get("/frequently_purchased")
        setProductName(res.data.name)
        setProductPrice(res.data.original)
        setProductOfferPrice(res.data.offer)
        setProductRating(res.data.rating)
        setProductTotalRating(res.data.total_ratings)
        setProductOff(res.data.off)               
        setProductId(res.data.uid)
        setProductDescription(res.data.description)
        console.log(res.data.uid);
    }

    start()    
  },[])

  const handleClick = () => {
    setSingleClick(true)

    if(text == 'VIEW MORE'){
        setText('VIEW ALL')
    } else {
        navigate('/frequent_page')
    }
  }

  const [hoverState, setHoverState] = useState(false)
  const [indepIndex, setIndepIndex] = useState()

  const handleHover = (text, index) => {
    if(text == "yes") {
        setHoverState(true)
        setIndepIndex(index)      
    }

    else 
        setHoverState(false)
  }

  const identifyBtnClicked = (e, name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, index) => {
    if (e.target.tagName === 'DIV') {
        navigateProductPage(name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, 9)
      } else if (e.target.tagName === 'I') {
        toggleWishlist(name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, 9, index);   
      }
  }

  const navigateProductPage = (name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId) => {
    navigate('/product-page', {state: {
        'name': name,
        'rating': productRating,
        'totalRating': productTotalRating,
        'description': productDescription,
        'offer': productOfferPrice,
        'price': productPrice,
        'off': productOff,
        'image': productId,
        'id': 9,
        'forigin':'frequent'
    }})
  }

  const toggleWishlist = async (productName, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, id, index) => {    

    if(checkLoggedInUser) {
      setCurrentIndex(index)
      setSpinner(true)
      let checkInDB = false   
      
      const getAllDoc = await getDocs(wishlistCollection);
  
      getAllDoc.forEach((doc) => {       
          if(productName === doc.data().productName) {
              checkInDB = true                        
          }
      })   
      
      let userId = userDetails.userId
  
      if(!checkInDB) {
          const querySnapshot = await addDoc(wishlistCollection, {productName, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, id, userId})  
  
          setSpinner(false)
          showWishlistMessage(1);
      }
  
      else {
          const deleteFromWishlist = await getDocs(
              query(collection(db, "/wishlist"), where("userId", "==", userId), where("productName", "==", productName))
          );
         
          deleteFromWishlist.forEach((doc) => {   
              deleteDoc(doc.ref);
            }); 
          
          setSpinner(false)
          showWishlistMessage(0); 
      }
    }

    else {
      navigate('/login-user')
    }
    
  }

  return (
    <>
        <section className='pl-20'>
            <div className='flex items-center'>
                <div className='w-4 h-8 rounded-md bg-primary'></div>
                <div className='ml-2 text-sm font-semibold text-primary'>Best Products</div>
            </div>

            <div className='mt-3 flex gap-x-10'>
                <div className='text-3xl font-semibold'>Frequently Purchased</div>
                <div></div>
            </div>

            <div className='px-2'>
            <div className='mt-7 flex gap-10 flex-wrap justify-evenly'>
                {productName.slice(0, singleClick ? 10 : 5).map((val, index) => {                 
                    return (
                        <>
                        <div className='flex flex-col w-[12rem] cursor-pointer' onMouseEnter={() => handleHover("yes", index)} onMouseLeave={() =>handleHover("no", index)} onClick={(e) => identifyBtnClicked(e, val, productRating[index], productTotalRating[index], productDescription[index], productOfferPrice[index], productPrice[index], productOff[index], productId[index], index)}>
                        <div className='flex justify-center'>                    
                        <div><img src={require(`../../frequent_images/${productId[index]}.jpg`)} alt="product-image" className='h-[12rem]' loading='lazy' /></div>
                        <div className='flex ml-5'>
                        {spinner ? (currentIndex === index ? <CircularProgress isIndeterminate color='#4E4FEB' size={'30px'} /> : <i class={`bi bi-heart-fill hover:text-red-500 text-gray-200`}></i>) : <i class={`bi bi-heart-fill hover:text-red-500 text-gray-200`}></i>}
                        </div>
                    </div>
                    <div className={`font-semibold mt-4 ${hoverState && (indepIndex === index) ? 'text-primary': 'text-black'}`}>{val}</div>
                    <div className='flex gap-x-2 items-center mt-3'>
                        <div className='bg-primary text-white rounded-lg w-[3.6rem] h-[1.7rem] text-sm flex justify-center items-center'>{productRating[index]} <i class="bi bi-star-fill ml-1 text-sm"></i></div>
                        <div className='text-gray-500 font-semibold'>({productTotalRating[index]})</div>                 
                    </div>
                    <div className='mt-3'><span className='font-semibold'>₹{productOfferPrice[index]}</span> <span className='line-through text-gray-500 text-sm font-semibold'>₹{productPrice[index]}</span><span className='text-primary ml-2 font-semibold text-sm'>{productOff[index]}</span></div>
                </div>
                        </>
                    )
                })}
                </div>

                <div className='w-full flex justify-center mt-5 items-center'>
                    <button className='font-bold text-white bg-primary w-[10rem] h-[2.5rem] slide_right' onClick={handleClick}>{text}</button>
                </div>
            </div>
        </section>

        <ToastContainer />
    </>
  )
}

export default FrequentlyPurchased