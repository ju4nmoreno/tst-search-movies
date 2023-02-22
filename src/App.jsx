import useMovies from './hooks/useMovies'
import './App.css'
import { Movies } from './components/Movies'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'
import useSearch from './hooks/useSearch'

function App () {
  const [sort, setSort] = useState(false)

  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>

      <header>
        <h1>Search film</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' onChange={handleChange} value={search} placeholder='matrix... ' type='text' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading
          ? 'loanding....'
          : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App

// const { query } = Object.fromEntries(new window.FormData(event.target))
