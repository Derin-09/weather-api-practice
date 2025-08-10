'use client'
import React, { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { fetchWeather } from "@/utils/fetchWeather";
import Rainy from '@/public/images/rainy.png'
import Cloudy from '@/public/images/cloudy.png'
import Drizzle from '@/public/images/cloudy.png'
import Sunny from '@/public/images/sunny.png'
import Cloud from '@/public/images/sunandcloud.png'
import { useSearchParams } from 'next/navigation';

type WeatherResponse = {
  current: {
  condition: {
    text: string;
    icon: string;
  };
  };
};


const iconMap: Record<string, StaticImageData> = {
    "Sunny": Sunny,
    "Clear": Sunny,
    "Partly cloudy": Cloud,
    "Cloudy": Cloudy,
    "Overcast": Cloudy,
    "Light rain": Rainy,
    "Moderate rain": Rainy,
    "Heavy rain": Rainy,
    "Patchy rain possible": Rainy,
    "Drizzle": Drizzle,
    "Light drizzle": Drizzle,
    "Thunderstorm": Rainy,
    "Snow": Rainy,
    "Mist": Cloudy,
    "Fog": Cloudy,
    "Haze": Cloudy
}

const IconsMaps =  () => {
    const searchParams = useSearchParams()
    const city = searchParams.get('city') || 'Lagos'
    const [data, setData] = useState<WeatherResponse | null>(null)

    useEffect(() => {
      if(city) {
        ( async() => {
          try {
          const res = await fetchWeather(city)
          setData(res)
        } catch (error) {
          console.log(error)
        }
        })()
      }
    }, [city])
    const conditionText = data?.current?.condition?.text || "Sunny"

      const iconFile = iconMap[conditionText] || Sunny


    return (
        <Image src={iconFile} width={200} height={200} alt={conditionText} />
    )
}

export default IconsMaps
