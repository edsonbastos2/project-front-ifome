import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { ContextType, DataType, PropsType } from './types'

export { useAuthContext } from './hook'


const initialstate = {
    token: '',
    user: null
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