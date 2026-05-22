import { useReducer, useRef, useCallback } from 'react'
import { stopwatchReducer, initialState } from '../stopwatchReducer'

function formatTime(ms) {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  const milli = Math.floor((ms % 1000) / 10)
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(milli).padStart(2,'0')}`
}

export function useStopwatch() {
  const [state, dispatch] = useReducer(stopwatchReducer, initialState)
  const intervalRef = useRef(null)
  const elapsedRef = useRef(0)

  const start = useCallback(() => {
    dispatch({ type: 'START' })
    intervalRef.current = setInterval(() => {
      elapsedRef.current += 100
      dispatch({ type: 'TICK' })
    }, 100)
  }, [])

  const stop = useCallback(() => {
    dispatch({ type: 'STOP' })
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
    clearInterval(intervalRef.current)
    intervalRef.current = null
    elapsedRef.current = 0
  }, [])

  const lap = useCallback(() => {
    dispatch({ type: 'LAP', value: formatTime(elapsedRef.current) })
  }, [])

  return { ...state, start, stop, reset, lap }
}
