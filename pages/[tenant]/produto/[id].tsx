import { GetServerSideProps } from 'next';
import styles from '../../../styles/product-id.module.css'
import { useApi } from '../../../libs/useApi';
import { Tenant } from '../../../model/Tenant';
import { useAppContext } from '../../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { Product } from '../../../model/Product';
import Head from 'next/head';
import { Header } from '../../../components/Header';


const Product= (data:Props) => {
  const {tenant, setTenant} = useAppContext()
  const [product, setProduct] = useState<Product>(data.product)

  useEffect(() => {
    setTenant(data.tenant)
  },[])



  return (
    <div className={styles.container}>
        <Head>
            <title>{data.product.name} | {data.tenant.name}</title>
        </Head>

        <div className={styles.headerArea}>
            <Header
                color={data.tenant.mainColor}
                href={`/${data.tenant.slug}`}
                title='Produto'
                invert
            />
        </div>

        <div className={styles.headerBg} style={{ backgroundColor: data.tenant.mainColor}}></div>

        <div className={styles.productImage}>
            <img src={data.product.img} alt="" />
        </div>
    </div>
  );
}

export default Product;

type Props = {
  tenant: Tenant
  product: Product
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug, id } = context.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi(tenantSlug as string)
  const tenant = await api.getTenant()
  const product = await api.getProduct(id as string)

  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: { tenant, product } }
})