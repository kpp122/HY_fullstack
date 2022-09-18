import { useQuery, useLazyQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries'
import { useEffect } from 'react'

const Recommendations = ({ show }) => {
  const user = useQuery(USER, { skip: !show })
  const [allBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })
  useEffect(() => {
    if (user.data && user.data.me) {
      allBooks({ variables: { genre: user.data.me.favoriteGenre } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.data])

  if (!show) {
    return null
  }
  if (!(user.data && user.data.me && result.data)) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        books in your favorite genre{' '}
        <strong>{user.data.me.favoriteGenre}</strong>
      </p>
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
    </div>
  )
}

export default Recommendations
