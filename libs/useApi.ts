import { Address } from "../types/Address"
import { CartItem } from "../types/CartItem"
import { Order } from "../types/Order"
import { Product } from "../types/Product"
import { Tenant } from "../types/Tenant"
import { User } from "../types/User"

const TEMPORARYoneProduct = {
    id:1,
    name:'Burgão',
    img: '/temp/burger.png',
    price: 25.50,
    category: 'burguer',
    decription:'Burguer estilo texano, 2 blends de carne de 150g, queijo chedar, bacon com bastante molho BBQ'
} as Product

const TEMPORARYOrder = {
    id: 321,
    status: 'preparing',
    orderDate:'2024-02-4',
    userId: '12',
    shippingAddress: {
        id:3,
        street: 'Rua ABC',
        number:'389',
        cep: '54833001',
        city: 'Fortaleza',
        neighborhood:'Barra do ceará',
        state: 'CE'
    },
    shippingPrice: 9.14,
    paymentType: 'card',
    cupom: 'AQQ',
    cupomDiscount: 14.3,
    products: [
        {product: {...TEMPORARYoneProduct, id:3}, qtd: 1},
        {product: {...TEMPORARYoneProduct, id:2}, qtd: 2},
        {product: {...TEMPORARYoneProduct, id:6}, qtd: 1},
    ],
    subtotal: 204,
    total: 198.84
} as Order

export const useApi = (tenantslug: string) => ({

    getTenant: async() => {

        switch(tenantslug) {
            case 'burgerx':
                return {
                    slug: 'burgerx',
                    name: 'HambugueriaX',
                    mainColor: '#E5383B',
                    secondColor: '#FFF9F2'
                }
            case 'pizzax':
                return {
                    slug: 'pizzax',
                    name: 'PizzariaX',
                    mainColor: '#6AB70A',
                    secondColor: '#E0E0E0'
                }
            default: return false

        }
        
    },

    getAllProducts: async() => {
        let products = []
        for(let p = 0; p<10;p++){
            products.push({
                ...TEMPORARYoneProduct,
                id: p + 1
            })
        }
        return products
    },
    getProduct: async(id: number) => {

        return {...TEMPORARYoneProduct, id}
    },

    getCartProduct: async(cartCookie: string) => {
        let cart = [] as CartItem[]

        if(!cartCookie) return cart
        const cartJson = JSON.parse(cartCookie)

        for(let i in cartJson) {
            if(cartJson[i].id && cartJson[i].qtd) {
                const product = {
                    ...TEMPORARYoneProduct,
                    id: cartJson[i].id
                }
                cart.push({
                    qtd: cartJson[i].qtd,
                    product
                })
            }
        }

        return cart
    },

    authorization: async (token:string):Promise<User|false> => {
        if(!token) return false

        return {
            name:'Edson Bastos',
            email:'edsonbastos@gmail.com'
        }
    },

    getUserAddresses: async(email:string) => {
        const addresses:Address[] = []

        for(let i=0; i<4;i++) {
            addresses.push({
                id: i + 1,
                street: `Rua Ceci `,
                number: `${i+1}00`,
                cep:'999999999',
                city:'Fortaleza',
                state: 'CE',
                neighborhood:'Barra do ceará',
            })
        }
        return addresses
    },

    getUserAddress: async (id:number) => {
        let address = {
            id,
            street: `Rua Ceci `,
            number: `${id}00`,
            cep:'999999999',
            city:'Fortaleza',
            state: 'CE',
            neighborhood:'Barra do ceará'
        } as Address

        return address
    },

    addUserAddress: async (address: Address) => {
        return {...address, id:3}
    },

    editUserAddress: async (address: Address) => {
        return true
    },

    deleteAddressUser: async (id:number) => {
        return true
    },

    getShippingPrice: async (address: Address) => {
        return 9.50
    },

    setOrder: async (
        address: Address,
        paymentType: 'cash' | 'card',
        paymentchange: number,
        cupom: string,
        cart: CartItem[]
    ) => {

        return TEMPORARYOrder
    },

    getOrder: async (orderId: number) => {
        return TEMPORARYOrder
    }


})