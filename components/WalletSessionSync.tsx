'use client'

import { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

export default function WalletSessionSync() {
  const { publicKey, connected } = useWallet()

  useEffect(() => {
    if (connected && publicKey) {
      fetch('/api/auth/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: publicKey.toString() }),
      }).catch(() => {})
    }
  }, [connected, publicKey])

  return null
}
