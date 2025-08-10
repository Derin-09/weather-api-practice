'use client'
import React, { useEffect, useState } from 'react'
import Times from "@/ui/Times";
import Link from 'next/link'
import { fetchWeather } from '@/utils/fetchWeather';
import { useSearchParams } from 'next/navigation';

type WeatherResponse = {
  current: {
    temp_c: number;
  };
  forecast: {
    forecastday: {
      date: string;
      hour: {
        time: string;
        temp_c: number;
      }[];
    }[];
  };
};

const Forecast = () => {
  const searchParams = useSearchParams()
  const city = searchParams.get('city') || 'Lagos'
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
  })

  let temp;
  if (data?.current.temp_c !== undefined) {
       temp = Math.round(data?.current.temp_c)
    }
    temp = Math.round(data?.current.temp_c ?? 0)

  return (
    <main className=''>

      <section className='my-5 flex justify-between items-center'>
        <div className='font-bold text-black'>Today</div>
        <div className='text-gray-600 font-bold active:text-black'>
          <Link href={'/NextDays'}>Next 7 days</Link></div>
      </section>
      <section className='space-x-5 flex overflow-x-auto scrollbar-hide p-0 m-0'>
        <Times time='Now' degree={temp}/>
        {data?.forecast.forecastday.map((day, index) => {
          const dateStr = day.hour[index].time;
          const formattedDate = new Date(dateStr!).toLocaleTimeString('en-US', {
            hour: '2-digit'
          });
          const temp = Math.round(day.hour[index].temp_c ?? 0)

          return (
            <Times
              key={index}
              time={formattedDate}
              degree={temp}
            />
          );
        })}
      </section>
    </main>
  )
}

export default Forecast