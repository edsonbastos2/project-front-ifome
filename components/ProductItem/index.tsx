import { Product } from '../../model/Product'
import styles from './styles.module.css'

type Props = {
    data: Product
    maincolor: string
    secondaryColor: string
}

export const ProductItem = ({data, maincolor, secondaryColor}:Props) => {

    return(
        <div className={styles.container}>
            <div className={styles.head} style={{backgroundColor: secondaryColor}}></div>
            <div className={styles.info}>
                <div className={styles.img}>
                    <img src={data.img} alt={data.name} />
                </div>
                <div className={styles.catName}>{data.category}</div>
                <div className={styles.name}>{data.name}</div>
                <div className={styles.price} style={{color: maincolor}}>{data.price}</div>
            </div>
        </div>
    )
}