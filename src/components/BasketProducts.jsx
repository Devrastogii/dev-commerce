import React from 'react'

const BasketProducts = () => {
  return (
   <>
    <section className='px-20 h-[100vh]'>
            <div className='flex items-center'>
                <div className='w-4 h-8 rounded-md bg-[#4E4FEB]'></div>
                <div className='ml-2 text-sm font-semibold text-[#4E4FEB]'>Basket's</div>
            </div>

            <div className='mt-3 flex gap-x-10'>
                <div className='text-3xl font-semibold'>Product Baskets</div>
                <div></div>
            </div>

        <div className='flex mt-16 gap-x-10'>           
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

            <div className='bg-white shadow-md w-[18rem] py-4 h-[20.5rem] flex flex-col px-8 border-t-blue-500 border-t-8 rounded-lg border-neutral-200'>
                <div className='font-semibold text-xl'>Make Smart Choices, <br /> Shop Smartly</div>
                <div className='flex gap-x-5 mt-5'>
                    <div className='flex flex-col'>
                        <div className='border border-black w-[101px] h-20'></div>
                        <div className='text-xs mt-1'>Smartwatchs</div>
                    </div>
                                    
                    <div className='flex flex-col'>
                        <div className='border border-black w-[101px] h-20'></div>
                        <div className='text-xs mt-1'>Mobiles</div>
                    </div>          
                </div>
                <div className='flex gap-x-5 mt-5'>
                    <div className='flex flex-col'>
                        <div className='border border-black w-[101px] h-20'></div>
                        <div className='text-xs mt-1'>Tablets</div>
                    </div>               

                    <div className='flex flex-col'>
                        <div className='border border-black w-[101px] h-20'></div>
                        <div className='text-xs mt-1'>Monitors</div>
                    </div>               
                </div>               
            </div>
            
        </div>  
    </section>
   </>
  )
}

export default BasketProducts
