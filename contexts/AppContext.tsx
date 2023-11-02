import { ReactNode, createContext, useContext, useState } from "react"
import { Tenant } from "../model/Tenant"

type appContextType = {
    tenant: Tenant | null
    setTenant: (payload: Tenant) => void
}

const defualtValues: appContextType = {
    tenant: null,
    setTenant: () => null
}

const appContext = createContext<appContextType>(defualtValues)
export const useAppContext = () => useContext(appContext)

type Props = {
    children:ReactNode
}

export const AppContextProvider = ({ children }:Props) => {
    const [ tenant, setTenant ] = useState<Tenant | null>(null)

    return(
        <appContext.Provider value={{tenant, setTenant}}>
            { children }
        </appContext.Provider>
    )
}

