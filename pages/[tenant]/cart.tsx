import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../../styles/Cart.module.css'
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getCookie } from "cookies-next";
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import Head from 'next/head'
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useFormatter } from '../../libs/useFormatter';


const Cart= (data:Props) => {
  const { setToken, setUser} = useAuthContext()
  const {tenant, setTenant} = useAppContext()

  const formatter = useFormatter()

  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if(data.user) setUser(data.user)
  },[])

  const [shippingInput, setShippingInput] = useState('')
  const [price, setPrice] = useState(0)

  const handleShipiing = () => {}



  return (
    <div className={styles.container}>
      <Head>
        <title>Sacola | {data.tenant.slug}</title>
      </Head>

      <Header
        href={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title='Sacola'
      />
    
      <div className={styles.productsQuantity}> x itens</div>

      <div className={styles.productsList}></div>

      <div className={styles.shippingArea}>
        <div className={styles.shippingTitle}>Calcular frete e prazo</div>
        <div className={styles.shippingForm}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder='Digite seu Cep'
            value={shippingInput}
            onChange={(newValue) => setShippingInput(newValue)}
          />
          <Button 
            color={data.tenant.mainColor}
            label='Ok'
            onClick={handleShipiing}
          />
        </div>

        <div className={styles.shippingInfo}>
          <div className={styles.shippingAddress}>Rua Bem Ali</div>
          <div className={styles.shippingTime}>
            <div className={styles.shippingTimeText}>
              Receba em 25 minutos
            </div>
            <div
              className={styles.shippingPrice}
              style={{color: data.tenant.mainColor}}
              >{formatter.formatPrice(price)}</div>
          </div>
        </div>
      </div>

      <div className={styles.resume}></div>

    </div>
  );
}

export default Cart;

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