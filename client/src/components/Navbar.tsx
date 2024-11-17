import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state'
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
const Navbar = () => {
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
      {/* Search Bar */}
      <div className='flex items-center gap-8'>
        {!isSidebarCollapsed ? null : (
          <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
          <Menu className='h-8 w-8 dark:text-white' /> 
        </button>
        )}
        <div className='relative w-[200px] h-min flex'>
          <Search className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white'/>
          <input type="search" placeholder='Search...' className='input' />
        </div>
      </div>

      {/* Icons */}
      <div className='flex items-center gap-4'>
        {isDarkMode ? (
          <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
            <Sun className='w-6 h-6 cursor-pointer dark:text-gray-100 text-gray-700'/>
          </button>
        ) : (
          <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
            <Moon className='w-6 h-6 cursor-pointer dark:text-gray-100 text-gray-700'/>
          </button>
        )}
        <Link href='/settings'>
          <Settings className='h-6 w-6 cursor-pointer dark:text-white'/>
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  )
}

export default Navbar
