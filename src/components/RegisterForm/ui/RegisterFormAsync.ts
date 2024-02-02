import { lazy } from "react";

const RegisterFormAsync = lazy(async() => await import('./RegisterForm'))

export default RegisterFormAsync