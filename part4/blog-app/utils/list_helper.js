const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

//blogs is a list of blogs defined in models/blog.js
const totalLikes = (blogs) => {
  return blogs.reduce((acc, blogs) => {
    return acc + blogs.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return {}
  }

  return blogs.reduce((favorite, blog) => {
    if (Object.keys(favorite).length === 0) {
      return blog
    }
    return blog.likes > favorite.likes ? blog : favorite
  }, {})
}

const mostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs, 'author')
  const topAuthor = lodash.maxBy(Object.entries(authors), ([, count]) => count)
  return topAuthor ? { author: topAuthor[0], blogs: topAuthor[1] } : undefined
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
