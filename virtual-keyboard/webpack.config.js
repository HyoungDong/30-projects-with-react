const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin') // 자바스크립트를 압축 해 줄 모듈
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 관련 설정을 해 줄 모듈
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 파일을 html에 넣어주기 위한 모듈
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // css 를 압출 해 줄 모듈

module.exports = {
    entry : './src/js/index.js', // 디펜던시 그래프를 그릴때 시작점이 될 모듈 지정
    output : {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist'), // 웹팩이 절대 경로를 찾을 수 있도록 해줌
        clean: true, // 저장할 경로에 이미 다른 파일이 있다면 삭제 하도록 설정
    },
    devtool: 'source-map', // 원본 파일과 빌드된 파일을 연결 시켜줌
    mode: 'development',
    devServer: {
        host:'localhost',
        port:8080,
        open:true, // devServer 실행할 때 마다 새 창으로 열라는 의미
        watchFiles: 'index.html' // index.html 파일에 변화가 있을 때 마다 reload를 해 주어라
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'keyboard',
            template: './index.html', // 빌드 할때 템플릿으로 사용할 파일 경로
            inject: 'body', // 모듈들을 번들한 자바스크립트 파일을 어느 부분에 넣어 줄 것인지 설정
            favicon: './favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename:'style.css',
        })
    ],
    module: {
        rules:[
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }, // css 파일을 use에 있는 loader를 사용해서 읽어 들이겠다 라는 의미
            {
                test: /\.(js|jsx)$/,
                // we do not want anything from node_modules to be compiled
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    optimization : {
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    }
    
}
