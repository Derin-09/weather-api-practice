'use client'
import React from 'react'
import { fetchWeather } from '@/utils/fetchWeather'
import Widebar from '@/ui/Widebar'
import Navbar from '../../components/Navbar'
import Rainfall from '@/public/images/rainicon.png'
import Wind from '@/public/images/windicon.png'
import Humidity from '@/public/images/humidityicon.png'
import Forecast from '../../components/Forecast'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import LoadingSpinner from '@/ui/LoadingSpinner'
import Image from 'next/image'

type WeatherResponse = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    precip_mm: number;
  condition: {
    text: string;
    icon: string;
  };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
      };
      hour: {
        time: string;
        temp_c: number;
      }[];
    }[];
  };
};


const DefaultWeather = () => {
    
    const params = useParams()
    const city = (params?.city as string) || 'Lagos'
    const [data, setData] = useState<WeatherResponse | null>(null)

     useEffect(() => {
        if (city) {
            ( async () => {
                try {
                const res = await fetchWeather(city)
                setData(res)
            } catch (error) {
                console.log(error)
            }
            })()
            
        }
    }, [city])

    if (!data) {
        return <LoadingSpinner/>
    }
    
    const temp = Math.round(data.current.temp_c)
    const dateStr = data?.forecast.forecastday[0].date
    const formattedDate = new Date(dateStr!).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit'
    })

    return (
        <main className='bg-gradient-to-br from-[#FFF0DC] to-[#FEA14E] flex min-h-screen w-screen  md:max-w-[400px] mx-auto h-full select-none text-[#303345]' style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            <section className='px-8 w-full'>
                <Navbar />
                <p className='text-5xl  my-4' >{data?.location.name},<br /> {data?.location.country}</p>
                <p className='text-2xl text-gray-600'>{formattedDate}</p>
                <div className='flex justify-center gap-4 mt-5 w-full text-center items-center mb-5'>
                    <div >
                      <Image src={`https:${data.current.condition.icon}`} width={200} height={200} alt={`${data.current.condition.text}`}/>
                        {/* <IconsMaps/> */}
                    </div>
                    <div>
                        <p className='text-8xl font-bold '>{temp}<span className='align-super text-lg relative -top-2'>&deg;C</span></p>
                        <p className='text-3xl  text-start pl-4'>{data?.current.condition.text}</p>
                    </div>
                </div>
                <section className='space-y-2 mb-5'>
                    <Widebar icon={Rainfall} weather='Rainfall' detail={`${data?.current.precip_mm}mm`} />
                    <Widebar icon={Wind} weather='Wind' detail={`${data?.current.wind_kph}km/h`} />
                    <Widebar icon={Humidity} weather='Humidity' detail={`${data?.current.humidity}%`} />
                </section>
                <Forecast city={city}/>
            </section>
        </main>
    )
}

export default DefaultWeather