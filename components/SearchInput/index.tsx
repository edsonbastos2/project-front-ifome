import { KeyboardEvent, useState } from 'react'
import styles from './styles.module.css'
import SearchIcon from './searchIcon.svg'
import { useAppContext } from '../../contexts/app';


type Props = {
    onSearch: (searchValue: string) => void
}

export const SearchInput = ({ onSearch }:Props) => {

    const [focused, setfocused] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const { tenant } = useAppContext()

    const handlefocus = () => {
        setfocused(true)
    }

    const handleBlur = () => {
        setfocused(false)
    }

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        onSearch(searchValue)
        // if(event.code === 'Enter') {
        // }
    }


    return(
        <div className={styles.container} style={{ borderColor: focused ? tenant?.mainColor : '#fff'}}>
            <div
                className={styles.button}
                onClick={() => onSearch(searchValue)}
            >
                <SearchIcon color={tenant?.mainColor}/>
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

        </div>
    )
}