import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'

export default axios => {
  var mock = new MockAdapter(axios)
  mock.onGet('/mock/todos').reply(
    200,
    Mock.mock({
      'data|10-100': [
        {
          id: '@id',
          msg: '@string',
          'finished|1-10': true
        }
      ]
    }).data
  )
}
