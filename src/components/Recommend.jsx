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

  useEffect(() => {
    async function getData(){
        const res = await axios.post('/product-recommend', {name})
        setProductName(res.data.name)
        setProductPrice(res.data.original)
        setProductOfferPrice(res.data.offer)
        setProductRating(res.data.rating)
        setProductTotalRating(res.data.total_ratings)
        setProductOff(res.data.off)   
        setProductId(res.data.uid)        
    }

    getData()
  }, [])

//   const [click, setClick] = useState(false)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)

  const handleSlide = () => {    
    if(end < productName.length - 1) {
        setStart((prevStart) => prevStart + 5);
        setEnd((prevEnd) => prevEnd + 5);
    }    

    // Not used setStart(start+5) as it updates the value asynchronously and not immediately, so map function doesn't work properly
  }

  const handlePreviousSlide = () => {
    if(start > 0) {
        setStart((prevStart) => prevStart - 5);
        setEnd((prevEnd) => prevEnd - 5);
    }    
  }

  return (
    <>
        <div className='w-full bg-white flex flex-col p-4'>
            <div className='font-bold text-2xl'>Similar Products</div>
            <div className='flex'>
            <div className='flex justify-center items-center h-[15rem] absolute left-0 mt-5'>
                <div className='flex bg-white justify-center items-center drop-shadow-2xl rounded-xl w-[3rem] h-[6rem]'>
                    <button onClick={handlePreviousSlide}><i class="bi bi-chevron-double-left text-black text-2xl outline-none"></i></button>
                </div>
            </div>
            <div className='mt-5 flex gap-x-8 overflow-x-hidden'>
                {productName.slice(start, end).map((v, i) => {
                    return (
                        <>
                            <div className='flex flex-col w-[14rem] gap-y-1'>
                                <div className='w-[12rem] h-[15rem] flex justify-center items-center'><img src={require(`../cat_images/${props.category}/${productId[start+i]}.jpg`)} alt="product-image" className='h-[13rem]' /></div>
                                <div className='mt-1 w-[12rem]'>{v}</div>
                                <div className='flex gap-x-2 items-center mt-1'>
                                    <div className='bg-[#4E4FEB] text-white rounded-lg w-12 h-6 text-sm flex justify-center items-center'>{productRating[start+i]}</div>
                                    <div className='text-gray-500 font-semibold'>({productTotalRating[start+i]})</div>                 
                                </div>
                                <div className='mt-1'><span className='font-semibold'>₹{productOfferPrice[start+i]}</span> <span className='line-through text-gray-500 text-sm font-semibold ml-1'>₹{productPrice[start+i]}</span><span className='text-[#4E4FEB] ml-2 font-semibold text-sm'>{productOff[start+i]}</span></div>

                            </div>
                        </>
                    )
                })}
            </div>

            <div className='flex justify-center items-center h-[15rem] absolute right-0 mt-5'>
                <div className='flex bg-white justify-center items-center drop-shadow-2xl rounded-xl w-[3rem] h-[6rem]'>
                    <button onClick={handleSlide}><i class="bi bi-chevron-double-right text-black text-2xl outline-none"></i></button>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Recommend