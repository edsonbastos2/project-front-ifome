import styles from './styles.module.css'
import EyeOn from './eyeOpen.svg'
import EyeOff from './eyeOff.svg'
import { useState } from 'react'

type Props = {
    color: string
    placeholder: string
    value: string
    onChange: (payload: string) => void
    password?: boolean
}

export const InputField = ({color, onChange, password, placeholder, value}:Props) => {

    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState(false)

    return(
        <div
            className={styles.container}
            style={{
                borderColor: focused ? color : '#f9f9fb',
                backgroundColor: focused ? '#ffffff' : '#f9f9fb'
            }}
        >
            <input
                className={styles.input}
                type={password ? (showPassword ? 'text' : 'password') : 'text'}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />

            {password && 
                <div
                    className={styles.showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword && <EyeOn color='#bbb'/>}
                    {!showPassword && <EyeOff color='#bbb'/>}
                </div>
            }
        </div>
    )
}