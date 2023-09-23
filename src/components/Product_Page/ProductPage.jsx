import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Recommend from './Recommend'
import Loading from '../Loading/Loading'
import NavbarForPages from '../Nav/NavbarForPages'

const ProductPage = () => {

  const location = useLocation()

  const name = location.state.name
  const rating = location.state.rating
  const totalRating = location.state.totalRating
  const description = location.state.description
  const offer = location.state.offer
  const price = location.state.price
  const off = location.state.off
  const image = location.state.image
  const category = location.state.category

  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const date = new Date().getDate()
  const month = new Date().getMonth()
  const day = new Date().getDay()

  const [show, setShow] = useState(true);

  useEffect(() => {
    const f = setTimeout(() => {
      setShow(false)
    }, 1000); 

    return () => {      
      clearTimeout(f)
  };

  }, [])

  return (
    <>
       {show ? <Loading /> : <>

        <NavbarForPages />
        <br /> <br />

        <section className='mt-10'>
            <div className='flex w-full px-4'>
                <div className='w-1/3 flex flex-col justify-center items-center h-[30rem]'>  

                <div className={`border border-black border-opacity-10 h-[30rem] w-full flex flex-col justify-center items-center`}>
                <img src={require(`../../cat_images/${category}/${image}.jpg`)} loading='lazy' alt='product-image' /> 

                <div className='flex mt-10 gap-x-5'>
                    <button className='bg-orange-600 hover:bg-orange-700 transition-all duration-500 w-[10rem] h-[2.5rem] text-lg text-white flex justify-center items-center'><i class="bi bi-lightning-fill mr-1"></i> BUY NOW</button>
    
                    <button className='bg-yellow-500 hover:bg-yellow-600 transition-all duration-500 w-[10rem] h-[2.5rem] text-lg text-white flex justify-center items-center'><i class="bi bi-cart-plus-fill mr-1"></i> ADD TO CART</button>
                </div>
                </div>                 
                                                       
                </div>               

                <div className='w-2/3 flex flex-col py-4 px-6'>

                {/* Product Name */}

                    <div className='text-xl'>{name}</div>

                {/* Ratings */}

                    <div className='flex gap-x-4 mt-2 h-auto items-center'>
                        <div className='bg-primary text-white rounded-lg w-[3.2rem] h-6 text-xs flex justify-center items-center'>{rating} <i class="bi bi-star-fill text-xs ml-1"></i></div>
                        <div className='text-gray-500 font-semibold -mt-1'>{totalRating} Ratings</div> 
                    </div>

                {/* Extra */}

                    <div className='text-primary font-semibold mt-8'>Extra ₹{price - offer} off</div>

                {/* Amount */}

                    <div className='flex gap-x-4 items-end'>
                        <div className='font-bold text-3xl'>₹{offer}</div>
                        <div className='text-lg opacity-50 line-through font-semibold'>₹{price}</div>
                        <div className='text-lg text-primary font-semibold'>{off}% off</div>
                    </div>

                {/* Offers */}

                    <div className='flex flex-col mt-8'>
                        <div className='font-semibold underline'>Available Offers</div>
                        <div className='mt-2'>
                            <div><span className='text-primary'><i class="bi bi-tags-fill"></i></span><span className='font-semibold ml-2'>Bank Offer</span><span> 5% Cashback on Flipkart Axis Bank Card </span> <span className='text-primary font-semibold'>T&C</span></div>
                            <div><span className='text-primary'><i class="bi bi-tags-fill"></i></span><span className='font-semibold ml-2'>Special Offer</span><span> Get extra ₹7401 off (price inclusive of cashback/coupon) </span> <span className='text-primary font-semibold'>T&C</span></div>
                            <div><span className='text-primary'><i class="bi bi-tags-fill"></i></span><span className='font-semibold ml-2'>Partner Offer</span><span> Sign-up for Flipkart Pay Later & get free Times Prime Benefits worth ₹10,000* </span> <span className='text-primary font-semibold'>Know More</span></div>
                            <div><span className='text-primary'><i class="bi bi-tags-fill"></i></span><span className='font-semibold ml-2'>Partner Offer</span><span> Purchase now & get 1 surprise cashback coupon in Future </span> <span className='text-primary font-semibold'>Know More</span></div>
                        </div>
                    </div>

                {/* Delivery */}

                    <div className='flex gap-x-10 mt-8'>
                        <div className='opacity-50 font-bold'>Delivery</div>
                        <div className='flex flex-col'>
                            <div><input type="number" placeholder='Enter Delivery Pincode' className='text-sm font-semibold pl-2 border-t-0 border-l-0 border-r-0 border-b-primary border-2 outline-none' /></div>
                            <div className='text-sm mt-2 font-semibold'><span>Delivery by {date + 5} {monthArr[month]}, {dayArr[day]}</span> | <span className='text-primary'>Free</span> <span className='line-through font-semibold opacity-40'>₹40</span></div>
                        </div>
                    </div>

                {/* Highlights */}

                    <div className='flex gap-x-10 mt-8'>
                        <div className='opacity-50 font-bold'>Highlights</div>     
                        <div className='grid grid-cols-2 gap-x-20'>
                            <div>
                            <ul className='list-disc'>
                                {description.slice(0, 7).map((v, i) =>{                                                                                                            

                                    return (
                                        <>
                                            <li className='text-sm mt-1'>{v}</li>
                                        </>
                                        )
                                    })}
                            </ul>
                            </div>
                            <div>
                            <ul className='list-disc'>
                                {description.slice(7, 14).map((v, i) =>{                                                                                                            

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

                {/* Buy Together  */}

                    <div className='border border-black border-opacity-10 mt-8 py-4 px-6 flex flex-col h-[22rem]'>
                        <div className='text-2xl font-semibold'>Buy Together & Save More</div>
                        <div className='mt-5'><hr className='opacity-10 border-0 h-[1px] bg-black' /></div>
                    </div>

                </div>
            </div>
        </section>

        <Recommend name = {name}
                   image = {image}
                   category = {category}
                   id = {location.state.id} />
       </>} 
    </>
  )
}

export default ProductPage
