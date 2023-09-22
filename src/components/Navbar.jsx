import React, { useRef, useState } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Register from './Register';

const Navbar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [log, setLog] = useState(false)
  const [reg, setReg] = useState(false)

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const register = () => {
        setReg(true)
        onOpen()
        setLog(false)
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
          </ModalBody>
        </ModalContent>
      </Modal>
            </> : null }
    </>
  )
}

export default Navbar
