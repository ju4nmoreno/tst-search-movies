import { searchMovies } from '../services/movies.js'
import { useRef, useState, useMemo, useCallback } from 'react'

export default function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)

  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    if (search) {
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const movies = await searchMovies({ search })
        setMovies(movies)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
