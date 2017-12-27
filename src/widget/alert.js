var $ = require('jquery'); 

let $alert = function(state, content, delay) { // 应该还需要添加一个方法执行回调函数
	$('body').append(['<div class="alert"><div class="alert-', state, ' alert-title">', content, '</div></div>'].join(''))
	setTimeout(function() {
		$('.alert').remove()
	}, delay)
}

export { $alert }