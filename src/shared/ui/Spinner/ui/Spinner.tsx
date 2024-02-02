import React from 'react'
import styles from './Spinner.module.css'
import { twMerge } from 'tailwind-merge'

interface SpinnerProps {
  className?: string
}
export default function Spinner({className}: SpinnerProps) {
  return (
    <span className={styles.loader + ' ' + twMerge("border-cyan-950 !border-b-transparent", className)} />
  )
}
