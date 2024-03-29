import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../../styles/Cart.module.css'
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getCookie, setCookie } from "cookies-next";
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import Head from 'next/head'
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../components/CartProductItem';
import { CartCookie } from '../../types/CartCookie';


const Cart= (data:Props) => {
  const { setToken, setUser} = useAuthContext()
  const {tenant, setTenant} = useAppContext()

  
  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if(data.user) setUser(data.user)
  },[])

  const formatter = useFormatter()
  const router = useRouter()

  // Product control
    const [cart, setCart] = useState<CartItem[]>(data.cart)
    const handleCartChange = (newCount: number, id:number) => {
      const tempCart: CartItem[] = [...cart]
      const cartIndex = tempCart.findIndex(item => item.product.id === id)
      console.log('cartIndex: ', cartIndex)

      if(newCount > 0) {
        tempCart[cartIndex].qtd = newCount
      } else {
        delete tempCart[cartIndex]
      }

      let newCart: CartItem[] = tempCart.filter(item  => item)

      setCart(newCart)

      // update cookie

      let cartCookie: CartCookie[] = []
      for(let i in newCart) {
        cartCookie.push({
          id: newCart[i].product.id,
          qtd: newCart[i].qtd
        })
      }

      setCookie('cart', JSON.stringify(cartCookie))
    }

  // Shipping
    const [shippingInput, setShippingInput] = useState('')
    const [shippingPrice, setShippingPrice] = useState(0)
    const [shippingTime, setShippingTime] = useState(0)
    const [shippingAddress, setShippingAddress] = useState('')
    const handleShipiing = () => {
      setShippingAddress('Rua ABC, 123')
      setShippingPrice(14.50)
      setShippingTime(25)
      setShippingAddress(shippingInput)
    }

  // Resume
    const [subtotal, setSubtotal] = useState(0)
    useEffect(() => {
      let sub = 0

      for(let i in cart) {
        sub += cart[i].product.price * cart[i].qtd
      }

      setSubtotal(sub)
    },[cart])

    const handleFinish = () => {
      router.push(`/${data.tenant.slug}/checkout`)
    }


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
    
      <div className={styles.productsQuantity}> { cart.length } { cart.length > 1 ? 'itens' : 'item'}</div>

      <div className={styles.productsList}>
        { cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qtd}
            productItem={cartItem.product}
            onChange={handleCartChange}
          />
        ))}
      </div>

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

        {shippingTime > 0 &&
          <div className={styles.shippingInfo}>
            <div className={styles.shippingAddress}>{ shippingAddress }</div>
            <div className={styles.shippingTime}>
              <div className={styles.shippingTimeText}>
                Receba em {shippingTime} minutos
              </div>
              <div
                className={styles.shippingPrice}
                style={{color: data.tenant.mainColor}}
                >{formatter.formatPrice(shippingPrice)}</div>
            </div>
          </div>
        }

      </div>

      <div className={styles.resume}>
        <div className={styles.resumeArea}>
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Subtotal</div>
            <div className={styles.resumeRight}>{formatter.formatPrice(subtotal)}</div>
          </div>
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Frete</div>
            <div className={styles.resumeRight}>{shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}</div>
          </div>
          <div className={styles.resumeLine}></div>
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Total</div>
            <div
              className={styles.resumeBig} style={{color: data.tenant.mainColor}}>
                {formatter.formatPrice(shippingPrice + subtotal)}
              </div>
          </div>
          <div className={styles.resumeBtn}>
            <Button
              color={data.tenant.mainColor}
              label='Continuar'
              onClick={handleFinish}
              fill
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Cart;

type Props = {
  tenant: Tenant
  token: string
  user: User | null,
  cart: CartItem[]
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug } = context.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi(tenantSlug as string)

  const tenant = await api.getTenant()

  const token  = getCookie('_access_token', context)

  const user = await api.authorization(token as string)

  const cartCookie = getCookie('cart', context)

  const cart = await api.getCartProduct(cartCookie as string)

  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: { tenant, user, token, cart } }
})