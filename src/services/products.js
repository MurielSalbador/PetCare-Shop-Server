const mockProducts = [
  { id: '1', title: 'Remera deportiva', year: '2023', image: 'https://via.placeholder.com/150?text=Remera' },
  { id: '2', title: 'Zapatillas running', year: '2024', image: 'https://via.placeholder.com/150?text=Zapatillas' },
  { id: '3', title: 'Botella térmica', year: '2022', image: 'https://via.placeholder.com/150?text=Botella' },
  { id: '4', title: 'Gorra para sol', year: '2023', image: 'https://via.placeholder.com/150?text=Gorra' }
]

export const searchProducts = async ({ search }) => {
  if (!search) return []

  return mockProducts.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )
}