import React from 'react'

const Ram = (props) => {

  return (
    <>
        <div className='font-medium'>RAM</div>

        <div className='mt-3'>
                {props.ram.map((v, i) => {
                    return (
                        <>
                            <div className='flex gap-x-2'>
                                <div><input type="checkbox" name={v} id={i} /></div>
                                <div className='text-sm'>{v}</div>
                            </div>
                        </>
                    )
                })}
            </div>        
    </>
  )
}

export default Ram
