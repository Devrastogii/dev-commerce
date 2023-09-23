import React, { useRef, useState } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [reg, setReg] = useState(false)
  const [log, setLog] = useState(false)

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const register = () => {
    onOpen()
    setReg(true)
    setLog(false)
  }

  const login = () => {
    setReg(false)
    setLog(true)
    onOpen()
  }

  const wishlist = () => {

  }

  return (
    <>
        <section>
            <div className='flex w-full justify-around items-center'>
                <div>
                    <Link to={'/'} className='font-bold text-xl'>DEV-COMMERCE</Link>
                </div>
                <div className='flex gap-x-8'>
                    <div><input type="text" placeholder='Search products...' className='outline-none p-4 w-[24rem] rounded-xl h-[2.5rem] opacity-60 border border-opacity-25 border-black' /></div>                    
                </div>
                <div className='flex gap-x-5 items-center'>                
                    <button onClick={wishlist}><i class="bi bi-heart text-[1.4rem] hover:text-red-500 transition-all duration-500"></i></button>
                    <button><i class="bi bi-cart3 text-[1.4rem]"></i></button> 
                    <button onClick={register} className='w-[6rem] h-[2.5rem] flex justify-center items-center border-opacity-75 font-semibold rounded-lg border border-primary text-primary bg-white hover:text-white slide-right-home-navbar'>Sign Up</button>                  
                </div>
            </div>
        </section>

        {reg ? <>
                <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>         
            <Register />
            <div className="flex justify-center mt-2 mb-5">
            <h1 className='text-sm'>Existing User? <button onClick={login} className='text-black text-sm font-bold underline hover:-translate-y-1 transition-all duration-500'>LOG IN</button></h1>
          </div>
          </ModalBody>
        </ModalContent>
      </Modal>
            </> : null }

        {log ? <>
                <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>       
            <Login />
            <div className="flex justify-center mt-2 mb-5">
            <h1 className='text-sm'>New User? <button onClick={register} className='text-black text-sm font-bold underline hover:-translate-y-1 transition-all duration-500'>SIGN UP</button></h1>
          </div>         
          </ModalBody>
        </ModalContent>
      </Modal>
            </> : null }
    </>
  )
}

export default Navbar
