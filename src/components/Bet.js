import { useCallback, useState } from 'react'

import Header from './Header'
import Container from './Container'
import { useBalance, useDecrease, useIncrease } from '../hooks/wallet'

const getGame = (balance) => {
  const step = 'input'
  const left = Math.floor(Math.random() * 100)
  const right = Math.floor(Math.random() * 100)
  const rate = Math.floor(Math.random() * 10) / 10 + 1
  const choice = ''
  const amount = balance >= 10 ? 10 : 0
  const result = ''

  return { step, right, left, rate, choice, amount, result }
}

const ChoiceButton = ({ children, isActive, ...props }) => (
  <button className={`my-2 w-16 h-16 flex items-center justify-center rounded-lg ${isActive ? 'bg-gray-200 text-gray-900 border-2 border-gray-300' : 'bg-gray-100 text-gray-400'}`} {...props}>
    <span className="font-bold text-lg">{children}</span>
  </button>
)

const Bet = () => {
  const balance = useBalance()
  const decrease = useDecrease()
  const increase = useIncrease()
  const [game, setGame] = useState(getGame(balance))

  const { step, right, left, rate, amount, choice, result } = game

  const choose = useCallback(choice => setGame({
    ...game,
    choice
  }), [game])

  const increaseAmount = useCallback(() =>
    setGame({
      ...game,
      amount: Math.min(balance, game.amount + 10)
    }), [game, balance])

  const decreaseAmount = useCallback(() =>
    setGame({
      ...game,
      amount: Math.max(0, game.amount - 10)
    }), [game])

  const start = useCallback(() => {
    const isCorrect = (() => {
      switch (choice) {
        case '＝':
          return left === right
        case '＜':
          return left < right
        case '＞':
          return left > right
        default:
          return false
      }
    })()

    if (isCorrect) {
      increase(Math.floor(amount * rate))
    } else {
      decrease(amount)
    }

    setGame({
      ...game,
      step: 'finished',
      result: isCorrect ? `+ ${Math.floor(amount * rate)}` : `- ${amount}`
    })
  }, [game, choice])

  const next = useCallback(() => {
    console.log(balance)
    setGame(getGame(balance))
  }, [balance])

  return (
    <>
      <Header />
      <Container>
        <div className="h-64 flex items-center justify-center p-4">
          <div className="text-6xl text-center font-bold">{result}</div>
        </div>
        <div className="flex p-4 items-center justify-center flex-grow">
          <div className="w-24 h-24 flex items-center justify-center">
            <span className="text-5xl">{left}</span>
          </div>
          <div className="flex flex-col mx-8">
            <ChoiceButton isActive={choice === '＜'} value="＜" onClick={() => choose('＜')}>＜</ChoiceButton>
            <ChoiceButton isActive={choice === '＝'} value="＝" onClick={() => choose('＝')}>＝</ChoiceButton>
            <ChoiceButton isActive={choice === '＞'} value="＞" onClick={() => choose('＞')}>＞</ChoiceButton>
          </div>
          <div className="w-24 h-24 flex items-center justify-center">
            <span className="text-5xl">{step === 'input' ? '❓' : right}</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col">
            <button disabled={amount >= balance} onClick={increaseAmount} className={`my-2 bg-gray-100 rounded ${amount >= balance && 'opacity-50'}`}>＋</button>
            <div className="border-4 rounded p-2 w-32 text-4xl text-right">{amount}</div>
            <button disabled={amount <= 0} onClick={decreaseAmount} className={`my-2 bg-gray-100 rounded ${amount <= 0 && 'opacity-50'}`}>ー</button>
          </div>
          <div className="flex items-end pb-2">
            <div className="font-bold text-4xl mx-2">x</div>
            <div className="font-bold text-6xl">{rate.toFixed(1)}</div>
          </div>
        </div>
        <div className="p-4">
          {step !== 'finished' && <button disabled={choice === ''} onClick={start} className="w-full bg-gray-100 p-2 text-xl">カケル</button>}
          {step === 'finished' && <button onClick={next} className="w-full bg-gray-100 p-2 text-xl">つぎへ</button>}
        </div>
      </Container>
    </>
  )
}

export default Bet
