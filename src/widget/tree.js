var $ = require('jquery'); // 美猴王轮播组件

var tree = function(form) {
	this.$element = form
}

tree.prototype.init = function() {
	var that = this
	this.$element.on('click', '.glyphicon-add', function () {
		$(this).addClass('glyphicon-reduce').removeClass('glyphicon-add')
		$(this).parent().parent().addClass('open')
	})
	this.$element.on('click', '.glyphicon-reduce', function() {
		$(this).addClass('glyphicon-add').removeClass('open glyphicon-reduce')
		$(this).parent().parent().removeClass('open')
	})
}

export { tree }