import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FrequentlyPurchased = () => {

   const [productName, setProductName] = useState([])
   const [productPrice, setProductPrice] = useState([])
   const [productOfferPrice, setProductOfferPrice] = useState([])
   const [productOff, setProductOff] = useState([])
   const [productRating, setProductRating] = useState([])
   const [productTotalRating, setProductTotalRating] = useState([])
   const [productImage, setProductImage] = useState([])
  
   useEffect(() => {
     async function start(){
        const res = await axios.get("/frequently_purchased")
        setProductName(res.data.name)
        setProductPrice(res.data.original)
        setProductOfferPrice(res.data.offer)
        setProductRating(res.data.rating)
        setProductTotalRating(res.data.total_ratings)
        setProductOff(res.data.off)
        setProductImage(res.data.images)        
    }
  
      start()
    },[])

  return (
    <>
        <section className='pl-20'>
            <div className='flex items-center'>
                <div className='w-4 h-8 rounded-md bg-[#4E4FEB]'></div>
                <div className='ml-2 text-sm font-semibold text-[#4E4FEB]'>Most Purchased</div>
            </div>

            <div className='mt-3 flex gap-x-10'>
                <div className='text-3xl font-semibold'>Frequently Purchased</div>
                <div></div>
            </div>

            <div className='mt-16 flex gap-10 flex-wrap'>            
                {productName.slice(0,15).map((val, index) => {
                    return (
                        <>
                        <div className='flex flex-col'>
                    <div>                    
                        {/* <img src={require(`../mobile_images/${productImage[index]}`)} alt="product-image" loading='lazy' className='h-[12rem]' /> */}
                    </div>
                    <div className='font-semibold mt-4'>{val[0]} <br /> ({val[1]})</div>
                    <div className='flex gap-x-2 items-center mt-3'>
                        <div className='bg-[#4E4FEB] text-white rounded-lg w-12 h-6 text-sm flex justify-center items-center'>{productRating[index]}</div>
                        <div className='text-gray-500 font-semibold'>({productTotalRating[index]})</div>                 
                    </div>
                    <div className='mt-3'><span className='font-semibold'>₹{productOfferPrice[index]}</span> <span className='line-through text-gray-500 text-sm font-semibold'>₹{productPrice[index]}</span><span className='text-[#4E4FEB] ml-2 font-semibold text-sm'>{productOff[index]}% off</span></div>
                </div>
                        </>
                    )
                })}
            </div>

            <div className='w-full flex justify-center mt-16 items-center'>
                <button className='font-bold text-white bg-[#4E4FEB] w-[10rem] h-[2.5rem] slide_right'>VIEW MORE</button>
            </div>
        </section>
    </>
  )
}

export default FrequentlyPurchased
