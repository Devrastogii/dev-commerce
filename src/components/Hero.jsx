import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigate = useNavigate()

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

    else if(id == "5") {
        navigate('/mobiles_page', {state: {id: 4}})
    }
  }

  return (
    <>
        <section> 
            <div className='flex justify-around'>
                <div className='flex flex-col text-xs font-semibold gap-y-3 mt-10 pl-6'>
                    <button onClick={() => navigatePage("1")}>Mobile Phones</button>
                    <button onClick={() => navigatePage("5")}>Tablets</button>
                    <button onClick={() => navigatePage("4")}>Laptops</button>
                    <button onClick={() => navigatePage("1")}>Appliances <span className='ml-2'><i class="bi bi-chevron-right"></i></span></button>
                    <button onClick={() => navigatePage("1")}>Peripheral Devices <span className='ml-2'><i class="bi bi-chevron-right"></i></span></button>
                </div>
                <div><hr className='h-[16.5rem] bg-black w-[1px] opacity-10 border-0' /></div>
                <div className='border border-black w-[55%] h-[40vh] mt-10'></div>
            </div>
        </section>
    </>
  )
}

export default Hero
