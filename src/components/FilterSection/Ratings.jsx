import React from 'react'

const Ratings = () => {
  return (
    <>
        <div className='font-medium'>CUSTOMER RATINGS</div>

        <div className='flex gap-x-2 text-sm mt-4'>
            <div><input type="checkbox" /></div>
            <div>4 <i class="bi bi-star-fill text-xs"></i> & Above</div>
        </div>

        <div className='flex gap-x-2 mt-2 text-sm'>
            <div><input type="checkbox" /></div>
            <div>3 <i class="bi bi-star-fill text-xs"></i> & Above</div>
        </div>
    </>
  )
}

export default Ratings
