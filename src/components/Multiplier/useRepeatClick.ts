import {useEffect, useRef, useState} from 'react'

export default function useRepeatClick(pressed: boolean, callback: () => {}) {

    const INITIAL_INTERVAL = 200
    const MEDIUM_SPEED_INTERVAL = 100
    const MEDIUM_SPEED_TIME = 1000
    const HIGH_SPEED_INTERVAL = 20
    const HIGH_SPEED_TIME = 3000

    const STEP_MS = 10

    const counter = useRef(0)
    const interval = useRef(INITIAL_INTERVAL)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>(null)
    const [hover, setHover] = useState(false)

    function onMouseLeave(e) {
        console.log('leave')
        setHover(false)
    }

    function onMouseEnter(e) {
        console.log('enter', e)
        setHover(true)
    }

    useEffect(() => {
        if (pressed && hover) {
            callback()
            counter.current = 0
            interval.current = INITIAL_INTERVAL
            const _intervalId = setInterval(() => {
                counter.current += STEP_MS
                if (counter.current % interval.current === 0) {
                    callback()
                }
                if (counter.current === MEDIUM_SPEED_TIME) {
                    interval.current = MEDIUM_SPEED_INTERVAL
                }
                if (counter.current === HIGH_SPEED_TIME) {
                    interval.current = HIGH_SPEED_INTERVAL
                }
            }, STEP_MS)
            setIntervalId(_intervalId)
        } else {
            clearInterval(intervalId)
            setIntervalId(null)
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [pressed, hover]) // eslint-disable-line react-hooks/exhaustive-deps

    return {
        onMouseEnter,
        onMouseLeave
    }
}
