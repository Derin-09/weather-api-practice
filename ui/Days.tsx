import React from 'react'
import Image, { StaticImageData } from 'next/image'

type BarProps = {
    icon: StaticImageData
    degree: string
    day: string
}

const Days = (props: BarProps) => {
  return (
    <div className='px-6 flex justify-between items-center py-6  rounded-2xl bg-white/40 text-center text-[#313341]'>
                <p className=''>{props.day}</p>
                <div className='space-x-1 flex items-center'>
                    <p className=''>{props.degree}</p>
                    <Image src={props.icon}  alt='icon' />
                </div>
            </div>
  )
}

export default Days