import { Icon } from '../Icon'
import styles from './styles.module.css'


type Props = {
    color: string
    leftIcon?: string
    rightIcon?: string
    value: string
    onClick?: () => void
    fill?: boolean
}

export const ButtonwithIcon = ({ color, leftIcon, rightIcon, value, fill, onClick }:Props) => {


    return(
        <div
            className={styles.container}
            style={{ backgroundColor: fill ? color : '#f9f9fb'}}
            onClick={onClick}
        >
            {
                leftIcon &&
                <div
                    className={styles.leftSide}
                    style={{ backgroundColor: fill ? 'rgba(0,0,0,.05)' : '#fff'}}
                >
                    <Icon
                        color={fill ? '#fff' : color}
                        icon={leftIcon}
                        height={24}
                        width={24}
                    />
                </div>
            }
            <div
                className={styles.centerside}
                style={{ color: fill ? '#fff' : '#1b1b1b'}}
            >{ value }</div>
            {
                rightIcon &&
                <div className={styles.rightSide}>
                    <Icon
                        color={fill ? '#ff' : color}
                        icon={rightIcon}
                        height={24}
                        width={24}
                    />
                </div>
            }
        </div>
    )
}