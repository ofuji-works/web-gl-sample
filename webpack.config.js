module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.jpeg$/,
        use: {
          loader: "file-loader",
          options: {
            name: "/src/texture/[name].[hash].[ext]",
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "/src/texture/[name].[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: ["web", "es5"],
  devServer: {
    open: true,
    openPage: "index.html",
    contentBase: "./dist",
    watchContentBase: true,
    port: 4000,
  },
};
