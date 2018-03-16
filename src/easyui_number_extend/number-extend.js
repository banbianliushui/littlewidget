/**
 *
 * 数字组件 默认‘-’表示为空
 */

$.fn.numberbox.defaults.mynullshow = '-';

// focus 为mynullshow 时清空输入框
$.fn.numberbox.defaults.afterblur = function() {
}
$.fn.numberbox.defaults.inputEvents.focus = function(e) {
	var orginput = e.data.target;
	var deftext = $(orginput).numberbox("getText");
	var nullshow = $(orginput).data('numberbox').options.mynullshow;
	if (nullshow!=null&&deftext == nullshow) {
		$(orginput).numberbox("setValue", "");
		$(orginput).numberbox("setText", "");
	}
	
}
$.fn.numberbox.defaults.inputEvents.blur = function(e) {
	var orginput = e.data.target;
	var deftext = $(orginput).numberbox("getText");
	var nullshow = $(orginput).data('numberbox').options.mynullshow;
	if (deftext == nullshow) {
		deftext = "";
	}
	var opt = $(orginput).data('numberbox').options;
	if(deftext=="."){
		deftext="0"
		deftext=parseFloat(deftext).toFixed(opt.myprecision);
		
	}else{
		
	}
	$(orginput).numberbox("setValue", deftext);
	
	
	if (opt.afterblur) {
		opt.afterblur(e);
	}
}

$.fn.numberbox.defaults.parser = function(s) {
	s = s + "";
	var opts = $(this).numberbox("options");
	if (parseFloat(s) != s) {
		if (opts.prefix) {
			s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.prefix), "g"),
					""));
		}
		if (opts.suffix) {
			s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.suffix), "g"),
					""));
		}
		if (opts.groupSeparator) {
			s = $.trim(s.replace(new RegExp("\\" + opts.groupSeparator, "g"),
					""));
		}
		if (opts.decimalSeparator) {
			s = $.trim(s.replace(new RegExp("\\" + opts.decimalSeparator, "g"),
					"."));
		}
		s = s.replace(/\s/g, "");
	}
	var val = parseFloat(s);
	if (isNaN(val)) {
		val = "";
	}
	return val;
}
$.fn.numberbox.defaults.myprecision=0;
$.fn.numberbox.defaults.formatter = function(val) {

	var precision = $(this).data('numberbox').options.myprecision;
	var nullshow = $(this).data('numberbox').options.mynullshow;
	var p = Number(precision);
	val = val + "";
	var sval = val.split(".");
	if (val.trim() != "" && String(parseFloat(val)) != "NaN"
			&& (sval.length == 1 || (sval.length == 2 && sval[1].length <= p))) {
		return parseFloat(val).toFixed(p);
	}
	if (val.trim() == "") {
		val = nullshow;
	}
	return val;

}
