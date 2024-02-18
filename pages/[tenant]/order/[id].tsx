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
import { Order } from '../../../types/Order';


const OrderId= (data:Props) => {
  const { setToken, setUser} = useAuthContext()
  const { tenant, setTenant } = useAppContext()

  const formatter = useFormatter()
  const router = useRouter()
  const api = useApi(data.tenant.slug)

  const orderInfoStatus = {
    preparing: {
      label: 'Preparando',
      titleStatus: 'Preparando seu pedido...',
      backgroundColor: '#fefae6',
      fontcolor: '#d4bc34',
      pct: 25
    },
    sent:{
      label: 'Enviado',
      titleStatus: 'Pedido enviado!',
      backgroundColor: '#f1f3f8',
      fontcolor: '#758cbd',
      pct: 75
    },
    delivered: {
      label: 'Entregue',
      titleStatus: 'Seu pedido foi entregue!',
      backgroundColor: '#f1f8f6',
      fontcolor: '#6ab70a',
      pct: 100
    }
  }
  
  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if(data.user) setUser(data.user)
  },[])


  // useEffect(() => {
  //   if(data.order.status !== 'delivered') {
  //     setTimeout(() => {
  //       router.reload()
  //     }, 60000)
  //   }
  // },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pedidos {`#${data.order.id}`} | {data.tenant.slug}</title>
      </Head>

      <Header
        href={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title={`Pedido #${data.order.id}`}
      />

      { data.order.status !== 'delivered' &&

        <div
          className={styles.statusArea}
          style={{ backgroundColor: orderInfoStatus[data.order.status].backgroundColor}}
        >
          <div
            className={styles.statustitle}
            style={{ color: orderInfoStatus[data.order.status].fontcolor}}
          >
            {orderInfoStatus[data.order.status].titleStatus}
          </div>
          <div className={styles.statusPct}>
            <div
              className={styles.statusBar}
              style={{
                width: `${orderInfoStatus[data.order.status].pct}%`,
                backgroundColor: orderInfoStatus[data.order.status].fontcolor
              }}
            ></div>
          </div>
          <div className={styles.statusMsg}>
            Aguardando mudança de status...
          </div>
        </div>
      
      }

      <div className={styles.orderInfoArea}>
        <div
          className={styles.orderInfostatus}
          style={
            { backgroundColor: orderInfoStatus[data.order.status].backgroundColor,
              color: orderInfoStatus[data.order.status].fontcolor
            }
          }
        >{orderInfoStatus[data.order.status].label}</div>
        <div className={styles.orderInfoQtd}>
          { data.order.products.length } { data.order.products.length > 1 ? 'itens' : 'item'}
        </div>
        <div className={styles.orderInfoDate}>
          { formatter.formatDate(data.order.orderDate)}
        </div>
      </div>

      <div className={styles.productsList}>
        { data.order.products.map((cartItem, index) => (
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

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonwithIcon
              color={data.tenant.mainColor}
              leftIcon='location'
              rightIcon='rigtharrow'
              value={`${data.order.shippingAddress.street}, ${data.order.shippingAddress.number} - ${data.order.shippingAddress.neighborhood}`}
              onClick={() => {}}
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
                    fill={data.order.paymentType === 'cash'}
                    onClick={() => {}}
                  />
                </div>
                <div className={styles.paymentBtn}>
                  <ButtonwithIcon
                    color={data.tenant.mainColor}
                    value='Cartão'
                    leftIcon='card'
                    fill={data.order.paymentType === 'card'}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        { data.order.paymentType === 'cash' &&
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Troco</div>
            <div className={styles.infoBody}>
              <InputField
                color={data.tenant.mainColor}
                placeholder='Troco para quanto?'
                value={data.order.paymentchange?.toLocaleString() ?? ''}
                onChange={() => {}}
              />
            </div>
          </div>
        }

          { data.order.cupom &&
            <div className={styles.infoArea}>
              <div className={styles.infoTitle}>Cupom de desconto</div>
              <div className={styles.infoBody}>
              <ButtonwithIcon
                color={data.tenant.mainColor}
                value={data.order.cupom.toUpperCase()}
                rightIcon='checked'
                leftIcon='cupom'
              />
              </div>
            </div>
          }
      </div>

      <div className={styles.resume}>
        <div className={styles.resumeArea}>
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Subtotal</div>
            <div className={styles.resumeRight}>{formatter.formatPrice(data.order.subtotal)}</div>
          </div>
          { data.order.cupomDiscount &&
            <div className={styles.resumeItem}>
              <div className={styles.resumeLeft}>Desconto</div>
              <div className={styles.resumeRight}>-{formatter.formatPrice(data.order.cupomDiscount)}</div>
            </div>
          }
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Frete</div>
            <div className={styles.resumeRight}>{data.order.shippingPrice > 0 ? formatter.formatPrice(data.order.shippingPrice) : '--'}</div>
          </div>
          <div className={styles.resumeLine}></div>
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Total</div>
            <div
              className={styles.resumeBig} style={{color: data.tenant.mainColor}}>
                {formatter.formatPrice(data.order.subtotal)}
              </div>
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
  order: Order
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug, orderId } = context.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi(tenantSlug as string)
  const tenant = await api.getTenant()
  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // get logged user
  const token  = getCookie('_access_token', context)
  const user = await api.authorization(token as string)

  // get order

  const order = await api.getOrder(parseInt(orderId as string))
  

  return { props: { tenant, user, token, order } }
})