import { Address } from "./Address"
import { CartItem } from "./CartItem"

export type Order = {
    id: number
    status: 'preparing' | 'sent' | 'delivered'
    orderDate: string
    userId: string
    shippingAddress: Address
    shippingPrice: number
    paymentType: 'cash' | 'card'
    paynebtchange?: number
    cupom?: string
    cupomDiscount?: number
    products: CartItem[]
    subtotal: number
    total: number
}