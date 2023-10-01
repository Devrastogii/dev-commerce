import React, { useEffect, useState } from 'react'
import NavbarForPages from '../Nav/NavbarForPages'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const Wishlist = () => {

  const [count, setCount] = useState(0)

  const [productDetails, setProductDetails] = useState({
    productName: [],
    productPrice: [],
    productOfferPrice: [],
    productOff: [],
    productRating: [],
    productTotalRating: [],
    productId: [],
    productDescription: []
  })

  useEffect(() => {
    async function fetchData() {
      const data = await getDocs(collection(db, 'wishlist'))
      
      data.forEach((doc) => {
        
        productDetails.productName.push(doc.data().productName)
        productDetails.productPrice.push(doc.data().productPrice)
        productDetails.productOfferPrice.push(doc.data().productOfferPrice)
        productDetails.productOff.push(doc.data().productOff)
        productDetails.productRating.push(doc.data().productRating)
        productDetails.productTotalRating.push(doc.data().productTotalRating)
        productDetails.productDescription.push(doc.data().productDescription)

        console.log(doc.data());
             
      })
    }

    fetchData()

    setCount(productDetails.productName.length)
  }, [])

  return (
    <>    
      <NavbarForPages />
      <br /> <br />

        <section>
            <div className='flex flex-col mt-[2rem] px-10'>
              <div className='text-2xl font-semibold'>Wishlist({count})</div>
            </div>
            
            <div className='mt-10'>
              {productDetails.productName.map((v, i) => {
                return (
                  <>
                    <div className='flex gap-x-2'>
                      <div>Image</div>
                      <div className='flex flex-col'>
                        <div>{v}</div>
                        <div className='flex gap-x-4 mt-2 items-center h-auto'>
                          <div className='bg-primary text-white rounded-lg w-[3.6rem] h-[1.7rem] text-xs flex justify-center items-center'>{productDetails.productRating[i]} <i class="bi bi-star-fill text-xs ml-1"></i></div>
                          <div className='text-gray-500 font-semibold -mt-1'>{productDetails.productTotalRating[i]} Ratings</div> 
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
        </section>
    </>
  )
}

export default Wishlist
