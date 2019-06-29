module.exports = {
    externals: ['tls', 'net', 'fs'],
    node: {
      console: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }

}