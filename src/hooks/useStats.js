import { useState, useCallback } from 'react'

function simulateSyncAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error('Sync failed: server error'))
      } else {
        resolve({
          steps:     Math.floor(Math.random() * 7000) + 5000,
          calories:  Math.floor(Math.random() * 600)  + 200,
          heartRate: Math.floor(Math.random() * 52)   + 58,
        })
      }
    }, 500)
  })
}

export function useStats(initialStats) {
  const [stats, setStats]         = useState(initialStats)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncError, setSyncError] = useState(null)

  const syncStats = useCallback(async () => {
    setIsSyncing(true)
    setSyncError(null)
    try {
      const newStats = await simulateSyncAPI()
      setStats(newStats)
    } catch (err) {
      setSyncError(err.message)
    } finally {
      setIsSyncing(false)
    }
  }, [])

  return { stats, isSyncing, syncError, syncStats }
}
