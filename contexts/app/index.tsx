import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { ContextType, DataType, PropsType } from './types'

export { useAppContext } from './hook'


const initialstate = {
    tenant: null,
    shippingAddress: null,
    shippingPrice: 0,
} as DataType

export const AppContext = createContext<ContextType>({
    state: initialstate,
    dispatch: () => {}
})
 

export const Provider = ({children}:PropsType) => {

    const [state, dispatch ] = useReducer(reducer, initialstate)

    const value = { state, dispatch }

    return(
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}