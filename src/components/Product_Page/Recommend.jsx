import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

  const [hoverState, setHoverState] = useState(false)
  const [indepIndex, setIndepIndex] = useState()

  const id = props.id
  const navigate = useNavigate()

  // Common Function

  async function getData(){
    const res = await axios.post('/product-recommend', {name, id})
    setProductName(res.data.name)
    setProductPrice(res.data.original)
    setProductOfferPrice(res.data.offer)
    setProductRating(res.data.rating)
    setProductTotalRating(res.data.total_ratings)
    setProductOff(res.data.off)   
    setProductId(res.data.uid)   
    setProductDescription(res.data.description)    
  } 
    

  useEffect(() => {     
    getData()
  }, [])

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)  

  const handleSlide = () => {    
    if(end < productName.length) {
        setStart((prevStart) => prevStart + 1);
        setEnd((prevEnd) => prevEnd + 1);
    }     
  }

  const handlePreviousSlide = () => {
    if(start > 0) {
        setStart((prevStart) => prevStart - 1);
        setEnd((prevEnd) => prevEnd - 1);
    }    
  }

  const handleHover = (text, index) => {
    if(text == "yes") {
        setHoverState(true)
        setIndepIndex(index)      
    }

    else 
        setHoverState(false)
  }

  const navigateProductPage = (name, productRating, productTotalRating, productDescription, productOfferPrice, productPrice, productOff, image, category, newImgName) => {       

    console.log(image);

    {props.text("ADD TO CART")}

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    {props?.sale ? navigate('/product-page', {state: {
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
        'newImageName': newImgName,
        'origin': 'sale'
    }}) : props?.frequent ? navigate('/product-page', {state: {
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
        'newImageName': newImgName, 
        'forigin': 'frequent'    
    }}) : navigate('/product-page', {state: {
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
        'newImageName': newImgName,     
    }})}      
    
    getData()  
  }

  return (
    <>
        <div className='w-full bg-white flex flex-col p-4'>
            <div className='font-bold text-2xl'>Similar Products</div>
            <div className='flex'>

            {start >= 1 && <div className='flex justify-center items-center h-[15rem] absolute left-0 mt-5'>
                <div className='flex bg-white justify-center items-center drop-shadow-2xl rounded-xl w-[3rem] h-[6rem]'>
                    <button onClick={handlePreviousSlide}><i class="bi bi-chevron-double-left text-black text-2xl outline-none"></i></button>
                </div>
            </div>}
            
            <div className='mt-5 flex gap-x-8 overflow-x-hidden'>
                {productName.slice(start, end+1).map((v, i) => {
                    return (
                        <>
                            <div className='flex flex-col w-[14rem] gap-y-1 cursor-pointer' id='recommend-scroll-div' onMouseEnter={() => handleHover("yes", start+i)} onMouseLeave={() =>handleHover("no", start+i)} onClick={() => navigateProductPage(v, productRating[start+i], productTotalRating[start+i], productDescription[start+i], productOfferPrice[start+i], productPrice[start+i], productOff[start+i], productId[start+i], props.category, props.newImgName)} >                                

                                <div className='w-[12rem] h-[15rem] flex justify-center items-center'>

                                {props?.sale ? <img src={require(`../../all/${productId[start+i]}.jpg`)} alt="product-image" className='h-[13rem]' /> : props?.frequent ? <img src={require(`../../frequent_images/${productId[start+i]}.jpg`)} alt="product-image" className='h-[13rem]' /> : <img src={require(`../../cat_images/${props.category}/${props.newImgName}${productId[start+i]}.jpg`)} alt="product-image" className='h-[13rem]' />}                                 
                           
                                </div>                          

                                <div className={`mt-1 w-[12rem] ${hoverState && (indepIndex === start + i) ? 'text-primary font-semibold': 'text-black'} transition-all duration-500`}>{v}</div>
                                <div className='flex gap-x-2 items-center mt-1'>
                                    <div className='bg-primary text-white rounded-lg w-12 h-6 text-sm flex justify-center items-center'>{productRating[start+i]}</div>
                                    <div className='text-gray-500 font-semibold'>({productTotalRating[start+i]})</div>                 
                                </div>
                                <div className='mt-1'><span className='font-semibold'>₹{productOfferPrice[start+i]}</span> <span className='line-through text-gray-500 text-sm font-semibold ml-1'>₹{productPrice[start+i]}</span><span className='text-primary ml-2 font-semibold text-sm'>{productOff[start+i]}%</span></div>

                            </div>
                        </>
                    )
                })}
            </div>

            <div className='flex justify-center items-center h-[15rem] absolute right-0 mt-5 bg-white'>
                <div className='flex bg-white justify-center items-center drop-shadow-2xl rounded-xl w-[3rem] h-[6rem]'>
                    <button onClick={handleSlide}><i class="bi bi-chevron-double-right text-black text-2xl outline-none cursor-pointer"></i></button>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Recommend