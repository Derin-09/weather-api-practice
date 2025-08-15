import { StaticImageData } from 'next/image'
import Image from 'next/image'
import React from 'react'
import IconsMaps from '@/components/IconsMaps'

interface Details {
  time: string
  degree: number
  icon: string | StaticImageData
  text: string
}


const Times = (props: Details) => {

  return (
    <main className='flex flex-col items-center justify-center p-3 space-y-0.5 active:bg-white active:shadow-md bg-white/40 text-black min-w-[100px] h-[150px] rounded-full text-center mb-5 select-none'>
      <p className='text-gray-600 active:text-black'>{props.time}</p>
      {/* <IconsMaps /> */}
      {props.icon && (
        <Image src={`https:${props.icon}`} width={70} height={70} alt={props.text || 'weather icon'} />
      )}
      <p className='font-bold'>{props.degree}&deg;</p>
    </main>

  )
}

export default Times