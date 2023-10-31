export type tenantResponse = {
    name: string
    maincolor: string
    secondColor: string
}


export const useApi = () => ({

    getTenant: (tenantslug: string): boolean | tenantResponse => {

        switch(tenantslug) {
            case 'burgerx':
                return {
                    name: 'burgerx',
                    maincolor: '#ff0000',
                    secondColor: '#00ff00'
                }
            case 'pizzax':
                return {
                    name: 'pizzaxx',
                    maincolor: '#00ff00',
                    secondColor: '#0000ff'
                }
            default: return false

        }
        
    }
})