import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../../../styles/NewAddress.module.css'
import { useApi } from '../../../libs/useApi';
import { Tenant } from '../../../types/Tenant';
import { useAppContext } from '../../../contexts/app';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from "cookies-next";
import { User } from '../../../types/User';
import { useAuthContext } from '../../../contexts/auth';
import Head from 'next/head'
import { Header } from '../../../components/Header';
import { useFormatter } from '../../../libs/useFormatter';
import { CartItem } from '../../../types/CartItem';
import { useRouter } from 'next/router';
import { Button } from '../../../components/Button';
import { Address } from '../../../types/Address';
import AddressesItem from '../../../components/AddressesItem/Index';
import { InputField } from '../../../components/InputField';


const EditAddress= (data:Props) => {
  const { setToken, setUser} = useAuthContext()
  const {tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext()

  const [errorFields, setErrorFields] = useState<string[]>([])
  const [address, setAddress] = useState<Address>(data.address)

  const changeAddressField = (
    field: keyof Address,
    value: typeof address[keyof Address]
    ) => {
        setAddress({...address, [field]:value})
    }

  
  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if(data.user) setUser(data.user)
  },[])

  const formatter = useFormatter()
  const router = useRouter()
  const api = useApi(data.tenant.slug)

  const verifyAddress = () => {
    let newArrayErrorAddress = []
    let approved = true

    if(address.cep.replaceAll(/[^0-9]/g, '').length !== 8) {
        newArrayErrorAddress.push('cep')
        approved = false
    }

    if(address.street.length <= 2) {
        newArrayErrorAddress.push('street')
        approved = false
    }

    if(address.city.length <= 2) {
        newArrayErrorAddress.push('city')
        approved = false
    }

    if(address.state.length !== 2) {
        newArrayErrorAddress.push('state')
        approved = false
    }

    if(address.neighborhood.length <= 2) {
        newArrayErrorAddress.push('neighborhood')
        approved = false
    }

    setErrorFields(newArrayErrorAddress)
    return approved
  }

  const handleEditAddress = async () => {
    if(verifyAddress()) {
        await api.editUserAddress(address)
        router.push(`/${data.tenant.slug}/myAddresses`)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Editar Endereço | {data.tenant.slug}</title>
      </Head>

      <Header
        href={`/${data.tenant.slug}/myAddresses`}
        color={data.tenant.mainColor}
        title='Editar Endereço'
      />

      <div className={styles.inputs}>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.inputLabel}>CEP</div>
                <InputField
                    placeholder='Digite seu cep'
                    value={address.cep}
                    onChange={ value => changeAddressField('cep', value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('cep')}
                />
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.inputLabel}>Rua</div>
                <InputField
                    placeholder='Digite sua rua'
                    value={address.street}
                    onChange={ value => changeAddressField('street', value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('street')}
                />
            </div>
            <div className={styles.column}>
                <div className={styles.inputLabel}>Número</div>
                <InputField
                    placeholder='Digite seu cep'
                    value={address.number}
                    onChange={ value => changeAddressField('number', value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('number')}
                />
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.inputLabel}>Bairo</div>
                <InputField
                    placeholder='Digite seu bairro'
                    value={address.neighborhood}
                    onChange={ value => changeAddressField('neighborhood', value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('neighborhood')}
                />
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.inputLabel}>Cidade</div>
                <InputField
                    placeholder='Digite sua cidade'
                    value={address.city}
                    onChange={ value => changeAddressField('city', value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('city')}
                />
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.inputLabel}>Estado</div>
                <InputField
                    placeholder='Digite seu estado'
                    value={address.state}
                    onChange={ value => changeAddressField('state', value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('state')}
                />
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.inputLabel}>Complemento</div>
                <InputField
                    placeholder='Digite seu complemento'
                    value={address.complement ?? ''}
                    onChange={ value => changeAddressField('complement', value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('complement')}
                />
            </div>
        </div>
      </div>

      <div className={styles.btnArea}>
        <Button
          color={data.tenant.mainColor}
          label='Atualizar'
          onClick={handleEditAddress}
          fill
        />
      </div>
      

    </div>
  );
}

export default EditAddress;

type Props = {
  tenant: Tenant
  token: string
  user: User | null,
  address: Address
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps:GetServerSideProps = (async (context) => {
  const { tenant: tenantSlug, id } = context.query
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

  // Get Address from User
  const address = await api.getUserAddress(parseInt(id as string))
  if(!address) {
    return { redirect: {destination:'/myAddresses', permanent: false}}
  }

  return { props: { tenant, user, token, address } }
})