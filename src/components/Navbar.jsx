import React from 'react'

const Navbar = () => {
  return (
    <>
        <section>
            <div className='flex w-full justify-around items-center'>
                <div>
                    <h1 className='font-bold text-xl'>DEV-COMMERCE</h1>
                </div>
                <div className='flex gap-x-8'>
                    <div>Home</div>
                    <div>Contact</div>
                    <div>About</div>
                    <div>Sign Up</div>
                </div>
                <div className='flex gap-x-3'>
                    <div>search bar</div>
                    <div>wishlist</div>
                    <div>cart</div>
                    <div>account</div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Navbar
