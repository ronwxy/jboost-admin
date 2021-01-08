const path = require('path')

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      api: path.resolve(__dirname, '../src/api')
    }
  },
};
