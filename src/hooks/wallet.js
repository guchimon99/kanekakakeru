import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const Context = createContext()

const MIN_BALANCE = 0
const MAX_BALANCE = 999

const CURRENT_BALANCE = 'KANEKAKERU/CURRENT_BALANCE'

const getCurrentBalance = () => {
  const balance = +localStorage.getItem(CURRENT_BALANCE)
  if (balance > 0) return balance
  return 10
}

const setCurrentBalance = balance => {
  localStorage.setItem(CURRENT_BALANCE, balance)
}

export const Provider = props => {
  const value = useState(getCurrentBalance())

  useEffect(() => {
    const balance = value[0]
    setCurrentBalance(balance)
  }, [value[0]])

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
