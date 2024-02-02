import { useCallback, useRef } from 'react'

export const useTrhrothling = (callback: (...args: any) => void, time: number) => {
    const switcher = useRef(true)

    return useCallback((args: any) => {
        if (switcher.current) {
            callback(args)
            switcher.current = false
            setTimeout(() => {
                switcher.current = true
            }, time)
        }
    }, [callback, time])
}
