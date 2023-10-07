import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarForPages from '../Nav/NavbarForPages'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from '@chakra-ui/react'

const SalesPage = () => {

  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [productOfferPrice, setProductOfferPrice] = useState([])
  const [productOff, setProductOff] = useState([])
  const [productId, setProductId] = useState([])
  const [productRating, setProductRating] = useState([])
  const [productTotalRating, setProductTotalRating] = useState([])
  const [productDescription, setProductDescription] = useState([])

  const [load, setLoad] = useState(true)
  const [spinner, setSpinner] = useState(false)
  const [currentIndex, setCurrentIndex] = useState()

  useEffect(() => {    

    async function start(){
        const res = await axios.get("/sale_products_show")
        setProductName(res.data.name)
        setProductPrice(res.data.original)
        setProductOfferPrice(res.data.offer)
        setProductRating(res.data.rating)
        setProductTotalRating(res.data.total_ratings)
        setProductOff(res.data.off)    
        setProductDescription(res.data.description)
        setProductId(res.data.uid)             
        
        setLoad(false)
    }

    start()
  },[])

  // Toast Messages
  
  const showWishlistMessage = (num) => {

    {num == 1 ? toast.success("Added To Wishlist ", {
        position: toast.POSITION.BOTTOM_CENTER,
      }) : toast.success("Removed From Wishlist ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });}
    
  };

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

  const navigate = useNavigate()

  const identifyBtnClicked = (e, name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, index) => {
    if (e.target.tagName === 'DIV') {
        navigateProductPage(name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, 8)
      } else if (e.target.tagName === 'I') {
        toggleWishlist(name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, 8, index);   
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
        'id': 8,
        'origin':'sale'
    }})
  }

  const wishlistCollection = collection(db, "wishlist");

  const toggleWishlist = async (productName, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, id, index) => {    
    setSpinner(true)
    setCurrentIndex(index)
    let checkInDB = false   
    
    const getAllDoc = await getDocs(wishlistCollection);

    getAllDoc.forEach((doc) => {       
        if(productName === doc.data().productName) {
            checkInDB = true                        
        }
    })    

    if(!checkInDB) {
        const querySnapshot = await addDoc(wishlistCollection, {productName, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId, id})  

        showWishlistMessage(1);
        setSpinner(false)
    }

    else {
        const deleteFromWishlist = await getDocs(
            query(collection(db, "/wishlist"), where("productName", "==", productName))
        );
       
        deleteFromWishlist.forEach((doc) => {   
            deleteDoc(doc.ref);
          }); 
          
        setSpinner(false)
        showWishlistMessage(0); 
    }
  }

  return (
    <>

    {load ? <Loading /> : <>
    <NavbarForPages />
        <br /> <br />  <br />

        <div className='text-2xl px-10 font-semibold mt-[1.2rem]'>Flash Sales</div>    

        <section className='px-10'>            
            <div className='mt-12 flex gap-10 px-5 justify-between flex-wrap'>
                {productName.slice(0,productName.length-1).map((val, index) => {            
                    return (
                        <>
                    <div className='flex flex-col cursor-pointer w-[12rem]' onMouseEnter={() => handleHover("yes", index)} onMouseLeave={() =>handleHover("no", index)} onClick={(e) => identifyBtnClicked(e, val, productRating[index], productTotalRating[index], productDescription[index], productOfferPrice[index], productPrice[index], productOff[index], productId[index], index)}>
                    <div className='flex justify-center'>    
                    <div><img src={require(`../../all/${productId[index]}.jpg`)} alt="product-image" className='h-[12rem]' loading='lazy' /></div>  
                    {spinner ? (currentIndex === index ? <CircularProgress isIndeterminate color='#4E4FEB' size={'30px'} /> : <i class={`bi bi-heart-fill hover:text-red-500`}></i>) : <i class={`bi bi-heart-fill hover:text-red-500`}></i>}                               
                    </div>                                     
                    <div className={`font-semibold mt-4 ${hoverState && (indepIndex === index) ? 'text-primary': 'text-black'}`}>{val}</div>
                    <div className='flex gap-x-2 items-center mt-3'>
                        <div className='bg-primary text-white rounded-lg w-[3.6rem] h-[1.7rem] text-sm flex justify-center items-center'>{productRating[index]} <i class="bi bi-star-fill ml-1 text-sm"></i></div>
                        <div className='text-gray-500 font-semibold'>({productTotalRating[index]})</div>                 
                    </div>
                    <div className='mt-3'><span className='font-semibold'>₹{productOfferPrice[index]}</span> <span className='line-through text-gray-500 text-sm font-semibold'>₹{productPrice[index]}</span><span className='text-primary ml-2 font-semibold text-sm'>{productOff[index]}% off</span></div>
                </div>
                        </>
                    )
                })}                
            </div>
        </section>
    </>}        

    <ToastContainer />
    </>
  )
}

export default SalesPage
