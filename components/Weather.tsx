import React from 'react'
import Image from 'next/image'
import Cloud from '@/public/images/cludy.png'
import { fetchWeather } from '@/lib/fetchWeather'
import Widebar from '@/ui/Widebar'
import Times from '@/ui/Times'


const Weather = () => {
  return (
    <main className='bg-gradient-to-br from-[#FEB054] to-[#FEA14E] flex  w-screen h-full'>
        <section className='px-8 w-full'>
            <p>Stockholm,<br/> Sweden</p>
            <p>Tue, Jun 30</p>
            <div className='flex justify-between w-full'>
                <div>
                    <Image src={Cloud} alt='cloudy'/>
                </div>
                <div>
                    <p>19c</p>
                    <p>Rainy</p>
                </div>
            </div>
            <section className='space-y-2 mb-5'>
                <Widebar icon={Cloud} weather='Rainfall' detail='3cm' />
                <Widebar icon={Cloud} weather='Rainfall' detail='3cm' />
                <Widebar icon={Cloud} weather='Rainfall' detail='3cm' />
            </section>
            <section className='space-x-5 flex overflow-scroll'>
                <Times time='now' degree='12c' icon={Cloud}/>
                <Times time='now' degree='12c' icon={Cloud}/>
                <Times time='now' degree='12c' icon={Cloud}/>
                <Times time='now' degree='12c' icon={Cloud}/>
                <Times time='now' degree='12c' icon={Cloud}/>
                <Times time='now' degree='12c' icon={Cloud}/>
                <Times time='now' degree='12c' icon={Cloud}/>
                <Times time='now' degree='12c' icon={Cloud}/>
            </section>
        </section>
    </main>
  )
}

export default Weather