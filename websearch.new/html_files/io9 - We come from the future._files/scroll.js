(function(){var e,aa='function'==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ba;if('function'==typeof Object.setPrototypeOf)ba=Object.setPrototypeOf;else{var ca;a:{var da={da:!0},ea={};try{ea.__proto__=da;ca=ea.da;break a}catch(a){}ca=!1}ba=ca?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+' is not extensible');return a}:null}var fa=ba;
function h(a,b){a.prototype=aa(b.prototype);a.prototype.constructor=a;if(fa)fa(a,b);else for(var c in b)if('prototype'!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.ha=b.prototype}var ha='function'==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},l='undefined'!=typeof window&&window===this?this:'undefined'!=typeof global&&null!=global?global:this;
function ia(){ia=function(){};l.Symbol||(l.Symbol=ja)}var ja=function(){var a=0;return function(b){return'jscomp_symbol_'+(b||'')+a++}}();function ka(){ia();var a=l.Symbol.iterator;a||(a=l.Symbol.iterator=l.Symbol('iterator'));'function'!=typeof Array.prototype[a]&&ha(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return la(this)}});ka=function(){}}function la(a){var b=0;return ma(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}
function ma(a){ka();a={next:a};a[l.Symbol.iterator]=function(){return this};return a}function na(a){ka();var b=a[Symbol.iterator];return b?b.call(a):la(a)}for(var m=l,n=['Promise'],oa=0;oa<n.length-1;oa++){var pa=n[oa];pa in m||(m[pa]={});m=m[pa]}
var qa=n[n.length-1],ra=m[qa],sa=function(){function a(a){this.a=0;this.i=void 0;this.b=[];var b=this.g();try{a(b.resolve,b.reject)}catch(x){b.reject(x)}}function b(){this.a=null}function c(b){return b instanceof a?b:new a(function(a){a(b)})}if(ra)return ra;b.prototype.b=function(a){this.a||(this.a=[],this.h());this.a.push(a)};b.prototype.h=function(){var a=this;this.g(function(){a.l()})};var d=l.setTimeout;b.prototype.g=function(a){d(a,0)};b.prototype.l=function(){for(;this.a&&this.a.length;){var a=
this.a;this.a=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(y){this.i(y)}}}this.a=null};b.prototype.i=function(a){this.g(function(){throw a;})};a.prototype.g=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;return{resolve:a(this.D),reject:a(this.h)}};a.prototype.D=function(b){if(b===this)this.h(new TypeError('A Promise cannot resolve to itself'));else if(b instanceof a)this.J(b);else{a:switch(typeof b){case 'object':var c=null!=b;break a;case 'function':c=
!0;break a;default:c=!1}c?this.F(b):this.l(b)}};a.prototype.F=function(a){var b=void 0;try{b=a.then}catch(x){this.h(x);return}'function'==typeof b?this.K(b,a):this.l(a)};a.prototype.h=function(a){this.m(2,a)};a.prototype.l=function(a){this.m(1,a)};a.prototype.m=function(a,b){if(0!=this.a)throw Error('Cannot settle('+a+', '+b|'): Promise already settled in state'+this.a);this.a=a;this.i=b;this.u()};a.prototype.u=function(){if(this.b){for(var a=this.b,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.b=
null}};var f=new b;a.prototype.J=function(a){var b=this.g();a.P(b.resolve,b.reject)};a.prototype.K=function(a,b){var c=this.g();try{a.call(b,c.resolve,c.reject)}catch(y){c.reject(y)}};a.prototype.then=function(b,c){function d(a,b){return'function'==typeof a?function(b){try{g(a(b))}catch(Jb){f(Jb)}}:b}var g,f,k=new a(function(a,b){g=a;f=b});this.P(d(b,g),d(c,f));return k};a.prototype['catch']=function(a){return this.then(void 0,a)};a.prototype.P=function(a,b){function c(){switch(d.a){case 1:a(d.i);
break;case 2:b(d.i);break;default:throw Error('Unexpected state: '+d.a);}}var d=this;this.b?this.b.push(function(){f.b(c)}):f.b(c)};a.resolve=c;a.reject=function(b){return new a(function(a,c){c(b)})};a.race=function(b){return new a(function(a,d){for(var f=na(b),g=f.next();!g.done;g=f.next())c(g.value).P(a,d)})};a.all=function(b){var d=na(b),f=d.next();return f.done?c([]):new a(function(a,b){function g(b){return function(c){k[b]=c;y--;0==y&&a(k)}}var k=[],y=0;do k.push(void 0),y++,c(f.value).P(g(k.length-
1),b),f=d.next();while(!f.done)})};return a}();sa!=ra&&null!=sa&&ha(m,qa,{configurable:!0,writable:!0,value:sa});function ta(a){return'https://'+(a?a+'.':'')+'scroll.com'}var p=ta(),q=ta('connect'),ua=q+'/embed/scrollbar';function va(){return fetch('https://block.scroll.com/check.json').then(function(){return!1})['catch'](function(a){return'Resource blocked by content blocker'===a.message})};function wa(a){var b=document.cookie.split('; '),c=b.length,d;for(d=0;d<c;d++){var f=b[d].split('=');if(f[0]===a)return f[1]}return null};function r(a,b){for(var c=a.length,d=0;d<c;d++)if(b(a[d]))return!0;return!1}function t(a,b){if(u(Array.isArray)?Array.isArray(a):'[object Array]'===a.toString())for(var c=a.length,d=0;d<c;d++)b(a[d],d);else for(c in a)a.hasOwnProperty(c)&&b(a[c],c)}function xa(a,b){var c=[];t(a,function(a){b(a)&&c.push(a)});return c}function ya(a,b){for(var c=a.length,d=0;d<c;d++)if(b(a[d]))return a[d];return null}function u(a){return'function'===typeof a}function za(a){if(u(a))try{a()}catch(b){}}
function Aa(a){var b=!1;return function(){b||(a.apply(null,arguments),b=!0,setTimeout(function(){b=!1},100))}}function Ba(a){function b(){c&&clearTimeout(c);d=arguments;c=setTimeout(function(){a.apply(null,d)},100)}var c=null,d=null;b.a=function(){c&&clearTimeout(c);a.apply(null,d)};return b}function v(a,b){return u(a.bind)?a.bind(b):function(){return a.apply(b,Array.prototype.slice.call(arguments))}}
function w(a,b){if('function'===typeof Object.assign)return Object.assign.apply(Object,arguments);for(var c=Object(a),d=arguments.length,f=1;f<d;f++){var g=arguments[f];if(null!==g)for(var k in g)Object.prototype.hasOwnProperty.call(g,k)&&(c[k]=g[k])}return c}function z(a,b){var c=1;b&&(b=window.setTimeout(function(){c=-1;a()},b));return function(){if(0===--c)return b&&window.clearTimeout(b),a.apply(this,arguments)}}
function Ca(a,b,c){var d=a[b];a[b]=function(b){for(var f=[],k=0;k<arguments.length;++k)f[k-0]=arguments[k];d.apply(a,f);c.apply(null,f)}};function Da(a){var b='';t(a,function(a,d){b+=d+':'+a+';'});return b};function A(a){return Array.prototype.slice.call(document.getElementsByTagName(a))}function B(a,b){var c=Da(b);a.setAttribute('style',c)}function Ea(a){var b='';'getComputedStyle'in window&&(a=window.getComputedStyle(a)||{},a.getPropertyValue&&(b=(a.getPropertyValue('position')||'').toLowerCase()));return b}function C(a,b){(b||document.body).appendChild(a)}function D(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent('on'+b,c)}
function Fa(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent('on'+b,c)}function Ga(a,b,c){function d(){f.style.visibility='visible';f.style.display='block';Fa(f,'load',d);c&&c()}var f=document.createElement('iframe');f.setAttribute('frameBorder','0');f.setAttribute('allowtransparency','true');var g={};g=Da((g.display='none',g.visibility='hidden',g));b=Da(b);f.style.cssText=g+b;D(f,'load',d);f.src=a;C(f);return f}
function Ha(a){return ya(A('iframe'),function(b){return b.contentWindow===a})}function Ia(){var a=Ja;'complete'===document.readyState||'loading'!==document.readyState&&!document.documentElement.doScroll?a():(a=z(a),D(document,'DOMContentLoaded',a),D(window,'load',a))}function Ka(a){'MutationObserver'in window&&(new MutationObserver(function(b){t(b,function(b){t(b.addedNodes,function(b){'VIDEO'===b.tagName&&a(b)})})})).observe(document.body,{childList:!0,subtree:!0})}
function La(a,b){if('MutationObserver'in window){var c=new MutationObserver(function(c){t(c,function(c){ya(c.removedNodes,function(b){return b===a})&&b()})});c.observe(a.parentNode,{childList:!0});return c}return null};var Ma=/(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;function E(a,b){var c=a.indexOf('#'),d=''+(-1<a.indexOf('?')?'&':'?')+b;return-1===c?''+a+d:''+a.substring(0,c)+d+a.substring(c)}function F(a){var b=[];t(a,function(a,d){null!==a&&void 0!==a&&b.push(d+'='+encodeURIComponent(a))});return b.join('&')}
function Na(a,b){if(-1===a.indexOf('?'))return a;var c=a.split('?');b=-1<b.indexOf('=')?b:b+'=';var d=xa(c[1].split('&'),function(a){return-1===a.indexOf(b)}).join('&');return d?c[0]+'?'+d:c[0]}function Oa(a){var b=void 0===b?window.history.state:b;var c=void 0===c?document.title:c;window.history.replaceState(b,c,a)}function Pa(a){a=(new RegExp('[?&]'+a+'=([^&#]*)')).exec(G());return!a||2>a.length||0===a[1].length?null:decodeURIComponent(a[1])}
function Qa(){if(!document.querySelector)return null;var a=document.querySelector('link[rel="canonical"]');return(a=a?a.getAttribute('href'):null)&&Ma.test(a)&&('URL'in window?(new URL(a)).hostname===window.location.hostname:0<=a.indexOf(window.location.hostname))?a:(a=(a=document.querySelector('meta[property="og:url"]'))?a.getAttribute('content'):null)&&Ma.test(a)?a:null}function G(){return window.location.href}function Ra(){var a={};a.o=G();a.c=Qa();return a}
function Sa(a){var b=Ra(),c=b.o;1E3<c.length&&(b.o=c.split('?')[0]);b.c=b.c||'';return E(a,F(b))};function H(a,b,c){return new Promise(function(d,f){var g=new XMLHttpRequest;g.withCredentials=!0;g.onreadystatechange=function(){if(g.readyState===XMLHttpRequest.DONE){var a=g.status;1223===a&&(a=204);if(200!==a&&204!==a)f(a);else{try{var b=JSON.parse(g.responseText)}catch(vc){}d(null!==b&&'object'===typeof b?b:{})}}};var k=''+q+a,x=c?''+F(c):'';'GET'===b?(g.open(b,k+(x?'?'+x:'')),g.send()):(g.open(b,k),g.setRequestHeader('Content-type','application/x-www-form-urlencoded'),g.send(x))})};function Ta(a,b){this._scrmp=a;this._scrmd=b}function Ua(a,b){if(null!==a&&'object'===typeof a&&'string'===typeof a._scrmp){var c=a._scrmp,d=a._scrmd;b(c,'string'===typeof d||'boolean'===typeof d?d:'')}};var I=null;function Va(a){t(I,function(b){b(a)})}function Wa(a,b,c){return function(d){var f='*'===b||d.origin===b;a&&d.source!==a||!f||Ua(d.data,function(a,b){c(a,b,d.source,d.origin)})}}function J(a,b,c){null===I&&(I=[],D(window,'message',Va));a=Wa(a,b,c);I.push(a);return a}function Xa(a){I=xa(I,function(b){return b!==a})}function K(a,b,c,d){'postMessage'in a&&a.postMessage(new Ta(c,d),b)};function L(a,b){var c=this;this.b=a;this.h=b;this.a={};this.g=J(a,b,function(a,b){var d=c.a[a];d&&t(d,function(a){a(b)})})}function M(a,b,c){a.a[b]=a.a[b]||[];a.a[b].push(c)}L.prototype.write=function(a,b){K(this.b,this.h,a,b)};L.prototype.source=function(){return this.b};function Ya(a){Xa(a.g);a.b=null;a.a={};a.g=null};function Za(a){J(null,'*',function(b,c,d,f){'ha'===b&&(K(d,'*','ha'),a(new L(d,f)))});t(A('iframe'),function(a){K(a.contentWindow,'*','hi')})}function $a(a){var b=J(window.parent,'*',function(c,d,f,g){'ha'===c&&(Xa(b),a(new L(f,g)));'hi'===c&&K(window.parent,'*','ha')});K(window.parent,'*','ha')};function N(){this.D=0;this.U=this.K=null}N.prototype.G=function(){this.D=O(this);this.K=this.j()?(new Date).getTime():null};function O(a){if(null===a.K)var b=0;else b=(new Date).getTime()-a.K,b=a.U?Math.min(b,a.U):b;return a.D+b}N.prototype.R=function(){this.D=0};function P(){this.a=void 0;this.b=[]}P.prototype.get=function(){var a=this;return this.a?Promise.resolve(this.a):new Promise(function(b){a.b.push(b)})};P.prototype.set=function(a){this.a=a;t(this.b,function(b){b(a)});this.b=[]};var ab=null;function Q(){return window!==window.top};function bb(){return wa('scroll0')||Pa('scroll0')}function cb(){var a={};return w(Ra(),(a.e=bb(),a))};function R(a){this.g=v(this.a,this);this.b=v(this.m,this);this.l=v(this.u,this);this.h=a;this.i=H('/embed/check','POST',this.h).then(this.g,this.l)}R.prototype.a=function(a){var b=a.c;b&&(document.cookie=b);var c=void 0===c?window.location.search:c;/[?&]scroll0/.test(c)&&(b=G(),b=Na(b,'scroll0'),Oa(b));return Promise.resolve(a)};R.prototype.m=function(a){return Promise.reject(a)};R.prototype.u=function(a){return 502!==a?this.b(a):H('/embed/check','POST',this.h).then(this.g,this.b)};function db(a){this.g=a;this.b=!0;this.a=null}db.prototype.call=function(a){var b=this,c=arguments;if(this.b)this.a=function(){return b.g.apply(b,c)};else return this.g.apply(this,c)};function eb(a,b){var c=this,d={};this.g=Ga(a,w((d.padding='0',d.width='100%',d.height='100%',d.position='fixed',d.top='0',d.left='0',d['margin-top']='0',d['z-index']='2147483647',d),b||{}));this.a=new L(this.g.contentWindow,p);this.h=!0;this.b=null;M(this.a,'id',function(){c.b&&(c.b(),c.b=null);document.body.removeChild(c.g);Ya(c.a);c.g=null;c.a=null;c.h=!1})}eb.prototype.j=function(){return this.h};function fb(a){var b=gb();if(b._i)return!0;w(b,a);hb('detected',null);hb('autopage',!1);ib();b._i=!0;return!1}function gb(){return window.Scroll||(window.Scroll={})}function jb(){var a=gb();return a.config||(a.config={})}function ib(){if(window.Scroll){for(var a=window.Scroll,b=a._q||[],c;c=b.shift();)za(c);a['do']=function(a){za(a)}}}function hb(a,b){var c=jb();void 0===c[a]&&(c[a]=b)};function kb(a){jb().autopage?window.history&&'pushState'in window.history&&(D(window,'popstate',a),Ca(window.history,'pushState',a),Ca(window.history,'replaceState',a)):Ca(gb(),'virtualPage',a)};var lb,mb;r(['','ms','webkit'],function(a){var b=a+'Hidden';b=b.charAt(0).toLowerCase()+b.slice(1);if('boolean'===typeof document[b])return lb=b,mb=a+'visibilitychange',!0});function S(a,b,c){this.D=a;this.a=b;this.F=c;this.h=null;this.b=15;this.u=v(this.fa,this);this.m=v(this.Y,this);this.l=v(this.X,this);this.i=0;this.g=1;this.a.log('v: '+a);T(this)}function T(a){a.g=1;a.h&&window.clearTimeout(a.h);a.h=window.setTimeout(a.u,1E3*a.b)}e=S.prototype;e.Z=function(){var a={};a.v=this.D;a.s=Math.floor(O(this.a)/1E3);return w(a,Ra())};e.fa=function(){var a=O(this.a);a!==this.i&&(this.i=a,a=this.Z(),H('/embed/ping','POST',a).then(this.m,this.l));T(this)};
e.Y=function(a){this.j()&&(a.ve?nb(this):15!==this.b&&(this.b=15,T(this)))};e.X=function(){if(this.j()){this.i=0;var a=Math.min(480,15+Math.round((3*this.b-15)*Math.random()));this.b!==a&&(this.b=a,T(this))}};e.j=function(){return 1===this.g};function nb(a){window.clearTimeout(a.h);a.g=2;a.F().then(function(b){3!==a.g&&(a.D=b,a.a.log('v: '+b),a.a.R(),a.i=0,T(a))})}function ob(a){window.clearTimeout(a.h);a.g=3;a.a=null;a.F=null;a.u=null;a.m=null;a.l=null};function pb(){return wa('scroll1')}function qb(){var a={};a.t=pb();return a};function rb(){return'scroll2=1;expires='+(new Date((new Date).getTime()+6048E5)).toUTCString()+';'}function sb(){return wa('scroll2')?Promise.resolve('s'):0<=G().indexOf('scrollnoblockerrefresh=1')?(document.cookie=rb(),Promise.resolve('s')):va().then(function(a){return a?'y':'n'})};function tb(){return 0<=(Q()?document.referrer:G()).indexOf('_scrd=1')};function ub(a){if(tb()){this.b=a;this.a=document.createElement('div');var b=Q(),c={};B(this.a,(c.position=a?'absolute':'fixed',c[b?'bottom':'top']='0',c[b?'right':'left']='0',c.padding='3px 6px 6px 6px',c.background='#424242',c.color=b?'#FDD835':'#33e2d1',c['font-family']='monospace',c));C(this.a,a)}}ub.prototype.log=function(a){if(!tb())return function(){};var b=document.createElement('div'),c={};B(b,(c.margin='0',c));a&&(b.innerText=a);C(b,this.a);return function(a){b.innerText=a}};function U(a){R.apply(this,arguments)}h(U,R);function vb(){return(new U(wb())).i}function wb(){var a={},b={};var c={};c.r=document.referrer;c.vr='scrolljs-20190124.1938';c=w(c,cb());return w(c,(a.d=!0===jb().detected,a),qb(),(b.ct=Pa('scrolltoken'),b))}U.prototype.a=function(a){var b=a.t;b&&(document.cookie=b);return R.prototype.a.call(this,a)};function xb(){var a=encodeURIComponent;var b=wb();b=E(q+'/embed/check',F(b));a=a(b);window.location.href=p+'/reportissue?url='+a};var yb={};function zb(a,b){var c=yb[a]||[];c.push(b);yb[a]=c}function Ab(a){t(yb[a]||[],function(a){a()})};function V(a){S.apply(this,arguments)}h(V,S);V.prototype.Z=function(){return w(S.prototype.Z.call(this),qb())};V.prototype.Y=function(a){var b=a.t;b&&(document.cookie=b);S.prototype.Y.call(this,a)};V.prototype.X=function(a){403===a?ob(this):S.prototype.X.call(this,a)};function Bb(a){U.apply(this,arguments)}h(Bb,U);function Cb(a){var b={};return w(wb(),(b.f=a,b))};function Db(a,b){this.title=a;this.B=b};function Eb(a){if(a=a.t)document.cookie=a}function Fb(){};function W(a){N.call(this);this.i=null;this.h=new P;this.V=!Q()||!!bb()||!!pb();this.m=null;this.ba=a;this.u=1;this.g=v(this.G,this);this.F=v(this.M,this);this.b=v(this.N,this);this.l=v(this.ea,this);this.$=v(this.ga,this)}h(W,N);e=W.prototype;e.A=function(){this.j()&&this.G();this.I()};e.G=function(){var a=this;N.prototype.G.call(this);Ab('va');1===this.u&&!this.i&&this.V&&(0<O(this)||this.j())&&this.$().then(function(b){a.i=new V(b,a,a.$)})};
e.M=function(){var a=new Db(this.title(),this.B());(null===a.title||null===a.B?0:a.title||a.B)&&!this.h.a&&this.h.set(a)};e.N=function(){this.i?nb(this.i):this.R()};e.ea=function(){this.ba(this)};
e.ga=function(){var a=this;if(2===this.u)return new Promise(function(){});this.u=2;var b=this.S()||'video';this.log('f: '+b);return(new Bb(Cb(b))).i.then(function(c){if(2!==a.u)return new Promise(function(){});a.u=3;var d=c.v;return d?(Gb(a).then(function(c){var f={v:d,f:b};f.vt=c.title;f.vi=c.B;H('/embed/video','POST',f).then(Eb,Fb);a.log('vt: '+c.title);a.log('vi: '+c.B)}),Promise.resolve(d)):Promise.reject()})};function Gb(a){a.M();return a.h.get()}
e.H=function(){var a=this;this.m=new ub(this.L());this.log('video');if(tb()){var b=this.L();if('static'===Ea(b)){var c={};B(b,(c.position='relative',c))}var d=this.m.log();this.aa=setInterval(function(){d('s: '+O(a))},50)}};e.log=function(a){this.m&&this.m.log(a)};e.R=function(){N.prototype.R.call(this);Ab('vr');var a=this.h;a.a=void 0;a.b=[];this.h=new P;this.M()};
e.C=function(){this.u=4;this.T();this.i&&(ob(this.i),this.i=null);var a=this.h;a.a=void 0;a.b=[];this.h=null;void 0!==this.aa&&window.clearInterval(this.aa);a=this.m;a.a&&(a.b||document.body).removeChild(a.a);a.b=null;this.l=this.b=this.F=this.g=this.ba=this.m=a.a=null};function X(){this.w=[];this.a=v(this.i,this);this.O=!1}X.prototype.j=function(){return r(this.w,function(a){return a.j()})};X.prototype.i=function(a){this.w=xa(this.w,function(b){return b!==a});a.C()};var Hb='play pause ended waiting playing seeking seeked stalled error suspend abort'.split(' '),Ib=['emptied'];function Kb(a,b){W.call(this,b);this.a=a;this.A();this.H()}h(Kb,W);e=Kb.prototype;e.I=function(){var a=this;t(Hb,function(b){a.a.on(b,a.g)});t(Ib,function(b){a.a.on(b,a.b)});this.a.on('dispose',this.l);this.a.on('loadstart',this.F)};e.T=function(){var a=this;t(Hb,function(b){a.a.off(b,a.g)});t(Ib,function(b){a.a.off(b,a.b)});this.a.off('dispose',this.l);this.a.off('loadstart',this.F)};
e.j=function(){return!this.a.paused()};e.L=function(){return this.a.contentEl()};e.S=function(){return this.a.currentSrc()};e.title=function(){return this.a.mediainfo?this.a.mediainfo.name||'':null};e.B=function(){return this.a.mediainfo?this.a.mediainfo.poster||'':null};e.C=function(){W.prototype.C.call(this);this.a=null};function Lb(){return'videojs'in window&&u(window.videojs)?window.videojs:null}function Mb(){X.call(this);this.g={};this.b=[];var a=Lb();if(a){var b=this;a.plugin('scroll',function(){b.h(this)})}}h(Mb,X);Mb.prototype.h=function(a){this.b.push(a)};function Nb(a,b){var c=b.id();a.g[c]||(a.w.push(new Kb(b,a.a)),a.g[c]=!0)}Mb.prototype.A=function(){for(var a=this,b;b=this.b.shift();)Nb(this,b);this.h=function(b){Nb(a,b)};if(b=Lb()){var c=b.getPlayers();t(c,function(b){Nb(a,b)})}this.O=null!==b};function Ob(a,b){W.call(this,b);this.a=a;this.ca=!1;this.J=this.W=null;this.V=!1;this.A();this.H()}h(Ob,W);e=Ob.prototype;e.I=function(){var a=this;M(this.a,'vc',function(b){a.V=!0!==b});M(this.a,'va',function(b){a.ca=!0===b;a.G()});M(this.a,'vt',function(b){a.W=b||'';a.M()});M(this.a,'vi',function(b){a.J=b||'';a.M()});M(this.a,'vr',this.b)};e.T=function(){Ya(this.a)};e.j=function(){return this.ca};e.L=function(){var a=Ha(this.a.source());return a&&a.parentElement};e.S=function(){return Ha(this.a.source()).getAttribute('src')};
e.title=function(){return this.W};e.B=function(){return this.J};e.N=function(){this.J=this.W=null;W.prototype.N.call(this)};e.C=function(){W.prototype.C.call(this);this.a=null};function Pb(a){X.apply(this,arguments)}h(Pb,X);Pb.prototype.A=function(){var a=this;Za(function(b){a.w.push(new Ob(b,a.a))});this.O=!0};var Qb='play pause buffer idle complete error'.split(' '),Rb=['playlist','playlistitem'];function Sb(a,b){W.call(this,b);this.a=a;this.A();this.H()}h(Sb,W);e=Sb.prototype;e.I=function(){var a=this;t(Qb,function(b){a.a.on(b,a.g)});t(Rb,function(b){a.a.on(b,a.b)});this.a.on('remove',this.l)};e.T=function(){var a=this;t(Qb,function(b){a.a.off(b,a.g)});t(Rb,function(b){a.a.off(b,a.b)});this.a.off('remove',this.l)};e.j=function(){return'playing'===this.a.getState()};e.L=function(){return this.a.getContainer()};
e.S=function(){var a=this.a.getPlaylistItem();return a&&(a.mediaid||a.file)||''};e.title=function(){var a=this.a.getPlaylistItem();return a&&a.title||''};e.B=function(){var a=this.a.getPlaylistItem();return a&&a.image||''};e.N=function(){var a=this;window.setTimeout(function(){return W.prototype.N.call(a)},0)};e.C=function(){W.prototype.C.call(this);this.a=null};function Tb(){return'jwplayer'in window&&u(window.jwplayer)?window.jwplayer:null}function Ub(){var a=[],b=Tb();if(b)for(var c=0,d;(d=b(c++))&&d&&d.id;)a.push(d);return a}function Vb(){X.call(this);this.b={};var a=Tb();if(a&&a.api&&a.api.registerPlugin){var b=this;a.api.registerPlugin('scroll','6.3',function(a){Wb(b,a)})}}h(Vb,X);function Wb(a,b){var c=b.id;a.b[c]||(a.w.push(new Sb(b,a.a)),a.b[c]=!0)}Vb.prototype.A=function(){var a=this,b=Ub();t(b,function(b){return Wb(a,b)});this.O=0<this.w.length};var Xb='play pause ended waiting playing seeking seeked stalled error suspend abort'.split(' '),Yb=['loadstart','emptied'];function Zb(a,b){W.call(this,b);this.video=a;this.A();this.H()}h(Zb,W);e=Zb.prototype;e.I=function(){var a=this,b=this.video;t(Xb,function(c){D(b,c,a.g)});t(Yb,function(c){D(b,c,a.b)});this.a=La(b,this.l)};e.T=function(){var a=this,b=this.video;t(Xb,function(c){Fa(b,c,a.g)});t(Yb,function(c){Fa(b,c,a.b)});this.a&&this.a.disconnect()};e.j=function(){return!this.video.paused};
e.L=function(){return this.video.parentElement};e.S=function(){return this.video&&(this.video.src||this.video.currentSrc)};e.title=function(){return this.video?this.video.title||this.video.getAttribute('title')||this.video.getAttribute('data-title')||'':null};e.B=function(){return this.video?this.video.poster||this.video.getAttribute('poster')||this.video.getAttribute('data-poster')||'':null};e.C=function(){W.prototype.C.call(this);this.video=null};function $b(a){X.apply(this,arguments)}h($b,X);$b.prototype.A=function(){var a=this;t(A('video'),function(b){ac(a,b)});Ka(function(b){return ac(a,b)})};function ac(a,b){b&&b.hasAttribute('data-scroll-detected')&&(a.w.push(new Zb(b,a.a)),a.O=!0)};function bc(){this.a=[]}bc.prototype.j=function(){return r(this.a,function(a){return a.j()})};function cc(a){a.a=a.a.concat([new Mb,new Vb]);t(a.a,function(a){return a.A()});if(!r(a.a,function(a){return a.O})){var b=new $b;b.A();a.a.push(b)}}function dc(a){cc(a);var b=new Pb;b.A();a.a.push(b)}function ec(){var a=new bc;cc(a);$a(function(b){zb('va',function(){b.write('va',a.j())});bb()||pb()||(b.write('vc',!1),fc(a,b),zb('vr',function(){b.write('vr');fc(a,b)}))})}
function fc(a,b){var c=gc(a);c&&Gb(c).then(function(a){b.write('vt',a.title);b.write('vi',a.B)})}function gc(a){return(a=ya(a.a,function(a){return a.w.length?a.w[0]:null}))&&(a.w.length?a.w[0]:null)};function Y(a){N.call(this);this.U=5E3;this.a=new ub;this.b=function(){return a.j()};this.G()}h(Y,N);Y.prototype.I=function(){var a=v(this.G,this),b=Aa(a);D(window,'scroll',b);D(window,'resize',b);D(document.body,'mousemove',b);D(document.body,'mousedown',b);D(document.body,'keydown',b);mb&&D(document,mb,a);D(window,'focus',a);D(window,'blur',a);zb('va',a);this.H()};Y.prototype.j=function(){var a=lb&&document[lb],b=!('hasFocus'in document)||document.hasFocus();return!a&&b&&!this.b()};
Y.prototype.H=function(){var a=this;if(tb()){this.a.log('page');var b=this.a.log();setInterval(function(){b('s: '+O(a))},50)}};Y.prototype.log=function(a){this.a.log(a)};var hc={},ic=(hc.britdawn=1,hc.fmg=1,hc),jc=new db(function(a){a=void 0===a?'':a;var b=new eb(p+'/embed/promo/'+(ic[a]?a:''));M(b.a,'is',function(){var a=G();a=E(a,'scrollfirstvisit=1');Oa(a);vb().then(function(c){c.r&&M(b.a,'id',function(){a=E(a,'scrollnorefresh=1');window.location.href=a})})})});var kc=new P;function lc(){if(!Q()){var a=mc(),b=nc();b.background='transparent';var c=pb(),d={};c&&(d.t=c);c=Sa(E(ua,F(d)));var f=Ga(c,b,function(){var b=z(function(){document.body.removeChild(a);kc.set(f)},500);J(f.contentWindow,q,function(a){'sl'===a&&b()});oc()})}}
function mc(){var a=window.matchMedia('(max-width: 599px)').matches,b=nc();b.background='#fff';b['box-sizing']='border-box';b['-webkit-box-sizing']='border-box';b.margin='0';b['border-top']='1px solid #eee';b['border-bottom']='1px solid #eee';var c=document.createElement('div');B(c,b);C(c);b=document.createElement('div');var d={};B(b,(d.position='absolute',d.height='28px',d.width='28px',d.top='7px',d.left=a?'8px':'16px',d));b.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><rect width="26" height="26" fill="#33E2D1" rx="2"/><path fill="#FFF" d="M8.587 6.24c-2.445 0-4.427 1.855-4.427 4.144s1.982 4.144 4.427 4.144a4.605 4.605 0 0 0 3.051-1.14l8.029-7.148H8.587zM17.423 19.728c2.446 0 4.428-1.855 4.428-4.144s-1.982-4.144-4.428-4.144a4.605 4.605 0 0 0-3.05 1.141l-8.029 7.147h11.08z"/></svg>';
C(b,c);return c}function nc(){var a={};return a.height='44px',a.position='fixed',a.left='0',a.width='100%',a['z-index']='2147483647',a.bottom='0',a}var oc=z(function(){var a=document.createElement('script');a.async=!0;a.src='https://static.scroll.com/js/scroll-user-a3c691ffec0425a5f9edfda44faae5ed.js';C(a,document.head||A('head')[0])}),Z=z(function(a,b){kc.get().then(function(c){K(c.contentWindow,q,a,b)})});function pc(){Z('ar',!0);D(window,'pageshow',function(a){a.persisted&&Z('ar',!1)})};function qc(a){a.cb&&sb().then(function(a){'y'===a&&(a={},H('/embed/event','GET',(a.event='blocker-detected',a)),a={},a=w({},cb(),qb(),(a.pr=document.referrer,a)),a.o&&(document.cookie=rb(),window.location.href=E(p+'/loginwithapp',F(a))))})}
function rc(a){if(a.tw)Z('tw');else if(a.si){if(!(a=0<=G().indexOf('scrollfirstvisit=1'))){if(null===ab){ab=!1;try{window.localStorage.setItem('__scroll_test','__scroll_test'),'__scroll_test'===window.localStorage.getItem('__scroll_test')&&(window.localStorage.removeItem('__scroll_test'),ab=!0)}catch(b){}}a='1'===(ab?window.localStorage.getItem('__scroll_prestige'):null)}a||Z('si')}else a.ar&&pc()}
function sc(a){!0===jb().detected&&bb()?lc():0<=G().indexOf('_scri=1')&&jc.call('');a.then(function(a){if(a.r&&!(Q()||0<=G().indexOf('scrollnorefresh=1'))){var b=G();b=Na(b,'scrolltoken');b=E(b,'scrollnorefresh=1');window.location.href=b}a.v?tc(a):(qc(a),a=jc,a.b&&(a.b=!1,a.a&&a.a()))})}
function tc(a){var b=new bc,c=new Y(b);c.I();dc(b);var d=new V(a.v,c,function(){return vb().then(function(a){return(a=a.v)?Promise.resolve(a):Promise.reject()})});a.cb?sb().then(function(b){'n'===b?Z('nb'):rc(a)}):rc(a);kb(Ba(function(){d.j()&&nb(d)}))}function Ja(){var a=vb();sc(a)}function uc(){if(Q()&&0<=G().indexOf('scrollcookiepreset=1')){var a=function(){K(window.parent,p,'pc')};vb().then(a,a)}else ec()}
(function(){var a={};fb((a.showCTA=function(a){jc.call(void 0===a?'':a)},a.virtualPage=function(){},a))||(0<=G().indexOf('scrollrequestdebug=1')?xb():Q()?uc():Ia())})();})();