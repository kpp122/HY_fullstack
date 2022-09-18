import { useState, useEffect } from 'react'
import { EDIT_BIRTHYEAR } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = ({ show, allAuthors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeBirthyear, result] = useMutation(EDIT_BIRTHYEAR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('person not found')
    }
  }, [result.data])

  const handleUpdate = (e) => {
    e.preventDefault()
    changeBirthyear({ variables: { name, born: Number(born) } })
    setName('')
    setBorn('')
  }

  if (!show) {
    return null
  }
  const authors = allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleUpdate}>
        name
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <br />
        born{' '}
        <input value={born} onChange={(e) => setBorn(e.target.value)}></input>
        <br />
        <button type="submit">update author</button>
        <br />
      </form>
    </div>
  )
}

export default Authors
