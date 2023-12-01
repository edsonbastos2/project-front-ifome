import { Product } from "../types/Product"
import { Tenant } from "../types/Tenant"
import { User } from "../types/User"

const TEMPORARYondeProduct = {
    id:'1',
    name:'Burgão',
    img: '/temp/burger.png',
    price: 25.50,
    category: 'burguer',
    decription:'Burguer estilo texano, 2 blends de carne de 150g, queijo chedar, bacon com bastante molho BBQ'
} as Product

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
            products.push(TEMPORARYondeProduct)
        }
        return products
    },
    getProduct: async(id: string) => {

        return TEMPORARYondeProduct
    },

    authorization: async (token:string):Promise<User|false> => {
        if(!token) return false

        return {
            name:'Edson Bastos',
            email:'edsonbastos@gmail.com'
        }
    }
})