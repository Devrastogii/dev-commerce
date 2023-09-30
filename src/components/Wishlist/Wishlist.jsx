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
      console.log(data);
    }

    fetchData()
  }, [])

  return (
    <>    
      <NavbarForPages />
      <br /> <br />

        <section>
            <div className='flex flex-col mt-[2rem] px-10'>
              <div className='text-2xl font-semibold'>Wishlist({count})</div>
            </div>
        </section>
    </>
  )
}

export default Wishlist
