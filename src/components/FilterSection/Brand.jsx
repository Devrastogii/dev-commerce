import React, { useEffect, useState } from 'react'

const Brand = (props) => {

  const [show, showMore] = useState(6)
  const [click, setClick] = useState(false)
  const [text, showText] = useState("Show Less")

//   const [filterArray, setFilterArray] = useState(props.brand)
//   const [brandArray, setBrandArray] = useState([])

//   useEffect(() => {
//     console.log(filterArray);
//   }, [])

  const showAllBrands = () => {
    setClick(!click)  
  }

//   const handleCheckbox = (e) => {
//     setBrandArray((prev) => [...prev, e.target.value])
//     // props.brand = props.brand.filter((p) => p != e.target.value)
//   }

  return (
    <>
        <div className='font-medium'>BRAND</div>
            <div className='mt-2'><input type="text" placeholder='Search Brand' className='opacity-50 text-sm pl-2 border-b-black border border-t-0 border-l-0 border-r-0 outline-0' /></div>
            <div className='mt-3'>
                {props.brand.slice(0, click ? props.brand.length-1 : show)?.map((v, i) => {
                    return (
                        <>
                            <div className='flex gap-x-2'>
                                <div><input type="checkbox" name={v} value={v} id={i} /></div>
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
