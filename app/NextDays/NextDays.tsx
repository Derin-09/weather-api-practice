'use client'
import React from 'react'
import Image from 'next/image'
import Arrow from '@/public/images/arrow.png'
import Icon from '@/public/images/sunny.png'
import Rainfall from '@/public/images/rainy.png'
import Wind from '@/public/images/cloudy.png'
import Humidity from '@/public/images/sunandcloud.png'
import Days from '@/ui/Days'
import { useRouter } from 'next/navigation'

const NextDays = () => {
    const router = useRouter()
    return (
        <main className='px-10 pt-5 bg-gradient-to-br from-[#FFF0DC] to-[#FEA14E] min-h-screen h-full  pb-10 select-none text-[#313341]'>
            <section className='flex gap-20 items-center mb-10'>
                <div onClick={() => router.back()}>
                        <Image src={Arrow} width={40} height={40} alt='go back' />
                </div>
                <div className='  text-xl'>Next 7 Days</div>
            </section>
            <section className='bg-white/60 p-5 rounded-2xl mb-10 shadow-lg'>
                <section className='flex justify-between mb-10'>
                    <p>Tomorrow</p>
                    <div className='flex'>
                        <p>22 &deg;</p>
                        <Image src={Icon} width={40} height={40} alt='weather icon' />
                    </div>
                </section>
                <section className='flex justify-center items-center mb-10'>
                    <section className='flex justify-between gap-7 items-center '>
                        <Image src={Rainfall} width={40} height={40} alt='Rainfall icon' />
                        <Image src={Wind} width={40} height={40} alt='Wind icon' />
                        <Image src={Humidity} width={40} height={40} alt='Humidity icon' />
                    </section>
                </section>
            </section>
            <section className='mt-10 space-y-2'>
                <Days day='Mon' degree='20&deg;' icon={Icon} />
                <Days day='Tue' degree='22&deg;' icon={Icon} />
                <Days day='Wed' degree='19&deg;' icon={Icon} />
                <Days day='Thu' degree='21&deg;' icon={Icon} />
                <Days day='Fri' degree='23&deg;' icon={Icon} />
                <Days day='Sat' degree='18&deg;' icon={Icon} />
                <Days day='Sun' degree='20&deg;' icon={Icon} />
            </section>
        </main>
    )
}

export default NextDays