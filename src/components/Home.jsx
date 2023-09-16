import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Sale from './Sale'
import FeaturedProducts from './FeaturedProducts'
import FrequentlyPurchased from './FrequentlyPurchased'
import BasketProducts from './BasketProducts'
import Ad from './Ad'
import Services from './Services'
import Footer from './Footer'

const Home = () => {
  return (
    <>
        <section>
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

        {/* <br /> <br /> <br /> */}

        {/* <BasketProducts /> */}

        {/* <br /> <br /> <br /> */}

        {/* <FrequentlyPurchased /> */}

        {/* <br /> <br /> <br /> */}
        
        {/* <Ad /> */}

        <br /> <br /> <br />

        <FeaturedProducts />        

        <br /> <br /> <br /> <br /> <br /> <br />

        <Services />

        <br /> <br /> <br /> <br /> <br /> <br />

        <Footer />
    </>
  )
}

export default Home
