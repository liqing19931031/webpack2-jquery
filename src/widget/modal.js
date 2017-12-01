var $ = require('jquery'); 

var modal = function (modal, btn) {
	this.$btn = btn
	this.$modal = modal
	this.$close = this.$modal.find('.close')
}

modal.prototype.init = function() {
	let that = this
	this.$btn.on('click', function() {
		that.show()
	})
	this.$close.on('click', function() {
		that.hide()
	})
	this.$modal.find('.btn').on('click', function() {
		$.ajax({
			method: 'post',
			url: 'http://10.0.92.166/?ctl=Sincerity_Index&met=addFeedBack&typ=json',
			data: {
				tele: that.$modal.find('[name=tele]').val(),
				name: that.$modal.find('[name=name]').val(),
				content: that.$modal.find('[name=content]').val(),
			},
			success: (res) => {
				if (res.status === 200) {
					alert('提交成功！')
					that.hide()
				} else {
					alert(res.msg)
				}
			}
		})
	})
	this.$modal.on('click', function() {
		that.hide()
	})
	this.$modal.on('click', '.modal-body', function(e) {
		e.stopPropagation()
	})
}
modal.prototype.show = function() {
	this.$modal.show()
	this.$modal.addClass('active')
	$('body').css('overflow', 'hidden')
	return this
}
modal.prototype.hide = function() {
	this.$modal.removeClass('active')
	$('body').css('overflow-y', 'scroll')
	setTimeout(() => {
		this.$modal.hide()
	}, 500)
	return this
}

export { modal }