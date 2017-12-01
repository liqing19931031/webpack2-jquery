// require('../styles/all.less');
var $ = require('jquery');

import { slide } from '../widget/slide';
import { tab } from '../widget/tab';
import { specialSlide } from '../widget/specialSlide';

var bannerSlide = new slide($('.plate-midle'))
var tabForm = new tab($('.floor-article'))
var goodsSlide = new specialSlide($('.goods-slide-group'), 165, 4)
var shopSlide = new specialSlide($('.shops-slide-group'), 250, 4)

$('.floor-banner').find('.floor-nav').on('mouseenter', 'li[data-show]', function() {
	$('.floor-nav--show').show()
	$('.floor--group').hide()
	$('.floor--group').removeClass('active')
	$(`.floor--show-${$(this).attr('data-show')}`).show()
	$(`.floor--show-${$(this).attr('data-show')}`).addClass('active')
})
$('.floor-banner').find('.floor-nav').on('mouseleave', function() {
	$('.floor-nav--show').hide()
	$('.floor--group').hide()
	$('.floor--group').removeClass('active')
})

bannerSlide.render().init().startSlide()
tabForm.init()
goodsSlide.init()
shopSlide.init()