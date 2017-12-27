require('../styles/login.less');

import { getParam } from '../widget/form';
import { $alert } from '../widget/alert'

var $ = require('jquery');

$('.submit-button').on('click', function () {
	let params = getParam($('.register-form'))
	if (params.userName === '' || params.telephone === '' || params.verification === '' || params.password === '') {
		$alert('warning', '必填信息不能为空！')
		return
	}
	$.ajax({
		url: 'http://shop.mhw.com/register',
		data: getParam($('.register-form')),
		method: 'POST',
		success: function(res) {
			if (res.code === 1) {
				$alert('success', res.data)
			} else {
				$alert('warning', res.data)
			}
		}
	})
})
let second = 60

let timeStop = function() {
	if (second > 0) {
		second--
		$('.ver--button').html(`${second}s后可重新发送`)
		$('.ver--button').addClass('disabled')
		setTimeout(timeStop, 1000)
	} else {
		second = 60
		$('.ver--button').removeClass('disabled')
		$('.ver--button').html('重新发送')
	}
}

$('.ver--button').on('click', function() {
	second === 60 && $.ajax({
		url: 'http://shop.mhw.com/sendMobileCode',
		data: {
			mobile: $('input[name=telephone]').val()
		},
		method: 'POST',
		success: function(res) {
			if (res.code === 1) {
				$alert('success', res.data)
				timeStop(60)
			} else{
				$alert('warning', res.data)
				$('.ver--button').html('重新发送')
			}
		}
	})
})

$('label').on('click', 'input', function() {
	if (+$(this).val() === 1) {
		$('.companyConnect').show()
	} else {
		$('.companyConnect').hide()
	}
})