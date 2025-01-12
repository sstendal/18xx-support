import {useCallback, useEffect, useRef } from 'react'

const PING_INTERVAL = 30 * 60 * 1000 // 30 minutes in milliseconds
const REQUEST_TIMEOUT = 5000

export const usePing = (sessionId: string) => {
    const timeoutRef = useRef<number>()

    const sendPing = useCallback(async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

        try {
            await fetch('/.netlify/functions/ping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId
                }),
                signal: controller.signal
            })
        } catch (error) {
            // Silently ignore any errors
        } finally {
            clearTimeout(timeoutId)
            // Schedule next ping regardless of success/failure
            if (timeoutRef.current !== undefined) {
                timeoutRef.current = window.setTimeout(sendPing, PING_INTERVAL)
            }
        }
    }, [sessionId])

    useEffect(() => {
        // Send initial ping
        sendPing()

        // Cleanup function
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = undefined
            }
        }
    }, [sendPing])
}
