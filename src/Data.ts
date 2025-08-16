export interface DateType {
  id: number
  name: string
  image: string
  balance: number
}

const Date: DateType[] = [
  {
    id: 1,
    name: 'John',
    image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=John&hair=short01,short02,short03,short04,short05',
    balance: -1000,
  },
  {
    id: 2,
    name: 'Jane',
    image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Jane&hair=short01,short02,short03,short04,short05',
    balance: -2000,
  },
  {
    id: 3,
    name: 'Jim',
    image: 'https://api.dicebear.com/9.x/bottts/webp?seed=Jim',
    balance: 3000,
  },
  {
    id: 4,
    name: 'Jim',
    image: 'https://api.dicebear.com/9.x/bottts/webp?seed=Jim2',
    balance: 0,
  },
]

export default Date
