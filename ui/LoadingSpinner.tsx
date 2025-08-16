'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Sun from '@/public/images/sunny.png'
import { reverse } from 'dns'

const LoadingSpinner = () => {
  return (
    <div className='min-h-screen w-screen flex justify-center items-center bg-gradient-to-br from-[#FFF0DC] to-[#FEA14E] md:max-w-[400px] mx-auto'>
        <motion.div
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity: 1, scale: 1.2}}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"}}>
            <div className=''>
                <Image src={Sun} width={100} height={100} alt='loading' className=''/>
            </div>
        </motion.div>
    </div>
  )
}

export default LoadingSpinner