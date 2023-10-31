import { KeyboardEvent, useContext, useState } from 'react'
import styles from './styles.module.css'
import SearchIcon from './searchIcon.svg'
import { CountContext } from '../../contexts/Countcontext'


type Props = {
    maincolor: string
    onSearch: (searchValue: string) => void
}

export const SearchInput = ({ maincolor, onSearch }:Props) => {

    const [focused, setfocused] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const handlefocus = () => {
        setfocused(true)
    }

    const handleBlur = () => {
        setfocused(false)
    }

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.code === 'Enter') {
            onSearch(searchValue)
        }
    }


    const contCtx = useContext(CountContext)


    return(
        <div className={styles.container} style={{ borderColor: focused ? maincolor : '#fff'}}>
            <div
                className={styles.button}
                onClick={() => onSearch(searchValue)}
            >
                <SearchIcon color={maincolor}/>
                {contCtx?.onlineCount}
            </div>
            <input
             placeholder='Digite o nome do rango'
             type="text"
             className={styles.input}
             onFocus={handlefocus}
             onBlur={handleBlur}
             onKeyUp={handleKeyUp}
             value={searchValue}
             onChange={(e) => setSearchValue(e.target.value)}
            />

            <button onClick={() => contCtx?.setOnlinecount(0)}>ok</button>
        </div>
    )
}