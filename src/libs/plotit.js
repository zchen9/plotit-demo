!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Plotit=t():e.Plotit=t()}(this,function(){return function(e){function t(r){if(a[r])return a[r].exports;var i=a[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),o=a(/*! ./core/adjuster */1),l=r(o),s=a(/*! ./core/filter */2),c=r(s),u=a(/*! ./core/resize */4),h=r(u);e.exports=function(){function e(t){i(this,e);var a=t.selector||"body";this.$panel=document.querySelector(a)}return n(e,[{key:"renderImage",value:function(e){var t=this;this.$panel&&!function(){var a=void 0,r=t.$panel,i=r.clientWidth,n=r.clientHeight||500,o=document.createElement("canvas"),l=o.getContext("2d");a=new Image,a.crossOrigin="anonymous",a.src=e,t.image=a,a.onload=function(){var e=a.width,s=a.height,c=void 0;l.clearRect(0,0,o.width,o.height),c=e>s?e/i:s/n,e/=c,s/=c,o.id="plotitCanvas",o.width=e,o.height=s,l.drawImage(a,0,0,o.width,o.height),r.innerHTML="",r.appendChild(o),t.$canvas=o,t.context=l,t.originData=t.getData(o)}}()}},{key:"getData",value:function(e){e=e||this.$canvas;var t=e.getContext("2d")||this.context;if(t)return t.getImageData(0,0,e.width,e.height)}},{key:"setData",value:function(e){var t=this.context||this.$canvas.getContext("2d");if(t)return this.clearData(),t.putImageData(e,0,0)}},{key:"clearData",value:function(){var e=this.context||this.$canvas.getContext("2d");if(e)return e.clearRect(0,0,this.$canvas.width,this.$canvas.height)}},{key:"resetImage",value:function(){this.originData&&this.setData(this.originData)}},{key:"removeImage",value:function(){this.$panel.innerHTML=""}},{key:"processFilter",value:function(e,t){this.resetImage(),c["default"].newLayer(t),c["default"].bindUtil(this),e&&"string"==typeof e&&(e=c["default"][e].bind(c["default"])),e&&"function"==typeof e&&(e(),c["default"].renderLayer())}},{key:"processPixel",value:function(e,t){if(this.getData()){var a=a||this.getData(),r=+t||0;if(e&&"string"==typeof e&&(e=l["default"][e],e=e?e.bind(l["default"]):null),e&&"function"==typeof e)for(var i=0;i<a.data.length;i+=4){var n={r:a.data[i+0],g:a.data[i+1],b:a.data[i+2],a:a.data[i+3]};n=e(n,r),a.data[i+0]=n.r,a.data[i+1]=n.g,a.data[i+2]=n.b,a.data[i+3]=n.a}this.setData(a)}}},{key:"processCrop",value:function(e){h["default"].cropImage(this.$canvas,e)}},{key:"processResize",value:function(e,t,a){h["default"].newFrame(e,t),h["default"].bindUtil(this),h["default"].setPreview(a),h["default"].bindFrame(t)}},{key:"getResizeFrame",value:function(){return h["default"].getFrame()}},{key:"removeResizeFrame",value:function(){h["default"].removeFrame()}},{key:"convertToBase64",value:function(e){var t=1,a=1e7,r="";e>a&&(t=Math.floor(a/e));var i=this.getData();return this.setData(i),r=this.$canvas.toDataURL(null,t),r.substring(r.indexOf(",")+1)}}]),e}()},/*!******************************!*\
  !*** ./src/core/adjuster.js ***!
  \******************************/
function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),i=function(){function e(){a(this,e),this.defaultDegree=0,this.options=["r","g","b"]}return r(e,[{key:"checkOpts",value:function(e){var t=Object.keys(e);return this.options.every(function(e){return t.indexOf(e)!==-1})}},{key:"brightness",value:function(e,t){var a=parseInt(t||this.defaultDegree,10);return a=Math.floor(255*(a/250)),this.checkOpts(e)&&(e.r+=a,e.g+=a,e.b+=a),e}},{key:"saturation",value:function(e,t){var a=parseInt(t||this.defaultDegree,10);if(this.checkOpts(e)){var r=Math.max(e.r,e.g,e.b);e.r+=e.r!==r?(r-e.r)*(a/50):0,e.g+=e.g!==r?(r-e.g)*(a/50):0,e.b+=e.b!==r?(r-e.b)*(a/50):0}return e}},{key:"contrast",value:function(e,t){var a=parseInt(t||this.defaultDegree,10);return a=Math.pow((a+100)/100,2),this.checkOpts(e)&&(e.r/=255,e.r-=.5,e.r*=a,e.r+=.5,e.r*=255,e.g/=255,e.g-=.5,e.g*=a,e.g+=.5,e.g*=255,e.b/=255,e.b-=.5,e.b*=a,e.b+=.5,e.b*=255),e}},{key:"sepia",value:function(e,t){var a=parseInt(t||this.defaultDegree,10)/100;return this.checkOpts(e)&&(e.r=Math.min(255,e.r*(1-.607*a)+e.g*(.769*a)+e.b*(.189*a)),e.g=Math.min(255,e.r*(.349*a)+e.g*(1-.314*a)+e.b*(.168*a)),e.b=Math.min(255,e.r*(.272*a)+e.g*(.534*a)+e.b*(1-.869*a))),e}},{key:"noise",value:function(e,t){var a=parseInt(t||this.defaultDegree,10),r=function(e,t){var a=e+Math.random()*(t-e);return Math.round(a)/50};if(a=255*Math.abs(a),this.checkOpts(e)){var i=r(a*-1,a);e.r+=i,e.g+=i,e.b+=i}return e}},{key:"greyscale",value:function(e){if(this.checkOpts(e)){var t=.299*e.r+.587*e.g+.114*e.b;e.r=t,e.g=t,e.b=t}return e}}]),e}();t["default"]=new i},/*!****************************!*\
  !*** ./src/core/filter.js ***!
  \****************************/
function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),o=a(/*! ./layer */3),l=r(o),s=function(){function e(){i(this,e),this.options=["r","g","b"]}return n(e,[{key:"checkOpts",value:function(e){var t=Object.keys(e);return this.options.every(function(e){return t.indexOf(e)!==-1})}},{key:"bindUtil",value:function(e){this.util=e}},{key:"newLayer",value:function(e){this.canvas=e,this.layer=new l["default"](e,"newFilter").layer}},{key:"renderLayer",value:function(){this.canvas.getContext("2d").drawImage(this.layer,0,0),console.log("render Filter ... is OK!")}},{key:"moon",value:function(){this.util.processPixel("greyscale")}},{key:"toaster",value:function(){this.util.processPixel("brightness",40),this.util.processPixel("contrast",25);var e=this.layer.getContext("2d"),t=this.layer.width,a=this.layer.height,r=t/2,i=a/2,n=(t>a?t:a)/10,o=t/2,l=a/2,s=(t>a?t:a)/2,c=e.createRadialGradient(r,i,n,o,l,s);c.addColorStop(0,"rgba(255, 226, 114, .3)"),c.addColorStop(1,"rgba(172, 70, 186, .3)"),e.fillStyle=c,e.fillRect(0,0,t,a)}},{key:"_1977",value:function(){this.util.processPixel("brightness",20),this.util.processPixel("saturation",-10),this.util.processPixel("contrast",20);var e=this.layer.getContext("2d"),t=this.layer.width,a=this.layer.height,r=t/2,i=a/2,n=(t>a?t:a)/2,o=e.createRadialGradient(r,i,n,0,0,0);o.addColorStop(0,"rgba(172, 70, 186, .2)"),e.fillStyle=o,e.fillRect(0,0,t,a)}},{key:"aden",value:function(){this.util.processPixel("brightness",10),this.util.processPixel("saturation",15),this.util.processPixel("contrast",10);var e=this.layer.getContext("2d"),t=this.layer.width,a=this.layer.height,r=t/2,i=a/2,n=(t>a?t:a)/5,o=t/2,l=a/2,s=(t>a?t:a)/2,c=e.createRadialGradient(r,i,n,o,l,s);c.addColorStop(0,"rgba(96, 10, 14, .12)"),c.addColorStop(1,"transparent"),e.fillStyle=c,e.fillRect(0,0,t,a)}},{key:"earlybird",value:function(){this.util.processPixel("saturation",-20),this.util.processPixel("sepia",10);var e=this.layer.getContext("2d"),t=this.layer.width,a=this.layer.height,r=t/2,i=a/2,n=(t>a?t:a)/5,o=t/2,l=a/2,s=(t>a?t:a)/2,c=e.createRadialGradient(r,i,n,o,l,s);c.addColorStop(0,"rgba(208, 186, 142, .15)"),c.addColorStop(1,"rgba(54, 3, 9, .2)"),e.fillStyle=c,e.fillRect(0,0,t,a)}},{key:"walden",value:function(){this.util.processPixel("brightness",25),this.util.processPixel("saturation",-5),this.util.processPixel("sepia",6);var e=this.layer.getContext("2d"),t=this.layer.width,a=this.layer.height,r=t/2,i=a/2,n=(t>a?t:a)/2,o=e.createRadialGradient(r,i,n,0,0,0);o.addColorStop(0,"rgba(20, 68, 204, .1)"),e.fillStyle=o,e.fillRect(0,0,t,a)}},{key:"xpro2",value:function(){this.util.processPixel("contrast",10);var e=this.layer.getContext("2d"),t=this.layer.width,a=this.layer.height,r=t/2,i=a/2,n=(t>a?t:a)/6,o=t/2,l=a/2,s=(t>a?t:a)/2,c=e.createRadialGradient(r,i,n,o,l,s);c.addColorStop(0,"rgba(230, 231, 224, .2)"),c.addColorStop(1,"rgba(13, 27, 86, .4)"),e.fillStyle=c,e.fillRect(0,0,t,a)}},{key:"lofi",value:function(){this.util.processPixel("saturation",5),this.util.processPixel("contrast",20);var e=this.layer.getContext("2d"),t=this.layer.width,a=this.layer.height,r=t/2,i=a/2,n=(t>a?t:a)/3,o=t/2,l=a/2,s=(t>a?t:a)/2,c=e.createRadialGradient(r,i,n,o,l,s);c.addColorStop(0,"transparent"),c.addColorStop(1,"rgba(34, 34, 34, .2)"),e.fillStyle=c,e.fillRect(0,0,t,a)}}]),e}();t["default"]=new s},/*!***************************!*\
  !*** ./src/core/layer.js ***!
  \***************************/
