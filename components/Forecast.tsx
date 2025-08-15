'use client'
import React, { useEffect, useState } from 'react'
import Times from "@/ui/Times";
import Link from 'next/link'
import { fetchWeather } from '@/utils/fetchWeather';
import { StaticImageData } from 'next/image';

type WeatherResponse = {
  current: {
    temp_c: number;
  condition: {
    text?: string;
    icon?: string | StaticImageData;
  };
  };
  forecast: {
    forecastday: {
      date: string;
      hour: {
        time: string;
        temp_c: number;
        condition: {
          icon: string 
          text: string
        }
      }[];
    }[];
  };
};

const Forecast = ({city}: {city: string}) => {
  const [data, setData] = useState<WeatherResponse | null>(null)

  useEffect(() => {
    if (city) {
      ( async () => {
        try {
        const res = await fetchWeather(city as string)
        setData(res)
      } catch (error) {
        console.log(error)
      }
      })()
      
    }
  }, [city])

  let temp;

  if (data?.current.temp_c !== undefined) {
       temp = Math.round(data?.current.temp_c)
    }
    temp = Math.round(data?.current.temp_c ?? 0)
    
  if (data?.current.condition.icon !== undefined) {
     

    }
     const timeIcon = data?.current?.condition?.icon ? `${data.current.condition.icon}` : ''
    const timeText = data?.current?.condition?.text ? data.current.condition.text : ''
  if (data?.current.condition.text !== undefined) {
    }

  return (
    <main className=''>

      <section className='my-5 flex justify-between items-center'>
        <div className='font-bold text-black'>Today</div>
        <div className='text-gray-600 font-bold active:text-black'>
          <Link href={`/${city}/NextDays`}>Next 7 days</Link></div>
      </section>
      <section className='space-x-5 flex overflow-x-auto scrollbar-hide p-0 m-0'>
        <Times time='Now' degree={temp} icon={timeIcon} text={timeText}/>
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
              icon={day.hour[index].condition.icon}
              text={`${day.hour[index].condition.text}`}
            />
          );
        })}
      </section>
    </main>
  )
}

export default Forecast