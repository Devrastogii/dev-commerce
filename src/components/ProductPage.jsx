import React from 'react'
import { useLocation } from 'react-router-dom'

const ProductPage = () => {

  const location = useLocation()

  const name = location.state.name
  const rating = location.state.rating
  const totalRating = location.state.totalRating
  const description = location.state.description
  const offer = location.state.offer
  const price = location.state.price
  const off = location.state.off

  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const date = new Date().getDate()
  const month = new Date().getMonth()
  const day = new Date().getDay()

  return (
    <>
        <section>
            <div className='flex w-full'>
                <div className='w-1/4 fixed'></div>
                <div className='w-3/4 flex flex-col'>

                {/* Product Name */}

                    <div>{name}</div>

                {/* Ratings */}

                    <div className='flex gap-x-4 mt-2 h-auto'>
                        <div className='bg-[#4E4FEB] text-white rounded-lg w-[3.2rem] h-6 text-xs flex justify-center items-center'><i class="bi bi-star-fill text-xs ml-1"></i>{rating}</div>
                        <div className='text-gray-500 font-semibold -mt-1'>{totalRating}</div> 
                    </div>

                {/* Extra */}

                    <div className='text-[#4E4FEB] font-semibold'>Extra ₹{price - offer} off</div>

                {/* Amount */}

                    <div className='flex gap-x-4 items-end'>
                        <div className='font-bold text-3xl'>₹{offer}</div>
                        <div className='text-lg opacity-50 line-through font-semibold'>₹{price}</div>
                        <div className='text-lg text-[#4E4FEB] font-semibold'>{off}% off</div>
                    </div>

                {/* Offers */}

                    <div className='flex flex-col mt-5'>
                        <div className='font-semibold'>Available Offers</div>
                        <div className='mt-2'><span className='text-[#4E4FEB]'><i class="bi bi-tags-fill"></i></span><span className='font-semibold'>Bank Offer</span><span> 5% Cashback on Flipkart Axis Bank Card </span> <span className='text-[#4E4FEB] font-semibold'>T&C</span></div>
                    </div>

                {/* Delivery */}

                    <div className='flex gap-x-10 mt-5'>
                        <div className='opacity-50 font-bold'>Delivery</div>
                        <div className='flex flex-col'>
                            <div><input type="number" placeholder='Enter Delivery Pincode' className='text-sm font-semibold pl-2 border-t-0 border-l-0 border-r-0 border-b-[#4E4FEB] border-2' /></div>
                            <div className='text-sm mt-2 font-semibold'><span>Delivery by {date + 5} {monthArr[month]}, {dayArr[day]}</span> | <span className='text-[#4E4FEB]'>Free</span> <span className='line-through font-semibold opacity-40'>₹40</span></div>
                        </div>
                    </div>

                {/* Highlights */}

                    <div className='flex gap-x-10 mt-5'>
                        <div className='opacity-50 font-bold'>Highlights</div>     
                        <div className='grid grid-cols-2'>
                            <div>
                            <ul className='list-disc'>
                                {description.slice(0, 6).map((v, i) =>{                                                                                                            

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
                                {description.slice(6, description.length-1).map((v, i) =>{                                                                                                            

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

                </div>
            </div>
        </section>
    </>
  )
}

export default ProductPage
