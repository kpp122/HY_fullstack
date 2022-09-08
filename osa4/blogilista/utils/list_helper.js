const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((a, c) => a + c.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? null : blogs.reduce((a, c) => c.likes > a.likes ? c : a)
}

const mostBlogs = (blogs) => {

    if(blogs.length === 0 ){
        return null
    }
    else if(blogs.length === 1){
        console.log({'author': blogs[0].author, 'blogs': 1})
        return {'author': blogs[0].author, 'blogs': 1}
    }
    else{      
        let count = _.countBy(blogs, 'author')
        let pairs = _.toPairs(count)
        let max = _.maxBy(_.tail(pairs))
        return {'author': max[0], 'blogs': max[1]}
    }
}

const mostLikes = (blogs) => {

    tmp = _(blogs)
            .groupBy('author')
            .map((obj, key) => ({
                'author': key,
                'likes': _.sumBy(obj, 'likes')
            })).value()
    return _.maxBy(tmp, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}