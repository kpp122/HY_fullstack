import { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      return seen.has(item) ? false : seen.add(item)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const activeToken = localStorage.getItem('loggedLibraryUser')
    if (activeToken) {
      setToken(activeToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(
        `Book ${addedBook.title} by ${addedBook.author.name} has been added`
      )
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('loggedLibraryUser')
    client.clearStore()
  }

  if (authors.loading || books.loading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recommendations
            </button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
      <Recommendations show={page === 'recommendations'} />
      <Authors show={page === 'authors'} allAuthors={authors.data.allAuthors} />
      {page === 'books' ? (
        <Books show={page === 'books'} allBooks={books.data.allBooks} />
      ) : null}
      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
