import { lazy } from "react";

const ClientWrapperAsync = lazy(async() => import('./ClientWrapper'))
export default ClientWrapperAsync