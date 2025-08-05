import React from 'react'
import Image, { StaticImageData } from 'next/image'

type BarProps = {
    icon: StaticImageData
    weather: string
    detail: string
}

const Widebar = (props: BarProps) => {
    return (
        <div className='px-3 flex justify-between items-center py-6 pr-10 rounded-2xl bg-white/70 text-center'>
            <div className='space-x-1 flex items-center'>
                <Image src={props.icon} alt='icon' />
                <p className='text-black '>{props.weather}</p>
            </div>
            <p className='text-black'>{props.detail}</p>
        </div>
    )
}

export default Widebar