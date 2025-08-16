import { useState } from 'react'
import type { DateType } from './Data'
import Data from './Data'
function App() {
  return (
    <div className='w-full h-screen  flex justify-center '>
      <div className='grid grid-cols-2 gap-8  min-w-2xl mx-auto h-96 '>
        <FriendsList />
        <div className=''>123</div>
      </div>
    </div>
  )
}

export default App

const FriendsList = () => {
  const [startDate] = useState(Data)
  return (
    <div className='p-4 rounded-lg flex flex-col w-full'>
      {startDate.map(item => (
        <FriendCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function FriendCard({ item }: { item: DateType }) {
  return (
    <div className='flex items-center gap-8 group justify-between py-4 border-b border-gray-200 hover:bg-gray-200 hover:border-b-gray-200/90'>
      <img src={item.image} alt={item.name} className='w-10 h-10 rounded-full' />
      <div className='flex flex-col gap-2'>
        <h1>{item.name}</h1>
        {item.balance < 0 && (
          <p className='text-red-500'>
            你欠 {item.name} {Math.abs(item.balance)}
          </p>
        )}
        {item.balance > 0 && (
          <p className='text-green-500'>
            {item.name} 欠你 {Math.abs(item.balance)}
          </p>
        )}
        {item.balance === 0 && <p className='text-gray-500'>你和 {item.name} 已经两清</p>}
      </div>
      <button className=' text-blue-600 border border-blue-600/20 p-2 rounded-md  group-hover:bg-blue-600 group-hover:text-white'>
        Select
      </button>
    </div>
  )
}
