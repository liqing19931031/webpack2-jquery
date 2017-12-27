var $ = require('jquery'); 

let reWriteForm = function reWriteForm($form, data, special) {
	$.each(data, function(k,v) {
		var node = $form.find('[name=' + k + ']');
		if (special && special[k]) {
	        if (typeof special[k] === 'function') {
	          	special[k].call(node, d);
	        } else {
	          	special[k].val(d, node);
	        }
	    } else {
	    	if (node.length > 1) {
		        if ($(node[0]).attr('type') === 'checkbox' || $(node[0]).attr('type') === 'CHECKBOX') {
		          	if ($.isArray(data[k])) {
		            	$.each(data[k], function (j, _n) {
		              		node.filter('[value=' + _n + ']').attr('checked', 'checked');
		            	});
		          	}
		        }
		        if ($(node[0]).attr('type') === 'radio' || $(node[0]).attr('type') === 'RADIO') {
		          	node.filter('[value=' + data[k] + ']').attr('checked', 'checked');
		        }
		    } else if (node.length === 1) {
		        if (node[0].nodeName === 'input' || node[0].nodeName === 'INPUT') {
		          	if (node.attr('type') === 'email' || node.attr('type') === 'text') {
		            	node.val(data[k]);
		        	}
			        if (node.attr('type') === 'checkbox' || node.attr('type') === 'CHECKBOX') {
			            node.attr('checked', 'checked');
			        }
			        if (node.attr('type') === 'radio' || node.attr('type') === 'RADIO') {
			            node.attr('checked', 'checked');
			        }
		        }
		        if (node[0].nodeName === 'select' || node[0].nodeName === 'SELECT') {
		          	node.val(data[k]);
		        }
		        if (node[0].nodeName === 'img' || node[0].nodeName === 'IMG') {
		          	node.attr('src', data[k]);
		        }
		        if (node[0].nodeName === 'textarea' || node[0].nodeName === 'TEXTAREA') {
		          	node.val(k);
		        }
	      	}
	    }
	})
}
let unique = function unique(arr) {
  var i;
  var j;
  var repeat;
  var res = [arr[0]];
  for (i = 1; i < arr.length; i++) {
    repeat = false;
    for (j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      res.push(arr[i]);
    }
  }
  return res;
};
let submitParam = function submitParam($form) {
  var inputs = $form.find('input');
  var selects = $form.find('select');
  var textarea = $form.find('textarea');
  var nodes = [];
  inputs.each(function (index, value) {
    if ($(value).attr('name')) {
      nodes.push($(value).attr('name'));
    }
  });
  selects.each(function (index, value) {
    if ($(value).attr('name')) {
      nodes.push($(value).attr('name'));
    }
  });
  textarea.each(function (index, value) {
    if ($(value).attr('name')) {
      nodes.push($(value).attr('name'));
    }
  });
  nodes = unique(nodes);
  return nodes;
};
let getParam = function getParam($form) {
  var param = {};
  var nodes = submitParam($form);
  nodes.forEach(function (n) {
    var node = $form.find('[name=' + n + ']');
    if (node.length > 1) {
      if ($(node[0]).attr('type') === 'checkbox' || $(node[0]).attr('type') === 'CHECKBOX') {
        param[n] = [];
        node.each(function () {
          if (this.checked) {
            param[n].push($(this).val());
          }
        });
      }
      if ($(node[0]).attr('type') === 'radio' || $(node[0]).attr('type') === 'RADIO') {
        node.each(function () {
          if (this.checked) {
            param[n] = $(this).val();
          }
        });
      }
    } else if (node.length === 1) {
      if (node[0].nodeName === 'input' || node[0].nodeName === 'INPUT') {
        param[n] = node.val();
      }
      if (node[0].nodeName === 'select' || node[0].nodeName === 'SELECT') {
        param[n] = node.val();
      }
      if (node[0].nodeName === 'textarea' || node[0].nodeName === 'TEXTAREA') {
        param[n] = node.val();
      }
    }
  });
  return param;
};
export {reWriteForm, getParam}