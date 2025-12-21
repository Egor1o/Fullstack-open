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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
