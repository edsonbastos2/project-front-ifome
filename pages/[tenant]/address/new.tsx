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


const MyAddresses= (data:Props) => {
  const { setToken, setUser} = useAuthContext()
  const {tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext()

  const [errorFields, setErrorFields] = useState<string[]>([])
  const [addressCep, setAddressCep] = useState('')
  const [addressStreet, setAddressStreet] = useState('')
  const [addressState, setAddressState] = useState('')
  const [addressCity, setAddressCity] = useState('')
  const [addressComplemet, setAddressComplement] = useState('')
  const [addressNeighborhood, setAddressNeighborhood] = useState('')
  const [addressNumber, setAddressNumber] = useState('')

  
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

    if(addressCep.replaceAll(/[^0-9]/g, '').length !== 8) {
        newArrayErrorAddress.push('cep')
        approved = false
    }

    if(addressStreet.length <= 2) {
        newArrayErrorAddress.push('street')
        approved = false
    }

    if(addressCity.length <= 2) {
        newArrayErrorAddress.push('city')
        approved = false
    }

    if(addressState.length !== 2) {
        newArrayErrorAddress.push('state')
        approved = false
    }

    if(addressNeighborhood.length <= 2) {
        newArrayErrorAddress.push('neighborhood')
        approved = false
    }

    setErrorFields(newArrayErrorAddress)
    return approved
  }

  const handleNewAddress = async () => {
    if(verifyAddress()) {

        let address = {
            id: 0,
            street: addressStreet,
            number: addressNumber,
            cep: addressCep,
            city: addressCity,
            state: addressState,
            neighborhood: addressNeighborhood,
            complement: addressComplemet
        } as Address

        let newAddress = await api.addUserAddress(address)
        if(newAddress.id > 0) {
            router.push(`/${data.tenant.slug}/myAddresses`)
        } else{
            alert('Erro ao enviar endereço!')
        }

    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Novo Endereço | {data.tenant.slug}</title>
      </Head>

      <Header
        href={`/${data.tenant.slug}/myAddresses`}
        color={data.tenant.mainColor}
        title='Novo Endereço'
      />

      <div className={styles.inputs}>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.inputLabel}>CEP</div>
                <InputField
                    placeholder='Digite seu cep'
                    value={addressCep}
                    onChange={ value => setAddressCep(value)}
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
                    value={addressStreet}
                    onChange={ value => setAddressStreet(value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('street')}
                />
            </div>
            <div className={styles.column}>
                <div className={styles.inputLabel}>Número</div>
                <InputField
                    placeholder='Digite seu cep'
                    value={addressNumber}
                    onChange={ value => setAddressNumber(value)}
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
                    value={addressNeighborhood}
                    onChange={ value => setAddressNeighborhood(value)}
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
                    value={addressCity}
                    onChange={ value => setAddressCity(value)}
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
                    value={addressState}
                    onChange={ value => setAddressState(value)}
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
                    value={addressComplemet}
                    onChange={ value => setAddressComplement(value)}
                    color={data.tenant.mainColor}
                    warning={errorFields.includes('complement')}
                />
            </div>
        </div>
      </div>

      <div className={styles.btnArea}>
        <Button
          color={data.tenant.mainColor}
          label='Adicionar'
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