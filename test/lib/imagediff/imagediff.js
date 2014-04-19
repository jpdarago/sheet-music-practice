// js-imagediff 1.0.3
// (c) 2011-2012 Carl Sutherland, Humble Software
// Distributed under the MIT License
// For original source and documentation visit:
// http://www.github.com/HumbleSoftware/js-imagediff

(function(e,t){var n=this;if(typeof module!="undefined"){try{var r=require("canvas")}catch(i){throw new Error(i.message+"\n"+"Please see https://github.com/HumbleSoftware/js-imagediff#cannot-find-module-canvas\n")}module.exports=t(n,e,r)}else typeof define=="function"&&typeof define.amd=="object"?define(t):n[e]=t(n,e)})("imagediff",function(e,t,n){function d(e,t){var r=n?new n:document.createElement("canvas");return e&&(r.width=e),t&&(r.height=t),r}function v(e,t){return f.width=e,f.height=t,l.clearRect(0,0,e,t),l.createImageData(e,t)}function m(e){return E(e,o)}function g(e){return E(e,i)}function y(e){return E(e,s)}function b(e){return!!e&&!!E(e,u)&&typeof e.width!==a&&typeof e.height!==a&&typeof e.data!==a}function w(e){return m(e)||g(e)||y(e)||b(e)}function E(e,t){return typeof e=="object"&&!!Object.prototype.toString.apply(e).match(t)}function S(e){var t=e.height,n=e.width,r=e.data,i,s,o;f.width=n,f.height=t,i=l.getImageData(0,0,n,t),s=i.data;for(o=e.data.length;o--;)s[o]=r[o];return i}function x(e){if(m(e))return T(e);if(g(e))return N(e);if(y(e))return C(e);if(b(e))return e}function T(e){var t=e.height,n=e.width;return f.width=n,f.height=t,l.clearRect(0,0,n,t),l.drawImage(e,0,0),l.getImageData(0,0,n,t)}function N(e){var t=e.height,n=e.width,r=e.getContext("2d");return r.getImageData(0,0,n,t)}function C(e){var t=e.canvas,n=t.height,r=t.width;return e.getImageData(0,0,r,n)}function k(e){var t=x(e),n=d(t.width,t.height),r=n.getContext("2d");return r.putImageData(t,0,0),n}function L(e,t){return e.width===t.width}function A(e,t){return e.height===t.height}function O(e,t){return A(e,t)&&L(e,t)}function M(e,t,n){var r=e.data,i=t.data,s=r.length,o;n=n||0;if(!O(e,t))return!1;for(o=s;o--;)if(r[o]!==i[o]&&Math.abs(r[o]-i[o])>n)return!1;return!0}function _(e,t,n){return(O(e,t)?D:P)(e,t,n)}function D(e,t,n){var r=e.height,i=e.width,s=v(i,r),o=e.data,u=t.data,a=s.data,f=a.length,l,c,h,p,d,m;for(h=0;h<f;h+=4)a[h]=Math.abs(o[h]-u[h]),a[h+1]=Math.abs(o[h+1]-u[h+1]),a[h+2]=Math.abs(o[h+2]-u[h+2]),a[h+3]=Math.abs(255-Math.abs(o[h+3]-u[h+3]));return s}function P(e,t,n){function b(e){f==="top"?(l=0,c=0):(l=Math.floor((r-e.height)/2),c=Math.floor((i-e.width)/2))}var r=Math.max(e.height,t.height),i=Math.max(e.width,t.width),s=v(i,r),o=e.data,u=t.data,a=s.data,f=n&&n.align,l,c,h,p,d,m,g,y;for(d=a.length-1;d>0;d-=4)a[d]=255;b(e);for(h=e.height;h--;)for(p=e.width;p--;)d=4*((h+l)*i+(p+c)),m=4*(h*e.width+p),a[d+0]=o[m+0],a[d+1]=o[m+1],a[d+2]=o[m+2];b(t);for(h=t.height;h--;)for(p=t.width;p--;)d=4*((h+l)*i+(p+c)),m=4*(h*t.width+p),a[d+0]=Math.abs(a[d+0]-u[m+0]),a[d+1]=Math.abs(a[d+1]-u[m+1]),a[d+2]=Math.abs(a[d+2]-u[m+2]);return s}function H(){var e;for(e=0;e<arguments.length;e++)if(!w(arguments[e]))throw{name:"ImageTypeError",message:"Submitted object was not an image."}}function B(e,t){return e=document.createElement(e),e&&t&&(e.innerHTML=t),e}function j(e,t,n){var r=k(e),i,s;n=n||Function,i=r.toDataURL().replace(/^data:image\/\w+;base64,/,""),s=new Buffer(i,"base64"),require("fs").writeFile(t,s,n)}var r=/\[object Array\]/i,i=/\[object (Canvas|HTMLCanvasElement)\]/i,s=/\[object CanvasRenderingContext2D\]/i,o=/\[object (Image|HTMLImageElement)\]/i,u=/\[object ImageData\]/i,a="undefined",f=d(),l=f.getContext("2d"),c=e[t],h,p;return p={toBeImageData:function(){return h.isImageData(this.actual)},toImageDiffEqual:function(e,t){return typeof document!==a&&(this.message=function(){var t=B("div"),n=B("div","<div>Actual:</div>"),r=B("div","<div>Expected:</div>"),i=B("div","<div>Diff:</div>"),s=h.diff(this.actual,e),o=d(),u;return o.height=s.height,o.width=s.width,t.style.overflow="hidden",n.style.float="left",r.style.float="left",i.style.float="left",u=o.getContext("2d"),u.putImageData(s,0,0),n.appendChild(k(this.actual)),r.appendChild(k(e)),i.appendChild(o),t.appendChild(n),t.appendChild(r),t.appendChild(i),[t,"Expected not to be equal."]}),h.equal(this.actual,e,t)}},h={createCanvas:d,createImageData:v,isImage:m,isCanvas:g,isContext:y,isImageData:b,isImageType:w,toImageData:function(e){return H(e),b(e)?S(e):x(e)},equal:function(e,t,n){return H(e,t),e=x(e),t=x(t),M(e,t,n)},diff:function(e,t,n){return H(e,t),e=x(e),t=x(t),_(e,t,n)},jasmine:p,noConflict:function(){return e[t]=c,h}},typeof module!="undefined"&&(h.imageDataToPNG=j),h})