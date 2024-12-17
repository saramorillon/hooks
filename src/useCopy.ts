import { useCallback, useEffect, useMemo, useState } from 'react'

interface ICopyStatus {
  loading: boolean
  error?: unknown
}

export function useCopy(): [boolean, ICopyStatus, (data: string) => void] {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const copy = useCallback((data: string) => {
    setLoading(true)
    navigator.clipboard
      .writeText(data)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    void navigator.permissions.query({ name: 'clipboard-write' as PermissionName }).then((result) => {
      setAuthorized(result.state == 'granted' || result.state == 'prompt')
    })
  }, [])

  return useMemo(() => [authorized, { loading, error }, copy], [authorized, loading, error, copy])
}
