import { useEffect, useState } from "react"

export const useScreen = () => {
    const [width, setWidth] = useState<number>(0)

    useEffect(() => {
        setWidth(window.innerWidth)
        const onChange = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', onChange)
        return () => {
            window.removeEventListener('resize', onChange)
        }
    }, [])
    return {
        width
    }
}