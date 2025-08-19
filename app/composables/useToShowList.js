// ~/composables/useToShowList.js
export default function useToShowList() {
  const showCart = useState(() => false)

  return {
    showCart
  }
}