function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),i=function(){function e(t,r){a(this,e),this.canvas=t,this.id=r,this.layer=this["new"](r)}return r(e,[{key:"new",value:function(e){var t=this.canvas,a=t.width,r=t.height,i=t.style.top,n=t.style.left,o=document.createElement("canvas");return o.id=e,o.width=a,o.height=r,o.style.position="absolute",o.style.top=i,o.style.left=n,o}},{key:"clear",value:function(){if(document.querySelector("#"+this.id)){var e=document.querySelector("#"+this.id),t=document.querySelector("#overlay"),a=e.parentNode;a.removeChild(e),t&&a.removeChild(t)}}},{key:"addFrame",value:function(e){this.clear();var t=this.layer.width,a=this.layer.height,r=this.layer.style,i=parseFloat(r.top.replace("px","")),n=parseFloat(r.left.replace("px",""));switch(e.name){case"1:1":case"4:3":case"3:4":var o=e.x,l=e.y,s=t/a,c=o/l;if(s<c)this.layer.width=t,this.layer.height=t/o*l;else if(s>c)this.layer.height=a,this.layer.width=a/l*o;else{var u=t<a?t:a;this.layer.width=u,this.layer.height=u}break;case"自定义":}return r.top=i+(a-this.layer.height)/2+"px",r.left=n+(t-this.layer.width)/2+"px",this.drawCropImage(this.layer,{originW:t,originH:a,cropW:this.layer.width,cropH:this.layer.height}),this.drawFrameLine(this.layer),this.addOverlay(t,a),this.canvas.parentNode.appendChild(this.layer),{layer:this.layer,originW:t,originH:a,cropW:this.layer.width,cropH:this.layer.height}}},{key:"drawCropImage",value:function(e,t){var a=e.getContext("2d"),r=this.canvas.getContext("2d"),i=t.x||(t.originW-t.cropW)/2,n=t.y||(t.originH-t.cropH)/2,o=r.getImageData(i,n,t.originW,t.originH);a.clearRect(0,0,t.cropW,t.cropH),a.putImageData(o,0,0)}},{key:"drawFrameLine",value:function(e){var t=e.getContext("2d"),a=e.width,r=e.height;t.strokeStyle="rgba(255, 255, 255, .5)",t.lineWidth=1,t.strokeRect(0,r/3,a,r/3),t.strokeRect(a/3,0,a/3,r),t.strokeStyle="#FFF",t.lineWidth=5,t.strokeRect(0,0,a,r);var i=10;t.fillStyle="#FFF",t.fillRect(0,0,i,i),t.fillRect(a-i,0,i,i),t.fillRect(a-i,r-i,i,i),t.fillRect(0,r-i,i,i)}},{key:"addOverlay",value:function(e,t){if(!document.querySelector("#overlay")){this.overlay=this["new"]("overlay");var a=this.overlay.getContext("2d");a.fillStyle="rgba(0, 0, 0, .7)",a.fillRect(0,0,e,t),this.canvas.parentNode.appendChild(this.overlay)}}}]),e}();t["default"]=i},/*!****************************!*\
  !*** ./src/core/resize.js ***!
  \****************************/
