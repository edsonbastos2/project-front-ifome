import { GetServerSideProps } from 'next';
import styles from '../../styles/ForgetSuccess.module.css'
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../model/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { useRouter } from 'next/router';
import { Icon } from '../../components/Icon';


const ForgetSuccess = (data:Props) => {
  const {tenant, setTenant} = useAppContext()

  const router = useRouter()

  useEffect(() => {
    setTenant(data.tenant)
  },[])

  const handleSubmit = () => {
      router.push(`/${data.tenant.slug}/login`)

  }

  return (
    <div className={styles.container}>
        <Head>
            <title>Esqueceu a semha | {data.tenant.slug}</title>
        </Head>

        <Header
          color={data.tenant.mainColor}
          href={`/${data.tenant.slug}/forget`}
        />

        <div className={styles.msgIcon}>
            <Icon color={data.tenant.mainColor} icon='envelope' width={99} height={81}/>
        </div>

        <div className={styles.title}>Verifique seu e-mail</div>
        <div
          className={styles.subtitle}
        >
            Enviamos as instruções para recuperação de senha para o seu e-mail.
        </div>

        <div className={styles.formArea}>
          <div className={styles.inputArea}>
              <Button
                color={data.tenant.mainColor}
                label='Fazer Login'
                onClick={handleSubmit}
                fill
              />
          </div>
        </div>
    </div>
  );
}

export default ForgetSuccess;

type Props = {
  tenant: Tenant
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug } = context.query
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

  console.log('data: ', tenantSlug)
  return { props: { tenant } }
})