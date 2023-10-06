import React from 'react'
import { useNavigate } from 'react-router-dom'
import banner from '../../images/banner.png'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverCloseButton,
  } from '@chakra-ui/react'

const Hero = () => {

  const navigate = useNavigate()

  const navigatePage = (id) => {
    if(id === "1"){
        navigate('/mobiles_page', {state: {id: 0}})
    }

    else if(id === "2") {
        navigate('/mobiles_page', {state: {id: 1}})
    }

    else if(id === "3") {
        navigate('/mobiles_page', {state: {id: 2}})
    }

    else if(id === "4") {
        navigate('/mobiles_page', {state: {id: 3}})
    }

    else if(id === "5") {
        navigate('/mobiles_page', {state: {id: 4}})
    }

    else if(id === "6") {
        navigate('/mobiles_page', {state: {id: 5}})
    }

    else if(id === "7") {
        navigate('/mobiles_page', {state: {id: 6}})
    }

    else if(id === "8") {
        navigate('/mobiles_page', {state: {id: 7}})
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

                    <Popover placement='right' isLazy>
                        <PopoverTrigger>
                            <button>Appliances <span className='ml-2'><i class="bi bi-chevron-right"></i></span></button>
                        </PopoverTrigger>
                        <PopoverContent bg='black' color = 'white'>                  
                        <PopoverCloseButton color='white' />                        
                        <PopoverBody><div className='flex gap-x-5'>                            
                                <div><button onClick={() => navigatePage("7")}>Washing Machine</button></div>
                                <div><button onClick={() => navigatePage("6")}>Fridge</button></div>
                                <div><button onClick={() => navigatePage("8")}>Purifier</button></div>                                                   
                        </div></PopoverBody>
                    </PopoverContent> 
                    </Popover>
                    
                    <button onClick={() => navigatePage("2")}>Monitors</button>
                    <button onClick={() => navigatePage("3")}>Watches</button>
                </div>
                <div><hr className='h-[16.5rem] bg-black w-[1px] opacity-10 border-0' /></div>
                <div className='w-[55%] h-[40vh] mt-10'>
                    <img src={banner} alt="banner" className='h-[40vh]' loading='lazy' />
                </div>
            </div>
        </section>
    </>
  )
}

export default Hero
