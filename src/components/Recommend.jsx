import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Recommend = (props) => {

  const name = props.name

  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [productOfferPrice, setProductOfferPrice] = useState([])
  const [productOff, setProductOff] = useState([])
  const [productRating, setProductRating] = useState([])
  const [productTotalRating, setProductTotalRating] = useState([])
  const [productId, setProductId] = useState([])
  const [productDescription, setProductDescription] = useState([])

  useEffect(() => {
    async function getData(){
        const res = await axios.post('/product-recommend', {name})
        setProductName(res.data.name)
        setProductPrice(res.data.original)
        setProductOfferPrice(res.data.offer)
        setProductRating(res.data.rating)
        setProductTotalRating(res.data.total_ratings)
        setProductOff(res.data.off)
        setProductDescription(res.data.description)    
        setProductId(res.data.uid)     
        // setBrandName(res.data.brand)
        // setRam(res.data.ram)   
    }

    getData()
  }, [])

  return (
    <>
        <div className='w-full bg-white flex flex-col p-4'>
            <div className='font-bold text-lg'>Similar Products</div>
            <div className='mt-5 flex gap-x-5'>
                {productName.slice(0, 10).map((v, i) => {
                    return (
                        <>
                            <div className='flex flex-col w-[25%]'>
                                <div><img src="" alt="" /></div>
                                <div>{v}</div>
                                <div className='flex gap-x-2 items-center mt-3'>
                                    <div className='bg-[#4E4FEB] text-white rounded-lg w-12 h-6 text-sm flex justify-center items-center'>{productRating[i]}</div>
                                    <div className='text-gray-500 font-semibold'>({productTotalRating[i]})</div>                 
                                </div>
                                <div className='mt-3'><span className='font-semibold'>₹{productOfferPrice[i]}</span> <span className='line-through text-gray-500 text-sm font-semibold'>₹{productPrice[i]}</span><span className='text-[#4E4FEB] ml-2 font-semibold text-sm'>{productOff[i]}% off</span></div>

                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default Recommend
