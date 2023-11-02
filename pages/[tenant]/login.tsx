import { GetServerSideProps } from 'next';
import styles from '../../styles/Home.module.css'
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../model/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect } from 'react';
import Head from 'next/head';


const Login = (data:Props) => {
  const {tenant, setTenant} = useAppContext()

  useEffect(() => {
    setTenant(data.tenant)
  },[])


  return (
    <div className={styles.container}>
        <Head>
            <title>Login | {data.tenant.slug}</title>
        </Head>
    </div>
  );
}

export default Login;

type Props = {
  tenant: Tenant
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug } = context.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi()
  const tenant = await api.getTenant(tenantSlug as string)

  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  console.log('data: ', tenantSlug)
  return { props: { tenant } }
})