const path = require('path')
const root = path.join(__dirname, '..', '..')

module.exports = {
  root,
  output: {
    viewModel: path.join(...['src', 'models', 'data']),
  },
  overwrite: true,
  plugins: [],
}
