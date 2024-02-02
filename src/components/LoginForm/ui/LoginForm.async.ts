import { lazy } from "react";

const LoginFormAsync = lazy(async() => await import('./LoginForm'))

export default LoginFormAsync