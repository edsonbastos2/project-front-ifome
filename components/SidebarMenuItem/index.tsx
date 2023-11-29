import styles from './styles.module.css'
import Cart from './cart.svg'
import Config from './config.svg'
import Fav from './fav.svg'
import Menu from './menu.svg'
import Order from './order.svg'
import Logout from './logout.svg'

type Props = {
    icon: 'cart' | 'config' | 'fav' | 'menu' | 'order' | 'logout'
    label: string
    color: string 
    onClick: () => void
    disabled?: boolean
}

export const SidebarMenuItem = ({ color, icon, label, onClick, disabled }:Props) => {

    return(
        <div className={styles.container} onClick={onClick}>
            { icon === 'cart' && <Cart color={color}/> }
            { icon === 'config' && <Config color={color}/> }
            { icon === 'fav' && <Fav color={color}/> }
            { icon === 'menu' && <Menu color={color}/> }
            { icon === 'order' && <Order color={color}/> }
            { icon === 'logout' && <Logout color={color}/> }
            <span className={ disabled ? styles.disabledText : ''}>{ label }</span>
        </div>
    )
}