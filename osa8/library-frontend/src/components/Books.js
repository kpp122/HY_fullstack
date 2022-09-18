import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, allBooks }) => {
  const [filter, setFilter] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks({ variables: { genre: filter } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, allBooks])

  if (!show) {
    return null
  }

  if (!(result.data && result.data.allBooks)) {
    return <div>loading data...</div>
  }

  let genres = new Set()
  allBooks.forEach((element) => {
    genres = new Set([...genres, ...element.genres])
  })

  return (
    <div>
      <h2>books</h2>
      {filter ? <strong>in genre {filter}</strong> : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.from(genres).map((genre) => (
        <button onClick={() => setFilter(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books
