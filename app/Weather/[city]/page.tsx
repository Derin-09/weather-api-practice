'use client'
import DefaultWeather from '@/app/DefaultWeather/DefaultWeather'
import LoadingSpinner from '@/ui/LoadingSpinner'
import React from 'react'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
        <DefaultWeather/>
    </Suspense>
  )
}

export default page