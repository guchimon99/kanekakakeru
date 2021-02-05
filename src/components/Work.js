import { useCallback, useState } from 'react'

import Header from './Header'
import Container from './Container'

import {
  useIncrease,
  useDecrease
} from '../hooks/wallet'

const emojis = [
  '🐒',
  '🦍',
  '🦧',
  '🐕',
  '🐩',
  '🐈',
  '🐅',
  '🐆',
  '🐎',
  '🦌',
  '🐂'
]

const getJob = (prevCorrect) => {
  const candidates = emojis.filter(emoji => emoji !== prevCorrect)
  const correct = candidates[Math.floor(Math.random() * (candidates.length - 1))]
  const incorrects = emojis.filter(emoji => emoji !== correct)
  const choices = new Array(4).fill(null).map(() => incorrects.splice(Math.floor(Math.random() * incorrects.length), 1)[0])

  if (Math.random() > 0.1) {
    choices[
      Math.floor(Math.random() * choices.length)
    ] = correct
  }

  return {
    correct, choices
  }
}

const Work = () => {
  const [{
    correct, choices
  }, setJob] = useState(getJob())

  const increase = useIncrease()
  const decrease = useDecrease()

  const answer = useCallback(({ target: { value: choice } }) => {
    console.log(choice, correct)
    if (choice === correct) {
      increase(10)
    } else {
      decrease(10)
    }
    setJob(getJob(correct))
  }, [correct, increase, decrease])

  return (
    <>
      <Header/>
      <Container>
        <div className="text-center font-bold text-3xl pt-8 mb-4">同じ絵を選べ</div>
        <div className="text-center px-4 flex-grow flex flex-col justify-center items-center">
          <div className="text-9xl">
            {correct}
          </div>
        </div>
        <div className="flex flex-row flex-wrap p-1">
          {choices.map((choice, index) => (
            <div key={index} className="p-1 w-1/2">
              <button onClick={answer} className="w-full bg-gray-100 rounded text-5xl px-1 py-3" value={choice}>{choice}</button>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default Work