function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),o=a(/*! ./layer */3),l=r(o),s=function(){function e(){i(this,e)}return n(e,[{key:"bindUtil",value:function(e){this.util=e}},{key:"cropImage",value:function(e,t){var a=e.getContext("2d"),r=parseInt(e.style.top.replace("px","")),i=parseInt(e.style.left.replace("px","")),n=e.width,o=e.height,l=t.x,s=t.y,c=t.w,u=t.h,h=a.getImageData(l,s,c,u);a.putImageData(h,0,0),e.width=c,e.height=u,e.style.left=i+(n-c)/2+"px",e.style.top=r+(o-u)/2+"px"}},{key:"newFrame",value:function(e,t){this.canvas=e,this.Layer=new l["default"](e,"newFrame"),this.layerInfo=this.Layer.addFrame(t)}},{key:"removeFrame",value:function(){this.Layer&&this.Layer.clear()}},{key:"bindFrame",value:function(e){function t(e,t,a){return e>a&&e<o-a&&t>a&&t<l-a}var a=this,r=this.layerInfo.layer,i=this.layerInfo.originW,n=this.layerInfo.originH,o=this.layerInfo.cropW,l=this.layerInfo.cropH,s=!1,c={};r.addEventListener("mousedown",function(e){var a=e.layerX,r=e.layerY,i=(e.target||e.srcElement,10);t(a,r,i)&&(s=!0,c.dragX=a,c.dragY=r)},!1),r.addEventListener("mousemove",function(e){var u=e.layerX,h=e.layerY,d=10,f=r.style,y=a.canvas.style,p=parseFloat(f.top.replace("px",""))||0,g=parseFloat(f.left.replace("px",""))||0,v=parseFloat(y.top.replace("px",""))||0,m=parseFloat(y.left.replace("px",""))||0;if(t(u,h,d)&&s){c.moveX=u,c.moveY=h;var b=g+(c.moveX-c.dragX),w=p+(c.moveY-c.dragY),x=m,k=v,C=m+i-o,I=v+n-l,D=w>=k&&w<=I?w:p,F=b>=x&&b<=C?b:g;r.style.top=D+"px",r.style.left=F+"px",a.dx=F-m<0?0:F-m,a.dy=D-v<0?0:D-v,a.Layer.drawCropImage(r,{originH:n,originW:i,cropH:l,cropW:o,x:a.dx,y:a.dy}),a.Layer.drawFrameLine(r),a.setPreview(a.$preview,a.dx,a.dy)}},!1),r.addEventListener("mouseup",function(e){var a=e.layerX,r=e.layerY,i=10;s=!1,t(a,r,i)&&console.log("dropping",a,r)},!1)}},{key:"getFrame",value:function(){if(this.cropImageData){var e=this.canvas.width,t=this.canvas.height,a=this.canvas.style,r=parseFloat(a.top.replace("px","")),i=parseFloat(a.left.replace("px","")),n=this.cropImageData.width,o=this.cropImageData.height,l=this.canvas.getContext("2d");this.canvas.width=n,this.canvas.height=o,l.putImageData(this.cropImageData,0,0),a.top=r+(t-o)/2+"px",a.left=i+(e-n)/2+"px",this.removeFrame()}return this.resizeConfig||{}}},{key:"setPreview",value:function(e,t,a){var r=this.canvas.getContext("2d"),i=e.getContext("2d"),n=(e.width,this.layerInfo.cropW),o=this.layerInfo.cropH;t=t||(this.layerInfo.originW-n)/2,a=a||(this.layerInfo.originH-o)/2,this.$preview=e,this.resizeConfig={x:t,y:a,w:n,h:o},this.cropImageData=r.getImageData(t,a,n,o),e.width=224,e.height=e.width/n*o;var l=document.createElement("canvas"),s=l.getContext("2d");l.width=n,l.height=o,s.putImageData(this.cropImageData,0,0);var c=new Image,u=l.toDataURL();c.src=u,i.drawImage(c,0,0,e.width,e.height)}}]),e}();t["default"]=new s}])});
//# sourceMappingURL=plotit.js.map