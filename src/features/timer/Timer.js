import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  stopTimer,
  decrementHour,
  decrementSecond,
  decrementMinute,
  incrementMinute,
  incrementSecond,
  selectCount
} from './timerSlice'
import styles from './Counter.module.css'

export function Timer() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const hour = count.hour
  const minute = count.minute
  const second = count.second
  const running = count.runTimer
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (running) {
        if (second > 0) {
          dispatch(decrementSecond())
        }
        if (second === 0) {
          if (minute === 0) {
            if (hour === 0) {
              clearInterval(myInterval)
            } else {
              dispatch(decrementHour())
              dispatch(incrementMinute())
              dispatch(incrementSecond())
            }
          } else {
            dispatch(decrementMinute())
            dispatch(incrementSecond())
          }
        }
      }
      else {
        dispatch(stopTimer())
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  const renderHour = () => {
    if (hour === 0) {
      return '00'
    } else {
      if (hour < 10) {
        return '0' + hour
      } else {
        return hour
      }
    }
  }
  const renderMinute = () => {
    if (minute === 0) {
      return '00'
    } else {
      if (minute < 10) {
        return '0' + minute
      } else {
        return minute
      }
    }
  }
  const renderSecond = () => {
    if (second === 0 && second === 60) {
      return '00'
    } else {
      if (second < 10) {
        return '0' + second
      } else {
        return second
      }
    }
  }

  const renderTimer = () => {
    return renderHour() + ':' + renderMinute() + ':' + renderSecond()
  }

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value} hidden={!count.runTimer}>{renderTimer()}</span>
      </div>
      {/* <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div> */}
    </div>
  )
}
