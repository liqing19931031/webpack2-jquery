const webpack = require('webpack');
const path = require('path'); // node的path模块一般用于合并路径
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MyPlugin = require('./MyPlugin.js')

const components = ['index', 'enter', 'approve', 'approveable']

let entrys = {} // 路口文件容器
let plugins = [] // 多页面配置容器
components.forEach((item, index) => {
	entrys[item] = path.join(__dirname, `src/${item}/${item}.js`)
})
components.forEach((item, index) => {
	plugins.push(
		new HtmlWebpackPlugin({ // 路径是以上面path中的配置为初始路径
			title: '商家入驻',
			template: `./src/component/${item}.html`, // 模板路径是以当前文件夹的根目录来定义的
			filename: `./${item}/${item}.html`,
			inject: 'body',
			chunks: [item] // 公共全局引入jquery
		})
	)
})

const base = {
		// 页面多入口文件配置
	entry: entrys,
	  // 输出配置
	output: {
		path: path.resolve(__dirname, 'E:/mhw/mhw/shop/microMallSettle'), // 打包路径修改
		filename: '[name]/[name].js'
	},
	module: {
		// 加载器配置
		rules: [
			{
				test: /\.js$/, //判断当文件类型为js的时候,进行es6的转义
				exclude: /node_modules/, //忽视node_modules下的文件,不进行转义
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.less$/, // 预编译 less loader
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
  		},
  		{
  			test: /\.hbs$/, // html模板引擎loader
  			use: [
  				'handlebars-loader'
  			]
  		},
  		{
  			test: /\.(png|jpg)$/,
  			loader: 'url-loader?limit=8192&context=client&name=image/[name].[hash:7].[ext]', // 指定图片路径
  			options: { publicPath: '../image/' } // 默认添加路径
  		}
		]
	},
	resolve: {
		modules: [
			'node_modules',
			path.join(__dirname, '/src'),
			path.join(__dirname, '/dist')
		],
  	extensions: ['.js', '.less']
  },
  externals: { // 定义全局jquery
  	jquery: 'window.$'
	},
	plugins: [
			new MyPlugin({ // 添加公共文件插件的自定义插件
	        paths: ['../jQuery.js']
	    }),
	    ...plugins
	]
}

module.exports = base;