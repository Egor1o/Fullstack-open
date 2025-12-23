const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1)
})

describe(
  'total likes',
  () => {
    test('of empty list is zero', () => {
      assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
      assert.strictEqual(listHelper.totalLikes([helper.initialBlogs[0]]), 7)
    })

    test('of a bigger list is calculated right', () => {
      assert.strictEqual(listHelper.totalLikes(helper.initialBlogs), 36)
    })
  }
)

describe('favorite blog', () => {
  test('of empty list is an empty object', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), {})
  })

  test('when list has only one blog is the same blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([helper.initialBlogs[0]]), helper.initialBlogs[0])
  })

  test('of a bigger list is found right', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(helper.initialBlogs), helper.initialBlogs[2])
  })
})


describe('most occurring author', () => {
  test('of empty list is undefined', () => {
    assert.strictEqual(listHelper.mostBlogs([]), undefined)
  })

  test('when list has only one blog is the same as in that blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([helper.initialBlogs[1]]), { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('of a bigger list is found right', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(helper.initialBlogs), { author: 'Robert C. Martin', blogs: 3 })
  })
})


describe('most likes by author', () => {
  test('of empty list is undefined', () => {
    assert.strictEqual(listHelper.mostLikes([]), undefined)
  })

  test('when list has only one blog is the same as in that blog', () => {
    assert.deepStrictEqual(listHelper.mostLikes([helper.initialBlogs[0]]), { author: 'Michael Chan', likes: 7 })
  })

  test('of a bigger list is found right and the amount of likes is correct', () => {
    assert.deepStrictEqual(listHelper.mostLikes(helper.initialBlogs), { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})