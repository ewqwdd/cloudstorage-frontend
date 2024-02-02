"use client";

import Button from "@/shared/ui/Button";
import VStack from "@/shared/ui/VStack";
import { useCallback, useState } from "react";
import { useNotify } from "@/entity/Notification";
import Input from "@/shared/ui/Input";
import { useForm } from "react-hook-form";
import { LoginFormModel } from "../model/LoginForm.type";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  setIsLoading?: (val: boolean) => void
}

export default function LoginForm({setIsLoading}: LoginFormProps) {
  const {add} = useNotify()
  const {register, reset, handleSubmit, formState} = useForm<LoginFormModel>({})

  const submit = useCallback(async ({email, password}: LoginFormModel) => {
    
    try {
        signIn('credentials', {
          email,
          password,
          redirect: true,
          callbackUrl: '/dashboard'
        })
        add({
          children: <span>Successfully logged in!</span>,
          label: 'Success'
      })
      setIsLoading?.(true)
      reset()
    } catch(err) {
        if (err instanceof AxiosError) {
          add({
            label: 'Error',
            variant: 'error',
            children: <span>{err.response?.data.message ?? err.message}</span>
          })
          setIsLoading?.(false)
        }
    }
  }, [add, reset, setIsLoading])

  return (
    <VStack as={"form"} className='gap-2 my-4' onSubmit={handleSubmit(submit)}>
      <Input type="email" placeholder="example@mail.com" required {...register('email')}/>
      <Input type="password" placeholder="Password" required {...register('password', {minLength: 8})}/>
      {formState.errors.password?.type === 'minLength' && <span className="text-sm text-red-800 font-medium">Password has to be at least 8 symbols long</span>}
      <Button type="submit">
        Submit
      </Button>
    </VStack>
  );
}
