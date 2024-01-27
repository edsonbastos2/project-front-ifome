import { Product } from '../../types/Product'
import styles from './styles.module.css'
import { useFormatter } from '../../libs/useFormatter'
import { Quantity } from '../Quantity'

type Props = {
    color: string
    quantity: number
    productItem: Product
    onChange: (qtdCount:number, id:number) => void
}

export const CartProductItem = ({ color, onChange, productItem, quantity}:Props) => {

    const { formatPrice } = useFormatter()

    return(
        <div className={styles.container}>
            <div className={styles.productImage}>
                <img src={productItem.img} alt={productItem.name} />
            </div>
            <div className={styles.productInfo}>
                <span className={styles.productCategory}>{productItem.category}</span>
                <span className={styles.productName}>{productItem.name}</span>
                <span 
                    className={styles.productPrice}
                    style={{color: color}}
                >
                    {formatPrice(productItem.price)}
                </span>
            </div>
            <div className={styles.quantityControl}>
                <Quantity
                    color={color}
                    count={quantity}
                    onUpdateCount={(newcount:number) => onChange(newcount, productItem.id)}
                    min={0}
                    small
                />
            </div>
        </div>
    )
}