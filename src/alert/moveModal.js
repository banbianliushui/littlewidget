// JavaScript Document
define(['jquery'], function($){
	var page={
		event:function(evt){
		var ev=evt||window.event;
		return ev;
		},
		pageX:function(evt){
			//pageX，pageY获取鼠标的坐标,指鼠标在页面上的位置，以页面左侧为参考点,相对整个页面的坐标;
			//event.clientX、event.clientY鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条.指可视区域内离左侧的距离，以滚动条滚动到的位置为参考点;当有滚动条时clientX  小于  pageX
			//scrollLeft滚动条的水平偏移,获取页面文档向右滚动过的像素数。
			//clientLeft边框宽度 表示内容区域的左上角相对于整个元素左上角的位置（包括边框）,获取body元素对象的左边框的宽度。
			//PageY=clientY+scrollTop-clientTop;(只讨论Y轴,X轴同理,下同)
			//页面上的位置=可视区域位置+页面滚动条切去高度-自身border高度

			var e=this.event(evt);
			//return e.pageX||(e.clientX+document.body.scrollLeft-document.body.clientLeft);
			return e.clientX==undefined ? e.pageX-document.body.scrollLeft+document.body.clientLeft:(e.clientX);
		},
		pageY:function(evt){
			var e=this.event(evt);
			//return e.pageY||(e.clientY+document.body.scrollTop-document.body.clientTop);
			return  e.clientY ==undefined?e.pageY-document.body.scrollTop+document.body.clientTop : (e.clientY);
		},
		layerX:function(evt){
			//如果触发元素设置了position，则offsetX等于layerX
			//IE特有（新版本浏览器 除了ff都支持）,鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域的左上角为参考点,如果有boder,可能出现负值。

			//layerX:FF特有,鼠标相比较于当前坐标系的位置,即如果触发元素没有设置绝对定位或相对定位,以页面为参考点,如果有,将改变参考坐标系,从触发元素盒子模型的border区域的左上角为参考点，
			var e=this.event(evt);
			return e.layerX||e.offsetX;
		},
		layerY:function(evt){
			var e=this.event(evt);
			return e.layerY||e.offsetY;
		}
	};
	var moveModal=
	{
		init:function()
		{
			this.bind();
		},
		bind:function()
		{
			
			$(document).on("mousedown",".modal-dialog .modal-header",function(e)
			{
				var header=$(e.currentTarget);
				
				var modal=header.parents(".modal-dialog");				
				modal.parents(".modal.fade.in").css("overflow","hidden");
				moveModal.startMove(modal,header,e);
			});
		},
		startMove:function(modal,header,e)
		{
			var tagert=$(e.target);
			if(tagert.is(".modal-header")||tagert.is(".modal-title"))
			{}else
			{
				return ;
			}
			var x=page.layerX(e);//layerX，layerY获取鼠标距离最近postion父级元素div边框的距离。
			var y=page.layerY(e);
			if(tagert.is(".modal-title"))
			{
				var pl=tagert.parents(".modal-header").css("padding-left").replace("px","");
				var pt=tagert.parents(".modal-header").css("padding-top").replace("px","");
				y+=Number(pt);
				x+=Number(pl);
			}
			var fade=modal.parents(".modal.fade.in");
			var pll=fade.css("padding-left").replace("px","");
			pll=Number(pll);
			x+=pll;
			modal=modal[0];
			header=header[0];
			if(header.setCapture){
				header.setCapture();
			}else if(window.captureEvents){
				window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			}
			var d = document;
			$(document).on("mousemove",function(e1)
			{
				var tx=page.pageX(e1)-x;
				var ty=page.pageY(e1)-y;
				modal.style.position="absolute";
				modal.style.top="auto";
				modal.style.left="auto";
				modal.style.marginLeft=(tx)+"px";
				modal.style.marginTop=(ty)+"px";
			});
			$(document).on("mouseup",function(e)
			{
				if(header.releaseCapture){
					header.releaseCapture();
				}else if(window.releaseEvents){
					window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP)
				}
				$(document).off("mousemove");
				$(document).off("mouseup");
			});
		}
	}
	return moveModal;
});