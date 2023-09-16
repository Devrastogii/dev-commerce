import React from 'react'

const Hero = () => {
  return (
    <>
        <section> 
            <div className='flex justify-around'>
                <div className='flex flex-col text-xs font-semibold gap-y-3 mt-10 pl-6'>
                    <div>Mobile Phones</div>
                    <div>Tablets</div>
                    <div>Laptops</div>
                    <div>Appliances <span className='ml-2'><i class="bi bi-chevron-right"></i></span></div>
                    <div>Peripheral Devices <span className='ml-2'><i class="bi bi-chevron-right"></i></span></div>
                </div>
                <div><hr className='h-[16.5rem] bg-black w-[1px] opacity-10 border-0' /></div>
                <div className='border border-black w-[55%] h-[40vh] mt-10'></div>
            </div>
        </section>
    </>
  )
}

export default Hero
