import { useAppContext } from '../../contexts/AppContext'
import { Product } from '../../model/Product'
import styles from './styles.module.css'

type Props = {
    data: Product
}

export const ProductItem = ({data}:Props) => {

    const { tenant } = useAppContext()

    return(
        <div className={styles.container}>
            <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
            <div className={styles.info}>
                <div className={styles.img}>
                    <img src={data.img} alt={data.name} />
                </div>
                <div className={styles.catName}>{data.category}</div>
                <div className={styles.name}>{data.name}</div>
                <div className={styles.price} style={{color: tenant?.mainColor}}>R$ {data.price.toFixed(2)}</div>
            </div>
        </div>
    )
}