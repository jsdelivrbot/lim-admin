layui.addcss('layui.css', function() {}, 'skinlayuicss').addcss('layui.plugs.css', function() {}, 'plugslayuicss');
layui.define(['mobile'], function(exports) {
	var mobile = layui.mobile;
	exports('yali', {
		layim: mobile.layim //WebIM
	});
});