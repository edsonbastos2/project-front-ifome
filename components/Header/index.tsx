import styles from './styles.module.css'
import BackIcon from './arrowBackIcon.svg'
import Link from 'next/link'

type Props = {
    href: string
    color: string
    title?: string
    subtitle?: string
    invert?: boolean
}

export const Header = ({color, href, subtitle, title, invert}:Props) => {

    return(
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Link href={href}>
                    <span className={invert ? styles.buttonTransparent : ''}>
                        <BackIcon color={invert ? '#fff' : color}/>
                    </span>
                </Link>
            </div>
            <div className={styles.centerSide}>
                {title && 
                    <div className={styles.title} style={{color: invert ? '#fff' : '#1b1b1b'}}>{ title }</div>
                }
                {title && 
                    <div className={styles.subtitle}>{ subtitle }</div>
                }
            </div>
            <div className={styles.rightSide}></div>
        </div>
    )
}