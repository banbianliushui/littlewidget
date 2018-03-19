
	(function($) {
		$.extend({
			resizeModal:function($modal){
				//水平垂直居中弹窗
			var modelpan;
			if($modal==undefined){
				modelpan=$(".modal.fade");
			}else{
				modelpan=$modal;
			}						
			
			modelpan.each(function(){
				var modelp=$(this);
				var modaldia=modelp.find(".modal-dialog");
				var wi,he;
				modelp.css("display","block");
				he=modaldia.height();
				//modelpan.css("display","none");				
				wi=modaldia.width();
				modaldia.css("position","absolute");
				modaldia.css("top","50%");
				modaldia.css("left","50%");
				modaldia.css("margin-left","-"+ parseInt(wi) / 2+"px");
				modaldia.css("margin-top","-"+ parseInt(he) / 2+"px");
			});
		}});

		$.extend({


			"commonAlert" : function(params) {//自定义确认弹窗

				if (params) {
					var id = "modal" + new Date().getTime();
					var title = "提示";
					var style = "";
					var contentsty = "";
					var noborder = "";
					var btnsalign = "";
					var modalcls = "";
					var backdrop = "";
					if (params.id) {
						id = params.id;
					}
					if (params.title) {
						title = params.title;
					}
					if (params.style) {
						style = params.style;
					}
					if (params.width) {
						contentsty += "width: " + params.width + ";";
					}else{
						params.width="300px";
						contentsty += "width: " + params.width + ";";						
					}
					if (params.height) {
						contentsty += "height:" + params.height + ";";
					}
					if (params.width && params.height) {
						// 保持窗口屏幕居中
						params.width=params.width.replace("px","");
						params.height=params.height.replace("px","");
						contentsty += "position: absolute; top: 50%; left: 50%; margin-left: -" + parseInt(params.width) / 2 + "px; margin-top: -" + parseInt(params.height) / 2 + "px;";
					}
					if (params.bodynoborder == false && params.bodynoborder != undefined) {

					} else {
						noborder = "body-noborder";
					}
					if (params.btnsalign != undefined) {
						btnsalign = "text-align:" + params.btnsalign + ";"
					} else {
						// btnsalign="text-align:center;";
					}
					if (params.modalcls) {
						modalcls = params.modalcls;
					}
					if(params.backdrop){
						//backdrop
						if(typeof params.backdrop =="string"){
							backdrop=" data-backdrop='"+params.backdrop+"'";
						}else{
							backdrop=" data-backdrop="+params.backdrop+"";
						}
						
					}else{
						backdrop=" data-backdrop='static'";
					}
					//modal-dialog cursor:default;
					var html = '<div class="modal fade ' + modalcls + '" id="' + id + '" ' + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" '
					+backdrop+' aria-hidden="true"  style="overflow:hidden;">' + '<div class="modal-dialog" style="'
							+ contentsty + '">' + '<div class="modal-content" >' + '<div class="modal-header ">'
							+ '<button type="button" class="close" data-dismiss="modal" 	aria-hidden="true">×</button>' + '<h4 class="modal-title" id="myModalLabel">' + title + '</h4>' + '</div>'
							+ '<div class="modal-body ' + noborder + '" style="min-height:50px;' + style + '" >' + params.html + '</div>';
					var btns = [];
					if (params.hasfoot === true || (params.btns)) {
						html += '<div class="modal-footer">';
						if (params.btns && params.btns.length > 0) {// style,cls,text,click,align,type:ok,hide
							for (var i = 0; i < params.btns.length; i++) {
								var btn = params.btns[i];

								btns.push($.extend(btn, {
									clickcls : "modal-foot-btn" + i
								}));
								var btncls = "";
								var btntext = "确定";
								var btnstyle = "";
								var btnhide = "";
								var btnid = i;
								if (btn.text) {
									btntext = btn.text;
								}
								if (btn.cls) {
									btncls = btn.cls + " modal-foot-btn" + i;
								} else {
									btncls = " btn-primary " + " modal-foot-btn" + i;
								}
								if (btn.style) {
									btnstyle = btn.style;
								}
								if (btn.align) {
									// btnstyle="float:"+btn.align;
									btnstyle = btnstyle + ";float:" + btn.align + ";";
								}
								if (btn.type == "hide") {
									btnhide = ' data-dismiss="modal" ';
								}

								if (btn.icon) {
									btntext = '<span class="icon ' + btn.icon + '" ></span>' + btntext;
								}
								html += '<button type="button" btnid="' + btnid + '"  class="btn  ' + btncls + '"  style="' + btnstyle + '"	' + btnhide + '>' + btntext + '</button>';
							}
						}
						html += '</div>';
					}
					html += '</div>' + '</div>' + '</div>';

					$("body").append(html);
					for (var i = 0; i < btns.length; i++) {
						var btn = btns[i];
						if (btn.click && typeof (btn.click) === "function") {

							$("#" + id + " ." + btn.clickcls).on("click", function(e) {
								var btnid = $(this).attr("btnid");
								btns[Number(btnid)].click(e, $("#" + id));
							});
						}
					}
					
					$("#" + id).on('hide.bs.modal', function() {
						
					});
					$("#" + id).on('hidden.bs.modal', function() {

						if (params.onhidden != undefined && typeof params.onhidden == 'function') {
							params.onhidden.call(this);
						}
						$(this).remove();
					});
					$("#" + id).on('show.bs.modal', function() {
						$.resizeModal($("#" + id));
						
						if (params.onshow != undefined && typeof params.onshow == 'function') {
							params.onshow.call(this);
						}

					});
					$("#" + id).on('shown.bs.modal', function() {

						var msk = $(".modal-backdrop.fade.in");
						if (msk.length > 1) {
							msk.each(function(i, item) {
										if (i > 0) {
											$(item).attr("style", "display:none;")
										}
									})
						}
						
						if (params.onshown != undefined && typeof params.onshown == 'function') {
							params.onshown.call(this);
						}

					});
					$("#" + id).modal('show');
					
				}
			},
			"imgModal" : function(params) {
				if (params && params.imglist && params.imglist.length > 0) {
					var id = "modal" + new Date().getTime();
					var title = "提示";
					var style = "";
					var contentsty = "";
					var ifbtn = false;
					if (params.id) {
						id = params.id;
					}
					if (params.title) {
						title = params.title;
					}
					if (params.style) {
						style = params.style;
					}
					if (params.ifbtn) {
						ifbtn = params.ifbtn;
					}
					if (params.width) {
						contentsty += "width:" + params.width + ";"
					}
					if (params.hight) {
						contentsty += "height:" + params.hight + ";"
					}

					var imgh = "";
					// imageContent
					if (params.imglist && params.imglist.length > 0) {
						for (var k = 0; k < params.imglist.length; k++) {
							var img = params.imglist[k];

							var cls = " image-show ";
							if (k + "" == params.showpicid + "") {// showpicid点击的图片id
								// st+="display:none;";
								cls += " active";
							}
							imgh += "<img showid='" + k + "' src='"+img.src+"' "+"picid='" + img.guId + "' "+"class='" + cls + "'>";//picid='" + img.guId + "' imgname='" + img.imageName + "." + img.imageType + "' src='" + img.imageContent + "'
						}

					}

					// params.imglist
					var html = '<div class="modal fade" id="' + id + '" ' + ' tabindex="-1" role="dialog" aria-labelledby="myimgModalLabel" aria-hidden="true">' + '<div class="modal-dialog">'
							+ '<div class="modal-content" style="' + contentsty + '">' + '<div class="modal-header no-background ">'
							+'<span class="imgM_title"></span>'
							+ '<button type="button" class="close" data-dismiss="modal" 	aria-hidden="true">×</button>' + '</div>' + '<div class="modal-body body-noborder" style="' + style + '" >'
							+ "<div class='imgmodal-innerbody'>" + imgh + "</div>" + '</div>';
					html += '<div class="modal-footer imgmodal-footer">' + "<div class='imgmodal-btngroups'>" 
					if(ifbtn)
					html += "<span class='icon icon-goprev' style='cursor:pointer;'></span>" + "<span class='icon icon-gonext' style='cursor:pointer;'></span>"
					html +=  "<a class='icon icon-download active' id='img_download' style='cursor:pointer;'></a>" + "</div>"
							+ '</div>';

					$("body").append(html);
					$("#" + id).on('show.bs.modal', function() {
						$.resizeModal($("#" + id));
						var showid = $("#" + id + " .imgmodal-innerbody img.active").attr("showid");
						var previmg = $("#" + id + " .imgmodal-innerbody img[showid='" + (Number(showid) - 1) + "']");
						var nextimg = $("#" + id + " .imgmodal-innerbody img[showid='" + (Number(showid) + 1) + "']");
						if (previmg.length > 0) {
							$("#" + id + " .icon-goprev").addClass("active");
						}
						if (nextimg.length > 0) {
							$("#" + id + " .icon-gonext").addClass("active");
						}
						var to=params.imglist&&params.imglist.length; 
						$('.imgM_title').html((Number(showid)+1)+'/'+to);
					});
					$("#" + id).modal('show');// modal('hide')
					$("#" + id).on('shown.bs.modal', function(e) {
						// do something...
						
					
					})

					$("#" + id).on('click', ".icon-goprev", function() {
						if(!$(this).hasClass("active")){
							return;
						}
						var nowimg = $("#" + id + " .imgmodal-innerbody img.active");
						var showid = nowimg.attr("showid");
						var previmg = $("#" + id + " .imgmodal-innerbody img[showid='" + (Number(showid) - 1) + "']");
						var prev1img = $("#" + id + " .imgmodal-innerbody img[showid='" + (Number(showid) - 2) + "']");
						if (previmg.length > 0) {
							nowimg.removeClass("active");
							previmg.addClass("active");
						}
						if (prev1img.length == 0) {
							$("#" + id + " .icon-goprev").removeClass("active");
							$("#" + id + " .icon-gonext").addClass("active");
						}else{
							$("#" + id + " .icon-goprev").addClass("active");
							$("#" + id + " .icon-gonext").addClass("active");
						}
						var to=params.imglist&&params.imglist.length; 
						$('.imgM_title').html((Number(showid))+'/'+to);

					});
					$("#" + id).on('click', ".icon-gonext", function() {
						if(!$(this).hasClass("active")){
							return;
						}
						var nowimg = $("#" + id + " .imgmodal-innerbody img.active");
						var showid = nowimg.attr("showid");
						var nextimg = $("#" + id + " .imgmodal-innerbody img[showid='" + (Number(showid) + 1) + "']");
						var next1img = $("#" + id + " .imgmodal-innerbody img[showid='" + (Number(showid) + 2) + "']");
						if (nextimg.length > 0) {
							nowimg.removeClass("active");
							nextimg.addClass("active");
						}
						if (next1img.length == 0) {
							$("#" + id + " .icon-gonext").removeClass("active");
							$("#" + id + " .icon-goprev").addClass("active");
						}else{
							$("#" + id + " .icon-goprev").addClass("active");
							$("#" + id + " .icon-gonext").addClass("active");
						}
						
						var to=params.imglist&&params.imglist.length; 
						$('.imgM_title').html((Number(showid)+2)+'/'+to);

					});
					$("#" + id).on('click', ".icon-download", function() {
						var nowimg = $("#" + id + " .imgmodal-innerbody img.active");
						var imgPathURL = nowimg.attr("src");
						var imageName = nowimg.attr("imgname");
						var guid1 = nowimg.attr("picid");
						if(guid1!=null){
							guid1=Number(guid1);
						}else{
							guid1="";
						}
						///guid1=Number(guid1);
						if(imageName==null){
							imageName=imgPathURL.substr(imgPathURL.lastIndexOf("/")+1);
						}
						// http://localhost:8080/topware-govdocsearch/message/js/app.js
						// IE
						// document.frames("IframeReportImg").document.execCommand("SaveAs");
						var remoteURL = imgPathURL;// "http://localhost:8080/topware-govdocsearch/disk/assets/imges/logo.png
						
						var elemIF = document.createElement("iframe");
						elemIF.src = "/xxx/downloadN?imageId="+guid1;// "http://127.0.0.1:8080/topware-govdocsearch/web/dw/doc/download?";//文件路径
						elemIF.style.display = "none";
						elemIF.name="downimgiframe";
						document.body.appendChild(elemIF);
						
						//$('iframe[name="downimgiframe"]').remove();
						/*$.reference({
							serverName : "/web/notice/downloadN",
							params : {imageId:guid1},
							callback : function(data) {
							
							}});*/
//						if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)||(navigator.userAgent.indexOf('Firefox') >= 0)) {
//							//$.saveIEFramePic.savepic(remoteURL);
//							downPicObj.savepic(remoteURL);
//							$('iframe').remove();
//							var elemIF = document.createElement("iframe");
//							//elemIF.src = "/topware-govdocsearch/web/dw/doc/download?docId=" + guid;// 文件路径
//							elemIF.src =	remoteURL;
//							elemIF.style.display = "none";
//							document.body.appendChild(elemIF);
//							/*var elemIF = document.createElement("iframe");
//							elemIF.src = remoteURL;// "http://127.0.0.1:8080/topware-govdocsearch/web/dw/doc/download?";//文件路径
//							elemIF.style.display = "none";
//							document.body.appendChild(elemIF);*/
//						}
//						 else if (navigator.userAgent.indexOf('Firefox') >= 0){
//							 var elemIF = document.createElement("iframe");
//								elemIF.src = remoteURL;// "http://127.0.0.1:8080/topware-govdocsearch/web/dw/doc/download?";//文件路径
//								elemIF.style.display = "none";
//								document.body.appendChild(elemIF);
//						 }
						 //else if (navigator.userAgent.indexOf('Opera') >= 0){
						// // alert('你是使用Opera')
						// }
//						else {
//							try {
//								var $a=document.createElement('a');
//								$a.setAttribute("href",remoteURL);
//								$a.setAttribute("download",imageName);
//								var evObj = document.createEvent("MouseEvents");
//								evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
//								$a.dispatchEvent(evObj);					
//							} catch (e) {
//							}
//						}

						// function download(obj){
						// if(document.all.ifrm==null){
						// var elemIF = document.createElement("iframe");
						// elemIF.src
						// ="http://localhost:8080/topware-govdocsearch/message/js/app.js"
						// ;//"http://127.0.0.1:8080/topware-govdocsearch/web/dw/doc/download?";//文件路径
						// elemIF.style.display = "none";
						// elemIF.outerHTML="<iframe name=ifrm
						// style='width:0;hieght:0' src='"+remoteURL+"'></iframe>";
						// document.body.appendChild(elemIF);
						// // var objIframe=document.createElement("IFRAME");
						// // document.body.insertBefore(objIframe);
						// // objIframe.outerHTML="<iframe name=ifrm
						// style='width:0;hieght:0' src="+remoteURL+"></iframe>";
						// // re=setTimeout("download()",1) ;
						// var files=window.open(remoteURL,"ifrm") ;
						// files.document.execCommand("SaveAs") ;
						// document.all.ifrm.removeNode(true) ;
						// } else{
						// // clearTimeout(re) ;
						// var files=window.open(remoteURL,"ifrm") ;
						// files.document.execCommand("SaveAs") ;
						// document.all.ifrm.removeNode(true) ;
						// }
						// }

						// var ajax;
						// if(window.ActiveXObject){
						// var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP',
						// 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0',
						// 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0',
						// 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0',
						// 'MSXML2.XMLHTTP'];
						// for(var i=0; i <versions.length; i++) {
						// try {
						// ajax = new ActiveXObject(versions[i]);
						// if(ajax) {
						// return ajax;
						// }
						// } catch(e) {}
						//	
						// }
						// }else if(window.XMLHttpRequest) {
						// ajax = new XMLHttpRequest();
						// }
						// var xh=ajax;
						// xh.onreadystatechange = function(){
						// if (xh.readyState == 4) {
						// alert(xh.status);
						// if (xh.status == 200) {
						// //saveFile("d:\dd.gif");
						//						
						// var objStream;
						// var imgs;
						// imgs = xh.responseBody;
						// objStream = new ActiveXObject("ADODB.Stream");
						// objStream.Type = 1;
						// objStream.open(imgPathURL);
						// objStream.write(imgs);
						// objStream.SaveToFile() ;
						// return true;
						// }
						// else
						// { return false; }
						// }
						// else
						// return false;
						// };
						// xh.open("GET", imgPathURL, true);
						// xh.send();

						// $("#" + id +" .icon-download").href=imgPathURL;

						// var oPop = window.open(imgPathURL,"","width=1, height=1,
						// top=5000, left=5000");
						// for(; oPop.document.readyState != "complete"; )
						// {
						// if (oPop.document.readyState == "complete")break;
						// }
						// oPop.document.execCommand("SaveAs");
						// oPop.close();
						// var domain = document.domain;
						// var url = window.location.href;
						//
						// var url = self.location.href;
						//
						// var url = document.URL;
						//
						// var url = document.location;
						// window.open(imgPathURL);
						// if (!document.getElementById("IframeReportImg"))
						//					 
						// $('<iframe style="display:none;" id="IframeReportImg"
						// name="IframeReportImg"'
						// +' onload="" width="0" height="0"
						// src="about:blank"></iframe>').appendTo("body");
						// if (document.all.IframeReportImg.src != imgPathURL) {
						// //加载图片
						// document.all.IframeReportImg.src = imgPathURL;
						// //
						// document.frames("IframeReportImg").location.href=imgPathURL;
						// }
						// else {
						// //window.open("template.xls");
						// //图片直接另存为
						// if (document.all.IframeReportImg.src != "about:blank")
						// document.frames("IframeReportImg").document.execCommand("SaveAs");
						// //
						// }
						// var oPop = window.open(imgURL,"","width=1, height=1,
						// top=5000, left=5000");
						// for(; oPop.document.readyState != "complete"; )
						// {
						// if (oPop.document.readyState == "complete")break;
						// }
						// oPop.document.execCommand("SaveAs");
						// oPop.close();

					});
					$("#" + id).on('hide.bs.modal', function() {
						$(this).remove();
					});
				}
			},
			// params:
			// id如果有指定modal的id；title弹窗标题，style弹窗内容样式，width，弹窗内容高度，type：弹窗样式，timeout:自动关闭时间，默认1500，如果false表示不自动关闭
			"simpleAlert" : function(params) {
				var id = "modal" + new Date().getTime();
				var title = "";
				var style = "";
				var contentsty = "";
				var typeh = "";
				var typecls = "";

				if (params.id) {
					id = params.id;
				}
				if (params.title) {
					title = params.title;
				}
				if (params.style) {
					style = params.style;
				}
				if (params.width) {
					contentsty += "width:" + params.width + ";"
				}
				if (params.height) {
					contentsty += "height:" + params.height + ";"
				}
				// success warn error
				if (params.type && (params.type == "warn" || params.type == "error")) {
					if (params.type == "warn") {
						typeh = '<span class="glyphicon glyphicon-warning-sign " style="margin-right:5px;"></span>';
						typecls = ' text-warn ';
					} else {
						typeh = '<span class="glyphicon glyphicon-remove  " style="margin-right:5px;"></span>';
						typecls = ' text-danger ';
					}
					params.timeout = false;
					// text-danger
				} else {
					typeh = '<span class="glyphicon glyphicon-ok " style="margin-right:5px;"></span>';
					typecls = ' text-success ';
				}

				// document.body.clientWidth
				// 网页可见区域高： document.body.clientHeight
				// 网页可见区域宽： document.body.offsetWidth (包括边线的宽)
				// 网页可见区域高： document.body.offsetHeight (包括边线的高)
				// 网页正文全文宽： document.body.scrollWidth
				// 网页正文全文高： document.body.scrollHeight
				// 网页被卷去的高： document.body.scrollTop
				// 网页被卷去的左： document.body.scrollLeft
				//var $content = $('<div style="display: inline-block;" >' + typeh + params.html + '</div>');
				var $content= $('body').append($('<span style="display:none;" id="dom_width_'+id+'" ></span>')).find("#dom_width_"+id).html(typeh + params.html);  
			     
				var $body = $('body');
				var tw = $content.width();
				var th = $content.height();
				var boh = $body.height();
				var w = "";
				var h = "";
				var dias = "";
				var bh = 0;// 50-200
				//console.log("tw",tw,"th",th,"boh",boh);
				if (tw < 800) {
					w = "width: 200px;";
					bh=30;
				} else if (tw < 1600) {
					w = "width: " + tw/4 + "px;";
					bh=30 * ((tw-800)*1.5/200);
				} else {
					w = "width: 500px;";
					bh=200;
				}

				dias = w + ' ';
				$("#dom_width_"+id).remove(); 
				// params.imglist
				var html = '<div class="modal fade" id="' + id + '" ' + ' tabindex="-1" role="dialog" aria-labelledby="myimgModalLabel" aria-hidden="true">' + '<div class="modal-dialog" style="'
						+ dias + '">' + '<div class="modal-content" style=" -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color=\'#cccccc\')";' + contentsty + '">' + '<div class="modal-header no-background  ">'
						+ '<button type="button" class="close" data-dismiss="modal" style="    margin-top: -12px;"	aria-hidden="true">×</button>' + '</div>'
						+ '<div class="modal-body body-noborder" style="min-height: 30px;margin-top: 0px;max-height:200px;text-align: center;' + style + '" >' + '<div class="' + typecls + '" >'
						+ typeh + params.html + '</div>' + '</div>';

				$("body").append(html);
				$("#" + id).on('show.bs.modal', function() {
					$.resizeModal($("#" + id));
					if (params.onshow != undefined && typeof params.onshow == 'function') {
						params.onshow.call(this);
					}

				});
				
				$("#" + id).on('shown.bs.modal', function() {
					var msk = $(".modal-backdrop.fade.in");
					if (params.timeout === false) {

					} else {
						 var t=1500;
						 if(params.timeout!=undefined){
						 t=Number(params.timeout);
						 }
						 setTimeout(function(){
						 $("#" + id).modal('hide');
						 

							if($("#ODOC_OCX_OBJ").length>0){
								if($(".modal").length<=0){
									$("#ODOC_OCX_OBJ").css("width","100%")
									$("#ODOC_OCX_OBJ").css("height","100%")
									$("#ODOC_OCX_OBJ").css("display","block")
									}
							}
							if($("#showdiv").length>0){
								if($(".modal").length<=0){
								$("#showdiv").css("display","block")
								}
								}
						
						 },t);
					}

					if (msk.length > 1) {
						msk.each(function(i, item) {
									if (i > 0) {
										$(item).attr("style", "display:none;")
									}
								})
					}
					if (params.onshown != undefined && typeof params.onshown == 'function') {
						params.onshown.call(this);
					}

				});
				
				$("#" + id).modal('show');// modal('hide')
				$("#" + id).on('hide.bs.modal', function() {
					
				});
				$("#" + id).on('hidden.bs.modal', function() {
					//$(this).remove();
					if (params.onhidden != undefined && typeof params.onhidden == 'function') {
						params.onhidden.call(this);
					}
					$(this).remove();
					if($("#ODOC_OCX_OBJ").length>0){
						if($(".modal").length<=0){
						$("#ODOC_OCX_OBJ").css("width","100%")
						$("#ODOC_OCX_OBJ").css("height","100%")
						$("#ODOC_OCX_OBJ").css("display","block")
						}
						}
					if($("#showdiv").length>0){
						if($(".modal").length<=0){
						$("#showdiv").css("display","block")
						}
						}
				});
				
				
				
			},
			"moveModal":function($modal){

				$dialog=$modal.find(".modal-dialog");
				$dialog.on('mousedown', function(e) {
					if(!$(e.target).hasClass("modal-header")&&!$(e.target).hasClass("modal-body")
							&&!$(e.target).hasClass("modal-content")){
						return true;
					}
					var d=document;
					var modal=$dialog[0];
					var page={
							event:function(evt){
								var ev=evt||window.event;
								return ev;
							},
							pageX:function(evt){
								//pageX，pageY获取鼠标的坐标; event.clientX、event.clientY鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条
								//scrollLeft滚动条的水平偏移 clientLeft边框宽度 表示内容区域的左上角相对于整个元素左上角的位置（包括边框）
								var e=this.event(evt);
								return e.pageX||(e.clientX+document.body.scrollLeft-document.body.clientLeft);
								
							},
							pagetY:function(evt){
								var e=this.event(evt);
								return e.pagetY||(e.clientY+document.body.scrollTop-document.body.clientTop);
							},
							layerX:function(evt){
								//IE特有（新版本浏览器 除了ff都支持）,鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域的左上角为参考点,如果有boder,可能出现负值。

								//FF特有,鼠标相比较于当前坐标系的位置,即如果触发元素没有设置绝对定位或相对定位,以页面为参考点,如果有,将改变参考坐标系,从触发元素盒子模型的border区域的左上角为参考点，
								var e=this.event(evt);
								return e.layerX||e.offsetX;
							},
							layerY:function(evt){
								var e=this.event(evt);
								return e.layerY||e.offsetY;
							}
					};
					
					
					var x=page.layerX(e);//layerX，layerY获取鼠标距离div边框的距离。
					var y=page.layerY(e);
					//console.log("获取鼠标的坐标pageX，",page.pageX(e),"",x,"pageY",page.pagetY(e),y);
					//console.log("获取鼠标距离div边框的距离。layerX，",x,"layerY",y);
					if(modal.setCapture){
						modal.setCapture();
					}else if(window.captureEvents){
						window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
					}
					d.onmousemove=function(e1){
                        $dialog.css('top','auto');
                        $dialog.css('left','auto');
						var tx=page.pageX(e1)-x;
						var ty=page.pagetY(e1)-y;
						//console.log("获取鼠标的坐标pageX，",page.pageX(e1),"   ",x,"   ",tx,"pageY",page.pagetY(e1),"   ",y,"   ",ty);
						modal.style.marginLeft=tx+"px";
						modal.style.marginTop=ty+"px";
						
					}
					d.onmouseup=function(e){
						if(modal.releaseCapture){
							modal.releaseCapture();
						}else if(window.releaseEvents){
							window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP)
						}
						d.onmousemove=null;
						d.onmouseup=null;
					}
					
				})
			},
			"updateTopRMsgModal":function(fun){
				$.reference({
					serverName : "/web/notice/getUnreadMessage",
					params : {},
					callback : function(data) {
						if (data) {
							$(".messages i").text("（" + data[0] + "）");
							$(".userMessage li.msg_list").remove();
							var html="";
							var msgdata=data[1];
							html=getUserMsglistHtml(msgdata);
							$(html).insertBefore(".userMessage li.msg_listall");
							if(fun){fun(data);}
						}
					}
				});
				
			}
		});

		 function getUserMsglistHtml(datas){
			var html="";
			if(datas.length>0){

				for(var i=0;i<datas.length&&i<3;i++){
					var data=datas[i];
				//   1 纠错消息2作废申请 3验证消息  4系统消息5发送通知  
					if(data.type==1){
						//+"<span>"+data.sendName+'提出'+'<a href="/topware-govdocsearch/web/search/document?docid='+data.documentGuId+'" docid="'+data.documentGuId+'"  class="btn-link docbtn">《'+data.documentName+'》'+'</a>存在错误：</span>'
						
						html+='<li class="msg_list">	<div class="msg_div">'+
						'<i class="icon icon-usermsg"></i><span>'+data.sendName+'提出'
						+'<a class="btn-link docbtn" href="/topware-govdocsearch/web/search/document?docid='
						+data.documentGuId+'">《'+data.documentName+'》'+'</a>存在错误</span>'
						+'</div></li>';
					}else if(data.type==2){						
						html+='<li class="msg_list">	<div class="msg_div">'+
						'<i class="icon icon-usermsg"></i>'
						+'<span>'+data.sendName+'申请'+'<a href="/topware-govdocsearch/web/search/document?docid='+data.documentGuId+'" docid="'
						+data.documentGuId+'"  class="btn-link docbtn" >《'+data.documentName+'》'+'</a>作废</span>'
						+'</div></li>';
					}else if(data.type==3){
						//好友验证消息
						if(data.isBack==1){
							//发送
							if(data.result==3){
								dh='<span>'+data.sendName+'（'+data.sendTel+'）请求添加您为好友'
								+'&nbsp;&nbsp;附加信息：'+data.content
								+'</span>';								
							}else if(data.result==1){
								dh='<span>'+data.sendName+'（'+data.sendTel+'）请求添加您为好友'
								+'&nbsp;&nbsp;附加信息：'+data.content
								+'&nbsp;&nbsp;已接受</span>';						
							}else if(data.result==0){
								dh='<span>'+data.sendName+'（'+data.sendTel+'）请求添加您为好友'
									+'&nbsp;&nbsp;附加信息：'+data.content
									+'&nbsp;&nbsp;已拒绝</span>';						
							}else{
								
							}
							
						}else{
							//回复
							if(data.result==1){
									dh='<span>'+data.sendName+'（'+data.sendTel+'）接受了您的添加请求并添加您为好友</span>';							
							}else if(data.result==0){
								dh='<span>'+data.sendName+'（'+data.sendTel+'）拒绝了您的添加请求'
								+'&nbsp;&nbsp;附加信息：'+data.content
								+'</span>';
							}else if(data.result==3){
								
							}else{
								
							}
						}
						html+='<li class="msg_list">	<div class="msg_div">'+
						'<i class="icon icon-usermsg"></i>'+dh
						+'</div></li>';
					}else if(data.type==4){
						html+='<li class="msg_list">	<div class="msg_div">'+
						'<i class="icon icon-usermsg"></i><span>'+data.content+'</span>'
						+'</div></li>';	
					}else if(data.type==5){
						//   1 纠错消息2作废申请 3验证消息  4系统消息5发送通知  
						//html+='<span>'+data.sendName+'<a class="btn-link" href="'+data.content+'">'+data.title+'</a></span>'				
						
						html+='<li class="msg_list">	<div class="msg_div">'+
						'<i class="icon icon-usermsg"></i>'
						+'<span>'+data.sendName+'<a class="btn-link" href="'+data.content+'">'+data.title+'</a></span>'						
						+'</div></li>';	
					}else if(d.type==6){
						//彻底删除
						html+='<li class="msg_list">	<div class="msg_div">'+
						'<i class="icon icon-usermsg"></i><span>'+data.sendName+''+data.title+'</span>'
						+'</div></li>';
					}
				}
				
			}else{
				html='<li class="msg_list nodata" ><div>'
					+'<div style=""><span style="background: url("../assets/msg_nodata.png")"></span></div>'
					+'<div>没有新消息</div>'
					+'</div></li>' ;
			}
			return html;
			
		}

		
	
	})($);

	
	(function($, undefined) {
		
		
		
		
	    $.fn.getCursorPosition = function() {
	        var el = $(this).get(0);
	        var pos = 0;
	        if ('selectionStart' in el) {
	            pos = el.selectionStart;
	        } else if ('selection' in document) {
	            el.focus();
	            var Sel = document.selection.createRange();
	            var SelLength = document.selection.createRange().text.length;
	            Sel.moveStart('character', -el.value.length);
	            pos = Sel.text.length - SelLength;
	        }
	        return pos;
	    }
	})(jQuery);
