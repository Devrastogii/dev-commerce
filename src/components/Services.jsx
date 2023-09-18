import React from 'react'

const Services = () => {
  return (
    <>
        <section>
            <div className='w-full justify-center flex gap-x-10'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-16 h-16 rounded-full bg-gray-300 flex justify-center items-center'>
                        <div className='w-12 h-12 rounded-full bg-black flex justify-center items-center'>
                            <i class="bi bi-truck text-white text-[1.5rem]"></i>
                        </div>
                    </div>
                    <div className='text-lg font-bold mt-5'>FREE AND FAST DELIVERY</div>
                    <div className='text-xs mt-1'>Free delivery for all orders over ₹500</div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-16 h-16 rounded-full bg-gray-300 flex justify-center items-center'>
                        <div className='w-12 h-12 rounded-full bg-black flex justify-center items-center'>
                            <i class="bi bi-headset text-white text-[1.5rem]"></i>
                        </div>
                    </div>
                    <div className='text-lg font-bold mt-5'>24/7 CUSTOMER SERVICE</div>
                    <div className='text-xs mt-1'>Friendly 24/7 customer support</div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-16 h-16 rounded-full bg-gray-300 flex justify-center items-center'>
                        <div className='w-12 h-12 rounded-full bg-black flex justify-center items-center'>
                            <i class="bi bi-coin text-white text-[1.5rem]"></i>
                        </div>
                    </div>
                    <div className='text-lg font-bold mt-5'>MONEY BACK GAURANTEE</div>
                    <div className='text-xs mt-1'>We return money within 7 business day</div>
                </div>
            </div>
             {/* <i class="bi bi-coin"></i> */}
                    {/* <i class="bi bi-headset"></i> */}
        </section>
    </>
  )
}

export default Services
