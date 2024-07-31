import { ReactNode } from 'react'

import Header from '@/components/header'

type StoreProps = {
  children: ReactNode
}

const StoreLayout = ({ children }: StoreProps) => {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 px-8 py-8">
      <Header />
      {children}
    </div>
  )
}

export default StoreLayout
