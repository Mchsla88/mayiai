'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'sonner'

export interface CartItem {
  id: string
  title: string
  price: number
  imageUrl?: string | null
  slug: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mayiai_cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mayiai_cart', JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        toast.info('To szkolenie jest już w koszyku')
        return prev
      }
      toast.success('Dodano do koszyka')
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast.success('Usunięto z koszyka')
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, count: items.length }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
