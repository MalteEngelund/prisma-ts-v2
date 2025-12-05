export const fieldTypes: Record<string, Record<string, 'string' | 'number' | 'boolean' | 'date'>> = {
  user: {
    id: 'number',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: 'string',
    role: 'string',
    isActive: 'boolean'
  },
  // Her kommer næste model
  
  category: {
    id: 'number',
    name: 'string'
  },

  brand: {
    id: 'number',
    name: 'string',
    logoUrl: 'string',
  },

  fueltype: {
    id: 'number',
    name: 'string'
  },

  car: {
    id: 'number',
    categoryId: 'number',
    brandId: 'number',
    model: 'string',
    year: 'number',
    price: 'number',
    fueltypeId: 'number'
  },

  
}