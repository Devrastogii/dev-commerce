import React from 'react'

const Discount = () => {

  const mapLength = [50, 40, 30, 20, 10];

  return (
    <>
        <div className='font-medium'>DISCOUNT</div>
        
            <div className='mt-3 mb-5'>
                {mapLength.map((v, i) => {
                    return (
                        <>
                            <div className='flex gap-x-2'>
                                <div><input type="checkbox" name={v} id={i} /></div>
                                <div className='text-sm'>{v}% or more</div>
                            </div>
                        </>
                    )
                })}
            </div>
    </>
  )
}

export default Discount
