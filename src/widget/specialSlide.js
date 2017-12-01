var $ = require('jquery'); // 美猴王轮播组件

var specialSlide = function(form, width, number) {
	this.$element = form // dom
	this.width = width // 单个内容的宽度
	this.ableSlide = true // slide动画控制
	this.allLength = this.$element.children().length // 内容总长
	this.index = 1 // 当前位置
	this.oneGroup = number // 一屏显示几个
	this.$element.css('width', this.width * this.allLength + 'px')
}

specialSlide.prototype.init = function() {
	var that = this
	this.$element.parent().siblings('.turn-block').on('click', function() {
		if (that.ableSlide) {
			that.ableSlide = false
			if (that.index + +$(this).attr('index') <= 0 || that.index + +$(this).attr('index') > that.allLength - that.oneGroup) {
				if (that.index + +$(this).attr('index') <= 0) {
					that.index = 1
				} else {
					that.index = (that.allLength + 1 - that.oneGroup)
				}
			} else {
				that.index = that.index + +$(this).attr('index')
			}
			that.$element.css('left', -(that.index - 1) * that.width + 'px')
			setTimeout(function(){
				that.ableSlide = true
			}, 600)
		}
	})
}

export { specialSlide }