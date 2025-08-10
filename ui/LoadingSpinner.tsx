import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Sun from '@/public/images/sunny.png'

const LoadingSpinner = () => {
  return (
    <div className='min-h-screen w-screen flex justify-center items-center bg-gradient-to-br from-[#FFF0DC] to-[#FEA14E]'>
        <motion.div
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity: 1, scale: 1.2}}
        transition={{duration: 2000}}>
            <div>
                <Image src={Sun} alt='loading' className=''/>
            </div>
        </motion.div>
    </div>
  )
}

export default LoadingSpinner