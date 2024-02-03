import styles from './styles.module.css'

type Props = {
    color: string
    label: string
    onClick: () => void
    fill?: boolean
    disabled?: boolean
}


export const Button = ({color, fill, label, disabled, onClick}:Props) => {

    return(
        <div
            className={styles.container}
            onClick={!disabled ? onClick : () => {}}
            style={{
                color: fill ? '#ffffff' : color,
                backgroundColor: fill ? color : 'transparent',
                borderColor: color,
                opacity: disabled ? .4 : 1
            }}

        >
            { label}
        </div>
    )
}