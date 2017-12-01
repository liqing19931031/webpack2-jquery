var $ = require('jquery'); // 美猴王轮播组件

var tab = function(form) {
	this.$element = form
	this.index = 1
}

tab.prototype.init = function() {
	var that = this
	this.$element.find('.floor-article-title').on('click', 'li', function() {
		that.index = $(this).attr('art-index')
		that.changeIndex()
	})
	this.changeIndex()
	return this
}

tab.prototype.changeIndex = function() {
	this.$element.find('[art-index]').removeClass('active')
	this.$element.find(`[art-index=${this.index}]`).addClass('active')
	this.$element.find('[article-index]').hide()
	this.$element.find(`[article-index=${this.index}]`).show()
	return this
}

export { tab }