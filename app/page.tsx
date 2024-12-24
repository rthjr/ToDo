import React from 'react'
import Header from '@/components/layout/Header/Header'
import Create from '@/components/page/CreateToDO/Create'
import ListToDo from '@/components/page/ListToDo/ListToDo'

const page = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <header className="shadow-lg border-gray-200 bg-gray-50 w-full flex items-center justify-center">
        <div className="py-4 lg:py-8 w-11/12">
          <Header />
        </div>
      </header>

      <div className='w-full flex items-center justify-center'>
        <div className='w-11/12 flex flex-col gap-8'>
          <div className='flex justify-start'>
            <Create />
          </div>

          <span className="flex items-center">
            <span className="h-px flex-1 bg-black"></span>
            <span className="shrink-0 px-6">Check Your Activity Below!</span>
            <span className="h-px flex-1 bg-black"></span>
          </span>

          {/* ToDo have been created */}
          <div className='flex gap-8 flex-wrap items-center justify-center'>
            <ListToDo />
          </div>
        </div>
      </div>

      <footer></footer>
    </div>
  )
}

export default page