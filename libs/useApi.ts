import { Tenant } from "../model/Tenant"

export const useApi = () => ({

    getTenant: (tenantslug: string): boolean | Tenant => {

        switch(tenantslug) {
            case 'burgerx':
                return {
                    slug: 'burgerx',
                    name: 'burgerx',
                    mainColor: '#ff0000',
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
        
    }
})