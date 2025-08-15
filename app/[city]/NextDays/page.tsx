'use client'
import React, { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Arrow from '@/public/images/arrow.png'
import Icon from '@/public/images/sunny.png'
import Rainfall from '@/public/images/rainicon.png'
import Wind from '@/public/images/windicon.png'
import Humidity from '@/public/images/humidityicon.png'
import Days from '@/ui/Days'
import { useRouter } from 'next/navigation'
import { fetchWeather } from '@/utils/fetchWeather'
import LoadingSpinner from '@/ui/LoadingSpinner'

type WeatherResponse = {
  location: { name: string; country: string }
  current: {
    temp_c: number
    humidity: number
    wind_kph: number
    precip_mm: number
    condition: { text: string; icon: string }
  }
  forecast: {
    forecastday: {
      date: string
      day: {
        avgtemp_c: number
        condition: { icon: string }
      }
      hour: { time: string; temp_c: number }[]
    }[]
  }
}

const NextDays = ({ params }: { params: Promise<{ city: string }> }) => {
  const { city } = use(params)
  const router = useRouter()
  const [data, setData] = useState<WeatherResponse | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchWeather(city)
        setData(res)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [city])

  if (!data) return <LoadingSpinner />

  const sortedDays = [...data.forecast.forecastday].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <main className="px-10 pt-5 bg-gradient-to-br from-[#FFF0DC] to-[#FEA14E] pb-10 min-h-screen w-screen md:max-w-[400px] mx-auto h-full select-none text-[#303345]">
      <section className="flex gap-20 items-center mb-10">
        <div onClick={() => router.back()}>
          <Image src={Arrow} width={40} height={40} alt="go back" />
        </div>
        <div className="text-xl">Next 7 Days</div>
      </section>

      <section className="bg-white/60 p-5 rounded-2xl mb-10 shadow-lg">
        <section className="flex justify-between items-center mb-10">
          <p>Tomorrow</p>
          <div className="flex items-center">
            <p>{ Math.round(data.forecast.forecastday[1].day.avgtemp_c)} &deg;</p>
            <Image src={`https:${data.forecast.forecastday[1].day.condition.icon}`} width={40} height={40} alt="weather icon" />
          </div>
        </section>
        <section className="flex justify-center items-center mb-10">
          <section className="flex justify-between gap-10 items-center">
            <div>
              <Image src={Rainfall} width={40} height={40} alt="Rainfall icon" />
              <p>{data.current.precip_mm}mm</p>
            </div>
            <div>
              <Image src={Wind} width={40} height={40} alt="Wind icon" />
              <p>{data.current.wind_kph}km/h</p>
            </div>
            <div>
              <Image src={Humidity} width={40} height={40} alt="Humidity icon" />
              <p>{data.current.humidity}%</p>
            </div>
          </section>
        </section>
      </section>

      <section className="mt-10 space-y-2">
        {sortedDays.map((day, idx) => {
          const weekday = new Date(day.date).toLocaleDateString('en-US', {
            weekday: 'short',
          })
          return (
            <Days
              key={idx}
              day={weekday}
              degree={`${Math.round(day.day.avgtemp_c)}°`}
              icon={`https:${day.day.condition.icon}`}
            />
          )
        })}
      </section>
    </main>
  )
}

export default NextDays
