import { Address } from '../../types/Address'
import { Icon } from '../Icon'
import styles from './styles.module.css'

type Props = {
    color: string
    addresse: Address
    onSelected: (addresses:Address) => void
    onEdit: (id:number) => void
    onDelete: (id: number) => void
    open: number
    setOpenModal: (id:number) => void
}

const AddressesItem = ({ addresse, color, onDelete, onEdit, onSelected, open, setOpenModal}:Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.addresseArea} onClick={() => onSelected(addresse)}>
            <div className={styles.addresseIcon}>
                <Icon
                    color={color}
                    icon='location'
                    height={24}
                    width={24}
                />
            </div>
            <div className={styles.addresseText}>
                {addresse.street},{addresse.number} - {addresse.neighborhood}
            </div>
        </div>
        <div className={styles.addresseActios}>
            <div className={styles.addresseActiosIcon} onClick={() => setOpenModal(addresse.id)}>
                <Icon
                    color={color}
                    height={24}
                    width={24}
                    icon='dots'
                />
            </div>
            { open === addresse.id &&
                <div className={styles.addresseModal}>...</div>
            }
        </div>
    </div>
  )
}

export default AddressesItem;