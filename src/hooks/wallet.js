import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const Context = createContext()

const MIN_BALANCE = 0
const MAX_BALANCE = 999

export const Provider = props => {
  const value = useState(10)
  return <Context.Provider value={value} {...props} />
}

export const useIncrease = () => {
  const [balance, setBalance] = useContext(Context)
  return useCallback(amount => setBalance(Math.min(MAX_BALANCE, balance + amount)), [balance, setBalance])
}

export const useDecrease = () => {
  const [balance, setBalance] = useContext(Context)
  return useCallback(amount => setBalance(Math.max(MIN_BALANCE, balance - amount)), [balance, setBalance])
}

export const useBalance = () => {
  const [balance] = useContext(Context)
  return useMemo(() => balance, [balance])
}
