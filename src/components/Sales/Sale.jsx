import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Sale = () => {

  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [productOfferPrice, setProductOfferPrice] = useState([])
  const [productOff, setProductOff] = useState([])
  const [productRating, setProductRating] = useState([])
  const [productTotalRating, setProductTotalRating] = useState([])
  const [productId, setProductId] = useState([])
  const [singleClick, setSingleClick] = useState(false)
  const [text, setText] = useState("VIEW MORE")

  const navigate = useNavigate()

  useEffect(() => {
    async function start(){
        const res = await axios.get("/sale_products_show")
        setProductName(res.data.name)
        setProductPrice(res.data.original)
        setProductOfferPrice(res.data.offer)
        setProductRating(res.data.rating)
        setProductTotalRating(res.data.total_ratings)
        setProductOff(res.data.off)        
        setProductId(res.data.uid)               
    }

    start()
  },[])

  const handleClick = () => {
    setSingleClick(true)

    if(text == 'VIEW MORE'){
        setText('VIEW ALL')
    } else {
        navigate('/sales_page')
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

  const addToWishlist = () => {

  }

  return (
    <>
        <section className='pl-20' id='sales'>
            <div className='flex items-center'>
                <div className='w-4 h-8 rounded-md bg-primary'></div>
                <div className='ml-2 text-sm font-semibold text-primary'>Today's</div>
            </div>

            <div className='mt-3 flex gap-x-10'>
                <div className='text-3xl font-semibold'>Flash Sales</div>
                <div></div>
            </div>

            <div className='mt-7 flex gap-10 px-5 justify-between flex-wrap'>
                {productName.slice(0, singleClick ? 10 : 5).map((val, index) => {            
                    return (
                        <>
                        <div className='flex flex-col w-[12rem] cursor-pointer' onMouseEnter={() => handleHover("yes", index)} onMouseLeave={() =>handleHover("no", index)}>
                    <div className='flex justify-center'>                    
                        <div><img src={require(`../../all/${productId[index]}.jpg`)} alt="product-image" className='h-[12rem]' loading='lazy' /></div>
                        <div><i class={`bi bi-heart-fill text-gray-300 hover:text-red-500`} onClick={addToWishlist}></i></div>
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

                <div className='w-full flex justify-center mt-5 items-center'>
                    <button className='font-bold text-white bg-primary w-[10rem] h-[2.5rem] slide_right' onClick={handleClick}>{text}</button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Sale