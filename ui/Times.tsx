import { StaticImageData } from 'next/image'
import Image from 'next/image'
import React from 'react'

interface Details {
  time: string
  icon: StaticImageData
  degree: string
}

const Times = (props: Details) => {
  return (
    <main className='flex flex-col justify-center p-3 space-y-2 active:bg-white bg-white/60 text-black w-[100px] h-[150px] rounded-full space-x-3 text-center'>
        <p>{props.time}</p>
        <Image src={props.icon} alt='weather icon' />
        <p>{props.degree}</p>
    </main>
  )
}

export default Times