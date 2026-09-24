(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rc="186",Iu=0,Oc=1,Uu=2,Vr=1,Nu=2,Fs=3,Li=0,Ye=1,un=2,ti=0,Vs=1,Bc=2,zc=3,Gc=4,Fu=5,os=100,Ou=101,Bu=102,zu=103,Gu=104,Vu=200,Hu=201,ku=202,Wu=203,dh=204,ph=205,Xu=206,qu=207,Yu=208,Zu=209,$u=210,Ju=211,Ku=212,Qu=213,ju=214,oo=0,co=1,lo=2,qs=3,ho=4,uo=5,fo=6,po=7,mh=0,tf=1,ef=2,On=0,gh=1,_h=2,vh=3,xh=4,Mh=5,Sh=6,yh=7,bh=300,Di=301,ds=302,ma=303,ga=304,ra=306,mo=1e3,Kn=1001,go=1002,Ge=1003,nf=1004,nr=1005,qe=1006,_a=1007,Ai=1008,fn=1009,Eh=1010,Th=1011,Ys=1012,ac=1013,zn=1014,In=1015,Gn=1016,oc=1017,cc=1018,Zs=1020,wh=35902,Ah=35899,Rh=1021,Ch=1022,bn=1023,ii=1026,Ri=1027,Ph=1028,lc=1029,Ii=1030,hc=1031,uc=1033,Hr=33776,kr=33777,Wr=33778,Xr=33779,_o=35840,vo=35841,xo=35842,Mo=35843,So=36196,yo=37492,bo=37496,Eo=37488,To=37489,Zr=37490,wo=37491,Ao=37808,Ro=37809,Co=37810,Po=37811,Lo=37812,Do=37813,Io=37814,Uo=37815,No=37816,Fo=37817,Oo=37818,Bo=37819,zo=37820,Go=37821,Vo=36492,Ho=36494,ko=36495,Wo=36283,Xo=36284,$r=36285,qo=36286,sf=3200,Vc=0,rf=1,mi="",Qe="srgb",Jr="srgb-linear",Kr="linear",pe="srgb",va=7680,af=519,of=512,cf=513,lf=514,fc=515,hf=516,uf=517,dc=518,ff=519,Lh=35044,Hc="300 es",Un=2e3,Qr=2001;function df(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function jr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function pf(){const s=jr("canvas");return s.style.display="block",s}const kc={};function ta(...s){const t="THREE."+s.shift();console.log(t,...s)}function Dh(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ot(...s){s=Dh(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function te(...s){s=Dh(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function hs(...s){const t=s.join(" ");t in kc||(kc[t]=!0,Ot(...s))}function mf(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const gf={[oo]:co,[lo]:fo,[ho]:po,[qs]:uo,[co]:oo,[fo]:lo,[po]:ho,[uo]:qs};class Ni{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wc=1234567;const us=Math.PI/180,$s=180/Math.PI;function Bn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[s&255]+ke[s>>8&255]+ke[s>>16&255]+ke[s>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function qt(s,t,e){return Math.max(t,Math.min(e,s))}function pc(s,t){return(s%t+t)%t}function _f(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function vf(s,t,e){return s!==t?(e-s)/(t-s):0}function Hs(s,t,e){return(1-e)*s+e*t}function xf(s,t,e,n){return Hs(s,t,1-Math.exp(-e*n))}function Mf(s,t=1){return t-Math.abs(pc(s,t*2)-t)}function Sf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function yf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function bf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Ef(s,t){return s+Math.random()*(t-s)}function Tf(s){return s*(.5-Math.random())}function wf(s){s!==void 0&&(Wc=s);let t=Wc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Af(s){return s*us}function Rf(s){return s*$s}function Cf(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Pf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Lf(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Df(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),f=r((t-n)/2),u=a((t-n)/2),d=r((n-t)/2),p=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*f,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*f,o*c);break;case"ZXZ":s.set(l*f,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*d,o*c);break;case"YXY":s.set(l*d,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*d,o*h,o*c);break;default:Ot("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Sn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function me(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const jt={DEG2RAD:us,RAD2DEG:$s,generateUUID:Bn,clamp:qt,euclideanModulo:pc,mapLinear:_f,inverseLerp:vf,lerp:Hs,damp:xf,pingpong:Mf,smoothstep:Sf,smootherstep:yf,randInt:bf,randFloat:Ef,randFloatSpread:Tf,seededRandom:wf,degToRad:Af,radToDeg:Rf,isPowerOfTwo:Cf,ceilPowerOfTwo:Pf,floorPowerOfTwo:Lf,setQuaternionFromProperEuler:Df,normalize:me,denormalize:Sn};class ct{static{ct.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fi{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3],u=r[a+0],d=r[a+1],p=r[a+2],_=r[a+3];if(f!==_||l!==u||c!==d||h!==p){let g=l*u+c*d+h*p+f*_;g<0&&(u=-u,d=-d,p=-p,_=-_,g=-g);let m=1-o;if(g<.9995){const y=Math.acos(g),E=Math.sin(y);m=Math.sin(m*y)/E,o=Math.sin(o*y)/E,l=l*m+u*o,c=c*m+d*o,h=h*m+p*o,f=f*m+_*o}else{l=l*m+u*o,c=c*m+d*o,h=h*m+p*o,f=f*m+_*o;const y=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=y,c*=y,h*=y,f*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+h*f+l*d-c*u,t[e+1]=l*p+h*u+c*f-o*d,t[e+2]=c*p+h*d+o*u-l*f,t[e+3]=h*p-o*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(r/2),u=l(n/2),d=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"YZX":this._x=u*h*f+c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f-u*d*p;break;case"XZY":this._x=u*h*f-c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f+u*d*p;break;default:Ot("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{static{R.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=i+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xa.copy(this).projectOnVector(t),this.sub(xa)}reflect(t){return this.sub(xa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xa=new R,Xc=new Fi;class Xt{static{Xt.prototype.isMatrix3=!0}constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],_=i[0],g=i[3],m=i[6],y=i[1],E=i[4],x=i[7],S=i[2],b=i[5],A=i[8];return r[0]=a*_+o*y+l*S,r[3]=a*g+o*E+l*b,r[6]=a*m+o*x+l*A,r[1]=c*_+h*y+f*S,r[4]=c*g+h*E+f*b,r[7]=c*m+h*x+f*A,r[2]=u*_+d*y+p*S,r[5]=u*g+d*E+p*b,r[8]=u*m+d*x+p*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,p=e*f+n*u+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return t[0]=f*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return hs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ma.makeScale(t,e)),this}rotate(t){return hs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ma.makeRotation(-t)),this}translate(t,e){return hs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ma.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ma=new Xt,qc=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yc=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function If(){const s={enabled:!0,workingColorSpace:Jr,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pe&&(i.r=ei(i.r),i.g=ei(i.g),i.b=ei(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pe&&(i.r=fs(i.r),i.g=fs(i.g),i.b=fs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===mi?Kr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return hs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return hs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Jr]:{primaries:t,whitePoint:n,transfer:Kr,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:t,whitePoint:n,transfer:pe,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),s}const ee=If();function ei(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function fs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Gi;class Uf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Gi===void 0&&(Gi=jr("canvas")),Gi.width=t.width,Gi.height=t.height;const i=Gi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Gi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=jr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=ei(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ei(e[n]/255)*255):e[n]=ei(e[n]);return{data:e,width:t.width,height:t.height}}else return Ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nf=0;class mc{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Bn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Sa(i[a].image)):r.push(Sa(i[a]))}else r=Sa(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Sa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Uf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ot("Texture: Unable to serialize Texture."),{})}let Ff=0;const ya=new R;class Ze extends Ni{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,n=Kn,i=Kn,r=qe,a=Ai,o=bn,l=fn,c=Ze.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Bn(),this.name="",this.source=new mc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ya).x}get height(){return this.source.getSize(ya).y}get depth(){return this.source.getSize(ya).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ot(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ot(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case mo:t.x=t.x-Math.floor(t.x);break;case Kn:t.x=t.x<0?0:1;break;case go:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case mo:t.y=t.y-Math.floor(t.y);break;case Kn:t.y=t.y<0?0:1;break;case go:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=bh;Ze.DEFAULT_ANISOTROPY=1;class xe{static{xe.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,x=(d+1)/2,S=(m+1)/2,b=(h+u)/4,A=(f+_)/4,v=(p+g)/4;return E>x&&E>S?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=b/n,r=A/n):x>S?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=b/i,r=v/i):S<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(S),n=A/r,i=v/r),this.set(n,i,r,e),this}let y=Math.sqrt((g-p)*(g-p)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(f-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Of extends Ni{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e),this.textures=[];const i={width:t,height:e,depth:n.depth},r=new Ze(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new mc(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends Of{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ih extends Ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bf extends Ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Ee{static{Ee.prototype.isMatrix4=!0}constructor(t,e,n,i,r,a,o,l,c,h,f,u,d,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,f,u,d,p,_,g)}set(t,e,n,i,r,a,o,l,c,h,f,u,d,p,_,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ee().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,i=1/Vi.setFromMatrixColumn(t,0).length(),r=1/Vi.setFromMatrixColumn(t,1).length(),a=1/Vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=a*h,d=a*f,p=o*h,_=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+p*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,d=l*f,p=c*h,_=c*f;e[0]=u+_*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-p,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,d=l*f,p=c*h,_=c*f;e[0]=u-_*o,e[4]=-a*f,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,d=a*f,p=o*h,_=o*f;e[0]=l*h,e[4]=p*c-d,e[8]=u*c+_,e[1]=l*f,e[5]=_*c+u,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,d=a*c,p=o*l,_=o*c;e[0]=l*h,e[4]=_-u*f,e[8]=p*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*f+p,e[10]=u-_*f}else if(t.order==="XZY"){const u=a*l,d=a*c,p=o*l,_=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+_,e[5]=a*h,e[9]=d*f-p,e[2]=p*f-d,e[6]=o*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zf,t,Gf)}lookAt(t,e,n){const i=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),oi.crossVectors(n,rn),oi.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),oi.crossVectors(n,rn)),oi.normalize(),ir.crossVectors(rn,oi),i[0]=oi.x,i[4]=ir.x,i[8]=rn.x,i[1]=oi.y,i[5]=ir.y,i[9]=rn.y,i[2]=oi.z,i[6]=ir.z,i[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],_=n[6],g=n[10],m=n[14],y=n[3],E=n[7],x=n[11],S=n[15],b=i[0],A=i[4],v=i[8],w=i[12],I=i[1],P=i[5],D=i[9],U=i[13],L=i[2],O=i[6],V=i[10],z=i[14],Y=i[3],W=i[7],K=i[11],j=i[15];return r[0]=a*b+o*I+l*L+c*Y,r[4]=a*A+o*P+l*O+c*W,r[8]=a*v+o*D+l*V+c*K,r[12]=a*w+o*U+l*z+c*j,r[1]=h*b+f*I+u*L+d*Y,r[5]=h*A+f*P+u*O+d*W,r[9]=h*v+f*D+u*V+d*K,r[13]=h*w+f*U+u*z+d*j,r[2]=p*b+_*I+g*L+m*Y,r[6]=p*A+_*P+g*O+m*W,r[10]=p*v+_*D+g*V+m*K,r[14]=p*w+_*U+g*z+m*j,r[3]=y*b+E*I+x*L+S*Y,r[7]=y*A+E*P+x*O+S*W,r[11]=y*v+E*D+x*V+S*K,r[15]=y*w+E*U+x*z+S*j,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],p=t[3],_=t[7],g=t[11],m=t[15],y=l*d-c*u,E=o*d-c*f,x=o*u-l*f,S=a*d-c*h,b=a*u-l*h,A=a*f-o*h;return e*(_*y-g*E+m*x)-n*(p*y-g*S+m*b)+i*(p*E-_*S+m*A)-r*(p*x-_*b+g*A)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],p=t[12],_=t[13],g=t[14],m=t[15],y=e*o-n*a,E=e*l-i*a,x=e*c-r*a,S=n*l-i*o,b=n*c-r*o,A=i*c-r*l,v=h*_-f*p,w=h*g-u*p,I=h*m-d*p,P=f*g-u*_,D=f*m-d*_,U=u*m-d*g,L=y*U-E*D+x*P+S*I-b*w+A*v;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/L;return t[0]=(o*U-l*D+c*P)*O,t[1]=(i*D-n*U-r*P)*O,t[2]=(_*A-g*b+m*S)*O,t[3]=(u*b-f*A-d*S)*O,t[4]=(l*I-a*U-c*w)*O,t[5]=(e*U-i*I+r*w)*O,t[6]=(g*x-p*A-m*E)*O,t[7]=(h*A-u*x+d*E)*O,t[8]=(a*D-o*I+c*v)*O,t[9]=(n*I-e*D-r*v)*O,t[10]=(p*b-_*x+m*y)*O,t[11]=(f*x-h*b-d*y)*O,t[12]=(o*w-a*P-l*v)*O,t[13]=(e*P-n*w+i*v)*O,t[14]=(_*E-p*S-g*y)*O,t[15]=(h*S-f*E+u*y)*O,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,p=r*f,_=a*h,g=a*f,m=o*f,y=l*c,E=l*h,x=l*f,S=n.x,b=n.y,A=n.z;return i[0]=(1-(_+m))*S,i[1]=(d+x)*S,i[2]=(p-E)*S,i[3]=0,i[4]=(d-x)*b,i[5]=(1-(u+m))*b,i[6]=(g+y)*b,i[7]=0,i[8]=(p+E)*A,i[9]=(g-y)*A,i[10]=(1-(u+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Vi.set(i[0],i[1],i[2]).length();const o=Vi.set(i[4],i[5],i[6]).length(),l=Vi.set(i[8],i[9],i[10]).length();r<0&&(a=-a),_n.copy(this);const c=1/a,h=1/o,f=1/l;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=f,_n.elements[9]*=f,_n.elements[10]*=f,e.setFromRotationMatrix(_n),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Un,l=!1){const c=this.elements,h=2*r/(e-t),f=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let p,_;if(l)p=r/(a-r),_=a*r/(a-r);else if(o===Un)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Qr)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Un,l=!1){const c=this.elements,h=2/(e-t),f=2/(n-i),u=-(e+t)/(e-t),d=-(n+i)/(n-i);let p,_;if(l)p=1/(a-r),_=a/(a-r);else if(o===Un)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===Qr)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Vi=new R,_n=new Ee,zf=new R(0,0,0),Gf=new R(1,1,1),oi=new R,ir=new R,rn=new R,Zc=new Ee,$c=new Fi;class gi{constructor(t=0,e=0,n=0,i=gi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Zc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $c.setFromEuler(this),this.setFromQuaternion($c,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gi.DEFAULT_ORDER="XYZ";class aa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Vf=0;const Jc=new R,Hi=new Fi,kn=new Ee,sr=new R,bs=new R,Hf=new R,kf=new Fi,Kc=new R(1,0,0),Qc=new R(0,1,0),jc=new R(0,0,1),tl={type:"added"},Wf={type:"removed"},ki={type:"childadded",child:null},ba={type:"childremoved",child:null};class je extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=je.DEFAULT_UP.clone();const t=new R,e=new gi,n=new Fi,i=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ee},normalMatrix:{value:new Xt}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=je.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(Kc,t)}rotateY(t){return this.rotateOnAxis(Qc,t)}rotateZ(t){return this.rotateOnAxis(jc,t)}translateOnAxis(t,e){return Jc.copy(t).applyQuaternion(this.quaternion),this.position.add(Jc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kc,t)}translateY(t){return this.translateOnAxis(Qc,t)}translateZ(t){return this.translateOnAxis(jc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?sr.copy(t):sr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(bs,sr,this.up):kn.lookAt(sr,bs,this.up),this.quaternion.setFromRotationMatrix(kn),i&&(kn.extractRotation(i.matrixWorld),Hi.setFromRotationMatrix(kn),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(te("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tl),ki.child=t,this.dispatchEvent(ki),ki.child=null):te("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wf),ba.child=t,this.dispatchEvent(ba),ba.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tl),ki.child=t,this.dispatchEvent(ki),ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,t,Hf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,kf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}je.DEFAULT_UP=new R(0,1,0);je.DEFAULT_MATRIX_AUTO_UPDATE=!0;je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ye extends je{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xf={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&u>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xf)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ye;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},rr={h:0,s:0,l:0};function Ta(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class re{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ee.workingColorSpace){if(t=pc(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ta(a,r,t+1/3),this.g=Ta(a,r,t),this.b=Ta(a,r,t-1/3)}return ee.colorSpaceToWorking(this,i),this}setStyle(t,e=Qe){function n(r){r!==void 0&&parseFloat(r)<1&&Ot("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ot("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ot("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const n=Uh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ot("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ei(t.r),this.g=ei(t.g),this.b=ei(t.b),this}copyLinearToSRGB(t){return this.r=fs(t.r),this.g=fs(t.g),this.b=fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return ee.workingToColorSpace(We.copy(this),t),Math.round(qt(We.r*255,0,255))*65536+Math.round(qt(We.g*255,0,255))*256+Math.round(qt(We.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(We.copy(this),e);const n=We.r,i=We.g,r=We.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(We.copy(this),e),t.r=We.r,t.g=We.g,t.b=We.b,t}getStyle(t=Qe){ee.workingToColorSpace(We.copy(this),t);const e=We.r,n=We.g,i=We.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ci),this.setHSL(ci.h+t,ci.s+e,ci.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ci),t.getHSL(rr);const n=Hs(ci.h,rr.h,e),i=Hs(ci.s,rr.s,e),r=Hs(ci.l,rr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const We=new re;re.NAMES=Uh;class Nh extends je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gi,this.environmentIntensity=1,this.environmentRotation=new gi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const vn=new R,Wn=new R,wa=new R,Xn=new R,Wi=new R,Xi=new R,el=new R,Aa=new R,Ra=new R,Ca=new R,Pa=new xe,La=new xe,Da=new xe;class nn{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),vn.subVectors(t,e),i.cross(vn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){vn.subVectors(i,e),Wn.subVectors(n,e),wa.subVectors(t,e);const a=vn.dot(vn),o=vn.dot(Wn),l=vn.dot(wa),c=Wn.dot(Wn),h=Wn.dot(wa),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,d=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Xn.x),l.addScaledVector(a,Xn.y),l.addScaledVector(o,Xn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Pa.setScalar(0),La.setScalar(0),Da.setScalar(0),Pa.fromBufferAttribute(t,e),La.fromBufferAttribute(t,n),Da.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Pa,r.x),a.addScaledVector(La,r.y),a.addScaledVector(Da,r.z),a}static isFrontFacing(t,e,n,i){return vn.subVectors(n,e),Wn.subVectors(t,e),vn.cross(Wn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),vn.cross(Wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return nn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return nn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return nn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return nn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return nn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Wi.subVectors(i,n),Xi.subVectors(r,n),Aa.subVectors(t,n);const l=Wi.dot(Aa),c=Xi.dot(Aa);if(l<=0&&c<=0)return e.copy(n);Ra.subVectors(t,i);const h=Wi.dot(Ra),f=Xi.dot(Ra);if(h>=0&&f<=h)return e.copy(i);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Wi,a);Ca.subVectors(t,r);const d=Wi.dot(Ca),p=Xi.dot(Ca);if(p>=0&&d<=p)return e.copy(r);const _=d*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(Xi,o);const g=h*p-d*f;if(g<=0&&f-h>=0&&d-p>=0)return el.subVectors(r,i),o=(f-h)/(f-h+(d-p)),e.copy(i).addScaledVector(el,o);const m=1/(g+_+u);return a=_*m,o=u*m,e.copy(n).addScaledVector(Wi,a).addScaledVector(Xi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Tn{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ar.copy(n.boundingBox)),ar.applyMatrix4(t.matrixWorld),this.union(ar)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Es),or.subVectors(this.max,Es),qi.subVectors(t.a,Es),Yi.subVectors(t.b,Es),Zi.subVectors(t.c,Es),li.subVectors(Yi,qi),hi.subVectors(Zi,Yi),Si.subVectors(qi,Zi);let e=[0,-li.z,li.y,0,-hi.z,hi.y,0,-Si.z,Si.y,li.z,0,-li.x,hi.z,0,-hi.x,Si.z,0,-Si.x,-li.y,li.x,0,-hi.y,hi.x,0,-Si.y,Si.x,0];return!Ia(e,qi,Yi,Zi,or)||(e=[1,0,0,0,1,0,0,0,1],!Ia(e,qi,Yi,Zi,or))?!1:(cr.crossVectors(li,hi),e=[cr.x,cr.y,cr.z],Ia(e,qi,Yi,Zi,or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const qn=[new R,new R,new R,new R,new R,new R,new R,new R],xn=new R,ar=new Tn,qi=new R,Yi=new R,Zi=new R,li=new R,hi=new R,Si=new R,Es=new R,or=new R,cr=new R,yi=new R;function Ia(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){yi.fromArray(s,r);const o=i.x*Math.abs(yi.x)+i.y*Math.abs(yi.y)+i.z*Math.abs(yi.z),l=t.dot(yi),c=e.dot(yi),h=n.dot(yi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Pe=new R,lr=new ct;let qf=0;class pn extends Ni{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Lh,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)lr.fromBufferAttribute(this,e),lr.applyMatrix3(t),this.setXY(e,lr.x,lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Sn(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Sn(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Sn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Sn(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Fh extends pn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Oh extends pn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ae extends pn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Yf=new Tn,Ts=new R,Ua=new R;class Oi{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Yf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ts.subVectors(t,this.center);const e=Ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ts,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ua.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ts.copy(t.center).add(Ua)),this.expandByPoint(Ts.copy(t.center).sub(Ua))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Zf=0;const hn=new Ee,Na=new je,$i=new R,an=new Tn,ws=new Tn,Ie=new R;class be extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(df(t)?Oh:Fh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return Na.lookAt(t),Na.updateMatrix(),this.applyMatrix4(Na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ae(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&te('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ws.setFromBufferAttribute(o),this.morphTargetsRelative?(Ie.addVectors(an.min,ws.min),an.expandByPoint(Ie),Ie.addVectors(an.max,ws.max),an.expandByPoint(Ie)):(an.expandByPoint(ws.min),an.expandByPoint(ws.max))}an.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ie.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ie));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ie.fromBufferAttribute(o,c),l&&($i.fromBufferAttribute(t,c),Ie.add($i)),i=Math.max(i,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&te('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){te("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new pn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new R,l[v]=new R;const c=new R,h=new R,f=new R,u=new ct,d=new ct,p=new ct,_=new R,g=new R;function m(v,w,I){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,w),f.fromBufferAttribute(n,I),u.fromBufferAttribute(r,v),d.fromBufferAttribute(r,w),p.fromBufferAttribute(r,I),h.sub(c),f.sub(c),d.sub(u),p.sub(u);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(P),g.copy(f).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(P),o[v].add(_),o[w].add(_),o[I].add(_),l[v].add(g),l[w].add(g),l[I].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let v=0,w=y.length;v<w;++v){const I=y[v],P=I.start,D=I.count;for(let U=P,L=P+D;U<L;U+=3)m(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const E=new R,x=new R,S=new R,b=new R;function A(v){S.fromBufferAttribute(i,v),b.copy(S);const w=o[v];E.copy(w),E.sub(S.multiplyScalar(S.dot(w))).normalize(),x.crossVectors(b,w);const P=x.dot(l[v])<0?-1:1;a.setXYZW(v,E.x,E.y,E.z,P)}for(let v=0,w=y.length;v<w;++v){const I=y[v],P=I.start,D=I.count;for(let U=P,L=P+D;U<L;U+=3)A(t.getX(U+0)),A(t.getX(U+1)),A(t.getX(U+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new pn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const i=new R,r=new R,a=new R,o=new R,l=new R,c=new R,h=new R,f=new R;if(t)for(let u=0,d=t.count;u<d;u+=3){const p=t.getX(u+0),_=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let d=0,p=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let m=0;m<h;m++)u[p++]=c[d++]}return new pn(u,h,f)}if(this.index===null)return Ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new be,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],d=t(u,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bh{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Lh,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const Je=new R;class Nn{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix4(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyNormalMatrix(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.transformDirection(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Sn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Sn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Sn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Sn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){ta("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new pn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Nn(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){ta("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Fa=new R,$f=new R,Jf=new Xt;class $n{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Fa.subVectors(n,e).cross($f.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const i=t.delta(Fa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Jf.getNormalMatrix(t),i=this.coplanarPoint(Fa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Kf=0;class Ms extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=Vs,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dh,this.blendDst=ph,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new re(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=af,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=va,this.stencilZFail=va,this.stencilZPass=va,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ot(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ot(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new re().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new $n().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ct().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ct().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ks extends Ms{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new re(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ji;const As=new R,Ki=new R,Qi=new R,ji=new ct,Rs=new ct,zh=new Ee,hr=new R,Cs=new R,ur=new R,nl=new ct,Oa=new ct,il=new ct;class qr extends je{constructor(t=new ks){if(super(),this.isSprite=!0,this.type="Sprite",Ji===void 0){Ji=new be;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Bh(e,5);Ji.setIndex([0,1,2,0,2,3]),Ji.setAttribute("position",new Nn(n,3,0,!1)),Ji.setAttribute("uv",new Nn(n,2,3,!1))}this.geometry=Ji,this.material=t,this.center=new ct(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&te('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ki.setFromMatrixScale(this.matrixWorld),zh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Qi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ki.multiplyScalar(-Qi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;fr(hr.set(-.5,-.5,0),Qi,a,Ki,i,r),fr(Cs.set(.5,-.5,0),Qi,a,Ki,i,r),fr(ur.set(.5,.5,0),Qi,a,Ki,i,r),nl.set(0,0),Oa.set(1,0),il.set(1,1);let o=t.ray.intersectTriangle(hr,Cs,ur,!1,As);if(o===null&&(fr(Cs.set(-.5,.5,0),Qi,a,Ki,i,r),Oa.set(0,1),o=t.ray.intersectTriangle(hr,ur,Cs,!1,As),o===null))return;const l=t.ray.origin.distanceTo(As);l<t.near||l>t.far||e.push({distance:l,point:As.clone(),uv:nn.getInterpolation(As,hr,Cs,ur,nl,Oa,il,new ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function fr(s,t,e,n,i,r){ji.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Rs.x=r*ji.x-i*ji.y,Rs.y=i*ji.x+r*ji.y):Rs.copy(ji),s.copy(t),s.x+=Rs.x,s.y+=Rs.y,s.applyMatrix4(zh)}const Yn=new R,Ba=new R,dr=new R,pr=new R;class _i{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Yn.copy(this.origin).addScaledVector(this.direction,e),Yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ba.copy(t).add(e).multiplyScalar(.5),dr.copy(e).sub(t).normalize(),pr.copy(this.origin).sub(Ba);const r=t.distanceTo(e)*.5,a=-this.direction.dot(dr),o=pr.dot(this.direction),l=-pr.dot(dr),c=pr.lengthSq(),h=Math.abs(1-a*a);let f,u,d,p;if(h>0)if(f=a*l-o,u=a*o-l,p=r*h,f>=0)if(u>=-p)if(u<=p){const _=1/h;f*=_,u*=_,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=p?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Ba).addScaledVector(dr,u),d}intersectSphere(t,e){if(t.radius<0)return null;Yn.subVectors(t.center,this.origin);const n=Yn.dot(this.direction),i=Yn.dot(Yn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Yn)!==null}intersectTriangle(t,e,n,i,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,d=t.z-a.z,p=e.x-a.x,_=e.y-a.y,g=e.z-a.z,m=n.x-a.x,y=n.y-a.y,E=n.z-a.z,x=Math.abs(l),S=Math.abs(c),b=Math.abs(h);let A,v,w,I,P,D,U,L,O,V,z,Y;if(x>=S&&x>=b?(w=l,D=f,O=p,Y=m,l>=0?(A=c,v=h,I=u,P=d,U=_,L=g,V=y,z=E):(A=h,v=c,I=d,P=u,U=g,L=_,V=E,z=y)):S>=b?(w=c,D=u,O=_,Y=y,c>=0?(A=h,v=l,I=d,P=f,U=g,L=p,V=E,z=m):(A=l,v=h,I=f,P=d,U=p,L=g,V=m,z=E)):(w=h,D=d,O=g,Y=E,h>=0?(A=l,v=c,I=f,P=u,U=p,L=_,V=m,z=y):(A=c,v=l,I=u,P=f,U=_,L=p,V=y,z=m)),w===0)return null;const W=A/w,K=v/w,j=1/w,Pt=I-W*D,Tt=P-K*D,oe=U-W*O,Jt=L-K*O,ne=V-W*Y,J=z-K*Y,et=ne*Jt-J*oe,_t=Pt*J-Tt*ne,Bt=oe*Tt-Jt*Pt;if(i){if(et<0||_t<0||Bt<0)return null}else if((et<0||_t<0||Bt<0)&&(et>0||_t>0||Bt>0))return null;const St=et+_t+Bt;if(St===0)return null;const zt=j*(et*D+_t*O+Bt*Y);return(St>0?zt<0:zt>0)?null:this.at(zt/St,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vn extends Ms{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.combine=mh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const sl=new Ee,bi=new _i,mr=new Oi,rl=new R,gr=new R,_r=new R,vr=new R,za=new R,xr=new R,al=new R,Mr=new R;class ge extends je{constructor(t=new be,e=new Vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){xr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(za.fromBufferAttribute(f,t),a?xr.addScaledVector(za,h):xr.addScaledVector(za.sub(e),h))}e.add(xr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(r),bi.copy(t.ray).recast(t.near),!(mr.containsPoint(bi.origin)===!1&&(bi.intersectSphere(mr,rl)===null||bi.origin.distanceToSquared(rl)>(t.far-t.near)**2))&&(sl.copy(r).invert(),bi.copy(t.ray).applyMatrix4(sl),!(n.boundingBox!==null&&bi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,bi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){const g=u[p],m=a[g.materialIndex],y=Math.max(g.start,d.start),E=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let x=y,S=E;x<S;x+=3){const b=o.getX(x),A=o.getX(x+1),v=o.getX(x+2);i=Sr(this,m,t,n,c,h,f,b,A,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const y=o.getX(g),E=o.getX(g+1),x=o.getX(g+2);i=Sr(this,a,t,n,c,h,f,y,E,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){const g=u[p],m=a[g.materialIndex],y=Math.max(g.start,d.start),E=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let x=y,S=E;x<S;x+=3){const b=x,A=x+1,v=x+2;i=Sr(this,m,t,n,c,h,f,b,A,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const y=g,E=g+1,x=g+2;i=Sr(this,a,t,n,c,h,f,y,E,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Qf(s,t,e,n,i,r,a,o){let l;if(t.side===Ye?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Li,o),l===null)return null;Mr.copy(o),Mr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Mr);return c<e.near||c>e.far?null:{distance:c,point:Mr.clone(),object:s}}function Sr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,gr),s.getVertexPosition(l,_r),s.getVertexPosition(c,vr);const h=Qf(s,t,e,n,gr,_r,vr,al);if(h){const f=new R;nn.getBarycoord(al,gr,_r,vr,f),i&&(h.uv=nn.getInterpolatedAttribute(i,o,l,c,f,new ct)),r&&(h.uv1=nn.getInterpolatedAttribute(r,o,l,c,f,new ct)),a&&(h.normal=nn.getInterpolatedAttribute(a,o,l,c,f,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new R,materialIndex:0};nn.getNormal(gr,_r,vr,u.normal),h.face=u,h.barycoord=f}return h}class jf extends Ze{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ge,h=Ge,f,u){super(null,a,o,l,c,h,i,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ol extends pn{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ei=new Oi,td=new ct(.5,.5),yr=new R;class Gh{constructor(t=new $n,e=new $n,n=new $n,i=new $n,r=new $n,a=new $n){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Un,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],_=r[9],g=r[10],m=r[11],y=r[12],E=r[13],x=r[14],S=r[15];if(i[0].setComponents(c-a,d-h,m-p,S-y).normalize(),i[1].setComponents(c+a,d+h,m+p,S+y).normalize(),i[2].setComponents(c+o,d+f,m+_,S+E).normalize(),i[3].setComponents(c-o,d-f,m-_,S-E).normalize(),n)i[4].setComponents(l,u,g,x).normalize(),i[5].setComponents(c-l,d-u,m-g,S-x).normalize();else if(i[4].setComponents(c-l,d-u,m-g,S-x).normalize(),e===Un)i[5].setComponents(c+l,d+u,m+g,S+x).normalize();else if(e===Qr)i[5].setComponents(l,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){Ei.center.set(0,0,0);const e=td.distanceTo(t.center);return Ei.radius=.7071067811865476+e,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(yr.x=i.normal.x>0?t.max.x:t.min.x,yr.y=i.normal.y>0?t.max.y:t.min.y,yr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(yr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yo extends Ms{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ea=new R,na=new R,cl=new Ee,Ps=new _i,br=new Oi,Ga=new R,ll=new R;class Vh extends je{constructor(t=new be,e=new Yo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)ea.fromBufferAttribute(e,i-1),na.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=ea.distanceTo(na);t.setAttribute("lineDistance",new ae(n,1))}else Ot("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(i),br.radius+=r,t.ray.intersectsSphere(br)===!1)return;cl.copy(i).invert(),Ps.copy(t.ray).applyMatrix4(cl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=d,g=p-1;_<g;_+=c){const m=h.getX(_),y=h.getX(_+1),E=Er(this,t,Ps,l,m,y,_);E&&e.push(E)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(d),m=Er(this,t,Ps,l,_,g,p-1);m&&e.push(m)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=d,g=p-1;_<g;_+=c){const m=Er(this,t,Ps,l,_,_+1,_);m&&e.push(m)}if(this.isLineLoop){const _=Er(this,t,Ps,l,p-1,d,p-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Er(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(ea.fromBufferAttribute(o,i),na.fromBufferAttribute(o,r),e.distanceSqToSegment(ea,na,Ga,ll)>n)return;Ga.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ga);if(!(c<t.near||c>t.far))return{distance:c,point:ll.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const hl=new R,ul=new R;class ed extends Vh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)hl.fromBufferAttribute(e,i),ul.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+hl.distanceTo(ul);t.setAttribute("lineDistance",new ae(n,1))}else Ot("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Hh extends Ze{constructor(t=[],e=Di,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class gc extends Ze{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Js extends Ze{constructor(t,e,n=zn,i,r,a,o=Ge,l=Ge,c,h=ii,f=1){if(h!==ii&&h!==Ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:f};super(u,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new mc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class nd extends Js{constructor(t,e=zn,n=Di,i,r,a=Ge,o=Ge,l,c=ii){const h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class kh extends Ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class sn extends be{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,d=0;p("z","y","x",-1,-1,n,e,t,a,r,0),p("z","y","x",1,-1,n,e,-t,a,r,1),p("x","z","y",1,1,t,n,e,i,a,2),p("x","z","y",1,-1,t,n,-e,i,a,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ae(c,3)),this.setAttribute("normal",new ae(h,3)),this.setAttribute("uv",new ae(f,2));function p(_,g,m,y,E,x,S,b,A,v,w){const I=x/A,P=S/v,D=x/2,U=S/2,L=b/2,O=A+1,V=v+1;let z=0,Y=0;const W=new R;for(let K=0;K<V;K++){const j=K*P-U;for(let Pt=0;Pt<O;Pt++){const Tt=Pt*I-D;W[_]=Tt*y,W[g]=j*E,W[m]=L,c.push(W.x,W.y,W.z),W[_]=0,W[g]=0,W[m]=b>0?1:-1,h.push(W.x,W.y,W.z),f.push(Pt/A),f.push(1-K/v),z+=1}}for(let K=0;K<v;K++)for(let j=0;j<A;j++){const Pt=u+j+O*K,Tt=u+j+O*(K+1),oe=u+(j+1)+O*(K+1),Jt=u+(j+1)+O*K;l.push(Pt,Tt,Jt),l.push(Tt,oe,Jt),Y+=6}o.addGroup(d,Y,w),d+=Y,u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class dn extends be{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],f=[],u=[],d=[];let p=0;const _=[],g=n/2;let m=0;y(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ae(f,3)),this.setAttribute("normal",new ae(u,3)),this.setAttribute("uv",new ae(d,2));function y(){const x=new R,S=new R;let b=0;const A=(e-t)/n;for(let v=0;v<=r;v++){const w=[],I=v/r,P=I*(e-t)+t;for(let D=0;D<=i;D++){const U=D/i,L=U*l+o,O=Math.sin(L),V=Math.cos(L);S.x=P*O,S.y=-I*n+g,S.z=P*V,f.push(S.x,S.y,S.z),x.set(O,A,V).normalize(),u.push(x.x,x.y,x.z),d.push(U,1-I),w.push(p++)}_.push(w)}for(let v=0;v<i;v++)for(let w=0;w<r;w++){const I=_[w][v],P=_[w+1][v],D=_[w+1][v+1],U=_[w][v+1];(t>0||w!==0)&&(h.push(I,P,U),b+=3),(e>0||w!==r-1)&&(h.push(P,D,U),b+=3)}c.addGroup(m,b,0),m+=b}function E(x){const S=p,b=new ct,A=new R;let v=0;const w=x===!0?t:e,I=x===!0?1:-1;for(let D=1;D<=i;D++)f.push(0,g*I,0),u.push(0,I,0),d.push(.5,.5),p++;const P=p;for(let D=0;D<=i;D++){const L=D/i*l+o,O=Math.cos(L),V=Math.sin(L);A.x=w*V,A.y=g*I,A.z=w*O,f.push(A.x,A.y,A.z),u.push(0,I,0),b.x=O*.5+.5,b.y=V*.5*I+.5,d.push(b.x,b.y),p++}for(let D=0;D<i;D++){const U=S+D,L=P+D;x===!0?h.push(L,L+1,U):h.push(L+1,L,U),v+=3}c.addGroup(m,v,x===!0?1:2),m+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _c extends dn{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new _c(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const Tr=new R,wr=new R,Va=new R,Ar=new nn;class Wh extends be{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),r=Math.cos(us*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],f=new Array(3),u={},d=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:_,b:g,c:m}=Ar;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),Ar.getNormal(Va),f[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,f[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,f[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let y=0;y<3;y++){const E=(y+1)%3,x=f[y],S=f[E],b=Ar[h[y]],A=Ar[h[E]],v=`${x}_${S}`,w=`${S}_${x}`;w in u&&u[w]?(Va.dot(u[w].normal)<=r&&(d.push(b.x,b.y,b.z),d.push(A.x,A.y,A.z)),u[w]=null):v in u||(u[v]={index0:c[y],index1:c[E],normal:Va.clone()})}}for(const p in u)if(u[p]){const{index0:_,index1:g}=u[p];Tr.fromBufferAttribute(o,_),wr.fromBufferAttribute(o,g),d.push(Tr.x,Tr.y,Tr.z),d.push(wr.x,wr.y,wr.z)}this.setAttribute("position",new ae(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Hn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ot("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],u=n[i+1]-h,d=(a-h)/u;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new ct:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new R,i=[],r=[],a=[],o=new R,l=new Ee;for(let d=0;d<=t;d++){const p=d/t;i[d]=this.getTangentAt(p,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(qt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(qt(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],d*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class vc extends Hn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ct){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class id extends vc{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function xc(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,i(a,o,u,d)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const fl=new R,dl=new R,Ha=new xc,ka=new xc,Wa=new xc;class sd extends Hn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new R){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(dl.subVectors(i[0],i[1]).add(i[0]),c=dl);const f=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(fl.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=fl),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Ha.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,p,_,g),ka.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,p,_,g),Wa.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(Ha.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),ka.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Wa.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(Ha.calc(l),ka.calc(l),Wa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new R().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function pl(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function rd(s,t){const e=1-s;return e*e*t}function ad(s,t){return 2*(1-s)*s*t}function od(s,t){return s*s*t}function Ws(s,t,e,n){return rd(s,t)+ad(s,e)+od(s,n)}function cd(s,t){const e=1-s;return e*e*e*t}function ld(s,t){const e=1-s;return 3*e*e*s*t}function hd(s,t){return 3*(1-s)*s*s*t}function ud(s,t){return s*s*s*t}function Xs(s,t,e,n,i){return cd(s,t)+ld(s,e)+hd(s,n)+ud(s,i)}class Xh extends Hn{constructor(t=new ct,e=new ct,n=new ct,i=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ct){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Xs(t,i.x,r.x,a.x,o.x),Xs(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class fd extends Hn{constructor(t=new R,e=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new R){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Xs(t,i.x,r.x,a.x,o.x),Xs(t,i.y,r.y,a.y,o.y),Xs(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qh extends Hn{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dd extends Hn{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yh extends Hn{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ws(t,i.x,r.x,a.x),Ws(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pd extends Hn{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ws(t,i.x,r.x,a.x),Ws(t,i.y,r.y,a.y),Ws(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zh extends Hn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(pl(o,l.x,c.x,h.x,f.x),pl(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ct().fromArray(i))}return this}}var Zo=Object.freeze({__proto__:null,ArcCurve:id,CatmullRomCurve3:sd,CubicBezierCurve:Xh,CubicBezierCurve3:fd,EllipseCurve:vc,LineCurve:qh,LineCurve3:dd,QuadraticBezierCurve:Yh,QuadraticBezierCurve3:pd,SplineCurve:Zh});class md extends Hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Zo[i.type]().fromJSON(i))}return this}}class $o extends md{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new qh(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Yh(this.currentPoint.clone(),new ct(t,e),new ct(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Xh(this.currentPoint.clone(),new ct(t,e),new ct(n,i),new ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Zh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new vc(t,e,n,i,r,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ps extends $o{constructor(t){super(t),this.uuid=Bn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new $o().fromJSON(i))}return this}}function gd(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=$h(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Sd(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,f=l;for(let u=e;u<i;u+=e){const d=s[u],p=s[u+1];d<o&&(o=d),p<l&&(l=p),d>h&&(h=d),p>f&&(f=p)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return Ks(r,a,e,o,l,c,0),a}function $h(s,t,e,n,i){let r;if(i===Dd(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=ml(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=ml(a/n|0,s[a],s[a+1],r);return r&&ms(r,r.next)&&(js(r),r=r.next),r}function Ui(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(ms(e,e.next)||Ae(e.prev,e,e.next)===0)){if(js(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ks(s,t,e,n,i,r,a){if(!s)return;!a&&r&&wd(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?vd(s,n,i,r):_d(s)){t.push(l.i,s.i,c.i),js(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=xd(Ui(s),t),Ks(s,t,e,n,i,r,2)):a===2&&Md(s,t,e,n,i,r):Ks(Ui(s),t,e,n,i,r,1);break}}}function _d(s){const t=s.prev,e=s,n=s.next;if(Ae(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),f=Math.min(o,l,c),u=Math.max(i,r,a),d=Math.max(o,l,c);let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=f&&p.y<=d&&Os(i,o,r,l,a,c,p.x,p.y)&&Ae(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function vd(s,t,e,n){const i=s.prev,r=s,a=s.next;if(Ae(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,f=r.y,u=a.y,d=Math.min(o,l,c),p=Math.min(h,f,u),_=Math.max(o,l,c),g=Math.max(h,f,u),m=Jo(d,p,t,e,n),y=Jo(_,g,t,e,n);let E=s.prevZ,x=s.nextZ;for(;E&&E.z>=m&&x&&x.z<=y;){if(E.x>=d&&E.x<=_&&E.y>=p&&E.y<=g&&E!==i&&E!==a&&Os(o,h,l,f,c,u,E.x,E.y)&&Ae(E.prev,E,E.next)>=0||(E=E.prevZ,x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&Os(o,h,l,f,c,u,x.x,x.y)&&Ae(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;E&&E.z>=m;){if(E.x>=d&&E.x<=_&&E.y>=p&&E.y<=g&&E!==i&&E!==a&&Os(o,h,l,f,c,u,E.x,E.y)&&Ae(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;x&&x.z<=y;){if(x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&Os(o,h,l,f,c,u,x.x,x.y)&&Ae(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function xd(s,t){let e=s;do{const n=e.prev,i=e.next.next;!ms(n,i)&&Kh(n,e,e.next,i)&&Qs(n,i)&&Qs(i,n)&&(t.push(n.i,e.i,i.i),js(e),js(e.next),e=s=i),e=e.next}while(e!==s);return Ui(e)}function Md(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Cd(a,o)){let l=Qh(a,o);a=Ui(a,a.next),l=Ui(l,l.next),Ks(a,t,e,n,i,r,0),Ks(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Sd(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=$h(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Rd(c))}i.sort(yd);for(let r=0;r<i.length;r++)e=bd(i[r],e);return e}function yd(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function bd(s,t){const e=Ed(s,t);if(!e)return t;const n=Qh(e,s);return Ui(n,n.next),Ui(e,e.next)}function Ed(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(ms(s,e))return e;do{if(ms(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const f=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Jh(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){const f=Math.abs(i-e.y)/(n-e.x);Qs(e,s)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&Td(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function Td(s,t){return Ae(s.prev,s,t.prev)<0&&Ae(t.next,s,s.next)<0}function wd(s,t,e,n){let i=s;do i.z===0&&(i.z=Jo(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Ad(i)}function Ad(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Jo(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Rd(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Jh(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Os(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Jh(s,t,e,n,i,r,a,o)}function Cd(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Pd(s,t)&&(Qs(s,t)&&Qs(t,s)&&Ld(s,t)&&(Ae(s.prev,s,t.prev)||Ae(s,t.prev,t))||ms(s,t)&&Ae(s.prev,s,s.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function ms(s,t){return s.x===t.x&&s.y===t.y}function Kh(s,t,e,n){const i=Cr(Ae(s,t,e)),r=Cr(Ae(s,t,n)),a=Cr(Ae(e,n,s)),o=Cr(Ae(e,n,t));return!!(i!==r&&a!==o||i===0&&Rr(s,e,t)||r===0&&Rr(s,n,t)||a===0&&Rr(e,s,n)||o===0&&Rr(e,t,n))}function Rr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Cr(s){return s>0?1:s<0?-1:0}function Pd(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Kh(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Qs(s,t){return Ae(s.prev,s,s.next)<0?Ae(s,t,s.next)>=0&&Ae(s,s.prev,t)>=0:Ae(s,t,s.prev)<0||Ae(s,s.next,t)<0}function Ld(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Qh(s,t){const e=Ko(s.i,s.x,s.y),n=Ko(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ml(s,t,e,n){const i=Ko(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function js(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Ko(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Dd(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Id{static triangulate(t,e,n=2){return gd(t,e,n)}}class Qn{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Qn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];gl(t),_l(n,t);let a=t.length;e.forEach(gl);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,_l(n,e[l]);const o=Id.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function gl(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function _l(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class oa extends be{constructor(t=new ps([new ct(.5,.5),new ct(-.5,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new ae(i,3)),this.setAttribute("uv",new ae(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:Ud;let E,x=!1,S,b,A,v;if(m){E=m.getSpacedPoints(h),x=!0,u=!1;const nt=m.isCatmullRomCurve3?m.closed:!1;S=m.computeFrenetFrames(h,nt),b=new R,A=new R,v=new R}u||(g=0,d=0,p=0,_=0);const w=o.extractPoints(c);let I=w.shape;const P=w.holes;if(!Qn.isClockWise(I)){I=I.reverse();for(let nt=0,st=P.length;nt<st;nt++){const rt=P[nt];Qn.isClockWise(rt)&&(P[nt]=rt.reverse())}}function U(nt){const rt=10000000000000001e-36;let at=nt[0];for(let ht=1;ht<=nt.length;ht++){const Nt=ht%nt.length,Ut=nt[Nt],Gt=Ut.x-at.x,kt=Ut.y-at.y,N=Gt*Gt+kt*kt,le=Math.max(Math.abs(Ut.x),Math.abs(Ut.y),Math.abs(at.x),Math.abs(at.y)),Kt=rt*le*le;if(N<=Kt){nt.splice(Nt,1),ht--;continue}at=Ut}}U(I),P.forEach(U);const L=P.length,O=I;for(let nt=0;nt<L;nt++){const st=P[nt];I=I.concat(st)}function V(nt,st,rt){return st||te("ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(st,rt)}const z=I.length;function Y(nt,st,rt){let at,ht,Nt;const Ut=nt.x-st.x,Gt=nt.y-st.y,kt=rt.x-nt.x,N=rt.y-nt.y,le=Ut*Ut+Gt*Gt,Kt=Ut*N-Gt*kt;if(Math.abs(Kt)>Number.EPSILON){const C=Math.sqrt(le),M=Math.sqrt(kt*kt+N*N),G=st.x-Gt/C,X=st.y+Ut/C,Z=rt.x-N/M,ot=rt.y+kt/M,lt=((Z-G)*N-(ot-X)*kt)/(Ut*N-Gt*kt);at=G+Ut*lt-nt.x,ht=X+Gt*lt-nt.y;const $=at*at+ht*ht;if($<=2)return new ct(at,ht);Nt=Math.sqrt($/2)}else{let C=!1;Ut>Number.EPSILON?kt>Number.EPSILON&&(C=!0):Ut<-Number.EPSILON?kt<-Number.EPSILON&&(C=!0):Math.sign(Gt)===Math.sign(N)&&(C=!0),C?(at=-Gt,ht=Ut,Nt=Math.sqrt(le)):(at=Ut,ht=Gt,Nt=Math.sqrt(le/2))}return new ct(at/Nt,ht/Nt)}const W=[];for(let nt=0,st=O.length,rt=st-1,at=nt+1;nt<st;nt++,rt++,at++)rt===st&&(rt=0),at===st&&(at=0),W[nt]=Y(O[nt],O[rt],O[at]);const K=[];let j,Pt=W.concat();for(let nt=0,st=L;nt<st;nt++){const rt=P[nt];j=[];for(let at=0,ht=rt.length,Nt=ht-1,Ut=at+1;at<ht;at++,Nt++,Ut++)Nt===ht&&(Nt=0),Ut===ht&&(Ut=0),j[at]=Y(rt[at],rt[Nt],rt[Ut]);K.push(j),Pt=Pt.concat(j)}let Tt;if(g===0)Tt=Qn.triangulateShape(O,P);else{const nt=[],st=[];for(let rt=0;rt<g;rt++){const at=rt/g,ht=d*Math.cos(at*Math.PI/2),Nt=p*Math.sin(at*Math.PI/2)+_;for(let Ut=0,Gt=O.length;Ut<Gt;Ut++){const kt=V(O[Ut],W[Ut],Nt);_t(kt.x,kt.y,-ht),at===0&&nt.push(kt)}for(let Ut=0,Gt=L;Ut<Gt;Ut++){const kt=P[Ut];j=K[Ut];const N=[];for(let le=0,Kt=kt.length;le<Kt;le++){const C=V(kt[le],j[le],Nt);_t(C.x,C.y,-ht),at===0&&N.push(C)}at===0&&st.push(N)}}Tt=Qn.triangulateShape(nt,st)}const oe=Tt.length,Jt=p+_;for(let nt=0;nt<z;nt++){const st=u?V(I[nt],Pt[nt],Jt):I[nt];x?(A.copy(S.normals[0]).multiplyScalar(st.x),b.copy(S.binormals[0]).multiplyScalar(st.y),v.copy(E[0]).add(A).add(b),_t(v.x,v.y,v.z)):_t(st.x,st.y,0)}for(let nt=1;nt<=h;nt++)for(let st=0;st<z;st++){const rt=u?V(I[st],Pt[st],Jt):I[st];x?(A.copy(S.normals[nt]).multiplyScalar(rt.x),b.copy(S.binormals[nt]).multiplyScalar(rt.y),v.copy(E[nt]).add(A).add(b),_t(v.x,v.y,v.z)):_t(rt.x,rt.y,f/h*nt)}for(let nt=g-1;nt>=0;nt--){const st=nt/g,rt=d*Math.cos(st*Math.PI/2),at=p*Math.sin(st*Math.PI/2)+_;for(let ht=0,Nt=O.length;ht<Nt;ht++){const Ut=V(O[ht],W[ht],at);_t(Ut.x,Ut.y,f+rt)}for(let ht=0,Nt=P.length;ht<Nt;ht++){const Ut=P[ht];j=K[ht];for(let Gt=0,kt=Ut.length;Gt<kt;Gt++){const N=V(Ut[Gt],j[Gt],at);x?_t(N.x,N.y+E[h-1].y,E[h-1].x+rt):_t(N.x,N.y,f+rt)}}}ne(),J();function ne(){const nt=i.length/3;if(u){let st=0,rt=z*st;for(let at=0;at<oe;at++){const ht=Tt[at];Bt(ht[2]+rt,ht[1]+rt,ht[0]+rt)}st=h+g*2,rt=z*st;for(let at=0;at<oe;at++){const ht=Tt[at];Bt(ht[0]+rt,ht[1]+rt,ht[2]+rt)}}else{for(let st=0;st<oe;st++){const rt=Tt[st];Bt(rt[2],rt[1],rt[0])}for(let st=0;st<oe;st++){const rt=Tt[st];Bt(rt[0]+z*h,rt[1]+z*h,rt[2]+z*h)}}n.addGroup(nt,i.length/3-nt,0)}function J(){const nt=i.length/3;let st=0;et(O,st),st+=O.length;for(let rt=0,at=P.length;rt<at;rt++){const ht=P[rt];et(ht,st),st+=ht.length}n.addGroup(nt,i.length/3-nt,1)}function et(nt,st){let rt=nt.length;for(;--rt>=0;){const at=rt;let ht=rt-1;ht<0&&(ht=nt.length-1);for(let Nt=0,Ut=h+g*2;Nt<Ut;Nt++){const Gt=z*Nt,kt=z*(Nt+1),N=st+at+Gt,le=st+ht+Gt,Kt=st+ht+kt,C=st+at+kt;St(N,le,Kt,C)}}}function _t(nt,st,rt){l.push(nt),l.push(st),l.push(rt)}function Bt(nt,st,rt){zt(nt),zt(st),zt(rt);const at=i.length/3,ht=y.generateTopUV(n,i,at-3,at-2,at-1);de(ht[0]),de(ht[1]),de(ht[2])}function St(nt,st,rt,at){zt(nt),zt(st),zt(at),zt(st),zt(rt),zt(at);const ht=i.length/3,Nt=y.generateSideWallUV(n,i,ht-6,ht-3,ht-2,ht-1);de(Nt[0]),de(Nt[1]),de(Nt[3]),de(Nt[1]),de(Nt[2]),de(Nt[3])}function zt(nt){i.push(l[nt*3+0]),i.push(l[nt*3+1]),i.push(l[nt*3+2])}function de(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Nd(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Zo[i.type]().fromJSON(i)),new oa(n,t.options)}}const Ud={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new ct(r,a),new ct(o,l),new ct(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[i*3],d=t[i*3+1],p=t[i*3+2],_=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ct(a,1-l),new ct(c,1-f),new ct(u,1-p),new ct(_,1-m)]:[new ct(o,1-l),new ct(h,1-f),new ct(d,1-p),new ct(g,1-m)]}};function Nd(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ss extends be{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=t/o,u=e/l,d=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const y=m*u-a;for(let E=0;E<c;E++){const x=E*f-r;p.push(x,-y,0),_.push(0,0,1),g.push(E/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){const E=y+c*m,x=y+c*(m+1),S=y+1+c*(m+1),b=y+1+c*m;d.push(E,x,b),d.push(x,S,b)}this.setIndex(d),this.setAttribute("position",new ae(p,3)),this.setAttribute("normal",new ae(_,3)),this.setAttribute("uv",new ae(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ss(t.width,t.height,t.widthSegments,t.heightSegments)}}class ca extends be{constructor(t=new ps([new ct(0,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ae(i,3)),this.setAttribute("normal",new ae(r,3)),this.setAttribute("uv",new ae(a,2));function c(h){const f=i.length/3,u=h.extractPoints(e);let d=u.shape;const p=u.holes;Qn.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const y=p[g];Qn.isClockWise(y)===!0&&(p[g]=y.reverse())}const _=Qn.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const y=p[g];d=d.concat(y)}for(let g=0,m=d.length;g<m;g++){const y=d[g];i.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,m=_.length;g<m;g++){const y=_[g],E=y[0]+f,x=y[1]+f,S=y[2]+f;n.push(E,x,S),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Fd(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new ca(n,t.curveSegments)}}function Fd(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class gs extends be{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new R,u=new R,d=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const y=[],E=m/n,x=a+E*o,S=t*Math.cos(x),b=Math.sqrt(t*t-S*S);let A=0;m===0&&a===0?A=.5/e:m===n&&l===Math.PI&&(A=-.5/e);for(let v=0;v<=e;v++){const w=v/e,I=i+w*r;f.x=-b*Math.cos(I),f.y=S,f.z=b*Math.sin(I),p.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),g.push(w+A,1-E),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const E=h[m][y+1],x=h[m][y],S=h[m+1][y],b=h[m+1][y+1];(m!==0||a>0)&&d.push(E,x,b),(m!==n-1||l<Math.PI)&&d.push(x,S,b)}this.setIndex(d),this.setAttribute("position",new ae(p,3)),this.setAttribute("normal",new ae(_,3)),this.setAttribute("uv",new ae(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Od extends be{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,i=new R,r=new R;if(t.index!==null){const a=t.attributes.position,o=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const f=l[c],u=f.start,d=f.count;for(let p=u,_=u+d;p<_;p+=3)for(let g=0;g<3;g++){const m=o.getX(p+g),y=o.getX(p+(g+1)%3);i.fromBufferAttribute(a,m),r.fromBufferAttribute(a,y),vl(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}}else{const a=t.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const h=3*o+c,f=3*o+(c+1)%3;i.fromBufferAttribute(a,h),r.fromBufferAttribute(a,f),vl(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new ae(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function vl(s,t,e){const n=`${s.x},${s.y},${s.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${s.x},${s.y},${s.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}function _s(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];if(xl(i))i.isRenderTargetTexture?(Ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(xl(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function Ke(s){const t={};for(let e=0;e<s.length;e++){const n=_s(s[e]);for(const i in n)t[i]=n[i]}return t}function xl(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Bd(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function jh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Mc={clone:_s,merge:Ke};var zd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mn extends Ms{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zd,this.fragmentShader=Gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_s(t.uniforms),this.uniformsGroups=Bd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new re().setHex(i.value);break;case"v2":this.uniforms[n].value=new ct().fromArray(i.value);break;case"v3":this.uniforms[n].value=new R().fromArray(i.value);break;case"v4":this.uniforms[n].value=new xe().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Xt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Ee().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Vd extends mn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Hd extends Ms{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class kd extends Ms{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Pr=new R,Lr=new Fi,Rn=new R;class tu extends je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Pr,Lr,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pr,Lr,Rn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Pr,Lr,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pr,Lr,Rn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ui=new R,Ml=new ct,Sl=new ct;class on extends tu{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=$s*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(us*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return $s*2*Math.atan(Math.tan(us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,Ml,Sl),e.subVectors(Sl,Ml)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(us*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class eu extends tu{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Wd extends be{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}const ts=-90,es=1;class Xd extends je{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new on(ts,es,t,e);i.layers=this.layers,this.add(i);const r=new on(ts,es,t,e);r.layers=this.layers,this.add(r);const a=new on(ts,es,t,e);a.layers=this.layers,this.add(a);const o=new on(ts,es,t,e);o.layers=this.layers,this.add(o);const l=new on(ts,es,t,e);l.layers=this.layers,this.add(l);const c=new on(ts,es,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Un)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class qd extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Yd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Zd.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Zd(){this._document.hidden===!1&&this.reset()}class Qo extends Bh{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const yl=new Ee;class $d{constructor(t,e,n=0,i=1/0){this.ray=new _i(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):te("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return yl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yl),this}intersectObject(t,e=!0,n=[]){return jo(t,this,n,e),n.sort(bl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)jo(t[i],this,n,e);return n.sort(bl),n}}function bl(s,t){return s.distance-t.distance}function jo(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)jo(r[a],t,e,!0)}}class nu{static{nu.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}}const El=new R,Dr=new R,ns=new R,is=new R,Xa=new R,Jd=new R,Kd=new R;class Sc{constructor(t=new R,e=new R){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){El.subVectors(t,this.start),Dr.subVectors(this.end,this.start);const n=Dr.dot(Dr);if(n===0)return 0;let r=Dr.dot(El)/n;return e&&(r=qt(r,0,1)),r}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(t,e=Jd,n=Kd){const i=10000000000000001e-32;let r,a;const o=this.start,l=t.start,c=this.end,h=t.end;ns.subVectors(c,o),is.subVectors(h,l),Xa.subVectors(o,l);const f=ns.dot(ns),u=is.dot(is),d=is.dot(Xa);if(f<=i&&u<=i)return e.copy(o),n.copy(l),e.sub(n),e.dot(e);if(f<=i)r=0,a=d/u,a=qt(a,0,1);else{const p=ns.dot(Xa);if(u<=i)a=0,r=qt(-p/f,0,1);else{const _=ns.dot(is),g=f*u-_*_;g!==0?r=qt((_*d-p*u)/g,0,1):r=0,a=(_*r+d)/u,a<0?(a=0,r=qt(-p/f,0,1)):a>1&&(a=1,r=qt((_-p)/f,0,1))}}return e.copy(o).addScaledVector(ns,r),n.copy(l).addScaledVector(is,a),e.distanceToSquared(n)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Tl(s,t,e,n){const i=Qd(n);switch(e){case Rh:return s*t;case Ph:return s*t/i.components*i.byteLength;case lc:return s*t/i.components*i.byteLength;case Ii:return s*t*2/i.components*i.byteLength;case hc:return s*t*2/i.components*i.byteLength;case Ch:return s*t*3/i.components*i.byteLength;case bn:return s*t*4/i.components*i.byteLength;case uc:return s*t*4/i.components*i.byteLength;case Hr:case kr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Wr:case Xr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case vo:case Mo:return Math.max(s,16)*Math.max(t,8)/4;case _o:case xo:return Math.max(s,8)*Math.max(t,8)/2;case So:case yo:case Eo:case To:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case bo:case Zr:case wo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Co:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Po:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Do:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Io:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case No:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Bo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case zo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Go:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Vo:case Ho:case ko:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Wo:case Xo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case $r:case qo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Qd(s){switch(s){case fn:case Eh:return{byteLength:1,components:1};case Ys:case Th:case Gn:return{byteLength:2,components:1};case oc:case cc:return{byteLength:2,components:4};case zn:case ac:case In:return{byteLength:4,components:1};case wh:case Ah:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rc}}));typeof window<"u"&&(window.__THREE__?Ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function iu(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function jd(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){const p=f[u],_=f[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){const _=f[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var tp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ep=`#ifdef USE_ALPHAHASH
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
#endif`,np=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ip=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ap=`#ifdef USE_AOMAP
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
#endif`,op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cp=`#ifdef USE_BATCHING
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
#endif`,lp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,up=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dp=`#ifdef USE_IRIDESCENCE
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
#endif`,pp=`#ifdef USE_BUMPMAP
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
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,bp=`#define PI 3.141592653589793
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
} // validated`,Ep=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tp=`vec3 transformedNormal = objectNormal;
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
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
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
#endif`,Np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fp=`#ifdef USE_ENVMAP
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
#endif`,Op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vp=`#ifdef USE_GRADIENTMAP
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
}`,Hp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,qp=`#ifdef USE_ENVMAP
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
#endif`,Yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$p=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kp=`PhysicalMaterial material;
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
#endif`,Qp=`uniform sampler2D dfgLUT;
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
}`,jp=`
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
#endif`,tm=`#if defined( RE_IndirectDiffuse )
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
#endif`,em=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,am=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hm=`#if defined( USE_POINTS_UV )
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
#endif`,um=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`#ifdef USE_MORPHTARGETS
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
#endif`,_m=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,bm=`#ifdef USE_NORMALMAP
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
#endif`,Em=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Am=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Pm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Um=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Om=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zm=`float getShadowMask() {
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
}`,Gm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vm=`#ifdef USE_SKINNING
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
#endif`,Hm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,km=`#ifdef USE_SKINNING
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
#endif`,Wm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ym=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zm=`#ifdef USE_TRANSMISSION
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
#endif`,$m=`#ifdef USE_TRANSMISSION
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
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const t0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e0=`uniform sampler2D t2D;
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
}`,n0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`#include <common>
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
}`,o0=`#if DEPTH_PACKING == 3200
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
}`,c0=`#define DISTANCE
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
}`,l0=`#define DISTANCE
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
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,u0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`uniform float scale;
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
}`,d0=`uniform vec3 diffuse;
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
}`,p0=`#include <common>
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
}`,m0=`uniform vec3 diffuse;
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
}`,g0=`#define LAMBERT
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
}`,_0=`#define LAMBERT
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
}`,v0=`#define MATCAP
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
}`,x0=`#define MATCAP
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
}`,M0=`#define NORMAL
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
}`,S0=`#define NORMAL
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
}`,y0=`#define PHONG
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
}`,b0=`#define PHONG
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
}`,E0=`#define STANDARD
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
}`,T0=`#define STANDARD
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
}`,w0=`#define TOON
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
}`,A0=`#define TOON
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
}`,R0=`uniform float size;
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
}`,C0=`uniform vec3 diffuse;
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
}`,P0=`#include <common>
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
}`,L0=`uniform vec3 color;
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
}`,D0=`uniform float rotation;
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
}`,I0=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:tp,alphahash_pars_fragment:ep,alphamap_fragment:np,alphamap_pars_fragment:ip,alphatest_fragment:sp,alphatest_pars_fragment:rp,aomap_fragment:ap,aomap_pars_fragment:op,batching_pars_vertex:cp,batching_vertex:lp,begin_vertex:hp,beginnormal_vertex:up,bsdfs:fp,iridescence_fragment:dp,bumpmap_pars_fragment:pp,clipping_planes_fragment:mp,clipping_planes_pars_fragment:gp,clipping_planes_pars_vertex:_p,clipping_planes_vertex:vp,color_fragment:xp,color_pars_fragment:Mp,color_pars_vertex:Sp,color_vertex:yp,common:bp,cube_uv_reflection_fragment:Ep,defaultnormal_vertex:Tp,displacementmap_pars_vertex:wp,displacementmap_vertex:Ap,emissivemap_fragment:Rp,emissivemap_pars_fragment:Cp,colorspace_fragment:Pp,colorspace_pars_fragment:Lp,envmap_fragment:Dp,envmap_common_pars_fragment:Ip,envmap_pars_fragment:Up,envmap_pars_vertex:Np,envmap_physical_pars_fragment:qp,envmap_vertex:Fp,fog_vertex:Op,fog_pars_vertex:Bp,fog_fragment:zp,fog_pars_fragment:Gp,gradientmap_pars_fragment:Vp,lightmap_pars_fragment:Hp,lights_lambert_fragment:kp,lights_lambert_pars_fragment:Wp,lights_pars_begin:Xp,lights_toon_fragment:Yp,lights_toon_pars_fragment:Zp,lights_phong_fragment:$p,lights_phong_pars_fragment:Jp,lights_physical_fragment:Kp,lights_physical_pars_fragment:Qp,lights_fragment_begin:jp,lights_fragment_maps:tm,lights_fragment_end:em,lightprobes_pars_fragment:nm,logdepthbuf_fragment:im,logdepthbuf_pars_fragment:sm,logdepthbuf_pars_vertex:rm,logdepthbuf_vertex:am,map_fragment:om,map_pars_fragment:cm,map_particle_fragment:lm,map_particle_pars_fragment:hm,metalnessmap_fragment:um,metalnessmap_pars_fragment:fm,morphinstance_vertex:dm,morphcolor_vertex:pm,morphnormal_vertex:mm,morphtarget_pars_vertex:gm,morphtarget_vertex:_m,normal_fragment_begin:vm,normal_fragment_maps:xm,normal_pars_fragment:Mm,normal_pars_vertex:Sm,normal_vertex:ym,normalmap_pars_fragment:bm,clearcoat_normal_fragment_begin:Em,clearcoat_normal_fragment_maps:Tm,clearcoat_pars_fragment:wm,iridescence_pars_fragment:Am,opaque_fragment:Rm,packing:Cm,premultiplied_alpha_fragment:Pm,project_vertex:Lm,dithering_fragment:Dm,dithering_pars_fragment:Im,roughnessmap_fragment:Um,roughnessmap_pars_fragment:Nm,shadowmap_pars_fragment:Fm,shadowmap_pars_vertex:Om,shadowmap_vertex:Bm,shadowmask_pars_fragment:zm,skinbase_vertex:Gm,skinning_pars_vertex:Vm,skinning_vertex:Hm,skinnormal_vertex:km,specularmap_fragment:Wm,specularmap_pars_fragment:Xm,tonemapping_fragment:qm,tonemapping_pars_fragment:Ym,transmission_fragment:Zm,transmission_pars_fragment:$m,uv_pars_fragment:Jm,uv_pars_vertex:Km,uv_vertex:Qm,worldpos_vertex:jm,background_vert:t0,background_frag:e0,backgroundCube_vert:n0,backgroundCube_frag:i0,cube_vert:s0,cube_frag:r0,depth_vert:a0,depth_frag:o0,distance_vert:c0,distance_frag:l0,equirect_vert:h0,equirect_frag:u0,linedashed_vert:f0,linedashed_frag:d0,meshbasic_vert:p0,meshbasic_frag:m0,meshlambert_vert:g0,meshlambert_frag:_0,meshmatcap_vert:v0,meshmatcap_frag:x0,meshnormal_vert:M0,meshnormal_frag:S0,meshphong_vert:y0,meshphong_frag:b0,meshphysical_vert:E0,meshphysical_frag:T0,meshtoon_vert:w0,meshtoon_frag:A0,points_vert:R0,points_frag:C0,shadow_vert:P0,shadow_frag:L0,sprite_vert:D0,sprite_frag:I0},ut={common:{diffuse:{value:new re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new re(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},tn={basic:{uniforms:Ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new re(0)},envMapIntensity:{value:1}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new re(0)},specular:{value:new re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Ke([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Ke([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new re(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Ke([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Ke([ut.points,ut.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Ke([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Ke([ut.common,ut.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Ke([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Ke([ut.sprite,ut.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distance:{uniforms:Ke([ut.common,ut.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distance_vert,fragmentShader:$t.distance_frag},shadow:{uniforms:Ke([ut.lights,ut.fog,{color:{value:new re(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};tn.physical={uniforms:Ke([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new re(0)},specularColor:{value:new re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const Ir={r:0,b:0,g:0},U0=new Ee,su=new Xt;su.set(-1,0,0,0,1,0,0,0,1);function N0(s,t,e,n,i,r){const a=new re(0);let o=i===!0?0:1,l,c,h=null,f=0,u=null;function d(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){const x=y.backgroundBlurriness>0;E=t.get(E,x)}return E}function p(y){let E=!1;const x=d(y);x===null?g(a,o):x&&x.isColor&&(g(x,1),E=!0);const S=s.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(y,E){const x=d(E);x&&(x.isCubeTexture||x.mapping===ra)?(c===void 0&&(c=new ge(new sn(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:_s(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(U0.makeRotationFromEuler(E.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(su),c.material.toneMapped=ee.getTransfer(x.colorSpace)!==pe,(h!==x||f!==x.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ge(new Ss(2,2),new mn({name:"BackgroundMaterial",uniforms:_s(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ee.getTransfer(x.colorSpace)!==pe,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,E){y.getRGB(Ir,jh(s)),e.buffers.color.setClear(Ir.r,Ir.g,Ir.b,E,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,E=1){a.set(y),o=E,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:p,addToRenderList:_,dispose:m}}function F0(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(P,D,U,L,O){let V=!1;const z=f(P,L,U,D);r!==z&&(r=z,c(r.object)),V=d(P,L,U,O),V&&p(P,L,U,O),O!==null&&t.update(O,s.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,x(P,D,U,L),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return s.createVertexArray()}function c(P){return s.bindVertexArray(P)}function h(P){return s.deleteVertexArray(P)}function f(P,D,U,L){const O=L.wireframe===!0;let V=n[D.id];V===void 0&&(V={},n[D.id]=V);const z=P.isInstancedMesh===!0?P.id:0;let Y=V[z];Y===void 0&&(Y={},V[z]=Y);let W=Y[U.id];W===void 0&&(W={},Y[U.id]=W);let K=W[O];return K===void 0&&(K=u(l()),W[O]=K),K}function u(P){const D=[],U=[],L=[];for(let O=0;O<e;O++)D[O]=0,U[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:L,object:P,attributes:{},index:null}}function d(P,D,U,L){const O=r.attributes,V=D.attributes;let z=0;const Y=U.getAttributes();for(const W in Y)if(Y[W].location>=0){const j=O[W];let Pt=V[W];if(Pt===void 0&&(W==="instanceMatrix"&&P.instanceMatrix&&(Pt=P.instanceMatrix),W==="instanceColor"&&P.instanceColor&&(Pt=P.instanceColor)),j===void 0||j.attribute!==Pt||Pt&&j.data!==Pt.data)return!0;z++}return r.attributesNum!==z||r.index!==L}function p(P,D,U,L){const O={},V=D.attributes;let z=0;const Y=U.getAttributes();for(const W in Y)if(Y[W].location>=0){let j=V[W];j===void 0&&(W==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),W==="instanceColor"&&P.instanceColor&&(j=P.instanceColor));const Pt={};Pt.attribute=j,j&&j.data&&(Pt.data=j.data),O[W]=Pt,z++}r.attributes=O,r.attributesNum=z,r.index=L}function _(){const P=r.newAttributes;for(let D=0,U=P.length;D<U;D++)P[D]=0}function g(P){m(P,0)}function m(P,D){const U=r.newAttributes,L=r.enabledAttributes,O=r.attributeDivisors;U[P]=1,L[P]===0&&(s.enableVertexAttribArray(P),L[P]=1),O[P]!==D&&(s.vertexAttribDivisor(P,D),O[P]=D)}function y(){const P=r.newAttributes,D=r.enabledAttributes;for(let U=0,L=D.length;U<L;U++)D[U]!==P[U]&&(s.disableVertexAttribArray(U),D[U]=0)}function E(P,D,U,L,O,V,z){z===!0?s.vertexAttribIPointer(P,D,U,O,V):s.vertexAttribPointer(P,D,U,L,O,V)}function x(P,D,U,L){_();const O=L.attributes,V=U.getAttributes(),z=D.defaultAttributeValues;for(const Y in V){const W=V[Y];if(W.location>=0){let K=O[Y];if(K===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(K=P.instanceColor)),K!==void 0){const j=K.normalized,Pt=K.itemSize,Tt=t.get(K);if(Tt===void 0)continue;const oe=Tt.buffer,Jt=Tt.type,ne=Tt.bytesPerElement,J=Jt===s.INT||Jt===s.UNSIGNED_INT||K.gpuType===ac;if(K.isInterleavedBufferAttribute){const et=K.data,_t=et.stride,Bt=K.offset;if(et.isInstancedInterleavedBuffer){for(let St=0;St<W.locationSize;St++)m(W.location+St,et.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let St=0;St<W.locationSize;St++)g(W.location+St);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let St=0;St<W.locationSize;St++)E(W.location+St,Pt/W.locationSize,Jt,j,_t*ne,(Bt+Pt/W.locationSize*St)*ne,J)}else{if(K.isInstancedBufferAttribute){for(let et=0;et<W.locationSize;et++)m(W.location+et,K.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let et=0;et<W.locationSize;et++)g(W.location+et);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let et=0;et<W.locationSize;et++)E(W.location+et,Pt/W.locationSize,Jt,j,Pt*ne,Pt/W.locationSize*et*ne,J)}}else if(z!==void 0){const j=z[Y];if(j!==void 0)switch(j.length){case 2:s.vertexAttrib2fv(W.location,j);break;case 3:s.vertexAttrib3fv(W.location,j);break;case 4:s.vertexAttrib4fv(W.location,j);break;default:s.vertexAttrib1fv(W.location,j)}}}}y()}function S(){w();for(const P in n){const D=n[P];for(const U in D){const L=D[U];for(const O in L){const V=L[O];for(const z in V)h(V[z].object),delete V[z];delete L[O]}}delete n[P]}}function b(P){if(n[P.id]===void 0)return;const D=n[P.id];for(const U in D){const L=D[U];for(const O in L){const V=L[O];for(const z in V)h(V[z].object),delete V[z];delete L[O]}}delete n[P.id]}function A(P){for(const D in n){const U=n[D];for(const L in U){const O=U[L];if(O[P.id]===void 0)continue;const V=O[P.id];for(const z in V)h(V[z].object),delete V[z];delete O[P.id]}}}function v(P){for(const D in n){const U=n[D],L=P.isInstancedMesh===!0?P.id:0,O=U[L];if(O!==void 0){for(const V in O){const z=O[V];for(const Y in z)h(z[Y].object),delete z[Y];delete O[V]}delete U[L],Object.keys(U).length===0&&delete n[D]}}}function w(){I(),a=!0,r!==i&&(r=i,c(r.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:w,resetDefaultState:I,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function O0(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function B0(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==bn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===Gn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==fn&&A!==In&&!v&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Ot("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ot("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=s.getParameter(s.MAX_SAMPLES),b=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:x,maxSamples:S,samples:b}}function z0(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new $n,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){const p=f.clippingPlanes,_=f.clipIntersection,g=f.clipShadows,m=s.get(f);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,E=y*4;let x=m.clippingState||null;l.value=x,x=h(p,u,E,d);for(let S=0;S!==E;++S)x[S]=e[S];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,p){const _=f!==null?f.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=d+_*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,x=d;E!==_;++E,x+=4)a.copy(f[E]).applyMatrix4(y,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}const cs=4,G0=6,V0=20,H0=256,Ls=new eu,wl=new re;let qa=null,Ya=0,Za=0,$a=!1;const k0=new R,Ti=new R;class Al{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=k0}=r;qa=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),Za=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(qa,Ya,Za),this._renderer.xr.enabled=$a,t.scissorTest=!1,ss(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Di||t.mapping===ds?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qa=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),Za=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qe,minFilter:qe,generateMipmaps:!1,type:Gn,format:bn,colorSpace:Jr,depthBuffer:!1},i=Rl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rl(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=W0(r)),this._blurMaterial=q0(r,t,e),this._ggxMaterial=X0(r,t,e)}return i}_compileMaterial(t){const e=new ge(new be,t);this._renderer.compile(e,Ls)}_sceneToCubeUV(t,e,n,i,r){const l=new on(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(wl),f.toneMapping=On,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(i),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ge(new sn,new Vn({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const y=t.background;y?y.isColor&&(g.color.copy(y),t.background=null,m=!0):(g.color.copy(wl),m=!0);for(let E=0;E<6;E++){const x=E%3;x===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):x===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const S=this._cubeSize;ss(i,x*S,E>2?S:0,S,S),f.setRenderTarget(i),m&&f.render(_,l),f.render(t,l)}f.toneMapping=d,f.autoClear=u,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Di||t.mapping===ds;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ss(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ls)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=c*1.25,d=f*u,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-cs?n-p+cs:0),m=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=p-e,ss(r,g,m,3*_,2*_),i.setRenderTarget(r),i.render(o,Ls),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,ss(t,g,m,3*_,2*_),i.setRenderTarget(t),i.render(o,Ls)}_blur(t,e,n,i){const r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,i,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;const c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const h=this._sizeLods[i],f=3*h*(i>this._lodMax-cs?i-this._lodMax+cs:0),u=4*(this._cubeSize-h);ss(e,f,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Ls)}}function W0(s){const t=[],e=[];let n=s;const i=s-cs+1+G0;for(let r=0;r<i;r++){const a=Math.pow(2,n);t.push(a);const o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,d=3,p=new Float32Array(d*u*f),_=new Float32Array(d*u*f);for(let m=0;m<f;m++){const y=m%3*2/3-1,E=m>2?0:-1,x=[y,E,0,y+2/3,E,0,y+2/3,E+1,0,y,E,0,y+2/3,E+1,0,y,E+1,0];p.set(x,d*u*m);for(let S=0;S<u;S++){const b=h[S*2]*2-1,A=h[S*2+1]*2-1;m===0?Ti.set(1,A,b):m===1?Ti.set(-b,1,-A):m===2?Ti.set(-b,A,1):m===3?Ti.set(-1,A,-b):m===4?Ti.set(-b,-1,A):Ti.set(b,A,-1),Ti.toArray(_,(m*u+S)*d)}}const g=new be;g.setAttribute("position",new pn(p,d)),g.setAttribute("outputDirection",new pn(_,d)),e.push(new ge(g,null)),n>cs&&n--}return{lodMeshes:e,sizeLods:t}}function Rl(s,t,e){const n=new En(s,t,e);return n.texture.mapping=ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ss(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function X0(s,t,e){return new mn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:H0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:la(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function q0(s,t,e){return new mn({name:"SphericalGaussianBlur",defines:{SAMPLES:V0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:la(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Cl(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:la(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Pl(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function la(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class ru extends En{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Hh(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new sn(5,5,5),r=new mn({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:ti});r.uniforms.tEquirect.value=e;const a=new ge(i,r),o=e.minFilter;return e.minFilter===Ai&&(e.minFilter=qe),new Xd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}function Y0(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===ma||d===ga)if(t.has(u)){const p=t.get(u).texture;return o(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const _=new ru(p.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const d=u.mapping,p=d===ma||d===ga,_=d===Di||d===ds;if(p||_){let g=e.get(u);const m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Al(s)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{const y=u.image;return p&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new Al(s)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===ma?u.mapping=Di:d===ga&&(u.mapping=ds),u}function l(u){let d=0;const p=6;for(let _=0;_<p;_++)u[_]!==void 0&&d++;return d===p}function c(u){const d=u.target;d.removeEventListener("dispose",c);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function Z0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&hs("WebGLRenderer: "+n+" extension not supported."),i}}}function $0(s,t,e,n){const i={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete i[u.id];const d=r.get(u);d&&(t.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function l(f){const u=f.attributes;for(const d in u)t.update(u[d],s.ARRAY_BUFFER)}function c(f){const u=[],d=f.index,p=f.attributes.position;let _=0;if(p===void 0)return;if(d!==null){const y=d.array;_=d.version;for(let E=0,x=y.length;E<x;E+=3){const S=y[E+0],b=y[E+1],A=y[E+2];u.push(S,b,b,A,A,S)}}else{const y=p.array;_=p.version;for(let E=0,x=y.length/3-1;E<x;E+=3){const S=E+0,b=E+1,A=E+2;u.push(S,b,b,A,A,S)}}const g=new(p.count>=65535?Oh:Fh)(u,1);g.version=_;const m=r.get(f);m&&t.remove(m),r.set(f,g)}function h(f){const u=r.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function J0(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){s.drawElements(n,u,r,f*a),e.update(u,n,1)}function c(f,u,d){d!==0&&(s.drawElementsInstanced(n,u,r,f*a,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function K0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:te("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Q0(s,t,e){const n=new WeakMap,i=new xe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let w=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let E=0;d===!0&&(E=1),p===!0&&(E=2),_===!0&&(E=3);let x=o.attributes.position.count*E,S=1;x>t.maxTextureSize&&(S=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const b=new Float32Array(x*S*4*f),A=new Ih(b,x,S,f);A.type=In,A.needsUpdate=!0;const v=E*4;for(let I=0;I<f;I++){const P=g[I],D=m[I],U=y[I],L=x*S*4*I;for(let O=0;O<P.count;O++){const V=O*v;d===!0&&(i.fromBufferAttribute(P,O),b[L+V+0]=i.x,b[L+V+1]=i.y,b[L+V+2]=i.z,b[L+V+3]=0),p===!0&&(i.fromBufferAttribute(D,O),b[L+V+4]=i.x,b[L+V+5]=i.y,b[L+V+6]=i.z,b[L+V+7]=0),_===!0&&(i.fromBufferAttribute(U,O),b[L+V+8]=i.x,b[L+V+9]=i.y,b[L+V+10]=i.z,b[L+V+11]=U.itemSize===4?i.w:1)}}u={count:f,texture:A,size:new ct(x,S)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function j0(s,t,e,n,i){let r=new WeakMap;function a(c){const h=i.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const tg={[gh]:"LINEAR_TONE_MAPPING",[_h]:"REINHARD_TONE_MAPPING",[vh]:"CINEON_TONE_MAPPING",[xh]:"ACES_FILMIC_TONE_MAPPING",[Sh]:"AGX_TONE_MAPPING",[yh]:"NEUTRAL_TONE_MAPPING",[Mh]:"CUSTOM_TONE_MAPPING"};function eg(s,t,e,n,i,r){const a=new En(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new be;c.setAttribute("position",new ae([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ae([0,2,0,0,2,0],2));const h=new Vd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new ge(c,h),u=new eu(-1,1,1,-1,0,1);let d=null,p=null,_=!1,g,m=null,y=[],E=!1;this.setSize=function(x,S){a.setSize(x,S),o!==null&&o.setSize(x,S),l!==null&&l.setSize(x,S);for(let b=0;b<y.length;b++){const A=y[b];A.setSize&&A.setSize(x,S)}},this.setEffects=function(x){y=x,E=y.length>0&&y[0].isRenderPass===!0;const S=a.width,b=a.height;y.length>0&&o===null&&(o=new En(S,b,{type:Gn,depthBuffer:!1,stencilBuffer:!1}),l=new En(S,b,{type:Gn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<y.length;A++){const v=y[A];v.setSize&&v.setSize(S,b)}},this.begin=function(x,S){if(_||x.toneMapping===On&&y.length===0)return!1;if(m=S,S!==null){const b=S.width,A=S.height;(a.width!==b||a.height!==A)&&this.setSize(b,A)}return E===!1&&x.setRenderTarget(a),g=x.toneMapping,x.toneMapping=On,!0},this.hasRenderPass=function(){return E},this.end=function(x,S){x.toneMapping=g,_=!0;let b=a,A=o;for(let v=0;v<y.length;v++){const w=y[v];w.enabled!==!1&&(w.render(x,A,b,S),w.needsSwap!==!1&&(b=A,A=A===o?l:o))}if(d!==x.outputColorSpace||p!==x.toneMapping){d=x.outputColorSpace,p=x.toneMapping,h.defines={},ee.getTransfer(d)===pe&&(h.defines.SRGB_TRANSFER="");const v=tg[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(m),x.render(f,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}const au=new Ze,tc=new Js(1,1),ou=new Ih,cu=new Bf,lu=new Hh,Ll=[],Dl=[],Il=new Float32Array(16),Ul=new Float32Array(9),Nl=new Float32Array(4);function ys(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Ll[i];if(r===void 0&&(r=new Float32Array(i),Ll[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Le(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function De(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ha(s,t){let e=Dl[t];e===void 0&&(e=new Int32Array(t),Dl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function ng(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ig(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;s.uniform2fv(this.addr,t),De(e,t)}}function sg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;s.uniform3fv(this.addr,t),De(e,t)}}function rg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;s.uniform4fv(this.addr,t),De(e,t)}}function ag(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Nl.set(n),s.uniformMatrix2fv(this.addr,!1,Nl),De(e,n)}}function og(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Ul.set(n),s.uniformMatrix3fv(this.addr,!1,Ul),De(e,n)}}function cg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Il.set(n),s.uniformMatrix4fv(this.addr,!1,Il),De(e,n)}}function lg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;s.uniform2iv(this.addr,t),De(e,t)}}function ug(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;s.uniform3iv(this.addr,t),De(e,t)}}function fg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;s.uniform4iv(this.addr,t),De(e,t)}}function dg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function pg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;s.uniform2uiv(this.addr,t),De(e,t)}}function mg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;s.uniform3uiv(this.addr,t),De(e,t)}}function gg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;s.uniform4uiv(this.addr,t),De(e,t)}}function _g(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(tc.compareFunction=e.isReversedDepthBuffer()?dc:fc,r=tc):r=au,e.setTexture2D(t||r,i)}function vg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||cu,i)}function xg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||lu,i)}function Mg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||ou,i)}function Sg(s){switch(s){case 5126:return ng;case 35664:return ig;case 35665:return sg;case 35666:return rg;case 35674:return ag;case 35675:return og;case 35676:return cg;case 5124:case 35670:return lg;case 35667:case 35671:return hg;case 35668:case 35672:return ug;case 35669:case 35673:return fg;case 5125:return dg;case 36294:return pg;case 36295:return mg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return _g;case 35679:case 36299:case 36307:return vg;case 35680:case 36300:case 36308:case 36293:return xg;case 36289:case 36303:case 36311:case 36292:return Mg}}function yg(s,t){s.uniform1fv(this.addr,t)}function bg(s,t){const e=ys(t,this.size,2);s.uniform2fv(this.addr,e)}function Eg(s,t){const e=ys(t,this.size,3);s.uniform3fv(this.addr,e)}function Tg(s,t){const e=ys(t,this.size,4);s.uniform4fv(this.addr,e)}function wg(s,t){const e=ys(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ag(s,t){const e=ys(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Rg(s,t){const e=ys(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Cg(s,t){s.uniform1iv(this.addr,t)}function Pg(s,t){s.uniform2iv(this.addr,t)}function Lg(s,t){s.uniform3iv(this.addr,t)}function Dg(s,t){s.uniform4iv(this.addr,t)}function Ig(s,t){s.uniform1uiv(this.addr,t)}function Ug(s,t){s.uniform2uiv(this.addr,t)}function Ng(s,t){s.uniform3uiv(this.addr,t)}function Fg(s,t){s.uniform4uiv(this.addr,t)}function Og(s,t,e){const n=this.cache,i=t.length,r=ha(e,i);Le(n,r)||(s.uniform1iv(this.addr,r),De(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=tc:a=au;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function Bg(s,t,e){const n=this.cache,i=t.length,r=ha(e,i);Le(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||cu,r[a])}function zg(s,t,e){const n=this.cache,i=t.length,r=ha(e,i);Le(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||lu,r[a])}function Gg(s,t,e){const n=this.cache,i=t.length,r=ha(e,i);Le(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||ou,r[a])}function Vg(s){switch(s){case 5126:return yg;case 35664:return bg;case 35665:return Eg;case 35666:return Tg;case 35674:return wg;case 35675:return Ag;case 35676:return Rg;case 5124:case 35670:return Cg;case 35667:case 35671:return Pg;case 35668:case 35672:return Lg;case 35669:case 35673:return Dg;case 5125:return Ig;case 36294:return Ug;case 36295:return Ng;case 36296:return Fg;case 35678:case 36198:case 36298:case 36306:case 35682:return Og;case 35679:case 36299:case 36307:return Bg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Gg}}class Hg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Sg(e.type)}}class kg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Vg(e.type)}}class Wg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Ja=/(\w+)(\])?(\[|\.)?/g;function Fl(s,t){s.seq.push(t),s.map[t.id]=t}function Xg(s,t,e){const n=s.name,i=n.length;for(Ja.lastIndex=0;;){const r=Ja.exec(n),a=Ja.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Fl(e,c===void 0?new Hg(o,s,t):new kg(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new Wg(o),Fl(e,f)),e=f}}}class Yr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Xg(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Ol(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const qg=37297;let Yg=0;function Zg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Bl=new Xt;function $g(s){ee._getMatrix(Bl,ee.workingColorSpace,s);const t=`mat3( ${Bl.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(s)){case Kr:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return Ot("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function zl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Zg(s.getShaderSource(t),o)}else return r}function Jg(s,t){const e=$g(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Kg={[gh]:"Linear",[_h]:"Reinhard",[vh]:"Cineon",[xh]:"ACESFilmic",[Sh]:"AgX",[yh]:"Neutral",[Mh]:"Custom"};function Qg(s,t){const e=Kg[t];return e===void 0?(Ot("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ur=new R;function jg(){ee.getLuminanceCoefficients(Ur);const s=Ur.x.toFixed(4),t=Ur.y.toFixed(4),e=Ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function t_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bs).join(`
`)}function e_(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function n_(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Bs(s){return s!==""}function Gl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const i_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ec(s){return s.replace(i_,r_)}const s_=new Map;function r_(s,t){let e=$t[t];if(e===void 0){const n=s_.get(t);if(n!==void 0)e=$t[n],Ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ec(e)}const a_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(s){return s.replace(a_,o_)}function o_(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function kl(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}const c_={[Vr]:"SHADOWMAP_TYPE_PCF",[Fs]:"SHADOWMAP_TYPE_VSM"};function l_(s){return c_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const h_={[Di]:"ENVMAP_TYPE_CUBE",[ds]:"ENVMAP_TYPE_CUBE",[ra]:"ENVMAP_TYPE_CUBE_UV"};function u_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":h_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const f_={[ds]:"ENVMAP_MODE_REFRACTION"};function d_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":f_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const p_={[mh]:"ENVMAP_BLENDING_MULTIPLY",[tf]:"ENVMAP_BLENDING_MIX",[ef]:"ENVMAP_BLENDING_ADD"};function m_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":p_[s.combine]||"ENVMAP_BLENDING_NONE"}function g_(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function __(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=l_(e),c=u_(e),h=d_(e),f=m_(e),u=g_(e),d=t_(e),p=e_(r),_=i.createProgram();let g,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Bs).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Bs).join(`
`),m.length>0&&(m+=`
`)):(g=[kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bs).join(`
`),m=[kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==On?"#define TONE_MAPPING":"",e.toneMapping!==On?$t.tonemapping_pars_fragment:"",e.toneMapping!==On?Qg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,Jg("linearToOutputTexel",e.outputColorSpace),jg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Bs).join(`
`)),a=ec(a),a=Gl(a,e),a=Vl(a,e),o=ec(o),o=Gl(o,e),o=Vl(o,e),a=Hl(a),o=Hl(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=y+g+a,x=y+m+o,S=Ol(i,i.VERTEX_SHADER,E),b=Ol(i,i.FRAGMENT_SHADER,x);i.attachShader(_,S),i.attachShader(_,b),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(P){if(s.debug.checkShaderErrors){const D=i.getProgramInfoLog(_)||"",U=i.getShaderInfoLog(S)||"",L=i.getShaderInfoLog(b)||"",O=D.trim(),V=U.trim(),z=L.trim();let Y=!0,W=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,S,b);else{const K=zl(i,S,"vertex"),j=zl(i,b,"fragment");te("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+K+`
`+j)}else O!==""?Ot("WebGLProgram: Program Info Log:",O):(V===""||z==="")&&(W=!1);W&&(P.diagnostics={runnable:Y,programLog:O,vertexShader:{log:V,prefix:g},fragmentShader:{log:z,prefix:m}})}i.deleteShader(S),i.deleteShader(b),v=new Yr(i,_),w=n_(i,_)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(_,qg)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=b,this}let v_=0;class x_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new M_(t),e.set(t,n)),n}}class M_{constructor(t){this.id=v_++,this.code=t,this.usedTimes=0}}function S_(s){return s===Ii||s===Zr||s===$r}function y_(s,t,e,n,i,r){const a=new aa,o=new x_,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,w,I,P,D,U){const L=P.fog,O=D.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,Y=t.get(v.envMap||V,z),W=Y&&Y.mapping===ra?Y.image.height:null,K=d[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Ot("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const j=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Pt=j!==void 0?j.length:0;let Tt=0;O.morphAttributes.position!==void 0&&(Tt=1),O.morphAttributes.normal!==void 0&&(Tt=2),O.morphAttributes.color!==void 0&&(Tt=3);let oe,Jt,ne,J;if(K){const Me=tn[K];oe=Me.vertexShader,Jt=Me.fragmentShader}else{oe=v.vertexShader,Jt=v.fragmentShader;const Me=o.getVertexShaderStage(v),he=o.getFragmentShaderStage(v);o.update(v,Me,he),ne=Me.id,J=he.id}const et=s.getRenderTarget(),_t=s.state.buffers.depth.getReversed(),Bt=D.isInstancedMesh===!0,St=D.isBatchedMesh===!0,zt=!!v.map,de=!!v.matcap,nt=!!Y,st=!!v.aoMap,rt=!!v.lightMap,at=!!v.bumpMap&&v.wireframe===!1,ht=!!v.normalMap,Nt=!!v.displacementMap,Ut=!!v.emissiveMap,Gt=!!v.metalnessMap,kt=!!v.roughnessMap,N=v.anisotropy>0,le=v.clearcoat>0,Kt=v.dispersion>0,C=v.retroreflectivity>0,M=v.iridescence>0,G=v.sheen>0,X=v.transmission>0,Z=N&&!!v.anisotropyMap,ot=le&&!!v.clearcoatMap,lt=le&&!!v.clearcoatNormalMap,$=le&&!!v.clearcoatRoughnessMap,tt=M&&!!v.iridescenceMap,ft=M&&!!v.iridescenceThicknessMap,Lt=G&&!!v.sheenColorMap,gt=G&&!!v.sheenRoughnessMap,dt=!!v.specularMap,Dt=!!v.specularColorMap,Ft=!!v.specularIntensityMap,Yt=X&&!!v.transmissionMap,B=X&&!!v.thicknessMap,pt=!!v.gradientMap,Q=!!v.alphaMap,mt=v.alphaTest>0,Mt=!!v.alphaHash,it=!!v.extensions;let It=On;v.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(It=s.toneMapping);const Rt={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:oe,fragmentShader:Jt,defines:v.defines,customVertexShaderID:ne,customFragmentShaderID:J,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:St,batchingColor:St&&D._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&D.instanceColor!==null,instancingMorph:Bt&&D.morphTexture!==null,outputColorSpace:et===null?s.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:ee.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:zt,matcap:de,envMap:nt,envMapMode:nt&&Y.mapping,envMapCubeUVHeight:W,aoMap:st,lightMap:rt,bumpMap:at,normalMap:ht,displacementMap:Nt,emissiveMap:Ut,normalMapObjectSpace:ht&&v.normalMapType===rf,normalMapTangentSpace:ht&&v.normalMapType===Vc,packedNormalMap:ht&&v.normalMapType===Vc&&S_(v.normalMap.format),metalnessMap:Gt,roughnessMap:kt,anisotropy:N,anisotropyMap:Z,clearcoat:le,clearcoatMap:ot,clearcoatNormalMap:lt,clearcoatRoughnessMap:$,dispersion:Kt,retroreflection:C,iridescence:M,iridescenceMap:tt,iridescenceThicknessMap:ft,sheen:G,sheenColorMap:Lt,sheenRoughnessMap:gt,specularMap:dt,specularColorMap:Dt,specularIntensityMap:Ft,transmission:X,transmissionMap:Yt,thicknessMap:B,gradientMap:pt,opaque:v.transparent===!1&&v.blending===Vs&&v.alphaToCoverage===!1,alphaMap:Q,alphaTest:mt,alphaHash:Mt,combine:v.combine,mapUv:zt&&p(v.map.channel),aoMapUv:st&&p(v.aoMap.channel),lightMapUv:rt&&p(v.lightMap.channel),bumpMapUv:at&&p(v.bumpMap.channel),normalMapUv:ht&&p(v.normalMap.channel),displacementMapUv:Nt&&p(v.displacementMap.channel),emissiveMapUv:Ut&&p(v.emissiveMap.channel),metalnessMapUv:Gt&&p(v.metalnessMap.channel),roughnessMapUv:kt&&p(v.roughnessMap.channel),anisotropyMapUv:Z&&p(v.anisotropyMap.channel),clearcoatMapUv:ot&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:lt&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:gt&&p(v.sheenRoughnessMap.channel),specularMapUv:dt&&p(v.specularMap.channel),specularColorMapUv:Dt&&p(v.specularColorMap.channel),specularIntensityMapUv:Ft&&p(v.specularIntensityMap.channel),transmissionMapUv:Yt&&p(v.transmissionMap.channel),thicknessMapUv:B&&p(v.thicknessMap.channel),alphaMapUv:Q&&p(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ht||N),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!O.attributes.uv&&(zt||Q),fog:!!L,useFog:v.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&ht===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:_t,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:Tt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:It,decodeVideoTexture:zt&&v.map.isVideoTexture===!0&&ee.getTransfer(v.map.colorSpace)===pe,decodeVideoTextureEmissive:Ut&&v.emissiveMap.isVideoTexture===!0&&ee.getTransfer(v.emissiveMap.colorSpace)===pe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===un,flipSided:v.side===Ye,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:it&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&v.extensions.multiDraw===!0||St)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Rt.vertexUv1s=l.has(1),Rt.vertexUv2s=l.has(2),Rt.vertexUv3s=l.has(3),l.clear(),Rt}function g(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)w.push(I),w.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(m(w,v),y(w,v),w.push(s.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function m(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numSunLights),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numSunLightShadows),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function y(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function E(v){const w=d[v.type];let I;if(w){const P=tn[w];I=Mc.clone(P.uniforms)}else I=v.uniforms;return I}function x(v,w){let I=h.get(w);return I!==void 0?++I.usedTimes:(I=new __(s,w,v,i),c.push(I),h.set(w,I)),I}function S(v){if(--v.usedTimes===0){const w=c.indexOf(v);c[w]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function A(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:E,acquireProgram:x,releaseProgram:S,releaseShaderCache:b,programs:c,dispose:A}}function b_(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function E_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Wl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Xl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,p,_,g,m){let y=s[t];return y===void 0?(y={id:u.id,object:u,geometry:d,material:p,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},s[t]=y):(y.id=u.id,y.object=u,y.geometry=d,y.material=p,y.materialVariant=a(u),y.groupOrder=_,y.renderOrder=u.renderOrder,y.z=g,y.group=m),t++,y}function l(u,d,p,_,g,m,y){y.reversedDepth===!0&&(g=-g);const E=o(u,d,p,_,g,m);p.transmission>0?n.push(E):p.transparent===!0?i.push(E):e.push(E)}function c(u,d,p,_,g,m){const y=o(u,d,p,_,g,m);p.transmission>0?n.unshift(y):p.transparent===!0?i.unshift(y):e.unshift(y)}function h(u,d){e.length>1&&e.sort(u||E_),n.length>1&&n.sort(d||Wl),i.length>1&&i.sort(d||Wl)}function f(){for(let u=t,d=s.length;u<d;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:f,sort:h}}function T_(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Xl,s.set(n,[a])):i>=r.length?(a=new Xl,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function w_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new R,color:new re};break;case"SpotLight":e={position:new R,direction:new R,color:new re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new re,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new re,groundColor:new re};break;case"RectAreaLight":e={color:new re,position:new R,halfWidth:new R,halfHeight:new R};break}return s[t.id]=e,e}}}function A_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let R_=0;function C_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function P_(s){const t=new w_,e=A_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const i=new R,r=new Ee,a=new Ee;function o(c){let h=0,f=0,u=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let d=0,p=0,_=0,g=0,m=0,y=0,E=0,x=0,S=0,b=0,A=0,v=0,w=0,I=0;c.sort(C_);for(let D=0,U=c.length;D<U;D++){const L=c[D],O=L.color,V=L.intensity,z=L.distance;let Y=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ii?Y=L.shadow.map.texture:Y=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=O.r*V,f+=O.g*V,u+=O.b*V;else if(L.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(L.sh.coefficients[W],V);I++}else if(L.isSunLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,j=e.get(L);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[p]=j,n.sunShadowMap[p]=Y;const Pt=K.getViewportCount();for(let Tt=0;Tt<Pt;Tt++)n.sunShadowMatrix[_+Tt]=K.getMatrix(Tt),n.sunShadowCascade[_+Tt]=K._cascadeData[Tt];_+=Pt,p++}n.sun[d]=W,d++}else if(L.isDirectionalLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,j=e.get(L);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,n.directionalShadow[g]=j,n.directionalShadowMap[g]=Y,n.directionalShadowMatrix[g]=L.shadow.matrix,S++}n.directional[g]=W,g++}else if(L.isSpotLight){const W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(O).multiplyScalar(V),W.distance=z,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,n.spot[y]=W;const K=L.shadow;if(L.map&&(n.spotLightMap[v]=L.map,v++,K.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[y]=K.matrix,L.castShadow){const j=e.get(L);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,n.spotShadow[y]=j,n.spotShadowMap[y]=Y,A++}y++}else if(L.isRectAreaLight){const W=t.get(L);W.color.copy(O).multiplyScalar(V),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),n.rectArea[E]=W,E++}else if(L.isPointLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const K=L.shadow,j=e.get(L);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,j.shadowCameraNear=K.camera.near,j.shadowCameraFar=K.camera.far,n.pointShadow[m]=j,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=L.shadow.matrix,b++}n.point[m]=W,m++}else if(L.isHemisphereLight){const W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(V),W.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[x]=W,x++}}E>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const P=n.hash;(P.sunLength!==d||P.directionalLength!==g||P.pointLength!==m||P.spotLength!==y||P.rectAreaLength!==E||P.hemiLength!==x||P.numSunShadows!==p||P.numDirectionalShadows!==S||P.numPointShadows!==b||P.numSpotShadows!==A||P.numSpotMaps!==v||P.numLightProbes!==I)&&(n.sun.length=d,n.directional.length=g,n.spot.length=y,n.rectArea.length=E,n.point.length=m,n.hemi.length=x,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+v-w,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=I,P.sunLength=d,P.directionalLength=g,P.pointLength=m,P.spotLength=y,P.rectAreaLength=E,P.hemiLength=x,P.numSunShadows=p,P.numDirectionalShadows=S,P.numPointShadows=b,P.numSpotShadows=A,P.numSpotMaps=v,P.numLightProbes=I,n.version=R_++)}function l(c,h){let f=0,u=0,d=0,p=0,_=0,g=0;const m=h.matrixWorldInverse;for(let y=0,E=c.length;y<E;y++){const x=c[y];if(x.isSunLight){const S=n.sun[f];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(m),f++}else if(x.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),u++}else if(x.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const S=n.rectArea[_];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const S=n.hemi[g];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function ql(s){const t=new P_(s),e=[],n=[],i=[];function r(u){f.camera=u,e.length=0,n.length=0,i.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){i.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}const f={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function L_(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new ql(s),t.set(i,[o])):r>=a.length?(o=new ql(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const D_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,I_=`uniform sampler2D shadow_pass;
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
}`,U_=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],N_=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Yl=new Ee,Ds=new R,Ka=new R;function F_(s,t,e){let n=new Gh;const i=new ct,r=new ct,a=new xe,o=new Hd,l=new kd,c={},h=e.maxTextureSize,f={[Li]:Ye,[Ye]:Li,[un]:un},u=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:D_,fragmentShader:I_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const p=new be;p.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ge(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vr;let m=this.type;this.render=function(b,A,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===Nu&&(Ot("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Vr);const w=s.getRenderTarget(),I=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),D=s.state;D.setBlending(ti),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=m!==this.type;U&&A.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=b.length;L<O;L++){const V=b[L],z=V.shadow;if(z===void 0){Ot("WebGLShadowMap:",V,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const Y=z.getFrameExtents();i.multiply(Y),r.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,z.mapSize.y=r.y));const W=s.state.buffers.depth.getReversed();if(z.camera._reversedDepth=W,z.map===null||U===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Fs){if(V.isPointLight){Ot("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new En(i.x,i.y,{format:Ii,type:Gn,minFilter:qe,magFilter:qe,generateMipmaps:!1}),z.map.texture.name=V.name+".shadowMap",z.map.depthTexture=new Js(i.x,i.y,In),z.map.depthTexture.name=V.name+".shadowMapDepth",z.map.depthTexture.format=ii,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ge,z.map.depthTexture.magFilter=Ge}else V.isPointLight?(z.map=new ru(i.x),z.map.depthTexture=new nd(i.x,zn)):(z.map=new En(i.x,i.y),z.map.depthTexture=new Js(i.x,i.y,zn)),z.map.depthTexture.name=V.name+".shadowMap",z.map.depthTexture.format=ii,this.type===Vr?(z.map.depthTexture.compareFunction=W?dc:fc,z.map.depthTexture.minFilter=qe,z.map.depthTexture.magFilter=qe):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ge,z.map.depthTexture.magFilter=Ge);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==i.x||z.map.height!==i.y)&&z.map.setSize(i.x,i.y);const K=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();V.isPointLight!==!0&&z.updateMatrices(V,v);for(let j=0;j<K;j++){const Pt=z.getCamera(j);if(V.isPointLight){const Tt=z.camera,oe=z.matrix,Jt=V.distance||Tt.far;Jt!==Tt.far&&(Tt.far=Jt,Tt.updateProjectionMatrix()),Ds.setFromMatrixPosition(V.matrixWorld),Tt.position.copy(Ds),Ka.copy(Tt.position),Ka.add(U_[j]),Tt.up.copy(N_[j]),Tt.lookAt(Ka),Tt.updateMatrixWorld(),oe.makeTranslation(-Ds.x,-Ds.y,-Ds.z),Yl.multiplyMatrices(Tt.projectionMatrix,Tt.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Yl,Tt.coordinateSystem,Tt.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)s.setRenderTarget(z.map,j),s.clear();else{j===0&&(s.setRenderTarget(z.map),s.clear());const Tt=z.getViewport(j);a.set(r.x*Tt.x,r.y*Tt.y,r.x*Tt.z,r.y*Tt.w),D.viewport(a)}n=z.getFrustum(j),x(A,v,Pt,V,this.type)}z.isPointLightShadow!==!0&&this.type===Fs&&y(z,v),z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(w,I,P)};function y(b,A){const v=t.update(_);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new En(i.x,i.y,{format:Ii,type:Gn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(A,null,v,u,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(A,null,v,d,_,null)}function E(b,A,v,w){let I=null;const P=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)I=P;else if(I=v.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const D=I.uuid,U=A.uuid;let L=c[D];L===void 0&&(L={},c[D]=L);let O=L[U];O===void 0&&(O=I.clone(),L[U]=O,A.addEventListener("dispose",S)),I=O}if(I.visible=A.visible,I.wireframe=A.wireframe,w===Fs?I.side=A.shadowSide!==null?A.shadowSide:A.side:I.side=A.shadowSide!==null?A.shadowSide:f[A.side],I.alphaMap=A.alphaMap,I.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,I.map=A.map,I.clipShadows=A.clipShadows,I.clippingPlanes=A.clippingPlanes,I.clipIntersection=A.clipIntersection,I.displacementMap=A.displacementMap,I.displacementScale=A.displacementScale,I.displacementBias=A.displacementBias,I.wireframeLinewidth=A.wireframeLinewidth,I.linewidth=A.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const D=s.properties.get(I);D.light=v}return I}function x(b,A,v,w,I){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&I===Fs)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const U=t.update(b),L=b.material;if(Array.isArray(L)){const O=U.groups;for(let V=0,z=O.length;V<z;V++){const Y=O[V],W=L[Y.materialIndex];if(W&&W.visible){const K=E(b,W,w,I);b.onBeforeShadow(s,b,A,v,U,K,Y),s.renderBufferDirect(v,null,U,K,b,Y),b.onAfterShadow(s,b,A,v,U,K,Y)}}}else if(L.visible){const O=E(b,L,w,I);b.onBeforeShadow(s,b,A,v,U,O,null),s.renderBufferDirect(v,null,U,O,b,null),b.onAfterShadow(s,b,A,v,U,O,null)}}const D=b.children;for(let U=0,L=D.length;U<L;U++)x(D[U],A,v,w,I)}function S(b){b.target.removeEventListener("dispose",S);for(const v in c){const w=c[v],I=b.target.uuid;I in w&&(w[I].dispose(),delete w[I])}}}function O_(s,t){function e(){let B=!1;const pt=new xe;let Q=null;const mt=new xe(0,0,0,0);return{setMask:function(Mt){Q!==Mt&&!B&&(s.colorMask(Mt,Mt,Mt,Mt),Q=Mt)},setLocked:function(Mt){B=Mt},setClear:function(Mt,it,It,Rt,Me){Me===!0&&(Mt*=Rt,it*=Rt,It*=Rt),pt.set(Mt,it,It,Rt),mt.equals(pt)===!1&&(s.clearColor(Mt,it,It,Rt),mt.copy(pt))},reset:function(){B=!1,Q=null,mt.set(-1,0,0,0)}}}function n(){let B=!1,pt=!1,Q=null,mt=null,Mt=null;return{setReversed:function(it){if(pt!==it){const It=t.get("EXT_clip_control");it?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),pt=it;const Rt=Mt;Mt=null,this.setClear(Rt)}},getReversed:function(){return pt},setTest:function(it){it?et(s.DEPTH_TEST):_t(s.DEPTH_TEST)},setMask:function(it){Q!==it&&!B&&(s.depthMask(it),Q=it)},setFunc:function(it){if(pt&&(it=gf[it]),mt!==it){switch(it){case oo:s.depthFunc(s.NEVER);break;case co:s.depthFunc(s.ALWAYS);break;case lo:s.depthFunc(s.LESS);break;case qs:s.depthFunc(s.LEQUAL);break;case ho:s.depthFunc(s.EQUAL);break;case uo:s.depthFunc(s.GEQUAL);break;case fo:s.depthFunc(s.GREATER);break;case po:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}mt=it}},setLocked:function(it){B=it},setClear:function(it){Mt!==it&&(Mt=it,pt&&(it=1-it),s.clearDepth(it))},reset:function(){B=!1,Q=null,mt=null,Mt=null,pt=!1}}}function i(){let B=!1,pt=null,Q=null,mt=null,Mt=null,it=null,It=null,Rt=null,Me=null;return{setTest:function(he){B||(he?et(s.STENCIL_TEST):_t(s.STENCIL_TEST))},setMask:function(he){pt!==he&&!B&&(s.stencilMask(he),pt=he)},setFunc:function(he,gn,wn){(Q!==he||mt!==gn||Mt!==wn)&&(s.stencilFunc(he,gn,wn),Q=he,mt=gn,Mt=wn)},setOp:function(he,gn,wn){(it!==he||It!==gn||Rt!==wn)&&(s.stencilOp(he,gn,wn),it=he,It=gn,Rt=wn)},setLocked:function(he){B=he},setClear:function(he){Me!==he&&(s.clearStencil(he),Me=he)},reset:function(){B=!1,pt=null,Q=null,mt=null,Mt=null,it=null,It=null,Rt=null,Me=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},f={},u={},d=new WeakMap,p=[],_=null,g=!1,m=null,y=null,E=null,x=null,S=null,b=null,A=null,v=new re(0,0,0),w=0,I=!1,P=null,D=null,U=null,L=null,O=null;const V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Y=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(W)[1]),z=Y>=1):W.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),z=Y>=2);let K=null,j={};const Pt=s.getParameter(s.SCISSOR_BOX),Tt=s.getParameter(s.VIEWPORT),oe=new xe().fromArray(Pt),Jt=new xe().fromArray(Tt);function ne(B,pt,Q,mt){const Mt=new Uint8Array(4),it=s.createTexture();s.bindTexture(B,it),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let It=0;It<Q;It++)B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY?s.texImage3D(pt,0,s.RGBA,1,1,mt,0,s.RGBA,s.UNSIGNED_BYTE,Mt):s.texImage2D(pt+It,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Mt);return it}const J={};J[s.TEXTURE_2D]=ne(s.TEXTURE_2D,s.TEXTURE_2D,1),J[s.TEXTURE_CUBE_MAP]=ne(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[s.TEXTURE_2D_ARRAY]=ne(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),J[s.TEXTURE_3D]=ne(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(s.DEPTH_TEST),a.setFunc(qs),at(!1),ht(Oc),et(s.CULL_FACE),st(ti);function et(B){h[B]!==!0&&(s.enable(B),h[B]=!0)}function _t(B){h[B]!==!1&&(s.disable(B),h[B]=!1)}function Bt(B,pt){return u[B]!==pt?(s.bindFramebuffer(B,pt),u[B]=pt,B===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=pt),B===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=pt),!0):!1}function St(B,pt){let Q=p,mt=!1;if(B){Q=d.get(pt),Q===void 0&&(Q=[],d.set(pt,Q));const Mt=B.textures;if(Q.length!==Mt.length||Q[0]!==s.COLOR_ATTACHMENT0){for(let it=0,It=Mt.length;it<It;it++)Q[it]=s.COLOR_ATTACHMENT0+it;Q.length=Mt.length,mt=!0}}else Q[0]!==s.BACK&&(Q[0]=s.BACK,mt=!0);mt&&s.drawBuffers(Q)}function zt(B){return _!==B?(s.useProgram(B),_=B,!0):!1}const de={[os]:s.FUNC_ADD,[Ou]:s.FUNC_SUBTRACT,[Bu]:s.FUNC_REVERSE_SUBTRACT};de[zu]=s.MIN,de[Gu]=s.MAX;const nt={[Vu]:s.ZERO,[Hu]:s.ONE,[ku]:s.SRC_COLOR,[dh]:s.SRC_ALPHA,[$u]:s.SRC_ALPHA_SATURATE,[Yu]:s.DST_COLOR,[Xu]:s.DST_ALPHA,[Wu]:s.ONE_MINUS_SRC_COLOR,[ph]:s.ONE_MINUS_SRC_ALPHA,[Zu]:s.ONE_MINUS_DST_COLOR,[qu]:s.ONE_MINUS_DST_ALPHA,[Ju]:s.CONSTANT_COLOR,[Ku]:s.ONE_MINUS_CONSTANT_COLOR,[Qu]:s.CONSTANT_ALPHA,[ju]:s.ONE_MINUS_CONSTANT_ALPHA};function st(B,pt,Q,mt,Mt,it,It,Rt,Me,he){if(B===ti){g===!0&&(_t(s.BLEND),g=!1);return}if(g===!1&&(et(s.BLEND),g=!0),B!==Fu){if(B!==m||he!==I){if((y!==os||S!==os)&&(s.blendEquation(s.FUNC_ADD),y=os,S=os),he)switch(B){case Vs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bc:s.blendFunc(s.ONE,s.ONE);break;case zc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Gc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:te("WebGLState: Invalid blending: ",B);break}else switch(B){case Vs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bc:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case zc:te("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gc:te("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:te("WebGLState: Invalid blending: ",B);break}E=null,x=null,b=null,A=null,v.set(0,0,0),w=0,m=B,I=he}return}Mt=Mt||pt,it=it||Q,It=It||mt,(pt!==y||Mt!==S)&&(s.blendEquationSeparate(de[pt],de[Mt]),y=pt,S=Mt),(Q!==E||mt!==x||it!==b||It!==A)&&(s.blendFuncSeparate(nt[Q],nt[mt],nt[it],nt[It]),E=Q,x=mt,b=it,A=It),(Rt.equals(v)===!1||Me!==w)&&(s.blendColor(Rt.r,Rt.g,Rt.b,Me),v.copy(Rt),w=Me),m=B,I=!1}function rt(B,pt){B.side===un?_t(s.CULL_FACE):et(s.CULL_FACE);let Q=B.side===Ye;pt&&(Q=!Q),at(Q),B.blending===Vs&&B.transparent===!1?st(ti):st(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const mt=B.stencilWrite;o.setTest(mt),mt&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ut(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?et(s.SAMPLE_ALPHA_TO_COVERAGE):_t(s.SAMPLE_ALPHA_TO_COVERAGE)}function at(B){P!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),P=B)}function ht(B){B!==Iu?(et(s.CULL_FACE),B!==D&&(B===Oc?s.cullFace(s.BACK):B===Uu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):_t(s.CULL_FACE),D=B}function Nt(B){B!==U&&(z&&s.lineWidth(B),U=B)}function Ut(B,pt,Q){B?(et(s.POLYGON_OFFSET_FILL),(L!==pt||O!==Q)&&(L=pt,O=Q,a.getReversed()&&(pt=-pt),s.polygonOffset(pt,Q))):_t(s.POLYGON_OFFSET_FILL)}function Gt(B){B?et(s.SCISSOR_TEST):_t(s.SCISSOR_TEST)}function kt(B){B===void 0&&(B=s.TEXTURE0+V-1),K!==B&&(s.activeTexture(B),K=B)}function N(B,pt,Q){Q===void 0&&(K===null?Q=s.TEXTURE0+V-1:Q=K);let mt=j[Q];mt===void 0&&(mt={type:void 0,texture:void 0},j[Q]=mt),(mt.type!==B||mt.texture!==pt)&&(K!==Q&&(s.activeTexture(Q),K=Q),s.bindTexture(B,pt||J[B]),mt.type=B,mt.texture=pt)}function le(){const B=j[K];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Kt(){try{s.compressedTexImage2D(...arguments)}catch(B){te("WebGLState:",B)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(B){te("WebGLState:",B)}}function M(){try{s.texSubImage2D(...arguments)}catch(B){te("WebGLState:",B)}}function G(){try{s.texSubImage3D(...arguments)}catch(B){te("WebGLState:",B)}}function X(){try{s.compressedTexSubImage2D(...arguments)}catch(B){te("WebGLState:",B)}}function Z(){try{s.compressedTexSubImage3D(...arguments)}catch(B){te("WebGLState:",B)}}function ot(){try{s.texStorage2D(...arguments)}catch(B){te("WebGLState:",B)}}function lt(){try{s.texStorage3D(...arguments)}catch(B){te("WebGLState:",B)}}function $(){try{s.texImage2D(...arguments)}catch(B){te("WebGLState:",B)}}function tt(){try{s.texImage3D(...arguments)}catch(B){te("WebGLState:",B)}}function ft(B){return f[B]!==void 0?f[B]:s.getParameter(B)}function Lt(B,pt){f[B]!==pt&&(s.pixelStorei(B,pt),f[B]=pt)}function gt(B){oe.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),oe.copy(B))}function dt(B){Jt.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),Jt.copy(B))}function Dt(B,pt){let Q=c.get(pt);Q===void 0&&(Q=new WeakMap,c.set(pt,Q));let mt=Q.get(B);mt===void 0&&(mt=s.getUniformBlockIndex(pt,B.name),Q.set(B,mt))}function Ft(B,pt){const mt=c.get(pt).get(B);l.get(pt)!==mt&&(s.uniformBlockBinding(pt,mt,B.__bindingPointIndex),l.set(pt,mt))}function Yt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},K=null,j={},u={},d=new WeakMap,p=[],_=null,g=!1,m=null,y=null,E=null,x=null,S=null,b=null,A=null,v=new re(0,0,0),w=0,I=!1,P=null,D=null,U=null,L=null,O=null,oe.set(0,0,s.canvas.width,s.canvas.height),Jt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:_t,bindFramebuffer:Bt,drawBuffers:St,useProgram:zt,setBlending:st,setMaterial:rt,setFlipSided:at,setCullFace:ht,setLineWidth:Nt,setPolygonOffset:Ut,setScissorTest:Gt,activeTexture:kt,bindTexture:N,unbindTexture:le,compressedTexImage2D:Kt,compressedTexImage3D:C,texImage2D:$,texImage3D:tt,pixelStorei:Lt,getParameter:ft,updateUBOMapping:Dt,uniformBlockBinding:Ft,texStorage2D:ot,texStorage3D:lt,texSubImage2D:M,texSubImage3D:G,compressedTexSubImage2D:X,compressedTexSubImage3D:Z,scissor:gt,viewport:dt,reset:Yt}}function B_(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,M){return p?new OffscreenCanvas(C,M):jr("canvas")}function g(C,M,G){let X=1;const Z=Kt(C);if((Z.width>G||Z.height>G)&&(X=G/Math.max(Z.width,Z.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ot=Math.floor(X*Z.width),lt=Math.floor(X*Z.height);u===void 0&&(u=_(ot,lt));const $=M?_(ot,lt):u;return $.width=ot,$.height=lt,$.getContext("2d").drawImage(C,0,0,ot,lt),Ot("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ot+"x"+lt+")."),$}else return"data"in C&&Ot("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function m(C){return C.generateMipmaps}function y(C){s.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(C,M,G,X,Z,ot=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let lt;X&&(lt=t.get("EXT_texture_norm16"),lt||Ot("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=M;if(M===s.RED&&(G===s.FLOAT&&($=s.R32F),G===s.HALF_FLOAT&&($=s.R16F),G===s.UNSIGNED_BYTE&&($=s.R8),G===s.UNSIGNED_SHORT&&lt&&($=lt.R16_EXT),G===s.SHORT&&lt&&($=lt.R16_SNORM_EXT)),M===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&($=s.R8UI),G===s.UNSIGNED_SHORT&&($=s.R16UI),G===s.UNSIGNED_INT&&($=s.R32UI),G===s.BYTE&&($=s.R8I),G===s.SHORT&&($=s.R16I),G===s.INT&&($=s.R32I)),M===s.RG&&(G===s.FLOAT&&($=s.RG32F),G===s.HALF_FLOAT&&($=s.RG16F),G===s.UNSIGNED_BYTE&&($=s.RG8),G===s.UNSIGNED_SHORT&&lt&&($=lt.RG16_EXT),G===s.SHORT&&lt&&($=lt.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&($=s.RG8UI),G===s.UNSIGNED_SHORT&&($=s.RG16UI),G===s.UNSIGNED_INT&&($=s.RG32UI),G===s.BYTE&&($=s.RG8I),G===s.SHORT&&($=s.RG16I),G===s.INT&&($=s.RG32I)),M===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&($=s.RGB8UI),G===s.UNSIGNED_SHORT&&($=s.RGB16UI),G===s.UNSIGNED_INT&&($=s.RGB32UI),G===s.BYTE&&($=s.RGB8I),G===s.SHORT&&($=s.RGB16I),G===s.INT&&($=s.RGB32I)),M===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&($=s.RGBA8UI),G===s.UNSIGNED_SHORT&&($=s.RGBA16UI),G===s.UNSIGNED_INT&&($=s.RGBA32UI),G===s.BYTE&&($=s.RGBA8I),G===s.SHORT&&($=s.RGBA16I),G===s.INT&&($=s.RGBA32I)),M===s.RGB&&(G===s.UNSIGNED_SHORT&&lt&&($=lt.RGB16_EXT),G===s.SHORT&&lt&&($=lt.RGB16_SNORM_EXT),G===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),G===s.UNSIGNED_INT_10F_11F_11F_REV&&($=s.R11F_G11F_B10F)),M===s.RGBA){const tt=ot?Kr:ee.getTransfer(Z);G===s.FLOAT&&($=s.RGBA32F),G===s.HALF_FLOAT&&($=s.RGBA16F),G===s.UNSIGNED_BYTE&&($=tt===pe?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT&&lt&&($=lt.RGBA16_EXT),G===s.SHORT&&lt&&($=lt.RGBA16_SNORM_EXT),G===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function S(C,M){let G;return C?M===null||M===zn||M===Zs?G=s.DEPTH24_STENCIL8:M===In?G=s.DEPTH32F_STENCIL8:M===Ys&&(G=s.DEPTH24_STENCIL8,Ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===zn||M===Zs?G=s.DEPTH_COMPONENT24:M===In?G=s.DEPTH_COMPONENT32F:M===Ys&&(G=s.DEPTH_COMPONENT16),G}function b(C,M){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ge&&C.minFilter!==qe?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){const M=C.target;M.removeEventListener("dispose",A),w(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&f.delete(M)}function v(C){const M=C.target;M.removeEventListener("dispose",v),P(M)}function w(C){const M=n.get(C);if(M.__webglInit===void 0)return;const G=C.source,X=d.get(G);if(X){const Z=X[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(C),Object.keys(X).length===0&&d.delete(G)}n.remove(C)}function I(C){const M=n.get(C);s.deleteTexture(M.__webglTexture);const G=C.source,X=d.get(G);delete X[M.__cacheKey],a.memory.textures--}function P(C){const M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(M.__webglFramebuffer[X]))for(let Z=0;Z<M.__webglFramebuffer[X].length;Z++)s.deleteFramebuffer(M.__webglFramebuffer[X][Z]);else s.deleteFramebuffer(M.__webglFramebuffer[X]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[X])}else{if(Array.isArray(M.__webglFramebuffer))for(let X=0;X<M.__webglFramebuffer.length;X++)s.deleteFramebuffer(M.__webglFramebuffer[X]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let X=0;X<M.__webglColorRenderbuffer.length;X++)M.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[X]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=C.textures;for(let X=0,Z=G.length;X<Z;X++){const ot=n.get(G[X]);ot.__webglTexture&&(s.deleteTexture(ot.__webglTexture),a.memory.textures--),n.remove(G[X])}n.remove(C)}let D=0;function U(){D=0}function L(){return D}function O(C){D=C}function V(){const C=D;return C>=i.maxTextures&&Ot("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),D+=1,C}function z(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function Y(C,M){const G=n.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&G.__version!==C.version){const X=C.image;if(X===null)Ot("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ot("WebGLRenderer: Texture marked for update but image is incomplete");else{_t(G,C,M);return}}else C.isExternalTexture&&(G.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+M)}function W(C,M){const G=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){_t(G,C,M);return}else C.isExternalTexture&&(G.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+M)}function K(C,M){const G=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){_t(G,C,M);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+M)}function j(C,M){const G=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&G.__version!==C.version){Bt(G,C,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+M)}const Pt={[mo]:s.REPEAT,[Kn]:s.CLAMP_TO_EDGE,[go]:s.MIRRORED_REPEAT},Tt={[Ge]:s.NEAREST,[nf]:s.NEAREST_MIPMAP_NEAREST,[nr]:s.NEAREST_MIPMAP_LINEAR,[qe]:s.LINEAR,[_a]:s.LINEAR_MIPMAP_NEAREST,[Ai]:s.LINEAR_MIPMAP_LINEAR},oe={[of]:s.NEVER,[ff]:s.ALWAYS,[cf]:s.LESS,[fc]:s.LEQUAL,[lf]:s.EQUAL,[dc]:s.GEQUAL,[hf]:s.GREATER,[uf]:s.NOTEQUAL};function Jt(C,M){if(M.type===In&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===qe||M.magFilter===_a||M.magFilter===nr||M.magFilter===Ai||M.minFilter===qe||M.minFilter===_a||M.minFilter===nr||M.minFilter===Ai)&&Ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Pt[M.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Pt[M.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Pt[M.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Tt[M.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Tt[M.minFilter]),M.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,oe[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ge||M.minFilter!==nr&&M.minFilter!==Ai||M.type===In&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function ne(C,M){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));const X=M.source;let Z=d.get(X);Z===void 0&&(Z={},d.set(X,Z));const ot=z(M);if(ot!==C.__cacheKey){Z[ot]===void 0&&(Z[ot]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Z[ot].usedTimes++;const lt=Z[C.__cacheKey];lt!==void 0&&(Z[C.__cacheKey].usedTimes--,lt.usedTimes===0&&I(M)),C.__cacheKey=ot,C.__webglTexture=Z[ot].texture}return G}function J(C,M,G){return Math.floor(Math.floor(C/G)/M)}function et(C,M,G,X){const ot=C.updateRanges;if(ot.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,G,X,M.data);else{ot.sort((Lt,gt)=>Lt.start-gt.start);let lt=0;for(let Lt=1;Lt<ot.length;Lt++){const gt=ot[lt],dt=ot[Lt],Dt=gt.start+gt.count,Ft=J(dt.start,M.width,4),Yt=J(gt.start,M.width,4);dt.start<=Dt+1&&Ft===Yt&&J(dt.start+dt.count-1,M.width,4)===Ft?gt.count=Math.max(gt.count,dt.start+dt.count-gt.start):(++lt,ot[lt]=dt)}ot.length=lt+1;const $=e.getParameter(s.UNPACK_ROW_LENGTH),tt=e.getParameter(s.UNPACK_SKIP_PIXELS),ft=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Lt=0,gt=ot.length;Lt<gt;Lt++){const dt=ot[Lt],Dt=Math.floor(dt.start/4),Ft=Math.ceil(dt.count/4),Yt=Dt%M.width,B=Math.floor(Dt/M.width),pt=Ft,Q=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Yt),e.pixelStorei(s.UNPACK_SKIP_ROWS,B),e.texSubImage2D(s.TEXTURE_2D,0,Yt,B,pt,Q,G,X,M.data)}C.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,$),e.pixelStorei(s.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(s.UNPACK_SKIP_ROWS,ft)}}function _t(C,M,G){let X=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(X=s.TEXTURE_3D);const Z=ne(C,M),ot=M.source;e.bindTexture(X,C.__webglTexture,s.TEXTURE0+G);const lt=n.get(ot);if(ot.version!==lt.__version||Z===!0){if(e.activeTexture(s.TEXTURE0+G),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const Q=ee.getPrimaries(ee.workingColorSpace),mt=M.colorSpace===mi?null:ee.getPrimaries(M.colorSpace),Mt=M.colorSpace===mi||Q===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt)}e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let tt=g(M.image,!1,i.maxTextureSize);tt=le(M,tt);const ft=r.convert(M.format,M.colorSpace),Lt=r.convert(M.type);let gt=x(M.internalFormat,ft,Lt,M.normalized,M.colorSpace,M.isVideoTexture);Jt(X,M);let dt;const Dt=M.mipmaps,Ft=M.isVideoTexture!==!0,Yt=lt.__version===void 0||Z===!0,B=ot.dataReady,pt=b(M,tt);if(M.isDepthTexture)gt=S(M.format===Ri,M.type),Yt&&(Ft?e.texStorage2D(s.TEXTURE_2D,1,gt,tt.width,tt.height):e.texImage2D(s.TEXTURE_2D,0,gt,tt.width,tt.height,0,ft,Lt,null));else if(M.isDataTexture)if(Dt.length>0){Ft&&Yt&&e.texStorage2D(s.TEXTURE_2D,pt,gt,Dt[0].width,Dt[0].height);for(let Q=0,mt=Dt.length;Q<mt;Q++)dt=Dt[Q],Ft?B&&e.texSubImage2D(s.TEXTURE_2D,Q,0,0,dt.width,dt.height,ft,Lt,dt.data):e.texImage2D(s.TEXTURE_2D,Q,gt,dt.width,dt.height,0,ft,Lt,dt.data);M.generateMipmaps=!1}else Ft?(Yt&&e.texStorage2D(s.TEXTURE_2D,pt,gt,tt.width,tt.height),B&&et(M,tt,ft,Lt)):e.texImage2D(s.TEXTURE_2D,0,gt,tt.width,tt.height,0,ft,Lt,tt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ft&&Yt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,pt,gt,Dt[0].width,Dt[0].height,tt.depth);for(let Q=0,mt=Dt.length;Q<mt;Q++)if(dt=Dt[Q],M.format!==bn)if(ft!==null)if(Ft){if(B)if(M.layerUpdates.size>0){const Mt=Tl(dt.width,dt.height,M.format,M.type);for(const it of M.layerUpdates){const It=dt.data.subarray(it*Mt/dt.data.BYTES_PER_ELEMENT,(it+1)*Mt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,it,dt.width,dt.height,1,ft,It)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,dt.width,dt.height,tt.depth,ft,dt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Q,gt,dt.width,dt.height,tt.depth,0,dt.data,0,0);else Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?B&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,dt.width,dt.height,tt.depth,ft,Lt,dt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Q,gt,dt.width,dt.height,tt.depth,0,ft,Lt,dt.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Ft&&Yt&&e.texStorage2D(s.TEXTURE_2D,pt,gt,Dt[0].width,Dt[0].height);for(let Q=0,mt=Dt.length;Q<mt;Q++)dt=Dt[Q],M.format!==bn?ft!==null?Ft?B&&e.compressedTexSubImage2D(s.TEXTURE_2D,Q,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(s.TEXTURE_2D,Q,gt,dt.width,dt.height,0,dt.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?B&&e.texSubImage2D(s.TEXTURE_2D,Q,0,0,dt.width,dt.height,ft,Lt,dt.data):e.texImage2D(s.TEXTURE_2D,Q,gt,dt.width,dt.height,0,ft,Lt,dt.data)}else if(M.isDataArrayTexture)if(Ft){if(Yt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,pt,gt,tt.width,tt.height,tt.depth),B)if(M.layerUpdates.size>0){const Q=Tl(tt.width,tt.height,M.format,M.type);for(const mt of M.layerUpdates){const Mt=tt.data.subarray(mt*Q/tt.data.BYTES_PER_ELEMENT,(mt+1)*Q/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,mt,tt.width,tt.height,1,ft,Lt,Mt)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ft,Lt,tt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,gt,tt.width,tt.height,tt.depth,0,ft,Lt,tt.data);else if(M.isData3DTexture)Ft?(Yt&&e.texStorage3D(s.TEXTURE_3D,pt,gt,tt.width,tt.height,tt.depth),B&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ft,Lt,tt.data)):e.texImage3D(s.TEXTURE_3D,0,gt,tt.width,tt.height,tt.depth,0,ft,Lt,tt.data);else if(M.isFramebufferTexture){if(Yt)if(Ft)e.texStorage2D(s.TEXTURE_2D,pt,gt,tt.width,tt.height);else{let Q=tt.width,mt=tt.height;for(let Mt=0;Mt<pt;Mt++)e.texImage2D(s.TEXTURE_2D,Mt,gt,Q,mt,0,ft,Lt,null),Q>>=1,mt>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){const Q=s.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),tt.parentNode!==Q){Q.appendChild(tt),f.add(M),Q.onpaint=mt=>{const Mt=mt.changedElements;for(const it of f)Mt.includes(it.image)&&(it.needsUpdate=!0)},Q.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,tt);else{const Mt=s.RGBA,it=s.RGBA,It=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Mt,it,It,tt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Ft&&Yt){const Q=Kt(Dt[0]);e.texStorage2D(s.TEXTURE_2D,pt,gt,Q.width,Q.height)}for(let Q=0,mt=Dt.length;Q<mt;Q++)dt=Dt[Q],Ft?B&&e.texSubImage2D(s.TEXTURE_2D,Q,0,0,ft,Lt,dt):e.texImage2D(s.TEXTURE_2D,Q,gt,ft,Lt,dt);M.generateMipmaps=!1}else if(Ft){if(Yt){const Q=Kt(tt);e.texStorage2D(s.TEXTURE_2D,pt,gt,Q.width,Q.height)}B&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ft,Lt,tt)}else e.texImage2D(s.TEXTURE_2D,0,gt,ft,Lt,tt);m(M)&&y(X),lt.__version=ot.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Bt(C,M,G){if(M.image.length!==6)return;const X=ne(C,M),Z=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+G);const ot=n.get(Z);if(Z.version!==ot.__version||X===!0){e.activeTexture(s.TEXTURE0+G);const lt=ee.getPrimaries(ee.workingColorSpace),$=M.colorSpace===mi?null:ee.getPrimaries(M.colorSpace),tt=M.colorSpace===mi||lt===$?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);const ft=M.isCompressedTexture||M.image[0].isCompressedTexture,Lt=M.image[0]&&M.image[0].isDataTexture,gt=[];for(let it=0;it<6;it++)!ft&&!Lt?gt[it]=g(M.image[it],!0,i.maxCubemapSize):gt[it]=Lt?M.image[it].image:M.image[it],gt[it]=le(M,gt[it]);const dt=gt[0],Dt=r.convert(M.format,M.colorSpace),Ft=r.convert(M.type),Yt=x(M.internalFormat,Dt,Ft,M.normalized,M.colorSpace),B=M.isVideoTexture!==!0,pt=ot.__version===void 0||X===!0,Q=Z.dataReady;let mt=b(M,dt);Jt(s.TEXTURE_CUBE_MAP,M);let Mt;if(ft){B&&pt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Yt,dt.width,dt.height);for(let it=0;it<6;it++){Mt=gt[it].mipmaps;for(let It=0;It<Mt.length;It++){const Rt=Mt[It];M.format!==bn?Dt!==null?B?Q&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,It,0,0,Rt.width,Rt.height,Dt,Rt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,It,Yt,Rt.width,Rt.height,0,Rt.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?Q&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,It,0,0,Rt.width,Rt.height,Dt,Ft,Rt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,It,Yt,Rt.width,Rt.height,0,Dt,Ft,Rt.data)}}}else{if(Mt=M.mipmaps,B&&pt){Mt.length>0&&mt++;const it=Kt(gt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Yt,it.width,it.height)}for(let it=0;it<6;it++)if(Lt){B?Q&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,gt[it].width,gt[it].height,Dt,Ft,gt[it].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Yt,gt[it].width,gt[it].height,0,Dt,Ft,gt[it].data);for(let It=0;It<Mt.length;It++){const Me=Mt[It].image[it].image;B?Q&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,It+1,0,0,Me.width,Me.height,Dt,Ft,Me.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,It+1,Yt,Me.width,Me.height,0,Dt,Ft,Me.data)}}else{B?Q&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Dt,Ft,gt[it]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Yt,Dt,Ft,gt[it]);for(let It=0;It<Mt.length;It++){const Rt=Mt[It];B?Q&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,It+1,0,0,Dt,Ft,Rt.image[it]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,It+1,Yt,Dt,Ft,Rt.image[it])}}}m(M)&&y(s.TEXTURE_CUBE_MAP),ot.__version=Z.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function St(C,M,G,X,Z,ot){const lt=r.convert(G.format,G.colorSpace),$=r.convert(G.type),tt=x(G.internalFormat,lt,$,G.normalized,G.colorSpace),ft=n.get(M),Lt=n.get(G);if(Lt.__renderTarget=M,!ft.__hasExternalTextures){const gt=Math.max(1,M.width>>ot),dt=Math.max(1,M.height>>ot);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?e.texImage3D(Z,ot,tt,gt,dt,M.depth,0,lt,$,null):e.texImage2D(Z,ot,tt,gt,dt,0,lt,$,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),kt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,Z,Lt.__webglTexture,0,Gt(M)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,Z,Lt.__webglTexture,ot),e.bindFramebuffer(s.FRAMEBUFFER,null)}function zt(C,M,G){if(s.bindRenderbuffer(s.RENDERBUFFER,C),M.depthBuffer){const X=M.depthTexture,Z=X&&X.isDepthTexture?X.type:null,ot=S(M.stencilBuffer,Z),lt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;kt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Gt(M),ot,M.width,M.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,Gt(M),ot,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ot,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,lt,s.RENDERBUFFER,C)}else{const X=M.textures;for(let Z=0;Z<X.length;Z++){const ot=X[Z],lt=r.convert(ot.format,ot.colorSpace),$=r.convert(ot.type),tt=x(ot.internalFormat,lt,$,ot.normalized,ot.colorSpace);kt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Gt(M),tt,M.width,M.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,Gt(M),tt,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,tt,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function de(C,M,G){const X=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(M.depthTexture);if(Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),X){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,M.depthTexture.addEventListener("dispose",A)),Z.__webglTexture===void 0){Z.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),Jt(s.TEXTURE_CUBE_MAP,M.depthTexture);const ft=r.convert(M.depthTexture.format),Lt=r.convert(M.depthTexture.type);let gt;M.depthTexture.format===ii?gt=s.DEPTH_COMPONENT24:M.depthTexture.format===Ri&&(gt=s.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,gt,M.width,M.height,0,ft,Lt,null)}}else Y(M.depthTexture,0);const ot=Z.__webglTexture,lt=Gt(M),$=X?s.TEXTURE_CUBE_MAP_POSITIVE_X+G:s.TEXTURE_2D,tt=M.depthTexture.format===Ri?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===ii)kt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,$,ot,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,tt,$,ot,0);else if(M.depthTexture.format===Ri)kt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,$,ot,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,tt,$,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(C){const M=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const X=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),X){const Z=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,X.removeEventListener("dispose",Z)};X.addEventListener("dispose",Z),M.__depthDisposeCallback=Z}M.__boundDepthTexture=X}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(G)for(let X=0;X<6;X++)de(M.__webglFramebuffer[X],C,X);else{const X=C.texture.mipmaps;X&&X.length>0?de(M.__webglFramebuffer[0],C,0):de(M.__webglFramebuffer,C,0)}else if(G){M.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[X]),M.__webglDepthbuffer[X]===void 0)M.__webglDepthbuffer[X]=s.createRenderbuffer(),zt(M.__webglDepthbuffer[X],C,!1);else{const Z=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=M.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,ot),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,ot)}}else{const X=C.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),zt(M.__webglDepthbuffer,C,!1);else{const Z=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ot),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,ot)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function st(C,M,G){const X=n.get(C);M!==void 0&&St(X.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&nt(C)}function rt(C){const M=C.texture,G=n.get(C),X=n.get(M);C.addEventListener("dispose",v);const Z=C.textures,ot=C.isWebGLCubeRenderTarget===!0,lt=Z.length>1;if(lt||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=M.version,a.memory.textures++),ot){G.__webglFramebuffer=[];for(let $=0;$<6;$++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[$]=[];for(let tt=0;tt<M.mipmaps.length;tt++)G.__webglFramebuffer[$][tt]=s.createFramebuffer()}else G.__webglFramebuffer[$]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let $=0;$<M.mipmaps.length;$++)G.__webglFramebuffer[$]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(lt)for(let $=0,tt=Z.length;$<tt;$++){const ft=n.get(Z[$]);ft.__webglTexture===void 0&&(ft.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&kt(C)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let $=0;$<Z.length;$++){const tt=Z[$];G.__webglColorRenderbuffer[$]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[$]);const ft=r.convert(tt.format,tt.colorSpace),Lt=r.convert(tt.type),gt=x(tt.internalFormat,ft,Lt,tt.normalized,tt.colorSpace,C.isXRRenderTarget===!0),dt=Gt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,gt,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$,s.RENDERBUFFER,G.__webglColorRenderbuffer[$])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),zt(G.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ot){e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),Jt(s.TEXTURE_CUBE_MAP,M);for(let $=0;$<6;$++)if(M.mipmaps&&M.mipmaps.length>0)for(let tt=0;tt<M.mipmaps.length;tt++)St(G.__webglFramebuffer[$][tt],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+$,tt);else St(G.__webglFramebuffer[$],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);m(M)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let $=0,tt=Z.length;$<tt;$++){const ft=Z[$],Lt=n.get(ft);let gt=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(gt=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(gt,Lt.__webglTexture),Jt(gt,ft),St(G.__webglFramebuffer,C,ft,s.COLOR_ATTACHMENT0+$,gt,0),m(ft)&&y(gt)}e.unbindTexture()}else{let $=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&($=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture($,X.__webglTexture),Jt($,M),M.mipmaps&&M.mipmaps.length>0)for(let tt=0;tt<M.mipmaps.length;tt++)St(G.__webglFramebuffer[tt],C,M,s.COLOR_ATTACHMENT0,$,tt);else St(G.__webglFramebuffer,C,M,s.COLOR_ATTACHMENT0,$,0);m(M)&&y($),e.unbindTexture()}C.depthBuffer&&nt(C)}function at(C){const M=C.textures;for(let G=0,X=M.length;G<X;G++){const Z=M[G];if(m(Z)){const ot=E(C),lt=n.get(Z).__webglTexture;e.bindTexture(ot,lt),y(ot),e.unbindTexture()}}}const ht=[],Nt=[];function Ut(C){if(C.samples>0){if(kt(C)===!1){const M=C.textures,G=C.width,X=C.height;let Z=s.COLOR_BUFFER_BIT;const ot=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=n.get(C),$=M.length>1;if($)for(let ft=0;ft<M.length;ft++)e.bindFramebuffer(s.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const tt=C.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ft=0;ft<M.length;ft++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),$){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,lt.__webglColorRenderbuffer[ft]);const Lt=n.get(M[ft]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Lt,0)}s.blitFramebuffer(0,0,G,X,0,0,G,X,Z,s.NEAREST),l===!0&&(ht.length=0,Nt.length=0,ht.push(s.COLOR_ATTACHMENT0+ft),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(ht.push(ot),Nt.push(ot),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Nt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ht))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),$)for(let ft=0;ft<M.length;ft++){e.bindFramebuffer(s.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,lt.__webglColorRenderbuffer[ft]);const Lt=n.get(M[ft]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,Lt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){const M=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Gt(C){return Math.min(i.maxSamples,C.samples)}function kt(C){const M=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function N(C){const M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function le(C,M){const G=C.colorSpace,X=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==Jr&&G!==mi&&(ee.getTransfer(G)===pe?(X!==bn||Z!==fn)&&Ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):te("WebGLTextures: Unsupported texture color space:",G)),M}function Kt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=U,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=j,this.rebindTextures=st,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function z_(s,t){function e(n,i=mi){let r;const a=ee.getTransfer(i);if(n===fn)return s.UNSIGNED_BYTE;if(n===oc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===cc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===wh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ah)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Eh)return s.BYTE;if(n===Th)return s.SHORT;if(n===Ys)return s.UNSIGNED_SHORT;if(n===ac)return s.INT;if(n===zn)return s.UNSIGNED_INT;if(n===In)return s.FLOAT;if(n===Gn)return s.HALF_FLOAT;if(n===Rh)return s.ALPHA;if(n===Ch)return s.RGB;if(n===bn)return s.RGBA;if(n===ii)return s.DEPTH_COMPONENT;if(n===Ri)return s.DEPTH_STENCIL;if(n===Ph)return s.RED;if(n===lc)return s.RED_INTEGER;if(n===Ii)return s.RG;if(n===hc)return s.RG_INTEGER;if(n===uc)return s.RGBA_INTEGER;if(n===Hr||n===kr||n===Wr||n===Xr)if(a===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_o||n===vo||n===xo||n===Mo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Mo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===So||n===yo||n===bo||n===Eo||n===To||n===Zr||n===wo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===So||n===yo)return a===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===bo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Eo)return r.COMPRESSED_R11_EAC;if(n===To)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Zr)return r.COMPRESSED_RG11_EAC;if(n===wo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===zo||n===Go)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ao)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ro)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Co)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Po)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Do)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Io)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===No)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Bo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Go)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===Ho||n===ko)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return a===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ko)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wo||n===Xo||n===$r||n===qo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Xo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$r)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const G_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V_=`
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

}`;class H_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new kh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new mn({vertexShader:G_,fragmentShader:V_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new Ss(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k_ extends Ni{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,p=null;const _=typeof XRWebGLBinding<"u",g=new H_,m={},y=e.getContextAttributes();let E=null,x=null;const S=[],b=[],A=new ct;let v=null,w=null;const I=new on;I.viewport=new xe;const P=new on;P.viewport=new xe;const D=[I,P],U=new qd;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let et=S[J];return et===void 0&&(et=new Ea,S[J]=et),et.getTargetRaySpace()},this.getControllerGrip=function(J){let et=S[J];return et===void 0&&(et=new Ea,S[J]=et),et.getGripSpace()},this.getHand=function(J){let et=S[J];return et===void 0&&(et=new Ea,S[J]=et),et.getHandSpace()};function V(J){const et=b.indexOf(J.inputSource);if(et===-1)return;const _t=S[et];_t!==void 0&&(_t.update(J.inputSource,J.frame,c||a),_t.dispatchEvent({type:J.type,data:J.inputSource}))}function z(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",Y);for(let J=0;J<S.length;J++){const et=b[J];et!==null&&(b[J]=null,S[J].disconnect(et))}L=null,O=null,g.reset();for(const J in m)delete m[J];if(t.setRenderTarget(E),d=null,u=null,f=null,i=null,x=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(A.width,A.height,!1),w!==null){const J=w.camera;J.fov=w.fov,J.zoom=w.zoom,J.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(i,e)),f},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(E=t.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",z),i.addEventListener("inputsourceschange",Y),y.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Bt=null,St=null;y.depth&&(St=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=y.stencil?Ri:ii,Bt=y.stencil?Zs:zn);const zt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(zt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new En(u.textureWidth,u.textureHeight,{format:bn,type:fn,depthTexture:new Js(u.textureWidth,u.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const _t={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,_t),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new En(d.framebufferWidth,d.framebufferHeight,{format:bn,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y(J){for(let et=0;et<J.removed.length;et++){const _t=J.removed[et],Bt=b.indexOf(_t);Bt>=0&&(b[Bt]=null,S[Bt].disconnect(_t))}for(let et=0;et<J.added.length;et++){const _t=J.added[et];let Bt=b.indexOf(_t);if(Bt===-1){for(let zt=0;zt<S.length;zt++)if(zt>=b.length){b.push(_t),Bt=zt;break}else if(b[zt]===null){b[zt]=_t,Bt=zt;break}if(Bt===-1)break}const St=S[Bt];St&&St.connect(_t)}}const W=new R,K=new R;function j(J,et,_t){W.setFromMatrixPosition(et.matrixWorld),K.setFromMatrixPosition(_t.matrixWorld);const Bt=W.distanceTo(K),St=et.projectionMatrix.elements,zt=_t.projectionMatrix.elements,de=St[14]/(St[10]-1),nt=St[14]/(St[10]+1),st=(St[9]+1)/St[5],rt=(St[9]-1)/St[5],at=(St[8]-1)/St[0],ht=(zt[8]+1)/zt[0],Nt=de*at,Ut=de*ht,Gt=Bt/(-at+ht),kt=Gt*-at;if(et.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(kt),J.translateZ(Gt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),St[10]===-1)J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const N=de+Gt,le=nt+Gt,Kt=Nt-kt,C=Ut+(Bt-kt),M=st*nt/le*N,G=rt*nt/le*N;J.projectionMatrix.makePerspective(Kt,C,M,G,N,le),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Pt(J,et){et===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(et.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let et=J.near,_t=J.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(_t=g.depthFar)),U.near=P.near=I.near=et,U.far=P.far=I.far=_t,(L!==U.near||O!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),L=U.near,O=U.far),U.layers.mask=J.layers.mask|6,I.layers.mask=U.layers.mask&-5,P.layers.mask=U.layers.mask&-3;const Bt=J.parent,St=U.cameras;Pt(U,Bt);for(let zt=0;zt<St.length;zt++)Pt(St[zt],Bt);St.length===2?j(U,I,P):U.projectionMatrix.copy(I.projectionMatrix),w===null&&J.isPerspectiveCamera&&(w={camera:J,fov:J.fov,zoom:J.zoom}),Tt(J,U,Bt)};function Tt(J,et,_t){_t===null?J.matrix.copy(et.matrixWorld):(J.matrix.copy(_t.matrixWorld),J.matrix.invert(),J.matrix.multiply(et.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=$s*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(J){return m[J]};let oe=null;function Jt(J,et){if(h=et.getViewerPose(c||a),p=et,h!==null){const _t=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Bt=!1;_t.length!==U.cameras.length&&(U.cameras.length=0,Bt=!0);for(let nt=0;nt<_t.length;nt++){const st=_t[nt];let rt=null;if(d!==null)rt=d.getViewport(st);else{const ht=f.getViewSubImage(u,st);rt=ht.viewport,nt===0&&(t.setRenderTargetTextures(x,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(x))}let at=D[nt];at===void 0&&(at=new on,at.layers.enable(nt),at.viewport=new xe,D[nt]=at),at.matrix.fromArray(st.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(st.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(rt.x,rt.y,rt.width,rt.height),nt===0&&(U.matrix.copy(at.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Bt===!0&&U.cameras.push(at)}const St=i.enabledFeatures;if(St&&St.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const nt=f.getDepthInformation(_t[0]);nt&&nt.isValid&&nt.texture&&g.init(nt,i.renderState)}if(St&&St.includes("camera-access")&&_){t.state.unbindTexture(),f=n.getBinding();for(let nt=0;nt<_t.length;nt++){const st=_t[nt].camera;if(st){let rt=m[st];rt||(rt=new kh,m[st]=rt);const at=f.getCameraImage(st);rt.sourceTexture=at}}}}for(let _t=0;_t<S.length;_t++){const Bt=b[_t],St=S[_t];Bt!==null&&St!==void 0&&St.update(Bt,et,c||a)}oe&&oe(J,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),p=null}const ne=new iu;ne.setAnimationLoop(Jt),this.setAnimationLoop=function(J){oe=J},this.dispose=function(){}}}const W_=new Ee,hu=new Xt;hu.set(-1,0,0,0,1,0,0,0,1);function X_(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,jh(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,y,E,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&d(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,y,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ye&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ye&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const y=t.get(m),E=y.envMap,x=y.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(W_.makeRotationFromEuler(x)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(hu),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=E*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ye&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const y=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function q_(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,S){const b=S.program;n.uniformBlockBinding(x,b)}function c(x,S){let b=i[x.id];b===void 0&&(g(x),b=h(x),i[x.id]=b,x.addEventListener("dispose",y));const A=S.program;n.updateUBOMapping(x,A);const v=t.render.frame;r[x.id]!==v&&(u(x),r[x.id]=v)}function h(x){const S=f();x.__bindingPointIndex=S;const b=s.createBuffer(),A=x.__size,v=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,A,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,b),b}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return te("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const S=i[x.id],b=x.uniforms,A=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let v=0,w=b.length;v<w;v++){const I=b[v];if(Array.isArray(I))for(let P=0,D=I.length;P<D;P++)d(I[P],v,P,A);else d(I,v,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(x,S,b,A){if(_(x,S,b,A)===!0){const v=x.__offset,w=x.value;if(Array.isArray(w)){let I=0;for(let P=0;P<w.length;P++){const D=w[P],U=m(D);p(D,x.__data,I),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(I+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(w,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,x.__data)}}function p(x,S,b){typeof x=="number"||typeof x=="boolean"?S[0]=x:x.isMatrix3?(S[0]=x.elements[0],S[1]=x.elements[1],S[2]=x.elements[2],S[3]=0,S[4]=x.elements[3],S[5]=x.elements[4],S[6]=x.elements[5],S[7]=0,S[8]=x.elements[6],S[9]=x.elements[7],S[10]=x.elements[8],S[11]=0):ArrayBuffer.isView(x)?S.set(new x.constructor(x.buffer,x.byteOffset,S.length)):x.toArray(S,b)}function _(x,S,b,A){const v=x.value,w=S+"_"+b;if(A[w]===void 0)return typeof v=="number"||typeof v=="boolean"?A[w]=v:ArrayBuffer.isView(v)?A[w]=v.slice():A[w]=v.clone(),!0;{const I=A[w];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return A[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function g(x){const S=x.uniforms;let b=0;const A=16;for(let w=0,I=S.length;w<I;w++){const P=Array.isArray(S[w])?S[w]:[S[w]];for(let D=0,U=P.length;D<U;D++){const L=P[D],O=Array.isArray(L.value)?L.value:[L.value];for(let V=0,z=O.length;V<z;V++){const Y=O[V],W=m(Y),K=b%A,j=K%W.boundary,Pt=K+j;b+=j,Pt!==0&&A-Pt<W.storage&&(b+=A-Pt),L.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=W.storage}}}const v=b%A;return v>0&&(b+=A-v),x.__size=b,x.__cache={},this}function m(x){const S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?Ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(S.boundary=16,S.storage=x.byteLength):Ot("WebGLRenderer: Unsupported uniform value type.",x),S}function y(x){const S=x.target;S.removeEventListener("dispose",y);const b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function E(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:E}}const Y_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Cn=null;function Z_(){return Cn===null&&(Cn=new jf(Y_,16,16,Ii,Gn),Cn.name="DFG_LUT",Cn.minFilter=qe,Cn.magFilter=qe,Cn.wrapS=Kn,Cn.wrapT=Kn,Cn.generateMipmaps=!1,Cn.needsUpdate=!0),Cn}class $_{constructor(t={}){const{canvas:e=pf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=fn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const _=d,g=new Set([uc,hc,lc]),m=new Set([fn,zn,Ys,Zs,oc,cc]),y=new Uint32Array(4),E=new Int32Array(4),x=new R;let S=null,b=null;const A=[],v=[];let w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let P=!1,D=null,U=null,L=null,O=null;this._outputColorSpace=Qe;let V=0,z=0,Y=null,W=-1,K=null;const j=new xe,Pt=new xe;let Tt=null;const oe=new re(0);let Jt=0,ne=e.width,J=e.height,et=1,_t=null,Bt=null;const St=new xe(0,0,ne,J),zt=new xe(0,0,ne,J);let de=!1;const nt=new Gh;let st=!1,rt=!1;const at=new Ee,ht=new R,Nt=new xe,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function kt(){return Y===null?et:1}let N=n;function le(T,F){return e.getContext(T,F)}let Kt,C,M,G,X,Z,ot,lt,$,tt,ft,Lt,gt,dt,Dt,Ft,Yt,B,pt,Q,mt,Mt,it;try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${rc}`),e.addEventListener("webglcontextlost",Me,!1),e.addEventListener("webglcontextrestored",he,!1),e.addEventListener("webglcontextcreationerror",gn,!1),N===null){const F="webgl2";if(N=le(F,T),N===null)throw le(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(T){throw e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",gn,!1),te("WebGLRenderer: "+T.message),T}function It(){Kt=new Z0(N),Kt.init(),mt=new z_(N,Kt),C=new B0(N,Kt,t,mt),M=new O_(N,Kt),C.reversedDepthBuffer&&u&&M.buffers.depth.setReversed(!0),U=N.createFramebuffer(),L=N.createFramebuffer(),O=N.createFramebuffer(),G=new K0(N),X=new b_,Z=new B_(N,Kt,M,X,C,mt,G),ot=new Y0(I),lt=new jd(N),Mt=new F0(N,lt),$=new $0(N,lt,G,Mt),tt=new j0(N,$,lt,Mt,G),B=new Q0(N,C,Z),Dt=new z0(X),ft=new y_(I,ot,Kt,C,Mt,Dt),Lt=new X_(I,X),gt=new T_,dt=new L_(Kt),Yt=new N0(I,ot,M,tt,p,l),Ft=new F_(I,tt,C),it=new q_(N,G,C,M),pt=new O0(N,Kt,G),Q=new J0(N,Kt,G),G.programs=ft.programs,I.capabilities=C,I.extensions=Kt,I.properties=X,I.renderLists=gt,I.shadowMap=Ft,I.state=M,I.info=G}_!==fn&&(w=new eg(_,e.width,e.height,o,i,r));const Rt=new k_(I,N);this.xr=Rt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=Kt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Kt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(T){T!==void 0&&(et=T,this.setSize(ne,J,!1))},this.getSize=function(T){return T.set(ne,J)},this.setSize=function(T,F,q=!0){if(Rt.isPresenting){Ot("WebGLRenderer: Can't change size while VR device is presenting.");return}ne=T,J=F,e.width=Math.floor(T*et),e.height=Math.floor(F*et),q===!0&&(e.style.width=T+"px",e.style.height=F+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(ne*et,J*et).floor()},this.setDrawingBufferSize=function(T,F,q){ne=T,J=F,et=q,e.width=Math.floor(T*q),e.height=Math.floor(F*q),this.setViewport(0,0,T,F)},this.setEffects=function(T){if(_===fn){te("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let F=0;F<T.length;F++)if(T[F].isOutputPass===!0){Ot("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(j)},this.getViewport=function(T){return T.copy(St)},this.setViewport=function(T,F,q,H){T.isVector4?St.set(T.x,T.y,T.z,T.w):St.set(T,F,q,H),M.viewport(j.copy(St).multiplyScalar(et).round())},this.getScissor=function(T){return T.copy(zt)},this.setScissor=function(T,F,q,H){T.isVector4?zt.set(T.x,T.y,T.z,T.w):zt.set(T,F,q,H),M.scissor(Pt.copy(zt).multiplyScalar(et).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(T){M.setScissorTest(de=T)},this.setOpaqueSort=function(T){_t=T},this.setTransparentSort=function(T){Bt=T},this.getClearColor=function(T){return T.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor(...arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,q=!0){let H=0;if(T){let k=!1;if(Y!==null){const xt=Y.texture.format;k=g.has(xt)}if(k){const xt=Y.texture.type,Et=m.has(xt),vt=Yt.getClearColor(),wt=Yt.getClearAlpha(),Ct=vt.r,Zt=vt.g,Qt=vt.b;Et?(y[0]=Ct,y[1]=Zt,y[2]=Qt,y[3]=wt,N.clearBufferuiv(N.COLOR,0,y)):(E[0]=Ct,E[1]=Zt,E[2]=Qt,E[3]=wt,N.clearBufferiv(N.COLOR,0,E))}else H|=N.COLOR_BUFFER_BIT}F&&(H|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),D=T},this.dispose=function(){e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",gn,!1),Yt.dispose(),gt.dispose(),dt.dispose(),X.dispose(),ot.dispose(),tt.dispose(),Mt.dispose(),it.dispose(),ft.dispose(),Rt.dispose(),Rt.removeEventListener("sessionstart",Rc),Rt.removeEventListener("sessionend",Cc),Mi.stop()};function Me(T){T.preventDefault(),ta("WebGLRenderer: Context Lost."),P=!0}function he(){ta("WebGLRenderer: Context Restored."),P=!1;const T=G.autoReset,F=Ft.enabled,q=Ft.autoUpdate,H=Ft.needsUpdate,k=Ft.type;It(),G.autoReset=T,Ft.enabled=F,Ft.autoUpdate=q,Ft.needsUpdate=H,Ft.type=k}function gn(T){te("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function wn(T){const F=T.target;F.removeEventListener("dispose",wn),wu(F)}function wu(T){Au(T),X.remove(T)}function Au(T){const F=X.get(T).programs;F!==void 0&&(F.forEach(function(q){ft.releaseProgram(q)}),T.isShaderMaterial&&ft.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,q,H,k,xt){F===null&&(F=Ut);const Et=k.isMesh&&k.matrixWorld.determinantAffine()<0,vt=Pu(T,F,q,H,k);M.setMaterial(H,Et);let wt=q.index,Ct=1;if(H.wireframe===!0){if(wt=$.getWireframeAttribute(q),wt===void 0)return;Ct=2}const Zt=q.drawRange,Qt=q.attributes.position;let At=Zt.start*Ct,ue=(Zt.start+Zt.count)*Ct;xt!==null&&(At=Math.max(At,xt.start*Ct),ue=Math.min(ue,(xt.start+xt.count)*Ct)),wt!==null?(At=Math.max(At,0),ue=Math.min(ue,wt.count)):Qt!=null&&(At=Math.max(At,0),ue=Math.min(ue,Qt.count));const Ce=ue-At;if(Ce<0||Ce===1/0)return;Mt.setup(k,H,vt,q,wt);let Te,ve=pt;if(wt!==null&&(Te=lt.get(wt),ve=Q,ve.setIndex(Te)),k.isMesh)H.wireframe===!0?(M.setLineWidth(H.wireframeLinewidth*kt()),ve.setMode(N.LINES)):ve.setMode(N.TRIANGLES);else if(k.isLine){let He=H.linewidth;He===void 0&&(He=1),M.setLineWidth(He*kt()),k.isLineSegments?ve.setMode(N.LINES):k.isLineLoop?ve.setMode(N.LINE_LOOP):ve.setMode(N.LINE_STRIP)}else k.isPoints?ve.setMode(N.POINTS):k.isSprite&&ve.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(Kt.get("WEBGL_multi_draw"))ve.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const He=k._multiDrawStarts,bt=k._multiDrawCounts,$e=k._multiDrawCount,ie=wt?lt.get(wt).bytesPerElement:1,ln=X.get(H).currentProgram.getUniforms();for(let An=0;An<$e;An++)ln.setValue(N,"_gl_DrawID",An),ve.render(He[An]/ie,bt[An])}else if(k.isInstancedMesh)ve.renderInstances(At,Ce,k.count);else if(q.isInstancedBufferGeometry){const He=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,bt=Math.min(q.instanceCount,He);ve.renderInstances(At,Ce,bt)}else ve.render(At,Ce)};function Ac(T,F,q,H){D!==null&&T.isNodeMaterial&&D.setObject(H,T),st===!0&&Dt.setState(T,q,!1),T.transparent===!0&&T.side===un&&T.forceSinglePass===!1?(T.side=Ye,T.needsUpdate=!0,er(T,F,H),T.side=Li,T.needsUpdate=!0,er(T,F,H),T.side=un):er(T,F,H)}this.compile=function(T,F,q=null){q===null&&(q=T),D!==null&&D.renderStart(T,F,q),b=dt.get(q),b.init(F),v.push(b),q.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(b.pushLight(k),k.castShadow&&b.pushShadow(k))}),T!==q&&T.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(b.pushLight(k),k.castShadow&&b.pushShadow(k))}),b.setupLights(),D!==null&&D.updateLights(b.state.lightsArray),rt=this.localClippingEnabled,st=Dt.init(this.clippingPlanes,rt),st===!0&&Dt.setGlobalState(this.clippingPlanes,F),D!==null&&Ft.render(b.state.shadowsArray,q,F);const H=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const xt=k.material;if(xt)if(Array.isArray(xt))for(let Et=0;Et<xt.length;Et++){const vt=xt[Et];Ac(vt,q,F,k),H.add(vt)}else Ac(xt,q,F,k),H.add(xt)}),b=v.pop(),D!==null&&D.renderEnd(),H},this.compileAsync=function(T,F,q=null){const H=this.compile(T,F,q);return new Promise(k=>{function xt(){if(H.forEach(function(Et){const wt=X.get(Et).currentProgram;(wt===void 0||wt.isReady())&&H.delete(Et)}),H.size===0){k(T);return}setTimeout(xt,10)}Kt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let da=null;function Ru(T){da&&da(T)}function Rc(){Mi.stop()}function Cc(){Mi.start()}const Mi=new iu;Mi.setAnimationLoop(Ru),typeof self<"u"&&Mi.setContext(self),this.setAnimationLoop=function(T){da=T,Rt.setAnimationLoop(T),T===null?Mi.stop():Mi.start()},Rt.addEventListener("sessionstart",Rc),Rt.addEventListener("sessionend",Cc),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){te("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(T,F);const q=Rt.enabled===!0&&Rt.isPresenting===!0,H=w!==null&&(Y===null||q)&&w.begin(I,Y);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Rt.enabled===!0&&Rt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Rt.cameraAutoUpdate===!0&&Rt.updateCamera(F),F=Rt.getCamera()),T.isScene===!0&&T.onBeforeRender(I,T,F,Y),b=dt.get(T,v.length),b.init(F),b.state.textureUnits=Z.getTextureUnits(),v.push(b),at.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),nt.setFromProjectionMatrix(at,Un,F.reversedDepth),rt=this.localClippingEnabled,st=Dt.init(this.clippingPlanes,rt),S=gt.get(T,A.length),S.init(),A.push(S),Rt.enabled===!0&&Rt.isPresenting===!0){const Et=I.xr.getDepthSensingMesh();Et!==null&&pa(Et,F,-1/0,I.sortObjects)}pa(T,F,0,I.sortObjects),S.finish(),D!==null&&D.updateLights(b.state.lightsArray),I.sortObjects===!0&&S.sort(_t,Bt),Gt=Rt.enabled===!1||Rt.isPresenting===!1||Rt.hasDepthSensing()===!1,Gt&&Yt.addToRenderList(S,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&Dt.beginShadows();const k=b.state.shadowsArray;if(Ft.render(k,T,F),st===!0&&Dt.endShadows(),(H&&w.hasRenderPass())===!1){const Et=S.opaque,vt=S.transmissive;if(b.setupLights(),F.isArrayCamera){const wt=F.cameras;if(vt.length>0)for(let Ct=0,Zt=wt.length;Ct<Zt;Ct++){const Qt=wt[Ct];Lc(Et,vt,T,Qt)}Gt&&Yt.render(T);for(let Ct=0,Zt=wt.length;Ct<Zt;Ct++){const Qt=wt[Ct];Pc(S,T,Qt,Qt.viewport)}}else vt.length>0&&Lc(Et,vt,T,F),Gt&&Yt.render(T),Pc(S,T,F)}Y!==null&&z===0&&(Z.updateMultisampleRenderTarget(Y),Z.updateRenderTargetMipmap(Y)),H&&w.end(I),T.isScene===!0&&T.onAfterRender(I,T,F),Mt.resetDefaultState(),W=-1,K=null,v.pop(),v.length>0?(b=v[v.length-1],Z.setTextureUnits(b.state.textureUnits),st===!0&&Dt.setGlobalState(I.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?S=A[A.length-1]:S=null,D!==null&&D.renderEnd()};function pa(T,F,q,H){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(nt)){H&&Nt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(at);const Et=tt.update(T),vt=T.material;vt.visible&&S.push(T,Et,vt,q,Nt.z,null,F)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(nt))){const Et=tt.update(T),vt=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Nt.copy(T.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Nt.copy(Et.boundingSphere.center)),Nt.applyMatrix4(T.matrixWorld).applyMatrix4(at)),Array.isArray(vt)){const wt=Et.groups;for(let Ct=0,Zt=wt.length;Ct<Zt;Ct++){const Qt=wt[Ct],At=vt[Qt.materialIndex];At&&At.visible&&S.push(T,Et,At,q,Nt.z,Qt,F)}}else vt.visible&&S.push(T,Et,vt,q,Nt.z,null,F)}}const xt=T.children;for(let Et=0,vt=xt.length;Et<vt;Et++)pa(xt[Et],F,q,H)}function Pc(T,F,q,H){const{opaque:k,transmissive:xt,transparent:Et}=T;b.setupLightsView(q),st===!0&&Dt.setGlobalState(I.clippingPlanes,q),H&&M.viewport(j.copy(H)),k.length>0&&tr(k,F,q),xt.length>0&&tr(xt,F,q),Et.length>0&&tr(Et,F,q),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Lc(T,F,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[H.id]===void 0){const At=Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[H.id]=new En(1,1,{generateMipmaps:!0,type:At?Gn:fn,minFilter:Ai,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ee.workingColorSpace})}const xt=b.state.transmissionRenderTarget[H.id],Et=H.viewport||j;xt.setSize(Et.z*I.transmissionResolutionScale,Et.w*I.transmissionResolutionScale);const vt=I.getRenderTarget(),wt=I.getActiveCubeFace(),Ct=I.getActiveMipmapLevel();I.setRenderTarget(xt),I.getClearColor(oe),Jt=I.getClearAlpha(),Jt<1&&I.setClearColor(16777215,.5),I.clear(),Gt&&Yt.render(q);const Zt=I.toneMapping;I.toneMapping=On;const Qt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),b.setupLightsView(H),st===!0&&Dt.setGlobalState(I.clippingPlanes,H),tr(T,q,H),Z.updateMultisampleRenderTarget(xt),Z.updateRenderTargetMipmap(xt),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let ue=0,Ce=F.length;ue<Ce;ue++){const Te=F[ue],{object:ve,geometry:He,material:bt,group:$e}=Te;if(bt.side===un&&ve.layers.test(H.layers)){const ie=bt.side;bt.side=Ye,bt.needsUpdate=!0,Dc(ve,q,H,He,bt,$e),bt.side=ie,bt.needsUpdate=!0,At=!0}}At===!0&&(Z.updateMultisampleRenderTarget(xt),Z.updateRenderTargetMipmap(xt))}I.setRenderTarget(vt,wt,Ct),I.setClearColor(oe,Jt),Qt!==void 0&&(H.viewport=Qt),I.toneMapping=Zt}function tr(T,F,q){const H=F.isScene===!0?F.overrideMaterial:null;for(let k=0,xt=T.length;k<xt;k++){const Et=T[k],{object:vt,geometry:wt,group:Ct}=Et;let Zt=Et.material;Zt.allowOverride===!0&&H!==null&&(Zt=H),vt.layers.test(q.layers)&&Dc(vt,F,q,wt,Zt,Ct)}}function Dc(T,F,q,H,k,xt){D!==null&&k.isNodeMaterial&&D.setObject(T,k),T.onBeforeRender(I,F,q,H,k,xt),T.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(I,F,q,H,T,xt),k.transparent===!0&&k.side===un&&k.forceSinglePass===!1?(k.side=Ye,k.needsUpdate=!0,I.renderBufferDirect(q,F,H,k,T,xt),k.side=Li,k.needsUpdate=!0,I.renderBufferDirect(q,F,H,k,T,xt),k.side=un):I.renderBufferDirect(q,F,H,k,T,xt),T.onAfterRender(I,F,q,H,k,xt)}function er(T,F,q){F.isScene!==!0&&(F=Ut);const H=X.get(T),k=b.state.lights,xt=b.state.shadowsArray,Et=k.state.version,vt=ft.getParameters(T,k.state,xt,F,q,b.state.lightProbeGridArray),wt=ft.getProgramCacheKey(vt);let Ct=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?F.environment:null,H.fog=F.fog;const Zt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=ot.get(T.envMap||H.environment,Zt),H.envMapRotation=H.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Ct===void 0&&(T.addEventListener("dispose",wn),Ct=new Map,H.programs=Ct);let Qt=Ct.get(wt);if(Qt!==void 0){if(H.currentProgram===Qt&&H.lightsStateVersion===Et)return Uc(T,vt),Qt}else vt.uniforms=ft.getUniforms(T),D!==null&&T.isNodeMaterial&&D.build(T,q,vt),T.onBeforeCompile(vt,I),Qt=ft.acquireProgram(vt,wt),Ct.set(wt,Qt),H.uniforms=vt.uniforms;const At=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(At.clippingPlanes=Dt.uniform),Uc(T,vt),H.needsLights=Du(T),H.lightsStateVersion=Et,H.needsLights&&(At.ambientLightColor.value=k.state.ambient,At.lightProbe.value=k.state.probe,At.sunLights.value=k.state.sun,At.sunLightShadows.value=k.state.sunShadow,At.directionalLights.value=k.state.directional,At.directionalLightShadows.value=k.state.directionalShadow,At.spotLights.value=k.state.spot,At.spotLightShadows.value=k.state.spotShadow,At.rectAreaLights.value=k.state.rectArea,At.ltc_1.value=k.state.rectAreaLTC1,At.ltc_2.value=k.state.rectAreaLTC2,At.pointLights.value=k.state.point,At.pointLightShadows.value=k.state.pointShadow,At.hemisphereLights.value=k.state.hemi,At.sunShadowMatrix.value=k.state.sunShadowMatrix,At.sunShadowCascade.value=k.state.sunShadowCascade,At.directionalShadowMatrix.value=k.state.directionalShadowMatrix,At.spotLightMatrix.value=k.state.spotLightMatrix,At.spotLightMap.value=k.state.spotLightMap,At.pointShadowMatrix.value=k.state.pointShadowMatrix),H.lightProbeGrid=b.state.lightProbeGridArray.length>0,H.currentProgram=Qt,H.uniformsList=null,Qt}function Ic(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=Yr.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Uc(T,F){const q=X.get(T);q.outputColorSpace=F.outputColorSpace,q.batching=F.batching,q.batchingColor=F.batchingColor,q.instancing=F.instancing,q.instancingColor=F.instancingColor,q.instancingMorph=F.instancingMorph,q.skinning=F.skinning,q.morphTargets=F.morphTargets,q.morphNormals=F.morphNormals,q.morphColors=F.morphColors,q.morphTargetsCount=F.morphTargetsCount,q.numClippingPlanes=F.numClippingPlanes,q.numIntersection=F.numClipIntersection,q.vertexAlphas=F.vertexAlphas,q.vertexTangents=F.vertexTangents,q.toneMapping=F.toneMapping}function Cu(T,F){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;x.setFromMatrixPosition(F.matrixWorld);for(let q=0,H=T.length;q<H;q++){const k=T[q];if(k.texture!==null&&k.boundingBox.containsPoint(x))return k}return null}function Pu(T,F,q,H,k){F.isScene!==!0&&(F=Ut),Z.resetTextureUnits();const xt=F.fog,Et=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?F.environment:null,vt=Y===null?I.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ee.workingColorSpace,wt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ct=ot.get(H.envMap||Et,wt),Zt=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Qt=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),At=!!q.morphAttributes.position,ue=!!q.morphAttributes.normal,Ce=!!q.morphAttributes.color;let Te=On;H.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Te=I.toneMapping);const ve=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,He=ve!==void 0?ve.length:0,bt=X.get(H),$e=b.state.lights;if(st===!0&&(rt===!0||T!==K)){const Se=T===K&&H.id===W;Dt.setState(H,T,Se)}let ie=!1;H.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==$e.state.version||bt.outputColorSpace!==vt||k.isBatchedMesh&&bt.batching===!1||!k.isBatchedMesh&&bt.batching===!0||k.isBatchedMesh&&bt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&bt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&bt.instancing===!1||!k.isInstancedMesh&&bt.instancing===!0||k.isSkinnedMesh&&bt.skinning===!1||!k.isSkinnedMesh&&bt.skinning===!0||k.isInstancedMesh&&bt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&bt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&bt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&bt.instancingMorph===!1&&k.morphTexture!==null||bt.envMap!==Ct||H.fog===!0&&bt.fog!==xt||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==Dt.numPlanes||bt.numIntersection!==Dt.numIntersection)||bt.vertexAlphas!==Zt||bt.vertexTangents!==Qt||bt.morphTargets!==At||bt.morphNormals!==ue||bt.morphColors!==Ce||bt.toneMapping!==Te||bt.morphTargetsCount!==He||!!bt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ie=!0):(ie=!0,bt.__version=H.version);let ln=bt.currentProgram;ie===!0&&(ln=er(H,F,k),D&&H.isNodeMaterial&&D.onUpdateProgram(H,ln,bt));let An=!1,si=!1,Bi=!1;const _e=ln.getUniforms(),Re=bt.uniforms;if(M.useProgram(ln.program)&&(An=!0,si=!0,Bi=!0),H.id!==W&&(W=H.id,si=!0),bt.needsLights){const Se=Cu(b.state.lightProbeGridArray,k);bt.lightProbeGrid!==Se&&(bt.lightProbeGrid=Se,si=!0)}if(An||K!==T){M.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),_e.setValue(N,"projectionMatrix",T.projectionMatrix),_e.setValue(N,"viewMatrix",T.matrixWorldInverse);const ai=_e.map.cameraPosition;ai!==void 0&&ai.setValue(N,ht.setFromMatrixPosition(T.matrixWorld)),C.logarithmicDepthBuffer&&_e.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&_e.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),K!==T&&(K=T,si=!0,Bi=!0)}if(bt.needsLights&&($e.state.sunShadowMap.length>0&&_e.setValue(N,"sunShadowMap",$e.state.sunShadowMap,Z),$e.state.directionalShadowMap.length>0&&_e.setValue(N,"directionalShadowMap",$e.state.directionalShadowMap,Z),$e.state.spotShadowMap.length>0&&_e.setValue(N,"spotShadowMap",$e.state.spotShadowMap,Z),$e.state.pointShadowMap.length>0&&_e.setValue(N,"pointShadowMap",$e.state.pointShadowMap,Z)),k.isSkinnedMesh){_e.setOptional(N,k,"bindMatrix"),_e.setOptional(N,k,"bindMatrixInverse");const Se=k.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),_e.setValue(N,"boneTexture",Se.boneTexture,Z))}k.isBatchedMesh&&(_e.setOptional(N,k,"batchingTexture"),_e.setValue(N,"batchingTexture",k._matricesTexture,Z),_e.setOptional(N,k,"batchingIdTexture"),_e.setValue(N,"batchingIdTexture",k._indirectTexture,Z),_e.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&_e.setValue(N,"batchingColorTexture",k._colorsTexture,Z));const ri=q.morphAttributes;if((ri.position!==void 0||ri.normal!==void 0||ri.color!==void 0)&&B.update(k,q,ln),(si||bt.receiveShadow!==k.receiveShadow)&&(bt.receiveShadow=k.receiveShadow,_e.setValue(N,"receiveShadow",k.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&F.environment!==null&&(Re.envMapIntensity.value=F.environmentIntensity),Re.dfgLUT!==void 0&&(Re.dfgLUT.value=Z_()),si){if(_e.setValue(N,"toneMappingExposure",I.toneMappingExposure),bt.needsLights&&Lu(Re,Bi),xt&&H.fog===!0&&Lt.refreshFogUniforms(Re,xt),Lt.refreshMaterialUniforms(Re,H,et,J,b.state.transmissionRenderTarget[T.id]),bt.needsLights&&bt.lightProbeGrid){const Se=bt.lightProbeGrid;Re.probesSH.value=Se.texture,Re.probesMin.value.copy(Se.boundingBox.min),Re.probesMax.value.copy(Se.boundingBox.max),Re.probesResolution.value.copy(Se.resolution)}Yr.upload(N,Ic(bt),Re,Z)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Yr.upload(N,Ic(bt),Re,Z),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&_e.setValue(N,"center",k.center),_e.setValue(N,"modelViewMatrix",k.modelViewMatrix),_e.setValue(N,"normalMatrix",k.normalMatrix),_e.setValue(N,"modelMatrix",k.matrixWorld),H.uniformsGroups!==void 0){const Se=H.uniformsGroups;for(let ai=0,zi=Se.length;ai<zi;ai++){const Fc=Se[ai];it.update(Fc,ln),it.bind(Fc,ln)}}return ln}function Lu(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.sunLights.needsUpdate=F,T.sunLightShadows.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function Du(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(T,F,q){const H=X.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),X.get(T.texture).__webglTexture=F,X.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){const q=X.get(T);q.__webglFramebuffer=F,q.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(T,F=0,q=0){Y=T,V=F,z=q;let H=null,k=!1,xt=!1;if(T){const vt=X.get(T);if(vt.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(N.FRAMEBUFFER,vt.__webglFramebuffer),j.copy(T.viewport),Pt.copy(T.scissor),Tt=T.scissorTest,M.viewport(j),M.scissor(Pt),M.setScissorTest(Tt),W=-1;return}else if(vt.__webglFramebuffer===void 0)Z.setupRenderTarget(T);else if(vt.__hasExternalTextures)Z.rebindTextures(T,X.get(T.texture).__webglTexture,X.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Zt=T.depthTexture;if(vt.__boundDepthTexture!==Zt){if(Zt!==null&&X.has(Zt)&&(T.width!==Zt.image.width||T.height!==Zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(T)}}const wt=T.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(xt=!0);const Ct=X.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ct[F])?H=Ct[F][q]:H=Ct[F],k=!0):T.samples>0&&Z.useMultisampledRTT(T)===!1?H=X.get(T).__webglMultisampledFramebuffer:Array.isArray(Ct)?H=Ct[q]:H=Ct,j.copy(T.viewport),Pt.copy(T.scissor),Tt=T.scissorTest}else j.copy(St).multiplyScalar(et).floor(),Pt.copy(zt).multiplyScalar(et).floor(),Tt=de;if(q!==0&&(H=U),M.bindFramebuffer(N.FRAMEBUFFER,H)&&M.drawBuffers(T,H),M.viewport(j),M.scissor(Pt),M.setScissorTest(Tt),k){const vt=X.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,vt.__webglTexture,q)}else if(xt){const vt=F;for(let wt=0;wt<T.textures.length;wt++){const Ct=X.get(T.textures[wt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+wt,Ct.__webglTexture,q,vt)}}else if(T!==null&&q!==0){const vt=X.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,vt.__webglTexture,q)}W=-1};function Nc(T){const F=X.get(T);return(F.__readFormat!==T.format||F.__readType!==T.type)&&(F.__readFormat=T.format,F.__readType=T.type,F.__formatReadable=C.textureFormatReadable(T.format),F.__typeReadable=C.textureTypeReadable(T.type)),F}this.readRenderTargetPixels=function(T,F,q,H,k,xt,Et,vt=0){if(!(T&&T.isWebGLRenderTarget)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=X.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Et!==void 0&&(wt=wt[Et]),wt){M.bindFramebuffer(N.FRAMEBUFFER,wt);try{const Ct=T.textures[vt],Zt=Ct.format,Qt=Ct.type;T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+vt);const At=Nc(Ct);if(At.__formatReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-H&&q>=0&&q<=T.height-k&&N.readPixels(F,q,H,k,mt.convert(Zt),mt.convert(Qt),xt)}finally{const Ct=Y!==null?X.get(Y).__webglFramebuffer:null;M.bindFramebuffer(N.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(T,F,q,H,k,xt,Et,vt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=X.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Et!==void 0&&(wt=wt[Et]),wt)if(F>=0&&F<=T.width-H&&q>=0&&q<=T.height-k){M.bindFramebuffer(N.FRAMEBUFFER,wt);const Ct=T.textures[vt],Zt=Ct.format,Qt=Ct.type;T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+vt);const At=Nc(Ct);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ue=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ue),N.bufferData(N.PIXEL_PACK_BUFFER,xt.byteLength,N.STREAM_READ),N.readPixels(F,q,H,k,mt.convert(Zt),mt.convert(Qt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);const Ce=Y!==null?X.get(Y).__webglFramebuffer:null;M.bindFramebuffer(N.FRAMEBUFFER,Ce);const Te=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await mf(N,Te,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ue),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,xt),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(ue),N.deleteSync(Te),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,q=0){const H=Math.pow(2,-q),k=Math.floor(T.image.width*H),xt=Math.floor(T.image.height*H),Et=F!==null?F.x:0,vt=F!==null?F.y:0;Z.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,q,0,0,Et,vt,k,xt),M.unbindTexture()},this.copyTextureToTexture=function(T,F,q=null,H=null,k=0,xt=0){let Et,vt,wt,Ct,Zt,Qt,At,ue,Ce;const Te=T.isCompressedTexture?T.mipmaps[xt]:T.image;if(q!==null)Et=q.max.x-q.min.x,vt=q.max.y-q.min.y,wt=q.isBox3?q.max.z-q.min.z:1,Ct=q.min.x,Zt=q.min.y,Qt=q.isBox3?q.min.z:0;else{const Re=Math.pow(2,-k);Et=Math.floor(Te.width*Re),vt=Math.floor(Te.height*Re),T.isDataArrayTexture?wt=Te.depth:T.isData3DTexture?wt=Math.floor(Te.depth*Re):wt=1,Ct=0,Zt=0,Qt=0}H!==null?(At=H.x,ue=H.y,Ce=H.z):(At=0,ue=0,Ce=0);const ve=mt.convert(F.format),He=mt.convert(F.type);let bt;F.isData3DTexture?(Z.setTexture3D(F,0),bt=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Z.setTexture2DArray(F,0),bt=N.TEXTURE_2D_ARRAY):(Z.setTexture2D(F,0),bt=N.TEXTURE_2D),M.activeTexture(N.TEXTURE0),M.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),M.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),M.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const $e=M.getParameter(N.UNPACK_ROW_LENGTH),ie=M.getParameter(N.UNPACK_IMAGE_HEIGHT),ln=M.getParameter(N.UNPACK_SKIP_PIXELS),An=M.getParameter(N.UNPACK_SKIP_ROWS),si=M.getParameter(N.UNPACK_SKIP_IMAGES);M.pixelStorei(N.UNPACK_ROW_LENGTH,Te.width),M.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Te.height),M.pixelStorei(N.UNPACK_SKIP_PIXELS,Ct),M.pixelStorei(N.UNPACK_SKIP_ROWS,Zt),M.pixelStorei(N.UNPACK_SKIP_IMAGES,Qt);const Bi=T.isDataArrayTexture||T.isData3DTexture,_e=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const Re=X.get(T),ri=X.get(F),Se=X.get(Re.__renderTarget),ai=X.get(ri.__renderTarget);M.bindFramebuffer(N.READ_FRAMEBUFFER,Se.__webglFramebuffer),M.bindFramebuffer(N.DRAW_FRAMEBUFFER,ai.__webglFramebuffer);for(let zi=0;zi<wt;zi++)Bi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,X.get(T).__webglTexture,k,Qt+zi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,X.get(F).__webglTexture,xt,Ce+zi)),N.blitFramebuffer(Ct,Zt,Et,vt,At,ue,Et,vt,N.DEPTH_BUFFER_BIT,N.NEAREST);M.bindFramebuffer(N.READ_FRAMEBUFFER,null),M.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||T.isRenderTargetTexture||X.has(T)){const Re=X.get(T),ri=X.get(F);M.bindFramebuffer(N.READ_FRAMEBUFFER,L),M.bindFramebuffer(N.DRAW_FRAMEBUFFER,O);for(let Se=0;Se<wt;Se++)Bi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Re.__webglTexture,k,Qt+Se):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Re.__webglTexture,k),_e?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ri.__webglTexture,xt,Ce+Se):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ri.__webglTexture,xt),k!==0?N.blitFramebuffer(Ct,Zt,Et,vt,At,ue,Et,vt,N.COLOR_BUFFER_BIT,N.NEAREST):_e?N.copyTexSubImage3D(bt,xt,At,ue,Ce+Se,Ct,Zt,Et,vt):N.copyTexSubImage2D(bt,xt,At,ue,Ct,Zt,Et,vt);M.bindFramebuffer(N.READ_FRAMEBUFFER,null),M.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else _e?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(bt,xt,At,ue,Ce,Et,vt,wt,ve,He,Te.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(bt,xt,At,ue,Ce,Et,vt,wt,ve,Te.data):N.texSubImage3D(bt,xt,At,ue,Ce,Et,vt,wt,ve,He,Te):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,xt,At,ue,Et,vt,ve,He,Te.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,xt,At,ue,Te.width,Te.height,ve,Te.data):N.texSubImage2D(N.TEXTURE_2D,xt,At,ue,Et,vt,ve,He,Te);M.pixelStorei(N.UNPACK_ROW_LENGTH,$e),M.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ie),M.pixelStorei(N.UNPACK_SKIP_PIXELS,ln),M.pixelStorei(N.UNPACK_SKIP_ROWS,An),M.pixelStorei(N.UNPACK_SKIP_IMAGES,si),xt===0&&F.generateMipmaps&&N.generateMipmap(bt),M.unbindTexture()},this.initRenderTarget=function(T){X.get(T).__webglFramebuffer===void 0&&Z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Z.setTextureCube(T,0):T.isData3DTexture?Z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Z.setTexture2DArray(T,0):Z.setTexture2D(T,0),M.unbindTexture()},this.resetState=function(){V=0,z=0,Y=null,M.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}class uu{constructor(t=new R(0,0,0),e=new R(0,1,0),n=1){this.start=t,this.end=e,this.radius=n}clone(){return new this.constructor().copy(this)}set(t,e,n){return this.start.copy(t),this.end.copy(e),this.radius=n,this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this.radius=t.radius,this}getCenter(t){return t.copy(this.end).add(this.start).multiplyScalar(.5)}translate(t){return this.start.add(t),this.end.add(t),this}intersectsBox(t){return Qa(this.start.x,this.start.y,this.end.x,this.end.y,t.min.x,t.max.x,t.min.y,t.max.y,this.radius)&&Qa(this.start.x,this.start.z,this.end.x,this.end.z,t.min.x,t.max.x,t.min.z,t.max.z,this.radius)&&Qa(this.start.y,this.start.z,this.end.y,this.end.z,t.min.y,t.max.y,t.min.z,t.max.z,this.radius)}}function Qa(s,t,e,n,i,r,a,o,l){return(i-s<l||i-e<l)&&(s-r<l||e-r<l)&&(a-t<l||a-n<l)&&(t-o<l||n-o<l)}const Mn=new R,Is=new R,Nr=new R,Us=new R,Xe=new $n,ja=new Sc,J_=new Sc,Fr=new Tn,Or=new Oi,Ns=new uu,Zl=new R,K_=new R,Q_=new R,j_=new R,tv=1e-10;function ev(s,t,e=null,n=null){const i=K_.copy(s.end).sub(s.start),r=Q_.copy(t.end).sub(t.start),a=j_.copy(t.start).sub(s.start),o=i.dot(r),l=i.dot(i),c=r.dot(r),h=r.dot(a),f=i.dot(a);let u,d;const p=l*c-o*o;if(Math.abs(p)<tv){const _=-h/c,g=(o-h)/c;Math.abs(_-.5)<Math.abs(g-.5)?(u=0,d=_):(u=1,d=g)}else u=(h*o+f*c)/p,d=(u*o-h)/c;d=Math.max(0,Math.min(1,d)),u=Math.max(0,Math.min(1,u)),e&&e.copy(i).multiplyScalar(u).add(s.start),n&&n.copy(r).multiplyScalar(d).add(t.start)}class yc{constructor(t){this.box=t,this.bounds=new Tn,this.layers=new aa,this.trianglesPerLeaf=8,this.maxLevel=16,this.subTrees=[],this.triangles=[]}addTriangle(t){return this.bounds.min.x=Math.min(this.bounds.min.x,t.a.x,t.b.x,t.c.x),this.bounds.min.y=Math.min(this.bounds.min.y,t.a.y,t.b.y,t.c.y),this.bounds.min.z=Math.min(this.bounds.min.z,t.a.z,t.b.z,t.c.z),this.bounds.max.x=Math.max(this.bounds.max.x,t.a.x,t.b.x,t.c.x),this.bounds.max.y=Math.max(this.bounds.max.y,t.a.y,t.b.y,t.c.y),this.bounds.max.z=Math.max(this.bounds.max.z,t.a.z,t.b.z,t.c.z),this.triangles.push(t),this}calcBox(){return this.box=this.bounds.clone(),this.box.min.x-=.01,this.box.min.y-=.01,this.box.min.z-=.01,this}split(t){if(!this.box)return;const e=[],n=Is.copy(this.box.max).sub(this.box.min).multiplyScalar(.5);for(let r=0;r<2;r++)for(let a=0;a<2;a++)for(let o=0;o<2;o++){const l=new Tn,c=Mn.set(r,a,o);l.min.copy(this.box.min).add(c.multiply(n)),l.max.copy(l.min).add(n),e.push(new yc(l))}let i;for(;i=this.triangles.pop();)for(let r=0;r<e.length;r++)e[r].box.intersectsTriangle(i)&&e[r].triangles.push(i);for(let r=0;r<e.length;r++){const a=e[r].triangles.length;a>this.trianglesPerLeaf&&t<this.maxLevel&&e[r].split(t+1),a!==0&&this.subTrees.push(e[r])}return this}build(){return this.calcBox(),this.split(0),this}getRayTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let r=0;r<i.triangles.length;r++)e.indexOf(i.triangles[r])===-1&&e.push(i.triangles[r]);else i.getRayTriangles(t,e)}}triangleCapsuleIntersect(t,e){e.getPlane(Xe);const n=Xe.distanceToPoint(t.start)-t.radius,i=Xe.distanceToPoint(t.end)-t.radius;if(n>0&&i>0||n<-t.radius&&i<-t.radius)return!1;const r=Math.abs(n/(Math.abs(n)+Math.abs(i))),a=Mn.copy(t.start).lerp(t.end,r);if(e.containsPoint(a))return{normal:Xe.normal.clone(),point:a.clone(),depth:Math.abs(Math.min(n,i))};const o=t.radius*t.radius,l=ja.set(t.start,t.end),c=[[e.a,e.b],[e.b,e.c],[e.c,e.a]];for(let h=0;h<c.length;h++){const f=J_.set(c[h][0],c[h][1]);if(ev(l,f,Nr,Us),Nr.distanceToSquared(Us)<o)return{normal:Nr.clone().sub(Us).normalize(),point:Us.clone(),depth:t.radius-Nr.distanceTo(Us)}}return!1}triangleBoxIntersect(t,e){if(Math.max(e.a.x,e.b.x,e.c.x)<t.min.x||Math.min(e.a.x,e.b.x,e.c.x)>t.max.x||Math.max(e.a.y,e.b.y,e.c.y)<t.min.y||Math.min(e.a.y,e.b.y,e.c.y)>t.max.y||Math.max(e.a.z,e.b.z,e.c.z)<t.min.z||Math.min(e.a.z,e.b.z,e.c.z)>t.max.z||!t.intersectsTriangle(e))return!1;e.getPlane(Xe),Mn.x=Xe.normal.x>0?t.min.x:t.max.x,Mn.y=Xe.normal.y>0?t.min.y:t.max.y,Mn.z=Xe.normal.z>0?t.min.z:t.max.z;const n=Xe.distanceToPoint(Mn),i={depth:-n,normal:Xe.normal.clone(),point:Mn.clone()};return i.point.addScaledVector(i.normal,n),i}triangleSphereIntersect(t,e){if(e.getPlane(Xe),!t.intersectsPlane(Xe))return!1;const n=Math.abs(Xe.distanceToSphere(t)),i=t.radius*t.radius-n*n,r=Xe.projectPoint(t.center,Mn);if(e.containsPoint(t.center))return{normal:Xe.normal.clone(),point:r.clone(),depth:Math.abs(Xe.distanceToSphere(t))};const a=[[e.a,e.b],[e.b,e.c],[e.c,e.a]];for(let o=0;o<a.length;o++){ja.set(a[o][0],a[o][1]),ja.closestPointToPoint(r,!0,Is);const l=Is.distanceToSquared(t.center);if(l<i)return{normal:t.center.clone().sub(Is).normalize(),point:Is.clone(),depth:t.radius-Math.sqrt(l)}}return!1}getSphereTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let r=0;r<i.triangles.length;r++)e.indexOf(i.triangles[r])===-1&&e.push(i.triangles[r]);else i.getSphereTriangles(t,e)}}getBoxTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let r=0;r<i.triangles.length;r++)e.indexOf(i.triangles[r])===-1&&e.push(i.triangles[r]);else i.getBoxTriangles(t,e)}}getCapsuleTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let r=0;r<i.triangles.length;r++)e.indexOf(i.triangles[r])===-1&&e.push(i.triangles[r]);else i.getCapsuleTriangles(t,e)}}boxIntersect(t){Fr.copy(t);const e=[];let n,i=!1;this.getBoxTriangles(t,e);for(let r=0;r<e.length;r++)(n=this.triangleBoxIntersect(Fr,e[r]))&&(i=!0,Fr.translate(n.normal.multiplyScalar(n.depth)));if(i){const r=Fr.getCenter(Zl).sub(t.getCenter(Mn)),a=r.length();return{normal:r.normalize(),depth:a}}return!1}sphereIntersect(t){Or.copy(t);const e=[];let n,i=!1;this.getSphereTriangles(t,e);for(let r=0;r<e.length;r++)(n=this.triangleSphereIntersect(Or,e[r]))&&(i=!0,Or.center.add(n.normal.multiplyScalar(n.depth)));if(i){const r=Or.center.clone().sub(t.center),a=r.length();return{normal:r.normalize(),depth:a}}return!1}capsuleIntersect(t){Ns.copy(t);const e=[];let n,i=!1;this.getCapsuleTriangles(Ns,e);for(let r=0;r<e.length;r++)(n=this.triangleCapsuleIntersect(Ns,e[r]))&&(i=!0,Ns.translate(n.normal.multiplyScalar(n.depth)));if(i){const r=Ns.getCenter(Zl).sub(t.getCenter(Mn)),a=r.length();return{normal:r.normalize(),depth:a}}return!1}rayIntersect(t){const e=[];let n,i,r=1e100;this.getRayTriangles(t,e);for(let a=0;a<e.length;a++){const o=t.intersectTriangle(e[a].a,e[a].b,e[a].c,!0,Mn);if(o){const l=o.sub(t.origin).length();r>l&&(i=o.clone().add(t.origin),r=l,n=e[a])}}return r<1e100?{distance:r,triangle:n,position:i}:!1}fromGraphNode(t){return t.updateWorldMatrix(!0,!0),t.traverse(e=>{if(e.isMesh===!0&&this.layers.test(e.layers)){let n,i=!1;e.geometry.index!==null?(i=!0,n=e.geometry.toNonIndexed()):n=e.geometry;const r=n.getAttribute("position");for(let a=0;a<r.count;a+=3){const o=new R().fromBufferAttribute(r,a),l=new R().fromBufferAttribute(r,a+1),c=new R().fromBufferAttribute(r,a+2);o.applyMatrix4(e.matrixWorld),l.applyMatrix4(e.matrixWorld),c.applyMatrix4(e.matrixWorld),this.addTriangle(new nn(o,l,c))}i&&n.dispose()}}),this.build(),this}clear(){return this.box=null,this.bounds.makeEmpty(),this.subTrees.length=0,this.triangles.length=0,this}}ut.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ct},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};tn.line={uniforms:Mc.merge([ut.common,ut.fog,ut.line]),vertexShader:`
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
		`};class fu extends mn{constructor(t){super({type:"LineMaterial",uniforms:Mc.clone(tn.line.uniforms),vertexShader:tn.line.vertexShader,fragmentShader:tn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const $l=new Tn,Br=new R;class du extends Wd{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ae(t,3)),this.setAttribute("uv",new ae(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new Qo(e,6,1);return this.setAttribute("instanceStart",new Nn(n,3,0)),this.setAttribute("instanceEnd",new Nn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new Qo(e,6,1);return this.setAttribute("instanceColorStart",new Nn(n,3,0)),this.setAttribute("instanceColorEnd",new Nn(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Od(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),$l.setFromBufferAttribute(e),this.boundingBox.union($l))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Br.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Br)),Br.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Br));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const to=new xe,Jl=new R,Kl=new R,Fe=new xe,Oe=new xe,Pn=new xe,eo=new R,no=new Ee,Be=new Sc,Ql=new R,zr=new Tn,Gr=new Oi,Ln=new xe;let Dn,Ci;function jl(s,t,e){return Ln.set(0,0,-t,1).applyMatrix4(s.projectionMatrix),Ln.multiplyScalar(1/Ln.w),Ln.x=Ci/e.width,Ln.y=Ci/e.height,Ln.applyMatrix4(s.projectionMatrixInverse),Ln.multiplyScalar(1/Ln.w),Math.abs(Math.max(Ln.x,Ln.y))}function nv(s,t){const e=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){Be.start.fromBufferAttribute(i,o),Be.end.fromBufferAttribute(r,o),Be.applyMatrix4(e);const c=new R,h=new R;Dn.distanceSqToSegment(Be.start,Be.end,h,c),h.distanceTo(c)<Ci*.5&&t.push({point:h,pointOnLine:c,distance:Dn.origin.distanceTo(h),object:s,face:null,faceIndex:o,uv:null,uv1:null})}}function iv(s,t,e){const n=t.projectionMatrix,r=s.material.resolution,a=s.matrixWorld,o=s.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),f=-t.near;Dn.at(1,Pn),Pn.w=1,Pn.applyMatrix4(t.matrixWorldInverse),Pn.applyMatrix4(n),Pn.multiplyScalar(1/Pn.w),Pn.x*=r.x/2,Pn.y*=r.y/2,Pn.z=0,eo.copy(Pn),no.multiplyMatrices(t.matrixWorldInverse,a);for(let u=0,d=h;u<d;u++){if(Fe.fromBufferAttribute(l,u),Oe.fromBufferAttribute(c,u),Fe.w=1,Oe.w=1,Fe.applyMatrix4(no),Oe.applyMatrix4(no),Fe.z>f&&Oe.z>f)continue;if(Fe.z>f){const E=Fe.z-Oe.z,x=(Fe.z-f)/E;Fe.lerp(Oe,x)}else if(Oe.z>f){const E=Oe.z-Fe.z,x=(Oe.z-f)/E;Oe.lerp(Fe,x)}Fe.applyMatrix4(n),Oe.applyMatrix4(n),Fe.multiplyScalar(1/Fe.w),Oe.multiplyScalar(1/Oe.w),Fe.x*=r.x/2,Fe.y*=r.y/2,Oe.x*=r.x/2,Oe.y*=r.y/2,Be.start.copy(Fe),Be.start.z=0,Be.end.copy(Oe),Be.end.z=0;const _=Be.closestPointToPointParameter(eo,!0);Be.at(_,Ql);const g=jt.lerp(Fe.z,Oe.z,_),m=g>=-1&&g<=1,y=eo.distanceTo(Ql)<Ci*.5;if(m&&y){Be.start.fromBufferAttribute(l,u),Be.end.fromBufferAttribute(c,u),Be.start.applyMatrix4(a),Be.end.applyMatrix4(a);const E=new R,x=new R;Dn.distanceSqToSegment(Be.start,Be.end,x,E),e.push({point:x,pointOnLine:E,distance:Dn.origin.distanceTo(x),object:s,face:null,faceIndex:u,uv:null,uv1:null})}}}class sv extends ge{constructor(t=new du,e=new fu({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,i=new Float32Array(2*e.count);for(let a=0,o=0,l=e.count;a<l;a++,o+=2)Jl.fromBufferAttribute(e,a),Kl.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+Jl.distanceTo(Kl);const r=new Qo(i,2,1);return t.setAttribute("instanceDistanceStart",new Nn(r,1,0)),t.setAttribute("instanceDistanceEnd",new Nn(r,1,1)),this}raycast(t,e){const n=this.material.worldUnits,i=t.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Dn=t.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Ci=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Gr.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Ci*.5;else{const f=Math.max(i.near,Gr.distanceToPoint(Dn.origin));c=jl(i,f,l.resolution)}if(Gr.radius+=c,Dn.intersectsSphere(Gr)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),zr.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=Ci*.5;else{const f=Math.max(i.near,zr.distanceToPoint(Dn.origin));h=jl(i,f,l.resolution)}zr.expandByScalar(h),Dn.intersectsBox(zr)!==!1&&(n?nv(this,e):iv(this,i,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(to),this.material.uniforms.resolution.value.set(to.z,to.w))}}function pu(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new be;let c=0;for(let h=0;h<s.length;++h){const f=s[h];let u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const f=[];for(let u=0;u<s.length;++u){const d=s[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=s[u].attributes.position.count}l.setIndex(f)}for(const h in r){const f=th(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(const h in a){const f=a[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){const d=[];for(let _=0;_<a[h].length;++_)d.push(a[h][_][u]);const p=th(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function th(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new pn(a,e,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const f=l/e;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<e;p++){const _=h.getComponent(u,p);o.setComponent(u+f,p,_)}}else a.set(h.array,l);l+=h.count*e}return i!==void 0&&(o.gpuType=i),o}const mu=16777215,rv=1118481;function ia(s){const t=String(s);let e=2166136261;for(let n=0;n<t.length;n++)e=Math.imul(e^t.charCodeAt(n),16777619);return e>>>0}function Pi(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}const av=(s,t,e)=>`
  float tintaEscala(float z) {
    float r = max(z - ${s.toFixed(1)}, 0.0) / ${t.toFixed(1)};
    return ${e.toFixed(2)} + ${(1-e).toFixed(2)} / (1.0 + r * r);
  }`;function eh(s){const[t,e,n]=s==="arma"?[.5,3,.4]:[6,40,.22],i=new fu({color:16777215,vertexColors:!0,linewidth:s==="arma"?1.35:1,worldUnits:!1,alphaToCoverage:!0,toneMapped:!1});return i.depthWrite=!1,i.onBeforeCompile=r=>{r.vertexShader=r.vertexShader.replace("uniform float linewidth;",`uniform float linewidth;
        ${av(t,e,n)}
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
         gl_FragColor = vec4( mix(diffuseColor.rgb, vec3(1.0), nevoa * 0.85), alpha );`)},i.customProgramCacheKey=()=>"tinta-"+s,i}const sa={mundo:eh("mundo"),arma:eh("arma")},nc=new Vn({color:mu,side:un,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),nh=new Vn({color:mu,side:un,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:2}),gu=new Vn({color:rv});function ov(s,t=2.2){const e=new mn({uniforms:{resolucao:sa.arma.uniforms.resolution,largura:{value:t}},vertexShader:`
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
      }`,fragmentShader:"void main() { gl_FragColor = vec4(vec3(0.07), 1.0); }",side:Ye,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:6}),n=new ge(s,e);return n.frustumCulled=!1,n}function _u(s,t){sa.mundo.resolution.set(s,t),sa.arma.resolution.set(s,t)}const cv={aresta:2.9,pormenor:1.8,sombra:1.1,chao:1.4},lv={aresta:.02,pormenor:.08,sombra:.42,chao:.3};function hv(s,t,e,n,i=1,r=.8){const a=Pi(t),o=new R,l=new R,c=(h,f,u)=>{const d=o.distanceTo(l),p=Math.max(1,Math.min(6,Math.ceil(d*(f-h)/r))),_=a()*6.283,g=(e==="aresta"?.7:e==="sombra"?.2:.45)*i,m=u?(a()<.5?-1:1)*(.7+a()*.7)*i:0,y=E=>m+Math.sin(E*Math.PI)*Math.sin(E*5.2+_)*g;for(let E=0;E<p;E++){const x=h+(f-h)*E/p,S=h+(f-h)*(E+1)/p;n.pos.push(o.x+(l.x-o.x)*x,o.y+(l.y-o.y)*x,o.z+(l.z-o.z)*x,o.x+(l.x-o.x)*S,o.y+(l.y-o.y)*S,o.z+(l.z-o.z)*S),n.desv.push(y(x),y(S));const b=.5+.5*Math.sin(_+E*.73);n.larg.push(cv[e]*(u?.65:.85+b*.3));for(const A of[x,S]){const v=lv[e]+(u?.3:0)+(.5+.5*Math.sin(_+A*7.1))*.08,w=.067+(1-.067)*Math.min(1,v);n.cor.push(w,w,w)}}};for(let h=0;h<s.length;h+=6){if(o.set(s[h],s[h+1],s[h+2]),l.set(s[h+3],s[h+4],s[h+5]),o.distanceToSquared(l)<1e-8)continue;c(0,1,!1);const f=e==="aresta"?.35:e==="pormenor"?.12:0;if(a()<f){const u=a()*.35;c(u,Math.min(1,u+.3+a()*.45),!0)}}}function uv(s,t="mundo",e=!1){const n=new du().setPositions(s.pos).setColors(s.cor);n.setAttribute("instanceLargura",new ol(new Float32Array(s.larg),1)),n.setAttribute("instanceDesvio",new ol(new Float32Array(s.desv),2));const i=new sv(n,sa[t]);return i.renderOrder=2,i.frustumCulled=e,i.userData.semColisao=!0,i}class vi{constructor(t,e=1,n=.8){this.nome=t,this.desvio=e,this.passo=n}faces=[];linhas=new Map;n=0;linha(t,e="aresta",n=!1){const i=this.linhas.get(e)??[];this.linhas.set(e,i);for(let r=1;r<t.length;r++)i.push(...t[r-1],...t[r]);n&&t.length>2&&i.push(...t[t.length-1],...t[0])}segmentos(t,e="aresta"){const n=this.linhas.get(e)??[];this.linhas.set(e,n);for(const i of t)n.push(i)}tracejar(t,e,n,i=.25,r="sombra",a=.8){const o=Pi(ia(this.nome+":"+this.n++)),l=Math.hypot(...e),c=Math.hypot(...n);if(l<.05||c<.05)return;const h=(u,d)=>[t[0]+e[0]*u/l+n[0]*d/c,t[1]+e[1]*u/l+n[1]*d/c,t[2]+e[2]*u/l+n[2]*d/c],f=a*c;for(let u=-f;u<=l;u+=i*(.8+o()*.4)){if(o()<.1)continue;let d=Math.max(0,-u/a),p=Math.min(c,(l-u)/a);if(p<=d)continue;const _=p-d;d+=_*o()*.08,p-=_*o()*.14,this.linha([h(u+a*d,d),h(u+a*p,p)],r)}}solido(t,e="aresta",n=25){if(e){const r=new Wh(t,n);this.segmentos(Array.from(r.getAttribute("position").array),e),r.dispose()}const i=t.index?t.toNonIndexed():t;i.deleteAttribute("uv"),i.deleteAttribute("normal"),this.faces.push(i)}caixa(t,e,n,i,r,a,o=0,l="aresta"){const c=new sn(t,e,n);c.rotateY(o),c.translate(i,r,a),this.solido(c,l)}face(t,e="aresta"){const n=new be;n.setAttribute("position",new ae(t.flat(),3));const i=[];for(let r=1;r<t.length-1;r++)i.push(0,r,r+1);n.setIndex(i),this.solido(n,!1),e&&this.linha(t,e,!0)}acabar(t="mundo",e=nc,n=!1){const i=new ye;if(i.name=this.nome,this.faces.length){const a=pu(this.faces);if(a){const o=new ge(a,e);o.name=this.nome+":papel",i.add(o)}this.faces.forEach(o=>o.dispose())}const r={pos:[],cor:[],larg:[],desv:[]};for(const a of["sombra","chao","pormenor","aresta"]){const o=this.linhas.get(a);o?.length&&hv(o,ia(this.nome+a),a,r,this.desvio,this.passo)}return r.pos.length&&i.add(uv(r,t,n)),this.faces=[],this.linhas.clear(),i}}const Zn=(s,t,e)=>new R(s,e,-t),Wt=(s,t,e)=>[s,e,-t];function fv(s){const t=document.createElement("canvas"),e=t.getContext("2d"),n='600 64px "Patrick Hand", "Segoe Print", cursive';e.font=n,t.width=Math.ceil(e.measureText(s.toUpperCase()).width)+90,t.height=130,e.fillStyle="#fff",e.fillRect(0,0,t.width,t.height),e.strokeStyle="#111",e.lineWidth=5,e.strokeRect(8,8,t.width-16,t.height-16),e.lineWidth=2,e.strokeRect(20,20,t.width-40,t.height-40),e.font=n,e.fillStyle="#111",e.textAlign="center",e.textBaseline="middle",e.fillText(s.toUpperCase(),t.width/2,t.height/2+3);const i=new gc(t);i.colorSpace=Qe,i.anisotropy=4;const r=.5;return new ge(new Ss(r*t.width/t.height,r),new Vn({map:i,polygonOffset:!0,polygonOffsetFactor:-2}))}function ih(s,t,e,n){const i=t[0]-s[0],r=t[1]-s[1],a=n[0]-e[0],o=n[1]-e[1],l=i*o-r*a;if(Math.abs(l)<1e-9)return null;const c=((e[0]-s[0])*o-(e[1]-s[1])*a)/l,h=((e[0]-s[0])*r-(e[1]-s[1])*i)/l;return c>=0&&c<=1&&h>=0&&h<=1?c:null}function rs(s,t,e){let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const[a,o]=e[i],[l,c]=e[r];o>t!=c>t&&s<(l-a)*(t-o)/(c-o)+a&&(n=!n)}return n}const dv={"way/246397825":"way/121298535","way/1165517467":"way/1165517464"},sh="way/41222810",io="relation/3475986";class pv{constructor(t){this.n=t,this.nivelarClaustro();for(const e of t.edificios){const n=e.anel.map(r=>r[0]),i=e.anel.map(r=>r[1]);for(let r=Math.floor(Math.min(...n)/10);r<=Math.floor(Math.max(...n)/10);r++)for(let a=Math.floor(Math.min(...i)/10);a<=Math.floor(Math.max(...i)/10);a++){const o=r+","+a;this.grelha.has(o)||this.grelha.set(o,[]),this.grelha.get(o).push(e)}}}cena=new ye;colisao=new ye;pontos={};caminhoRota=[];grelha=new Map;quadriculas=new Map;quadricula(t,e){const n=Math.floor(t/48)+","+Math.floor(e/48);let i=this.quadriculas.get(n);return i||(i=new vi("cidade:"+n,1,1.4),this.quadriculas.set(n,i)),i}pisoClaustro=0;nivelarClaustro(){const t=this.n.edificios.find(a=>a.osm===io);if(!t||!t.furos[0])return;const e=this.n.dem,n=[],i=[];for(let a=0;a<e.nRow;a++)for(let o=0;o<e.nCol;o++){const l=e.x0+o*e.passo,c=e.y0+a*e.passo;rs(l,c,t.anel)&&(i.push(a*e.nCol+o),rs(l,c,t.furos[0])&&n.push(e.elev[a*e.nCol+o]))}n.sort((a,o)=>a-o);const r=n[n.length>>1];for(const a of i)e.elev[a]=Math.min(r+.4,Math.max(r-1.6,e.elev[a]));this.pisoClaustro=r+.4}chao(t,e){const n=this.n.dem,i=Math.max(0,Math.min(n.nCol-1.001,(t-n.x0)/n.passo)),r=Math.max(0,Math.min(n.nRow-1.001,(e-n.y0)/n.passo)),a=Math.floor(i),o=Math.floor(r),l=i-a,c=r-o,h=(f,u)=>n.elev[u*n.nCol+f];return(h(a,o)*(1-l)+h(a+1,o)*l)*(1-c)+(h(a,o+1)*(1-l)+h(a+1,o+1)*l)*c}edificioEm(t,e,n){for(const i of this.grelha.get(Math.floor(t/10)+","+Math.floor(e/10))??[])if(i!==n&&rs(t,e,i.anel)&&!i.furos.some(r=>rs(t,e,r)))return i;return null}construir(){this.terreno();for(const t of this.n.edificios){const e=t.anel.map(r=>r[0]),n=t.anel.map(r=>r[1]),i=this.quadricula(e.reduce((r,a)=>r+a)/e.length,n.reduce((r,a)=>r+a)/n.length);t.osm===io?this.claustro(t,i):this.edificio(t,i)}this.chaoDesenhado(),this.muros();for(const t of this.quadriculas.values())this.cena.add(t.acabar("mundo",nc,!0));this.limites(),this.marcarPontos(),this.mobiliario()}terreno(){const t=this.n.dem,e=[],n=[];for(let l=0;l<t.nRow;l++)for(let c=0;c<t.nCol;c++)e.push(...Wt(t.x0+c*t.passo,t.y0+l*t.passo,t.elev[l*t.nCol+c]));for(let l=0;l<t.nRow-1;l++)for(let c=0;c<t.nCol-1;c++){const h=l*t.nCol+c,f=h+1,u=h+t.nCol,d=u+1;n.push(h,f,u,f,d,u)}const i=new be;i.setAttribute("position",new ae(e,3)),i.setIndex(n),i.computeVertexNormals();const r=new ge(i,nc);r.name="terreno",this.cena.add(r),this.colisao.add(new ge(i));const o=new Wh(i,46).getAttribute("position").array;for(let l=0;l<o.length;l+=6){const c=(o[l]+o[l+3])/2,h=-(o[l+2]+o[l+5])/2;this.edificioEm(c,h)||this.quadricula(c,h).segmentos(Array.from(o.subarray(l,l+6)),"pormenor")}}paredes(t,e,n,i,r=!0){const a=[];for(let l=0;l<t.length;l++){const c=t[l],h=t[(l+1)%t.length],f=e(l),u=e((l+1)%t.length);a.push(...Wt(c[0],c[1],f),...Wt(h[0],h[1],u),...Wt(h[0],h[1],n),...Wt(c[0],c[1],f),...Wt(h[0],h[1],n),...Wt(c[0],c[1],n));const d=t[(l-1+t.length)%t.length],p=Math.atan2(c[1]-d[1],c[0]-d[0]),_=Math.atan2(h[1]-c[1],h[0]-c[0]);if(Math.abs(Math.atan2(Math.sin(_-p),Math.cos(_-p)))>.2&&i.linha([Wt(c[0],c[1],Math.max(f,this.chao(c[0],c[1]))),Wt(c[0],c[1],n)],"aresta"),f<this.chao(c[0],c[1])+.2){const g=Math.hypot(h[0]-c[0],h[1]-c[1]),m=Math.max(1,Math.ceil(g/1.5)),y=[];for(let E=0;E<=m;E++){const x=c[0]+(h[0]-c[0])*E/m,S=c[1]+(h[1]-c[1])*E/m;y.push(Wt(x,S,this.chao(x,S)+.03))}i.linha(y,"aresta")}}i.linha(t.map(([l,c])=>Wt(l,c,n)),"aresta",!0);const o=new be;o.setAttribute("position",new ae(a,3)),i.solido(o,!1),r&&this.colisao.add(new ge(o.clone()))}tampa(t,e,n,i,r=!0){const a=new ps(t.map(([l,c])=>new ct(l,c)));for(const l of e)a.holes.push(new $o(l.map(([c,h])=>new ct(c,h))));const o=new ca(a);o.rotateX(-Math.PI/2),o.translate(0,n,0),i.solido(o,!1),r&&this.colisao.add(new ge(o.clone()))}edificio(t,e){const n=dv[t.osm];if(n)return this.portaDaCidade(t,n,e);this.paredes(t.anel,()=>t.base-.8,t.topo,e),this.tampa(t.anel,t.furos,t.topo,e);for(const r of t.furos)this.paredes(r,()=>t.base-.8,t.topo,e);const i=t.osm===sh;t.cumeeira-t.topo>1.5&&!i&&this.telhado(t,e),this.fachadas(t,e,i),i&&this.ameias(t,e)}telhado(t,e){if(t.anel.length>8)return;const n=t.anel.map(c=>c[0]),i=t.anel.map(c=>c[1]),r=n.reduce((c,h)=>c+h)/n.length,a=i.reduce((c,h)=>c+h)/i.length,o=Math.min(t.cumeeira-t.topo,4),l=Wt(r,a,t.topo+o);for(let c=0;c<t.anel.length;c++){const h=t.anel[c],f=t.anel[(c+1)%t.anel.length];e.face([Wt(h[0],h[1],t.topo),Wt(f[0],f[1],t.topo),l],!1),e.linha([Wt(h[0],h[1],t.topo),l],"pormenor")}}pedra(t,e,n){const i=Pi(ia(e.osm+":pedra"));for(let r=0;r<t.length;r++){const a=t[r],o=t[(r+1)%t.length],l=t[(r-1+t.length)%t.length],c=Math.hypot(o[0]-a[0],o[1]-a[1]),h=(o[0]-a[0])/c,f=(o[1]-a[1])/c,u=f,d=-h,p=Math.hypot(a[0]-l[0],a[1]-l[1]),_=(l[0]-a[0])/p,g=(l[1]-a[1])/p,m=(x,S,b=h,A=f,v=u,w=d)=>Wt(a[0]+b*x+v*.05,a[1]+A*x+w*.05,S),y=Math.max(this.chao(a[0]+u,a[1]+d),e.base);let E=0;for(let x=y+.1;x+.5<e.topo-.6;x+=.52,E^=1){const S=E?.75:.4,b=E?.4:.75;n.linha([m(0,x+.5),m(S,x+.5),m(S,x)],"pormenor"),n.linha([m(0,x+.5,_,g,-g,_),m(b,x+.5,_,g,-g,_),m(b,x,_,g,-g,_)],"pormenor")}n.linha([m(0,e.topo-.45),m(c,e.topo-.45)],"pormenor");for(let x=0;x<c*(e.topo-y)*.05;x++){const S=1+i()*Math.max(.1,c-2),b=y+1+i()*(e.topo-y-3),A=.5+i()*.5;n.linha([m(S,b),m(S+A,b)],"sombra"),i()<.6&&n.linha([m(S+A,b),m(S+A,b+.32)],"sombra"),i()<.4&&n.linha([m(S+A*.4,b-.32),m(S+A*.4+A,b-.32)],"sombra")}}}portaDaCidade(t,e,n){const i=this.n.vias.find(p=>p.osm===e)?.g;if(!i)return;const r=(p,_)=>{const g=Math.hypot(p[0]-_[0],p[1]-_[1])||1;return[p[0]+(p[0]-_[0])/g*3,p[1]+(p[1]-_[1])/g*3]},a=[r(i[0],i[1]),...i.slice(1,-1),r(i[i.length-1],i[i.length-2])],o=2.9,l=new Map,c=[],h=t.anel.filter((p,_,g)=>{const m=g[(_-1+g.length)%g.length],y=g[(_+1)%g.length];if(Math.hypot(p[0]-m[0],p[1]-m[1])<.05)return!1;const E=Math.atan2(p[1]-m[1],p[0]-m[0]),x=Math.atan2(y[1]-p[1],y[0]-p[0]);return Math.abs(Math.atan2(Math.sin(x-E),Math.cos(x-E)))>.12}),f=[];for(let p=0;p<h.length;p++){const _=h[p],g=h[(p+1)%h.length],m=Math.hypot(g[0]-_[0],g[1]-_[1]);for(let y=1;y<a.length;y++){const E=ih(_,g,a[y-1],a[y]);E!==null&&f.push({i:p,t:E,L:m})}}const u=Math.min(3.6,...f.map(p=>p.L-.8)),d=u/2;for(const{i:p,t:_,L:g}of f){if(u<2)continue;const m=h[p],y=h[(p+1)%h.length],E=jt.clamp(_*g,d+.35,g-d-.35);l.set(p,[...l.get(p)??[],[E-d,E+d,o+d]]),c.push([m[0]+(y[0]-m[0])*E/g,m[1]+(y[1]-m[1])*E/g])}if(this.paredesComAberturas(h,t.base-.8,t.topo,l,n,.7,"real"),this.tampa(h,[],t.topo,n),this.ameias({...t,anel:h},n),this.pedra(h,t,n),c.length>=2){const[p,_]=c,g=_[0]-p[0],m=_[1]-p[1],y=Math.hypot(g,m),E=g/y,x=m/y,S=-x,b=E,A=this.chao(...p),v=this.chao(..._);for(const U of[-1,1]){const L=U*(d+.35),O=Math.min(A,v)-1,V=Math.max(A,v)+o+d+.5,z=new sn(y,V-O,.7);z.rotateY(Math.atan2(m,g)),z.translate((p[0]+_[0])/2+S*L,(O+V)/2,-((p[1]+_[1])/2+b*L)),this.colisao.add(new ge(z.clone())),n.solido(z,!1);const Y=p[0]+S*U*d,W=p[1]+b*U*d,K=_[0]+S*U*d,j=_[1]+b*U*d;n.linha([Wt(Y,W,A+o),Wt(K,j,v+o)],"pormenor"),n.linha([Wt(Y,W,this.chao(Y,W)+.03),Wt(K,j,this.chao(K,j)+.03)],"aresta")}const w=16,I=[],P=(U,L,O)=>{const V=Math.PI*(O/w);return Wt(U[0]+S*Math.cos(V)*d,U[1]+b*Math.cos(V)*d,L+o+Math.sin(V)*d)};for(let U=0;U<w;U++)I.push(...P(p,A,U),...P(_,v,U),...P(_,v,U+1),...P(p,A,U),...P(_,v,U+1),...P(p,A,U+1));const D=new be;D.setAttribute("position",new ae(I,3)),n.solido(D,!1);for(const U of[4,8,12])n.linha([P(p,A,U),P(_,v,U)],"sombra");for(const U of[p,_]){const L=this.chao(...U)+o+d+3;if(L+2>t.topo-1.5)continue;const O=[];for(let W=0;W<=10;W++){const K=Math.PI*(W/10);O.push(Wt(U[0]+S*Math.cos(K)*.5,U[1]+b*Math.cos(K)*.5,L+1.2+Math.sin(K)*.5))}const V=U===p?-E:E,z=U===p?-x:x,Y=W=>[W[0]+V*.06,W[1],W[2]-z*.06];n.linha([Y(Wt(U[0]+S*.5,U[1]+b*.5,L)),...O.map(Y),Y(Wt(U[0]-S*.5,U[1]-b*.5,L))],"pormenor"),n.linha([Y(Wt(U[0]+S*.5,U[1]+b*.5,L)),Y(Wt(U[0]-S*.5,U[1]-b*.5,L))],"pormenor")}}}livre(t,e,n){return!this.edificioEm(t,e,n)&&!rs(t,e,n.anel)}fachadas(t,e,n){const i=Pi(ia(t.osm)),r=t.anel;n&&this.portalSe(t,e);for(let a=0;a<r.length;a++){const o=r[a],l=r[(a+1)%r.length],c=l[0]-o[0],h=l[1]-o[1],f=Math.hypot(c,h);if(f<1.8)continue;const u=c/f,d=h/f,p=d,_=-u;(o[0]+l[0])/2,(o[1]+l[1])/2;const g=P=>this.livre(o[0]+u*P+p*1.1,o[1]+d*P+_*1.1,t),m=P=>{if(g(P))return-1/0;const D=this.edificioEm(o[0]+u*P+p*1.1,o[1]+d*P+_*1.1,t);return D?Math.max(D.topo,D.cumeeira)+.5:1/0};if(![.15,.5,.85].some(P=>m(P*f)<t.topo-2.6))continue;const y=.04,E=(P,D,U=y)=>Wt(o[0]+u*P+p*U,o[1]+d*P+_*U,D),x=P=>this.chao(o[0]+u*P+p*1.2,o[1]+d*P+_*1.2),S=(P,D,U,L,O="pormenor")=>e.linha([E(P,U),E(D,U),E(D,L),E(P,L)],O,!0),b=(P,D,U,L,O=.18)=>e.tracejar(E(P,U),[u*(D-P),0,-d*(D-P)],[0,L-U,0],O,"sombra");if(n){const P=Math.floor(f/6);for(let D=0;D<P;D++){const U=(D+.5)*f/P,L=Math.max(x(U)+7,t.base+9);L+3>t.topo-1||(S(U-.25,U+.25,L,L+2.6),b(U-.25,U+.25,L,L+2.6,.1))}continue}e.linha([E(0,t.topo-.35,.05),E(f,t.topo-.35,.05)],"pormenor");const A=Math.max(1,Math.floor(f/3.1)),v=f/A;let w=-1/0;for(let P=0;P<=f;P+=1)w=Math.max(w,x(P));const I=i()<.3;for(let P=0;P<A;P++){const D=v*(P+.5),U=m(D);if(U>=t.topo-2.6)continue;const L=U===-1/0,O=x(D);if(L&&O<t.topo-3&&O>t.base-1){const V=i();V<.45?(S(D-.55,D+.55,O,O+2.3),e.linha([E(D+.35,O+1.1),E(D+.35,O+1.2)],"pormenor"),i()<.5&&b(D-.55,D+.55,O,O+2.3,.3)):V<.75&&(S(D-1.1,D+1.1,O+.5,O+2.6),e.linha([E(D-1.1,O+2.9),E(D+1.1,O+2.9)],"pormenor"))}for(let V=Math.max(O,w-2)+3.6;V+1.6<t.topo-.6;V+=3.1){if(V<U||i()<.08)continue;const z=.5+i()*.1;if(S(D-z,D+z,V,V+1.5),e.linha([E(D,V),E(D,V+1.5)],"pormenor"),e.linha([E(D-z-.12,V-.08,.1),E(D+z+.12,V-.08,.1)],"pormenor"),i()<.35){const Y=D-z*.7;e.linha([E(Y,V+.3),E(Y+.35,V+.75)],"sombra"),e.linha([E(Y+.1,V+.2),E(Y+.45,V+.65)],"sombra")}if(i()<.12){const Y=V-.1;e.linha([E(D-z-.3,Y,.5),E(D+z+.3,Y,.5),E(D+z+.3,Y+.9,.5),E(D-z-.3,Y+.9,.5)],"pormenor",!0);for(let W=-z-.3;W<=z+.3;W+=.2)e.linha([E(D+W,Y,.5),E(D+W,Y+.9,.5)],"sombra")}}if(I&&i()<.2){const V=O+1+i()*4;e.linha([E(D+1,V),E(D+1.2,V-.4),E(D+1.1,V-.8),E(D+1.4,V-1.3)],"sombra")}}}}portalSe(t,e){const n=t.anel,i=n.length,r=S=>{const b=n[S],A=n[(S+1)%i];return Math.atan2(A[1]-b[1],A[0]-b[0])},a=[];for(let S=0;S<i;S++){const b=a[a.length-1],A=b?Math.abs(Math.atan2(Math.sin(r(S)-r(b.i1)),Math.cos(r(S)-r(b.i1)))):9;b&&A<.2?b.i1=S:a.push({i0:S,i1:S})}let o=null;for(const S of a){const b=n[S.i0],A=n[(S.i1+1)%i],v=Math.hypot(A[0]-b[0],A[1]-b[1]);v<4||(A[1]-b[1])/v>-.7||(!o||(b[0]+A[0])/2<(o.a[0]+o.c[0])/2)&&(o={a:b,c:A,L:v})}if(!o)return;const{a:l,c,L:h}=o,f=(c[0]-l[0])/h,u=(c[1]-l[1])/h,d=u,p=-f,_=(S,b,A=.04)=>Wt(l[0]+f*S+d*A,l[1]+u*S+p*A,b),g=S=>this.chao(l[0]+f*S+d*.6,l[1]+u*S+p*.6),m=(S,b,A,v,w=.18)=>e.tracejar(_(S,A),[f*(b-S),0,-u*(b-S)],[0,v-A,0],w,"sombra");this.portal(_,h,g,e,m);const y=h/2,E=Math.min(h/2-.3,3.4),x=(S,b)=>{const A=l[0]+f*S+d*b,v=l[1]+u*S+p*b;return Wt(A,v,this.chao(A,v)+.04)};for(let S=.4;S<=5.6;S+=.42)e.linha([x(y-E,S),x(y+E,S)],S<.5?"aresta":"chao");for(const S of[-1,1]){const b=[];for(let A=0;A<=5.6;A+=.7)b.push(x(y+S*E,A));e.linha(b,"pormenor")}this.pontos.portalSe=Zn(l[0]+f*y+d*6,l[1]+u*y+p*6,this.chao(l[0]+f*y+d*6,l[1]+u*y+p*6))}portal(t,e,n,i,r){const a=e/2,o=n(a);for(let h=0;h<4;h++){const f=1.6+h*.45,u=3.2,d=[t(a-f,o,.05+h*.1)];for(let p=0;p<=20;p++){const _=Math.PI*(1-p/20);d.push(t(a+Math.cos(_)*f,o+u+Math.sin(_)*f,.05+h*.1))}d.push(t(a+f,o,.05+h*.1)),i.linha(d,h===0?"aresta":"pormenor")}r(a-1.6,a+1.6,o,o+3.2,.12);const l=o+8,c=[];for(let h=0;h<=16;h++){const f=Math.PI*(1-h/16);c.push(t(a+Math.cos(f)*1.3,l+2+Math.sin(f)*1.3))}i.linha([t(a-1.3,l),...c,t(a+1.3,l),t(a-1.3,l)],"aresta")}ameias(t,e){const n=t.topo;for(let i=0;i<t.anel.length;i++){const r=t.anel[i],a=t.anel[(i+1)%t.anel.length],o=Math.hypot(a[0]-r[0],a[1]-r[1]),l=Math.atan2(a[1]-r[1],a[0]-r[0]);for(let c=.6;c<o-.6;c+=1.9){const h=r[0]+(a[0]-r[0])*c/o,f=r[1]+(a[1]-r[1])*c/o;e.caixa(1,1.3,.7,h,n+.65,-f,l)}}}claustro(t,e){const n=t.anel,i=t.furos[0],r=t.topo,a=t.base-.8,o=this.pontoLargo();let l=-1,c=1/0;for(let f=0;f<n.length;f++){const u=n[f],d=n[(f+1)%n.length],p=Math.hypot(d[0]-u[0],d[1]-u[1]);if(p<6)continue;const _=(u[0]+d[0])/2,g=(u[1]+d[1])/2,m=(d[1]-u[1])/p,y=-(d[0]-u[0])/p;if(!this.livre(_+m*2,g+y*2,t))continue;const E=Math.hypot(_-o[0],g-o[1]);E<c&&(c=E,l=f)}const h=new Map;if(l>=0){const f=n[l],u=n[(l+1)%n.length],d=Math.hypot(u[0]-f[0],u[1]-f[1]);h.set(l,[[d/2-1.3,d/2+1.3,3.4]]);const p=(f[0]+u[0])/2,_=(f[1]+u[1])/2,g=(u[1]-f[1])/d,m=-(u[0]-f[0])/d;this.pontos.portaClaustro=Zn(p+g*2.5,_+m*2.5,this.chao(p+g*2.5,_+m*2.5)),this.pontos.dentroClaustro=Zn(p-g*2.5,_-m*2.5,this.chao(p-g*2.5,_-m*2.5))}if(this.paredesComAberturas(n,a,r,h,e,.6,!1),i){const f=new Map,u=[...i].reverse();for(let m=0;m<u.length;m++){const y=u[m],E=u[(m+1)%u.length],x=Math.hypot(E[0]-y[0],E[1]-y[1]),S=Math.floor(x/3.4),b=[];for(let A=0;A<S;A++){const v=x/S*(A+.5);b.push([v-1.1,v+1.1,3])}f.set(m,b)}this.paredesComAberturas(u,a,r,f,e,.6,!0);const d=i.map(m=>m[0]),p=i.map(m=>m[1]),_=d.reduce((m,y)=>m+y)/d.length,g=p.reduce((m,y)=>m+y)/p.length;this.pontos.patio=Zn(_,g,this.chao(_,g))}if(this.tampa(n,i?[i]:[],r,e),i&&this.pisoClaustro){const f=this.pisoClaustro+4.5;this.tampa(n,[i],f,e);const u=(d,p)=>d.map(([_,g],m)=>{const y=d[(m-1+d.length)%d.length],E=d[(m+1)%d.length],x=Math.hypot(_-y[0],g-y[1])||1,S=Math.hypot(E[0]-_,E[1]-g)||1,b=[(g-y[1])/x,-(_-y[0])/x],A=[(E[1]-g)/S,-(E[0]-_)/S];return Wt(_-(b[0]+A[0])*.5*p,g-(b[1]+A[1])*.5*p,f-.02)});e.linha(u(i,.03),"aresta",!0);for(let d=0;d<i.length;d++){const p=i[d],_=i[(d+1)%i.length],g=Math.hypot(_[0]-p[0],_[1]-p[1]),m=(_[0]-p[0])/g,y=(_[1]-p[1])/g;for(let E=1.2;E<g-1;E+=2.5){const x=p[0]+m*E,S=p[1]+y*E,b=-y,A=m;let v=.1;for(;v<8&&rs(x+b*v,S+A*v,n);)v+=.3;e.linha([Wt(x+b*.1,S+A*.1,f-.03),Wt(x+b*(v-.4),S+A*(v-.4),f-.03)],"pormenor")}}}if(this.pontos.patio){const f=this.pontos.patio,u=new dn(1.4,1.6,.8,24);u.translate(f.x+3,f.y+.4,f.z+2),e.solido(u,"aresta",50);const d=new dn(1.4,1.4,.01,24,1,!0);d.translate(f.x+3,f.y+.8,f.z+2),e.solido(d,!1);const p=new dn(.15,.2,1.4,8);p.translate(f.x+3,f.y+1.1,f.z+2),e.solido(p,"pormenor",50);const _=new dn(1.6,1.6,1.4,12);_.translate(f.x+3,f.y+.7,f.z+2),this.colisao.add(new ge(_))}}paredesComAberturas(t,e,n,i,r,a,o){for(let l=0;l<t.length;l++){const c=t[l],h=t[(l+1)%t.length],f=h[0]-c[0],u=h[1]-c[1],d=Math.hypot(f,u);if(d<.2)continue;const p=f/d,_=u/d,g=Math.atan2(u,f),m=(i.get(l)??[]).filter(([S,b])=>S>.3&&b<d-.3),y=(S,b,A,v,w=!0)=>{if(b-S<.05||v-A<.05)return;const I=(S+b)/2,P=c[0]+p*I-_*a*.5,D=c[1]+_*I+p*a*.5,U=new sn(b-S,v-A,a);U.rotateY(g),U.translate(P,(A+v)/2,-D),this.colisao.add(new ge(U.clone())),r.solido(U,w?"aresta":!1)},E=(S,b,A)=>Wt(c[0]+p*S-_*b,c[1]+_*S+p*b,A);let x=0;for(const[S,b,A]of m){y(x,S,e,n);const v=Math.min(this.chao(c[0]+p*S,c[1]+_*S),this.chao(c[0]+p*b,c[1]+_*b));if(o==="real"){const w=(b-S)/2,I=(S+b)/2,P=v+A-w,D=v+A;y(S,b,e,v-.05,!1),y(S,b,D,n,!1),r.linha([E(S,-.01,n),E(b,-.01,n)],"aresta"),r.linha([E(S,a+.01,n),E(b,a+.01,n)],"aresta");const U=18,L=(z,Y,W=w)=>{const K=Math.PI*(1-z/U);return E(I+Math.cos(K)*W,Y,P+Math.sin(K)*W)},O=[];for(const z of[-.01,a+.01]){for(let Y=0;Y<U;Y++){const W=Y<U/2?E(S,z,D):E(b,z,D);O.push(...W,...L(Y,z),...L(Y+1,z))}O.push(...E(S,z,D),...L(U/2,z),...E(b,z,D))}for(let z=0;z<U;z++)O.push(...L(z,0),...L(z,a),...L(z+1,a),...L(z,0),...L(z+1,a),...L(z+1,0));const V=new be;V.setAttribute("position",new ae(O,3)),r.solido(V,!1);for(const z of[-.02,a+.02]){r.linha(Array.from({length:U+1},(Y,W)=>L(W,z)),"aresta"),r.linha(Array.from({length:U+1},(Y,W)=>L(W,z,w+.5)),"pormenor");for(let Y=1;Y<9;Y++)r.linha([L(Y*U/9,z),L(Y*U/9,z,w+.5)],"pormenor");r.linha([E(S,z,v),E(S,z,P)],"aresta"),r.linha([E(b,z,v),E(b,z,P)],"aresta")}x=b;continue}if(y(S,b,e,v-.05),y(S,b,v+A,n),o){const w=[],I=(b-S)/2,P=(S+b)/2;for(let D=0;D<=14;D++){const U=Math.PI*(D/14),L=P+Math.cos(U)*I;w.push(Wt(c[0]+p*L+_*.02,c[1]+_*L-p*.02,v+A-I*.6+Math.sin(U)*I*.6))}r.linha(w,"pormenor")}x=b}y(x,d,e,n)}}pontoLargo(){const t=this.n.pracas.find(i=>i.osm==="way/201639837");if(!t)return[30,5];const e=t.g.map(i=>i[0]),n=t.g.map(i=>i[1]);return[e.reduce((i,r)=>i+r)/e.length,n.reduce((i,r)=>i+r)/n.length]}chaoDesenhado(){for(const e of this.n.vias){if(e.tipo!=="steps")continue;const n=e.largura??2.6,i=[0];for(let c=1;c<e.g.length;c++)i.push(i[c-1]+Math.hypot(e.g[c][0]-e.g[c-1][0],e.g[c][1]-e.g[c-1][1]));const r=i[i.length-1],a=c=>{c=Math.max(0,Math.min(r,c));let h=1;for(;h<i.length-1&&i[h]<c;)h++;const f=(c-i[h-1])/Math.max(1e-6,i[h]-i[h-1]);return[e.g[h-1][0]+(e.g[h][0]-e.g[h-1][0])*f,e.g[h-1][1]+(e.g[h][1]-e.g[h-1][1])*f]},o=c=>{const h=a(c-1.2),f=a(c+1.2),u=Math.hypot(f[0]-h[0],f[1]-h[1])||1;return[-(f[1]-h[1])/u,(f[0]-h[0])/u]},l=[[],[]];for(let c=0;c<=r;c+=.45){const[h,f]=a(c),[u,d]=o(c),p=[h+u*n/2,f+d*n/2],_=[h-u*n/2,f-d*n/2];this.quadricula(h,f).linha([Wt(...p,this.chao(...p)+.04),Wt(..._,this.chao(..._)+.04)],"chao"),l[0].push(Wt(...p,this.chao(...p)+.05)),l[1].push(Wt(..._,this.chao(..._)+.05))}for(const c of l)c.length>1&&this.quadricula(e.g[0][0],e.g[0][1]).linha(c,"pormenor")}const t=Pi(7);for(const e of this.n.vias)if(!(e.tipo==="steps"||e.tipo==="service"))for(let n=1;n<e.g.length;n++){const i=e.g[n-1],r=e.g[n],a=Math.hypot(r[0]-i[0],r[1]-i[1]);for(let o=t()*4;o<a;o+=3+t()*5){const l=i[0]+(r[0]-i[0])*o/a+(t()-.5)*3,c=i[1]+(r[1]-i[1])*o/a+(t()-.5)*3;if(this.edificioEm(l,c))continue;const h=this.chao(l,c)+.04,f=.18+t()*.15;this.quadricula(l,c).linha([Wt(l-f,c,h),Wt(l,c+f*.4,h),Wt(l+f,c,h)],"chao")}}}muros(){for(const t of this.n.muros){if(t.tipo==="retaining_wall")continue;const e=t.altura??(t.tipo==="city_wall"?4:1.6);for(let n=1;n<t.g.length;n++){const i=t.g[n-1],r=t.g[n],a=Math.hypot(r[0]-i[0],r[1]-i[1]);if(a<.3)continue;const o=[];for(const f of this.n.vias)if(!f.area)for(let u=1;u<f.g.length;u++){const d=ih(i,r,f.g[u-1],f.g[u]);d!==null&&o.push(d)}const l=1.8/a,c=[];let h=0;for(const f of o.sort((u,d)=>u-d))f-l>h&&c.push([h,f-l]),h=Math.max(h,f+l);h<1&&c.push([h,1]);for(const[f,u]of c){const d=[i[0]+(r[0]-i[0])*f,i[1]+(r[1]-i[1])*f],p=[i[0]+(r[0]-i[0])*u,i[1]+(r[1]-i[1])*u],_=a*(u-f);if(_<.3)continue;const g=this.chao(d[0],d[1]),m=this.chao(p[0],p[1]),y=Math.min(g,m)-.5,E=Math.max(g,m)+e,x=new sn(_,E-y,.5);x.rotateY(Math.atan2(p[1]-d[1],p[0]-d[0])),x.translate((d[0]+p[0])/2,(y+E)/2,-(d[1]+p[1])/2),this.colisao.add(new ge(x.clone())),this.quadricula(d[0],d[1]).solido(x)}}}}limites(){const[t,e]=this.n.meio,n=t-4,i=e-4;for(const[r,a]of[[[-n,-i],[n,-i]],[[n,-i],[n,i]],[[n,i],[-n,i]],[[-n,i],[-n,-i]]]){const o=Math.hypot(a[0]-r[0],a[1]-r[1]),l=new sn(o,300,1);l.rotateY(Math.atan2(a[1]-r[1],a[0]-r[0])),l.translate((r[0]+a[0])/2,50,-(r[1]+a[1])/2),this.colisao.add(new ge(l))}}percurso=[];comprimentos=[];marcarPontos(){const t=c=>this.n.vias.find(h=>h.osm===c)?.g??[],e=[...t("way/1165517465"),...t("way/1165517464"),...t("way/41222814"),...t("way/121298535"),...t("way/121298533"),...t("way/121298534"),...t("way/1128379641"),...t("way/116224908"),[24,18],[32,6],[38,-1],[41,-9]],n=[];for(const c of e)(!n.length||Math.hypot(c[0]-n[n.length-1][0],c[1]-n[n.length-1][1])>.5)&&n.push(c);const i=(c,h)=>Zn(c,h,this.chao(c,h)),r=this.pontos,a=c=>n.reduce((h,f)=>Math.hypot(f[0]-c[0],f[1]-c[1])<Math.hypot(h[0]-c[0],h[1]-c[1])?f:h);r.inicio=i(...n[0]),r.olharInicio=i(...a([-99,19])),r.arco=i(-82,12.5),r.largoArco=i(...a([-70,-1])),r.escadasBase=i(...a([-45,7])),r.escadasMeio=i(...a([-16,17])),r.escadasTopo=i(...a([16,13])),r.largo=i(32,6);const o=[r.portaClaustro,r.dentroClaustro,r.patio].filter(Boolean);this.percurso=[...n.map(([c,h])=>i(c,h)),...o];let l=0;this.comprimentos=this.percurso.map((c,h)=>l+=h?c.distanceTo(this.percurso[h-1]):0),this.caminhoRota=this.percurso}paredePerto(t,e,n=8){let i=null;const r=new Set;for(let a=Math.floor((t-n)/10);a<=Math.floor((t+n)/10);a++)for(let o=Math.floor((e-n)/10);o<=Math.floor((e+n)/10);o++)for(const l of this.grelha.get(a+","+o)??[])if(!(r.has(l)||l.osm===sh||l.osm===io)){r.add(l);for(let c=0;c<l.anel.length;c++){const h=l.anel[c],f=l.anel[(c+1)%l.anel.length],u=f[0]-h[0],d=f[1]-h[1],p=Math.hypot(u,d);if(p<2.5)continue;const _=jt.clamp(((t-h[0])*u+(e-h[1])*d)/(p*p),.15,.85),g=h[0]+u*_,m=h[1]+d*_,y=Math.hypot(t-g,e-m),E=d/p,x=-u/p;y<n&&(!i||y<i.d)&&(t-g)*E+(e-m)*x>0&&(i={x:g,y:m,nx:E,ny:x,ux:u/p,uy:d/p,d:y})}}return i}varandas=[];varanda(t,e,n,i){const r=this.paredePerto(t,e,8);if(!r)return;const o=this.chao(r.x+r.nx*1.2,r.y+r.ny*1.2)+.6+n*3.1,l=this.edificioEm(r.x-r.nx*.5,r.y-r.ny*.5);if(!l||o+2.8>l.topo)return;const c=(p,_,g)=>Wt(r.x+r.nx*p+r.ux*_,r.y+r.ny*p+r.uy*_,o+g),h=Math.atan2(r.uy,r.ux),f=(p,_,g,m,y,E,x)=>{const S=new sn(m,E,y);S.rotateY(h);const[b,A,v]=c(_,p,g);S.translate(b,A,v),this.colisao.add(new ge(S.clone())),x&&i.solido(S,"aresta")};f(0,.45,-.06,1.9,.9,.12,!0),f(0,.88,.5,1.9,.06,1,!1),f(-.93,.45,.5,.06,.9,1,!1),f(.93,.45,.5,.06,.9,1,!1),i.linha([c(0,-.95,1),c(.9,-.95,1),c(.9,.95,1),c(0,.95,1)],"aresta"),i.linha([c(.9,-.95,.12),c(.9,.95,.12)],"pormenor");for(let p=-.95;p<=.96;p+=.14)i.linha([c(.9,p,0),c(.9,p,1)],"sombra");for(let p=.14;p<.9;p+=.14)for(const _ of[-.95,.95])i.linha([c(p,_,0),c(p,_,1)],"sombra");for(const p of[-.7,.7])i.linha([c(.02,p,-.55),c(.7,p,-.12)],"pormenor");i.linha([c(.03,-.55,0),c(.03,-.55,2.3),c(.03,.55,2.3),c(.03,.55,0)],"aresta");const u=c(.02,-.55,0),d=c(.02,.55,0);i.tracejar(u,[d[0]-u[0],0,d[2]-u[2]],[0,2.3,0],.06,"pormenor"),this.varandas.push({pos:Zn(r.x+r.nx*.45,r.y+r.ny*.45,o+.02),olhar:Zn(r.x+r.nx*8,r.y+r.ny*8,o-2)})}mobiliario(){const t=new vi("mobiliario",.4,.3),e=(l,c,h)=>this.sDe(l)+(this.sDe(c)-this.sDe(l))*h,n=this.pontos,i=[[e(n.arco,n.largoArco,.9),3,1],[e(n.largoArco,n.escadasBase,.5),-3,1],[e(n.escadasBase,n.escadasMeio,.35),3,1],[e(n.escadasBase,n.escadasMeio,.8),-3,2],[e(n.escadasMeio,n.escadasTopo,.55),3,1],[e(n.escadasTopo,n.largo,.4),-4,1]];for(const[l,c,h]of i){const f=this.noPercurso(l,c);this.varanda(f.x,-f.z,h,t)}const r=this.comprimentos[this.percurso.indexOf(this.pontos.portaClaustro)]??this.comprimentos[this.comprimentos.length-1];let a=1;for(let l=6;l<r-4;l+=13){const c=this.noPercurso(l),h=Math.min(this.percurso.length-1,this.comprimentos.findIndex(I=>I>=l)||1),f=this.percurso[h],u=this.percurso[h-1]??f,d=f.x-u.x,p=-(f.z-u.z),_=Math.hypot(d,p)||1;a=-a;const g=c.x-p/_*3*a,m=-c.z+d/_*3*a,y=this.paredePerto(g,m,7);if(!y)continue;const E=this.chao(y.x+y.nx,y.y+y.ny)+4.3,x=(I,P,D=0)=>Wt(y.x+y.nx*I+y.ux*D,y.y+y.ny*I+y.uy*D,E+P);t.linha([x(.02,0),x(.75,0)],"aresta"),t.linha([x(.02,-.45),x(.3,-.15),x(.55,-.02)],"pormenor"),t.linha(Array.from({length:9},(I,P)=>{const D=P/8*Math.PI*1.6;return x(.3+Math.cos(D)*.1,.12+Math.sin(D)*.1)}),"pormenor");const S=new dn(.2,.13,.42,6),[b,A,v]=x(.75,-.35);S.translate(b,A,v),t.solido(S,"aresta",30);const w=new _c(.26,.2,6);w.translate(b,A+.31,v),t.solido(w,"aresta",30),t.linha([x(.75,0),x(.75,-.04)],"aresta")}this.cena.add(t.acabar());const o=[["Rua Ferreira Borges",[-106,15]],["Arco de Almedina",[-72,-1]],["Rua de Quebra-Costas",[-56,6]],["Largo da Sé Velha",[20,19]]];for(const[l,[c,h]]of o){const f=this.paredePerto(c,h,9);if(!f)continue;const u=this.chao(f.x+f.nx,f.y+f.ny)+3.1,d=fv(l),[p,_,g]=Wt(f.x+f.nx*.05,f.y+f.ny*.05,u);d.position.set(p,_,g),d.lookAt(p+f.nx,_,g-f.ny),this.cena.add(d)}}sDe(t){let e=0,n=1/0;return this.percurso.forEach((i,r)=>{const a=i.distanceTo(t);a<n&&(n=a,e=r)}),this.comprimentos[e]}noPercurso(t,e=0){const n=this.comprimentos,i=this.percurso;let r=1;for(;r<n.length-1&&n[r]<t;)r++;const a=i[r-1],o=i[r],l=jt.clamp((t-n[r-1])/Math.max(n[r]-n[r-1],.001),0,1),c=a.x+(o.x-a.x)*l,h=-(a.z+(o.z-a.z)*l),f=o.x-a.x,u=-(o.z-a.z),d=Math.hypot(f,u)||1;for(let p=1;p>=0;p-=.25){const _=c-u/d*e*p,g=h+f/d*e*p;if(!this.edificioEm(_,g))return Zn(_,g,this.chao(_,g))}return Zn(c,h,this.chao(c,h))}}const rh=24,mv=1.62,gv=.32;class bc{constructor(t,e=1.75,n=gv){this.raio=n,this.capsula=new uu(t.clone().add(new R(0,n,0)),t.clone().add(new R(0,e-n,0)),n)}capsula;vel=new R;noChao=!1;get pes(){return this.capsula.start.clone().sub(new R(0,this.capsula.radius,0))}colocar(t){const e=this.capsula.end.y-this.capsula.start.y;this.capsula.start.set(t.x,t.y+this.capsula.radius,t.z),this.capsula.end.set(t.x,t.y+this.capsula.radius+e,t.z),this.vel.set(0,0,0)}passo(t,e){this.noChao?this.vel.y=Math.max(this.vel.y-rh*t,-2):this.vel.y-=rh*t;const n=this.vel.clone().multiplyScalar(t);this.capsula.translate(n),this.noChao=!1;for(let i=0;i<3;i++){const r=e.capsuleIntersect(this.capsula);if(!r)break;r.normal.y>.45?(this.noChao=!0,this.capsula.translate(new R(0,r.depth/Math.max(r.normal.y,.5),0)),this.vel.y<0&&(this.vel.y=0)):(this.vel.addScaledVector(r.normal,-r.normal.dot(this.vel)),this.capsula.translate(r.normal.multiplyScalar(r.depth)))}}}class _v{constructor(t,e){this.camera=t,this.corpo=new bc(e),document.addEventListener("keydown",n=>this.teclas.add(n.code)),document.addEventListener("keyup",n=>this.teclas.delete(n.code)),window.addEventListener("blur",()=>this.teclas.clear()),document.addEventListener("mousemove",n=>{document.pointerLockElement!==document.body||this.morto||(this.yaw-=n.movementX*.0022,this.pitch=jt.clamp(this.pitch-n.movementY*.0022,-1.5,1.5))})}corpo;yaw=0;pitch=0;teclas=new Set;vida=100;morto=!1;aCorrer=!1;distanciaPasso=0;balanco=0;onPasso=()=>{};onAterrar=()=>{};vyAntes=0;noAr=0;yOlhos=null;andar=0;get assente(){return this.noAr<.15}get posicao(){return this.corpo.pes}get olhos(){return this.camera.position}frente(){return new R(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}actualizar(t,e,n){const i=this.frente(),r=new R(-i.z,0,i.x),a=new R;this.morto||((this.teclas.has("KeyW")||this.teclas.has("ArrowUp"))&&a.add(i),(this.teclas.has("KeyS")||this.teclas.has("ArrowDown"))&&a.sub(i),(this.teclas.has("KeyD")||this.teclas.has("ArrowRight"))&&a.add(r),(this.teclas.has("KeyA")||this.teclas.has("ArrowLeft"))&&a.sub(r)),this.aCorrer=(this.teclas.has("ShiftLeft")||this.teclas.has("ShiftRight"))&&!n&&a.lengthSq()>0;const o=n?2.4:this.aCorrer?7.2:4.4;a.lengthSq()&&a.normalize().multiplyScalar(o);const l=this.corpo,c=l.noChao?14:3;l.vel.x+=(a.x-l.vel.x)*Math.min(1,c*t),l.vel.z+=(a.z-l.vel.z)*Math.min(1,c*t),l.noChao&&this.teclas.has("Space")&&!this.morto&&(l.vel.y=7.2);const h=l.noChao;this.vyAntes=l.vel.y;const f=Math.ceil(t/.008);for(let g=0;g<f;g++)l.passo(t/f,e);!h&&l.noChao&&this.vyAntes<-4&&this.onAterrar(-this.vyAntes),this.noAr=l.noChao?0:this.noAr+t;const u=Math.hypot(l.vel.x,l.vel.z);if(this.andar=jt.damp(this.andar,this.assente?Math.min(u/5,1):0,8,t),this.assente&&u>.5){this.distanciaPasso+=u*t,this.balanco+=u*t*1.9;const g=this.aCorrer?2.1:1.55;this.distanciaPasso>g&&(this.distanciaPasso=0,this.onPasso(this.aCorrer?1:n?.35:.65))}const d=this.morto?.35:mv,p=l.pes.y+d;this.yOlhos===null||Math.abs(p-this.yOlhos)>1.2||!this.assente?this.yOlhos=p:this.yOlhos=jt.damp(this.yOlhos,p,16,t),this.camera.position.copy(l.pes),this.camera.position.y=this.yOlhos;const _=this.andar*.7;this.camera.position.y+=Math.sin(this.balanco*2)*.04*_,this.camera.position.addScaledVector(r,Math.cos(this.balanco)*.025*_),this.camera.rotation.set(this.pitch,this.yaw,this.morto?.5:Math.cos(this.balanco)*.004*_,"YXZ")}}class vv{cena=new Nh;camera=new on(52,1,.04,6);raiz=new ye;modelo=new ye;carregador=new ye;clarao;pente=30;reserva=120;capacidade=30;cadencia=.095;espera=0;aRecarregar=0;mira=0;recuo=0;calor=0;balancoX=0;balancoY=0;tempo=0;corrida=0;constructor(t){this.cena.add(this.raiz),this.raiz.add(this.modelo),this.construir(),this.clarao=new qr(new ks({map:t,transparent:!0,depthWrite:!1,depthTest:!1})),this.clarao.scale.setScalar(.3),this.clarao.position.set(0,.035,-.98),this.clarao.visible=!1,this.modelo.add(this.clarao)}construir(){const t=new vi("arma",.12,.05),e=[],n=d=>{const p=d.index?d.toNonIndexed():d.clone();p.deleteAttribute("uv"),p.getAttribute("normal")||p.computeVertexNormals(),e.push(p)},i=(d,p,_,g,m,y,E=0)=>{const x=new sn(d,p,_);x.rotateX(E),x.translate(g,m,y),t.solido(x,"aresta",20)};i(.06,.07,.34,0,0,-.1),i(.056,.025,.3,0,.045,-.1),i(.07,.065,.2,0,.005,-.37),i(.05,.03,.18,0,.045,-.36);const r=new dn(.011,.011,.36,10);r.rotateX(Math.PI/2),r.translate(0,.035,-.62),n(r),t.solido(r,"aresta",50);const a=new dn(.016,.016,.22,10);a.rotateX(Math.PI/2),a.translate(0,.068,-.4),n(a),t.solido(a,"aresta",50),i(.012,.05,.015,0,.065,-.78),i(.04,.014,.012,0,.05,-.78),i(.03,.03,.04,0,.07,-.2),i(.035,.055,.09,0,-.03,.14,-.2),i(.04,.11,.26,0,-.035,.28,-.12),i(.035,.1,.045,0,-.08,.02,.35),i(.01,.03,.06,0,-.045,-.05);const o=new ps;o.moveTo(-.035,0),o.lineTo(.035,0),o.quadraticCurveTo(.06,-.12,.1,-.2),o.lineTo(.03,-.22),o.quadraticCurveTo(-.01,-.12,-.035,0);const l=new oa(o,{depth:.04,bevelEnabled:!1,curveSegments:6});l.translate(0,0,-.02),l.rotateY(Math.PI/2);const c=new vi("carregador",.12,.05);c.solido(l,"aresta",25);for(let d=0;d<3;d++)c.linha([[.021,-.05-d*.04,.02+d*.012],[.021,-.06-d*.04,-.03+d*.015]],"sombra");this.carregador.add(c.acabar("arma",nh)),this.carregador.position.set(0,-.03,-.2),this.modelo.add(this.carregador);const h=(d,p,_)=>{const g=p.clone().sub(d),m=new dn(_*.85,_,g.length(),12,1,!0);m.translate(0,g.length()/2,0),m.applyQuaternion(new Fi().setFromUnitVectors(new R(0,1,0),g.clone().normalize())),m.translate(d.x,d.y,d.z),n(m),t.solido(m,!1);const y=new R().crossVectors(g,new R(0,1,0)).normalize().multiplyScalar(_);t.linha([d.clone().add(y).toArray(),p.clone().add(y.clone().multiplyScalar(.85)).toArray()],"aresta"),t.linha([d.clone().sub(y).toArray(),p.clone().sub(y.clone().multiplyScalar(.85)).toArray()],"aresta")};h(new R(.28,-.35,.55),new R(.02,-.1,.05),.05),h(new R(-.3,-.4,.3),new R(-.02,-.03,-.36),.045);const f=(d,p,_,g,m,y)=>{const E=new gs(1,10,8);E.scale(g,m,y),E.translate(d,p,_),n(E),t.solido(E,!1);const x=[];for(let S=0;S<=16;S++){const b=S/16*Math.PI*2;x.push([d+Math.cos(b)*g*1.02,p+Math.sin(b)*m*1.02,_])}t.linha(x,"aresta");for(let S=0;S<3;S++)t.linha([[d-g*.6,p+m*(.4-S*.35),_-y*.9],[d+g*.5,p+m*(.5-S*.35),_-y*.95]],"pormenor")};f(.01,-.075,.03,.045,.05,.05),f(-.01,-.02,-.37,.05,.04,.06),this.modelo.add(t.acabar("arma",nh));const u=pu(e);u&&this.modelo.add(ov(u,1.6)),this.modelo.traverse(d=>{d.frustumCulled=!1,d.renderOrder+=10})}redimensionar(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}podeDisparar(){return this.espera<=0&&this.aRecarregar<=0&&this.pente>0}disparar(){this.pente--,this.espera=this.cadencia,this.recuo=Math.min(1,this.recuo+.55),this.calor=Math.min(1,this.calor+.12),this.clarao.visible=!0,this.clarao.material.rotation=Math.random()*6.28,this.clarao.scale.setScalar(.22+Math.random()*.14)}recarregar(){return this.aRecarregar>0||this.pente===this.capacidade||this.reserva<=0?!1:(this.aRecarregar=1.6,!0)}dispersao(t,e){return jt.lerp(.02,.003,this.mira)+this.calor*jt.lerp(.035,.012,this.mira)+t*.006*(1-this.mira*.6)+(e?0:.05)}actualizar(t,e,n,i,r,a,o){if(this.tempo+=t,this.espera-=t,this.recuo=Math.max(0,this.recuo-t*7),this.calor=Math.max(0,this.calor-t*(this.espera>-.15?.6:2.5)),this.espera<this.cadencia-.04&&(this.clarao.visible=!1),this.aRecarregar>0&&(this.aRecarregar-=t,this.aRecarregar<=0)){const _=this.capacidade-this.pente,g=Math.min(_,this.reserva);this.pente+=g,this.reserva-=g}this.mira=jt.damp(this.mira,o&&this.aRecarregar<=0&&!a?1:0,14,t),this.corrida=jt.damp(this.corrida,a?1:0,8,t),this.balancoX=jt.damp(this.balancoX,jt.clamp(-e*3,-.06,.06),10,t),this.balancoY=jt.damp(this.balancoY,jt.clamp(n*3,-.06,.06),10,t);const l=this.mira,c=i*(1-l*.8),h=jt.lerp(.2,0,l)+this.balancoX+Math.cos(r)*.012*c,f=jt.lerp(-.25,-.108,l)+this.balancoY+Math.abs(Math.sin(r))*.016*c-this.corrida*.06,u=jt.lerp(-.36,-.3,l)+this.recuo*.05;this.raiz.position.set(h,f+Math.sin(this.tempo*1.4)*.002*(1-l),u),this.raiz.rotation.set(this.recuo*.08+this.corrida*-.35+(1-l)*.03,this.corrida*.7+this.balancoX*2+(1-l)*.05,this.corrida*.3);const d=this.aRecarregar>0?1-this.aRecarregar/1.6:0,p=d>0?Math.sin(Math.min(1,d*1.15)*Math.PI):0;this.modelo.rotation.set(-p*.25,0,p*.55),this.carregador.position.y=-.03-(d>.1&&d<.55?Math.sin((d-.1)/.45*Math.PI)*.25:0),this.camera.fov=jt.lerp(52,40,l),this.camera.updateProjectionMatrix()}}class xv{ctx;mestre;eco;ecoEnvio;ruido;ruidoRosa;vozes=new Map;falaActual=null;ultimaFalaInimigo=0;ouvinte=new R;frenteOuvinte=new R(0,0,-1);pronto=!1;legenda=()=>{};textos={};async iniciar(){if(this.pronto)return;this.ctx=new AudioContext,this.mestre=this.ctx.createGain(),this.mestre.gain.value=.9;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=6,t.attack.value=.002,t.release.value=.2,this.mestre.connect(t).connect(this.ctx.destination),this.eco=this.ctx.createConvolver(),this.eco.buffer=this.respostaRuela(1.2),this.ecoEnvio=this.ctx.createGain(),this.ecoEnvio.gain.value=.4,this.ecoEnvio.connect(this.eco).connect(this.mestre),this.ruido=this.bufferRuido(2,"branco"),this.ruidoRosa=this.bufferRuido(4,"castanho"),this.pronto=!0,this.ambiente();const e=await(await fetch("/tinta-na-alta/falas.json")).json();for(const[n,i]of Object.entries(e))this.textos[n]=i.texto;await Promise.all(Object.keys(e).map(async n=>{try{const i=await(await fetch(`/tinta-na-alta/vozes/${n}.wav`)).arrayBuffer();this.vozes.set(n,await this.ctx.decodeAudioData(i))}catch{}}))}bufferRuido(t,e){const n=this.ctx.sampleRate*t,i=this.ctx.createBuffer(1,n,this.ctx.sampleRate),r=i.getChannelData(0);let a=0;for(let o=0;o<n;o++){const l=Math.random()*2-1;e==="branco"?r[o]=l:(a=(a+.02*l)/1.02,r[o]=a*3.5)}return i}respostaRuela(t){const e=this.ctx.sampleRate,n=Math.floor(e*t),i=this.ctx.createBuffer(2,n,e);for(let r=0;r<2;r++){const a=i.getChannelData(r);for(let o=0;o<n;o++){const l=o/e;a[o]=(Math.random()*2-1)*Math.pow(1-l/t,5)*.22*Math.min(1,l*60)}for(const[o,l]of[[7,.9],[13,.7],[21,.55],[29,.5],[44,.35],[63,.25],[95,.12]]){const c=Math.floor((o+(r?3:0)+Math.random()*4)*e/1e3);for(let h=0;h<40;h++)a[c+h]+=(Math.random()*2-1)*l*(1-h/40)}}return i}ocluido=()=>!1;espacial(t,e=60,n=1,i=!1){const r=this.ctx.createGain();if(!t)return r.connect(this.mestre),{entrada:r,dist:0};const a=t.clone().sub(this.ouvinte),o=a.length(),l=o>2&&this.ocluido(t),c=this.ctx.createGain();c.gain.value=(i?Math.pow(Math.min(1,3.5/Math.max(o,.1)),1.15):1/(1+Math.pow(o/(e*.18),1.4)))*(l?.55:1);const h=this.ctx.createBiquadFilter();h.type="lowpass";const f=i?Math.max(1100,9e3/(1+o/10)):Math.max(700,18e3/(1+o/18));h.frequency.value=l?Math.max(350,f*.3):f;let u=r;if(i){const m=this.ctx.createBiquadFilter();m.type="highpass",m.frequency.value=Math.min(450,90+o*8),u=u.connect(m)}const d=this.ctx.createStereoPanner(),p=this.frenteOuvinte,_=new R(-p.z,0,p.x);if(d.pan.value=o>.5?jt.clamp(a.clone().normalize().dot(_),-1,1)*(l?.5:.8):0,u.connect(h).connect(c).connect(d).connect(this.mestre),i&&o>5){const m=this.ctx.createDelay(.3);m.delayTime.value=Math.min(.12,.025+o*.0018);const y=this.ctx.createGain();y.gain.value=Math.min(.35,.1+o/120),c.connect(m).connect(y).connect(d)}const g=this.ctx.createGain();return g.gain.value=(i?.05+Math.min(.35,o/55):Math.min(.75,.15+o/90)*n)*(l?1.8:1),d.connect(g).connect(this.ecoEnvio),{entrada:r,dist:o}}ruidoEm(t,e,n,i,r,a,o,l=.001,c,h=this.ruido){const f=this.ctx.createBufferSource();f.buffer=h,f.playbackRate.value=.9+Math.random()*.2;const u=this.ctx.createBiquadFilter();u.type=i,u.frequency.setValueAtTime(r,e),c&&u.frequency.exponentialRampToValueAtTime(c,e+n),u.Q.value=a;const d=this.ctx.createGain();d.gain.setValueAtTime(1e-4,e),d.gain.exponentialRampToValueAtTime(o,e+l),d.gain.exponentialRampToValueAtTime(1e-4,e+n),f.connect(u).connect(d).connect(t),f.start(e,Math.random()*1.5),f.stop(e+n+.05)}tom(t,e,n,i,r,a,o="sine"){const l=this.ctx.createOscillator();l.type=o,l.frequency.setValueAtTime(i,e),l.frequency.exponentialRampToValueAtTime(Math.max(1,r),e+n);const c=this.ctx.createGain();c.gain.setValueAtTime(a,e),c.gain.exponentialRampToValueAtTime(1e-4,e+n),l.connect(c).connect(t),l.start(e),l.stop(e+n+.02)}tiro(t,e=!1){if(!this.pronto)return;const{entrada:n,dist:i}=this.espacial(t,160),r=this.ctx.currentTime+i/343,a=e?.8:1;this.ruidoEm(n,r,.03,"highpass",2500,.7,1.4*a),this.ruidoEm(n,r,.16,"lowpass",4200,.8,1.1*a,.001,300),this.ruidoEm(n,r+.004,.32,"bandpass",900,1.2,.5*a,.003,200),this.tom(n,r,.18,130,38,1.3*a),this.tom(n,r,.05,2400,900,.12*a,"square"),t||(this.ruidoEm(n,r+.045,.03,"bandpass",3800,6,.25),this.tom(n,r+.05,.04,5200,4700,.04,"triangle"))}vazio(){if(!this.pronto)return;const t=this.ctx.currentTime,{entrada:e}=this.espacial(null);this.ruidoEm(e,t,.025,"bandpass",3200,8,.5),this.tom(e,t,.03,2600,2200,.08,"triangle")}recarregar(){if(!this.pronto)return;const t=this.ctx.currentTime,{entrada:e}=this.espacial(null),n=(i,r,a)=>{this.ruidoEm(e,t+i,.05,"bandpass",r,5,a),this.tom(e,t+i,.06,r*1.3,r*1.1,a*.15,"triangle")};n(.05,1800,.5),this.ruidoEm(e,t+.12,.25,"bandpass",1200,1,.12,.05),n(.75,1500,.8),n(.8,2600,.4),n(1.25,2200,.6),n(1.38,3e3,.7)}passo(t,e,n=!1){if(!this.pronto)return;const{entrada:i}=this.espacial(t,30),r=this.ctx.currentTime,a=1+(Math.random()-.5)*.25;this.ruidoEm(i,r,.05,"bandpass",1900*a,1.3,.35*e),this.ruidoEm(i,r+.008,.09,"lowpass",500*a,.9,.5*e),this.tom(i,r,.06,n?150:110,60,.35*e),Math.random()<.4&&this.ruidoEm(i,r+.03,.05,"highpass",5e3,.5,.06*e)}aterrar(t){if(!this.pronto)return;const{entrada:e}=this.espacial(null),n=this.ctx.currentTime,i=Math.min(1,t/12);this.tom(e,n,.15,90,40,.8*i),this.ruidoEm(e,n,.12,"lowpass",900,1,.6*i)}zumbido(t){if(!this.pronto)return;const e=this.ctx.currentTime,n=this.ctx.createStereoPanner();n.pan.value=t,n.connect(this.mestre),this.ruidoEm(n,e,.18,"bandpass",3e3,5,.45,.04,1200),this.ruidoEm(n,e,.015,"highpass",4e3,.7,.5)}impacto(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,40),i=this.ctx.currentTime;this.ruidoEm(n,i,.08,"bandpass",2400+Math.random()*1500,2,.45),this.ruidoEm(n,i,.2,"lowpass",1200,.7,.15,.002),e&&this.tom(n,i+.01,.35+Math.random()*.2,2800+Math.random()*1200,900,.08,"sine")}acerto(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,50),i=this.ctx.currentTime;this.ruidoEm(n,i,.1,"lowpass",700,1.5,.9),this.tom(n,i,.1,e?220:140,70,.6);const r=this.ctx.createGain();r.connect(this.mestre),this.tom(r,i,.05,e?1800:1300,e?1600:1100,.12,"triangle")}queda(t){if(!this.pronto)return;const{entrada:e}=this.espacial(t,40),n=this.ctx.currentTime+.35;this.tom(e,n,.25,80,35,.9),this.ruidoEm(e,n,.3,"lowpass",600,.8,.6),this.ruidoEm(e,n+.18,.12,"bandpass",2600,3,.2),this.tom(e,n+.18,.2,3100,2900,.05,"triangle")}dor(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;this.tom(t,e,.2,90,50,.9),this.ruidoEm(t,e,.25,"lowpass",400,1,.7),this.tom(t,e,1.2,3900,3800,.03,"sine")}bater(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;for(const[n,i]of[[0,.5],[.33,.4]])this.tom(t,e+n,.12,70,45,i),this.tom(t,e+n+.12,.1,60,40,i*.6)}corda(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;for(let n=0;n<5;n++)this.ruidoEm(t,e+n*.12+Math.random()*.05,.1,"bandpass",1500+Math.random()*800,2,.2,.02)}guitarra(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,50),i=this.ctx.sampleRate,r=this.ctx.currentTime+.05;for(const[a,o,l]of e)for(const c of[0,.06]){const h=440*Math.pow(2,(o-69)/12)*(1+c/100),f=Math.floor(i*(l+.6)),u=this.ctx.createBuffer(1,f,i),d=u.getChannelData(0),p=Math.max(2,Math.round(i/h));for(let y=0;y<p;y++)d[y]=Math.random()*2-1;for(let y=p;y<f;y++)d[y]=.4985*(d[y-p]+d[y-p+1]);const _=this.ctx.createBufferSource();_.buffer=u;const g=this.ctx.createGain();g.gain.value=.22;const m=this.ctx.createBiquadFilter();m.type="peaking",m.frequency.value=2800,m.gain.value=5,_.connect(m).connect(g).connect(n),_.start(r+a+c*.2)}}sino(t,e=1){if(!this.pronto)return;const{entrada:n}=this.espacial(t,400),i=196;for(let r=0;r<e;r++){const a=this.ctx.currentTime+r*2.6;for(const[o,l,c]of[[.5,.3,6],[1,.4,4.5],[1.19,.25,3.5],[1.5,.15,3],[2,.12,2.5],[2.52,.08,1.8],[3.01,.05,1.3]])this.tom(n,a,c,i*o,i*o*.999,l*.5);this.ruidoEm(n,a,.04,"bandpass",1500,2,.2)}}ambiente(){const t=this.ctx.createBufferSource();t.buffer=this.ruidoRosa,t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="bandpass",e.frequency.value=400,e.Q.value=.6;const n=this.ctx.createGain();n.gain.value=.05;const i=this.ctx.createOscillator();i.frequency.value=.07;const r=this.ctx.createGain();r.gain.value=.035,i.connect(r).connect(n.gain);const a=this.ctx.createOscillator();a.frequency.value=.043;const o=this.ctx.createGain();o.gain.value=180,a.connect(o).connect(e.frequency),t.connect(e).connect(n).connect(this.mestre),t.start(),i.start(),a.start();const l=this.ctx.createBufferSource();l.buffer=this.ruidoRosa,l.loop=!0;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.value=160;const h=this.ctx.createGain();h.gain.value=.06,l.connect(c).connect(h).connect(this.mestre),l.start(0,1.3);const f=()=>{if(!this.pronto)return;const u=this.ctx.currentTime,d=this.ouvinte.clone().add(new R((Math.random()-.5)*60,15,(Math.random()-.5)*60)),{entrada:p}=this.espacial(d,80);if(Math.random()<.5)for(let _=0;_<3;_++)this.tom(p,u+_*.28,.22,420,330,.06);else for(let _=0;_<4;_++)this.tom(p,u+_*.09,.07,5200+Math.random()*800,6500,.03,"triangle");setTimeout(f,5e3+Math.random()*12e3)};setTimeout(f,4e3)}coracao(t){if(!this.pronto)return;const e=this.ctx.currentTime,{entrada:n}=this.espacial(null);this.tom(n,e,.12,60,40,.5*t),this.tom(n,e+.18,.1,55,38,.35*t)}falar(t,e,n=null,i=!1){if(!this.pronto)return 0;const r=this.vozes.get(t),a=this.ctx.currentTime,o=e==="radio"?3:e==="fadista"?2:1;if(typeof e=="object"){if(a-this.ultimaFalaInimigo<1.6&&!i)return 0;this.ultimaFalaInimigo=a}if(this.falaActual&&this.falaActual.ate>a){if(this.falaActual.prioridade>o&&o!==1)return 0;if(o>=this.falaActual.prioridade&&this.falaActual.prioridade<3&&o>1)try{this.falaActual.fonte.stop()}catch{}}const l=e==="radio"?"Central":e==="fadista"?"Fadista":"Borrão";if(this.legenda(l,this.textos[t]??""),!r)return 2.5;const c=this.ctx.createBufferSource();if(c.buffer=r,e==="radio"){c.playbackRate.value=1;const f=this.ctx.createBiquadFilter();f.type="highpass",f.frequency.value=450;const u=this.ctx.createBiquadFilter();u.type="lowpass",u.frequency.value=3e3;const d=this.ctx.createWaveShaper();d.curve=ah(3);const p=this.ctx.createGain();p.gain.value=1.1,c.connect(f).connect(d).connect(u).connect(p).connect(this.mestre),this.ruidoEm(this.mestre,a,.06,"bandpass",2e3,1,.15),this.ruidoEm(this.mestre,a+r.duration,.1,"bandpass",2e3,1,.15)}else if(e==="fadista"){c.playbackRate.value=.86;const{entrada:f}=this.espacial(n,40,1,!0),u=this.ctx.createGain();u.gain.value=1.6,c.connect(u).connect(f)}else{const f=e.inimigo;c.playbackRate.value=.7+f%5*.035;const{entrada:u}=this.espacial(n,70,1,!0),d=this.ctx.createWaveShaper();d.curve=ah(2);const p=this.ctx.createBiquadFilter();p.type="peaking",p.frequency.value=220,p.gain.value=6;const _=this.ctx.createBiquadFilter();_.type="peaking",_.frequency.value=1700,_.Q.value=.8,_.gain.value=5;const g=this.ctx.createGain();g.gain.value=2.2,c.connect(d).connect(p).connect(_).connect(g).connect(u)}c.start();const h=r.duration/c.playbackRate.value;return this.falaActual={fonte:c,prioridade:o,ate:a+h},h}get aFalar(){return!!this.falaActual&&this.falaActual.ate>(this.ctx?.currentTime??0)}}function ah(s){const e=new Float32Array(1024);for(let n=0;n<1024;n++){const i=n/1023*2-1;e[n]=Math.tanh(i*s)/Math.tanh(s)}return e}function so(s,t,e=!0){const n=document.createElement("canvas");n.width=n.height=128;const i=n.getContext("2d"),r=Pi(t);i.fillStyle=s,i.beginPath();const a=18;for(let l=0;l<=a;l++){const c=l/a*Math.PI*2,h=22+r()*16,f=64+Math.cos(c)*h,u=64+Math.sin(c)*h;l===0?i.moveTo(f,u):i.lineTo(f,u)}i.fill();for(let l=0;l<12;l++){const c=r()*Math.PI*2,h=30+r()*28,f=2+r()*6;i.beginPath(),i.arc(64+Math.cos(c)*h,64+Math.sin(c)*h,f,0,7),i.fill()}if(e){i.strokeStyle=s;for(let l=0;l<7;l++){const c=r()*Math.PI*2;i.lineWidth=1.5+r()*2.5,i.beginPath(),i.moveTo(64+Math.cos(c)*26,64+Math.sin(c)*26),i.lineTo(64+Math.cos(c)*(46+r()*16),64+Math.sin(c)*(46+r()*16)),i.stroke()}}const o=new gc(n);return o.colorSpace=Qe,o}function Mv(s){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=Pi(s);e.strokeStyle="#111",e.lineCap="round";for(let r=0;r<14;r++){const a=n()*Math.PI*2,o=6+n()*10,l=30+n()*30;e.lineWidth=1.5+n()*2.5,e.beginPath(),e.moveTo(64+Math.cos(a)*o,64+Math.sin(a)*o),e.lineTo(64+Math.cos(a)*l,64+Math.sin(a)*l),e.stroke()}e.lineWidth=2,e.beginPath();for(let r=0;r<=10;r++){const a=r/10*Math.PI*2,o=r%2?10:20+n()*8,l=64+Math.cos(a)*o,c=64+Math.sin(a)*o;r===0?e.moveTo(l,c):e.lineTo(l,c)}e.stroke();const i=new gc(t);return i.colorSpace=Qe,i}class Sv{grupo=new ye;vivos=[];decalques=[];manchasTinta=[1,2,3,4].map(t=>so("#111",t*31));manchasVermelhas=[1,2,3,4].map(t=>so("#b3121b",t*77));buracos=[1,2,3].map(t=>so("#222",t*13,!1));claroes=[1,2,3].map(t=>Mv(t*5));t=0;actualizar(t){this.t+=t;for(let e=this.vivos.length-1;e>=0;e--){const n=this.vivos[e],i=(this.t-n.nasceu)/(n.ate-n.nasceu);if(i>=1){this.grupo.remove(n.obj),n.obj.traverse(r=>{r.geometry?.dispose()}),this.vivos.splice(e,1);continue}if(n.tipo==="fade")n.obj.traverse(r=>{const a=r.material;a&&"opacity"in a&&(a.opacity=(1-i)*(a.userData.op??1))});else if(n.vel){const r=n.obj,a=r.geometry.getAttribute("position");for(let o=0;o<n.vel.length;o++){n.vel[o].y-=9.8*t;for(const l of[0,1]){const c=o*2+l;a.setXYZ(c,a.getX(c)+n.vel[o].x*t*(l?1:.8),a.getY(c)+n.vel[o].y*t*(l?1:.8),a.getZ(c)+n.vel[o].z*t*(l?1:.8))}}a.needsUpdate=!0,r.material.opacity=1-i}}}rasto(t,e,n=!1){const i=new be().setFromPoints([t,e]),r=new Yo({color:n?4473924:2236962,transparent:!0,opacity:.6});r.userData.op=.6;const a=new Vh(i,r);a.renderOrder=3,this.grupo.add(a),this.vivos.push({obj:a,nasceu:this.t,ate:this.t+(n?.12:.07),tipo:"fade"})}decalque(t,e,n,i,r=140){const a=new Vn({map:t,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4}),o=new ge(new Ss(i,i),a);if(o.position.copy(e).addScaledVector(n,.02),o.lookAt(e.clone().add(n)),o.rotateZ(Math.random()*6.28),o.renderOrder=1,this.grupo.add(o),this.decalques.push(o),this.decalques.length>r){const l=this.decalques.shift();this.grupo.remove(l),l.geometry.dispose()}}riscos(t,e,n,i,r=3,a=.5){const o=[],l=[];for(let f=0;f<n;f++){const u=e.clone().multiplyScalar(.6).add(new R(Math.random()-.5,Math.random()-.2,Math.random()-.5)).normalize().multiplyScalar(r*(.5+Math.random()));l.push(u);const d=t.clone(),p=t.clone().addScaledVector(u,.03);o.push(d.x,d.y,d.z,p.x,p.y,p.z)}const c=new be;c.setAttribute("position",new ae(o,3));const h=new ed(c,new Yo({color:i,transparent:!0}));h.frustumCulled=!1,this.grupo.add(h),this.vivos.push({obj:h,nasceu:this.t,ate:this.t+a,tipo:"part",vel:l})}impactoParede(t,e){this.decalque(this.buracos[Math.floor(Math.random()*3)],t,e,.12+Math.random()*.06),this.riscos(t,e,7,3355443,2.5,.45);const n=new qr(new ks({map:this.claroes[1],transparent:!0,opacity:.35,depthWrite:!1}));n.material.userData.op=.35,n.position.copy(t).addScaledVector(e,.1),n.scale.setScalar(.35),this.grupo.add(n),this.vivos.push({obj:n,nasceu:this.t,ate:this.t+.18,tipo:"fade"})}sangue(t,e,n){this.riscos(t,e,n?22:12,11735579,n?4:2.5,.6);const i=new qr(new ks({map:this.manchasVermelhas[Math.floor(Math.random()*4)],transparent:!0,depthWrite:!1}));i.position.copy(t),i.scale.setScalar(n?.55:.35),this.grupo.add(i),this.vivos.push({obj:i,nasceu:this.t,ate:this.t+.25,tipo:"fade"})}poca(t,e=!0){const n=e?this.manchasVermelhas:this.manchasTinta;this.decalque(n[Math.floor(Math.random()*4)],t,new R(0,1,0),.9+Math.random()*.6,200)}manchaParede(t,e){this.decalque(this.manchasVermelhas[Math.floor(Math.random()*4)],t,e,.6+Math.random()*.4)}clarao(t,e=.9){const n=new qr(new ks({map:this.claroes[Math.floor(Math.random()*3)],transparent:!0,depthWrite:!1}));n.position.copy(t),n.scale.setScalar(e),n.material.rotation=Math.random()*6.28,this.grupo.add(n),this.vivos.push({obj:n,nasceu:this.t,ate:this.t+.06,tipo:"fade"})}}const yv=new Vn({visible:!1});function wi(s,t,e,n,i,r){const a=s==="cabeca"?new gs(t,8,6):new sn(t,e,n);a.translate(0,i,0);const o=new ge(a,yv);return o.userData.parte=s,r.push(o),o}function as(s,t,e,n){if(t==="tinta")return new ge(s,gu);const i=new vi("boneco",.25,.3);i.solido(s.clone(),"aresta",40);const r=i.acabar();if(s.type==="SphereGeometry"||s.type==="CylinderGeometry"||s.type==="CapsuleGeometry"){const a=new ge(s.clone().scale(1.12,1.06,1.12),new Vn({color:1118481,side:Ye}));r.add(a)}return r}class vu{constructor(t,e=!0){this.estilo=t;const n=.035,i=(o,l=n)=>{const c=new dn(l,l,o,8);return c.translate(0,-o/2,0),c};this.raiz.add(this.corpo),this.corpo.add(this.anca),this.anca.position.y=.92,this.anca.add(this.peito);const r=i(.52,t==="tinta"?.05:.045);r.translate(0,.52,0),this.peito.add(as(r,t,"tronco",this.alvos)),this.peito.add(wi("tronco",.34,.6,.24,.28,this.alvos)),this.anca.add(wi("virilha",.24,.22,.24,-.1,this.alvos)),this.peito.add(this.cabeca),this.cabeca.position.y=.68,this.cabeca.add(as(new gs(.14,16,12),t,"cabeca",this.alvos)),this.cabeca.add(wi("cabeca",.19,0,0,0,this.alvos));const a=.48;for(const[o,l,c]of[[this.bracoE,this.antebracoE,-1],[this.bracoD,this.antebracoD,1]])this.peito.add(o),o.position.set(c*.02,a,0),o.add(as(i(.3),t,"membro",this.alvos)),o.add(l),l.position.y=-.3,l.add(as(i(.3),t,"membro",this.alvos)),o.add(wi("membro",.13,.3,.13,-.15,this.alvos)),l.add(wi("membro",.13,.3,.13,-.15,this.alvos));for(const[o,l,c]of[[this.pernaE,this.canelaE,-1],[this.pernaD,this.canelaD,1]])this.anca.add(o),o.position.set(c*.07,0,0),o.add(as(i(.46,.04),t,"membro",this.alvos)),o.add(l),l.position.y=-.46,l.add(as(i(.46,.038),t,"membro",this.alvos)),o.add(wi("membro",.17,.46,.17,-.23,this.alvos)),l.add(wi("membro",.15,.46,.15,-.23,this.alvos));if(e){const o=new ye,l=(c,h,f,u,d,p)=>{const _=new ge(new sn(c,h,f),gu);_.position.set(u,d,p),o.add(_)};l(.05,.08,.62,0,0,-.18),l(.02,.02,.3,0,.02,-.62),l(.04,.16,.05,0,-.1,-.12),l(.04,.1,.18,0,-.03,.2),this.arma.add(o),this.peito.add(this.arma),this.arma.position.set(.12,.34,-.25)}if(t==="contorno"){const o=new ps;o.moveTo(-.2,0),o.lineTo(.2,0),o.lineTo(.3,-.95),o.quadraticCurveTo(0,-1.02,-.3,-.95),o.lineTo(-.2,0);const l=new ca(o,6);this.capa=new ge(l,new Vn({color:1381653,side:un})),this.capa.position.set(0,.55,.08),this.capa.rotation.x=.12,this.peito.add(this.capa);const c=new ps;c.moveTo(0,.12),c.bezierCurveTo(.16,.12,.2,-.12,.13,-.25),c.bezierCurveTo(.06,-.34,-.06,-.34,-.13,-.25),c.bezierCurveTo(-.2,-.12,-.16,.12,0,.12);const h=new vi("guitarra",.2,.2),f=new oa(c,{depth:.08,bevelEnabled:!1,curveSegments:10});h.solido(f,"aresta",40),h.caixa(.04,.42,.03,0,.32,.04,0,"aresta");const u=new gs(.035,8,6);u.translate(0,.56,.04),h.solido(u,"aresta",40);const d=[];for(let _=-2;_<=2;_++)d.push([_*.008,-.2,.085],[_*.008,.52,.06]);for(let _=0;_<d.length;_+=2)h.linha([d[_],d[_+1]],"sombra");const p=h.acabar();p.position.set(.05,.3,.14),p.rotation.set(.1,Math.PI,.35),this.peito.add(p)}this.raiz.traverse(o=>{o.frustumCulled=!1})}raiz=new ye;corpo=new ye;alvos=[];anca=new ye;peito=new ye;cabeca=new ye;bracoE=new ye;antebracoE=new ye;bracoD=new ye;antebracoD=new ye;pernaE=new ye;canelaE=new ye;pernaD=new ye;canelaD=new ye;arma=new ye;capa;fase=Math.random()*10;queda=0;quedaDir=1;dobrado=0;animar(t,e,n,i=!1){if(this.queda>0)return this.cair(t);this.fase+=t*(e>.2?2.2+e*1.2:1);const r=this.fase,a=Math.min(e/4,1);if(i){this.anca.position.y=.5,this.pernaE.rotation.x=this.pernaD.rotation.x=-1.4,this.canelaE.rotation.x=this.canelaD.rotation.x=1.4,this.peito.rotation.x=.05+Math.sin(r)*.03,this.bracoE.rotation.set(.5,0,-.25+Math.sin(r*3)*.08),this.bracoD.rotation.set(.5,0,.25-Math.sin(r*3)*.08),this.antebracoE.rotation.x=this.antebracoD.rotation.x=-1.2,this.cabeca.rotation.y=Math.sin(r*.7)*.5;return}if(this.dobrado>0){this.dobrado-=t;const c=Math.min(1,this.dobrado*3,1);this.anca.position.y=.92-.12*c,this.peito.rotation.x=.9*c,this.pernaE.rotation.set(-.2*c,0,.15*c),this.pernaD.rotation.set(-.2*c,0,-.15*c),this.canelaE.rotation.x=this.canelaD.rotation.x=.4*c,this.bracoE.rotation.set(-.3*c,0,.3*c),this.bracoD.rotation.set(-.3*c,0,-.3*c),this.antebracoE.rotation.x=this.antebracoD.rotation.x=-.6*c,this.cabeca.rotation.y=Math.sin(this.fase*9)*.15*c,this.fase+=t;return}this.pernaE.rotation.z=this.pernaD.rotation.z=0,this.anca.position.y=.92+Math.abs(Math.sin(r))*.05*a-n*.06,this.pernaE.rotation.x=Math.sin(r)*.7*a-n*.15,this.pernaD.rotation.x=-Math.sin(r)*.7*a-n*.15,this.canelaE.rotation.x=Math.max(0,-Math.sin(r+1.2))*1.1*a+n*.25,this.canelaD.rotation.x=Math.max(0,Math.sin(r+1.2))*1.1*a+n*.25,this.peito.rotation.x=.08*a+n*.1+Math.sin(r*.5)*.015,this.cabeca.rotation.y=0;const o=-Math.sin(r)*.5*a,l=Math.sin(r)*.5*a;this.bracoE.rotation.set(jt.lerp(o,-1.25,n),jt.lerp(0,.5,n),-.1),this.antebracoE.rotation.x=jt.lerp(-.3,-.4,n),this.bracoD.rotation.set(jt.lerp(l-.3,-1.1,n),jt.lerp(0,-.2,n),.1),this.antebracoD.rotation.x=jt.lerp(-.5,-.9,n),this.arma.rotation.x=jt.lerp(.9,0,n),this.arma.position.set(.12,jt.lerp(.18,.36,n),jt.lerp(-.1,-.28,n)),this.capa&&(this.capa.rotation.x=.12+a*.4+Math.sin(r*2)*.05*a)}morrer(t){this.queda>0||(this.queda=.001,this.quedaDir=t)}cair(t){this.queda=Math.min(1,this.queda+t*2.2);const e=this.queda,n=e<1?1-Math.pow(1-e,3):1;this.anca.position.y=jt.lerp(.92,.12,n),this.corpo.rotation.x=-this.quedaDir*n*1.45,this.pernaE.rotation.x=-.6*n,this.canelaE.rotation.x=1.2*n,this.pernaD.rotation.x=.2*n,this.canelaD.rotation.x=.4*n,this.bracoE.rotation.set(-2.2*n,0,-.8*n),this.bracoD.rotation.set(-1.4*n,0,1*n),this.cabeca.rotation.x=-.5*n,this.arma.visible=e<.5}}const fi=s=>s[Math.floor(Math.random()*s.length)];let bv=1;class Ev{constructor(t,e,n=!1){this.telhado=n,this.corpo=new bc(t,1.75,.3),this.yaw=this.yawGuarda=e,this.boneco.raiz.position.copy(t);for(const i of this.boneco.alvos)i.userData.inimigo=this}id=bv++;boneco=new vu("tinta");corpo;vida=100;estado="guarda";yaw;yawGuarda;tempo=Math.random()*10;reaccao=0;rajada=0;proximoTiro=0;pente=25;recarga=0;strafe=0;strafeAte=0;ultimaVista=new R;vistoHa=99;alvoMov=null;mira=0;morreuHa=0;falouViu=!1;patrulha=[];idxPatrulha=0;aDescansar=0;vel=0;rota=[];pressa=!1;get cabeca(){return this.corpo.pes.add(new R(0,1.6,0))}get vivo(){return this.estado!=="morto"}ouvir(t,e){!this.vivo||this.estado==="combate"||(this.ultimaVista.copy(t),this.estado==="guarda"&&(this.estado="alerta",this.reaccao=.4+Math.random()*.5,Math.random()<.5&&e.falar(fi(["inimigo_alerta_1","inimigo_alerta_2","inimigo_alerta_3"]),{inimigo:this.id},this.cabeca)),this.alvoMov=t.clone())}ferir(t,e,n,i,r,a){if(!this.vivo)return!1;this.vida-=t;const o=a.clone().sub(n).normalize();if(r.sangue(a,o.clone().negate().add(o.clone().multiplyScalar(2)).normalize(),e==="cabeca"),i.acerto(a,e==="cabeca"),this.ultimaVista.copy(n),this.vistoHa=0,this.estado!=="combate"&&(this.estado="combate",this.reaccao=.35),this.vida<=0){this.estado="morto";const l=new R(-Math.sin(this.yaw),0,-Math.cos(this.yaw));return this.boneco.morrer(l.dot(o)<0?1:-1),i.queda(this.corpo.pes),!0}return e==="virilha"?(this.boneco.dobrado=1.4,this.reaccao=Math.max(this.reaccao,1.4),i.falar(fi(["inimigo_tomates_1","inimigo_tomates_2"]),{inimigo:this.id},this.cabeca,!0)):Math.random()<.5&&i.falar(fi(["inimigo_ferido_1","inimigo_ferido_2"]),{inimigo:this.id},this.cabeca),this.strafeAte=0,!1}vejo(t,e,n,i){const r=this.cabeca,o=t.olhos().clone().sub(r),l=o.length();if(l>n)return!1;if(i){const h=new R(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),f=new R(o.x,0,o.z).normalize();if(h.dot(f)<Math.cos(jt.degToRad(62))&&l>4)return!1}const c=e.rayIntersect(new _i(r,o.clone().normalize()));return!c||c.distance>l-.4}actualizar(t,e,n,i,r,a,o){if(this.tempo+=t,!this.vivo){this.morreuHa+=t,this.morreuHa>.45&&this.morreuHa-t<=.45&&a.poca(this.corpo.pes.add(new R(0,.03,0))),this.boneco.animar(t,0,0);return}const l=this.estado==="guarda"?45:75,c=n.vivo()&&this.vejo(n,e,l,this.estado==="guarda"||this.estado==="alerta"),h=i&&i.vivo()&&this.vejo(i,e,50,this.estado!=="combate"),f=c?h&&Math.random()<.004?i:n:h?i:null;f?(this.estado!=="combate"&&(this.estado="combate",this.reaccao=(this.telhado?1.1:.75)+Math.random()*.6,(!this.falouViu||Math.random()<.3)&&(r.falar(fi(["inimigo_viu_1","inimigo_viu_2","inimigo_viu_3","inimigo_viu_4"]),{inimigo:this.id},this.cabeca),this.falouViu=!0)),this.ultimaVista.copy(f.pes()),this.vistoHa=0):this.vistoHa+=t;let u=null,d=null,p=!1;switch(this.estado){case"guarda":{if(this.patrulha.length){const E=this.patrulha[this.idxPatrulha];this.aDescansar>0?this.aDescansar-=t:E.distanceTo(this.corpo.pes)<.8?(this.idxPatrulha=(this.idxPatrulha+1)%this.patrulha.length,this.aDescansar=2+Math.random()*3):u=E}u||(this.yaw=this.yawGuarda+Math.sin(this.tempo*.35)*.7);break}case"alerta":{if(this.rota.length){for(;this.rota.length&&this.rota[0].distanceTo(this.corpo.pes)<1.6;)this.rota.shift();u=this.rota[0]??this.alvoMov,d=u,p=!0;break}this.reaccao-=t,this.alvoMov&&this.reaccao<0&&(this.alvoMov.distanceTo(this.corpo.pes)>3&&!this.telhado?u=this.alvoMov:(this.estado="procura",this.vistoHa=0)),d=this.alvoMov??null;break}case"combate":{if(this.reaccao-=t,d=f?f.olhos():this.ultimaVista,this.vistoHa>2.5){this.estado="procura",this.alvoMov=this.ultimaVista.clone(),this.ultimaVista.distanceTo(this.corpo.pes)<14&&Math.random()<.75?r.falar(fi(["inimigo_medo_1","inimigo_medo_2"]),{inimigo:this.id},this.cabeca,!0):Math.random()<.6&&r.falar(fi(["inimigo_perdeu_1","inimigo_perdeu_2","inimigo_alerta_3"]),{inimigo:this.id},this.cabeca);break}if(!this.telhado&&(this.tempo>this.strafeAte&&(this.strafe=Math.random()<.35?0:Math.random()<.5?-1:1,this.strafeAte=this.tempo+.8+Math.random()*1.6,Math.random()<.15&&r.falar(fi(["inimigo_combate_1","inimigo_combate_2","inimigo_combate_3","inimigo_combate_4","inimigo_combate_5"]),{inimigo:this.id},this.cabeca)),this.strafe&&d)){const E=d.clone().sub(this.corpo.pes).setY(0).normalize(),x=new R(-E.z,0,E.x).multiplyScalar(this.strafe);d.distanceTo(this.corpo.pes)>30&&x.add(E.multiplyScalar(.8)),u=this.corpo.pes.add(x.multiplyScalar(3))}if(this.recarga>0)this.recarga-=t,this.recarga<=0&&(this.pente=25);else if(f&&this.reaccao<=0&&this.mira>.8&&(this.proximoTiro-=t,this.proximoTiro<=0)){this.rajada<=0&&(this.rajada=3+Math.floor(Math.random()*4)),this.rajada--,this.pente--,this.proximoTiro=this.rajada>0?.11+Math.random()*.04:.9+Math.random()*1.1;const E=f.olhos().distanceTo(this.cabeca);let x=.24*Math.exp(-E/40)+.04;x*=f.velocidade()>5?.5:f.velocidade()>1?.75:1,this.vistoHa<.1&&this.reaccao>-1&&(x*=.6),f===i&&(x*=.3);const S=Math.random()<x,b=this.boneco.arma.localToWorld(new R(0,.02,-.85));r.tiro(b,!0),a.clarao(b,.6);const A=f.olhos().add(new R((Math.random()-.5)*1.6,(Math.random()-.3)*1.2,(Math.random()-.5)*1.6));o(b,f,S,S?f.olhos().add(new R(0,-.3,0)):A),this.pente<=0&&(this.recarga=2.2,this.rajada=0,Math.random()<.6&&r.falar(fi(["inimigo_recarregar_1","inimigo_recarregar_2"]),{inimigo:this.id},this.cabeca))}break}case"procura":{d=this.ultimaVista,!this.telhado&&this.ultimaVista.distanceTo(this.corpo.pes)>2.5?(u=this.ultimaVista,p=!0):this.yaw+=t*.8,this.vistoHa>16&&(this.estado="guarda",this.yawGuarda=this.yaw);break}}const _=this.corpo,g=new R;if(u){const E=u.clone().sub(_.pes).setY(0);E.length()>.4&&g.copy(E.normalize().multiplyScalar(this.estado==="combate"?2.2:this.pressa&&(p||this.estado==="alerta")?6.5:p||this.estado==="alerta"?3.8:1.4)),d||(d=u)}this.boneco.dobrado>0&&g.set(0,0,0),_.vel.x+=(g.x-_.vel.x)*Math.min(1,10*t),_.vel.z+=(g.z-_.vel.z)*Math.min(1,10*t);const m=_.pes;for(let E=0;E<2;E++)_.passo(t/2,e);const y=_.pes;if(this.vel=Math.hypot(y.x-m.x,y.z-m.z)/Math.max(t,1e-4),this.estado==="combate"&&this.strafe&&this.vel<.3&&(this.strafeAte=0),d){const E=d.clone().sub(_.pes);let S=Math.atan2(-E.x,-E.z)-this.yaw;S=Math.atan2(Math.sin(S),Math.cos(S)),this.yaw+=S*Math.min(1,t*(this.estado==="combate"?7:3))}this.mira=jt.damp(this.mira,this.estado==="combate"&&this.recarga<=0?1:0,6,t),this.boneco.raiz.position.copy(_.pes),this.boneco.raiz.rotation.y=this.yaw,this.boneco.animar(t,this.vel,this.mira),this.vel>1&&Math.floor(this.tempo*(this.vel>3?2.6:1.8))!==Math.floor((this.tempo-t)*(this.vel>3?2.6:1.8))&&r.passo(_.pes,this.vel>3?.8:.5)}}class Tv{boneco=new vu("contorno",!1);corpo;estado="preso";vida=100;rasto=[];yaw=0;presoHa=0;ultimaPos=new R;vel=0;cadeira;constructor(t,e){this.corpo=new bc(t,1.75,.3),this.yaw=e,this.boneco.raiz.position.copy(t),this.boneco.raiz.rotation.y=e;const n=new vi("banco",.3,.3);n.caixa(.5,.05,.45,0,.47,.05);for(const[i,r]of[[-.22,-.17],[.22,-.17],[-.22,.27],[.22,.27]])n.caixa(.04,.47,.04,i,.235,r);n.caixa(.5,.5,.04,0,.75,.27);for(let i=0;i<4;i++)n.linha([[-.26,.6+i*.06,.3],[.26,.62+i*.06,.3],[.2,.58+i*.06,-.05],[-.2,.6+i*.06,-.05]],"pormenor",!0);this.cadeira=n.acabar(),this.cadeira.position.copy(t),this.cadeira.rotation.y=e}olhos(){return this.corpo.pes.add(new R(0,this.estado==="preso"?1.1:1.55,0))}soltar(){this.estado="livre",this.cadeira.children.forEach(t=>{t.visible=!0}),this.corpo.colocar(this.corpo.pes.add(new R(0,.05,0)))}actualizar(t,e,n,i){if(this.estado==="morto"){this.boneco.animar(t,0,0);return}if(this.estado==="preso"){this.boneco.animar(t,0,0,!0);return}const r=this.rasto[this.rasto.length-1];(!r||r.distanceTo(n)>.8)&&this.rasto.push(n.clone()),this.rasto.length>400&&this.rasto.shift();const a=this.corpo,o=a.pes.distanceTo(n);for(;this.rasto.length>1&&this.rasto[0].distanceTo(a.pes)<.7;)this.rasto.shift();const l=this.rasto[0],c=new R;if(o>2.6&&l){const p=l.clone().sub(a.pes).setY(0);p.length()>.2&&c.copy(p.normalize().multiplyScalar(o>8||i?6.8:4.4))}a.vel.x+=(c.x-a.vel.x)*Math.min(1,10*t),a.vel.z+=(c.z-a.vel.z)*Math.min(1,10*t);for(let p=0;p<2;p++)a.passo(t/2,e);const h=a.pes;this.vel=Math.hypot(h.x-this.ultimaPos.x,h.z-this.ultimaPos.z)/Math.max(t,1e-4),this.ultimaPos.copy(h),c.lengthSq()>1&&this.vel<.4?(this.presoHa+=t,this.presoHa>.6&&a.noChao&&(a.vel.y=6),this.presoHa>2.5&&this.rasto.length>2&&(a.colocar(this.rasto[1].clone().add(new R(0,.2,0))),this.rasto.shift(),this.presoHa=0)):this.presoHa=0,o>25&&this.rasto.length>4&&(a.colocar(this.rasto[this.rasto.length-4].clone()),this.rasto=this.rasto.slice(-4));const f=c.lengthSq()>.5?c:n.clone().sub(a.pes);let d=Math.atan2(-f.x,-f.z)-this.yaw;d=Math.atan2(Math.sin(d),Math.cos(d)),this.yaw+=d*Math.min(1,t*8),this.boneco.raiz.position.copy(a.pes),this.boneco.raiz.rotation.y=this.yaw,this.boneco.animar(t,this.vel,0)}}const Ue=s=>document.querySelector(s);class wv{mira=Ue("#mira");acertoEl=Ue("#acerto");vidaEl=Ue("#vida-n");coracao=Ue("#coracao");penteEl=Ue("#pente");reservaEl=Ue("#reserva");objEl=Ue("#objectivo");marcador=Ue("#marcador");marcadorDist=Ue("#marcador-dist");legendas=Ue("#legendas");accao=Ue("#accao");accaoTexto=Ue("#accao-texto");barra=Ue("#accao-barra");dano=Ue("#dano");vinheta=Ue("#vinheta");fadistaEl=Ue("#fadista-vida");tempoAcerto=0;legendaAte=0;objectivo(t){const e=this.objEl.querySelector(".actual");e&&(e.classList.remove("actual"),e.classList.add("feito"),setTimeout(()=>e.remove(),2200));const n=document.createElement("div");n.className="actual novo",n.textContent=t,this.objEl.appendChild(n),setTimeout(()=>n.classList.remove("novo"),50)}legenda(t,e){this.legendas.innerHTML=`<b>${t}:</b> ${e}`,this.legendas.style.opacity="1",this.legendaAte=performance.now()+1200+e.length*65}acerto(t){this.acertoEl.classList.remove("mostra","morto"),this.acertoEl.offsetWidth,this.acertoEl.classList.add("mostra"),t&&this.acertoEl.classList.add("morto"),this.tempoAcerto=performance.now()}ferido(t){const e=document.createElement("div");e.className="seta-dano",e.style.transform=`translate(-50%, -50%) rotate(${t}rad)`,this.dano.appendChild(e),setTimeout(()=>e.remove(),900)}actualizar(t,e,n,i,r,a,o){this.vidaEl.textContent=String(Math.max(0,Math.ceil(t))),this.coracao.classList.toggle("fraco",t<35),this.penteEl.textContent=a?"··":String(e),this.penteEl.classList.toggle("pouco",e<=8),this.reservaEl.textContent=`${Math.ceil(n/30)} ×`;const l=6+i*900;this.mira.style.setProperty("--abre",`${Math.min(l,60)}px`),this.mira.style.opacity=r?"0":"1",this.vinheta.style.opacity=String(Math.max(0,(60-t)/60)),performance.now()>this.legendaAte&&(this.legendas.style.opacity="0"),o===null?this.fadistaEl.style.display="none":(this.fadistaEl.style.display="block",this.fadistaEl.querySelector("i").style.width=`${Math.max(0,o)}%`)}marcar(t,e,n){if(!t){this.marcador.style.display="none";return}const i=t.clone().add(new R(0,2.2,0)).project(e),r=i.z>1;let a=(i.x*.5+.5)*innerWidth,o=(-i.y*.5+.5)*innerHeight;r&&(a=innerWidth-a,o=innerHeight-130),a=jt.clamp(a,60,innerWidth-60),o=jt.clamp(o,70,innerHeight-130),this.marcador.style.display="block",this.marcador.style.transform=`translate(${a}px, ${o}px)`,this.marcadorDist.textContent=`${Math.round(t.distanceTo(n))} m`}accaoMostrar(t,e=0){this.accao.style.display=t?"flex":"none",t&&(this.accaoTexto.textContent=t),this.barra.style.width=`${e*100}%`}ecra(t,e){for(const n of["inicio","pausa","fim"])Ue("#"+n).style.display=n===t?"flex":"none";t==="fim"&&e&&(Ue("#fim .folha").innerHTML=e),document.body.classList.toggle("em-jogo",t===null)}}const yn=new $_({antialias:!0});yn.setPixelRatio(Math.min(devicePixelRatio,2));yn.setSize(innerWidth,innerHeight);yn.setClearColor(16777215);yn.autoClear=!1;document.body.prepend(yn.domElement);const xi=new Nh,cn=new on(72,innerWidth/innerHeight,.05,420);_u(innerWidth,innerHeight);const Ne=new wv;Ne.ecra("inicio");const Ec=document.querySelector("#comecar"),Av=document.querySelector("#carregar");Ec.disabled=!0;const Tc=await(await fetch("/tinta-na-alta/nivel.json")).json();await Promise.race([document.fonts.load('64px "Patrick Hand"'),new Promise(s=>setTimeout(s,2500))]).catch(()=>{});const Ve=new pv(Tc);Ve.construir();xi.add(Ve.cena);const jn=new yc;jn.fromGraphNode(Ve.colisao);const Ht=Ve.pontos,en=new Sv;xi.add(en.grupo);const Vt=new xv;Vt.legenda=(s,t)=>Ne.legenda(s,t);Vt.ocluido=s=>{const t=Vt.ouvinte.clone().sub(s),e=t.length(),n=jn.rayIntersect(new _i(s,t.normalize()));return!!n&&n.distance<e-.5};const we=new vv(en.claroes[0]);we.redimensionar(innerWidth/innerHeight);const yt=new _v(cn,Ht.inicio),xu=s=>{const t=s.clone().sub(yt.corpo.pes);yt.yaw=Math.atan2(-t.x,-t.z)};xu(Ht.olharInicio);const Rv=s=>[s.x,-s.z];function se(s,t,e,n){const i=Ve.sDe(s),r=Ve.sDe(t);return Ve.noPercurso(i+(r-i)*e,n)}function ro(s,t){const[e,n]=Rv(s),i=Ve.chao(e,n);let r=null;for(const a of Tc.edificios){if(t.has(a.osm)||a.passagem||a.furos.length)continue;const o=a.topo-i;if(o<4||o>13||a.cumeeira-a.topo>1.5)continue;const l=a.anel.map(m=>m[0]),c=a.anel.map(m=>m[1]),h=l.reduce((m,y)=>m+y)/l.length,f=c.reduce((m,y)=>m+y)/c.length;let u=a.anel[0],d=1/0;for(let m=0;m<a.anel.length;m++){const y=a.anel[m],E=a.anel[(m+1)%a.anel.length],x=E[0]-y[0],S=E[1]-y[1],b=x*x+S*S,A=b?Math.max(0,Math.min(1,((e-y[0])*x+(n-y[1])*S)/b)):0,v=y[0]+x*A,w=y[1]+S*A,I=Math.hypot(e-v,n-w);I<d&&(d=I,u=[v,w])}if(d>16||d<3)continue;const p=Math.hypot(h-u[0],f-u[1]);if(p<3)continue;const _=u[0]+(h-u[0])/p*1.4,g=u[1]+(f-u[1])/p*1.4;(!r||d<r.d)&&(r={pos:new R(_,a.topo+.05,-g),d,osm:a.osm})}return r&&t.add(r.osm),r?.pos??null}const Fn=[];function fe(s,t,e={}){if(!e.telhado)for(let r=0;r<12&&Fn.some(a=>a.corpo.pes.distanceTo(s)<1.4);r++){const a=r*2.4,o=1.5+r*.25,l=s.x+Math.cos(a)*o,c=-s.z+Math.sin(a)*o;Ve.edificioEm(l,c)||(s=new R(l,Ve.chao(l,c),-c))}const n=t.clone().sub(s),i=new Ev(s.clone().add(new R(0,.1,0)),Math.atan2(-n.x,-n.z),!!e.telhado);return e.patrulha&&(i.patrulha=e.patrulha),xi.add(i.boneco.raiz),Fn.push(i),e.alerta&&i.ouvir(e.alerta,Vt),i}const Mu=[Ht.inicio,Ht.olharInicio,Ht.arco,Ht.largoArco,Ht.escadasBase,Ht.escadasMeio,Ht.escadasTopo,Ht.largo,Ht.portaClaustro,Ht.dentroClaustro,Ht.patio];function Cv(){const s=new Set,[,t,e,n,i,r,a,o,l,c,h]=Mu;fe(se(e,n,.9,2.5),e),fe(se(n,i,.35,-2),e,{patrulha:[se(n,i,.2,0),se(n,i,.8,0)]}),fe(se(n,i,.95,1.2),n),fe(se(i,r,.55,.8),i),fe(se(i,r,.85,-.8),i,{patrulha:[se(i,r,.7,0),se(r,a,.2,0)]});const f=ro(se(i,r,.5,0),s);f&&fe(f,i,{telhado:!0}),fe(se(r,a,.6,1),r);const u=ro(se(r,a,.7,0),s);u&&fe(u,r,{telhado:!0}),fe(se(a,o,.3,-2),a),fe(se(a,o,.9,3),a,{patrulha:[se(a,o,.9,3),se(o,l,.4,0)]}),fe(se(o,l,.6,-3),o);const d=ro(o,s);d&&fe(d,a,{telhado:!0}),fe(se(o,l,.95,2),o),fe(se(l,c,1,0).add(new R(0,0,0)),l),fe(se(c,h,.35,5),c),fe(se(c,h,.35,-5),c),fe(se(c,h,.75,4),c),fe(se(c,h,1.05,-3),c,{patrulha:[se(c,h,1.05,-3),se(c,h,1.05,4)]}),Pv();for(const p of Ve.varandas)fe(p.pos,p.olhar,{telhado:!0})}function Pv(){const s=Tc.edificios.find(c=>c.osm==="relation/3475986")?.furos[0];if(!s)return;const t=Ht.patio.x,e=-Ht.patio.z,n=[t+3,e-2],i=(c,h)=>{let f=!1;for(let u=0,d=s.length-1;u<s.length;d=u++){const[p,_]=s[u],[g,m]=s[d];_>h!=m>h&&c<(g-p)*(h-_)/(m-_)+p&&(f=!f)}return f&&Math.hypot(c-n[0],h-n[1])>2.4},r=(c,h)=>{for(let f=h;f>1.6;f-=.4){const u=t+Math.cos(c)*f,d=e+Math.sin(c)*f;if(i(u,d))return new R(u,Ve.chao(u,d),-d)}return null},a=Math.atan2(-Ht.dentroClaustro.z-e,Ht.dentroClaustro.x-t);for(const c of[0,2.1,-2.1]){const h=r(a+c,3.2);h&&fe(h,h.clone().add(h.clone().sub(Ht.patio).setY(0).multiplyScalar(4)))}const o=[0,1,2,3].map(c=>r(a+.8+c*Math.PI/2,5.5)).filter(c=>!!c);o.length>=2&&fe(o[0],Ht.patio,{patrulha:o});const l=r(a+Math.PI,7);l&&fe(l,Ht.dentroClaustro)}function Lv(){const s=yt.corpo.pes,[,,t,e,n,i,r,a,o]=Mu;fe(se(a,o,.2,4),o,{alerta:s}),fe(se(r,a,.6,-2),o,{alerta:s}),fe(se(i,r,.3,.8),r,{alerta:s}),fe(se(n,i,.2,1),i,{alerta:s}),fe(se(n,i,.3,-1),i,{alerta:s}),fe(se(e,n,.6,1.5),n),fe(se(t,e,.4,-1.5),n)}const Dv=(()=>{const s=Ht.dentroClaustro.clone().sub(Ht.patio);return Math.atan2(-s.x,-s.z)})(),ce=new Tv(Ht.patio.clone(),Dv);xi.add(ce.boneco.raiz,ce.cadeira);const Su={olhos:()=>yt.olhos.clone(),pes:()=>yt.corpo.pes,velocidade:()=>Math.hypot(yt.corpo.vel.x,yt.corpo.vel.z),ferir:()=>{},vivo:()=>!yt.morto},Iv={olhos:()=>ce.olhos(),pes:()=>ce.corpo.pes,velocidade:()=>ce.vel,ferir:()=>{},vivo:()=>ce.estado==="livre"},zs=[];function Uv(s){const t=new vi("pente",.3,.2);t.caixa(.08,.04,.22,0,.02,0),t.caixa(.05,.03,.2,.09,.015,.03,.4);const e=t.acabar();e.position.copy(s).add(new R(.5,.02,.2)),xi.add(e),zs.push({obj:e,pos:e.position.clone()})}let di=null;function Nv(){const s=Ht.portalSe??Ht.largo,t=Ve.sDe(yt.corpo.pes),e=Ve.sDe(Ht.largo),n=fe(s,Ht.largo);n.rota=Ve.percurso.filter((i,r)=>{const a=Ve.comprimentos[r];return a>=t&&a<=e}).reverse(),n.pressa=!0,n.ouvir(yt.corpo.pes,Vt),di={e:n,desde:Jn,gritou:!1}}let ze="arco",ni=!1,vs=!1,Jn=0,yu=0,ic=0,bu=0,pi=0,Eu=-99,oh=!1,ch=0;const sc={arco:"Passa o Arco de Almedina",largo:"Sobe o Quebra-Costas até ao Largo da Sé Velha",claustro:"Entra no claustro da Sé Velha",soltar:"Solta o fadista no pátio do claustro",fuga:"Leva o fadista até ao Arco de Almedina",fim:""},Fv=()=>ze==="arco"?Ht.arco:ze==="largo"?Ht.largo:ze==="claustro"?Ht.dentroClaustro:ze==="soltar"?Ht.patio:ze==="fuga"?Ht.olharInicio:null;function ls(s,t){ze=s,sc[s]&&Ne.objectivo(sc[s]),t&&setTimeout(()=>Vt.falar(t,"radio"),400)}const lh=[[0,57,1.2],[.05,64,.4],[.3,69,.4],[.6,72,.4],[.9,71,.3],[1.2,69,.7],[1.2,53,1.2],[1.8,67,.3],[2.1,65,.3],[2.4,64,1.2],[2.4,52,1.2],[3.2,68,.3],[3.5,71,.3],[3.8,69,1.4],[3.8,57,1.4]];function ua(s,t){if(vs)return;vs=!0,ze="fim";const e=ic?Math.round(bu/ic*100):0,n=Math.floor(Jn/60),i=Math.floor(Jn%60);setTimeout(()=>{document.exitPointerLock(),Ne.ecra("fim",`
      <p class="carimbo">${s?"cumprida":"falhada"}</p>
      <h2>${s?"A Serenata está salva":"Missão falhada"}</h2>
      <p>${t}</p>
      <table>
        <tr><td>tempo</td><td>${n}:${String(i).padStart(2,"0")}</td></tr>
        <tr><td>Borrões abatidos</td><td>${yu}</td></tr>
        <tr><td>pontaria</td><td>${e}%</td></tr>
      </table>
      <button onclick="location.reload()">Outra vez</button>`)},s?6500:3500)}let xs=!1,fa=!1;document.addEventListener("mousedown",s=>{!ni||document.pointerLockElement!==document.body||(s.button===0&&(xs=!0),s.button===2&&(fa=!0))});document.addEventListener("mouseup",s=>{s.button===0&&(xs=!1),s.button===2&&(fa=!1)});document.addEventListener("contextmenu",s=>s.preventDefault());document.addEventListener("keydown",s=>{!ni||yt.morto||s.code==="KeyR"&&we.recarregar()&&Vt.recarregar()});Ec.addEventListener("click",()=>{document.body.requestPointerLock(),Vt.iniciar(),ni||(ni=!0,Ne.ecra(null),ls("arco","radio_inicio"),setTimeout(()=>Vt.sino(Ht.largo.clone().add(new R(40,30,0)),3),9e3))});document.addEventListener("pointerlockchange",()=>{if(!ni||vs)return;const s=document.pointerLockElement===document.body;Ne.ecra(s?null:"pausa"),s||(xs=!1,fa=!1,yt.teclas.clear()),Vt.pronto&&(s?Vt.ctx.resume():Vt.ctx.suspend())});document.querySelector("#pausa").addEventListener("click",()=>document.body.requestPointerLock());addEventListener("resize",()=>{yn.setSize(innerWidth,innerHeight),cn.aspect=innerWidth/innerHeight,cn.updateProjectionMatrix(),we.redimensionar(cn.aspect),_u(innerWidth,innerHeight)});yt.onPasso=s=>Vt.passo(null,s);yt.onAterrar=s=>{Vt.aterrar(s),s>13&&wc((s-13)*8,yt.corpo.pes.clone().add(new R(0,-1,0)))};const ao=new $d,Ov={cabeca:100,tronco:38,membro:24,virilha:55};function Tu(){we.disparar(),ic++,Vt.tiro(null);const s=we.dispersao(Math.hypot(yt.corpo.vel.x,yt.corpo.vel.z)/4,yt.corpo.noChao),t=new R(0,0,-1).applyEuler(new gi((Math.random()-.5)*s*2,(Math.random()-.5)*s*2,0)).applyQuaternion(cn.quaternion),e=cn.position.clone();yt.pitch=Math.min(1.5,yt.pitch+.009+Math.random()*.006*(1-we.mira*.5)),yt.yaw+=(Math.random()-.5)*.006,ao.set(e,t),ao.far=250;const n=Fn.filter(o=>o.vivo&&o.corpo.pes.distanceTo(e)<250).flatMap(o=>o.boneco.alvos),i=ao.intersectObjects(n,!1)[0],r=jn.rayIntersect(new _i(e,t)),a=new R(.12,-.08,-.9).applyQuaternion(cn.quaternion).add(e);if(i&&(!r||i.distance<r.distance)){const o=i.object.userData.inimigo,l=i.object.userData.parte;bu++;const c=o.ferir(Ov[l]*(.9+Math.random()*.2),l,e,Vt,en,i.point);Ne.acerto(c),en.rasto(a,i.point);const h=jn.rayIntersect(new _i(i.point,t));if(h&&h.distance<2.5&&en.manchaParede(h.position,h.triangle.getNormal(new R)),c){yu++,Uv(o.corpo.pes);const f=Fn.find(u=>u.vivo&&u!==o&&u.corpo.pes.distanceTo(o.corpo.pes)<25);f&&setTimeout(()=>Vt.falar(Math.random()<.5?"inimigo_baixa_1":"inimigo_baixa_2",{inimigo:f.id},f.cabeca),700);for(const u of Fn)u.vivo&&u.corpo.pes.distanceTo(o.corpo.pes)<22&&u.ouvir(yt.corpo.pes,Vt)}}else if(r){const o=r.triangle.getNormal(new R);o.dot(t)>0&&o.negate(),en.impactoParede(r.position,o),en.rasto(a,r.position),Vt.impacto(r.position,Math.random()<.25)}else en.rasto(a,e.clone().addScaledVector(t,120));for(const o of Fn)o.vivo&&o.corpo.pes.distanceTo(e)<65&&o.ouvir(yt.corpo.pes,Vt)}function wc(s,t){if(yt.morto||vs)return;yt.vida-=s,Eu=Jn,Vt.dor();const e=t.clone().sub(yt.corpo.pes),n=Math.atan2(e.x,-e.z)+yt.yaw;Ne.ferido(-n),yt.pitch+=.02,yt.vida<35&&!oh&&(oh=!0,Vt.falar("radio_ferido","radio")),yt.vida<=0&&(yt.morto=!0,xs=!1,Vt.falar("radio_morreste","radio"),ua(!1,"Caíste nas ruelas da Alta. Os Borrões ficaram com o fadista."))}function Bv(s,t,e,n){const i=n.clone().sub(s).normalize(),r=jn.rayIntersect(new _i(s,i)),a=n.distanceTo(s),o=r&&r.distance<a-.3;if(e&&!o){en.rasto(s,n,!0),t===Su?wc(7+Math.random()*4,s):ce.estado==="livre"&&(ce.vida-=6,en.sangue(n,i,!1),Math.random()<.5&&Vt.falar(Math.random()<.5?"fadista_medo_1":"fadista_medo_2","fadista",ce.olhos()),ce.vida<=0&&(ce.estado="morto",ce.boneco.morrer(1),Vt.queda(ce.corpo.pes),Vt.falar("radio_fadista_caiu","radio"),ua(!1,"O fadista não chegou à Serenata.")));return}const l=o||r&&r.distance<200?r.position:s.clone().addScaledVector(i,150);if(en.rasto(s,l,!0),r&&r.distance<200){const u=r.triangle.getNormal(new R);u.dot(i)>0&&u.negate(),en.impactoParede(r.position,u),r.position.distanceTo(yt.olhos)<12&&Vt.impacto(r.position,Math.random()<.35)}const c=yt.olhos,h=jt.clamp(c.clone().sub(s).dot(i),0,s.distanceTo(l)),f=s.clone().addScaledVector(i,h);if(f.distanceTo(c)<2.2){const u=f.clone().sub(c).dot(new R(Math.cos(yt.yaw),0,-Math.sin(yt.yaw)));Vt.zumbido(jt.clamp(u,-1,1))}}Cv();Av.textContent="";Ec.disabled=!1;const Gs=new URLSearchParams(location.search);Gs.get("em")&&Ht[Gs.get("em")]&&(yt.corpo.colocar(Ht[Gs.get("em")]),xu(Ht[Gs.get("olhar")??"largo"]??Ht.largo));window.dbg={mundo:Ve,jog:yt,camera:cn,inimigos:Fn,fadista:ce,P:Ht,arma:we,som:Vt,hud:Ne,cena:xi,comecar:()=>{ni=!0,Ne.ecra(null),ls("arco")},disparar:()=>Tu(),ferir:s=>wc(s,yt.corpo.pes),soltar:()=>{pi=1},fase:()=>ze,vencer:()=>ua(!0,"Teste.")};const hh=new Yd;let uh=yt.yaw,fh=yt.pitch;yn.setAnimationLoop(()=>{hh.update();const s=Math.min(hh.getDelta(),.05);if(ni&&(document.pointerLockElement===document.body||Gs.has("auto"))){Jn+=s,yt.actualizar(s,jn,we.mira>.5);const e=yt.corpo.pes;xs&&!yt.morto&&!yt.aCorrer&&(we.podeDisparar()?Tu():we.pente===0&&we.aRecarregar<=0&&(we.reserva>0?we.recarregar()&&Vt.recarregar():(Vt.vazio(),xs=!1))),we.actualizar(s,yt.yaw-uh,yt.pitch-fh,yt.andar,yt.balanco,yt.aCorrer,fa),uh=yt.yaw,fh=yt.pitch,cn.fov=jt.lerp(72,56,we.mira),cn.updateProjectionMatrix(),!yt.morto&&Jn-Eu>6&&(yt.vida=Math.min(100,yt.vida+s*5)),yt.vida<35&&!yt.morto&&Jn>ch&&(Vt.coracao(1-yt.vida/35),ch=Jn+.9);for(let i=zs.length-1;i>=0;i--)zs[i].pos.distanceTo(e)<1.6&&we.reserva<240&&(we.reserva+=30,Vt.recarregar(),xi.remove(zs[i].obj),zs.splice(i,1),Ne.legenda("","+1 carregador"));const n=ce.estado==="livre"?Iv:null;for(const i of Fn)!i.vivo&&i.corpo.pes.distanceTo(e)>200||i.actualizar(s,jn,Su,n,Vt,en,Bv);if(ce.actualizar(s,jn,e,yt.aCorrer),!vs){if(!di&&ze!=="arco"&&e.distanceTo(Ht.escadasBase)<8&&Nv(),di&&!di.gritou&&di.e.vivo){const i=di.e;(Fn.some(a=>a!==i&&a.vivo&&a.corpo.pes.distanceTo(i.corpo.pes)<3.5)||Jn-di.desde>8)&&(Vt.falar("inimigo_guedes",{inimigo:i.id},i.cabeca,!0),di.gritou=!0)}if(ze==="arco"&&e.distanceTo(Ht.arco)<7?ls("largo","radio_arco"):ze==="largo"&&e.distanceTo(Ht.largo)<14?ls("claustro","radio_largo"):ze==="claustro"&&e.distanceTo(Ht.dentroClaustro)<6&&ls("soltar","radio_claustro"),ze==="soltar"||ze!=="fuga"&&ce.estado==="preso"&&e.distanceTo(Ht.patio)<2.4)if(e.distanceTo(Ht.patio)<2.4){const r=yt.teclas.has("KeyF");if(pi=r?pi+s/1.4:Math.max(0,pi-s),r&&Math.floor(pi*5)!==Math.floor((pi-s/1.4)*5)&&Vt.corda(),Ne.accaoMostrar("Desatar o fadista (manter)",pi),pi>=1){Ne.accaoMostrar(null),ce.soltar(),ze!=="soltar"&&Ne.objectivo(sc.soltar);const a=Vt.falar("fadista_solto","fadista",ce.olhos());Vt.guitarra(ce.olhos(),lh.slice(0,10)),setTimeout(()=>{ls("fuga","radio_fuga"),Lv()},(a+.6)*1e3),ze="fuga",Ne.objectivo("…")}}else Ne.accaoMostrar(null);if(ze==="fuga"&&ce.estado==="livre")if(e.distanceTo(Ht.olharInicio)<9&&ce.corpo.pes.distanceTo(e)<14){ce.estado="salvo";const i=Vt.falar("fadista_fim","fadista",ce.olhos());Vt.guitarra(ce.olhos(),lh),setTimeout(()=>Vt.falar("radio_fim","radio"),(i+.5)*1e3),Vt.sino(Ht.largo.clone().add(new R(40,30,0)),4),ua(!0,"O fadista desceu o Quebra-Costas contigo. À meia-noite, nas escadas da Sé Velha, canta para ti.")}else ce.corpo.pes.distanceTo(e)>18&&Math.random()<s*.15?Vt.falar("fadista_segue_2","fadista",ce.olhos()):Math.random()<s*.02&&Vt.falar("fadista_segue_1","fadista",ce.olhos())}en.actualizar(s),Vt.ouvinte.copy(cn.position),Vt.frenteOuvinte.copy(yt.frente())}else if(!ni){yt.yaw+=Math.sin(performance.now()/3e3)*4e-4,yt.actualizar(s,jn,!1);for(const e of Fn)e.boneco.animar(s,0,0);ce.boneco.animar(s,0,0,!0)}Ne.actualizar(yt.vida,we.pente,we.reserva,we.dispersao(Math.hypot(yt.corpo.vel.x,yt.corpo.vel.z)/4,yt.corpo.noChao),we.mira>.7,we.aRecarregar>0,ce.estado==="livre"?ce.vida:null),Ne.marcar(ni&&!vs?Fv():null,cn,yt.corpo.pes),yn.clear(),yn.render(xi,cn),yt.morto||(yn.clearDepth(),yn.render(we.cena,we.camera))});
