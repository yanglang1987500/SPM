webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 */
	__webpack_require__(124);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(149);
	window.toastr = __webpack_require__(161);
	__webpack_require__(164);
	__webpack_require__(166);
	var prefix = './modules/';
	var Events = __webpack_require__(9);
	var Router = __webpack_require__(167);
	Router.init();
	__webpack_require__(170);
	var frameBase = __webpack_require__(169);
	var theme,_THEME_KEY_ = '_THEME_KEY';
	 
	if(theme = localStorage.getItem(_THEME_KEY_)){
	    $('#colorMenu>li.'+theme+'').addClass('actived');
	    $('body').addClass(theme);
	}
	Events.subscribe('onSelectMenu',function(moduleId){
	    $('#menu>li').removeClass('actived');
	    if(moduleId.indexOf(prefix)=='-1'){
	        moduleId = prefix + moduleId;
	    }
	    moduleId = moduleId.replace('.','#')
	    $('#menu a').each(function(){
	        var $this = $(this);
	            if($this.attr('href') == (moduleId)){
	                $('#menu li').removeClass('actived');
	                var $li = $this.find('>li');
	                $li.addClass('actived');
	                if($li.hasClass('menu_sub_item')){
	                    setTimeout(function(){
	                        $li.parent().parent().slideDown(200);
	                    },500);
	                }
	                return false;
	            }
	    });
	});

	var init = '#/modules/homepage';
	try{
	    init = location.href.match(/^http:\/\/[^\/]*(?:\:\d{4,5})?\/(#\/modules\/[^?]*)\??.*$/)[1];
	}catch(e){}
	location.href = init;

	/**
	 * 配置toastr通知
	 */
	toastr.options.timeOut = 10000;
	toastr.options.positionClass = 'toast-bottom-right';

	$(function(){
	    $('#colorMenu>li').click(function(){
	        var $this = $(this);
	        var theme = $this.attr('data-value');
	        $('body').removeClass(function(index ,oldClass){return oldClass;}).addClass(theme);
	        $this.parent().find('li').removeClass('actived').end().end().addClass('actived');
	        localStorage.setItem(_THEME_KEY_,theme);
	    });
	    $('#returnBtn').click(function(){
	        window.history.go(-1);
	    }); 
	    $('#nextBtn').click(function(){
	        window.history.go(1);
	    });
	    var showTypes = {
	        1:'Normal',
	        2:'Pop',
	        3:'NoUI'
	    };
	    $('body').on('click','a[data-module]',function(){
	        var module = $(this).attr('data-module');
	        var showType = $(this).attr('data-showtype');
	        $('#menu>li').removeClass('actived');
	        module = module.replace('#','');
	        if(Router.isPermission(module)){
	            if(showType == '2' || showType == '3'){
	                module = '.' + module;
	                Events.notify('onSelectMenu',module).require(module).init({showType:showTypes[showType]});
	            }else{
	                //只有Normal类型的模块需要进行hash定位，弹窗以及无界面模块不需要
	                location.href = '#'+module;
	                return;
	            }
	        }else{
	            frameBase.toast('您没有权限访问此资源');
	        }

	    });

	    Events.subscribe('websocket:message-publish-new',function(data){
	        toastr.info(data.publish_content_pure,data.publish_title);
	    }).subscribe('websocket:report-new',function(data){
	        toastr.info(data.report_content,data.report_title);
	    });
	    $('.menu_item').click(function(e){
	        if($(e.target).hasClass('menu_sub_item'))
	            return;
	        var $this = $(this),$sub = $this.find('.menu_sub');
	        $sub.is(':visible')?($sub.slideUp(200)):($sub.slideDown(200));
	    });
	});



/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;var __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return require(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){var s=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),h=o("./modules/default-params"),b=s(h),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?b["default"][e]:t[e]}var a=arguments[0];if(d.addClass(t.body,"stop-scrolling"),p.resetInput(),a===n)return f.logStr("SweetAlert expects at least 1 attribute!"),!1;var r=f.extend({},b["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return f.logStr('Missing "title" argument!'),!1;r.title=a.title;for(var s in b["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":b["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return f.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}w["default"](r),p.fixVerticalPosition(),p.openModal(arguments[1]);for(var u=p.getModal(),v=u.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return m.handleButton(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<h.length;S++){var x=h[S];v[C][x]=g}p.getOverlay().onclick=g,l=e.onkeydown;var k=function(e){return y["default"](e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");f.extend(b["default"],e)},u.close=c.close=function(){var o=p.getModal();d.fadeOut(p.getOverlay(),5),d.fadeOut(o,5),d.removeClass(o,"showSweetAlert"),d.addClass(o,"hideSweetAlert"),d.removeClass(o,"visible");var a=o.querySelector(".sa-icon.sa-success");d.removeClass(a,"animate"),d.removeClass(a.querySelector(".sa-tip"),"animateSuccessTip"),d.removeClass(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");d.removeClass(r,"animateErrorIcon"),d.removeClass(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return d.removeClass(s,"pulseWarning"),d.removeClass(s.querySelector(".sa-body"),"pulseWarningIns"),d.removeClass(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");d.removeClass(o,e)},300),d.removeClass(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=p.getModal(),n=t.querySelector(".sa-input-error");d.addClass(n,"show");var o=t.querySelector(".sa-error-container");d.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=p.getModal(),n=t.querySelector(".sa-input-error");d.removeClass(n,"show");var o=t.querySelector(".sa-error-container");d.removeClass(o,"show")},u.disableButtons=c.disableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},u.enableButtons=c.enableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:f.logStr("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var b=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":b.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},b=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=b},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},b=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=b,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],b=y[1];h&&b?(m=h,v=b):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]), true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return sweetAlert}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);

/***/ },
/* 147 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 148 */,
/* 149 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Toastr
	 * Copyright 2012-2015
	 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
	 * All Rights Reserved.
	 * Use, reproduction, distribution, and modification of this code is subject to the terms and
	 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
	 *
	 * ARIA Support: Greta Krafsig
	 *
	 * Project: https://github.com/CodeSeven/toastr
	 */
	/* global define */
	(function (define) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(162)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
	        return (function () {
	            var $container;
	            var listener;
	            var toastId = 0;
	            var toastType = {
	                error: 'error',
	                info: 'info',
	                success: 'success',
	                warning: 'warning'
	            };

	            var toastr = {
	                clear: clear,
	                remove: remove,
	                error: error,
	                getContainer: getContainer,
	                info: info,
	                options: {},
	                subscribe: subscribe,
	                success: success,
	                version: '2.1.3',
	                warning: warning
	            };

	            var previousToast;

	            return toastr;

	            ////////////////

	            function error(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.error,
	                    iconClass: getOptions().iconClasses.error,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function getContainer(options, create) {
	                if (!options) { options = getOptions(); }
	                $container = $('#' + options.containerId);
	                if ($container.length) {
	                    return $container;
	                }
	                if (create) {
	                    $container = createContainer(options);
	                }
	                return $container;
	            }

	            function info(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.info,
	                    iconClass: getOptions().iconClasses.info,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function subscribe(callback) {
	                listener = callback;
	            }

	            function success(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.success,
	                    iconClass: getOptions().iconClasses.success,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function warning(message, title, optionsOverride) {
	                return notify({
	                    type: toastType.warning,
	                    iconClass: getOptions().iconClasses.warning,
	                    message: message,
	                    optionsOverride: optionsOverride,
	                    title: title
	                });
	            }

	            function clear($toastElement, clearOptions) {
	                var options = getOptions();
	                if (!$container) { getContainer(options); }
	                if (!clearToast($toastElement, options, clearOptions)) {
	                    clearContainer(options);
	                }
	            }

	            function remove($toastElement) {
	                var options = getOptions();
	                if (!$container) { getContainer(options); }
	                if ($toastElement && $(':focus', $toastElement).length === 0) {
	                    removeToast($toastElement);
	                    return;
	                }
	                if ($container.children().length) {
	                    $container.remove();
	                }
	            }

	            // internal functions

	            function clearContainer (options) {
	                var toastsToClear = $container.children();
	                for (var i = toastsToClear.length - 1; i >= 0; i--) {
	                    clearToast($(toastsToClear[i]), options);
	                }
	            }

	            function clearToast ($toastElement, options, clearOptions) {
	                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
	                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
	                    $toastElement[options.hideMethod]({
	                        duration: options.hideDuration,
	                        easing: options.hideEasing,
	                        complete: function () { removeToast($toastElement); }
	                    });
	                    return true;
	                }
	                return false;
	            }

	            function createContainer(options) {
	                $container = $('<div/>')
	                    .attr('id', options.containerId)
	                    .addClass(options.positionClass);

	                $container.appendTo($(options.target));
	                return $container;
	            }

	            function getDefaults() {
	                return {
	                    tapToDismiss: true,
	                    toastClass: 'toast',
	                    containerId: 'toast-container',
	                    debug: false,

	                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
	                    showDuration: 300,
	                    showEasing: 'swing', //swing and linear are built into jQuery
	                    onShown: undefined,
	                    hideMethod: 'fadeOut',
	                    hideDuration: 1000,
	                    hideEasing: 'swing',
	                    onHidden: undefined,
	                    closeMethod: false,
	                    closeDuration: false,
	                    closeEasing: false,
	                    closeOnHover: true,

	                    extendedTimeOut: 1000,
	                    iconClasses: {
	                        error: 'toast-error',
	                        info: 'toast-info',
	                        success: 'toast-success',
	                        warning: 'toast-warning'
	                    },
	                    iconClass: 'toast-info',
	                    positionClass: 'toast-top-right',
	                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
	                    titleClass: 'toast-title',
	                    messageClass: 'toast-message',
	                    escapeHtml: false,
	                    target: 'body',
	                    closeHtml: '<button type="button">&times;</button>',
	                    closeClass: 'toast-close-button',
	                    newestOnTop: true,
	                    preventDuplicates: false,
	                    progressBar: false,
	                    progressClass: 'toast-progress',
	                    rtl: false
	                };
	            }

	            function publish(args) {
	                if (!listener) { return; }
	                listener(args);
	            }

	            function notify(map) {
	                var options = getOptions();
	                var iconClass = map.iconClass || options.iconClass;

	                if (typeof (map.optionsOverride) !== 'undefined') {
	                    options = $.extend(options, map.optionsOverride);
	                    iconClass = map.optionsOverride.iconClass || iconClass;
	                }

	                if (shouldExit(options, map)) { return; }

	                toastId++;

	                $container = getContainer(options, true);

	                var intervalId = null;
	                var $toastElement = $('<div/>');
	                var $titleElement = $('<div/>');
	                var $messageElement = $('<div/>');
	                var $progressElement = $('<div/>');
	                var $closeElement = $(options.closeHtml);
	                var progressBar = {
	                    intervalId: null,
	                    hideEta: null,
	                    maxHideTime: null
	                };
	                var response = {
	                    toastId: toastId,
	                    state: 'visible',
	                    startTime: new Date(),
	                    options: options,
	                    map: map
	                };

	                personalizeToast();

	                displayToast();

	                handleEvents();

	                publish(response);

	                if (options.debug && console) {
	                    console.log(response);
	                }

	                return $toastElement;

	                function escapeHtml(source) {
	                    if (source == null) {
	                        source = '';
	                    }

	                    return source
	                        .replace(/&/g, '&amp;')
	                        .replace(/"/g, '&quot;')
	                        .replace(/'/g, '&#39;')
	                        .replace(/</g, '&lt;')
	                        .replace(/>/g, '&gt;');
	                }

	                function personalizeToast() {
	                    setIcon();
	                    setTitle();
	                    setMessage();
	                    setCloseButton();
	                    setProgressBar();
	                    setRTL();
	                    setSequence();
	                    setAria();
	                }

	                function setAria() {
	                    var ariaValue = '';
	                    switch (map.iconClass) {
	                        case 'toast-success':
	                        case 'toast-info':
	                            ariaValue =  'polite';
	                            break;
	                        default:
	                            ariaValue = 'assertive';
	                    }
	                    $toastElement.attr('aria-live', ariaValue);
	                }

	                function handleEvents() {
	                    if (options.closeOnHover) {
	                        $toastElement.hover(stickAround, delayedHideToast);
	                    }

	                    if (!options.onclick && options.tapToDismiss) {
	                        $toastElement.click(hideToast);
	                    }

	                    if (options.closeButton && $closeElement) {
	                        $closeElement.click(function (event) {
	                            if (event.stopPropagation) {
	                                event.stopPropagation();
	                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
	                                event.cancelBubble = true;
	                            }

	                            if (options.onCloseClick) {
	                                options.onCloseClick(event);
	                            }

	                            hideToast(true);
	                        });
	                    }

	                    if (options.onclick) {
	                        $toastElement.click(function (event) {
	                            options.onclick(event);
	                            hideToast();
	                        });
	                    }
	                }

	                function displayToast() {
	                    $toastElement.hide();

	                    $toastElement[options.showMethod](
	                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
	                    );

	                    if (options.timeOut > 0) {
	                        intervalId = setTimeout(hideToast, options.timeOut);
	                        progressBar.maxHideTime = parseFloat(options.timeOut);
	                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                        if (options.progressBar) {
	                            progressBar.intervalId = setInterval(updateProgress, 10);
	                        }
	                    }
	                }

	                function setIcon() {
	                    if (map.iconClass) {
	                        $toastElement.addClass(options.toastClass).addClass(iconClass);
	                    }
	                }

	                function setSequence() {
	                    if (options.newestOnTop) {
	                        $container.prepend($toastElement);
	                    } else {
	                        $container.append($toastElement);
	                    }
	                }

	                function setTitle() {
	                    if (map.title) {
	                        var suffix = map.title;
	                        if (options.escapeHtml) {
	                            suffix = escapeHtml(map.title);
	                        }
	                        $titleElement.append(suffix).addClass(options.titleClass);
	                        $toastElement.append($titleElement);
	                    }
	                }

	                function setMessage() {
	                    if (map.message) {
	                        var suffix = map.message;
	                        if (options.escapeHtml) {
	                            suffix = escapeHtml(map.message);
	                        }
	                        $messageElement.append(suffix).addClass(options.messageClass);
	                        $toastElement.append($messageElement);
	                    }
	                }

	                function setCloseButton() {
	                    if (options.closeButton) {
	                        $closeElement.addClass(options.closeClass).attr('role', 'button');
	                        $toastElement.prepend($closeElement);
	                    }
	                }

	                function setProgressBar() {
	                    if (options.progressBar) {
	                        $progressElement.addClass(options.progressClass);
	                        $toastElement.prepend($progressElement);
	                    }
	                }

	                function setRTL() {
	                    if (options.rtl) {
	                        $toastElement.addClass('rtl');
	                    }
	                }

	                function shouldExit(options, map) {
	                    if (options.preventDuplicates) {
	                        if (map.message === previousToast) {
	                            return true;
	                        } else {
	                            previousToast = map.message;
	                        }
	                    }
	                    return false;
	                }

	                function hideToast(override) {
	                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
	                    var duration = override && options.closeDuration !== false ?
	                        options.closeDuration : options.hideDuration;
	                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
	                    if ($(':focus', $toastElement).length && !override) {
	                        return;
	                    }
	                    clearTimeout(progressBar.intervalId);
	                    return $toastElement[method]({
	                        duration: duration,
	                        easing: easing,
	                        complete: function () {
	                            removeToast($toastElement);
	                            clearTimeout(intervalId);
	                            if (options.onHidden && response.state !== 'hidden') {
	                                options.onHidden();
	                            }
	                            response.state = 'hidden';
	                            response.endTime = new Date();
	                            publish(response);
	                        }
	                    });
	                }

	                function delayedHideToast() {
	                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
	                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
	                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
	                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                    }
	                }

	                function stickAround() {
	                    clearTimeout(intervalId);
	                    progressBar.hideEta = 0;
	                    $toastElement.stop(true, true)[options.showMethod](
	                        {duration: options.showDuration, easing: options.showEasing}
	                    );
	                }

	                function updateProgress() {
	                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
	                    $progressElement.width(percentage + '%');
	                }
	            }

	            function getOptions() {
	                return $.extend({}, getDefaults(), toastr.options);
	            }

	            function removeToast($toastElement) {
	                if (!$container) { $container = getContainer(); }
	                if ($toastElement.is(':visible')) {
	                    return;
	                }
	                $toastElement.remove();
	                $toastElement = null;
	                if ($container.children().length === 0) {
	                    $container.remove();
	                    previousToast = undefined;
	                }
	            }

	        })();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(163)));


/***/ },
/* 162 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 163 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 164 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 165 */,
/* 166 */
/***/ function(module, exports) {

	/**
	 * 通过正则表达式获取url参数
	 * 支持锚点#与自定义参数分割形式
	 */

	$.getUrlParamArray = function(external,split){
	    var reg = /^.*\?{1}(.*)/;
	    var result = [];
	    var href = window.location.href;
	    var url = decodeURI(href);
	    var param = reg.exec(url);
	    if(param == null || param.length == 1 || param[1] == '')
	        return result;
	    var reg2 = /(?:([^&#]*?)=([^&#]*))[&#]?/g;
	    //  匹配前面参数
	    param[1].replace(reg2,function(a,b,c){
	        analyseParam(b,c);
	    });
	    /*var reg3 = /[&#](?:([^&#]*?)=([^&#]*))$/g;
	     //   匹配最末尾参数
	     param[1].replace(reg3,function(a,b,c){
	     analyseParam(b,c);
	     });*/

	    function analyseParam(key,value){
	        if(/=/.test(value) && external){
	            var reg4 = new RegExp('(?:([^'+split+']*?)=([^'+split+']*))'+split+'','g');
	            var sub = [];
	            value.replace(reg4,function(a,b,c){
	                sub.push({key:b,value:c,type:'string'});
	            });
	            var reg5 = new RegExp(''+split+'(?:([^'+split+']*?)=([^'+split+']*))$','g');
	            value.replace(reg5,function(a,b,c){
	                sub.push({key:b,value:c,type:'string'});
	            });
	            result.push({
	                key:key,
	                type:'object',
	                value:sub
	            });
	        }else{
	            result.push({
	                key:key,
	                type:'string',
	                value:value
	            });
	        }
	    }
	    return result;
	};

	$.getUrlParamObject = function(){
	    var reg = /^.*\?{1}(.*)/;
	    var result = [];
	    var href = window.location.href;
	    var url = decodeURI(href);
	    var param = reg.exec(url);
	    if(param == null || param.length == 1 || param[1] == '')
	        return result;
	    var reg2 = /(?:([^&#]*?)=([^&#]*))[&#]?/g;
	    //  匹配前面参数
	    param[1].replace(reg2,function(a,b,c){
	        analyseParam(b,c);
	    });
	    /*var reg3 = /[&#](?:([^&#]*?)=([^&#]*))$/g;
	     //   匹配最末尾参数
	     param[1].replace(reg3,function(a,b,c){
	     analyseParam(b,c);
	     });*/

	    function analyseParam(key,value){
	        result[key] = value;
	    }
	    return result;
	};

	/**
	 * 获取当前域名
	 * @method getDomain
	 * return {String} 域名
	 */
	$.getDomain = function(){
	    var url = window.location.href;
	    var url = decodeURI(url);
	    var arr = url.match(/^(http[s]?:\/\/[^\/]*)\/.*$/);
	    return arr[1];
	};

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 路由控制<br>
	 * @author yanglang
	 * @version 1.0
	 * @module historycontrol-base
	 */

	var Router = __webpack_require__(168).Router;
	var Events = __webpack_require__(9);
	var frameworkBase = __webpack_require__(169);


	function load(_module,showType){
	    _module = '.'+_module;
	    Events.notify('onSelectMenu',_module).require(_module).init({from:'click',showType:showType == 2?'Pop':'Normal'});
	}
	var auth_menus = [],router;

	module.exports = {
	    init:function(){
	        frameworkBase.query('/auth/menu/list',function(data){
	            if(!data.success){
	                frameworkBase.toast(data.message);
	                return;
	            }
	            var routes = {},menuList = data.data;
	            for(var i = 0,len = menuList.length;i<len;i++){
	                routes[menuList[i]['menu_url']] = load.bind(null,menuList[i]['menu_url'],menuList[i]['show_type']);
	                auth_menus.push(menuList[i]['menu_url'])
	            }

	            router = Router(routes);
	            router.init();
	        });
	    },
	    isPermission:function(url){
	        var flag = false;
	        auth_menus.forEach(function(item){
	            if(item == url){
	                flag = true;
	                return false;
	            }
	        });
	        return flag;
	    }
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	

	//
	// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
	// Version 1.2.6
	//
	(function(a){function k(a,b,c,d){var e=0,f=0,g=0,c=(c||"(").toString(),d=(d||")").toString(),h;for(h=0;h<a.length;h++){var i=a[h];if(i.indexOf(c,e)>i.indexOf(d,e)||~i.indexOf(c,e)&&!~i.indexOf(d,e)||!~i.indexOf(c,e)&&~i.indexOf(d,e)){f=i.indexOf(c,e),g=i.indexOf(d,e);if(~f&&!~g||!~f&&~g){var j=a.slice(0,(h||1)+1).join(b);a=[j].concat(a.slice((h||1)+1))}e=(g>f?g:f)+1,h=0}else e=0}return a}function j(a,b){var c,d=0,e="";while(c=a.substr(d).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/))d=c.index+c[0].length,c[0]=c[0].replace(/^\*/,"([_.()!\\ %@&a-zA-Z0-9-]+)"),e+=a.substr(0,c.index)+c[0];a=e+=a.substr(d);var f=a.match(/:([^\/]+)/ig),g,h;if(f){h=f.length;for(var j=0;j<h;j++)g=f[j],g.slice(0,2)==="::"?a=g.slice(1):a=a.replace(g,i(g,b))}return a}function i(a,b,c){c=a;for(var d in b)if(b.hasOwnProperty(d)){c=b[d](a);if(c!==a)break}return c===a?"([._a-zA-Z0-9-%()]+)":c}function h(a,b,c){if(!a.length)return c();var d=0;(function e(){b(a[d],function(b){b||b===!1?(c(b),c=function(){}):(d+=1,d===a.length?c():e())})})()}function g(a){var b=[];for(var c=0,d=a.length;c<d;c++)b=b.concat(a[c]);return b}function f(a,b){for(var c=0;c<a.length;c+=1)if(b(a[c],c,a)===!1)return}function c(){return b.hash===""||b.hash==="#"}var b=document.location,d={mode:"modern",hash:b.hash,history:!1,check:function(){var a=b.hash;a!=this.hash&&(this.hash=a,this.onHashChanged())},fire:function(){this.mode==="modern"?this.history===!0?window.onpopstate():window.onhashchange():this.onHashChanged()},init:function(a,b){function d(a){for(var b=0,c=e.listeners.length;b<c;b++)e.listeners[b](a)}var c=this;this.history=b,e.listeners||(e.listeners=[]);if("onhashchange"in window&&(document.documentMode===undefined||document.documentMode>7))this.history===!0?setTimeout(function(){window.onpopstate=d},500):window.onhashchange=d,this.mode="modern";else{var f=document.createElement("iframe");f.id="state-frame",f.style.display="none",document.body.appendChild(f),this.writeFrame(""),"onpropertychange"in document&&"attachEvent"in document&&document.attachEvent("onpropertychange",function(){event.propertyName==="location"&&c.check()}),window.setInterval(function(){c.check()},50),this.onHashChanged=d,this.mode="legacy"}e.listeners.push(a);return this.mode},destroy:function(a){if(!!e&&!!e.listeners){var b=e.listeners;for(var c=b.length-1;c>=0;c--)b[c]===a&&b.splice(c,1)}},setHash:function(a){this.mode==="legacy"&&this.writeFrame(a),this.history===!0?(window.history.pushState({},document.title,a),this.fire()):b.hash=a[0]==="/"?a:"/"+a;return this},writeFrame:function(a){var b=document.getElementById("state-frame"),c=b.contentDocument||b.contentWindow.document;c.open(),c.write("<script>_hash = '"+a+"'; onload = parent.listener.syncHash;<script>"),c.close()},syncHash:function(){var a=this._hash;a!=b.hash&&(b.hash=a);return this},onHashChanged:function(){}},e=a.Router=function(a){if(this instanceof e)this.params={},this.routes={},this.methods=["on","once","after","before"],this.scope=[],this._methods={},this._insert=this.insert,this.insert=this.insertEx,this.historySupport=(window.history!=null?window.history.pushState:null)!=null,this.configure(),this.mount(a||{});else return new e(a)};e.prototype.init=function(a){var e=this,f;this.handler=function(a){var b=a&&a.newURL||window.location.hash,c=e.history===!0?e.getPath():b.replace(/.*#/,"");e.dispatch("on",c.charAt(0)==="/"?c:"/"+c)},d.init(this.handler,this.history),this.history===!1?c()&&a?b.hash=a:c()||e.dispatch("on","/"+b.hash.replace(/^(#\/|#|\/)/,"")):(this.convert_hash_in_init?(f=c()&&a?a:c()?null:b.hash.replace(/^#/,""),f&&window.history.replaceState({},document.title,f)):f=this.getPath(),(f||this.run_in_init===!0)&&this.handler());return this},e.prototype.explode=function(){var a=this.history===!0?this.getPath():b.hash;a.charAt(1)==="/"&&(a=a.slice(1));return a.slice(1,a.length).split("/")},e.prototype.setRoute=function(a,b,c){var e=this.explode();typeof a=="number"&&typeof b=="string"?e[a]=b:typeof c=="string"?e.splice(a,b,s):e=[a],d.setHash(e.join("/"));return e},e.prototype.insertEx=function(a,b,c,d){a==="once"&&(a="on",c=function(a){var b=!1;return function(){if(!b){b=!0;return a.apply(this,arguments)}}}(c));return this._insert(a,b,c,d)},e.prototype.getRoute=function(a){var b=a;if(typeof a=="number")b=this.explode()[a];else if(typeof a=="string"){var c=this.explode();b=c.indexOf(a)}else b=this.explode();return b},e.prototype.destroy=function(){d.destroy(this.handler);return this},e.prototype.getPath=function(){var a=window.location.pathname;a.substr(0,1)!=="/"&&(a="/"+a);return a};var l=/\?.*/;e.prototype.configure=function(a){a=a||{};for(var b=0;b<this.methods.length;b++)this._methods[this.methods[b]]=!0;this.recurse=a.recurse||this.recurse||!1,this.async=a.async||!1,this.delimiter=a.delimiter||"/",this.strict=typeof a.strict=="undefined"?!0:a.strict,this.notfound=a.notfound,this.resource=a.resource,this.history=a.html5history&&this.historySupport||!1,this.run_in_init=this.history===!0&&a.run_handler_in_init!==!1,this.convert_hash_in_init=this.history===!0&&a.convert_hash_in_init!==!1,this.every={after:a.after||null,before:a.before||null,on:a.on||null};return this},e.prototype.param=function(a,b){a[0]!==":"&&(a=":"+a);var c=new RegExp(a,"g");this.params[a]=function(a){return a.replace(c,b.source||b)};return this},e.prototype.on=e.prototype.route=function(a,b,c){var d=this;!c&&typeof b=="function"&&(c=b,b=a,a="on");if(Array.isArray(b))return b.forEach(function(b){d.on(a,b,c)});b.source&&(b=b.source.replace(/\\\//ig,"/"));if(Array.isArray(a))return a.forEach(function(a){d.on(a.toLowerCase(),b,c)});b=b.split(new RegExp(this.delimiter)),b=k(b,this.delimiter),this.insert(a,this.scope.concat(b),c)},e.prototype.path=function(a,b){var c=this,d=this.scope.length;a.source&&(a=a.source.replace(/\\\//ig,"/")),a=a.split(new RegExp(this.delimiter)),a=k(a,this.delimiter),this.scope=this.scope.concat(a),b.call(this,this),this.scope.splice(d,a.length)},e.prototype.dispatch=function(a,b,c){function h(){d.last=e.after,d.invoke(d.runlist(e),d,c)}var d=this,e=this.traverse(a,b.replace(l,""),this.routes,""),f=this._invoked,g;this._invoked=!0;if(!e||e.length===0){this.last=[],typeof this.notfound=="function"&&this.invoke([this.notfound],{method:a,path:b},c);return!1}this.recurse==="forward"&&(e=e.reverse()),g=this.every&&this.every.after?[this.every.after].concat(this.last):[this.last];if(g&&g.length>0&&f){this.async?this.invoke(g,this,h):(this.invoke(g,this),h());return!0}h();return!0},e.prototype.invoke=function(a,b,c){var d=this,e;this.async?(e=function(c,d){if(Array.isArray(c))return h(c,e,d);typeof c=="function"&&c.apply(b,(a.captures||[]).concat(d))},h(a,e,function(){c&&c.apply(b,arguments)})):(e=function(c){if(Array.isArray(c))return f(c,e);if(typeof c=="function")return c.apply(b,a.captures||[]);typeof c=="string"&&d.resource&&d.resource[c].apply(b,a.captures||[])},f(a,e))},e.prototype.traverse=function(a,b,c,d,e){function l(a){function c(a){for(var b=a.length-1;b>=0;b--)Array.isArray(a[b])?(c(a[b]),a[b].length===0&&a.splice(b,1)):e(a[b])||a.splice(b,1)}function b(a){var c=[];for(var d=0;d<a.length;d++)c[d]=Array.isArray(a[d])?b(a[d]):a[d];return c}if(!e)return a;var d=b(a);d.matched=a.matched,d.captures=a.captures,d.after=a.after.filter(e),c(d);return d}var f=[],g,h,i,j,k;if(b===this.delimiter&&c[a]){j=[[c.before,c[a]].filter(Boolean)],j.after=[c.after].filter(Boolean),j.matched=!0,j.captures=[];return l(j)}for(var m in c)if(c.hasOwnProperty(m)&&(!this._methods[m]||this._methods[m]&&typeof c[m]=="object"&&!Array.isArray(c[m]))){g=h=d+this.delimiter+m,this.strict||(h+="["+this.delimiter+"]?"),i=b.match(new RegExp("^"+h));if(!i)continue;if(i[0]&&i[0]==b&&c[m][a]){j=[[c[m].before,c[m][a]].filter(Boolean)],j.after=[c[m].after].filter(Boolean),j.matched=!0,j.captures=i.slice(1),this.recurse&&c===this.routes&&(j.push([c.before,c.on].filter(Boolean)),j.after=j.after.concat([c.after].filter(Boolean)));return l(j)}j=this.traverse(a,b,c[m],g);if(j.matched){j.length>0&&(f=f.concat(j)),this.recurse&&(f.push([c[m].before,c[m].on].filter(Boolean)),j.after=j.after.concat([c[m].after].filter(Boolean)),c===this.routes&&(f.push([c.before,c.on].filter(Boolean)),j.after=j.after.concat([c.after].filter(Boolean)))),f.matched=!0,f.captures=j.captures,f.after=j.after;return l(f)}}return!1},e.prototype.insert=function(a,b,c,d){var e,f,g,h,i;b=b.filter(function(a){return a&&a.length>0}),d=d||this.routes,i=b.shift(),/\:|\*/.test(i)&&!/\\d|\\w/.test(i)&&(i=j(i,this.params));if(b.length>0){d[i]=d[i]||{};return this.insert(a,b,c,d[i])}{if(!!i||!!b.length||d!==this.routes){f=typeof d[i],g=Array.isArray(d[i]);if(d[i]&&!g&&f=="object"){e=typeof d[i][a];switch(e){case"function":d[i][a]=[d[i][a],c];return;case"object":d[i][a].push(c);return;case"undefined":d[i][a]=c;return}}else if(f=="undefined"){h={},h[a]=c,d[i]=h;return}throw new Error("Invalid route context: "+f)}e=typeof d[a];switch(e){case"function":d[a]=[d[a],c];return;case"object":d[a].push(c);return;case"undefined":d[a]=c;return}}},e.prototype.extend=function(a){function e(a){b._methods[a]=!0,b[a]=function(){var c=arguments.length===1?[a,""]:[a];b.on.apply(b,c.concat(Array.prototype.slice.call(arguments)))}}var b=this,c=a.length,d;for(d=0;d<c;d++)e(a[d])},e.prototype.runlist=function(a){var b=this.every&&this.every.before?[this.every.before].concat(g(a)):g(a);this.every&&this.every.on&&b.push(this.every.on),b.captures=a.captures,b.source=a.source;return b},e.prototype.mount=function(a,b){function d(b,d){var e=b,f=b.split(c.delimiter),g=typeof a[b],h=f[0]===""||!c._methods[f[0]],i=h?"on":e;h&&(e=e.slice((e.match(new RegExp("^"+c.delimiter))||[""])[0].length),f.shift());h&&g==="object"&&!Array.isArray(a[b])?(d=d.concat(f),c.mount(a[b],d)):(h&&(d=d.concat(e.split(c.delimiter)),d=k(d,c.delimiter)),c.insert(i,d,a[b]))}if(!!a&&typeof a=="object"&&!Array.isArray(a)){var c=this;b=b||[],Array.isArray(b)||(b=b.split(c.delimiter));for(var e in a)a.hasOwnProperty(e)&&d(e,b.slice(0))}}})( true?exports:window)

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 框架基类模块<br>
	 * 提供一些基础的公共方法<br>
	 * 所有模块都应继承自它<br>
	 * @author yanglang
	 * @version 1.0
	 * @module framework-base
	 */

	__webpack_require__(166);
	var Events = __webpack_require__(9);


	/**
	 * 当前模块对象
	 * @private
	 * @property {Framework} _currentModel
	 */
	var _currentModel = null;

	var _fragmentCache = {};

	/**
	 * websocket
	 */
	var _websocket = null;
	var EVENT_LISTEN_PREFIX = 'LISTENEVENT';

	/**
	 * 父模块列表
	 */
	var parentModels = [];
	parentModels.hasModel = function (model) {
	    var has = false;
	    for (var i = 0; i < this.length; i++) {
	        if (this[i] === model) {
	            has = true;
	            break;
	        }
	    }
	    return has;
	};

	/**
	 * 当前模块的上一个模块
	 * 用于记录Pop类型的模块的上一个模块，用以还原currentModule的值
	 * @type {null}
	 * @private
	 */
	var _prevModule = null;


	/**
	 * 框架基类模块<br>
	 * 提供一些基础的公共方法<br>
	 * 所有模块都应继承自它<br>
	 * 此基础模块将会接管所有子模块的展现工作<br>
	 * 只需设置showType类型，就可以多种形态进行展现<br>
	 * 目前支持弹窗与账户中心嵌入两种形式，日后有需要可以随时增加<br>
	 * 此套架构的优点在于：解耦目前所有模块，功能上各模块互相提供API接口进行调用，各模块API由各自统一进行维护。<br>
	 * 此外，由于采用AMD模式架构，所以理论上支持无限量模块数目进行加载，浏览器的加载速度仍然飞快，扩展性非常好。<br>
	 * @version 1.0
	 * @author 杨浪
	 * @class Framework
	 * @constructor
	 *
	 */
	var Framework = function () {
	    this.baseTitle = window.document.title;
	};


	Framework.prototype = {
	    /**
	     *
	     * !!== 定义规范 ==!!，<br>
	     * 必须实现此方法作为入口，<br>
	     * @method init
	     * @param {Object} options 初始参数(对象)
	     *
	     */
	    init: function (options) {
	        //初始化
	        options = $.extend({},options);
	        var _current = this.getCurrent();
	        _current && (options.showType != 'Pop') && (!_current.finished) && _current.finish();
	        _prevModule = _current;
	        this.setCurrent();
	        //由框架设置展现形式
	        this.setShowType($.extend({}, options).showType);
	        this.finished = false;
	        Events.notifyWith('init',this, options);

	    },
	    /**
	     * 对Framework框架进行扩展
	     * @method extend 扩展模块
	     * @param model 模块id 或 id列表
	     * @param callback 回调方法
	     */
	    extend: function (model) {
	        var that = this;
	        var models = [];
	        if (!$.isArray(model))
	            models.push(model);
	        else
	            models = model;

	        for(var i = 0;i<models.length;i++){
	            if (!parentModels.hasModel(models[i])) {
	                parentModels.push(models[i]);
	            }
	        }
	    },
	    /**
	     * 移除扩展
	     * @method excludeExtension
	     * @param modelId 扩展id
	     */
	    excludeExtension: function (modelId) {
	        var that = this;
	        for (var i = 0; i < parentModels.length; i++) {
	            if (parentModels[i].id == modelId) {
	                parentModels.removeAt(i);
	                i--;
	            }
	        }
	    },
	    /**
	     * 批量移除扩展
	     * @method excludeExtensions
	     * @param modelIds 扩展id列表
	     */
	    excludeExtensions: function (modelIds) {
	        for (var i = 0; i < modelIds.length; i++) {
	            this.excludeExtension(modelIds[i]);
	        }
	    },
	    /**
	     * 执行扩展模块的接口方法
	     * @method _callExtendInterface
	     * @param funName 接口方法名
	     * @param param 可选参数
	     */
	    _callExtendInterface: function (funName, param) {
	        if (!parentModels)
	            return;
	        for (var i = 0; i < parentModels.length; i++) {
	            if (parentModels[i][funName] && $.isFunction(parentModels[i][funName]))
	                parentModels[i][funName].call(this, param);
	        }
	    },
	    /**
	     * 当前模块被切换掉时，模块可以选择拒绝，
	     * 默认同意<br>
	     * 这是一个预留接口<br>
	     * 有相应需求的模块实现此方法即可。<br>
	     * 目前只针对账户中心实现了这个接口的判断，以供左侧菜单使用<br>
	     * @method onClose
	     * @param {Function} callback 回调方法 同样返回true或false
	     * @param {Boolean} isSame 是否仍然是同一个模块进行刷新操作
	     * @return {Boolean} true同意 false拒绝
	     */
	    onClose: function (callback, isSame) {
	        return true;
	    },
	    /**
	     * 设置应用标题
	     * @method setBaseTitle
	     * @chainable
	     * @param {String} baseTitle 标题
	     * @return {Framework} self
	     */
	    setBaseTitle: function (baseTitle) {
	        this.baseTitle = baseTitle;
	        return this;
	    },
	    /**
	     * 获取应用标题
	     * @method getBaseTitle
	     * @chainable
	     * @return {String} baseTitle 标题
	     */
	    getBaseTitle: function () {
	        return this.baseTitle ? this.baseTitle : '未知标题';
	    },
	    /**
	     * 设置标题（仅弹窗时用）
	     * @method setTitle
	     * @chainable
	     * @param {String} title 标题
	     * @return {Framework} self
	     */
	    setTitle: function (title) {
	        this.title = title;
	        return this;
	    },
	    /**
	     * 获取标题（仅弹窗时用）
	     * @method getTitle
	     * @chainable
	     * @return {String} title 标题
	     */
	    getTitle: function () {
	        return this.title ? this.title : '未知标题';
	    },
	    /**
	     * 设置对话框宽度（仅弹窗时用）
	     * @method setWidth
	     * @chainable
	     * @param {Number} width 弹窗宽度
	     * @return {Framework} self
	     */
	    setWidth: function (width) {
	        this.width = width;
	        return this;
	    },
	    /**
	     * 获取对话框宽度（仅弹窗时用）
	     * @method getWidth
	     * @chainable
	     * @return {Number} width 弹窗宽度
	     */
	    getWidth: function () {
	        return this.width ? this.width : 400;
	    },
	    /**
	     * 设置对话框高度（仅弹窗时用）
	     * @method setHeight
	     * @chainable
	     * @param {Number} height 弹窗高度
	     * @return {Framework} self
	     */
	    setHeight: function (height) {
	        this.height = height;
	        return this;
	    },
	    /**
	     * 获取对话框高度（仅弹窗时用）
	     * @method getHeight
	     * @chainable
	     * @return {Number} height 弹窗高度
	     */
	    getHeight: function () {
	        return this.height ? this.height : 400;
	    },
	    /**
	     * 设置是否需要标题栏（仅弹窗时用）
	     * @method setNeedtitle
	     * @chainable
	     * @param {Boolean} flag 弹窗是否需要显示标题
	     * @return {Framework} self
	     */
	    setNeedtitle: function (flag) {
	        this.needtitle = flag !== undefined ? flag : true;
	        return this;
	    },
	    /**
	     * 是否需要标题栏（仅弹窗时用）
	     * @method isNeedtitle
	     * @chainable
	     * @return {Boolean}
	     */
	    isNeedtitle: function () {
	        //默认有标题栏
	        return this.needtitle === undefined ? true : this.needtitle;
	    },
	    /**
	     * 设置展现形式
	     * @method setShowType
	     * @chainable
	     * @param {String} type 模块展现形式
	     * 'Normal' 账户中心mainview模式<br>
	     * 'Pop' 弹出框模式<br>
	     * 'Container' 自定义容器嵌入模式<br>
	     * @returns {Framework} self
	     */
	    setShowType: function (type) {
	        this.showType = (type ? type : 'Normal');
	        return this;
	    },
	    /**
	     * 获取展现形式<br>
	     * 默认为Normal 账户中心的形式进行展现
	     * @method getShowType
	     * @chainable
	     * @return {String} showType 模块展现形式
	     */
	    getShowType: function () {
	        return this.showType === undefined ? 'Normal' : this.showType;
	    },
	    /**
	     * 获取显示区域容器对象
	     * @method getContainer
	     * @return {Dom} dom容器对象
	     */
	    getContainer: function () {
	        return this.dom;
	    },
	    /**
	     * 加载页面片段
	     * @param url
	     * @param callback
	     */
	    loadFragment:function(url,callback){
	        var $def = $.Deferred();
	        if(_fragmentCache[url]){
	            setTimeout(function(){
	                callback&&callback(_fragmentCache[url]);
	                $def.resolve(_fragmentCache[url]);
	            });
	        }else{
	            url += (/\?/g.test(url)?'&':'?')+(new Date().getTime());
	            $.get(url,function(data){
	                if(!_fragmentCache[url])
	                    _fragmentCache[url] = data;
	                callback&&callback(data);
	                $def.resolve(data);
	            });
	        }
	        return $def.promise();
	    },
	    /**
	     * get查询，异步执行，<br>
	     * 返回json。<br>
	     * @method query
	     * @async
	     * @param {String} url 查询地址
	     * @param _param 参数对象 可选
	     * @param {Function} _callback 回调方法 可选
	     */
	    query: function (url, _param, _callback) {
	        var that = this, aLen = arguments.length, callback, param;
	        if (aLen == 2) {
	            if ($.isFunction(_param)) {
	                callback = _param;
	            }
	        } else if (aLen == 3) {
	            param = _param, callback = _callback;
	        }
	        return this._doGetJson(url, param, callback, true);
	    },
	    /**
	     * get查询 同步执行<br>
	     * 返回json<br>
	     * @method querySync
	     * @param {String} url 查询地址
	     * @param _param 参数对象 可选
	     * @param {Function} _callback 回调方法 可选
	     */
	    querySync: function (url, _param, _callback) {
	        var that = this, aLen = arguments.length, callback, param;
	        if (aLen == 2) {
	            if ($.isFunction(_param)) {
	                callback = _param;
	            }
	        } else if (aLen == 3) {
	            param = _param, callback = _callback;
	        }
	        return this._doGetJson(url, param, callback, false);
	    },
	    /**
	     * post保存，异步执行，<br>
	     * 返回json。<br>
	     * @method save
	     * @async
	     * @param {String} url 查询地址
	     * @param _param 参数对象 可选
	     * @param {Function} _callback 回调方法 可选
	     */
	    save: function (url, _param, _callback) {
	        var that = this, aLen = arguments.length, callback, param;
	        if (aLen == 2) {
	            if ($.isFunction(_param)) {
	                callback = _param;
	            }
	        } else if (aLen == 3) {
	            param = _param, callback = _callback;
	        }
	        return this._doPostJson(url, param, callback, true);
	    },
	    /**
	     * post保存 同步执行<br>
	     * 返回json<br>
	     * @method saveSync
	     * @param {String} url 查询地址
	     * @param _param 参数对象 可选
	     * @param {Function} _callback 回调方法 可选
	     */
	    saveSync: function (url, _param, _callback) {
	        var that = this, aLen = arguments.length, callback, param;
	        if (aLen == 2) {
	            if ($.isFunction(_param)) {
	                callback = _param;
	            }
	        } else if (aLen == 3) {
	            param = _param, callback = _callback;
	        }
	        return this._doPostJson(url, param, callback, false);
	    },
	    /**
	     * 执行post查询<br>
	     * 返回json<br>
	     * 内部使用<br>
	     * @method _doPostJson
	     * @private
	     * @param {String} url 查询地址
	     * @param param 参数对象
	     * @param {Function} callback 回调方法
	     * @param {Boolean} async 是否异步
	     */
	    _doPostJson: function (url, param, callback, async) {
	        var ajax = $.ajax({
	            url: url,
	            type: 'post',
	            dataType: 'json',
	            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	            async: async,
	            data: param,
	            cache:false,
	            success: function (json) {
	                if (callback)
	                    callback(json);
	            },
	            error: function(){
	                console.log("error");
	            }
	        });
	        return ajax;
	    },
	    /**
	     * 执行post查询<br>
	     * 返回json<br>
	     * 内部使用<br>
	     * @method _doPostJson
	     * @private
	     * @param {String} url 查询地址
	     * @param param 参数对象
	     * @param {Function} callback 回调方法
	     * @param {Boolean} async 是否异步
	     */
	    _doGetJson: function (url, param, callback, async) {
	        var ajax = $.ajax({
	            url: url,
	            type: 'get',
	            dataType: 'json',
	            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	            async: async,
	            cache:false,
	            data: param,
	            success: function (json) {
	                if (callback)
	                    callback(json);
	            },
	            error: function(){
	                console.log("error");
	            }
	        });
	        return ajax;
	    },
	    stringifyParam:function(param,split1,split2){
	        if(!param)
	            return '';
	        var arr = [];
	        for(var key in param){
	            arr.push(key+split1+param[key]);
	        }
	        return arr.join(split2);
	    },
	    /**
	     * 设置显示区域容器的内容<br>
	     * 当使用此方法时，会自动按照setShowType所设定的展现方式进行展现<br>
	     * 当未设置setShowType时，默认使用Normal账户中心嵌入式进行展现<br>
	     * 设置为Pop时，会使用弹窗控件进行弹窗展示
	     * 设置为Container时，会使用传入的dom容器进行嵌入展示
	     * @method setContainer
	     * @param data html数据
	     * @return {Dom} dom容器对象
	     */
	    render: function (data) {
	        var that = this;
	        switch (this.getShowType()) {
	            case 'Normal':
	                var $mainview = $("#framework-content-main");
	                $mainview.html(data);
	                that.dom = $mainview;
	                break;
	            case 'Pop':
	                var pop = $('#framework_dialog').dialog({
	                    title: this.getTitle(),
	                    width: this.getWidth(),
	                    height: this.getHeight(),
	                    closed: false,
	                    content:data,
	                    modal: true,
	                    collapsible:true,
	                    minimizable:false,
	                    maximizable:true,
	                    maximized:false,
	                    resizable:true,
	                    onBeforeClose : function() {
	                        that.finish();
	                        return false;
	                    }
	                });
	                that.dom = $('#framework_dialog>div');
	                pop.parent().addClass('uk-animation-scale-up').next().addClass('uk-animation-scale-up');
	                that.pop = pop;
	                break;
	            case 'NoUI':
	                that.dom = null;
	                break;
	        }
	        Events.notifyWith('onRendered',that, that.dom);
	        setTimeout(function(){
	            Events.notify('onWindowResize');
	        },100);
	        var $input = $('input[autofocus]',that.dom);
	        $input.length>0&&$input[0].focus();
	        return that.dom;
	    },
	    _closeDialog:function(){
	        var that = this;
	        if(this.pop){
	            this.pop.parent().removeClass('uk-animation-scale-up').next().removeClass('uk-animation-scale-up');
	            setTimeout(function(){
	                that.pop.parent().addClass('uk-animation-reverse uk-animation-scale-up').next().addClass('uk-animation-reverse uk-animation-scale-up');
	                setTimeout(function(){
	                    that.pop.dialog('destroy');
	                    that.pop = null;
	                    $('<div id="framework_dialog"></div>').appendTo($('body'));
	                },200);
	            },50);

	        }
	    },
	    /**
	     * 添加回调方法<br>
	     * 一般来说，当调用某个模块进行处理某项业务时，其处理完毕之后需要一个回调通知，调用此方法添加即可，同一个模块可以添加多个回调方法。<br>
	     * 模块处理应遵循业务处理完毕之后调用自身继承下来的finish方法以声明此模块任务结束。<br>
	     * @method addCallback
	     * @chainable
	     * @param {Function} callback 方法
	     */
	    addCallback: function (callback) {
	        if (!this._callbacks)
	            this._callbacks = [];
	        this._callbacks.push({
	            model: this,
	            func: callback
	        });
	        return this;
	    },
	    /**
	     * 清空回调堆栈
	     * @method clearCallback
	     */
	    clearCallback: function () {
	        if (this._callbacks)
	            this._callbacks.length = 0;
	    },
	    /**
	     * 模块任务结束<br>
	     * 此方法的意义在于，当前模块结束对主视图的持有<br>
	     * @method finish
	     * @chainable
	     * @return {Framework} self
	     */
	    finish: function () {
	        if (this._callbacks) {
	            var callbackcount = this._callbacks.length;
	        } else
	            var callbackcount = 0;

	        if (this.getShowType() === 'Pop') {
	            if (this.pop != null)
	                this._closeDialog();
	            _prevModule && this.setCurrent.apply(_prevModule);
	        }
	        Events.notifyWith('onFinished',this);

	        if (this._callbacks) {
	            callbackcount != 0 ? this._executeCallback.apply(this, arguments) : '';
	            this._callbacks.length = 0;//清空回调
	        }
	        this.finished = true;
	        this.dom = null;
	        return this;
	    },
	    /**
	     * 执行回调方法列表
	     * @method _executeCallback
	     * @private 内部使用
	     */
	    _executeCallback: function () {
	        var callbacks = this._callbacks;
	        for (var i = 0, len = callbacks.length; i < len; i++) {
	            callbacks[i].func.apply(this, arguments);
	        }
	    },
	    /**
	     * 设置当前模块<br>
	     * 此方法的意义在于在有多个弹窗模块共存时，以声明模块当前模块。<br>
	     * 内部若如果存在账户中心菜单选中的回调方法，则调用。
	     * @method setCurrent
	     */
	    setCurrent: function () {
	        _currentModel = this;
	    },
	    /**
	     * 获取当前模块
	     * @method getCurrent
	     * @return {Framework} Account的子类对象
	     */
	    getCurrent: function () {
	        return _currentModel;
	    },
	    /**
	     * 提供给外部使用的插件加载方式
	     * 由子类实现该方法，并判断哪些模块是属于自己的，加载到相应的container内即可。
	     * @param widgetConfigs [{container:jQueryDom,module:'./attence-analyse-widgets/attence-analyse-chart1'}]
	     */
	    loadWidgets:function(widgetConfigs){
	        return false;
	    },
	    /**
	     * 提供给外部使用的插件销毁方式
	     * 由子类实现该方法
	     */
	    destoryWidgets:function(){
	        return false;
	    },
	    /**
	     * 提供给外部使用的插件尺寸调整方法
	     */
	    resizeWidgets:function(){
	        return false;
	    },
	    /**
	     * toast 提示方法
	     * @param msg 提示信息
	     * @param timeout 超时时长
	     */
	    toast:function(msg,timeout){
	        var toast = document.createElement('div');
	        toast.style.opacity = '0';
	        toast.style.padding = '7px 10px';
	        toast.style.minWidth = '80px';
	        toast.style.color = '#fff';
	        toast.style.textAlign = 'center';
	        toast.style.position = 'fixed';
	        toast.style.bottom = '10%';
	        toast.style.left = '50%';
	        toast.style.borderRadius = '3px';
	        toast.style.fontSize = '14px';
	        toast.style.transform = 'translateX(-50%)';
	        toast.style.transition = 'opacity .3s ease';
	        toast.style.backgroundColor = 'rgba(39, 39, 39, 0.6)';
	        toast.innerHTML = '<p>'+msg+'</p>';
	        document.body.appendChild(toast);
	        setTimeout(function(){
	            toast.style.opacity = '1';
	        },50);
	        setTimeout(function(){
	            toast.style.opacity = '0';
	            setTimeout(function(){
	                document.body.removeChild(toast);
	            },300);
	        },timeout?timeout:2000);
	    },
	    /* options的默认值
	     *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
	     *  options.leading = true;
	     * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
	     *  options.trailing = true;
	     * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
	     */
	    throttle : function(func, wait, options) {
	        var context, args, result;
	        var timeout = null;
	        var previous = 0;
	        if (!options) options = {};
	        var later = function() {
	            previous = options.leading === false ? 0 : Date.now();
	            timeout = null;
	            result = func.apply(context, args);
	            if (!timeout) context = args = null;
	        };
	        return function() {
	            var now = Date.now();
	            if (!previous && options.leading === false) previous = now;
	            // 计算剩余时间
	            var remaining = wait - (now - previous);
	            context = this;
	            args = arguments;
	            // 当到达wait指定的时间间隔，则调用func函数
	            // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
	            if (remaining <= 0 || remaining > wait) {
	                // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
	                if (timeout) {
	                    clearTimeout(timeout);
	                    timeout = null;
	                }
	                previous = now;
	                result = func.apply(context, args);
	                if (!timeout) context = args = null;
	            } else if (!timeout && options.trailing !== false) {
	                // options.trailing=true时，延时执行func函数
	                timeout = setTimeout(later, remaining);
	            }
	            return result;
	        };
	    },
	    debounce : function(func, wait, immediate) {
	        // immediate默认为false
	        var timeout, args, context, timestamp, result;

	        var later = function() {
	            // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
	            var last = Date.now() - timestamp;

	            if (last < wait && last >= 0) {
	                timeout = setTimeout(later, wait - last);
	            } else {
	                timeout = null;
	                if (!immediate) {
	                    result = func.apply(context, args);
	                    if (!timeout) context = args = null;
	                }
	            }
	        };

	        return function() {
	            context = this;
	            args = arguments;
	            timestamp = Date.now();
	            // 第一次调用该方法时，且immediate为true，则调用func函数
	            var callNow = immediate && !timeout;
	            // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
	            if (!timeout) timeout = setTimeout(later, wait);
	            if (callNow) {
	                result = func.apply(context, args);
	                context = args = null;
	            }

	            return result;
	        };
	    },
	    wsCall:function(eventName,data,callback){
	        var tmpId = Events.EVENT_PREFIX + '_' + (new Date()).getTime();
	        Events.subscribe(tmpId,function(data){
	            callback && callback(data);
	        });
	        _websocket.send(JSON.stringify({
	            callbackId:tmpId,
	            clientId:_websocket.client_id,
	            eventName:eventName,
	            data:data
	        }));
	        return tmpId;
	    },
	    wsListen:function(eventName,data,callback){
	        var tmpId = EVENT_LISTEN_PREFIX + '_' + (new Date()).getTime();
	        Events.subscribe(tmpId,function(data){
	            callback && callback(data);
	        });
	        _websocket.send(JSON.stringify({
	            callbackId:tmpId,
	            clientId:_websocket.client_id,
	            eventName:eventName,
	            data:data
	        }));
	        return tmpId;
	    },
	    wsUnListen:function(id){
	        Events.unsubscribe(id);
	    }
	};

	var frameWork = window.fw = new Framework();


	/**======================订阅resize事件，通过debounce进行函数节流处理start================**/
	/**
	 * 订阅resize事件，通过debounce进行函数节流处理
	 */
	var resize = function(){
	    try{
	        Events.notify('onWindowResize');
	    }catch(e){}
	};

	$(window).resize(frameWork.debounce(resize,70));
	/**======================订阅resize事件，通过debounce进行函数节流处理end================**/



	/**======================websocket 封装 start================**/
	_websocket = new WebSocket('ws://'+location.host.split(':')[0]+':8088');
	_websocket.onopen = function(){
	};
	_websocket.onclose  = function(){
	  console.log('ws close');
	};
	_websocket.onerror  = function(){
	  console.log('ws onerror ');
	};
	_websocket.onmessage  = function(e){
	    try{
	        transfer(e);
	    }catch(ex){
	        console.log(ex);
	    }
	};
	var CLIENT_ID_REG = /^__CLIENT_ID__:(.*)$/;
	function transfer(e){
	    var data = e.data;
	    if(data.match(CLIENT_ID_REG)){
	        _websocket.client_id = RegExp.$1;
	    }else{
	        var data = JSON.parse(e.data);
	        Events.notify(data.callbackId,data.data);
	    }

	}


	/**======================websocket 封装 end================**/



	module.exports = frameWork;













/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by 杨浪 on 2016/10/12.
	 * webpack 打包需要，扫描当前文件夹下的所有需要自动打包的动态模块，所以需要一个require(变量)
	 * webpack的require在没有给变量的情况下会自动扫描当前文件目录下（递归）所有的尚未打包的js文件并进行打包。
	 */

	Events.addMethod('require',function(moduleId,options){
	    //此处有两种可能，一种是菜单，会传进来配置的./modules/aboutus（比如），另一种是直接引用模块，比如aboutus，需要判断格式
	    var flag = /^\.\/modules\/(.*)$/.test(moduleId);
	    return __webpack_require__(171)(flag?'./'+RegExp.$1:'./'+moduleId);
	});
	module.exports = {};

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./aboutus": 172,
		"./aboutus.js": 172,
		"./async-data": 176,
		"./async-data.js": 176,
		"./attence-analyse": 177,
		"./attence-analyse-widgets/attence-analyse-chart1": 200,
		"./attence-analyse-widgets/attence-analyse-chart1.js": 200,
		"./attence-analyse-widgets/attence-analyse-chart2": 202,
		"./attence-analyse-widgets/attence-analyse-chart2.js": 202,
		"./attence-analyse-widgets/attence-analyse-chart3": 203,
		"./attence-analyse-widgets/attence-analyse-chart3.js": 203,
		"./attence-analyse.js": 177,
		"./attence-search": 204,
		"./attence-search.js": 204,
		"./authority-control": 211,
		"./authority-control.js": 211,
		"./dim-add-modify": 222,
		"./dim-add-modify.js": 222,
		"./dim-manage": 226,
		"./dim-manage.js": 226,
		"./element-add-modify": 230,
		"./element-add-modify.js": 230,
		"./element-manage": 234,
		"./element-manage.js": 234,
		"./framework/framework-base": 169,
		"./framework/framework-base.js": 169,
		"./framework/framework-chartconfig": 201,
		"./framework/framework-chartconfig.js": 201,
		"./framework/framework-route": 167,
		"./framework/framework-route.js": 167,
		"./homepage": 238,
		"./homepage.js": 238,
		"./menu-add-modify": 259,
		"./menu-add-modify.js": 259,
		"./menu-manage": 263,
		"./menu-manage.js": 263,
		"./message-publish": 267,
		"./message-publish-list": 241,
		"./message-publish-list.js": 241,
		"./message-publish.js": 267,
		"./org-add-modify": 282,
		"./org-add-modify.js": 282,
		"./org-manage": 286,
		"./org-manage.js": 286,
		"./password-modify": 290,
		"./password-modify.js": 290,
		"./report-list": 246,
		"./report-list.js": 246,
		"./report-view": 294,
		"./report-view.js": 294,
		"./role-add-modify": 298,
		"./role-add-modify.js": 298,
		"./role-manage": 302,
		"./role-manage.js": 302,
		"./role2org": 306,
		"./role2org.js": 306,
		"./role2user": 310,
		"./role2user.js": 310,
		"./user-add-modify": 314,
		"./user-add-modify.js": 314,
		"./user-manage": 318,
		"./user-manage.js": 318,
		"./user2org": 322,
		"./user2org.js": 322,
		"./user2role": 326,
		"./user2role.js": 326,
		"./webpack-base": 170,
		"./webpack-base.js": 170
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 171;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(173);
	var AboutUs = function(){ };

	//继承自框架基类
	AboutUs.prototype = $.extend({},frameworkBase);
	AboutUs.prototype.id = 'aboutus';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	AboutUs.prototype.init = function(options){ 
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('关于我们').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	};

	AboutUs.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(175);
	    this.render(html);
	};

	module.exports = new AboutUs();

/***/ },
/* 173 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 174 */,
/* 175 */
/***/ function(module, exports) {

	module.exports = "<div class=\"aboutus shadow-block\">\r\n    <H3>学校物业管理平台</H3>\r\n    <p>\r\n            该平台提供智能门禁与学生考勤系统、智能报修与投诉处理系统、学校信息发布与家校互通系统等功能\r\n    </p>\r\n</div>";

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 数据同步
	 * 无界面模块，只负责同步数据，右下角可以弹信息框或者在屏幕中间弹进度框进行显示当前进度。
	 * 不影响其它模块的运行，在进行数据同步时其它模块可以照常切换与运行。
	 */
	var frameworkBase = __webpack_require__(169);
	var AsyncData = function(){ };

	//继承自框架基类
	AsyncData.prototype = $.extend({},frameworkBase);
	AsyncData.prototype.id = 'async-data';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	AsyncData.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    frameworkBase.init.call(this,options);
	    var count = 10;
	    window.setTimeout(function(){
	        console.log('同步数据。。。'+count);
	        count--;
	        if(count>0)
	            setTimeout(arguments.callee,1000);
	    },1000);
	};


	module.exports = new AsyncData();

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 学生考勤统计
	 */

	var frameworkBase = __webpack_require__(169);

	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(181);
	var AttenceAnalyse = function(){ };

	//继承自框架基类
	AttenceAnalyse.prototype = $.extend({},frameworkBase);
	AttenceAnalyse.prototype.id = 'attence-analyse';

	//子模块配置
	var WIDGETS = [
	    {container:'#attence-analyse-chart1',module:'./attence-analyse-widgets/attence-analyse-chart1'},
	    {container:'#attence-analyse-chart2',module:'./attence-analyse-widgets/attence-analyse-chart2'},
	    {container:'#attence-analyse-chart3',module:'./attence-analyse-widgets/attence-analyse-chart3'}];
	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	AttenceAnalyse.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('学生考勤统计').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	};

	/**
	 * 加载基础视图
	 */
	AttenceAnalyse.prototype.loadBaseView = function(){
	    var that = this;
	    this.loadFragment('/views/modules/attence-analyse.html').then(function(html){
	        that.render(html);
	        that.bindEvents();
	        that.loadWidgets();
	    });
	};

	/**
	 * 加载插件
	 */
	AttenceAnalyse.prototype.loadWidgets = function(temp){
	    this.widgets = [];
	    var widgetArray = [];
	    if(temp && $.isArray(temp)){
	        temp.forEach(function(i){
	            WIDGETS.forEach(function(j){
	               if(i.module == j.module){
	                   widgetArray.push(i);
	                   return false;
	               }
	            });
	        });
	    }else
	        widgetArray = WIDGETS;
	    for(var i = 0,len = widgetArray.length;i<len;i++){
	        var widget = __webpack_require__(171)(widgetArray[i].module);
	        widget.init({container:$(widgetArray[i].container)});
	        this.widgets.push(widget);
	    }
	    Events.notify('onRefresh:attence-analyse',{type:0});
	};


	AttenceAnalyse.prototype.bindEvents = function(){
	    var that = this;
	    $('#jobHistoryGrainSelector',this.dom).on('change',function(){
	        var value = $(this).val();
	        Events.notify('onRefresh:attence-analyse',{type:value});
	    });
	    var startDate = $("#startdate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:attence-analyse',{
	                startdate:startDate.combo('getValue').replace(/-/gi,''),
	                enddate:endDate.combo('getValue').replace(/-/gi,'')
	            });
	        }
	    });
	    var endDate = $("#enddate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:attence-analyse',{
	                startdate:startDate.combo('getValue').replace(/-/gi,''),
	                enddate:endDate.combo('getValue').replace(/-/gi,'')
	            });
	        }
	    });
	};

	/**
	 * 调整widgets尺寸
	 */
	AttenceAnalyse.prototype.resizeWidgets = function () {
	    attenceAnalyse.widgets.forEach(function(widget){
	        widget.resize();
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	AttenceAnalyse.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:attence-analyse');
	    frameworkBase.finish.apply(this,arguments);
	};
	var attenceAnalyse = new AttenceAnalyse();
	Events.subscribe('onWindowResize',function(){
	    if(!attenceAnalyse.dom || !attenceAnalyse.widgets)
	        return;
	    $('.charts-container',attenceAnalyse.dom).height(attenceAnalyse.dom.height()-55);
	    attenceAnalyse.widgets.forEach(function(widget){
	        widget.resize();
	    });
	});

	module.exports = attenceAnalyse;

/***/ },
/* 178 */
/***/ function(module, exports) {

	if ($.fn.pagination){
		$.fn.pagination.defaults.beforePageText = '第';
		$.fn.pagination.defaults.afterPageText = '共{pages}页';
		$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
	}
	if ($.fn.datagrid){
		$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
	}
	if ($.fn.treegrid && $.fn.datagrid){
		$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
	}
	if ($.messager){
		$.messager.defaults.ok = '确定';
		$.messager.defaults.cancel = '取消';
	}
	$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
			'combo','combobox','combogrid','combotree',
			'datebox','datetimebox','numberbox',
			'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
		if ($.fn[plugin]){
			$.fn[plugin].defaults.missingMessage = '该输入项为必输项';
		}
	});
	if ($.fn.validatebox){
		$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
		$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
		$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
		$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
	}
	if ($.fn.calendar){
		$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
		$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
	}
	if ($.fn.datebox){
		$.fn.datebox.defaults.currentText = '今天';
		$.fn.datebox.defaults.closeText = '关闭';
		$.fn.datebox.defaults.okText = '确定';
		$.fn.datebox.defaults.formatter = function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
		};
		$.fn.datebox.defaults.parser = function(s){
			if (!s) return new Date();
			var ss = s.split('-');
			var y = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var d = parseInt(ss[2],10);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				return new Date(y,m-1,d);
			} else {
				return new Date();
			}
		};
	}
	if ($.fn.datetimebox && $.fn.datebox){
		$.extend($.fn.datetimebox.defaults,{
			currentText: $.fn.datebox.defaults.currentText,
			closeText: $.fn.datebox.defaults.closeText,
			okText: $.fn.datebox.defaults.okText
		});
	}
	if ($.fn.datetimespinner){
		$.fn.datetimespinner.defaults.selections = [[0,4],[5,7],[8,10],[11,13],[14,16],[17,19]]
	}


/***/ },
/* 179 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 180 */,
/* 181 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 迟到分析 饼图 angle
	 */

	var AttenceAnalyse = __webpack_require__(177);

	var chartConfig = __webpack_require__(201);
	var AttenceAnalyseModule1 = function () {};

	//继承自作业分析类
	AttenceAnalyseModule1.prototype = $.extend({}, AttenceAnalyse);
	AttenceAnalyseModule1.prototype.id = 'attence-analyse-chart1';

	AttenceAnalyseModule1.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('迟到比例');
	    this.myChart = echarts.init(this.options.container[0]);
	    Events.subscribe('onRefresh:attence-analyse',function(option){
	        $.extend(option,{type:1,action:'001'});
	        that.refreshChart(option);
	    });

	};

	AttenceAnalyseModule1.prototype.refreshChart = function (option) {
	    var that = this;
	    this.query('/attence/analyse', option, function (ret) {
	        if(!ret.success){
	            that.toast(ret.message);
	            return;
	        }
	        var results = ret.data,data = [],legends = [];
	        for(var i = 0;i<results.length;i++){
	            data.push({value:results[i].cnt,name:results[i].isout==1?'迟到':'正常',isout:results[i].isout});
	            legends.push(results[i].isout==1?'迟到':'正常');
	        }
	        that.myChart.setOption(
	            {
	                color:['#009587','#FE5621'],
	                backgroundColor: chartConfig.BGCOLOR,
	                title: {
	                    text: '迟到比例',
	                    left: 'center',
	                    top: 20,
	                    textStyle:  chartConfig.TITLE_STYLE
	                },
	                legend: {
	                    orient: 'vertical',
	                    x: '10',
	                    y:'10',
	                    data:legends,
	                    textStyle: chartConfig.LEGEND_STYLE
	                },
	                tooltip : {
	                    trigger: 'item',
	                    formatter: "{a} <br/>{b} : {c} ({d}%)"
	                },
	                series : [
	                    {
	                        name:'迟到比例',
	                        type:'pie',
	                        roseType: 'angle',
	                        radius : '55%',
	                        center: chartConfig.CHART_CENTER,
	                        data:data.sort(function (a, b) { return a.isout - b.isout}),
	                        label: {
	                            normal: {
	                                textStyle: {
	                                    color: '#ffffff'
	                                }
	                            }
	                        },
	                        labelLine: {
	                            normal: {
	                                lineStyle: {
	                                    color: '#ffffff'
	                                },
	                                smooth: 0.2,
	                                length: 10,
	                                length2: 20
	                            }
	                        }
	                    }
	                ]
	            });
	    });
	};

	AttenceAnalyseModule1.prototype.resize = function () {
	    this.myChart.resize();
	};

	var attenceAnalyseModule1 = new AttenceAnalyseModule1();


	module.exports = attenceAnalyseModule1;

/***/ },
/* 201 */
/***/ function(module, exports) {

	/**
	 * Created by 杨浪 on 2016/9/20.
	 */
	module.exports = {
	    TITLE_STYLE: {
	        color: '#ffffff',
	        fontWeight:'normal',
	        fontSize:16
	    },
	    LEGEND_STYLE:{
	        color: '#ffffff',
	        fontWeight:'normal',
	        fontSize:12
	    },
	    COLORS:['#009587','#FE5621'],
	    BGCOLOR:'TRANSPARENT',
	    CHART_CENTER:['50%', '60%']
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 早退比例 饼图
	 */

	var AttenceAnalyse = __webpack_require__(177);
	var chartConfig = __webpack_require__(201);
	var AttenceAnalyseModule2 = function () {};

	//继承自作业分析类
	AttenceAnalyseModule2.prototype = $.extend({}, AttenceAnalyse);
	AttenceAnalyseModule2.prototype.id = 'attence-analyse-chart2';

	AttenceAnalyseModule2.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('早退比例');
	    this.myChart = echarts.init(this.options.container[0]);
	    Events.subscribe('onRefresh:attence-analyse',function(option){
	        $.extend(option,{type:0,action:'001'});
	        that.refreshChart(option);
	    });
	};

	AttenceAnalyseModule2.prototype.refreshChart = function (option) {
	    var that = this;
	    this.query('/attence/analyse', option, function (ret) {
	        if(!ret.success){
	            that.toast(ret.message);
	            return;
	        }
	        var results = ret.data,data = [],legends = [];
	        for(var i = 0;i<results.length;i++){
	            data.push({value:results[i].cnt,name:results[i].isout==1?'早退':'正常',isout:results[i].isout});
	            legends.push(results[i].isout==1?'早退':'正常');
	        }
	        that.myChart.setOption(
	            {
	                color:['#3498DB','#E74C3C'],
	                backgroundColor: chartConfig.BGCOLOR,
	                title: {
	                    text: '早退比例',
	                    left: 'center',
	                    top: 20,
	                    textStyle: chartConfig.TITLE_STYLE
	                },
	                legend: {
	                    orient: 'vertical',
	                    x: '10',
	                    y:'10',
	                    data:legends,
	                    textStyle: chartConfig.LEGEND_STYLE
	                },
	                tooltip : {
	                    trigger: 'item',
	                    formatter: "{a} <br/>{b} : {c} ({d}%)"
	                },
	                series : [
	                    {
	                        name:'早退比例',
	                        type:'pie',
	                        radius : ['25%','55%'],
	                        center: chartConfig.CHART_CENTER,
	                        data:data.sort(function (a, b) { return a.isout - b.isout}),
	                        label: {
	                            normal: {
	                                textStyle: {
	                                    color: '#ffffff'
	                                }
	                            }
	                        },
	                        labelLine: {
	                            normal: {
	                                lineStyle: {
	                                    color: '#ffffff'
	                                },
	                                smooth: 0.2,
	                                length: 10,
	                                length2: 20
	                            }
	                        }
	                    }
	                ]
	            });
	    });
	};

	AttenceAnalyseModule2.prototype.resize = function () {
	    this.myChart.resize();
	};

	var attenceAnalyseModule1 = new AttenceAnalyseModule2();


	module.exports = attenceAnalyseModule1;

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 按时间段进行迟到早退统计分析 柱状图
	 */

	var AttenceAnalyse = __webpack_require__(177);
	var chartConfig = __webpack_require__(201);
	var AttenceAnalyseModule3 = function () {};

	//继承自作业分析类
	AttenceAnalyseModule3.prototype = $.extend({}, AttenceAnalyse);
	AttenceAnalyseModule3.prototype.id = 'attence-analyse-chart3';

	AttenceAnalyseModule3.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('按时间段进行迟到早退统计分析');
	    this.myChart = echarts.init(this.options.container[0]);
	    Events.subscribe('onRefresh:attence-analyse',function(option){
	        $.extend(option,{action:'002'});
	        that.refreshChart(option);
	    });
	};

	AttenceAnalyseModule3.prototype.refreshChart = function (option) {
	    var that = this;
	    this.query('/attence/analyse', option, function (ret) {
	        if(!ret.success){
	            that.toast(ret.message);
	            return;
	        }
	        var results = ret.data,dims = [],chidaoData = [], normal1Data = [], zaotuiData = [], normal2Data = [];
	        for(var i = 0;i<results.length;i++){
	            dims.push(results[i].date);
	            (results[i].type == 1 && results[i].isout == 1) && (chidaoData.push(results[i].cnt));
	            (results[i].type == 1 && results[i].isout == 0) && (normal1Data.push(results[i].cnt));
	            (results[i].type == 0 && results[i].isout == 1) && (zaotuiData.push(results[i].cnt));
	            (results[i].type == 0 && results[i].isout == 0) && (normal2Data.push(results[i].cnt));
	        }
	        that.myChart.setOption({
	            color: ['#3398DB', '#969696'],
	            backgroundColor: chartConfig.BGCOLOR,
	            title: {
	                text: '时间段迟到早退统计分析',
	                left: 'center',
	                top: 20,
	                textStyle: chartConfig.TITLE_STYLE
	            },
	            tooltip: {
	                trigger: 'axis',
	                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
	                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	                }
	            },
	            legend:{
	                top:10,
	                x:10,
	                y:10,
	                data:['迟到','正常上学','早退','正常放学'],
	                textStyle: chartConfig.LEGEND_STYLE
	            },
	            grid: {
	                left: '3%',
	                right: '4%',
	                bottom: '3%',
	                containLabel: true
	            },
	            xAxis: [
	                {
	                    type: 'category',
	                    data: dims,
	                    axisTick: {
	                        alignWithLabel: true
	                    },
	                    axisLabel :{
	                        textStyle:{
	                            color:"#ffffff"

	                        }
	                    }
	                }
	            ],
	            yAxis: [
	                {
	                    type: 'value',
	                    axisLabel:
	                    {
	                        textStyle:{
	                            color:"#ffffff"

	                        }
	                    }
	                }
	            ],
	            series: [
	                {
	                    name: '迟到',
	                    type: 'bar',
	                    data: chidaoData,
	                    itemStyle:{
	                        normal:{
	                            color:'#FE5621'
	                        }
	                    }
	                },

	                {
	                    name: '正常上学',
	                    type: 'bar',
	                    data: normal1Data,
	                    itemStyle:{
	                        normal:{
	                            color:'#009587'
	                        }
	                    }
	                },
	                {
	                    name: '早退',
	                    type: 'bar',
	                    data: zaotuiData,
	                    itemStyle:{
	                        normal:{
	                            color:'#E74C3C'
	                        }
	                    }
	                },
	                {
	                    name: '正常放学',
	                    type: 'bar',
	                    data: normal2Data,
	                    itemStyle:{
	                        normal:{
	                            color:'#3498DB'
	                        }
	                    }
	                }
	            ]
	        });
	    });
	};

	AttenceAnalyseModule3.prototype.resize = function () {
	    this.myChart.resize();
	};

	var attenceAnalyseModule1 = new AttenceAnalyseModule3();


	module.exports = attenceAnalyseModule1;

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 学生考勤查询
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(205);
	__webpack_require__(181);
	var AttenceSearch = function () {};

	//继承自框架基类
	AttenceSearch.prototype = $.extend({}, frameworkBase);
	AttenceSearch.prototype.id = 'attence-search';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	AttenceSearch.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('学生考勤查询').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	};

	AttenceSearch.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/attence-search.html').then(function(html){
	        that.render(html);
	        var columns = __webpack_require__(209);
	        var $table = that.$table = $('#dataTable',that.dom).datagrid({
	            url: '/attence/search',
	            method: 'get',
	            columns: [columns],
	            pagination: true,
	            cache:false,
	            pageSize: 20,
	            ctrlSelect: true,
	            checkOnSelect: true,
	            selectOnCheck: true,
	            loadMsg: '正在查询，请稍候……',
	            striped: true,
	            fit: true,
	            fitColumns: true,
	            loadFilter: function (data) {
	                if(!data.success){
	                    that.toast(data.message);
	                }
	                return data.data;
	            },
	            onDblClickRow: function (rowIndex, rowData) {
	            }
	        });

	        var searchBox = $('#attence-search #home-easyui-searchbox',that.dom).searchbox({
	            searcher: function (value, name) {
	                Events.notify('onRefresh:attence-search');
	            },
	            menu:'#attence-type-select',
	            prompt: '请输关键字，如学生名字'
	        });

	        var startDate = $("#startdate",that.dom).datetimebox({
	            editable:false ,
	            formatter: function (date) {
	                return Calendar.getInstance(date).format('yyyy-MM-dd HH:mm:ss');
	            },
	            onChange:function(date){
	                Events.notify('onRefresh:attence-search');
	            }
	        });
	        var endDate = $("#enddate",that.dom).datetimebox({
	            editable:false ,
	            formatter: function (date) {
	                return Calendar.getInstance(date).format('yyyy-MM-dd HH:mm:ss');
	            },
	            onChange:function(date){
	                Events.notify('onRefresh:attence-search');
	            }
	        });

	        Events.subscribe('onRefresh:attence-search',function(){
	            $table.datagrid('load',{
	                key:searchBox.searchbox('getValue'),
	                type:searchBox.searchbox('getName'),
	                startdate:startDate.combo('getValue').replace(/-/gi,''),
	                enddate:endDate.combo('getValue').replace(/-/gi,'')
	            });
	        });
	    });

	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	AttenceSearch.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:attence-search');
	    frameworkBase.finish.apply(this,arguments);
	};

	var attenceSearch = new AttenceSearch();
	Events.subscribe('onWindowResize',function(){
	    if(!attenceSearch.dom)
	        return;
	    $('.tablecontainer',attenceSearch.dom).height(attenceSearch.dom.height()-15-$('.condition-wrap',attenceSearch.dom).height());
	    attenceSearch.$table.datagrid('resize');
	});

	module.exports = attenceSearch;

/***/ },
/* 205 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	typeof window == 'undefined' && (Calendar = __webpack_require__(210));
	module.exports = [
	    {field: 'stu_id', title: '学生id', width: 350},
	    {field: 'stu_name', title: '学生姓名', width: 150},
	    {field: 'type', title: '考勤类型', width: 100,formatter: function (val) {
	        return val==1?'进校':'出校';
	    }},
	    {field: 'rfid', title: 'RFID', width: 350},
	    {field: 'create_time', title: '考勤时间', width: 200}
	];

/***/ },
/* 210 */
/***/ function(module, exports) {

	/**
	 * @module date.js
	 * Calendar日期类以及对Date对象扩展一个format方法
	 * 实例化方法getInstance 支持如下链式操作
	 * Calendar.getInstance().add(Calendar.MONTH,-1).add(Calendar.DATE,5).format('yyyyMMdd hh:mm:ss')
	 * Calendar.getInstance().add(Calendar.WEEK,-1).getTime()
	 * Calendar.getInstance().parse('20160120102234')
	 * Calendar.getInstance('20160120').format('M月d日')
	 * @method Calendar
	 * @author yanglang
	 * @date 20160120
	 */
	(function(){
	    var Calendar = function () {
	        throw new TypeError('请使用getInstance方法进行实例化');
	    };
	    typeof window == 'undefined' ? (module.exports = Calendar) : (window.Calendar = Calendar);

	    Calendar.prototype = {
	        constructor:Calendar,
	        /**
	         * 构造方法
	         * @param date
	         */
	        init:function(date){
	            date ? this.parse(date): this.date = new Date();
	        },
	        /**
	         * @method add
	         * @param type Calendar.YEAR Calendar.MONTH Calendar.WEEK Calendar.DATE
	         * @param num 正数或负数
	         */
	        add: function (type, num) {
	            if (isNaN(num))
	                throw new TypeError('第二个参数必须为数字');
	            switch (type) {
	                case 1:
	                    this.date.setFullYear(num + this.date.getFullYear());
	                    break;
	                case 2:
	                    this.date.setMonth(num + this.date.getMonth());
	                    break;
	                case 3:
	                    this.date.setDate(num + this.date.getDate());
	                    break;
	                case 4:
	                    this.date.setDate(num*7 + this.date.getDate());
	                    break;
	                case 5:
	                    this.date.setHours(num + this.date.getHours());
	                    break;
	                case 6:
	                    this.date.setMinutes(num + this.date.getMinutes());
	                    break;
	                case 7:
	                    this.date.setSeconds(num + this.date.getSeconds());
	                    break;
	            }
	            return this;
	        },
	        /**
	         * 获取Date日期对象值
	         * @returns {Date|*|XML|string}
	         */
	        getTime: function () {
	            return this.date;
	        },
	        /**
	         * 将传入对象转换成Calendar实例以便进行日期操作
	         * @method parse
	         * @param timeObj Date日期对象 或 带时间的字符串（比如2005年05月04日 02时33分44秒）或Calendar对象
	         */
	        parse: function (timeObj) {
	            var type = Object.prototype.toString.call(timeObj);
	            if(type === '[object Date]'){
	                this.date = timeObj;
	            }else if(type === '[object String]'){
	                timeObj = timeObj.replace(/[^\d]*/gm,''),len = timeObj.length;
	                while(len<14){
	                    timeObj+='0';
	                    len++;
	                }
	                timeObj = timeObj.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?.*$/, '$1/$2/$3 $4:$5:$6');
	                this.date = new Date(timeObj);
	            }else if(type === '[object Object]' && timeObj instanceof this.constructor){
	                this.date = timeObj.getTime();
	            }else if(type === '[object Number]' ){
	                this.date = new Date(timeObj);
	            }else{
	                throw new TypeError('暂不支持转换此数据类型');
	            }
	            return this;
	        },
	        /**
	         * 得到格式化的日期字符串
	         * @param fmt 格式化模板如 yyyyMMdd hh:mm:ss
	         * @returns {String}
	         */
	        format:function(fmt){
	            return this.date.format(fmt);
	        }
	    };

	    Calendar.prototype.init.prototype = Calendar.prototype;

	    /**
	     * 获取Calendar实例
	     * @param date optional 可选参数 可以传入一个日期对象或日期字符串或Calendar对象或时间数
	     * @returns {Calendar.prototype.init}
	     */
	    Calendar.getInstance = function (date) {
	        return new Calendar.prototype.init(date);
	    };

	    Calendar.YEAR = 1;
	    Calendar.MONTH = 2;
	    Calendar.DATE = 3;
	    Calendar.WEEK = 4;
	    Calendar.HOUR = 5;
	    Calendar.MINUTE = 6;
	    Calendar.SECOND = 7;

	    /**
	     * 对Date的扩展，将 Date 转化为指定格式的String<br>
	     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，<br>
	     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)<br>
	     * 例子：<br>
	     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423<br>
	     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18<br>
	     * (new Date()).format("yyyy-MM-dd EE");  ==> 2015-08-07 周五<br>
	     * (new Date()).format("yyyy-MM-dd EEE");  ==> 2015-08-07 星期五<br>
	     * (new Date()).format("yyyy-MM-dd E");  ==> 2015-08-07 五<br>
	     * @method format
	     * @param {String} fmt format字符串
	     * @returns {String}
	     */
	    Date.prototype.format = function(fmt) {
	        var that = this;
	        var o = {
	            "M+" : this.getMonth() + 1, //月份
	            "d+" : this.getDate(), //日
	            "h+" : this.getHours() % 12 == 0 ? 12: this.getHours() % 12, //小时
	            "H+" : this.getHours(), //小时
	            "U+" : this.getUTCHours(), //UTC小时
	            "m+" : this.getMinutes(), //分
	            "s+" : this.getSeconds(), //秒
	            "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
	            "S" : this.getMilliseconds()//毫秒
	        };
	        var week = {
	            "0" : "星期天","1" : "一","2" : "二","3" : "三","4" : "四","5" : "五","6" : "六"
	        };
	        if (/(y+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
	                .substr(4 - RegExp.$1.length));
	        }
	        if (/(E+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1,function(){
	                if(that.getDay() == 0){
	                    if(RegExp.$1.length > 1){
	                        return RegExp.$1.length > 2?"星期天":"周日";
	                    }else
	                        return "日";
	                }else{
	                    if(RegExp.$1.length > 1){
	                        return RegExp.$1.length > 2?"星期"+ week[that.getDay()]:"周"+ week[that.getDay()];
	                    } else{
	                        return week[that.getDay()]
	                    }
	                }
	            }());
	        }
	        for ( var k in o) {
	            if (new RegExp("(" + k + ")").test(fmt)) {
	                fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
	            }
	        }
	        return fmt;
	    };
	})();

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 权限赋值模块
	 * @author yanglang
	 * @type {Framework}
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(212);
	__webpack_require__(181);
	__webpack_require__(214);
	__webpack_require__(215);
	var AuthorityControl = function(){ };

	//继承自框架基类
	AuthorityControl.prototype = $.extend({},frameworkBase);
	AuthorityControl.prototype.id = 'authority-control';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	AuthorityControl.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('权限赋值').setHeight(500).setWidth(500);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	    this.initMenuAuthority();
	    this.initElementAuthority();
	    this.restoreData();
	};

	AuthorityControl.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(221);
	    this.render(html);
	};

	/**
	 * 修改状态返显数据
	 */
	AuthorityControl.prototype.restoreData = function () {
	    var that = this;

	};

	/**
	 * 初始化菜单权限
	 */
	AuthorityControl.prototype.initMenuAuthority = function () {
	    var that = this;
	    this.query('/auth/menu',{role_id:this.options.role_id},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var setting = {
	            check:{
	                enable:true,
	                chkboxType:{ "Y" : "ps", "N" : "s" }
	            },
	            data:{
	                keep:{
	                    parent:true,
	                    leaf:true
	                },
	                simpleData:{
	                    enable:true,
	                    idKey:'menu_id',
	                    pIdKey:'menu_parent_id',
	                    rootPId:null
	                },
	                key:{
	                    name:'menu_title',
	                    title:'menu_title'
	                }
	            },
	            callback:{

	            }
	        };
	        data.data.push({'menu_id':'0','menu_parent_id':null,'menu_title':'根节点','menu_url':''});
	        that.menuAuthorityTree = $.fn.zTree.init($("#menuAuthorityTree",this.dom), setting,data.data);
	        that.menuAuthorityTree.expandNode(that.menuAuthorityTree.getNodes()[0], true, false, true);
	    });
	};

	/**
	 * 初始化元素权限
	 */
	AuthorityControl.prototype.initElementAuthority = function () {
	    var that = this;
	    this.query('/auth/element',{role_id:this.options.role_id},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var setting = {
	            check:{
	                enable:true,
	                chkboxType:{ "Y" : "ps", "N" : "s" }
	            },
	            data:{
	                keep:{
	                    parent:true,
	                    leaf:true
	                },
	                simpleData:{
	                    enable:true,
	                    idKey:'node_id',
	                    pIdKey:'parent_id',
	                    rootPId:null
	                },
	                key:{
	                    name:'node_title',
	                    title:'node_title'
	                }
	            },
	            callback:{

	            }
	        };
	        data.data.push({'node_id':'0','parent_id':null,'node_title':'根节点','node_value':'','node_type':'menu'});
	        that.elementAuthorityTree = $.fn.zTree.init($("#elementAuthorityTree",this.dom), setting,data.data);
	        that.elementAuthorityTree.expandNode(that.elementAuthorityTree.getNodes()[0], true, false, true);
	    });
	};

	/**
	 * 绑定元素事件
	 */
	AuthorityControl.prototype.bindEvents = function () {
	    var that = this;
	    $('.ui-tabs',this.dom).on('click','li',function(){
	        var $this = $(this);
	        if(!$this.hasClass('actived')){
	            $('.ui-tabs>li.actived').removeClass('actived');
	            $this.addClass('actived');
	            $('.ui-tabs-content>div').hide().eq($this.index()).show();
	        }
	    });
	    $('#saveBtn',this.dom).click(function(){
	        //获取被勾选的节点数组
	        var checkedMenuNodes = that.menuAuthorityTree.getCheckedNodes(true);
	        var checkedElementNodes = that.elementAuthorityTree.getCheckedNodes(true);
	        that.save('/auth/save',{
	            role_id:that.options.role_id,
	            auth_menu_ids:function(){
	                var ids = [];
	                for(var i = 0;i<checkedMenuNodes.length;i++){
	                    if(checkedMenuNodes[i].menu_id == '0')
	                        continue;
	                    ids.push(checkedMenuNodes[i].auth_id);
	                }
	                return ids.join(';');
	            }(),
	            auth_element_ids:function(){
	                var ids = [];
	                for(var i = 0;i<checkedElementNodes.length;i++){
	                    if(checkedElementNodes[i].node_type == 'menu')
	                        continue;
	                    ids.push(checkedElementNodes[i].auth_id);
	                }
	                return ids.join(';');
	            }()
	        },function(data){
	            if(!data.success){
	                that.toast(data.message);
	                return;
	            }
	            that.finish(true);
	        });
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	AuthorityControl.prototype.finish = function () {
	    try{
	        frameworkBase.finish.apply(this,arguments);
	    }catch(e){
	        console.log(e);
	    }
	};

	var authorityControl = new AuthorityControl();

	module.exports = authorityControl;

/***/ },
/* 212 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 213 */,
/* 214 */
/***/ function(module, exports) {

	
	/*
	 * JQuery zTree core v3.5.24
	 * http://zTree.me/
	 *
	 * Copyright (c) 2010 Hunter.z
	 *
	 * Licensed same as jquery - MIT License
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * email: hunter.z@263.net
	 * Date: 2016-06-06
	 */
	(function(q){var I,J,K,L,M,N,v,s={},w={},x={},O={treeId:"",treeObj:null,view:{addDiyDom:null,autoCancelSelected:!0,dblClickExpand:!0,expandSpeed:"fast",fontCss:{},nameIsHTML:!1,selectedMulti:!0,showIcon:!0,showLine:!0,showTitle:!0,txtSelectedEnable:!1},data:{key:{children:"children",name:"name",title:"",url:"url",icon:"icon"},simpleData:{enable:!1,idKey:"id",pIdKey:"pId",rootPId:null},keep:{parent:!1,leaf:!1}},async:{enable:!1,contentType:"application/x-www-form-urlencoded",type:"post",dataType:"text",
	url:"",autoParam:[],otherParam:[],dataFilter:null},callback:{beforeAsync:null,beforeClick:null,beforeDblClick:null,beforeRightClick:null,beforeMouseDown:null,beforeMouseUp:null,beforeExpand:null,beforeCollapse:null,beforeRemove:null,onAsyncError:null,onAsyncSuccess:null,onNodeCreated:null,onClick:null,onDblClick:null,onRightClick:null,onMouseDown:null,onMouseUp:null,onExpand:null,onCollapse:null,onRemove:null}},y=[function(b){var a=b.treeObj,c=f.event;a.bind(c.NODECREATED,function(a,c,g){j.apply(b.callback.onNodeCreated,
	[a,c,g])});a.bind(c.CLICK,function(a,c,g,m,h){j.apply(b.callback.onClick,[c,g,m,h])});a.bind(c.EXPAND,function(a,c,g){j.apply(b.callback.onExpand,[a,c,g])});a.bind(c.COLLAPSE,function(a,c,g){j.apply(b.callback.onCollapse,[a,c,g])});a.bind(c.ASYNC_SUCCESS,function(a,c,g,m){j.apply(b.callback.onAsyncSuccess,[a,c,g,m])});a.bind(c.ASYNC_ERROR,function(a,c,g,m,h,f){j.apply(b.callback.onAsyncError,[a,c,g,m,h,f])});a.bind(c.REMOVE,function(a,c,g){j.apply(b.callback.onRemove,[a,c,g])});a.bind(c.SELECTED,
	function(a,c,g){j.apply(b.callback.onSelected,[c,g])});a.bind(c.UNSELECTED,function(a,c,g){j.apply(b.callback.onUnSelected,[c,g])})}],z=[function(b){var a=f.event;b.treeObj.unbind(a.NODECREATED).unbind(a.CLICK).unbind(a.EXPAND).unbind(a.COLLAPSE).unbind(a.ASYNC_SUCCESS).unbind(a.ASYNC_ERROR).unbind(a.REMOVE).unbind(a.SELECTED).unbind(a.UNSELECTED)}],A=[function(b){var a=h.getCache(b);a||(a={},h.setCache(b,a));a.nodes=[];a.doms=[]}],B=[function(b,a,c,d,e,g){if(c){var m=h.getRoot(b),f=b.data.key.children;
	c.level=a;c.tId=b.treeId+"_"+ ++m.zId;c.parentTId=d?d.tId:null;c.open=typeof c.open=="string"?j.eqs(c.open,"true"):!!c.open;c[f]&&c[f].length>0?(c.isParent=!0,c.zAsync=!0):(c.isParent=typeof c.isParent=="string"?j.eqs(c.isParent,"true"):!!c.isParent,c.open=c.isParent&&!b.async.enable?c.open:!1,c.zAsync=!c.isParent);c.isFirstNode=e;c.isLastNode=g;c.getParentNode=function(){return h.getNodeCache(b,c.parentTId)};c.getPreNode=function(){return h.getPreNode(b,c)};c.getNextNode=function(){return h.getNextNode(b,
	c)};c.getIndex=function(){return h.getNodeIndex(b,c)};c.getPath=function(){return h.getNodePath(b,c)};c.isAjaxing=!1;h.fixPIdKeyValue(b,c)}}],u=[function(b){var a=b.target,c=h.getSetting(b.data.treeId),d="",e=null,g="",m="",i=null,n=null,k=null;if(j.eqs(b.type,"mousedown"))m="mousedown";else if(j.eqs(b.type,"mouseup"))m="mouseup";else if(j.eqs(b.type,"contextmenu"))m="contextmenu";else if(j.eqs(b.type,"click"))if(j.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+f.id.SWITCH)!==null)d=j.getNodeMainDom(a).id,
	g="switchNode";else{if(k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+f.id.A}]))d=j.getNodeMainDom(k).id,g="clickNode"}else if(j.eqs(b.type,"dblclick")&&(m="dblclick",k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+f.id.A}])))d=j.getNodeMainDom(k).id,g="switchNode";if(m.length>0&&d.length==0&&(k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+f.id.A}])))d=j.getNodeMainDom(k).id;if(d.length>0)switch(e=h.getNodeCache(c,d),g){case "switchNode":e.isParent?j.eqs(b.type,"click")||j.eqs(b.type,"dblclick")&&
	j.apply(c.view.dblClickExpand,[c.treeId,e],c.view.dblClickExpand)?i=I:g="":g="";break;case "clickNode":i=J}switch(m){case "mousedown":n=K;break;case "mouseup":n=L;break;case "dblclick":n=M;break;case "contextmenu":n=N}return{stop:!1,node:e,nodeEventType:g,nodeEventCallback:i,treeEventType:m,treeEventCallback:n}}],C=[function(b){var a=h.getRoot(b);a||(a={},h.setRoot(b,a));a[b.data.key.children]=[];a.expandTriggerFlag=!1;a.curSelectedList=[];a.noSelection=!0;a.createdNodes=[];a.zId=0;a._ver=(new Date).getTime()}],
	D=[],E=[],F=[],G=[],H=[],h={addNodeCache:function(b,a){h.getCache(b).nodes[h.getNodeCacheId(a.tId)]=a},getNodeCacheId:function(b){return b.substring(b.lastIndexOf("_")+1)},addAfterA:function(b){E.push(b)},addBeforeA:function(b){D.push(b)},addInnerAfterA:function(b){G.push(b)},addInnerBeforeA:function(b){F.push(b)},addInitBind:function(b){y.push(b)},addInitUnBind:function(b){z.push(b)},addInitCache:function(b){A.push(b)},addInitNode:function(b){B.push(b)},addInitProxy:function(b,a){a?u.splice(0,0,
	b):u.push(b)},addInitRoot:function(b){C.push(b)},addNodesData:function(b,a,c,d){var e=b.data.key.children;a[e]?c>=a[e].length&&(c=-1):(a[e]=[],c=-1);if(a[e].length>0&&c===0)a[e][0].isFirstNode=!1,i.setNodeLineIcos(b,a[e][0]);else if(a[e].length>0&&c<0)a[e][a[e].length-1].isLastNode=!1,i.setNodeLineIcos(b,a[e][a[e].length-1]);a.isParent=!0;c<0?a[e]=a[e].concat(d):(b=[c,0].concat(d),a[e].splice.apply(a[e],b))},addSelectedNode:function(b,a){var c=h.getRoot(b);h.isSelectedNode(b,a)||c.curSelectedList.push(a)},
	addCreatedNode:function(b,a){(b.callback.onNodeCreated||b.view.addDiyDom)&&h.getRoot(b).createdNodes.push(a)},addZTreeTools:function(b){H.push(b)},exSetting:function(b){q.extend(!0,O,b)},fixPIdKeyValue:function(b,a){b.data.simpleData.enable&&(a[b.data.simpleData.pIdKey]=a.parentTId?a.getParentNode()[b.data.simpleData.idKey]:b.data.simpleData.rootPId)},getAfterA:function(b,a,c){for(var d=0,e=E.length;d<e;d++)E[d].apply(this,arguments)},getBeforeA:function(b,a,c){for(var d=0,e=D.length;d<e;d++)D[d].apply(this,
	arguments)},getInnerAfterA:function(b,a,c){for(var d=0,e=G.length;d<e;d++)G[d].apply(this,arguments)},getInnerBeforeA:function(b,a,c){for(var d=0,e=F.length;d<e;d++)F[d].apply(this,arguments)},getCache:function(b){return x[b.treeId]},getNodeIndex:function(b,a){if(!a)return null;for(var c=b.data.key.children,d=a.parentTId?a.getParentNode():h.getRoot(b),e=0,g=d[c].length-1;e<=g;e++)if(d[c][e]===a)return e;return-1},getNextNode:function(b,a){if(!a)return null;for(var c=b.data.key.children,d=a.parentTId?
	a.getParentNode():h.getRoot(b),e=0,g=d[c].length-1;e<=g;e++)if(d[c][e]===a)return e==g?null:d[c][e+1];return null},getNodeByParam:function(b,a,c,d){if(!a||!c)return null;for(var e=b.data.key.children,g=0,m=a.length;g<m;g++){if(a[g][c]==d)return a[g];var f=h.getNodeByParam(b,a[g][e],c,d);if(f)return f}return null},getNodeCache:function(b,a){if(!a)return null;var c=x[b.treeId].nodes[h.getNodeCacheId(a)];return c?c:null},getNodeName:function(b,a){return""+a[b.data.key.name]},getNodePath:function(b,a){if(!a)return null;
	var c;(c=a.parentTId?a.getParentNode().getPath():[])&&c.push(a);return c},getNodeTitle:function(b,a){return""+a[b.data.key.title===""?b.data.key.name:b.data.key.title]},getNodes:function(b){return h.getRoot(b)[b.data.key.children]},getNodesByParam:function(b,a,c,d){if(!a||!c)return[];for(var e=b.data.key.children,g=[],f=0,i=a.length;f<i;f++)a[f][c]==d&&g.push(a[f]),g=g.concat(h.getNodesByParam(b,a[f][e],c,d));return g},getNodesByParamFuzzy:function(b,a,c,d){if(!a||!c)return[];for(var e=b.data.key.children,
	g=[],d=d.toLowerCase(),f=0,i=a.length;f<i;f++)typeof a[f][c]=="string"&&a[f][c].toLowerCase().indexOf(d)>-1&&g.push(a[f]),g=g.concat(h.getNodesByParamFuzzy(b,a[f][e],c,d));return g},getNodesByFilter:function(b,a,c,d,e){if(!a)return d?null:[];for(var g=b.data.key.children,f=d?null:[],i=0,n=a.length;i<n;i++){if(j.apply(c,[a[i],e],!1)){if(d)return a[i];f.push(a[i])}var k=h.getNodesByFilter(b,a[i][g],c,d,e);if(d&&k)return k;f=d?k:f.concat(k)}return f},getPreNode:function(b,a){if(!a)return null;for(var c=
	b.data.key.children,d=a.parentTId?a.getParentNode():h.getRoot(b),e=0,g=d[c].length;e<g;e++)if(d[c][e]===a)return e==0?null:d[c][e-1];return null},getRoot:function(b){return b?w[b.treeId]:null},getRoots:function(){return w},getSetting:function(b){return s[b]},getSettings:function(){return s},getZTreeTools:function(b){return(b=this.getRoot(this.getSetting(b)))?b.treeTools:null},initCache:function(b){for(var a=0,c=A.length;a<c;a++)A[a].apply(this,arguments)},initNode:function(b,a,c,d,e,g){for(var f=
	0,h=B.length;f<h;f++)B[f].apply(this,arguments)},initRoot:function(b){for(var a=0,c=C.length;a<c;a++)C[a].apply(this,arguments)},isSelectedNode:function(b,a){for(var c=h.getRoot(b),d=0,e=c.curSelectedList.length;d<e;d++)if(a===c.curSelectedList[d])return!0;return!1},removeNodeCache:function(b,a){var c=b.data.key.children;if(a[c])for(var d=0,e=a[c].length;d<e;d++)h.removeNodeCache(b,a[c][d]);h.getCache(b).nodes[h.getNodeCacheId(a.tId)]=null},removeSelectedNode:function(b,a){for(var c=h.getRoot(b),
	d=0,e=c.curSelectedList.length;d<e;d++)if(a===c.curSelectedList[d]||!h.getNodeCache(b,c.curSelectedList[d].tId))c.curSelectedList.splice(d,1),b.treeObj.trigger(f.event.UNSELECTED,[b.treeId,a]),d--,e--},setCache:function(b,a){x[b.treeId]=a},setRoot:function(b,a){w[b.treeId]=a},setZTreeTools:function(b,a){for(var c=0,d=H.length;c<d;c++)H[c].apply(this,arguments)},transformToArrayFormat:function(b,a){if(!a)return[];var c=b.data.key.children,d=[];if(j.isArray(a))for(var e=0,g=a.length;e<g;e++)d.push(a[e]),
	a[e][c]&&(d=d.concat(h.transformToArrayFormat(b,a[e][c])));else d.push(a),a[c]&&(d=d.concat(h.transformToArrayFormat(b,a[c])));return d},transformTozTreeFormat:function(b,a){var c,d,e=b.data.simpleData.idKey,g=b.data.simpleData.pIdKey,f=b.data.key.children;if(!e||e==""||!a)return[];if(j.isArray(a)){var h=[],i={};for(c=0,d=a.length;c<d;c++)i[a[c][e]]=a[c];for(c=0,d=a.length;c<d;c++)i[a[c][g]]&&a[c][e]!=a[c][g]?(i[a[c][g]][f]||(i[a[c][g]][f]=[]),i[a[c][g]][f].push(a[c])):h.push(a[c]);return h}else return[a]}},
	l={bindEvent:function(b){for(var a=0,c=y.length;a<c;a++)y[a].apply(this,arguments)},unbindEvent:function(b){for(var a=0,c=z.length;a<c;a++)z[a].apply(this,arguments)},bindTree:function(b){var a={treeId:b.treeId},c=b.treeObj;b.view.txtSelectedEnable||c.bind("selectstart",v).css({"-moz-user-select":"-moz-none"});c.bind("click",a,l.proxy);c.bind("dblclick",a,l.proxy);c.bind("mouseover",a,l.proxy);c.bind("mouseout",a,l.proxy);c.bind("mousedown",a,l.proxy);c.bind("mouseup",a,l.proxy);c.bind("contextmenu",
	a,l.proxy)},unbindTree:function(b){b.treeObj.unbind("selectstart",v).unbind("click",l.proxy).unbind("dblclick",l.proxy).unbind("mouseover",l.proxy).unbind("mouseout",l.proxy).unbind("mousedown",l.proxy).unbind("mouseup",l.proxy).unbind("contextmenu",l.proxy)},doProxy:function(b){for(var a=[],c=0,d=u.length;c<d;c++){var e=u[c].apply(this,arguments);a.push(e);if(e.stop)break}return a},proxy:function(b){var a=h.getSetting(b.data.treeId);if(!j.uCanDo(a,b))return!0;for(var a=l.doProxy(b),c=!0,d=0,e=a.length;d<
	e;d++){var g=a[d];g.nodeEventCallback&&(c=g.nodeEventCallback.apply(g,[b,g.node])&&c);g.treeEventCallback&&(c=g.treeEventCallback.apply(g,[b,g.node])&&c)}return c}};I=function(b,a){var c=h.getSetting(b.data.treeId);if(a.open){if(j.apply(c.callback.beforeCollapse,[c.treeId,a],!0)==!1)return!0}else if(j.apply(c.callback.beforeExpand,[c.treeId,a],!0)==!1)return!0;h.getRoot(c).expandTriggerFlag=!0;i.switchNode(c,a);return!0};J=function(b,a){var c=h.getSetting(b.data.treeId),d=c.view.autoCancelSelected&&
	(b.ctrlKey||b.metaKey)&&h.isSelectedNode(c,a)?0:c.view.autoCancelSelected&&(b.ctrlKey||b.metaKey)&&c.view.selectedMulti?2:1;if(j.apply(c.callback.beforeClick,[c.treeId,a,d],!0)==!1)return!0;d===0?i.cancelPreSelectedNode(c,a):i.selectNode(c,a,d===2);c.treeObj.trigger(f.event.CLICK,[b,c.treeId,a,d]);return!0};K=function(b,a){var c=h.getSetting(b.data.treeId);j.apply(c.callback.beforeMouseDown,[c.treeId,a],!0)&&j.apply(c.callback.onMouseDown,[b,c.treeId,a]);return!0};L=function(b,a){var c=h.getSetting(b.data.treeId);
	j.apply(c.callback.beforeMouseUp,[c.treeId,a],!0)&&j.apply(c.callback.onMouseUp,[b,c.treeId,a]);return!0};M=function(b,a){var c=h.getSetting(b.data.treeId);j.apply(c.callback.beforeDblClick,[c.treeId,a],!0)&&j.apply(c.callback.onDblClick,[b,c.treeId,a]);return!0};N=function(b,a){var c=h.getSetting(b.data.treeId);j.apply(c.callback.beforeRightClick,[c.treeId,a],!0)&&j.apply(c.callback.onRightClick,[b,c.treeId,a]);return typeof c.callback.onRightClick!="function"};v=function(b){b=b.originalEvent.srcElement.nodeName.toLowerCase();
	return b==="input"||b==="textarea"};var j={apply:function(b,a,c){return typeof b=="function"?b.apply(P,a?a:[]):c},canAsync:function(b,a){var c=b.data.key.children;return b.async.enable&&a&&a.isParent&&!(a.zAsync||a[c]&&a[c].length>0)},clone:function(b){if(b===null)return null;var a=j.isArray(b)?[]:{},c;for(c in b)a[c]=b[c]instanceof Date?new Date(b[c].getTime()):typeof b[c]==="object"?j.clone(b[c]):b[c];return a},eqs:function(b,a){return b.toLowerCase()===a.toLowerCase()},isArray:function(b){return Object.prototype.toString.apply(b)===
	"[object Array]"},$:function(b,a,c){a&&typeof a!="string"&&(c=a,a="");return typeof b=="string"?q(b,c?c.treeObj.get(0).ownerDocument:null):q("#"+b.tId+a,c?c.treeObj:null)},getMDom:function(b,a,c){if(!a)return null;for(;a&&a.id!==b.treeId;){for(var d=0,e=c.length;a.tagName&&d<e;d++)if(j.eqs(a.tagName,c[d].tagName)&&a.getAttribute(c[d].attrName)!==null)return a;a=a.parentNode}return null},getNodeMainDom:function(b){return q(b).parent("li").get(0)||q(b).parentsUntil("li").parent().get(0)},isChildOrSelf:function(b,
	a){return q(b).closest("#"+a).length>0},uCanDo:function(){return!0}},i={addNodes:function(b,a,c,d,e){if(!b.data.keep.leaf||!a||a.isParent)if(j.isArray(d)||(d=[d]),b.data.simpleData.enable&&(d=h.transformTozTreeFormat(b,d)),a){var g=k(a,f.id.SWITCH,b),m=k(a,f.id.ICON,b),o=k(a,f.id.UL,b);if(!a.open)i.replaceSwitchClass(a,g,f.folder.CLOSE),i.replaceIcoClass(a,m,f.folder.CLOSE),a.open=!1,o.css({display:"none"});h.addNodesData(b,a,c,d);i.createNodes(b,a.level+1,d,a,c);e||i.expandCollapseParentNode(b,a,
	!0)}else h.addNodesData(b,h.getRoot(b),c,d),i.createNodes(b,0,d,null,c)},appendNodes:function(b,a,c,d,e,g,f){if(!c)return[];var j=[],k=b.data.key.children,l=(d?d:h.getRoot(b))[k],r,Q;if(!l||e>=l.length)e=-1;for(var t=0,q=c.length;t<q;t++){var p=c[t];g&&(r=(e===0||l.length==c.length)&&t==0,Q=e<0&&t==c.length-1,h.initNode(b,a,p,d,r,Q,f),h.addNodeCache(b,p));r=[];p[k]&&p[k].length>0&&(r=i.appendNodes(b,a+1,p[k],p,-1,g,f&&p.open));f&&(i.makeDOMNodeMainBefore(j,b,p),i.makeDOMNodeLine(j,b,p),h.getBeforeA(b,
	p,j),i.makeDOMNodeNameBefore(j,b,p),h.getInnerBeforeA(b,p,j),i.makeDOMNodeIcon(j,b,p),h.getInnerAfterA(b,p,j),i.makeDOMNodeNameAfter(j,b,p),h.getAfterA(b,p,j),p.isParent&&p.open&&i.makeUlHtml(b,p,j,r.join("")),i.makeDOMNodeMainAfter(j,b,p),h.addCreatedNode(b,p))}return j},appendParentULDom:function(b,a){var c=[],d=k(a,b);!d.get(0)&&a.parentTId&&(i.appendParentULDom(b,a.getParentNode()),d=k(a,b));var e=k(a,f.id.UL,b);e.get(0)&&e.remove();e=i.appendNodes(b,a.level+1,a[b.data.key.children],a,-1,!1,!0);
	i.makeUlHtml(b,a,c,e.join(""));d.append(c.join(""))},asyncNode:function(b,a,c,d){var e,g;if(a&&!a.isParent)return j.apply(d),!1;else if(a&&a.isAjaxing)return!1;else if(j.apply(b.callback.beforeAsync,[b.treeId,a],!0)==!1)return j.apply(d),!1;if(a)a.isAjaxing=!0,k(a,f.id.ICON,b).attr({style:"","class":f.className.BUTTON+" "+f.className.ICO_LOADING});var m={};for(e=0,g=b.async.autoParam.length;a&&e<g;e++){var o=b.async.autoParam[e].split("="),n=o;o.length>1&&(n=o[1],o=o[0]);m[n]=a[o]}if(j.isArray(b.async.otherParam))for(e=
	0,g=b.async.otherParam.length;e<g;e+=2)m[b.async.otherParam[e]]=b.async.otherParam[e+1];else for(var l in b.async.otherParam)m[l]=b.async.otherParam[l];var r=h.getRoot(b)._ver;q.ajax({contentType:b.async.contentType,cache:!1,type:b.async.type,url:j.apply(b.async.url,[b.treeId,a],b.async.url),data:m,dataType:b.async.dataType,success:function(e){if(r==h.getRoot(b)._ver){var g=[];try{g=!e||e.length==0?[]:typeof e=="string"?eval("("+e+")"):e}catch(m){g=e}if(a)a.isAjaxing=null,a.zAsync=!0;i.setNodeLineIcos(b,
	a);g&&g!==""?(g=j.apply(b.async.dataFilter,[b.treeId,a,g],g),i.addNodes(b,a,-1,g?j.clone(g):[],!!c)):i.addNodes(b,a,-1,[],!!c);b.treeObj.trigger(f.event.ASYNC_SUCCESS,[b.treeId,a,e]);j.apply(d)}},error:function(c,d,e){if(r==h.getRoot(b)._ver){if(a)a.isAjaxing=null;i.setNodeLineIcos(b,a);b.treeObj.trigger(f.event.ASYNC_ERROR,[b.treeId,a,c,d,e])}}});return!0},cancelPreSelectedNode:function(b,a,c){var d=h.getRoot(b).curSelectedList,e,g;for(e=d.length-1;e>=0;e--)if(g=d[e],a===g||!a&&(!c||c!==g))if(k(g,
	f.id.A,b).removeClass(f.node.CURSELECTED),a){h.removeSelectedNode(b,a);break}else d.splice(e,1),b.treeObj.trigger(f.event.UNSELECTED,[b.treeId,g])},createNodeCallback:function(b){if(b.callback.onNodeCreated||b.view.addDiyDom)for(var a=h.getRoot(b);a.createdNodes.length>0;){var c=a.createdNodes.shift();j.apply(b.view.addDiyDom,[b.treeId,c]);b.callback.onNodeCreated&&b.treeObj.trigger(f.event.NODECREATED,[b.treeId,c])}},createNodes:function(b,a,c,d,e){if(c&&c.length!=0){var g=h.getRoot(b),j=b.data.key.children,
	j=!d||d.open||!!k(d[j][0],b).get(0);g.createdNodes=[];var a=i.appendNodes(b,a,c,d,e,!0,j),o,n;d?(d=k(d,f.id.UL,b),d.get(0)&&(o=d)):o=b.treeObj;o&&(e>=0&&(n=o.children()[e]),e>=0&&n?q(n).before(a.join("")):o.append(a.join("")));i.createNodeCallback(b)}},destroy:function(b){b&&(h.initCache(b),h.initRoot(b),l.unbindTree(b),l.unbindEvent(b),b.treeObj.empty(),delete s[b.treeId])},expandCollapseNode:function(b,a,c,d,e){var g=h.getRoot(b),m=b.data.key.children,o;if(a){if(g.expandTriggerFlag)o=e,e=function(){o&&
	o();a.open?b.treeObj.trigger(f.event.EXPAND,[b.treeId,a]):b.treeObj.trigger(f.event.COLLAPSE,[b.treeId,a])},g.expandTriggerFlag=!1;if(!a.open&&a.isParent&&(!k(a,f.id.UL,b).get(0)||a[m]&&a[m].length>0&&!k(a[m][0],b).get(0)))i.appendParentULDom(b,a),i.createNodeCallback(b);if(a.open==c)j.apply(e,[]);else{var c=k(a,f.id.UL,b),g=k(a,f.id.SWITCH,b),n=k(a,f.id.ICON,b);a.isParent?(a.open=!a.open,a.iconOpen&&a.iconClose&&n.attr("style",i.makeNodeIcoStyle(b,a)),a.open?(i.replaceSwitchClass(a,g,f.folder.OPEN),
	i.replaceIcoClass(a,n,f.folder.OPEN),d==!1||b.view.expandSpeed==""?(c.show(),j.apply(e,[])):a[m]&&a[m].length>0?c.slideDown(b.view.expandSpeed,e):(c.show(),j.apply(e,[]))):(i.replaceSwitchClass(a,g,f.folder.CLOSE),i.replaceIcoClass(a,n,f.folder.CLOSE),d==!1||b.view.expandSpeed==""||!(a[m]&&a[m].length>0)?(c.hide(),j.apply(e,[])):c.slideUp(b.view.expandSpeed,e))):j.apply(e,[])}}else j.apply(e,[])},expandCollapseParentNode:function(b,a,c,d,e){a&&(a.parentTId?(i.expandCollapseNode(b,a,c,d),a.parentTId&&
	i.expandCollapseParentNode(b,a.getParentNode(),c,d,e)):i.expandCollapseNode(b,a,c,d,e))},expandCollapseSonNode:function(b,a,c,d,e){var g=h.getRoot(b),f=b.data.key.children,g=a?a[f]:g[f],f=a?!1:d,j=h.getRoot(b).expandTriggerFlag;h.getRoot(b).expandTriggerFlag=!1;if(g)for(var k=0,l=g.length;k<l;k++)g[k]&&i.expandCollapseSonNode(b,g[k],c,f);h.getRoot(b).expandTriggerFlag=j;i.expandCollapseNode(b,a,c,d,e)},isSelectedNode:function(b,a){if(!a)return!1;var c=h.getRoot(b).curSelectedList,d;for(d=c.length-
	1;d>=0;d--)if(a===c[d])return!0;return!1},makeDOMNodeIcon:function(b,a,c){var d=h.getNodeName(a,c),d=a.view.nameIsHTML?d:d.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");b.push("<span id='",c.tId,f.id.ICON,"' title='' treeNode",f.id.ICON," class='",i.makeNodeIcoClass(a,c),"' style='",i.makeNodeIcoStyle(a,c),"'></span><span id='",c.tId,f.id.SPAN,"' class='",f.className.NAME,"'>",d,"</span>")},makeDOMNodeLine:function(b,a,c){b.push("<span id='",c.tId,f.id.SWITCH,"' title='' class='",
	i.makeNodeLineClass(a,c),"' treeNode",f.id.SWITCH,"></span>")},makeDOMNodeMainAfter:function(b){b.push("</li>")},makeDOMNodeMainBefore:function(b,a,c){b.push("<li id='",c.tId,"' class='",f.className.LEVEL,c.level,"' tabindex='0' hidefocus='true' treenode>")},makeDOMNodeNameAfter:function(b){b.push("</a>")},makeDOMNodeNameBefore:function(b,a,c){var d=h.getNodeTitle(a,c),e=i.makeNodeUrl(a,c),g=i.makeNodeFontCss(a,c),m=[],k;for(k in g)m.push(k,":",g[k],";");b.push("<a id='",c.tId,f.id.A,"' class='",
	f.className.LEVEL,c.level,"' treeNode",f.id.A,' onclick="',c.click||"",'" ',e!=null&&e.length>0?"href='"+e+"'":""," target='",i.makeNodeTarget(c),"' style='",m.join(""),"'");j.apply(a.view.showTitle,[a.treeId,c],a.view.showTitle)&&d&&b.push("title='",d.replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"'");b.push(">")},makeNodeFontCss:function(b,a){var c=j.apply(b.view.fontCss,[b.treeId,a],b.view.fontCss);return c&&typeof c!="function"?c:{}},makeNodeIcoClass:function(b,a){var c=["ico"];
	a.isAjaxing||(c[0]=(a.iconSkin?a.iconSkin+"_":"")+c[0],a.isParent?c.push(a.open?f.folder.OPEN:f.folder.CLOSE):c.push(f.folder.DOCU));return f.className.BUTTON+" "+c.join("_")},makeNodeIcoStyle:function(b,a){var c=[];if(!a.isAjaxing){var d=a.isParent&&a.iconOpen&&a.iconClose?a.open?a.iconOpen:a.iconClose:a[b.data.key.icon];d&&c.push("background:url(",d,") 0 0 no-repeat;");(b.view.showIcon==!1||!j.apply(b.view.showIcon,[b.treeId,a],!0))&&c.push("width:0px;height:0px;")}return c.join("")},makeNodeLineClass:function(b,
	a){var c=[];b.view.showLine?a.level==0&&a.isFirstNode&&a.isLastNode?c.push(f.line.ROOT):a.level==0&&a.isFirstNode?c.push(f.line.ROOTS):a.isLastNode?c.push(f.line.BOTTOM):c.push(f.line.CENTER):c.push(f.line.NOLINE);a.isParent?c.push(a.open?f.folder.OPEN:f.folder.CLOSE):c.push(f.folder.DOCU);return i.makeNodeLineClassEx(a)+c.join("_")},makeNodeLineClassEx:function(b){return f.className.BUTTON+" "+f.className.LEVEL+b.level+" "+f.className.SWITCH+" "},makeNodeTarget:function(b){return b.target||"_blank"},
	makeNodeUrl:function(b,a){var c=b.data.key.url;return a[c]?a[c]:null},makeUlHtml:function(b,a,c,d){c.push("<ul id='",a.tId,f.id.UL,"' class='",f.className.LEVEL,a.level," ",i.makeUlLineClass(b,a),"' style='display:",a.open?"block":"none","'>");c.push(d);c.push("</ul>")},makeUlLineClass:function(b,a){return b.view.showLine&&!a.isLastNode?f.line.LINE:""},removeChildNodes:function(b,a){if(a){var c=b.data.key.children,d=a[c];if(d){for(var e=0,g=d.length;e<g;e++)h.removeNodeCache(b,d[e]);h.removeSelectedNode(b);
	delete a[c];b.data.keep.parent?k(a,f.id.UL,b).empty():(a.isParent=!1,a.open=!1,c=k(a,f.id.SWITCH,b),d=k(a,f.id.ICON,b),i.replaceSwitchClass(a,c,f.folder.DOCU),i.replaceIcoClass(a,d,f.folder.DOCU),k(a,f.id.UL,b).remove())}}},scrollIntoView:function(b){if(b)if(b.scrollIntoViewIfNeeded)b.scrollIntoViewIfNeeded();else if(b.scrollIntoView)b.scrollIntoView(!1);else try{b.focus().blur()}catch(a){}},setFirstNode:function(b,a){var c=b.data.key.children;if(a[c].length>0)a[c][0].isFirstNode=!0},setLastNode:function(b,
	a){var c=b.data.key.children,d=a[c].length;if(d>0)a[c][d-1].isLastNode=!0},removeNode:function(b,a){var c=h.getRoot(b),d=b.data.key.children,e=a.parentTId?a.getParentNode():c;a.isFirstNode=!1;a.isLastNode=!1;a.getPreNode=function(){return null};a.getNextNode=function(){return null};if(h.getNodeCache(b,a.tId)){k(a,b).remove();h.removeNodeCache(b,a);h.removeSelectedNode(b,a);for(var g=0,j=e[d].length;g<j;g++)if(e[d][g].tId==a.tId){e[d].splice(g,1);break}i.setFirstNode(b,e);i.setLastNode(b,e);var o,
	g=e[d].length;if(!b.data.keep.parent&&g==0)e.isParent=!1,e.open=!1,g=k(e,f.id.UL,b),j=k(e,f.id.SWITCH,b),o=k(e,f.id.ICON,b),i.replaceSwitchClass(e,j,f.folder.DOCU),i.replaceIcoClass(e,o,f.folder.DOCU),g.css("display","none");else if(b.view.showLine&&g>0){var n=e[d][g-1],g=k(n,f.id.UL,b),j=k(n,f.id.SWITCH,b);o=k(n,f.id.ICON,b);e==c?e[d].length==1?i.replaceSwitchClass(n,j,f.line.ROOT):(c=k(e[d][0],f.id.SWITCH,b),i.replaceSwitchClass(e[d][0],c,f.line.ROOTS),i.replaceSwitchClass(n,j,f.line.BOTTOM)):i.replaceSwitchClass(n,
	j,f.line.BOTTOM);g.removeClass(f.line.LINE)}}},replaceIcoClass:function(b,a,c){if(a&&!b.isAjaxing&&(b=a.attr("class"),b!=void 0)){b=b.split("_");switch(c){case f.folder.OPEN:case f.folder.CLOSE:case f.folder.DOCU:b[b.length-1]=c}a.attr("class",b.join("_"))}},replaceSwitchClass:function(b,a,c){if(a){var d=a.attr("class");if(d!=void 0){d=d.split("_");switch(c){case f.line.ROOT:case f.line.ROOTS:case f.line.CENTER:case f.line.BOTTOM:case f.line.NOLINE:d[0]=i.makeNodeLineClassEx(b)+c;break;case f.folder.OPEN:case f.folder.CLOSE:case f.folder.DOCU:d[1]=
	c}a.attr("class",d.join("_"));c!==f.folder.DOCU?a.removeAttr("disabled"):a.attr("disabled","disabled")}}},selectNode:function(b,a,c){c||i.cancelPreSelectedNode(b,null,a);k(a,f.id.A,b).addClass(f.node.CURSELECTED);h.addSelectedNode(b,a);b.treeObj.trigger(f.event.SELECTED,[b.treeId,a])},setNodeFontCss:function(b,a){var c=k(a,f.id.A,b),d=i.makeNodeFontCss(b,a);d&&c.css(d)},setNodeLineIcos:function(b,a){if(a){var c=k(a,f.id.SWITCH,b),d=k(a,f.id.UL,b),e=k(a,f.id.ICON,b),g=i.makeUlLineClass(b,a);g.length==
	0?d.removeClass(f.line.LINE):d.addClass(g);c.attr("class",i.makeNodeLineClass(b,a));a.isParent?c.removeAttr("disabled"):c.attr("disabled","disabled");e.removeAttr("style");e.attr("style",i.makeNodeIcoStyle(b,a));e.attr("class",i.makeNodeIcoClass(b,a))}},setNodeName:function(b,a){var c=h.getNodeTitle(b,a),d=k(a,f.id.SPAN,b);d.empty();b.view.nameIsHTML?d.html(h.getNodeName(b,a)):d.text(h.getNodeName(b,a));j.apply(b.view.showTitle,[b.treeId,a],b.view.showTitle)&&k(a,f.id.A,b).attr("title",!c?"":c)},
	setNodeTarget:function(b,a){k(a,f.id.A,b).attr("target",i.makeNodeTarget(a))},setNodeUrl:function(b,a){var c=k(a,f.id.A,b),d=i.makeNodeUrl(b,a);d==null||d.length==0?c.removeAttr("href"):c.attr("href",d)},switchNode:function(b,a){a.open||!j.canAsync(b,a)?i.expandCollapseNode(b,a,!a.open):b.async.enable?i.asyncNode(b,a)||i.expandCollapseNode(b,a,!a.open):a&&i.expandCollapseNode(b,a,!a.open)}};q.fn.zTree={consts:{className:{BUTTON:"button",LEVEL:"level",ICO_LOADING:"ico_loading",SWITCH:"switch",NAME:"node_name"},
	event:{NODECREATED:"ztree_nodeCreated",CLICK:"ztree_click",EXPAND:"ztree_expand",COLLAPSE:"ztree_collapse",ASYNC_SUCCESS:"ztree_async_success",ASYNC_ERROR:"ztree_async_error",REMOVE:"ztree_remove",SELECTED:"ztree_selected",UNSELECTED:"ztree_unselected"},id:{A:"_a",ICON:"_ico",SPAN:"_span",SWITCH:"_switch",UL:"_ul"},line:{ROOT:"root",ROOTS:"roots",CENTER:"center",BOTTOM:"bottom",NOLINE:"noline",LINE:"line"},folder:{OPEN:"open",CLOSE:"close",DOCU:"docu"},node:{CURSELECTED:"curSelectedNode"}},_z:{tools:j,
	view:i,event:l,data:h},getZTreeObj:function(b){return(b=h.getZTreeTools(b))?b:null},destroy:function(b){if(b&&b.length>0)i.destroy(h.getSetting(b));else for(var a in s)i.destroy(s[a])},init:function(b,a,c){var d=j.clone(O);q.extend(!0,d,a);d.treeId=b.attr("id");d.treeObj=b;d.treeObj.empty();s[d.treeId]=d;if(typeof document.body.style.maxHeight==="undefined")d.view.expandSpeed="";h.initRoot(d);b=h.getRoot(d);a=d.data.key.children;c=c?j.clone(j.isArray(c)?c:[c]):[];b[a]=d.data.simpleData.enable?h.transformTozTreeFormat(d,
	c):c;h.initCache(d);l.unbindTree(d);l.bindTree(d);l.unbindEvent(d);l.bindEvent(d);c={setting:d,addNodes:function(a,b,c,f){function h(){i.addNodes(d,a,b,l,f==!0)}a||(a=null);if(a&&!a.isParent&&d.data.keep.leaf)return null;var k=parseInt(b,10);isNaN(k)?(f=!!c,c=b,b=-1):b=k;if(!c)return null;var l=j.clone(j.isArray(c)?c:[c]);j.canAsync(d,a)?i.asyncNode(d,a,f,h):h();return l},cancelSelectedNode:function(a){i.cancelPreSelectedNode(d,a)},destroy:function(){i.destroy(d)},expandAll:function(a){a=!!a;i.expandCollapseSonNode(d,
	null,a,!0);return a},expandNode:function(a,b,c,f,n){function l(){var b=k(a,d).get(0);b&&f!==!1&&i.scrollIntoView(b)}if(!a||!a.isParent)return null;b!==!0&&b!==!1&&(b=!a.open);if((n=!!n)&&b&&j.apply(d.callback.beforeExpand,[d.treeId,a],!0)==!1)return null;else if(n&&!b&&j.apply(d.callback.beforeCollapse,[d.treeId,a],!0)==!1)return null;b&&a.parentTId&&i.expandCollapseParentNode(d,a.getParentNode(),b,!1);if(b===a.open&&!c)return null;h.getRoot(d).expandTriggerFlag=n;!j.canAsync(d,a)&&c?i.expandCollapseSonNode(d,
	a,b,!0,l):(a.open=!b,i.switchNode(this.setting,a),l());return b},getNodes:function(){return h.getNodes(d)},getNodeByParam:function(a,b,c){return!a?null:h.getNodeByParam(d,c?c[d.data.key.children]:h.getNodes(d),a,b)},getNodeByTId:function(a){return h.getNodeCache(d,a)},getNodesByParam:function(a,b,c){return!a?null:h.getNodesByParam(d,c?c[d.data.key.children]:h.getNodes(d),a,b)},getNodesByParamFuzzy:function(a,b,c){return!a?null:h.getNodesByParamFuzzy(d,c?c[d.data.key.children]:h.getNodes(d),a,b)},
	getNodesByFilter:function(a,b,c,f){b=!!b;return!a||typeof a!="function"?b?null:[]:h.getNodesByFilter(d,c?c[d.data.key.children]:h.getNodes(d),a,b,f)},getNodeIndex:function(a){if(!a)return null;for(var b=d.data.key.children,c=a.parentTId?a.getParentNode():h.getRoot(d),f=0,i=c[b].length;f<i;f++)if(c[b][f]==a)return f;return-1},getSelectedNodes:function(){for(var a=[],b=h.getRoot(d).curSelectedList,c=0,f=b.length;c<f;c++)a.push(b[c]);return a},isSelectedNode:function(a){return h.isSelectedNode(d,a)},
	reAsyncChildNodes:function(a,b,c){if(this.setting.async.enable){var j=!a;j&&(a=h.getRoot(d));if(b=="refresh"){for(var b=this.setting.data.key.children,l=0,q=a[b]?a[b].length:0;l<q;l++)h.removeNodeCache(d,a[b][l]);h.removeSelectedNode(d);a[b]=[];j?this.setting.treeObj.empty():k(a,f.id.UL,d).empty()}i.asyncNode(this.setting,j?null:a,!!c)}},refresh:function(){this.setting.treeObj.empty();var a=h.getRoot(d),b=a[d.data.key.children];h.initRoot(d);a[d.data.key.children]=b;h.initCache(d);i.createNodes(d,
	0,a[d.data.key.children],null,-1)},removeChildNodes:function(a){if(!a)return null;var b=a[d.data.key.children];i.removeChildNodes(d,a);return b?b:null},removeNode:function(a,b){a&&(b=!!b,b&&j.apply(d.callback.beforeRemove,[d.treeId,a],!0)==!1||(i.removeNode(d,a),b&&this.setting.treeObj.trigger(f.event.REMOVE,[d.treeId,a])))},selectNode:function(a,b,c){function f(){if(!c){var b=k(a,d).get(0);i.scrollIntoView(b)}}if(a&&j.uCanDo(d)){b=d.view.selectedMulti&&b;if(a.parentTId)i.expandCollapseParentNode(d,
	a.getParentNode(),!0,!1,f);else if(!c)try{k(a,d).focus().blur()}catch(h){}i.selectNode(d,a,b)}},transformTozTreeNodes:function(a){return h.transformTozTreeFormat(d,a)},transformToArray:function(a){return h.transformToArrayFormat(d,a)},updateNode:function(a){a&&k(a,d).get(0)&&j.uCanDo(d)&&(i.setNodeName(d,a),i.setNodeTarget(d,a),i.setNodeUrl(d,a),i.setNodeLineIcos(d,a),i.setNodeFontCss(d,a))}};b.treeTools=c;h.setZTreeTools(d,c);b[a]&&b[a].length>0?i.createNodes(d,0,b[a],null,-1):d.async.enable&&d.async.url&&
	d.async.url!==""&&i.asyncNode(d);return c}};var P=q.fn.zTree,k=j.$,f=P.consts})(jQuery);

	/*
	 * JQuery zTree excheck v3.5.24
	 * http://zTree.me/
	 *
	 * Copyright (c) 2010 Hunter.z
	 *
	 * Licensed same as jquery - MIT License
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * email: hunter.z@263.net
	 * Date: 2016-06-06
	 */
	(function(m){var p,q,r,o={event:{CHECK:"ztree_check"},id:{CHECK:"_check"},checkbox:{STYLE:"checkbox",DEFAULT:"chk",DISABLED:"disable",FALSE:"false",TRUE:"true",FULL:"full",PART:"part",FOCUS:"focus"},radio:{STYLE:"radio",TYPE_ALL:"all",TYPE_LEVEL:"level"}},v={check:{enable:!1,autoCheckTrigger:!1,chkStyle:o.checkbox.STYLE,nocheckInherit:!1,chkDisabledInherit:!1,radioType:o.radio.TYPE_LEVEL,chkboxType:{Y:"ps",N:"ps"}},data:{key:{checked:"checked"}},callback:{beforeCheck:null,onCheck:null}};p=function(c,
	a){if(a.chkDisabled===!0)return!1;var b=g.getSetting(c.data.treeId),d=b.data.key.checked;if(k.apply(b.callback.beforeCheck,[b.treeId,a],!0)==!1)return!0;a[d]=!a[d];e.checkNodeRelation(b,a);d=n(a,j.id.CHECK,b);e.setChkClass(b,d,a);e.repairParentChkClassWithSelf(b,a);b.treeObj.trigger(j.event.CHECK,[c,b.treeId,a]);return!0};q=function(c,a){if(a.chkDisabled===!0)return!1;var b=g.getSetting(c.data.treeId),d=n(a,j.id.CHECK,b);a.check_Focus=!0;e.setChkClass(b,d,a);return!0};r=function(c,a){if(a.chkDisabled===
	!0)return!1;var b=g.getSetting(c.data.treeId),d=n(a,j.id.CHECK,b);a.check_Focus=!1;e.setChkClass(b,d,a);return!0};m.extend(!0,m.fn.zTree.consts,o);m.extend(!0,m.fn.zTree._z,{tools:{},view:{checkNodeRelation:function(c,a){var b,d,h,i=c.data.key.children,l=c.data.key.checked;b=j.radio;if(c.check.chkStyle==b.STYLE){var f=g.getRadioCheckedList(c);if(a[l])if(c.check.radioType==b.TYPE_ALL){for(d=f.length-1;d>=0;d--)b=f[d],b[l]&&b!=a&&(b[l]=!1,f.splice(d,1),e.setChkClass(c,n(b,j.id.CHECK,c),b),b.parentTId!=
	a.parentTId&&e.repairParentChkClassWithSelf(c,b));f.push(a)}else{f=a.parentTId?a.getParentNode():g.getRoot(c);for(d=0,h=f[i].length;d<h;d++)b=f[i][d],b[l]&&b!=a&&(b[l]=!1,e.setChkClass(c,n(b,j.id.CHECK,c),b))}else if(c.check.radioType==b.TYPE_ALL)for(d=0,h=f.length;d<h;d++)if(a==f[d]){f.splice(d,1);break}}else a[l]&&(!a[i]||a[i].length==0||c.check.chkboxType.Y.indexOf("s")>-1)&&e.setSonNodeCheckBox(c,a,!0),!a[l]&&(!a[i]||a[i].length==0||c.check.chkboxType.N.indexOf("s")>-1)&&e.setSonNodeCheckBox(c,
	a,!1),a[l]&&c.check.chkboxType.Y.indexOf("p")>-1&&e.setParentNodeCheckBox(c,a,!0),!a[l]&&c.check.chkboxType.N.indexOf("p")>-1&&e.setParentNodeCheckBox(c,a,!1)},makeChkClass:function(c,a){var b=c.data.key.checked,d=j.checkbox,h=j.radio,i="",i=a.chkDisabled===!0?d.DISABLED:a.halfCheck?d.PART:c.check.chkStyle==h.STYLE?a.check_Child_State<1?d.FULL:d.PART:a[b]?a.check_Child_State===2||a.check_Child_State===-1?d.FULL:d.PART:a.check_Child_State<1?d.FULL:d.PART,b=c.check.chkStyle+"_"+(a[b]?d.TRUE:d.FALSE)+
	"_"+i,b=a.check_Focus&&a.chkDisabled!==!0?b+"_"+d.FOCUS:b;return j.className.BUTTON+" "+d.DEFAULT+" "+b},repairAllChk:function(c,a){if(c.check.enable&&c.check.chkStyle===j.checkbox.STYLE)for(var b=c.data.key.checked,d=c.data.key.children,h=g.getRoot(c),i=0,l=h[d].length;i<l;i++){var f=h[d][i];f.nocheck!==!0&&f.chkDisabled!==!0&&(f[b]=a);e.setSonNodeCheckBox(c,f,a)}},repairChkClass:function(c,a){if(a&&(g.makeChkFlag(c,a),a.nocheck!==!0)){var b=n(a,j.id.CHECK,c);e.setChkClass(c,b,a)}},repairParentChkClass:function(c,
	a){if(a&&a.parentTId){var b=a.getParentNode();e.repairChkClass(c,b);e.repairParentChkClass(c,b)}},repairParentChkClassWithSelf:function(c,a){if(a){var b=c.data.key.children;a[b]&&a[b].length>0?e.repairParentChkClass(c,a[b][0]):e.repairParentChkClass(c,a)}},repairSonChkDisabled:function(c,a,b,d){if(a){var h=c.data.key.children;if(a.chkDisabled!=b)a.chkDisabled=b;e.repairChkClass(c,a);if(a[h]&&d)for(var i=0,l=a[h].length;i<l;i++)e.repairSonChkDisabled(c,a[h][i],b,d)}},repairParentChkDisabled:function(c,
	a,b,d){if(a){if(a.chkDisabled!=b&&d)a.chkDisabled=b;e.repairChkClass(c,a);e.repairParentChkDisabled(c,a.getParentNode(),b,d)}},setChkClass:function(c,a,b){a&&(b.nocheck===!0?a.hide():a.show(),a.attr("class",e.makeChkClass(c,b)))},setParentNodeCheckBox:function(c,a,b,d){var h=c.data.key.children,i=c.data.key.checked,l=n(a,j.id.CHECK,c);d||(d=a);g.makeChkFlag(c,a);a.nocheck!==!0&&a.chkDisabled!==!0&&(a[i]=b,e.setChkClass(c,l,a),c.check.autoCheckTrigger&&a!=d&&c.treeObj.trigger(j.event.CHECK,[null,c.treeId,
	a]));if(a.parentTId){l=!0;if(!b)for(var h=a.getParentNode()[h],f=0,k=h.length;f<k;f++)if(h[f].nocheck!==!0&&h[f].chkDisabled!==!0&&h[f][i]||(h[f].nocheck===!0||h[f].chkDisabled===!0)&&h[f].check_Child_State>0){l=!1;break}l&&e.setParentNodeCheckBox(c,a.getParentNode(),b,d)}},setSonNodeCheckBox:function(c,a,b,d){if(a){var h=c.data.key.children,i=c.data.key.checked,l=n(a,j.id.CHECK,c);d||(d=a);var f=!1;if(a[h])for(var k=0,m=a[h].length;k<m;k++){var o=a[h][k];e.setSonNodeCheckBox(c,o,b,d);o.chkDisabled===
	!0&&(f=!0)}if(a!=g.getRoot(c)&&a.chkDisabled!==!0){f&&a.nocheck!==!0&&g.makeChkFlag(c,a);if(a.nocheck!==!0&&a.chkDisabled!==!0){if(a[i]=b,!f)a.check_Child_State=a[h]&&a[h].length>0?b?2:0:-1}else a.check_Child_State=-1;e.setChkClass(c,l,a);c.check.autoCheckTrigger&&a!=d&&a.nocheck!==!0&&a.chkDisabled!==!0&&c.treeObj.trigger(j.event.CHECK,[null,c.treeId,a])}}}},event:{},data:{getRadioCheckedList:function(c){for(var a=g.getRoot(c).radioCheckedList,b=0,d=a.length;b<d;b++)g.getNodeCache(c,a[b].tId)||(a.splice(b,
	1),b--,d--);return a},getCheckStatus:function(c,a){if(!c.check.enable||a.nocheck||a.chkDisabled)return null;var b=c.data.key.checked;return{checked:a[b],half:a.halfCheck?a.halfCheck:c.check.chkStyle==j.radio.STYLE?a.check_Child_State===2:a[b]?a.check_Child_State>-1&&a.check_Child_State<2:a.check_Child_State>0}},getTreeCheckedNodes:function(c,a,b,d){if(!a)return[];for(var h=c.data.key.children,i=c.data.key.checked,e=b&&c.check.chkStyle==j.radio.STYLE&&c.check.radioType==j.radio.TYPE_ALL,d=!d?[]:d,
	f=0,k=a.length;f<k;f++){if(a[f].nocheck!==!0&&a[f].chkDisabled!==!0&&a[f][i]==b&&(d.push(a[f]),e))break;g.getTreeCheckedNodes(c,a[f][h],b,d);if(e&&d.length>0)break}return d},getTreeChangeCheckedNodes:function(c,a,b){if(!a)return[];for(var d=c.data.key.children,h=c.data.key.checked,b=!b?[]:b,i=0,e=a.length;i<e;i++)a[i].nocheck!==!0&&a[i].chkDisabled!==!0&&a[i][h]!=a[i].checkedOld&&b.push(a[i]),g.getTreeChangeCheckedNodes(c,a[i][d],b);return b},makeChkFlag:function(c,a){if(a){var b=c.data.key.children,
	d=c.data.key.checked,h=-1;if(a[b])for(var i=0,e=a[b].length;i<e;i++){var f=a[b][i],g=-1;if(c.check.chkStyle==j.radio.STYLE)if(g=f.nocheck===!0||f.chkDisabled===!0?f.check_Child_State:f.halfCheck===!0?2:f[d]?2:f.check_Child_State>0?2:0,g==2){h=2;break}else g==0&&(h=0);else if(c.check.chkStyle==j.checkbox.STYLE)if(g=f.nocheck===!0||f.chkDisabled===!0?f.check_Child_State:f.halfCheck===!0?1:f[d]?f.check_Child_State===-1||f.check_Child_State===2?2:1:f.check_Child_State>0?1:0,g===1){h=1;break}else if(g===
	2&&h>-1&&i>0&&g!==h){h=1;break}else if(h===2&&g>-1&&g<2){h=1;break}else g>-1&&(h=g)}a.check_Child_State=h}}}});var m=m.fn.zTree,k=m._z.tools,j=m.consts,e=m._z.view,g=m._z.data,n=k.$;g.exSetting(v);g.addInitBind(function(c){c.treeObj.bind(j.event.CHECK,function(a,b,d,h){a.srcEvent=b;k.apply(c.callback.onCheck,[a,d,h])})});g.addInitUnBind(function(c){c.treeObj.unbind(j.event.CHECK)});g.addInitCache(function(){});g.addInitNode(function(c,a,b,d){if(b){a=c.data.key.checked;typeof b[a]=="string"&&(b[a]=
	k.eqs(b[a],"true"));b[a]=!!b[a];b.checkedOld=b[a];if(typeof b.nocheck=="string")b.nocheck=k.eqs(b.nocheck,"true");b.nocheck=!!b.nocheck||c.check.nocheckInherit&&d&&!!d.nocheck;if(typeof b.chkDisabled=="string")b.chkDisabled=k.eqs(b.chkDisabled,"true");b.chkDisabled=!!b.chkDisabled||c.check.chkDisabledInherit&&d&&!!d.chkDisabled;if(typeof b.halfCheck=="string")b.halfCheck=k.eqs(b.halfCheck,"true");b.halfCheck=!!b.halfCheck;b.check_Child_State=-1;b.check_Focus=!1;b.getCheckStatus=function(){return g.getCheckStatus(c,
	b)};c.check.chkStyle==j.radio.STYLE&&c.check.radioType==j.radio.TYPE_ALL&&b[a]&&g.getRoot(c).radioCheckedList.push(b)}});g.addInitProxy(function(c){var a=c.target,b=g.getSetting(c.data.treeId),d="",h=null,e="",l=null;if(k.eqs(c.type,"mouseover")){if(b.check.enable&&k.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+j.id.CHECK)!==null)d=k.getNodeMainDom(a).id,e="mouseoverCheck"}else if(k.eqs(c.type,"mouseout")){if(b.check.enable&&k.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+j.id.CHECK)!==null)d=
	k.getNodeMainDom(a).id,e="mouseoutCheck"}else if(k.eqs(c.type,"click")&&b.check.enable&&k.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+j.id.CHECK)!==null)d=k.getNodeMainDom(a).id,e="checkNode";if(d.length>0)switch(h=g.getNodeCache(b,d),e){case "checkNode":l=p;break;case "mouseoverCheck":l=q;break;case "mouseoutCheck":l=r}return{stop:e==="checkNode",node:h,nodeEventType:e,nodeEventCallback:l,treeEventType:"",treeEventCallback:null}},!0);g.addInitRoot(function(c){g.getRoot(c).radioCheckedList=[]});
	g.addBeforeA(function(c,a,b){c.check.enable&&(g.makeChkFlag(c,a),b.push("<span ID='",a.tId,j.id.CHECK,"' class='",e.makeChkClass(c,a),"' treeNode",j.id.CHECK,a.nocheck===!0?" style='display:none;'":"","></span>"))});g.addZTreeTools(function(c,a){a.checkNode=function(a,b,c,g){var f=this.setting.data.key.checked;if(a.chkDisabled!==!0&&(b!==!0&&b!==!1&&(b=!a[f]),g=!!g,(a[f]!==b||c)&&!(g&&k.apply(this.setting.callback.beforeCheck,[this.setting.treeId,a],!0)==!1)&&k.uCanDo(this.setting)&&this.setting.check.enable&&
	a.nocheck!==!0))a[f]=b,b=n(a,j.id.CHECK,this.setting),(c||this.setting.check.chkStyle===j.radio.STYLE)&&e.checkNodeRelation(this.setting,a),e.setChkClass(this.setting,b,a),e.repairParentChkClassWithSelf(this.setting,a),g&&this.setting.treeObj.trigger(j.event.CHECK,[null,this.setting.treeId,a])};a.checkAllNodes=function(a){e.repairAllChk(this.setting,!!a)};a.getCheckedNodes=function(a){var b=this.setting.data.key.children;return g.getTreeCheckedNodes(this.setting,g.getRoot(this.setting)[b],a!==!1)};
	a.getChangeCheckedNodes=function(){var a=this.setting.data.key.children;return g.getTreeChangeCheckedNodes(this.setting,g.getRoot(this.setting)[a])};a.setChkDisabled=function(a,b,c,g){b=!!b;c=!!c;e.repairSonChkDisabled(this.setting,a,b,!!g);e.repairParentChkDisabled(this.setting,a.getParentNode(),b,c)};var b=a.updateNode;a.updateNode=function(c,g){b&&b.apply(a,arguments);if(c&&this.setting.check.enable&&n(c,this.setting).get(0)&&k.uCanDo(this.setting)){var i=n(c,j.id.CHECK,this.setting);(g==!0||this.setting.check.chkStyle===
	j.radio.STYLE)&&e.checkNodeRelation(this.setting,c);e.setChkClass(this.setting,i,c);e.repairParentChkClassWithSelf(this.setting,c)}}});var s=e.createNodes;e.createNodes=function(c,a,b,d,g){s&&s.apply(e,arguments);b&&e.repairParentChkClassWithSelf(c,d)};var t=e.removeNode;e.removeNode=function(c,a){var b=a.getParentNode();t&&t.apply(e,arguments);a&&b&&(e.repairChkClass(c,b),e.repairParentChkClass(c,b))};var u=e.appendNodes;e.appendNodes=function(c,a,b,d,h,i,j){var f="";u&&(f=u.apply(e,arguments));
	d&&g.makeChkFlag(c,d);return f}})(jQuery);

	/*
	 * JQuery zTree exedit v3.5.24
	 * http://zTree.me/
	 *
	 * Copyright (c) 2010 Hunter.z
	 *
	 * Licensed same as jquery - MIT License
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * email: hunter.z@263.net
	 * Date: 2016-06-06
	 */
	(function(v){var J={event:{DRAG:"ztree_drag",DROP:"ztree_drop",RENAME:"ztree_rename",DRAGMOVE:"ztree_dragmove"},id:{EDIT:"_edit",INPUT:"_input",REMOVE:"_remove"},move:{TYPE_INNER:"inner",TYPE_PREV:"prev",TYPE_NEXT:"next"},node:{CURSELECTED_EDIT:"curSelectedNode_Edit",TMPTARGET_TREE:"tmpTargetzTree",TMPTARGET_NODE:"tmpTargetNode"}},x={onHoverOverNode:function(b,a){var c=m.getSetting(b.data.treeId),d=m.getRoot(c);if(d.curHoverNode!=a)x.onHoverOutNode(b);d.curHoverNode=a;f.addHoverDom(c,a)},onHoverOutNode:function(b){var b=
	m.getSetting(b.data.treeId),a=m.getRoot(b);if(a.curHoverNode&&!m.isSelectedNode(b,a.curHoverNode))f.removeTreeDom(b,a.curHoverNode),a.curHoverNode=null},onMousedownNode:function(b,a){function c(b){if(B.dragFlag==0&&Math.abs(O-b.clientX)<e.edit.drag.minMoveSize&&Math.abs(P-b.clientY)<e.edit.drag.minMoveSize)return!0;var a,c,n,k,i;i=e.data.key.children;M.css("cursor","pointer");if(B.dragFlag==0){if(g.apply(e.callback.beforeDrag,[e.treeId,l],!0)==!1)return r(b),!0;for(a=0,c=l.length;a<c;a++){if(a==0)B.dragNodeShowBefore=
	[];n=l[a];n.isParent&&n.open?(f.expandCollapseNode(e,n,!n.open),B.dragNodeShowBefore[n.tId]=!0):B.dragNodeShowBefore[n.tId]=!1}B.dragFlag=1;t.showHoverDom=!1;g.showIfameMask(e,!0);n=!0;k=-1;if(l.length>1){var j=l[0].parentTId?l[0].getParentNode()[i]:m.getNodes(e);i=[];for(a=0,c=j.length;a<c;a++)if(B.dragNodeShowBefore[j[a].tId]!==void 0&&(n&&k>-1&&k+1!==a&&(n=!1),i.push(j[a]),k=a),l.length===i.length){l=i;break}}n&&(I=l[0].getPreNode(),R=l[l.length-1].getNextNode());D=o("<ul class='zTreeDragUL'></ul>",
	e);for(a=0,c=l.length;a<c;a++)n=l[a],n.editNameFlag=!1,f.selectNode(e,n,a>0),f.removeTreeDom(e,n),a>e.edit.drag.maxShowNodeNum-1||(k=o("<li id='"+n.tId+"_tmp'></li>",e),k.append(o(n,d.id.A,e).clone()),k.css("padding","0"),k.children("#"+n.tId+d.id.A).removeClass(d.node.CURSELECTED),D.append(k),a==e.edit.drag.maxShowNodeNum-1&&(k=o("<li id='"+n.tId+"_moretmp'><a>  ...  </a></li>",e),D.append(k)));D.attr("id",l[0].tId+d.id.UL+"_tmp");D.addClass(e.treeObj.attr("class"));D.appendTo(M);A=o("<span class='tmpzTreeMove_arrow'></span>",
	e);A.attr("id","zTreeMove_arrow_tmp");A.appendTo(M);e.treeObj.trigger(d.event.DRAG,[b,e.treeId,l])}if(B.dragFlag==1){s&&A.attr("id")==b.target.id&&u&&b.clientX+G.scrollLeft()+2>v("#"+u+d.id.A,s).offset().left?(n=v("#"+u+d.id.A,s),b.target=n.length>0?n.get(0):b.target):s&&(s.removeClass(d.node.TMPTARGET_TREE),u&&v("#"+u+d.id.A,s).removeClass(d.node.TMPTARGET_NODE+"_"+d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE+"_"+J.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE+"_"+J.move.TYPE_INNER));
	u=s=null;K=!1;h=e;n=m.getSettings();for(var y in n)if(n[y].treeId&&n[y].edit.enable&&n[y].treeId!=e.treeId&&(b.target.id==n[y].treeId||v(b.target).parents("#"+n[y].treeId).length>0))K=!0,h=n[y];y=G.scrollTop();k=G.scrollLeft();i=h.treeObj.offset();a=h.treeObj.get(0).scrollHeight;n=h.treeObj.get(0).scrollWidth;c=b.clientY+y-i.top;var p=h.treeObj.height()+i.top-b.clientY-y,q=b.clientX+k-i.left,H=h.treeObj.width()+i.left-b.clientX-k;i=c<e.edit.drag.borderMax&&c>e.edit.drag.borderMin;var j=p<e.edit.drag.borderMax&&
	p>e.edit.drag.borderMin,F=q<e.edit.drag.borderMax&&q>e.edit.drag.borderMin,x=H<e.edit.drag.borderMax&&H>e.edit.drag.borderMin,p=c>e.edit.drag.borderMin&&p>e.edit.drag.borderMin&&q>e.edit.drag.borderMin&&H>e.edit.drag.borderMin,q=i&&h.treeObj.scrollTop()<=0,H=j&&h.treeObj.scrollTop()+h.treeObj.height()+10>=a,N=F&&h.treeObj.scrollLeft()<=0,Q=x&&h.treeObj.scrollLeft()+h.treeObj.width()+10>=n;if(b.target&&g.isChildOrSelf(b.target,h.treeId)){for(var E=b.target;E&&E.tagName&&!g.eqs(E.tagName,"li")&&E.id!=
	h.treeId;)E=E.parentNode;var S=!0;for(a=0,c=l.length;a<c;a++)if(n=l[a],E.id===n.tId){S=!1;break}else if(o(n,e).find("#"+E.id).length>0){S=!1;break}if(S&&b.target&&g.isChildOrSelf(b.target,E.id+d.id.A))s=v(E),u=E.id}n=l[0];if(p&&g.isChildOrSelf(b.target,h.treeId)){if(!s&&(b.target.id==h.treeId||q||H||N||Q)&&(K||!K&&n.parentTId))s=h.treeObj;i?h.treeObj.scrollTop(h.treeObj.scrollTop()-10):j&&h.treeObj.scrollTop(h.treeObj.scrollTop()+10);F?h.treeObj.scrollLeft(h.treeObj.scrollLeft()-10):x&&h.treeObj.scrollLeft(h.treeObj.scrollLeft()+
	10);s&&s!=h.treeObj&&s.offset().left<h.treeObj.offset().left&&h.treeObj.scrollLeft(h.treeObj.scrollLeft()+s.offset().left-h.treeObj.offset().left)}D.css({top:b.clientY+y+3+"px",left:b.clientX+k+3+"px"});c=a=0;if(s&&s.attr("id")!=h.treeId){var z=u==null?null:m.getNodeCache(h,u);i=(b.ctrlKey||b.metaKey)&&e.edit.drag.isMove&&e.edit.drag.isCopy||!e.edit.drag.isMove&&e.edit.drag.isCopy;k=!!(I&&u===I.tId);F=!!(R&&u===R.tId);j=n.parentTId&&n.parentTId==u;n=(i||!F)&&g.apply(h.edit.drag.prev,[h.treeId,l,z],
	!!h.edit.drag.prev);k=(i||!k)&&g.apply(h.edit.drag.next,[h.treeId,l,z],!!h.edit.drag.next);i=(i||!j)&&!(h.data.keep.leaf&&!z.isParent)&&g.apply(h.edit.drag.inner,[h.treeId,l,z],!!h.edit.drag.inner);j=function(){s=null;u="";w=d.move.TYPE_INNER;A.css({display:"none"});if(window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null};if(!n&&!k&&!i)j();else if(F=v("#"+u+d.id.A,s),x=z.isLastNode?null:v("#"+z.getNextNode().tId+d.id.A,s.next()),p=F.offset().top,q=F.offset().left,
	H=n?i?0.25:k?0.5:1:-1,N=k?i?0.75:n?0.5:0:-1,y=(b.clientY+y-p)/F.height(),(H==1||y<=H&&y>=-0.2)&&n?(a=1-A.width(),c=p-A.height()/2,w=d.move.TYPE_PREV):(N==0||y>=N&&y<=1.2)&&k?(a=1-A.width(),c=x==null||z.isParent&&z.open?p+F.height()-A.height()/2:x.offset().top-A.height()/2,w=d.move.TYPE_NEXT):i?(a=5-A.width(),c=p,w=d.move.TYPE_INNER):j(),s){A.css({display:"block",top:c+"px",left:q+a+"px"});F.addClass(d.node.TMPTARGET_NODE+"_"+w);if(T!=u||U!=w)L=(new Date).getTime();if(z&&z.isParent&&w==d.move.TYPE_INNER&&
	(y=!0,window.zTreeMoveTimer&&window.zTreeMoveTargetNodeTId!==z.tId?(clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null):window.zTreeMoveTimer&&window.zTreeMoveTargetNodeTId===z.tId&&(y=!1),y))window.zTreeMoveTimer=setTimeout(function(){w==d.move.TYPE_INNER&&z&&z.isParent&&!z.open&&(new Date).getTime()-L>h.edit.drag.autoOpenTime&&g.apply(h.callback.beforeDragOpen,[h.treeId,z],!0)&&(f.switchNode(h,z),h.edit.drag.autoExpandTrigger&&h.treeObj.trigger(d.event.EXPAND,[h.treeId,z]))},
	h.edit.drag.autoOpenTime+50),window.zTreeMoveTargetNodeTId=z.tId}}else if(w=d.move.TYPE_INNER,s&&g.apply(h.edit.drag.inner,[h.treeId,l,null],!!h.edit.drag.inner)?s.addClass(d.node.TMPTARGET_TREE):s=null,A.css({display:"none"}),window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null;T=u;U=w;e.treeObj.trigger(d.event.DRAGMOVE,[b,e.treeId,l])}return!1}function r(b){if(window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null;U=T=
	null;G.unbind("mousemove",c);G.unbind("mouseup",r);G.unbind("selectstart",k);M.css("cursor","auto");s&&(s.removeClass(d.node.TMPTARGET_TREE),u&&v("#"+u+d.id.A,s).removeClass(d.node.TMPTARGET_NODE+"_"+d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE+"_"+J.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE+"_"+J.move.TYPE_INNER));g.showIfameMask(e,!1);t.showHoverDom=!0;if(B.dragFlag!=0){B.dragFlag=0;var a,i,j;for(a=0,i=l.length;a<i;a++)j=l[a],j.isParent&&B.dragNodeShowBefore[j.tId]&&!j.open&&(f.expandCollapseNode(e,
	j,!j.open),delete B.dragNodeShowBefore[j.tId]);D&&D.remove();A&&A.remove();var p=(b.ctrlKey||b.metaKey)&&e.edit.drag.isMove&&e.edit.drag.isCopy||!e.edit.drag.isMove&&e.edit.drag.isCopy;!p&&s&&u&&l[0].parentTId&&u==l[0].parentTId&&w==d.move.TYPE_INNER&&(s=null);if(s){var q=u==null?null:m.getNodeCache(h,u);if(g.apply(e.callback.beforeDrop,[h.treeId,l,q,w,p],!0)==!1)f.selectNodes(x,l);else{var C=p?g.clone(l):l;a=function(){if(K){if(!p)for(var a=0,c=l.length;a<c;a++)f.removeNode(e,l[a]);w==d.move.TYPE_INNER?
	f.addNodes(h,q,-1,C):f.addNodes(h,q.getParentNode(),w==d.move.TYPE_PREV?q.getIndex():q.getIndex()+1,C)}else if(p&&w==d.move.TYPE_INNER)f.addNodes(h,q,-1,C);else if(p)f.addNodes(h,q.getParentNode(),w==d.move.TYPE_PREV?q.getIndex():q.getIndex()+1,C);else if(w!=d.move.TYPE_NEXT)for(a=0,c=C.length;a<c;a++)f.moveNode(h,q,C[a],w,!1);else for(a=-1,c=C.length-1;a<c;c--)f.moveNode(h,q,C[c],w,!1);f.selectNodes(h,C);a=o(C[0],e).get(0);f.scrollIntoView(a);e.treeObj.trigger(d.event.DROP,[b,h.treeId,C,q,w,p])};
	w==d.move.TYPE_INNER&&g.canAsync(h,q)?f.asyncNode(h,q,!1,a):a()}}else f.selectNodes(x,l),e.treeObj.trigger(d.event.DROP,[b,e.treeId,l,null,null,null])}}function k(){return!1}var i,j,e=m.getSetting(b.data.treeId),B=m.getRoot(e),t=m.getRoots();if(b.button==2||!e.edit.enable||!e.edit.drag.isCopy&&!e.edit.drag.isMove)return!0;var p=b.target,q=m.getRoot(e).curSelectedList,l=[];if(m.isSelectedNode(e,a))for(i=0,j=q.length;i<j;i++){if(q[i].editNameFlag&&g.eqs(p.tagName,"input")&&p.getAttribute("treeNode"+
	d.id.INPUT)!==null)return!0;l.push(q[i]);if(l[0].parentTId!==q[i].parentTId){l=[a];break}}else l=[a];f.editNodeBlur=!0;f.cancelCurEditNode(e);var G=v(e.treeObj.get(0).ownerDocument),M=v(e.treeObj.get(0).ownerDocument.body),D,A,s,K=!1,h=e,x=e,I,R,T=null,U=null,u=null,w=d.move.TYPE_INNER,O=b.clientX,P=b.clientY,L=(new Date).getTime();g.uCanDo(e)&&G.bind("mousemove",c);G.bind("mouseup",r);G.bind("selectstart",k);b.preventDefault&&b.preventDefault();return!0}};v.extend(!0,v.fn.zTree.consts,J);v.extend(!0,
	v.fn.zTree._z,{tools:{getAbs:function(b){b=b.getBoundingClientRect();return[b.left+(document.body.scrollLeft+document.documentElement.scrollLeft),b.top+(document.body.scrollTop+document.documentElement.scrollTop)]},inputFocus:function(b){b.get(0)&&(b.focus(),g.setCursorPosition(b.get(0),b.val().length))},inputSelect:function(b){b.get(0)&&(b.focus(),b.select())},setCursorPosition:function(b,a){if(b.setSelectionRange)b.focus(),b.setSelectionRange(a,a);else if(b.createTextRange){var c=b.createTextRange();
	c.collapse(!0);c.moveEnd("character",a);c.moveStart("character",a);c.select()}},showIfameMask:function(b,a){for(var c=m.getRoot(b);c.dragMaskList.length>0;)c.dragMaskList[0].remove(),c.dragMaskList.shift();if(a)for(var d=o("iframe",b),f=0,i=d.length;f<i;f++){var j=d.get(f),e=g.getAbs(j),j=o("<div id='zTreeMask_"+f+"' class='zTreeMask' style='top:"+e[1]+"px; left:"+e[0]+"px; width:"+j.offsetWidth+"px; height:"+j.offsetHeight+"px;'></div>",b);j.appendTo(o("body",b));c.dragMaskList.push(j)}}},view:{addEditBtn:function(b,
	a){if(!(a.editNameFlag||o(a,d.id.EDIT,b).length>0)&&g.apply(b.edit.showRenameBtn,[b.treeId,a],b.edit.showRenameBtn)){var c=o(a,d.id.A,b),r="<span class='"+d.className.BUTTON+" edit' id='"+a.tId+d.id.EDIT+"' title='"+g.apply(b.edit.renameTitle,[b.treeId,a],b.edit.renameTitle)+"' treeNode"+d.id.EDIT+" style='display:none;'></span>";c.append(r);o(a,d.id.EDIT,b).bind("click",function(){if(!g.uCanDo(b)||g.apply(b.callback.beforeEditName,[b.treeId,a],!0)==!1)return!1;f.editNode(b,a);return!1}).show()}},
	addRemoveBtn:function(b,a){if(!(a.editNameFlag||o(a,d.id.REMOVE,b).length>0)&&g.apply(b.edit.showRemoveBtn,[b.treeId,a],b.edit.showRemoveBtn)){var c=o(a,d.id.A,b),r="<span class='"+d.className.BUTTON+" remove' id='"+a.tId+d.id.REMOVE+"' title='"+g.apply(b.edit.removeTitle,[b.treeId,a],b.edit.removeTitle)+"' treeNode"+d.id.REMOVE+" style='display:none;'></span>";c.append(r);o(a,d.id.REMOVE,b).bind("click",function(){if(!g.uCanDo(b)||g.apply(b.callback.beforeRemove,[b.treeId,a],!0)==!1)return!1;f.removeNode(b,
	a);b.treeObj.trigger(d.event.REMOVE,[b.treeId,a]);return!1}).bind("mousedown",function(){return!0}).show()}},addHoverDom:function(b,a){if(m.getRoots().showHoverDom)a.isHover=!0,b.edit.enable&&(f.addEditBtn(b,a),f.addRemoveBtn(b,a)),g.apply(b.view.addHoverDom,[b.treeId,a])},cancelCurEditNode:function(b,a,c){var r=m.getRoot(b),k=b.data.key.name,i=r.curEditNode;if(i){var j=r.curEditInput,a=a?a:c?i[k]:j.val();if(g.apply(b.callback.beforeRename,[b.treeId,i,a,c],!0)===!1)return!1;i[k]=a;o(i,d.id.A,b).removeClass(d.node.CURSELECTED_EDIT);
	j.unbind();f.setNodeName(b,i);i.editNameFlag=!1;r.curEditNode=null;r.curEditInput=null;f.selectNode(b,i,!1);b.treeObj.trigger(d.event.RENAME,[b.treeId,i,c])}return r.noSelection=!0},editNode:function(b,a){var c=m.getRoot(b);f.editNodeBlur=!1;if(m.isSelectedNode(b,a)&&c.curEditNode==a&&a.editNameFlag)setTimeout(function(){g.inputFocus(c.curEditInput)},0);else{var r=b.data.key.name;a.editNameFlag=!0;f.removeTreeDom(b,a);f.cancelCurEditNode(b);f.selectNode(b,a,!1);o(a,d.id.SPAN,b).html("<input type=text class='rename' id='"+
	a.tId+d.id.INPUT+"' treeNode"+d.id.INPUT+" >");var k=o(a,d.id.INPUT,b);k.attr("value",a[r]);b.edit.editNameSelectAll?g.inputSelect(k):g.inputFocus(k);k.bind("blur",function(){f.editNodeBlur||f.cancelCurEditNode(b)}).bind("keydown",function(a){a.keyCode=="13"?(f.editNodeBlur=!0,f.cancelCurEditNode(b)):a.keyCode=="27"&&f.cancelCurEditNode(b,null,!0)}).bind("click",function(){return!1}).bind("dblclick",function(){return!1});o(a,d.id.A,b).addClass(d.node.CURSELECTED_EDIT);c.curEditInput=k;c.noSelection=
	!1;c.curEditNode=a}},moveNode:function(b,a,c,r,k,i){var j=m.getRoot(b),e=b.data.key.children;if(a!=c&&(!b.data.keep.leaf||!a||a.isParent||r!=d.move.TYPE_INNER)){var g=c.parentTId?c.getParentNode():j,t=a===null||a==j;t&&a===null&&(a=j);if(t)r=d.move.TYPE_INNER;j=a.parentTId?a.getParentNode():j;if(r!=d.move.TYPE_PREV&&r!=d.move.TYPE_NEXT)r=d.move.TYPE_INNER;if(r==d.move.TYPE_INNER)if(t)c.parentTId=null;else{if(!a.isParent)a.isParent=!0,a.open=!!a.open,f.setNodeLineIcos(b,a);c.parentTId=a.tId}var p;
	t?p=t=b.treeObj:(!i&&r==d.move.TYPE_INNER?f.expandCollapseNode(b,a,!0,!1):i||f.expandCollapseNode(b,a.getParentNode(),!0,!1),t=o(a,b),p=o(a,d.id.UL,b),t.get(0)&&!p.get(0)&&(p=[],f.makeUlHtml(b,a,p,""),t.append(p.join(""))),p=o(a,d.id.UL,b));var q=o(c,b);q.get(0)?t.get(0)||q.remove():q=f.appendNodes(b,c.level,[c],null,-1,!1,!0).join("");p.get(0)&&r==d.move.TYPE_INNER?p.append(q):t.get(0)&&r==d.move.TYPE_PREV?t.before(q):t.get(0)&&r==d.move.TYPE_NEXT&&t.after(q);var l=-1,v=0,x=null,t=null,D=c.level;
	if(c.isFirstNode){if(l=0,g[e].length>1)x=g[e][1],x.isFirstNode=!0}else if(c.isLastNode)l=g[e].length-1,x=g[e][l-1],x.isLastNode=!0;else for(p=0,q=g[e].length;p<q;p++)if(g[e][p].tId==c.tId){l=p;break}l>=0&&g[e].splice(l,1);if(r!=d.move.TYPE_INNER)for(p=0,q=j[e].length;p<q;p++)j[e][p].tId==a.tId&&(v=p);if(r==d.move.TYPE_INNER){a[e]||(a[e]=[]);if(a[e].length>0)t=a[e][a[e].length-1],t.isLastNode=!1;a[e].splice(a[e].length,0,c);c.isLastNode=!0;c.isFirstNode=a[e].length==1}else a.isFirstNode&&r==d.move.TYPE_PREV?
	(j[e].splice(v,0,c),t=a,t.isFirstNode=!1,c.parentTId=a.parentTId,c.isFirstNode=!0,c.isLastNode=!1):a.isLastNode&&r==d.move.TYPE_NEXT?(j[e].splice(v+1,0,c),t=a,t.isLastNode=!1,c.parentTId=a.parentTId,c.isFirstNode=!1,c.isLastNode=!0):(r==d.move.TYPE_PREV?j[e].splice(v,0,c):j[e].splice(v+1,0,c),c.parentTId=a.parentTId,c.isFirstNode=!1,c.isLastNode=!1);m.fixPIdKeyValue(b,c);m.setSonNodeLevel(b,c.getParentNode(),c);f.setNodeLineIcos(b,c);f.repairNodeLevelClass(b,c,D);!b.data.keep.parent&&g[e].length<
	1?(g.isParent=!1,g.open=!1,a=o(g,d.id.UL,b),r=o(g,d.id.SWITCH,b),e=o(g,d.id.ICON,b),f.replaceSwitchClass(g,r,d.folder.DOCU),f.replaceIcoClass(g,e,d.folder.DOCU),a.css("display","none")):x&&f.setNodeLineIcos(b,x);t&&f.setNodeLineIcos(b,t);b.check&&b.check.enable&&f.repairChkClass&&(f.repairChkClass(b,g),f.repairParentChkClassWithSelf(b,g),g!=c.parent&&f.repairParentChkClassWithSelf(b,c));i||f.expandCollapseParentNode(b,c.getParentNode(),!0,k)}},removeEditBtn:function(b,a){o(a,d.id.EDIT,b).unbind().remove()},
	removeRemoveBtn:function(b,a){o(a,d.id.REMOVE,b).unbind().remove()},removeTreeDom:function(b,a){a.isHover=!1;f.removeEditBtn(b,a);f.removeRemoveBtn(b,a);g.apply(b.view.removeHoverDom,[b.treeId,a])},repairNodeLevelClass:function(b,a,c){if(c!==a.level){var f=o(a,b),g=o(a,d.id.A,b),b=o(a,d.id.UL,b),c=d.className.LEVEL+c,a=d.className.LEVEL+a.level;f.removeClass(c);f.addClass(a);g.removeClass(c);g.addClass(a);b.removeClass(c);b.addClass(a)}},selectNodes:function(b,a){for(var c=0,d=a.length;c<d;c++)f.selectNode(b,
	a[c],c>0)}},event:{},data:{setSonNodeLevel:function(b,a,c){if(c){var d=b.data.key.children;c.level=a?a.level+1:0;if(c[d])for(var a=0,f=c[d].length;a<f;a++)c[d][a]&&m.setSonNodeLevel(b,c,c[d][a])}}}});var I=v.fn.zTree,g=I._z.tools,d=I.consts,f=I._z.view,m=I._z.data,o=g.$;m.exSetting({edit:{enable:!1,editNameSelectAll:!1,showRemoveBtn:!0,showRenameBtn:!0,removeTitle:"remove",renameTitle:"rename",drag:{autoExpandTrigger:!1,isCopy:!0,isMove:!0,prev:!0,next:!0,inner:!0,minMoveSize:5,borderMax:10,borderMin:-5,
	maxShowNodeNum:5,autoOpenTime:500}},view:{addHoverDom:null,removeHoverDom:null},callback:{beforeDrag:null,beforeDragOpen:null,beforeDrop:null,beforeEditName:null,beforeRename:null,onDrag:null,onDragMove:null,onDrop:null,onRename:null}});m.addInitBind(function(b){var a=b.treeObj,c=d.event;a.bind(c.RENAME,function(a,c,d,f){g.apply(b.callback.onRename,[a,c,d,f])});a.bind(c.DRAG,function(a,c,d,f){g.apply(b.callback.onDrag,[c,d,f])});a.bind(c.DRAGMOVE,function(a,c,d,f){g.apply(b.callback.onDragMove,[c,
	d,f])});a.bind(c.DROP,function(a,c,d,f,e,m,o){g.apply(b.callback.onDrop,[c,d,f,e,m,o])})});m.addInitUnBind(function(b){var b=b.treeObj,a=d.event;b.unbind(a.RENAME);b.unbind(a.DRAG);b.unbind(a.DRAGMOVE);b.unbind(a.DROP)});m.addInitCache(function(){});m.addInitNode(function(b,a,c){if(c)c.isHover=!1,c.editNameFlag=!1});m.addInitProxy(function(b){var a=b.target,c=m.getSetting(b.data.treeId),f=b.relatedTarget,k="",i=null,j="",e=null,o=null;if(g.eqs(b.type,"mouseover")){if(o=g.getMDom(c,a,[{tagName:"a",
	attrName:"treeNode"+d.id.A}]))k=g.getNodeMainDom(o).id,j="hoverOverNode"}else if(g.eqs(b.type,"mouseout"))o=g.getMDom(c,f,[{tagName:"a",attrName:"treeNode"+d.id.A}]),o||(k="remove",j="hoverOutNode");else if(g.eqs(b.type,"mousedown")&&(o=g.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+d.id.A}])))k=g.getNodeMainDom(o).id,j="mousedownNode";if(k.length>0)switch(i=m.getNodeCache(c,k),j){case "mousedownNode":e=x.onMousedownNode;break;case "hoverOverNode":e=x.onHoverOverNode;break;case "hoverOutNode":e=
	x.onHoverOutNode}return{stop:!1,node:i,nodeEventType:j,nodeEventCallback:e,treeEventType:"",treeEventCallback:null}});m.addInitRoot(function(b){var b=m.getRoot(b),a=m.getRoots();b.curEditNode=null;b.curEditInput=null;b.curHoverNode=null;b.dragFlag=0;b.dragNodeShowBefore=[];b.dragMaskList=[];a.showHoverDom=!0});m.addZTreeTools(function(b,a){a.cancelEditName=function(a){m.getRoot(this.setting).curEditNode&&f.cancelCurEditNode(this.setting,a?a:null,!0)};a.copyNode=function(a,b,k,i){if(!b)return null;
	if(a&&!a.isParent&&this.setting.data.keep.leaf&&k===d.move.TYPE_INNER)return null;var j=this,e=g.clone(b);if(!a)a=null,k=d.move.TYPE_INNER;k==d.move.TYPE_INNER?(b=function(){f.addNodes(j.setting,a,-1,[e],i)},g.canAsync(this.setting,a)?f.asyncNode(this.setting,a,i,b):b()):(f.addNodes(this.setting,a.parentNode,-1,[e],i),f.moveNode(this.setting,a,e,k,!1,i));return e};a.editName=function(a){a&&a.tId&&a===m.getNodeCache(this.setting,a.tId)&&(a.parentTId&&f.expandCollapseParentNode(this.setting,a.getParentNode(),
	!0),f.editNode(this.setting,a))};a.moveNode=function(a,b,k,i){function j(){f.moveNode(e.setting,a,b,k,!1,i)}if(!b)return b;if(a&&!a.isParent&&this.setting.data.keep.leaf&&k===d.move.TYPE_INNER)return null;else if(a&&(b.parentTId==a.tId&&k==d.move.TYPE_INNER||o(b,this.setting).find("#"+a.tId).length>0))return null;else a||(a=null);var e=this;g.canAsync(this.setting,a)&&k===d.move.TYPE_INNER?f.asyncNode(this.setting,a,i,j):j();return b};a.setEditable=function(a){this.setting.edit.enable=a;return this.refresh()}});
	var O=f.cancelPreSelectedNode;f.cancelPreSelectedNode=function(b,a){for(var c=m.getRoot(b).curSelectedList,d=0,g=c.length;d<g;d++)if(!a||a===c[d])if(f.removeTreeDom(b,c[d]),a)break;O&&O.apply(f,arguments)};var P=f.createNodes;f.createNodes=function(b,a,c,d,g){P&&P.apply(f,arguments);c&&f.repairParentChkClassWithSelf&&f.repairParentChkClassWithSelf(b,d)};var W=f.makeNodeUrl;f.makeNodeUrl=function(b,a){return b.edit.enable?null:W.apply(f,arguments)};var L=f.removeNode;f.removeNode=function(b,a){var c=
	m.getRoot(b);if(c.curEditNode===a)c.curEditNode=null;L&&L.apply(f,arguments)};var Q=f.selectNode;f.selectNode=function(b,a,c){var d=m.getRoot(b);if(m.isSelectedNode(b,a)&&d.curEditNode==a&&a.editNameFlag)return!1;Q&&Q.apply(f,arguments);f.addHoverDom(b,a);return!0};var V=g.uCanDo;g.uCanDo=function(b,a){var c=m.getRoot(b);if(a&&(g.eqs(a.type,"mouseover")||g.eqs(a.type,"mouseout")||g.eqs(a.type,"mousedown")||g.eqs(a.type,"mouseup")))return!0;if(c.curEditNode)f.editNodeBlur=!1,c.curEditInput.focus();
	return!c.curEditNode&&(V?V.apply(f,arguments):!0)}})(jQuery);



/***/ },
/* 215 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */
/***/ function(module, exports) {

	module.exports = "<div class=\"authority-control\">\r\n    <ul class=\"ui-tabs\">\r\n        <li class=\"actived\">菜单权限</li>\r\n        <li>元素权限</li>\r\n    </ul>\r\n    <div class=\"ui-tabs-content\">\r\n        <div><ul class=\"ztree\" id=\"menuAuthorityTree\"></ul></div>\r\n        <div><ul class=\"ztree\" id=\"elementAuthorityTree\"></ul></div>\r\n    </div>\r\n    <span class=\"framework-button fa fa-save\" id=\"saveBtn\"></span>\r\n</div>";

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 字典项新增或修改模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(223);
	__webpack_require__(181);
	__webpack_require__(214);
	__webpack_require__(215);
	var DimAddModify = function(){ };

	//继承自框架基类
	DimAddModify.prototype = $.extend({},frameworkBase);
	DimAddModify.prototype.id = 'dim-add-modify';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	DimAddModify.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({action:'001'},options);
	    that.setTitle(this.options.action == '001'?'添加字典项':'编辑字典项').setHeight(340).setWidth(400);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	    if(this.options.action == '002'){
	        this.restoreData();
	    }
	};

	DimAddModify.prototype.loadBaseView = function(options){
	    var that = this;
	    var html = __webpack_require__(225);
	    this.render(html);
	};

	DimAddModify.prototype.bindEvents = function(){
	    var that = this;
	    $('#confirmBtn',this.dom).click(function(){
	        var dim_id = $('#dim_id',that.dom).val();
	        var dim_name = $('#dim_name',that.dom).val();
	        var dim_value = $('#dim_value',that.dom).val();
	        var group_id = $('#group_id',that.dom).val();
	        var group_name = $('#group_name',that.dom).val();
	        if($.trim(dim_id) === '' ){
	            swal("提示", "请输入字典项id!", "warning");
	            return;
	        }
	        if($.trim(dim_name) === '' ){
	            swal("提示", "请输入字典项名称!", "warning");
	            return;
	        }
	        if($.trim(dim_value) === '' ){
	            swal("提示", "请输入字典项值!", "warning");
	            return;
	        }
	        if($.trim(group_id) === '' ){
	            swal("提示", "请输入分组id!", "warning");
	            return;
	        }
	        if($.trim(group_name) === '' ){
	            swal("提示", "请输入分组名称!", "warning");
	            return;
	        }
	        that.save('/dim/save',{
	            action:that.options.action,
	            id:that.options.id,
	            dim_id:dim_id,
	            dim_name:dim_name,
	            dim_value:dim_value,
	            group_id:group_id,
	            group_name:group_name
	        },function(data){
	            if(!data.success){
	                that.toast(data.message);
	                return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });
	};

	DimAddModify.prototype.restoreData = function() {
	    var that = this;
	    this.query('/dim/search/'+this.options.id,function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data = data.data;
	        $('#dim_id',that.dom).val(data.dim_id);
	        $('#dim_name',that.dom).val(data.dim_name);
	        $('#dim_value',that.dom).val(data.dim_value);
	        $('#group_id',that.dom).val(data.group_id);
	        $('#group_name',that.dom).val(data.group_name);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	DimAddModify.prototype.finish = function () {
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new DimAddModify();

/***/ },
/* 223 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 224 */,
/* 225 */
/***/ function(module, exports) {

	module.exports = "<div class=\"dim-add-modify\">\r\n    <div class=\"panel-body\">\r\n            <div class=\"form-group\">\r\n                <label>字典项id：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入字典项ID\" name=\"dim_id\" id=\"dim_id\" type=\"text\" autofocus>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>字典项名称：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入字典项名称\" name=\"dim_name\" id=\"dim_name\" type=\"text\" autofocus>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>字典项值：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入字典项值\" name=\"dim_value\" id=\"dim_value\" type=\"text\" value=\"\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>分组id：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入分组id\" name=\"group_id\" id=\"group_id\" type=\"text\" value=\"\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>分组名称：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入分组名称\" name=\"group_name\" id=\"group_name\" type=\"text\" value=\"\">\r\n            </div>\r\n            <div class=\"btn-wrap\">\r\n                <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n                <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n            </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 字典管理模块
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(227);
	__webpack_require__(181);
	var DimManage = function () {};

	//继承自框架基类
	DimManage.prototype = $.extend({}, frameworkBase);
	DimManage.prototype.id = 'dim-manage';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	DimManage.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('字典管理').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	};

	DimManage.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/dim-manage.html').then(function(html){
	        that.render(html);
	        $('.tablecontainer',that.dom).height(that.dom.height()-55);
	        that.initTable();
	        that.bindEvents();
	    });
	};

	DimManage.prototype.initTable = function () {
	    var that = this;
	    $('.easyui-linkbutton',that.dom).linkbutton();
	    var columns = __webpack_require__(229);
	    that.$table = $('#dataTable',that.dom).datagrid({
	        url: '/dim/list',
	        method: 'get',
	        columns: [columns],
	        cache:false,
	        pagination: false,
	        pageSize: 20,
	        ctrlSelect: true,
	        checkOnSelect: true,
	        selectOnCheck: true,
	        loadMsg: '正在查询，请稍候……',
	        striped: true,
	        fit: true,
	        fitColumns: true,
	        loadFilter: function (data) {
	            if(!data.success){
	                that.toast(data.message);
	            }
	            return {rows: data.data, total: data.data.length};
	        },
	        onDblClickRow: function (rowIndex, rowData) {
	            Events.require('dim-add-modify').addCallback(function(flag){
	                if(flag)
	                    Events.notify('onRefresh:dim-manage');
	            }).init({showType:'Pop',action:'002',id:rowData.id});
	        },
	        toolbar: '#dim-manage-toolbar'
	    });

	    var searchBox = $('#dim-manage #home-easyui-searchbox',that.dom).searchbox({
	        searcher: function (value, name) {
	            Events.notify('onRefresh:dim-manage');
	        },
	        prompt: '请输关键字，如维度名称、维度值'
	    });

	    //绑定下拉框事件 通知刷新字典
	    $('#group_id',that.dom).on('change',function(){
	        Events.notify('onRefresh:dim-manage');
	    });

	    //订阅刷新字典
	    Events.subscribe('onRefresh:dim-manage',function(){
	        that.$table.datagrid('load',{
	            key:searchBox.searchbox('getValue'),
	            group_id:$('#group_id',that.dom).val()
	        });
	    });
	};
	/**
	 * 绑定按钮点击事件
	 */
	DimManage.prototype.bindEvents = function () {
	    var that = this;
	    //添加字典项
	    $('#add_dim_btn',this.dom).click(function(){
	        Events.require('dim-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:dim-manage');
	        }).init({showType:'Pop'});
	    });
	    //修改字典项
	    $('#modify_dim_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('dim-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:dim-manage');
	        }).init({showType:'Pop',action:'002',id:rowData.id});
	    });
	    //删除字典项
	    $('#delete_dim_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        that.save('/dim/save',{action:'003',id:rowData.id},function(data){
	            if(data.success){
	                that.toast("删除字典成功!");
	                Events.notify('onRefresh:dim-manage');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });
	    
	    function getSelectRow(){
	        var rowData = that.$table.datagrid('getSelected');
	        if(!rowData){
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        return rowData;
	    }
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	DimManage.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:dim-manage');
	    frameworkBase.finish.apply(this,arguments);
	};

	var dimManage = new DimManage();
	Events.subscribe('onWindowResize',function(){
	    if(!dimManage.dom)
	        return;
	    $('.tablecontainer',dimManage.dom).height(dimManage.dom.height()-15-$('.condition-wrap',dimManage.dom).height());
	    dimManage.$table.datagrid('resize');
	});

	module.exports = dimManage;

/***/ },
/* 227 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 228 */,
/* 229 */
/***/ function(module, exports) {

	module.exports = [
	    {field: 'id', title: 'id', width: 200},
	    {field: 'dim_id', title: '字典项id', width: 200},
	    {field: 'dim_name', title: '字典项名称', width: 200},
	    {field: 'dim_value', title: '字典项值', width: 200},
	    {field: 'group_id', title: '分组id', width: 100},
	    {field: 'group_name', title: '分组名称', width: 200}
	];

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 元素新增修改模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(231);
	__webpack_require__(181);
	__webpack_require__(214);
	__webpack_require__(215);
	var ElementAddModify = function(){ };

	//继承自框架基类
	ElementAddModify.prototype = $.extend({},frameworkBase);
	ElementAddModify.prototype.id = 'element-add-modify';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	ElementAddModify.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({action:'001'},options);
	    that.setTitle(this.options.action == '001'?'添加元素':'编辑元素').setHeight(250).setWidth(400);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();

	};

	ElementAddModify.prototype.loadBaseView = function(options){
	    var that = this;
	    var html = __webpack_require__(233);
	    this.render(html);
	};

	ElementAddModify.prototype.bindEvents = function(){
	    var that = this;
	    $('#confirmBtn',this.dom).click(function(){
	        var element_code = $('#element_code',that.dom).val();
	        var element_desc = $('#element_desc',that.dom).val();
	        if($.trim(element_code) === '' ){
	            swal("提示", "请输入元素编码!", "warning");
	            return;
	        }
	        that.save('/element/save',{
	            action:that.options.action,
	            element_id:that.options.element_id,
	            element_code:element_code,
	            element_desc:element_desc,
	            menu_id:$('#menu_id',that.dom).attr('data-pid')
	        },function(data){
	            if(!data.success){
	                that.toast(data.message);
	                return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });

	    this.$treepanel = $('<div id="menu_tree_panel" class="dropdown_panel"><ul id="menuPanelTree" class="ztree"></ul></div>').appendTo($('body'));
	    var $menu_parent_id = $('#menu_id',this.dom);

	    $menu_parent_id.click(function(){
	        var offset = $menu_parent_id.offset();
	        that.$treepanel.css({
	            left:offset.left,
	            top:offset.top+30,
	            width:$menu_parent_id.outerWidth()
	        });
	        that.$treepanel.is(':visible')?(that.$treepanel.hide()):(that.$treepanel.show());
	        return false;
	    });
	    this.$treepanel.click(function(){
	        return false;
	    });
	    this.initMenuTree();

	};

	ElementAddModify.prototype.initMenuTree = function(){
	    var that = this;
	    this.query('/menu/list',function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data.data.push({'menu_id':'0','menu_parent_id':null,'menu_title':'根节点','menu_url':''});
	        var setting = {
	            data:{
	                keep:{
	                    parent:true,
	                    leaf:true
	                },
	                simpleData:{
	                    enable:true,
	                    idKey:'menu_id',
	                    pIdKey:'menu_parent_id',
	                    rootPId:null
	                },
	                key:{
	                    name:'menu_title',
	                    title:'menu_title'
	                }
	            },
	            callback:{
	                onClick:function(event, treeId, treeNode){
	                    //根元素不让选
	                    if(treeNode.menu_id != '0'){
	                        $('#menu_id',that.dom).val(treeNode.menu_title);
	                        $('#menu_id',that.dom).attr('data-pid',treeNode.menu_id);
	                        hidePanel();
	                    }
	                }
	            }
	        };

	        that.ztreeObj = $.fn.zTree.init($("#menuPanelTree",that.$treepanel), setting,data.data);
	        that.ztreeObj.expandNode(that.ztreeObj.getNodes()[0], true, false, true);

	        if(that.options.action == '002'){
	            that.restoreData();
	        }else{
	            var node = that.ztreeObj.getNodesByParam('menu_id',that.options.menu_id,null)[0];
	            that.ztreeObj.selectNode(node);
	            $('#menu_id',that.dom).val(node.menu_title);
	            $('#menu_id',that.dom).attr('data-pid',that.options.menu_id);
	        }
	    });
	};

	function hidePanel(){
	    $('.dropdown_panel').hide();
	}
	$('body').on('click',function(){
	    hidePanel();
	});
	ElementAddModify.prototype.restoreData = function() {
	    var that = this;
	    this.query('/element/search/'+this.options.element_id,function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data = data.data;
	        $('#element_code',that.dom).val(data.element_code);
	        $('#element_desc',that.dom).val(data.element_desc);
	        $('#menu_id',that.dom).attr('data-pid',data.menu_id);
	        var node = that.ztreeObj.getNodesByParam('menu_id',data.menu_id,null)[0];
	        $('#menu_id',that.dom).val(node.menu_title);
	        that.ztreeObj.selectNode(node);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	ElementAddModify.prototype.finish = function () {
	    this.$treepanel.remove();
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new ElementAddModify();

/***/ },
/* 231 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 232 */,
/* 233 */
/***/ function(module, exports) {

	module.exports = "<div class=\"element-add-modify\">\r\n    <div class=\"panel-body\">\r\n            <div class=\"form-group\">\r\n                <label>元素名称：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入元素名称\" name=\"element_desc\" id=\"element_desc\" type=\"text\" autofocus>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>元素编码：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入元素编码\" name=\"element_code\" id=\"element_code\" type=\"text\" value=\"\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>所属菜单：</label>\r\n                <input class=\"form-control\" placeholder=\"请选择所属菜单\" readonly=\"true\" name=\"menu_id\" id=\"menu_id\" type=\"text\" data-pid=\"0\" value=\"根菜单\">\r\n            </div>\r\n            <div class=\"btn-wrap\">\r\n                <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n                <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n            </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 页面元素管理
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(235);
	__webpack_require__(181);
	var ElementManage = function () {};

	//继承自框架基类
	ElementManage.prototype = $.extend({}, frameworkBase);
	ElementManage.prototype.id = 'element-manage';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	ElementManage.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('页面元素管理').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	};

	ElementManage.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/element-manage.html').then(function(html){
	        that.render(html);
	        $('.tablecontainer',that.dom).height(that.dom.height()-55);
	        that.initTable();
	        that.initMenuTree();
	        that.bindEvents();
	    });
	};

	ElementManage.prototype.initTable = function () {
	    var that = this;
	    $('.easyui-linkbutton',this.dom).linkbutton();
	    var columns = __webpack_require__(237);
	    that.$table = $('#dataTable',this.dom).datagrid({
	        url: '/element/list',
	        method: 'get',
	        columns: [columns],
	        cache:false,
	        pagination: false,
	        pageSize: 20,
	        ctrlSelect: true,
	        checkOnSelect: true,
	        selectOnCheck: true,
	        loadMsg: '正在查询，请稍候……',
	        striped: true,
	        fit: true,
	        fitColumns: true,
	        loadFilter: function (data) {
	            if(!data.success){
	                that.toast(data.message);
	            }
	            return {rows: data.data, total: data.data.length};
	        },
	        onDblClickRow: function (rowIndex, rowData) {
	            Events.require('element-add-modify').addCallback(function(flag){
	                if(flag)
	                    Events.notify('onRefresh:element-manage');
	            }).init({showType:'Pop',action:'002',element_id:rowData.element_id});
	        },
	        toolbar: '#element-manage-toolbar'
	    });

	    var searchBox = $('#element-manage #home-easyui-searchbox',that.dom).searchbox({
	        searcher: function (value, name) {
	            Events.notify('onRefresh:element-manage');
	        },
	        prompt: '请输关键字，如元素名称或编码'
	    });

	    //订阅刷新消息
	    Events.subscribe('onRefresh:element-manage',function(menu_id){
	        that.$table.datagrid('load',{
	            menu_id:selectMenuId,
	            key:searchBox.searchbox('getValue')
	        });
	    });
	};

	var selectMenuId;
	ElementManage.prototype.initMenuTree = function(){
	    var that = this;
	    this.query('/menu/list',function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data.data.push({'menu_id':'0','menu_parent_id':null,'menu_title':'根节点','menu_url':''});
	        var setting = {
	            data:{
	                keep:{
	                    parent:true,
	                    leaf:true
	                },
	                simpleData:{
	                    enable:true,
	                    idKey:'menu_id',
	                    pIdKey:'menu_parent_id',
	                    rootPId:null
	                },
	                key:{
	                    name:'menu_title',
	                    title:'menu_title'
	                }
	            },
	            callback:{
	                onClick:function(event, treeId, treeNode){
	                    selectMenuId = treeNode.menu_id;
	                    Events.notify('onRefresh:element-manage');
	                }
	            }
	        };

	        that.ztreeObj = $.fn.zTree.init($("#menuTree",that.dom), setting,data.data);
	        that.ztreeObj.expandNode(that.ztreeObj.getNodes()[0], true, false, true);
	        selectMenuId = that.ztreeObj.getNodes()[0].menu_id;
	        that.ztreeObj.selectNode(that.ztreeObj.getNodes()[0], false, false);
	        Events.notify('onRefresh:element-manage');
	    });
	};

	/**
	 * 绑定按钮点击事件
	 */
	ElementManage.prototype.bindEvents = function () {
	    var that = this;

	    //添加元素
	    $('#add_element_btn',this.dom).click(function(){
	        var nodes = that.ztreeObj.getSelectedNodes();
	        if(nodes.length == 0){
	            swal("提示", "请先选择一个菜单节点!", "warning");
	            return;
	        }
	        if(nodes[0].menu_id == '0'){
	            swal("提示", "根菜单节点上不允许创建元素!", "warning");
	            return;
	        }
	        Events.require('element-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:element-manage');
	        }).init({showType:'Pop',menu_id:nodes[0].menu_id});
	    });
	    //修改元素
	    $('#modify_element_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('element-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:element-manage');
	        }).init({showType:'Pop',action:'002',element_id:rowData.element_id});
	    });
	    //删除元素
	    $('#delete_element_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        that.save('/element/save',{action:'003',element_id:rowData.element_id},function(data){
	            if(data.success){
	                that.toast("删除信息成功!");
	                Events.notify('onRefresh:element-manage');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });

	    function getSelectRow(){
	        var rowData = that.$table.datagrid('getSelected');
	        if(!rowData){
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        return rowData;
	    }
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	ElementManage.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:element-manage');
	    frameworkBase.finish.apply(this,arguments);
	};

	var elementManage = new ElementManage();
	Events.subscribe('onWindowResize',function(){
	    if(!elementManage.dom)
	        return;
	    $('.tablecontainer',elementManage.dom).height(elementManage.dom.height()-15-$('.condition-wrap',elementManage.dom).height());
	    elementManage.$table.datagrid('resize');
	});

	module.exports = elementManage;



/***/ },
/* 235 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 236 */,
/* 237 */
/***/ function(module, exports) {

	module.exports = [
	    {field: 'element_id', title: '元素ID', width: 200},
	    {field: 'element_desc', title: '元素名称', width: 150},
	    {field: 'element_code', title: '元素编码', width: 150}
	];

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * homepage首页聚合模块
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(239);
	var HomePage = function(){ };

	//继承自框架基类
	HomePage.prototype = $.extend({},frameworkBase);
	HomePage.prototype.id = 'homepage';

	var WIDGETS = [
	    {container:'#attence-analyse-chart1',module:'./attence-analyse-widgets/attence-analyse-chart1'},
	    {container:'#attence-analyse-chart2',module:'./attence-analyse-widgets/attence-analyse-chart2'},
	    {container:'#message-publish-list',module:'message-publish-list'},
	    {container:'#report-list',module:'report-list'}];

	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	HomePage.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('首页聚合').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	};

	HomePage.prototype.loadBaseView = function(){
	    var that = this;
	    this.loadFragment('/views/modules/homepage.html').then(function(html){
	        that.render(html);
	        that.loadWidgets();
	    });
	};

	HomePage.prototype.loadWidgets = function(){
	    this.widgets = [];
	    this.widgets.push(__webpack_require__(177));
	    this.widgets.push(__webpack_require__(241));
	    this.widgets.push(__webpack_require__(246));
	    this.widgets.forEach(function(widget){
	        widget.loadWidgets(WIDGETS);
	    });
	}; 

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	HomePage.prototype.finish = function () {
	    try{
	        if(this.widgets && this.widgets.length)
	            this.widgets.forEach(function(widget){
	                widget.destoryWidgets();
	            });
	        frameworkBase.finish.apply(this,arguments);
	    }catch(e){
	        console.log(e);
	    }
	};

	var homePage = new HomePage();

	Events.subscribe('onWindowResize',function(){
	    if(homePage.dom){
	        $('#message-publish-list',homePage.dom).height(homePage.dom.height()-38);
	        $('#report-list',homePage.dom).height(homePage.dom.height()-386);
	    }
	    if(homePage.widgets)
	        homePage.widgets.forEach(function(widget){
	            widget.resizeWidgets();
	        });
	});

	module.exports = homePage;

/***/ },
/* 239 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 240 */,
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 学校信息发布列表维护 
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(242);
	__webpack_require__(181);
	var juicer = __webpack_require__(244);
	var MessagePublishList = function () {};

	//继承自框架基类
	MessagePublishList.prototype = $.extend({}, frameworkBase);
	MessagePublishList.prototype.id = 'message-publish-list';
	var widgetTpl = "<ul>" +
	    "{@each rows as it}" +
	        "<li class='shadow-block view-block'>" +
	    "    <header class='title'>" +
	    "    <span class='fa fa-bell'></span>" +
	    "     ${it.publish_title}" +
	    "    <i>${it.update_time}</i>" +
	    "    </header>" +
	    "    <article class='content clearfix'>$${it.publish_content}</article>" +
	    "    </li>" +
	    "     {@/each}" +
	"    </ul>";

	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	MessagePublishList.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('学校信息发布').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	};

	MessagePublishList.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/message-publish-list.html').then(function(html){
	        that.render(html);
	        $('.tablecontainer',that.dom).height(that.dom.height()-55);
	        that.initTable();
	        that.bindEvents();
	    });
	};

	MessagePublishList.prototype.initTable = function () {
	    var that = this;
	    $('.easyui-linkbutton',this.dom).linkbutton();
	    var columns = __webpack_require__(245);
	    that.$table = $('#dataTable',this.dom).datagrid({
	        url: '/publish/search',
	        method: 'get',
	        columns: [columns],
	        cache:false,
	        pagination: true,
	        pageSize: 20,
	        ctrlSelect: true,
	        checkOnSelect: true,
	        selectOnCheck: true,
	        loadMsg: '正在查询，请稍候……',
	        striped: true,
	        fit: true,
	        fitColumns: true,
	        loadFilter: function (data) {
	            if(!data.success){
	                that.toast(data.message);
	            }
	            return data.data;
	        },
	        onDblClickRow: function (rowIndex, rowData) {
	            Events.require('message-publish').addCallback(function(){
	                that.init();
	            }).init({showType:'Pop',action:'002',publish_id:rowData.publish_id});
	        },
	        toolbar: '#message-publish-list-toolbar'
	    });

	    var searchBox = $('#message-publish-list #home-easyui-searchbox',that.dom).searchbox({
	        searcher: function (value, name) {
	            Events.notify('onRefresh:message-publish-list');
	        },
	        prompt: '请输关键字，如公告标题'
	    });

	    var startDate = $("#startdate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:message-publish-list');
	        }
	    });
	    var endDate = $("#enddate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:message-publish-list');
	        }
	    });

	    //绑定下拉框事件 通知刷新消息
	    $('#is_show,#is_publish',this.dom).on('change',function(){
	        Events.notify('onRefresh:message-publish-list');
	    });

	    //订阅刷新消息
	    Events.subscribe('onRefresh:message-publish-list',function(){
	        that.$table.datagrid('load',{
	            key:searchBox.searchbox('getValue'),
	            is_show:$('#is_show',that.dom).val(),
	            is_publish:$('#is_publish',that.dom).val(),
	            startdate:startDate.combo('getValue').replace(/-/gi,''),
	            enddate:endDate.combo('getValue').replace(/-/gi,'')
	        });
	    });
	};


	/**
	 * 绑定按钮点击事件
	 */
	MessagePublishList.prototype.bindEvents = function () {
	    var that = this;
	    //添加信息
	    $('#add_message_btn',this.dom).click(function(){
	        Events.require('message-publish').addCallback(function(){
	            Events.notify('onRefresh:message-publish-list');
	        }).init({showType:'Pop'});
	    });
	    //修改信息
	    $('#modify_message_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('message-publish').addCallback(function(){
	            Events.notify('onRefresh:message-publish-list');
	        }).init({showType:'Pop',action:'002',publish_id:rowData.publish_id});
	    });
	    //删除信息
	    $('#delete_message_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        that.save('/publish/save',{action:'003',publish_id:rowData.publish_id},function(data){
	            if(data.success){
	                that.toast("删除信息成功!");
	                Events.notify('onRefresh:message-publish-list');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });
	    //设置显示隐藏
	    $('#set_show_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        that.save('/publish/save',{
	            action:'002',
	            publish_id:rowData.publish_id,
	            is_show:rowData.is_show == '0'?'1':'0'
	        },function(data){
	            if(data.success){
	                that.toast((rowData.is_show == '0'?'显示':'隐藏')+"信息成功!");
	                Events.notify('onRefresh:message-publish-list');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });
	    //发布信息
	    $('#publish_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        that.save('/publish/save',{
	            action:'002',
	            publish_id:rowData.publish_id,
	            is_publish:'1'
	        },function(data){
	            if(data.success){
	                that.toast("发布信息成功!");
	                Events.notify('onRefresh:message-publish-list');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });
	    //取消发布信息
	    $('#unpublish_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return; 
	        that.save('/publish/save',{
	            action:'002',
	            publish_id:rowData.publish_id,
	            is_publish:'0'
	        },function(data){
	            if(data.success){
	                that.toast("取消发布信息成功!");
	                Events.notify('onRefresh:message-publish-list');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });

	    function getSelectRow(){
	        var rowData = that.$table.datagrid('getSelected');
	        if(!rowData){
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        return rowData;
	    }
	};

	/**
	 * 加载插件
	 */
	MessagePublishList.prototype.loadWidgets = function(temp){
	    var widget = null,that = this;
	    if(temp && $.isArray(temp)){
	        temp.forEach(function(i){
	           if(i.module.indexOf('message-publish-list')!=-1){
	               widget = i;
	               return false;
	           }
	        });
	    }
	    if(widget == null)
	        return;
	    var $dom = $(widget.container);
	    this.query('/publish/search',{detail:true},function(ret){
	        if(!ret.success){
	            that.toast(ret.message);
	            return;
	        }
	        var html = juicer(widgetTpl, ret.data);
	        $dom.html(html);
	    });
	    Events.subscribe('websocket:message-publish-new',function(data){
	        $dom.find('ul').prepend('<li class="shadow-block view-block uk-animation-scale-up"><header class="title"><span class="fa fa-bell"></span> '+data.publish_title+'<i>'+data.update_time+'</i></header><article class="content clearfix">'+data.publish_content+'</article></li>');
	    });
	};

	/**
	 * 销毁插件
	 */
	MessagePublishList.prototype.destoryWidgets = function(){
	    Events.unsubscribe('websocket:message-publish-new');
	};
	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	MessagePublishList.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:message-publish-list');
	    frameworkBase.finish.apply(this,arguments);
	};

	var messagePublishList = new MessagePublishList();
	Events.subscribe('onWindowResize',function(){
	    if(!messagePublishList.dom)
	        return;
	    $('.tablecontainer',messagePublishList.dom).height(messagePublishList.dom.height()-15-$('.condition-wrap',messagePublishList.dom).height());
	    messagePublishList.$table.datagrid('resize');
	});

	module.exports = messagePublishList;

/***/ },
/* 242 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 243 */,
/* 244 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	    ********** Juicer **********
	    ${A Fast template engine}
	    Project Home: http://juicer.name

	    Author: Guokai
	    Gtalk: badkaikai@gmail.com
	    Blog: http://benben.cc
	    Licence: MIT License
	    Version: 0.6.14
	*/

	(function() {

	    // This is the main function for not only compiling but also rendering.
	    // there's at least two parameters need to be provided, one is the tpl, 
	    // another is the data, the tpl can either be a string, or an id like #id.
	    // if only tpl was given, it'll return the compiled reusable function.
	    // if tpl and data were given at the same time, it'll return the rendered 
	    // result immediately.

	    var juicer = function() {
	        var args = [].slice.call(arguments);

	        args.push(juicer.options);

	        if(args[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
	            args[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function($, $id) {
	                var _document = document;
	                var elem = _document && _document.getElementById($id);
	                args[0] = elem ? (elem.value || elem.innerHTML) : $;
	            });
	        }

	        if(juicer.documentHTML) {
	            juicer.compile.call(juicer, juicer.documentHTML);
	            juicer.documentHTML = '';
	        }

	        if(arguments.length == 1) {
	            return juicer.compile.apply(juicer, args);
	        }

	        if(arguments.length >= 2) {
	            return juicer.to_html.apply(juicer, args);
	        }
	    };

	    var __escapehtml = {
	        escapehash: {
	            '<': '&lt;',
	            '>': '&gt;',
	            '&': '&amp;',
	            '"': '&quot;',
	            "'": '&#x27;',
	            '/': '&#x2f;'
	        },
	        escapereplace: function(k) {
	            return __escapehtml.escapehash[k];
	        },
	        escaping: function(str) {
	            return typeof(str) !== 'string' ? str : str.replace(/[&<>"']/igm, this.escapereplace);
	        },
	        detection: function(data) {
	            return typeof(data) === 'undefined' ? '' : data;
	        }
	    };

	    var __throw = function(error) {
	        if(typeof(console) !== 'undefined') {
	            if(console.warn) {
	                console.warn(error);
	                return;
	            }

	            if(console.log) {
	                console.log(error);
	                return;
	            }
	        }

	        throw(error);
	    };

	    var __creator = function(o, proto) {
	        o = o !== Object(o) ? {} : o;

	        if(o.__proto__) {
	            o.__proto__ = proto;
	            return o;
	        }

	        var empty = function() {};
	        var n = Object.create ? 
	            Object.create(proto) : 
	            new(empty.prototype = proto, empty);

	        for(var i in o) {
	            if(o.hasOwnProperty(i)) {
	                n[i] = o[i];
	            }
	        }

	        return n;
	    };

	    var annotate = function(fn) {
	        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	        var FN_ARG_SPLIT = /,/;
	        var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
	        var FN_BODY = /^function[^{]+{([\s\S]*)}/m;
	        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	        var args = [],
	            fnText,
	            fnBody,
	            argDecl;

	        if (typeof fn === 'function') {
	            if (fn.length) {
	                fnText = fn.toString();
	            }
	        } else if(typeof fn === 'string') {
	            fnText = fn;
	        }

	        fnText = fnText.trim();
	        argDecl = fnText.match(FN_ARGS);
	        fnBody = fnText.match(FN_BODY)[1].trim();

	        for(var i = 0; i < argDecl[1].split(FN_ARG_SPLIT).length; i++) {
	            var arg = argDecl[1].split(FN_ARG_SPLIT)[i];
	            arg.replace(FN_ARG, function(all, underscore, name) {
	                args.push(name);
	            });
	        }

	        return [args, fnBody];
	    };

	    juicer.__cache = {};
	    juicer.version = '0.6.14';
	    juicer.settings = {};
	    juicer.documentHTML = '';

	    juicer.tags = {
	        operationOpen: '{@',
	        operationClose: '}',
	        interpolateOpen: '\\${',
	        interpolateClose: '}',
	        noneencodeOpen: '\\$\\${',
	        noneencodeClose: '}',
	        commentOpen: '\\{#',
	        commentClose: '\\}'
	    };

	    juicer.options = {
	        cache: true,
	        strip: true,
	        errorhandling: true,
	        detection: true,
	        _method: __creator({
	            __escapehtml: __escapehtml,
	            __throw: __throw,
	            __juicer: juicer
	        }, {})
	    };

	    juicer.tagInit = function() {
	        var forstart = juicer.tags.operationOpen + 'each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?' + juicer.tags.operationClose;
	        var forend = juicer.tags.operationOpen + '\\/each' + juicer.tags.operationClose;
	        var ifstart = juicer.tags.operationOpen + 'if\\s*([^}]*?)' + juicer.tags.operationClose;
	        var ifend = juicer.tags.operationOpen + '\\/if' + juicer.tags.operationClose;
	        var elsestart = juicer.tags.operationOpen + 'else' + juicer.tags.operationClose;
	        var elseifstart = juicer.tags.operationOpen + 'else if\\s*([^}]*?)' + juicer.tags.operationClose;
	        var interpolate = juicer.tags.interpolateOpen + '([\\s\\S]+?)' + juicer.tags.interpolateClose;
	        var noneencode = juicer.tags.noneencodeOpen + '([\\s\\S]+?)' + juicer.tags.noneencodeClose;
	        var inlinecomment = juicer.tags.commentOpen + '[^}]*?' + juicer.tags.commentClose;
	        var rangestart = juicer.tags.operationOpen + 'each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)' + juicer.tags.operationClose;
	        var include = juicer.tags.operationOpen + 'include\\s*([^}]*?)\\s*,\\s*([^}]*?)' + juicer.tags.operationClose;
	        var helperRegisterStart = juicer.tags.operationOpen + 'helper\\s*([^}]*?)\\s*' + juicer.tags.operationClose;
	        var helperRegisterBody = '([\\s\\S]*?)';
	        var helperRegisterEnd = juicer.tags.operationOpen + '\\/helper' + juicer.tags.operationClose;

	        juicer.settings.forstart = new RegExp(forstart, 'igm');
	        juicer.settings.forend = new RegExp(forend, 'igm');
	        juicer.settings.ifstart = new RegExp(ifstart, 'igm');
	        juicer.settings.ifend = new RegExp(ifend, 'igm');
	        juicer.settings.elsestart = new RegExp(elsestart, 'igm');
	        juicer.settings.elseifstart = new RegExp(elseifstart, 'igm');
	        juicer.settings.interpolate = new RegExp(interpolate, 'igm');
	        juicer.settings.noneencode = new RegExp(noneencode, 'igm');
	        juicer.settings.inlinecomment = new RegExp(inlinecomment, 'igm');
	        juicer.settings.rangestart = new RegExp(rangestart, 'igm');
	        juicer.settings.include = new RegExp(include, 'igm');
	        juicer.settings.helperRegister = new RegExp(helperRegisterStart + helperRegisterBody + helperRegisterEnd, 'igm');
	    };

	    juicer.tagInit();

	    // Using this method to set the options by given conf-name and conf-value,
	    // you can also provide more than one key-value pair wrapped by an object.
	    // this interface also used to custom the template tag delimater, for this
	    // situation, the conf-name must begin with tag::, for example: juicer.set
	    // ('tag::operationOpen', '{@').

	    juicer.set = function(conf, value) {
	        var that = this;

	        var escapePattern = function(v) {
	            return v.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm, function($) {
	                return '\\' + $;
	            });
	        };

	        var set = function(conf, value) {
	            var tag = conf.match(/^tag::(.*)$/i);

	            if(tag) {
	                that.tags[tag[1]] = escapePattern(value);
	                that.tagInit();
	                return;
	            }

	            that.options[conf] = value;
	        };

	        if(arguments.length === 2) {
	            set(conf, value);
	            return;
	        }

	        if(conf === Object(conf)) {
	            for(var i in conf) {
	                if(conf.hasOwnProperty(i)) {
	                    set(i, conf[i]);
	                }
	            }
	        }
	    };

	    // Before you're using custom functions in your template like ${name | fnName},
	    // you need to register this fn by juicer.register('fnName', fn).

	    juicer.register = function(fname, fn) {
	        var _method = this.options._method;

	        if(_method.hasOwnProperty(fname)) {
	            return false;
	        }

	        return _method[fname] = fn;
	    };

	    // remove the registered function in the memory by the provided function name.
	    // for example: juicer.unregister('fnName').

	    juicer.unregister = function(fname) {
	        var _method = this.options._method;

	        if(_method.hasOwnProperty(fname)) {
	            return delete _method[fname];
	        }
	    };

	    juicer.template = function(options) {
	        var that = this;

	        this.options = options;

	        this.__interpolate = function(_name, _escape, options) {
	            var _define = _name.split('|'), _fn = _define[0] || '', _cluster;

	            if(_define.length > 1) {
	                _name = _define.shift();
	                _cluster = _define.shift().split(',');
	                _fn = '_method.' + _cluster.shift() + '.call({}, ' + [_name].concat(_cluster) + ')';
	            }

	            return '<%= ' + (_escape ? '_method.__escapehtml.escaping' : '') + '(' +
	                        (!options || options.detection !== false ? '_method.__escapehtml.detection' : '') + '(' +
	                            _fn +
	                        ')' +
	                    ')' +
	                ' %>';
	        };

	        this.__removeShell = function(tpl, options) {
	            var _counter = 0;

	            tpl = tpl
	                // inline helper register
	                .replace(juicer.settings.helperRegister, function($, helperName, fnText) {
	                    var anno = annotate(fnText);
	                    var fnArgs = anno[0];
	                    var fnBody = anno[1];
	                    var fn = new Function(fnArgs.join(','), fnBody);

	                    juicer.register(helperName, fn);
	                    return $;
	                })

	                // for expression
	                .replace(juicer.settings.forstart, function($, _name, alias, key) {
	                    var alias = alias || 'value', key = key && key.substr(1);
	                    var _iterate = 'i' + _counter++;
	                    return '<% ~function() {' +
	                                'for(var ' + _iterate + ' in ' + _name + ') {' +
	                                    'if(' + _name + '.hasOwnProperty(' + _iterate + ')) {' +
	                                        'var ' + alias + '=' + _name + '[' + _iterate + '];' +
	                                        (key ? ('var ' + key + '=' + _iterate + ';') : '') +
	                            ' %>';
	                })
	                .replace(juicer.settings.forend, '<% }}}(); %>')

	                // if expression
	                .replace(juicer.settings.ifstart, function($, condition) {
	                    return '<% if(' + condition + ') { %>';
	                })
	                .replace(juicer.settings.ifend, '<% } %>')

	                // else expression
	                .replace(juicer.settings.elsestart, function($) {
	                    return '<% } else { %>';
	                })

	                // else if expression
	                .replace(juicer.settings.elseifstart, function($, condition) {
	                    return '<% } else if(' + condition + ') { %>';
	                })

	                // interpolate without escape
	                .replace(juicer.settings.noneencode, function($, _name) {
	                    return that.__interpolate(_name, false, options);
	                })

	                // interpolate with escape
	                .replace(juicer.settings.interpolate, function($, _name) {
	                    return that.__interpolate(_name, true, options);
	                })

	                // clean up comments
	                .replace(juicer.settings.inlinecomment, '')

	                // range expression
	                .replace(juicer.settings.rangestart, function($, _name, start, end) {
	                    var _iterate = 'j' + _counter++;
	                    return '<% ~function() {' +
	                                'for(var ' + _iterate + '=' + start + ';' + _iterate + '<' + end + ';' + _iterate + '++) {{' +
	                                    'var ' + _name + '=' + _iterate + ';' +
	                            ' %>';
	                })

	                // include sub-template
	                .replace(juicer.settings.include, function($, tpl, data) {
	                    // compatible for node.js
	                    if(tpl.match(/^file\:\/\//igm)) return $;
	                    return '<%= _method.__juicer(' + tpl + ', ' + data + '); %>';
	                });

	            // exception handling
	            if(!options || options.errorhandling !== false) {
	                tpl = '<% try { %>' + tpl;
	                tpl += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';
	            }

	            return tpl;
	        };

	        this.__toNative = function(tpl, options) {
	            return this.__convert(tpl, !options || options.strip);
	        };

	        this.__lexicalAnalyze = function(tpl) {
	            var buffer = [];
	            var method = [];
	            var prefix = '';
	            var reserved = [
	                'if', 'each', '_', '_method', 'console', 
	                'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 
	                'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch', 
	                'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'null', 'typeof', 
	                'class', 'enum', 'export', 'extends', 'import', 'super', 'implements', 'interface', 
	                'let', 'package', 'private', 'protected', 'public', 'static', 'yield', 'const', 'arguments', 
	                'true', 'false', 'undefined', 'NaN'
	            ];

	            var indexOf = function(array, item) {
	                if (Array.prototype.indexOf && array.indexOf === Array.prototype.indexOf) {
	                    return array.indexOf(item);
	                }

	                for(var i=0; i < array.length; i++) {
	                    if(array[i] === item) return i;
	                }

	                return -1;
	            };

	            var variableAnalyze = function($, statement) {
	                statement = statement.match(/\w+/igm)[0];

	                if(indexOf(buffer, statement) === -1 && indexOf(reserved, statement) === -1 && indexOf(method, statement) === -1) {

	                    // avoid re-declare native function, if not do this, template 
	                    // `{@if encodeURIComponent(name)}` could be throw undefined.

	                    if(typeof(window) !== 'undefined' && typeof(window[statement]) === 'function' && window[statement].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
	                        return $;
	                    }

	                    // compatible for node.js
	                    if(typeof(global) !== 'undefined' && typeof(global[statement]) === 'function' && global[statement].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
	                        return $;
	                    }

	                    // avoid re-declare registered function, if not do this, template 
	                    // `{@if registered_func(name)}` could be throw undefined.

	                    if(typeof(juicer.options._method[statement]) === 'function' || juicer.options._method.hasOwnProperty(statement)) {
	                        method.push(statement);
	                        return $;
	                    }

	                    // avoid SyntaxError: Unexpected number

	                    if(statement.match(/^\d+/igm)) {
	                        return $;
	                    }

	                    buffer.push(statement); // fuck ie
	                }

	                return $;
	            };

	            tpl.replace(juicer.settings.forstart, variableAnalyze).
	                replace(juicer.settings.interpolate, variableAnalyze).
	                replace(juicer.settings.ifstart, variableAnalyze).
	                replace(juicer.settings.elseifstart, variableAnalyze).
	                replace(juicer.settings.include, variableAnalyze).
	                replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_0-9]+)/igm, variableAnalyze);

	            for(var i = 0; i < buffer.length; i++) {
	                prefix += 'var ' + buffer[i] + '=_.' + buffer[i] + ';';
	            }

	            for(var i = 0; i < method.length; i++) {
	                prefix += 'var ' + method[i] + '=_method.' + method[i] + ';';
	            }

	            return '<% ' + prefix + ' %>';
	        };

	        this.__convert=function(tpl, strip) {
	            var buffer = [].join('');

	            buffer += "'use strict';"; // use strict mode
	            buffer += "var _=_||{};";
	            buffer += "var _out='';_out+='";

	            if(strip !== false) {
	                buffer += tpl
	                    .replace(/\\/g, "\\\\")
	                    .replace(/[\r\t\n]/g, " ")
	                    .replace(/'(?=[^%]*%>)/g, "\t")
	                    .split("'").join("\\'")
	                    .split("\t").join("'")
	                    .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
	                    .split("<%").join("';")
	                    .split("%>").join("_out+='")+
	                    "';return _out;";

	                return buffer;
	            }

	            buffer += tpl
	                    .replace(/\\/g, "\\\\")
	                    .replace(/[\r]/g, "\\r")
	                    .replace(/[\t]/g, "\\t")
	                    .replace(/[\n]/g, "\\n")
	                    .replace(/'(?=[^%]*%>)/g, "\t")
	                    .split("'").join("\\'")
	                    .split("\t").join("'")
	                    .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
	                    .split("<%").join("';")
	                    .split("%>").join("_out+='")+
	                    "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";

	            return buffer;
	        };

	        this.parse = function(tpl, options) {
	            var _that = this;

	            if(!options || options.loose !== false) {
	                tpl = this.__lexicalAnalyze(tpl) + tpl;
	            }

	            tpl = this.__removeShell(tpl, options);
	            tpl = this.__toNative(tpl, options);

	            this._render = new Function('_, _method', tpl);

	            this.render = function(_, _method) {
	                if(!_method || _method !== that.options._method) {
	                    _method = __creator(_method, that.options._method);
	                }

	                return _that._render.call(this, _, _method);
	            };

	            return this;
	        };
	    };

	    juicer.compile = function(tpl, options) {
	        if(!options || options !== this.options) {
	            options = __creator(options, this.options);
	        }

	        var that = this;
	        var cacheStore = {
	            get: function(tpl) {
	                if(options.cachestore) {
	                    return options.cachestore.get(tpl);
	                }

	                return that.__cache[tpl];
	            },

	            set: function(tpl, val) {
	                if(options.cachestore) {
	                    return options.cachestore.set(tpl, val);
	                }

	                return that.__cache[tpl] = val;
	            }
	        };

	        try {
	            var engine = cacheStore.get(tpl) ? 
	                cacheStore.get(tpl) : 
	                new this.template(this.options).parse(tpl, options);

	            if(!options || options.cache !== false) {
	                cacheStore.set(tpl, engine);
	            }

	            return engine;

	        } catch(e) {
	            __throw('Juicer Compile Exception: ' + e.message);

	            return {
	                render: function() {} // noop
	            };
	        }
	    };

	    juicer.to_html = function(tpl, data, options) {
	        if(!options || options !== this.options) {
	            options = __creator(options, this.options);
	        }

	        return this.compile(tpl, options).render(data, options._method);
	    };

	    // avoid memory leak for node.js
	    if(typeof(global) !== 'undefined' && typeof(window) === 'undefined') {
	        juicer.set('cache', false);
	    }

	    if(typeof(document) !== 'undefined' && document.body) {
	        juicer.documentHTML = document.body.innerHTML;
	    }

	    typeof(module) !== 'undefined' && module.exports ? module.exports = juicer : this.juicer = juicer;

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	typeof window == 'undefined' && (Calendar = __webpack_require__(210));
	module.exports = [
	    {field: 'publish_id', title: '信息ID', width: 350},
	    {field: 'publish_title', title: '信息标题', width: 150},
	    {field: 'publish_content_pure', title: '信息内容', width: 150},
	    {field: 'create_time', title: '发布时间', width: 150},
	    {field: 'update_time', title: '更新时间', width: 150},
	    {field: 'is_show', title: '是否显示', width: 100,formatter: function (val) {
	        return val==1?'显示':'隐藏';
	    }},
	    {field: 'is_publish', title: '是否发布', width: 100,formatter: function (val) {
	        return val==1?'已发布':'未发布';
	    }}
	];

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 报修信息列表维护 
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(247);
	__webpack_require__(181);
	var juicer = __webpack_require__(244);
	__webpack_require__(249);
	__webpack_require__(250);
	__webpack_require__(251);
	var ReportList = function () {};

	//继承自框架基类
	ReportList.prototype = $.extend({}, frameworkBase);
	ReportList.prototype.id = 'report-list';
	var widgetLiTpl = "<li class='shadow-block view-block ${it.new?\"uk-animation-scale-up\":\"\"}'>" +
	    "    <header class='title'>" +
	    "    <span class='fa fa-bell' style='color:${it.is_handle==\"1\"?\"#009587\":\"#E74C3C\"}'></span>" +
	    "     ${it.report_title}" +
	    "    <i>${it.update_time}</i>" +
	    "    </header>" +
	    "    <article class='content clearfix'><p>$${it.report_content}</p>" +
	    "       <dl class='content clearfix'>" +
	    "       {@each it.photos as photo}  " +
	    "           <dd><img class='overview' src='${host}/${photo}'></dd>" +
	    "       {@/each}" +
	    "       </dl>" +
	    "   </article>" +

	    "    </li>" ;
	var widgetTpl = "<ul>" +
	    "{@each rows as it}" +
	    widgetLiTpl+
	    "     {@/each}" +
	    "    </ul>";



	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	ReportList.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('报修信息列表').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	};

	ReportList.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/report-list.html').then(function(html){
	        that.render(html);
	        $('.tablecontainer',that.dom).height(that.dom.height()-55);
	        that.initTable();
	        that.bindEvents();
	    });
	};

	ReportList.prototype.initTable = function () {
	    var that = this;
	    $('.easyui-linkbutton',this.dom).linkbutton();
	    var columns = __webpack_require__(258);
	    that.$table = $('#dataTable',this.dom).datagrid({
	        url: '/report/search',
	        method: 'get',
	        columns: [columns],
	        cache:false,
	        pagination: true,
	        pageSize: 20,
	        ctrlSelect: true,
	        checkOnSelect: true,
	        selectOnCheck: true,
	        loadMsg: '正在查询，请稍候……',
	        striped: true,
	        fit: true,
	        fitColumns: true,
	        loadFilter: function (data) {
	            if(!data.success){
	                that.toast(data.message);
	            }
	            return data.data;
	        },
	        onDblClickRow: function (rowIndex, rowData) {
	            Events.require('report-view').init({showType:'Pop',report_id:rowData.report_id});
	        },
	        toolbar: '#report-list-toolbar'
	    });

	    var searchBox = $('#report-list #home-easyui-searchbox',that.dom).searchbox({
	        searcher: function (value, name) {
	            Events.notify('onRefresh:report-list');
	        },
	        prompt: '请输关键字，如报修标题'
	    });

	    var startDate = $("#startdate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:report-list');
	        }
	    });
	    var endDate = $("#enddate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:report-list');
	        }
	    });

	    //绑定下拉框事件 通知刷新消息
	    $('#is_handle',this.dom).on('change',function(){
	        Events.notify('onRefresh:report-list');
	    });

	    //订阅刷新消息
	    Events.subscribe('onRefresh:report-list',function(){
	        that.$table.datagrid('load',{
	            key:searchBox.searchbox('getValue'),
	            is_handle:$('#is_handle',that.dom).val(),
	            startdate:startDate.combo('getValue').replace(/-/gi,''),
	            enddate:endDate.combo('getValue').replace(/-/gi,'')
	        });
	    });
	};


	/**
	 * 绑定按钮点击事件
	 */
	ReportList.prototype.bindEvents = function () {
	    var that = this;

	    $('#view_message_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('report-view').init({showType:'Pop',report_id:rowData.report_id});
	    });
	    //删除信息
	    $('#delete_message_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        that.save('/report/save',{action:'003',report_id:rowData.report_id},function(data){
	            if(data.success){
	                that.toast("删除信息成功!");
	                Events.notify('onRefresh:report-list');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });
	    //设置是否已处理
	    $('#set_handle_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        that.save('/report/save',{
	            action:'002',
	            report_id:rowData.report_id,
	            is_handle:rowData.is_handle == '0'?'1':'0'
	        },function(data){
	            if(data.success){
	                that.toast((rowData.is_handle == '0'?'已处理':'未处理'));
	                Events.notify('onRefresh:report-list');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });

	    function getSelectRow(){
	        var rowData = that.$table.datagrid('getSelected');
	        if(!rowData){
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        return rowData;
	    }
	};

	/**
	 * 加载插件
	 */
	ReportList.prototype.loadWidgets = function(temp){
	    var widget = null,that = this;
	    if(temp && $.isArray(temp)){
	        temp.forEach(function(i){
	           if(i.module.indexOf('report-list')!=-1){
	               widget = i;
	               return false;
	           }
	        });
	    }
	    if(widget == null)
	        return;
	    var $dom = $(widget.container);
	    if(widget.id){
	        this.query('/report/search-id',{report_id:widget.id},function(ret){
	            if(!ret.success){
	                that.toast(ret.message);
	                return;
	            }
	            if(ret.data.photos == '')
	                ret.data.photos = [];
	            else
	                ret.data.photos = ret.data.photos.split(';');
	            ret.data.host = $.getDomain();
	            var html = juicer(widgetTpl, {rows:[ret.data]});
	            $dom.html(html);
	        });
	    }else{
	        this.query('/report/search',{detail:true},function(ret){
	            if(!ret.success){
	                that.toast(ret.message);
	                return;
	            }
	            ret.data.rows.forEach(function(item){
	                if(item.photos == '')
	                    item.photos = [];
	                else
	                    item.photos = item.photos.split(';');
	            });
	            ret.data.host = $.getDomain();
	            var html = juicer(widgetTpl, ret.data);
	            $dom.html(html);

	        });
	    }

	    Events.subscribe('websocket:report-new',function(data){
	        console.log(JSON.stringify(data));
	        data.photos = data.photos?data.photos.split(';'):[];
	        data.new = true;
	        var obj = {
	            it:data,
	            host:$.getDomain()
	        };

	        var html = juicer(widgetLiTpl, obj);
	        $dom.find('ul').prepend(html);
	    });
	    $dom.on('click','.overview',function(){
	        var $this = $(this);
	        $.lightbox(function(){
	            var array = [];
	            $this.parent().parent().find('.overview').each(function(){
	                array.push($(this).attr('src'));
	            });
	            return array;
	        }(),$this.parent().index(),{
	            left:function(){
	                return $this.offset().left-$(window).scrollLeft();
	            }(),
	            top:function(){
	                return $this.offset().top-$(window).scrollTop();
	            }(),
	            width:$this.width(),
	            height:$this.height()
	        });
	    });
	};

	/**
	 * 销毁插件
	 */
	ReportList.prototype.destoryWidgets = function(){
	    Events.unsubscribe('websocket:report-new');
	};
	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	ReportList.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:report-list');
	    frameworkBase.finish.apply(this,arguments);
	};

	var reportList = new ReportList();
	Events.subscribe('onWindowResize',function(){
	    if(!reportList.dom)
	        return;
	    $('.tablecontainer',reportList.dom).height(reportList.dom.height()-15-$('.condition-wrap',reportList.dom).height());
	    reportList.$table.datagrid('resize');
	});

	module.exports = reportList;

/***/ },
/* 247 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 248 */,
/* 249 */
/***/ function(module, exports) {

	/**
	 * Created by IBM on 2015/4/1.
	 */
	/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
	 * Licensed under the MIT License (LICENSE.txt).
	 *
	 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
	 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
	 * Thanks to: Seamus Leahy for adding deltaX and deltaY
	 *
	 * Version: 3.0.6
	 *
	 * Requires: 1.2.2+
	 */

	(function($) {

	    var types = ['DOMMouseScroll', 'mousewheel'];

	    if ($.event.fixHooks) {
	        for ( var i=types.length; i; ) {
	            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
	        }
	    }

	    $.event.special.mousewheel = {
	        setup: function() {
	            if ( this.addEventListener ) {
	                for ( var i=types.length; i; ) {
	                    this.addEventListener( types[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = handler;
	            }
	        },

	        teardown: function() {
	            if ( this.removeEventListener ) {
	                for ( var i=types.length; i; ) {
	                    this.removeEventListener( types[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = null;
	            }
	        }
	    };

	    $.fn.extend({
	        mousewheel: function(fn) {
	            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	        },

	        unmousewheel: function(fn) {
	            return this.unbind("mousewheel", fn);
	        }
	    });


	    function handler(event) {
	        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
	        event = $.event.fix(orgEvent);
	        event.type = "mousewheel";

	        // Old school scrollwheel delta
	        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
	        if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

	        // New school multidimensional scroll (touchpads) deltas
	        deltaY = delta;

	        // Gecko
	        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
	            deltaY = 0;
	            deltaX = -1*delta;
	        }

	        // Webkit
	        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
	        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

	        // Add event and delta to the front of the arguments
	        args.unshift(event, delta, deltaX, deltaY);

	        return ($.event.dispatch || $.event.handle).apply(this, args);
	    }

	})(jQuery);

/***/ },
/* 250 */
/***/ function(module, exports) {

	/**
	 * Created by yanglang on 2015/4/1.
	 * 全屏查看图片 灯箱模块
	 * @author yanglang
	 */
	(function($){
	        var $box,$wrap,$img,$mask,imgFocus = false,ratio=false,initRect = null,initIndex = 0,index = 0,
	            html = '<div class="lightbox" onselectstart="return false">' +
	                '<div class="pictureWrap shadow"><img src=""/><span class="close"></span>' +
	                '</div>' +
	                '<span class="prev"></span>' +
	                '<span class="next"></span>' +
	                '<span class="tip">小提示：您可以使用鼠标滚轮切换与缩放图片，单击图片以激活缩放功能。</span>' +
	                '<span class="message"></span></div>';
	        /**
	         * 重新计算图片大小
	         * @param img
	         */
	        var calImg = function(img){
	            var $img = $(img),tempImage = new Image();
	            tempImage.onload = function() {
	                //获取当前窗口容许图片显示的最大宽高值
	                var winWidth = $(window).width(),winHeight = $(window).height(),maxWidth = winWidth*80/100,maxHeight = winHeight*95/100,
	                    wrapWidth = $wrap.width();
	                //若图片大小大于阈值 则调整大小
	                var rect = {
	                    width:tempImage.width,
	                    height:tempImage.height
	                };
	                if(tempImage.height>maxHeight || tempImage.width> maxWidth)
	                    rect = resizeImg(img,maxWidth,maxHeight,tempImage.width,tempImage.height);
	                //重置包裹层大小与位置
	                if($.browser.msie && parseInt($.browser.version,10)<10){
	                    $wrap.removeClass('shadow').stop().animate({
	                        'margin-top':(-rect.height/2)+"px",
	                        'margin-left':(-rect.width/2)+"px",
	                        width:rect.width+"px",
	                        height:rect.height+"px",
	                        left:'50%',
	                        top:'50%'
	                    },function(){
	                        $wrap.addClass('shadow');
	                        //调整左右按钮位置
	                        $('.prev',$box).animate({'left':(winWidth-wrapWidth)/4+"px"});
	                        $('.next',$box).animate({'right':(winWidth-wrapWidth)/4+"px"});
	                    });
	                }else{
	                    $wrap.css({
	                        'margin-top':(-rect.height/2)+"px",
	                        'margin-left':(-rect.width/2)+"px",
	                        width:rect.width+"px",
	                        height:rect.height+"px",
	                        left:'50%',
	                        top:'50%'
	                    });
	                    //调整左右按钮位置
	                    $('.prev',$box).css({'left':(winWidth-rect.width)/4+"px"});
	                    $('.next',$box).css({'right':(winWidth-rect.width)/4+"px"});
	                }

	                $img.css({
	                    width:'100%',
	                    height:'100%'
	                });
	            };
	            tempImage.src = $img.attr('src');
	        };
	        /**
	         * resizeImg 重新调整图片大小
	         * @param ImgD 图片dom对象
	         * @param MaxWidth 最大宽值
	         * @param MaxHeight 最大高值
	         */
	        var resizeImg = function(ImgD, MaxWidth, MaxHeight,width,height) {
	            var image = new Image();
	            image.src = ImgD.src;
	            image.width = width;
	            image.height = height;
	            if (image.width > 0 && image.height > 0) {
	                if (image.width / image.height >= MaxWidth / MaxHeight) {
	                    return image.width > MaxWidth?{
	                        width:  MaxWidth,
	                        height: (image.height * MaxWidth) / image.width
	                    }:{
	                        width:  image.width,
	                        height: image.height
	                    };
	                } else {
	                    return image.height > MaxHeight?{
	                        height:  MaxHeight,
	                        width:(image.width * MaxHeight) / image.height
	                    }:{
	                        width:  image.width,
	                        height: image.height
	                    };
	                }
	            }
	        };

	        var dragUtil = {
	            drag:false,
	            startFunc:function(e){
	                var that = this;
	                imgFocus = true;
	                dragUtil.master = that;
	                dragUtil.drag = true;
	                //记录初始位置
	                dragUtil.offsetX = parseFloat($img.css('left'),10);
	                dragUtil.offsetY = parseFloat($img.css('top'),10);
	                dragUtil.x = e.clientX;
	                dragUtil.y = e.clientY;
	                $(document).bind("mousemove", dragUtil.movingFunc).bind("mouseup",
	                    dragUtil.endFunc).bind('selectstart',function(){return false});
	            },
	            endFunc:function(e){
	                dragUtil.drag = false;
	                e.cancelBubble = true;
	                $(document).unbind("mousemove").unbind("mouseup").unbind('selectstart');
	                return false;
	            },
	            movingFunc:function(e){
	                if (dragUtil.drag) {
	                    var top = e.clientY-dragUtil.y + dragUtil.offsetY;
	                    var left = e.clientX - dragUtil.x+dragUtil.offsetX;
	                    $img.css({
	                        'left':left,
	                        'top':top
	                    });
	                }
	            }
	        };

	        var LightBox = {
	            init:function(images,i,rect){
	                var that = this;
	                $mask = $('<div class="mask" onselectstart="return false"></div>').appendTo($('body'))
	                    .css({opacity:0.7}).fadeIn(200);

	                this.images = images;
	                $box = $(html).appendTo($('body'));
	                $wrap = $('.pictureWrap',$box);
	                if($.browser.msie && parseInt($.browser.version,10)<9){
	                    rect =null;
	                }
	                if(rect){
	                    initRect = rect;
	                    $wrap.css({
	                        'margin-top':"0px",
	                        'margin-left':"0px",
	                        left:rect.left,
	                        top:rect.top,
	                        width:rect.width,
	                        height:rect.height
	                    });
	                }
	                $wrap.addClass('ani');
	                $img = $('img',$box);
	                index = i;
	                initIndex = i;
	                //1 绑定onload事件
	                $img[0].onload = function() {
	                    calImg(this);
	                };
	                $img.mousedown(function(e){
	                    dragUtil.startFunc.apply(that,[e]);
	                });
	                //禁用浏览器自身的拖拽事件
	                document.ondragstart = function () { return false; };
	                //2 设置图片src属性
	                //这两步不能颠倒，否则在IE低版本上会触发不了onload事件
	                $img.attr('src',images[index]);
	                //绑定上一张图片按钮事件
	                $('.prev',$box).click(function(){
	                    that.prevImage();
	                });
	                //绑定下一张图片按钮事件
	                $('.next',$box).click(function(){
	                    that.nextImage();
	                });
	                if(that.images.length == 1){
	                    $('.prev,.next').hide();
	                }
	                $('.close',$box).click(function(){
	                    that.close();
	                });
	                that.bindMouseWheelEvent();

	                $box.click(function(){
	                    imgFocus = false;
	                });
	                $img.click(function(){
	                    imgFocus = true;
	                    return false;
	                });
	                window.setTimeout(function(){
	                    $img.dblclick(function(e){
	                        if(ratio){
	                            $img.animate({
	                                left:0,
	                                top:0,
	                                width:$wrap.width(),
	                                height:$wrap.height()
	                            });
	                            ratio = false;
	                            imgFocus = false;
	                        }else{
	                            that.zoomInImage(e,2);
	                        }
	                        return false;
	                    });
	                    $wrap.dblclick(function(){
	                        $img.animate({
	                            left:0,
	                            top:0,
	                            width:$wrap.width(),
	                            height:$wrap.height()
	                        })
	                    });
	                    $('.close',$wrap).fadeIn();
	                },500);

	            },
	            /**
	             * 跳到下一张图片
	             */
	            nextImage:function(){
	                if(index == this.images.length-1){
	                    if($('.message',$box).is(':visible'))
	                        return;
	                    $('.message',$box).html('此图片已是最后一张').show();
	                    window.setTimeout(function(){
	                        $('.message',$box).hide();
	                    },1200);
	                    return;
	                }
	                if($img.is(':animated'))
	                    return;
	                var that = this;
	                $img.css('left',0).css('top',0)
	                    .attr('src',that.images[++index]);
	                ratio = false;
	            },
	            /**
	             * 跳到上一张图片
	             */
	            prevImage:function(){
	                if(index == 0){
	                    if($('.message',$box).is(':visible'))
	                        return;
	                    $('.message',$box).html('此图片已是第一张').show();
	                    window.setTimeout(function(){
	                        $('.message',$box).hide();
	                    },1200);
	                    return;
	                }
	                if($img.is(':animated'))
	                    return;
	                var that = this;
	                $img.css('left',0).css('top',0)
	                    .attr('src',that.images[--index]);
	                ratio = false;
	            },
	            /**
	             * 放大图片
	             */
	            zoomInImage:function(event,scale){
	                var width, height, left, top, offsetLeft, offsetTop, wrapLeft, wrapTop, newLeft, newTop;
	                if ($img.is(':animated') || (width = $img.width()) > 5000)
	                    return;
	                height = $img.height();
	                left = parseFloat($img.css('left'), 10);
	                top = parseFloat($img.css('top'), 10);
	                offsetLeft = $img.offset().left;
	                offsetTop = $img.offset().top;
	                wrapLeft = $wrap.offset().left;
	                wrapTop = $wrap.offset().top;
	                newLeft = -((event.pageX - offsetLeft) / (width / 2 )) * (width * (scale ? (scale - 1) / 2 : .2)) + left;
	                newTop = -((event.pageY - offsetTop ) / (height / 2)) * (height * (scale ? (scale - 1) / 2 : .2)) + top;
	                $img.animate({
	                    width: width * (scale ? scale : 1.4),
	                    height: height * (scale ? scale : 1.4),
	                    left: newLeft,
	                    top: newTop
	                }, 300);
	                ratio = true;
	            },
	            /**
	             * 缩小图片
	             */
	            zoomOutImage:function(event,scale){
	                var width, height, left, top, offsetLeft, offsetTop, wrapLeft, wrapTop, newLeft, newTop;
	                if ($img.is(':animated') || (width = $img.width()) < 200)
	                    return;
	                height = $img.height();
	                left = parseFloat($img.css('left'), 10);
	                top = parseFloat($img.css('top'), 10);
	                offsetLeft = $img.offset().left;
	                offsetTop = $img.offset().top;
	                wrapLeft = $wrap.offset().left;
	                wrapTop = $wrap.offset().top;
	                newLeft = ((event.pageX - offsetLeft) / (width / 2 )) * (width * (scale ? (1 - scale) / 2 : .2)) + left;
	                newTop = ((event.pageY - offsetTop ) / (height / 2)) * (height * (scale ? (1 - scale) / 2 : .2)) + top;
	                $img.animate({
	                    width: width * (scale ? scale : .6),
	                    height: height * (scale ? scale : .6),
	                    left: newLeft,
	                    top: newTop
	                }, 300);
	                ratio = true;
	            },
	            mousedot : 0,
	            bindMouseWheelEvent:function() {
	                var that = this;
	                /**此处有bug 好像必须先绑定一次才能在第二次绑定时触发mousewheel的代理事件**/
	                $(document).bind('mousewheel', function(event, delta, deltaX, deltaY) {});
	                $(document).unbind('mousewheel');
	                /**解绑**/

	                $(document).bind('mousewheel', function(event, delta, deltaX, deltaY) {
	                    //过滤自定义事件 好像也有个bug 自定义事件没有消除掉
	                    if(arguments.length == 1)
	                        return;
	                    that.mousedot += delta;
	                    if(that.mousedot>2){
	                        if(imgFocus){
	                            //图片具有焦点（模拟） 则放大图片
	                            that.zoomInImage(event);
	                        }else{
	                            //图片不具有焦点 则直接上下切换图片
	                            that.prevImage();
	                        }
	                        that.mousedot = 0;
	                    }else if(that.mousedot<-2){
	                        if(imgFocus){
	                            //图片具有焦点（模拟） 则缩小图片
	                            that.zoomOutImage(event);
	                        }else{
	                            //图片不具有焦点 则直接上下切换图片
	                            that.nextImage();
	                        }
	                        that.mousedot = 0;
	                    }
	                    return false;
	                });
	            },
	            unbindMouseWheelEvent:function (){
	                $(document).unbind('mousewheel');
	                this.mousedot = 0;
	            },
	            /**
	             * 关闭方法
	             */
	            close:function(){
	                if(initRect && initIndex == index){
	                    $('.close',$box).hide();

	                    $img.animate({
	                        left:0,
	                        top:0,
	                        width:'100%',
	                        height:'100%'
	                    },200);

	                    if($.browser.msie && parseInt($.browser.version,10)<10){
	                        $wrap.removeClass('shadow').animate({
	                            'margin-top':"0px",
	                            'margin-left':"0px",
	                            left:initRect.left,
	                            top:initRect.top,
	                            width:initRect.width,
	                            height:initRect.height
	                        },function(){
	                            $box.remove();
	                        });
	                    }else{
	                        $wrap.removeClass('shadow').css({
	                            'margin-top':"0px",
	                            'margin-left':"0px",
	                            left:initRect.left,
	                            top:initRect.top,
	                            width:initRect.width,
	                            height:initRect.height
	                        });
	                        window.setTimeout(function(){
	                            $box.remove();
	                        },400);
	                    }
	                }else{
	                    $box.fadeOut(200,function(){
	                        $(this).remove();
	                    });
	                }

	                $mask.fadeOut(200,function(){
	                    $(this).remove();
	                });
	                this.unbindMouseWheelEvent();
	                //启用浏览器自身的拖拽事件
	                document.ondragstart = function () { return true; };
	            }
	        };
	        $.lightbox = function(images,i,rect){
	            LightBox.init(images,i,rect);
	            return {
	                images:[],
	                nextImage:function(){
	                    LightBox.nextImage();
	                },
	                prevImage:function(){
	                    LightBox.prevImage();
	                },
	                close:function(){
	                    LightBox.close();
	                }
	            };
	        };

	})(jQuery);




/***/ },
/* 251 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	typeof window == 'undefined' && (Calendar = __webpack_require__(210));
	module.exports = [
	    {field: 'report_id', title: '信息ID', width: 350},
	    {field: 'report_title', title: '信息标题', width: 150},
	    {field: 'report_content', title: '信息内容', width: 150},
	    {field: 'create_time', title: '发布时间', width: 150},
	    {field: 'update_time', title: '更新时间', width: 150},
	    {field: 'is_handle', title: '是否已处理', width: 100,formatter: function (val) {
	        return val==1?'已处理':'未处理';
	    }},
	];

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 菜单新增修改模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(260);
	__webpack_require__(181);
	__webpack_require__(214);
	__webpack_require__(215);
	var MenuAddModify = function(){ };

	//继承自框架基类
	MenuAddModify.prototype = $.extend({},frameworkBase);
	MenuAddModify.prototype.id = 'menu-add-modify';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	MenuAddModify.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({action:'001'},options);
	    that.setTitle(this.options.action == '001'?'添加菜单':'编辑菜单').setHeight(420).setWidth(400);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	    if(this.options.action == '002'){
	        this.restoreData();
	    }
	};

	MenuAddModify.prototype.loadBaseView = function(options){
	    var that = this;
	    var html = __webpack_require__(262);
	    this.render(html);



	};  

	MenuAddModify.prototype.bindEvents = function(){
	    var that = this;
	    $('#confirmBtn',this.dom).click(function(){
	        var menu_title = $('#menu_title',that.dom).val();
	        var menu_url = $('#menu_url',that.dom).val();
	        if($.trim(menu_title) === '' ){
	            swal("提示", "请输入菜单标题!", "warning");
	            return;
	        }
	        that.save('/menu/save',{
	            action:that.options.action,
	            menu_id:that.options.menu_id,
	            menu_title:menu_title,
	            menu_url:menu_url,
	            show_type:$('#show_type',that.dom).val(),
	            menu_type:$('#menu_type',that.dom).val(),
	            menu_icon:$('#menu_icon',that.dom).val(),
	            menu_device:$('#menu_device',that.dom).val(),
	            menu_parent_id:$('#menu_parent_id',that.dom).attr('data-pid')
	        },function(data){
	            if(!data.success){
	                that.toast(data.message);
	                return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });

	    this.$treepanel = $('<div id="menu_tree_panel" class="dropdown_panel"><ul id="menuTree" class="ztree"></ul></div>').appendTo($('body'));
	    var $menu_parent_id = $('#menu_parent_id',this.dom);

	    $menu_parent_id.click(function(){
	        var offset = $menu_parent_id.offset();
	        that.$treepanel.css({
	            left:offset.left,
	            top:offset.top+30,
	            width:$menu_parent_id.outerWidth()
	        });
	        that.$treepanel.is(':visible')?(that.$treepanel.hide()):(that.$treepanel.show());
	        return false;
	    });
	    this.$treepanel.click(function(){
	        return false;
	    });
	    this.initMenuTree(1);
	    $('#menu_device',that.dom).on('change',function(){
	       that.initMenuTree($(this).val());
	    });
	};

	MenuAddModify.prototype.initMenuTree = function(type){
	    var that = this;
	    this.query('/menu/list',{menu_device:type},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data.data.push({'menu_id':'0','menu_parent_id':null,'menu_title':'根节点','menu_url':''});
	        var setting = {
	            data:{
	                keep:{
	                    parent:true,
	                    leaf:true
	                },
	                simpleData:{
	                    enable:true,
	                    idKey:'menu_id',
	                    pIdKey:'menu_parent_id',
	                    rootPId:null
	                },
	                key:{
	                    name:'menu_title',
	                    title:'menu_title'
	                }
	            },
	            callback:{
	                onClick:function(event, treeId, treeNode){
	                    //包括自己在内，如果层级大于2则不让选
	                    if(treeNode.getPath().length <3){
	                        //编辑模式下不让选择自己为自己的父节点 
	                        if(that.options.action == '002' && that.options.menu_id == treeNode.menu_id)
	                            return;
	                        $('#menu_parent_id',that.dom).val(treeNode.menu_title);
	                        $('#menu_parent_id',that.dom).attr('data-pid',treeNode.menu_id);
	                        hidePanel();
	                    }
	                }
	            }
	        };

	        var ztreeObj = $.fn.zTree.init($("#menuTree",that.$treepanel), setting,data.data);
	        ztreeObj.expandNode(ztreeObj.getNodes()[0], true, false, true);
	    });
	};

	function hidePanel(){
	    $('.dropdown_panel').hide();
	}
	$('body').on('click',function(){
	    hidePanel();
	});
	MenuAddModify.prototype.restoreData = function() {
	    var that = this;
	    this.query('/menu/search/'+this.options.menu_id,function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data = data.data;
	        $('#menu_title',that.dom).val(data.menu_title);
	        $('#menu_url',that.dom).val(data.menu_url);
	        $('#menu_icon',that.dom).val(data.menu_icon);
	        $('#show_type',that.dom).val(data.show_type);
	        $('#menu_type',that.dom).val(data.menu_type);
	        $('#menu_device',that.dom).val(data.menu_device);
	        that.initMenuTree(data.menu_device);
	        $('#menu_parent_id',that.dom).val(data.menu_parent_title);
	        $('#menu_parent_id',that.dom).attr('data-pid',data.menu_parent_id);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	MenuAddModify.prototype.finish = function () {
	    this.$treepanel.remove();
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new MenuAddModify();

/***/ },
/* 260 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 261 */,
/* 262 */
/***/ function(module, exports) {

	module.exports = "<div class=\"menu-add-modify\">\r\n    <div class=\"panel-body\">\r\n            <div class=\"form-group\">\r\n                <label>菜单标题：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入菜单标题\" name=\"menu_title\" id=\"menu_title\" type=\"text\" autofocus>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>菜单url：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入菜单url\" name=\"menu_url\" id=\"menu_url\" type=\"text\" value=\"\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>菜单icon：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入菜单icon样式名\" name=\"menu_icon\" id=\"menu_icon\" type=\"text\" value=\"\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>展式形式：</label>\r\n                <select id=\"show_type\" class=\"form-control\">\r\n                    <option value=\"1\" selected>普通</option>\r\n                    <option value=\"2\">弹窗</option>\r\n                    <option value=\"3\">无界面</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>菜单位置：</label>\r\n                <select id=\"menu_type\" class=\"form-control\">\r\n                    <option value=\"1\" selected>左侧菜单</option>\r\n                    <option value=\"2\">设置下拉菜单</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>设备类型：</label>\r\n                <select id=\"menu_device\" class=\"form-control\">\r\n                    <option value=\"1\" selected>PC</option>\r\n                    <option value=\"2\">H5</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>父级菜单：</label>\r\n                <input class=\"form-control\" placeholder=\"请选择父级菜单\" readonly=\"true\" name=\"menu_parent_id\" id=\"menu_parent_id\" type=\"text\" data-pid=\"0\" value=\"根菜单\">\r\n            </div>\r\n            <div class=\"btn-wrap\">\r\n                <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n                <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n            </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 菜单管理
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(264);
	__webpack_require__(181);
	var MenuManage = function () {};

	//继承自框架基类
	MenuManage.prototype = $.extend({}, frameworkBase);
	MenuManage.prototype.id = 'menu-manage';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	MenuManage.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('菜单管理').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	};

	MenuManage.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/menu-manage.html').then(function(html){
	        that.render(html);
	        $('.tablecontainer',that.dom).height(that.dom.height()-55);
	        that.initTable();
	        that.bindEvents();
	    });
	};

	MenuManage.prototype.initTable = function () {
	    var that = this;
	    $('.easyui-linkbutton',that.dom).linkbutton();
	    var columns = __webpack_require__(266);
	    that.$table = $('#dataTable',that.dom).datagrid({
	        url: '/menu/list',
	        method: 'get',
	        columns: [columns],
	        cache:false,
	        pagination: false,
	        pageSize: 20,
	        ctrlSelect: true,
	        checkOnSelect: true,
	        selectOnCheck: true,
	        loadMsg: '正在查询，请稍候……',
	        striped: true,
	        fit: true,
	        fitColumns: true,
	        loadFilter: function (data) {
	            if(!data.success){
	                that.toast(data.message);
	            }
	            return {rows: data.data, total: data.data.length};
	        },
	        onDblClickRow: function (rowIndex, rowData) {
	            Events.require('menu-add-modify').addCallback(function(flag){
	                if(flag)
	                    Events.notify('onRefresh:menu-manage');
	            }).init({showType:'Pop',action:'002',menu_id:rowData.menu_id});
	        },
	        toolbar: '#menu-manage-toolbar'
	    });

	    var searchBox = $('#menu-manage #home-easyui-searchbox',that.dom).searchbox({
	        searcher: function (value, name) {
	            Events.notify('onRefresh:menu-manage');
	        },
	        prompt: '请输关键字，如菜单标题、菜单url'
	    });

	    //绑定下拉框事件 通知刷新菜单
	    $('#show_type,#menu_type,#menu_device',that.dom).on('change',function(){
	        Events.notify('onRefresh:menu-manage');
	    });

	    //订阅刷新菜单
	    Events.subscribe('onRefresh:menu-manage',function(){
	        that.$table.datagrid('load',{
	            key:searchBox.searchbox('getValue'),
	            show_type:$('#show_type',that.dom).val(),
	            menu_device:$('#menu_device',that.dom).val(),
	            menu_type:$('#menu_type',that.dom).val()
	        });
	    });
	};
	/**
	 * 绑定按钮点击事件
	 */
	MenuManage.prototype.bindEvents = function () {
	    var that = this;
	    //添加菜单
	    $('#add_menu_btn',this.dom).click(function(){
	        Events.require('menu-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:menu-manage');
	        }).init({showType:'Pop'});
	    });
	    //修改菜单
	    $('#modify_menu_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('menu-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:menu-manage');
	        }).init({showType:'Pop',action:'002',menu_id:rowData.menu_id});
	    });
	    //删除菜单
	    $('#delete_menu_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        that.save('/menu/save',{action:'003',menu_id:rowData.menu_id},function(data){
	            if(data.success){
	                that.toast("删除菜单成功!");
	                Events.notify('onRefresh:menu-manage');
	            }else{
	                that.toast(data.message);
	            }
	        });
	    });
	    
	    function getSelectRow(){
	        var rowData = that.$table.datagrid('getSelected');
	        if(!rowData){
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        return rowData;
	    }
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	MenuManage.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:menu-manage');
	    frameworkBase.finish.apply(this,arguments);
	};

	var menuManage = new MenuManage();
	Events.subscribe('onWindowResize',function(){
	    if(!menuManage.dom)
	        return;
	    $('.tablecontainer',menuManage.dom).height(menuManage.dom.height()-15-$('.condition-wrap',menuManage.dom).height());
	    menuManage.$table.datagrid('resize');
	});

	module.exports = menuManage;

/***/ },
/* 264 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 265 */,
/* 266 */
/***/ function(module, exports) {

	module.exports = [
	    {field: 'menu_id', title: '菜单ID', width: 200},
	    {field: 'menu_title', title: '菜单标题', width: 150},
	    {field: 'menu_url', title: '菜单url', width: 150},
	    {field: 'show_type', title: '展示形式', width: 80,formatter: function (val) {
	        return val==1?'普通':val==2?'弹窗':'无界面';
	    }},
	    {field: 'menu_type', title: '菜单位置', width: 80,formatter: function (val) {
	        return val==1?'左侧菜单':val==2?'设置下拉菜单':'首页';
	    }},
	    {field: 'menu_device', title: '菜单用于设备', width: 80,formatter: function (val) {
	        return val==1?'PC':'H5';
	    }},
	    {field: 'menu_icon', title: '菜单图标样式名称', width: 150},
	    {field: 'menu_parent_title', title: '父菜单', width: 200}
	];

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 信息发布模块
	 * @author yanglang
	 * @type {Framework}
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(268);
	__webpack_require__(270);
	__webpack_require__(278);
	__webpack_require__(279);
	__webpack_require__(280);
	var MessagePublish = function(){ };

	//继承自框架基类
	MessagePublish.prototype = $.extend({},frameworkBase);
	MessagePublish.prototype.id = 'message-publish';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	MessagePublish.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({action:'001'},options);
	    that.setTitle('学校信息发布').setHeight(610).setWidth(780);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	    if(this.options.action == '002'){
	        this.restoreData();
	    }
	};

	MessagePublish.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(281);
	    this.render(html);
	};

	/**
	 * 修改状态返显数据
	 */
	MessagePublish.prototype.restoreData = function () {
	    var that = this;
	    this.query('/publish/search-id',{publish_id:this.options.publish_id},function(data){
	        if(data.success){
	            that.um.setContent(data.data.publish_content);
	            $('#title',that.dom).val(data.data.publish_title);
	        }else
	            that.toast(data.message);
	    });
	};

	MessagePublish.prototype.bindEvents = function () {
	    var that = this;
	    //实例化编辑器
	    that.um = UM.getEditor('myEditor');
	    
	    $('#submitBtn',this.dom).click(function(){
	        var content = that.um.getContent(), title = $('#title',that.dom).val();
	        if($.trim(content) == ''){
	            swal('提示','请输入信息内容','warning');
	            return;
	        }
	        if($.trim(title) == ''){
	            swal('提示','请输入标题','warning');
	            return;
	        }
	        that.save('/publish/save',{
	            action:that.options.action,
	            publish_id:that.options.publish_id,
	            publish_title:title,
	            publish_content:content,
	            publish_content_pure:that.um.getContentTxt()
	        },function(data){
	            data.success?(that.finish()):(that.toast(data.message));
	        });
	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish();
	    });
	    $('#title',this.dom)[0].focus();
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	MessagePublish.prototype.finish = function () {
	    try{
	        this.dom && this.dom.hide();
	        this.um.destroy();
	        frameworkBase.finish.apply(this,arguments);
	    }catch(e){
	        console.log(e);
	    }
	};
	/**
	 * 重新调整大小
	 */
	MessagePublish.prototype.resize = function () {
	    try{
	        this.um.setWidth(this.dom.width());
	    }catch(e){
	        console.log(e);
	    }
	};
	var messagePublish = new MessagePublish();
	Events.subscribe('onWindowResize',function(){
	    if(!messagePublish.dom || !messagePublish.um)
	        return;
	    messagePublish.resize();
	});

	module.exports = messagePublish;

/***/ },
/* 268 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 269 */,
/* 270 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */
/***/ function(module, exports) {

	/**
	 *  umeditor完整配置项
	 *  可以在这里配置整个编辑器的特性
	 */
	/**************************提示********************************
	 * 所有被注释的配置项均为UEditor默认值。
	 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
	 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
	 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
	 **************************提示********************************/


	(function () {
	    /**
	     * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
	     * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
	     * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/umeditor/"这样的路径。
	     * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
	     * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
	     * window.UMEDITOR_HOME_URL = "/xxxx/xxxx/";
	     */
	    var URL = window.UMEDITOR_HOME_URL || (function(){

	        function PathStack() {

	            this.documentURL = self.document.URL || self.location.href;

	            this.separator = '/';
	            this.separatorPattern = /\\|\//g;
	            this.currentDir = './';
	            this.currentDirPattern = /^[.]\/]/;

	            this.path = this.documentURL;
	            this.stack = [];

	            this.push( this.documentURL );

	        }

	        PathStack.isParentPath = function( path ){
	            return path === '..';
	        };

	        PathStack.hasProtocol = function( path ){
	            return !!PathStack.getProtocol( path );
	        };

	        PathStack.getProtocol = function( path ){

	            var protocol = /^[^:]*:\/*/.exec( path );

	            return protocol ? protocol[0] : null;

	        };

	        PathStack.prototype = {
	            push: function( path ){

	                this.path = path;

	                update.call( this );
	                parse.call( this );

	                return this;

	            },
	            getPath: function(){
	                return this + "";
	            },
	            toString: function(){
	                return this.protocol + ( this.stack.concat( [''] ) ).join( this.separator );
	            }
	        };

	        function update() {

	            var protocol = PathStack.getProtocol( this.path || '' );

	            if( protocol ) {

	                //根协议
	                this.protocol = protocol;

	                //local
	                this.localSeparator = /\\|\//.exec( this.path.replace( protocol, '' ) )[0];

	                this.stack = [];
	            } else {
	                protocol = /\\|\//.exec( this.path );
	                protocol && (this.localSeparator = protocol[0]);
	            }

	        }

	        function parse(){

	            var parsedStack = this.path.replace( this.currentDirPattern, '' );

	            if( PathStack.hasProtocol( this.path ) ) {
	                parsedStack = parsedStack.replace( this.protocol , '');
	            }

	            parsedStack = parsedStack.split( this.localSeparator );
	            parsedStack.length = parsedStack.length - 1;

	            for(var i= 0,tempPath,l=parsedStack.length,root = this.stack;i<l;i++){
	                tempPath = parsedStack[i];
	                if(tempPath){
	                    if( PathStack.isParentPath( tempPath ) ) {
	                        root.pop();
	                    } else {
	                        root.push( tempPath );
	                    }
	                }

	            }


	        }

	        var currentPath = document.getElementsByTagName('script');

	        currentPath = currentPath[ currentPath.length -1 ].src;

	        return new PathStack().push( currentPath ) + "";


	    })();

	    /**
	     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
	     */
	    window.UMEDITOR_CONFIG = {

	        //为编辑器实例添加一个路径，这个不能被注释
	        UMEDITOR_HOME_URL : URL

	        //图片上传配置区
	        ,imageUrl:"/file/upload"             //图片上传提交地址
	        ,imagePath:"/file/"                     //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
	        ,imageFieldName:"upfile"                   //图片数据的key,若此处修改，需要在后台对应文件修改对应参数


	        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
	        ,toolbar:[
	            'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
	            'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize' ,
	            '| justifyleft justifycenter justifyright justifyjustify |',
	            'link unlink | emotion image video  | map',
	            '| horizontal print preview ', 'drafts', 'formula'//fullscreen
	        ]

	        //语言配置项,默认是zh-cn。有需要的话也可以使用如下这样的方式来自动多语言切换，当然，前提条件是lang文件夹下存在对应的语言文件：
	        //lang值也可以通过自动获取 (navigator.language||navigator.browserLanguage ||navigator.userLanguage).toLowerCase()
	        //,lang:"zh-cn"
	        //,langPath:URL +"lang/"

	        //ie下的链接自动监测
	        //,autourldetectinie:false

	        //主题配置项,默认是default。有需要的话也可以使用如下这样的方式来自动多主题切换，当然，前提条件是themes文件夹下存在对应的主题文件：
	        //现有如下皮肤:default
	        //,theme:'default'
	        //,themePath:URL +"themes/"



	        //针对getAllHtml方法，会在对应的head标签中增加该编码设置。
	        //,charset:"utf-8"

	        //常用配置项目
	        //,isShow : true    //默认显示编辑器

	        //,initialContent:'欢迎使用UMEDITOR!'    //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子

	        //,initialFrameWidth:500 //初始化编辑器宽度,默认500
	        //,initialFrameHeight:500  //初始化编辑器高度,默认500

	        //,autoClearinitialContent:true //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了

	        //,textarea:'editorValue' // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值

	        //,focus:false //初始化时，是否让编辑器获得焦点true或false

	        //,autoClearEmptyNode : true //getContent时，是否删除空的inlineElement节点（包括嵌套的情况）

	        //,fullscreen : false //是否开启初始化时即全屏，默认关闭

	        //,readonly : false //编辑器初始化结束后,编辑区域是否是只读的，默认是false

	        //,zIndex : 900     //编辑器层级的基数,默认是900

	        //如果自定义，最好给p标签如下的行高，要不输入中文时，会有跳动感
	        //注意这里添加的样式，最好放在.edui-editor-body .edui-body-container这两个的下边，防止跟页面上css冲突
	        //,initialStyle:'.edui-editor-body .edui-body-container p{line-height:1em}'

	        //,autoSyncData:true //自动同步编辑器要提交的数据

	        //,emotionLocalization:false //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹

	        //,allHtmlEnabled:false //提交到后台的数据是否包含整个html字符串

	        //fontfamily
	        //字体设置
	//        ,'fontfamily':[
	//              { name: 'songti', val: '宋体,SimSun'},
	//          ]

	        //fontsize
	        //字号
	        //,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]

	        //paragraph
	        //段落格式 值留空时支持多语言自动识别，若配置，则以配置值为准
	        //,'paragraph':{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''}

	        //undo
	        //可以最多回退的次数,默认20
	        //,maxUndoCount:20
	        //当输入的字符数超过该值时，保存一次现场
	        //,maxInputCount:1

	        //imageScaleEnabled
	        // 是否允许点击文件拖拽改变大小,默认true
	        //,imageScaleEnabled:true

	        //dropFileEnabled
	        // 是否允许拖放图片到编辑区域，上传并插入,默认true
	        //,dropFileEnabled:true

	        //pasteImageEnabled
	        // 是否允许粘贴QQ截屏，上传并插入,默认true
	        //,pasteImageEnabled:true

	        //autoHeightEnabled
	        // 是否自动长高,默认true
	        ,autoHeightEnabled:false

	        //autoFloatEnabled
	        //是否保持toolbar的位置不动,默认true
	        ,autoFloatEnabled:true

	        //浮动时工具栏距离浏览器顶部的高度，用于某些具有固定头部的页面
	        //,topOffset:30

	        //填写过滤规则
	        //,filterRules: {}
	    };
	})();


/***/ },
/* 279 */
/***/ function(module, exports) {

	(function(g){function G(a,b,c){var d;b=b.toLowerCase();return(d=a.__allListeners||c&&(a.__allListeners={}))&&(d[b]||c&&(d[b]=[]))}function H(a,b,c,d,e,f){d=d&&a[b];var h;for(!d&&(d=a[c]);!d&&(h=(h||a).parentNode);){if("BODY"==h.tagName||f&&!f(h))return null;d=h[c]}return d&&e&&!e(d)?H(d,b,c,!1,e):d}UMEDITOR_CONFIG=window.UMEDITOR_CONFIG||{};window.UM={plugins:{},commands:{},I18N:{},version:"1.2.2"};var B=UM.dom={},m=UM.browser=function(){var a=navigator.userAgent.toLowerCase(),b=window.opera,c={ie:/(msie\s|trident.*rv:)([\w.]+)/.test(a),
	opera:!!b&&b.version,webkit:-1<a.indexOf(" applewebkit/"),mac:-1<a.indexOf("macintosh"),quirks:"BackCompat"==document.compatMode};c.gecko="Gecko"==navigator.product&&!c.webkit&&!c.opera&&!c.ie;var d=0;if(c.ie){var d=a.match(/(?:msie\s([\w.]+))/),e=a.match(/(?:trident.*rv:([\w.]+))/),d=d&&e&&d[1]&&e[1]?Math.max(1*d[1],1*e[1]):d&&d[1]?1*d[1]:e&&e[1]?1*e[1]:0;c.ie11Compat=11==document.documentMode;c.ie9Compat=9==document.documentMode;c.ie8=!!document.documentMode;c.ie8Compat=8==document.documentMode;
	c.ie7Compat=7==d&&!document.documentMode||7==document.documentMode;c.ie6Compat=7>d||c.quirks;c.ie9above=8<d;c.ie9below=9>d}c.gecko&&(e=a.match(/rv:([\d\.]+)/))&&(e=e[1].split("."),d=1E4*e[0]+100*(e[1]||0)+1*(e[2]||0));/chrome\/(\d+\.\d)/i.test(a)&&(c.chrome=+RegExp.$1);/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a)&&!/chrome/i.test(a)&&(c.safari=+(RegExp.$1||RegExp.$2));c.opera&&(d=parseFloat(b.version()));c.webkit&&(d=parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));c.version=d;c.isCompatible=
	!c.mobile&&(c.ie&&6<=d||c.gecko&&10801<=d||c.opera&&9.5<=d||c.air&&1<=d||c.webkit&&522<=d||!1);return c}(),E=m.ie,n=UM.utils={each:function(a,b,c){if(null!=a)if(a.length===+a.length)for(var d=0,e=a.length;d<e;d++){if(!1===b.call(c,a[d],d,a))return!1}else for(d in a)if(a.hasOwnProperty(d)&&!1===b.call(c,a[d],d,a))return!1},makeInstance:function(a){var b=new Function;b.prototype=a;a=new b;b.prototype=null;return a},extend:function(a,b,c){if(b)for(var d in b)c&&a.hasOwnProperty(d)||(a[d]=b[d]);return a},
	extend2:function(a){for(var b=arguments,c=1;c<b.length;c++){var d=b[c],e;for(e in d)a.hasOwnProperty(e)||(a[e]=d[e])}return a},inherits:function(a,b){var c=a.prototype,d=n.makeInstance(b.prototype);n.extend(d,c,!0);a.prototype=d;return d.constructor=a},bind:function(a,b){return function(){return a.apply(b,arguments)}},defer:function(a,b,c){var d;return function(){c&&clearTimeout(d);d=setTimeout(a,b)}},indexOf:function(a,b,c){var d=-1;c=this.isNumber(c)?c:0;this.each(a,function(a,f){if(f>=c&&a===b)return d=
	f,!1});return d},removeItem:function(a,b){for(var c=0,d=a.length;c<d;c++)a[c]===b&&(a.splice(c,1),c--)},trim:function(a){return a.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,"")},listToMap:function(a){if(!a)return{};a=n.isArray(a)?a:a.split(",");for(var b=0,c,d={};c=a[b++];)d[c.toUpperCase()]=d[c]=1;return d},unhtml:function(a,b){return a?a.replace(b||/[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g,function(a,b){return b?a:{"<":"&lt;","&":"&amp;",'"':"&quot;",">":"&gt;","'":"&#39;"}[a]}):""},html:function(a){return a?
	a.replace(/&((g|l|quo)t|amp|#39);/g,function(a){return{"&lt;":"<","&amp;":"&","&quot;":'"',"&gt;":">","&#39;":"'"}[a]}):""},cssStyleToDomStyle:function(){var a=document.createElement("div").style,b={"float":void 0!=a.cssFloat?"cssFloat":void 0!=a.styleFloat?"styleFloat":"float"};return function(a){return b[a]||(b[a]=a.toLowerCase().replace(/-./g,function(a){return a.charAt(1).toUpperCase()}))}}(),loadFile:function(){function a(a,d){try{for(var e=0,f;f=b[e++];)if(f.doc===a&&f.url==(d.src||d.href))return f}catch(h){return null}}
	var b=[];return function(c,d,e){var f=a(c,d);if(f)f.ready?e&&e():f.funs.push(e);else if(b.push({doc:c,url:d.src||d.href,funs:[e]}),!c.body){e=[];for(var h in d)"tag"!=h&&e.push(h+'="'+d[h]+'"');c.write("<"+d.tag+" "+e.join(" ")+" ></"+d.tag+">")}else if(!d.id||!c.getElementById(d.id)){var l=c.createElement(d.tag);delete d.tag;for(h in d)l.setAttribute(h,d[h]);l.onload=l.onreadystatechange=function(){if(!this.readyState||/loaded|complete/.test(this.readyState)){f=a(c,d);if(0<f.funs.length){f.ready=
	1;for(var b;b=f.funs.pop();)b()}l.onload=l.onreadystatechange=null}};l.onerror=function(){throw Error("The load "+(d.href||d.src)+" fails,check the url settings of file umeditor.config.js ");};c.getElementsByTagName("head")[0].appendChild(l)}}}(),isEmptyObject:function(a){if(null==a)return!0;if(this.isArray(a)||this.isString(a))return 0===a.length;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},fixColor:function(a,b){if(/color/i.test(a)&&/rgba?/.test(b)){var c=b.split(",");if(3<c.length)return"";
	b="#";for(var d=0,e;e=c[d++];)e=parseInt(e.replace(/[^\d]/gi,""),10).toString(16),b+=1==e.length?"0"+e:e;b=b.toUpperCase()}return b},clone:function(a,b){var c;b=b||{};for(var d in a)a.hasOwnProperty(d)&&(c=a[d],"object"==typeof c?(b[d]=n.isArray(c)?[]:{},n.clone(a[d],b[d])):b[d]=c);return b},transUnitToPx:function(a){if(!/(pt|cm)/.test(a))return a;var b;a.replace(/([\d.]+)(\w+)/,function(c,d,e){a=d;b=e});switch(b){case "cm":a=25*parseFloat(a);break;case "pt":a=Math.round(96*parseFloat(a)/72)}return a+
	(a?"px":"")},cssRule:m.ie&&11!=m.version?function(a,b,c){var d;c=c||document;d=c.indexList?c.indexList:c.indexList={};var e;if(d[a])e=c.styleSheets[d[a]];else{if(void 0===b)return"";e=c.createStyleSheet("",c=c.styleSheets.length);d[a]=c}if(void 0===b)return e.cssText;e.cssText=b||""}:function(a,b,c){c=c||document;var d=c.getElementsByTagName("head")[0],e;if(!(e=c.getElementById(a))){if(void 0===b)return"";e=c.createElement("style");e.id=a;d.appendChild(e)}if(void 0===b)return e.innerHTML;""!==b?e.innerHTML=
	b:d.removeChild(e)}};n.each("String Function Array Number RegExp Object".split(" "),function(a){UM.utils["is"+a]=function(b){return Object.prototype.toString.apply(b)=="[object "+a+"]"}});var I=UM.EventBase=function(){};I.prototype={addListener:function(a,b){a=n.trim(a).split(" ");for(var c=0,d;d=a[c++];)G(this,d,!0).push(b)},removeListener:function(a,b){a=n.trim(a).split(" ");for(var c=0,d;d=a[c++];)n.removeItem(G(this,d)||[],b)},fireEvent:function(){for(var a=arguments[0],a=n.trim(a).split(" "),
	b=0,c;c=a[b++];){var d=G(this,c),e,f,h;if(d)for(h=d.length;h--;)if(d[h]){f=d[h].apply(this,arguments);if(!0===f)return f;void 0!==f&&(e=f)}if(f=this["on"+c.toLowerCase()])e=f.apply(this,arguments)}return e}};var q=B.dtd=function(){function a(a){for(var b in a)a[b.toUpperCase()]=a[b];return a}var b=n.extend2,c=a({isindex:1,fieldset:1}),d=a({input:1,button:1,select:1,textarea:1,label:1}),e=b(a({a:1}),d),f=b({iframe:1},e),h=a({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,
	dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1}),l=a({ins:1,del:1,script:1,style:1}),s=b(a({b:1,acronym:1,bdo:1,"var":1,"#":1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}),l),p=b(a({sub:1,img:1,embed:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}),s),r=b(a({p:1}),p),d=b(a({iframe:1}),p,d),p=a({img:1,embed:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,
	"#":1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,"var":1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),g=b(a({a:0}),d),u=a({tr:1}),v=a({"#":1}),w=b(a({param:1}),p),k=b(a({form:1}),c,f,h,r),m=a({li:1,ol:1,ul:1}),x=a({style:1,script:1}),q=a({base:1,link:1,meta:1,title:1}),
	x=b(q,x),C=a({head:1,body:1}),z=a({html:1}),A=a({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),D=a({area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1});return a({$nonBodyContent:b(z,C,q),$block:A,$inline:g,$inlineWithA:b(a({a:1}),g),$body:b(a({script:1,style:1}),A),$cdata:a({script:1,style:1}),
	$empty:D,$nonChild:a({iframe:1,textarea:1}),$listItem:a({dd:1,dt:1,li:1}),$list:a({ul:1,ol:1,dl:1}),$isNotEmpty:a({table:1,ul:1,ol:1,dl:1,iframe:1,area:1,base:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1}),$removeEmpty:a({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1}),$removeEmptyBlock:a({p:1,div:1}),$tableContent:a({caption:1,
	col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1,table:1}),$notTransContent:a({pre:1,script:1,style:1,textarea:1}),html:C,head:x,style:v,script:v,body:k,base:{},link:{},meta:{},title:v,col:{},tr:a({td:1,th:1}),img:{},embed:{},colgroup:a({thead:1,col:1,tbody:1,tr:1,tfoot:1}),noscript:k,td:k,br:{},th:k,center:k,kbd:g,button:b(r,h),basefont:{},h5:g,h4:g,samp:g,h6:g,ol:m,h1:g,h3:g,option:v,h2:g,form:b(c,f,h,r),select:a({optgroup:1,option:1}),font:g,ins:g,menu:m,abbr:g,label:g,table:a({thead:1,
	col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1}),code:g,tfoot:u,cite:g,li:k,input:{},iframe:k,strong:g,textarea:v,noframes:k,big:g,small:g,span:a({"#":1,br:1,b:1,strong:1,u:1,i:1,em:1,sub:1,sup:1,strike:1,span:1}),hr:g,dt:g,sub:g,optgroup:a({option:1}),param:{},bdo:g,"var":g,div:k,object:w,sup:g,dd:k,strike:g,area:{},dir:m,map:b(a({area:1,form:1,p:1}),c,l,h),applet:w,dl:a({dt:1,dd:1}),del:g,isindex:{},fieldset:b(a({legend:1}),p),thead:u,ul:m,acronym:g,b:g,a:b(a({a:1}),d),blockquote:b(a({td:1,tr:1,
	tbody:1,li:1}),k),caption:g,i:g,u:g,tbody:u,s:g,address:b(f,r),tt:g,legend:g,q:g,pre:b(s,e),p:b(a({a:1}),g),em:g,dfn:g})}(),J=E&&9>m.version?{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder"}:{tabindex:"tabIndex",readonly:"readOnly"},K=n.listToMap("-webkit-box -moz-box block list-item table table-row-group table-header-group table-footer-group table-row table-column-group table-column table-cell table-caption".split(" ")),
	k=B.domUtils={NODE_ELEMENT:1,NODE_DOCUMENT:9,NODE_TEXT:3,NODE_COMMENT:8,NODE_DOCUMENT_FRAGMENT:11,POSITION_IDENTICAL:0,POSITION_DISCONNECTED:1,POSITION_FOLLOWING:2,POSITION_PRECEDING:4,POSITION_IS_CONTAINED:8,POSITION_CONTAINS:16,fillChar:E&&"6"==m.version?"\ufeff":"\u200b",keys:{8:1,46:1,16:1,17:1,18:1,37:1,38:1,39:1,40:1,13:1},breakParent:function(a,b){var c,d=a,e=a,f,h;do{d=d.parentNode;f?(c=d.cloneNode(!1),c.appendChild(f),f=c,c=d.cloneNode(!1),c.appendChild(h),h=c):(f=d.cloneNode(!1),h=f.cloneNode(!1));
	for(;c=e.previousSibling;)f.insertBefore(c,f.firstChild);for(;c=e.nextSibling;)h.appendChild(c);e=d}while(b!==d);c=b.parentNode;c.insertBefore(f,b);c.insertBefore(h,b);c.insertBefore(a,h);k.remove(b);return a},trimWhiteTextNode:function(a){function b(b){for(var d;(d=a[b])&&3==d.nodeType&&k.isWhitespace(d);)a.removeChild(d)}b("firstChild");b("lastChild")},getPosition:function(a,b){if(a===b)return 0;var c,d=[a],e=[b];for(c=a;c=c.parentNode;){if(c===b)return 10;d.push(c)}for(c=b;c=c.parentNode;){if(c===
	a)return 20;e.push(c)}d.reverse();e.reverse();if(d[0]!==e[0])return 1;for(c=-1;c++,d[c]===e[c];);a=d[c];for(b=e[c];a=a.nextSibling;)if(a===b)return 4;return 2},getNodeIndex:function(a,b){for(var c=a,d=0;c=c.previousSibling;)b&&3==c.nodeType?c.nodeType!=c.nextSibling.nodeType&&d++:d++;return d},inDoc:function(a,b){return 10==k.getPosition(a,b)},findParent:function(a,b,c){if(a&&!k.isBody(a))for(a=c?a:a.parentNode;a;){if(!b||b(a)||k.isBody(a))return b&&!b(a)&&k.isBody(a)?null:a;a=a.parentNode}return null},
	findParentByTagName:function(a,b,c,d){b=n.listToMap(n.isArray(b)?b:[b]);return k.findParent(a,function(a){return b[a.tagName]&&!(d&&d(a))},c)},findParents:function(a,b,c,d){for(b=b&&(c&&c(a)||!c)?[a]:[];a=k.findParent(a,c);)b.push(a);return d?b:b.reverse()},insertAfter:function(a,b){return a.parentNode.insertBefore(b,a.nextSibling)},remove:function(a,b){var c=a.parentNode,d;if(c){if(b&&a.hasChildNodes())for(;d=a.firstChild;)c.insertBefore(d,a);c.removeChild(a)}return a},getNextDomNode:function(a,
	b,c,d){return H(a,"firstChild","nextSibling",b,c,d)},getPreDomNode:function(a,b,c,d){return H(a,"lastChild","previousSibling",b,c,d)},isBookmarkNode:function(a){return 1==a.nodeType&&a.id&&/^_baidu_bookmark_/i.test(a.id)},getWindow:function(a){a=a.ownerDocument||a;return a.defaultView||a.parentWindow},getCommonAncestor:function(a,b){if(a===b)return a;for(var c=[a],d=[b],e=a,f=-1;e=e.parentNode;){if(e===b)return e;c.push(e)}for(e=b;e=e.parentNode;){if(e===a)return e;d.push(e)}c.reverse();for(d.reverse();f++,
	c[f]===d[f];);return 0==f?null:c[f-1]},clearEmptySibling:function(a,b,c){function d(a,b){for(var d;a&&!k.isBookmarkNode(a)&&(k.isEmptyInlineElement(a)||!RegExp("[^\t\n\r"+k.fillChar+"]").test(a.nodeValue));)d=a[b],k.remove(a),a=d}!b&&d(a.nextSibling,"nextSibling");!c&&d(a.previousSibling,"previousSibling")},split:function(a,b){var c=a.ownerDocument;if(m.ie&&b==a.nodeValue.length){var d=c.createTextNode("");return k.insertAfter(a,d)}d=a.splitText(b);m.ie8&&(c=c.createTextNode(""),k.insertAfter(d,c),
	k.remove(c));return d},isWhitespace:function(a){return!RegExp("[^ \t\n\r"+k.fillChar+"]").test(a.nodeValue)},getXY:function(a){for(var b=0,c=0;a.offsetParent;)c+=a.offsetTop,b+=a.offsetLeft,a=a.offsetParent;return{x:b,y:c}},isEmptyInlineElement:function(a){if(1!=a.nodeType||!q.$removeEmpty[a.tagName])return 0;for(a=a.firstChild;a;){if(k.isBookmarkNode(a)||1==a.nodeType&&!k.isEmptyInlineElement(a)||3==a.nodeType&&!k.isWhitespace(a))return 0;a=a.nextSibling}return 1},isBlockElm:function(a){return 1==
	a.nodeType&&(q.$block[a.tagName]||K[k.getComputedStyle(a,"display")])&&!q.$nonChild[a.tagName]},getElementsByTagName:function(a,b,c){if(c&&n.isString(c)){var d=c;c=function(a){var b=!1;g.each(n.trim(d).replace(/[ ]{2,}/g," ").split(" "),function(l,d){if(g(a).hasClass(d))return b=!0,!1});return b}}b=n.trim(b).replace(/[ ]{2,}/g," ").split(" ");for(var e=[],f=0,h;h=b[f++];){h=a.getElementsByTagName(h);for(var l=0,s;s=h[l++];)c&&!c(s)||e.push(s)}return e},unSelectable:E&&m.ie9below||m.opera?function(a){a.onselectstart=
	function(){return!1};a.onclick=a.onkeyup=a.onkeydown=function(){return!1};a.unselectable="on";a.setAttribute("unselectable","on");for(var b=0,c;c=a.all[b++];)switch(c.tagName.toLowerCase()){case "iframe":case "textarea":case "input":case "select":break;default:c.unselectable="on",a.setAttribute("unselectable","on")}}:function(a){a.style.MozUserSelect=a.style.webkitUserSelect=a.style.msUserSelect=a.style.KhtmlUserSelect="none"},removeAttributes:function(a,b){b=n.isArray(b)?b:n.trim(b).replace(/[ ]{2,}/g,
	" ").split(" ");for(var c=0,d;d=b[c++];){d=J[d]||d;switch(d){case "className":a[d]="";break;case "style":a.style.cssText="",!m.ie&&a.removeAttributeNode(a.getAttributeNode("style"))}a.removeAttribute(d)}},createElement:function(a,b,c){return k.setAttributes(a.createElement(b),c)},setAttributes:function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];switch(c){case "class":a.className=d;break;case "style":a.style.cssText=a.style.cssText+";"+d;break;case "innerHTML":a[c]=d;break;case "value":a.value=
	d;break;default:a.setAttribute(J[c]||c,d)}}return a},getComputedStyle:function(a,b){return n.transUnitToPx(n.fixColor(b,g(a).css(b)))},preventDefault:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},removeStyle:function(a,b){m.ie?("color"==b&&(b="(^|;)"+b),a.style.cssText=a.style.cssText.replace(RegExp(b+"[^:]*:[^;]+;?","ig"),"")):a.style.removeProperty?a.style.removeProperty(b):a.style.removeAttribute(n.cssStyleToDomStyle(b));a.style.cssText||k.removeAttributes(a,["style"])},getStyle:function(a,
	b){var c=a.style[n.cssStyleToDomStyle(b)];return n.fixColor(b,c)},setStyle:function(a,b,c){a.style[n.cssStyleToDomStyle(b)]=c;n.trim(a.style.cssText)||this.removeAttributes(a,"style")},removeDirtyAttr:function(a){for(var b=0,c,d=a.getElementsByTagName("*");c=d[b++];)c.removeAttribute("_moz_dirty");a.removeAttribute("_moz_dirty")},getChildCount:function(a,b){var c=0,d=a.firstChild;for(b=b||function(){return 1};d;)b(d)&&c++,d=d.nextSibling;return c},isEmptyNode:function(a){return!a.firstChild||0==k.getChildCount(a,
	function(a){return!k.isBr(a)&&!k.isBookmarkNode(a)&&!k.isWhitespace(a)})},isBr:function(a){return 1==a.nodeType&&"BR"==a.tagName},isFillChar:function(a,b){return 3==a.nodeType&&!a.nodeValue.replace(RegExp((b?"^":"")+k.fillChar),"").length},isEmptyBlock:function(a,b){if(1!=a.nodeType)return 0;b=b||RegExp("[ \t\r\n"+k.fillChar+"]","g");if(0<a[m.ie?"innerText":"textContent"].replace(b,"").length)return 0;for(var c in q.$isNotEmpty)if(a.getElementsByTagName(c).length)return 0;return 1},isCustomeNode:function(a){return 1==
	a.nodeType&&a.getAttribute("_ue_custom_node_")},fillNode:function(a,b){var c=m.ie?a.createTextNode(k.fillChar):a.createElement("br");b.innerHTML="";b.appendChild(c)},isBoundaryNode:function(a,b){for(var c;!k.isBody(a);)if(c=a,a=a.parentNode,c!==a[b])return!1;return!0},isFillChar:function(a,b){return 3==a.nodeType&&!a.nodeValue.replace(RegExp((b?"^":"")+k.fillChar),"").length},isBody:function(a){return g(a).hasClass("edui-body-container")}},F=RegExp(k.fillChar,"g");(function(){function a(a,b,d,c){1==
	b.nodeType&&(q.$empty[b.tagName]||q.$nonChild[b.tagName])&&(d=k.getNodeIndex(b)+(a?0:1),b=b.parentNode);a?(c.startContainer=b,c.startOffset=d,c.endContainer||c.collapse(!0)):(c.endContainer=b,c.endOffset=d,c.startContainer||c.collapse(!1));c.collapsed=c.startContainer&&c.endContainer&&c.startContainer===c.endContainer&&c.startOffset==c.endOffset;return c}function b(a,b){try{if(f&&k.inDoc(f,a))if(f.nodeValue.replace(F,"").length)f.nodeValue=f.nodeValue.replace(F,"");else{var d=f.parentNode;for(k.remove(f);d&&
	k.isEmptyInlineElement(d)&&(m.safari?!(k.getPosition(d,b)&k.POSITION_CONTAINS):!d.contains(b));)f=d.parentNode,k.remove(d),d=f}}catch(c){}}function c(a,b){var d;for(a=a[b];a&&k.isFillChar(a);)d=a[b],k.remove(a),a=d}var d=0,e=k.fillChar,f,h=B.Range=function(a,b){this.startContainer=this.startOffset=this.endContainer=this.endOffset=null;this.document=a;this.collapsed=!0;this.body=b};h.prototype={deleteContents:function(){var a;if(!this.collapsed){a=this.startContainer;var b=this.endContainer,d=this.startOffset,
	c=this.endOffset,h=this.document,e=h.createDocumentFragment(),f,g;1==a.nodeType&&(a=a.childNodes[d]||(f=a.appendChild(h.createTextNode(""))));1==b.nodeType&&(b=b.childNodes[c]||(g=b.appendChild(h.createTextNode(""))));if(a===b&&3==a.nodeType)e.appendChild(h.createTextNode(a.substringData(d,c-d))),a.deleteData(d,c-d),this.collapse(!0);else{for(var t,n,x=e,q=k.findParents(a,!0),C=k.findParents(b,!0),z=0;q[z]==C[z];)z++;for(var A=z,D;D=q[A];A++){t=D.nextSibling;D==a?f||(3==this.startContainer.nodeType?
	(x.appendChild(h.createTextNode(a.nodeValue.slice(d))),a.deleteData(d,a.nodeValue.length-d)):x.appendChild(a)):(n=D.cloneNode(!1),x.appendChild(n));for(;t&&t!==b&&t!==C[A];)D=t.nextSibling,x.appendChild(t),t=D;x=n}x=e;q[z]||(x.appendChild(q[z-1].cloneNode(!1)),x=x.firstChild);for(A=z;d=C[A];A++){t=d.previousSibling;d==b?g||3!=this.endContainer.nodeType||(x.appendChild(h.createTextNode(b.substringData(0,c))),b.deleteData(0,c)):(n=d.cloneNode(!1),x.appendChild(n));if(A!=z||!q[z])for(;t&&t!==a;)d=t.previousSibling,
	x.insertBefore(t,x.firstChild),t=d;x=n}this.setStartBefore(C[z]?q[z]?C[z]:q[z-1]:C[z-1]).collapse(!0);f&&k.remove(f);g&&k.remove(g)}}m.webkit&&(a=this.startContainer,3!=a.nodeType||a.nodeValue.length||(this.setStartBefore(a).collapse(!0),k.remove(a)));return this},inFillChar:function(){var a=this.startContainer;return this.collapsed&&3==a.nodeType&&a.nodeValue.replace(RegExp("^"+k.fillChar),"").length+1==a.nodeValue.length?!0:!1},setStart:function(b,d){return a(!0,b,d,this)},setEnd:function(b,d){return a(!1,
	b,d,this)},setStartAfter:function(a){return this.setStart(a.parentNode,k.getNodeIndex(a)+1)},setStartBefore:function(a){return this.setStart(a.parentNode,k.getNodeIndex(a))},setEndAfter:function(a){return this.setEnd(a.parentNode,k.getNodeIndex(a)+1)},setEndBefore:function(a){return this.setEnd(a.parentNode,k.getNodeIndex(a))},setStartAtFirst:function(a){return this.setStart(a,0)},setStartAtLast:function(a){return this.setStart(a,3==a.nodeType?a.nodeValue.length:a.childNodes.length)},setEndAtFirst:function(a){return this.setEnd(a,
	0)},setEndAtLast:function(a){return this.setEnd(a,3==a.nodeType?a.nodeValue.length:a.childNodes.length)},selectNode:function(a){return this.setStartBefore(a).setEndAfter(a)},selectNodeContents:function(a){return this.setStart(a,0).setEndAtLast(a)},cloneRange:function(){return(new h(this.document)).setStart(this.startContainer,this.startOffset).setEnd(this.endContainer,this.endOffset)},collapse:function(a){a?(this.endContainer=this.startContainer,this.endOffset=this.startOffset):(this.startContainer=
	this.endContainer,this.startOffset=this.endOffset);this.collapsed=!0;return this},shrinkBoundary:function(a){function b(a){return 1==a.nodeType&&!k.isBookmarkNode(a)&&!q.$empty[a.tagName]&&!q.$nonChild[a.tagName]}for(var d,c=this.collapsed;1==this.startContainer.nodeType&&(d=this.startContainer.childNodes[this.startOffset])&&b(d);)this.setStart(d,0);if(c)return this.collapse(!0);if(!a)for(;1==this.endContainer.nodeType&&0<this.endOffset&&(d=this.endContainer.childNodes[this.endOffset-1])&&b(d);)this.setEnd(d,
	d.childNodes.length);return this},trimBoundary:function(a){this.txtToElmBoundary();var b=this.startContainer,d=this.startOffset,c=this.collapsed,h=this.endContainer;if(3==b.nodeType){if(0==d)this.setStartBefore(b);else if(d>=b.nodeValue.length)this.setStartAfter(b);else{var e=k.split(b,d);b===h?this.setEnd(e,this.endOffset-d):b.parentNode===h&&(this.endOffset+=1);this.setStartBefore(e)}if(c)return this.collapse(!0)}a||(d=this.endOffset,h=this.endContainer,3==h.nodeType&&(0==d?this.setEndBefore(h):
	(d<h.nodeValue.length&&k.split(h,d),this.setEndAfter(h))));return this},txtToElmBoundary:function(a){function b(a,d){var l=a[d+"Container"],c=a[d+"Offset"];if(3==l.nodeType)if(!c)a["set"+d.replace(/(\w)/,function(a){return a.toUpperCase()})+"Before"](l);else if(c>=l.nodeValue.length)a["set"+d.replace(/(\w)/,function(a){return a.toUpperCase()})+"After"](l)}if(a||!this.collapsed)b(this,"start"),b(this,"end");return this},insertNode:function(a){var b=a,d=1;11==a.nodeType&&(b=a.firstChild,d=a.childNodes.length);
	this.trimBoundary(!0);var c=this.startContainer,h=c.childNodes[this.startOffset];h?c.insertBefore(a,h):c.appendChild(a);b.parentNode===this.endContainer&&(this.endOffset+=d);return this.setStartBefore(b)},setCursor:function(a,b){return this.collapse(!a).select(b)},createBookmark:function(a,b){var c,h=this.document.createElement("span");h.style.cssText="display:none;line-height:0px;";h.appendChild(this.document.createTextNode("\u200d"));h.id="_baidu_bookmark_start_"+(b?"":d++);this.collapsed||(c=h.cloneNode(!0),
	c.id="_baidu_bookmark_end_"+(b?"":d++));this.insertNode(h);c&&this.collapse().insertNode(c).setEndBefore(c);this.setStartAfter(h);return{start:a?h.id:h,end:c?a?c.id:c:null,id:a}},moveToBookmark:function(a){var b=a.id?this.document.getElementById(a.start):a.start;a=a.end&&a.id?this.document.getElementById(a.end):a.end;this.setStartBefore(b);k.remove(b);a?(this.setEndBefore(a),k.remove(a)):this.collapse(!0);return this},adjustmentBoundary:function(){if(!this.collapsed){for(;!k.isBody(this.startContainer)&&
	this.startOffset==this.startContainer[3==this.startContainer.nodeType?"nodeValue":"childNodes"].length&&this.startContainer[3==this.startContainer.nodeType?"nodeValue":"childNodes"].length;)this.setStartAfter(this.startContainer);for(;!k.isBody(this.endContainer)&&!this.endOffset&&this.endContainer[3==this.endContainer.nodeType?"nodeValue":"childNodes"].length;)this.setEndBefore(this.endContainer)}return this},getClosedNode:function(){var a;if(!this.collapsed){var b=this.cloneRange().adjustmentBoundary().shrinkBoundary();
	b.collapsed||1!=b.startContainer.nodeType||b.startContainer!==b.endContainer||1!=b.endOffset-b.startOffset||(b=b.startContainer.childNodes[b.startOffset])&&1==b.nodeType&&(q.$empty[b.tagName]||q.$nonChild[b.tagName])&&(a=b)}return a},select:m.ie?function(a,d){var h;this.collapsed||this.shrinkBoundary();var g=this.getClosedNode();if(g&&!d){try{h=this.document.body.createControlRange(),h.addElement(g),h.select()}catch(y){}return this}var g=this.createBookmark(),u=g.start;h=this.document.body.createTextRange();
	h.moveToElementText(u);h.moveStart("character",1);if(!this.collapsed){var v=this.document.body.createTextRange(),u=g.end;v.moveToElementText(u);h.setEndPoint("EndToEnd",v)}else if(!a&&3!=this.startContainer.nodeType){var v=this.document.createTextNode(e),w=this.document.createElement("span");w.appendChild(this.document.createTextNode(e));u.parentNode.insertBefore(w,u);u.parentNode.insertBefore(v,u);b(this.document,v);f=v;c(w,"previousSibling");c(u,"nextSibling");h.moveStart("character",-1);h.collapse(!0)}this.moveToBookmark(g);
	w&&k.remove(w);try{h.select()}catch(t){}return this}:function(a){function d(a){function b(d,c,l){3==d.nodeType&&d.nodeValue.length<c&&(a[l+"Offset"]=d.nodeValue.length)}b(a.startContainer,a.startOffset,"start");b(a.endContainer,a.endOffset,"end")}var h=k.getWindow(this.document),g=h.getSelection();m.gecko?this.body.focus():h.focus();if(g){g.removeAllRanges();this.collapsed&&!a&&(a=h=this.startContainer,1==h.nodeType&&(a=h.childNodes[this.startOffset]),3==h.nodeType&&this.startOffset||(a?a.previousSibling&&
	3==a.previousSibling.nodeType:h.lastChild&&3==h.lastChild.nodeType)||(a=this.document.createTextNode(e),this.insertNode(a),b(this.document,a),c(a,"previousSibling"),c(a,"nextSibling"),f=a,this.setStart(a,m.webkit?1:0).collapse(!0)));h=this.document.createRange();if(this.collapsed&&m.opera&&1==this.startContainer.nodeType)if(a=this.startContainer.childNodes[this.startOffset]){for(;a&&k.isBlockElm(a);)if(1==a.nodeType&&a.childNodes[0])a=a.childNodes[0];else break;a&&this.setStartBefore(a).collapse(!0)}else(a=
	this.startContainer.lastChild)&&k.isBr(a)&&this.setStartBefore(a).collapse(!0);d(this);h.setStart(this.startContainer,this.startOffset);h.setEnd(this.endContainer,this.endOffset);g.addRange(h)}return this},createAddress:function(a,b){function d(a){for(var c=a?h.startContainer:h.endContainer,l=k.findParents(c,!0,function(a){return!k.isBody(a)}),e=[],f=0,p;p=l[f++];)e.push(k.getNodeIndex(p,b));l=0;if(b)if(3==c.nodeType){for(c=c.previousSibling;c&&3==c.nodeType;)l+=c.nodeValue.replace(F,"").length,c=
	c.previousSibling;l+=a?h.startOffset:h.endOffset}else if(c=c.childNodes[a?h.startOffset:h.endOffset])l=k.getNodeIndex(c,b);else for(c=a?h.startContainer:h.endContainer,a=c.firstChild;a;)if(k.isFillChar(a))a=a.nextSibling;else if(l++,3==a.nodeType)for(;a&&3==a.nodeType;)a=a.nextSibling;else a=a.nextSibling;else l=a?k.isFillChar(c)?0:h.startOffset:h.endOffset;0>l&&(l=0);e.push(l);return e}var c={},h=this;c.startAddress=d(!0);a||(c.endAddress=h.collapsed?[].concat(c.startAddress):d());return c},moveToAddress:function(a,
	b){function d(a,b){for(var l=c.body,h,e,f=0,s,p=a.length;f<p;f++)if(s=a[f],h=l,l=l.childNodes[s],!l){e=s;break}b?l?c.setStartBefore(l):c.setStart(h,e):l?c.setEndBefore(l):c.setEnd(h,e)}var c=this;d(a.startAddress,!0);!b&&a.endAddress&&d(a.endAddress);return c},equals:function(a){for(var b in this)if(this.hasOwnProperty(b)&&this[b]!==a[b])return!1;return!0},scrollIntoView:function(){var a=g('<span style="padding:0;margin:0;display:block;border:0">&nbsp;</span>');this.cloneRange().insertNode(a.get(0));
	var b=g(window).scrollTop(),d=g(window).height(),c=a.offset().top;if(c<b-d||c>b+d)c>b+d?window.scrollTo(0,c-d+a.height()):window.scrollTo(0,b-c);a.remove()},getOffset:function(){var a=this.createBookmark(),b=g(a.start).css("display","inline-block").offset();this.moveToBookmark(a);return b}}})();(function(){function a(a,b){var c=k.getNodeIndex;a=a.duplicate();a.collapse(b);var h=a.parentElement();if(!h.hasChildNodes())return{container:h,offset:0};for(var l=h.children,s,p=a.duplicate(),g=0,y=l.length-
	1,u=-1;g<=y;){u=Math.floor((g+y)/2);s=l[u];p.moveToElementText(s);var v=p.compareEndPoints("StartToStart",a);if(0<v)y=u-1;else if(0>v)g=u+1;else return{container:h,offset:c(s)}}if(-1==u){p.moveToElementText(h);p.setEndPoint("StartToStart",a);p=p.text.replace(/(\r\n|\r)/g,"\n").length;l=h.childNodes;if(!p)return s=l[l.length-1],{container:s,offset:s.nodeValue.length};for(c=l.length;0<p;)p-=l[--c].nodeValue.length;return{container:l[c],offset:-p}}p.collapse(0<v);p.setEndPoint(0<v?"StartToStart":"EndToStart",
	a);p=p.text.replace(/(\r\n|\r)/g,"\n").length;if(!p)return q.$empty[s.tagName]||q.$nonChild[s.tagName]?{container:h,offset:c(s)+(0<v?0:1)}:{container:s,offset:0<v?0:s.childNodes.length};for(;0<p;)try{l=s,s=s[0<v?"previousSibling":"nextSibling"],p-=s.nodeValue.length}catch(w){return{container:h,offset:c(l)}}return{container:s,offset:0<v?-p:s.nodeValue.length+p}}function b(b,c){if(b.item)c.selectNode(b.item(0));else{var f=a(b,!0);c.setStart(f.container,f.offset);0!=b.compareEndPoints("StartToEnd",b)&&
	(f=a(b,!1),c.setEnd(f.container,f.offset))}return c}function c(a,b){var c;try{c=a.getNative(b).createRange()}catch(h){return null}var l=c.item?c.item(0):c.parentElement();return(l.ownerDocument||l)===a.document?c:null}(B.Selection=function(a,b){var f=this;f.document=a;f.body=b;if(m.ie9below)g(b).on("beforedeactivate",function(){f._bakIERange=f.getIERange()}).on("activate",function(){try{var a=c(f);a&&f.rangeInBody(a)||!f._bakIERange||f._bakIERange.select()}catch(b){}f._bakIERange=null})}).prototype=
	{hasNativeRange:function(){var a;if(!m.ie||m.ie9above){a=this.getNative();if(!a.rangeCount)return!1;a=a.getRangeAt(0)}else a=c(this);return this.rangeInBody(a)},getNative:function(a){var b=this.document;try{return b?m.ie9below||a?b.selection:k.getWindow(b).getSelection():null}catch(c){return null}},getIERange:function(a){var b=c(this,a);return b&&this.rangeInBody(b,a)||!this._bakIERange?b:this._bakIERange},rangeInBody:function(a,b){var c=m.ie9below||b?a.item?a.item():a.parentElement():a.startContainer;
	return c===this.body||k.inDoc(c,this.body)},cache:function(){this.clear();this._cachedRange=this.getRange();this._cachedStartElement=this.getStart();this._cachedStartElementPath=this.getStartElementPath()},getStartElementPath:function(){if(this._cachedStartElementPath)return this._cachedStartElementPath;var a=this.getStart();return a?k.findParents(a,!0,null,!0):[]},clear:function(){this._cachedStartElementPath=this._cachedRange=this._cachedStartElement=null},isFocus:function(){return this.hasNativeRange()},
	getRange:function(){function a(b){for(var d=c.body.firstChild,l=b.collapsed;d&&d.firstChild;)b.setStart(d,0),d=d.firstChild;b.startContainer||b.setStart(c.body,0);l&&b.collapse(!0)}var c=this;if(null!=c._cachedRange)return this._cachedRange;var f=new B.Range(c.document,c.body);if(m.ie9below){var h=c.getIERange();if(h&&this.rangeInBody(h))try{b(h,f)}catch(l){a(f)}else a(f)}else{var s=c.getNative();if(s&&s.rangeCount&&c.rangeInBody(s.getRangeAt(0)))h=s.getRangeAt(0),s=s.getRangeAt(s.rangeCount-1),f.setStart(h.startContainer,
	h.startOffset).setEnd(s.endContainer,s.endOffset),f.collapsed&&k.isBody(f.startContainer)&&!f.startOffset&&a(f);else{if(this._bakRange&&(this._bakRange.startContainer===this.body||k.inDoc(this._bakRange.startContainer,this.body)))return this._bakRange;a(f)}}return this._bakRange=f},getStart:function(){if(this._cachedStartElement)return this._cachedStartElement;var a=m.ie9below?this.getIERange():this.getRange(),b,c;if(m.ie9below){if(!a)return this.document.body.firstChild;if(a.item)return a.item(0);
	b=a.duplicate();0<b.text.length&&b.moveStart("character",1);b.collapse(1);b=b.parentElement();for(c=a=a.parentElement();a=a.parentNode;)if(a==b){b=c;break}}else if(b=a.startContainer,1==b.nodeType&&b.hasChildNodes()&&(b=b.childNodes[Math.min(b.childNodes.length-1,a.startOffset)]),3==b.nodeType)return b.parentNode;return b},getText:function(){var a;return this.isFocus()&&(a=this.getNative())?(a=m.ie9below?a.createRange():a.getRangeAt(0),m.ie9below?a.text:a.toString()):""}}})();(function(){function a(a,
	b){var c;if(b.textarea)if(n.isString(b.textarea))for(var d=0,e,f=k.getElementsByTagName(a,"textarea");e=f[d++];){if(e.id=="umeditor_textarea_"+b.options.textarea){c=e;break}}else c=b.textarea;c||(a.appendChild(c=k.createElement(document,"textarea",{name:b.options.textarea,id:"umeditor_textarea_"+b.options.textarea,style:"display:none"})),b.textarea=c);c.value=b.hasContents()?b.options.allHtmlEnabled?b.getAllHtml():b.getContent(null,null,!0):""}function b(a){for(var b in UM.plugins)-1==a.options.excludePlugins.indexOf(b)&&
	(UM.plugins[b].call(a),a.plugins[b]=1);a.langIsReady=!0;a.fireEvent("langReady")}function c(a){for(var b in a)return b}var d=0,e,f=UM.Editor=function(a){var l=this;l.uid=d++;I.call(l);l.commands={};l.options=n.extend(n.clone(a||{}),UMEDITOR_CONFIG,!0);l.shortcutkeys={};l.inputRules=[];l.outputRules=[];l.setOpt({isShow:!0,initialContent:"",initialStyle:"",autoClearinitialContent:!1,textarea:"editorValue",focus:!1,focusInEnd:!0,autoClearEmptyNode:!0,fullscreen:!1,readonly:!1,zIndex:999,enterTag:"p",
	lang:"zh-cn",langPath:l.options.UMEDITOR_HOME_URL+"lang/",theme:"default",themePath:l.options.UMEDITOR_HOME_URL+"themes/",allHtmlEnabled:!1,autoSyncData:!0,autoHeightEnabled:!0,excludePlugins:""});l.plugins={};n.isEmptyObject(UM.I18N)?n.loadFile(document,{src:l.options.langPath+l.options.lang+"/"+l.options.lang+".js",tag:"script",type:"text/javascript",defer:"defer"},function(){b(l)}):(l.options.lang=c(UM.I18N),b(l))};f.prototype={ready:function(a){a&&(this.isReady?a.apply(this):this.addListener("ready",
	a))},setOpt:function(a,b){var c={};n.isString(a)?c[a]=b:c=a;n.extend(this.options,c,!0)},getOpt:function(a){return this.options[a]||""},destroy:function(){this.fireEvent("destroy");var a=this.container.parentNode;a===document.body&&(a=this.container);var b=this.textarea;b?b.style.display="":(b=document.createElement("textarea"),a.parentNode.insertBefore(b,a));b.style.width=this.body.offsetWidth+"px";b.style.height=this.body.offsetHeight+"px";b.value=this.getContent();b.id=this.key;a.contains(b)&&
	g(b).insertBefore(a);a.innerHTML="";k.remove(a);UM.clearCache(this.id);for(var c in this)this.hasOwnProperty(c)&&delete this[c]},initialCont:function(a){if(a){a.getAttribute("name")&&(this.options.textarea=a.getAttribute("name"));if(a&&/script|textarea/ig.test(a.tagName)){var b=document.createElement("div");a.parentNode.insertBefore(b,a);this.options.initialContent=UM.htmlparser(a.value||a.innerHTML||this.options.initialContent).toHtml();a.className&&(b.className=a.className);a.style.cssText&&(b.style.cssText=
	a.style.cssText);/textarea/i.test(a.tagName)?(this.textarea=a,this.textarea.style.display="none"):(a.parentNode.removeChild(a),a.id&&(b.id=a.id));a=b;a.innerHTML=""}return a}return null},render:function(a){var b=this.options,c=function(b){return parseInt(g(a).css(b))};n.isString(a)&&(a=document.getElementById(a));a&&(this.id=a.getAttribute("id"),UM.setEditor(this),n.cssRule("edui-style-body",this.options.initialStyle,document),a=this.initialCont(a),a.className+=" edui-body-container",b.minFrameWidth=
	b.initialFrameWidth?b.initialFrameWidth:b.initialFrameWidth=g(a).width()||UM.defaultWidth,b.initialFrameHeight?b.minFrameHeight=b.initialFrameHeight:b.initialFrameHeight=b.minFrameHeight=g(a).height()||UM.defaultHeight,a.style.width=/%$/.test(b.initialFrameWidth)?"100%":b.initialFrameWidth-c("padding-left")-c("padding-right")+"px",c=/%$/.test(b.initialFrameHeight)?"100%":b.initialFrameHeight-c("padding-top")-c("padding-bottom"),this.options.autoHeightEnabled?(a.style.minHeight=c+"px",a.style.height=
	"",m.ie&&6>=m.version&&(a.style.height=c,a.style.setExpression("height","this.scrollHeight <= "+c+' ? "'+c+'px" : "auto"'))):g(a).height(c),a.style.zIndex=b.zIndex,this._setup(a))},_setup:function(b){var c=this,d=c.options;b.contentEditable=!0;document.body.spellcheck=!1;c.document=document;c.window=document.defaultView||document.parentWindow;c.body=b;c.$body=g(b);c.selection=new B.Selection(document,c.body);c._isEnabled=!1;var e;m.gecko&&(e=this.selection.getNative())&&e.removeAllRanges();this._initEvents();
	for(var f=b.parentNode;f&&!k.isBody(f);f=f.parentNode)if("FORM"==f.tagName){c.form=f;if(c.options.autoSyncData)g(b).on("blur",function(){a(f,c)});else g(f).on("submit",function(){a(this,c)});break}if(d.initialContent)if(d.autoClearinitialContent){var y=c.execCommand;c.execCommand=function(){c.fireEvent("firstBeforeExecCommand");return y.apply(c,arguments)};this._setDefaultContent(d.initialContent)}else this.setContent(d.initialContent,!1,!0);k.isEmptyNode(c.body)&&(c.body.innerHTML="<p>"+(m.ie?"":
	"<br/>")+"</p>");d.focus&&setTimeout(function(){c.focus(c.options.focusInEnd);!c.options.autoClearinitialContent&&c._selectionChange()},0);c.container||(c.container=b.parentNode);c._bindshortcutKeys();c.isReady=1;c.fireEvent("ready");d.onready&&d.onready.call(c);if(!m.ie||m.ie9above)g(c.body).on("blur focus",function(a){var b=c.selection.getNative();if("blur"==a.type)0<b.rangeCount&&(c._bakRange=b.getRangeAt(0));else{try{c._bakRange&&b.addRange(c._bakRange)}catch(d){}c._bakRange=null}});!d.isShow&&
	c.setHide();d.readonly&&c.setDisabled()},sync:function(b){(b=b?document.getElementById(b):k.findParent(this.body.parentNode,function(a){return"FORM"==a.tagName},!0))&&a(b,this)},setHeight:function(a,b){!b&&(this.options.initialFrameHeight=a);this.options.autoHeightEnabled?(g(this.body).css({"min-height":a+"px"}),m.ie&&6>=m.version&&this.container&&(this.container.style.height=a,this.container.style.setExpression("height","this.scrollHeight <= "+a+' ? "'+a+'px" : "auto"'))):g(this.body).height(a);
	this.fireEvent("resize")},setWidth:function(a){this.$container&&this.$container.width(a);g(this.body).width(a-1*g(this.body).css("padding-left").replace("px","")-1*g(this.body).css("padding-right").replace("px",""));this.fireEvent("resize")},addshortcutkey:function(a,b){var c={};b?c[a]=b:c=a;n.extend(this.shortcutkeys,c)},_bindshortcutKeys:function(){var a=this,b=this.shortcutkeys;a.addListener("keydown",function(c,d){var e=d.keyCode||d.which,f;for(f in b)for(var u=b[f].split(","),g=0,w;w=u[g++];){w=
	w.split(":");var t=w[0];w=w[1];if(/^(ctrl)(\+shift)?\+(\d+)$/.test(t.toLowerCase())||/^(\d+)$/.test(t))if("ctrl"==RegExp.$1&&(d.ctrlKey||d.metaKey)&&(""!=RegExp.$2?d[RegExp.$2.slice(1)+"Key"]:1)&&e==RegExp.$3||e==RegExp.$1)-1!=a.queryCommandState(f,w)&&a.execCommand(f,w),k.preventDefault(d)}})},getContent:function(a,b,c,d,e){a&&n.isFunction(a)&&(b=a);if(b?!b():!this.hasContents())return"";this.fireEvent("beforegetcontent");a=UM.htmlparser(this.body.innerHTML,d);this.filterOutputRule(a);this.fireEvent("aftergetcontent",
	a);return a.toHtml(e)},getAllHtml:function(){var a=[];this.fireEvent("getAllHtml",a);if(m.ie&&8<m.version){var b="";n.each(this.document.styleSheets,function(a){b+=a.href?'<link rel="stylesheet" type="text/css" href="'+a.href+'" />':"<style>"+a.cssText+"</style>"});n.each(this.document.getElementsByTagName("script"),function(a){b+=a.outerHTML})}return"<html><head>"+(this.options.charset?'<meta http-equiv="Content-Type" content="text/html; charset='+this.options.charset+'"/>':"")+(b||this.document.getElementsByTagName("head")[0].innerHTML)+
	a.join("\n")+"</head><body "+(E&&9>m.version?'class="view"':"")+">"+this.getContent(null,null,!0)+"</body></html>"},getPlainTxt:function(){var a=RegExp(k.fillChar,"g"),b=this.body.innerHTML.replace(/[\n\r]/g,""),b=b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi,"\n").replace(/<br\/?>/gi,"\n").replace(/<[^>/]+>/g,"").replace(/(\n)?<\/([^>]+)>/g,function(a,b,c){return q.$block[c]?"\n":b?b:""});return b.replace(a,"").replace(/\u00a0/g," ").replace(/&nbsp;/g," ")},getContentTxt:function(){return this.body[m.ie?
	"innerText":"textContent"].replace(RegExp(k.fillChar,"g"),"").replace(/\u00a0/g," ")},setContent:function(b,c,d){this.fireEvent("beforesetcontent",b);b=UM.htmlparser(b);this.filterInputRule(b);b=b.toHtml();this.body.innerHTML=(c?this.body.innerHTML:"")+b;if("p"==this.options.enterTag)if(c=this.body.firstChild,!c||1==c.nodeType&&(q.$cdata[c.tagName]||"DIV"==c.tagName&&c.getAttribute("cdata_tag")||k.isCustomeNode(c))&&c===this.body.lastChild)this.body.innerHTML="<p>"+(m.ie?"&nbsp;":"<br/>")+"</p>"+
	this.body.innerHTML;else for(var e=this.document.createElement("p");c;){for(;c&&(3==c.nodeType||1==c.nodeType&&q.p[c.tagName]&&!q.$cdata[c.tagName]);)b=c.nextSibling,e.appendChild(c),c=b;if(e.firstChild)if(c)c.parentNode.insertBefore(e,c),e=this.document.createElement("p");else{this.body.appendChild(e);break}c=c.nextSibling}this.fireEvent("aftersetcontent");this.fireEvent("contentchange");!d&&this._selectionChange();this._bakRange=this._bakIERange=this._bakNativeRange=null;var f;m.gecko&&(f=this.selection.getNative())&&
	f.removeAllRanges();this.options.autoSyncData&&this.form&&a(this.form,this)},focus:function(a){try{var b=this.selection.getRange();a?b.setStartAtLast(this.body.lastChild).setCursor(!1,!0):b.select(!0);this.fireEvent("focus")}catch(c){}},blur:function(){var a=this.selection.getNative();a.empty?a.empty():a.removeAllRanges();this.fireEvent("blur")},isFocus:function(){return!0===this.fireEvent("isfocus")?!0:this.selection.isFocus()},_initEvents:function(){var a=this,b=function(){a._proxyDomEvent.apply(a,
	arguments)};g(a.body).on("click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart",b).on("focus blur",b).on("mouseup keydown",function(b){"keydown"==b.type&&(b.ctrlKey||b.metaKey||b.shiftKey||b.altKey)||2!=b.button&&a._selectionChange(250,b)})},_proxyDomEvent:function(a){return this.fireEvent(a.type.replace(/^on/,""),a)},_selectionChange:function(a,b){var c=this,d=!1,f,g;m.ie&&9>m.version&&b&&"mouseup"==b.type&&!this.selection.getRange().collapsed&&(d=!0,f=b.clientX,
	g=b.clientY);clearTimeout(e);e=setTimeout(function(){if(c.selection.getNative()){var a;if(d&&"None"==c.selection.getNative().type){a=c.document.body.createTextRange();try{a.moveToPoint(f,g)}catch(e){a=null}}var h;a&&(h=c.selection.getIERange,c.selection.getIERange=function(){return a});c.selection.cache();h&&(c.selection.getIERange=h);c.selection._cachedRange&&c.selection._cachedStartElement&&(c.fireEvent("beforeselectionchange"),c.fireEvent("selectionchange",!!b),c.fireEvent("afterselectionchange"),
	c.selection.clear())}},a||50)},_callCmdFn:function(a,b){b=Array.prototype.slice.call(b,0);var c=b.shift().toLowerCase(),d,e;e=(d=this.commands[c]||UM.commands[c])&&d[a];if(!(d&&e||"queryCommandState"!=a))return 0;if(e)return e.apply(this,[c].concat(b))},execCommand:function(a){if(!this.isFocus()){var b=this.selection._bakRange;b?b.select():this.focus(!0)}a=a.toLowerCase();var c,b=this.commands[a]||UM.commands[a];if(!b||!b.execCommand)return null;b.notNeedUndo||this.__hasEnterExecCommand?(c=this._callCmdFn("execCommand",
	arguments),this.__hasEnterExecCommand||b.ignoreContentChange||this._ignoreContentChange||this.fireEvent("contentchange")):(this.__hasEnterExecCommand=!0,-1!=this.queryCommandState.apply(this,arguments)&&(this.fireEvent("saveScene"),this.fireEvent("beforeexeccommand",a),c=this._callCmdFn("execCommand",arguments),b.ignoreContentChange||this._ignoreContentChange||this.fireEvent("contentchange"),this.fireEvent("afterexeccommand",a),this.fireEvent("saveScene")),this.__hasEnterExecCommand=!1);this.__hasEnterExecCommand||
	b.ignoreContentChange||this._ignoreContentChange||this._selectionChange();return c},queryCommandState:function(a){try{return this._callCmdFn("queryCommandState",arguments)}catch(b){return 0}},queryCommandValue:function(a){try{return this._callCmdFn("queryCommandValue",arguments)}catch(b){return null}},hasContents:function(a){if(a)for(var b=0,c;c=a[b++];)if(0<this.body.getElementsByTagName(c).length)return!0;if(!k.isEmptyBlock(this.body))return!0;a=["div"];for(b=0;c=a[b++];){c=k.getElementsByTagName(this.body,
	c);for(var d=0,e;e=c[d++];)if(k.isCustomeNode(e))return!0}return!1},reset:function(){this.fireEvent("reset")},isEnabled:function(){return!0!=this._isEnabled},setEnabled:function(){var a;this.body.contentEditable=!0;if(this.lastBk){a=this.selection.getRange();try{a.moveToBookmark(this.lastBk),delete this.lastBk}catch(b){a.setStartAtFirst(this.body).collapse(!0)}a.select(!0)}this.bkqueryCommandState&&(this.queryCommandState=this.bkqueryCommandState,delete this.bkqueryCommandState);this._bkproxyDomEvent&&
	(this._proxyDomEvent=this._bkproxyDomEvent,delete this._bkproxyDomEvent);this.fireEvent("setEnabled")},enable:function(){return this.setEnabled()},setDisabled:function(a,b){var c=this;c.body.contentEditable=!1;c._except=a?n.isArray(a)?a:[a]:[];c.lastBk||(c.lastBk=c.selection.getRange().createBookmark(!0));c.bkqueryCommandState||(c.bkqueryCommandState=c.queryCommandState,c.queryCommandState=function(a){return-1!=n.indexOf(c._except,a)?c.bkqueryCommandState.apply(c,arguments):-1});b||c._bkproxyDomEvent||
	(c._bkproxyDomEvent=c._proxyDomEvent,c._proxyDomEvent=function(){return!1});c.fireEvent("selectionchange");c.fireEvent("setDisabled",c._except)},disable:function(a){return this.setDisabled(a)},_setDefaultContent:function(){function a(){var b=this;b.document.getElementById("initContent")&&(b.body.innerHTML="<p>"+(E?"":"<br/>")+"</p>",b.removeListener("firstBeforeExecCommand focus",a),setTimeout(function(){b.focus();b._selectionChange()},0))}return function(b){this.body.innerHTML='<p id="initContent">'+
	b+"</p>";this.addListener("firstBeforeExecCommand focus",a)}}(),setShow:function(){var a=this.selection.getRange();if("none"==this.container.style.display){try{a.moveToBookmark(this.lastBk),delete this.lastBk}catch(b){a.setStartAtFirst(this.body).collapse(!0)}setTimeout(function(){a.select(!0)},100);this.container.style.display=""}},show:function(){return this.setShow()},setHide:function(){this.lastBk||(this.lastBk=this.selection.getRange().createBookmark(!0));this.container.style.display="none"},
	hide:function(){return this.setHide()},getLang:function(a){var b=UM.I18N[this.options.lang];if(!b)throw Error("not import language file");a=(a||"").split(".");for(var c=0,d;(d=a[c++])&&(b=b[d],b););return b},getContentLength:function(a,b){var c=this.getContent(!1,!1,!0).length;if(a){b=(b||[]).concat(["hr","img","iframe"]);for(var c=this.getContentTxt().replace(/[\t\r\n]+/g,"").length,d=0,e;e=b[d++];)c+=this.body.getElementsByTagName(e).length}return c},addInputRule:function(a,b){a.ignoreUndo=b;this.inputRules.push(a)},
	filterInputRule:function(a,b){for(var c=0,d;d=this.inputRules[c++];)b&&d.ignoreUndo||d.call(this,a)},addOutputRule:function(a,b){a.ignoreUndo=b;this.outputRules.push(a)},filterOutputRule:function(a,b){for(var c=0,d;d=this.outputRules[c++];)b&&d.ignoreUndo||d.call(this,a)}};n.inherits(f,I)})();UM.filterWord=function(){function a(a){return a=a.replace(/[\d.]+\w+/g,function(a){return n.transUnitToPx(a)})}function b(b){return b.replace(/[\t\r\n]+/g," ").replace(/\x3c!--[\s\S]*?--\x3e/ig,"").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi,
	function(b){if(m.opera)return"";try{if(/Bitmap/i.test(b))return"";var c=b.match(/width:([ \d.]*p[tx])/i)[1],f=b.match(/height:([ \d.]*p[tx])/i)[1],h=b.match(/src=\s*"([^"]*)"/i)[1];return'<img width="'+a(c)+'" height="'+a(f)+'" src="'+h+'" />'}catch(l){return""}}).replace(/<\/?div[^>]*>/g,"").replace(/v:\w+=(["']?)[^'"]+\1/g,"").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi,"").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi,
	"<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig,function(a,b,c,h){return"class"==b&&"MsoListParagraph"==h?a:""}).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi,function(a,b,c){return c.replace(/[\t\r\n ]+/g," ")}).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi,function(b,c,f,h){b=[];h=h.replace(/^\s+|\s+$/,"").replace(/&#39;/g,"'").replace(/&quot;/gi,"'").split(/;\s*/g);f=0;for(var l;l=h[f];f++){var g,p=l.split(":");if(2==p.length&&(l=p[0].toLowerCase(),g=p[1].toLowerCase(),
	!(/^(background)\w*/.test(l)&&0==g.replace(/(initial|\s)/g,"").length||/^(margin)\w*/.test(l)&&/^0\w+$/.test(g)))){switch(l){case "mso-padding-alt":case "mso-padding-top-alt":case "mso-padding-right-alt":case "mso-padding-bottom-alt":case "mso-padding-left-alt":case "mso-margin-alt":case "mso-margin-top-alt":case "mso-margin-right-alt":case "mso-margin-bottom-alt":case "mso-margin-left-alt":case "mso-height":case "mso-width":case "mso-vertical-align-alt":/<table/.test(c)||(b[f]=l.replace(/^mso-|-alt$/g,
	"")+":"+a(g));continue;case "horiz-align":b[f]="text-align:"+g;continue;case "vert-align":b[f]="vertical-align:"+g;continue;case "font-color":case "mso-foreground":b[f]="color:"+g;continue;case "mso-background":case "mso-highlight":b[f]="background:"+g;continue;case "mso-default-height":b[f]="min-height:"+a(g);continue;case "mso-default-width":b[f]="min-width:"+a(g);continue;case "mso-padding-between-alt":b[f]="border-collapse:separate;border-spacing:"+a(g);continue;case "text-line-through":if("single"==
	g||"double"==g)b[f]="text-decoration:line-through";continue;case "mso-zero-height":"yes"==g&&(b[f]="display:none");continue;case "margin":if(!/[1-9]/.test(g))continue}/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(l)||/text\-indent|padding|margin/.test(l)&&/\-[\d.]+/.test(g)||(b[f]=l+":"+p[1])}}return c+(b.length?' style="'+b.join(";").replace(/;{2,}/g,";")+'"':"")}).replace(/[\d.]+(cm|pt)/g,
	function(a){return n.transUnitToPx(a)})}return function(a){return/(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test(a)?b(a):a}}();(function(){function a(a,b,c){a.push(m);return b+(c?1:-1)}function b(a,b){for(var c=0;c<b;c++)a.push(r)}function c(e,f,l,h){switch(e.type){case "root":for(var g=0,k;k=e.children[g++];)l&&"element"==k.type&&!q.$inlineWithA[k.tagName]&&1<g&&(a(f,h,!0),b(f,h)),c(k,f,l,h);break;case "text":"pre"==e.parentNode.tagName?f.push(e.data):f.push(p[e.parentNode.tagName]?
	n.html(e.data):e.data.replace(/[ ]{2}/g," &nbsp;"));break;case "element":d(e,f,l,h);break;case "comment":f.push("\x3c!--"+e.data+"--\x3e")}return f}function d(d,e,f,h){var l="";if(d.attrs){var l=[],g=d.attrs,p;for(p in g)l.push(p+(void 0!==g[p]?'="'+(k[p]?n.html(g[p]).replace(/["]/g,function(a){return"&quot;"}):n.unhtml(g[p]))+'"':""));l=l.join(" ")}e.push("<"+d.tagName+(l?" "+l:"")+(q.$empty[d.tagName]?"/":"")+">");f&&!q.$inlineWithA[d.tagName]&&"pre"!=d.tagName&&d.children&&d.children.length&&(h=
	a(e,h,!0),b(e,h));if(d.children&&d.children.length)for(l=0;g=d.children[l++];)f&&"element"==g.type&&!q.$inlineWithA[g.tagName]&&1<l&&(a(e,h),b(e,h)),c(g,e,f,h);q.$empty[d.tagName]||(f&&!q.$inlineWithA[d.tagName]&&"pre"!=d.tagName&&d.children&&d.children.length&&(h=a(e,h),b(e,h)),e.push("</"+d.tagName+">"))}function e(a,b){var c;if("element"==a.type&&a.getAttr("id")==b)return a;if(a.children&&a.children.length)for(var d=0;c=a.children[d++];)if(c=e(c,b))return c}function f(a,b,c){"element"==a.type&&
	a.tagName==b&&c.push(a);if(a.children&&a.children.length)for(var d=0,e;e=a.children[d++];)f(e,b,c)}function h(a,b){if(a.children&&a.children.length)for(var c=0,d;d=a.children[c];)h(d,b),d.parentNode&&(d.children&&d.children.length&&b(d),d.parentNode&&c++);else b(a)}var l=UM.uNode=function(a){this.type=a.type;this.data=a.data;this.tagName=a.tagName;this.parentNode=a.parentNode;this.attrs=a.attrs||{};this.children=a.children},k={href:1,src:1,_src:1,_href:1,cdata_data:1},p={style:1,script:1},r="    ",
	m="\n";l.createElement=function(a){return/[<>]/.test(a)?UM.htmlparser(a).children[0]:new l({type:"element",children:[],tagName:a})};l.createText=function(a,b){return new UM.uNode({type:"text",data:b?a:n.unhtml(a||"")})};l.prototype={toHtml:function(a){var b=[];c(this,b,a,0);return b.join("")},innerHTML:function(a){if("element"!=this.type||q.$empty[this.tagName])return this;if(n.isString(a)){if(this.children)for(var b=0,c;c=this.children[b++];)c.parentNode=null;this.children=[];a=UM.htmlparser(a);
	for(b=0;c=a.children[b++];)this.children.push(c),c.parentNode=this;return this}a=new UM.uNode({type:"root",children:this.children});return a.toHtml()},innerText:function(a,b){if("element"!=this.type||q.$empty[this.tagName])return this;if(a){if(this.children)for(var c=0,d;d=this.children[c++];)d.parentNode=null;this.children=[];this.appendChild(l.createText(a,b));return this}return this.toHtml().replace(/<[^>]+>/g,"")},getData:function(){return"element"==this.type?"":this.data},firstChild:function(){return this.children?
	this.children[0]:null},lastChild:function(){return this.children?this.children[this.children.length-1]:null},previousSibling:function(){for(var a=this.parentNode,b=0,c;c=a.children[b];b++)if(c===this)return 0==b?null:a.children[b-1]},nextSibling:function(){for(var a=this.parentNode,b=0,c;c=a.children[b++];)if(c===this)return a.children[b]},replaceChild:function(a,b){if(this.children){a.parentNode&&a.parentNode.removeChild(a);for(var c=0,d;d=this.children[c];c++)if(d===b)return this.children.splice(c,
	1,a),b.parentNode=null,a.parentNode=this,a}},appendChild:function(a){if("root"==this.type||"element"==this.type&&!q.$empty[this.tagName]){this.children||(this.children=[]);a.parentNode&&a.parentNode.removeChild(a);for(var b=0,c;c=this.children[b];b++)if(c===a){this.children.splice(b,1);break}this.children.push(a);a.parentNode=this;return a}},insertBefore:function(a,b){if(this.children){a.parentNode&&a.parentNode.removeChild(a);for(var c=0,d;d=this.children[c];c++)if(d===b)return this.children.splice(c,
	0,a),a.parentNode=this,a}},insertAfter:function(a,b){if(this.children){a.parentNode&&a.parentNode.removeChild(a);for(var c=0,d;d=this.children[c];c++)if(d===b)return this.children.splice(c+1,0,a),a.parentNode=this,a}},removeChild:function(a,b){if(this.children)for(var c=0,d;d=this.children[c];c++)if(d===a){this.children.splice(c,1);d.parentNode=null;if(b&&d.children&&d.children.length)for(var e=0,f;f=d.children[e];e++)this.children.splice(c+e,0,f),f.parentNode=this;return d}},getAttr:function(a){return this.attrs&&
	this.attrs[a.toLowerCase()]},setAttr:function(a,b){if(a)if(this.attrs||(this.attrs={}),n.isObject(a))for(var c in a)a[c]?this.attrs[c.toLowerCase()]=a[c]:delete this.attrs[c];else b?this.attrs[a.toLowerCase()]=b:delete this.attrs[a];else delete this.attrs},hasAttr:function(a){a=this.getAttr(a);return null!==a&&void 0!==a},getIndex:function(){for(var a=this.parentNode,b=0,c;c=a.children[b];b++)if(c===this)return b;return-1},getNodeById:function(a){var b;if(this.children&&this.children.length)for(var c=
	0;b=this.children[c++];)if(b=e(b,a))return b},getNodesByTagName:function(a){a=n.trim(a).replace(/[ ]{2,}/g," ").split(" ");var b=[],c=this;n.each(a,function(a){if(c.children&&c.children.length)for(var d=0,e;e=c.children[d++];)f(e,a,b)});return b},getStyle:function(a){var b=this.getAttr("style");return b?(a=b.match(RegExp("(^|;)\\s*"+a+":([^;]+)","i")))&&a[0]?a[2]:"":""},setStyle:function(a,b){function c(a,b){d=d.replace(RegExp("(^|;)\\s*"+a+":([^;]+;?)","gi"),"$1");b&&(d=a+":"+n.unhtml(b)+";"+d)}
	var d=this.getAttr("style");d||(d="");if(n.isObject(a))for(var e in a)c(e,a[e]);else c(a,b);this.setAttr("style",n.trim(d))},hasClass:function(a){if(this.hasAttr("class")){var b=this.getAttr("class").split(/\s+/),c=!1;g.each(b,function(b,d){d===a&&(c=!0)});return c}return!1},addClass:function(a){var b=null,c=!1;this.hasAttr("class")?(b=this.getAttr("class"),b=b.split(/\s+/),b.forEach(function(b){b===a&&(c=!0)}),!c&&b.push(a),this.setAttr("class",b.join(" "))):this.setAttr("class",a)},removeClass:function(a){if(this.hasAttr("class")){var b=
	this.getAttr("class"),b=b.replace(RegExp("\\b"+a+"\\b","g"),"");this.setAttr("class",n.trim(b).replace(/[ ]{2,}/g," "))}},traversal:function(a){this.children&&this.children.length&&h(this,a);return this}}})();UM.htmlparser=function(a,b){function c(a,b){if(r[a.tagName]){var c=g.createElement(r[a.tagName]);a.appendChild(c);c.appendChild(g.createText(b))}else a.appendChild(g.createText(b))}function d(a,b,c){var e;if(e=p[b]){for(var h=a,k;"root"!=h.type;){if(n.isArray(e)?-1!=n.indexOf(e,h.tagName):e==
	h.tagName){a=h;k=!0;break}h=h.parentNode}k||(a=d(a,n.isArray(e)?e[0]:e))}e=new g({parentNode:a,type:"element",tagName:b.toLowerCase(),children:q.$empty[b]?null:[]});if(c){for(h={};k=f.exec(c);)h[k[1].toLowerCase()]=l[k[1].toLowerCase()]?k[2]||k[3]||k[4]:n.unhtml(k[2]||k[3]||k[4]);e.attrs=h}a.children.push(e);return q.$empty[b]?a:e}var e=/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,f=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
	h={b:1,code:1,i:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,span:1,sub:1,img:1,sup:1,font:1,big:1,small:1,iframe:1,a:1,br:1,pre:1};a=a.replace(RegExp(k.fillChar,"g"),"");b||(a=a.replace(RegExp("[\\r\\t\\n"+(b?"":" ")+"]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n"+(b?"":" ")+"]*","g"),function(a,c){return c&&h[c.toLowerCase()]?a.replace(/(^[\n\r]+)|([\n\r]+$)/g,""):a.replace(RegExp("^[\\r\\n"+(b?"":" ")+"]+"),"").replace(RegExp("[\\r\\n"+(b?"":" ")+"]+$"),"")}));for(var l={href:1,src:1},g=UM.uNode,p={td:"tr",
	tr:["tbody","thead","tfoot"],tbody:"table",th:"tr",thead:"table",tfoot:"table",caption:"table",li:["ul","ol"],dt:"dl",dd:"dl",option:"select"},r={ol:"li",ul:"li"},m,u=0,v=0,w=new g({type:"root",children:[]}),t=w;m=e.exec(a);){u=m.index;try{if(u>v&&c(t,a.slice(v,u)),m[3])q.$cdata[t.tagName]?c(t,m[0]):t=d(t,m[3].toLowerCase(),m[4]);else if(m[1]){if("root"!=t.type)if(q.$cdata[t.tagName]&&!q.$cdata[m[1]])c(t,m[0]);else{for(u=t;"element"==t.type&&t.tagName!=m[1].toLowerCase();)if(t=t.parentNode,"root"==
	t.type)throw t=u,"break";t=t.parentNode}}else m[2]&&t.children.push(new g({type:"comment",data:m[2],parentNode:t}))}catch(L){}v=e.lastIndex}v<a.length&&c(t,a.slice(v));return w};UM.filterNode=function(){function a(b,c){switch(b.type){case "element":var d;if(d=c[b.tagName])if("-"===d)b.parentNode.removeChild(b);else if(n.isFunction(d)){var e=b.parentNode,f=b.getIndex();d(b);if(b.parentNode){if(b.children)for(d=0;f=b.children[d];)a(f,c),f.parentNode&&d++}else for(d=f;f=e.children[d];)a(f,c),f.parentNode&&
	d++}else{if((d=d.$)&&b.attrs){var f={},h;for(e in d){h=b.getAttr(e);if("style"==e&&n.isArray(d[e])){var l=[];n.each(d[e],function(a){var c;(c=b.getStyle(a))&&l.push(a+":"+c)});h=l.join(";")}h&&(f[e]=h)}b.attrs=f}if(b.children)for(d=0;f=b.children[d];)a(f,c),f.parentNode&&d++}else if(q.$cdata[b.tagName])b.parentNode.removeChild(b);else for(e=b.parentNode,f=b.getIndex(),b.parentNode.removeChild(b,!0),d=f;f=e.children[d];)a(f,c),f.parentNode&&d++;break;case "comment":b.parentNode.removeChild(b)}}return function(b,
	c){if(n.isEmptyObject(c))return b;var d;(d=c["-"])&&n.each(d.split(" "),function(a){c[a]="-"});d=0;for(var e;e=b.children[d];)a(e,c),e.parentNode&&d++;return b}}();UM.commands.inserthtml={execCommand:function(a,b,c){var d=this,e;if(b&&!0!==d.fireEvent("beforeinserthtml",b)){e=d.selection.getRange();a=e.document.createElement("div");a.style.display="inline";c||(b=UM.htmlparser(b),d.options.filterRules&&UM.filterNode(b,d.options.filterRules),d.filterInputRule(b),b=b.toHtml());a.innerHTML=n.trim(b);
	if(!e.collapsed&&(b=e.startContainer,k.isFillChar(b)&&e.setStartBefore(b),b=e.endContainer,k.isFillChar(b)&&e.setEndAfter(b),e.txtToElmBoundary(),e.endContainer&&1==e.endContainer.nodeType&&(b=e.endContainer.childNodes[e.endOffset])&&k.isBr(b)&&e.setEndAfter(b),0==e.startOffset&&(b=e.startContainer,k.isBoundaryNode(b,"firstChild")&&(b=e.endContainer,e.endOffset==(3==b.nodeType?b.nodeValue.length:b.childNodes.length)&&k.isBoundaryNode(b,"lastChild")&&(d.body.innerHTML="<p>"+(m.ie?"":"<br/>")+"</p>",
	e.setStart(d.body.firstChild,0).collapse(!0)))),!e.collapsed&&e.deleteContents(),1==e.startContainer.nodeType)){b=e.startContainer.childNodes[e.startOffset];var f;if(b&&k.isBlockElm(b)&&(f=b.previousSibling)&&k.isBlockElm(f)){for(e.setEnd(f,f.childNodes.length).collapse();b.firstChild;)f.appendChild(b.firstChild);k.remove(b)}}var h,l;c=0;var g;e.inFillChar()&&(b=e.startContainer,k.isFillChar(b)?(e.setStartBefore(b).collapse(!0),k.remove(b)):k.isFillChar(b,!0)&&(b.nodeValue=b.nodeValue.replace(F,""),
	e.startOffset--,e.collapsed&&e.collapse(!0)));for(;b=a.firstChild;){if(c){for(h=d.document.createElement("p");b&&(3==b.nodeType||!q.$block[b.tagName]);)g=b.nextSibling,h.appendChild(b),b=g;h.firstChild&&(b=h)}e.insertNode(b);g=b.nextSibling;if(!c&&b.nodeType==k.NODE_ELEMENT&&k.isBlockElm(b)&&(h=k.findParent(b,function(a){return k.isBlockElm(a)}))&&"body"!=h.tagName.toLowerCase()&&(!q[h.tagName][b.nodeName]||b.parentNode!==h)){if(q[h.tagName][b.nodeName])for(l=b.parentNode;l!==h;)f=l,l=l.parentNode;
	else f=h;k.breakParent(b,f||l);f=b.previousSibling;k.trimWhiteTextNode(f);f.childNodes.length||k.remove(f);!m.ie&&(p=b.nextSibling)&&k.isBlockElm(p)&&p.lastChild&&!k.isBr(p.lastChild)&&p.appendChild(d.document.createElement("br"));c=1}var p=b.nextSibling;if(!a.firstChild&&p&&k.isBlockElm(p)){e.setStart(p,0).collapse(!0);break}e.setEndAfter(b).collapse()}b=e.startContainer;g&&k.isBr(g)&&k.remove(g);if(k.isBlockElm(b)&&k.isEmptyNode(b))if(g=b.nextSibling)k.remove(b),1==g.nodeType&&q.$block[g.tagName]&&
	e.setStart(g,0).collapse(!0).shrinkBoundary();else try{b.innerHTML=m.ie?k.fillChar:"<br/>"}catch(r){e.setStartBefore(b),k.remove(b)}try{if(m.ie9below&&1==e.startContainer.nodeType&&!e.startContainer.childNodes[e.startOffset]&&(f=e.startContainer.childNodes[e.startOffset-1])&&1==f.nodeType&&q.$empty[f.tagName]){var y=this.document.createTextNode(k.fillChar);e.insertNode(y).setStart(y,0).collapse(!0)}setTimeout(function(){e.select(!0)})}catch(u){}setTimeout(function(){e=d.selection.getRange();e.scrollIntoView();
	d.fireEvent("afterinserthtml")},200)}}};UM.commands.insertimage={execCommand:function(a,b){b=n.isArray(b)?b:[b];if(b.length){var c=[],d="",e;e=b[0];if(1==b.length)d='<img src="'+e.src+'" '+(e._src?' _src="'+e._src+'" ':"")+(e.width?'width="'+e.width+'" ':"")+(e.height?' height="'+e.height+'" ':"")+("left"==e.floatStyle||"right"==e.floatStyle?' style="float:'+e.floatStyle+';"':"")+(e.title&&""!=e.title?' title="'+e.title+'"':"")+(e.border&&"0"!=e.border?' border="'+e.border+'"':"")+(e.alt&&""!=e.alt?
	' alt="'+e.alt+'"':"")+(e.hspace&&"0"!=e.hspace?' hspace = "'+e.hspace+'"':"")+(e.vspace&&"0"!=e.vspace?' vspace = "'+e.vspace+'"':"")+"/>","center"==e.floatStyle&&(d='<p style="text-align: center">'+d+"</p>"),c.push(d);else for(var f=0;e=b[f++];)d="<p "+("center"==e.floatStyle?'style="text-align: center" ':"")+'><img src="'+e.src+'" '+(e.width?'width="'+e.width+'" ':"")+(e._src?' _src="'+e._src+'" ':"")+(e.height?' height="'+e.height+'" ':"")+' style="'+(e.floatStyle&&"center"!=e.floatStyle?"float:"+
	e.floatStyle+";":"")+(e.border||"")+'" '+(e.title?' title="'+e.title+'"':"")+" /></p>",c.push(d);this.execCommand("insertHtml",c.join(""),!0)}}};UM.plugins.justify=function(){var a=this;g.each(["justifyleft","justifyright","justifycenter","justifyfull"],function(b,c){a.commands[c]={execCommand:function(a){return this.document.execCommand(a)},queryCommandValue:function(a){var b=this.document.queryCommandValue(a);return!0===b||"true"===b?a.replace(/justify/,""):""},queryCommandState:function(a){return this.document.queryCommandState(a)?
	1:0}}})};UM.plugins.font=function(){var a=this,b={forecolor:"forecolor",backcolor:"backcolor",fontsize:"fontsize",fontfamily:"fontname"},c={forecolor:"color",backcolor:"background-color",fontsize:"font-size",fontfamily:"font-family"},d={forecolor:"color",fontsize:"size",fontfamily:"face"};a.setOpt({fontfamily:[{name:"songti",val:"\u5b8b\u4f53,SimSun"},{name:"yahei",val:"\u5fae\u8f6f\u96c5\u9ed1,Microsoft YaHei"},{name:"kaiti",val:"\u6977\u4f53,\u6977\u4f53_GB2312, SimKai"},{name:"heiti",val:"\u9ed1\u4f53, SimHei"},
	{name:"lishu",val:"\u96b6\u4e66, SimLi"},{name:"andaleMono",val:"andale mono"},{name:"arial",val:"arial, helvetica,sans-serif"},{name:"arialBlack",val:"arial black,avant garde"},{name:"comicSansMs",val:"comic sans ms"},{name:"impact",val:"impact,chicago"},{name:"timesNewRoman",val:"times new roman"},{name:"sans-serif",val:"sans-serif"}],fontsize:[10,12,16,18,24,32,48]});a.addOutputRule(function(a){n.each(a.getNodesByTagName("font"),function(a){if("font"==a.tagName){var b=[],c;for(c in a.attrs)switch(c){case "size":var d=
	a.attrs[c];g.each({10:"1",12:"2",16:"3",18:"4",24:"5",32:"6",48:"7"},function(a,b){if(b==d)return d=a,!1});b.push("font-size:"+d+"px");break;case "color":b.push("color:"+a.attrs[c]);break;case "face":b.push("font-family:"+a.attrs[c]);break;case "style":b.push(a.attrs[c])}a.attrs={style:b.join(";")}}a.tagName="span";"span"==a.parentNode.tagName&&1==a.parentNode.children.length&&(g.each(a.attrs,function(b,c){a.parentNode.attrs[b]="style"==b?a.parentNode.attrs[b]+c:c}),a.parentNode.removeChild(a,!0))})});
	for(var e in b)(function(e){a.commands[e]={execCommand:function(a,d){if("transparent"!=d){var e=this.selection.getRange();if(e.collapsed){var f=g("<span></span>").css(c[a],d)[0];e.insertNode(f).setStart(f,0).setCursor()}else{"fontsize"==a&&(d={10:"1",12:"2",16:"3",18:"4",24:"5",32:"6",48:"7"}[(d+"").replace(/px/,"")]);this.document.execCommand(b[a],!1,d);m.gecko&&g.each(this.$body.find("a"),function(a,b){var c=b.parentNode;if(c.lastChild===c.firstChild&&/FONT|SPAN/.test(c.tagName)){var d=c.cloneNode(!1);
	d.innerHTML=b.innerHTML;g(b).html("").append(d).insertBefore(c);g(c).remove()}});if(!m.ie){var f=this.selection.getNative().getRangeAt(0).commonAncestorContainer,e=this.selection.getRange(),k=e.createBookmark(!0);g(f).find("a").each(function(a,b){var c=b.parentNode;"FONT"==c.nodeName&&(c=c.cloneNode(!1),c.innerHTML=b.innerHTML,g(b).html("").append(c))});e.moveToBookmark(k).select()}return!0}}},queryCommandValue:function(b){var e=a.selection.getStart(),f=g(e).css(c[b]);void 0===f&&(f=g(e).attr(d[b]));
	return f?n.fixColor(b,f).replace(/px/,""):""},queryCommandState:function(a){return this.queryCommandValue(a)}}})(e)};UM.plugins.link=function(){this.setOpt("autourldetectinie",!1);m.ie&&!1===this.options.autourldetectinie&&this.addListener("keyup",function(a,b){var c=b.keyCode;if(13==c||32==c){var d=this.selection.getRange().startContainer;13==c?"P"==d.nodeName&&(c=d.previousSibling)&&1==c.nodeType&&(c=c.lastChild)&&"A"==c.nodeName&&!c.getAttribute("_href")&&k.remove(c,!0):32==c&&3==d.nodeType&&/^\s$/.test(d.nodeValue)&&
	(d=d.previousSibling)&&"A"==d.nodeName&&!d.getAttribute("_href")&&k.remove(d,!0)}});this.addOutputRule(function(a){g.each(a.getNodesByTagName("a"),function(a,c){var d=n.html(c.getAttr("_href"));/^(ftp|https?|\/|file)/.test(d)||(d="http://"+d);c.setAttr("href",d);c.setAttr("_href");""==c.getAttr("title")&&c.setAttr("title")})});this.addInputRule(function(a){g.each(a.getNodesByTagName("a"),function(a,c){c.setAttr("_href",n.html(c.getAttr("href")))})});this.commands.link={execCommand:function(a,b){var c=
	this.selection.getRange();if(c.collapsed){var d=c.startContainer;(d=k.findParentByTagName(d,"a",!0))?(g(d).attr(b),c.selectNode(d).select()):c.insertNode(g("<a>"+b.href+"</a>").attr(b)[0]).select()}else this.document.execCommand("createlink",!1,"_umeditor_link"),n.each(k.getElementsByTagName(this.body,"a",function(a){return"_umeditor_link"==a.getAttribute("href")}),function(a){"_umeditor_link"==g(a).text()&&g(a).text(b.href);k.setAttributes(a,b);c.selectNode(a).select()})},queryCommandState:function(){return this.queryCommandValue("link")?
	1:0},queryCommandValue:function(){var a=this.selection.getStartElementPath(),b;g.each(a,function(a,d){if("A"==d.nodeName)return b=d,!1});return b}};this.commands.unlink={execCommand:function(){this.document.execCommand("unlink")}}};UM.commands.print={execCommand:function(){var a="editor_print_"+ +new Date;g('<iframe src="" id="'+a+'" name="'+a+'" frameborder="0"></iframe>').attr("id",a).css({width:"0px",height:"0px",overflow:"hidden","float":"left",position:"absolute",top:"-10000px",left:"-10000px"}).appendTo(this.$container.find(".edui-dialog-container"));
	var b=window.open("",a,"").document;b.open();b.write("<html><head></head><body><div>"+this.getContent(null,null,!0)+"</div><script>setTimeout(function(){window.print();setTimeout(function(){window.parent.$('#"+a+"').remove();},100);},200);\x3c/script></body></html>");b.close()},notNeedUndo:1};UM.plugins.paragraph=function(){this.setOpt("paragraph",{p:"",h1:"",h2:"",h3:"",h4:"",h5:"",h6:""});this.commands.paragraph={execCommand:function(a,b){return this.document.execCommand("formatBlock",!1,"<"+b+
	">")},queryCommandValue:function(){try{var a=this.document.queryCommandValue("formatBlock")}catch(b){}return a}}};UM.plugins.horizontal=function(){var a=this;a.commands.horizontal={execCommand:function(){this.document.execCommand("insertHorizontalRule");var b=a.selection.getRange().txtToElmBoundary(!0),c=b.startContainer;if(k.isBody(b.startContainer))(c=b.startContainer.childNodes[b.startOffset])||(c=g("<p></p>").appendTo(b.startContainer).html(m.ie?"&nbsp;":"<br/>")[0]),b.setStart(c,0).setCursor();
	else{for(;q.$inline[c.tagName]&&c.lastChild===c.firstChild;){var d=c.parentNode;d.appendChild(c.firstChild);d.removeChild(c);c=d}for(;q.$inline[c.tagName];)c=c.parentNode;1==c.childNodes.length&&"HR"==c.lastChild.nodeName?(d=c.lastChild,g(d).insertBefore(c),b.setStart(c,0).setCursor()):(d=g("hr",c)[0],k.breakParent(d,c),(c=d.previousSibling)&&k.isEmptyBlock(c)&&g(c).remove(),b.setStart(d.nextSibling,0).setCursor())}}}};UM.commands.cleardoc={execCommand:function(){var a=this,b=a.selection.getRange();
	a.body.innerHTML="<p>"+(E?"":"<br/>")+"</p>";b.setStart(a.body.firstChild,0).setCursor(!1,!0);setTimeout(function(){a.fireEvent("clearDoc")},0)}};UM.plugins.undo=function(){function a(a,b){if(a.length!=b.length)return 0;for(var c=0,d=a.length;c<d;c++)if(a[c]!=b[c])return 0;return 1}function b(){this.undoManger.save()}var c,d=this.options.maxUndoCount||20,e=this.options.maxInputCount||20,f=RegExp(k.fillChar+"|</hr>","gi"),h={ol:1,ul:1,table:1,tbody:1,tr:1,body:1},l=this.options.autoClearEmptyNode;
	this.undoManger=new function(){this.list=[];this.index=0;this.hasRedo=this.hasUndo=!1;this.undo=function(){if(this.hasUndo)if(this.list[this.index-1]||1!=this.list.length){for(;this.list[this.index].content==this.list[this.index-1].content;)if(this.index--,0==this.index)return this.restore(0);this.restore(--this.index)}else this.reset()};this.redo=function(){if(this.hasRedo){for(;this.list[this.index].content==this.list[this.index+1].content;)if(this.index++,this.index==this.list.length-1)return this.restore(this.index);
	this.restore(++this.index)}};this.restore=function(){var a=this.editor,b=this.list[this.index],c=UM.htmlparser(b.content.replace(f,""));a.options.autoClearEmptyNode=!1;a.filterInputRule(c,!0);a.options.autoClearEmptyNode=l;a.body.innerHTML=c.toHtml();a.fireEvent("afterscencerestore");m.ie&&n.each(k.getElementsByTagName(a.document,"td th caption p"),function(b){k.isEmptyNode(b)&&k.fillNode(a.document,b)});try{var d=(new B.Range(a.document,a.body)).moveToAddress(b.address);if(m.ie&&d.collapsed&&1==
	d.startContainer.nodeType){var e=d.startContainer.childNodes[d.startOffset];(!e||1==e.nodeType&&q.$empty[e])&&d.insertNode(a.document.createTextNode(" ")).collapse(!0)}d.select(h[d.startContainer.nodeName.toLowerCase()])}catch(g){}this.update();this.clearKey();a.fireEvent("reset",!0)};this.getScene=function(){var a=this.editor,b=a.selection.getRange().createAddress(!1,!0);a.fireEvent("beforegetscene");var c=UM.htmlparser(a.body.innerHTML,!0);a.options.autoClearEmptyNode=!1;a.filterOutputRule(c,!0);
	a.options.autoClearEmptyNode=l;c=c.toHtml();m.ie&&(c=c.replace(/>&nbsp;</g,"><").replace(/\s*</g,"<").replace(/>\s*/g,">"));a.fireEvent("aftergetscene");return{address:b,content:c}};this.save=function(b,e){clearTimeout(c);var f=this.getScene(e),l=this.list[this.index],h;if(h=l)if(h=l.content==f.content)b?l=1:(l=l.address,h=f.address,l=l.collapsed!=h.collapsed?0:a(l.startAddress,h.startAddress)&&a(l.endAddress,h.endAddress)?1:0),h=l;h||(this.list=this.list.slice(0,this.index+1),this.list.push(f),this.list.length>
	d&&this.list.shift(),this.index=this.list.length-1,this.clearKey(),this.update())};this.update=function(){this.hasRedo=!!this.list[this.index+1];this.hasUndo=!!this.list[this.index-1]};this.reset=function(){this.list=[];this.index=0;this.hasRedo=this.hasUndo=!1;this.clearKey()};this.clearKey=function(){p=0}};this.undoManger.editor=this;this.addListener("saveScene",function(){var a=Array.prototype.splice.call(arguments,1);this.undoManger.save.apply(this.undoManger,a)});this.addListener("beforeexeccommand",
	b);this.addListener("afterexeccommand",b);this.addListener("reset",function(a,b){b||this.undoManger.reset()});this.commands.redo=this.commands.undo={execCommand:function(a){this.undoManger[a]()},queryCommandState:function(a){return this.undoManger["has"+("undo"==a.toLowerCase()?"Undo":"Redo")]?0:-1},notNeedUndo:1};var s={16:1,17:1,18:1,37:1,38:1,39:1,40:1},p=0,r=!1;this.addListener("ready",function(){g(this.body).on("compositionstart",function(){r=!0}).on("compositionend",function(){r=!1})});this.addshortcutkey({Undo:"ctrl+90",
	Redo:"ctrl+89,shift+ctrl+z"});var y=!0;this.addListener("keydown",function(a,b){var d=this;if(!(s[b.keyCode||b.which]||b.ctrlKey||b.metaKey||b.shiftKey||b.altKey||r))if(d.selection.getRange().collapsed){0==d.undoManger.list.length&&d.undoManger.save(!0);clearTimeout(c);var f=function(a){a.selection.getRange().collapsed&&a.fireEvent("contentchange");a.undoManger.save(!1,!0);a.fireEvent("selectionchange")};c=setTimeout(function(){if(r)var a=setInterval(function(){r||(f(d),clearInterval(a))},300);else f(d)},
	200);p++;p>=e&&f(d)}else d.undoManger.save(!1,!0),y=!1});this.addListener("keyup",function(a,b){s[b.keyCode||b.which]||b.ctrlKey||b.metaKey||b.shiftKey||b.altKey||r||y||(this.undoManger.save(!1,!0),y=!0)})};UM.plugins.paste=function(){function a(a){var b=this.document;if(!b.getElementById("baidu_pastebin")){var c=this.selection.getRange(),h=c.createBookmark(),l=b.createElement("div");l.id="baidu_pastebin";m.webkit&&l.appendChild(b.createTextNode(k.fillChar+k.fillChar));this.body.appendChild(l);h.start.style.display=
	"";l.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:"+g(h.start).position().top+"px";c.selectNodeContents(l).select(!0);setTimeout(function(){if(m.webkit)for(var g=0,p=b.querySelectorAll("#baidu_pastebin"),r;r=p[g++];)if(k.isEmptyNode(r))k.remove(r);else{l=r;break}try{l.parentNode.removeChild(l)}catch(n){}c.moveToBookmark(h).select(!0);a(l)},0)}}function b(a){var b;if(a.firstChild){var f=k.getElementsByTagName(a,"span");b=0;for(var h;h=f[b++];)"_baidu_cut_start"!=
	h.id&&"_baidu_cut_end"!=h.id||k.remove(h);if(m.webkit){h=a.querySelectorAll("div br");for(b=0;f=h[b++];)f=f.parentNode,"DIV"==f.tagName&&1==f.childNodes.length&&(f.innerHTML="<p><br/></p>",k.remove(f));f=a.querySelectorAll("#baidu_pastebin");for(b=0;h=f[b++];){var l=c.document.createElement("p");for(h.parentNode.insertBefore(l,h);h.firstChild;)l.appendChild(h.firstChild);k.remove(h)}h=a.querySelectorAll("meta");for(b=0;f=h[b++];)k.remove(f);h=a.querySelectorAll("br");for(b=0;f=h[b++];)/^apple-/i.test(f.className)&&
	k.remove(f)}if(m.gecko)for(h=a.querySelectorAll("[_moz_dirty]"),b=0;f=h[b++];)f.removeAttribute("_moz_dirty");if(!m.ie)for(h=a.querySelectorAll("span.Apple-style-span"),b=0;f=h[b++];)k.remove(f,!0);b=a.innerHTML;b=UM.filterWord(b);a=UM.htmlparser(b);c.options.filterRules&&UM.filterNode(a,c.options.filterRules);c.filterInputRule(a);m.webkit&&((b=a.lastChild())&&"element"==b.type&&"br"==b.tagName&&a.removeChild(b),n.each(c.body.querySelectorAll("div"),function(a){k.isEmptyBlock(a)&&k.remove(a)}));b=
	{html:a.toHtml()};c.fireEvent("beforepaste",b,a);b.html&&(c.execCommand("insertHtml",b.html,!0),c.fireEvent("afterpaste",b))}}var c=this;c.addListener("ready",function(){g(c.body).on("cut",function(){!c.selection.getRange().collapsed&&c.undoManger&&c.undoManger.save()}).on(m.ie||m.opera?"keydown":"paste",function(d){(!m.ie&&!m.opera||(d.ctrlKey||d.metaKey)&&"86"==d.keyCode)&&a.call(c,function(a){b(a)})})})};UM.plugins.list=function(){this.setOpt({insertorderedlist:{decimal:"","lower-alpha":"","lower-roman":"",
	"upper-alpha":"","upper-roman":""},insertunorderedlist:{circle:"",disc:"",square:""}});this.addInputRule(function(a){n.each(a.getNodesByTagName("li"),function(a){0==a.children.length&&a.parentNode.removeChild(a)})});this.commands.insertorderedlist=this.commands.insertunorderedlist={execCommand:function(a){this.document.execCommand(a);a=this.selection.getRange();var b=a.createBookmark(!0);this.$body.find("ol,ul").each(function(a,b){var e=b.parentNode;"P"==e.tagName&&e.lastChild===e.firstChild&&(g(b).children().each(function(a,
	b){var c=e.cloneNode(!1);g(c).append(b.innerHTML);g(b).html("").append(c)}),g(b).insertBefore(e),g(e).remove());q.$inline[e.tagName]&&("SPAN"==e.tagName&&g(b).children().each(function(a,b){var c=e.cloneNode(!1);if("P"!=b.firstChild.nodeName){for(;b.firstChild;)c.appendChild(b.firstChild);g("<p></p>").appendTo(b).append(c)}else{for(;b.firstChild;)c.appendChild(b.firstChild);g(b.firstChild).append(c)}}),k.remove(e,!0))});a.moveToBookmark(b).select();return!0},queryCommandState:function(a){return this.document.queryCommandState(a)}}};
	(function(){var a={textarea:function(a,c){var d=c.ownerDocument.createElement("textarea");d.style.cssText="resize:none;border:0;padding:0;margin:0;overflow-y:auto;outline:0";m.ie&&8>m.version&&(d.style.width=c.offsetWidth+"px",d.style.height=c.offsetHeight+"px",c.onresize=function(){d.style.width=c.offsetWidth+"px";d.style.height=c.offsetHeight+"px"});c.appendChild(d);return{container:d,setContent:function(a){d.value=a},getContent:function(){return d.value},select:function(){var a;m.ie?(a=d.createTextRange(),
	a.collapse(!0),a.select()):(d.setSelectionRange(0,0),d.focus())},dispose:function(){c.removeChild(d);c=d=c.onresize=null}}}};UM.plugins.source=function(){var b=this,c=!1,d;this.options.sourceEditor="textarea";b.setOpt({sourceEditorFirst:!1});var e=b.getContent,f;b.commands.source={execCommand:function(){if(c=!c){f=b.selection.getRange().createAddress(!1,!0);b.undoManger&&b.undoManger.save(!0);m.gecko&&(b.body.contentEditable=!1);b.body.style.cssText+=";position:absolute;left:-32768px;top:-32768px;";
	b.fireEvent("beforegetcontent");var l=UM.htmlparser(b.body.innerHTML);b.filterOutputRule(l);l.traversal(function(a){if("element"==a.type)switch(a.tagName){case "td":case "th":case "caption":a.children&&1==a.children.length&&"br"==a.firstChild().tagName&&a.removeChild(a.firstChild());break;case "pre":a.innerText(a.innerText().replace(/&nbsp;/g," "))}});b.fireEvent("aftergetcontent");l=l.toHtml(!0);d=a.textarea(b,b.body.parentNode);d.setContent(l);g(d.container).width(g(b.body).width()+parseInt(g(b.body).css("padding-left"))+
	parseInt(g(b.body).css("padding-right"))).height(g(b.body).height());setTimeout(function(){d.select()});b.getContent=function(){return d.getContent()||"<p>"+(m.ie?"":"<br/>")+"</p>"}}else{b.$body.css({position:"",left:"",top:""});l=d.getContent()||"<p>"+(m.ie?"":"<br/>")+"</p>";l=l.replace(RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>","g"),function(a,b){return b&&!q.$inlineWithA[b.toLowerCase()]?a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g,""):a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g,"")});b.setContent(l);
	d.dispose();d=null;b.getContent=e;b.body.firstChild||(b.body.innerHTML="<p>"+(m.ie?"":"<br/>")+"</p>");b.undoManger&&b.undoManger.save(!0);m.gecko&&(b.body.contentEditable=!0);try{b.selection.getRange().moveToAddress(f).select()}catch(h){}}this.fireEvent("sourcemodechanged",c)},queryCommandState:function(){return c|0},notNeedUndo:1};var h=b.queryCommandState;b.queryCommandState=function(a){a=a.toLowerCase();return c?a in{source:1,fullscreen:1}?h.apply(this,arguments):-1:h.apply(this,arguments)}}})();
	UM.plugins.enterkey=function(){var a,b=this,c=b.options.enterTag;b.addListener("keyup",function(c,e){if(13==(e.keyCode||e.which)){var f=b.selection.getRange(),h=f.startContainer,l;if(m.ie)b.fireEvent("saveScene",!0,!0);else{if(/h\d/i.test(a)){if(m.gecko)k.findParentByTagName(h,"h1 h2 h3 h4 h5 h6 blockquote caption table".split(" "),!0)||(b.document.execCommand("formatBlock",!1,"<p>"),l=1);else if(1==h.nodeType){var h=b.document.createTextNode(""),g;f.insertNode(h);if(g=k.findParentByTagName(h,"div",
	!0)){for(l=b.document.createElement("p");g.firstChild;)l.appendChild(g.firstChild);g.parentNode.insertBefore(l,g);k.remove(g);f.setStartBefore(h).setCursor();l=1}k.remove(h)}b.undoManger&&l&&b.undoManger.save()}m.opera&&f.select()}}});b.addListener("keydown",function(d,e){if(13==(e.keyCode||e.which))if(b.fireEvent("beforeenterkeydown"))k.preventDefault(e);else{b.fireEvent("saveScene",!0,!0);a="";var f=b.selection.getRange();if(!f.collapsed){var h=f.startContainer,l=f.endContainer,h=k.findParentByTagName(h,
	"td",!0),l=k.findParentByTagName(l,"td",!0);if(h&&l&&h!==l||!h&&l||h&&!l){e.preventDefault?e.preventDefault():e.returnValue=!1;return}}"p"!=c||m.ie||((h=k.findParentByTagName(f.startContainer,"ol ul p h1 h2 h3 h4 h5 h6 blockquote caption".split(" "),!0))||m.opera?(a=h.tagName,"p"==h.tagName.toLowerCase()&&m.gecko&&k.removeDirtyAttr(h)):(b.document.execCommand("formatBlock",!1,"<p>"),m.gecko&&(f=b.selection.getRange(),(h=k.findParentByTagName(f.startContainer,"p",!0))&&k.removeDirtyAttr(h))))}});m.ie&&
	b.addListener("setDisabled",function(){g(b.body).find("p").each(function(a,b){k.isEmptyBlock(b)&&(b.innerHTML="&nbsp;")})})};UM.commands.preview={execCommand:function(){var a=window.open("","_blank","").document,b=this.getContent(null,null,!0),c=this.getOpt("UMEDITOR_HOME_URL"),c=-1!=b.indexOf("mathquill-embedded-latex")?'<link rel="stylesheet" href="'+c+'third-party/mathquill/mathquill.css"/><script src="'+c+'third-party/jquery.min.js">\x3c/script><script src="'+c+'third-party/mathquill/mathquill.min.js">\x3c/script>':
	"";a.open();a.write("<html><head>"+c+"</head><body><div>"+b+"</div></body></html>");a.close()},notNeedUndo:1};UM.plugins.basestyle=function(){var a=this;a.addshortcutkey({Bold:"ctrl+66",Italic:"ctrl+73",Underline:"ctrl+shift+85",strikeThrough:"ctrl+shift+83"});a.addOutputRule(function(a){g.each(a.getNodesByTagName("b i u strike s"),function(a,b){switch(b.tagName){case "b":b.tagName="strong";break;case "i":b.tagName="em";break;case "u":b.tagName="span";b.setStyle("text-decoration","underline");break;
	case "s":case "strike":b.tagName="span",b.setStyle("text-decoration","line-through")}})});g.each("bold underline superscript subscript italic strikethrough".split(" "),function(b,c){a.commands[c]={execCommand:function(a){var b=this.selection.getRange();return b.collapsed&&1!=this.queryCommandState(a)?(a=this.document.createElement({bold:"strong",underline:"u",superscript:"sup",subscript:"sub",italic:"em",strikethrough:"strike"}[a]),b.insertNode(a).setStart(a,0).setCursor(!1),!0):this.document.execCommand(a)},
	queryCommandState:function(a){if(m.gecko)return this.document.queryCommandState(a);var b=this.selection.getStartElementPath(),c=!1;g.each(b,function(b,e){switch(a){case "bold":if("STRONG"==e.nodeName||"B"==e.nodeName)return c=1,!1;break;case "underline":if("U"==e.nodeName||"SPAN"==e.nodeName&&"underline"==g(e).css("text-decoration"))return c=1,!1;break;case "superscript":if("SUP"==e.nodeName)return c=1,!1;break;case "subscript":if("SUB"==e.nodeName)return c=1,!1;break;case "italic":if("EM"==e.nodeName||
	"I"==e.nodeName)return c=1,!1;break;case "strikethrough":if("S"==e.nodeName||"STRIKE"==e.nodeName||"SPAN"==e.nodeName&&"line-through"==g(e).css("text-decoration"))return c=1,!1}});return c}}})};UM.plugins.video=function(){function a(a,b,f,h,l,g){return g?'<embed type="application/x-shockwave-flash" class="edui-faked-video" pluginspage="http://www.macromedia.com/go/getflashplayer" src="'+a+'" width="'+b+'" height="'+f+'"'+(l?' style="float:'+l+'"':"")+' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >':
	"<img "+(h?'id="'+h+'"':"")+' width="'+b+'" height="'+f+'" _url="'+a+'" class="edui-faked-video" src="'+c.options.UMEDITOR_HOME_URL+'themes/default/images/spacer.gif" style="background:url('+c.options.UMEDITOR_HOME_URL+"themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;"+(l?"float:"+l+";":"")+'" />'}function b(b,c){n.each(b.getNodesByTagName(c?"img":"embed"),function(b){if("edui-faked-video"==b.getAttr("class")){var d=a(c?b.getAttr("_url"):b.getAttr("src"),b.getAttr("width"),
	b.getAttr("height"),null,b.getStyle("float")||"",c);b.parentNode.replaceChild(UM.uNode.createElement(d),b)}})}var c=this;c.addOutputRule(function(a){b(a,!0)});c.addInputRule(function(a){b(a)});c.commands.insertvideo={execCommand:function(b,e){e=n.isArray(e)?e:[e];for(var f=[],h=0,l,g=e.length;h<g;h++)l=e[h],f.push(a(l.url,l.width||420,l.height||280,"tmpVedio"+h,l.align,!1));c.execCommand("inserthtml",f.join(""),!0)},queryCommandState:function(){var a=c.selection.getRange().getClosedNode();return a&&
	"edui-faked-video"==a.className?1:0}}};UM.plugins.selectall=function(){this.commands.selectall={execCommand:function(){var a=this.body,b=this.selection.getRange();b.selectNodeContents(a);k.isEmptyBlock(a)&&(m.opera&&a.firstChild&&1==a.firstChild.nodeType&&b.setStartAtFirst(a.firstChild),b.collapse(!0));b.select(!0)},notNeedUndo:1};this.addshortcutkey({selectAll:"ctrl+65"})};UM.plugins.removeformat=function(){this.setOpt({removeFormatTags:"b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
	removeFormatAttributes:"class,style,lang,width,height,align,hspace,valign"});this.commands.removeformat={execCommand:function(a,b,c,d,e){function f(a){if(3==a.nodeType||"span"!=a.tagName.toLowerCase())return 0;if(m.ie){var b=a.attributes;if(b.length){a=0;for(var c=b.length;a<c;a++)if(b[a].specified)return 0;return 1}}return!a.attributes.length}function h(a){var b=a.createBookmark();a.collapsed&&a.enlarge(!0);if(!e){var d=k.findParentByTagName(a.startContainer,"a",!0);d&&a.setStartBefore(d);(d=k.findParentByTagName(a.endContainer,
	"a",!0))&&a.setEndAfter(d)}p=a.createBookmark();for(d=p.start;(r=d.parentNode)&&!k.isBlockElm(r);)k.breakParent(d,r),k.clearEmptySibling(d);if(p.end){for(d=p.end;(r=d.parentNode)&&!k.isBlockElm(r);)k.breakParent(d,r),k.clearEmptySibling(d);for(var d=k.getNextDomNode(p.start,!1,n),h;d&&d!=p.end;)h=k.getNextDomNode(d,!0,n),q.$empty[d.tagName.toLowerCase()]||k.isBookmarkNode(d)||(l.test(d.tagName)?c?(k.removeStyle(d,c),f(d)&&"text-decoration"!=c&&k.remove(d,!0)):k.remove(d,!0):q.$tableContent[d.tagName]||
	q.$list[d.tagName]||(k.removeAttributes(d,g),f(d)&&k.remove(d,!0))),d=h}d=p.start.parentNode;!k.isBlockElm(d)||q.$tableContent[d.tagName]||q.$list[d.tagName]||k.removeAttributes(d,g);d=p.end.parentNode;p.end&&k.isBlockElm(d)&&!q.$tableContent[d.tagName]&&!q.$list[d.tagName]&&k.removeAttributes(d,g);a.moveToBookmark(p).moveToBookmark(b);d=a.startContainer;for(h=a.collapsed;1==d.nodeType&&k.isEmptyNode(d)&&q.$removeEmpty[d.tagName];)b=d.parentNode,a.setStartBefore(d),a.startContainer===a.endContainer&&
	a.endOffset--,k.remove(d),d=b;if(!h)for(d=a.endContainer;1==d.nodeType&&k.isEmptyNode(d)&&q.$removeEmpty[d.tagName];)b=d.parentNode,a.setEndBefore(d),k.remove(d),d=b}var l=RegExp("^(?:"+(b||this.options.removeFormatTags).replace(/,/g,"|")+")$","i"),g=c?[]:(d||this.options.removeFormatAttributes).split(",");a=new B.Range(this.document);var p,r,n=function(a){return 1==a.nodeType};a=this.selection.getRange();a.collapsed||(h(a),a.select())}}};UM.plugins.keystrokes=function(){var a=this,b=!0;a.addListener("keydown",
	function(c,d){var e=d.keyCode||d.which,f=a.selection.getRange();if(!(f.collapsed||d.ctrlKey||d.shiftKey||d.altKey||d.metaKey)&&(65<=e&&90>=e||48<=e&&57>=e||96<=e&&111>=e||{13:1,8:1,46:1}[e])){var h=f.startContainer;k.isFillChar(h)&&f.setStartBefore(h);h=f.endContainer;k.isFillChar(h)&&f.setEndAfter(h);f.txtToElmBoundary();f.endContainer&&1==f.endContainer.nodeType&&(h=f.endContainer.childNodes[f.endOffset])&&k.isBr(h)&&f.setEndAfter(h);if(0==f.startOffset&&(h=f.startContainer,k.isBoundaryNode(h,"firstChild")&&
	(h=f.endContainer,f.endOffset==(3==h.nodeType?h.nodeValue.length:h.childNodes.length)&&k.isBoundaryNode(h,"lastChild")))){a.fireEvent("saveScene");a.body.innerHTML="<p>"+(m.ie?"":"<br/>")+"</p>";f.setStart(a.body.firstChild,0).setCursor(!1,!0);a._selectionChange();return}}if(8==e){f=a.selection.getRange();b=f.collapsed;if(a.fireEvent("delkeydown",d))return;var l;f.collapsed&&f.inFillChar()&&(h=f.startContainer,k.isFillChar(h)?(f.setStartBefore(h).shrinkBoundary(!0).collapse(!0),k.remove(h)):(h.nodeValue=
	h.nodeValue.replace(RegExp("^"+k.fillChar),""),f.startOffset--,f.collapse(!0).select(!0)));if(h=f.getClosedNode()){a.fireEvent("saveScene");f.setStartBefore(h);k.remove(h);f.setCursor();a.fireEvent("saveScene");k.preventDefault(d);return}if(!m.ie&&(h=k.findParentByTagName(f.startContainer,"table",!0),l=k.findParentByTagName(f.endContainer,"table",!0),h&&!l||!h&&l||h!==l)){d.preventDefault();return}h=f.startContainer;f.collapsed&&1==h.nodeType&&(h=h.childNodes[f.startOffset-1])&&1==h.nodeType&&"BR"==
	h.tagName&&(a.fireEvent("saveScene"),f.setStartBefore(h).collapse(!0),k.remove(h),f.select(),a.fireEvent("saveScene"));if(m.chrome&&f.collapsed){for(;0==f.startOffset&&!k.isEmptyBlock(f.startContainer);)f.setStartBefore(f.startContainer);(h=f.startContainer.childNodes[f.startOffset-1])&&"BR"==h.nodeName&&(f.setStartBefore(h),a.fireEvent("saveScene"),g(h).remove(),f.setCursor(),a.fireEvent("saveScene"))}}if(m.gecko&&46==e&&(e=a.selection.getRange(),e.collapsed&&(h=e.startContainer,k.isEmptyBlock(h)))){for(e=
	h.parentNode;1==k.getChildCount(e)&&!k.isBody(e);)h=e,e=e.parentNode;h===e.lastChild&&d.preventDefault()}});a.addListener("keyup",function(a,d){var e;if(8==(d.keyCode||d.which)&&!this.fireEvent("delkeyup")){e=this.selection.getRange();if(e.collapsed){var f;if((f=k.findParentByTagName(e.startContainer,"h1 h2 h3 h4 h5 h6".split(" "),!0))&&k.isEmptyBlock(f)){var h=f.previousSibling;if(h&&"TABLE"!=h.nodeName){k.remove(f);e.setStartAtLast(h).setCursor(!1,!0);return}if((h=f.nextSibling)&&"TABLE"!=h.nodeName){k.remove(f);
	e.setStartAtFirst(h).setCursor(!1,!0);return}}k.isBody(e.startContainer)&&(f=k.createElement(this.document,"p",{innerHTML:m.ie?k.fillChar:"<br/>"}),e.insertNode(f).setStart(f,0).setCursor(!1,!0))}!b&&(3==e.startContainer.nodeType||1==e.startContainer.nodeType&&k.isEmptyBlock(e.startContainer))&&(m.ie?(f=e.document.createElement("span"),e.insertNode(f).setStartBefore(f).collapse(!0),e.select(),k.remove(f)):e.select())}})};UM.plugins.autosave=function(){function a(a){var l=null;new Date-c<d||(a.hasContents()?
	(c=new Date,a._saveFlag=null,l=b.body.innerHTML,!1!==a.fireEvent("beforeautosave",{content:l})&&(f.saveLocalData(e,l),a.fireEvent("afterautosave",{content:l}))):e&&f.removeItem(e))}var b=this,c=new Date,d=20,e=null;b.setOpt("saveInterval",500);var f=UM.LocalStorage=function(){function a(){var b=document.createElement("div");b.style.display="none";if(!b.addBehavior)return null;b.addBehavior("#default#userdata");return{getItem:function(a){var d=null;try{document.body.appendChild(b),b.load(c),d=b.getAttribute(a),
	document.body.removeChild(b)}catch(e){}return d},setItem:function(a,d){document.body.appendChild(b);b.setAttribute(a,d);b.save(c);document.body.removeChild(b)},removeItem:function(a){document.body.appendChild(b);b.removeAttribute(a);b.save(c);document.body.removeChild(b)}}}var b=window.localStorage||a()||null,c="localStorage";return{saveLocalData:function(a,c){return b&&c?(b.setItem(a,c),!0):!1},getLocalData:function(a){return b?b.getItem(a):null},removeItem:function(a){b&&b.removeItem(a)}}}();b.addListener("ready",
	function(){var a=null,a=b.key?b.key+"-drafts-data":(b.container.parentNode.id||"ue-common")+"-drafts-data";e=(location.protocol+location.host+location.pathname).replace(/[.:\/]/g,"_")+a});b.addListener("contentchange",function(){e&&(b._saveFlag&&window.clearTimeout(b._saveFlag),0<b.options.saveInterval?b._saveFlag=window.setTimeout(function(){a(b)},b.options.saveInterval):a(b))});b.commands.clearlocaldata={execCommand:function(a,b){e&&f.getLocalData(e)&&f.removeItem(e)},notNeedUndo:!0,ignoreContentChange:!0};
	b.commands.getlocaldata={execCommand:function(a,b){return e?f.getLocalData(e)||"":""},notNeedUndo:!0,ignoreContentChange:!0};b.commands.drafts={execCommand:function(a,c){e&&(b.body.innerHTML=f.getLocalData(e)||"<p>"+(m.ie?"&nbsp;":"<br/>")+"</p>",b.focus(!0))},queryCommandState:function(){return e?null===f.getLocalData(e)?-1:0:-1},notNeedUndo:!0,ignoreContentChange:!0}};UM.plugins.autoupload=function(){var a=this;a.setOpt("pasteImageEnabled",!0);a.setOpt("dropFileEnabled",!0);var b=function(b,d){var e=
	new FormData;e.append(d.options.imageFieldName||"upfile",b,b.name||"blob."+b.type.substr(6));e.append("type","ajax");var f=new XMLHttpRequest;f.open("post",a.options.imageUrl,!0);f.setRequestHeader("X-Requested-With","XMLHttpRequest");f.addEventListener("load",function(b){try{var c=eval("("+b.target.response+")").url,e=a.options.imagePath+c;d.execCommand("insertimage",{src:e,_src:e})}catch(f){}});f.send(e)};a.addListener("ready",function(){if(window.FormData&&window.FileReader){var c=function(c){var e=
	!1;"paste"==c.type?(c=c.originalEvent,c=c.clipboardData&&c.clipboardData.items&&1==c.clipboardData.items.length&&/^image\//.test(c.clipboardData.items[0].type)?c.clipboardData.items:null):(c=c.originalEvent,c=c.dataTransfer&&c.dataTransfer.files?c.dataTransfer.files:null);if(c){for(var f=c.length,h;f--;)h=c[f],h.getAsFile&&(h=h.getAsFile()),h&&0<h.size&&/image\/\w+/i.test(h.type)&&(b(h,a),e=!0);if(e)return!1}};a.getOpt("pasteImageEnabled")&&a.$body.on("paste",c);a.getOpt("dropFileEnabled")&&a.$body.on("drop",
	c);a.$body.on("dragover",function(a){if("Files"==a.originalEvent.dataTransfer.types[0])return!1})}})};UM.plugins.formula=function(){function a(){return c.$body.find("iframe.edui-formula-active")[0]||null}function b(){var b=a();b&&b.contentWindow.formula.blur()}var c=this;c.addInputRule(function(a){g.each(a.getNodesByTagName("span"),function(a,b){if(b.hasClass("mathquill-embedded-latex")){for(var d,l="";d=b.firstChild();)l+=d.data,b.removeChild(d);b.tagName="iframe";b.setAttr({frameborder:"0",src:c.getOpt("UMEDITOR_HOME_URL")+
	"dialogs/formula/formula.html","data-latex":n.unhtml(l)})}})});c.addOutputRule(function(a){g.each(a.getNodesByTagName("iframe"),function(a,b){b.hasClass("mathquill-embedded-latex")&&(b.tagName="span",b.appendChild(UM.uNode.createText(b.getAttr("data-latex"))),b.setAttr({frameborder:"",src:"","data-latex":""}))})});c.addListener("click",function(){b()});c.addListener("afterexeccommand",function(a,c){"formula"!=c&&b()});c.commands.formula={execCommand:function(b,e){var f=a();f?f.contentWindow.formula.insertLatex(e):
	(c.execCommand("inserthtml",'<span class="mathquill-embedded-latex">'+e+"</span>"),m.ie&&m.ie9below&&setTimeout(function(){var a=c.selection.getRange(),b=a.startContainer;1!=b.nodeType||b.childNodes[a.startOffset]||(a.insertNode(c.document.createTextNode(" ")),a.setCursor())},100))},queryCommandState:function(a){return 0},queryCommandValue:function(b){return(b=a())&&b.contentWindow.formula.getLatex()}}};(function(a){function b(b,c,d){b.prototype=a.extend2(a.extend({},c),(UM.ui[d]||e).prototype,!0);
	b.prototype.supper=(UM.ui[d]||e).prototype;UM.ui[d]&&UM.ui[d].prototype.defaultOpt&&(b.prototype.defaultOpt=a.extend({},UM.ui[d].prototype.defaultOpt,b.prototype.defaultOpt||{}));return b}function c(b,c){a[f+c]=b;a.fn[f+c]=function(c){var d,e=Array.prototype.slice.call(arguments,1);this.each(function(f,h){var g=a(h),k=g.edui();k||(b(c&&a.isPlainObject(c)?c:{},g),g.edui(k));if("string"==a.type(c))if("this"==c)d=k;else{d=k[c].apply(k,e);if(d!==k&&void 0!==d)return!1;d=null}});return null!==d?d:this}}
	a.parseTmpl=function(a,b){var c="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g,function(a,b){return"',"+b.replace(/\\'/g,"'")+",'"}).replace(/<%([\s\S]+?)%>/g,function(a,b){return"');"+b.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",c=new Function("obj",c);return b?c(b):c};a.extend2=function(b,
	c){for(var d=arguments,e="boolean"==a.type(d[d.length-1])?d[d.length-1]:!1,f="boolean"==a.type(d[d.length-1])?d.length-1:d.length,h=1;h<f;h++){var g=d[h],k;for(k in g)e&&b.hasOwnProperty(k)||(b[k]=g[k])}return b};a.IE6=!!window.ActiveXObject&&6==parseFloat(navigator.userAgent.match(/msie (\d+)/i)[1]);var d=[],e=function(){},f="edui";e.prototype={on:function(b,c){this.root().on(b,a.proxy(c,this));return this},off:function(b,c){this.root().off(b,a.proxy(c,this));return this},trigger:function(a,b){return!1===
	this.root().trigger(a,b)?!1:this},root:function(a){return this._$el||(this._$el=a)},destroy:function(){},data:function(a,b){return void 0!==b?(this.root().data(f+a,b),this):this.root().data(f+a)},register:function(b,c,e){d.push({evtname:b,$els:a.isArray(c)?c:[c],handler:a.proxy(e,c)})}};a.fn.edui=function(a){return a?this.data("eduiwidget",a):this.data("eduiwidget")};var h=1;UM.ui={define:function(d,e,g){var k=UM.ui[d]=b(function(b,c){var e=function(){};a.extend(e.prototype,k.prototype,{guid:d+h++,
	widgetName:d});e=new e;if("string"==a.type(b))return e.init&&e.init({}),e.root().edui(e),e.root().find("a").click(function(a){a.preventDefault()}),e.root()[f+d].apply(e.root(),arguments);c&&e.root(c);e.init&&e.init(!b||a.isPlainObject(b)?a.extend2(b||{},e.defaultOpt||{},!0):b);try{e.root().find("a").click(function(a){a.preventDefault()})}catch(g){}return e.root().edui(e)},e,g);c(k,d)}};a(function(){a(document).on("click mouseup mousedown dblclick mouseover",function(b){a.each(d,function(c,d){d.evtname==
	b.type&&a.each(d.$els,function(c,e){e[0]===b.target||a.contains(e[0],b.target)||d.handler(b)})})})})})(jQuery);UM.ui.define("button",{tpl:'<<%if(!texttype){%>div class="edui-btn edui-btn-<%=icon%> <%if(name){%>edui-btn-name-<%=name%><%}%>" unselectable="on" onmousedown="return false" <%}else{%>a class="edui-text-btn"<%}%><% if(title) {%> data-original-title="<%=title%>" <%};%>> <% if(icon) {%><div unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><% }; %><%if(text) {%><span unselectable="on" onmousedown="return false" class="edui-button-label"><%=text%></span><%}%><%if(caret && text){%><span class="edui-button-spacing"></span><%}%><% if(caret) {%><span unselectable="on" onmousedown="return false" class="edui-caret"></span><% };%></<%if(!texttype){%>div<%}else{%>a<%}%>>',
	defaultOpt:{text:"",title:"",icon:"",width:"",caret:!1,texttype:!1,click:function(){}},init:function(a){var b=this;b.root(g(g.parseTmpl(b.tpl,a))).click(function(c){b.wrapclick(a.click,c)});b.root().hover(function(){b.root().hasClass("edui-disabled")||b.root().toggleClass("edui-hover")});return b},wrapclick:function(a,b){this.disabled()||(this.root().trigger("wrapclick"),g.proxy(a,this,b)());return this},label:function(a){if(void 0===a)return this.root().find(".edui-button-label").text();this.root().find(".edui-button-label").text(a);
	return this},disabled:function(a){if(void 0===a)return this.root().hasClass("edui-disabled");this.root().toggleClass("edui-disabled",a);this.root().hasClass("edui-disabled")&&this.root().removeClass("edui-hover");return this},active:function(a){if(void 0===a)return this.root().hasClass("edui-active");this.root().toggleClass("edui-active",a);return this},mergeWith:function(a){var b=this;b.data("$mergeObj",a);a.edui().data("$mergeObj",b.root());g.contains(document.body,a[0])||a.appendTo(b.root());b.on("click",
	function(){b.wrapclick(function(){a.edui().show()})}).register("click",b.root(),function(b){a.hide()})}});(function(){UM.ui.define("toolbar",{tpl:'<div class="edui-toolbar"  ><div class="edui-btn-toolbar" unselectable="on" onmousedown="return false"  ></div></div>',init:function(){var a=this.root(g(this.tpl));this.data("$btnToolbar",a.find(".edui-btn-toolbar"))},appendToBtnmenu:function(a){var b=this.data("$btnToolbar");a=g.isArray(a)?a:[a];g.each(a,function(a,d){b.append(d)})}})})();UM.ui.define("menu",
	{show:function(a,b,c,d,e){c=c||"position";!1!==this.trigger("beforeshow")&&(this.root().css(g.extend({display:"block"},a?{top:a[c]().top+("right"==b?0:a.outerHeight())-(d||0),left:a[c]().left+("right"==b?a.outerWidth():0)-(e||0)}:{})),this.trigger("aftershow"))},hide:function(a){var b;!1!==this.trigger("beforehide")&&((b=this.root().data("parentmenu"))&&(b.data("parentmenu")||a)&&b.edui().hide(),this.root().css("display","none"),this.trigger("afterhide"))},attachTo:function(a){var b=this;a.data("$mergeObj")||
	(a.data("$mergeObj",b.root()),a.on("wrapclick",function(a){b.show()}),b.register("click",a,function(a){b.hide()}),b.data("$mergeObj",a))}});UM.ui.define("dropmenu",{tmpl:'<ul class="edui-dropdown-menu" aria-labelledby="dropdownMenu" ><%for(var i=0,ci;ci=data[i++];){%><%if(ci.divider){%><li class="edui-divider"></li><%}else{%><li <%if(ci.active||ci.disabled){%>class="<%= ci.active|| \'\' %> <%=ci.disabled||\'\' %>" <%}%> data-value="<%= ci.value%>"><a href="#" tabindex="-1"><em class="edui-dropmenu-checkbox"><i class="edui-icon-ok"></i></em><%= ci.label%></a></li><%}%><%}%></ul>',
	defaultOpt:{data:[],click:function(){}},init:function(a){var b=this,c={click:1,mouseover:1,mouseout:1};this.root(g(g.parseTmpl(this.tmpl,a))).on("click",'li[class!="edui-disabled edui-divider edui-dropdown-submenu"]',function(c){g.proxy(a.click,b,c,g(this).data("value"),g(this))()}).find("li").each(function(d,e){var f=g(this);if(!f.hasClass("edui-disabled edui-divider edui-dropdown-submenu")){var h=a.data[d];g.each(c,function(a){h[a]&&f[a](function(c){g.proxy(h[a],e)(c,h,b.root)})})}})},disabled:function(a){g("li[class!=edui-divider]",
	this.root()).each(function(){var b=g(this);!0===a?b.addClass("edui-disabled"):g.isFunction(a)?b.toggleClass("edui-disabled",a(li)):b.removeClass("edui-disabled")})},val:function(a){var b;g('li[class!="edui-divider edui-disabled edui-dropdown-submenu"]',this.root()).each(function(){var c=g(this);if(void 0===a){if(c.find("em.edui-dropmenu-checked").length)return b=c.data("value"),!1}else c.find("em").toggleClass("edui-dropmenu-checked",c.data("value")==a)});if(void 0===a)return b},addSubmenu:function(a,
	b,c){c=c||0;var d=g("li[class!=edui-divider]",this.root());a=g('<li class="edui-dropdown-submenu"><a tabindex="-1" href="#">'+a+"</a></li>").append(b);0<=c&&c<d.length?a.insertBefore(d[c]):0>c?a.insertBefore(d[0]):c>=d.length&&a.appendTo(d)}},"menu");UM.ui.define("splitbutton",{tpl:'<div class="edui-splitbutton <%if (name){%>edui-splitbutton-<%= name %><%}%>"  unselectable="on" <%if(title){%>data-original-title="<%=title%>"<%}%>><div class="edui-btn"  unselectable="on" ><%if(icon){%><div  unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><%}%><%if(text){%><%=text%><%}%></div><div  unselectable="on" class="edui-btn edui-dropdown-toggle" ><div  unselectable="on" class="edui-caret"></div></div></div>',
	defaultOpt:{text:"",title:"",click:function(){}},init:function(a){var b=this;b.root(g(g.parseTmpl(b.tpl,a)));b.root().find(".edui-btn:first").click(function(c){b.disabled()||g.proxy(a.click,b)()});b.root().find(".edui-dropdown-toggle").click(function(){b.disabled()||b.trigger("arrowclick")});b.root().hover(function(){b.root().hasClass("edui-disabled")||b.root().toggleClass("edui-hover")});return b},wrapclick:function(a,b){this.disabled()||g.proxy(a,this,b)();return this},disabled:function(a){if(void 0===
	a)return this.root().hasClass("edui-disabled");this.root().toggleClass("edui-disabled",a).find(".edui-btn").toggleClass("edui-disabled",a);return this},active:function(a){if(void 0===a)return this.root().hasClass("edui-active");this.root().toggleClass("edui-active",a).find(".edui-btn:first").toggleClass("edui-active",a);return this},mergeWith:function(a){var b=this;b.data("$mergeObj",a);a.edui().data("$mergeObj",b.root());g.contains(document.body,a[0])||a.appendTo(b.root());b.root().delegate(".edui-dropdown-toggle",
	"click",function(){b.wrapclick(function(){a.edui().show()})});b.register("click",b.root().find(".edui-dropdown-toggle"),function(b){a.hide()})}});UM.ui.define("colorsplitbutton",{tpl:'<div class="edui-splitbutton <%if (name){%>edui-splitbutton-<%= name %><%}%>"  unselectable="on" <%if(title){%>data-original-title="<%=title%>"<%}%>><div class="edui-btn"  unselectable="on" ><%if(icon){%><div  unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><%}%><div class="edui-splitbutton-color-label" <%if (color) {%>style="background: <%=color%>"<%}%>></div><%if(text){%><%=text%><%}%></div><div  unselectable="on" class="edui-btn edui-dropdown-toggle" ><div  unselectable="on" class="edui-caret"></div></div></div>',
	defaultOpt:{color:""},init:function(a){this.supper.init.call(this,a)},colorLabel:function(){return this.root().find(".edui-splitbutton-color-label")}},"splitbutton");UM.ui.define("popup",{tpl:'<div class="edui-dropdown-menu edui-popup"<%if(!<%=stopprop%>){%>onmousedown="return false"<%}%>><div class="edui-popup-body" unselectable="on" onmousedown="return false"><%=subtpl%></div><div class="edui-popup-caret"></div></div>',defaultOpt:{stopprop:!1,subtpl:"",width:"",height:""},init:function(a){this.root(g(g.parseTmpl(this.tpl,
	a)));return this},mergeTpl:function(a){return g.parseTmpl(this.tpl,{subtpl:a})},show:function(a,b){b||(b={});var c=b.fnname||"position";!1!==this.trigger("beforeshow")&&(this.root().css(g.extend({display:"block"},a?{top:a[c]().top+("right"==b.dir?0:a.outerHeight())-(b.offsetTop||0),left:a[c]().left+("right"==b.dir?a.outerWidth():0)-(b.offsetLeft||0),position:"absolute"}:{})),this.root().find(".edui-popup-caret").css({top:b.caretTop||0,left:b.caretLeft||0,position:"absolute"}).addClass(b.caretDir||
	"up"),this.trigger("aftershow"))},hide:function(){this.root().css("display","none");this.trigger("afterhide")},attachTo:function(a,b){var c=this;a.data("$mergeObj")||(a.data("$mergeObj",c.root()),a.on("wrapclick",function(d){c.show(a,b)}),c.register("click",a,function(a){c.hide()}),c.data("$mergeObj",a))},getBodyContainer:function(){return this.root().find(".edui-popup-body")}});UM.ui.define("scale",{tpl:'<div class="edui-scale" unselectable="on"><span class="edui-scale-hand0"></span><span class="edui-scale-hand1"></span><span class="edui-scale-hand2"></span><span class="edui-scale-hand3"></span><span class="edui-scale-hand4"></span><span class="edui-scale-hand5"></span><span class="edui-scale-hand6"></span><span class="edui-scale-hand7"></span></div>',
	defaultOpt:{$doc:g(document),$wrap:g(document)},init:function(a){a.$doc&&(this.defaultOpt.$doc=a.$doc);a.$wrap&&(this.defaultOpt.$wrap=a.$wrap);this.root(g(g.parseTmpl(this.tpl,a)));this.initStyle();this.startPos=this.prePos={x:0,y:0};this.dragId=-1;return this},initStyle:function(){n.cssRule("edui-style-scale",".edui-scale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;}.edui-scale span{position:absolute;left:0;top:0;width:7px;height:7px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-scale .edui-scale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-scale .edui-scale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-scale .edui-scale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-scale .edui-scale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-scale .edui-scale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")},
	_eventHandler:function(a){var b=this.defaultOpt.$doc;switch(a.type){case "mousedown":var c=a.target||a.srcElement;-1!=c.className.indexOf("edui-scale-hand")&&(this.dragId=c.className.slice(-1),this.startPos.x=this.prePos.x=a.clientX,this.startPos.y=this.prePos.y=a.clientY,b.bind("mousemove",g.proxy(this._eventHandler,this)));break;case "mousemove":-1!=this.dragId&&(this.updateContainerStyle(this.dragId,{x:a.clientX-this.prePos.x,y:a.clientY-this.prePos.y}),this.prePos.x=a.clientX,this.prePos.y=a.clientY,
	this.updateTargetElement());break;case "mouseup":-1!=this.dragId&&(this.dragId=-1,this.updateTargetElement(),this.data("$scaleTarget").parent()&&this.attachTo(this.data("$scaleTarget"))),b.unbind("mousemove",g.proxy(this._eventHandler,this))}},updateTargetElement:function(){var a=this.root(),b=this.data("$scaleTarget");b.css({width:a.width(),height:a.height()});this.attachTo(b)},updateContainerStyle:function(a,b){var c=this.root(),d,e=[[0,0,-1,-1],[0,0,0,-1],[0,0,1,-1],[0,0,-1,0],[0,0,1,0],[0,0,-1,
	1],[0,0,0,1],[0,0,1,1]];0!=e[a][0]&&(d=parseInt(c.offset().left)+b.x,c.css("left",this._validScaledProp("left",d)));0!=e[a][1]&&(d=parseInt(c.offset().top)+b.y,c.css("top",this._validScaledProp("top",d)));0!=e[a][2]&&(d=c.width()+e[a][2]*b.x,c.css("width",this._validScaledProp("width",d)));0!=e[a][3]&&(d=c.height()+e[a][3]*b.y,c.css("height",this._validScaledProp("height",d)))},_validScaledProp:function(a,b){var c=this.root(),d=this.defaultOpt.$doc,e=function(a,c,d){return a+c>d?d-c:b};b=isNaN(b)?
	0:b;switch(a){case "left":return 0>b?0:e(b,c.width(),d.width());case "top":return 0>b?0:e(b,c.height(),d.height());case "width":return 0>=b?1:e(b,c.offset().left,d.width());case "height":return 0>=b?1:e(b,c.offset().top,d.height())}},show:function(a){a&&this.attachTo(a);this.root().bind("mousedown",g.proxy(this._eventHandler,this));this.defaultOpt.$doc.bind("mouseup",g.proxy(this._eventHandler,this));this.root().show();this.trigger("aftershow")},hide:function(){this.root().unbind("mousedown",g.proxy(this._eventHandler,
	this));this.defaultOpt.$doc.unbind("mouseup",g.proxy(this._eventHandler,this));this.root().hide();this.trigger("afterhide")},attachTo:function(a){var b=a.offset(),c=this.root(),d=this.defaultOpt.$wrap,e=d.offset();this.data("$scaleTarget",a);this.root().css({position:"absolute",width:a.width(),height:a.height(),left:b.left-e.left-parseInt(d.css("border-left-width"))-parseInt(c.css("border-left-width")),top:b.top-e.top-parseInt(d.css("border-top-width"))-parseInt(c.css("border-top-width"))})},getScaleTarget:function(){return this.data("$scaleTarget")[0]}});
	UM.ui.define("colorpicker",{tpl:function(a){for(var b="ffffff 000000 eeece1 1f497d 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 f2f2f2 7f7f7f ddd9c3 c6d9f0 dbe5f1 f2dcdb ebf1dd e5e0ec dbeef3 fdeada d8d8d8 595959 c4bd97 8db3e2 b8cce4 e5b9b7 d7e3bc ccc1d9 b7dde8 fbd5b5 bfbfbf 3f3f3f 938953 548dd4 95b3d7 d99694 c3d69b b2a2c7 92cddc fac08f a5a5a5 262626 494429 17365d 366092 953734 76923c 5f497a 31859b e36c09 7f7f7f 0c0c0c 1d1b10 0f243e 244061 632423 4f6128 3f3151 205867 974806 c00000 ff0000 ffc000 ffff00 92d050 00b050 00b0f0 0070c0 002060 7030a0 ".split(" "),
	c='<div unselectable="on" onmousedown="return false" class="edui-colorpicker<%if (name){%> edui-colorpicker-<%=name%><%}%>" ><table unselectable="on" onmousedown="return false"><tr><td colspan="10">'+a.lang_themeColor+'</td> </tr><tr class="edui-colorpicker-firstrow" >',d=0;d<b.length;d++)d&&0===d%10&&(c+="</tr>"+(60==d?'<tr><td colspan="10">'+a.lang_standardColor+"</td></tr>":"")+"<tr"+(60==d?' class="edui-colorpicker-firstrow"':"")+">"),c+=70>d?'<td><a unselectable="on" onmousedown="return false" title="'+
	b[d]+'" class="edui-colorpicker-colorcell" data-color="#'+b[d]+'" style="background-color:#'+b[d]+";border:solid #ccc;"+(10>d||60<=d?"border-width:1px;":10<=d&&20>d?"border-width:1px 1px 0 1px;":"border-width:0 1px 0 1px;")+'"></a></td>':"";return c+"</tr></table></div>"},init:function(a){var b=this;b.root(g(g.parseTmpl(b.supper.mergeTpl(b.tpl(a)),a)));b.root().on("click",function(a){b.trigger("pickcolor",g(a.target).data("color"))})}},"popup");(function(){UM.ui.define("combobox",function(){return{tpl:'<ul class="dropdown-menu edui-combobox-menu<%if (comboboxName!==\'\') {%> edui-combobox-<%=comboboxName%><%}%>" unselectable="on" onmousedown="return false" role="menu" aria-labelledby="dropdownMenu"><%if(autoRecord) {%><%for( var i=0, len = recordStack.length; i<len; i++ ) {%><%var index = recordStack[i];%><li class="<%=itemClassName%><%if( selected == index ) {%> edui-combobox-checked<%}%>" data-item-index="<%=index%>" unselectable="on" onmousedown="return false"><span class="edui-combobox-icon" unselectable="on" onmousedown="return false"></span><label class="<%=labelClassName%>" style="<%=itemStyles[ index ]%>" unselectable="on" onmousedown="return false"><%=items[index]%></label></li><%}%><%if( i ) {%><li class="edui-combobox-item-separator"></li><%}%><%}%><%for( var i=0, label; label = items[i]; i++ ) {%><li class="<%=itemClassName%><%if( selected == i ) {%> edui-combobox-checked<%}%> edui-combobox-item-<%=i%>" data-item-index="<%=i%>" unselectable="on" onmousedown="return false"><span class="edui-combobox-icon" unselectable="on" onmousedown="return false"></span><label class="<%=labelClassName%>" style="<%=itemStyles[ i ]%>" unselectable="on" onmousedown="return false"><%=label%></label></li><%}%></ul>',
	defaultOpt:{recordStack:[],items:[],value:[],comboboxName:"",selected:"",autoRecord:!0,recordCount:5},init:function(a){g.extend(this._optionAdaptation(a),this._createItemMapping(a.recordStack,a.items),{itemClassName:"edui-combobox-item",iconClass:"edui-combobox-checked-icon",labelClassName:"edui-combobox-item-label"});this._transStack(a);this.root(g(g.parseTmpl(this.tpl,a)));this.data("options",a).initEvent()},initEvent:function(){this.initSelectItem();this.initItemActive()},initSelectItem:function(){var a=
	this;a.root().delegate(".edui-combobox-item","click",function(){var b=g(this),c=b.attr("data-item-index");a.trigger("comboboxselect",{index:c,label:b.find(".edui-combobox-item-label").text(),value:a.data("options").value[c]}).select(c);a.hide();return!1})},initItemActive:function(){var a={mouseenter:"addClass",mouseleave:"removeClass"};if(g.IE6)this.root().delegate(".edui-combobox-item","mouseenter mouseleave",function(b){g(this)[a[b.type]]("edui-combobox-item-hover")}).one("afterhide",function(){})},
	select:function(a){var b=this.data("options").itemCount,c=this.data("options").autowidthitem;c&&!c.length&&(c=this.data("options").items);if(0==b)return null;0>a?a=b+a%b:a>=b&&(a=b-1);this.trigger("changebefore",c[a]);this._update(a);this.trigger("changeafter",c[a]);return null},selectItemByLabel:function(a){var b=this.data("options").itemMapping,c=this,d=null;!g.isArray(a)&&(a=[a]);g.each(a,function(a,f){d=b[f];if(void 0!==d)return c.select(d),!1})},_transStack:function(a){var b=[],c=-1,d=-1;g.each(a.recordStack,
	function(e,f){c=a.itemMapping[f];g.isNumeric(c)&&(b.push(c),f==a.selected&&(d=c))});a.recordStack=b;a.selected=d;b=null},_optionAdaptation:function(a){if(!("itemStyles"in a)){a.itemStyles=[];for(var b=0,c=a.items.length;b<c;b++)a.itemStyles.push("")}a.autowidthitem=a.autowidthitem||a.items;a.itemCount=a.items.length;return a},_createItemMapping:function(a,b){var c={},d={recordStack:[],mapping:{}};g.each(b,function(a,b){c[b]=a});d.itemMapping=c;g.each(a,function(a,b){void 0!==c[b]&&(d.recordStack.push(c[b]),
	d.mapping[b]=c[b])});return d},_update:function(a){var b=this.data("options"),c=[],d=null;g.each(b.recordStack,function(b,d){d!=a&&c.push(d)});c.unshift(a);c.length>b.recordCount&&(c.length=b.recordCount);b.recordStack=c;b.selected=a;d=g(g.parseTmpl(this.tpl,b));this.root().html(d.html());c=d=null}}}(),"menu")})();(function(){UM.ui.define("buttoncombobox",function(){return{defaultOpt:{label:"",title:""},init:function(a){var b=this,c=g.eduibutton({caret:!0,name:a.comboboxName,title:a.title,text:a.label,
	click:function(){b.show(this.root())}});b.supper.init.call(b,a);b.on("changebefore",function(a,b){c.eduibutton("label",b)});b.data("button",c);b.attachTo(c)},button:function(){return this.data("button")}}}(),"combobox")})();UM.ui.define("modal",{tpl:'<div class="edui-modal" tabindex="-1" ><div class="edui-modal-header"><div class="edui-close" data-hide="modal"></div><h3 class="edui-title"><%=title%></h3></div><div class="edui-modal-body"  style="<%if(width){%>width:<%=width%>px;<%}%><%if(height){%>height:<%=height%>px;<%}%>"> </div><% if(cancellabel || oklabel) {%><div class="edui-modal-footer"><div class="edui-modal-tip"></div><%if(oklabel){%><div class="edui-btn edui-btn-primary" data-ok="modal"><%=oklabel%></div><%}%><%if(cancellabel){%><div class="edui-btn" data-hide="modal"><%=cancellabel%></div><%}%></div><%}%></div>',
	defaultOpt:{title:"",cancellabel:"",oklabel:"",width:"",height:"",backdrop:!0,keyboard:!0},init:function(a){this.root(g(g.parseTmpl(this.tpl,a||{})));this.data("options",a);if(a.okFn)this.on("ok",g.proxy(a.okFn,this));if(a.cancelFn)this.on("beforehide",g.proxy(a.cancelFn,this));this.root().delegate('[data-hide="modal"]',"click",g.proxy(this.hide,this)).delegate('[data-ok="modal"]',"click",g.proxy(this.ok,this));g('[data-hide="modal"],[data-ok="modal"]',this.root()).hover(function(){g(this).toggleClass("edui-hover")})},
	toggle:function(){return this[this.data("isShown")?"hide":"show"]()},show:function(){var a=this;a.trigger("beforeshow");a.data("isShown")||(a.data("isShown",!0),a.escape(),a.backdrop(function(){a.autoCenter();a.root().show().focus().trigger("aftershow")}))},showTip:function(a){g(".edui-modal-tip",this.root()).html(a).fadeIn()},hideTip:function(a){g(".edui-modal-tip",this.root()).fadeOut(function(){g(this).html("")})},autoCenter:function(){!g.IE6&&this.root().css("margin-left",-(this.root().width()/
	2))},hide:function(){this.trigger("beforehide");this.data("isShown")&&(this.data("isShown",!1),this.escape(),this.hideModal())},escape:function(){var a=this;if(a.data("isShown")&&a.data("options").keyboard)a.root().on("keyup",function(b){27==b.which&&a.hide()});else a.data("isShown")||a.root().off("keyup")},hideModal:function(){var a=this;a.root().hide();a.backdrop(function(){a.removeBackdrop();a.trigger("afterhide")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove();this.$backdrop=
	null},backdrop:function(a){this.data("isShown")&&this.data("options").backdrop&&(this.$backdrop=g('<div class="edui-modal-backdrop" />').click("static"==this.data("options").backdrop?g.proxy(this.root()[0].focus,this.root()[0]):g.proxy(this.hide,this)));this.trigger("afterbackdrop");a&&a()},attachTo:function(a){var b=this;a.data("$mergeObj")||(a.data("$mergeObj",b.root()),a.on("click",function(){b.toggle(a)}),b.data("$mergeObj",a))},ok:function(){this.trigger("beforeok");!1!==this.trigger("ok",this)&&
	this.hide()},getBodyContainer:function(){return this.root().find(".edui-modal-body")}});UM.ui.define("tooltip",{tpl:'<div class="edui-tooltip" unselectable="on" onmousedown="return false"><div class="edui-tooltip-arrow" unselectable="on" onmousedown="return false"></div><div class="edui-tooltip-inner" unselectable="on" onmousedown="return false"></div></div>',init:function(a){this.root(g(g.parseTmpl(this.tpl,a||{})))},content:function(a){a=g(a.currentTarget).attr("data-original-title");this.root().find(".edui-tooltip-inner").text(a)},
	position:function(a){a=g(a.currentTarget);this.root().css(g.extend({display:"block"},a?{top:a.outerHeight(),left:(a.outerWidth()-this.root().outerWidth())/2}:{}))},show:function(a){g(a.currentTarget).hasClass("edui-disabled")||(this.content(a),this.root().appendTo(g(a.currentTarget)),this.position(a),this.root().css("display","block"))},hide:function(){this.root().css("display","none")},attachTo:function(a){function b(a){var b=this;g.contains(document.body,b.root()[0])||b.root().appendTo(a);b.data("tooltip",
	b.root());a.each(function(){if(g(this).attr("data-original-title"))g(this).on("mouseenter",g.proxy(b.show,b)).on("mouseleave click",g.proxy(b.hide,b))})}var c=this;"undefined"===g.type(a)?g("[data-original-title]").each(function(a,e){b.call(c,g(e))}):a.data("tooltip")||b.call(c,a)}});UM.ui.define("tab",{init:function(a){var b=this,c=a.selector;g.type(c)&&(b.root(g(c,a.context)),b.data("context",a.context),g(c,b.data("context")).on("click",function(a){b.show(a)}))},show:function(a){var b=this,c=g(a.target),
	d=c.closest("ul"),e,f;e=(e=c.attr("data-context"))&&e.replace(/.*(?=#[^\s]*$)/,"");a=c.parent("li");a.length&&!a.hasClass("edui-active")&&(f=d.find(".edui-active:last a")[0],a=g.Event("beforeshow",{target:c[0],relatedTarget:f}),b.trigger(a),a.isDefaultPrevented()||(e=g(e,b.data("context")),b.activate(c.parent("li"),d),b.activate(e,e.parent(),function(){b.trigger({type:"aftershow",relatedTarget:f})})))},activate:function(a,b,c){if(void 0===a)return g(".edui-tab-item.edui-active",this.root()).index();
	b.find("> .edui-active").removeClass("edui-active");a.addClass("edui-active");c&&c()}});UM.ui.define("separator",{tpl:'<div class="edui-separator" unselectable="on" onmousedown="return false" ></div>',init:function(a){this.root(g(g.parseTmpl(this.tpl,a)));return this}});(function(){var a={},b={},c=[],d={},e={},f={},h=null;n.extend(UM,{defaultWidth:500,defaultHeight:500,registerUI:function(b,c){n.each(b.split(/\s+/),function(b){a[b]=c})},setEditor:function(a){!b[a.id]&&(b[a.id]=a)},registerWidget:function(a,
	b,c){d[a]=g.extend2(b,{$root:"",_preventDefault:!1,root:function(a){return this.$root||(this.$root=a)},preventDefault:function(){this._preventDefault=!0},clear:!1});c&&(e[a]=c)},getWidgetData:function(a){return d[a]},setWidgetBody:function(a,b,c){c._widgetData||n.extend(c,{_widgetData:{},getWidgetData:function(a){return this._widgetData[a]},getWidgetCallback:function(a){var c=this;return function(){return e[a].apply(c,[c,b].concat(Array.prototype.slice.call(arguments,0)))}}});var f=d[a];if(!f)return null;
	f=c._widgetData[a];f||(f=d[a],f=c._widgetData[a]="function"==g.type(f)?f:n.clone(f));f.root(b.edui().getBodyContainer());f.initContent(c,b);f._preventDefault||f.initEvent(c,b);f.width&&b.width(f.width)},setActiveWidget:function(a){},getEditor:function(a,c){var d=b[a]||(b[a]=this.createEditor(a,c));h=h?Math.max(d.getOpt("zIndex"),h):d.getOpt("zIndex");return d},setTopEditor:function(a){g.each(b,function(b,c){a==c?a.$container&&a.$container.css("zIndex",h+1):c.$container&&c.$container.css("zIndex",
	c.getOpt("zIndex"))})},clearCache:function(a){b[a]&&delete b[a]},delEditor:function(a){var c;(c=b[a])&&c.destroy()},ready:function(a){c.push(a)},createEditor:function(a,b){function d(){var b=this.createUI("#"+a,e);e.key=a;e.ready(function(){g.each(c,function(a,b){g.proxy(b,e)()})});var f=e.options;f.minFrameWidth=f.initialFrameWidth?f.initialFrameWidth:f.initialFrameWidth=e.$body.width()||UM.defaultWidth;b.css({width:f.initialFrameWidth,zIndex:e.getOpt("zIndex")});UM.browser.ie&&6===UM.browser.version&&
	document.execCommand("BackgroundImageCache",!1,!0);e.render(a);g.eduitooltip&&g.eduitooltip("attachTo",g("[data-original-title]",b)).css("z-index",e.getOpt("zIndex")+1);b.find("a").click(function(a){a.preventDefault()});e.fireEvent("afteruiready")}var e=new UM.Editor(b);e.langIsReady?g.proxy(d,this)():e.addListener("langReady",g.proxy(d,this));return e},createUI:function(b,c){var d=g(b),e=g('<div class="edui-container"><div class="edui-editor-body"></div></div>').insertBefore(d);c.$container=e;c.container=
	e[0];c.$body=d;m.ie&&m.ie9above&&g('<span style="padding:0;margin:0;height:0;width:0"></span>').insertAfter(e);g.each(a,function(a,b){var d=b.call(c,a);d&&(f[a]=d)});e.find(".edui-editor-body").append(d).before(this.createToolbar(c.options,c));e.find(".edui-toolbar").append(g('<div class="edui-dialog-container"></div>'));return e},createToolbar:function(a,b){var c=g.eduitoolbar(),d=c.edui();if(a.toolbar&&a.toolbar.length){var e=[];g.each(a.toolbar,function(a,b){g.each(b.split(/\s+/),function(a,b){if("|"==
	b)g.eduiseparator&&e.push(g.eduiseparator());else{var c=f[b];"fullscreen"==b?c&&e.unshift(c):c&&e.push(c)}});e.length&&d.appendToBtnmenu(e)})}else c.find(".edui-btn-toolbar").remove();return c}})})();UM.registerUI("bold italic redo undo underline strikethrough superscript subscript insertorderedlist insertunorderedlist cleardoc selectall link unlink print preview justifyleft justifycenter justifyright justifyfull removeformat horizontal drafts",function(a){var b=this,c=g.eduibutton({icon:a,click:function(){b.execCommand(a)},
	title:this.getLang("labelMap")[a]||""});this.addListener("selectionchange",function(){var b=this.queryCommandState(a);c.edui().disabled(-1==b).active(1==b)});return c});(function(){function a(a){var b=this;if(!a)throw Error("invalid params, notfound editor");b.editor=a;h[a.uid]=this;a.addListener("destroy",function(){delete h[a.uid];b.editor=null})}var b={},c="width height position top left margin padding overflowX overflowY".split(" "),d={},e={},f={},h={};UM.registerUI("fullscreen",function(b){var c=
	this,d=g.eduibutton({icon:"fullscreen",title:c.options.labelMap&&c.options.labelMap[b]||c.getLang("labelMap."+b),click:function(){c.execCommand(b);UM.setTopEditor(c)}});c.addListener("selectionchange",function(){var a=this.queryCommandState(b);d.edui().disabled(-1==a).active(1==a)});c.addListener("ready",function(){c.options.fullscreen&&a.getInstance(c).toggle()});return d});UM.commands.fullscreen={execCommand:function(b){a.getInstance(this).toggle()},queryCommandState:function(a){return this._edui_fullscreen_status},
	notNeedUndo:1};a.prototype={toggle:function(){var a=this.editor,b=this.isFullState();a.fireEvent("beforefullscreenchange",!b);this.update(!b);b?this.revert():this.enlarge();a.fireEvent("afterfullscreenchange",!b);"true"===a.body.contentEditable&&a.fireEvent("fullscreenchanged",!b);a.fireEvent("selectionchange")},enlarge:function(){this.saveSataus();this.setDocumentStatus();this.resize()},revert:function(){var a=this.editor.options,a=/%$/.test(a.initialFrameHeight)?"100%":a.initialFrameHeight-this.getStyleValue("padding-top")-
	this.getStyleValue("padding-bottom")-this.getStyleValue("border-width");g.IE6&&this.getEditorHolder().style.setExpression("height","this.scrollHeight <= "+a+' ? "'+a+'px" : "auto"');this.revertContainerStatus();this.revertContentAreaStatus();this.revertDocumentStatus()},update:function(a){this.editor._edui_fullscreen_status=a},resize:function(){var a=null,b=a=0,c=0,d=0,e=this.editor,f=null,h=null;this.isFullState()&&(a=g(window),b=a.width(),a=a.height(),h=this.getEditorHolder(),c=parseInt(k.getComputedStyle(h,
	"border-width"),10)||0,c+=parseInt(k.getComputedStyle(e.container,"border-width"),10)||0,d+=parseInt(k.getComputedStyle(h,"padding-left"),10)+parseInt(k.getComputedStyle(h,"padding-right"),10)||0,g.IE6&&h.style.setExpression("height",null),f=this.getBound(),g(e.container).css({width:b+"px",height:a+"px",position:g.IE6?"absolute":"fixed",top:f.top,left:f.left,margin:0,padding:0,overflowX:"hidden",overflowY:"hidden"}),g(h).css({width:b-2*c-d+"px",height:a-2*c-(e.options.withoutToolbar?0:g(".edui-toolbar",
	e.container).outerHeight())-g(".edui-bottombar",e.container).outerHeight()+"px",overflowX:"hidden",overflowY:"auto"}))},saveSataus:function(){for(var a=this.editor.container.style,d=null,e={},f=0,h=c.length;f<h;f++)d=c[f],e[d]=a[d];b[this.editor.uid]=e;this.saveContentAreaStatus();this.saveDocumentStatus()},saveContentAreaStatus:function(){var a=g(this.getEditorHolder());d[this.editor.uid]={width:a.css("width"),overflowX:a.css("overflowX"),overflowY:a.css("overflowY"),height:a.css("height")}},saveDocumentStatus:function(){var a=
	g(this.getEditorDocumentBody());e[this.editor.uid]={overflowX:a.css("overflowX"),overflowY:a.css("overflowY")};f[this.editor.uid]={overflowX:g(this.getEditorDocumentElement()).css("overflowX"),overflowY:g(this.getEditorDocumentElement()).css("overflowY")}},revertContainerStatus:function(){g(this.editor.container).css(this.getEditorStatus())},revertContentAreaStatus:function(){var a=this.getEditorHolder(),b=this.getContentAreaStatus();this.supportMin()&&(delete b.height,a.style.height=null);g(a).css(b)},
	revertDocumentStatus:function(){var a=this.getDocumentStatus();g(this.getEditorDocumentBody()).css("overflowX",a.body.overflowX);g(this.getEditorDocumentElement()).css("overflowY",a.html.overflowY)},setDocumentStatus:function(){g(this.getEditorDocumentBody()).css({overflowX:"hidden",overflowY:"hidden"});g(this.getEditorDocumentElement()).css({overflowX:"hidden",overflowY:"hidden"})},isFullState:function(){return!!this.editor._edui_fullscreen_status},getEditorStatus:function(){return b[this.editor.uid]},
	getContentAreaStatus:function(){return d[this.editor.uid]},getEditorDocumentElement:function(){return this.editor.container.ownerDocument.documentElement},getEditorDocumentBody:function(){return this.editor.container.ownerDocument.body},getEditorHolder:function(){return this.editor.body},getDocumentStatus:function(){return{body:e[this.editor.uid],html:f[this.editor.uid]}},supportMin:function(){var a=null;this._support||(a=document.createElement("div"),this._support="minWidth"in a.style);return this._support},
	getBound:function(){var a={html:!0,body:!0},b={top:0,left:0},c=null;if(!g.IE6)return b;(c=this.editor.container.offsetParent)&&!a[c.nodeName.toLowerCase()]&&(a=c.getBoundingClientRect(),b.top=-a.top,b.left=-a.left);return b},getStyleValue:function(a){return parseInt(k.getComputedStyle(this.getEditorHolder(),a))}};g.extend(a,{listen:function(){var b=null;a._hasFullscreenListener||(a._hasFullscreenListener=!0,g(window).on("resize",function(){null!==b&&(window.clearTimeout(b),b=null);b=window.setTimeout(function(){for(var a in h)h[a].resize();
	b=null},50)}))},getInstance:function(b){h[b.uid]||new a(b);return h[b.uid]}});a.listen()})();UM.registerUI("link image video map formula",function(a){var b=this,c,d,e={title:b.options.labelMap&&b.options.labelMap[a]||b.getLang("labelMap."+a),url:b.options.UMEDITOR_HOME_URL+"dialogs/"+a+"/"+a+".js"},f=g.eduibutton({icon:a,title:this.getLang("labelMap")[a]||""});n.loadFile(document,{src:e.url,tag:"script",type:"text/javascript",defer:"defer"},function(){var h=UM.getWidgetData(a);if(h){if(h.buttons){var k=
	h.buttons.ok;k&&(e.oklabel=k.label||b.getLang("ok"),k.exec&&(e.okFn=function(){return g.proxy(k.exec,null,b,d)()}));var m=h.buttons.cancel;m&&(e.cancellabel=m.label||b.getLang("cancel"),m.exec&&(e.cancelFn=function(){return g.proxy(m.exec,null,b,d)()}))}h.width&&(e.width=h.width);h.height&&(e.height=h.height);d=g.eduimodal(e);d.attr("id","edui-dialog-"+a).addClass("edui-dialog-"+a).find(".edui-modal-body").addClass("edui-dialog-"+a+"-body");d.edui().on("beforehide",function(){var a=b.selection.getRange();
	a.equals(c)&&a.select()}).on("beforeshow",function(){var e=this.root(),f=null,h=null;c=b.selection.getRange();e.parent()[0]||b.$container.find(".edui-dialog-container").append(e);g.IE6&&(f={width:g(window).width(),height:g(window).height()},h=e.parents(".edui-toolbar")[0].getBoundingClientRect(),e.css({position:"absolute",margin:0,left:(f.width-e.width())/2-h.left,top:100-h.top}));UM.setWidgetBody(a,d,b);UM.setTopEditor(b)}).on("afterbackdrop",function(){this.$backdrop.css("zIndex",b.getOpt("zIndex")+
	1).appendTo(b.$container.find(".edui-dialog-container"));d.css("zIndex",b.getOpt("zIndex")+2)}).on("beforeok",function(){try{c.select()}catch(a){}}).attachTo(f)}});b.addListener("selectionchange",function(){var b=this.queryCommandState(a);f.edui().disabled(-1==b).active(1==b)});return f});UM.registerUI("emotion formula",function(a){var b=this,c=b.options.UMEDITOR_HOME_URL+"dialogs/"+a+"/"+a+".js",d=g.eduibutton({icon:a,title:this.getLang("labelMap")[a]||""});n.loadFile(document,{src:c,tag:"script",
	type:"text/javascript",defer:"defer"},function(){var e={url:c},f=UM.getWidgetData(a);f.width&&(e.width=f.width);f.height&&(e.height=f.height);g.eduipopup(e).css("zIndex",b.options.zIndex+1).addClass("edui-popup-"+a).edui().on("beforeshow",function(){var c=this.root();c.parent().length||b.$container.find(".edui-dialog-container").append(c);UM.setWidgetBody(a,c,b);UM.setTopEditor(b)}).attachTo(d,{offsetTop:-5,offsetLeft:10,caretLeft:11,caretTop:-8});b.addListener("selectionchange",function(){var b=
	this.queryCommandState(a);d.edui().disabled(-1==b).active(1==b)})});return d});UM.registerUI("imagescale",function(){var a=this,b;a.setOpt("imageScaleEnabled",!0);m.webkit&&a.getOpt("imageScaleEnabled")&&(a.addListener("click",function(c,d){var e=a.selection.getRange().getClosedNode(),f=d.target;if(e&&"IMG"==e.tagName&&f==e){if(!b){b=g.eduiscale({$wrap:a.$container}).css("zIndex",a.options.zIndex);a.$container.append(b);var h=function(){b.edui().hide()},k=function(a){var b=a.target||a.srcElement;
	b&&-1==b.className.indexOf("edui-scale")&&h(a)},m;b.edui().on("aftershow",function(){g(document).bind("keydown",h);g(document).bind("mousedown",k);a.selection.getNative().removeAllRanges()}).on("afterhide",function(){g(document).unbind("keydown",h);g(document).unbind("mousedown",k);var c=b.edui().getScaleTarget();c.parentNode&&a.selection.getRange().selectNode(c).select()}).on("mousedown",function(c){a.selection.getNative().removeAllRanges();(c=c.target||c.srcElement)&&-1==c.className.indexOf("edui-scale-hand")&&
	(m=setTimeout(function(){b.edui().hide()},200))}).on("mouseup",function(a){(a=a.target||a.srcElement)&&-1==a.className.indexOf("edui-scale-hand")&&clearTimeout(m)})}b.edui().show(g(e))}else b&&"none"!=b.css("display")&&b.edui().hide()}),a.addListener("click",function(b,d){"IMG"==d.target.tagName&&(new B.Range(a.document,a.body)).selectNode(d.target).select()}))});UM.registerUI("autofloat",function(){var a=this,b=a.getLang();a.setOpt({autoFloatEnabled:!0,topOffset:0});var c=a.options.topOffset;!1!==
	a.options.autoFloatEnabled&&a.ready(function(){function d(){var a=document.body.style;a.backgroundImage='url("about:blank")';a.backgroundAttachment="fixed"}function e(){p.parentNode&&p.parentNode.removeChild(p);r.style.cssText=q}function f(){var b=a.container,d;try{d=b.getBoundingClientRect()}catch(f){d={left:0,top:0,height:0,width:0}}Math.round(d.left);var g=Math.round(d.top),n=Math.round(d.bottom-d.top);Math.round(d.right-d.left);for(var q;(q=b.ownerDocument)!==document&&(b=k.getWindow(q).frameElement);)d=
	b.getBoundingClientRect(),g+=d.top;b=a.options.toolbarTopOffset||0;0>g&&g+n-r.offsetHeight>b?u||(g=k.getXY(r),n=k.getComputedStyle(r,"position"),b=k.getComputedStyle(r,"left"),r.style.width=r.offsetWidth+"px",r.style.zIndex=1*a.options.zIndex+1,r.parentNode.insertBefore(p,r),h||l&&m.ie?("absolute"!=r.style.position&&(r.style.position="absolute"),r.style.top=(document.body.scrollTop||document.documentElement.scrollTop)-y+c+"px"):"fixed"!=r.style.position&&(r.style.position="fixed",r.style.top=c+"px",
	("absolute"==n||"relative"==n)&&parseFloat(b)&&(r.style.left=g.x+"px"))):e()}var h=m.ie&&6>=m.version,l=m.quirks,q,p=document.createElement("div"),r,y,u=!1,v=n.defer(function(){f()},m.ie?200:100,!0);a.addListener("destroy",function(){g(window).off("scroll resize",f);a.removeListener("keydown",v)});var w;UM.ui?w=1:(alert(b.autofloatMsg),w=0);w&&(r=g(".edui-toolbar",a.container)[0],a.addListener("afteruiready",function(){setTimeout(function(){y=g(r).offset().top},100)}),q=r.style.cssText,p.style.height=
	r.offsetHeight+"px",h&&d(),g(window).on("scroll resize",f),a.addListener("keydown",v),a.addListener("resize",function(){e();p.style.height=r.offsetHeight+"px";f()}),a.addListener("beforefullscreenchange",function(a,b){b&&(e(),u=b)}),a.addListener("fullscreenchanged",function(a,b){b||f();u=b}),a.addListener("sourcemodechanged",function(a,b){setTimeout(function(){f()},0)}),a.addListener("clearDoc",function(){setTimeout(function(){f()},0)}))})});UM.registerUI("source",function(a){var b=this;b.addListener("fullscreenchanged",
	function(){b.$container.find("textarea").width(b.$body.width()-10).height(b.$body.height())});var c=g.eduibutton({icon:a,click:function(){b.execCommand(a);UM.setTopEditor(b)},title:this.getLang("labelMap")[a]||""});this.addListener("selectionchange",function(){var b=this.queryCommandState(a);c.edui().disabled(-1==b).active(1==b)});return c});UM.registerUI("paragraph fontfamily fontsize",function(a){function b(a,c){var d=g("<span>").html(a).css({display:"inline",position:"absolute",top:-1E7,left:-1E5}).appendTo(document.body),
	e=d.width();d.remove();if(50>e)return a;a=a.slice(0,c?-4:-1);return a.length?b(a+"...",!0):"..."}function c(a){var c=[],d;for(d in a.items)a.value.push(d),c.push(d),a.autowidthitem.push(b(d));a.items=c;a.autoRecord=!1;return a}function d(a){for(var c=null,d=[],e=0,f=a.items.length;e<f;e++)c=a.items[e].val,d.push(c.split(/\s*,\s*/)[0]),a.itemStyles.push("font-family: "+c),a.value.push(c),a.autowidthitem.push(b(d[e]));a.items=d;return a}function e(a){var b=null,c=[];a.itemStyles=[];a.value=[];for(var d=
	0,e=a.items.length;d<e;d++)b=a.items[d],c.push(b),a.itemStyles.push("font-size: "+b+"px");a.value=a.items;a.items=c;a.autoRecord=!1;return a}var f=this,h=f.options.labelMap&&f.options.labelMap[a]||f.getLang("labelMap."+a),h={label:h,title:h,comboboxName:a,items:f.options[a]||[],itemStyles:[],value:[],autowidthitem:[]},k=null,m=null;if(0==h.items.length)return null;switch(a){case "paragraph":h=c(h);break;case "fontfamily":h=d(h);break;case "fontsize":h=e(h)}k=g.eduibuttoncombobox(h).css("zIndex",f.getOpt("zIndex")+
	1);m=k.edui();m.on("comboboxselect",function(b,c){f.execCommand(a,c.value)}).on("beforeshow",function(){0===k.parent().length&&k.appendTo(f.$container.find(".edui-dialog-container"));UM.setTopEditor(f)});this.addListener("selectionchange",function(b){b=this.queryCommandState(a);var c=this.queryCommandValue(a);m.button().edui().disabled(-1==b).active(1==b);c&&(c=c.replace(/['"]/g,"").toLowerCase().split(/['|"]?\s*,\s*[\1]?/),m.selectItemByLabel(c))});return m.button().addClass("edui-combobox")});UM.registerUI("forecolor backcolor",
	function(a){var b=this,c=null,d=null,e=null;this.addListener("selectionchange",function(){var b=this.queryCommandState(a);e.edui().disabled(-1==b).active(1==b)});e=g.eduicolorsplitbutton({icon:a,caret:!0,name:a,title:b.getLang("labelMap")[a],click:function(){b.execCommand(a,k.getComputedStyle(d[0],"background-color"))}});d=e.edui().colorLabel();c=g.eduicolorpicker({name:a,lang_clearColor:b.getLang("clearColor")||"",lang_themeColor:b.getLang("themeColor")||"",lang_standardColor:b.getLang("standardColor")||
	""}).on("pickcolor",function(c,e){window.setTimeout(function(){d.css("backgroundColor",e);b.execCommand(a,e)},0)}).on("show",function(){UM.setActiveWidget(colorPickerWidget.root())}).css("zIndex",b.getOpt("zIndex")+1);e.edui().on("arrowclick",function(){c.parent().length||b.$container.find(".edui-dialog-container").append(c);c.edui().show(e,{caretDir:"down",offsetTop:-5,offsetLeft:8,caretLeft:11,caretTop:-8});UM.setTopEditor(b)}).register("click",e,function(){c.edui().hide()});return e})})(jQuery);


/***/ },
/* 280 */
/***/ function(module, exports) {

	/**
	 * 中文语言包
	 */
	UM.I18N['zh-cn'] = {
	    'labelMap':{
	        'anchor':'锚点', 'undo':'撤销', 'redo':'重做', 'bold':'加粗', 'indent':'首行缩进', 'snapscreen':'截图',
	        'italic':'斜体', 'underline':'下划线', 'strikethrough':'删除线', 'subscript':'下标','fontborder':'字符边框',
	        'superscript':'上标', 'formatmatch':'格式刷', 'source':'源代码', 'blockquote':'引用',
	        'pasteplain':'纯文本粘贴模式', 'selectall':'全选', 'print':'打印', 'preview':'预览',
	        'horizontal':'分隔线', 'removeformat':'清除格式', 'time':'时间', 'date':'日期',
	        'unlink':'取消链接', 'insertrow':'前插入行', 'insertcol':'前插入列', 'mergeright':'右合并单元格', 'mergedown':'下合并单元格',
	        'deleterow':'删除行', 'deletecol':'删除列', 'splittorows':'拆分成行', 'splittocols':'拆分成列', 'splittocells':'完全拆分单元格',
	        'mergecells':'合并多个单元格', 'deletetable':'删除表格', 'cleardoc':'清空文档','insertparagraphbeforetable':"表格前插入行",'insertcode':'代码语言','fontfamily':'字体', 'fontsize':'字号', 'paragraph':'段落格式', 'image':'图片',
	        'edittable':'表格属性','edittd':'单元格属性', 'link':'超链接','emotion':'表情', 'spechars':'特殊字符', 'searchreplace':'查询替换', 'map':'百度地图', 'gmap':'Google地图',
	        'video':'视频', 'help':'帮助', 'justifyleft':'居左对齐', 'justifyright':'居右对齐', 'justifycenter':'居中对齐',
	        'justifyjustify':'两端对齐', 'forecolor':'字体颜色', 'backcolor':'背景色', 'insertorderedlist':'有序列表',
	        'insertunorderedlist':'无序列表', 'fullscreen':'全屏', 'directionalityltr':'从左向右输入', 'directionalityrtl':'从右向左输入',
	        'rowspacingtop':'段前距', 'rowspacingbottom':'段后距', 'highlightcode':'插入代码', 'pagebreak':'分页', 'insertframe':'插入Iframe', 'imagenone':'默认',
	        'imageleft':'左浮动', 'imageright':'右浮动', 'attachment':'附件', 'imagecenter':'居中', 'wordimage':'图片转存',
	        'lineheight':'行间距','edittip' :'编辑提示','customstyle':'自定义标题', 'autotypeset':'自动排版', 'webapp':'百度应用',
	        'touppercase':'字母大写', 'tolowercase':'字母小写','background':'背景','template':'模板','scrawl':'涂鸦','music':'音乐','inserttable':'插入表格',
	        'drafts': '草稿箱', 'formula':'数学公式'


	    },
	    'paragraph':{'p':'段落', 'h1':'标题 1', 'h2':'标题 2', 'h3':'标题 3', 'h4':'标题 4', 'h5':'标题 5', 'h6':'标题 6'},
	    'fontfamily':{
	        'songti':'宋体',
	        'kaiti':'楷体',
	        'heiti':'黑体',
	        'lishu':'隶书',
	        'yahei':'微软雅黑',
	        'andaleMono':'andale mono',
	        'arial': 'arial',
	        'arialBlack':'arial black',
	        'comicSansMs':'comic sans ms',
	        'impact':'impact',
	        'timesNewRoman':'times new roman'
	    },
	    'ok':"确认",
	    'cancel':"取消",
	    'closeDialog':"关闭对话框",
	    'tableDrag':"表格拖动必须引入uiUtils.js文件！",
	    'autofloatMsg':"工具栏浮动依赖编辑器UI，您首先需要引入UI文件!",
	    'anthorMsg':"链接",
	    'clearColor':'清空颜色',
	    'standardColor':'标准颜色',
	    'themeColor':'主题颜色',
	    'property':'属性',
	    'default':'默认',
	    'modify':'修改',
	    'justifyleft':'左对齐',
	    'justifyright':'右对齐',
	    'justifycenter':'居中',
	    'justify':'默认',
	    'clear':'清除',
	    'anchorMsg':'锚点',
	    'delete':'删除',
	    'clickToUpload':"点击上传",
	    'unset':'尚未设置语言文件',
	    't_row':'行',
	    't_col':'列',
	    'more':'更多',
	    'pasteOpt':'粘贴选项',
	    'pasteSourceFormat':"保留源格式",
	    'tagFormat':'只保留标签',
	    'pasteTextFormat':'只保留文本',

	    //===============dialog i18N=======================
	    'image':{
	        'static':{
	            'lang_tab_local':"本地上传",
	            'lang_tab_imgSearch':"网络图片",
	            'lang_input_dragTip':"支持图片拖拽上传",
	            'lang_btn_add':"添加"
	        },
	        'uploadError': '上传出错'
	    },
	    'emotion':{
	        'static':{
	            'lang_input_choice':'精选',
	            'lang_input_Tuzki':'兔斯基',
	            'lang_input_BOBO':'BOBO',
	            'lang_input_lvdouwa':'绿豆蛙',
	            'lang_input_babyCat':'baby猫',
	            'lang_input_bubble':'泡泡',
	            'lang_input_youa':'有啊'
	        }
	    },
	    'gmap':{
	        'static':{
	            'lang_input_address':'地址',
	            'lang_input_search':'搜索',
	            'address':{'value':"北京"}
	        },
	        'searchError':'无法定位到该地址!'
	    },
	    'link':{
	        'static':{
	            'lang_input_text':'文本内容：',
	            'lang_input_url':'链接地址：',
	            'lang_input_title':'标题：',
	            'lang_input_target':'是否在新窗口打开：'
	        },
	        'validLink':'只支持选中一个链接时生效',
	        'httpPrompt':'您输入的超链接中不包含http等协议名称，默认将为您添加http://前缀'
	    },
	    'map':{
	        'static':{
	            'lang_city':"城市",
	            'lang_address':"地址",
	            'city':{'value':"北京"},
	            'lang_search':"搜索",
	            'lang_dynamicmap':"插入动态地图"
	        },
	        'cityMsg':"请选择城市",
	        'errorMsg':"抱歉，找不到该位置！"
	    },
	    'video':{
	        'static':{
	            'lang_tab_insertV':"插入视频",
	            'lang_video_url':"视频网址",
	            'lang_video_size':"视频尺寸",
	            'lang_videoW':"宽度",
	            'lang_videoH':"高度",
	            'lang_alignment':"对齐方式",
	            'videoSearchTxt':{'value':"请输入搜索关键字！"},
	            'videoType':{'options':["全部", "热门", "娱乐", "搞笑", "体育", "科技", "综艺"]},
	            'videoSearchBtn':{'value':"百度一下"},
	            'videoSearchReset':{'value':"清空结果"}
	        },
	        'numError':"请输入正确的数值，如123,400",
	        'floatLeft':"左浮动",
	        'floatRight':"右浮动",
	        'default':"默认",
	        'block':"独占一行",
	        'urlError':"输入的视频地址有误，请检查后再试！",
	        'loading':" &nbsp;视频加载中，请等待……",
	        'clickToSelect':"点击选中",
	        'goToSource':'访问源视频',
	        'noVideo':" &nbsp; &nbsp;抱歉，找不到对应的视频，请重试！"
	    },
	    'formula':{
	        'static':{
	            'lang_tab_common':'常用公式',
	            'lang_tab_symbol':'符号',
	            'lang_tab_letter':'字母'
	        }
	    }
	};

/***/ },
/* 281 */
/***/ function(module, exports) {

	module.exports = "<div class=\"message-publish shadow-block\">\r\n    <!--style给定宽度可以影响编辑器的最终宽度-->\r\n    <div>\r\n        <input id=\"title\" type=\"text\" placeholder=\"请输入信息标题\" autofocus/>\r\n    </div>\r\n    <script type=\"text/plain\" id=\"myEditor\" style=\"width:100%;height:400px;\"></script>\r\n    <div class=\"btn-wrap\">\r\n        <span class=\"framework-button\" id=\"submitBtn\">提交</span>\r\n        <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n    </div>\r\n</div>";

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 组织机构新增修改模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(283);
	__webpack_require__(181);
	__webpack_require__(214);
	__webpack_require__(215);
	var OrgAddModify = function(){ };

	//继承自框架基类
	OrgAddModify.prototype = $.extend({},frameworkBase);
	OrgAddModify.prototype.id = 'org-add-modify';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	OrgAddModify.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({action:'001'},options);
	    that.setTitle(this.options.action == '001'?'添加组织机构':'编辑组织机构').setHeight(this.options.action == '001'?200:150).setWidth(400);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	    if(this.options.action == '002'){
	        $('#org_parent_id',that.dom).parent().hide();
	        this.restoreData();
	    }
	};

	OrgAddModify.prototype.loadBaseView = function(options){
	    var that = this;
	    var html = __webpack_require__(285);
	    this.render(html);
	};

	OrgAddModify.prototype.bindEvents = function(){
	    var that = this;
	    $('#confirmBtn',this.dom).click(function(){
	        var org_title = $('#org_title',that.dom).val();
	        if($.trim(org_title) === '' ){
	            swal("提示", "请输入组织机构标题!", "warning");
	            return;
	        }
	        that.save('/org/save',{
	            action:that.options.action,
	            org_id:that.options.org_id,
	            org_title:org_title,
	            org_parent_id:$('#org_parent_id',that.dom).attr('data-pid')
	        },function(data){
	            if(!data.success){
	                that.toast(data.message);
	                return;
	            }
	            that.finish(true,$('#org_parent_id',that.dom).attr('data-pid'));
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });

	    this.$treepanel = $('<div id="org_tree_panel" class="dropdown_panel"><ul id="_panelOrgTree" class="ztree"></ul></div>').appendTo($('body'));
	    var $org_parent_id = $('#org_parent_id',this.dom);

	    $org_parent_id.click(function(){
	        var offset = $org_parent_id.offset();
	        that.$treepanel.css({
	            left:offset.left,
	            top:offset.top+30,
	            width:$org_parent_id.outerWidth()
	        });
	        that.$treepanel.is(':visible')?(that.$treepanel.hide()):(that.$treepanel.show());
	        return false;
	    });
	    this.$treepanel.click(function(){
	        return false;
	    });
	    this.initOrgTree();

	};

	OrgAddModify.prototype.initOrgTree = function(){
	    var that = this;
	    this.query('/org/list',function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var setting = {
	            data:{
	                keep:{
	                    parent:true,
	                    leaf:true
	                },
	                simpleData:{
	                    enable:true,
	                    idKey:'org_id',
	                    pIdKey:'org_parent_id',
	                    rootPId:null
	                },
	                key:{
	                    name:'org_title',
	                    title:'org_title'
	                }
	            },
	            callback:{
	                onClick:function(event, treeId, treeNode){
	                    $('#org_parent_id',that.dom).val(treeNode.org_title);
	                    $('#org_parent_id',that.dom).attr('data-pid',treeNode.org_id);
	                    hidePanel();
	                }
	            }
	        };
	        for(var i = 0,len = data.data.length;i<len;i++){
	            data.data[i].isParent = true;
	            if(data.data[i].org_id == that.options.org_parent_id){
	                $('#org_parent_id',that.dom).val(data.data[i].org_title);
	                $('#org_parent_id',that.dom).attr('data-pid',data.data[i].org_id);
	            }
	        }
	        data.data.push({'org_id':'0','org_parent_id':null,'org_title':'根节点'});
	        var ztreeObj = $.fn.zTree.init($("#_panelOrgTree",that.$treepanel), setting,data.data);
	        var nodes = ztreeObj.getNodesByParam("org_id",that.options.org_parent_id , null);
	        ztreeObj.selectNode(nodes[0], false, false);
	    });
	};

	function hidePanel(){
	    $('.dropdown_panel').hide();
	}
	$('body').on('click',function(){
	    hidePanel();
	});
	OrgAddModify.prototype.restoreData = function() {
	    var that = this;
	    this.query('/org/search/'+this.options.org_id,function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data = data.data;
	        $('#org_title',that.dom).val(data.org_title);
	        $('#org_parent_id',that.dom).attr('data-pid',data.org_parent_id);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	OrgAddModify.prototype.finish = function () {
	    this.$treepanel.remove();
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new OrgAddModify();

/***/ },
/* 283 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 284 */,
/* 285 */
/***/ function(module, exports) {

	module.exports = "<div class=\"org-add-modify\">\r\n    <div class=\"panel-body\">\r\n            <div class=\"form-group\">\r\n                <label>组织机构标题：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入组织机构名称\" name=\"org_title\" id=\"org_title\" type=\"text\" autofocus>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>父级组织机构：</label>\r\n                <input class=\"form-control\" placeholder=\"请选择父级组织机构\" readonly=\"true\" name=\"org_parent_id\" id=\"org_parent_id\" type=\"text\" data-pid=\"0\" value=\"根节点\">\r\n            </div>\r\n            <div class=\"btn-wrap\">\r\n                <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n                <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n            </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 组织机构管理
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(287);
	__webpack_require__(181);
	var OrgManage = function () {};

	//继承自框架基类
	OrgManage.prototype = $.extend({}, frameworkBase);
	OrgManage.prototype.id = 'org-manage';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	OrgManage.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('组织机构管理').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();

	};

	OrgManage.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/org-manage.html').then(function(html){
	        that.render(html);
	        $('.tablecontainer',that.dom).height(that.dom.height()-55);
	        that.initTable();
	        that.initOrgTree();
	        that.bindEvents();
	    });
	};

	OrgManage.prototype.initTable = function () {
	    var that = this;
	    $('.easyui-linkbutton',this.dom).linkbutton();
	    var columns = __webpack_require__(289);
	    that.$table = $('#dataTable',this.dom).datagrid({
	        url: '/org/orguser',
	        method: 'get',
	        columns: [columns],
	        cache:false,
	        pagination: true,
	        pageSize: 20,
	        ctrlSelect: true,
	        checkOnSelect: true,
	        selectOnCheck: true,
	        loadMsg: '正在查询，请稍候……',
	        striped: true,
	        fit: true,
	        fitColumns: true,
	        loadFilter: function (data) {
	            if(!data.success){
	                that.toast(data.message);
	            }
	            return data.data;
	        },
	        onDblClickRow: function (rowIndex, rowData) {
	            Events.require('user-add-modify').addCallback(function(flag){
	                if(flag)
	                    Events.notify('onRefresh:org-manage');
	            }).init({showType:'Pop',action:'002',user_id:rowData.user_id});
	        },
	        toolbar: '#org-manage-toolbar'
	    });

	    var searchBox = $('#org-manage #home-easyui-searchbox',that.dom).searchbox({
	        searcher: function (value, name) {
	            Events.notify('onRefresh:org-manage');
	        },
	        prompt: '请输关键字，如用户名'
	    });

	    var startDate = $("#startdate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:org-manage');
	        }
	    });
	    var endDate = $("#enddate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:org-manage');
	        }
	    });

	    //订阅刷新消息
	    Events.subscribe('onRefresh:org-manage',function(org_id){
	        that.$table.datagrid('load',{
	            org_id:selectOrgId,
	            key:searchBox.searchbox('getValue'),
	            startdate:startDate.combo('getValue').replace(/-/gi,''),
	            enddate:endDate.combo('getValue').replace(/-/gi,'')
	        });
	    });
	};

	var ztreeObj = null, selectOrgId, firstRefresh = false;
	OrgManage.prototype.initOrgTree = function(){
	    var that = this;
	    firstRefresh = false;
	    var setting = {
	        async:{
	            enable:true,
	            url:'/org/listbypid',
	            autoParam:['org_id'],
	            type:'get'
	        },
	        edit:{
	            enable:true,
	            showRemoveBtn:false,
	            showRenameBtn:false,
	            drag:{
	                prev:false,
	                next:false,
	                inner:true,
	                isMove:true,
	                isCopy:false
	            }
	        },
	        data:{
	            key:{
	                name:'org_title',
	                title:'org_title'
	            },
	            simpleData:{
	                idKey:'org_id',
	                pIdKey:'org_parent_id'
	            },
	            keep:{
	                parent:true
	            }
	        },
	        callback:{
	            onClick:function(event, treeId, treeNode){
	                selectOrgId = treeNode.org_id;
	                Events.notify('onRefresh:org-manage');
	            },
	            onAsyncSuccess:function(){
	                if(firstRefresh)
	                    return;
	                selectOrgId = ztreeObj.getNodes()[0].org_id;
	                ztreeObj.selectNode(ztreeObj.getNodes()[0], false, false);
	                Events.notify('onRefresh:org-manage');
	                firstRefresh = true;
	            },
	            onDrop:function(event, treeId, treeNodes, targetNode, moveType){
	                that.save('/org/save',{
	                    action:'002',
	                    org_id:treeNodes[0].org_id,
	                    org_parent_id:targetNode?targetNode.org_id:'0'
	                },function(data){
	                    if(!data.success){
	                        that.toast(data.message);
	                        return;
	                    }
	                });
	            }
	        }
	    };
	    ztreeObj = $.fn.zTree.init($("#orgTree",this.dom), setting);
	};

	/**
	 * 绑定按钮点击事件
	 */
	OrgManage.prototype.bindEvents = function () {
	    var that = this;
	    //添加组织机构
	    $('#addOrgBtn',this.dom).click(function(){
	        var nodes = ztreeObj.getSelectedNodes(),org_parent_id;
	        if(nodes.length>0){
	            org_parent_id = nodes[0].org_id;
	        }
	        Events.require('org-add-modify').addCallback(function(flag,_org_id){
	            if(flag){
	                //TODO 添加新节点
	                if(_org_id == '0'){
	                    ztreeObj.reAsyncChildNodes(null, "refresh");
	                }else{
	                    var nodes = ztreeObj.getNodesByParam("org_id", _org_id, null);
	                    ztreeObj.reAsyncChildNodes(nodes[0], "refresh");
	                }
	                that.toast('保存成功！');
	            }
	        }).init({showType:'Pop',org_parent_id:org_parent_id});
	    });
	    //编辑组织机构
	    $('#modifyOrgBtn',this.dom).click(function(){
	        var nodes = ztreeObj.getSelectedNodes(),org_id,org_parent_id;
	        if(nodes.length>0){
	            org_id = nodes[0].org_id;
	            org_parent_id = nodes[0].org_parent_id;
	        }else{
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        Events.require('org-add-modify').addCallback(function(flag,_org_id){
	            if(flag){
	                //TODO 添加新节点
	                if(_org_id == '0'){
	                    ztreeObj.reAsyncChildNodes(null, "refresh");
	                }else{
	                    var nodes = ztreeObj.getNodesByParam("org_id", org_id, null);
	                    ztreeObj.reAsyncChildNodes(nodes[0].getParentNode(), "refresh");
	                }
	                that.toast('保存成功！');
	            }
	        }).init({showType:'Pop',action:'002',org_id:org_id,org_parent_id:org_parent_id});
	    });
	    //删除组织机构
	    $('#removeOrgBtn', this.dom).click(function () {
	        var nodes = ztreeObj.getSelectedNodes();
	        if (nodes.length == 0) {
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        swal({
	            title: "确认",
	            text: "删除该组织机构将会清空其所关联的角色与用户关系，确认删除吗？",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "删除",
	            cancelButtonText: "取消",
	            closeOnConfirm: true
	        }, function () {
	            that.save('/org/save', {action:'003',org_id: nodes[0].org_id}, function (data) {
	                if (!data.success) {
	                    that.toast(data.message);
	                    return;
	                }
	                ztreeObj.removeNode(nodes[0]);
	                that.toast('删除成功！');
	            });
	        });

	    });
	    //编辑组织机构用户
	    $('#modify_org_user_btn',this.dom).click(function(){
	        var nodes = ztreeObj.getSelectedNodes();
	        if (nodes.length == 0) {
	            swal("提示", "请先选择要操作的组织机构数据!", "warning");
	            return;
	        }
	        Events.require('user2org').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:org-manage');
	        }).init({showType:'Pop',org_id:nodes[0].org_id});
	    });

	    //添加用户
	    $('#add_user_btn',this.dom).click(function(){
	        var nodes = ztreeObj.getSelectedNodes();
	        if (nodes.length == 0) {
	            swal("提示", "请先选择组织机构数据!", "warning");
	            return;
	        }
	        Events.require('user-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:org-manage');
	        }).init({showType:'Pop',org_id:nodes[0].org_id});
	    });
	    //修改信息
	    $('#modify_user_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('user-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:org-manage');
	        }).init({showType:'Pop',action:'002',user_id:rowData.user_id});
	    });
	    //修改密码
	    $('#modify_password_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('user-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:org-manage');
	        }).init({showType:'Pop',action:'003',user_id:rowData.user_id});
	    });
	    //删除信息
	    $('#delete_user_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        swal({
	            title: "确认",
	            text: "删除该用户将会清空此用户所属于组织机构以及其所拥有的角色关联数据，确认删除吗？",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "删除",
	            cancelButtonText: "取消",
	            closeOnConfirm: true
	        }, function () {
	            that.save('/user/save',{action:'004',user_id:rowData.user_id},function(data){
	                if(data.success){
	                    that.toast("删除用户成功!");
	                    Events.notify('onRefresh:org-manage');
	                }else{
	                    that.toast(data.message);
	                }
	            });
	        });
	    });

	    /**
	     * 为用户分配角色
	     */
	    $('#auth_role_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('role2user').init({showType:'Pop',user_id:rowData.user_id});
	    });
	    /**
	     * 为组织机构分配角色
	     */
	    $('#authRoleOrgBtn',this.dom).click(function(){
	        var nodes = ztreeObj.getSelectedNodes();
	        if (nodes.length == 0) {
	            swal("提示", "请先选择要操作的组织机构数据!", "warning");
	            return;
	        }
	        Events.require('role2org').init({showType:'Pop',org_id:nodes[0].org_id});
	    });
	    function getSelectRow(){
	        var rowData = that.$table.datagrid('getSelected');
	        if(!rowData){
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        return rowData;
	    }
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	OrgManage.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:org-manage');
	    frameworkBase.finish.apply(this,arguments);
	};

	var orgManage = new OrgManage();
	Events.subscribe('onWindowResize',function(){
	    if(!orgManage.dom)
	        return;
	    $('.tablecontainer',orgManage.dom).height(orgManage.dom.height()-15-$('.condition-wrap',orgManage.dom).height());
	    orgManage.$table.datagrid('resize');
	});

	module.exports = orgManage;



/***/ },
/* 287 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 288 */,
/* 289 */
/***/ function(module, exports) {

	module.exports = [
	    {field: 'user_id', title: '用户ID', width: 200},
	    {field: 'user_name', title: '用户名', width: 150},
	    {field: 'create_time', title: '创建时间', width: 150},
	    {field: 'update_time', title: '修改时间', width: 200}
	];

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 修改密码模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(291);
	__webpack_require__(181);
	var PasswordModify = function(){ };

	//继承自框架基类
	PasswordModify.prototype = $.extend({},frameworkBase);
	PasswordModify.prototype.id = 'password-modify';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	PasswordModify.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('修改密码').setHeight(240).setWidth(400);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	};

	PasswordModify.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(293);
	    this.render(html);
	};

	PasswordModify.prototype.bindEvents = function(){
	    var that = this;
	    $('#confirmBtn',this.dom).click(function(){
	        var oldPassword = $('#oldpassword',that.dom).val();
	        var newPassword = $('#newpassword',that.dom).val();
	        var rePassword = $('#repassword',that.dom).val();
	        if($.trim(oldPassword) === '' ){
	            swal("提示", "请输入原始密码!", "warning");
	            return;
	        }
	        if($.trim(newPassword) === '' ){
	            swal("提示", "请输入新密码!", "warning");
	            return;
	        }
	        if($.trim(rePassword) !== $.trim(newPassword) ){
	            swal("提示", "确认密码与新密码不一致!", "warning");
	            return;
	        }
	        that.save('/user/passwordmodify',{
	            oldPassword:oldPassword,
	            newPassword:newPassword
	        },function(data){
	            if(data.success){
	                swal("成功", '修改成功', "success");
	                that.finish();
	            }else{
	                swal("抱歉", data.message, "error");
	            }
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish();
	    });
	    $('#oldpassword',this.dom)[0].focus();
	};

	module.exports = new PasswordModify();

/***/ },
/* 291 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 292 */,
/* 293 */
/***/ function(module, exports) {

	module.exports = "<div class=\"passwordmodify\">\r\n    <div class=\"panel-body\">\r\n            <div class=\"form-group\">\r\n                <label>旧密码：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入旧密码\" name=\"oldpassword\" id=\"oldpassword\" type=\"password\" autofocus>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>新密码：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入新密码\" name=\"newpassword\" id=\"newpassword\" type=\"password\" value=\"\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>确认密码：</label>\r\n                <input class=\"form-control\" placeholder=\"请确认密码\" name=\"repassword\" id=\"repassword\" type=\"password\" value=\"\">\r\n            </div>\r\n            <div class=\"btn-wrap\">\r\n                <span id=\"confirmBtn\" class=\"framework-button\">确认</span>\r\n                <span id=\"cancelBtn\" class=\"framework-button\">取消</span>\r\n            </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 报修信息查看模块
	 * @author yanglang
	 * @type {Framework}
	 */
	var WIDGETS = [
	    {container:'#report-view-container',module:'report-list',id:''}];

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(295);
	var ReportView = function(){ };

	//继承自框架基类
	ReportView.prototype = $.extend({},frameworkBase);
	ReportView.prototype.id = 'report-view';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	ReportView.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({action:'001'},options);
	    that.setTitle('报修信息查看').setHeight(400).setWidth(680);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	    this.restoreData();
	};

	ReportView.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(297);
	    this.render(html);
	    var reportList = __webpack_require__(246);
	    WIDGETS[0].id = this.options.report_id;
	    reportList.loadWidgets(WIDGETS);
	};

	/**
	 * 修改状态返显数据
	 */
	ReportView.prototype.restoreData = function () {
	    var that = this;

	};

	ReportView.prototype.bindEvents = function () {
	    var that = this;
	    $('#closeBtn',this.dom).click(function(){
	        that.finish();
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	ReportView.prototype.finish = function () {
	    try{
	        frameworkBase.finish.apply(this,arguments);
	    }catch(e){
	        console.log(e);
	    }
	};

	var messagePublish = new ReportView();


	module.exports = messagePublish;

/***/ },
/* 295 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 296 */,
/* 297 */
/***/ function(module, exports) {

	module.exports = "<div class=\"report-view shadow-block\">\r\n    <!--style给定宽度可以影响编辑器的最终宽度-->\r\n    <div id=\"report-view-container\">\r\n    </div>\r\n    <div class=\"btn-wrap\">\r\n        <span class=\"framework-button\" id=\"closeBtn\">关闭</span>\r\n    </div>\r\n</div>";

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 新增修改角色模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(299);
	var RoleAddModify = function(){ };

	//继承自框架基类
	RoleAddModify.prototype = $.extend({},frameworkBase);
	RoleAddModify.prototype.id = 'role-add-modify';

	var ACTIONS = {
	    '001':{title:'添加角色',height:150},
	    '002':{title:'编辑角色',height:150}
	};
	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	RoleAddModify.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({action:'001'},options);
	    that.setTitle(ACTIONS[this.options.action].title).setHeight(ACTIONS[this.options.action].height).setWidth(400);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	    if(this.options.action == '002' ){
	        this.restoreData();
	    }
	};

	RoleAddModify.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(301);
	    this.render(html);
	};

	RoleAddModify.prototype.bindEvents = function(){
	    var that = this;
	    $('#confirmBtn',this.dom).click(function(){
	        var role_name = $('#role_name',that.dom).val();
	        if($.trim(role_name) === '' ){
	            swal("提示", "请输入角色名!", "warning");
	            return;
	        }
	        var params = {
	            action:that.options.action,
	            role_id:that.options.role_id,
	            role_name:role_name
	        };
	        that.save('/role/save',params,function(data){
	            if(!data.success){
	                that.toast(data.message);
	                return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });
	};

	RoleAddModify.prototype.restoreData = function() {
	    var that = this;
	    this.query('/role/search/'+this.options.role_id,function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data = data.data;
	        $('#role_name',that.dom).val(data.role_name);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	RoleAddModify.prototype.finish = function () {
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new RoleAddModify();

/***/ },
/* 299 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 300 */,
/* 301 */
/***/ function(module, exports) {

	module.exports = "<div class=\"role-add-modify\">\r\n    <div class=\"panel-body\">\r\n            <div class=\"form-group\">\r\n                <label>角色名：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入角色名\" name=\"role_name\" id=\"role_name\" type=\"text\" autofocus>\r\n            </div>\r\n            <div class=\"btn-wrap\">\r\n                <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n                <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n            </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 角色管理模块
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(303);
	__webpack_require__(181);
	var Calendar = __webpack_require__(124);
	var RoleManage = function () {};

	//继承自框架基类
	RoleManage.prototype = $.extend({}, frameworkBase);
	RoleManage.prototype.id = 'role-manage';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	RoleManage.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('角色管理').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	};

	RoleManage.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/role-manage.html').then(function(html){
	        that.render(html);
	        $('.tablecontainer',that.dom).height(that.dom.height()-55);
	        that.initTable();
	        that.bindEvents();
	    });
	};

	RoleManage.prototype.initTable = function () {
	    var that = this;
	    $('.easyui-linkbutton',this.dom).linkbutton();
	    var columns = __webpack_require__(305);
	    that.$table = $('#dataTable',this.dom).datagrid({
	        url: '/role/list',
	        method: 'get',
	        columns: [columns],
	        cache:false,
	        pagination: false,
	        pageSize: 20,
	        ctrlSelect: true,
	        checkOnSelect: true,
	        selectOnCheck: true,
	        loadMsg: '正在查询，请稍候……',
	        striped: true,
	        fit: true,
	        fitColumns: false,
	        loadFilter: function (data) {
	            if(!data.success){
	                that.toast(data.message);
	            }
	            return {rows: data.data, total: data.data.length};
	        },
	        onDblClickRow: function (rowIndex, rowData) {
	            Events.require('role-add-modify').addCallback(function(flag){
	                if(flag)
	                    Events.notify('onRefresh:role-manage');
	            }).init({showType:'Pop',action:'002',role_id:rowData.role_id});
	        },
	        toolbar: '#role-manage-toolbar'
	    });

	    var searchBox = $('#role-manage #home-easyui-searchbox',that.dom).searchbox({
	        searcher: function (value, name) {
	            Events.notify('onRefresh:role-manage');
	        },
	        prompt: '请输关键字，如角色名'
	    });


	    //订阅刷新消息
	    Events.subscribe('onRefresh:role-manage',function(){
	        that.$table.datagrid('load',{
	            key:searchBox.searchbox('getValue')
	        });
	    });
	};

	/**
	 * 绑定按钮点击事件
	 */
	RoleManage.prototype.bindEvents = function () {
	    var that = this;
	    //添加信息
	    $('#add_role_btn',this.dom).click(function(){
	        Events.require('role-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:role-manage');
	        }).init({showType:'Pop'});
	    });
	    //修改信息
	    $('#modify_role_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('role-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:role-manage');
	        }).init({showType:'Pop',action:'002',role_id:rowData.role_id});
	    });
	    //赋权
	    $('#authority_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('authority-control').addCallback(function(flag){
	        }).init({showType:'Pop',role_id:rowData.role_id});
	    });
	    //设置属于当前角色的用户
	    $('#role_user_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('user2role').addCallback(function(flag){
	        }).init({showType:'Pop',role_id:rowData.role_id});
	    });
	    //删除信息
	    $('#delete_role_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        swal({
	            title: "确认",
	            text: "删除该角色将会清空此角色所关联的组织机构与用户关系，确认删除吗？",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "删除",
	            cancelButtonText: "取消",
	            closeOnConfirm: true
	        }, function () {
	            that.save('/role/save',{action:'003',role_id:rowData.role_id},function(data){
	                if(data.success){
	                    that.toast("删除角色成功!");
	                    Events.notify('onRefresh:role-manage');
	                }else{
	                    that.toast(data.message);
	                }
	            });
	        });

	    });
	   

	    function getSelectRow(){
	        var rowData = that.$table.datagrid('getSelected');
	        if(!rowData){
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        return rowData;
	    }
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	RoleManage.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:role-manage');
	    frameworkBase.finish.apply(this,arguments);
	};

	var roleManage = new RoleManage();
	Events.subscribe('onWindowResize',function(){
	    if(!roleManage.dom)
	        return;
	    $('.tablecontainer',roleManage.dom).height(roleManage.dom.height()-15-$('.condition-wrap',roleManage.dom).height());
	    roleManage.$table.datagrid('resize');
	});

	module.exports = roleManage;



/***/ },
/* 303 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 304 */,
/* 305 */
/***/ function(module, exports) {

	module.exports = [
	    {field: 'role_id', title: '角色ID', width: 300},
	    {field: 'role_name', title: '角色名称', width: 250}
	];

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 给组织机构赋角色模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(307);
	var Role2User = function(){ };

	//继承自框架基类
	Role2User.prototype = $.extend({},frameworkBase);
	Role2User.prototype.id = 'role2org';

	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	Role2User.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('给组织机构赋角色').setHeight(500).setWidth(600);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	    this.bindEvents();
	    this.restoreData();
	};

	Role2User.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(309);
	    this.render(html);
	};

	Role2User.prototype.bindEvents = function(){
	    this.dom.on('selectstart',function(){
	        return false;
	    });
	    var that = this;
	    $('.list-panel',this.dom).on('click','li.list-item',function(){
	        var $this = $(this);
	        $this.parent().find('.list-item').removeClass('selected').end().end().addClass('selected');
	    });
	    $('#mapList',this.dom).on('dblclick','li.list-item',function(){
	        removeItem($(this));
	    });
	    $('#roleList',this.dom).on('dblclick','li.list-item',function(){
	        roleItemClick($(this));
	    });
	    $('#addRole',this.dom).click(function(){
	        var $item = $('#roleList .list-item.selected');
	        roleItemClick($item);
	    });
	    function roleItemClick($item){
	        var role_id = $item.attr('data-role-id');
	        if($('#mapList .list-item[data-role-id="'+role_id+'"]').length == 0){
	            var role_name = $item.html();
	            $('<li class="list-item" data-role-id="'+role_id+'">'+role_name+'</li>').appendTo($('#mapList'));
	        }
	    }
	    function removeItem($item){
	        $item.remove();
	    }
	    $('#removeRole',this.dom).click(function(){
	        var $item = $('#mapList .list-item.selected');
	        removeItem($item);
	    });
	    $('#addAllRole',this.dom).click(function(){
	        $('#roleList .list-item').each(function(){
	            roleItemClick($(this));
	        });
	    });
	    $('#removeAllRole',this.dom).click(function(){
	        $('#mapList .list-item').remove();
	    });


	    $('#confirmBtn',this.dom).click(function(){
	        that.save('/role/orgrole/',{
	            org_id:that.options.org_id,
	            role_ids:function(){
	                var ids = [];
	                $('#mapList .list-item').each(function(){
	                    ids.push($(this).attr('data-role-id'));
	                }) ;
	                return ids.join(';');
	            }()
	        },function(data){
	            if(!data.success){
	               that.toast(data.message);
	               return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });
	};

	Role2User.prototype.restoreData = function() {
	    var that = this;
	    this.query('/role/list',function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var html = '';
	        for(var i = 0,len = data.data.length;i<len;i++){
	            html += '<li class="list-item" data-role-id="'+data.data[i].role_id+'">'+data.data[i].role_name+'</li>'
	        }
	        $('#roleList',that.dom).html(html);
	    });
	    this.query('/role/orgrole',{org_id:this.options.org_id},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var html = '';
	        for(var i = 0,len = data.data.length;i<len;i++){
	            html += '<li class="list-item" data-role-id="'+data.data[i].role_id+'">'+data.data[i].role_name+'</li>'
	        }
	        $('#mapList',that.dom).html(html);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	Role2User.prototype.finish = function () {
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new Role2User();

/***/ },
/* 307 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 308 */,
/* 309 */
/***/ function(module, exports) {

	module.exports = "<div id=\"role2org\">\r\n    <div class=\"role2org_content_wrap\">\r\n        <div class=\"lr-choose-panel\">\r\n            <div class=\"left-choose-panel\">\r\n                <div class=\"panel-flow-wrap\">\r\n                    <ul id=\"roleList\" class=\"list-panel\">\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n            <div class=\"center-operator-panel\">\r\n                <div class=\"operator-wrap\">\r\n                    <span class=\"choose-btn fa fa-angle-right\" id=\"addRole\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-left\" id=\"removeRole\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-double-right\" id=\"addAllRole\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-double-left\" id=\"removeAllRole\"></span>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"right-choose-panel\">\r\n                <div class=\"panel-flow-wrap\">\r\n                    <ul id=\"mapList\" class=\"list-panel\">\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"btn-wrap\">\r\n        <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n        <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 给用户赋角色模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(311);
	var Role2User = function(){ };

	//继承自框架基类
	Role2User.prototype = $.extend({},frameworkBase);
	Role2User.prototype.id = 'role2user';

	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	Role2User.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('给用户赋角色').setHeight(500).setWidth(600);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	    this.bindEvents();
	    this.restoreData();
	};

	Role2User.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(313);
	    this.render(html);
	};

	Role2User.prototype.bindEvents = function(){
	    this.dom.on('selectstart',function(){
	        return false;
	    });
	    var that = this;
	    $('.list-panel',this.dom).on('click','li.list-item',function(){
	        var $this = $(this);
	        $this.parent().find('.list-item').removeClass('selected').end().end().addClass('selected');
	    });
	    $('#mapList',this.dom).on('dblclick','li.list-item',function(){
	        removeItem($(this));
	    });
	    $('#roleList',this.dom).on('dblclick','li.list-item',function(){
	        roleItemClick($(this));
	    });
	    $('#addRole',this.dom).click(function(){
	        var $item = $('#roleList .list-item.selected');
	        roleItemClick($item);
	    });
	    function roleItemClick($item){
	        var role_id = $item.attr('data-role-id');
	        if($('#mapList .list-item[data-role-id="'+role_id+'"]').length == 0){
	            var role_name = $item.html();
	            $('<li class="list-item" data-role-id="'+role_id+'">'+role_name+'</li>').appendTo($('#mapList'));
	        }
	    }
	    function removeItem($item){
	        $item.remove();
	    }
	    $('#removeRole',this.dom).click(function(){
	        var $item = $('#mapList .list-item.selected');
	        removeItem($item);
	    });
	    $('#addAllRole',this.dom).click(function(){
	        $('#roleList .list-item').each(function(){
	            roleItemClick($(this));
	        });
	    });
	    $('#removeAllRole',this.dom).click(function(){
	        $('#mapList .list-item').remove();
	    });


	    $('#confirmBtn',this.dom).click(function(){
	        that.save('/role/userrole/',{
	            user_id:that.options.user_id,
	            role_ids:function(){
	                var ids = [];
	                $('#mapList .list-item').each(function(){
	                    ids.push($(this).attr('data-role-id'));
	                }) ;
	                return ids.join(';');
	            }()
	        },function(data){
	            if(!data.success){
	               that.toast(data.message);
	               return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });
	};

	Role2User.prototype.restoreData = function() {
	    var that = this;
	    this.query('/role/list',function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var html = '';
	        for(var i = 0,len = data.data.length;i<len;i++){
	            html += '<li class="list-item" data-role-id="'+data.data[i].role_id+'">'+data.data[i].role_name+'</li>'
	        }
	        $('#roleList',that.dom).html(html);
	    });
	    this.query('/role/userrole',{user_id:this.options.user_id},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var html = '';
	        for(var i = 0,len = data.data.length;i<len;i++){
	            html += '<li class="list-item" data-role-id="'+data.data[i].role_id+'">'+data.data[i].role_name+'</li>'
	        }
	        $('#mapList',that.dom).html(html);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	Role2User.prototype.finish = function () {
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new Role2User();

/***/ },
/* 311 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 312 */,
/* 313 */
/***/ function(module, exports) {

	module.exports = "<div id=\"role2user\">\r\n    <div class=\"role2user_content_wrap\">\r\n        <div class=\"lr-choose-panel\">\r\n            <div class=\"left-choose-panel\">\r\n                <div class=\"panel-flow-wrap\">\r\n                    <ul id=\"roleList\" class=\"list-panel\">\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n            <div class=\"center-operator-panel\">\r\n                <div class=\"operator-wrap\">\r\n                    <span class=\"choose-btn fa fa-angle-right\" id=\"addRole\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-left\" id=\"removeRole\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-double-right\" id=\"addAllRole\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-double-left\" id=\"removeAllRole\"></span>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"right-choose-panel\">\r\n                <div class=\"panel-flow-wrap\">\r\n                    <ul id=\"mapList\" class=\"list-panel\">\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"btn-wrap\">\r\n        <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n        <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 新增修改用户模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(315);
	var UserAddModify = function(){ };

	//继承自框架基类
	UserAddModify.prototype = $.extend({},frameworkBase);
	UserAddModify.prototype.id = 'user-add-modify';

	var ACTIONS = {
	    '001':{title:'添加用户',height:200},
	    '002':{title:'编辑用户',height:150},
	    '003':{title:'修改密码',height:200}
	};
	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	UserAddModify.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({action:'001'},options);
	    that.setTitle(ACTIONS[this.options.action].title).setHeight(ACTIONS[this.options.action].height).setWidth(400);
	    frameworkBase.init.call(this,options);
	    this.loadBaseView();
	    this.bindEvents();
	    if(this.options.action == '002' || this.options.action == '003'){
	        this.restoreData();
	        if(this.options.action == '002'){
	            $('#user_password,#user_repassword',this.dom).parent().hide();
	        }else
	            $('#user_name',this.dom).attr('disabled',true);
	    }
	};

	UserAddModify.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(317);
	    this.render(html);
	};

	UserAddModify.prototype.bindEvents = function(){
	    var that = this;
	    $('#confirmBtn',this.dom).click(function(){
	        var user_name = $('#user_name',that.dom).val();
	        var user_password = $('#user_password',that.dom).val();
	        if($.trim(user_name) === '' ){
	            swal("提示", "请输入用户名!", "warning");
	            return;
	        }
	        if($.trim(user_password) === '' && that.options.action!='002' ){
	            swal("提示", "请输入密码!", "warning");
	            return;
	        }
	        var params = {
	            action:that.options.action,
	            user_id:that.options.user_id,
	            user_name:user_name,
	            user_password:user_password
	        };
	        if(that.options.action == '002'){
	            //修改用户名不需要改动密码
	            delete params.user_password;
	        }
	        //新增用户时，判断一下是否给了org_id，如果有的话，则创建组织机构与此用户的关系
	        (that.options.org_id && that.options.action=='001') && (params.org_id = that.options.org_id);
	        that.save('/user/save',params,function(data){
	            if(!data.success){
	                that.toast(data.message);
	                return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });
	};

	UserAddModify.prototype.restoreData = function() {
	    var that = this;
	    this.query('/user/search/'+this.options.user_id,function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        data = data.data;
	        $('#user_name',that.dom).val(data.user_name);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	UserAddModify.prototype.finish = function () {
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new UserAddModify();

/***/ },
/* 315 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 316 */,
/* 317 */
/***/ function(module, exports) {

	module.exports = "<div class=\"user-add-modify\">\r\n    <div class=\"panel-body\">\r\n            <div class=\"form-group\">\r\n                <label>用户名：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入用户名\" name=\"user_name\" id=\"user_name\" type=\"text\" autofocus>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>密码：</label>\r\n                <input class=\"form-control\" placeholder=\"请输入密码\" name=\"user_password\" id=\"user_password\" type=\"text\" value=\"\">\r\n            </div>\r\n            <div class=\"btn-wrap\">\r\n                <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n                <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n            </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yanglang on 2016/4/13.
	 * 用户管理模块
	 */

	var frameworkBase = __webpack_require__(169);
	__webpack_require__(178);
	__webpack_require__(319);
	__webpack_require__(181);
	var UserManage = function () {};

	//继承自框架基类
	UserManage.prototype = $.extend({}, frameworkBase);
	UserManage.prototype.id = 'user-manage';


	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	UserManage.prototype.init = function (options) {
	    var that = this;
	    this.options = $.extend({}, options);
	    that.setTitle('用户管理').setHeight(700).setWidth(780);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	};

	UserManage.prototype.loadBaseView = function () {
	    var that = this;
	    this.loadFragment('/views/modules/user-manage.html').then(function(html){
	        that.render(html);
	        $('.tablecontainer',that.dom).height(that.dom.height()-55);
	        that.initTable();
	        that.bindEvents();
	    });
	};

	UserManage.prototype.initTable = function () {
	    var that = this;
	    $('.easyui-linkbutton',this.dom).linkbutton();
	    var columns = __webpack_require__(321);
	    that.$table = $('#dataTable',this.dom).datagrid({
	        url: '/user/list',
	        method: 'get',
	        columns: [columns],
	        cache:false,
	        pagination: true,
	        pageSize: 20,
	        ctrlSelect: true,
	        checkOnSelect: true,
	        selectOnCheck: true,
	        loadMsg: '正在查询，请稍候……',
	        striped: true,
	        fit: true,
	        fitColumns: true,
	        loadFilter: function (data) {
	            if(!data.success){
	                that.toast(data.message);
	            }
	            return data.data;
	        },
	        onDblClickRow: function (rowIndex, rowData) {
	            Events.require('user-add-modify').addCallback(function(flag){
	                if(flag)
	                    Events.notify('onRefresh:user-manage');
	            }).init({showType:'Pop',action:'002',user_id:rowData.user_id});
	        },
	        toolbar: '#user-manage-toolbar'
	    });

	    var searchBox = $('#user-manage #home-easyui-searchbox',that.dom).searchbox({
	        searcher: function (value, name) {
	            Events.notify('onRefresh:user-manage');
	        },
	        prompt: '请输关键字，如用户名'
	    });

	    var startDate = $("#startdate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:user-manage');
	        }
	    });
	    var endDate = $("#enddate",that.dom).datebox({
	        editable:false ,
	        formatter: function (date) {
	            return Calendar.getInstance(date).format('yyyy-MM-dd');
	        },
	        onChange:function(date){
	            Events.notify('onRefresh:user-manage');
	        }
	    });

	    //订阅刷新消息
	    Events.subscribe('onRefresh:user-manage',function(){
	        that.$table.datagrid('load',{
	            key:searchBox.searchbox('getValue'),
	            startdate:startDate.combo('getValue').replace(/-/gi,''),
	            enddate:endDate.combo('getValue').replace(/-/gi,'')
	        });
	    });
	};

	/**
	 * 绑定按钮点击事件
	 */
	UserManage.prototype.bindEvents = function () {
	    var that = this;
	    //添加用户
	    $('#add_user_btn',this.dom).click(function(){
	        Events.require('user-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:user-manage');
	        }).init({showType:'Pop'});
	    });
	    //修改用户
	    $('#modify_user_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('user-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:user-manage');
	        }).init({showType:'Pop',action:'002',user_id:rowData.user_id});
	    });
	    //修改密码
	    $('#modify_password_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('user-add-modify').addCallback(function(flag){
	            if(flag)
	                Events.notify('onRefresh:user-manage');
	        }).init({showType:'Pop',action:'003',user_id:rowData.user_id});
	    });
	    //删除用户
	    $('#delete_user_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        swal({
	            title: "确认",
	            text: "删除该用户将会清空此用户所属于组织机构以及其所拥有的角色关联数据，确认删除吗？",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "删除",
	            cancelButtonText: "取消",
	            closeOnConfirm: true
	        }, function () {
	            that.save('/user/save',{action:'004',user_id:rowData.user_id},function(data){
	                if(data.success){
	                    that.toast("删除用户成功!");
	                    Events.notify('onRefresh:user-manage');
	                }else{
	                    that.toast(data.message);
	                }
	            });
	        });

	    });
	    /**
	     * 为用户分配角色
	     */
	    $('#auth_role_btn',this.dom).click(function(){
	        var rowData;
	        if(!(rowData = getSelectRow()))
	            return;
	        Events.require('role2user').init({showType:'Pop',user_id:rowData.user_id});
	    });
	    
	    function getSelectRow(){
	        var rowData = that.$table.datagrid('getSelected');
	        if(!rowData){
	            swal("提示", "请先选择一条数据!", "warning");
	            return;
	        }
	        return rowData;
	    }
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	UserManage.prototype.finish = function () {
	    Events.unsubscribe('onRefresh:user-manage');
	    frameworkBase.finish.apply(this,arguments);
	};

	var userManage = new UserManage();
	Events.subscribe('onWindowResize',function(){
	    if(!userManage.dom)
	        return;
	    $('.tablecontainer',userManage.dom).height(userManage.dom.height()-15-$('.condition-wrap',userManage.dom).height());
	    userManage.$table.datagrid('resize');
	});

	module.exports = userManage;



/***/ },
/* 319 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 320 */,
/* 321 */
/***/ function(module, exports) {

	module.exports = [
	    {field: 'user_id', title: '用户ID', width: 200},
	    {field: 'user_name', title: '用户名', width: 150},
	    {field: 'create_time', title: '创建时间', width: 150},
	    {field: 'update_time', title: '修改时间', width: 200}
	];

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 分配用户到组织机构模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(323);
	var User2Org = function(){ };

	//继承自框架基类
	User2Org.prototype = $.extend({},frameworkBase);
	User2Org.prototype.id = 'user2org';

	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	User2Org.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('编辑组织机构下的用户').setHeight(500).setWidth(600);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	    this.bindEvents();
	    this.restoreData();
	};

	User2Org.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(325);
	    this.render(html);
	};

	User2Org.prototype.bindEvents = function(){
	    this.dom.on('selectstart',function(){
	        return false;
	    });
	    var that = this;
	    $('.list-panel',this.dom).on('click','li.list-item',function(){
	        var $this = $(this);
	        $this.parent().find('.list-item').removeClass('selected').end().end().addClass('selected');
	    });
	    $('#mapList',this.dom).on('dblclick','li.list-item',function(){
	        removeItem($(this));
	    });
	    $('#userList',this.dom).on('dblclick','li.list-item',function(){
	        roleItemClick($(this));
	    });
	    $('#addUser',this.dom).click(function(){
	        var $item = $('#userList .list-item.selected');
	        roleItemClick($item);
	    });
	    function roleItemClick($item){
	        if($item.length == 0)
	            return;
	        var user_id = $item.attr('data-user-id');
	        if($('#mapList .list-item[data-user-id="'+user_id+'"]').length == 0){
	            var role_name = $item.html();
	            $('<li class="list-item" data-user-id="'+user_id+'">'+role_name+'</li>').appendTo($('#mapList'));
	        }
	    }
	    function removeItem($item){
	        $item.remove();
	    }
	    $('#removeUser',this.dom).click(function(){
	        var $item = $('#mapList .list-item.selected');
	        removeItem($item);
	    });
	    $('#addAllUser',this.dom).click(function(){
	        $('#userList .list-item').each(function(){
	            roleItemClick($(this));
	        });
	    });
	    $('#removeAllUser',this.dom).click(function(){
	        $('#mapList .list-item').remove();
	    });


	    $('#confirmBtn',this.dom).click(function(){
	        that.save('/org/orguser/',{
	            org_id:that.options.org_id,
	            user_ids:function(){
	                var ids = [];
	                $('#mapList .list-item').each(function(){
	                    ids.push($(this).attr('data-user-id'));
	                }) ;
	                return ids.join(';');
	            }()
	        },function(data){
	            if(!data.success){
	               that.toast(data.message);
	               return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });
	};

	User2Org.prototype.restoreData = function() {
	    var that = this;
	    this.query('/user/list',{page:1,rows:999999},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var html = '';
	        for(var i = 0,len = data.data.total;i<len;i++){
	            html += '<li class="list-item" data-user-id="'+data.data.rows[i].user_id+'">'+data.data.rows[i].user_name+'</li>'
	        }
	        $('#userList',that.dom).html(html);
	    });
	    this.query('/org/orguser',{org_id:this.options.org_id,page:1,rows:99999},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var html = '';
	        for(var i = 0,len = data.data.total;i<len;i++){
	            html += '<li class="list-item" data-user-id="'+data.data.rows[i].user_id+'">'+data.data.rows[i].user_name+'</li>'
	        }
	        $('#mapList',that.dom).html(html);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	User2Org.prototype.finish = function () {
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new User2Org();

/***/ },
/* 323 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 324 */,
/* 325 */
/***/ function(module, exports) {

	module.exports = "<div id=\"user2org\">\r\n    <div class=\"user2org_content_wrap\">\r\n        <div class=\"lr-choose-panel\">\r\n            <div class=\"left-choose-panel\">\r\n                <div class=\"panel-flow-wrap\">\r\n                    <ul id=\"userList\" class=\"list-panel\">\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n            <div class=\"center-operator-panel\">\r\n                <div class=\"operator-wrap\">\r\n                    <span class=\"choose-btn fa fa-angle-right\" id=\"addUser\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-left\" id=\"removeUser\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-double-right\" id=\"addAllUser\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-double-left\" id=\"removeAllUser\"></span>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"right-choose-panel\">\r\n                <div class=\"panel-flow-wrap\">\r\n                    <ul id=\"mapList\" class=\"list-panel\">\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"btn-wrap\">\r\n        <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n        <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 设置属于角色的用户模块
	 */
	var frameworkBase = __webpack_require__(169);
	__webpack_require__(327);
	var User2Role = function(){ };

	//继承自框架基类
	User2Role.prototype = $.extend({},frameworkBase);
	User2Role.prototype.id = 'user2role';

	/**
	 * 模块初始化入口<br>
	 * @method init
	 * @param options 参数对象
	 */
	User2Role.prototype.init = function(options){
	    var that = this;
	    this.options = $.extend({},options);
	    that.setTitle('编辑角色下的用户').setHeight(500).setWidth(600);
	    frameworkBase.init.call(this, options);
	    this.loadBaseView();
	    this.bindEvents();
	    this.restoreData();
	};

	User2Role.prototype.loadBaseView = function(options){
	    var html = __webpack_require__(329);
	    this.render(html);
	};

	User2Role.prototype.bindEvents = function(){
	    this.dom.on('selectstart',function(){
	        return false;
	    });
	    var that = this;
	    $('.list-panel',this.dom).on('click','li.list-item',function(){
	        var $this = $(this);
	        $this.parent().find('.list-item').removeClass('selected').end().end().addClass('selected');
	    });
	    $('#mapList',this.dom).on('dblclick','li.list-item',function(){
	        removeItem($(this));
	    });
	    $('#userList',this.dom).on('dblclick','li.list-item',function(){
	        roleItemClick($(this));
	    });
	    $('#addUser',this.dom).click(function(){
	        var $item = $('#userList .list-item.selected');
	        roleItemClick($item);
	    });
	    function roleItemClick($item){
	        if($item.length == 0)
	            return;
	        var user_id = $item.attr('data-user-id');
	        if($('#mapList .list-item[data-user-id="'+user_id+'"]').length == 0){
	            var role_name = $item.html();
	            $('<li class="list-item" data-user-id="'+user_id+'">'+role_name+'</li>').appendTo($('#mapList'));
	        }
	    }
	    function removeItem($item){
	        $item.remove();
	    }
	    $('#removeUser',this.dom).click(function(){
	        var $item = $('#mapList .list-item.selected');
	        removeItem($item);
	    });
	    $('#addAllUser',this.dom).click(function(){
	        $('#userList .list-item').each(function(){
	            roleItemClick($(this));
	        });
	    });
	    $('#removeAllUser',this.dom).click(function(){
	        $('#mapList .list-item').remove();
	    });


	    $('#confirmBtn',this.dom).click(function(){
	        that.save('/role/roleuser/',{
	            role_id:that.options.role_id,
	            user_ids:function(){
	                var ids = [];
	                $('#mapList .list-item').each(function(){
	                    ids.push($(this).attr('data-user-id'));
	                }) ;
	                return ids.join(';');
	            }()
	        },function(data){
	            if(!data.success){
	               that.toast(data.message);
	               return;
	            }
	            that.finish(true);
	        });

	    });
	    $('#cancelBtn',this.dom).click(function(){
	        that.finish(false);
	    });
	};

	User2Role.prototype.restoreData = function() {
	    var that = this;
	    this.query('/user/list',{page:1,rows:999999},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var html = '';
	        for(var i = 0,len = data.data.total;i<len;i++){
	            html += '<li class="list-item" data-user-id="'+data.data.rows[i].user_id+'">'+data.data.rows[i].user_name+'</li>'
	        }
	        $('#userList',that.dom).html(html);
	    });
	    this.query('/role/roleuser',{role_id:this.options.role_id,page:1,rows:99999},function(data){
	        if(!data.success){
	            that.toast(data.message);
	            return;
	        }
	        var html = '';
	        for(var i = 0,len = data.data.length;i<len;i++){
	            html += '<li class="list-item" data-user-id="'+data.data[i].user_id+'">'+data.data[i].user_name+'</li>'
	        }
	        $('#mapList',that.dom).html(html);
	    });
	};

	/**
	 * 销毁方法
	 * 由框架调用，主要用于销毁订阅的事件
	 */
	User2Role.prototype.finish = function () {
	    frameworkBase.finish.apply(this,arguments);
	};

	module.exports = new User2Role();

/***/ },
/* 327 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 328 */,
/* 329 */
/***/ function(module, exports) {

	module.exports = "<div id=\"user2role\">\r\n    <div class=\"user2role_content_wrap\">\r\n        <div class=\"lr-choose-panel\">\r\n            <div class=\"left-choose-panel\">\r\n                <div class=\"panel-flow-wrap\">\r\n                    <ul id=\"userList\" class=\"list-panel\">\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n            <div class=\"center-operator-panel\">\r\n                <div class=\"operator-wrap\">\r\n                    <span class=\"choose-btn fa fa-angle-right\" id=\"addUser\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-left\" id=\"removeUser\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-double-right\" id=\"addAllUser\"></span>\r\n                    <span class=\"choose-btn fa fa-angle-double-left\" id=\"removeAllUser\"></span>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"right-choose-panel\">\r\n                <div class=\"panel-flow-wrap\">\r\n                    <ul id=\"mapList\" class=\"list-panel\">\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"btn-wrap\">\r\n        <span class=\"framework-button\" id=\"confirmBtn\">提交</span>\r\n        <span class=\"framework-button\" id=\"cancelBtn\">取消</span>\r\n    </div>\r\n</div>\r\n";

/***/ }
]);