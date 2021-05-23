const buildViewModel = require('./view-model')
const schema = require('../../../src/models/schema')
const methods = require('../../function')

module.exports = function (settings) {
  settings.schema = schema
  settings.methods = methods
  buildViewModel(settings)
}
