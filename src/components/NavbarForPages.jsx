import React from 'react'
import { Link } from 'react-router-dom'

const NavbarForPages = () => {

  const wishlist = () => {

  }

  const register = () => {

  }

  return (
    <>
        <section>
            <div className='flex w-full justify-center items-center bg-[#4E4FEB] text-white gap-x-[3rem] h-[4rem] fixed top-0 z-10 drop-shadow-lg'>
                <div>
                    <Link to={'/'} className='font-bold text-xl'>DEV-COMMERCE</Link>
                </div>
                <div className='flex gap-x-8'>
                    <div><input type="text" placeholder='Search products...' className='outline-none p-3 w-[20rem] rounded-md h-[2rem] bg-white text-black text-sm' /></div>                    
                </div>
                <div className='flex gap-x-5 items-center'>                
                    <button onClick={wishlist}><i class="bi bi-heart text-[1.4rem] hover:text-red-500 transition-all duration-500"></i></button>
                    <button><i class="bi bi-cart3 text-[1.4rem]"></i></button> 
                    <button onClick={register} className='w-[6rem] h-[2.2rem] flex justify-center items-center border-opacity-75 font-semibold rounded-lg border border-[#4E4FEB] text-[#4E4FEB] bg-white hover:text-black slide-right-navbar hover:border-2 hover:border-white'>Sign Up</button>                  
                </div>
            </div>
        </section>
    </>
  )
}

export default NavbarForPages
