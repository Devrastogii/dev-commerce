import React, { useState } from 'react'
import monitor from '../../images/featured_monitor.jpg'
import watch from '../../images/featured_watch.jpg'
import mobile from '../../images/featured_mobile.jpg'
import laptop from '../../images/featured_laptop.jpeg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const FeaturedProducts = () => {

  const [takeId, setId] = useState(0)
  const navigate = useNavigate()

  const handleHover = (id) => {
    setId(id) 
  }

  const navigatePage = (id) => {
    if(id == "1"){
        navigate('/mobiles_page', {state: {id: 0}})
    }

    else if(id == "2") {
        navigate('/mobiles_page', {state: {id: 1}})
    }

    else if(id == "3") {
        navigate('/mobiles_page', {state: {id: 2}})
    }

    else if(id == "4") {
        navigate('/mobiles_page', {state: {id: 3}})
    }
  }

  return (
    <>
        <section className='pl-20 relative'>
            <div className='flex items-center'>
                <div className='w-4 h-8 rounded-md bg-primary'></div>
                <div className='ml-2 text-sm font-semibold text-primary'>Best Products</div>
            </div>

            <div className='mt-3 flex gap-x-10'>
                <div className='text-3xl font-semibold'>Featured Electronics</div>
                <div></div>
            </div>

            <div className='mt-7 grid grid-cols-2'>
                <div className='relative cursor-pointer'>
                    <img src={mobile} alt="tablet" className='w-[35rem] h-[34rem]' />
                </div>
                <div className='absolute flex flex-col text-white w-[35rem] h-[34rem] cursor-pointer' onMouseEnter={() => handleHover("1")} onMouseLeave={() => handleHover("0")}>
                    {takeId === "1" ? <>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className='bg-black w-[35rem] h-[34rem] bg-opacity-50 flex flex-col-reverse p-12'>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='font-semibold mt-2'>
                            <button className='w-[7rem] h-[2.5rem] bg-primary rounded-md text-md tracking-wide slide_right' onClick={() => navigatePage("1")}>View All</button>
                        </motion.div>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-[2.7rem] tracking-wide font-semibold'>Mobiles</motion.div>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-md font-semibold uppercase tracking-wide'>Brand New</motion.div>
                    </motion.div> 
                    </> : null}                                                       
                </div>
                <div className='relative flex flex-col'>
                    <div className='relative'>
                        <img src={laptop} alt="laptop" className='w-[30rem] h-[17rem]' />
                    </div>

                <div className='absolute flex flex-col text-white w-[30rem] h-[17rem] cursor-pointer' onMouseEnter={() => handleHover("2")} onMouseLeave={() => handleHover("0")}>
                {takeId === "2" ? <>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className='bg-black w-[30rem] h-[17rem] bg-opacity-50 flex flex-col-reverse p-10'>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='font-semibold mt-2'>
                            <button className='w-[6rem] h-[2.3rem] bg-primary rounded-md text-md tracking-wide slide_right' onClick={() => navigatePage("4")}>View All</button>
                        </motion.div>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-[2.4rem] tracking-wide font-semibold'>Laptops</motion.div>
                        <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-md font-semibold uppercase tracking-wide'>Quality</motion.div>
                    </motion.div>                    
                </> : null}                    
                </div>

                    <div className='mt-8 flex gap-x-8'>
                       <div className='relative'>
                       <div>
                            <img src={watch} alt="tablet" className='w-[14rem] h-[15rem]' />
                        </div>

                        <div className='absolute bottom-0 flex w-[14rem] h-[15rem] flex-col text-white cursor-pointer' onMouseOver={() => handleHover("3")} onMouseLeave={() => handleHover("0")}>
                        {takeId === "3" ? <>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className='bg-black w-[14rem] h-[15rem] bg-opacity-50 flex flex-col-reverse p-6'>
                                <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='font-semibold mt-2'>
                                    <button className='w-[4.5rem] h-[2.1rem] bg-primary rounded-md text-xs tracking-wide slide_right' onClick={() => navigatePage("3")}>View All</button>
                                </motion.div>
                            <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-[2rem] tracking-wide font-semibold'>WATCHES</motion.div>
                            <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-md font-semibold uppercase tracking-wide'>New</motion.div>
                            </motion.div>                    
                        </> : null}                            
                        </div>
                       </div>

                        <div className='relative'>
                        <div>
                            <img src={monitor} alt="monitor" className='w-[14rem] h-[15rem]' />
                        </div>

                        <div className='absolute bottom-0 flex w-[14rem] h-[15rem] flex-col text-white cursor-pointer' onMouseOver={() => handleHover("4")} onMouseLeave={() => handleHover("0")}>
                        {takeId === "4" ? <>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className='bg-black w-[14rem] h-[15rem] bg-opacity-50 flex flex-col-reverse p-6'>
                                <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='font-semibold mt-2'>
                                    <button className='w-[4.5rem] h-[2.1rem] bg-primary rounded-md text-xs tracking-wide slide_right' onClick={() => navigatePage("2")}>View All</button>
                                </motion.div>
                            <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-[2rem] tracking-wide font-semibold'>Monitors</motion.div>
                            <motion.div initial={{translateX: -50}} animate={{translateX: 0}} className='text-md font-semibold uppercase tracking-wide'>Fresh Out</motion.div>
                            </motion.div>  
                        </> : null}                                              
                        </div>
                        </div>
                    </div>                   
                </div>
            </div>
        </section>
    </>
  )
}

export default FeaturedProducts
