import { Search as SearchIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [params, setParams] = useState<string>('')

  const handleSubmit = () => {
    params ? navigate(`/search?q=${params}`) : navigate('/')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleSubmit()
    }
  }

  return (
    <>
      <div className='relative w-full flex rounded justify-end md:justify-normal bg-transparent md:bg-white'>
        <input
          className='hidden md:block w-full rounded-l px-2 outline-none text-black'
          value={params}
          onChange={(e) => setParams(e.target.value)}
          type='text'
          placeholder='Search TMDb'
          onKeyDown={handleKeyDown}
        />
        <button className='hidden md:block mx-4 my-1 text-zinc-500'><SearchIcon /></button>
        <button className='block md:hidden' onClick={() => setIsOpen(!isOpen)}><SearchIcon /></button>
      </div>

      {isOpen && (
        <div className='fixed top-0 left-0 py-3 px-2 z-10 w-full flex md:hidden bg-[rgba(18,18,18,255)]'>
          <div className='relative flex w-full'>
            <input
              className='w-full rounded-l px-2 outline-none text-black bg-white'
              value={params}
              onChange={(e) => setParams(e.target.value)}
              type='text'
              placeholder='Search TMDb'
              onKeyDown={handleKeyDown}
            />
            <button className='px-2 py-1 rounded-r text-zinc-500 bg-white'><SearchIcon /></button>
            <button className='bg-transparent px-2 ml-2 text-zinc-500' onClick={() => setIsOpen(!isOpen)}><X /></button>
          </div>
        </div>
      )}
    </>
  )
}