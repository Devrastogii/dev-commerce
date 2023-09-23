import React, { useEffect, useState } from 'react'
import Navbar from '../Nav/Navbar'
import Hero from './Hero'
import Sale from '../Sales/Sale'
import FrequentlyPurchased from '../Frequent/FrequentlyPurchased'
import FeaturedProducts from '../Home/FeaturedProducts'
import Services from './Services'
import Footer from './Footer'
import Loading from '../Loading/Loading'

const Home = () => {

  const [show, setShow] = useState(true);

  useEffect(() => {
    const f = setTimeout(() => {
      setShow(false)
    }, 1000); 

    return () => {      
      clearTimeout(f)
  };

  }, [])

  return (
    <>
        {show ? <Loading /> : <> <section>
            <div className='w-full h-10 bg-black flex justify-center items-center'>
                <h1 className='text-white text-sm'><span className='opacity-90'>Summer Sale on Tablets and Free Delivery - 30% OFF</span><span className='ml-3 font-bold underline'><a>Shop Now</a></span></h1>
            </div>
        </section>

        <br />

        <Navbar />

        <div className='mt-5'><hr className='opacity-10 border-0 h-[1px] bg-black' /></div>    

        <Hero />

        <br /> <br /> <br />

        <Sale />

        <br /> <br /> <br />

        <FeaturedProducts />   

        <br /> <br /> <br />

        <FrequentlyPurchased />     

        <br /> <br /> <br /> <br /> <br /> <br />

        <Services />

        <br /> <br /> <br /> <br /> <br /> <br />

        <Footer />

      </>
        }
    </>
  )
}

export default Home
