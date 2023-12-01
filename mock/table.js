const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    isbn: '@id',
    bookName: '@sentence(3, 10)',
    author: 'name',
    type: 'type',
    num: '@integer(0, 30)',
    address: '@county(true)',
    publisher: 'publisher',
    date: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
