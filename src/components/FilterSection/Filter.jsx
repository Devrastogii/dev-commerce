import React from 'react'
import Brand from './Brand'
import Ratings from './Ratings'
import Ram from './Ram'
import Discount from './Discount'

const Filter = (props) => {  

  return (
    <>
        <div className='text-lg font-semibold py-3 px-4'>Filters</div>
        <div className='mt-1'><hr className='opacity-[0.08] border-0 h-[1px] bg-black' /></div>

        {/* Brand Filter */}

        <div className='flex flex-col py-3 px-4'>
            <Brand brand = {props.brand} />
        </div>

        <div className='mt-5'><hr className='opacity-[0.08] border-0 h-[1px] bg-black' /></div>

        {/* Ratings Filter */}

        <div className='flex flex-col py-3 px-4'>
            <Ratings />
        </div>

        <div className='mt-5'><hr className='opacity-[0.08] border-0 h-[1px] bg-black' /></div>

        {/* Ram Filter */}

        {props.ram.length > 0 && <>
          <div className='flex flex-col py-3 px-4'>
            <Ram ram = {props.ram} />
          </div>
          
          <div className='mt-5'><hr className='opacity-[0.08] border-0 h-[1px] bg-black' /></div>
        </>}                

        {/* Discount Filter */}

        <div className='flex flex-col py-3 px-4'>
            <Discount />
        </div>
    </>
  )
}

export default Filter
