'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Search from '@/public/images/search.png'
import Expand from '@/public/images/hamburger.png'
import Arrow from '@/public/images/arrow.png'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [searcher, setSearcher] = useState<string>('')

    const router = useRouter()
    const handleSearch = () => {
        if (!searcher.trim()) return
        router.push(`/Weather/${encodeURIComponent(searcher.trim())}`)
    }

    const handleClick = () => {
        setIsClicked(!isClicked)
    }
    return (
        <nav className='flex justify-between items-center gap-3 py-4 '>
            <div onClick={handleClick}>
                <Image src={Search} alt='logo' width={40} height={40} />
            </div>
            <div className={` flex ${isClicked ? 'visible' : 'hidden'}`}>
            <input
                placeholder='Enter a city'
                className={`w-full p-3 rounded-l-md border `}
                value={searcher}
                onChange={(e) => setSearcher(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                <div className='flex justify-center items-center px-3 border border-black rounded-r-md'
                onClick={handleSearch}>
                    <Image src={Arrow} alt='enter'/>
                </div>
                </div>
            <div>
                <Image src={Expand} alt='expand' width={40} height={40} />
            </div>
        </nav>
    )
}

export default Navbar