module.exports = function (data) {
	console.log(data)
	return Object.prototype.toString(data) === '[object Array]'
}