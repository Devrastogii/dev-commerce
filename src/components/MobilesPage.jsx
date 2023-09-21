import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Filter from './FilterSection/Filter'

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
        'category': category
    }})

    console.log(image, category);
  }

  return (
    <>
        <br />
        <Navbar />

        <section className='mt-10 px-5'>
            <div className='flex gap-x-5'>
                <div className='w-1/4 bg-white drop-shadow-lg h-full'>
                    <Filter brand = {brandName} 
                          ram = {ram} />
                </div>
                <div className='w-3/4 bg-white drop-shadow-lg py-2 px-4'>
                    <div className='text-sm'>Home</div>
                    <div className='font-semibold mt-[0.45rem] text-lg'>Showing 1 - 20 of {productName.length} results for {image_category[id]}</div>
                    <div className='flex gap-x-5 mt-[0.45rem] text-sm'>
                        <div className='font-semibold'>Sort By</div>
                        <div>Relevance</div>
                        <div>Price--Low to High</div>
                        <div>Price--High to Low</div>
                        <div>Newest First</div>
                    </div>       
                    <div className='mt-5'><hr className='opacity-10 border-0 h-[1px] bg-black' /></div>
                    <div>
                        {productName.slice(0,20).map((val, index) => {                            
                            return (
                                <>
                                    <div className='flex mt-10 gap-x-3 cursor-pointer' onMouseEnter={() => handleHover("yes", index)} onMouseLeave={() =>handleHover("no", index)} onClick={() => navigateProductPage(val, productRating[index], productTotalRating[index], productDescription[index], productOfferPrice[index], productPrice[index], productOff[index], productId[index], image_category[id])}>
                                        <div className='flex gap-x-5'>
                                            <div className='px-1 w-[15rem] h-[22rem] flex justify-center'><img src={require(`../cat_images/${image_category[id]}/${productId[index]}.jpg`)} className='w-[13rem] h-[20rem]' loading='lazy' /></div>
                                            <div className='flex flex-col'>
                                            <div className={`font-semibold text-xl w-[30rem] ${hoverState && (indepIndex === index) ? 'text-[#4E4FEB]': 'text-black'}`}>{val}</div>
                                            <div className='flex gap-x-4 mt-2 items-center h-auto'>
                                                <div className='bg-[#4E4FEB] text-white rounded-lg w-[3.2rem] h-6 text-xs flex justify-center items-center'>{productRating[index]} <i class="bi bi-star-fill text-xs ml-1"></i></div>
                                                <div className='text-gray-500 font-semibold -mt-1'>{productTotalRating[index]} Ratings</div> 
                                            </div>
                                            <div className='mt-3 px-5'>
                                                <ul className='list-disc'>
                                                    {productDescription[index].slice(0, 6).map((v, i) => {

                                                        const splitIndex = 40;

                                                        productDescription[i][productDescription[i].length-1] = productDescription[i][productDescription[i].length-1].slice(0, splitIndex);  // Slicing last point in description                                                     

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
                                                <div className='font-bold text-2xl'>₹{productOfferPrice[index]}</div>
                                            <div className='flex gap-x-2 mt-1'>
                                                <div className='line-through text-gray-500 text-sm font-semibold'>₹{productPrice[index]}</div>
                                                <div className='text-[#4E4FEB] text-sm font-semibold'>{productOff[index]}% off</div>
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
                    <div>Page 1 of {Math.floor(totalPages / 20)}</div>
                    <div className='flex gap-x-5'>
                        <div>
                            <button className='border border-[#4E4FEB] bg-white text-[#4E4FEB] w-[11rem] h-[2.2rem]'>PREVIOUS PAGE</button>
                        </div>      
                        <div>
                            <button className='border border-[#4E4FEB] bg-white text-[#4E4FEB] w-[11rem] h-[2.2rem]'>NEXT PAGE</button>
                        </div>      
                    </div>
                </div>
                </div>
            </div>
        </section>        
    </>
  )
}

export default MobilesPage
