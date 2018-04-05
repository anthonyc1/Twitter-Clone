module.exports = {
  entry:     {
    index: './app/src/index-react.js'
  },
  output: {
    path: __dirname + '/app/public/js',
    filename: '[name]-react.js',
    publicPath: "js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query:{
                "presets":["react", "env"]
            }
      }
    ]
  }
};
