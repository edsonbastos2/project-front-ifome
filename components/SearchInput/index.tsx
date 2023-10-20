import styles from './styles.module.css'

export const SearchInput = () => {
    return(
        <div className={styles.container}>
            <div className={styles.button}></div>
            <input placeholder='Digite o nome do rango' type="text" className={styles.input}/>
        </div>
    )
}