import { useState } from 'react'
import type { DateType } from './Data'
import Data from './Data'

// ──────────────────────────────────────────────
// 根组件：整体布局
// ──────────────────────────────────────────────
function App() {
  const [showFriend, setShowFriend] = useState(false)
  // 将朋友数据状态提升到App组件
  const [friends, setFriends] = useState(Data)

  // 添加新朋友的函数
  const handleAddFriend = (newFriend: Omit<DateType, 'id'>) => {
    // 生成新的ID (找到最大ID + 1)
    const newId = Math.max(...friends.map(f => f.id)) + 1
    const friendWithId = { ...newFriend, id: newId }

    // 更新朋友列表
    setFriends(prev => [...prev, friendWithId])

    // 关闭表单
    setShowFriend(false)
  }

  return (
    <div className='w-full h-screen flex justify-center'>
      {/* 两栏布局：左侧好友列表 + 右侧添加好友表单 */}
      <div className='flex min-w-2xl mx-auto h-96'>
        <div className='flex flex-col gap-8 relative'>
          <FriendsList friends={friends} />
          {!showFriend && (
            <Button onClick={() => setShowFriend(true)} className='self-end'>
              新增
            </Button>
          )}
          {showFriend && (
            <div className='absolute top-full left-0 w-full mt-2 z-10'>
              <FormAddFriend onClose={() => setShowFriend(false)} onAddFriend={handleAddFriend} />
            </div>
          )}
        </div>
        <div className='line-sharp mx-8'></div>
        <FormSplitBill />
      </div>
    </div>
  )
}

export default App

// ──────────────────────────────────────────────
// 好友列表组件：渲染所有好友卡片
// ──────────────────────────────────────────────
const FriendsList = ({ friends }: { friends: DateType[] }) => {
  return (
    <div className='p-4 rounded-lg flex flex-col w-full'>
      {friends.map(item => (
        <FriendCard key={item.id} item={item} />
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────
// 单张好友卡片：展示头像、姓名、欠款信息
// ──────────────────────────────────────────────
function FriendCard({ item }: { item: DateType }) {
  return (
    <div className='flex items-center gap-8 group justify-between py-4 border-b border-gray-200 hover:bg-gray-200 hover:border-b-gray-200/90'>
      {/* 头像 */}
      <img src={item.image} alt={item.name} className='w-10 h-10 rounded-full' />

      {/* 姓名 + 欠款状态 */}
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

      {/* 选择按钮 */}
      <Button>Select</Button>
    </div>
  )
}

// ──────────────────────────────────────────────
// 通用按钮组件：支持所有原生 button 属性
// ──────────────────────────────────────────────
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        px-4 py-2
        bg-blue-500 hover:bg-blue-600
        text-white font-medium
        rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors
        ${className}
      `}
      {...props}>
      {children}
    </button>
  )
}

const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={`input-base ${className}`} {...props} />
}

// ──────────────────────────────────────────────
// 添加好友表单：两个输入框 + 提交按钮
// ──────────────────────────────────────────────
function FormAddFriend({
  onClose,
  onAddFriend,
}: {
  onClose: () => void
  onAddFriend: (friend: Omit<DateType, 'id'>) => void
}) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 验证输入
    if (!name.trim()) {
      alert('请输入朋友姓名')
      return
    }

    // 默认头像URL，如果用户没有输入
    const defaultImage = image.trim() || 'https://i.pravatar.cc/48?u=' + name

    // 创建新朋友对象
    const newFriend = {
      name: name.trim(),
      image: defaultImage,
      balance: 0, // 新朋友初始余额为0
    }

    // 调用父组件的添加函数
    onAddFriend(newFriend)

    // 清空表单
    setName('')
    setImage('')
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 bg-gray-50 rounded-lg'>
      <div className='flex items-center gap-2 justify-between'>
        <label className='text-lg font-bold'>🧑‍🤝‍🧑 Friend Name</label>
        <Input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='输入朋友姓名'
          className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='flex items-center gap-2 justify-between'>
        <label className='font-medium'>🌄 Image URL</label>
        <Input
          type='text'
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder='头像URL (可选)'
          className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* 按钮区域 */}
      <div className='flex gap-2 self-end'>
        <Button type='submit'>添加好友</Button>
        <Button type='button' onClick={onClose} className='bg-gray-500 hover:bg-gray-600'>
          关闭
        </Button>
      </div>
    </form>
  )
}

// ──────────────────────────────────────────────
// 账单分摊表单组件
// ──────────────────────────────────────────────
function FormSplitBill() {
  return (
    <form className='p-4 flex flex-col gap-4 bg-gray-50 rounded-lg'>
      <h2 className='text-2xl font-bold uppercase bg-blue-300/20 p-8 rounded-md text-slate-800'>Split a bill with X</h2>

      {/* 账单金额 */}
      <div className='flex items-center gap-2 justify-between'>
        <label htmlFor='bill' className='flex-shrink-0'>
          💰 Bill Value
        </label>
        <Input
          type='text'
          id='bill'
          className='w-[146px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* 你的费用 */}
      <div className='flex items-center gap-2 justify-between'>
        <label htmlFor='expense' className='flex-shrink-0'>
          🚶 Your Expense
        </label>
        <Input type='text' id='expense' className='w-[146px] ' />
      </div>

      {/* Clark的费用 */}
      <div className='flex items-center gap-2 justify-between'>
        <label htmlFor='clark' className='flex-shrink-0'>
          👥 Clark's expense
        </label>
        <Input
          type='text'
          id='clark'
          className='w-[146px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none'
          disabled
        />
      </div>

      {/* 谁来付账 */}
      <div className='flex items-center gap-2 justify-between'>
        <label htmlFor='who' className='flex-shrink-0'>
          🤔 Who is paying the bill?
        </label>
        <select
          id='who'
          className='
            w-[146px]
            px-3 py-2
            border border-gray-300
            rounded-md
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            appearance-none
            cursor-pointer
          '>
          <option value='you'>You</option>
          <option value='clark'>Clark</option>
        </select>
      </div>

      {/* 分账按钮 */}
      <Button className='w-[146px] self-end' type='submit'>
        Split bill
      </Button>
    </form>
  )
}
