'use client'
import Button from '@/shared/ui/Button'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function Back() {
  const router = useRouter()
  const back = useCallback(() => {
    router.back()
  }, [router])
    return (
    <Button onClick={back} className='text-lg font-medium self-start'>
        Back
    </Button>
  )
}
