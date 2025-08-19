import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cardItems = ref([]) 

  function addToCart(product) {
    if (!product) return;
    const existing = cardItems.value.find(e => e.id === product.id)
    if (existing) {
      existing.count += 1
    } else {
      // Add count property for first time
      product.count = 1
      cardItems.value.push(product)
    }
  }

  function increase(id){
    const item = cardItems.value.find(e => e.id === id)
    if(!item) return;
    else {
      item.count += 1
    }
    
  }

function decrease(id){
    const item = cardItems.value.find(e => e.id === id)
    if(!item) return;
    if(item.count  <= 1){
      const newItem = cardItems.value.findIndex(e => e.id === item.id)
      if (newItem !== -1) {
  cardItems.value.splice(newItem, 1)
}
    }
    item.count -= 1    
  }

  function removeFromCart(id) {
    cardItems.value = cardItems.value.filter(e => e.id !== id)
  }

  function clearCart() {
    cardItems.value = []
  }

  return {
    cardItems,
    addToCart,
    removeFromCart,
    clearCart,
    increase,
    decrease,
  }
})
