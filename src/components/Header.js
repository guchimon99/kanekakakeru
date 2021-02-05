import { NavLink } from 'react-router-dom'
import { useBalance } from '../hooks/wallet'

const Header = () => {
  const balance = useBalance()

  return (
    <div className="fixed top-0 left-0 right-0 border-b">
      <div className="max-w-4xl mx-auto px-2 h-12 py-1 flex">
        <div className="flex-grow flex items-center text-gray-400">
          <NavLink className="text-lg font-bold p-2" activeClassName="text-gray-900" to="/work">ハタラク</NavLink>
          <NavLink className="text-lg font-bold p-2" activeClassName="text-gray-900" to="/bet">カケル</NavLink>
        </div>
        <div className="rounded-full bg-gray-100 px-4 flex items-center">
          <div className="w-8 text-right mr-1 font-bold">{balance}</div>
          <div className="text-xs mt-1">コイン</div>
        </div>
      </div>
    </div>
  )
}

export default Header
