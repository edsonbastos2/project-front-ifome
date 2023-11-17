export const useFormatter = () => ({
    formatPrice: (payload:number) => {
        return payload.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    },

    formatQuantity: (quantity: number, digite: number) => {
        if(quantity.toString().length >= digite) return quantity

        const remain = digite - quantity.toString().length

        return `${'0'.repeat(remain)}${quantity}`
    }
})