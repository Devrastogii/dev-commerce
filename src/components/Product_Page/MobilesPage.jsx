import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Filter from '../FilterSection/Filter'
import Loading from '../Loading/Loading'
import NavbarForPages from '../Nav/NavbarForPages'

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

  // Loading

  const [show, setShow] = useState(true);

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
    }

    start()

    function scrollToTop() {
        if(window.scrollY >= 344)
            setShowBtn(true)        

        else 
            setShowBtn(false)        
    }
    
    window.addEventListener('scroll', scrollToTop)

    const f = setTimeout(() => {
        setShow(false)
      }, 2000); 
  
      return () => {      
        clearTimeout(f)
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

  const navigateProductPage = (name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, image, category) => {
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
        'id': id
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
  }

  return (
    <>
       {show ? <Loading /> : <>
        <NavbarForPages />
        <br /> <br />
        
        {showBtn && <div className='w-full flex justify-center fixed z-10'><button className='w-[10rem] h-[2.2rem] flex justify-center items-center border-opacity-75 font-semibold rounded-md border border-[#4E4FEB] mt-5 text-[#4E4FEB] bg-white slide-right-navbar hover:text-white hover:border-white' onClick={reachTop}>Back To Top</button></div>}
        
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
                                    <div className='flex mt-10 gap-x-3 cursor-pointer' onMouseEnter={() => handleHover("yes", index)} onMouseLeave={() =>handleHover("no", index)} onClick={() => navigateProductPage(val, productRating[sliceStart + index], productTotalRating[sliceStart + index], productDescription[sliceStart + index], productOfferPrice[sliceStart + index], productPrice[sliceStart + index], productOff[sliceStart + index], productId[sliceStart + index], image_category[id])}>
                                        <div className='flex gap-x-5'>
                                            <div className='px-1 w-[13rem] h-[15rem] flex justify-center'><img src={require(`../../cat_images/${image_category[id]}/${productId[sliceStart + index]}.jpg`)} className='h-[13rem]' loading='lazy' /></div>
                                            <div className='flex flex-col'>
                                            <div className={`font-semibold text-xl w-[32rem] ${hoverState && (indepIndex === sliceStart + index) ? 'text-[#4E4FEB]': 'text-black'}`}>{val}</div>
                                            <div className='flex gap-x-4 mt-2 items-center h-auto'>
                                                <div className='bg-[#4E4FEB] text-white rounded-lg w-[3.6rem] h-[1.7rem] text-xs flex justify-center items-center'>{productRating[sliceStart + index]} <i class="bi bi-star-fill text-xs ml-1"></i></div>
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
                                                <div className='text-[#4E4FEB] text-sm font-semibold'>{productOff[sliceStart + index]}% off</div>
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
                            <button className='border border-[#4E4FEB] bg-white text-[#4E4FEB] w-[11rem] h-[2.2rem]' onClick={showPreviousPage}>PREVIOUS PAGE</button>
                        </div>      
                        <div>
                            <button className='border border-[#4E4FEB] bg-white text-[#4E4FEB] w-[11rem] h-[2.2rem]' onClick={showNextPage}>NEXT PAGE</button>
                        </div>      
                    </div>
                </div>
                </div>
            </div>
        </section>    
       </>}     
    </>
  )
}

export default MobilesPage
