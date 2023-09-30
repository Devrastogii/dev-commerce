import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarForPages from '../Nav/NavbarForPages'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'

const SalesPage = () => {

  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [productOfferPrice, setProductOfferPrice] = useState([])
  const [productOff, setProductOff] = useState([])
  const [productId, setProductId] = useState([])
  const [productRating, setProductRating] = useState([])
  const [productTotalRating, setProductTotalRating] = useState([])
//   const [productImage, setProductImage] = useState([])
  const [productDescription, setProductDescription] = useState([])

  const [load, setLoad] = useState(true)

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
        
        // for (let index = 0; index < res.data.name.length; index++) {
        //     for (let j = 0; j < res.data.uid.length; j++) {                
        //         if((res.data.uid[index]  + '.jpg') === res.data.images[j]) {                    
        //             productImage.push(res.data.images[j])
        //         }
        //     }   
        // }
        
        setLoad(false)
        console.log(productName);
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

  const navigate = useNavigate()

  const navigateProductPage = (name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, productId) => {
    // console.log(name);
    navigate('/product-page', {state: {
        'name': name,
        'rating': productRating,
        'totalRating': productTotalRating,
        'description': productDescription,
        'offer': productOfferPrice,
        'price': productPrice,
        'off': productOff,
        'image': productId,
        // 'sale': 'sale',
        'id': 8    
    }})
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
                    <div className='flex flex-col cursor-pointer w-[12rem]' onMouseEnter={() => handleHover("yes", index)} onMouseLeave={() =>handleHover("no", index)} onClick={() => navigateProductPage(val, productRating[index], productTotalRating[index], productDescription[index], productOfferPrice[index], productPrice[index], productOff[index], productId[index])}>
                    <div className='flex justify-center'>                    
                        <img src={require(`../../all/${productId[index]}.jpg`)} alt="product-image" className='h-[12rem]' loading='lazy' />
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
    </>
  )
}

export default SalesPage
