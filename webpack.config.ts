import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export default (env: any, argv: any) => {
  const mode = (argv && argv.mode) || 'development';

  const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[local]_[hash]',
      },
      importLoaders: 2,
    },
  };

  const CSSLoader = {
    loader: 'css-loader',
    options: {
      modules: 'global',
      importLoaders: 2,
    },
  };

  const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [['autoprefixer']],
      },
    },
  };

  const styleLoader = mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

  const config = {
    mode: mode,
    devtool: 'source-map',

    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.module\.(sa|sc)ss$/,
          use: [styleLoader, CSSModuleLoader, PostCSSLoader, 'sass-loader'],
        },
        {
          test: /\.(sa|sc)ss$/,
          exclude: /\.module\.(sa|sc|c)ss$/,
          use: [styleLoader, CSSLoader, PostCSSLoader, 'sass-loader'],
        },
        {
          test: /\.module\.css$/,
          use: [styleLoader, CSSModuleLoader, PostCSSLoader],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [styleLoader, CSSLoader, PostCSSLoader],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: './public', to: 'public' }],
      }),
      new HtmlPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin(),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: 4000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
  };

  return config;
};
