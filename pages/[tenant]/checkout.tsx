import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../../styles/Checkout.module.css'
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
import { ButtonwithIcon } from '../../components/ButtonWithIcon';
import { Address } from '../../types/Address';


const Checkout= (data:Props) => {
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

  // Shipping
    const [shippingPrice, setShippingPrice] = useState(0)
    const [shippingAddress, setShippingAddress] = useState<Address>()

    const handlechangeAddress = () => {
      // router.push(`/${data.tenant.slug}/myAddresses`)
      setShippingAddress({
        id:1,
        cep:'99999-999',
        street: 'Rua das Flores',
        number: '321',
        city: 'São Paulo',
        neighborhood: 'Jardins',
        state: 'SP'
      })
      setShippingPrice(4.50)
    }

  // Payments
  const [paymentType, setPaymenttype] = useState<'cash' | 'card'>('cash')
  const [paymentchange, setPaymentchange] = useState(0)

  // Resume
    const [subtotal, setSubtotal] = useState(0)
    useEffect(() => {
      let sub = 0

      for(let i in cart) {
        sub += cart[i].product.price * cart[i].qtd
      }

      setSubtotal(sub)
    },[cart])

    const handleFinish = () => {}

    const newValuePayment = () => {}


  return (
    <div className={styles.container}>
      <Head>
        <title>Checkout | {data.tenant.slug}</title>
      </Head>

      <Header
        href={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title='Checkout'
      />

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonwithIcon
              color={data.tenant.mainColor}
              value={
                shippingAddress ?
                `${shippingAddress.street}, ${shippingAddress.number} - ${shippingAddress.neighborhood}`
                : 'Escolha um endereço'
              }
              leftIcon='location'
              rightIcon='rigtharrow'
              onClick={handlechangeAddress}
            />
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Tipo de pagamento</div>
          <div className={styles.infoBody}>
            <div className={styles.infoPayment}>
              <div className={styles.paymentTypes}>
                <div className={styles.paymentBtn}>
                  <ButtonwithIcon
                    color={data.tenant.mainColor}
                    value='Dinheiro'
                    leftIcon='cash'
                    fill={paymentType === 'cash'}
                    onClick={() => setPaymenttype('cash')}
                  />
                </div>
                <div className={styles.paymentBtn}>
                  <ButtonwithIcon
                    color={data.tenant.mainColor}
                    value='Cartão'
                    leftIcon='card'
                    fill={paymentType === 'card'}
                    onClick={() => setPaymenttype('card')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        { paymentType === 'cash' &&
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Troco</div>
            <div className={styles.infoBody}>
              <InputField
                color={data.tenant.mainColor}
                placeholder='Troco para quanto?'
                value={paymentchange ? paymentchange.toLocaleString() : ''}
                onChange={newValuePayment => setPaymentchange(parseInt(newValuePayment))}
              />
            </div>
          </div>
        }
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Cupom de desconto</div>
          <div className={styles.infoBody}>
            <ButtonwithIcon
              color={data.tenant.mainColor}
              value='Teste agora'
              rightIcon='checked'
              leftIcon='cupom'
            />
          </div>
        </div>
      </div>
    
      <div className={styles.productsQuantity}> { cart.length } { cart.length > 1 ? 'itens' : 'item'}</div>

      <div className={styles.productsList}>
        { cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qtd}
            productItem={cartItem.product}
            onChange={() => {}}
            noEdit
          />
        ))}
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
              label='Finalizar Pedido'
              onClick={handleFinish}
              fill
              disabled={!shippingAddress}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Checkout;

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