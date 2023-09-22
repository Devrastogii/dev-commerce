import React, { useRef, useState } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Register from './Register';
import Login from './Login';

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

  return (
    <>
        <section>
            <div className='flex w-full justify-around items-center'>
                <div>
                    <h1 className='font-bold text-xl'>DEV-COMMERCE</h1>
                </div>
                <div className='flex gap-x-8'>
                    <div>Home</div>
                    <div>Contact</div>
                    <div>About</div>
                    <button onClick={register}>Sign Up</button>
                </div>
                <div className='flex gap-x-3'>
                    <div>search bar</div>
                    <div>wishlist</div>
                    <div>cart</div>
                    <div>account</div>
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
