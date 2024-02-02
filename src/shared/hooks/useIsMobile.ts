'use client'
import { useEffect, useState } from "react"
import UAParser from "ua-parser-js"

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(['mobile', 'tablet'].includes(new UAParser(navigator.userAgent).getDevice().type || ''))
  }, [])
  return isMobile
}