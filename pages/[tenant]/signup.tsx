import { GetServerSideProps } from 'next';
import styles from '../../styles/SignUp.module.css'
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';


const SignUp = (data:Props) => {
  const {tenant, setTenant} = useAppContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const router = useRouter()

  useEffect(() => {
    setTenant(data.tenant)
  },[])

  const handleSubmit = () => {}
  const handleSignUp = () => {
    router.push(`/${data.tenant.slug}/signup`)
  }


  return (
    <div className={styles.container}>
        <Head>
            <title>Login | {data.tenant.slug}</title>
        </Head>

        <Header
          color={data.tenant.mainColor}
          href={`/${data.tenant.slug}/login`}
        />

        <div className={styles.header}>{data.tenant.name}</div>
        <div
          className={styles.subtitle}
          style={{borderBottomColor: data.tenant.mainColor}}
        >Preencha os campos para criar o seu cadastro.</div>
        <div className={styles.line}></div>

        <div className={styles.formArea}>
          <div className={styles.inputArea}>
              <InputField
                color={data.tenant.mainColor}
                placeholder='Digite seu nome'
                value={name}
                onChange={setName}
              />
          </div>
          <div className={styles.inputArea}>
              <InputField
                color={data.tenant.mainColor}
                placeholder='Digite seu e-mail'
                value={email}
                onChange={setEmail}
              />
          </div>
          <div className={styles.inputArea}>
            <InputField
              color={data.tenant.mainColor}
              placeholder='Digite sua senha'
              value={password}
              onChange={setPassword}
              password
            />
          </div>
          <div className={styles.inputArea}>
              <Button
                color={data.tenant.mainColor}
                label='Entrar'
                onClick={handleSubmit}
                fill
              />
          </div>
        </div>

        <div
          className={styles.forgetArea}
          style={{borderBottomColor: data.tenant.mainColor}}
          >
          Já tenho cadastro?
          <Link
            href={`/${data.tenant.slug}/login`}
            style={{color:data.tenant.mainColor}}
          >Fazer login</Link>
        </div>
    </div>
  );
}

export default SignUp;

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