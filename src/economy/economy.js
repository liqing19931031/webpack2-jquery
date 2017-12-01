require('../styles/economy.less');

let $ = require('jquery')
import { slide } from '../widget/slide';
import { modal } from '../widget/modal';

// html 模板引入
let userConTemplate = require('../view/widget/UserContent.hbs')
let headerTemplate = require('../view/widget/Header.hbs')
let footerTemplate = require('../view/widget/Footer.hbs')
let bannerTemplate = require('../view/widget/Banner.hbs')
let childTemplate = require('../view/widget/childShow.hbs')

let modalGroup = new modal($('.modal-form'), $('.call-us'))
let url = 'http://10.0.92.166/index.php?ctl=Sincerity_Index'

let scrollTo = function(top) {
	if (document.documentElement.scrollTop < top) {
		document.documentElement.scrollTop = document.documentElement.scrollTop + 50
		setTimeout(function() {
			scrollTo(top)
		}, 15)
	}
}

$('body').on('click', '#shopContent', function() {
	console.log(2)
	scrollTo(450)
})
$('body').on('click', '#shopChance', function() {
	console.log(3)
	scrollTo(1250)
})
$('body').on('click', '#customAnswer', function() {
	console.log(4)
	scrollTo(850)
})
// 子页面展开逻辑
let showChild = function(index) {
	$.ajax({
		method: 'get',
		url: url + '&met=getMainInfo',
		data: {
			page_type: index
		},
		success: (res) => {
			let data = JSON.parse(res).mainData
			data.forEach(function(item, index) {
				if (Array.isArray(item.image)) {
					data[index].isArry = 1
				}
			})
			$('#childShow').html(childTemplate({data: data}))
			$('.child-show').show()
		}
	})
}

$('.child-show').on('click', '.close', function() {
	$('.child-show').hide()
})
$('.introduce').on('click', function() {
	showChild($(this).attr('index'))
})

// 获取公共信息
$.ajax({
	method: 'get',
	url: url + '&met=getBaseInfo',
	success: (res) => {
		$('.banner-group').html(bannerTemplate({data: JSON.parse(res).banner}))
		let slideBanner = new slide($('.banner-group'))
		slideBanner.render().init().startSlide()
		$('footer').html(footerTemplate({data: JSON.parse(res).footInfo}))
	}
})
// 获取首页内容信息
$.ajax({
	method: 'get',
	url: url + '&met=getMainInfo',
	data: {
		page_type: 0
	},
	success: (res) => {
		console.log($('.market').find('img'))
		JSON.parse(res).mainData.th_part.image.forEach((item, index) => {
			$($('.market').find('img')[index]).attr('src', item.img)
		})
		console.log(JSON.parse(res).mainData.th_part.image)
		$('#user-content').html(userConTemplate({data: JSON.parse(res).mainData.s_part.image}))
	}
})

// 模态框初始化
modalGroup.init()
$('header').html(headerTemplate)