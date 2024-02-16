import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../../../styles/Order-id.module.css'
import { useApi } from '../../../libs/useApi';
import { Tenant } from '../../../types/Tenant';
import { useAppContext } from '../../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import { getCookie, setCookie } from "cookies-next";
import { User } from '../../../types/User';
import { useAuthContext } from '../../../contexts/auth';
import Head from 'next/head'
import { Header } from '../../../components/Header';
import { InputField } from '../../../components/InputField';
import { Button } from '../../../components/Button';
import { useFormatter } from '../../../libs/useFormatter';
import { CartItem } from '../../../types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../../components/CartProductItem';
import { CartCookie } from '../../../types/CartCookie';
import { ButtonwithIcon } from '../../../components/ButtonWithIcon';
import { Address } from '../../../types/Address';


const OrderId= (data:Props) => {
  const { setToken, setUser} = useAuthContext()
  const {tenant, setTenant, shippingAddress, shippingPrice} = useAppContext()

  
  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if(data.user) setUser(data.user)
  },[])

  const formatter = useFormatter()
  const router = useRouter()
  const api = useApi(data.tenant.slug)

  // Product control
    const [cart, setCart] = useState<CartItem[]>(data.cart)

  // Shipping
    const handleChangeAddress = () => {
      router.push(`/${data.tenant.slug}/myAddresses`)
    }

  // Payments
  const [paymentType, setPaymenttype] = useState<'cash' | 'card'>('cash')
  const [paymentchange, setPaymentchange] = useState(0)

  // Cupom
  const [cupom, setCupom] = useState('')
  const [cupomDiscount, setCupomDiscount] = useState(0)
  const [cupomInput, setcupomInput] = useState('')

  const handleSetCupom = () => {
    if(cupomInput) {
      setCupom(cupomInput)
      setCupomDiscount(10.5)
    }
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

    const handleFinish = async() => {
      if(shippingAddress) {
        const order = await api.setOrder(
          shippingAddress,
          paymentType,
          paymentchange,
          cupom,
          data.cart
        )

        if(order) {
          router.push(`/${data.tenant.slug}/order/${order.id}`)
        } else {
          alert('Error ao eviar seu pedido! 😓')
        }
      }
    }

    const newValuePayment = () => {}


  return (
    <div className={styles.container}>
      <Head>
        <title>Pedidos #123 | {data.tenant.slug}</title>
      </Head>

      <Header
        href={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title={`Pedido #xxx`}
      />

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonwithIcon
              color={data.tenant.mainColor}
              leftIcon='location'
              rightIcon='rigtharrow'
              value={shippingAddress ? `${shippingAddress.street}, ${shippingAddress.number} - ${shippingAddress.neighborhood}` : 'Escolha um endereço'}
              onClick={handleChangeAddress}
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
              { cupom &&
                <ButtonwithIcon
                  color={data.tenant.mainColor}
                  value={cupom.toUpperCase()}
                  rightIcon='checked'
                  leftIcon='cupom'
                />
              }
            </div>
          </div>

        { !cupom && 
          <div className={styles.cupomInput}>
            <InputField
              color={data.tenant.mainColor}
              placeholder='Tem Cupom?'
              value={cupomInput}
              onChange={newValue => setcupomInput(newValue)}
            />
            <Button
              color={data.tenant.mainColor}
              label='OK'
              onClick={handleSetCupom}
            />
          </div>
        
        }
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
          { cupomDiscount > 0 &&
            <div className={styles.resumeItem}>
              <div className={styles.resumeLeft}>Desconto</div>
              <div className={styles.resumeRight}>-{formatter.formatPrice(cupomDiscount)}</div>
            </div>
          }
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Frete</div>
            <div className={styles.resumeRight}>{shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}</div>
          </div>
          <div className={styles.resumeLine}></div>
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Total</div>
            <div
              className={styles.resumeBig} style={{color: data.tenant.mainColor}}>
                {formatter.formatPrice(subtotal - cupomDiscount + shippingPrice)}
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

export default OrderId;

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