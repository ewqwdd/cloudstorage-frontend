'use client'
import { ReactNode, createContext, useEffect, useMemo, useRef, useState } from "react";

type Spring = typeof import('@react-spring/web')
type Gesture = typeof import('@use-gesture/react')

interface GestureSpringSchema {
    spring?: Spring
    gesture?: Gesture
    isMounted: boolean
}

export const gestureSpringContext = createContext<GestureSpringSchema>({isMounted: false})

interface ProviderProps {
    children: ReactNode
}

export const GestureSpringProvider = ({children}: ProviderProps) => {

    const [isMounted, setIsMounted] = useState(false)
    const springRef = useRef<Spring>()
    const gestureRef = useRef<Gesture>()

    useEffect(() => {
        Promise.all([
            import('@react-spring/web'),
            import('@use-gesture/react')
        ]).then(([spring, gesture]) => {
            springRef.current = spring
            gestureRef.current = gesture
            setIsMounted(true)
        })
    }, [])

    const values = useMemo<GestureSpringSchema>(() => ({
        isMounted,
        gesture: gestureRef.current,
        spring: springRef.current
    }), [isMounted])

    return(
        <gestureSpringContext.Provider value={values}>
            {children}
        </gestureSpringContext.Provider>
    )
}