import React, { useState } from 'react'

const Brand = (props) => {

  const [show, showMore] = useState(6)
  const [click, setClick] = useState(false)

  return (
    <>
        <div className='font-medium'>BRAND</div>
            <div className='mt-2'><input type="text" placeholder='Search Brand' className='opacity-50 text-sm pl-2 border-b-black border outline-0' /></div>
            <div className='mt-3'>
                {props.brand.slice(0, click ? props.brand.length-1 : show).map((v, i) => {
                    return (
                        <>
                            <div className='flex gap-x-2'>
                                <div><input type="checkbox" name={v} id={i} /></div>
                                <div>{v}</div>
                            </div>
                        </>
                    )
                })}
            </div>

            <div className='text-[#4E4FEB] mt-2 ml-1 font-semibold text-sm'>+{props.brand.length-7} More</div>
    </>
  )
}

export default Brand
