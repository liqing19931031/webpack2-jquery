require('../styles/component.less');
require('../styles/tree.less');
require('../styles/alert.less');
require('../styles/slide.less');
require('../styles/glyphicon.less');

let $ = require('jquery')
import { tree } from '../widget/tree'; // 树状展开组件
import { $alert } from '../widget/alert'; //提示框组件
import { slide } from '../widget/slide'; //提示框组件
import { getParam } from '../widget/form'; //提示框组件

// 树状组件
let TreeGroup = new tree($('ul.tree-group'))
TreeGroup.init()

// 提示框组件
$('.alert-success').on('click', function(){
		$alert('success', '成功！', 3000)
})

$('.alert-warning').on('click', function(){
		$alert('warning', '警告！', 3000)
})

$('.alert-info').on('click', function(){
		$alert('info', '一般提示！', 3000)
})

// 轮播图组件
let Slide = new slide($('.plate-midle'))
Slide.render().init().startSlide()

// 表单组件
$('.submit').on('click', function() {
	let params = getParam($('.form-control'))
	let html = ''
	Object.keys(params).forEach(function(item){
		html += `${item}:${params[item]}` + '\n'
	})
	$('pre').html(html)
})