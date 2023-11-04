import styles from './styles.module.css'
import BackIcon from './arrowBackIcon.svg'
import Link from 'next/link'

type Props = {
    href: string
    color: string
    title?: string
    subtitle?: string
}

export const Header = ({color, href, subtitle, title}:Props) => {

    return(
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Link href={href}>
                    <BackIcon color={color}/>
                </Link>
            </div>
            <div className={styles.centerSide}>
                {title && 
                    <div className={styles.title}>{ title }</div>
                }
                {title && 
                    <div className={styles.subtitle}>{ subtitle }</div>
                }
            </div>
            <div className={styles.rightSide}></div>
        </div>
    )
}