import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import { SearchInput } from '../../components/SearchInput';
import styles from '../../styles/Home.module.css'
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import Link from 'next/link';
import { Sidebar } from '../../components/Sidebar';
import { getCookie } from "cookies-next";
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import NoItemIcon from '../../public/assets/noItem.svg'


const Home= (data:Props) => {
  const { setToken, setUser} = useAuthContext()
  const {tenant, setTenant} = useAppContext()
  const [products, setProducts] = useState<Product[]>(data.products)
  const [openSidebar, setSidebar] = useState(false)

  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if(data.user) {
      setUser(data.user)
    }
  },[])

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchText, setSearchText] = useState('')
  const handleSearchInput = (payload: string) => {
    setSearchText(payload)
  }

  useEffect(() => {
    let newFilterProducts = [] as Product[]

    for(let product of data.products) {
      if(product.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1) {
        newFilterProducts.push(product)
      }
    }

    setFilteredProducts(newFilterProducts)
  }, [searchText])


  return (
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
              <div className={styles.headerMenurBotton} onClick={() => setSidebar(true)}>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              </div>

              <Sidebar
                tenant={data.tenant}
                openSidebar={openSidebar}
                onClose={() => setSidebar(false)}
              />
            </div>
          </div>
          <div className={styles.headerBottom}>
            <SearchInput onSearch={handleSearchInput}/>
          </div>
        </header>

        {
          searchText && 
          
            <>
              <div className={styles.searchText}>
                Procurando por: <strong>{searchText}</strong>
              </div>
              {
              
                filteredProducts.length > 0 &&

                  <Link href={`/${data.tenant.slug}/produto/1`}>
                  <div className={styles.grid}>
                    { filteredProducts.map((item, index) => (
                        <ProductItem
                          key={index}
                          data={item}
                        />
                        ))}
                  </div>
                  </Link>
              
              }

              {
                filteredProducts.length === 0 &&
                <div className={styles.noProducts}>
                  <NoItemIcon color="#e0e0e0"/>
                  <div className={styles.noItem}>Ops! Não há itens com este nome</div>
                </div>
              }
            </>
        }

        { !searchText &&
        <>
          <Banner/>
            <Link href={`/${data.tenant.slug}/produto/1`}>
              <div className={styles.grid}>
                { products.map((item, index) => (
                    <ProductItem
                      key={index}
                      data={item}
                    />
                    ))}
              </div>
            </Link>
        </>
        }
    </div>
  );
}

export default Home;

type Props = {
  tenant: Tenant
  products: Product[]
  token: string
  user: User | null
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug } = context.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi(tenantSlug as string)
  const tenant = await api.getTenant()
  const products = await api.getAllProducts()

  const token  = getCookie('_access_token', context)

  const user = await api.authorization(token as string)

  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: { tenant, products, user, token } }
})