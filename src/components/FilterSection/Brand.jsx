import React, { useState } from 'react'

const Brand = (props) => {

  const show = 6
  const [click, setClick] = useState(false)
  const text = "Show Less"

  const showAllBrands = () => {
    setClick(!click)  
  }

  const [checkArr, setCheckArr] = useState([])

  const handleCheckbox = (v) => {
    setCheckArr((prev) => [...prev, v])
  }
  
  return (
    <>
        <div className='font-medium'>BRAND</div>
            <div className='mt-2'><input type="text" placeholder='Search Brand' className='opacity-50 text-sm pl-2 border-b-black border border-t-0 border-l-0 border-r-0 outline-0' /></div>
            <div className='mt-3'>
                {props.brand.slice(0, click ? props.brand.length-1 : show)?.map((v, i) => {
                    return (
                        <>
                            <div className='flex gap-x-2'>
                                <div><input type="checkbox" name={v} value={v} id={i} onChange={() => handleCheckbox(v)} /></div>
                                <div className='text-sm'>{v}</div>
                            </div>
                        </>
                    )
                })}
            </div>
            
            {!click ? <>
                <button className='text-primary mt-2 ml-1 font-semibold text-sm' onClick={showAllBrands}>+{props.brand.length-7} More</button>
            </> : <button className='text-primary mt-2 ml-1 font-semibold text-sm' onClick={showAllBrands}>{text}</button>}            
    </>
  )
}

export default Brand
