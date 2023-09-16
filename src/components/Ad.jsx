import React from 'react'
import tablet from '../images/featured_tablet.png'
import { motion } from 'framer-motion'

const Ad = () => {
  return (
    <>
        <section className='flex w-full gap-x-10 px-20'>
        <div className='flex bg-black opacity-100 p-10 rounded-lg px-12 w-3/4 justify-between'>
        <div className='flex flex-col'>
                <div className='text-md font-bold text-[#4E4FEB]'>TABLETS</div>
                <div className='mt-5 text-[2.3rem] tracking-[1.925px] text-white'>Discover Our <br /> Tablet Collection</div>                
                <div className='mt-10'>
                    <button className='bg-[#4E4FEB] text-white font-semibold flex justify-center items-center w-[10rem] h-[3rem] rounded-sm slide_right'>BUY NOW</button>
                </div>
            </div>

        <div className='flex justify-center items-center'>
            <img src={tablet} alt="tablet" />
        </div>       
        </div>     

        {/* <div className='relative cursor-pointer'>
                    <img src={tablet} alt="tablet" className='w-3/4' />
                </div>
                <div className='absolute flex flex-col text-white w-3/4 cursor-pointer'>
                    {/* {takeId === "1" ? <> */}
                        {/* <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className='bg-black w-[35rem] h-[34rem] bg-opacity-50 flex flex-col-reverse p-12'>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='font-semibold mt-2'>
                            <button className='w-[7rem] h-[2.5rem] bg-[#4E4FEB] rounded-md text-md tracking-wide slide_right'>View All</button>
                        </motion.div>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-[2.7rem] tracking-wide font-semibold'>Mobiles</motion.div>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-md font-semibold uppercase tracking-wide'>Brand New</motion.div>
                    </motion.div>  */}
                    {/* </> : null}                                                        */}
                {/* </div> */}

        <div className='w-1/4 flex justify-center items-center'>
        <div className='bg-white shadow-md w-[18rem] py-4 h-[20.5rem] flex flex-col px-8 border-t-blue-500 border-t-8 rounded-lg border-neutral-200'>
                <div className='font-semibold text-xl'>Explore Best-Selling <br /> Electronics for You</div>
                <div className='flex gap-x-5 mt-5'>
                    <div className='flex flex-col'>
                        <div className='border border-black w-[101px] h-20'></div>
                        <div className='text-xs mt-1'>Laptops</div>
                    </div>
                                    
                    <div className='flex flex-col'>
                        <div className='border border-black w-[101px] h-20'></div>
                        <div className='text-xs mt-1'>Purifier</div>
                    </div>          
                </div>
                <div className='flex gap-x-5 mt-5'>
                    <div className='flex flex-col'>
                        <div className='border border-black w-[101px] h-20'></div>
                        <div className='text-xs mt-1'>Fridge</div>
                    </div>               

                    <div className='flex flex-col'>
                        <div className='border border-black w-[101px] h-20'></div>
                        <div className='text-xs mt-1'>Washing Machine</div>
                    </div>               
                </div>               
            </div>
        </div>
        </section>
    </>
  )
}

export default Ad
