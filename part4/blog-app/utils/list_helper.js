const dummy = (blogs) => {
  return 1
}

//blogs is a list of blogs defined in models/blog.js
const totalLikes = (blogs) => {
  return blogs.reduce((acc, blogs) => {
    return acc + blogs.likes
  }, 0)
}

module.exports = {
  dummy,
  totalLikes
}
