import Link from 'next/link'
import { useAppContext } from '../../contexts/AppContext'
import { useFormatter } from '../../libs/useFormatter'
import { Product } from '../../model/Product'
import styles from './styles.module.css'

type Props = {
    data: Product
}

export const ProductItem = ({data}:Props) => {

    const { tenant } = useAppContext()
    const formatter = useFormatter()

    return(
    <div className={styles.container}>
        <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
        <div className={styles.info}>
            <div className={styles.img}>
                <img src={data.img} alt={data.name} />
            </div>
            <div className={styles.catName}>{data.category}</div>
            <div className={styles.name}>{data.name}</div>
            <div className={styles.price} style={{color: tenant?.mainColor}}>{formatter.formatPrice(data.price)}</div>
        </div>
    </div>
    )
}