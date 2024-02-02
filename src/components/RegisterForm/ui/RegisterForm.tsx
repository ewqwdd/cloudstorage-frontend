"use client";

import { register } from "@/api";
import Button from "@/shared/ui/Button";
import VStack from "@/shared/ui/VStack";
import { useCallback, useMemo, useState } from "react";
import { useNotify } from "@/entity/Notification";
import Input from "@/shared/ui/Input";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { RegisterFormModel } from "../model/RegisterForm.type";
import HStack from "@/shared/ui/HStack";
import EyeIcon from "@/shared/icons/eye.svg";
import EyeOffIcon from "@/shared/icons/eye-off.svg";
import { signIn, useSession } from "next-auth/react";

const registerApi = register;

interface RegisterForm {
  setIsLoading?: (val: boolean) => void
}

export default function LoginForm({setIsLoading}: RegisterForm) {
  const { add } = useNotify();
  const { register, reset, handleSubmit, formState, setError } =
    useForm<RegisterFormModel>({});
  const [visible, setVisible] = useState<boolean>(false);
  const submit = useCallback(
    async ({ email, password, repeatedPassword }: RegisterFormModel) => {
      if (repeatedPassword !== password)
        return setError("repeatedPassword", {
          message: "Passwords don't match",
        });
      try {
        const { access_token, refresh_token } = await registerApi({
          email,
          password,
        });
        add({
          children: <span>Successfully registered.</span>,
          label: "Success",
        });
        reset();
        setIsLoading?.(true)
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
          redirect: true,
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          add({
            label: "Error",
            variant: "error",
            children: <span>{err.response?.data.message ?? err.message}</span>,
          });
          setIsLoading?.(false)
        }
      }
    },
    [add, reset, setError, setIsLoading]
  );

  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);
  const iconProps = useMemo(
    () => ({
      className: "pl-[1%] w-[6%] self-center cursor-pointer text-cyan-950",
      onClick: toggleVisible,
    }),
    [toggleVisible]
  );

  return (
    <VStack as={"form"} className="gap-2 my-4" onSubmit={handleSubmit(submit)}>
      <Input
        className="max-w-[94%]"
        type="email"
        placeholder="example@mail.com"
        required
        {...register("email")}
      />
      <HStack>
        <Input
          type={visible ? "text" : "password"}
          placeholder="Password"
          className="flex-grow max-w-[94%]"
          required
          {...register("password", { minLength: 8 })}
        />
        {!visible ? <EyeIcon {...iconProps} /> : <EyeOffIcon {...iconProps} />}
      </HStack>
      {formState.errors.password?.type === "minLength" && (
        <span className="text-sm text-red-800 font-medium">
          Password has to be at least 8 symbols long
        </span>
      )}
      <HStack>
        <Input
          className="flex-grow max-w-[94%]"
          type={visible ? "text" : "password"}
          placeholder="Repeat password"
          required
          {...register("repeatedPassword", { minLength: 8 })}
        />
        {!visible ? <EyeIcon {...iconProps} /> : <EyeOffIcon {...iconProps} />}
      </HStack>
      <span className="text-sm text-red-800 font-medium">
        {formState.errors.repeatedPassword?.message}
      </span>
      <Button type="submit">Submit</Button>
    </VStack>
  );
}
