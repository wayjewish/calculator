import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export interface WebpackConfiguration extends Configuration {
  devServer?: DevServerConfiguration;
}

type Mode = 'none' | 'development' | 'production';

const getConfig = (mode?: Mode): WebpackConfiguration => {
  const isProd = mode === 'production';
  console.log('isProd', isProd);
  const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

  const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
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

  const config = {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [styleLoader, CSSModuleLoader, PostCSSLoader, 'sass-loader'],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.s(a|c)ss$/,
          use: [styleLoader, 'css-loader', PostCSSLoader, 'sass-loader'],
        },
        {
          test: /\.module\.css$/,
          use: [styleLoader, CSSModuleLoader, PostCSSLoader],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [styleLoader, 'css-loader', PostCSSLoader],
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
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new CopyPlugin({
        patterns: [{ from: './public', to: 'public' }],
      }),
      new CleanWebpackPlugin(),
    ],
  };

  if (isProd) {
    console.log({ ...config, ...prodConfig });
    return { ...config, ...prodConfig };
  }

  console.log({ ...config, ...devConfig });
  return { ...config, ...devConfig };
};

const devConfig: WebpackConfiguration = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    port: 4000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};

const prodConfig: WebpackConfiguration = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};

export default (env: any, argv: any) => {
  console.log(env, argv);
  return getConfig(argv.mode);
};
