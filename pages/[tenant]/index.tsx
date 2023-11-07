import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import { SearchInput } from '../../components/SearchInput';
import styles from '../../styles/Home.module.css'
import { useApi } from '../../libs/useApi';
import { CountProvider } from '../../contexts/Countcontext';
import { Tenant } from '../../model/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { Product } from '../../model/Product';


const Home= (data:Props) => {
  const {tenant, setTenant} = useAppContext()
  const [products, setProducts] = useState<Product[]>(data.products)

  useEffect(() => {
    setTenant(data.tenant)
  },[])

  const handleSearchInput = (payload: string) => {
    console.log('você esta buscando por ' + payload)
  }


  return (
    <CountProvider>
    <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.headerTopLeft}>
              <div className={styles.headerTitle}>
                Seja Bem-Vindo(a)
              </div>
              <div className={styles.headerSubtitle}>
                O que deseja para hoje?
              </div>
            </div>
            <div className={styles.hraderTopRight}>
              <div className={styles.headerMenurBotton}>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              </div>
            </div>
          </div>
          <div className={styles.headerBottom}>
            <SearchInput onSearch={handleSearchInput}/>
          </div>
        </header>

        <Banner/>

        <div className={styles.grid}>
          { products.map((item, index) => (
            <ProductItem
              key={index}
              data={item}
            />
          ))}
        </div>
    </div>
    </CountProvider>
  );
}

export default Home;

type Props = {
  tenant: Tenant
  products: Product[]
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug } = context.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi(tenantSlug as string)
  const tenant = await api.getTenant()
  const products = await api.getAllProducts()

  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: { tenant, products } }
})