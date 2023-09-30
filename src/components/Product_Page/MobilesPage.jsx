import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Filter from '../FilterSection/Filter'
import Loading from '../Loading/Loading'
import NavbarForPages from '../Nav/NavbarForPages'
import { motion } from 'framer-motion'
import { db } from '../../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MobilesPage = () => {

  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [productOfferPrice, setProductOfferPrice] = useState([])
  const [productOff, setProductOff] = useState([])
  const [productRating, setProductRating] = useState([])
  const [productTotalRating, setProductTotalRating] = useState([])
  const [productId, setProductId] = useState([])
  const [productDescription, setProductDescription] = useState([])

  const [brandName, setBrandName] = useState([])
  const [ram, setRam] = useState([])
  const [hoverState, setHoverState] = useState(false)
  const [indepIndex, setIndepIndex] = useState()

  const totalPages = productName.length

  const location = useLocation()
  const navigate = useNavigate()
  const id = location.state.id

  const image_category = ['mobiles', 'monitors', 'watch', 'laptop', 'tablet', 'fridge', 'machine', 'purifier']
    
  // Toast Messages
  
  const showWishlistMessage = (num) => {

    {num == 1 ? toast.success("Added To Wishlist ", {
        position: toast.POSITION.BOTTOM_CENTER,
      }) : toast.success("Removed From Wishlist ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });}
    
  };

  // Loading

  const [load, setLoad] = useState(true);

  // Back To Top

  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    async function start(){
        const res = await axios.post("/products_show", {id})  
        setProductName(res.data.name)
        setProductPrice(res.data.original)
        setProductOfferPrice(res.data.offer)
        setProductRating(res.data.rating)
        setProductTotalRating(res.data.total_ratings)
        setProductOff(res.data.off)
        setProductDescription(res.data.description)    
        setProductId(res.data.uid)     
        setBrandName(res.data.brand)
        setRam(res.data.ram)    
        setLoad(false) 
    }

    start()

    function scrollToTop() {
        if(window.scrollY >= 350)
            setShowBtn(true)        

        else 
            setShowBtn(false)        
    }
    
    window.addEventListener('scroll', scrollToTop)

    return () => {      
        window.removeEventListener('scroll', scrollToTop)
    };    

  },[])

  const handleHover = (text, index) => {
    if(text == "yes") {
        setHoverState(true)
        setIndepIndex(index)      
    }

    else 
        setHoverState(false)
  }

  const navigateProductPage = (name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, image, category, newImageName) => { 
    navigate('/product-page', {state: {
        'name': name,
        'rating': productRating,
        'totalRating': productTotalRating,
        'description': productDescription,
        'offer': productOfferPrice,
        'price': productPrice,
        'off': productOff,
        'image': image,
        'category': category,
        'id': id,
        'newImageName': newImageName
    }})
  }

  var totalNumberOfPages = Math.floor(totalPages / 20)
  const [currentPage, setCurrentPage] = useState(1)
  const [sliceStart, setSliceStart] = useState(0)
  const [sliceEnd, setSliceEnd] = useState(20)

  function scrollToTopLogic(){
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    
    window.addEventListener('click', scrollToTop)
  }

  const showNextPage = () => {    
    if(currentPage < totalNumberOfPages) {
        setCurrentPage((prev) => prev + 1);
        setSliceStart(sliceEnd)
        setSliceEnd(sliceEnd + 20)
    }

    scrollToTopLogic()
  }

  const showPreviousPage = () => {
    if(currentPage != 1) {
        setCurrentPage((prev) => prev - 1);
        setSliceStart(sliceStart - 20)
        setSliceEnd(sliceStart)
    }

    scrollToTopLogic()
  }

  const reachTop = () => {
    scrollToTopLogic()
    setShowBtnHovered()
  }

  const [showBtnHovered, setShowBtnHovered] = useState(false)
  const newImageName = ['MOB', 'MONMON', 'W', 'L', 'T', 'F', 'MA', 'P']

  const [currentIndex, setCurrentIndex] = useState()
  const [iconColor, setIconColor] = useState(false)

  const productInWishlist = []
  const addProduct = new Map()

  const wishlistCollection = collection(db, "wishlist");

  const toggleWishlist = async (index, productName, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, image_category, newImageName, productId) => {

    setCurrentIndex(index)
    setIconColor(true)    

    productInWishlist.push(index)   
    addProduct.set('text-red-500', index)   

    let checkInDB = false 
    let fullImageName = newImageName + productId   
    
    const getAllDoc = await getDocs(wishlistCollection);

    getAllDoc.forEach((doc) => {
        if(productId === doc.data().productId) {
            checkInDB = true                        
        }
    })    

    if(!checkInDB) {
        const querySnapshot = await addDoc(wishlistCollection, {productName, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, image_category, newImageName, productId, fullImageName})  

        showWishlistMessage(1);
    }

    else {
        const deleteFromWishlist = await getDocs(
            query(collection(db, "/wishlist"), where("fullImageName", "==", fullImageName))
        );
       
        deleteFromWishlist.forEach((doc) => {   
            deleteDoc(doc.ref);
          }); 
          
        showWishlistMessage(0);
        setIconColor(false)
    }
  }

  return (
    <>
       {load ? <Loading /> : <>
        <NavbarForPages />
        <br /> <br />
        
        {showBtn && <div className='w-full flex justify-center fixed z-10'><motion.button initial={{translateY: -10}} animate={{translateY: 0}} transition={{duration: 0.5}} className='w-[10rem] h-[2.2rem] flex justify-center items-center border-opacity-75 font-semibold rounded-md border border-primary mt-5 text-primary bg-white slide-right-home-navbar hover:text-white hover:border-white' onClick={reachTop} onHoverStart={() => setShowBtnHovered(true)} onHoverEnd={() => setShowBtnHovered(false)}><i class={`bi bi-chevron-down ${showBtnHovered ? 'text-white' : 'text-primary'} mr-2`}></i>Back To Top</motion.button></div>}
        
        <section className='mt-10 px-5'>
            <div className='flex gap-x-5'>
                <div className='w-1/4 bg-white drop-shadow-lg h-full'>
                    <Filter brand = {brandName} 
                          ram = {ram} />
                </div>
                <div className='w-3/4 bg-white drop-shadow-lg py-2 px-4'>             
                    <div className='font-semibold mt-[0.45rem] text-lg'>Showing {sliceStart + 1} - {sliceEnd} of {productName.length} results for {image_category[id]}</div>
                    <div className='flex gap-x-5 mt-[0.45rem] text-sm'>
                        <div className='font-semibold'>Sort By</div>
                        <div>Relevance</div>
                        <div>Price--Low to High</div>
                        <div>Price--High to Low</div>
                        <div>Newest First</div>
                    </div>       
                    <div className='mt-5'><hr className='opacity-10 border-0 h-[1px] bg-black' /></div>
                    <div>
                        {productName.slice(sliceStart, sliceEnd).map((val, index) => {                            
                            return (
                                <>
                                    <div className='flex mt-10 gap-x-3 cursor-pointer' onMouseEnter={() => handleHover("yes", index)} onMouseLeave={() =>handleHover("no", index)}>
                                        <div className='flex gap-x-5'>
                                            <div className='px-1 w-[13rem] h-[15rem] flex justify-center gap-x-7'><div><img src={require(`../../cat_images/${image_category[id]}/${newImageName[id]}${productId[sliceStart + index]}.jpg`)} className='h-[13rem]' loading='lazy' /></div>


                                            <div><button onClick={() => toggleWishlist(sliceStart + index, val, productRating[sliceStart + index], productTotalRating[sliceStart + index], productDescription[sliceStart + index], productOfferPrice[sliceStart + index], productPrice[sliceStart + index], productOff[sliceStart + index], image_category[id], newImageName[id], productId[sliceStart + index])}>
                                            
                                                <i class={`bi bi-heart-fill ${currentIndex === index ? 'text-red-500' : 'text-gray-200'} hover:text-red-500`}></i></button></div></div>
                                            <div className='flex flex-col'>
                                            <div className={`font-semibold text-xl w-[32rem] ${hoverState && (indepIndex === sliceStart + index) ? 'text-primary': 'text-black'}`}>{val}</div>
                                            <div className='flex gap-x-4 mt-2 items-center h-auto'>
                                                <div className='bg-primary text-white rounded-lg w-[3.6rem] h-[1.7rem] text-xs flex justify-center items-center'>{productRating[sliceStart + index]} <i class="bi bi-star-fill text-xs ml-1"></i></div>
                                                <div className='text-gray-500 font-semibold -mt-1'>{productTotalRating[sliceStart + index]} Ratings</div> 
                                            </div>
                                            <div className='mt-3 px-5 w-[22rem]'>
                                                <ul className='list-disc'>
                                                    {productDescription[sliceStart + index].slice(0, 6).map((v, i) => {                                                   
                                                        return (
                                                            <>
                                                                <li className='text-sm mt-1'>{v}</li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            </div>
                                            </div>

                                        <div>
                                            <div className='flex flex-col'>
                                                <div className='font-bold text-2xl'>₹{productOfferPrice[sliceStart + index]}</div>
                                            <div className='flex gap-x-2 mt-1'>
                                                <div className='line-through text-gray-500 text-sm font-semibold'>₹{productPrice[sliceStart + index]}</div>
                                                <div className='text-primary text-sm font-semibold'>{productOff[sliceStart + index]}% off</div>
                                            </div>                                         
                                        </div>
                                        </div>
                                    </div>    
                                        <div className='mt-5'><hr className='opacity-5 border-0 h-[1px] bg-black' /></div>
                                </>
                            )
                        })}
                    </div>                                   

                <div className='mt-10 flex w-3/4 justify-between'>
                    <div>Page {currentPage} of {totalNumberOfPages}</div>
                    <div className='flex gap-x-5'>
                        <div>
                            <button className='border border-primary bg-white text-primary w-[11rem] h-[2.2rem]' onClick={showPreviousPage}>PREVIOUS PAGE</button>
                        </div>      
                        <div>
                            <button className='border border-primary bg-white text-primary w-[11rem] h-[2.2rem]' onClick={showNextPage}>NEXT PAGE</button>
                        </div>      
                    </div>
                </div>
                </div>
            </div>
        </section>    
       </>}     

       <ToastContainer />
    </>
  )
}

export default MobilesPage
