import React, { useState } from 'react'
import NavbarForPages from '../Nav/NavbarForPages'

const Wishlist = () => {

  const [count, setCount] = useState(0)

  return (
    <>    
      <NavbarForPages />
      <br /> <br />

        <section>
            <div className='flex flex-col mt-[2rem] px-10'>
              <div className='text-2xl font-semibold'>Wishlist({count})</div>
            </div>
        </section>
    </>
  )
}

export default Wishlist
