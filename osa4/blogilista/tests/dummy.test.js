const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')
const blogs = initialBlogs

test('dummy returns one', () => {
    const blog = []

    const result = dummy(blog)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('of one element is equal to the likes of that', () => {
        expect(totalLikes([blogs[0]])).toBe(7)
    })

    test('of bigger list is calculated right', () => {
        expect(totalLikes(blogs)).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of empty list is null', () => {
        expect(favoriteBlog([])).toEqual(null)
    })

    test('of one element is itself', () => {
        expect(favoriteBlog([blogs[0]])).toEqual(blogs[0])
    })

    test('of all elements is the one with the highest likes', () => {
        expect(favoriteBlog(blogs)).toEqual(blogs[2])
    })
})

describe('most blogs for', () => {
    test('one author and one book is 1', () => {
        let obj = {
            "author": blogs[0].author,
            "blogs": 1
        }
        expect(mostBlogs([blogs[0]])).toEqual(obj)
    })

    test('empty list is null', () => {
        expect(mostBlogs([])).toEqual(null)
    })

    test('all authors is the one with the most blogs', () => {
        let obj = {
            'author': 'Robert C. Martin',
            'blogs': 3
        }
        expect(mostBlogs(blogs)).toEqual(obj)
    })
})

describe('most likes for', () => {
    test('no authors is not definable', () => {
        expect(mostLikes([])).toEqual(undefined)
    })

    test('for one book is the book itself', () => {
        let obj = {
            'author': blogs[0].author,
            'likes': blogs[0].likes
        }
        expect(mostLikes([blogs[0]])).toEqual(obj)
    })

    test('all author is the one with most likes', () => {
        let obj = {
            'author': "Edsger W. Dijkstra",
            'likes': 17
        }
        expect(mostLikes(blogs)).toEqual(obj)
    })
})