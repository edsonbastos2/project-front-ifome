import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../../styles/MyAddresses.module.css'
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from "cookies-next";
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import Head from 'next/head'
import { Header } from '../../components/Header';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import { Button } from '../../components/Button';
import { Address } from '../../types/Address';


const MyAddresses= (data:Props) => {
  const { setToken, setUser} = useAuthContext()
  const {tenant, setTenant} = useAppContext()

  
  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if(data.user) setUser(data.user)
  },[])

  const formatter = useFormatter()
  const router = useRouter()


  const handleNewAddress = () => {
    router.push(`/${data.tenant.slug}/newAddress`)
  }

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Meus Endereços | {data.tenant.slug}</title>
      </Head>

      <Header
        href={`/${data.tenant.slug}/checkout`}
        color={data.tenant.mainColor}
        title='Meus Endereços'
      />

      <div className={styles.list}>
        { data.addresses.map((item, index) => (
          <div key={index}>{item.street} - {item.number}</div>
        ))}
      </div>
      <div className={styles.btnArea}>
        <Button
          color={data.tenant.mainColor}
          label='Novo endereço'
          onClick={handleNewAddress}
          fill
        />
      </div>
      

    </div>
  );
}

export default MyAddresses;

type Props = {
  tenant: Tenant
  token: string
  user: User | null,
  addresses: Address[]
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug } = context.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi(tenantSlug as string)

  // Get Tenant
  const tenant = await api.getTenant()
  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // Get Logged user
  const token  = getCookie('_access_token', context)
  const user = await api.authorization(token as string)
  if(!user) {
    return { redirect: {destination:'/', permanent: false}}
  }

  // Get Address from User logged
  const addresses = await api.getUserAddresses(user.email)

  return { props: { tenant, user, token, addresses } }
})