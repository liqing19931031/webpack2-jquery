var $ = require('jquery'); // 美猴王轮播组件

var slide = function(form){
	this.$element = form;
	this.index = 1;
	this.length = this.$element.children().length - 1;
	this.dothtml = [];
}
var hideImg = function(item) {
	this.$element.find('[index-data]').removeClass('on');
	this.$element.find('[index-data=' + item + ']').addClass('on');
}
slide.prototype.render = function() {
	for(let a = 1; a <= this.length; a++) {
		this.dothtml.push('<a href="" class="dot-item" data-index=' + a + '></a>')
	}
	this.$element.find('.slide-dot').css('margin-left', -(12*this.length + 6) + 'px').html(this.dothtml);
	return this;
};
slide.prototype.init = function() {
	var that = this;
	this.$element.on('mouseover', '.dot-item', function() {
		$(this).addClass('on');
		$(this).siblings().removeClass('on');
		that.index = $(this).attr('data-index');
		hideImg.call(that, that.index);
	})
	that.$element.find('[data-index=1]').trigger('mouseover');
	return this;
}
slide.prototype.startSlide = function() {
	var slidego = function(){
		setTimeout(function(){
			this.index = this.index > this.length ? 1 : this.index;
			this.$element.find('[data-index=' + this.index + ']').trigger('mouseover');
			this.index ++;
			slidego();
		}.bind(this), 3000)
	}.bind(this);
	slidego();
}
export { slide }