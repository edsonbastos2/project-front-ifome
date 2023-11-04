import styles from './styles.module.css'

type Props = {
    color: string
    label: string
    onClick: () => void
    fill?: boolean
}


export const Button = ({color, fill, label, onClick}:Props) => {

    return(
        <div
            className={styles.container}
            onClick={onClick}
            style={{
                color: fill ? '#ffffff' : color,
                backgroundColor: fill ? color : 'transparent',
                borderColor: color
            }}

        >
            { label}
        </div>
    )
}