var downPicObj={
				url:null,
				objIframe:null,
				pic:null,
				count:0,
				clear:function(){
					this.url=null;
					this.objIframe=null;
					this.pic=null;
					this.count=0;
					document.all.ieimgdown=null;
				},
				savepic:function(url){					
					 if (document.all.ieimgdown == null) { 
						 downPicObj.count++;
						 if(url){
							 downPicObj.url=url;
						 }						 
						 downPicObj.objIframe = document.createElement("IFRAME"); 
						 document.body.insertBefore(downPicObj.objIframe); 
						 downPicObj.objIframe.outerHTML = "<iframe name='ieimgdown' style='display:none;' src=" + this.url + "></iframe>"; 
						 downPicObj.re = setTimeout("downPicObj.savepic()", 1) 
						 if(downPicObj.count>3){
							 downPicObj.clear();
							 clearTimeout(downPicObj.re) ;
							 
						 }
					} 
					else {						 
						downPicObj.count=0;
						clearTimeout(downPicObj.re) ;
						downPicObj.pic = window.open(this.url, "ieimgdown") 
						downPicObj.pic.document.execCommand("SaveAs") 
						document.all.ieimgdown.removeNode(true) ;
						downPicObj.clear();
					} 
				}
		};
// function getExplorer() {
// var explorer = window.navigator.userAgent ;
// //ie
// if (explorer.indexOf("MSIE") >= 0) {
// alert("ie");
// }
// //firefox
// else if (explorer.indexOf("Firefox") >= 0) {
// alert("Firefox");
// }
// //Chrome
// else if(explorer.indexOf("Chrome") >= 0){
// alert("Chrome");
// }
// //Opera
// else if(explorer.indexOf("Opera") >= 0){
// alert("Opera");
// }
// //Safari
// else if(explorer.indexOf("Safari") >= 0){
// alert("Safari");
// }
// }

// params: width 弹框内容部分包括foot宽度 content；style：弹框中间部分body样式；html:弹窗body部分的html代码
// btns：弹框foot部分按钮布局
// 与样式，其中cls表示css的class，icon表示字体文件的样式，style直接加在按钮上，align按钮位置,click回调按钮点击后的事件，
// 注：commonAlert为bootstrap标准弹窗，可直接使用相关弹窗事件$().modal("hide")，这里对弹窗隐藏做删除dom节点处理
// params.btns=[{text:"新建文件夹",cls:'btn-default',icon:"icon-branchlibrary",style:"",align:"left",
// click:function(e){
// console.log("点击新建文件夹")
// }},{text:'确定',click:function(e){
// console.log("点击确定",e)
// }},{text:'取消',type:'hide',cls:'btn-default'}];
// $.commonAlert(params);
