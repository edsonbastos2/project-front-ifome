import { ReactNode, createContext, useState } from "react";

type CountTypeContext = {
    onlineCount: number,
    setOnlinecount: (c:number) => void
}

export const CountContext = createContext<CountTypeContext | null>(null)

type Props = {
    children: ReactNode
}


export const CountProvider = ({children}:Props) => {

    const [onlineCount, setOnlinecount] = useState(55)

    return(
        <CountContext.Provider value={{onlineCount, setOnlinecount}}>
            { children }
        </CountContext.Provider>
    )
}