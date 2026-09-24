(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ic="186",Ru=0,Dc=1,Cu=2,Gr=1,Pu=2,Us=3,Ti=0,qe=1,ln=2,Zn=0,zs=1,Ic=2,Uc=3,Nc=4,Lu=5,ss=100,Du=101,Iu=102,Uu=103,Nu=104,Fu=200,Ou=201,Bu=202,zu=203,ah=204,oh=205,Gu=206,Vu=207,Hu=208,ku=209,Wu=210,Xu=211,qu=212,Yu=213,Zu=214,so=0,ro=1,ao=2,Ws=3,oo=4,co=5,lo=6,ho=7,ch=0,$u=1,Ju=2,Nn=0,lh=1,hh=2,uh=3,fh=4,dh=5,ph=6,mh=7,gh=300,wi=301,hs=302,da=303,pa=304,ia=306,uo=1e3,qn=1001,fo=1002,ze=1003,Ku=1004,er=1005,Xe=1006,ma=1007,Si=1008,hn=1009,_h=1010,vh=1011,Xs=1012,sc=1013,On=1014,Ln=1015,Bn=1016,rc=1017,ac=1018,qs=1020,xh=35902,Mh=35899,Sh=1021,yh=1022,Sn=1023,Qn=1026,yi=1027,bh=1028,oc=1029,Ai=1030,cc=1031,lc=1033,Vr=33776,Hr=33777,kr=33778,Wr=33779,po=35840,mo=35841,go=35842,_o=35843,vo=36196,xo=37492,Mo=37496,So=37488,yo=37489,Yr=37490,bo=37491,Eo=37808,To=37809,wo=37810,Ao=37811,Ro=37812,Co=37813,Po=37814,Lo=37815,Do=37816,Io=37817,Uo=37818,No=37819,Fo=37820,Oo=37821,Bo=36492,zo=36494,Go=36495,Vo=36283,Ho=36284,Zr=36285,ko=36286,Qu=3200,Fc=0,ju=1,li="",Qe="srgb",$r="srgb-linear",Jr="linear",fe="srgb",ga=7680,tf=519,ef=512,nf=513,sf=514,hc=515,rf=516,af=517,uc=518,of=519,Eh=35044,Oc="300 es",Dn=2e3,Kr=2001;function cf(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function lf(){const s=Qr("canvas");return s.style.display="block",s}const Bc={};function jr(...s){const t="THREE."+s.shift();console.log(t,...s)}function Th(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ot(...s){s=Th(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Kt(...s){s=Th(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function os(...s){const t=s.join(" ");t in Bc||(Bc[t]=!0,Ot(...s))}function hf(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const uf={[so]:ro,[ao]:lo,[oo]:ho,[Ws]:co,[ro]:so,[lo]:ao,[ho]:oo,[co]:Ws};class Li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zc=1234567;const cs=Math.PI/180,Ys=180/Math.PI;function Fn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ve[s&255]+Ve[s>>8&255]+Ve[s>>16&255]+Ve[s>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]).toLowerCase()}function kt(s,t,e){return Math.max(t,Math.min(e,s))}function fc(s,t){return(s%t+t)%t}function ff(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function df(s,t,e){return s!==t?(e-s)/(t-s):0}function Gs(s,t,e){return(1-e)*s+e*t}function pf(s,t,e,n){return Gs(s,t,1-Math.exp(-e*n))}function mf(s,t=1){return t-Math.abs(fc(s,t*2)-t)}function gf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function _f(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function vf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function xf(s,t){return s+Math.random()*(t-s)}function Mf(s){return s*(.5-Math.random())}function Sf(s){s!==void 0&&(zc=s);let t=zc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function yf(s){return s*cs}function bf(s){return s*Ys}function Ef(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Tf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function wf(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Af(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),f=r((t-n)/2),u=a((t-n)/2),d=r((n-t)/2),m=a((n-t)/2);switch(i){case"XYX":s.set(o*h,c*f,c*u,o*l);break;case"YZY":s.set(c*u,o*h,c*f,o*l);break;case"ZXZ":s.set(c*f,c*u,o*h,o*l);break;case"XZX":s.set(o*h,c*m,c*d,o*l);break;case"YXY":s.set(c*d,o*h,c*m,o*l);break;case"ZYZ":s.set(c*m,c*d,o*h,o*l);break;default:Ot("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function xn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function de(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Qt={DEG2RAD:cs,RAD2DEG:Ys,generateUUID:Fn,clamp:kt,euclideanModulo:fc,mapLinear:ff,inverseLerp:df,lerp:Gs,damp:pf,pingpong:mf,smoothstep:gf,smootherstep:_f,randInt:vf,randFloat:xf,randFloatSpread:Mf,seededRandom:Sf,degToRad:yf,radToDeg:bf,isPowerOfTwo:Ef,ceilPowerOfTwo:Tf,floorPowerOfTwo:wf,setQuaternionFromProperEuler:Af,normalize:de,denormalize:xn};class ct{static{ct.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Di{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],f=n[i+3],u=r[a+0],d=r[a+1],m=r[a+2],v=r[a+3];if(f!==v||c!==u||l!==d||h!==m){let g=c*u+l*d+h*m+f*v;g<0&&(u=-u,d=-d,m=-m,v=-v,g=-g);let p=1-o;if(g<.9995){const b=Math.acos(g),T=Math.sin(b);p=Math.sin(p*b)/T,o=Math.sin(o*b)/T,c=c*p+u*o,l=l*p+d*o,h=h*p+m*o,f=f*p+v*o}else{c=c*p+u*o,l=l*p+d*o,h=h*p+m*o,f=f*p+v*o;const b=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=b,l*=b,h*=b,f*=b}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],f=r[a],u=r[a+1],d=r[a+2],m=r[a+3];return t[e]=o*m+h*f+c*d-l*u,t[e+1]=c*m+h*u+l*f-o*d,t[e+2]=l*m+h*d+o*u-c*f,t[e+3]=h*m-o*f-c*u-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),f=o(r/2),u=c(n/2),d=c(i/2),m=c(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*m,this._y=l*d*f-u*h*m,this._z=l*h*m+u*d*f,this._w=l*h*f-u*d*m;break;case"YXZ":this._x=u*h*f+l*d*m,this._y=l*d*f-u*h*m,this._z=l*h*m-u*d*f,this._w=l*h*f+u*d*m;break;case"ZXY":this._x=u*h*f-l*d*m,this._y=l*d*f+u*h*m,this._z=l*h*m+u*d*f,this._w=l*h*f-u*d*m;break;case"ZYX":this._x=u*h*f-l*d*m,this._y=l*d*f+u*h*m,this._z=l*h*m-u*d*f,this._w=l*h*f+u*d*m;break;case"YZX":this._x=u*h*f+l*d*m,this._y=l*d*f+u*h*m,this._z=l*h*m-u*d*f,this._w=l*h*f-u*d*m;break;case"XZY":this._x=u*h*f-l*d*m,this._y=l*d*f-u*h*m,this._z=l*h*m+u*d*f,this._w=l*h*f+u*d*m;break;default:Ot("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],f=e[10],u=n+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-i)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+l)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{static{A.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),h=2*(o*e-r*i),f=2*(r*n-a*e);return this.x=e+c*l+a*f-o*h,this.y=n+c*h+o*l-r*f,this.z=i+c*f+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _a.copy(this).projectOnVector(t),this.sub(_a)}reflect(t){return this.sub(_a.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _a=new A,Gc=new Di;class Ht{static{Ht.prototype.isMatrix3=!0}constructor(t,e,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l)}set(t,e,n,i,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],m=n[8],v=i[0],g=i[3],p=i[6],b=i[1],T=i[4],M=i[7],y=i[2],E=i[5],C=i[8];return r[0]=a*v+o*b+c*y,r[3]=a*g+o*T+c*E,r[6]=a*p+o*M+c*C,r[1]=l*v+h*b+f*y,r[4]=l*g+h*T+f*E,r[7]=l*p+h*M+f*C,r[2]=u*v+d*b+m*y,r[5]=u*g+d*T+m*E,r[8]=u*p+d*M+m*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=h*a-o*l,u=o*c-h*r,d=l*r-a*c,m=e*f+n*u+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=f*v,t[1]=(i*l-h*n)*v,t[2]=(o*n-i*a)*v,t[3]=u*v,t[4]=(h*e-i*c)*v,t[5]=(i*r-o*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return os("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(va.makeScale(t,e)),this}rotate(t){return os("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(va.makeRotation(-t)),this}translate(t,e){return os("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(va.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const va=new Ht,Vc=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rf(){const s={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===fe&&(i.r=$n(i.r),i.g=$n(i.g),i.b=$n(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===fe&&(i.r=ls(i.r),i.g=ls(i.g),i.b=ls(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===li?Jr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[$r]:{primaries:t,whitePoint:n,transfer:Jr,toXYZ:Vc,fromXYZ:Hc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:t,whitePoint:n,transfer:fe,toXYZ:Vc,fromXYZ:Hc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),s}const jt=Rf();function $n(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ls(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Fi;class Cf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Fi===void 0&&(Fi=Qr("canvas")),Fi.width=t.width,Fi.height=t.height;const i=Fi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Fi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Qr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=$n(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($n(e[n]/255)*255):e[n]=$n(e[n]);return{data:e,width:t.width,height:t.height}}else return Ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Pf=0;class dc{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Fn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(xa(i[a].image)):r.push(xa(i[a]))}else r=xa(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function xa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Cf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ot("Texture: Unable to serialize Texture."),{})}let Lf=0;const Ma=new A;class Ye extends Li{constructor(t=Ye.DEFAULT_IMAGE,e=Ye.DEFAULT_MAPPING,n=qn,i=qn,r=Xe,a=Si,o=Sn,c=hn,l=Ye.DEFAULT_ANISOTROPY,h=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Fn(),this.name="",this.source=new dc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ma).x}get height(){return this.source.getSize(Ma).y}get depth(){return this.source.getSize(Ma).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ot(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ot(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case uo:t.x=t.x-Math.floor(t.x);break;case qn:t.x=t.x<0?0:1;break;case fo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case uo:t.y=t.y-Math.floor(t.y);break;case qn:t.y=t.y<0?0:1;break;case fo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ye.DEFAULT_IMAGE=null;Ye.DEFAULT_MAPPING=gh;Ye.DEFAULT_ANISOTROPY=1;class ge{static{ge.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],m=c[9],v=c[2],g=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+v)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,M=(d+1)/2,y=(p+1)/2,E=(h+u)/4,C=(f+v)/4,x=(m+g)/4;return T>M&&T>y?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=E/n,r=C/n):M>y?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=E/i,r=x/i):y<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(y),n=C/r,i=x/r),this.set(n,i,r,e),this}let b=Math.sqrt((g-m)*(g-m)+(f-v)*(f-v)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(f-v)/b,this.z=(u-h)/b,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Df extends Li{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e),this.textures=[];const i={width:t,height:e,depth:n.depth},r=new Ye(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new dc(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yn extends Df{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class wh extends Ye{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class If extends Ye{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class ye{static{ye.prototype.isMatrix4=!0}constructor(t,e,n,i,r,a,o,c,l,h,f,u,d,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l,h,f,u,d,m,v,g)}set(t,e,n,i,r,a,o,c,l,h,f,u,d,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ye().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,i=1/Oi.setFromMatrixColumn(t,0).length(),r=1/Oi.setFromMatrixColumn(t,1).length(),a=1/Oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=a*h,d=a*f,m=o*h,v=o*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=d+m*l,e[5]=u-v*l,e[9]=-o*c,e[2]=v-u*l,e[6]=m+d*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*h,d=c*f,m=l*h,v=l*f;e[0]=u+v*o,e[4]=m*o-d,e[8]=a*l,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-m,e[6]=v+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*h,d=c*f,m=l*h,v=l*f;e[0]=u-v*o,e[4]=-a*f,e[8]=m+d*o,e[1]=d+m*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*h,d=a*f,m=o*h,v=o*f;e[0]=c*h,e[4]=m*l-d,e[8]=u*l+v,e[1]=c*f,e[5]=v*l+u,e[9]=d*l-m,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,d=a*l,m=o*c,v=o*l;e[0]=c*h,e[4]=v-u*f,e[8]=m*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*f+m,e[10]=u-v*f}else if(t.order==="XZY"){const u=a*c,d=a*l,m=o*c,v=o*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=u*f+v,e[5]=a*h,e[9]=d*f-m,e[2]=m*f-d,e[6]=o*h,e[10]=v*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Uf,t,Nf)}lookAt(t,e,n){const i=this.elements;return nn.subVectors(t,e),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ii.crossVectors(n,nn),ii.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ii.crossVectors(n,nn)),ii.normalize(),nr.crossVectors(nn,ii),i[0]=ii.x,i[4]=nr.x,i[8]=nn.x,i[1]=ii.y,i[5]=nr.y,i[9]=nn.y,i[2]=ii.z,i[6]=nr.z,i[10]=nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],m=n[2],v=n[6],g=n[10],p=n[14],b=n[3],T=n[7],M=n[11],y=n[15],E=i[0],C=i[4],x=i[8],w=i[12],D=i[1],L=i[5],I=i[9],O=i[13],P=i[2],B=i[6],k=i[10],X=i[14],it=i[3],q=i[7],Q=i[11],et=i[15];return r[0]=a*E+o*D+c*P+l*it,r[4]=a*C+o*L+c*B+l*q,r[8]=a*x+o*I+c*k+l*Q,r[12]=a*w+o*O+c*X+l*et,r[1]=h*E+f*D+u*P+d*it,r[5]=h*C+f*L+u*B+d*q,r[9]=h*x+f*I+u*k+d*Q,r[13]=h*w+f*O+u*X+d*et,r[2]=m*E+v*D+g*P+p*it,r[6]=m*C+v*L+g*B+p*q,r[10]=m*x+v*I+g*k+p*Q,r[14]=m*w+v*O+g*X+p*et,r[3]=b*E+T*D+M*P+y*it,r[7]=b*C+T*L+M*B+y*q,r[11]=b*x+T*I+M*k+y*Q,r[15]=b*w+T*O+M*X+y*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],f=t[6],u=t[10],d=t[14],m=t[3],v=t[7],g=t[11],p=t[15],b=c*d-l*u,T=o*d-l*f,M=o*u-c*f,y=a*d-l*h,E=a*u-c*h,C=a*f-o*h;return e*(v*b-g*T+p*M)-n*(m*b-g*y+p*E)+i*(m*T-v*y+p*C)-r*(m*M-v*E+g*C)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-n*(r*h-o*c)+i*(r*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=t[9],u=t[10],d=t[11],m=t[12],v=t[13],g=t[14],p=t[15],b=e*o-n*a,T=e*c-i*a,M=e*l-r*a,y=n*c-i*o,E=n*l-r*o,C=i*l-r*c,x=h*v-f*m,w=h*g-u*m,D=h*p-d*m,L=f*g-u*v,I=f*p-d*v,O=u*p-d*g,P=b*O-T*I+M*L+y*D-E*w+C*x;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/P;return t[0]=(o*O-c*I+l*L)*B,t[1]=(i*I-n*O-r*L)*B,t[2]=(v*C-g*E+p*y)*B,t[3]=(u*E-f*C-d*y)*B,t[4]=(c*D-a*O-l*w)*B,t[5]=(e*O-i*D+r*w)*B,t[6]=(g*M-m*C-p*T)*B,t[7]=(h*C-u*M+d*T)*B,t[8]=(a*I-o*D+l*x)*B,t[9]=(n*D-e*I-r*x)*B,t[10]=(m*E-v*M+p*b)*B,t[11]=(f*M-h*E-d*b)*B,t[12]=(o*w-a*L-c*x)*B,t[13]=(e*L-n*w+i*x)*B,t[14]=(v*T-m*y-g*b)*B,t[15]=(h*y-f*T+u*b)*B,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,f=o+o,u=r*l,d=r*h,m=r*f,v=a*h,g=a*f,p=o*f,b=c*l,T=c*h,M=c*f,y=n.x,E=n.y,C=n.z;return i[0]=(1-(v+p))*y,i[1]=(d+M)*y,i[2]=(m-T)*y,i[3]=0,i[4]=(d-M)*E,i[5]=(1-(u+p))*E,i[6]=(g+b)*E,i[7]=0,i[8]=(m+T)*C,i[9]=(g-b)*C,i[10]=(1-(u+v))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Oi.set(i[0],i[1],i[2]).length();const o=Oi.set(i[4],i[5],i[6]).length(),c=Oi.set(i[8],i[9],i[10]).length();r<0&&(a=-a),mn.copy(this);const l=1/a,h=1/o,f=1/c;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=h,mn.elements[5]*=h,mn.elements[6]*=h,mn.elements[8]*=f,mn.elements[9]*=f,mn.elements[10]*=f,e.setFromRotationMatrix(mn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,i,r,a,o=Dn,c=!1){const l=this.elements,h=2*r/(e-t),f=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let m,v;if(c)m=r/(a-r),v=a*r/(a-r);else if(o===Dn)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Kr)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Dn,c=!1){const l=this.elements,h=2/(e-t),f=2/(n-i),u=-(e+t)/(e-t),d=-(n+i)/(n-i);let m,v;if(c)m=1/(a-r),v=a/(a-r);else if(o===Dn)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===Kr)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Oi=new A,mn=new ye,Uf=new A(0,0,0),Nf=new A(1,1,1),ii=new A,nr=new A,nn=new A,kc=new ye,Wc=new Di;class fi{constructor(t=0,e=0,n=0,i=fi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-kt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return kc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(kc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wc.setFromEuler(this),this.setFromQuaternion(Wc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fi.DEFAULT_ORDER="XYZ";class sa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ff=0;const Xc=new A,Bi=new Di,Gn=new ye,ir=new A,Ms=new A,Of=new A,Bf=new Di,qc=new A(1,0,0),Yc=new A(0,1,0),Zc=new A(0,0,1),$c={type:"added"},zf={type:"removed"},zi={type:"childadded",child:null},Sa={type:"childremoved",child:null};class Ke extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ke.DEFAULT_UP.clone();const t=new A,e=new fi,n=new Di,i=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ye},normalMatrix:{value:new Ht}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=Ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.premultiply(Bi),this}rotateX(t){return this.rotateOnAxis(qc,t)}rotateY(t){return this.rotateOnAxis(Yc,t)}rotateZ(t){return this.rotateOnAxis(Zc,t)}translateOnAxis(t,e){return Xc.copy(t).applyQuaternion(this.quaternion),this.position.add(Xc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qc,t)}translateY(t){return this.translateOnAxis(Yc,t)}translateZ(t){return this.translateOnAxis(Zc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ir.copy(t):ir.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Ms,ir,this.up):Gn.lookAt(ir,Ms,this.up),this.quaternion.setFromRotationMatrix(Gn),i&&(Gn.extractRotation(i.matrixWorld),Bi.setFromRotationMatrix(Gn),this.quaternion.premultiply(Bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Kt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($c),zi.child=t,this.dispatchEvent(zi),zi.child=null):Kt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(zf),Sa.child=t,this.dispatchEvent(Sa),Sa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($c),zi.child=t,this.dispatchEvent(zi),zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,t,Of),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,Bf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ke.DEFAULT_UP=new A(0,1,0);Ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Me extends Ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gf={type:"move"};class ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Me,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Me,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Me,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(l,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,m=.005;l.inputState.pinching&&u>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gf)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Me;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ah={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},sr={h:0,s:0,l:0};function ba(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class se{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=fc(t,1),e=kt(e,0,1),n=kt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ba(a,r,t+1/3),this.g=ba(a,r,t),this.b=ba(a,r,t-1/3)}return jt.colorSpaceToWorking(this,i),this}setStyle(t,e=Qe){function n(r){r!==void 0&&parseFloat(r)<1&&Ot("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ot("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ot("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const n=Ah[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ot("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$n(t.r),this.g=$n(t.g),this.b=$n(t.b),this}copyLinearToSRGB(t){return this.r=ls(t.r),this.g=ls(t.g),this.b=ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return jt.workingToColorSpace(He.copy(this),t),Math.round(kt(He.r*255,0,255))*65536+Math.round(kt(He.g*255,0,255))*256+Math.round(kt(He.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(He.copy(this),e);const n=He.r,i=He.g,r=He.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(i-r)/f+(i<r?6:0);break;case i:c=(r-n)/f+2;break;case r:c=(n-i)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=Qe){jt.workingToColorSpace(He.copy(this),t);const e=He.r,n=He.g,i=He.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(si),this.setHSL(si.h+t,si.s+e,si.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(si),t.getHSL(sr);const n=Gs(si.h,sr.h,e),i=Gs(si.s,sr.s,e),r=Gs(si.l,sr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new se;se.NAMES=Ah;class Rh extends Ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const gn=new A,Vn=new A,Ea=new A,Hn=new A,Gi=new A,Vi=new A,Jc=new A,Ta=new A,wa=new A,Aa=new A,Ra=new ge,Ca=new ge,Pa=new ge;class en{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),gn.subVectors(t,e),i.cross(gn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){gn.subVectors(i,e),Vn.subVectors(n,e),Ea.subVectors(t,e);const a=gn.dot(gn),o=gn.dot(Vn),c=gn.dot(Ea),l=Vn.dot(Vn),h=Vn.dot(Ea),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,d=(l*c-o*h)*u,m=(a*h-o*c)*u;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,n,i,r,a,o,c){return this.getBarycoord(t,e,n,i,Hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Hn.x),c.addScaledVector(a,Hn.y),c.addScaledVector(o,Hn.z),c)}static getInterpolatedAttribute(t,e,n,i,r,a){return Ra.setScalar(0),Ca.setScalar(0),Pa.setScalar(0),Ra.fromBufferAttribute(t,e),Ca.fromBufferAttribute(t,n),Pa.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Ra,r.x),a.addScaledVector(Ca,r.y),a.addScaledVector(Pa,r.z),a}static isFrontFacing(t,e,n,i){return gn.subVectors(n,e),Vn.subVectors(t,e),gn.cross(Vn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),gn.cross(Vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return en.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Gi.subVectors(i,n),Vi.subVectors(r,n),Ta.subVectors(t,n);const c=Gi.dot(Ta),l=Vi.dot(Ta);if(c<=0&&l<=0)return e.copy(n);wa.subVectors(t,i);const h=Gi.dot(wa),f=Vi.dot(wa);if(h>=0&&f<=h)return e.copy(i);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Gi,a);Aa.subVectors(t,r);const d=Gi.dot(Aa),m=Vi.dot(Aa);if(m>=0&&d<=m)return e.copy(r);const v=d*l-c*m;if(v<=0&&l>=0&&m<=0)return o=l/(l-m),e.copy(n).addScaledVector(Vi,o);const g=h*m-d*f;if(g<=0&&f-h>=0&&d-m>=0)return Jc.subVectors(r,i),o=(f-h)/(f-h+(d-m)),e.copy(i).addScaledVector(Jc,o);const p=1/(g+v+u);return a=v*p,o=u*p,e.copy(n).addScaledVector(Gi,a).addScaledVector(Vi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class bn{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(t.matrixWorld),this.union(rr)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ss),ar.subVectors(this.max,Ss),Hi.subVectors(t.a,Ss),ki.subVectors(t.b,Ss),Wi.subVectors(t.c,Ss),ri.subVectors(ki,Hi),ai.subVectors(Wi,ki),mi.subVectors(Hi,Wi);let e=[0,-ri.z,ri.y,0,-ai.z,ai.y,0,-mi.z,mi.y,ri.z,0,-ri.x,ai.z,0,-ai.x,mi.z,0,-mi.x,-ri.y,ri.x,0,-ai.y,ai.x,0,-mi.y,mi.x,0];return!La(e,Hi,ki,Wi,ar)||(e=[1,0,0,0,1,0,0,0,1],!La(e,Hi,ki,Wi,ar))?!1:(or.crossVectors(ri,ai),e=[or.x,or.y,or.z],La(e,Hi,ki,Wi,ar))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const kn=[new A,new A,new A,new A,new A,new A,new A,new A],_n=new A,rr=new bn,Hi=new A,ki=new A,Wi=new A,ri=new A,ai=new A,mi=new A,Ss=new A,ar=new A,or=new A,gi=new A;function La(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){gi.fromArray(s,r);const o=i.x*Math.abs(gi.x)+i.y*Math.abs(gi.y)+i.z*Math.abs(gi.z),c=t.dot(gi),l=e.dot(gi),h=n.dot(gi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Pe=new A,cr=new ct;let Vf=0;class un extends Li{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Eh,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)cr.fromBufferAttribute(this,e),cr.applyMatrix3(t),this.setXY(e,cr.x,cr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=xn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=xn(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=xn(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=xn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=xn(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),i=de(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),i=de(i,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Ch extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ph extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Hf=new bn,ys=new A,Da=new A;class Ii{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Hf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ys.subVectors(t,this.center);const e=ys.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ys,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Da.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ys.copy(t.center).add(Da)),this.expandByPoint(ys.copy(t.center).sub(Da))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let kf=0;const cn=new ye,Ia=new Ke,Xi=new A,sn=new bn,bs=new bn,Ie=new A;class we extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(cf(t)?Ph:Ch)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return cn.makeRotationFromQuaternion(t),this.applyMatrix4(cn),this}rotateX(t){return cn.makeRotationX(t),this.applyMatrix4(cn),this}rotateY(t){return cn.makeRotationY(t),this.applyMatrix4(cn),this}rotateZ(t){return cn.makeRotationZ(t),this.applyMatrix4(cn),this}translate(t,e,n){return cn.makeTranslation(t,e,n),this.applyMatrix4(cn),this}scale(t,e,n){return cn.makeScale(t,e,n),this.applyMatrix4(cn),this}lookAt(t){return Ia.lookAt(t),Ia.updateMatrix(),this.applyMatrix4(Ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Kt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ii);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];bs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ie.addVectors(sn.min,bs.min),sn.expandByPoint(Ie),Ie.addVectors(sn.max,bs.max),sn.expandByPoint(Ie)):(sn.expandByPoint(bs.min),sn.expandByPoint(bs.max))}sn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ie.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ie));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ie.fromBufferAttribute(o,l),c&&(Xi.fromBufferAttribute(t,l),Ie.add(Xi)),i=Math.max(i,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Kt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Kt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new un(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new A,c[x]=new A;const l=new A,h=new A,f=new A,u=new ct,d=new ct,m=new ct,v=new A,g=new A;function p(x,w,D){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,w),f.fromBufferAttribute(n,D),u.fromBufferAttribute(r,x),d.fromBufferAttribute(r,w),m.fromBufferAttribute(r,D),h.sub(l),f.sub(l),d.sub(u),m.sub(u);const L=1/(d.x*m.y-m.x*d.y);isFinite(L)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(f,-d.y).multiplyScalar(L),g.copy(f).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(L),o[x].add(v),o[w].add(v),o[D].add(v),c[x].add(g),c[w].add(g),c[D].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let x=0,w=b.length;x<w;++x){const D=b[x],L=D.start,I=D.count;for(let O=L,P=L+I;O<P;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const T=new A,M=new A,y=new A,E=new A;function C(x){y.fromBufferAttribute(i,x),E.copy(y);const w=o[x];T.copy(w),T.sub(y.multiplyScalar(y.dot(w))).normalize(),M.crossVectors(E,w);const L=M.dot(c[x])<0?-1:1;a.setXYZW(x,T.x,T.y,T.z,L)}for(let x=0,w=b.length;x<w;++x){const D=b[x],L=D.start,I=D.count;for(let O=L,P=L+I;O<P;O+=3)C(t.getX(O+0)),C(t.getX(O+1)),C(t.getX(O+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const i=new A,r=new A,a=new A,o=new A,c=new A,l=new A,h=new A,f=new A;if(t)for(let u=0,d=t.count;u<d;u+=3){const m=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,d=e.count;u<d;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h);let d=0,m=0;for(let v=0,g=c.length;v<g;v++){o.isInterleavedBufferAttribute?d=c[v]*o.data.stride+o.offset:d=c[v]*h;for(let p=0;p<h;p++)u[m++]=l[d++]}return new un(u,h,f)}if(this.index===null)return Ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){const u=l[h],d=t(u,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const d=l[f];h.push(d.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Lh{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Eh,this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const $e=new A;class In{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=xn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=xn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=xn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=xn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=xn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),i=de(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),i=de(i,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){jr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new un(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new In(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){jr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ua=new A,Wf=new A,Xf=new Ht;class Xn{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ua.subVectors(n,e).cross(Wf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const i=t.delta(Ua),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Xf.getNormalMatrix(t),i=this.coplanarPoint(Ua).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let qf=0;class vs extends Li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=Fn(),this.name="",this.type="Material",this.blending=zs,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ah,this.blendDst=oh,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new se(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ga,this.stencilZFail=ga,this.stencilZPass=ga,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ot(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ot(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new se().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Xn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ct().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ct().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Vs extends vs{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new se(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let qi;const Es=new A,Yi=new A,Zi=new A,$i=new ct,Ts=new ct,Dh=new ye,lr=new A,ws=new A,hr=new A,Kc=new ct,Na=new ct,Qc=new ct;class Xr extends Ke{constructor(t=new Vs){if(super(),this.isSprite=!0,this.type="Sprite",qi===void 0){qi=new we;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lh(e,5);qi.setIndex([0,1,2,0,2,3]),qi.setAttribute("position",new In(n,3,0,!1)),qi.setAttribute("uv",new In(n,2,3,!1))}this.geometry=qi,this.material=t,this.center=new ct(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Kt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Yi.setFromMatrixScale(this.matrixWorld),Dh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Zi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yi.multiplyScalar(-Zi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;ur(lr.set(-.5,-.5,0),Zi,a,Yi,i,r),ur(ws.set(.5,-.5,0),Zi,a,Yi,i,r),ur(hr.set(.5,.5,0),Zi,a,Yi,i,r),Kc.set(0,0),Na.set(1,0),Qc.set(1,1);let o=t.ray.intersectTriangle(lr,ws,hr,!1,Es);if(o===null&&(ur(ws.set(-.5,.5,0),Zi,a,Yi,i,r),Na.set(0,1),o=t.ray.intersectTriangle(lr,hr,ws,!1,Es),o===null))return;const c=t.ray.origin.distanceTo(Es);c<t.near||c>t.far||e.push({distance:c,point:Es.clone(),uv:en.getInterpolation(Es,lr,ws,hr,Kc,Na,Qc,new ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ur(s,t,e,n,i,r){$i.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Ts.x=r*$i.x-i*$i.y,Ts.y=i*$i.x+r*$i.y):Ts.copy($i),s.copy(t),s.x+=Ts.x,s.y+=Ts.y,s.applyMatrix4(Dh)}const Wn=new A,Fa=new A,fr=new A,dr=new A;class Ri{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Wn.copy(this.origin).addScaledVector(this.direction,e),Wn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Fa.copy(t).add(e).multiplyScalar(.5),fr.copy(e).sub(t).normalize(),dr.copy(this.origin).sub(Fa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(fr),o=dr.dot(this.direction),c=-dr.dot(fr),l=dr.lengthSq(),h=Math.abs(1-a*a);let f,u,d,m;if(h>0)if(f=a*c-o,u=a*o-c,m=r*h,f>=0)if(u>=-m)if(u<=m){const v=1/h;f*=v,u*=v,d=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-m?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=m?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Fa).addScaledVector(fr,u),d}intersectSphere(t,e){if(t.radius<0)return null;Wn.subVectors(t.center,this.origin);const n=Wn.dot(this.direction),i=Wn.dot(Wn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Wn)!==null}intersectTriangle(t,e,n,i,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,d=t.z-a.z,m=e.x-a.x,v=e.y-a.y,g=e.z-a.z,p=n.x-a.x,b=n.y-a.y,T=n.z-a.z,M=Math.abs(c),y=Math.abs(l),E=Math.abs(h);let C,x,w,D,L,I,O,P,B,k,X,it;if(M>=y&&M>=E?(w=c,I=f,B=m,it=p,c>=0?(C=l,x=h,D=u,L=d,O=v,P=g,k=b,X=T):(C=h,x=l,D=d,L=u,O=g,P=v,k=T,X=b)):y>=E?(w=l,I=u,B=v,it=b,l>=0?(C=h,x=c,D=d,L=f,O=g,P=m,k=T,X=p):(C=c,x=h,D=f,L=d,O=m,P=g,k=p,X=T)):(w=h,I=d,B=g,it=T,h>=0?(C=c,x=l,D=f,L=u,O=m,P=v,k=p,X=b):(C=l,x=c,D=u,L=f,O=v,P=m,k=b,X=p)),w===0)return null;const q=C/w,Q=x/w,et=1/w,Pt=D-q*I,Tt=L-Q*I,re=O-q*B,Zt=P-Q*B,ee=k-q*it,$=X-Q*it,j=ee*Zt-$*re,_t=Pt*$-Tt*ee,Bt=re*Tt-Zt*Pt;if(i){if(j<0||_t<0||Bt<0)return null}else if((j<0||_t<0||Bt<0)&&(j>0||_t>0||Bt>0))return null;const St=j+_t+Bt;if(St===0)return null;const zt=et*(j*I+_t*B+Bt*it);return(St>0?zt<0:zt>0)?null:this.at(zt/St,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jn extends vs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const jc=new ye,_i=new Ri,pr=new Ii,tl=new A,mr=new A,gr=new A,_r=new A,Oa=new A,vr=new A,el=new A,xr=new A;class Se extends Ke{constructor(t=new we,e=new jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){vr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],f=r[c];h!==0&&(Oa.fromBufferAttribute(f,t),a?vr.addScaledVector(Oa,h):vr.addScaledVector(Oa.sub(e),h))}e.add(vr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(pr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(pr,tl)===null||_i.origin.distanceToSquared(tl)>(t.far-t.near)**2))&&(jc.copy(r).invert(),_i.copy(t.ray).applyMatrix4(jc),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],b=Math.max(g.start,d.start),T=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let M=b,y=T;M<y;M+=3){const E=o.getX(M),C=o.getX(M+1),x=o.getX(M+2);i=Mr(this,p,t,n,l,h,f,E,C,x),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let g=m,p=v;g<p;g+=3){const b=o.getX(g),T=o.getX(g+1),M=o.getX(g+2);i=Mr(this,a,t,n,l,h,f,b,T,M),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],b=Math.max(g.start,d.start),T=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let M=b,y=T;M<y;M+=3){const E=M,C=M+1,x=M+2;i=Mr(this,p,t,n,l,h,f,E,C,x),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let g=m,p=v;g<p;g+=3){const b=g,T=g+1,M=g+2;i=Mr(this,a,t,n,l,h,f,b,T,M),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Yf(s,t,e,n,i,r,a,o){let c;if(t.side===qe?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,t.side===Ti,o),c===null)return null;xr.copy(o),xr.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(xr);return l<e.near||l>e.far?null:{distance:l,point:xr.clone(),object:s}}function Mr(s,t,e,n,i,r,a,o,c,l){s.getVertexPosition(o,mr),s.getVertexPosition(c,gr),s.getVertexPosition(l,_r);const h=Yf(s,t,e,n,mr,gr,_r,el);if(h){const f=new A;en.getBarycoord(el,mr,gr,_r,f),i&&(h.uv=en.getInterpolatedAttribute(i,o,c,l,f,new ct)),r&&(h.uv1=en.getInterpolatedAttribute(r,o,c,l,f,new ct)),a&&(h.normal=en.getInterpolatedAttribute(a,o,c,l,f,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new A,materialIndex:0};en.getNormal(mr,gr,_r,u.normal),h.face=u,h.barycoord=f}return h}class Zf extends Ye{constructor(t=null,e=1,n=1,i,r,a,o,c,l=ze,h=ze,f,u){super(null,a,o,c,l,h,i,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nl extends un{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const vi=new Ii,$f=new ct(.5,.5),Sr=new A;class Ih{constructor(t=new Xn,e=new Xn,n=new Xn,i=new Xn,r=new Xn,a=new Xn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],m=r[8],v=r[9],g=r[10],p=r[11],b=r[12],T=r[13],M=r[14],y=r[15];if(i[0].setComponents(l-a,d-h,p-m,y-b).normalize(),i[1].setComponents(l+a,d+h,p+m,y+b).normalize(),i[2].setComponents(l+o,d+f,p+v,y+T).normalize(),i[3].setComponents(l-o,d-f,p-v,y-T).normalize(),n)i[4].setComponents(c,u,g,M).normalize(),i[5].setComponents(l-c,d-u,p-g,y-M).normalize();else if(i[4].setComponents(l-c,d-u,p-g,y-M).normalize(),e===Dn)i[5].setComponents(l+c,d+u,p+g,y+M).normalize();else if(e===Kr)i[5].setComponents(c,u,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(t){vi.center.set(0,0,0);const e=$f.distanceTo(t.center);return vi.radius=.7071067811865476+e,vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Sr.x=i.normal.x>0?t.max.x:t.min.x,Sr.y=i.normal.y>0?t.max.y:t.min.y,Sr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Sr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wo extends vs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ta=new A,ea=new A,il=new ye,As=new Ri,yr=new Ii,Ba=new A,sl=new A;class Uh extends Ke{constructor(t=new we,e=new Wo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)ta.fromBufferAttribute(e,i-1),ea.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=ta.distanceTo(ea);t.setAttribute("lineDistance",new he(n,1))}else Ot("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yr.copy(n.boundingSphere),yr.applyMatrix4(i),yr.radius+=r,t.ray.intersectsSphere(yr)===!1)return;il.copy(i).invert(),As.copy(t.ray).applyMatrix4(il);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=d,g=m-1;v<g;v+=l){const p=h.getX(v),b=h.getX(v+1),T=br(this,t,As,c,p,b,v);T&&e.push(T)}if(this.isLineLoop){const v=h.getX(m-1),g=h.getX(d),p=br(this,t,As,c,v,g,m-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let v=d,g=m-1;v<g;v+=l){const p=br(this,t,As,c,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=br(this,t,As,c,m-1,d,m-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function br(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(ta.fromBufferAttribute(o,i),ea.fromBufferAttribute(o,r),e.distanceSqToSegment(ta,ea,Ba,sl)>n)return;Ba.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Ba);if(!(l<t.near||l>t.far))return{distance:l,point:sl.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const rl=new A,al=new A;class Jf extends Uh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)rl.fromBufferAttribute(e,i),al.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+rl.distanceTo(al);t.setAttribute("lineDistance",new he(n,1))}else Ot("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Nh extends Ye{constructor(t=[],e=wi,n,i,r,a,o,c,l,h){super(t,e,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fh extends Ye{constructor(t,e,n,i,r,a,o,c,l){super(t,e,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Zs extends Ye{constructor(t,e,n=On,i,r,a,o=ze,c=ze,l,h=Qn,f=1){if(h!==Qn&&h!==yi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:f};super(u,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new dc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Kf extends Zs{constructor(t,e=On,n=wi,i,r,a=ze,o=ze,c,l=Qn){const h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Oh extends Ye{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class fn extends we{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],f=[];let u=0,d=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(f,2));function m(v,g,p,b,T,M,y,E,C,x,w){const D=M/C,L=y/x,I=M/2,O=y/2,P=E/2,B=C+1,k=x+1;let X=0,it=0;const q=new A;for(let Q=0;Q<k;Q++){const et=Q*L-O;for(let Pt=0;Pt<B;Pt++){const Tt=Pt*D-I;q[v]=Tt*b,q[g]=et*T,q[p]=P,l.push(q.x,q.y,q.z),q[v]=0,q[g]=0,q[p]=E>0?1:-1,h.push(q.x,q.y,q.z),f.push(Pt/C),f.push(1-Q/x),X+=1}}for(let Q=0;Q<x;Q++)for(let et=0;et<C;et++){const Pt=u+et+B*Q,Tt=u+et+B*(Q+1),re=u+(et+1)+B*(Q+1),Zt=u+(et+1)+B*Q;c.push(Pt,Tt,Zt),c.push(Tt,re,Zt),it+=6}o.addGroup(d,it,w),d+=it,u+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Un extends we{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],f=[],u=[],d=[];let m=0;const v=[],g=n/2;let p=0;b(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new he(f,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(d,2));function b(){const M=new A,y=new A;let E=0;const C=(e-t)/n;for(let x=0;x<=r;x++){const w=[],D=x/r,L=D*(e-t)+t;for(let I=0;I<=i;I++){const O=I/i,P=O*c+o,B=Math.sin(P),k=Math.cos(P);y.x=L*B,y.y=-D*n+g,y.z=L*k,f.push(y.x,y.y,y.z),M.set(B,C,k).normalize(),u.push(M.x,M.y,M.z),d.push(O,1-D),w.push(m++)}v.push(w)}for(let x=0;x<i;x++)for(let w=0;w<r;w++){const D=v[w][x],L=v[w+1][x],I=v[w+1][x+1],O=v[w][x+1];(t>0||w!==0)&&(h.push(D,L,O),E+=3),(e>0||w!==r-1)&&(h.push(L,I,O),E+=3)}l.addGroup(p,E,0),p+=E}function T(M){const y=m,E=new ct,C=new A;let x=0;const w=M===!0?t:e,D=M===!0?1:-1;for(let I=1;I<=i;I++)f.push(0,g*D,0),u.push(0,D,0),d.push(.5,.5),m++;const L=m;for(let I=0;I<=i;I++){const P=I/i*c+o,B=Math.cos(P),k=Math.sin(P);C.x=w*k,C.y=g*D,C.z=w*B,f.push(C.x,C.y,C.z),u.push(0,D,0),E.x=B*.5+.5,E.y=k*.5*D+.5,d.push(E.x,E.y),m++}for(let I=0;I<i;I++){const O=y+I,P=L+I;M===!0?h.push(P,P+1,O):h.push(P+1,P,O),x+=3}l.addGroup(p,x,M===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Un(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const Er=new A,Tr=new A,za=new A,wr=new en;class Bh extends we{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),r=Math.cos(cs*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],f=new Array(3),u={},d=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);const{a:v,b:g,c:p}=wr;if(v.fromBufferAttribute(o,l[0]),g.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),wr.getNormal(za),f[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,f[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,f[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let b=0;b<3;b++){const T=(b+1)%3,M=f[b],y=f[T],E=wr[h[b]],C=wr[h[T]],x=`${M}_${y}`,w=`${y}_${M}`;w in u&&u[w]?(za.dot(u[w].normal)<=r&&(d.push(E.x,E.y,E.z),d.push(C.x,C.y,C.z)),u[w]=null):x in u||(u[x]={index0:l[b],index1:l[T],normal:za.clone()})}}for(const m in u)if(u[m]){const{index0:v,index1:g}=u[m];Er.fromBufferAttribute(o,v),Tr.fromBufferAttribute(o,g),d.push(Er.x,Er.y,Er.z),d.push(Tr.x,Tr.y,Tr.z)}this.setAttribute("position",new he(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class zn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ot("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const h=n[i],u=n[i+1]-h,d=(a-h)/u;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=e||(a.isVector2?new ct:new A);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new A,i=[],r=[],a=[],o=new A,c=new ye;for(let d=0;d<=t;d++){const m=d/t;i[d]=this.getTangentAt(m,new A)}r[0]=new A,a[0]=new A;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(kt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,m))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(kt(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(i[m],d*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class pc extends zn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new ct){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,d=l-this.aY;c=u*h-d*f+this.aX,l=u*f+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Qf extends pc{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function mc(){let s=0,t=0,e=0,n=0;function i(r,a,o,c){s=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+f)+(c-o)/f;u*=h,d*=h,i(a,o,u,d)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const ol=new A,cl=new A,Ga=new mc,Va=new mc,Ha=new mc;class jf extends zn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new A){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(cl.subVectors(i[0],i[1]).add(i[0]),l=cl);const f=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(ol.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ol),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Ga.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,m,v,g),Va.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,m,v,g),Ha.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(Ga.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),Va.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Ha.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(Ga.calc(c),Va.calc(c),Ha.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new A().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ll(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,c=s*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*s+e}function td(s,t){const e=1-s;return e*e*t}function ed(s,t){return 2*(1-s)*s*t}function nd(s,t){return s*s*t}function Hs(s,t,e,n){return td(s,t)+ed(s,e)+nd(s,n)}function id(s,t){const e=1-s;return e*e*e*t}function sd(s,t){const e=1-s;return 3*e*e*s*t}function rd(s,t){return 3*(1-s)*s*s*t}function ad(s,t){return s*s*s*t}function ks(s,t,e,n,i){return id(s,t)+sd(s,e)+rd(s,n)+ad(s,i)}class zh extends zn{constructor(t=new ct,e=new ct,n=new ct,i=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ct){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ks(t,i.x,r.x,a.x,o.x),ks(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class od extends zn{constructor(t=new A,e=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ks(t,i.x,r.x,a.x,o.x),ks(t,i.y,r.y,a.y,o.y),ks(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gh extends zn{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cd extends zn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vh extends zn{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Hs(t,i.x,r.x,a.x),Hs(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ld extends zn{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Hs(t,i.x,r.x,a.x),Hs(t,i.y,r.y,a.y),Hs(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hh extends zn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(ll(o,c.x,l.x,h.x,f.x),ll(o,c.y,l.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ct().fromArray(i))}return this}}var Xo=Object.freeze({__proto__:null,ArcCurve:Qf,CatmullRomCurve3:jf,CubicBezierCurve:zh,CubicBezierCurve3:od,EllipseCurve:pc,LineCurve:Gh,LineCurve3:cd,QuadraticBezierCurve:Vh,QuadraticBezierCurve3:ld,SplineCurve:Hh});class hd extends zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Xo[i.type]().fromJSON(i))}return this}}class qo extends hd{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Gh(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Vh(this.currentPoint.clone(),new ct(t,e),new ct(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new zh(this.currentPoint.clone(),new ct(t,e),new ct(n,i),new ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Hh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,r,a,o,c),this}absellipse(t,e,n,i,r,a,o,c){const l=new pc(t,e,n,i,r,a,o,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class us extends qo{constructor(t){super(t),this.uuid=Fn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new qo().fromJSON(i))}return this}}function ud(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=kh(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=gd(s,t,r,e)),s.length>80*e){o=s[0],c=s[1];let h=o,f=c;for(let u=e;u<i;u+=e){const d=s[u],m=s[u+1];d<o&&(o=d),m<c&&(c=m),d>h&&(h=d),m>f&&(f=m)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return $s(r,a,e,o,c,l,0),a}function kh(s,t,e,n,i){let r;if(i===Ad(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=hl(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=hl(a/n|0,s[a],s[a+1],r);return r&&fs(r,r.next)&&(Ks(r),r=r.next),r}function Ci(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(fs(e,e.next)||Ae(e.prev,e,e.next)===0)){if(Ks(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function $s(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Sd(s,n,i,r);let o=s;for(;s.prev!==s.next;){const c=s.prev,l=s.next;if(r?dd(s,n,i,r):fd(s)){t.push(c.i,s.i,l.i),Ks(s),s=l.next,o=l.next;continue}if(s=l,s===o){a?a===1?(s=pd(Ci(s),t),$s(s,t,e,n,i,r,2)):a===2&&md(s,t,e,n,i,r):$s(Ci(s),t,e,n,i,r,1);break}}}function fd(s){const t=s.prev,e=s,n=s.next;if(Ae(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=Math.min(i,r,a),f=Math.min(o,c,l),u=Math.max(i,r,a),d=Math.max(o,c,l);let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=f&&m.y<=d&&Ns(i,o,r,c,a,l,m.x,m.y)&&Ae(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function dd(s,t,e,n){const i=s.prev,r=s,a=s.next;if(Ae(i,r,a)>=0)return!1;const o=i.x,c=r.x,l=a.x,h=i.y,f=r.y,u=a.y,d=Math.min(o,c,l),m=Math.min(h,f,u),v=Math.max(o,c,l),g=Math.max(h,f,u),p=Yo(d,m,t,e,n),b=Yo(v,g,t,e,n);let T=s.prevZ,M=s.nextZ;for(;T&&T.z>=p&&M&&M.z<=b;){if(T.x>=d&&T.x<=v&&T.y>=m&&T.y<=g&&T!==i&&T!==a&&Ns(o,h,c,f,l,u,T.x,T.y)&&Ae(T.prev,T,T.next)>=0||(T=T.prevZ,M.x>=d&&M.x<=v&&M.y>=m&&M.y<=g&&M!==i&&M!==a&&Ns(o,h,c,f,l,u,M.x,M.y)&&Ae(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;T&&T.z>=p;){if(T.x>=d&&T.x<=v&&T.y>=m&&T.y<=g&&T!==i&&T!==a&&Ns(o,h,c,f,l,u,T.x,T.y)&&Ae(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;M&&M.z<=b;){if(M.x>=d&&M.x<=v&&M.y>=m&&M.y<=g&&M!==i&&M!==a&&Ns(o,h,c,f,l,u,M.x,M.y)&&Ae(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function pd(s,t){let e=s;do{const n=e.prev,i=e.next.next;!fs(n,i)&&Xh(n,e,e.next,i)&&Js(n,i)&&Js(i,n)&&(t.push(n.i,e.i,i.i),Ks(e),Ks(e.next),e=s=i),e=e.next}while(e!==s);return Ci(e)}function md(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ed(a,o)){let c=qh(a,o);a=Ci(a,a.next),c=Ci(c,c.next),$s(a,t,e,n,i,r,0),$s(c,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function gd(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,c=r<a-1?t[r+1]*n:s.length,l=kh(s,o,c,n,!1);l===l.next&&(l.steiner=!0),i.push(bd(l))}i.sort(_d);for(let r=0;r<i.length;r++)e=vd(i[r],e);return e}function _d(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function vd(s,t){const e=xd(s,t);if(!e)return t;const n=qh(e,s);return Ci(n,n.next),Ci(e,e.next)}function xd(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(fs(s,e))return e;do{if(fs(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const f=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,c=a.x,l=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Wh(i<l?n:r,i,c,l,i<l?r:n,i,e.x,e.y)){const f=Math.abs(i-e.y)/(n-e.x);Js(e,s)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&Md(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function Md(s,t){return Ae(s.prev,s,t.prev)<0&&Ae(t.next,s,s.next)<0}function Sd(s,t,e,n){let i=s;do i.z===0&&(i.z=Yo(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,yd(i)}function yd(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Yo(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function bd(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Wh(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Ns(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Wh(s,t,e,n,i,r,a,o)}function Ed(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Td(s,t)&&(Js(s,t)&&Js(t,s)&&wd(s,t)&&(Ae(s.prev,s,t.prev)||Ae(s,t.prev,t))||fs(s,t)&&Ae(s.prev,s,s.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function fs(s,t){return s.x===t.x&&s.y===t.y}function Xh(s,t,e,n){const i=Rr(Ae(s,t,e)),r=Rr(Ae(s,t,n)),a=Rr(Ae(e,n,s)),o=Rr(Ae(e,n,t));return!!(i!==r&&a!==o||i===0&&Ar(s,e,t)||r===0&&Ar(s,n,t)||a===0&&Ar(e,s,n)||o===0&&Ar(e,t,n))}function Ar(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Rr(s){return s>0?1:s<0?-1:0}function Td(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Xh(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Js(s,t){return Ae(s.prev,s,s.next)<0?Ae(s,t,s.next)>=0&&Ae(s,s.prev,t)>=0:Ae(s,t,s.prev)<0||Ae(s,s.next,t)<0}function wd(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function qh(s,t){const e=Zo(s.i,s.x,s.y),n=Zo(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function hl(s,t,e,n){const i=Zo(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ks(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Zo(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ad(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Rd{static triangulate(t,e,n=2){return ud(t,e,n)}}class Yn{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Yn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];ul(t),fl(n,t);let a=t.length;e.forEach(ul);for(let c=0;c<e.length;c++)i.push(a),a+=e[c].length,fl(n,e[c]);const o=Rd.triangulate(n,i);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function ul(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function fl(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class ra extends we{constructor(t=new us([new ct(.5,.5),new ct(-.5,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,c=t.length;o<c;o++){const l=t[o];a(l)}this.setAttribute("position",new he(i,3)),this.setAttribute("uv",new he(r,2)),this.computeVertexNormals();function a(o){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:Cd;let T,M=!1,y,E,C,x;if(p){T=p.getSpacedPoints(h),M=!0,u=!1;const tt=p.isCatmullRomCurve3?p.closed:!1;y=p.computeFrenetFrames(h,tt),E=new A,C=new A,x=new A}u||(g=0,d=0,m=0,v=0);const w=o.extractPoints(l);let D=w.shape;const L=w.holes;if(!Yn.isClockWise(D)){D=D.reverse();for(let tt=0,st=L.length;tt<st;tt++){const rt=L[tt];Yn.isClockWise(rt)&&(L[tt]=rt.reverse())}}function O(tt){const rt=10000000000000001e-36;let at=tt[0];for(let ht=1;ht<=tt.length;ht++){const Nt=ht%tt.length,Ut=tt[Nt],Gt=Ut.x-at.x,Vt=Ut.y-at.y,U=Gt*Gt+Vt*Vt,oe=Math.max(Math.abs(Ut.x),Math.abs(Ut.y),Math.abs(at.x),Math.abs(at.y)),$t=rt*oe*oe;if(U<=$t){tt.splice(Nt,1),ht--;continue}at=Ut}}O(D),L.forEach(O);const P=L.length,B=D;for(let tt=0;tt<P;tt++){const st=L[tt];D=D.concat(st)}function k(tt,st,rt){return st||Kt("ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(st,rt)}const X=D.length;function it(tt,st,rt){let at,ht,Nt;const Ut=tt.x-st.x,Gt=tt.y-st.y,Vt=rt.x-tt.x,U=rt.y-tt.y,oe=Ut*Ut+Gt*Gt,$t=Ut*U-Gt*Vt;if(Math.abs($t)>Number.EPSILON){const R=Math.sqrt(oe),_=Math.sqrt(Vt*Vt+U*U),z=st.x-Gt/R,H=st.y+Ut/R,Y=rt.x-U/_,ot=rt.y+Vt/_,lt=((Y-z)*U-(ot-H)*Vt)/(Ut*U-Gt*Vt);at=z+Ut*lt-tt.x,ht=H+Gt*lt-tt.y;const Z=at*at+ht*ht;if(Z<=2)return new ct(at,ht);Nt=Math.sqrt(Z/2)}else{let R=!1;Ut>Number.EPSILON?Vt>Number.EPSILON&&(R=!0):Ut<-Number.EPSILON?Vt<-Number.EPSILON&&(R=!0):Math.sign(Gt)===Math.sign(U)&&(R=!0),R?(at=-Gt,ht=Ut,Nt=Math.sqrt(oe)):(at=Ut,ht=Gt,Nt=Math.sqrt(oe/2))}return new ct(at/Nt,ht/Nt)}const q=[];for(let tt=0,st=B.length,rt=st-1,at=tt+1;tt<st;tt++,rt++,at++)rt===st&&(rt=0),at===st&&(at=0),q[tt]=it(B[tt],B[rt],B[at]);const Q=[];let et,Pt=q.concat();for(let tt=0,st=P;tt<st;tt++){const rt=L[tt];et=[];for(let at=0,ht=rt.length,Nt=ht-1,Ut=at+1;at<ht;at++,Nt++,Ut++)Nt===ht&&(Nt=0),Ut===ht&&(Ut=0),et[at]=it(rt[at],rt[Nt],rt[Ut]);Q.push(et),Pt=Pt.concat(et)}let Tt;if(g===0)Tt=Yn.triangulateShape(B,L);else{const tt=[],st=[];for(let rt=0;rt<g;rt++){const at=rt/g,ht=d*Math.cos(at*Math.PI/2),Nt=m*Math.sin(at*Math.PI/2)+v;for(let Ut=0,Gt=B.length;Ut<Gt;Ut++){const Vt=k(B[Ut],q[Ut],Nt);_t(Vt.x,Vt.y,-ht),at===0&&tt.push(Vt)}for(let Ut=0,Gt=P;Ut<Gt;Ut++){const Vt=L[Ut];et=Q[Ut];const U=[];for(let oe=0,$t=Vt.length;oe<$t;oe++){const R=k(Vt[oe],et[oe],Nt);_t(R.x,R.y,-ht),at===0&&U.push(R)}at===0&&st.push(U)}}Tt=Yn.triangulateShape(tt,st)}const re=Tt.length,Zt=m+v;for(let tt=0;tt<X;tt++){const st=u?k(D[tt],Pt[tt],Zt):D[tt];M?(C.copy(y.normals[0]).multiplyScalar(st.x),E.copy(y.binormals[0]).multiplyScalar(st.y),x.copy(T[0]).add(C).add(E),_t(x.x,x.y,x.z)):_t(st.x,st.y,0)}for(let tt=1;tt<=h;tt++)for(let st=0;st<X;st++){const rt=u?k(D[st],Pt[st],Zt):D[st];M?(C.copy(y.normals[tt]).multiplyScalar(rt.x),E.copy(y.binormals[tt]).multiplyScalar(rt.y),x.copy(T[tt]).add(C).add(E),_t(x.x,x.y,x.z)):_t(rt.x,rt.y,f/h*tt)}for(let tt=g-1;tt>=0;tt--){const st=tt/g,rt=d*Math.cos(st*Math.PI/2),at=m*Math.sin(st*Math.PI/2)+v;for(let ht=0,Nt=B.length;ht<Nt;ht++){const Ut=k(B[ht],q[ht],at);_t(Ut.x,Ut.y,f+rt)}for(let ht=0,Nt=L.length;ht<Nt;ht++){const Ut=L[ht];et=Q[ht];for(let Gt=0,Vt=Ut.length;Gt<Vt;Gt++){const U=k(Ut[Gt],et[Gt],at);M?_t(U.x,U.y+T[h-1].y,T[h-1].x+rt):_t(U.x,U.y,f+rt)}}}ee(),$();function ee(){const tt=i.length/3;if(u){let st=0,rt=X*st;for(let at=0;at<re;at++){const ht=Tt[at];Bt(ht[2]+rt,ht[1]+rt,ht[0]+rt)}st=h+g*2,rt=X*st;for(let at=0;at<re;at++){const ht=Tt[at];Bt(ht[0]+rt,ht[1]+rt,ht[2]+rt)}}else{for(let st=0;st<re;st++){const rt=Tt[st];Bt(rt[2],rt[1],rt[0])}for(let st=0;st<re;st++){const rt=Tt[st];Bt(rt[0]+X*h,rt[1]+X*h,rt[2]+X*h)}}n.addGroup(tt,i.length/3-tt,0)}function $(){const tt=i.length/3;let st=0;j(B,st),st+=B.length;for(let rt=0,at=L.length;rt<at;rt++){const ht=L[rt];j(ht,st),st+=ht.length}n.addGroup(tt,i.length/3-tt,1)}function j(tt,st){let rt=tt.length;for(;--rt>=0;){const at=rt;let ht=rt-1;ht<0&&(ht=tt.length-1);for(let Nt=0,Ut=h+g*2;Nt<Ut;Nt++){const Gt=X*Nt,Vt=X*(Nt+1),U=st+at+Gt,oe=st+ht+Gt,$t=st+ht+Vt,R=st+at+Vt;St(U,oe,$t,R)}}}function _t(tt,st,rt){c.push(tt),c.push(st),c.push(rt)}function Bt(tt,st,rt){zt(tt),zt(st),zt(rt);const at=i.length/3,ht=b.generateTopUV(n,i,at-3,at-2,at-1);ue(ht[0]),ue(ht[1]),ue(ht[2])}function St(tt,st,rt,at){zt(tt),zt(st),zt(at),zt(st),zt(rt),zt(at);const ht=i.length/3,Nt=b.generateSideWallUV(n,i,ht-6,ht-3,ht-2,ht-1);ue(Nt[0]),ue(Nt[1]),ue(Nt[3]),ue(Nt[1]),ue(Nt[2]),ue(Nt[3])}function zt(tt){i.push(c[tt*3+0]),i.push(c[tt*3+1]),i.push(c[tt*3+2])}function ue(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Pd(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Xo[i.type]().fromJSON(i)),new ra(n,t.options)}}const Cd={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new ct(r,a),new ct(o,c),new ct(l,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[i*3],d=t[i*3+1],m=t[i*3+2],v=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new ct(a,1-c),new ct(l,1-f),new ct(u,1-m),new ct(v,1-p)]:[new ct(o,1-c),new ct(h,1-f),new ct(d,1-m),new ct(g,1-p)]}};function Pd(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Qs extends we{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,f=t/o,u=e/c,d=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const b=p*u-a;for(let T=0;T<l;T++){const M=T*f-r;m.push(M,-b,0),v.push(0,0,1),g.push(T/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<o;b++){const T=b+l*p,M=b+l*(p+1),y=b+1+l*(p+1),E=b+1+l*p;d.push(T,M,E),d.push(M,y,E)}this.setIndex(d),this.setAttribute("position",new he(m,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qs(t.width,t.height,t.widthSegments,t.heightSegments)}}class aa extends we{constructor(t=new us([new ct(0,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new he(i,3)),this.setAttribute("normal",new he(r,3)),this.setAttribute("uv",new he(a,2));function l(h){const f=i.length/3,u=h.extractPoints(e);let d=u.shape;const m=u.holes;Yn.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,p=m.length;g<p;g++){const b=m[g];Yn.isClockWise(b)===!0&&(m[g]=b.reverse())}const v=Yn.triangulateShape(d,m);for(let g=0,p=m.length;g<p;g++){const b=m[g];d=d.concat(b)}for(let g=0,p=d.length;g<p;g++){const b=d[g];i.push(b.x,b.y,0),r.push(0,0,1),a.push(b.x,b.y)}for(let g=0,p=v.length;g<p;g++){const b=v[g],T=b[0]+f,M=b[1]+f,y=b[2]+f;n.push(T,M,y),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Ld(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new aa(n,t.curveSegments)}}function Ld(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class ds extends we{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],f=new A,u=new A,d=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const b=[],T=p/n,M=a+T*o,y=t*Math.cos(M),E=Math.sqrt(t*t-y*y);let C=0;p===0&&a===0?C=.5/e:p===n&&c===Math.PI&&(C=-.5/e);for(let x=0;x<=e;x++){const w=x/e,D=i+w*r;f.x=-E*Math.cos(D),f.y=y,f.z=E*Math.sin(D),m.push(f.x,f.y,f.z),u.copy(f).normalize(),v.push(u.x,u.y,u.z),g.push(w+C,1-T),b.push(l++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){const T=h[p][b+1],M=h[p][b],y=h[p+1][b],E=h[p+1][b+1];(p!==0||a>0)&&d.push(T,M,E),(p!==n-1||c<Math.PI)&&d.push(M,y,E)}this.setIndex(d),this.setAttribute("position",new he(m,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ds(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Dd extends we{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,i=new A,r=new A;if(t.index!==null){const a=t.attributes.position,o=t.index;let c=t.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){const f=c[l],u=f.start,d=f.count;for(let m=u,v=u+d;m<v;m+=3)for(let g=0;g<3;g++){const p=o.getX(m+g),b=o.getX(m+(g+1)%3);i.fromBufferAttribute(a,p),r.fromBufferAttribute(a,b),dl(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}}else{const a=t.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){const h=3*o+l,f=3*o+(l+1)%3;i.fromBufferAttribute(a,h),r.fromBufferAttribute(a,f),dl(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new he(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function dl(s,t,e){const n=`${s.x},${s.y},${s.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${s.x},${s.y},${s.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}function ps(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];if(pl(i))i.isRenderTargetTexture?(Ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(pl(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function Je(s){const t={};for(let e=0;e<s.length;e++){const n=ps(s[e]);for(const i in n)t[i]=n[i]}return t}function pl(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Id(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Yh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const gc={clone:ps,merge:Je};var Ud=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends vs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ud,this.fragmentShader=Nd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ps(t.uniforms),this.uniformsGroups=Id(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new se().setHex(i.value);break;case"v2":this.uniforms[n].value=new ct().fromArray(i.value);break;case"v3":this.uniforms[n].value=new A().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ge().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Ht().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ye().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Fd extends dn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Od extends vs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bd extends vs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Cr=new A,Pr=new Di,wn=new A;class Zh extends Ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Cr,Pr,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cr,Pr,wn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Cr,Pr,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cr,Pr,wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const oi=new A,ml=new ct,gl=new ct;class rn extends Zh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ys*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(cs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ys*2*Math.atan(Math.tan(cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(oi.x,oi.y).multiplyScalar(-t/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-t/oi.z)}getViewSize(t,e){return this.getViewBounds(t,ml,gl),e.subVectors(gl,ml)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(cs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class $h extends Zh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class zd extends we{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}const Ji=-90,Ki=1;class Gd extends Ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new rn(Ji,Ki,t,e);i.layers=this.layers,this.add(i);const r=new rn(Ji,Ki,t,e);r.layers=this.layers,this.add(r);const a=new rn(Ji,Ki,t,e);a.layers=this.layers,this.add(a);const o=new rn(Ji,Ki,t,e);o.layers=this.layers,this.add(o);const c=new rn(Ji,Ki,t,e);c.layers=this.layers,this.add(c);const l=new rn(Ji,Ki,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Vd extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Hd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=kd.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function kd(){this._document.hidden===!1&&this.reset()}class $o extends Lh{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const _l=new ye;class Wd{constructor(t,e,n=0,i=1/0){this.ray=new Ri(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new sa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Kt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _l.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_l),this}intersectObject(t,e=!0,n=[]){return Jo(t,this,n,e),n.sort(vl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Jo(t[i],this,n,e);return n.sort(vl),n}}function vl(s,t){return s.distance-t.distance}function Jo(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)Jo(r[a],t,e,!0)}}class Jh{static{Jh.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}}const xl=new A,Lr=new A,Qi=new A,ji=new A,ka=new A,Xd=new A,qd=new A;class _c{constructor(t=new A,e=new A){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){xl.subVectors(t,this.start),Lr.subVectors(this.end,this.start);const n=Lr.dot(Lr);if(n===0)return 0;let r=Lr.dot(xl)/n;return e&&(r=kt(r,0,1)),r}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(t,e=Xd,n=qd){const i=10000000000000001e-32;let r,a;const o=this.start,c=t.start,l=this.end,h=t.end;Qi.subVectors(l,o),ji.subVectors(h,c),ka.subVectors(o,c);const f=Qi.dot(Qi),u=ji.dot(ji),d=ji.dot(ka);if(f<=i&&u<=i)return e.copy(o),n.copy(c),e.sub(n),e.dot(e);if(f<=i)r=0,a=d/u,a=kt(a,0,1);else{const m=Qi.dot(ka);if(u<=i)a=0,r=kt(-m/f,0,1);else{const v=Qi.dot(ji),g=f*u-v*v;g!==0?r=kt((v*d-m*u)/g,0,1):r=0,a=(v*r+d)/u,a<0?(a=0,r=kt(-m/f,0,1)):a>1&&(a=1,r=kt((v-m)/f,0,1))}}return e.copy(o).addScaledVector(Qi,r),n.copy(c).addScaledVector(ji,a),e.distanceToSquared(n)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Ml(s,t,e,n){const i=Yd(n);switch(e){case Sh:return s*t;case bh:return s*t/i.components*i.byteLength;case oc:return s*t/i.components*i.byteLength;case Ai:return s*t*2/i.components*i.byteLength;case cc:return s*t*2/i.components*i.byteLength;case yh:return s*t*3/i.components*i.byteLength;case Sn:return s*t*4/i.components*i.byteLength;case lc:return s*t*4/i.components*i.byteLength;case Vr:case Hr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case kr:case Wr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case mo:case _o:return Math.max(s,16)*Math.max(t,8)/4;case po:case go:return Math.max(s,8)*Math.max(t,8)/2;case vo:case xo:case So:case yo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Mo:case Yr:case bo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Eo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case To:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case wo:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ro:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Co:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Po:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Lo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Do:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Io:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case No:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Fo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Oo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Bo:case zo:case Go:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Vo:case Ho:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Zr:case ko:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Yd(s){switch(s){case hn:case _h:return{byteLength:1,components:1};case Xs:case vh:case Bn:return{byteLength:2,components:1};case rc:case ac:return{byteLength:2,components:4};case On:case sc:case Ln:return{byteLength:4,components:1};case xh:case Mh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ic}}));typeof window<"u"&&(window.__THREE__?Ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ic);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kh(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Zd(s){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,f=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){const h=c.array,f=c.updateRanges;if(s.bindBuffer(l,o),f.length===0)s.bufferSubData(l,0,h);else{f.sort((d,m)=>d.start-m.start);let u=0;for(let d=1;d<f.length;d++){const m=f[u],v=f[d];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++u,f[u]=v)}f.length=u+1;for(let d=0,m=f.length;d<m;d++){const v=f[d];s.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(s.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var $d=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ep=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ip=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,cp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,vp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",wp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Up=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Vp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Zp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$p=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,im=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,am=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,um=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,fm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_m=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Em=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Tm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Am=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Dm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Im=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Um=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Nm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Om=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,zm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,km=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Zm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,n0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,i0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,s0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,r0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,c0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,l0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,h0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,p0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,g0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,M0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,E0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,A0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,R0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:$d,alphahash_pars_fragment:Jd,alphamap_fragment:Kd,alphamap_pars_fragment:Qd,alphatest_fragment:jd,alphatest_pars_fragment:tp,aomap_fragment:ep,aomap_pars_fragment:np,batching_pars_vertex:ip,batching_vertex:sp,begin_vertex:rp,beginnormal_vertex:ap,bsdfs:op,iridescence_fragment:cp,bumpmap_pars_fragment:lp,clipping_planes_fragment:hp,clipping_planes_pars_fragment:up,clipping_planes_pars_vertex:fp,clipping_planes_vertex:dp,color_fragment:pp,color_pars_fragment:mp,color_pars_vertex:gp,color_vertex:_p,common:vp,cube_uv_reflection_fragment:xp,defaultnormal_vertex:Mp,displacementmap_pars_vertex:Sp,displacementmap_vertex:yp,emissivemap_fragment:bp,emissivemap_pars_fragment:Ep,colorspace_fragment:Tp,colorspace_pars_fragment:wp,envmap_fragment:Ap,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Cp,envmap_pars_vertex:Pp,envmap_physical_pars_fragment:Vp,envmap_vertex:Lp,fog_vertex:Dp,fog_pars_vertex:Ip,fog_fragment:Up,fog_pars_fragment:Np,gradientmap_pars_fragment:Fp,lightmap_pars_fragment:Op,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:zp,lights_pars_begin:Gp,lights_toon_fragment:Hp,lights_toon_pars_fragment:kp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:Zp,lights_fragment_maps:$p,lights_fragment_end:Jp,lightprobes_pars_fragment:Kp,logdepthbuf_fragment:Qp,logdepthbuf_pars_fragment:jp,logdepthbuf_pars_vertex:tm,logdepthbuf_vertex:em,map_fragment:nm,map_pars_fragment:im,map_particle_fragment:sm,map_particle_pars_fragment:rm,metalnessmap_fragment:am,metalnessmap_pars_fragment:om,morphinstance_vertex:cm,morphcolor_vertex:lm,morphnormal_vertex:hm,morphtarget_pars_vertex:um,morphtarget_vertex:fm,normal_fragment_begin:dm,normal_fragment_maps:pm,normal_pars_fragment:mm,normal_pars_vertex:gm,normal_vertex:_m,normalmap_pars_fragment:vm,clearcoat_normal_fragment_begin:xm,clearcoat_normal_fragment_maps:Mm,clearcoat_pars_fragment:Sm,iridescence_pars_fragment:ym,opaque_fragment:bm,packing:Em,premultiplied_alpha_fragment:Tm,project_vertex:wm,dithering_fragment:Am,dithering_pars_fragment:Rm,roughnessmap_fragment:Cm,roughnessmap_pars_fragment:Pm,shadowmap_pars_fragment:Lm,shadowmap_pars_vertex:Dm,shadowmap_vertex:Im,shadowmask_pars_fragment:Um,skinbase_vertex:Nm,skinning_pars_vertex:Fm,skinning_vertex:Om,skinnormal_vertex:Bm,specularmap_fragment:zm,specularmap_pars_fragment:Gm,tonemapping_fragment:Vm,tonemapping_pars_fragment:Hm,transmission_fragment:km,transmission_pars_fragment:Wm,uv_pars_fragment:Xm,uv_pars_vertex:qm,uv_vertex:Ym,worldpos_vertex:Zm,background_vert:$m,background_frag:Jm,backgroundCube_vert:Km,backgroundCube_frag:Qm,cube_vert:jm,cube_frag:t0,depth_vert:e0,depth_frag:n0,distance_vert:i0,distance_frag:s0,equirect_vert:r0,equirect_frag:a0,linedashed_vert:o0,linedashed_frag:c0,meshbasic_vert:l0,meshbasic_frag:h0,meshlambert_vert:u0,meshlambert_frag:f0,meshmatcap_vert:d0,meshmatcap_frag:p0,meshnormal_vert:m0,meshnormal_frag:g0,meshphong_vert:_0,meshphong_frag:v0,meshphysical_vert:x0,meshphysical_frag:M0,meshtoon_vert:S0,meshtoon_frag:y0,points_vert:b0,points_frag:E0,shadow_vert:T0,shadow_frag:w0,sprite_vert:A0,sprite_frag:R0},ut={common:{diffuse:{value:new se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new se(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},je={basic:{uniforms:Je([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Je([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new se(0)},envMapIntensity:{value:1}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Je([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new se(0)},specular:{value:new se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Je([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Je([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new se(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Je([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Je([ut.points,ut.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Je([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Je([ut.common,ut.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Je([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Je([ut.sprite,ut.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distance:{uniforms:Je([ut.common,ut.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distance_vert,fragmentShader:Yt.distance_frag},shadow:{uniforms:Je([ut.lights,ut.fog,{color:{value:new se(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};je.physical={uniforms:Je([je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new se(0)},specularColor:{value:new se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Dr={r:0,b:0,g:0},C0=new ye,Qh=new Ht;Qh.set(-1,0,0,0,1,0,0,0,1);function P0(s,t,e,n,i,r){const a=new se(0);let o=i===!0?0:1,c,l,h=null,f=0,u=null;function d(b){let T=b.isScene===!0?b.background:null;if(T&&T.isTexture){const M=b.backgroundBlurriness>0;T=t.get(T,M)}return T}function m(b){let T=!1;const M=d(b);M===null?g(a,o):M&&M.isColor&&(g(M,1),T=!0);const y=s.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function v(b,T){const M=d(T);M&&(M.isCubeTexture||M.mapping===ia)?(l===void 0&&(l=new Se(new fn(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:ps(je.backgroundCube.uniforms),vertexShader:je.backgroundCube.vertexShader,fragmentShader:je.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(C0.makeRotationFromEuler(T.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Qh),l.material.toneMapped=jt.getTransfer(M.colorSpace)!==fe,(h!==M||f!==M.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,f=M.version,u=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Se(new Qs(2,2),new dn({name:"BackgroundMaterial",uniforms:ps(je.background.uniforms),vertexShader:je.background.vertexShader,fragmentShader:je.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=jt.getTransfer(M.colorSpace)!==fe,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,u=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function g(b,T){b.getRGB(Dr,Yh(s)),e.buffers.color.setClear(Dr.r,Dr.g,Dr.b,T,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,T=1){a.set(b),o=T,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,g(a,o)},render:m,addToRenderList:v,dispose:p}}function L0(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(L,I,O,P,B){let k=!1;const X=f(L,P,O,I);r!==X&&(r=X,l(r.object)),k=d(L,P,O,B),k&&m(L,P,O,B),B!==null&&t.update(B,s.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,M(L,I,O,P),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return s.createVertexArray()}function l(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function f(L,I,O,P){const B=P.wireframe===!0;let k=n[I.id];k===void 0&&(k={},n[I.id]=k);const X=L.isInstancedMesh===!0?L.id:0;let it=k[X];it===void 0&&(it={},k[X]=it);let q=it[O.id];q===void 0&&(q={},it[O.id]=q);let Q=q[B];return Q===void 0&&(Q=u(c()),q[B]=Q),Q}function u(L){const I=[],O=[],P=[];for(let B=0;B<e;B++)I[B]=0,O[B]=0,P[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:P,object:L,attributes:{},index:null}}function d(L,I,O,P){const B=r.attributes,k=I.attributes;let X=0;const it=O.getAttributes();for(const q in it)if(it[q].location>=0){const et=B[q];let Pt=k[q];if(Pt===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(Pt=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(Pt=L.instanceColor)),et===void 0||et.attribute!==Pt||Pt&&et.data!==Pt.data)return!0;X++}return r.attributesNum!==X||r.index!==P}function m(L,I,O,P){const B={},k=I.attributes;let X=0;const it=O.getAttributes();for(const q in it)if(it[q].location>=0){let et=k[q];et===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(et=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(et=L.instanceColor));const Pt={};Pt.attribute=et,et&&et.data&&(Pt.data=et.data),B[q]=Pt,X++}r.attributes=B,r.attributesNum=X,r.index=P}function v(){const L=r.newAttributes;for(let I=0,O=L.length;I<O;I++)L[I]=0}function g(L){p(L,0)}function p(L,I){const O=r.newAttributes,P=r.enabledAttributes,B=r.attributeDivisors;O[L]=1,P[L]===0&&(s.enableVertexAttribArray(L),P[L]=1),B[L]!==I&&(s.vertexAttribDivisor(L,I),B[L]=I)}function b(){const L=r.newAttributes,I=r.enabledAttributes;for(let O=0,P=I.length;O<P;O++)I[O]!==L[O]&&(s.disableVertexAttribArray(O),I[O]=0)}function T(L,I,O,P,B,k,X){X===!0?s.vertexAttribIPointer(L,I,O,B,k):s.vertexAttribPointer(L,I,O,P,B,k)}function M(L,I,O,P){v();const B=P.attributes,k=O.getAttributes(),X=I.defaultAttributeValues;for(const it in k){const q=k[it];if(q.location>=0){let Q=B[it];if(Q===void 0&&(it==="instanceMatrix"&&L.instanceMatrix&&(Q=L.instanceMatrix),it==="instanceColor"&&L.instanceColor&&(Q=L.instanceColor)),Q!==void 0){const et=Q.normalized,Pt=Q.itemSize,Tt=t.get(Q);if(Tt===void 0)continue;const re=Tt.buffer,Zt=Tt.type,ee=Tt.bytesPerElement,$=Zt===s.INT||Zt===s.UNSIGNED_INT||Q.gpuType===sc;if(Q.isInterleavedBufferAttribute){const j=Q.data,_t=j.stride,Bt=Q.offset;if(j.isInstancedInterleavedBuffer){for(let St=0;St<q.locationSize;St++)p(q.location+St,j.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let St=0;St<q.locationSize;St++)g(q.location+St);s.bindBuffer(s.ARRAY_BUFFER,re);for(let St=0;St<q.locationSize;St++)T(q.location+St,Pt/q.locationSize,Zt,et,_t*ee,(Bt+Pt/q.locationSize*St)*ee,$)}else{if(Q.isInstancedBufferAttribute){for(let j=0;j<q.locationSize;j++)p(q.location+j,Q.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let j=0;j<q.locationSize;j++)g(q.location+j);s.bindBuffer(s.ARRAY_BUFFER,re);for(let j=0;j<q.locationSize;j++)T(q.location+j,Pt/q.locationSize,Zt,et,Pt*ee,Pt/q.locationSize*j*ee,$)}}else if(X!==void 0){const et=X[it];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(q.location,et);break;case 3:s.vertexAttrib3fv(q.location,et);break;case 4:s.vertexAttrib4fv(q.location,et);break;default:s.vertexAttrib1fv(q.location,et)}}}}b()}function y(){w();for(const L in n){const I=n[L];for(const O in I){const P=I[O];for(const B in P){const k=P[B];for(const X in k)h(k[X].object),delete k[X];delete P[B]}}delete n[L]}}function E(L){if(n[L.id]===void 0)return;const I=n[L.id];for(const O in I){const P=I[O];for(const B in P){const k=P[B];for(const X in k)h(k[X].object),delete k[X];delete P[B]}}delete n[L.id]}function C(L){for(const I in n){const O=n[I];for(const P in O){const B=O[P];if(B[L.id]===void 0)continue;const k=B[L.id];for(const X in k)h(k[X].object),delete k[X];delete B[L.id]}}}function x(L){for(const I in n){const O=n[I],P=L.isInstancedMesh===!0?L.id:0,B=O[P];if(B!==void 0){for(const k in B){const X=B[k];for(const it in X)h(X[it].object),delete X[it];delete B[k]}delete O[P],Object.keys(O).length===0&&delete n[I]}}}function w(){D(),a=!0,r!==i&&(r=i,l(r.object))}function D(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:w,resetDefaultState:D,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:b}}function D0(s,t,e){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function I0(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==Sn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const x=C===Bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==hn&&C!==Ln&&!x&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Ot("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ot("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=s.getParameter(s.MAX_SAMPLES),E=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:M,maxSamples:y,samples:E}}function U0(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Xn,o=new Ht,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){const m=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,p=s.get(f);if(!i||m===null||m.length===0||r&&!g)r?h(null):l();else{const b=r?0:n,T=b*4;let M=p.clippingState||null;c.value=M,M=h(m,u,T,d);for(let y=0;y!==T;++y)M[y]=e[y];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,m){const v=f!==null?f.length:0;let g=null;if(v!==0){if(g=c.value,m!==!0||g===null){const p=d+v*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,M=d;T!==v;++T,M+=4)a.copy(f[T]).applyMatrix4(b,o),a.normal.toArray(g,M),g[M+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}const rs=4,N0=6,F0=20,O0=256,Rs=new $h,Sl=new se;let Wa=null,Xa=0,qa=0,Ya=!1;const B0=new A,xi=new A;class yl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=B0}=r;Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=El(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Wa,Xa,qa),this._renderer.xr.enabled=Ya,t.scissorTest=!1,ts(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wi||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:Bn,format:Sn,colorSpace:$r,depthBuffer:!1},i=bl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bl(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=z0(r)),this._blurMaterial=V0(r,t,e),this._ggxMaterial=G0(r,t,e)}return i}_compileMaterial(t){const e=new Se(new we,t);this._renderer.compile(e,Rs)}_sceneToCubeUV(t,e,n,i,r){const c=new rn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Sl),f.toneMapping=Nn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(i),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Se(new fn,new jn({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let p=!1;const b=t.background;b?b.isColor&&(g.color.copy(b),t.background=null,p=!0):(g.color.copy(Sl),p=!0);for(let T=0;T<6;T++){const M=T%3;M===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[T],r.y,r.z)):M===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[T]));const y=this._cubeSize;ts(i,M*y,T>2?y:0,y,y),f.setRenderTarget(i),p&&f.render(v,c),f.render(t,c)}f.toneMapping=d,f.autoClear=u,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===wi||t.mapping===hs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=El());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;ts(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Rs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=l*1.25,d=f*u,{_lodMax:m}=this,v=this._sizeLods[n],g=3*v*(n>m-rs?n-m+rs:0),p=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=m-e,ts(r,g,p,3*v,2*v),i.setRenderTarget(r),i.render(o,Rs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,ts(t,g,p,3*v,2*v),i.setRenderTarget(t),i.render(o,Rs)}_blur(t,e,n,i){const r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,i,r){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[i],f=3*h*(i>this._lodMax-rs?i-this._lodMax+rs:0),u=4*(this._cubeSize-h);ts(e,f,u,3*h,2*h),a.setRenderTarget(e),a.render(c,Rs)}}function z0(s){const t=[],e=[];let n=s;const i=s-rs+1+N0;for(let r=0;r<i;r++){const a=Math.pow(2,n);t.push(a);const o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,u=6,d=3,m=new Float32Array(d*u*f),v=new Float32Array(d*u*f);for(let p=0;p<f;p++){const b=p%3*2/3-1,T=p>2?0:-1,M=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];m.set(M,d*u*p);for(let y=0;y<u;y++){const E=h[y*2]*2-1,C=h[y*2+1]*2-1;p===0?xi.set(1,C,E):p===1?xi.set(-E,1,-C):p===2?xi.set(-E,C,1):p===3?xi.set(-1,C,-E):p===4?xi.set(-E,-1,C):xi.set(E,C,-1),xi.toArray(v,(p*u+y)*d)}}const g=new we;g.setAttribute("position",new un(m,d)),g.setAttribute("outputDirection",new un(v,d)),e.push(new Se(g,null)),n>rs&&n--}return{lodMeshes:e,sizeLods:t}}function bl(s,t,e){const n=new yn(s,t,e);return n.texture.mapping=ia,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ts(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function G0(s,t,e){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:O0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function V0(s,t,e){return new dn({name:"SphericalGaussianBlur",defines:{SAMPLES:F0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:oa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function El(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Tl(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function oa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class jh extends yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Nh(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new fn(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qe,blending:Zn});r.uniforms.tEquirect.value=e;const a=new Se(i,r),o=e.minFilter;return e.minFilter===Si&&(e.minFilter=Xe),new Gd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}function H0(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===da||d===pa)if(t.has(u)){const m=t.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const v=new jh(m.height);return v.fromEquirectangularTexture(s,u),t.set(u,v),u.addEventListener("dispose",l),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const d=u.mapping,m=d===da||d===pa,v=d===wi||d===hs;if(m||v){let g=e.get(u);const p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new yl(s)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{const b=u.image;return m&&b&&b.height>0||v&&b&&c(b)?(n===null&&(n=new yl(s)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===da?u.mapping=wi:d===pa&&(u.mapping=hs),u}function c(u){let d=0;const m=6;for(let v=0;v<m;v++)u[v]!==void 0&&d++;return d===m}function l(u){const d=u.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function k0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&os("WebGLRenderer: "+n+" extension not supported."),i}}}function W0(s,t,e,n){const i={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete i[u.id];const d=r.get(u);d&&(t.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function c(f){const u=f.attributes;for(const d in u)t.update(u[d],s.ARRAY_BUFFER)}function l(f){const u=[],d=f.index,m=f.attributes.position;let v=0;if(m===void 0)return;if(d!==null){const b=d.array;v=d.version;for(let T=0,M=b.length;T<M;T+=3){const y=b[T+0],E=b[T+1],C=b[T+2];u.push(y,E,E,C,C,y)}}else{const b=m.array;v=m.version;for(let T=0,M=b.length/3-1;T<M;T+=3){const y=T+0,E=T+1,C=T+2;u.push(y,E,E,C,C,y)}}const g=new(m.count>=65535?Ph:Ch)(u,1);g.version=v;const p=r.get(f);p&&t.remove(p),r.set(f,g)}function h(f){const u=r.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function X0(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){s.drawElements(n,u,r,f*a),e.update(u,n,1)}function l(f,u,d){d!==0&&(s.drawElementsInstanced(n,u,r,f*a,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let v=0;for(let g=0;g<d;g++)v+=u[g];e.update(v,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function q0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Kt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Y0(s,t,e){const n=new WeakMap,i=new ge;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let w=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let T=0;d===!0&&(T=1),m===!0&&(T=2),v===!0&&(T=3);let M=o.attributes.position.count*T,y=1;M>t.maxTextureSize&&(y=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const E=new Float32Array(M*y*4*f),C=new wh(E,M,y,f);C.type=Ln,C.needsUpdate=!0;const x=T*4;for(let D=0;D<f;D++){const L=g[D],I=p[D],O=b[D],P=M*y*4*D;for(let B=0;B<L.count;B++){const k=B*x;d===!0&&(i.fromBufferAttribute(L,B),E[P+k+0]=i.x,E[P+k+1]=i.y,E[P+k+2]=i.z,E[P+k+3]=0),m===!0&&(i.fromBufferAttribute(I,B),E[P+k+4]=i.x,E[P+k+5]=i.y,E[P+k+6]=i.z,E[P+k+7]=0),v===!0&&(i.fromBufferAttribute(O,B),E[P+k+8]=i.x,E[P+k+9]=i.y,E[P+k+10]=i.z,E[P+k+11]=O.itemSize===4?i.w:1)}}u={count:f,texture:C,size:new ct(M,y)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const m=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(s,"morphTargetBaseInfluence",m),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Z0(s,t,e,n,i){let r=new WeakMap;function a(l){const h=i.render.frame,f=l.geometry,u=t.get(l,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const $0={[lh]:"LINEAR_TONE_MAPPING",[hh]:"REINHARD_TONE_MAPPING",[uh]:"CINEON_TONE_MAPPING",[fh]:"ACES_FILMIC_TONE_MAPPING",[ph]:"AGX_TONE_MAPPING",[mh]:"NEUTRAL_TONE_MAPPING",[dh]:"CUSTOM_TONE_MAPPING"};function J0(s,t,e,n,i,r){const a=new yn(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new we;l.setAttribute("position",new he([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new he([0,2,0,0,2,0],2));const h=new Fd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Se(l,h),u=new $h(-1,1,1,-1,0,1);let d=null,m=null,v=!1,g,p=null,b=[],T=!1;this.setSize=function(M,y){a.setSize(M,y),o!==null&&o.setSize(M,y),c!==null&&c.setSize(M,y);for(let E=0;E<b.length;E++){const C=b[E];C.setSize&&C.setSize(M,y)}},this.setEffects=function(M){b=M,T=b.length>0&&b[0].isRenderPass===!0;const y=a.width,E=a.height;b.length>0&&o===null&&(o=new yn(y,E,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),c=new yn(y,E,{type:Bn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<b.length;C++){const x=b[C];x.setSize&&x.setSize(y,E)}},this.begin=function(M,y){if(v||M.toneMapping===Nn&&b.length===0)return!1;if(p=y,y!==null){const E=y.width,C=y.height;(a.width!==E||a.height!==C)&&this.setSize(E,C)}return T===!1&&M.setRenderTarget(a),g=M.toneMapping,M.toneMapping=Nn,!0},this.hasRenderPass=function(){return T},this.end=function(M,y){M.toneMapping=g,v=!0;let E=a,C=o;for(let x=0;x<b.length;x++){const w=b[x];w.enabled!==!1&&(w.render(M,C,E,y),w.needsSwap!==!1&&(E=C,C=C===o?c:o))}if(d!==M.outputColorSpace||m!==M.toneMapping){d=M.outputColorSpace,m=M.toneMapping,h.defines={},jt.getTransfer(d)===fe&&(h.defines.SRGB_TRANSFER="");const x=$0[m];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,M.setRenderTarget(p),M.render(f,u),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const tu=new Ye,Ko=new Zs(1,1),eu=new wh,nu=new If,iu=new Nh,wl=[],Al=[],Rl=new Float32Array(16),Cl=new Float32Array(9),Pl=new Float32Array(4);function xs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=wl[i];if(r===void 0&&(r=new Float32Array(i),wl[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Le(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function De(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ca(s,t){let e=Al[t];e===void 0&&(e=new Int32Array(t),Al[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function K0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Q0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;s.uniform2fv(this.addr,t),De(e,t)}}function j0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;s.uniform3fv(this.addr,t),De(e,t)}}function tg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;s.uniform4fv(this.addr,t),De(e,t)}}function eg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Pl.set(n),s.uniformMatrix2fv(this.addr,!1,Pl),De(e,n)}}function ng(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Cl.set(n),s.uniformMatrix3fv(this.addr,!1,Cl),De(e,n)}}function ig(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Rl.set(n),s.uniformMatrix4fv(this.addr,!1,Rl),De(e,n)}}function sg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function rg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;s.uniform2iv(this.addr,t),De(e,t)}}function ag(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;s.uniform3iv(this.addr,t),De(e,t)}}function og(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;s.uniform4iv(this.addr,t),De(e,t)}}function cg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function lg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;s.uniform2uiv(this.addr,t),De(e,t)}}function hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;s.uniform3uiv(this.addr,t),De(e,t)}}function ug(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;s.uniform4uiv(this.addr,t),De(e,t)}}function fg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ko.compareFunction=e.isReversedDepthBuffer()?uc:hc,r=Ko):r=tu,e.setTexture2D(t||r,i)}function dg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||nu,i)}function pg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||iu,i)}function mg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||eu,i)}function gg(s){switch(s){case 5126:return K0;case 35664:return Q0;case 35665:return j0;case 35666:return tg;case 35674:return eg;case 35675:return ng;case 35676:return ig;case 5124:case 35670:return sg;case 35667:case 35671:return rg;case 35668:case 35672:return ag;case 35669:case 35673:return og;case 5125:return cg;case 36294:return lg;case 36295:return hg;case 36296:return ug;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return dg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return mg}}function _g(s,t){s.uniform1fv(this.addr,t)}function vg(s,t){const e=xs(t,this.size,2);s.uniform2fv(this.addr,e)}function xg(s,t){const e=xs(t,this.size,3);s.uniform3fv(this.addr,e)}function Mg(s,t){const e=xs(t,this.size,4);s.uniform4fv(this.addr,e)}function Sg(s,t){const e=xs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function yg(s,t){const e=xs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function bg(s,t){const e=xs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Eg(s,t){s.uniform1iv(this.addr,t)}function Tg(s,t){s.uniform2iv(this.addr,t)}function wg(s,t){s.uniform3iv(this.addr,t)}function Ag(s,t){s.uniform4iv(this.addr,t)}function Rg(s,t){s.uniform1uiv(this.addr,t)}function Cg(s,t){s.uniform2uiv(this.addr,t)}function Pg(s,t){s.uniform3uiv(this.addr,t)}function Lg(s,t){s.uniform4uiv(this.addr,t)}function Dg(s,t,e){const n=this.cache,i=t.length,r=ca(e,i);Le(n,r)||(s.uniform1iv(this.addr,r),De(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Ko:a=tu;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function Ig(s,t,e){const n=this.cache,i=t.length,r=ca(e,i);Le(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||nu,r[a])}function Ug(s,t,e){const n=this.cache,i=t.length,r=ca(e,i);Le(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||iu,r[a])}function Ng(s,t,e){const n=this.cache,i=t.length,r=ca(e,i);Le(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||eu,r[a])}function Fg(s){switch(s){case 5126:return _g;case 35664:return vg;case 35665:return xg;case 35666:return Mg;case 35674:return Sg;case 35675:return yg;case 35676:return bg;case 5124:case 35670:return Eg;case 35667:case 35671:return Tg;case 35668:case 35672:return wg;case 35669:case 35673:return Ag;case 5125:return Rg;case 36294:return Cg;case 36295:return Pg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Dg;case 35679:case 36299:case 36307:return Ig;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Ng}}class Og{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=gg(e.type)}}class Bg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fg(e.type)}}class zg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Za=/(\w+)(\])?(\[|\.)?/g;function Ll(s,t){s.seq.push(t),s.map[t.id]=t}function Gg(s,t,e){const n=s.name,i=n.length;for(Za.lastIndex=0;;){const r=Za.exec(n),a=Za.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Ll(e,l===void 0?new Og(o,s,t):new Bg(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new zg(o),Ll(e,f)),e=f}}}class qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Gg(o,c,this)}const i=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Dl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Vg=37297;let Hg=0;function kg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Il=new Ht;function Wg(s){jt._getMatrix(Il,jt.workingColorSpace,s);const t=`mat3( ${Il.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case Jr:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return Ot("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ul(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+kg(s.getShaderSource(t),o)}else return r}function Xg(s,t){const e=Wg(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const qg={[lh]:"Linear",[hh]:"Reinhard",[uh]:"Cineon",[fh]:"ACESFilmic",[ph]:"AgX",[mh]:"Neutral",[dh]:"Custom"};function Yg(s,t){const e=qg[t];return e===void 0?(Ot("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ir=new A;function Zg(){jt.getLuminanceCoefficients(Ir);const s=Ir.x.toFixed(4),t=Ir.y.toFixed(4),e=Ir.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $g(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function Jg(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Kg(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Fs(s){return s!==""}function Nl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qo(s){return s.replace(Qg,t_)}const jg=new Map;function t_(s,t){let e=Yt[t];if(e===void 0){const n=jg.get(t);if(n!==void 0)e=Yt[n],Ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Qo(e)}const e_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ol(s){return s.replace(e_,n_)}function n_(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Bl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const i_={[Gr]:"SHADOWMAP_TYPE_PCF",[Us]:"SHADOWMAP_TYPE_VSM"};function s_(s){return i_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const r_={[wi]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE",[ia]:"ENVMAP_TYPE_CUBE_UV"};function a_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":r_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const o_={[hs]:"ENVMAP_MODE_REFRACTION"};function c_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":o_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const l_={[ch]:"ENVMAP_BLENDING_MULTIPLY",[$u]:"ENVMAP_BLENDING_MIX",[Ju]:"ENVMAP_BLENDING_ADD"};function h_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":l_[s.combine]||"ENVMAP_BLENDING_NONE"}function u_(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function f_(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=s_(e),l=a_(e),h=c_(e),f=h_(e),u=u_(e),d=$g(e),m=Jg(r),v=i.createProgram();let g,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Fs).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Fs).join(`
`),p.length>0&&(p+=`
`)):(g=[Bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),p=[Bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Nn?"#define TONE_MAPPING":"",e.toneMapping!==Nn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Nn?Yg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,Xg("linearToOutputTexel",e.outputColorSpace),Zg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),a=Qo(a),a=Nl(a,e),a=Fl(a,e),o=Qo(o),o=Nl(o,e),o=Fl(o,e),a=Ol(a),o=Ol(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=b+g+a,M=b+p+o,y=Dl(i,i.VERTEX_SHADER,T),E=Dl(i,i.FRAGMENT_SHADER,M);i.attachShader(v,y),i.attachShader(v,E),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function C(L){if(s.debug.checkShaderErrors){const I=i.getProgramInfoLog(v)||"",O=i.getShaderInfoLog(y)||"",P=i.getShaderInfoLog(E)||"",B=I.trim(),k=O.trim(),X=P.trim();let it=!0,q=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(it=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,y,E);else{const Q=Ul(i,y,"vertex"),et=Ul(i,E,"fragment");Kt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+B+`
`+Q+`
`+et)}else B!==""?Ot("WebGLProgram: Program Info Log:",B):(k===""||X==="")&&(q=!1);q&&(L.diagnostics={runnable:it,programLog:B,vertexShader:{log:k,prefix:g},fragmentShader:{log:X,prefix:p}})}i.deleteShader(y),i.deleteShader(E),x=new qr(i,v),w=Kg(i,v)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(v,Vg)),D},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=y,this.fragmentShader=E,this}let d_=0;class p_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new m_(t),e.set(t,n)),n}}class m_{constructor(t){this.id=d_++,this.code=t,this.usedTimes=0}}function g_(s){return s===Ai||s===Yr||s===Zr}function __(s,t,e,n,i,r){const a=new sa,o=new p_,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function v(x,w,D,L,I,O){const P=L.fog,B=I.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?L.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,it=t.get(x.envMap||k,X),q=it&&it.mapping===ia?it.image.height:null,Q=d[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Ot("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const et=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Pt=et!==void 0?et.length:0;let Tt=0;B.morphAttributes.position!==void 0&&(Tt=1),B.morphAttributes.normal!==void 0&&(Tt=2),B.morphAttributes.color!==void 0&&(Tt=3);let re,Zt,ee,$;if(Q){const _e=je[Q];re=_e.vertexShader,Zt=_e.fragmentShader}else{re=x.vertexShader,Zt=x.fragmentShader;const _e=o.getVertexShaderStage(x),ce=o.getFragmentShaderStage(x);o.update(x,_e,ce),ee=_e.id,$=ce.id}const j=s.getRenderTarget(),_t=s.state.buffers.depth.getReversed(),Bt=I.isInstancedMesh===!0,St=I.isBatchedMesh===!0,zt=!!x.map,ue=!!x.matcap,tt=!!it,st=!!x.aoMap,rt=!!x.lightMap,at=!!x.bumpMap&&x.wireframe===!1,ht=!!x.normalMap,Nt=!!x.displacementMap,Ut=!!x.emissiveMap,Gt=!!x.metalnessMap,Vt=!!x.roughnessMap,U=x.anisotropy>0,oe=x.clearcoat>0,$t=x.dispersion>0,R=x.retroreflectivity>0,_=x.iridescence>0,z=x.sheen>0,H=x.transmission>0,Y=U&&!!x.anisotropyMap,ot=oe&&!!x.clearcoatMap,lt=oe&&!!x.clearcoatNormalMap,Z=oe&&!!x.clearcoatRoughnessMap,K=_&&!!x.iridescenceMap,ft=_&&!!x.iridescenceThicknessMap,Lt=z&&!!x.sheenColorMap,gt=z&&!!x.sheenRoughnessMap,dt=!!x.specularMap,Dt=!!x.specularColorMap,Ft=!!x.specularIntensityMap,Wt=H&&!!x.transmissionMap,F=H&&!!x.thicknessMap,pt=!!x.gradientMap,J=!!x.alphaMap,mt=x.alphaTest>0,Mt=!!x.alphaHash,nt=!!x.extensions;let It=Nn;x.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(It=s.toneMapping);const Rt={shaderID:Q,shaderType:x.type,shaderName:x.name,vertexShader:re,fragmentShader:Zt,defines:x.defines,customVertexShaderID:ee,customFragmentShaderID:$,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:St,batchingColor:St&&I._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&I.instanceColor!==null,instancingMorph:Bt&&I.morphTexture!==null,outputColorSpace:j===null?s.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:zt,matcap:ue,envMap:tt,envMapMode:tt&&it.mapping,envMapCubeUVHeight:q,aoMap:st,lightMap:rt,bumpMap:at,normalMap:ht,displacementMap:Nt,emissiveMap:Ut,normalMapObjectSpace:ht&&x.normalMapType===ju,normalMapTangentSpace:ht&&x.normalMapType===Fc,packedNormalMap:ht&&x.normalMapType===Fc&&g_(x.normalMap.format),metalnessMap:Gt,roughnessMap:Vt,anisotropy:U,anisotropyMap:Y,clearcoat:oe,clearcoatMap:ot,clearcoatNormalMap:lt,clearcoatRoughnessMap:Z,dispersion:$t,retroreflection:R,iridescence:_,iridescenceMap:K,iridescenceThicknessMap:ft,sheen:z,sheenColorMap:Lt,sheenRoughnessMap:gt,specularMap:dt,specularColorMap:Dt,specularIntensityMap:Ft,transmission:H,transmissionMap:Wt,thicknessMap:F,gradientMap:pt,opaque:x.transparent===!1&&x.blending===zs&&x.alphaToCoverage===!1,alphaMap:J,alphaTest:mt,alphaHash:Mt,combine:x.combine,mapUv:zt&&m(x.map.channel),aoMapUv:st&&m(x.aoMap.channel),lightMapUv:rt&&m(x.lightMap.channel),bumpMapUv:at&&m(x.bumpMap.channel),normalMapUv:ht&&m(x.normalMap.channel),displacementMapUv:Nt&&m(x.displacementMap.channel),emissiveMapUv:Ut&&m(x.emissiveMap.channel),metalnessMapUv:Gt&&m(x.metalnessMap.channel),roughnessMapUv:Vt&&m(x.roughnessMap.channel),anisotropyMapUv:Y&&m(x.anisotropyMap.channel),clearcoatMapUv:ot&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:lt&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:gt&&m(x.sheenRoughnessMap.channel),specularMapUv:dt&&m(x.specularMap.channel),specularColorMapUv:Dt&&m(x.specularColorMap.channel),specularIntensityMapUv:Ft&&m(x.specularIntensityMap.channel),transmissionMapUv:Wt&&m(x.transmissionMap.channel),thicknessMapUv:F&&m(x.thicknessMap.channel),alphaMapUv:J&&m(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ht||U),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!B.attributes.uv&&(zt||J),fog:!!P,useFog:x.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&ht===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:_t,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:Tt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:It,decodeVideoTexture:zt&&x.map.isVideoTexture===!0&&jt.getTransfer(x.map.colorSpace)===fe,decodeVideoTextureEmissive:Ut&&x.emissiveMap.isVideoTexture===!0&&jt.getTransfer(x.emissiveMap.colorSpace)===fe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ln,flipSided:x.side===qe,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:nt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&x.extensions.multiDraw===!0||St)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Rt.vertexUv1s=c.has(1),Rt.vertexUv2s=c.has(2),Rt.vertexUv3s=c.has(3),c.clear(),Rt}function g(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)w.push(D),w.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(p(w,x),b(w,x),w.push(s.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function p(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function b(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function T(x){const w=d[x.type];let D;if(w){const L=je[w];D=gc.clone(L.uniforms)}else D=x.uniforms;return D}function M(x,w){let D=h.get(w);return D!==void 0?++D.usedTimes:(D=new f_(s,w,x,i),l.push(D),h.set(w,D)),D}function y(x){if(--x.usedTimes===0){const w=l.indexOf(x);l[w]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:T,acquireProgram:M,releaseProgram:y,releaseShaderCache:E,programs:l,dispose:C}}function v_(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function x_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function zl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Gl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,m,v,g,p){let b=s[t];return b===void 0?(b={id:u.id,object:u,geometry:d,material:m,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:g,group:p},s[t]=b):(b.id=u.id,b.object=u,b.geometry=d,b.material=m,b.materialVariant=a(u),b.groupOrder=v,b.renderOrder=u.renderOrder,b.z=g,b.group=p),t++,b}function c(u,d,m,v,g,p,b){b.reversedDepth===!0&&(g=-g);const T=o(u,d,m,v,g,p);m.transmission>0?n.push(T):m.transparent===!0?i.push(T):e.push(T)}function l(u,d,m,v,g,p){const b=o(u,d,m,v,g,p);m.transmission>0?n.unshift(b):m.transparent===!0?i.unshift(b):e.unshift(b)}function h(u,d){e.length>1&&e.sort(u||x_),n.length>1&&n.sort(d||zl),i.length>1&&i.sort(d||zl)}function f(){for(let u=t,d=s.length;u<d;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:f,sort:h}}function M_(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Gl,s.set(n,[a])):i>=r.length?(a=new Gl,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function S_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new A,color:new se};break;case"SpotLight":e={position:new A,direction:new A,color:new se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new se,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new se,groundColor:new se};break;case"RectAreaLight":e={color:new se,position:new A,halfWidth:new A,halfHeight:new A};break}return s[t.id]=e,e}}}function y_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let b_=0;function E_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function T_(s){const t=new S_,e=y_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new A);const i=new A,r=new ye,a=new ye;function o(l){let h=0,f=0,u=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let d=0,m=0,v=0,g=0,p=0,b=0,T=0,M=0,y=0,E=0,C=0,x=0,w=0,D=0;l.sort(E_);for(let I=0,O=l.length;I<O;I++){const P=l[I],B=P.color,k=P.intensity,X=P.distance;let it=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ai?it=P.shadow.map.texture:it=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=B.r*k,f+=B.g*k,u+=B.b*k;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],k);D++}else if(P.isSunLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,et=e.get(P);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[m]=et,n.sunShadowMap[m]=it;const Pt=Q.getViewportCount();for(let Tt=0;Tt<Pt;Tt++)n.sunShadowMatrix[v+Tt]=Q.getMatrix(Tt),n.sunShadowCascade[v+Tt]=Q._cascadeData[Tt];v+=Pt,m++}n.sun[d]=q,d++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,et=e.get(P);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,n.directionalShadow[g]=et,n.directionalShadowMap[g]=it,n.directionalShadowMatrix[g]=P.shadow.matrix,y++}n.directional[g]=q,g++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(B).multiplyScalar(k),q.distance=X,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[b]=q;const Q=P.shadow;if(P.map&&(n.spotLightMap[x]=P.map,x++,Q.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[b]=Q.matrix,P.castShadow){const et=e.get(P);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,n.spotShadow[b]=et,n.spotShadowMap[b]=it,C++}b++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(B).multiplyScalar(k),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[T]=q,T++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const Q=P.shadow,et=e.get(P);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,et.shadowCameraNear=Q.camera.near,et.shadowCameraFar=Q.camera.far,n.pointShadow[p]=et,n.pointShadowMap[p]=it,n.pointShadowMatrix[p]=P.shadow.matrix,E++}n.point[p]=q,p++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(k),q.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[M]=q,M++}}T>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const L=n.hash;(L.sunLength!==d||L.directionalLength!==g||L.pointLength!==p||L.spotLength!==b||L.rectAreaLength!==T||L.hemiLength!==M||L.numSunShadows!==m||L.numDirectionalShadows!==y||L.numPointShadows!==E||L.numSpotShadows!==C||L.numSpotMaps!==x||L.numLightProbes!==D)&&(n.sun.length=d,n.directional.length=g,n.spot.length=b,n.rectArea.length=T,n.point.length=p,n.hemi.length=M,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+x-w,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=D,L.sunLength=d,L.directionalLength=g,L.pointLength=p,L.spotLength=b,L.rectAreaLength=T,L.hemiLength=M,L.numSunShadows=m,L.numDirectionalShadows=y,L.numPointShadows=E,L.numSpotShadows=C,L.numSpotMaps=x,L.numLightProbes=D,n.version=b_++)}function c(l,h){let f=0,u=0,d=0,m=0,v=0,g=0;const p=h.matrixWorldInverse;for(let b=0,T=l.length;b<T;b++){const M=l[b];if(M.isSunLight){const y=n.sun[f];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(p),f++}else if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),u++}else if(M.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),m++}else if(M.isRectAreaLight){const y=n.rectArea[v];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(M.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),v++}else if(M.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:n}}function Vl(s){const t=new T_(s),e=[],n=[],i=[];function r(u){f.camera=u,e.length=0,n.length=0,i.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function c(u){i.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}const f={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function w_(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Vl(s),t.set(i,[o])):r>=a.length?(o=new Vl(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const A_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,C_=[new A(1,0,0),new A(-1,0,0),new A(0,1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1)],P_=[new A(0,-1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1),new A(0,-1,0),new A(0,-1,0)],Hl=new ye,Cs=new A,$a=new A;function L_(s,t,e){let n=new Ih;const i=new ct,r=new ct,a=new ge,o=new Od,c=new Bd,l={},h=e.maxTextureSize,f={[Ti]:qe,[qe]:Ti,[ln]:ln},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:A_,fragmentShader:R_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const m=new we;m.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Se(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gr;let p=this.type;this.render=function(E,C,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===Pu&&(Ot("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Gr);const w=s.getRenderTarget(),D=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),I=s.state;I.setBlending(Zn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const O=p!==this.type;O&&C.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(B=>B.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,B=E.length;P<B;P++){const k=E[P],X=k.shadow;if(X===void 0){Ot("WebGLShadowMap:",k,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const it=X.getFrameExtents();i.multiply(it),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/it.x),i.x=r.x*it.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/it.y),i.y=r.y*it.y,X.mapSize.y=r.y));const q=s.state.buffers.depth.getReversed();if(X.camera._reversedDepth=q,X.map===null||O===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Us){if(k.isPointLight){Ot("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new yn(i.x,i.y,{format:Ai,type:Bn,minFilter:Xe,magFilter:Xe,generateMipmaps:!1}),X.map.texture.name=k.name+".shadowMap",X.map.depthTexture=new Zs(i.x,i.y,Ln),X.map.depthTexture.name=k.name+".shadowMapDepth",X.map.depthTexture.format=Qn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=ze,X.map.depthTexture.magFilter=ze}else k.isPointLight?(X.map=new jh(i.x),X.map.depthTexture=new Kf(i.x,On)):(X.map=new yn(i.x,i.y),X.map.depthTexture=new Zs(i.x,i.y,On)),X.map.depthTexture.name=k.name+".shadowMap",X.map.depthTexture.format=Qn,this.type===Gr?(X.map.depthTexture.compareFunction=q?uc:hc,X.map.depthTexture.minFilter=Xe,X.map.depthTexture.magFilter=Xe):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=ze,X.map.depthTexture.magFilter=ze);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==i.x||X.map.height!==i.y)&&X.map.setSize(i.x,i.y);const Q=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();k.isPointLight!==!0&&X.updateMatrices(k,x);for(let et=0;et<Q;et++){const Pt=X.getCamera(et);if(k.isPointLight){const Tt=X.camera,re=X.matrix,Zt=k.distance||Tt.far;Zt!==Tt.far&&(Tt.far=Zt,Tt.updateProjectionMatrix()),Cs.setFromMatrixPosition(k.matrixWorld),Tt.position.copy(Cs),$a.copy(Tt.position),$a.add(C_[et]),Tt.up.copy(P_[et]),Tt.lookAt($a),Tt.updateMatrixWorld(),re.makeTranslation(-Cs.x,-Cs.y,-Cs.z),Hl.multiplyMatrices(Tt.projectionMatrix,Tt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Hl,Tt.coordinateSystem,Tt.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)s.setRenderTarget(X.map,et),s.clear();else{et===0&&(s.setRenderTarget(X.map),s.clear());const Tt=X.getViewport(et);a.set(r.x*Tt.x,r.y*Tt.y,r.x*Tt.z,r.y*Tt.w),I.viewport(a)}n=X.getFrustum(et),M(C,x,Pt,k,this.type)}X.isPointLightShadow!==!0&&this.type===Us&&b(X,x),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(w,D,L)};function b(E,C){const x=t.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new yn(i.x,i.y,{format:Ai,type:Bn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(C,null,x,u,v,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(C,null,x,d,v,null)}function T(E,C,x,w){let D=null;const L=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)D=L;else if(D=x.isPointLight===!0?c:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const I=D.uuid,O=C.uuid;let P=l[I];P===void 0&&(P={},l[I]=P);let B=P[O];B===void 0&&(B=D.clone(),P[O]=B,C.addEventListener("dispose",y)),D=B}if(D.visible=C.visible,D.wireframe=C.wireframe,w===Us?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:f[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const I=s.properties.get(D);I.light=x}return D}function M(E,C,x,w,D){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===Us)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const O=t.update(E),P=E.material;if(Array.isArray(P)){const B=O.groups;for(let k=0,X=B.length;k<X;k++){const it=B[k],q=P[it.materialIndex];if(q&&q.visible){const Q=T(E,q,w,D);E.onBeforeShadow(s,E,C,x,O,Q,it),s.renderBufferDirect(x,null,O,Q,E,it),E.onAfterShadow(s,E,C,x,O,Q,it)}}}else if(P.visible){const B=T(E,P,w,D);E.onBeforeShadow(s,E,C,x,O,B,null),s.renderBufferDirect(x,null,O,B,E,null),E.onAfterShadow(s,E,C,x,O,B,null)}}const I=E.children;for(let O=0,P=I.length;O<P;O++)M(I[O],C,x,w,D)}function y(E){E.target.removeEventListener("dispose",y);for(const x in l){const w=l[x],D=E.target.uuid;D in w&&(w[D].dispose(),delete w[D])}}}function D_(s,t){function e(){let F=!1;const pt=new ge;let J=null;const mt=new ge(0,0,0,0);return{setMask:function(Mt){J!==Mt&&!F&&(s.colorMask(Mt,Mt,Mt,Mt),J=Mt)},setLocked:function(Mt){F=Mt},setClear:function(Mt,nt,It,Rt,_e){_e===!0&&(Mt*=Rt,nt*=Rt,It*=Rt),pt.set(Mt,nt,It,Rt),mt.equals(pt)===!1&&(s.clearColor(Mt,nt,It,Rt),mt.copy(pt))},reset:function(){F=!1,J=null,mt.set(-1,0,0,0)}}}function n(){let F=!1,pt=!1,J=null,mt=null,Mt=null;return{setReversed:function(nt){if(pt!==nt){const It=t.get("EXT_clip_control");nt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),pt=nt;const Rt=Mt;Mt=null,this.setClear(Rt)}},getReversed:function(){return pt},setTest:function(nt){nt?j(s.DEPTH_TEST):_t(s.DEPTH_TEST)},setMask:function(nt){J!==nt&&!F&&(s.depthMask(nt),J=nt)},setFunc:function(nt){if(pt&&(nt=uf[nt]),mt!==nt){switch(nt){case so:s.depthFunc(s.NEVER);break;case ro:s.depthFunc(s.ALWAYS);break;case ao:s.depthFunc(s.LESS);break;case Ws:s.depthFunc(s.LEQUAL);break;case oo:s.depthFunc(s.EQUAL);break;case co:s.depthFunc(s.GEQUAL);break;case lo:s.depthFunc(s.GREATER);break;case ho:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}mt=nt}},setLocked:function(nt){F=nt},setClear:function(nt){Mt!==nt&&(Mt=nt,pt&&(nt=1-nt),s.clearDepth(nt))},reset:function(){F=!1,J=null,mt=null,Mt=null,pt=!1}}}function i(){let F=!1,pt=null,J=null,mt=null,Mt=null,nt=null,It=null,Rt=null,_e=null;return{setTest:function(ce){F||(ce?j(s.STENCIL_TEST):_t(s.STENCIL_TEST))},setMask:function(ce){pt!==ce&&!F&&(s.stencilMask(ce),pt=ce)},setFunc:function(ce,pn,En){(J!==ce||mt!==pn||Mt!==En)&&(s.stencilFunc(ce,pn,En),J=ce,mt=pn,Mt=En)},setOp:function(ce,pn,En){(nt!==ce||It!==pn||Rt!==En)&&(s.stencilOp(ce,pn,En),nt=ce,It=pn,Rt=En)},setLocked:function(ce){F=ce},setClear:function(ce){_e!==ce&&(s.clearStencil(ce),_e=ce)},reset:function(){F=!1,pt=null,J=null,mt=null,Mt=null,nt=null,It=null,Rt=null,_e=null}}}const r=new e,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},f={},u={},d=new WeakMap,m=[],v=null,g=!1,p=null,b=null,T=null,M=null,y=null,E=null,C=null,x=new se(0,0,0),w=0,D=!1,L=null,I=null,O=null,P=null,B=null;const k=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,it=0;const q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(q)[1]),X=it>=1):q.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),X=it>=2);let Q=null,et={};const Pt=s.getParameter(s.SCISSOR_BOX),Tt=s.getParameter(s.VIEWPORT),re=new ge().fromArray(Pt),Zt=new ge().fromArray(Tt);function ee(F,pt,J,mt){const Mt=new Uint8Array(4),nt=s.createTexture();s.bindTexture(F,nt),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let It=0;It<J;It++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(pt,0,s.RGBA,1,1,mt,0,s.RGBA,s.UNSIGNED_BYTE,Mt):s.texImage2D(pt+It,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Mt);return nt}const $={};$[s.TEXTURE_2D]=ee(s.TEXTURE_2D,s.TEXTURE_2D,1),$[s.TEXTURE_CUBE_MAP]=ee(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[s.TEXTURE_2D_ARRAY]=ee(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),$[s.TEXTURE_3D]=ee(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(s.DEPTH_TEST),a.setFunc(Ws),at(!1),ht(Dc),j(s.CULL_FACE),st(Zn);function j(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function _t(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Bt(F,pt){return u[F]!==pt?(s.bindFramebuffer(F,pt),u[F]=pt,F===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=pt),F===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=pt),!0):!1}function St(F,pt){let J=m,mt=!1;if(F){J=d.get(pt),J===void 0&&(J=[],d.set(pt,J));const Mt=F.textures;if(J.length!==Mt.length||J[0]!==s.COLOR_ATTACHMENT0){for(let nt=0,It=Mt.length;nt<It;nt++)J[nt]=s.COLOR_ATTACHMENT0+nt;J.length=Mt.length,mt=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,mt=!0);mt&&s.drawBuffers(J)}function zt(F){return v!==F?(s.useProgram(F),v=F,!0):!1}const ue={[ss]:s.FUNC_ADD,[Du]:s.FUNC_SUBTRACT,[Iu]:s.FUNC_REVERSE_SUBTRACT};ue[Uu]=s.MIN,ue[Nu]=s.MAX;const tt={[Fu]:s.ZERO,[Ou]:s.ONE,[Bu]:s.SRC_COLOR,[ah]:s.SRC_ALPHA,[Wu]:s.SRC_ALPHA_SATURATE,[Hu]:s.DST_COLOR,[Gu]:s.DST_ALPHA,[zu]:s.ONE_MINUS_SRC_COLOR,[oh]:s.ONE_MINUS_SRC_ALPHA,[ku]:s.ONE_MINUS_DST_COLOR,[Vu]:s.ONE_MINUS_DST_ALPHA,[Xu]:s.CONSTANT_COLOR,[qu]:s.ONE_MINUS_CONSTANT_COLOR,[Yu]:s.CONSTANT_ALPHA,[Zu]:s.ONE_MINUS_CONSTANT_ALPHA};function st(F,pt,J,mt,Mt,nt,It,Rt,_e,ce){if(F===Zn){g===!0&&(_t(s.BLEND),g=!1);return}if(g===!1&&(j(s.BLEND),g=!0),F!==Lu){if(F!==p||ce!==D){if((b!==ss||y!==ss)&&(s.blendEquation(s.FUNC_ADD),b=ss,y=ss),ce)switch(F){case zs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ic:s.blendFunc(s.ONE,s.ONE);break;case Uc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Nc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Kt("WebGLState: Invalid blending: ",F);break}else switch(F){case zs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ic:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Uc:Kt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nc:Kt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Kt("WebGLState: Invalid blending: ",F);break}T=null,M=null,E=null,C=null,x.set(0,0,0),w=0,p=F,D=ce}return}Mt=Mt||pt,nt=nt||J,It=It||mt,(pt!==b||Mt!==y)&&(s.blendEquationSeparate(ue[pt],ue[Mt]),b=pt,y=Mt),(J!==T||mt!==M||nt!==E||It!==C)&&(s.blendFuncSeparate(tt[J],tt[mt],tt[nt],tt[It]),T=J,M=mt,E=nt,C=It),(Rt.equals(x)===!1||_e!==w)&&(s.blendColor(Rt.r,Rt.g,Rt.b,_e),x.copy(Rt),w=_e),p=F,D=!1}function rt(F,pt){F.side===ln?_t(s.CULL_FACE):j(s.CULL_FACE);let J=F.side===qe;pt&&(J=!J),at(J),F.blending===zs&&F.transparent===!1?st(Zn):st(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const mt=F.stencilWrite;o.setTest(mt),mt&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ut(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?j(s.SAMPLE_ALPHA_TO_COVERAGE):_t(s.SAMPLE_ALPHA_TO_COVERAGE)}function at(F){L!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),L=F)}function ht(F){F!==Ru?(j(s.CULL_FACE),F!==I&&(F===Dc?s.cullFace(s.BACK):F===Cu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):_t(s.CULL_FACE),I=F}function Nt(F){F!==O&&(X&&s.lineWidth(F),O=F)}function Ut(F,pt,J){F?(j(s.POLYGON_OFFSET_FILL),(P!==pt||B!==J)&&(P=pt,B=J,a.getReversed()&&(pt=-pt),s.polygonOffset(pt,J))):_t(s.POLYGON_OFFSET_FILL)}function Gt(F){F?j(s.SCISSOR_TEST):_t(s.SCISSOR_TEST)}function Vt(F){F===void 0&&(F=s.TEXTURE0+k-1),Q!==F&&(s.activeTexture(F),Q=F)}function U(F,pt,J){J===void 0&&(Q===null?J=s.TEXTURE0+k-1:J=Q);let mt=et[J];mt===void 0&&(mt={type:void 0,texture:void 0},et[J]=mt),(mt.type!==F||mt.texture!==pt)&&(Q!==J&&(s.activeTexture(J),Q=J),s.bindTexture(F,pt||$[F]),mt.type=F,mt.texture=pt)}function oe(){const F=et[Q];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function $t(){try{s.compressedTexImage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function _(){try{s.texSubImage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function z(){try{s.texSubImage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function Y(){try{s.compressedTexSubImage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function ot(){try{s.texStorage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function lt(){try{s.texStorage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function Z(){try{s.texImage2D(...arguments)}catch(F){Kt("WebGLState:",F)}}function K(){try{s.texImage3D(...arguments)}catch(F){Kt("WebGLState:",F)}}function ft(F){return f[F]!==void 0?f[F]:s.getParameter(F)}function Lt(F,pt){f[F]!==pt&&(s.pixelStorei(F,pt),f[F]=pt)}function gt(F){re.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),re.copy(F))}function dt(F){Zt.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),Zt.copy(F))}function Dt(F,pt){let J=l.get(pt);J===void 0&&(J=new WeakMap,l.set(pt,J));let mt=J.get(F);mt===void 0&&(mt=s.getUniformBlockIndex(pt,F.name),J.set(F,mt))}function Ft(F,pt){const mt=l.get(pt).get(F);c.get(pt)!==mt&&(s.uniformBlockBinding(pt,mt,F.__bindingPointIndex),c.set(pt,mt))}function Wt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},Q=null,et={},u={},d=new WeakMap,m=[],v=null,g=!1,p=null,b=null,T=null,M=null,y=null,E=null,C=null,x=new se(0,0,0),w=0,D=!1,L=null,I=null,O=null,P=null,B=null,re.set(0,0,s.canvas.width,s.canvas.height),Zt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:j,disable:_t,bindFramebuffer:Bt,drawBuffers:St,useProgram:zt,setBlending:st,setMaterial:rt,setFlipSided:at,setCullFace:ht,setLineWidth:Nt,setPolygonOffset:Ut,setScissorTest:Gt,activeTexture:Vt,bindTexture:U,unbindTexture:oe,compressedTexImage2D:$t,compressedTexImage3D:R,texImage2D:Z,texImage3D:K,pixelStorei:Lt,getParameter:ft,updateUBOMapping:Dt,uniformBlockBinding:Ft,texStorage2D:ot,texStorage3D:lt,texSubImage2D:_,texSubImage3D:z,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:gt,viewport:dt,reset:Wt}}function I_(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ct,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,_){return m?new OffscreenCanvas(R,_):Qr("canvas")}function g(R,_,z){let H=1;const Y=$t(R);if((Y.width>z||Y.height>z)&&(H=z/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ot=Math.floor(H*Y.width),lt=Math.floor(H*Y.height);u===void 0&&(u=v(ot,lt));const Z=_?v(ot,lt):u;return Z.width=ot,Z.height=lt,Z.getContext("2d").drawImage(R,0,0,ot,lt),Ot("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ot+"x"+lt+")."),Z}else return"data"in R&&Ot("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function p(R){return R.generateMipmaps}function b(R){s.generateMipmap(R)}function T(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(R,_,z,H,Y,ot=!1){if(R!==null){if(s[R]!==void 0)return s[R];Ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let lt;H&&(lt=t.get("EXT_texture_norm16"),lt||Ot("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=_;if(_===s.RED&&(z===s.FLOAT&&(Z=s.R32F),z===s.HALF_FLOAT&&(Z=s.R16F),z===s.UNSIGNED_BYTE&&(Z=s.R8),z===s.UNSIGNED_SHORT&&lt&&(Z=lt.R16_EXT),z===s.SHORT&&lt&&(Z=lt.R16_SNORM_EXT)),_===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.R8UI),z===s.UNSIGNED_SHORT&&(Z=s.R16UI),z===s.UNSIGNED_INT&&(Z=s.R32UI),z===s.BYTE&&(Z=s.R8I),z===s.SHORT&&(Z=s.R16I),z===s.INT&&(Z=s.R32I)),_===s.RG&&(z===s.FLOAT&&(Z=s.RG32F),z===s.HALF_FLOAT&&(Z=s.RG16F),z===s.UNSIGNED_BYTE&&(Z=s.RG8),z===s.UNSIGNED_SHORT&&lt&&(Z=lt.RG16_EXT),z===s.SHORT&&lt&&(Z=lt.RG16_SNORM_EXT)),_===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RG8UI),z===s.UNSIGNED_SHORT&&(Z=s.RG16UI),z===s.UNSIGNED_INT&&(Z=s.RG32UI),z===s.BYTE&&(Z=s.RG8I),z===s.SHORT&&(Z=s.RG16I),z===s.INT&&(Z=s.RG32I)),_===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),z===s.UNSIGNED_INT&&(Z=s.RGB32UI),z===s.BYTE&&(Z=s.RGB8I),z===s.SHORT&&(Z=s.RGB16I),z===s.INT&&(Z=s.RGB32I)),_===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),z===s.UNSIGNED_INT&&(Z=s.RGBA32UI),z===s.BYTE&&(Z=s.RGBA8I),z===s.SHORT&&(Z=s.RGBA16I),z===s.INT&&(Z=s.RGBA32I)),_===s.RGB&&(z===s.UNSIGNED_SHORT&&lt&&(Z=lt.RGB16_EXT),z===s.SHORT&&lt&&(Z=lt.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(Z=s.R11F_G11F_B10F)),_===s.RGBA){const K=ot?Jr:jt.getTransfer(Y);z===s.FLOAT&&(Z=s.RGBA32F),z===s.HALF_FLOAT&&(Z=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Z=K===fe?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&lt&&(Z=lt.RGBA16_EXT),z===s.SHORT&&lt&&(Z=lt.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function y(R,_){let z;return R?_===null||_===On||_===qs?z=s.DEPTH24_STENCIL8:_===Ln?z=s.DEPTH32F_STENCIL8:_===Xs&&(z=s.DEPTH24_STENCIL8,Ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===On||_===qs?z=s.DEPTH_COMPONENT24:_===Ln?z=s.DEPTH_COMPONENT32F:_===Xs&&(z=s.DEPTH_COMPONENT16),z}function E(R,_){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==ze&&R.minFilter!==Xe?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function C(R){const _=R.target;_.removeEventListener("dispose",C),w(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&f.delete(_)}function x(R){const _=R.target;_.removeEventListener("dispose",x),L(_)}function w(R){const _=n.get(R);if(_.__webglInit===void 0)return;const z=R.source,H=d.get(z);if(H){const Y=H[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&D(R),Object.keys(H).length===0&&d.delete(z)}n.remove(R)}function D(R){const _=n.get(R);s.deleteTexture(_.__webglTexture);const z=R.source,H=d.get(z);delete H[_.__cacheKey],a.memory.textures--}function L(R){const _=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let Y=0;Y<_.__webglFramebuffer[H].length;Y++)s.deleteFramebuffer(_.__webglFramebuffer[H][Y]);else s.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)s.deleteFramebuffer(_.__webglFramebuffer[H]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const z=R.textures;for(let H=0,Y=z.length;H<Y;H++){const ot=n.get(z[H]);ot.__webglTexture&&(s.deleteTexture(ot.__webglTexture),a.memory.textures--),n.remove(z[H])}n.remove(R)}let I=0;function O(){I=0}function P(){return I}function B(R){I=R}function k(){const R=I;return R>=i.maxTextures&&Ot("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),I+=1,R}function X(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function it(R,_){const z=n.get(R);if(R.isVideoTexture&&U(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&z.__version!==R.version){const H=R.image;if(H===null)Ot("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Ot("WebGLRenderer: Texture marked for update but image is incomplete");else{_t(z,R,_);return}}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+_)}function q(R,_){const z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){_t(z,R,_);return}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+_)}function Q(R,_){const z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){_t(z,R,_);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+_)}function et(R,_){const z=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&z.__version!==R.version){Bt(z,R,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+_)}const Pt={[uo]:s.REPEAT,[qn]:s.CLAMP_TO_EDGE,[fo]:s.MIRRORED_REPEAT},Tt={[ze]:s.NEAREST,[Ku]:s.NEAREST_MIPMAP_NEAREST,[er]:s.NEAREST_MIPMAP_LINEAR,[Xe]:s.LINEAR,[ma]:s.LINEAR_MIPMAP_NEAREST,[Si]:s.LINEAR_MIPMAP_LINEAR},re={[ef]:s.NEVER,[of]:s.ALWAYS,[nf]:s.LESS,[hc]:s.LEQUAL,[sf]:s.EQUAL,[uc]:s.GEQUAL,[rf]:s.GREATER,[af]:s.NOTEQUAL};function Zt(R,_){if(_.type===Ln&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Xe||_.magFilter===ma||_.magFilter===er||_.magFilter===Si||_.minFilter===Xe||_.minFilter===ma||_.minFilter===er||_.minFilter===Si)&&Ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,Pt[_.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,Pt[_.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,Pt[_.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Tt[_.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Tt[_.minFilter]),_.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,re[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===ze||_.minFilter!==er&&_.minFilter!==Si||_.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ee(R,_){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",C));const H=_.source;let Y=d.get(H);Y===void 0&&(Y={},d.set(H,Y));const ot=X(_);if(ot!==R.__cacheKey){Y[ot]===void 0&&(Y[ot]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Y[ot].usedTimes++;const lt=Y[R.__cacheKey];lt!==void 0&&(Y[R.__cacheKey].usedTimes--,lt.usedTimes===0&&D(_)),R.__cacheKey=ot,R.__webglTexture=Y[ot].texture}return z}function $(R,_,z){return Math.floor(Math.floor(R/z)/_)}function j(R,_,z,H){const ot=R.updateRanges;if(ot.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,z,H,_.data);else{ot.sort((Lt,gt)=>Lt.start-gt.start);let lt=0;for(let Lt=1;Lt<ot.length;Lt++){const gt=ot[lt],dt=ot[Lt],Dt=gt.start+gt.count,Ft=$(dt.start,_.width,4),Wt=$(gt.start,_.width,4);dt.start<=Dt+1&&Ft===Wt&&$(dt.start+dt.count-1,_.width,4)===Ft?gt.count=Math.max(gt.count,dt.start+dt.count-gt.start):(++lt,ot[lt]=dt)}ot.length=lt+1;const Z=e.getParameter(s.UNPACK_ROW_LENGTH),K=e.getParameter(s.UNPACK_SKIP_PIXELS),ft=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let Lt=0,gt=ot.length;Lt<gt;Lt++){const dt=ot[Lt],Dt=Math.floor(dt.start/4),Ft=Math.ceil(dt.count/4),Wt=Dt%_.width,F=Math.floor(Dt/_.width),pt=Ft,J=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Wt),e.pixelStorei(s.UNPACK_SKIP_ROWS,F),e.texSubImage2D(s.TEXTURE_2D,0,Wt,F,pt,J,z,H,_.data)}R.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Z),e.pixelStorei(s.UNPACK_SKIP_PIXELS,K),e.pixelStorei(s.UNPACK_SKIP_ROWS,ft)}}function _t(R,_,z){let H=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=s.TEXTURE_3D);const Y=ee(R,_),ot=_.source;e.bindTexture(H,R.__webglTexture,s.TEXTURE0+z);const lt=n.get(ot);if(ot.version!==lt.__version||Y===!0){if(e.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const J=jt.getPrimaries(jt.workingColorSpace),mt=_.colorSpace===li?null:jt.getPrimaries(_.colorSpace),Mt=_.colorSpace===li||J===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt)}e.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment);let K=g(_.image,!1,i.maxTextureSize);K=oe(_,K);const ft=r.convert(_.format,_.colorSpace),Lt=r.convert(_.type);let gt=M(_.internalFormat,ft,Lt,_.normalized,_.colorSpace,_.isVideoTexture);Zt(H,_);let dt;const Dt=_.mipmaps,Ft=_.isVideoTexture!==!0,Wt=lt.__version===void 0||Y===!0,F=ot.dataReady,pt=E(_,K);if(_.isDepthTexture)gt=y(_.format===yi,_.type),Wt&&(Ft?e.texStorage2D(s.TEXTURE_2D,1,gt,K.width,K.height):e.texImage2D(s.TEXTURE_2D,0,gt,K.width,K.height,0,ft,Lt,null));else if(_.isDataTexture)if(Dt.length>0){Ft&&Wt&&e.texStorage2D(s.TEXTURE_2D,pt,gt,Dt[0].width,Dt[0].height);for(let J=0,mt=Dt.length;J<mt;J++)dt=Dt[J],Ft?F&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,dt.width,dt.height,ft,Lt,dt.data):e.texImage2D(s.TEXTURE_2D,J,gt,dt.width,dt.height,0,ft,Lt,dt.data);_.generateMipmaps=!1}else Ft?(Wt&&e.texStorage2D(s.TEXTURE_2D,pt,gt,K.width,K.height),F&&j(_,K,ft,Lt)):e.texImage2D(s.TEXTURE_2D,0,gt,K.width,K.height,0,ft,Lt,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ft&&Wt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,pt,gt,Dt[0].width,Dt[0].height,K.depth);for(let J=0,mt=Dt.length;J<mt;J++)if(dt=Dt[J],_.format!==Sn)if(ft!==null)if(Ft){if(F)if(_.layerUpdates.size>0){const Mt=Ml(dt.width,dt.height,_.format,_.type);for(const nt of _.layerUpdates){const It=dt.data.subarray(nt*Mt/dt.data.BYTES_PER_ELEMENT,(nt+1)*Mt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,nt,dt.width,dt.height,1,ft,It)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,dt.width,dt.height,K.depth,ft,dt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,gt,dt.width,dt.height,K.depth,0,dt.data,0,0);else Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?F&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,dt.width,dt.height,K.depth,ft,Lt,dt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,J,gt,dt.width,dt.height,K.depth,0,ft,Lt,dt.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ft&&Wt&&e.texStorage2D(s.TEXTURE_2D,pt,gt,Dt[0].width,Dt[0].height);for(let J=0,mt=Dt.length;J<mt;J++)dt=Dt[J],_.format!==Sn?ft!==null?Ft?F&&e.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(s.TEXTURE_2D,J,gt,dt.width,dt.height,0,dt.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?F&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,dt.width,dt.height,ft,Lt,dt.data):e.texImage2D(s.TEXTURE_2D,J,gt,dt.width,dt.height,0,ft,Lt,dt.data)}else if(_.isDataArrayTexture)if(Ft){if(Wt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,pt,gt,K.width,K.height,K.depth),F)if(_.layerUpdates.size>0){const J=Ml(K.width,K.height,_.format,_.type);for(const mt of _.layerUpdates){const Mt=K.data.subarray(mt*J/K.data.BYTES_PER_ELEMENT,(mt+1)*J/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,mt,K.width,K.height,1,ft,Lt,Mt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ft,Lt,K.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,gt,K.width,K.height,K.depth,0,ft,Lt,K.data);else if(_.isData3DTexture)Ft?(Wt&&e.texStorage3D(s.TEXTURE_3D,pt,gt,K.width,K.height,K.depth),F&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ft,Lt,K.data)):e.texImage3D(s.TEXTURE_3D,0,gt,K.width,K.height,K.depth,0,ft,Lt,K.data);else if(_.isFramebufferTexture){if(Wt)if(Ft)e.texStorage2D(s.TEXTURE_2D,pt,gt,K.width,K.height);else{let J=K.width,mt=K.height;for(let Mt=0;Mt<pt;Mt++)e.texImage2D(s.TEXTURE_2D,Mt,gt,J,mt,0,ft,Lt,null),J>>=1,mt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in s){const J=s.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),K.parentNode!==J){J.appendChild(K),f.add(_),J.onpaint=mt=>{const Mt=mt.changedElements;for(const nt of f)Mt.includes(nt.image)&&(nt.needsUpdate=!0)},J.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,K);else{const Mt=s.RGBA,nt=s.RGBA,It=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Mt,nt,It,K)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Ft&&Wt){const J=$t(Dt[0]);e.texStorage2D(s.TEXTURE_2D,pt,gt,J.width,J.height)}for(let J=0,mt=Dt.length;J<mt;J++)dt=Dt[J],Ft?F&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ft,Lt,dt):e.texImage2D(s.TEXTURE_2D,J,gt,ft,Lt,dt);_.generateMipmaps=!1}else if(Ft){if(Wt){const J=$t(K);e.texStorage2D(s.TEXTURE_2D,pt,gt,J.width,J.height)}F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ft,Lt,K)}else e.texImage2D(s.TEXTURE_2D,0,gt,ft,Lt,K);p(_)&&b(H),lt.__version=ot.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function Bt(R,_,z){if(_.image.length!==6)return;const H=ee(R,_),Y=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+z);const ot=n.get(Y);if(Y.version!==ot.__version||H===!0){e.activeTexture(s.TEXTURE0+z);const lt=jt.getPrimaries(jt.workingColorSpace),Z=_.colorSpace===li?null:jt.getPrimaries(_.colorSpace),K=_.colorSpace===li||lt===Z?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const ft=_.isCompressedTexture||_.image[0].isCompressedTexture,Lt=_.image[0]&&_.image[0].isDataTexture,gt=[];for(let nt=0;nt<6;nt++)!ft&&!Lt?gt[nt]=g(_.image[nt],!0,i.maxCubemapSize):gt[nt]=Lt?_.image[nt].image:_.image[nt],gt[nt]=oe(_,gt[nt]);const dt=gt[0],Dt=r.convert(_.format,_.colorSpace),Ft=r.convert(_.type),Wt=M(_.internalFormat,Dt,Ft,_.normalized,_.colorSpace),F=_.isVideoTexture!==!0,pt=ot.__version===void 0||H===!0,J=Y.dataReady;let mt=E(_,dt);Zt(s.TEXTURE_CUBE_MAP,_);let Mt;if(ft){F&&pt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Wt,dt.width,dt.height);for(let nt=0;nt<6;nt++){Mt=gt[nt].mipmaps;for(let It=0;It<Mt.length;It++){const Rt=Mt[It];_.format!==Sn?Dt!==null?F?J&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,0,0,Rt.width,Rt.height,Dt,Rt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,Wt,Rt.width,Rt.height,0,Rt.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,0,0,Rt.width,Rt.height,Dt,Ft,Rt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,Wt,Rt.width,Rt.height,0,Dt,Ft,Rt.data)}}}else{if(Mt=_.mipmaps,F&&pt){Mt.length>0&&mt++;const nt=$t(gt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Wt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Lt){F?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,gt[nt].width,gt[nt].height,Dt,Ft,gt[nt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Wt,gt[nt].width,gt[nt].height,0,Dt,Ft,gt[nt].data);for(let It=0;It<Mt.length;It++){const _e=Mt[It].image[nt].image;F?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,0,0,_e.width,_e.height,Dt,Ft,_e.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,Wt,_e.width,_e.height,0,Dt,Ft,_e.data)}}else{F?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Dt,Ft,gt[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Wt,Dt,Ft,gt[nt]);for(let It=0;It<Mt.length;It++){const Rt=Mt[It];F?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,0,0,Dt,Ft,Rt.image[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,Wt,Dt,Ft,Rt.image[nt])}}}p(_)&&b(s.TEXTURE_CUBE_MAP),ot.__version=Y.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function St(R,_,z,H,Y,ot){const lt=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),K=M(z.internalFormat,lt,Z,z.normalized,z.colorSpace),ft=n.get(_),Lt=n.get(z);if(Lt.__renderTarget=_,!ft.__hasExternalTextures){const gt=Math.max(1,_.width>>ot),dt=Math.max(1,_.height>>ot);Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?e.texImage3D(Y,ot,K,gt,dt,_.depth,0,lt,Z,null):e.texImage2D(Y,ot,K,gt,dt,0,lt,Z,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),Vt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,H,Y,Lt.__webglTexture,0,Gt(_)):(Y===s.TEXTURE_2D||Y>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,H,Y,Lt.__webglTexture,ot),e.bindFramebuffer(s.FRAMEBUFFER,null)}function zt(R,_,z){if(s.bindRenderbuffer(s.RENDERBUFFER,R),_.depthBuffer){const H=_.depthTexture,Y=H&&H.isDepthTexture?H.type:null,ot=y(_.stencilBuffer,Y),lt=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Vt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Gt(_),ot,_.width,_.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,Gt(_),ot,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,ot,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,lt,s.RENDERBUFFER,R)}else{const H=_.textures;for(let Y=0;Y<H.length;Y++){const ot=H[Y],lt=r.convert(ot.format,ot.colorSpace),Z=r.convert(ot.type),K=M(ot.internalFormat,lt,Z,ot.normalized,ot.colorSpace);Vt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Gt(_),K,_.width,_.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,Gt(_),K,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,K,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ue(R,_,z){const H=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(_.depthTexture);if(Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),Zt(s.TEXTURE_CUBE_MAP,_.depthTexture);const ft=r.convert(_.depthTexture.format),Lt=r.convert(_.depthTexture.type);let gt;_.depthTexture.format===Qn?gt=s.DEPTH_COMPONENT24:_.depthTexture.format===yi&&(gt=s.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,gt,_.width,_.height,0,ft,Lt,null)}}else it(_.depthTexture,0);const ot=Y.__webglTexture,lt=Gt(_),Z=H?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,K=_.depthTexture.format===yi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(_.depthTexture.format===Qn)Vt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,Z,ot,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,K,Z,ot,0);else if(_.depthTexture.format===yi)Vt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,Z,ot,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,K,Z,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(R){const _=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const H=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){const Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=H}if(R.depthTexture&&!_.__autoAllocateDepthBuffer)if(z)for(let H=0;H<6;H++)ue(_.__webglFramebuffer[H],R,H);else{const H=R.texture.mipmaps;H&&H.length>0?ue(_.__webglFramebuffer[0],R,0):ue(_.__webglFramebuffer,R,0)}else if(z){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=s.createRenderbuffer(),zt(_.__webglDepthbuffer[H],R,!1);else{const Y=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=_.__webglDepthbuffer[H];s.bindRenderbuffer(s.RENDERBUFFER,ot),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,ot)}}else{const H=R.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),zt(_.__webglDepthbuffer,R,!1);else{const Y=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ot),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,ot)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function st(R,_,z){const H=n.get(R);_!==void 0&&St(H.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&tt(R)}function rt(R){const _=R.texture,z=n.get(R),H=n.get(_);R.addEventListener("dispose",x);const Y=R.textures,ot=R.isWebGLCubeRenderTarget===!0,lt=Y.length>1;if(lt||(H.__webglTexture===void 0&&(H.__webglTexture=s.createTexture()),H.__version=_.version,a.memory.textures++),ot){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let K=0;K<_.mipmaps.length;K++)z.__webglFramebuffer[Z][K]=s.createFramebuffer()}else z.__webglFramebuffer[Z]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<_.mipmaps.length;Z++)z.__webglFramebuffer[Z]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(lt)for(let Z=0,K=Y.length;Z<K;Z++){const ft=n.get(Y[Z]);ft.__webglTexture===void 0&&(ft.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&Vt(R)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){const K=Y[Z];z.__webglColorRenderbuffer[Z]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);const ft=r.convert(K.format,K.colorSpace),Lt=r.convert(K.type),gt=M(K.internalFormat,ft,Lt,K.normalized,K.colorSpace,R.isXRRenderTarget===!0),dt=Gt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,gt,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Z,s.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),zt(z.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ot){e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture),Zt(s.TEXTURE_CUBE_MAP,_);for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)St(z.__webglFramebuffer[Z][K],R,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,K);else St(z.__webglFramebuffer[Z],R,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(_)&&b(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let Z=0,K=Y.length;Z<K;Z++){const ft=Y[Z],Lt=n.get(ft);let gt=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(gt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(gt,Lt.__webglTexture),Zt(gt,ft),St(z.__webglFramebuffer,R,ft,s.COLOR_ATTACHMENT0+Z,gt,0),p(ft)&&b(gt)}e.unbindTexture()}else{let Z=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Z,H.__webglTexture),Zt(Z,_),_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)St(z.__webglFramebuffer[K],R,_,s.COLOR_ATTACHMENT0,Z,K);else St(z.__webglFramebuffer,R,_,s.COLOR_ATTACHMENT0,Z,0);p(_)&&b(Z),e.unbindTexture()}R.depthBuffer&&tt(R)}function at(R){const _=R.textures;for(let z=0,H=_.length;z<H;z++){const Y=_[z];if(p(Y)){const ot=T(R),lt=n.get(Y).__webglTexture;e.bindTexture(ot,lt),b(ot),e.unbindTexture()}}}const ht=[],Nt=[];function Ut(R){if(R.samples>0){if(Vt(R)===!1){const _=R.textures,z=R.width,H=R.height;let Y=s.COLOR_BUFFER_BIT;const ot=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=n.get(R),Z=_.length>1;if(Z)for(let ft=0;ft<_.length;ft++)e.bindFramebuffer(s.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const K=R.texture.mipmaps;K&&K.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ft=0;ft<_.length;ft++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=s.STENCIL_BUFFER_BIT)),Z){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,lt.__webglColorRenderbuffer[ft]);const Lt=n.get(_[ft]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Lt,0)}s.blitFramebuffer(0,0,z,H,0,0,z,H,Y,s.NEAREST),c===!0&&(ht.length=0,Nt.length=0,ht.push(s.COLOR_ATTACHMENT0+ft),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(ht.push(ot),Nt.push(ot),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Nt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ht))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Z)for(let ft=0;ft<_.length;ft++){e.bindFramebuffer(s.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,lt.__webglColorRenderbuffer[ft]);const Lt=n.get(_[ft]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,Lt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&c){const _=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function Gt(R){return Math.min(i.maxSamples,R.samples)}function Vt(R){const _=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(R){const _=a.render.frame;h.get(R)!==_&&(h.set(R,_),R.update())}function oe(R,_){const z=R.colorSpace,H=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==$r&&z!==li&&(jt.getTransfer(z)===fe?(H!==Sn||Y!==hn)&&Ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Kt("WebGLTextures: Unsupported texture color space:",z)),_}function $t(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.getTextureUnits=P,this.setTextureUnits=B,this.setTexture2D=it,this.setTexture2DArray=q,this.setTexture3D=Q,this.setTextureCube=et,this.rebindTextures=st,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Vt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function U_(s,t){function e(n,i=li){let r;const a=jt.getTransfer(i);if(n===hn)return s.UNSIGNED_BYTE;if(n===rc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ac)return s.UNSIGNED_SHORT_5_5_5_1;if(n===xh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Mh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===_h)return s.BYTE;if(n===vh)return s.SHORT;if(n===Xs)return s.UNSIGNED_SHORT;if(n===sc)return s.INT;if(n===On)return s.UNSIGNED_INT;if(n===Ln)return s.FLOAT;if(n===Bn)return s.HALF_FLOAT;if(n===Sh)return s.ALPHA;if(n===yh)return s.RGB;if(n===Sn)return s.RGBA;if(n===Qn)return s.DEPTH_COMPONENT;if(n===yi)return s.DEPTH_STENCIL;if(n===bh)return s.RED;if(n===oc)return s.RED_INTEGER;if(n===Ai)return s.RG;if(n===cc)return s.RG_INTEGER;if(n===lc)return s.RGBA_INTEGER;if(n===Vr||n===Hr||n===kr||n===Wr)if(a===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===po||n===mo||n===go||n===_o)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===po)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===go)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_o)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vo||n===xo||n===Mo||n===So||n===yo||n===Yr||n===bo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===vo||n===xo)return a===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Mo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===So)return r.COMPRESSED_R11_EAC;if(n===yo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Yr)return r.COMPRESSED_RG11_EAC;if(n===bo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Eo||n===To||n===wo||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No||n===Fo||n===Oo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Eo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===To)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ao)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ro)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Co)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Po)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Lo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Io)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===No)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bo||n===zo||n===Go)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Bo)return a===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Go)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vo||n===Ho||n===Zr||n===ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ho)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const N_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,F_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class O_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Oh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new dn({vertexShader:N_,fragmentShader:F_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Se(new Qs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class B_ extends Li{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,m=null;const v=typeof XRWebGLBinding<"u",g=new O_,p={},b=e.getContextAttributes();let T=null,M=null;const y=[],E=[],C=new ct;let x=null,w=null;const D=new rn;D.viewport=new ge;const L=new rn;L.viewport=new ge;const I=[D,L],O=new Vd;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let j=y[$];return j===void 0&&(j=new ya,y[$]=j),j.getTargetRaySpace()},this.getControllerGrip=function($){let j=y[$];return j===void 0&&(j=new ya,y[$]=j),j.getGripSpace()},this.getHand=function($){let j=y[$];return j===void 0&&(j=new ya,y[$]=j),j.getHandSpace()};function k($){const j=E.indexOf($.inputSource);if(j===-1)return;const _t=y[j];_t!==void 0&&(_t.update($.inputSource,$.frame,l||a),_t.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",it);for(let $=0;$<y.length;$++){const j=E[$];j!==null&&(E[$]=null,y[$].disconnect(j))}P=null,B=null,g.reset();for(const $ in p)delete p[$];if(t.setRenderTarget(T),d=null,u=null,f=null,i=null,M=null,ee.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(C.width,C.height,!1),w!==null){const $=w.camera;$.fov=w.fov,$.zoom=w.zoom,$.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(i,e)),f},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(T=t.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",X),i.addEventListener("inputsourceschange",it),b.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Bt=null,St=null;b.depth&&(St=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=b.stencil?yi:Qn,Bt=b.stencil?qs:On);const zt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(zt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),M=new yn(u.textureWidth,u.textureHeight,{format:Sn,type:hn,depthTexture:new Zs(u.textureWidth,u.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const _t={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,_t),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new yn(d.framebufferWidth,d.framebufferHeight,{format:Sn,type:hn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),ee.setContext(i),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function it($){for(let j=0;j<$.removed.length;j++){const _t=$.removed[j],Bt=E.indexOf(_t);Bt>=0&&(E[Bt]=null,y[Bt].disconnect(_t))}for(let j=0;j<$.added.length;j++){const _t=$.added[j];let Bt=E.indexOf(_t);if(Bt===-1){for(let zt=0;zt<y.length;zt++)if(zt>=E.length){E.push(_t),Bt=zt;break}else if(E[zt]===null){E[zt]=_t,Bt=zt;break}if(Bt===-1)break}const St=y[Bt];St&&St.connect(_t)}}const q=new A,Q=new A;function et($,j,_t){q.setFromMatrixPosition(j.matrixWorld),Q.setFromMatrixPosition(_t.matrixWorld);const Bt=q.distanceTo(Q),St=j.projectionMatrix.elements,zt=_t.projectionMatrix.elements,ue=St[14]/(St[10]-1),tt=St[14]/(St[10]+1),st=(St[9]+1)/St[5],rt=(St[9]-1)/St[5],at=(St[8]-1)/St[0],ht=(zt[8]+1)/zt[0],Nt=ue*at,Ut=ue*ht,Gt=Bt/(-at+ht),Vt=Gt*-at;if(j.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Vt),$.translateZ(Gt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),St[10]===-1)$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const U=ue+Gt,oe=tt+Gt,$t=Nt-Vt,R=Ut+(Bt-Vt),_=st*tt/oe*U,z=rt*tt/oe*U;$.projectionMatrix.makePerspective($t,R,_,z,U,oe),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Pt($,j){j===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(j.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let j=$.near,_t=$.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(_t=g.depthFar)),O.near=L.near=D.near=j,O.far=L.far=D.far=_t,(P!==O.near||B!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),P=O.near,B=O.far),O.layers.mask=$.layers.mask|6,D.layers.mask=O.layers.mask&-5,L.layers.mask=O.layers.mask&-3;const Bt=$.parent,St=O.cameras;Pt(O,Bt);for(let zt=0;zt<St.length;zt++)Pt(St[zt],Bt);St.length===2?et(O,D,L):O.projectionMatrix.copy(D.projectionMatrix),w===null&&$.isPerspectiveCamera&&(w={camera:$,fov:$.fov,zoom:$.zoom}),Tt($,O,Bt)};function Tt($,j,_t){_t===null?$.matrix.copy(j.matrixWorld):($.matrix.copy(_t.matrixWorld),$.matrix.invert(),$.matrix.multiply(j.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ys*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function($){return p[$]};let re=null;function Zt($,j){if(h=j.getViewerPose(l||a),m=j,h!==null){const _t=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let Bt=!1;_t.length!==O.cameras.length&&(O.cameras.length=0,Bt=!0);for(let tt=0;tt<_t.length;tt++){const st=_t[tt];let rt=null;if(d!==null)rt=d.getViewport(st);else{const ht=f.getViewSubImage(u,st);rt=ht.viewport,tt===0&&(t.setRenderTargetTextures(M,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(M))}let at=I[tt];at===void 0&&(at=new rn,at.layers.enable(tt),at.viewport=new ge,I[tt]=at),at.matrix.fromArray(st.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(st.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(rt.x,rt.y,rt.width,rt.height),tt===0&&(O.matrix.copy(at.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Bt===!0&&O.cameras.push(at)}const St=i.enabledFeatures;if(St&&St.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){f=n.getBinding();const tt=f.getDepthInformation(_t[0]);tt&&tt.isValid&&tt.texture&&g.init(tt,i.renderState)}if(St&&St.includes("camera-access")&&v){t.state.unbindTexture(),f=n.getBinding();for(let tt=0;tt<_t.length;tt++){const st=_t[tt].camera;if(st){let rt=p[st];rt||(rt=new Oh,p[st]=rt);const at=f.getCameraImage(st);rt.sourceTexture=at}}}}for(let _t=0;_t<y.length;_t++){const Bt=E[_t],St=y[_t];Bt!==null&&St!==void 0&&St.update(Bt,j,l||a)}re&&re($,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),m=null}const ee=new Kh;ee.setAnimationLoop(Zt),this.setAnimationLoop=function($){re=$},this.dispose=function(){}}}const z_=new ye,su=new Ht;su.set(-1,0,0,0,1,0,0,0,1);function G_(s,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Yh(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,b,T,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&d(g,p,M)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,b,T):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===qe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===qe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const b=t.get(p),T=b.envMap,M=b.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(z_.makeRotationFromEuler(M)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(su),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,b,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=T*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const b=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function V_(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,y){const E=y.program;n.uniformBlockBinding(M,E)}function l(M,y){let E=i[M.id];E===void 0&&(g(M),E=h(M),i[M.id]=E,M.addEventListener("dispose",b));const C=y.program;n.updateUBOMapping(M,C);const x=t.render.frame;r[M.id]!==x&&(u(M),r[M.id]=x)}function h(M){const y=f();M.__bindingPointIndex=y;const E=s.createBuffer(),C=M.__size,x=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,C,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,E),E}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Kt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const y=i[M.id],E=M.uniforms,C=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let x=0,w=E.length;x<w;x++){const D=E[x];if(Array.isArray(D))for(let L=0,I=D.length;L<I;L++)d(D[L],x,L,C);else d(D,x,0,C)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(M,y,E,C){if(v(M,y,E,C)===!0){const x=M.__offset,w=M.value;if(Array.isArray(w)){let D=0;for(let L=0;L<w.length;L++){const I=w[L],O=p(I);m(I,M.__data,D),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(D+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,M.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,M.__data)}}function m(M,y,E){typeof M=="number"||typeof M=="boolean"?y[0]=M:M.isMatrix3?(y[0]=M.elements[0],y[1]=M.elements[1],y[2]=M.elements[2],y[3]=0,y[4]=M.elements[3],y[5]=M.elements[4],y[6]=M.elements[5],y[7]=0,y[8]=M.elements[6],y[9]=M.elements[7],y[10]=M.elements[8],y[11]=0):ArrayBuffer.isView(M)?y.set(new M.constructor(M.buffer,M.byteOffset,y.length)):M.toArray(y,E)}function v(M,y,E,C){const x=M.value,w=y+"_"+E;if(C[w]===void 0)return typeof x=="number"||typeof x=="boolean"?C[w]=x:ArrayBuffer.isView(x)?C[w]=x.slice():C[w]=x.clone(),!0;{const D=C[w];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return C[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function g(M){const y=M.uniforms;let E=0;const C=16;for(let w=0,D=y.length;w<D;w++){const L=Array.isArray(y[w])?y[w]:[y[w]];for(let I=0,O=L.length;I<O;I++){const P=L[I],B=Array.isArray(P.value)?P.value:[P.value];for(let k=0,X=B.length;k<X;k++){const it=B[k],q=p(it),Q=E%C,et=Q%q.boundary,Pt=Q+et;E+=et,Pt!==0&&C-Pt<q.storage&&(E+=C-Pt),P.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=E,E+=q.storage}}}const x=E%C;return x>0&&(E+=C-x),M.__size=E,M.__cache={},this}function p(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?Ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(y.boundary=16,y.storage=M.byteLength):Ot("WebGLRenderer: Unsupported uniform value type.",M),y}function b(M){const y=M.target;y.removeEventListener("dispose",b);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function T(){for(const M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:c,update:l,dispose:T}}const H_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let An=null;function k_(){return An===null&&(An=new Zf(H_,16,16,Ai,Bn),An.name="DFG_LUT",An.minFilter=Xe,An.magFilter=Xe,An.wrapS=qn,An.wrapT=qn,An.generateMipmaps=!1,An.needsUpdate=!0),An}class W_{constructor(t={}){const{canvas:e=lf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=hn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const v=d,g=new Set([lc,cc,oc]),p=new Set([hn,On,Xs,qs,rc,ac]),b=new Uint32Array(4),T=new Int32Array(4),M=new A;let y=null,E=null;const C=[],x=[];let w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let L=!1,I=null,O=null,P=null,B=null;this._outputColorSpace=Qe;let k=0,X=0,it=null,q=-1,Q=null;const et=new ge,Pt=new ge;let Tt=null;const re=new se(0);let Zt=0,ee=e.width,$=e.height,j=1,_t=null,Bt=null;const St=new ge(0,0,ee,$),zt=new ge(0,0,ee,$);let ue=!1;const tt=new Ih;let st=!1,rt=!1;const at=new ye,ht=new A,Nt=new ge,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Vt(){return it===null?j:1}let U=n;function oe(S,N){return e.getContext(S,N)}let $t,R,_,z,H,Y,ot,lt,Z,K,ft,Lt,gt,dt,Dt,Ft,Wt,F,pt,J,mt,Mt,nt;try{const S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ic}`),e.addEventListener("webglcontextlost",_e,!1),e.addEventListener("webglcontextrestored",ce,!1),e.addEventListener("webglcontextcreationerror",pn,!1),U===null){const N="webgl2";if(U=oe(N,S),U===null)throw oe(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(S){throw e.removeEventListener("webglcontextlost",_e,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",pn,!1),Kt("WebGLRenderer: "+S.message),S}function It(){$t=new k0(U),$t.init(),mt=new U_(U,$t),R=new I0(U,$t,t,mt),_=new D_(U,$t),R.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),O=U.createFramebuffer(),P=U.createFramebuffer(),B=U.createFramebuffer(),z=new q0(U),H=new v_,Y=new I_(U,$t,_,H,R,mt,z),ot=new H0(D),lt=new Zd(U),Mt=new L0(U,lt),Z=new W0(U,lt,z,Mt),K=new Z0(U,Z,lt,Mt,z),F=new Y0(U,R,Y),Dt=new U0(H),ft=new __(D,ot,$t,R,Mt,Dt),Lt=new G_(D,H),gt=new M_,dt=new w_($t),Wt=new P0(D,ot,_,K,m,c),Ft=new L_(D,K,R),nt=new V_(U,z,R,_),pt=new D0(U,$t,z),J=new X0(U,$t,z),z.programs=ft.programs,D.capabilities=R,D.extensions=$t,D.properties=H,D.renderLists=gt,D.shadowMap=Ft,D.state=_,D.info=z}v!==hn&&(w=new J0(v,e.width,e.height,o,i,r));const Rt=new B_(D,U);this.xr=Rt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=$t.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=$t.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(S){S!==void 0&&(j=S,this.setSize(ee,$,!1))},this.getSize=function(S){return S.set(ee,$)},this.setSize=function(S,N,W=!0){if(Rt.isPresenting){Ot("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=S,$=N,e.width=Math.floor(S*j),e.height=Math.floor(N*j),W===!0&&(e.style.width=S+"px",e.style.height=N+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(ee*j,$*j).floor()},this.setDrawingBufferSize=function(S,N,W){ee=S,$=N,j=W,e.width=Math.floor(S*W),e.height=Math.floor(N*W),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(v===hn){Kt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){Ot("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(et)},this.getViewport=function(S){return S.copy(St)},this.setViewport=function(S,N,W,G){S.isVector4?St.set(S.x,S.y,S.z,S.w):St.set(S,N,W,G),_.viewport(et.copy(St).multiplyScalar(j).round())},this.getScissor=function(S){return S.copy(zt)},this.setScissor=function(S,N,W,G){S.isVector4?zt.set(S.x,S.y,S.z,S.w):zt.set(S,N,W,G),_.scissor(Pt.copy(zt).multiplyScalar(j).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(S){_.setScissorTest(ue=S)},this.setOpaqueSort=function(S){_t=S},this.setTransparentSort=function(S){Bt=S},this.getClearColor=function(S){return S.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor(...arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,W=!0){let G=0;if(S){let V=!1;if(it!==null){const xt=it.texture.format;V=g.has(xt)}if(V){const xt=it.texture.type,bt=p.has(xt),vt=Wt.getClearColor(),wt=Wt.getClearAlpha(),Ct=vt.r,qt=vt.g,Jt=vt.b;bt?(b[0]=Ct,b[1]=qt,b[2]=Jt,b[3]=wt,U.clearBufferuiv(U.COLOR,0,b)):(T[0]=Ct,T[1]=qt,T[2]=Jt,T[3]=wt,U.clearBufferiv(U.COLOR,0,T))}else G|=U.COLOR_BUFFER_BIT}N&&(G|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),I=S},this.dispose=function(){e.removeEventListener("webglcontextlost",_e,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",pn,!1),Wt.dispose(),gt.dispose(),dt.dispose(),H.dispose(),ot.dispose(),K.dispose(),Mt.dispose(),nt.dispose(),ft.dispose(),Rt.dispose(),Rt.removeEventListener("sessionstart",bc),Rt.removeEventListener("sessionend",Ec),pi.stop()};function _e(S){S.preventDefault(),jr("WebGLRenderer: Context Lost."),L=!0}function ce(){jr("WebGLRenderer: Context Restored."),L=!1;const S=z.autoReset,N=Ft.enabled,W=Ft.autoUpdate,G=Ft.needsUpdate,V=Ft.type;It(),z.autoReset=S,Ft.enabled=N,Ft.autoUpdate=W,Ft.needsUpdate=G,Ft.type=V}function pn(S){Kt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function En(S){const N=S.target;N.removeEventListener("dispose",En),Su(N)}function Su(S){yu(S),H.remove(S)}function yu(S){const N=H.get(S).programs;N!==void 0&&(N.forEach(function(W){ft.releaseProgram(W)}),S.isShaderMaterial&&ft.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,W,G,V,xt){N===null&&(N=Ut);const bt=V.isMesh&&V.matrixWorld.determinantAffine()<0,vt=Tu(S,N,W,G,V);_.setMaterial(G,bt);let wt=W.index,Ct=1;if(G.wireframe===!0){if(wt=Z.getWireframeAttribute(W),wt===void 0)return;Ct=2}const qt=W.drawRange,Jt=W.attributes.position;let At=qt.start*Ct,le=(qt.start+qt.count)*Ct;xt!==null&&(At=Math.max(At,xt.start*Ct),le=Math.min(le,(xt.start+xt.count)*Ct)),wt!==null?(At=Math.max(At,0),le=Math.min(le,wt.count)):Jt!=null&&(At=Math.max(At,0),le=Math.min(le,Jt.count));const Ce=le-At;if(Ce<0||Ce===1/0)return;Mt.setup(V,G,vt,W,wt);let be,me=pt;if(wt!==null&&(be=lt.get(wt),me=J,me.setIndex(be)),V.isMesh)G.wireframe===!0?(_.setLineWidth(G.wireframeLinewidth*Vt()),me.setMode(U.LINES)):me.setMode(U.TRIANGLES);else if(V.isLine){let Ge=G.linewidth;Ge===void 0&&(Ge=1),_.setLineWidth(Ge*Vt()),V.isLineSegments?me.setMode(U.LINES):V.isLineLoop?me.setMode(U.LINE_LOOP):me.setMode(U.LINE_STRIP)}else V.isPoints?me.setMode(U.POINTS):V.isSprite&&me.setMode(U.TRIANGLES);if(V.isBatchedMesh)if($t.get("WEBGL_multi_draw"))me.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Ge=V._multiDrawStarts,yt=V._multiDrawCounts,Ze=V._multiDrawCount,ne=wt?lt.get(wt).bytesPerElement:1,on=H.get(G).currentProgram.getUniforms();for(let Tn=0;Tn<Ze;Tn++)on.setValue(U,"_gl_DrawID",Tn),me.render(Ge[Tn]/ne,yt[Tn])}else if(V.isInstancedMesh)me.renderInstances(At,Ce,V.count);else if(W.isInstancedBufferGeometry){const Ge=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,yt=Math.min(W.instanceCount,Ge);me.renderInstances(At,Ce,yt)}else me.render(At,Ce)};function yc(S,N,W,G){I!==null&&S.isNodeMaterial&&I.setObject(G,S),st===!0&&Dt.setState(S,W,!1),S.transparent===!0&&S.side===ln&&S.forceSinglePass===!1?(S.side=qe,S.needsUpdate=!0,tr(S,N,G),S.side=Ti,S.needsUpdate=!0,tr(S,N,G),S.side=ln):tr(S,N,G)}this.compile=function(S,N,W=null){W===null&&(W=S),I!==null&&I.renderStart(S,N,W),E=dt.get(W),E.init(N),x.push(E),W.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),S!==W&&S.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights(),I!==null&&I.updateLights(E.state.lightsArray),rt=this.localClippingEnabled,st=Dt.init(this.clippingPlanes,rt),st===!0&&Dt.setGlobalState(this.clippingPlanes,N),I!==null&&Ft.render(E.state.shadowsArray,W,N);const G=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const xt=V.material;if(xt)if(Array.isArray(xt))for(let bt=0;bt<xt.length;bt++){const vt=xt[bt];yc(vt,W,N,V),G.add(vt)}else yc(xt,W,N,V),G.add(xt)}),E=x.pop(),I!==null&&I.renderEnd(),G},this.compileAsync=function(S,N,W=null){const G=this.compile(S,N,W);return new Promise(V=>{function xt(){if(G.forEach(function(bt){const wt=H.get(bt).currentProgram;(wt===void 0||wt.isReady())&&G.delete(bt)}),G.size===0){V(S);return}setTimeout(xt,10)}$t.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let ua=null;function bu(S){ua&&ua(S)}function bc(){pi.stop()}function Ec(){pi.start()}const pi=new Kh;pi.setAnimationLoop(bu),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(S){ua=S,Rt.setAnimationLoop(S),S===null?pi.stop():pi.start()},Rt.addEventListener("sessionstart",bc),Rt.addEventListener("sessionend",Ec),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){Kt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;I!==null&&I.renderStart(S,N);const W=Rt.enabled===!0&&Rt.isPresenting===!0,G=w!==null&&(it===null||W)&&w.begin(D,it);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Rt.enabled===!0&&Rt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Rt.cameraAutoUpdate===!0&&Rt.updateCamera(N),N=Rt.getCamera()),S.isScene===!0&&S.onBeforeRender(D,S,N,it),E=dt.get(S,x.length),E.init(N),E.state.textureUnits=Y.getTextureUnits(),x.push(E),at.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),tt.setFromProjectionMatrix(at,Dn,N.reversedDepth),rt=this.localClippingEnabled,st=Dt.init(this.clippingPlanes,rt),y=gt.get(S,C.length),y.init(),C.push(y),Rt.enabled===!0&&Rt.isPresenting===!0){const bt=D.xr.getDepthSensingMesh();bt!==null&&fa(bt,N,-1/0,D.sortObjects)}fa(S,N,0,D.sortObjects),y.finish(),I!==null&&I.updateLights(E.state.lightsArray),D.sortObjects===!0&&y.sort(_t,Bt),Gt=Rt.enabled===!1||Rt.isPresenting===!1||Rt.hasDepthSensing()===!1,Gt&&Wt.addToRenderList(y,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&Dt.beginShadows();const V=E.state.shadowsArray;if(Ft.render(V,S,N),st===!0&&Dt.endShadows(),(G&&w.hasRenderPass())===!1){const bt=y.opaque,vt=y.transmissive;if(E.setupLights(),N.isArrayCamera){const wt=N.cameras;if(vt.length>0)for(let Ct=0,qt=wt.length;Ct<qt;Ct++){const Jt=wt[Ct];wc(bt,vt,S,Jt)}Gt&&Wt.render(S);for(let Ct=0,qt=wt.length;Ct<qt;Ct++){const Jt=wt[Ct];Tc(y,S,Jt,Jt.viewport)}}else vt.length>0&&wc(bt,vt,S,N),Gt&&Wt.render(S),Tc(y,S,N)}it!==null&&X===0&&(Y.updateMultisampleRenderTarget(it),Y.updateRenderTargetMipmap(it)),G&&w.end(D),S.isScene===!0&&S.onAfterRender(D,S,N),Mt.resetDefaultState(),q=-1,Q=null,x.pop(),x.length>0?(E=x[x.length-1],Y.setTextureUnits(E.state.textureUnits),st===!0&&Dt.setGlobalState(D.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?y=C[C.length-1]:y=null,I!==null&&I.renderEnd()};function fa(S,N,W,G){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLightProbeGrid)E.pushLightProbeGrid(S);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(tt)){G&&Nt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(at);const bt=K.update(S),vt=S.material;vt.visible&&y.push(S,bt,vt,W,Nt.z,null,N)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(tt))){const bt=K.update(S),vt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Nt.copy(S.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Nt.copy(bt.boundingSphere.center)),Nt.applyMatrix4(S.matrixWorld).applyMatrix4(at)),Array.isArray(vt)){const wt=bt.groups;for(let Ct=0,qt=wt.length;Ct<qt;Ct++){const Jt=wt[Ct],At=vt[Jt.materialIndex];At&&At.visible&&y.push(S,bt,At,W,Nt.z,Jt,N)}}else vt.visible&&y.push(S,bt,vt,W,Nt.z,null,N)}}const xt=S.children;for(let bt=0,vt=xt.length;bt<vt;bt++)fa(xt[bt],N,W,G)}function Tc(S,N,W,G){const{opaque:V,transmissive:xt,transparent:bt}=S;E.setupLightsView(W),st===!0&&Dt.setGlobalState(D.clippingPlanes,W),G&&_.viewport(et.copy(G)),V.length>0&&js(V,N,W),xt.length>0&&js(xt,N,W),bt.length>0&&js(bt,N,W),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function wc(S,N,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){const At=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new yn(1,1,{generateMipmaps:!0,type:At?Bn:hn,minFilter:Si,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:jt.workingColorSpace})}const xt=E.state.transmissionRenderTarget[G.id],bt=G.viewport||et;xt.setSize(bt.z*D.transmissionResolutionScale,bt.w*D.transmissionResolutionScale);const vt=D.getRenderTarget(),wt=D.getActiveCubeFace(),Ct=D.getActiveMipmapLevel();D.setRenderTarget(xt),D.getClearColor(re),Zt=D.getClearAlpha(),Zt<1&&D.setClearColor(16777215,.5),D.clear(),Gt&&Wt.render(W);const qt=D.toneMapping;D.toneMapping=Nn;const Jt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),st===!0&&Dt.setGlobalState(D.clippingPlanes,G),js(S,W,G),Y.updateMultisampleRenderTarget(xt),Y.updateRenderTargetMipmap(xt),$t.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let le=0,Ce=N.length;le<Ce;le++){const be=N[le],{object:me,geometry:Ge,material:yt,group:Ze}=be;if(yt.side===ln&&me.layers.test(G.layers)){const ne=yt.side;yt.side=qe,yt.needsUpdate=!0,Ac(me,W,G,Ge,yt,Ze),yt.side=ne,yt.needsUpdate=!0,At=!0}}At===!0&&(Y.updateMultisampleRenderTarget(xt),Y.updateRenderTargetMipmap(xt))}D.setRenderTarget(vt,wt,Ct),D.setClearColor(re,Zt),Jt!==void 0&&(G.viewport=Jt),D.toneMapping=qt}function js(S,N,W){const G=N.isScene===!0?N.overrideMaterial:null;for(let V=0,xt=S.length;V<xt;V++){const bt=S[V],{object:vt,geometry:wt,group:Ct}=bt;let qt=bt.material;qt.allowOverride===!0&&G!==null&&(qt=G),vt.layers.test(W.layers)&&Ac(vt,N,W,wt,qt,Ct)}}function Ac(S,N,W,G,V,xt){I!==null&&V.isNodeMaterial&&I.setObject(S,V),S.onBeforeRender(D,N,W,G,V,xt),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(D,N,W,G,S,xt),V.transparent===!0&&V.side===ln&&V.forceSinglePass===!1?(V.side=qe,V.needsUpdate=!0,D.renderBufferDirect(W,N,G,V,S,xt),V.side=Ti,V.needsUpdate=!0,D.renderBufferDirect(W,N,G,V,S,xt),V.side=ln):D.renderBufferDirect(W,N,G,V,S,xt),S.onAfterRender(D,N,W,G,V,xt)}function tr(S,N,W){N.isScene!==!0&&(N=Ut);const G=H.get(S),V=E.state.lights,xt=E.state.shadowsArray,bt=V.state.version,vt=ft.getParameters(S,V.state,xt,N,W,E.state.lightProbeGridArray),wt=ft.getProgramCacheKey(vt);let Ct=G.programs;G.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,G.fog=N.fog;const qt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;G.envMap=ot.get(S.envMap||G.environment,qt),G.envMapRotation=G.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Ct===void 0&&(S.addEventListener("dispose",En),Ct=new Map,G.programs=Ct);let Jt=Ct.get(wt);if(Jt!==void 0){if(G.currentProgram===Jt&&G.lightsStateVersion===bt)return Cc(S,vt),Jt}else vt.uniforms=ft.getUniforms(S),I!==null&&S.isNodeMaterial&&I.build(S,W,vt),S.onBeforeCompile(vt,D),Jt=ft.acquireProgram(vt,wt),Ct.set(wt,Jt),G.uniforms=vt.uniforms;const At=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(At.clippingPlanes=Dt.uniform),Cc(S,vt),G.needsLights=Au(S),G.lightsStateVersion=bt,G.needsLights&&(At.ambientLightColor.value=V.state.ambient,At.lightProbe.value=V.state.probe,At.sunLights.value=V.state.sun,At.sunLightShadows.value=V.state.sunShadow,At.directionalLights.value=V.state.directional,At.directionalLightShadows.value=V.state.directionalShadow,At.spotLights.value=V.state.spot,At.spotLightShadows.value=V.state.spotShadow,At.rectAreaLights.value=V.state.rectArea,At.ltc_1.value=V.state.rectAreaLTC1,At.ltc_2.value=V.state.rectAreaLTC2,At.pointLights.value=V.state.point,At.pointLightShadows.value=V.state.pointShadow,At.hemisphereLights.value=V.state.hemi,At.sunShadowMatrix.value=V.state.sunShadowMatrix,At.sunShadowCascade.value=V.state.sunShadowCascade,At.directionalShadowMatrix.value=V.state.directionalShadowMatrix,At.spotLightMatrix.value=V.state.spotLightMatrix,At.spotLightMap.value=V.state.spotLightMap,At.pointShadowMatrix.value=V.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=Jt,G.uniformsList=null,Jt}function Rc(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=qr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Cc(S,N){const W=H.get(S);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function Eu(S,N){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(N.matrixWorld);for(let W=0,G=S.length;W<G;W++){const V=S[W];if(V.texture!==null&&V.boundingBox.containsPoint(M))return V}return null}function Tu(S,N,W,G,V){N.isScene!==!0&&(N=Ut),Y.resetTextureUnits();const xt=N.fog,bt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?N.environment:null,vt=it===null?D.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:jt.workingColorSpace,wt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ct=ot.get(G.envMap||bt,wt),qt=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Jt=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),At=!!W.morphAttributes.position,le=!!W.morphAttributes.normal,Ce=!!W.morphAttributes.color;let be=Nn;G.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(be=D.toneMapping);const me=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Ge=me!==void 0?me.length:0,yt=H.get(G),Ze=E.state.lights;if(st===!0&&(rt===!0||S!==Q)){const ve=S===Q&&G.id===q;Dt.setState(G,S,ve)}let ne=!1;G.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==Ze.state.version||yt.outputColorSpace!==vt||V.isBatchedMesh&&yt.batching===!1||!V.isBatchedMesh&&yt.batching===!0||V.isBatchedMesh&&yt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&yt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&yt.instancing===!1||!V.isInstancedMesh&&yt.instancing===!0||V.isSkinnedMesh&&yt.skinning===!1||!V.isSkinnedMesh&&yt.skinning===!0||V.isInstancedMesh&&yt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&yt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&yt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&yt.instancingMorph===!1&&V.morphTexture!==null||yt.envMap!==Ct||G.fog===!0&&yt.fog!==xt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==Dt.numPlanes||yt.numIntersection!==Dt.numIntersection)||yt.vertexAlphas!==qt||yt.vertexTangents!==Jt||yt.morphTargets!==At||yt.morphNormals!==le||yt.morphColors!==Ce||yt.toneMapping!==be||yt.morphTargetsCount!==Ge||!!yt.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ne=!0):(ne=!0,yt.__version=G.version);let on=yt.currentProgram;ne===!0&&(on=tr(G,N,V),I&&G.isNodeMaterial&&I.onUpdateProgram(G,on,yt));let Tn=!1,ti=!1,Ui=!1;const pe=on.getUniforms(),Re=yt.uniforms;if(_.useProgram(on.program)&&(Tn=!0,ti=!0,Ui=!0),G.id!==q&&(q=G.id,ti=!0),yt.needsLights){const ve=Eu(E.state.lightProbeGridArray,V);yt.lightProbeGrid!==ve&&(yt.lightProbeGrid=ve,ti=!0)}if(Tn||Q!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),pe.setValue(U,"projectionMatrix",S.projectionMatrix),pe.setValue(U,"viewMatrix",S.matrixWorldInverse);const ni=pe.map.cameraPosition;ni!==void 0&&ni.setValue(U,ht.setFromMatrixPosition(S.matrixWorld)),R.logarithmicDepthBuffer&&pe.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&pe.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),Q!==S&&(Q=S,ti=!0,Ui=!0)}if(yt.needsLights&&(Ze.state.sunShadowMap.length>0&&pe.setValue(U,"sunShadowMap",Ze.state.sunShadowMap,Y),Ze.state.directionalShadowMap.length>0&&pe.setValue(U,"directionalShadowMap",Ze.state.directionalShadowMap,Y),Ze.state.spotShadowMap.length>0&&pe.setValue(U,"spotShadowMap",Ze.state.spotShadowMap,Y),Ze.state.pointShadowMap.length>0&&pe.setValue(U,"pointShadowMap",Ze.state.pointShadowMap,Y)),V.isSkinnedMesh){pe.setOptional(U,V,"bindMatrix"),pe.setOptional(U,V,"bindMatrixInverse");const ve=V.skeleton;ve&&(ve.boneTexture===null&&ve.computeBoneTexture(),pe.setValue(U,"boneTexture",ve.boneTexture,Y))}V.isBatchedMesh&&(pe.setOptional(U,V,"batchingTexture"),pe.setValue(U,"batchingTexture",V._matricesTexture,Y),pe.setOptional(U,V,"batchingIdTexture"),pe.setValue(U,"batchingIdTexture",V._indirectTexture,Y),pe.setOptional(U,V,"batchingColorTexture"),V._colorsTexture!==null&&pe.setValue(U,"batchingColorTexture",V._colorsTexture,Y));const ei=W.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&F.update(V,W,on),(ti||yt.receiveShadow!==V.receiveShadow)&&(yt.receiveShadow=V.receiveShadow,pe.setValue(U,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&N.environment!==null&&(Re.envMapIntensity.value=N.environmentIntensity),Re.dfgLUT!==void 0&&(Re.dfgLUT.value=k_()),ti){if(pe.setValue(U,"toneMappingExposure",D.toneMappingExposure),yt.needsLights&&wu(Re,Ui),xt&&G.fog===!0&&Lt.refreshFogUniforms(Re,xt),Lt.refreshMaterialUniforms(Re,G,j,$,E.state.transmissionRenderTarget[S.id]),yt.needsLights&&yt.lightProbeGrid){const ve=yt.lightProbeGrid;Re.probesSH.value=ve.texture,Re.probesMin.value.copy(ve.boundingBox.min),Re.probesMax.value.copy(ve.boundingBox.max),Re.probesResolution.value.copy(ve.resolution)}qr.upload(U,Rc(yt),Re,Y)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(qr.upload(U,Rc(yt),Re,Y),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&pe.setValue(U,"center",V.center),pe.setValue(U,"modelViewMatrix",V.modelViewMatrix),pe.setValue(U,"normalMatrix",V.normalMatrix),pe.setValue(U,"modelMatrix",V.matrixWorld),G.uniformsGroups!==void 0){const ve=G.uniformsGroups;for(let ni=0,Ni=ve.length;ni<Ni;ni++){const Lc=ve[ni];nt.update(Lc,on),nt.bind(Lc,on)}}return on}function wu(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.sunLights.needsUpdate=N,S.sunLightShadows.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function Au(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(S,N,W){const G=H.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),H.get(S.texture).__webglTexture=N,H.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const W=H.get(S);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,W=0){it=S,k=N,X=W;let G=null,V=!1,xt=!1;if(S){const vt=H.get(S);if(vt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,vt.__webglFramebuffer),et.copy(S.viewport),Pt.copy(S.scissor),Tt=S.scissorTest,_.viewport(et),_.scissor(Pt),_.setScissorTest(Tt),q=-1;return}else if(vt.__webglFramebuffer===void 0)Y.setupRenderTarget(S);else if(vt.__hasExternalTextures)Y.rebindTextures(S,H.get(S.texture).__webglTexture,H.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const qt=S.depthTexture;if(vt.__boundDepthTexture!==qt){if(qt!==null&&H.has(qt)&&(S.width!==qt.image.width||S.height!==qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(S)}}const wt=S.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(xt=!0);const Ct=H.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ct[N])?G=Ct[N][W]:G=Ct[N],V=!0):S.samples>0&&Y.useMultisampledRTT(S)===!1?G=H.get(S).__webglMultisampledFramebuffer:Array.isArray(Ct)?G=Ct[W]:G=Ct,et.copy(S.viewport),Pt.copy(S.scissor),Tt=S.scissorTest}else et.copy(St).multiplyScalar(j).floor(),Pt.copy(zt).multiplyScalar(j).floor(),Tt=ue;if(W!==0&&(G=O),_.bindFramebuffer(U.FRAMEBUFFER,G)&&_.drawBuffers(S,G),_.viewport(et),_.scissor(Pt),_.setScissorTest(Tt),V){const vt=H.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,vt.__webglTexture,W)}else if(xt){const vt=N;for(let wt=0;wt<S.textures.length;wt++){const Ct=H.get(S.textures[wt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+wt,Ct.__webglTexture,W,vt)}}else if(S!==null&&W!==0){const vt=H.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,vt.__webglTexture,W)}q=-1};function Pc(S){const N=H.get(S);return(N.__readFormat!==S.format||N.__readType!==S.type)&&(N.__readFormat=S.format,N.__readType=S.type,N.__formatReadable=R.textureFormatReadable(S.format),N.__typeReadable=R.textureTypeReadable(S.type)),N}this.readRenderTargetPixels=function(S,N,W,G,V,xt,bt,vt=0){if(!(S&&S.isWebGLRenderTarget)){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=H.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&bt!==void 0&&(wt=wt[bt]),wt){_.bindFramebuffer(U.FRAMEBUFFER,wt);try{const Ct=S.textures[vt],qt=Ct.format,Jt=Ct.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+vt);const At=Pc(Ct);if(At.__formatReadable===!1){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-G&&W>=0&&W<=S.height-V&&U.readPixels(N,W,G,V,mt.convert(qt),mt.convert(Jt),xt)}finally{const Ct=it!==null?H.get(it).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(S,N,W,G,V,xt,bt,vt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=H.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&bt!==void 0&&(wt=wt[bt]),wt)if(N>=0&&N<=S.width-G&&W>=0&&W<=S.height-V){_.bindFramebuffer(U.FRAMEBUFFER,wt);const Ct=S.textures[vt],qt=Ct.format,Jt=Ct.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+vt);const At=Pc(Ct);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const le=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,le),U.bufferData(U.PIXEL_PACK_BUFFER,xt.byteLength,U.STREAM_READ),U.readPixels(N,W,G,V,mt.convert(qt),mt.convert(Jt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const Ce=it!==null?H.get(it).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Ce);const be=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await hf(U,be,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,le),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,xt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(le),U.deleteSync(be),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,W=0){const G=Math.pow(2,-W),V=Math.floor(S.image.width*G),xt=Math.floor(S.image.height*G),bt=N!==null?N.x:0,vt=N!==null?N.y:0;Y.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,bt,vt,V,xt),_.unbindTexture()},this.copyTextureToTexture=function(S,N,W=null,G=null,V=0,xt=0){let bt,vt,wt,Ct,qt,Jt,At,le,Ce;const be=S.isCompressedTexture?S.mipmaps[xt]:S.image;if(W!==null)bt=W.max.x-W.min.x,vt=W.max.y-W.min.y,wt=W.isBox3?W.max.z-W.min.z:1,Ct=W.min.x,qt=W.min.y,Jt=W.isBox3?W.min.z:0;else{const Re=Math.pow(2,-V);bt=Math.floor(be.width*Re),vt=Math.floor(be.height*Re),S.isDataArrayTexture?wt=be.depth:S.isData3DTexture?wt=Math.floor(be.depth*Re):wt=1,Ct=0,qt=0,Jt=0}G!==null?(At=G.x,le=G.y,Ce=G.z):(At=0,le=0,Ce=0);const me=mt.convert(N.format),Ge=mt.convert(N.type);let yt;N.isData3DTexture?(Y.setTexture3D(N,0),yt=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Y.setTexture2DArray(N,0),yt=U.TEXTURE_2D_ARRAY):(Y.setTexture2D(N,0),yt=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const Ze=_.getParameter(U.UNPACK_ROW_LENGTH),ne=_.getParameter(U.UNPACK_IMAGE_HEIGHT),on=_.getParameter(U.UNPACK_SKIP_PIXELS),Tn=_.getParameter(U.UNPACK_SKIP_ROWS),ti=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,be.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,be.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Ct),_.pixelStorei(U.UNPACK_SKIP_ROWS,qt),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Jt);const Ui=S.isDataArrayTexture||S.isData3DTexture,pe=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const Re=H.get(S),ei=H.get(N),ve=H.get(Re.__renderTarget),ni=H.get(ei.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,ve.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let Ni=0;Ni<wt;Ni++)Ui&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(S).__webglTexture,V,Jt+Ni),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(N).__webglTexture,xt,Ce+Ni)),U.blitFramebuffer(Ct,qt,bt,vt,At,le,bt,vt,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||H.has(S)){const Re=H.get(S),ei=H.get(N);_.bindFramebuffer(U.READ_FRAMEBUFFER,P),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,B);for(let ve=0;ve<wt;ve++)Ui?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Re.__webglTexture,V,Jt+ve):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Re.__webglTexture,V),pe?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ei.__webglTexture,xt,Ce+ve):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ei.__webglTexture,xt),V!==0?U.blitFramebuffer(Ct,qt,bt,vt,At,le,bt,vt,U.COLOR_BUFFER_BIT,U.NEAREST):pe?U.copyTexSubImage3D(yt,xt,At,le,Ce+ve,Ct,qt,bt,vt):U.copyTexSubImage2D(yt,xt,At,le,Ct,qt,bt,vt);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else pe?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(yt,xt,At,le,Ce,bt,vt,wt,me,Ge,be.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(yt,xt,At,le,Ce,bt,vt,wt,me,be.data):U.texSubImage3D(yt,xt,At,le,Ce,bt,vt,wt,me,Ge,be):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,xt,At,le,bt,vt,me,Ge,be.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,xt,At,le,be.width,be.height,me,be.data):U.texSubImage2D(U.TEXTURE_2D,xt,At,le,bt,vt,me,Ge,be);_.pixelStorei(U.UNPACK_ROW_LENGTH,Ze),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ne),_.pixelStorei(U.UNPACK_SKIP_PIXELS,on),_.pixelStorei(U.UNPACK_SKIP_ROWS,Tn),_.pixelStorei(U.UNPACK_SKIP_IMAGES,ti),xt===0&&N.generateMipmaps&&U.generateMipmap(yt),_.unbindTexture()},this.initRenderTarget=function(S){H.get(S).__webglFramebuffer===void 0&&Y.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Y.setTextureCube(S,0):S.isData3DTexture?Y.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Y.setTexture2DArray(S,0):Y.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){k=0,X=0,it=null,_.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class ru{constructor(t=new A(0,0,0),e=new A(0,1,0),n=1){this.start=t,this.end=e,this.radius=n}clone(){return new this.constructor().copy(this)}set(t,e,n){return this.start.copy(t),this.end.copy(e),this.radius=n,this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this.radius=t.radius,this}getCenter(t){return t.copy(this.end).add(this.start).multiplyScalar(.5)}translate(t){return this.start.add(t),this.end.add(t),this}intersectsBox(t){return Ja(this.start.x,this.start.y,this.end.x,this.end.y,t.min.x,t.max.x,t.min.y,t.max.y,this.radius)&&Ja(this.start.x,this.start.z,this.end.x,this.end.z,t.min.x,t.max.x,t.min.z,t.max.z,this.radius)&&Ja(this.start.y,this.start.z,this.end.y,this.end.z,t.min.y,t.max.y,t.min.z,t.max.z,this.radius)}}function Ja(s,t,e,n,i,r,a,o,c){return(i-s<c||i-e<c)&&(s-r<c||e-r<c)&&(a-t<c||a-n<c)&&(t-o<c||n-o<c)}const vn=new A,Ps=new A,Ur=new A,Ls=new A,ke=new Xn,Ka=new _c,X_=new _c,Nr=new bn,Fr=new Ii,Ds=new ru,kl=new A,q_=new A,Y_=new A,Z_=new A,$_=1e-10;function J_(s,t,e=null,n=null){const i=q_.copy(s.end).sub(s.start),r=Y_.copy(t.end).sub(t.start),a=Z_.copy(t.start).sub(s.start),o=i.dot(r),c=i.dot(i),l=r.dot(r),h=r.dot(a),f=i.dot(a);let u,d;const m=c*l-o*o;if(Math.abs(m)<$_){const v=-h/l,g=(o-h)/l;Math.abs(v-.5)<Math.abs(g-.5)?(u=0,d=v):(u=1,d=g)}else u=(h*o+f*l)/m,d=(u*o-h)/l;d=Math.max(0,Math.min(1,d)),u=Math.max(0,Math.min(1,u)),e&&e.copy(i).multiplyScalar(u).add(s.start),n&&n.copy(r).multiplyScalar(d).add(t.start)}class vc{constructor(t){this.box=t,this.bounds=new bn,this.layers=new sa,this.trianglesPerLeaf=8,this.maxLevel=16,this.subTrees=[],this.triangles=[]}addTriangle(t){return this.bounds.min.x=Math.min(this.bounds.min.x,t.a.x,t.b.x,t.c.x),this.bounds.min.y=Math.min(this.bounds.min.y,t.a.y,t.b.y,t.c.y),this.bounds.min.z=Math.min(this.bounds.min.z,t.a.z,t.b.z,t.c.z),this.bounds.max.x=Math.max(this.bounds.max.x,t.a.x,t.b.x,t.c.x),this.bounds.max.y=Math.max(this.bounds.max.y,t.a.y,t.b.y,t.c.y),this.bounds.max.z=Math.max(this.bounds.max.z,t.a.z,t.b.z,t.c.z),this.triangles.push(t),this}calcBox(){return this.box=this.bounds.clone(),this.box.min.x-=.01,this.box.min.y-=.01,this.box.min.z-=.01,this}split(t){if(!this.box)return;const e=[],n=Ps.copy(this.box.max).sub(this.box.min).multiplyScalar(.5);for(let r=0;r<2;r++)for(let a=0;a<2;a++)for(let o=0;o<2;o++){const c=new bn,l=vn.set(r,a,o);c.min.copy(this.box.min).add(l.multiply(n)),c.max.copy(c.min).add(n),e.push(new vc(c))}let i;for(;i=this.triangles.pop();)for(let r=0;r<e.length;r++)e[r].box.intersectsTriangle(i)&&e[r].triangles.push(i);for(let r=0;r<e.length;r++){const a=e[r].triangles.length;a>this.trianglesPerLeaf&&t<this.maxLevel&&e[r].split(t+1),a!==0&&this.subTrees.push(e[r])}return this}build(){return this.calcBox(),this.split(0),this}getRayTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let r=0;r<i.triangles.length;r++)e.indexOf(i.triangles[r])===-1&&e.push(i.triangles[r]);else i.getRayTriangles(t,e)}}triangleCapsuleIntersect(t,e){e.getPlane(ke);const n=ke.distanceToPoint(t.start)-t.radius,i=ke.distanceToPoint(t.end)-t.radius;if(n>0&&i>0||n<-t.radius&&i<-t.radius)return!1;const r=Math.abs(n/(Math.abs(n)+Math.abs(i))),a=vn.copy(t.start).lerp(t.end,r);if(e.containsPoint(a))return{normal:ke.normal.clone(),point:a.clone(),depth:Math.abs(Math.min(n,i))};const o=t.radius*t.radius,c=Ka.set(t.start,t.end),l=[[e.a,e.b],[e.b,e.c],[e.c,e.a]];for(let h=0;h<l.length;h++){const f=X_.set(l[h][0],l[h][1]);if(J_(c,f,Ur,Ls),Ur.distanceToSquared(Ls)<o)return{normal:Ur.clone().sub(Ls).normalize(),point:Ls.clone(),depth:t.radius-Ur.distanceTo(Ls)}}return!1}triangleBoxIntersect(t,e){if(Math.max(e.a.x,e.b.x,e.c.x)<t.min.x||Math.min(e.a.x,e.b.x,e.c.x)>t.max.x||Math.max(e.a.y,e.b.y,e.c.y)<t.min.y||Math.min(e.a.y,e.b.y,e.c.y)>t.max.y||Math.max(e.a.z,e.b.z,e.c.z)<t.min.z||Math.min(e.a.z,e.b.z,e.c.z)>t.max.z||!t.intersectsTriangle(e))return!1;e.getPlane(ke),vn.x=ke.normal.x>0?t.min.x:t.max.x,vn.y=ke.normal.y>0?t.min.y:t.max.y,vn.z=ke.normal.z>0?t.min.z:t.max.z;const n=ke.distanceToPoint(vn),i={depth:-n,normal:ke.normal.clone(),point:vn.clone()};return i.point.addScaledVector(i.normal,n),i}triangleSphereIntersect(t,e){if(e.getPlane(ke),!t.intersectsPlane(ke))return!1;const n=Math.abs(ke.distanceToSphere(t)),i=t.radius*t.radius-n*n,r=ke.projectPoint(t.center,vn);if(e.containsPoint(t.center))return{normal:ke.normal.clone(),point:r.clone(),depth:Math.abs(ke.distanceToSphere(t))};const a=[[e.a,e.b],[e.b,e.c],[e.c,e.a]];for(let o=0;o<a.length;o++){Ka.set(a[o][0],a[o][1]),Ka.closestPointToPoint(r,!0,Ps);const c=Ps.distanceToSquared(t.center);if(c<i)return{normal:t.center.clone().sub(Ps).normalize(),point:Ps.clone(),depth:t.radius-Math.sqrt(c)}}return!1}getSphereTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let r=0;r<i.triangles.length;r++)e.indexOf(i.triangles[r])===-1&&e.push(i.triangles[r]);else i.getSphereTriangles(t,e)}}getBoxTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let r=0;r<i.triangles.length;r++)e.indexOf(i.triangles[r])===-1&&e.push(i.triangles[r]);else i.getBoxTriangles(t,e)}}getCapsuleTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let r=0;r<i.triangles.length;r++)e.indexOf(i.triangles[r])===-1&&e.push(i.triangles[r]);else i.getCapsuleTriangles(t,e)}}boxIntersect(t){Nr.copy(t);const e=[];let n,i=!1;this.getBoxTriangles(t,e);for(let r=0;r<e.length;r++)(n=this.triangleBoxIntersect(Nr,e[r]))&&(i=!0,Nr.translate(n.normal.multiplyScalar(n.depth)));if(i){const r=Nr.getCenter(kl).sub(t.getCenter(vn)),a=r.length();return{normal:r.normalize(),depth:a}}return!1}sphereIntersect(t){Fr.copy(t);const e=[];let n,i=!1;this.getSphereTriangles(t,e);for(let r=0;r<e.length;r++)(n=this.triangleSphereIntersect(Fr,e[r]))&&(i=!0,Fr.center.add(n.normal.multiplyScalar(n.depth)));if(i){const r=Fr.center.clone().sub(t.center),a=r.length();return{normal:r.normalize(),depth:a}}return!1}capsuleIntersect(t){Ds.copy(t);const e=[];let n,i=!1;this.getCapsuleTriangles(Ds,e);for(let r=0;r<e.length;r++)(n=this.triangleCapsuleIntersect(Ds,e[r]))&&(i=!0,Ds.translate(n.normal.multiplyScalar(n.depth)));if(i){const r=Ds.getCenter(kl).sub(t.getCenter(vn)),a=r.length();return{normal:r.normalize(),depth:a}}return!1}rayIntersect(t){const e=[];let n,i,r=1e100;this.getRayTriangles(t,e);for(let a=0;a<e.length;a++){const o=t.intersectTriangle(e[a].a,e[a].b,e[a].c,!0,vn);if(o){const c=o.sub(t.origin).length();r>c&&(i=o.clone().add(t.origin),r=c,n=e[a])}}return r<1e100?{distance:r,triangle:n,position:i}:!1}fromGraphNode(t){return t.updateWorldMatrix(!0,!0),t.traverse(e=>{if(e.isMesh===!0&&this.layers.test(e.layers)){let n,i=!1;e.geometry.index!==null?(i=!0,n=e.geometry.toNonIndexed()):n=e.geometry;const r=n.getAttribute("position");for(let a=0;a<r.count;a+=3){const o=new A().fromBufferAttribute(r,a),c=new A().fromBufferAttribute(r,a+1),l=new A().fromBufferAttribute(r,a+2);o.applyMatrix4(e.matrixWorld),c.applyMatrix4(e.matrixWorld),l.applyMatrix4(e.matrixWorld),this.addTriangle(new en(o,c,l))}i&&n.dispose()}}),this.build(),this}clear(){return this.box=null,this.bounds.makeEmpty(),this.subTrees.length=0,this.triangles.length=0,this}}ut.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ct},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};je.line={uniforms:gc.merge([ut.common,ut.fog,ut.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class au extends dn{constructor(t){super({type:"LineMaterial",uniforms:gc.clone(je.line.uniforms),vertexShader:je.line.vertexShader,fragmentShader:je.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Wl=new bn,Or=new A;class ou extends zd{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new he(t,3)),this.setAttribute("uv",new he(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new $o(e,6,1);return this.setAttribute("instanceStart",new In(n,3,0)),this.setAttribute("instanceEnd",new In(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new $o(e,6,1);return this.setAttribute("instanceColorStart",new In(n,3,0)),this.setAttribute("instanceColorEnd",new In(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Dd(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Wl.setFromBufferAttribute(e),this.boundingBox.union(Wl))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ii),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Or.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Or)),Or.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Or));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const Qa=new ge,Xl=new A,ql=new A,Fe=new ge,Oe=new ge,Rn=new ge,ja=new A,to=new ye,Be=new _c,Yl=new A,Br=new bn,zr=new Ii,Cn=new ge;let Pn,Ei;function Zl(s,t,e){return Cn.set(0,0,-t,1).applyMatrix4(s.projectionMatrix),Cn.multiplyScalar(1/Cn.w),Cn.x=Ei/e.width,Cn.y=Ei/e.height,Cn.applyMatrix4(s.projectionMatrixInverse),Cn.multiplyScalar(1/Cn.w),Math.abs(Math.max(Cn.x,Cn.y))}function K_(s,t){const e=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,c=a;o<c;o++){Be.start.fromBufferAttribute(i,o),Be.end.fromBufferAttribute(r,o),Be.applyMatrix4(e);const l=new A,h=new A;Pn.distanceSqToSegment(Be.start,Be.end,h,l),h.distanceTo(l)<Ei*.5&&t.push({point:h,pointOnLine:l,distance:Pn.origin.distanceTo(h),object:s,face:null,faceIndex:o,uv:null,uv1:null})}}function Q_(s,t,e){const n=t.projectionMatrix,r=s.material.resolution,a=s.matrixWorld,o=s.geometry,c=o.attributes.instanceStart,l=o.attributes.instanceEnd,h=Math.min(o.instanceCount,c.count),f=-t.near;Pn.at(1,Rn),Rn.w=1,Rn.applyMatrix4(t.matrixWorldInverse),Rn.applyMatrix4(n),Rn.multiplyScalar(1/Rn.w),Rn.x*=r.x/2,Rn.y*=r.y/2,Rn.z=0,ja.copy(Rn),to.multiplyMatrices(t.matrixWorldInverse,a);for(let u=0,d=h;u<d;u++){if(Fe.fromBufferAttribute(c,u),Oe.fromBufferAttribute(l,u),Fe.w=1,Oe.w=1,Fe.applyMatrix4(to),Oe.applyMatrix4(to),Fe.z>f&&Oe.z>f)continue;if(Fe.z>f){const T=Fe.z-Oe.z,M=(Fe.z-f)/T;Fe.lerp(Oe,M)}else if(Oe.z>f){const T=Oe.z-Fe.z,M=(Oe.z-f)/T;Oe.lerp(Fe,M)}Fe.applyMatrix4(n),Oe.applyMatrix4(n),Fe.multiplyScalar(1/Fe.w),Oe.multiplyScalar(1/Oe.w),Fe.x*=r.x/2,Fe.y*=r.y/2,Oe.x*=r.x/2,Oe.y*=r.y/2,Be.start.copy(Fe),Be.start.z=0,Be.end.copy(Oe),Be.end.z=0;const v=Be.closestPointToPointParameter(ja,!0);Be.at(v,Yl);const g=Qt.lerp(Fe.z,Oe.z,v),p=g>=-1&&g<=1,b=ja.distanceTo(Yl)<Ei*.5;if(p&&b){Be.start.fromBufferAttribute(c,u),Be.end.fromBufferAttribute(l,u),Be.start.applyMatrix4(a),Be.end.applyMatrix4(a);const T=new A,M=new A;Pn.distanceSqToSegment(Be.start,Be.end,M,T),e.push({point:M,pointOnLine:T,distance:Pn.origin.distanceTo(M),object:s,face:null,faceIndex:u,uv:null,uv1:null})}}}class j_ extends Se{constructor(t=new ou,e=new au({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,i=new Float32Array(2*e.count);for(let a=0,o=0,c=e.count;a<c;a++,o+=2)Xl.fromBufferAttribute(e,a),ql.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+Xl.distanceTo(ql);const r=new $o(i,2,1);return t.setAttribute("instanceDistanceStart",new In(r,1,0)),t.setAttribute("instanceDistanceEnd",new In(r,1,1)),this}raycast(t,e){const n=this.material.worldUnits,i=t.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Pn=t.ray;const a=this.matrixWorld,o=this.geometry,c=this.material;Ei=c.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),zr.copy(o.boundingSphere).applyMatrix4(a);let l;if(n)l=Ei*.5;else{const f=Math.max(i.near,zr.distanceToPoint(Pn.origin));l=Zl(i,f,c.resolution)}if(zr.radius+=l,Pn.intersectsSphere(zr)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Br.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=Ei*.5;else{const f=Math.max(i.near,Br.distanceToPoint(Pn.origin));h=Zl(i,f,c.resolution)}Br.expandByScalar(h),Pn.intersectsBox(Br)!==!1&&(n?K_(this,e):Q_(this,i,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Qa),this.material.uniforms.resolution.value.set(Qa.z,Qa.w))}}function cu(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new we;let l=0;for(let h=0;h<s.length;++h){const f=s[h];let u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const f=[];for(let u=0;u<s.length;++u){const d=s[u].index;for(let m=0;m<d.count;++m)f.push(d.getX(m)+h);h+=s[u].attributes.position.count}c.setIndex(f)}for(const h in r){const f=$l(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(const h in a){const f=a[h][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<f;++u){const d=[];for(let v=0;v<a[h].length;++v)d.push(a[h][v][u]);const m=$l(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}}return c}function $l(s){let t,e,n,i=-1,r=0;for(let l=0;l<s.length;++l){const h=s[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new un(a,e,n);let c=0;for(let l=0;l<s.length;++l){const h=s[l];if(h.isInterleavedBufferAttribute){const f=c/e;for(let u=0,d=h.count;u<d;u++)for(let m=0;m<e;m++){const v=h.getComponent(u,m);o.setComponent(u+f,m,v)}}else a.set(h.array,c);c+=h.count*e}return i!==void 0&&(o.gpuType=i),o}const lu=16777215,tv=1118481;function jo(s){const t=String(s);let e=2166136261;for(let n=0;n<t.length;n++)e=Math.imul(e^t.charCodeAt(n),16777619);return e>>>0}function ms(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}const ev=(s,t,e)=>`
  float tintaEscala(float z) {
    float r = max(z - ${s.toFixed(1)}, 0.0) / ${t.toFixed(1)};
    return ${e.toFixed(2)} + ${(1-e).toFixed(2)} / (1.0 + r * r);
  }`;function Jl(s){const[t,e,n]=s==="arma"?[.5,3,.4]:[6,40,.22],i=new au({color:16777215,vertexColors:!0,linewidth:s==="arma"?1.35:1,worldUnits:!1,alphaToCoverage:!0,toneMapped:!1});return i.depthWrite=!1,i.onBeforeCompile=r=>{r.vertexShader=r.vertexShader.replace("uniform float linewidth;",`uniform float linewidth;
        ${ev(t,e,n)}
        attribute float instanceLargura;
        attribute vec2 instanceDesvio;
        varying float vLonge;`).replace("// ndc space",`
        float eA = tintaEscala(-start.z);
        float eB = tintaEscala(-end.z);
        float eL = (position.y < 0.5) ? eA : eB;
        vLonge = (position.y < 0.5) ? -start.z : -end.z;
        vec2 tDir = (clipEnd.xy / clipEnd.w - clipStart.xy / clipStart.w) * resolution;
        tDir /= max(length(tDir), 0.0001);
        vec2 tNrm = vec2(-tDir.y, tDir.x);
        clipStart.xy += tNrm * instanceDesvio.x * eA * 2.0 / resolution * clipStart.w;
        clipEnd.xy += tNrm * instanceDesvio.y * eB * 2.0 / resolution * clipEnd.w;
        ${s==="arma"?`// Na arma, o traço vem uns milímetros à frente da face: não pisca.
        clipStart.z -= 0.0012 * clipStart.w;
        clipEnd.z -= 0.0012 * clipEnd.w;`:""}
        // ndc space`).replace("offset *= linewidth;","offset *= linewidth * instanceLargura * eL;"),r.fragmentShader=r.fragmentShader.replace("uniform float linewidth;",`uniform float linewidth;
        varying float vLonge;`).replace("gl_FragColor = vec4( diffuseColor.rgb, alpha );",`float nevoa = smoothstep(${s==="arma"?"50.0, 60.0":"70.0, 190.0"}, vLonge);
         gl_FragColor = vec4( mix(diffuseColor.rgb, vec3(1.0), nevoa * 0.85), alpha );`)},i.customProgramCacheKey=()=>"tinta-"+s,i}const na={mundo:Jl("mundo"),arma:Jl("arma")},tc=new jn({color:lu,side:ln,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),Kl=new jn({color:lu,side:ln,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:2}),hu=new jn({color:tv});function nv(s,t=2.2){const e=new dn({uniforms:{resolucao:na.arma.uniforms.resolution,largura:{value:t}},vertexShader:`
      uniform vec2 resolucao;
      uniform float largura;
      void main() {
        vec4 vista = modelViewMatrix * vec4(position, 1.0);
        vec4 clip = projectionMatrix * vista;
        vec3 n = normalize(normalMatrix * normal);
        vec4 ponta = projectionMatrix * vec4(vista.xyz + n * 0.01, 1.0);
        vec2 d = (ponta.xy / ponta.w - clip.xy / clip.w) * resolucao;
        d /= max(length(d), 0.0001);
        float pressao = 0.85 + 0.15 * sin(position.x * 90.0 + position.z * 60.0);
        clip.xy += d * largura * pressao * 2.0 / resolucao * clip.w;
        gl_Position = clip;
      }`,fragmentShader:"void main() { gl_FragColor = vec4(vec3(0.07), 1.0); }",side:qe,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:6}),n=new Se(s,e);return n.frustumCulled=!1,n}function uu(s,t){na.mundo.resolution.set(s,t),na.arma.resolution.set(s,t)}const iv={aresta:2.9,pormenor:1.8,sombra:1.1,chao:1.4},sv={aresta:.02,pormenor:.08,sombra:.42,chao:.3};function rv(s,t,e,n,i=1,r=.8){const a=ms(t),o=new A,c=new A,l=(h,f,u)=>{const d=o.distanceTo(c),m=Math.max(1,Math.min(6,Math.ceil(d*(f-h)/r))),v=a()*6.283,g=(e==="aresta"?.7:e==="sombra"?.2:.45)*i,p=u?(a()<.5?-1:1)*(.7+a()*.7)*i:0,b=T=>p+Math.sin(T*Math.PI)*Math.sin(T*5.2+v)*g;for(let T=0;T<m;T++){const M=h+(f-h)*T/m,y=h+(f-h)*(T+1)/m;n.pos.push(o.x+(c.x-o.x)*M,o.y+(c.y-o.y)*M,o.z+(c.z-o.z)*M,o.x+(c.x-o.x)*y,o.y+(c.y-o.y)*y,o.z+(c.z-o.z)*y),n.desv.push(b(M),b(y));const E=.5+.5*Math.sin(v+T*.73);n.larg.push(iv[e]*(u?.65:.85+E*.3));for(const C of[M,y]){const x=sv[e]+(u?.3:0)+(.5+.5*Math.sin(v+C*7.1))*.08,w=.067+(1-.067)*Math.min(1,x);n.cor.push(w,w,w)}}};for(let h=0;h<s.length;h+=6){if(o.set(s[h],s[h+1],s[h+2]),c.set(s[h+3],s[h+4],s[h+5]),o.distanceToSquared(c)<1e-8)continue;l(0,1,!1);const f=e==="aresta"?.35:e==="pormenor"?.12:0;if(a()<f){const u=a()*.35;l(u,Math.min(1,u+.3+a()*.45),!0)}}}function av(s,t="mundo",e=!1){const n=new ou().setPositions(s.pos).setColors(s.cor);n.setAttribute("instanceLargura",new nl(new Float32Array(s.larg),1)),n.setAttribute("instanceDesvio",new nl(new Float32Array(s.desv),2));const i=new j_(n,na[t]);return i.renderOrder=2,i.frustumCulled=e,i.userData.semColisao=!0,i}class Pi{constructor(t,e=1,n=.8){this.nome=t,this.desvio=e,this.passo=n}faces=[];linhas=new Map;n=0;linha(t,e="aresta",n=!1){const i=this.linhas.get(e)??[];this.linhas.set(e,i);for(let r=1;r<t.length;r++)i.push(...t[r-1],...t[r]);n&&t.length>2&&i.push(...t[t.length-1],...t[0])}segmentos(t,e="aresta"){const n=this.linhas.get(e)??[];this.linhas.set(e,n);for(const i of t)n.push(i)}tracejar(t,e,n,i=.25,r="sombra",a=.8){const o=ms(jo(this.nome+":"+this.n++)),c=Math.hypot(...e),l=Math.hypot(...n);if(c<.05||l<.05)return;const h=(u,d)=>[t[0]+e[0]*u/c+n[0]*d/l,t[1]+e[1]*u/c+n[1]*d/l,t[2]+e[2]*u/c+n[2]*d/l],f=a*l;for(let u=-f;u<=c;u+=i*(.8+o()*.4)){if(o()<.1)continue;let d=Math.max(0,-u/a),m=Math.min(l,(c-u)/a);if(m<=d)continue;const v=m-d;d+=v*o()*.08,m-=v*o()*.14,this.linha([h(u+a*d,d),h(u+a*m,m)],r)}}solido(t,e="aresta",n=25){if(e){const r=new Bh(t,n);this.segmentos(Array.from(r.getAttribute("position").array),e),r.dispose()}const i=t.index?t.toNonIndexed():t;i.deleteAttribute("uv"),i.deleteAttribute("normal"),this.faces.push(i)}caixa(t,e,n,i,r,a,o=0,c="aresta"){const l=new fn(t,e,n);l.rotateY(o),l.translate(i,r,a),this.solido(l,c)}face(t,e="aresta"){const n=new we;n.setAttribute("position",new he(t.flat(),3));const i=[];for(let r=1;r<t.length-1;r++)i.push(0,r,r+1);n.setIndex(i),this.solido(n,!1),e&&this.linha(t,e,!0)}acabar(t="mundo",e=tc,n=!1){const i=new Me;if(i.name=this.nome,this.faces.length){const a=cu(this.faces);if(a){const o=new Se(a,e);o.name=this.nome+":papel",i.add(o)}this.faces.forEach(o=>o.dispose())}const r={pos:[],cor:[],larg:[],desv:[]};for(const a of["sombra","chao","pormenor","aresta"]){const o=this.linhas.get(a);o?.length&&rv(o,jo(this.nome+a),a,r,this.desvio,this.passo)}return r.pos.length&&i.add(av(r,t,n)),this.faces=[],this.linhas.clear(),i}}const Mi=(s,t,e)=>new A(s,e,-t),xe=(s,t,e)=>[s,e,-t];function ov(s,t,e,n){const i=t[0]-s[0],r=t[1]-s[1],a=n[0]-e[0],o=n[1]-e[1],c=i*o-r*a;if(Math.abs(c)<1e-9)return null;const l=((e[0]-s[0])*o-(e[1]-s[1])*a)/c,h=((e[0]-s[0])*r-(e[1]-s[1])*i)/c;return l>=0&&l<=1&&h>=0&&h<=1?l:null}function Is(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const[a,o]=e[i],[c,l]=e[r];o>t!=l>t&&s<(c-a)*(t-o)/(l-o)+a&&(n=!n)}return n}const cv=new Set(["way/246397825","way/1165517467"]),lv="way/41222810",hv="relation/3475986";class uv{constructor(t){this.n=t;for(const e of t.edificios){const n=e.anel.map(r=>r[0]),i=e.anel.map(r=>r[1]);for(let r=Math.floor(Math.min(...n)/10);r<=Math.floor(Math.max(...n)/10);r++)for(let a=Math.floor(Math.min(...i)/10);a<=Math.floor(Math.max(...i)/10);a++){const o=r+","+a;this.grelha.has(o)||this.grelha.set(o,[]),this.grelha.get(o).push(e)}}}cena=new Me;colisao=new Me;pontos={};caminhoRota=[];grelha=new Map;quadriculas=new Map;quadricula(t,e){const n=Math.floor(t/48)+","+Math.floor(e/48);let i=this.quadriculas.get(n);return i||(i=new Pi("cidade:"+n,1,1.4),this.quadriculas.set(n,i)),i}chao(t,e){const n=this.n.dem,i=Math.max(0,Math.min(n.nCol-1.001,(t-n.x0)/n.passo)),r=Math.max(0,Math.min(n.nRow-1.001,(e-n.y0)/n.passo)),a=Math.floor(i),o=Math.floor(r),c=i-a,l=r-o,h=(f,u)=>n.elev[u*n.nCol+f];return(h(a,o)*(1-c)+h(a+1,o)*c)*(1-l)+(h(a,o+1)*(1-c)+h(a+1,o+1)*c)*l}edificioEm(t,e,n){for(const i of this.grelha.get(Math.floor(t/10)+","+Math.floor(e/10))??[])if(i!==n&&Is(t,e,i.anel)&&!i.furos.some(r=>Is(t,e,r)))return i;return null}construir(){this.terreno();for(const t of this.n.edificios){const e=t.anel.map(r=>r[0]),n=t.anel.map(r=>r[1]),i=this.quadricula(e.reduce((r,a)=>r+a)/e.length,n.reduce((r,a)=>r+a)/n.length);t.osm===hv?this.claustro(t,i):this.edificio(t,i)}this.chaoDesenhado(),this.muros();for(const t of this.quadriculas.values())this.cena.add(t.acabar("mundo",tc,!0));this.limites(),this.marcarPontos()}terreno(){const t=this.n.dem,e=[],n=[];for(let c=0;c<t.nRow;c++)for(let l=0;l<t.nCol;l++)e.push(...xe(t.x0+l*t.passo,t.y0+c*t.passo,t.elev[c*t.nCol+l]));for(let c=0;c<t.nRow-1;c++)for(let l=0;l<t.nCol-1;l++){const h=c*t.nCol+l,f=h+1,u=h+t.nCol,d=u+1;n.push(h,f,u,f,d,u)}const i=new we;i.setAttribute("position",new he(e,3)),i.setIndex(n),i.computeVertexNormals();const r=new Se(i,tc);r.name="terreno",this.cena.add(r),this.colisao.add(new Se(i));const o=new Bh(i,38).getAttribute("position").array;for(let c=0;c<o.length;c+=6)this.quadricula((o[c]+o[c+3])/2,-(o[c+2]+o[c+5])/2).segmentos(Array.from(o.subarray(c,c+6)),"pormenor")}paredes(t,e,n,i,r=!0){const a=[];for(let c=0;c<t.length;c++){const l=t[c],h=t[(c+1)%t.length],f=e(c),u=e((c+1)%t.length);a.push(...xe(l[0],l[1],f),...xe(h[0],h[1],u),...xe(h[0],h[1],n),...xe(l[0],l[1],f),...xe(h[0],h[1],n),...xe(l[0],l[1],n));const d=t[(c-1+t.length)%t.length],m=Math.atan2(l[1]-d[1],l[0]-d[0]),v=Math.atan2(h[1]-l[1],h[0]-l[0]);if(Math.abs(Math.atan2(Math.sin(v-m),Math.cos(v-m)))>.2&&i.linha([xe(l[0],l[1],Math.max(f,this.chao(l[0],l[1]))),xe(l[0],l[1],n)],"aresta"),f<this.chao(l[0],l[1])+.2){const g=Math.hypot(h[0]-l[0],h[1]-l[1]),p=Math.max(1,Math.ceil(g/1.5)),b=[];for(let T=0;T<=p;T++){const M=l[0]+(h[0]-l[0])*T/p,y=l[1]+(h[1]-l[1])*T/p;b.push(xe(M,y,this.chao(M,y)+.03))}i.linha(b,"aresta")}}i.linha(t.map(([c,l])=>xe(c,l,n)),"aresta",!0);const o=new we;o.setAttribute("position",new he(a,3)),i.solido(o,!1),r&&this.colisao.add(new Se(o.clone()))}tampa(t,e,n,i,r=!0){const a=new us(t.map(([c,l])=>new ct(c,l)));for(const c of e)a.holes.push(new qo(c.map(([l,h])=>new ct(l,h))));const o=new aa(a);o.rotateX(-Math.PI/2),o.translate(0,n,0),i.solido(o,!1),r&&this.colisao.add(new Se(o.clone()))}edificio(t,e){const n=cv.has(t.osm);let i=()=>t.base-.8;if(n){const a=this.n.vias.filter(c=>c.passagem).flatMap(c=>c.g).filter(([c,l])=>Is(c,l,t.anel)).map(([c,l])=>this.chao(c,l)),o=(a.length?Math.max(...a):t.base)+4.2;i=()=>o,this.tampa(t.anel,[],o,e)}this.paredes(t.anel,i,t.topo,e),this.tampa(t.anel,t.furos,t.topo,e);for(const a of t.furos)this.paredes(a,()=>t.base-.8,t.topo,e);n&&this.arcoPassagem(t,i(0),e);const r=t.osm===lv;t.cumeeira-t.topo>1.5&&!r&&this.telhado(t,e),this.fachadas(t,e,r),r&&this.ameias(t,e)}telhado(t,e){if(t.anel.length>8)return;const n=t.anel.map(l=>l[0]),i=t.anel.map(l=>l[1]),r=n.reduce((l,h)=>l+h)/n.length,a=i.reduce((l,h)=>l+h)/i.length,o=Math.min(t.cumeeira-t.topo,4),c=xe(r,a,t.topo+o);for(let l=0;l<t.anel.length;l++){const h=t.anel[l],f=t.anel[(l+1)%t.anel.length];e.face([xe(h[0],h[1],t.topo),xe(f[0],f[1],t.topo),c],!1),e.linha([xe(h[0],h[1],t.topo),c],"pormenor")}}arcoPassagem(t,e,n){for(const i of this.n.vias.filter(r=>r.passagem))for(let r=1;r<i.g.length;r++)for(const a of[i.g[r-1],i.g[r]]){if(Is(a[0],a[1],t.anel))continue;const o=a===i.g[r]?i.g[r-1]:i.g[r],c=o[0]-a[0],l=o[1]-a[1],h=Math.hypot(c,l),f=-l/h,u=c/h,d=[],m=1.8,v=e-1.2;for(let g=0;g<=16;g++){const p=Math.PI*(g/16);d.push(xe(a[0]+c/h*.5+f*Math.cos(p)*m,a[1]+l/h*.5+u*Math.cos(p)*m,v+Math.sin(p)*1.2))}n.linha(d,"aresta")}}livre(t,e,n){return!this.edificioEm(t,e,n)&&!Is(t,e,n.anel)}fachadas(t,e,n){const i=ms(jo(t.osm)),r=t.anel;n&&this.portalSe(t,e);for(let a=0;a<r.length;a++){const o=r[a],c=r[(a+1)%r.length],l=c[0]-o[0],h=c[1]-o[1],f=Math.hypot(l,h);if(f<2.4)continue;const u=l/f,d=h/f,m=d,v=-u,g=(o[0]+c[0])/2,p=(o[1]+c[1])/2;if(!this.livre(g+m*1.5,p+v*1.5,t))continue;const b=.04,T=(L,I,O=b)=>xe(o[0]+u*L+m*O,o[1]+d*L+v*O,I),M=L=>this.chao(o[0]+u*L+m*1.2,o[1]+d*L+v*1.2),y=(L,I,O,P,B="pormenor")=>e.linha([T(L,O),T(I,O),T(I,P),T(L,P)],B,!0),E=(L,I,O,P,B=.18)=>e.tracejar(T(L,O),[u*(I-L),0,-d*(I-L)],[0,P-O,0],B,"sombra");if(n){const L=Math.floor(f/6);for(let I=0;I<L;I++){const O=(I+.5)*f/L,P=Math.max(M(O)+7,t.base+9);P+3>t.topo-1||(y(O-.25,O+.25,P,P+2.6),E(O-.25,O+.25,P,P+2.6,.1))}continue}e.linha([T(0,t.topo-.35,.05),T(f,t.topo-.35,.05)],"pormenor");const C=Math.floor(f/3.1);if(!C)continue;const x=f/C;let w=-1/0;for(let L=0;L<=f;L+=1)w=Math.max(w,M(L));const D=i()<.3;for(let L=0;L<C;L++){const I=x*(L+.5),O=M(I);if(O<t.topo-3&&O>t.base-1){const P=i();P<.45?(y(I-.55,I+.55,O,O+2.3),e.linha([T(I+.35,O+1.1),T(I+.35,O+1.2)],"pormenor"),i()<.5&&E(I-.55,I+.55,O,O+2.3,.3)):P<.75&&(y(I-1.1,I+1.1,O+.5,O+2.6),e.linha([T(I-1.1,O+2.9),T(I+1.1,O+2.9)],"pormenor"))}for(let P=Math.max(O,w-2)+3.6;P+1.6<t.topo-.6;P+=3.1){if(i()<.08)continue;const B=.5+i()*.1;if(y(I-B,I+B,P,P+1.5),e.linha([T(I,P),T(I,P+1.5)],"pormenor"),e.linha([T(I-B-.12,P-.08,.1),T(I+B+.12,P-.08,.1)],"pormenor"),i()<.35){const k=I-B*.7;e.linha([T(k,P+.3),T(k+.35,P+.75)],"sombra"),e.linha([T(k+.1,P+.2),T(k+.45,P+.65)],"sombra")}if(i()<.12){const k=P-.1;e.linha([T(I-B-.3,k,.5),T(I+B+.3,k,.5),T(I+B+.3,k+.9,.5),T(I-B-.3,k+.9,.5)],"pormenor",!0);for(let X=-B-.3;X<=B+.3;X+=.2)e.linha([T(I+X,k,.5),T(I+X,k+.9,.5)],"sombra")}}if(D&&i()<.2){const P=O+1+i()*4;e.linha([T(I+1,P),T(I+1.2,P-.4),T(I+1.1,P-.8),T(I+1.4,P-1.3)],"sombra")}}}}portalSe(t,e){const n=t.anel,i=n.length,r=y=>{const E=n[y],C=n[(y+1)%i];return Math.atan2(C[1]-E[1],C[0]-E[0])},a=[];for(let y=0;y<i;y++){const E=a[a.length-1],C=E?Math.abs(Math.atan2(Math.sin(r(y)-r(E.i1)),Math.cos(r(y)-r(E.i1)))):9;E&&C<.2?E.i1=y:a.push({i0:y,i1:y})}let o=null;for(const y of a){const E=n[y.i0],C=n[(y.i1+1)%i],x=Math.hypot(C[0]-E[0],C[1]-E[1]);x<4||(C[1]-E[1])/x>-.7||(!o||(E[0]+C[0])/2<(o.a[0]+o.c[0])/2)&&(o={a:E,c:C,L:x})}if(!o)return;const{a:c,c:l,L:h}=o,f=(l[0]-c[0])/h,u=(l[1]-c[1])/h,d=u,m=-f,v=(y,E,C=.04)=>xe(c[0]+f*y+d*C,c[1]+u*y+m*C,E),g=y=>this.chao(c[0]+f*y+d*.6,c[1]+u*y+m*.6),p=(y,E,C,x,w=.18)=>e.tracejar(v(y,C),[f*(E-y),0,-u*(E-y)],[0,x-C,0],w,"sombra");this.portal(v,h,g,e,p);const b=h/2,T=Math.min(h/2-.3,3.4),M=(y,E)=>{const C=c[0]+f*y+d*E,x=c[1]+u*y+m*E;return xe(C,x,this.chao(C,x)+.04)};for(let y=.4;y<=5.6;y+=.42)e.linha([M(b-T,y),M(b+T,y)],y<.5?"aresta":"chao");for(const y of[-1,1]){const E=[];for(let C=0;C<=5.6;C+=.7)E.push(M(b+y*T,C));e.linha(E,"pormenor")}this.pontos.portalSe=Mi(c[0]+f*b+d*6,c[1]+u*b+m*6,this.chao(c[0]+f*b+d*6,c[1]+u*b+m*6))}portal(t,e,n,i,r){const a=e/2,o=n(a);for(let h=0;h<4;h++){const f=1.6+h*.45,u=3.2,d=[t(a-f,o,.05+h*.1)];for(let m=0;m<=20;m++){const v=Math.PI*(1-m/20);d.push(t(a+Math.cos(v)*f,o+u+Math.sin(v)*f,.05+h*.1))}d.push(t(a+f,o,.05+h*.1)),i.linha(d,h===0?"aresta":"pormenor")}r(a-1.6,a+1.6,o,o+3.2,.12);const c=o+8,l=[];for(let h=0;h<=16;h++){const f=Math.PI*(1-h/16);l.push(t(a+Math.cos(f)*1.3,c+2+Math.sin(f)*1.3))}i.linha([t(a-1.3,c),...l,t(a+1.3,c),t(a-1.3,c)],"aresta")}ameias(t,e){const n=t.topo;for(let i=0;i<t.anel.length;i++){const r=t.anel[i],a=t.anel[(i+1)%t.anel.length],o=Math.hypot(a[0]-r[0],a[1]-r[1]),c=Math.atan2(a[1]-r[1],a[0]-r[0]);for(let l=.6;l<o-.6;l+=1.9){const h=r[0]+(a[0]-r[0])*l/o,f=r[1]+(a[1]-r[1])*l/o;e.caixa(1,1.3,.7,h,n+.65,-f,c)}}}claustro(t,e){const n=t.anel,i=t.furos[0],r=t.topo,a=t.base-.8,o=this.pontoLargo();let c=-1,l=1/0;for(let f=0;f<n.length;f++){const u=n[f],d=n[(f+1)%n.length],m=Math.hypot(d[0]-u[0],d[1]-u[1]);if(m<6)continue;const v=(u[0]+d[0])/2,g=(u[1]+d[1])/2,p=(d[1]-u[1])/m,b=-(d[0]-u[0])/m;if(!this.livre(v+p*2,g+b*2,t))continue;const T=Math.hypot(v-o[0],g-o[1]);T<l&&(l=T,c=f)}const h=new Map;if(c>=0){const f=n[c],u=n[(c+1)%n.length],d=Math.hypot(u[0]-f[0],u[1]-f[1]);h.set(c,[[d/2-1.3,d/2+1.3,3.4]]);const m=(f[0]+u[0])/2,v=(f[1]+u[1])/2,g=(u[1]-f[1])/d,p=-(u[0]-f[0])/d;this.pontos.portaClaustro=Mi(m+g*2.5,v+p*2.5,this.chao(m+g*2.5,v+p*2.5)),this.pontos.dentroClaustro=Mi(m-g*2.5,v-p*2.5,this.chao(m-g*2.5,v-p*2.5))}if(this.paredesComAberturas(n,a,r,h,e,.6,!1),i){const f=new Map,u=[...i].reverse();for(let p=0;p<u.length;p++){const b=u[p],T=u[(p+1)%u.length],M=Math.hypot(T[0]-b[0],T[1]-b[1]),y=Math.floor(M/3.4),E=[];for(let C=0;C<y;C++){const x=M/y*(C+.5);E.push([x-1.1,x+1.1,3])}f.set(p,E)}this.paredesComAberturas(u,a,r,f,e,.6,!0);const d=i.map(p=>p[0]),m=i.map(p=>p[1]),v=d.reduce((p,b)=>p+b)/d.length,g=m.reduce((p,b)=>p+b)/m.length;this.pontos.patio=Mi(v,g,this.chao(v,g))}if(this.tampa(n,i?[i]:[],r,e),this.pontos.patio){const f=this.pontos.patio,u=new Un(1.4,1.6,.8,24);u.translate(f.x+3,f.y+.4,f.z+2),e.solido(u,"aresta",50);const d=new Un(1.4,1.4,.01,24,1,!0);d.translate(f.x+3,f.y+.8,f.z+2),e.solido(d,!1);const m=new Un(.15,.2,1.4,8);m.translate(f.x+3,f.y+1.1,f.z+2),e.solido(m,"pormenor",50);const v=new Un(1.6,1.6,1.4,12);v.translate(f.x+3,f.y+.7,f.z+2),this.colisao.add(new Se(v))}}paredesComAberturas(t,e,n,i,r,a,o){for(let c=0;c<t.length;c++){const l=t[c],h=t[(c+1)%t.length],f=h[0]-l[0],u=h[1]-l[1],d=Math.hypot(f,u);if(d<.2)continue;const m=f/d,v=u/d,g=Math.atan2(u,f),p=(i.get(c)??[]).filter(([M,y])=>M>.3&&y<d-.3),b=(M,y,E,C)=>{if(y-M<.05||C-E<.05)return;const x=(M+y)/2,w=l[0]+m*x-v*a*.5,D=l[1]+v*x+m*a*.5,L=new fn(y-M,C-E,a);L.rotateY(g),L.translate(w,(E+C)/2,-D),this.colisao.add(new Se(L.clone())),r.solido(L,"aresta")};let T=0;for(const[M,y,E]of p){b(T,M,e,n);const C=Math.min(this.chao(l[0]+m*M,l[1]+v*M),this.chao(l[0]+m*y,l[1]+v*y));if(b(M,y,e,C-.05),b(M,y,C+E,n),o){const x=[],w=(y-M)/2,D=(M+y)/2;for(let L=0;L<=14;L++){const I=Math.PI*(L/14),O=D+Math.cos(I)*w;x.push(xe(l[0]+m*O+v*.02,l[1]+v*O-m*.02,C+E-w*.6+Math.sin(I)*w*.6))}r.linha(x,"pormenor")}T=y}b(T,d,e,n)}}pontoLargo(){const t=this.n.pracas.find(i=>i.osm==="way/201639837");if(!t)return[30,5];const e=t.g.map(i=>i[0]),n=t.g.map(i=>i[1]);return[e.reduce((i,r)=>i+r)/e.length,n.reduce((i,r)=>i+r)/n.length]}chaoDesenhado(){for(const e of this.n.vias){if(e.tipo!=="steps")continue;const n=e.largura??2.6;for(let i=1;i<e.g.length;i++){const r=e.g[i-1],a=e.g[i],o=Math.hypot(a[0]-r[0],a[1]-r[1]),c=(a[0]-r[0])/o,l=(a[1]-r[1])/o;for(let h=0;h<o;h+=.45){const f=r[0]+c*h,u=r[1]+l*h,d=this.chao(f,u)+.04;this.quadricula(f,u).linha([xe(f-l*n/2,u+c*n/2,d),xe(f+l*n/2,u-c*n/2,d)],"chao")}for(const h of[-1,1]){const f=[];for(let u=0;u<=o;u+=1){const d=r[0]+c*u+h*-l*n/2,m=r[1]+l*u+h*c*n/2;f.push(xe(d,m,this.chao(d,m)+.05))}this.quadricula(r[0],r[1]).linha(f,"pormenor")}}}const t=ms(7);for(const e of this.n.vias)if(!(e.tipo==="steps"||e.tipo==="service"))for(let n=1;n<e.g.length;n++){const i=e.g[n-1],r=e.g[n],a=Math.hypot(r[0]-i[0],r[1]-i[1]);for(let o=t()*4;o<a;o+=3+t()*5){const c=i[0]+(r[0]-i[0])*o/a+(t()-.5)*3,l=i[1]+(r[1]-i[1])*o/a+(t()-.5)*3;if(this.edificioEm(c,l))continue;const h=this.chao(c,l)+.04,f=.18+t()*.15;this.quadricula(c,l).linha([xe(c-f,l,h),xe(c,l+f*.4,h),xe(c+f,l,h)],"chao")}}}muros(){for(const t of this.n.muros){if(t.tipo==="retaining_wall")continue;const e=t.altura??(t.tipo==="city_wall"?4:1.6);for(let n=1;n<t.g.length;n++){const i=t.g[n-1],r=t.g[n],a=Math.hypot(r[0]-i[0],r[1]-i[1]);if(a<.3)continue;const o=[];for(const f of this.n.vias)if(!f.area)for(let u=1;u<f.g.length;u++){const d=ov(i,r,f.g[u-1],f.g[u]);d!==null&&o.push(d)}const c=1.8/a,l=[];let h=0;for(const f of o.sort((u,d)=>u-d))f-c>h&&l.push([h,f-c]),h=Math.max(h,f+c);h<1&&l.push([h,1]);for(const[f,u]of l){const d=[i[0]+(r[0]-i[0])*f,i[1]+(r[1]-i[1])*f],m=[i[0]+(r[0]-i[0])*u,i[1]+(r[1]-i[1])*u],v=a*(u-f);if(v<.3)continue;const g=this.chao(d[0],d[1]),p=this.chao(m[0],m[1]),b=Math.min(g,p)-.5,T=Math.max(g,p)+e,M=new fn(v,T-b,.5);M.rotateY(Math.atan2(m[1]-d[1],m[0]-d[0])),M.translate((d[0]+m[0])/2,(b+T)/2,-(d[1]+m[1])/2),this.colisao.add(new Se(M.clone())),this.quadricula(d[0],d[1]).solido(M)}}}}limites(){const[t,e]=this.n.meio,n=t-4,i=e-4;for(const[r,a]of[[[-n,-i],[n,-i]],[[n,-i],[n,i]],[[n,i],[-n,i]],[[-n,i],[-n,-i]]]){const o=Math.hypot(a[0]-r[0],a[1]-r[1]),c=new fn(o,300,1);c.rotateY(Math.atan2(a[1]-r[1],a[0]-r[0])),c.translate((r[0]+a[0])/2,50,-(r[1]+a[1])/2),this.colisao.add(new Se(c))}}percurso=[];comprimentos=[];marcarPontos(){const t=l=>this.n.vias.find(h=>h.osm===l)?.g??[],e=[...t("way/1165517465"),...t("way/1165517464"),...t("way/41222814"),...t("way/121298535"),...t("way/121298533"),...t("way/121298534"),...t("way/1128379641"),...t("way/116224908"),[24,18],[32,6],[38,-1],[41,-9]],n=[];for(const l of e)(!n.length||Math.hypot(l[0]-n[n.length-1][0],l[1]-n[n.length-1][1])>.5)&&n.push(l);const i=(l,h)=>Mi(l,h,this.chao(l,h)),r=this.pontos,a=l=>n.reduce((h,f)=>Math.hypot(f[0]-l[0],f[1]-l[1])<Math.hypot(h[0]-l[0],h[1]-l[1])?f:h);r.inicio=i(...n[0]),r.olharInicio=i(...a([-99,19])),r.arco=i(-82,12.5),r.largoArco=i(...a([-70,-1])),r.escadasBase=i(...a([-45,7])),r.escadasMeio=i(...a([-16,17])),r.escadasTopo=i(...a([16,13])),r.largo=i(32,6);const o=[r.portaClaustro,r.dentroClaustro,r.patio].filter(Boolean);this.percurso=[...n.map(([l,h])=>i(l,h)),...o];let c=0;this.comprimentos=this.percurso.map((l,h)=>c+=h?l.distanceTo(this.percurso[h-1]):0),this.caminhoRota=this.percurso}sDe(t){let e=0,n=1/0;return this.percurso.forEach((i,r)=>{const a=i.distanceTo(t);a<n&&(n=a,e=r)}),this.comprimentos[e]}noPercurso(t,e=0){const n=this.comprimentos,i=this.percurso;let r=1;for(;r<n.length-1&&n[r]<t;)r++;const a=i[r-1],o=i[r],c=Qt.clamp((t-n[r-1])/Math.max(n[r]-n[r-1],.001),0,1),l=a.x+(o.x-a.x)*c,h=-(a.z+(o.z-a.z)*c),f=o.x-a.x,u=-(o.z-a.z),d=Math.hypot(f,u)||1;for(let m=1;m>=0;m-=.25){const v=l-u/d*e*m,g=h+f/d*e*m;if(!this.edificioEm(v,g))return Mi(v,g,this.chao(v,g))}return Mi(l,h,this.chao(l,h))}}const Ql=24,fv=1.62,dv=.32;class xc{constructor(t,e=1.75,n=dv){this.raio=n,this.capsula=new ru(t.clone().add(new A(0,n,0)),t.clone().add(new A(0,e-n,0)),n)}capsula;vel=new A;noChao=!1;get pes(){return this.capsula.start.clone().sub(new A(0,this.capsula.radius,0))}colocar(t){const e=this.capsula.end.y-this.capsula.start.y;this.capsula.start.set(t.x,t.y+this.capsula.radius,t.z),this.capsula.end.set(t.x,t.y+this.capsula.radius+e,t.z),this.vel.set(0,0,0)}passo(t,e){this.noChao?this.vel.y=Math.max(this.vel.y-Ql*t,-2):this.vel.y-=Ql*t;const n=this.vel.clone().multiplyScalar(t);this.capsula.translate(n),this.noChao=!1;for(let i=0;i<3;i++){const r=e.capsuleIntersect(this.capsula);if(!r)break;r.normal.y>.45?(this.noChao=!0,this.capsula.translate(new A(0,r.depth/Math.max(r.normal.y,.5),0)),this.vel.y<0&&(this.vel.y=0)):(this.vel.addScaledVector(r.normal,-r.normal.dot(this.vel)),this.capsula.translate(r.normal.multiplyScalar(r.depth)))}}}class pv{constructor(t,e){this.camera=t,this.corpo=new xc(e),document.addEventListener("keydown",n=>this.teclas.add(n.code)),document.addEventListener("keyup",n=>this.teclas.delete(n.code)),window.addEventListener("blur",()=>this.teclas.clear()),document.addEventListener("mousemove",n=>{document.pointerLockElement!==document.body||this.morto||(this.yaw-=n.movementX*.0022,this.pitch=Qt.clamp(this.pitch-n.movementY*.0022,-1.5,1.5))})}corpo;yaw=0;pitch=0;teclas=new Set;vida=100;morto=!1;aCorrer=!1;distanciaPasso=0;balanco=0;onPasso=()=>{};onAterrar=()=>{};vyAntes=0;noAr=0;yOlhos=null;andar=0;get assente(){return this.noAr<.15}get posicao(){return this.corpo.pes}get olhos(){return this.camera.position}frente(){return new A(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}actualizar(t,e,n){const i=this.frente(),r=new A(-i.z,0,i.x),a=new A;this.morto||((this.teclas.has("KeyW")||this.teclas.has("ArrowUp"))&&a.add(i),(this.teclas.has("KeyS")||this.teclas.has("ArrowDown"))&&a.sub(i),(this.teclas.has("KeyD")||this.teclas.has("ArrowRight"))&&a.add(r),(this.teclas.has("KeyA")||this.teclas.has("ArrowLeft"))&&a.sub(r)),this.aCorrer=(this.teclas.has("ShiftLeft")||this.teclas.has("ShiftRight"))&&!n&&a.lengthSq()>0;const o=n?2.4:this.aCorrer?7.2:4.4;a.lengthSq()&&a.normalize().multiplyScalar(o);const c=this.corpo,l=c.noChao?14:3;c.vel.x+=(a.x-c.vel.x)*Math.min(1,l*t),c.vel.z+=(a.z-c.vel.z)*Math.min(1,l*t),c.noChao&&this.teclas.has("Space")&&!this.morto&&(c.vel.y=7.2);const h=c.noChao;this.vyAntes=c.vel.y;const f=Math.ceil(t/.008);for(let g=0;g<f;g++)c.passo(t/f,e);!h&&c.noChao&&this.vyAntes<-4&&this.onAterrar(-this.vyAntes),this.noAr=c.noChao?0:this.noAr+t;const u=Math.hypot(c.vel.x,c.vel.z);if(this.andar=Qt.damp(this.andar,this.assente?Math.min(u/5,1):0,8,t),this.assente&&u>.5){this.distanciaPasso+=u*t,this.balanco+=u*t*1.9;const g=this.aCorrer?2.1:1.55;this.distanciaPasso>g&&(this.distanciaPasso=0,this.onPasso(this.aCorrer?1:n?.35:.65))}const d=this.morto?.35:fv,m=c.pes.y+d;this.yOlhos===null||Math.abs(m-this.yOlhos)>1.2||!this.assente?this.yOlhos=m:this.yOlhos=Qt.damp(this.yOlhos,m,16,t),this.camera.position.copy(c.pes),this.camera.position.y=this.yOlhos;const v=this.andar*.7;this.camera.position.y+=Math.sin(this.balanco*2)*.04*v,this.camera.position.addScaledVector(r,Math.cos(this.balanco)*.025*v),this.camera.rotation.set(this.pitch,this.yaw,this.morto?.5:Math.cos(this.balanco)*.004*v,"YXZ")}}class mv{cena=new Rh;camera=new rn(52,1,.04,6);raiz=new Me;modelo=new Me;carregador=new Me;clarao;pente=30;reserva=120;capacidade=30;cadencia=.095;espera=0;aRecarregar=0;mira=0;recuo=0;calor=0;balancoX=0;balancoY=0;tempo=0;corrida=0;constructor(t){this.cena.add(this.raiz),this.raiz.add(this.modelo),this.construir(),this.clarao=new Xr(new Vs({map:t,transparent:!0,depthWrite:!1,depthTest:!1})),this.clarao.scale.setScalar(.3),this.clarao.position.set(0,.035,-.98),this.clarao.visible=!1,this.modelo.add(this.clarao)}construir(){const t=new Pi("arma",.12,.05),e=[],n=d=>{const m=d.index?d.toNonIndexed():d.clone();m.deleteAttribute("uv"),m.getAttribute("normal")||m.computeVertexNormals(),e.push(m)},i=(d,m,v,g,p,b,T=0)=>{const M=new fn(d,m,v);M.rotateX(T),M.translate(g,p,b),t.solido(M,"aresta",20)};i(.06,.07,.34,0,0,-.1),i(.056,.025,.3,0,.045,-.1),i(.07,.065,.2,0,.005,-.37),i(.05,.03,.18,0,.045,-.36);const r=new Un(.011,.011,.36,10);r.rotateX(Math.PI/2),r.translate(0,.035,-.62),n(r),t.solido(r,"aresta",50);const a=new Un(.016,.016,.22,10);a.rotateX(Math.PI/2),a.translate(0,.068,-.4),n(a),t.solido(a,"aresta",50),i(.012,.05,.015,0,.065,-.78),i(.04,.014,.012,0,.05,-.78),i(.03,.03,.04,0,.07,-.2),i(.035,.055,.09,0,-.03,.14,-.2),i(.04,.11,.26,0,-.035,.28,-.12),i(.035,.1,.045,0,-.08,.02,.35),i(.01,.03,.06,0,-.045,-.05);const o=new us;o.moveTo(-.035,0),o.lineTo(.035,0),o.quadraticCurveTo(.06,-.12,.1,-.2),o.lineTo(.03,-.22),o.quadraticCurveTo(-.01,-.12,-.035,0);const c=new ra(o,{depth:.04,bevelEnabled:!1,curveSegments:6});c.translate(0,0,-.02),c.rotateY(Math.PI/2);const l=new Pi("carregador",.12,.05);l.solido(c,"aresta",25);for(let d=0;d<3;d++)l.linha([[.021,-.05-d*.04,.02+d*.012],[.021,-.06-d*.04,-.03+d*.015]],"sombra");this.carregador.add(l.acabar("arma",Kl)),this.carregador.position.set(0,-.03,-.2),this.modelo.add(this.carregador);const h=(d,m,v)=>{const g=m.clone().sub(d),p=new Un(v*.85,v,g.length(),12,1,!0);p.translate(0,g.length()/2,0),p.applyQuaternion(new Di().setFromUnitVectors(new A(0,1,0),g.clone().normalize())),p.translate(d.x,d.y,d.z),n(p),t.solido(p,!1);const b=new A().crossVectors(g,new A(0,1,0)).normalize().multiplyScalar(v);t.linha([d.clone().add(b).toArray(),m.clone().add(b.clone().multiplyScalar(.85)).toArray()],"aresta"),t.linha([d.clone().sub(b).toArray(),m.clone().sub(b.clone().multiplyScalar(.85)).toArray()],"aresta")};h(new A(.28,-.35,.55),new A(.02,-.1,.05),.05),h(new A(-.3,-.4,.3),new A(-.02,-.03,-.36),.045);const f=(d,m,v,g,p,b)=>{const T=new ds(1,10,8);T.scale(g,p,b),T.translate(d,m,v),n(T),t.solido(T,!1);const M=[];for(let y=0;y<=16;y++){const E=y/16*Math.PI*2;M.push([d+Math.cos(E)*g*1.02,m+Math.sin(E)*p*1.02,v])}t.linha(M,"aresta");for(let y=0;y<3;y++)t.linha([[d-g*.6,m+p*(.4-y*.35),v-b*.9],[d+g*.5,m+p*(.5-y*.35),v-b*.95]],"pormenor")};f(.01,-.075,.03,.045,.05,.05),f(-.01,-.02,-.37,.05,.04,.06),this.modelo.add(t.acabar("arma",Kl));const u=cu(e);u&&this.modelo.add(nv(u,1.6)),this.modelo.traverse(d=>{d.frustumCulled=!1,d.renderOrder+=10})}redimensionar(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}podeDisparar(){return this.espera<=0&&this.aRecarregar<=0&&this.pente>0}disparar(){this.pente--,this.espera=this.cadencia,this.recuo=Math.min(1,this.recuo+.55),this.calor=Math.min(1,this.calor+.12),this.clarao.visible=!0,this.clarao.material.rotation=Math.random()*6.28,this.clarao.scale.setScalar(.22+Math.random()*.14)}recarregar(){return this.aRecarregar>0||this.pente===this.capacidade||this.reserva<=0?!1:(this.aRecarregar=1.6,!0)}dispersao(t,e){return Qt.lerp(.02,.003,this.mira)+this.calor*Qt.lerp(.035,.012,this.mira)+t*.006*(1-this.mira*.6)+(e?0:.05)}actualizar(t,e,n,i,r,a,o){if(this.tempo+=t,this.espera-=t,this.recuo=Math.max(0,this.recuo-t*7),this.calor=Math.max(0,this.calor-t*(this.espera>-.15?.6:2.5)),this.espera<this.cadencia-.04&&(this.clarao.visible=!1),this.aRecarregar>0&&(this.aRecarregar-=t,this.aRecarregar<=0)){const v=this.capacidade-this.pente,g=Math.min(v,this.reserva);this.pente+=g,this.reserva-=g}this.mira=Qt.damp(this.mira,o&&this.aRecarregar<=0&&!a?1:0,14,t),this.corrida=Qt.damp(this.corrida,a?1:0,8,t),this.balancoX=Qt.damp(this.balancoX,Qt.clamp(-e*3,-.06,.06),10,t),this.balancoY=Qt.damp(this.balancoY,Qt.clamp(n*3,-.06,.06),10,t);const c=this.mira,l=i*(1-c*.8),h=Qt.lerp(.2,0,c)+this.balancoX+Math.cos(r)*.012*l,f=Qt.lerp(-.25,-.108,c)+this.balancoY+Math.abs(Math.sin(r))*.016*l-this.corrida*.06,u=Qt.lerp(-.36,-.3,c)+this.recuo*.05;this.raiz.position.set(h,f+Math.sin(this.tempo*1.4)*.002*(1-c),u),this.raiz.rotation.set(this.recuo*.08+this.corrida*-.35+(1-c)*.03,this.corrida*.7+this.balancoX*2+(1-c)*.05,this.corrida*.3);const d=this.aRecarregar>0?1-this.aRecarregar/1.6:0,m=d>0?Math.sin(Math.min(1,d*1.15)*Math.PI):0;this.modelo.rotation.set(-m*.25,0,m*.55),this.carregador.position.y=-.03-(d>.1&&d<.55?Math.sin((d-.1)/.45*Math.PI)*.25:0),this.camera.fov=Qt.lerp(52,40,c),this.camera.updateProjectionMatrix()}}class gv{ctx;mestre;eco;ecoEnvio;ruido;ruidoRosa;vozes=new Map;falaActual=null;ultimaFalaInimigo=0;ouvinte=new A;frenteOuvinte=new A(0,0,-1);pronto=!1;legenda=()=>{};textos={};async iniciar(){if(this.pronto)return;this.ctx=new AudioContext,this.mestre=this.ctx.createGain(),this.mestre.gain.value=.9;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=6,t.attack.value=.002,t.release.value=.2,this.mestre.connect(t).connect(this.ctx.destination),this.eco=this.ctx.createConvolver(),this.eco.buffer=this.respostaRuela(1.2),this.ecoEnvio=this.ctx.createGain(),this.ecoEnvio.gain.value=.4,this.ecoEnvio.connect(this.eco).connect(this.mestre),this.ruido=this.bufferRuido(2,"branco"),this.ruidoRosa=this.bufferRuido(4,"castanho"),this.pronto=!0,this.ambiente();const e=await(await fetch("/tinta-na-alta/falas.json")).json();for(const[n,i]of Object.entries(e))this.textos[n]=i.texto;await Promise.all(Object.keys(e).map(async n=>{try{const i=await(await fetch(`/tinta-na-alta/vozes/${n}.wav`)).arrayBuffer();this.vozes.set(n,await this.ctx.decodeAudioData(i))}catch{}}))}bufferRuido(t,e){const n=this.ctx.sampleRate*t,i=this.ctx.createBuffer(1,n,this.ctx.sampleRate),r=i.getChannelData(0);let a=0;for(let o=0;o<n;o++){const c=Math.random()*2-1;e==="branco"?r[o]=c:(a=(a+.02*c)/1.02,r[o]=a*3.5)}return i}respostaRuela(t){const e=this.ctx.sampleRate,n=Math.floor(e*t),i=this.ctx.createBuffer(2,n,e);for(let r=0;r<2;r++){const a=i.getChannelData(r);for(let o=0;o<n;o++){const c=o/e;a[o]=(Math.random()*2-1)*Math.pow(1-c/t,5)*.22*Math.min(1,c*60)}for(const[o,c]of[[7,.9],[13,.7],[21,.55],[29,.5],[44,.35],[63,.25],[95,.12]]){const l=Math.floor((o+(r?3:0)+Math.random()*4)*e/1e3);for(let h=0;h<40;h++)a[l+h]+=(Math.random()*2-1)*c*(1-h/40)}}return i}espacial(t,e=60,n=1){const i=this.ctx.createGain();if(!t)return i.connect(this.mestre),{entrada:i,dist:0};const r=t.clone().sub(this.ouvinte),a=r.length(),o=this.ctx.createGain();o.gain.value=1/(1+Math.pow(a/(e*.18),1.4));const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.value=Math.max(700,18e3/(1+a/18));const l=this.ctx.createStereoPanner(),h=this.frenteOuvinte,f=new A(-h.z,0,h.x);l.pan.value=a>.5?Qt.clamp(r.clone().normalize().dot(f),-1,1)*.8:0,i.connect(c).connect(o).connect(l).connect(this.mestre);const u=this.ctx.createGain();return u.gain.value=Math.min(.75,.15+a/90)*n,l.connect(u).connect(this.ecoEnvio),{entrada:i,dist:a}}ruidoEm(t,e,n,i,r,a,o,c=.001,l,h=this.ruido){const f=this.ctx.createBufferSource();f.buffer=h,f.playbackRate.value=.9+Math.random()*.2;const u=this.ctx.createBiquadFilter();u.type=i,u.frequency.setValueAtTime(r,e),l&&u.frequency.exponentialRampToValueAtTime(l,e+n),u.Q.value=a;const d=this.ctx.createGain();d.gain.setValueAtTime(1e-4,e),d.gain.exponentialRampToValueAtTime(o,e+c),d.gain.exponentialRampToValueAtTime(1e-4,e+n),f.connect(u).connect(d).connect(t),f.start(e,Math.random()*1.5),f.stop(e+n+.05)}tom(t,e,n,i,r,a,o="sine"){const c=this.ctx.createOscillator();c.type=o,c.frequency.setValueAtTime(i,e),c.frequency.exponentialRampToValueAtTime(Math.max(1,r),e+n);const l=this.ctx.createGain();l.gain.setValueAtTime(a,e),l.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(l).connect(t),c.start(e),c.stop(e+n+.02)}tiro(t,e=!1){if(!this.pronto)return;const{entrada:n,dist:i}=this.espacial(t,160),r=this.ctx.currentTime+i/343,a=e?.8:1;this.ruidoEm(n,r,.03,"highpass",2500,.7,1.4*a),this.ruidoEm(n,r,.16,"lowpass",4200,.8,1.1*a,.001,300),this.ruidoEm(n,r+.004,.32,"bandpass",900,1.2,.5*a,.003,200),this.tom(n,r,.18,130,38,1.3*a),this.tom(n,r,.05,2400,900,.12*a,"square"),t||(this.ruidoEm(n,r+.045,.03,"bandpass",3800,6,.25),this.tom(n,r+.05,.04,5200,4700,.04,"triangle"))}vazio(){if(!this.pronto)return;const t=this.ctx.currentTime,{entrada:e}=this.espacial(null);this.ruidoEm(e,t,.025,"bandpass",3200,8,.5),this.tom(e,t,.03,2600,2200,.08,"triangle")}recarregar(){if(!this.pronto)return;const t=this.ctx.currentTime,{entrada:e}=this.espacial(null),n=(i,r,a)=>{this.ruidoEm(e,t+i,.05,"bandpass",r,5,a),this.tom(e,t+i,.06,r*1.3,r*1.1,a*.15,"triangle")};n(.05,1800,.5),this.ruidoEm(e,t+.12,.25,"bandpass",1200,1,.12,.05),n(.75,1500,.8),n(.8,2600,.4),n(1.25,2200,.6),n(1.38,3e3,.7)}passo(t,e,n=!1){if(!this.pronto)return;const{entrada:i}=this.espacial(t,30),r=this.ctx.currentTime,a=1+(Math.random()-.5)*.25;this.ruidoEm(i,r,.05,"bandpass",1900*a,1.3,.35*e),this.ruidoEm(i,r+.008,.09,"lowpass",500*a,.9,.5*e),this.tom(i,r,.06,n?150:110,60,.35*e),Math.random()<.4&&this.ruidoEm(i,r+.03,.05,"highpass",5e3,.5,.06*e)}aterrar(t){if(!this.pronto)return;const{entrada:e}=this.espacial(null),n=this.ctx.currentTime,i=Math.min(1,t/12);this.tom(e,n,.15,90,40,.8*i),this.ruidoEm(e,n,.12,"lowpass",900,1,.6*i)}zumbido(t){if(!this.pronto)return;const e=this.ctx.currentTime,n=this.ctx.createStereoPanner();n.pan.value=t,n.connect(this.mestre),this.ruidoEm(n,e,.18,"bandpass",3e3,5,.45,.04,1200),this.ruidoEm(n,e,.015,"highpass",4e3,.7,.5)}impacto(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,40),i=this.ctx.currentTime;this.ruidoEm(n,i,.08,"bandpass",2400+Math.random()*1500,2,.45),this.ruidoEm(n,i,.2,"lowpass",1200,.7,.15,.002),e&&this.tom(n,i+.01,.35+Math.random()*.2,2800+Math.random()*1200,900,.08,"sine")}acerto(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,50),i=this.ctx.currentTime;this.ruidoEm(n,i,.1,"lowpass",700,1.5,.9),this.tom(n,i,.1,e?220:140,70,.6);const r=this.ctx.createGain();r.connect(this.mestre),this.tom(r,i,.05,e?1800:1300,e?1600:1100,.12,"triangle")}queda(t){if(!this.pronto)return;const{entrada:e}=this.espacial(t,40),n=this.ctx.currentTime+.35;this.tom(e,n,.25,80,35,.9),this.ruidoEm(e,n,.3,"lowpass",600,.8,.6),this.ruidoEm(e,n+.18,.12,"bandpass",2600,3,.2),this.tom(e,n+.18,.2,3100,2900,.05,"triangle")}dor(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;this.tom(t,e,.2,90,50,.9),this.ruidoEm(t,e,.25,"lowpass",400,1,.7),this.tom(t,e,1.2,3900,3800,.03,"sine")}bater(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;for(const[n,i]of[[0,.5],[.33,.4]])this.tom(t,e+n,.12,70,45,i),this.tom(t,e+n+.12,.1,60,40,i*.6)}corda(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;for(let n=0;n<5;n++)this.ruidoEm(t,e+n*.12+Math.random()*.05,.1,"bandpass",1500+Math.random()*800,2,.2,.02)}guitarra(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,50),i=this.ctx.sampleRate,r=this.ctx.currentTime+.05;for(const[a,o,c]of e)for(const l of[0,.06]){const h=440*Math.pow(2,(o-69)/12)*(1+l/100),f=Math.floor(i*(c+.6)),u=this.ctx.createBuffer(1,f,i),d=u.getChannelData(0),m=Math.max(2,Math.round(i/h));for(let b=0;b<m;b++)d[b]=Math.random()*2-1;for(let b=m;b<f;b++)d[b]=.4985*(d[b-m]+d[b-m+1]);const v=this.ctx.createBufferSource();v.buffer=u;const g=this.ctx.createGain();g.gain.value=.22;const p=this.ctx.createBiquadFilter();p.type="peaking",p.frequency.value=2800,p.gain.value=5,v.connect(p).connect(g).connect(n),v.start(r+a+l*.2)}}sino(t,e=1){if(!this.pronto)return;const{entrada:n}=this.espacial(t,400),i=196;for(let r=0;r<e;r++){const a=this.ctx.currentTime+r*2.6;for(const[o,c,l]of[[.5,.3,6],[1,.4,4.5],[1.19,.25,3.5],[1.5,.15,3],[2,.12,2.5],[2.52,.08,1.8],[3.01,.05,1.3]])this.tom(n,a,l,i*o,i*o*.999,c*.5);this.ruidoEm(n,a,.04,"bandpass",1500,2,.2)}}ambiente(){const t=this.ctx.createBufferSource();t.buffer=this.ruidoRosa,t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="bandpass",e.frequency.value=400,e.Q.value=.6;const n=this.ctx.createGain();n.gain.value=.05;const i=this.ctx.createOscillator();i.frequency.value=.07;const r=this.ctx.createGain();r.gain.value=.035,i.connect(r).connect(n.gain);const a=this.ctx.createOscillator();a.frequency.value=.043;const o=this.ctx.createGain();o.gain.value=180,a.connect(o).connect(e.frequency),t.connect(e).connect(n).connect(this.mestre),t.start(),i.start(),a.start();const c=this.ctx.createBufferSource();c.buffer=this.ruidoRosa,c.loop=!0;const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.value=160;const h=this.ctx.createGain();h.gain.value=.06,c.connect(l).connect(h).connect(this.mestre),c.start(0,1.3);const f=()=>{if(!this.pronto)return;const u=this.ctx.currentTime,d=this.ouvinte.clone().add(new A((Math.random()-.5)*60,15,(Math.random()-.5)*60)),{entrada:m}=this.espacial(d,80);if(Math.random()<.5)for(let v=0;v<3;v++)this.tom(m,u+v*.28,.22,420,330,.06);else for(let v=0;v<4;v++)this.tom(m,u+v*.09,.07,5200+Math.random()*800,6500,.03,"triangle");setTimeout(f,5e3+Math.random()*12e3)};setTimeout(f,4e3)}coracao(t){if(!this.pronto)return;const e=this.ctx.currentTime,{entrada:n}=this.espacial(null);this.tom(n,e,.12,60,40,.5*t),this.tom(n,e+.18,.1,55,38,.35*t)}falar(t,e,n=null){if(!this.pronto)return 0;const i=this.vozes.get(t),r=this.ctx.currentTime,a=e==="radio"?3:e==="fadista"?2:1;if(typeof e=="object"){if(r-this.ultimaFalaInimigo<1.6)return 0;this.ultimaFalaInimigo=r}if(this.falaActual&&this.falaActual.ate>r){if(this.falaActual.prioridade>a&&a!==1)return 0;if(a>=this.falaActual.prioridade&&this.falaActual.prioridade<3&&a>1)try{this.falaActual.fonte.stop()}catch{}}const o=e==="radio"?"Central":e==="fadista"?"Fadista":"Borrão";if(this.legenda(o,this.textos[t]??""),!i)return 2.5;const c=this.ctx.createBufferSource();if(c.buffer=i,e==="radio"){c.playbackRate.value=1;const h=this.ctx.createBiquadFilter();h.type="highpass",h.frequency.value=450;const f=this.ctx.createBiquadFilter();f.type="lowpass",f.frequency.value=3e3;const u=this.ctx.createWaveShaper();u.curve=jl(3);const d=this.ctx.createGain();d.gain.value=1.1,c.connect(h).connect(u).connect(f).connect(d).connect(this.mestre),this.ruidoEm(this.mestre,r,.06,"bandpass",2e3,1,.15),this.ruidoEm(this.mestre,r+i.duration,.1,"bandpass",2e3,1,.15)}else if(e==="fadista"){c.playbackRate.value=.86;const{entrada:h}=this.espacial(n,40,.1),f=this.ctx.createGain();f.gain.value=1.6,c.connect(f).connect(h)}else{const h=e.inimigo;c.playbackRate.value=.7+h%5*.035;const{entrada:f}=this.espacial(n,70,.1),u=this.ctx.createWaveShaper();u.curve=jl(2);const d=this.ctx.createBiquadFilter();d.type="peaking",d.frequency.value=220,d.gain.value=6;const m=this.ctx.createGain();m.gain.value=1.9,c.connect(u).connect(d).connect(m).connect(f)}c.start();const l=i.duration/c.playbackRate.value;return this.falaActual={fonte:c,prioridade:a,ate:r+l},l}get aFalar(){return!!this.falaActual&&this.falaActual.ate>(this.ctx?.currentTime??0)}}function jl(s){const e=new Float32Array(1024);for(let n=0;n<1024;n++){const i=n/1023*2-1;e[n]=Math.tanh(i*s)/Math.tanh(s)}return e}function eo(s,t,e=!0){const n=document.createElement("canvas");n.width=n.height=128;const i=n.getContext("2d"),r=ms(t);i.fillStyle=s,i.beginPath();const a=18;for(let c=0;c<=a;c++){const l=c/a*Math.PI*2,h=22+r()*16,f=64+Math.cos(l)*h,u=64+Math.sin(l)*h;c===0?i.moveTo(f,u):i.lineTo(f,u)}i.fill();for(let c=0;c<12;c++){const l=r()*Math.PI*2,h=30+r()*28,f=2+r()*6;i.beginPath(),i.arc(64+Math.cos(l)*h,64+Math.sin(l)*h,f,0,7),i.fill()}if(e){i.strokeStyle=s;for(let c=0;c<7;c++){const l=r()*Math.PI*2;i.lineWidth=1.5+r()*2.5,i.beginPath(),i.moveTo(64+Math.cos(l)*26,64+Math.sin(l)*26),i.lineTo(64+Math.cos(l)*(46+r()*16),64+Math.sin(l)*(46+r()*16)),i.stroke()}}const o=new Fh(n);return o.colorSpace=Qe,o}function _v(s){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=ms(s);e.strokeStyle="#111",e.lineCap="round";for(let r=0;r<14;r++){const a=n()*Math.PI*2,o=6+n()*10,c=30+n()*30;e.lineWidth=1.5+n()*2.5,e.beginPath(),e.moveTo(64+Math.cos(a)*o,64+Math.sin(a)*o),e.lineTo(64+Math.cos(a)*c,64+Math.sin(a)*c),e.stroke()}e.lineWidth=2,e.beginPath();for(let r=0;r<=10;r++){const a=r/10*Math.PI*2,o=r%2?10:20+n()*8,c=64+Math.cos(a)*o,l=64+Math.sin(a)*o;r===0?e.moveTo(c,l):e.lineTo(c,l)}e.stroke();const i=new Fh(t);return i.colorSpace=Qe,i}class vv{grupo=new Me;vivos=[];decalques=[];manchasTinta=[1,2,3,4].map(t=>eo("#111",t*31));manchasVermelhas=[1,2,3,4].map(t=>eo("#b3121b",t*77));buracos=[1,2,3].map(t=>eo("#222",t*13,!1));claroes=[1,2,3].map(t=>_v(t*5));t=0;actualizar(t){this.t+=t;for(let e=this.vivos.length-1;e>=0;e--){const n=this.vivos[e],i=(this.t-n.nasceu)/(n.ate-n.nasceu);if(i>=1){this.grupo.remove(n.obj),n.obj.traverse(r=>{r.geometry?.dispose()}),this.vivos.splice(e,1);continue}if(n.tipo==="fade")n.obj.traverse(r=>{const a=r.material;a&&"opacity"in a&&(a.opacity=(1-i)*(a.userData.op??1))});else if(n.vel){const r=n.obj,a=r.geometry.getAttribute("position");for(let o=0;o<n.vel.length;o++){n.vel[o].y-=9.8*t;for(const c of[0,1]){const l=o*2+c;a.setXYZ(l,a.getX(l)+n.vel[o].x*t*(c?1:.8),a.getY(l)+n.vel[o].y*t*(c?1:.8),a.getZ(l)+n.vel[o].z*t*(c?1:.8))}}a.needsUpdate=!0,r.material.opacity=1-i}}}rasto(t,e,n=!1){const i=new we().setFromPoints([t,e]),r=new Wo({color:n?4473924:2236962,transparent:!0,opacity:.6});r.userData.op=.6;const a=new Uh(i,r);a.renderOrder=3,this.grupo.add(a),this.vivos.push({obj:a,nasceu:this.t,ate:this.t+(n?.12:.07),tipo:"fade"})}decalque(t,e,n,i,r=140){const a=new jn({map:t,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4}),o=new Se(new Qs(i,i),a);if(o.position.copy(e).addScaledVector(n,.02),o.lookAt(e.clone().add(n)),o.rotateZ(Math.random()*6.28),o.renderOrder=1,this.grupo.add(o),this.decalques.push(o),this.decalques.length>r){const c=this.decalques.shift();this.grupo.remove(c),c.geometry.dispose()}}riscos(t,e,n,i,r=3,a=.5){const o=[],c=[];for(let f=0;f<n;f++){const u=e.clone().multiplyScalar(.6).add(new A(Math.random()-.5,Math.random()-.2,Math.random()-.5)).normalize().multiplyScalar(r*(.5+Math.random()));c.push(u);const d=t.clone(),m=t.clone().addScaledVector(u,.03);o.push(d.x,d.y,d.z,m.x,m.y,m.z)}const l=new we;l.setAttribute("position",new he(o,3));const h=new Jf(l,new Wo({color:i,transparent:!0}));h.frustumCulled=!1,this.grupo.add(h),this.vivos.push({obj:h,nasceu:this.t,ate:this.t+a,tipo:"part",vel:c})}impactoParede(t,e){this.decalque(this.buracos[Math.floor(Math.random()*3)],t,e,.12+Math.random()*.06),this.riscos(t,e,7,3355443,2.5,.45);const n=new Xr(new Vs({map:this.claroes[1],transparent:!0,opacity:.35,depthWrite:!1}));n.material.userData.op=.35,n.position.copy(t).addScaledVector(e,.1),n.scale.setScalar(.35),this.grupo.add(n),this.vivos.push({obj:n,nasceu:this.t,ate:this.t+.18,tipo:"fade"})}sangue(t,e,n){this.riscos(t,e,n?22:12,11735579,n?4:2.5,.6);const i=new Xr(new Vs({map:this.manchasVermelhas[Math.floor(Math.random()*4)],transparent:!0,depthWrite:!1}));i.position.copy(t),i.scale.setScalar(n?.55:.35),this.grupo.add(i),this.vivos.push({obj:i,nasceu:this.t,ate:this.t+.25,tipo:"fade"})}poca(t,e=!0){const n=e?this.manchasVermelhas:this.manchasTinta;this.decalque(n[Math.floor(Math.random()*4)],t,new A(0,1,0),.9+Math.random()*.6,200)}manchaParede(t,e){this.decalque(this.manchasVermelhas[Math.floor(Math.random()*4)],t,e,.6+Math.random()*.4)}clarao(t,e=.9){const n=new Xr(new Vs({map:this.claroes[Math.floor(Math.random()*3)],transparent:!0,depthWrite:!1}));n.position.copy(t),n.scale.setScalar(e),n.material.rotation=Math.random()*6.28,this.grupo.add(n),this.vivos.push({obj:n,nasceu:this.t,ate:this.t+.06,tipo:"fade"})}}const xv=new jn({visible:!1});function es(s,t,e,n,i,r){const a=s==="cabeca"?new ds(t,8,6):new fn(t,e,n);a.translate(0,i,0);const o=new Se(a,xv);return o.userData.parte=s,r.push(o),o}function ns(s,t,e,n){if(t==="tinta")return new Se(s,hu);const i=new Pi("boneco",.25,.3);i.solido(s.clone(),"aresta",40);const r=i.acabar();if(s.type==="SphereGeometry"||s.type==="CylinderGeometry"||s.type==="CapsuleGeometry"){const a=new Se(s.clone().scale(1.12,1.06,1.12),new jn({color:1118481,side:qe}));r.add(a)}return r}class fu{constructor(t,e=!0){this.estilo=t;const n=.035,i=(o,c=n)=>{const l=new Un(c,c,o,8);return l.translate(0,-o/2,0),l};this.raiz.add(this.corpo),this.corpo.add(this.anca),this.anca.position.y=.92,this.anca.add(this.peito);const r=i(.52,t==="tinta"?.05:.045);r.translate(0,.52,0),this.peito.add(ns(r,t,"tronco",this.alvos)),this.peito.add(es("tronco",.34,.6,.24,.28,this.alvos)),this.peito.add(this.cabeca),this.cabeca.position.y=.68,this.cabeca.add(ns(new ds(.14,16,12),t,"cabeca",this.alvos)),this.cabeca.add(es("cabeca",.19,0,0,0,this.alvos));const a=.48;for(const[o,c,l]of[[this.bracoE,this.antebracoE,-1],[this.bracoD,this.antebracoD,1]])this.peito.add(o),o.position.set(l*.02,a,0),o.add(ns(i(.3),t,"membro",this.alvos)),o.add(c),c.position.y=-.3,c.add(ns(i(.3),t,"membro",this.alvos)),o.add(es("membro",.13,.3,.13,-.15,this.alvos)),c.add(es("membro",.13,.3,.13,-.15,this.alvos));for(const[o,c,l]of[[this.pernaE,this.canelaE,-1],[this.pernaD,this.canelaD,1]])this.anca.add(o),o.position.set(l*.07,0,0),o.add(ns(i(.46,.04),t,"membro",this.alvos)),o.add(c),c.position.y=-.46,c.add(ns(i(.46,.038),t,"membro",this.alvos)),o.add(es("membro",.17,.46,.17,-.23,this.alvos)),c.add(es("membro",.15,.46,.15,-.23,this.alvos));if(e){const o=new Me,c=(l,h,f,u,d,m)=>{const v=new Se(new fn(l,h,f),hu);v.position.set(u,d,m),o.add(v)};c(.05,.08,.62,0,0,-.18),c(.02,.02,.3,0,.02,-.62),c(.04,.16,.05,0,-.1,-.12),c(.04,.1,.18,0,-.03,.2),this.arma.add(o),this.peito.add(this.arma),this.arma.position.set(.12,.34,-.25)}if(t==="contorno"){const o=new us;o.moveTo(-.2,0),o.lineTo(.2,0),o.lineTo(.3,-.95),o.quadraticCurveTo(0,-1.02,-.3,-.95),o.lineTo(-.2,0);const c=new aa(o,6);this.capa=new Se(c,new jn({color:1381653,side:ln})),this.capa.position.set(0,.55,.08),this.capa.rotation.x=.12,this.peito.add(this.capa);const l=new us;l.moveTo(0,.12),l.bezierCurveTo(.16,.12,.2,-.12,.13,-.25),l.bezierCurveTo(.06,-.34,-.06,-.34,-.13,-.25),l.bezierCurveTo(-.2,-.12,-.16,.12,0,.12);const h=new Pi("guitarra",.2,.2),f=new ra(l,{depth:.08,bevelEnabled:!1,curveSegments:10});h.solido(f,"aresta",40),h.caixa(.04,.42,.03,0,.32,.04,0,"aresta");const u=new ds(.035,8,6);u.translate(0,.56,.04),h.solido(u,"aresta",40);const d=[];for(let v=-2;v<=2;v++)d.push([v*.008,-.2,.085],[v*.008,.52,.06]);for(let v=0;v<d.length;v+=2)h.linha([d[v],d[v+1]],"sombra");const m=h.acabar();m.position.set(.05,.3,.14),m.rotation.set(.1,Math.PI,.35),this.peito.add(m)}this.raiz.traverse(o=>{o.frustumCulled=!1})}raiz=new Me;corpo=new Me;alvos=[];anca=new Me;peito=new Me;cabeca=new Me;bracoE=new Me;antebracoE=new Me;bracoD=new Me;antebracoD=new Me;pernaE=new Me;canelaE=new Me;pernaD=new Me;canelaD=new Me;arma=new Me;capa;fase=Math.random()*10;queda=0;quedaDir=1;animar(t,e,n,i=!1){if(this.queda>0)return this.cair(t);this.fase+=t*(e>.2?2.2+e*1.2:1);const r=this.fase,a=Math.min(e/4,1);if(i){this.anca.position.y=.5,this.pernaE.rotation.x=this.pernaD.rotation.x=-1.4,this.canelaE.rotation.x=this.canelaD.rotation.x=1.4,this.peito.rotation.x=.05+Math.sin(r)*.03,this.bracoE.rotation.set(.5,0,-.25+Math.sin(r*3)*.08),this.bracoD.rotation.set(.5,0,.25-Math.sin(r*3)*.08),this.antebracoE.rotation.x=this.antebracoD.rotation.x=-1.2,this.cabeca.rotation.y=Math.sin(r*.7)*.5;return}this.anca.position.y=.92+Math.abs(Math.sin(r))*.05*a-n*.06,this.pernaE.rotation.x=Math.sin(r)*.7*a-n*.15,this.pernaD.rotation.x=-Math.sin(r)*.7*a-n*.15,this.canelaE.rotation.x=Math.max(0,-Math.sin(r+1.2))*1.1*a+n*.25,this.canelaD.rotation.x=Math.max(0,Math.sin(r+1.2))*1.1*a+n*.25,this.peito.rotation.x=.08*a+n*.1+Math.sin(r*.5)*.015,this.cabeca.rotation.y=0;const o=-Math.sin(r)*.5*a,c=Math.sin(r)*.5*a;this.bracoE.rotation.set(Qt.lerp(o,-1.25,n),Qt.lerp(0,.5,n),-.1),this.antebracoE.rotation.x=Qt.lerp(-.3,-.4,n),this.bracoD.rotation.set(Qt.lerp(c-.3,-1.1,n),Qt.lerp(0,-.2,n),.1),this.antebracoD.rotation.x=Qt.lerp(-.5,-.9,n),this.arma.rotation.x=Qt.lerp(.9,0,n),this.arma.position.set(.12,Qt.lerp(.18,.36,n),Qt.lerp(-.1,-.28,n)),this.capa&&(this.capa.rotation.x=.12+a*.4+Math.sin(r*2)*.05*a)}morrer(t){this.queda>0||(this.queda=.001,this.quedaDir=t)}cair(t){this.queda=Math.min(1,this.queda+t*2.2);const e=this.queda,n=e<1?1-Math.pow(1-e,3):1;this.anca.position.y=Qt.lerp(.92,.12,n),this.corpo.rotation.x=-this.quedaDir*n*1.45,this.pernaE.rotation.x=-.6*n,this.canelaE.rotation.x=1.2*n,this.pernaD.rotation.x=.2*n,this.canelaD.rotation.x=.4*n,this.bracoE.rotation.set(-2.2*n,0,-.8*n),this.bracoD.rotation.set(-1.4*n,0,1*n),this.cabeca.rotation.x=-.5*n,this.arma.visible=e<.5}}const is=s=>s[Math.floor(Math.random()*s.length)];let Mv=1;class Sv{constructor(t,e,n=!1){this.telhado=n,this.corpo=new xc(t,1.75,.3),this.yaw=this.yawGuarda=e,this.boneco.raiz.position.copy(t);for(const i of this.boneco.alvos)i.userData.inimigo=this}id=Mv++;boneco=new fu("tinta");corpo;vida=100;estado="guarda";yaw;yawGuarda;tempo=Math.random()*10;reaccao=0;rajada=0;proximoTiro=0;pente=25;recarga=0;strafe=0;strafeAte=0;ultimaVista=new A;vistoHa=99;alvoMov=null;mira=0;morreuHa=0;falouViu=!1;patrulha=[];idxPatrulha=0;aDescansar=0;vel=0;get cabeca(){return this.corpo.pes.add(new A(0,1.6,0))}get vivo(){return this.estado!=="morto"}ouvir(t,e){!this.vivo||this.estado==="combate"||(this.ultimaVista.copy(t),this.estado==="guarda"&&(this.estado="alerta",this.reaccao=.4+Math.random()*.5,Math.random()<.5&&e.falar(is(["inimigo_alerta_1","inimigo_alerta_2","inimigo_alerta_3"]),{inimigo:this.id},this.cabeca)),this.alvoMov=t.clone())}ferir(t,e,n,i,r,a){if(!this.vivo)return!1;this.vida-=t;const o=a.clone().sub(n).normalize();if(r.sangue(a,o.clone().negate().add(o.clone().multiplyScalar(2)).normalize(),e==="cabeca"),i.acerto(a,e==="cabeca"),this.ultimaVista.copy(n),this.vistoHa=0,this.estado!=="combate"&&(this.estado="combate",this.reaccao=.35),this.vida<=0){this.estado="morto";const c=new A(-Math.sin(this.yaw),0,-Math.cos(this.yaw));return this.boneco.morrer(c.dot(o)<0?1:-1),i.queda(this.corpo.pes),!0}return Math.random()<.5&&i.falar(is(["inimigo_ferido_1","inimigo_ferido_2"]),{inimigo:this.id},this.cabeca),this.strafeAte=0,!1}vejo(t,e,n,i){const r=this.cabeca,o=t.olhos().clone().sub(r),c=o.length();if(c>n)return!1;if(i){const h=new A(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),f=new A(o.x,0,o.z).normalize();if(h.dot(f)<Math.cos(Qt.degToRad(62))&&c>4)return!1}const l=e.rayIntersect(new Ri(r,o.clone().normalize()));return!l||l.distance>c-.4}actualizar(t,e,n,i,r,a,o){if(this.tempo+=t,!this.vivo){this.morreuHa+=t,this.morreuHa>.45&&this.morreuHa-t<=.45&&a.poca(this.corpo.pes.add(new A(0,.03,0))),this.boneco.animar(t,0,0);return}const c=this.estado==="guarda"?45:75,l=n.vivo()&&this.vejo(n,e,c,this.estado==="guarda"||this.estado==="alerta"),h=i&&i.vivo()&&this.vejo(i,e,50,this.estado!=="combate"),f=l?h&&Math.random()<.004?i:n:h?i:null;f?(this.estado!=="combate"&&(this.estado="combate",this.reaccao=(this.telhado?1.1:.75)+Math.random()*.6,(!this.falouViu||Math.random()<.3)&&(r.falar(is(["inimigo_viu_1","inimigo_viu_2","inimigo_viu_3","inimigo_viu_4"]),{inimigo:this.id},this.cabeca),this.falouViu=!0)),this.ultimaVista.copy(f.pes()),this.vistoHa=0):this.vistoHa+=t;let u=null,d=null,m=!1;switch(this.estado){case"guarda":{if(this.patrulha.length){const T=this.patrulha[this.idxPatrulha];this.aDescansar>0?this.aDescansar-=t:T.distanceTo(this.corpo.pes)<.8?(this.idxPatrulha=(this.idxPatrulha+1)%this.patrulha.length,this.aDescansar=2+Math.random()*3):u=T}u||(this.yaw=this.yawGuarda+Math.sin(this.tempo*.35)*.7);break}case"alerta":{this.reaccao-=t,this.alvoMov&&this.reaccao<0&&(this.alvoMov.distanceTo(this.corpo.pes)>3&&!this.telhado?u=this.alvoMov:(this.estado="procura",this.vistoHa=0)),d=this.alvoMov??null;break}case"combate":{if(this.reaccao-=t,d=f?f.olhos():this.ultimaVista,this.vistoHa>2.5){this.estado="procura",this.alvoMov=this.ultimaVista.clone(),Math.random()<.6&&r.falar(is(["inimigo_perdeu_1","inimigo_perdeu_2","inimigo_alerta_3"]),{inimigo:this.id},this.cabeca);break}if(!this.telhado&&(this.tempo>this.strafeAte&&(this.strafe=Math.random()<.35?0:Math.random()<.5?-1:1,this.strafeAte=this.tempo+.8+Math.random()*1.6,Math.random()<.15&&r.falar(is(["inimigo_combate_1","inimigo_combate_2","inimigo_combate_3","inimigo_combate_4","inimigo_combate_5"]),{inimigo:this.id},this.cabeca)),this.strafe&&d)){const T=d.clone().sub(this.corpo.pes).setY(0).normalize(),M=new A(-T.z,0,T.x).multiplyScalar(this.strafe);d.distanceTo(this.corpo.pes)>30&&M.add(T.multiplyScalar(.8)),u=this.corpo.pes.add(M.multiplyScalar(3))}if(this.recarga>0)this.recarga-=t,this.recarga<=0&&(this.pente=25);else if(f&&this.reaccao<=0&&this.mira>.8&&(this.proximoTiro-=t,this.proximoTiro<=0)){this.rajada<=0&&(this.rajada=3+Math.floor(Math.random()*4)),this.rajada--,this.pente--,this.proximoTiro=this.rajada>0?.11+Math.random()*.04:.9+Math.random()*1.1;const T=f.olhos().distanceTo(this.cabeca);let M=.24*Math.exp(-T/40)+.04;M*=f.velocidade()>5?.5:f.velocidade()>1?.75:1,this.vistoHa<.1&&this.reaccao>-1&&(M*=.6),f===i&&(M*=.3);const y=Math.random()<M,E=this.boneco.arma.localToWorld(new A(0,.02,-.85));r.tiro(E,!0),a.clarao(E,.6);const C=f.olhos().add(new A((Math.random()-.5)*1.6,(Math.random()-.3)*1.2,(Math.random()-.5)*1.6));o(E,f,y,y?f.olhos().add(new A(0,-.3,0)):C),this.pente<=0&&(this.recarga=2.2,this.rajada=0,Math.random()<.6&&r.falar(is(["inimigo_recarregar_1","inimigo_recarregar_2"]),{inimigo:this.id},this.cabeca))}break}case"procura":{d=this.ultimaVista,!this.telhado&&this.ultimaVista.distanceTo(this.corpo.pes)>2.5?(u=this.ultimaVista,m=!0):this.yaw+=t*.8,this.vistoHa>16&&(this.estado="guarda",this.yawGuarda=this.yaw);break}}const v=this.corpo,g=new A;if(u){const T=u.clone().sub(v.pes).setY(0);T.length()>.4&&g.copy(T.normalize().multiplyScalar(this.estado==="combate"?2.2:m||this.estado==="alerta"?3.8:1.4)),d||(d=u)}v.vel.x+=(g.x-v.vel.x)*Math.min(1,10*t),v.vel.z+=(g.z-v.vel.z)*Math.min(1,10*t);const p=v.pes;for(let T=0;T<2;T++)v.passo(t/2,e);const b=v.pes;if(this.vel=Math.hypot(b.x-p.x,b.z-p.z)/Math.max(t,1e-4),this.estado==="combate"&&this.strafe&&this.vel<.3&&(this.strafeAte=0),d){const T=d.clone().sub(v.pes);let y=Math.atan2(-T.x,-T.z)-this.yaw;y=Math.atan2(Math.sin(y),Math.cos(y)),this.yaw+=y*Math.min(1,t*(this.estado==="combate"?7:3))}this.mira=Qt.damp(this.mira,this.estado==="combate"&&this.recarga<=0?1:0,6,t),this.boneco.raiz.position.copy(v.pes),this.boneco.raiz.rotation.y=this.yaw,this.boneco.animar(t,this.vel,this.mira),this.vel>1&&Math.floor(this.tempo*(this.vel>3?2.6:1.8))!==Math.floor((this.tempo-t)*(this.vel>3?2.6:1.8))&&r.passo(v.pes,this.vel>3?.8:.5)}}class yv{boneco=new fu("contorno",!1);corpo;estado="preso";vida=100;rasto=[];yaw=0;presoHa=0;ultimaPos=new A;vel=0;cadeira;constructor(t,e){this.corpo=new xc(t,1.75,.3),this.yaw=e,this.boneco.raiz.position.copy(t),this.boneco.raiz.rotation.y=e;const n=new Pi("banco",.3,.3);n.caixa(.5,.05,.45,0,.47,.05);for(const[i,r]of[[-.22,-.17],[.22,-.17],[-.22,.27],[.22,.27]])n.caixa(.04,.47,.04,i,.235,r);n.caixa(.5,.5,.04,0,.75,.27);for(let i=0;i<4;i++)n.linha([[-.26,.6+i*.06,.3],[.26,.62+i*.06,.3],[.2,.58+i*.06,-.05],[-.2,.6+i*.06,-.05]],"pormenor",!0);this.cadeira=n.acabar(),this.cadeira.position.copy(t),this.cadeira.rotation.y=e}olhos(){return this.corpo.pes.add(new A(0,this.estado==="preso"?1.1:1.55,0))}soltar(){this.estado="livre",this.cadeira.children.forEach(t=>{t.visible=!0}),this.corpo.colocar(this.corpo.pes.add(new A(0,.05,0)))}actualizar(t,e,n,i){if(this.estado==="morto"){this.boneco.animar(t,0,0);return}if(this.estado==="preso"){this.boneco.animar(t,0,0,!0);return}const r=this.rasto[this.rasto.length-1];(!r||r.distanceTo(n)>.8)&&this.rasto.push(n.clone()),this.rasto.length>400&&this.rasto.shift();const a=this.corpo,o=a.pes.distanceTo(n);for(;this.rasto.length>1&&this.rasto[0].distanceTo(a.pes)<.7;)this.rasto.shift();const c=this.rasto[0],l=new A;if(o>2.6&&c){const m=c.clone().sub(a.pes).setY(0);m.length()>.2&&l.copy(m.normalize().multiplyScalar(o>8||i?6.8:4.4))}a.vel.x+=(l.x-a.vel.x)*Math.min(1,10*t),a.vel.z+=(l.z-a.vel.z)*Math.min(1,10*t);for(let m=0;m<2;m++)a.passo(t/2,e);const h=a.pes;this.vel=Math.hypot(h.x-this.ultimaPos.x,h.z-this.ultimaPos.z)/Math.max(t,1e-4),this.ultimaPos.copy(h),l.lengthSq()>1&&this.vel<.4?(this.presoHa+=t,this.presoHa>.6&&a.noChao&&(a.vel.y=6),this.presoHa>2.5&&this.rasto.length>2&&(a.colocar(this.rasto[1].clone().add(new A(0,.2,0))),this.rasto.shift(),this.presoHa=0)):this.presoHa=0,o>25&&this.rasto.length>4&&(a.colocar(this.rasto[this.rasto.length-4].clone()),this.rasto=this.rasto.slice(-4));const f=l.lengthSq()>.5?l:n.clone().sub(a.pes);let d=Math.atan2(-f.x,-f.z)-this.yaw;d=Math.atan2(Math.sin(d),Math.cos(d)),this.yaw+=d*Math.min(1,t*8),this.boneco.raiz.position.copy(a.pes),this.boneco.raiz.rotation.y=this.yaw,this.boneco.animar(t,this.vel,0)}}const Ue=s=>document.querySelector(s);class bv{mira=Ue("#mira");acertoEl=Ue("#acerto");vidaEl=Ue("#vida-n");coracao=Ue("#coracao");penteEl=Ue("#pente");reservaEl=Ue("#reserva");objEl=Ue("#objectivo");marcador=Ue("#marcador");marcadorDist=Ue("#marcador-dist");legendas=Ue("#legendas");accao=Ue("#accao");accaoTexto=Ue("#accao-texto");barra=Ue("#accao-barra");dano=Ue("#dano");vinheta=Ue("#vinheta");fadistaEl=Ue("#fadista-vida");tempoAcerto=0;legendaAte=0;objectivo(t){const e=this.objEl.querySelector(".actual");e&&(e.classList.remove("actual"),e.classList.add("feito"),setTimeout(()=>e.remove(),2200));const n=document.createElement("div");n.className="actual novo",n.textContent=t,this.objEl.appendChild(n),setTimeout(()=>n.classList.remove("novo"),50)}legenda(t,e){this.legendas.innerHTML=`<b>${t}:</b> ${e}`,this.legendas.style.opacity="1",this.legendaAte=performance.now()+1200+e.length*65}acerto(t){this.acertoEl.classList.remove("mostra","morto"),this.acertoEl.offsetWidth,this.acertoEl.classList.add("mostra"),t&&this.acertoEl.classList.add("morto"),this.tempoAcerto=performance.now()}ferido(t){const e=document.createElement("div");e.className="seta-dano",e.style.transform=`translate(-50%, -50%) rotate(${t}rad)`,this.dano.appendChild(e),setTimeout(()=>e.remove(),900)}actualizar(t,e,n,i,r,a,o){this.vidaEl.textContent=String(Math.max(0,Math.ceil(t))),this.coracao.classList.toggle("fraco",t<35),this.penteEl.textContent=a?"··":String(e),this.penteEl.classList.toggle("pouco",e<=8),this.reservaEl.textContent=`${Math.ceil(n/30)} ×`;const c=6+i*900;this.mira.style.setProperty("--abre",`${Math.min(c,60)}px`),this.mira.style.opacity=r?"0":"1",this.vinheta.style.opacity=String(Math.max(0,(60-t)/60)),performance.now()>this.legendaAte&&(this.legendas.style.opacity="0"),o===null?this.fadistaEl.style.display="none":(this.fadistaEl.style.display="block",this.fadistaEl.querySelector("i").style.width=`${Math.max(0,o)}%`)}marcar(t,e,n){if(!t){this.marcador.style.display="none";return}const i=t.clone().add(new A(0,2.2,0)).project(e),r=i.z>1;let a=(i.x*.5+.5)*innerWidth,o=(-i.y*.5+.5)*innerHeight;r&&(a=innerWidth-a,o=innerHeight-130),a=Qt.clamp(a,60,innerWidth-60),o=Qt.clamp(o,70,innerHeight-130),this.marcador.style.display="block",this.marcador.style.transform=`translate(${a}px, ${o}px)`,this.marcadorDist.textContent=`${Math.round(t.distanceTo(n))} m`}accaoMostrar(t,e=0){this.accao.style.display=t?"flex":"none",t&&(this.accaoTexto.textContent=t),this.barra.style.width=`${e*100}%`}ecra(t,e){for(const n of["inicio","pausa","fim"])Ue("#"+n).style.display=n===t?"flex":"none";t==="fim"&&e&&(Ue("#fim .folha").innerHTML=e),document.body.classList.toggle("em-jogo",t===null)}}const Mn=new W_({antialias:!0});Mn.setPixelRatio(Math.min(devicePixelRatio,2));Mn.setSize(innerWidth,innerHeight);Mn.setClearColor(16777215);Mn.autoClear=!1;document.body.prepend(Mn.domElement);const di=new Rh,an=new rn(72,innerWidth/innerHeight,.05,420);uu(innerWidth,innerHeight);const Ne=new bv;Ne.ecra("inicio");const Mc=document.querySelector("#comecar"),Ev=document.querySelector("#carregar");Mc.disabled=!0;const du=await(await fetch("/tinta-na-alta/nivel.json")).json(),Jn=new uv(du);Jn.construir();di.add(Jn.cena);const hi=new vc;hi.fromGraphNode(Jn.colisao);const te=Jn.pontos,tn=new vv;di.add(tn.grupo);const Xt=new gv;Xt.legenda=(s,t)=>Ne.legenda(s,t);const Te=new mv(tn.claroes[0]);Te.redimensionar(innerWidth/innerHeight);const Et=new pv(an,te.inicio),pu=s=>{const t=s.clone().sub(Et.corpo.pes);Et.yaw=Math.atan2(-t.x,-t.z)};pu(te.olharInicio);const Tv=s=>[s.x,-s.z];function ie(s,t,e,n){const i=Jn.sDe(s),r=Jn.sDe(t);return Jn.noPercurso(i+(r-i)*e,n)}function no(s,t){const[e,n]=Tv(s),i=Jn.chao(e,n);let r=null;for(const a of du.edificios){if(t.has(a.osm)||a.passagem||a.furos.length)continue;const o=a.topo-i;if(o<4||o>13||a.cumeeira-a.topo>1.5)continue;const c=a.anel.map(p=>p[0]),l=a.anel.map(p=>p[1]),h=c.reduce((p,b)=>p+b)/c.length,f=l.reduce((p,b)=>p+b)/l.length;let u=a.anel[0],d=1/0;for(let p=0;p<a.anel.length;p++){const b=a.anel[p],T=a.anel[(p+1)%a.anel.length],M=T[0]-b[0],y=T[1]-b[1],E=M*M+y*y,C=E?Math.max(0,Math.min(1,((e-b[0])*M+(n-b[1])*y)/E)):0,x=b[0]+M*C,w=b[1]+y*C,D=Math.hypot(e-x,n-w);D<d&&(d=D,u=[x,w])}if(d>16||d<3)continue;const m=Math.hypot(h-u[0],f-u[1]);if(m<3)continue;const v=u[0]+(h-u[0])/m*1.4,g=u[1]+(f-u[1])/m*1.4;(!r||d<r.d)&&(r={pos:new A(v,a.topo+.05,-g),d,osm:a.osm})}return r&&t.add(r.osm),r?.pos??null}const ui=[];function Ee(s,t,e={}){const n=t.clone().sub(s),i=new Sv(s.clone().add(new A(0,.1,0)),Math.atan2(-n.x,-n.z),!!e.telhado);return e.patrulha&&(i.patrulha=e.patrulha),di.add(i.boneco.raiz),ui.push(i),e.alerta&&i.ouvir(e.alerta,Xt),i}const mu=[te.inicio,te.olharInicio,te.arco,te.largoArco,te.escadasBase,te.escadasMeio,te.escadasTopo,te.largo,te.portaClaustro,te.dentroClaustro,te.patio];function wv(){const s=new Set,[,t,e,n,i,r,a,o,c,l,h]=mu;Ee(ie(e,n,.9,2.5),e),Ee(ie(n,i,.35,-2),e,{patrulha:[ie(n,i,.2,0),ie(n,i,.8,0)]}),Ee(ie(n,i,.95,1.2),n),Ee(ie(i,r,.55,.8),i),Ee(ie(i,r,.85,-.8),i,{patrulha:[ie(i,r,.7,0),ie(r,a,.2,0)]});const f=no(ie(i,r,.5,0),s);f&&Ee(f,i,{telhado:!0}),Ee(ie(r,a,.6,1),r);const u=no(ie(r,a,.7,0),s);u&&Ee(u,r,{telhado:!0}),Ee(ie(a,o,.3,-2),a),Ee(ie(a,o,.9,3),a,{patrulha:[ie(a,o,.9,3),ie(o,c,.4,0)]}),Ee(ie(o,c,.6,-3),o);const d=no(o,s);d&&Ee(d,a,{telhado:!0}),Ee(ie(o,c,.95,2),o),Ee(ie(c,l,1,0).add(new A(0,0,0)),c),Ee(ie(l,h,.35,5),l),Ee(ie(l,h,.35,-5),l),Ee(ie(l,h,.75,4),l),Ee(ie(l,h,1.05,-3),l,{patrulha:[ie(l,h,1.05,-3),ie(l,h,1.05,4)]})}function Av(){const s=Et.corpo.pes,[,,t,e,n,i,r,a,o]=mu;Ee(ie(a,o,.2,4),o,{alerta:s}),Ee(ie(r,a,.6,-2),o,{alerta:s}),Ee(ie(i,r,.3,.8),r,{alerta:s}),Ee(ie(n,i,.2,1),i,{alerta:s}),Ee(ie(n,i,.3,-1),i,{alerta:s}),Ee(ie(e,n,.6,1.5),n),Ee(ie(t,e,.4,-1.5),n)}const Rv=(()=>{const s=te.dentroClaustro.clone().sub(te.patio);return Math.atan2(-s.x,-s.z)})(),ae=new yv(te.patio.clone(),Rv);di.add(ae.boneco.raiz,ae.cadeira);const gu={olhos:()=>Et.olhos.clone(),pes:()=>Et.corpo.pes,velocidade:()=>Math.hypot(Et.corpo.vel.x,Et.corpo.vel.z),ferir:()=>{},vivo:()=>!Et.morto},Cv={olhos:()=>ae.olhos(),pes:()=>ae.corpo.pes,velocidade:()=>ae.vel,ferir:()=>{},vivo:()=>ae.estado==="livre"},Os=[];function Pv(s){const t=new Pi("pente",.3,.2);t.caixa(.08,.04,.22,0,.02,0),t.caixa(.05,.03,.2,.09,.015,.03,.4);const e=t.acabar();e.position.copy(s).add(new A(.5,.02,.2)),di.add(e),Os.push({obj:e,pos:e.position.clone()})}let We="arco",Kn=!1,gs=!1,bi=0,_u=0,ec=0,vu=0,ci=0,xu=-99,th=!1,eh=0;const nc={arco:"Passa o Arco de Almedina",largo:"Sobe o Quebra-Costas até ao Largo da Sé Velha",claustro:"Entra no claustro da Sé Velha",soltar:"Solta o fadista no pátio do claustro",fuga:"Leva o fadista até ao Arco de Almedina",fim:""},Lv=()=>We==="arco"?te.arco:We==="largo"?te.largo:We==="claustro"?te.dentroClaustro:We==="soltar"?te.patio:We==="fuga"?te.olharInicio:null;function as(s,t){We=s,nc[s]&&Ne.objectivo(nc[s]),t&&setTimeout(()=>Xt.falar(t,"radio"),400)}const nh=[[0,57,1.2],[.05,64,.4],[.3,69,.4],[.6,72,.4],[.9,71,.3],[1.2,69,.7],[1.2,53,1.2],[1.8,67,.3],[2.1,65,.3],[2.4,64,1.2],[2.4,52,1.2],[3.2,68,.3],[3.5,71,.3],[3.8,69,1.4],[3.8,57,1.4]];function la(s,t){if(gs)return;gs=!0,We="fim";const e=ec?Math.round(vu/ec*100):0,n=Math.floor(bi/60),i=Math.floor(bi%60);setTimeout(()=>{document.exitPointerLock(),Ne.ecra("fim",`
      <p class="carimbo">${s?"cumprida":"falhada"}</p>
      <h2>${s?"A Serenata está salva":"Missão falhada"}</h2>
      <p>${t}</p>
      <table>
        <tr><td>tempo</td><td>${n}:${String(i).padStart(2,"0")}</td></tr>
        <tr><td>Borrões abatidos</td><td>${_u}</td></tr>
        <tr><td>pontaria</td><td>${e}%</td></tr>
      </table>
      <button onclick="location.reload()">Outra vez</button>`)},s?6500:3500)}let _s=!1,ha=!1;document.addEventListener("mousedown",s=>{!Kn||document.pointerLockElement!==document.body||(s.button===0&&(_s=!0),s.button===2&&(ha=!0))});document.addEventListener("mouseup",s=>{s.button===0&&(_s=!1),s.button===2&&(ha=!1)});document.addEventListener("contextmenu",s=>s.preventDefault());document.addEventListener("keydown",s=>{!Kn||Et.morto||s.code==="KeyR"&&Te.recarregar()&&Xt.recarregar()});Mc.addEventListener("click",()=>{document.body.requestPointerLock(),Xt.iniciar(),Kn||(Kn=!0,Ne.ecra(null),as("arco","radio_inicio"),setTimeout(()=>Xt.sino(te.largo.clone().add(new A(40,30,0)),3),9e3))});document.addEventListener("pointerlockchange",()=>{if(!Kn||gs)return;const s=document.pointerLockElement===document.body;Ne.ecra(s?null:"pausa"),s||(_s=!1,ha=!1,Et.teclas.clear()),Xt.pronto&&(s?Xt.ctx.resume():Xt.ctx.suspend())});document.querySelector("#pausa").addEventListener("click",()=>document.body.requestPointerLock());addEventListener("resize",()=>{Mn.setSize(innerWidth,innerHeight),an.aspect=innerWidth/innerHeight,an.updateProjectionMatrix(),Te.redimensionar(an.aspect),uu(innerWidth,innerHeight)});Et.onPasso=s=>Xt.passo(null,s);Et.onAterrar=s=>{Xt.aterrar(s),s>13&&Sc((s-13)*8,Et.corpo.pes.clone().add(new A(0,-1,0)))};const io=new Wd,Dv={cabeca:100,tronco:38,membro:24};function Mu(){Te.disparar(),ec++,Xt.tiro(null);const s=Te.dispersao(Math.hypot(Et.corpo.vel.x,Et.corpo.vel.z)/4,Et.corpo.noChao),t=new A(0,0,-1).applyEuler(new fi((Math.random()-.5)*s*2,(Math.random()-.5)*s*2,0)).applyQuaternion(an.quaternion),e=an.position.clone();Et.pitch=Math.min(1.5,Et.pitch+.009+Math.random()*.006*(1-Te.mira*.5)),Et.yaw+=(Math.random()-.5)*.006,io.set(e,t),io.far=250;const n=ui.filter(o=>o.vivo&&o.corpo.pes.distanceTo(e)<250).flatMap(o=>o.boneco.alvos),i=io.intersectObjects(n,!1)[0],r=hi.rayIntersect(new Ri(e,t)),a=new A(.12,-.08,-.9).applyQuaternion(an.quaternion).add(e);if(i&&(!r||i.distance<r.distance)){const o=i.object.userData.inimigo,c=i.object.userData.parte;vu++;const l=o.ferir(Dv[c]*(.9+Math.random()*.2),c,e,Xt,tn,i.point);Ne.acerto(l),tn.rasto(a,i.point);const h=hi.rayIntersect(new Ri(i.point,t));if(h&&h.distance<2.5&&tn.manchaParede(h.position,h.triangle.getNormal(new A)),l){_u++,Pv(o.corpo.pes);const f=ui.find(u=>u.vivo&&u!==o&&u.corpo.pes.distanceTo(o.corpo.pes)<25);f&&setTimeout(()=>Xt.falar(Math.random()<.5?"inimigo_baixa_1":"inimigo_baixa_2",{inimigo:f.id},f.cabeca),700);for(const u of ui)u.vivo&&u.corpo.pes.distanceTo(o.corpo.pes)<22&&u.ouvir(Et.corpo.pes,Xt)}}else if(r){const o=r.triangle.getNormal(new A);o.dot(t)>0&&o.negate(),tn.impactoParede(r.position,o),tn.rasto(a,r.position),Xt.impacto(r.position,Math.random()<.25)}else tn.rasto(a,e.clone().addScaledVector(t,120));for(const o of ui)o.vivo&&o.corpo.pes.distanceTo(e)<65&&o.ouvir(Et.corpo.pes,Xt)}function Sc(s,t){if(Et.morto||gs)return;Et.vida-=s,xu=bi,Xt.dor();const e=t.clone().sub(Et.corpo.pes),n=Math.atan2(e.x,-e.z)+Et.yaw;Ne.ferido(-n),Et.pitch+=.02,Et.vida<35&&!th&&(th=!0,Xt.falar("radio_ferido","radio")),Et.vida<=0&&(Et.morto=!0,_s=!1,Xt.falar("radio_morreste","radio"),la(!1,"Caíste nas ruelas da Alta. Os Borrões ficaram com o fadista."))}function Iv(s,t,e,n){const i=n.clone().sub(s).normalize(),r=hi.rayIntersect(new Ri(s,i)),a=n.distanceTo(s),o=r&&r.distance<a-.3;if(e&&!o){tn.rasto(s,n,!0),t===gu?Sc(7+Math.random()*4,s):ae.estado==="livre"&&(ae.vida-=6,tn.sangue(n,i,!1),Math.random()<.5&&Xt.falar(Math.random()<.5?"fadista_medo_1":"fadista_medo_2","fadista",ae.olhos()),ae.vida<=0&&(ae.estado="morto",ae.boneco.morrer(1),Xt.queda(ae.corpo.pes),Xt.falar("radio_fadista_caiu","radio"),la(!1,"O fadista não chegou à Serenata.")));return}const c=o||r&&r.distance<200?r.position:s.clone().addScaledVector(i,150);if(tn.rasto(s,c,!0),r&&r.distance<200){const u=r.triangle.getNormal(new A);u.dot(i)>0&&u.negate(),tn.impactoParede(r.position,u),r.position.distanceTo(Et.olhos)<12&&Xt.impacto(r.position,Math.random()<.35)}const l=Et.olhos,h=Qt.clamp(l.clone().sub(s).dot(i),0,s.distanceTo(c)),f=s.clone().addScaledVector(i,h);if(f.distanceTo(l)<2.2){const u=f.clone().sub(l).dot(new A(Math.cos(Et.yaw),0,-Math.sin(Et.yaw)));Xt.zumbido(Qt.clamp(u,-1,1))}}wv();Ev.textContent="";Mc.disabled=!1;const Bs=new URLSearchParams(location.search);Bs.get("em")&&te[Bs.get("em")]&&(Et.corpo.colocar(te[Bs.get("em")]),pu(te[Bs.get("olhar")??"largo"]??te.largo));window.dbg={mundo:Jn,jog:Et,camera:an,inimigos:ui,fadista:ae,P:te,arma:Te,som:Xt,hud:Ne,cena:di,comecar:()=>{Kn=!0,Ne.ecra(null),as("arco")},disparar:()=>Mu(),ferir:s=>Sc(s,Et.corpo.pes),soltar:()=>{ci=1},fase:()=>We,vencer:()=>la(!0,"Teste.")};const ih=new Hd;let sh=Et.yaw,rh=Et.pitch;Mn.setAnimationLoop(()=>{ih.update();const s=Math.min(ih.getDelta(),.05);if(Kn&&(document.pointerLockElement===document.body||Bs.has("auto"))){bi+=s,Et.actualizar(s,hi,Te.mira>.5);const e=Et.corpo.pes;_s&&!Et.morto&&!Et.aCorrer&&(Te.podeDisparar()?Mu():Te.pente===0&&Te.aRecarregar<=0&&(Te.reserva>0?Te.recarregar()&&Xt.recarregar():(Xt.vazio(),_s=!1))),Te.actualizar(s,Et.yaw-sh,Et.pitch-rh,Et.andar,Et.balanco,Et.aCorrer,ha),sh=Et.yaw,rh=Et.pitch,an.fov=Qt.lerp(72,56,Te.mira),an.updateProjectionMatrix(),!Et.morto&&bi-xu>6&&(Et.vida=Math.min(100,Et.vida+s*5)),Et.vida<35&&!Et.morto&&bi>eh&&(Xt.coracao(1-Et.vida/35),eh=bi+.9);for(let i=Os.length-1;i>=0;i--)Os[i].pos.distanceTo(e)<1.6&&Te.reserva<240&&(Te.reserva+=30,Xt.recarregar(),di.remove(Os[i].obj),Os.splice(i,1),Ne.legenda("","+1 carregador"));const n=ae.estado==="livre"?Cv:null;for(const i of ui)!i.vivo&&i.corpo.pes.distanceTo(e)>200||i.actualizar(s,hi,gu,n,Xt,tn,Iv);if(ae.actualizar(s,hi,e,Et.aCorrer),!gs){if(We==="arco"&&e.distanceTo(te.arco)<7?as("largo","radio_arco"):We==="largo"&&e.distanceTo(te.largo)<14?as("claustro","radio_largo"):We==="claustro"&&e.distanceTo(te.dentroClaustro)<6&&as("soltar","radio_claustro"),We==="soltar"||We!=="fuga"&&ae.estado==="preso"&&e.distanceTo(te.patio)<2.4)if(e.distanceTo(te.patio)<2.4){const r=Et.teclas.has("KeyF");if(ci=r?ci+s/1.4:Math.max(0,ci-s),r&&Math.floor(ci*5)!==Math.floor((ci-s/1.4)*5)&&Xt.corda(),Ne.accaoMostrar("Desatar o fadista (manter)",ci),ci>=1){Ne.accaoMostrar(null),ae.soltar(),We!=="soltar"&&Ne.objectivo(nc.soltar);const a=Xt.falar("fadista_solto","fadista",ae.olhos());Xt.guitarra(ae.olhos(),nh.slice(0,10)),setTimeout(()=>{as("fuga","radio_fuga"),Av()},(a+.6)*1e3),We="fuga",Ne.objectivo("…")}}else Ne.accaoMostrar(null);if(We==="fuga"&&ae.estado==="livre")if(e.distanceTo(te.olharInicio)<9&&ae.corpo.pes.distanceTo(e)<14){ae.estado="salvo";const i=Xt.falar("fadista_fim","fadista",ae.olhos());Xt.guitarra(ae.olhos(),nh),setTimeout(()=>Xt.falar("radio_fim","radio"),(i+.5)*1e3),Xt.sino(te.largo.clone().add(new A(40,30,0)),4),la(!0,"O fadista desceu o Quebra-Costas contigo. À meia-noite, nas escadas da Sé Velha, canta para ti.")}else ae.corpo.pes.distanceTo(e)>18&&Math.random()<s*.15?Xt.falar("fadista_segue_2","fadista",ae.olhos()):Math.random()<s*.02&&Xt.falar("fadista_segue_1","fadista",ae.olhos())}tn.actualizar(s),Xt.ouvinte.copy(an.position),Xt.frenteOuvinte.copy(Et.frente())}else if(!Kn){Et.yaw+=Math.sin(performance.now()/3e3)*4e-4,Et.actualizar(s,hi,!1);for(const e of ui)e.boneco.animar(s,0,0);ae.boneco.animar(s,0,0,!0)}Ne.actualizar(Et.vida,Te.pente,Te.reserva,Te.dispersao(Math.hypot(Et.corpo.vel.x,Et.corpo.vel.z)/4,Et.corpo.noChao),Te.mira>.7,Te.aRecarregar>0,ae.estado==="livre"?ae.vida:null),Ne.marcar(Kn&&!gs?Lv():null,an,Et.corpo.pes),Mn.clear(),Mn.render(di,an),Et.morto||(Mn.clearDepth(),Mn.render(Te.cena,Te.camera))});
