import React from 'react'
import Brand from './Brand'
import Ratings from './Ratings'

const Filter = (props) => {  

  return (
    <>
        <div className='text-lg font-semibold py-3 px-4'>Filters</div>
        <div className='mt-1'><hr className='opacity-10 border-0 h-[1px] bg-black' /></div>

        {/* Brand Filter */}

        <div className='flex flex-col py-3 px-4'>
            <Brand brand = {props.brand} />
        </div>

        {/* Ratings Filter */}

        <div className='flex flex-col py-3 px-4'>
            <Ratings />
        </div>
    </>
  )
}

export default Filter
