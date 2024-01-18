"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react'
import ProjectLogo from 'public/logo CEHRSR.png'


export default function Loading() {
    const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000) // Set loading time as needed
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">
      {!isLoaded && (
        <div>
                     <div className="relative flex justify-center items-center">
             <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            
            <Image src={ProjectLogo} alt="projectLogo" className="rounded-full h-28 w-28"></Image>
         </div>
                 </div>
      )}
      
      <div>
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
  <div className="h-full bg-blue-500 w-1/2"></div>
</div>
          </div>
    </div>
  )
}

