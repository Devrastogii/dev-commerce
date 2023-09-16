import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import file from '../all/'

const Sale = () => {

  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [productOfferPrice, setProductOfferPrice] = useState([])
  const [productOff, setProductOff] = useState([])
  const [productRating, setProductRating] = useState([])
  const [productTotalRating, setProductTotalRating] = useState([])
  const [productImage, setProductImage] = useState([])
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
        // setProductImage(res.data.images)  

        console.log(res.data.name);
        console.log(res.data.images);

        for (let index = 0; index < res.data.name.length; index++) {
            for (let j = 0; j < res.data.uid.length; j++) {                
                if((res.data.uid[index]  + '.jpg') === res.data.images[j]) {                    
                    productImage.push(res.data.images[j])
                }
            }   
        }

        console.log(productImage[0] === 'WOHT1MNH.jpg');
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

  return (
    <>
        <section className='pl-20'>
            <div className='flex items-center'>
                <div className='w-4 h-8 rounded-md bg-[#4E4FEB]'></div>
                <div className='ml-2 text-sm font-semibold text-[#4E4FEB]'>Today's</div>
            </div>

            <div className='mt-3 flex gap-x-10'>
                <div className='text-3xl font-semibold'>Flash Sales</div>
                <div></div>
            </div>

            <div className='mt-7 flex gap-10 px-5 justify-between flex-wrap'>
                {productName.slice(0, singleClick ? 10 : 5).map((val, index) => {

                    const splitIndex = 20;

                    const part1 = val[0].slice(0, splitIndex);
                    const part2 = val[0].slice(splitIndex, 40);

                    return (
                        <>
                        <div className='flex flex-col'>
                    <div>                    
                        <img src={require(`../all/${productImage[index]}`)} alt="product-image" className='h-[12rem]' loading='lazy' />
                    </div>
                    <div className='font-semibold mt-4'>{part1} <br /> {part2}</div>
                    <div className='flex gap-x-2 items-center mt-3'>
                        <div className='bg-[#4E4FEB] text-white rounded-lg w-12 h-6 text-sm flex justify-center items-center'>{productRating[index]}</div>
                        <div className='text-gray-500 font-semibold'>({productTotalRating[index]})</div>                 
                    </div>
                    <div className='mt-3'><span className='font-semibold'>₹{productOfferPrice[index]}</span> <span className='line-through text-gray-500 text-sm font-semibold'>₹{productPrice[index]}</span><span className='text-[#4E4FEB] ml-2 font-semibold text-sm'>{productOff[index]}% off</span></div>
                </div>
                        </>
                    )
                })}

                <div className='w-full flex justify-center mt-5 items-center'>
                    <button className='font-bold text-white bg-[#4E4FEB] w-[10rem] h-[2.5rem] slide_right' onClick={handleClick}>{text}</button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Sale
