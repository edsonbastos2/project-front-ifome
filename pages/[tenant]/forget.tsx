import { GetServerSideProps } from 'next';
import styles from '../../styles/Forget.module.css'
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useRouter } from 'next/router';


const Forget = (data:Props) => {
  const {tenant, setTenant} = useAppContext()

  const [email, setEmail] = useState('')

  const router = useRouter()

  useEffect(() => {
    setTenant(data.tenant)
  },[])

  const handleSubmit = () => {
      router.push(`/${data.tenant.slug}/forget-success`)

  }

  return (
    <div className={styles.container}>
        <Head>
            <title>Esqueceu a semha | {data.tenant.slug}</title>
        </Head>

        <Header
          color={data.tenant.mainColor}
          href={`/${data.tenant.slug}/login`}
        />

        <div className={styles.header}>{data.tenant.name}</div>
        <div className={styles.title}>Esqueceu sua senha?</div>
        <div
          className={styles.subtitle}
          style={{borderBottomColor: data.tenant.mainColor}}
        >
            Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir a sua senha.
        </div>
        <div className={styles.line}></div>

        <div className={styles.formArea}>
          <div className={styles.inputArea}>
              <InputField
                color={data.tenant.mainColor}
                placeholder='Digite seu e-mail'
                value={email}
                onChange={setEmail}
              />
          </div>
          <div className={styles.inputArea}>
              <Button
                color={data.tenant.mainColor}
                label='Enviar'
                onClick={handleSubmit}
                fill
              />
          </div>
        </div>
    </div>
  );
}

export default Forget;

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