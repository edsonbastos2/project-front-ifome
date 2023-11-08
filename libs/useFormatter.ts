export const useFormatter = () => ({
    formatPrice: (payload:number) => {
        return payload.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    }
})