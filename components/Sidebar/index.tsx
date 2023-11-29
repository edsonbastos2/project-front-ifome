import { useRouter } from 'next/router'
import { useAuthContext } from '../../contexts/auth'
import { Tenant } from '../../types/Tenant'
import { Button } from '../Button'
import { SidebarMenuItem } from '../SidebarMenuItem'
import styles from './styles.module.css'

type Props = {
    tenant: Tenant
    openSidebar: boolean
    onClose: () => void
}


export const Sidebar = ({ tenant, onClose, openSidebar }:Props) => {

    const { user, setToken } = useAuthContext()
    const router = useRouter()

    return(

        <div
            className={styles.container}
            style={{ width: openSidebar ? '100vw' : '0'}}
            >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div
                        className={styles.loginArea}
                        style={{borderBottomColor: tenant.mainColor }}
                        >
                        { user && 
                            <div className={styles.userInfor}>
                                <strong>{ user.name }</strong>
                                <p>Último pedido há x semanas</p>
                            </div>
                        }
                        { !user && 
                            <Button
                                color={tenant.mainColor}
                                label='Fazer Login'
                                onClick={() => router.push(`/${tenant.slug}/login`)}
                                fill
                            />
                        }
                    </div>
                    <div
                        className={styles.closeBtn}
                        style={{color: tenant.mainColor}}
                        onClick={onClose}
                        >x</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.menu}>
                    <SidebarMenuItem
                        color='#6A7D8B'
                        icon='menu'
                        label='Cardápio'
                        onClick={onClose}
                    />
                    <SidebarMenuItem
                        color='#6A7D8B'
                        icon='cart'
                        label='Cart'
                        onClick={() => router.push(`/${tenant.slug}/cart`)}
                    />
                    <SidebarMenuItem
                        color='#6A7D8B'
                        icon='fav'
                        label='Favoritos'
                        onClick={() => {}}
                        disabled
                    />
                    <SidebarMenuItem
                        color='#6A7D8B'
                        icon='order'
                        label='Meus Pedidos'
                        onClick={() => router.push(`/${tenant.slug}/order`)}
                    />
                    <SidebarMenuItem
                        color='#6A7D8B'
                        icon='config'
                        label='Configurações'
                        onClick={() => {}}
                        disabled
                    />
                </div>
                <div className={styles.menuButton}>
                    { user && 
                        <SidebarMenuItem
                            color='#6A7D8B'
                            icon='logout'
                            label='Sair'
                            onClick={() => {
                                setToken('')
                                onClose()
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    )
}