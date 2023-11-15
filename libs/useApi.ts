import { Product } from "../model/Product"
import { Tenant } from "../model/Tenant"

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
                    name: 'burgerx',
                    mainColor: '#E5383B',
                    secondColor: '#00ff00'
                }
            case 'pizzax':
                return {
                    slug: 'pizzax',
                    name: 'pizzax',
                    mainColor: '#00ff00',
                    secondColor: '#0000ff'
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
    }
})