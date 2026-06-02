import { useState, useEffect, useCallback } from 'react'

const DEMO_MODE_KEY = 'ps_demo_mode'
const DEMO_CREDITS_KEY = 'ps_demo_credits'

export function useDemoMode() {
  const [demoMode, setDemoModeState] = useState(false)
  const [demoCredits, setDemoCreditsState] = useState(0)

  useEffect(() => {
    setDemoModeState(localStorage.getItem(DEMO_MODE_KEY) === '1')
    setDemoCreditsState(parseInt(localStorage.getItem(DEMO_CREDITS_KEY) || '0'))
  }, [])

  const setDemoMode = useCallback((val: boolean) => {
    setDemoModeState(val)
    localStorage.setItem(DEMO_MODE_KEY, val ? '1' : '0')
  }, [])

  const setDemoCredits = useCallback((val: number) => {
    setDemoCreditsState(val)
    localStorage.setItem(DEMO_CREDITS_KEY, String(val))
  }, [])

  const spendCredit = useCallback(() => {
    const next = Math.max(0, demoCredits - 1)
    setDemoCreditsState(next)
    localStorage.setItem(DEMO_CREDITS_KEY, String(next))
    return next >= 0
  }, [demoCredits])

  return { demoMode, setDemoMode, demoCredits, setDemoCredits, spendCredit }
}
