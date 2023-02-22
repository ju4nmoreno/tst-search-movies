import { useEffect, useState, useRef } from 'react'

export default function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('empty input')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('not numbers')
      return
    }

    if (search.length < 3) {
      setError('more than 3 chart')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
