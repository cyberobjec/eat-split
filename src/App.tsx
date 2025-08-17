import { useState } from 'react'
import type { DateType } from './Data'
import Data from './Data'

// ──────────────────────────────────────────────
// 根组件：整体布局
// ──────────────────────────────────────────────
function App() {
  return (
    <div className='w-full h-screen flex justify-center'>
      {/* 两栏布局：左侧好友列表 + 右侧添加好友表单 */}
      <div className='grid grid-cols-2 gap-8 min-w-2xl mx-auto h-96'>
        <div className='flex flex-col gap-8'>
          <FriendsList />
          <Button>新增</Button>
          <FormAddFriend />
        </div>
        <FormSplitBill />
      </div>
    </div>
  )
}

export default App

// ──────────────────────────────────────────────
// 好友列表组件：渲染所有好友卡片
// ──────────────────────────────────────────────
const FriendsList = () => {
  // 用 useState 包裹 Data，方便后续做增删改
  const [startDate] = useState(Data)

  return (
    <div className='p-4 rounded-lg flex flex-col w-full'>
      {startDate.map(item => (
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
function FormAddFriend() {
  return (
    <form className='flex flex-col gap-4 p-4 bg-gray-50 rounded-lg'>
      <label className='text-lg font-bold'>🧑‍🤝‍🧑 Friend Name</label>
      <Input
        type='text'
        className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      <label className='font-medium'>🌄 Image URL</label>
      <Input
        type='text'
        className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      {/* 提交按钮 */}
      <Button type='submit'>添加好友</Button>
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
