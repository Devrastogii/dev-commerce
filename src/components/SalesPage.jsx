import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const SalesPage = () => {

  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [productOfferPrice, setProductOfferPrice] = useState([])
  const [productOff, setProductOff] = useState([])
  const [productRating, setProductRating] = useState([])
  const [productTotalRating, setProductTotalRating] = useState([])
  const [productImage, setProductImage] = useState([])

  useEffect(() => {
    async function start(){
        const res = await axios.get("/sale_products_show")
        setProductName(res.data.name)
        setProductPrice(res.data.original)
        setProductOfferPrice(res.data.offer)
        setProductRating(res.data.rating)
        setProductTotalRating(res.data.total_ratings)
        setProductOff(res.data.off)    
        
        for (let index = 0; index < res.data.name.length; index++) {
            for (let j = 0; j < res.data.uid.length; j++) {                
                if((res.data.uid[index]  + '.jpg') === res.data.images[j]) {                    
                    productImage.push(res.data.images[j])
                }
            }   
        }
    }

    start()
  },[])

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

  return (
    <>
        <br />
        <Navbar />
        <div className='mt-5'><hr className='opacity-10 border-0 h-[1px] bg-black' /></div>

        <section className='px-10'>            
            <div className='mt-7 flex gap-10 px-5 justify-between flex-wrap'>
                {productName.slice(0,95).map((val, index) => {

                    const splitIndex = 20;

                    const part1 = val[0].slice(0, splitIndex);
                    const part2 = val[0].slice(splitIndex, 40);

                    return (
                        <>
                        <div className='flex flex-col cursor-pointer' onMouseEnter={() => handleHover("yes", index)} onMouseLeave={() =>handleHover("no", index)}>
                    <div>                    
                        <img src={require(`../all/${productImage[index]}`)} alt="product-image" className='h-[12rem]' loading='lazy' />
                    </div>
                    <div className={`font-semibold mt-4 ${hoverState && (indepIndex === index) ? 'text-[#4E4FEB]': 'text-black'}`}>{part1} <br /> {part2}</div>
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
        </section>
    </>
  )
}

export default SalesPage
