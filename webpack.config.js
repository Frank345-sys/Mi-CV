const path = require("path"); // conecta la ruta a la configuración de webpack
const HtmlWebpackPlugin = require("html-webpack-plugin"); // plugin de conexión
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // plugin de conexión

// conecta mini-css-extract-plugin al proyecto
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.js",
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
    //clean: true,
  },
  target: ["web", "es5"],
  stats: { children: true }, // Muestra los errores de compilación hijos de los plugins
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // especifica una carpeta desde donde servir la aplicación y su contenido
    compress: true, // esto acelerará la carga de archivos en el modo de desarrollo
    port: 8080, // abrirá tu página en localhost:8080 (puedes usar otro puerto)
    open: true, // se abrirá automáticamente en el navegador después de ejecutar npm run dev
  },
  module: {
    rules: [
      // esto es un array de reglas
      // añádele un objeto que contenga reglas para Babel
      {
        // una expresión regular que busca todos los archivos js
        test: /\.js$/,
        // todos los archivos deben ser procesados por babel-loader
        loader: "babel-loader",
        // excluye la carpeta node_modules, no necesitamos procesar archivos en ella
        exclude: "/node_modules/",
      },
      {
        // aplica esta regla sólo a los archivos CSS
        test: /\.css$/,
        // para procesar estos archivos, utiliza
        // MiniCssExtractPlugin.loader y css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // añade un objeto options
            options: { importLoaders: 1 },
          },
          // añade postcss-loaderr
          "postcss-loader",
        ],
      },
      {
        // la regla para procesar archivos
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|pdf)$/,
        type: "asset/resource",
      },
    ],
  },
  //plugins: [stats], // agrega el array aquí
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // ruta a nuestro archivo index.html
    }),
    new CleanWebpackPlugin(), // utiliza plugin CleanWebpack
    new MiniCssExtractPlugin(), // conecta el plugin para fusionar archivos CSS
  ],
};
