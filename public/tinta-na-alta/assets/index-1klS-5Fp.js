(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sc="186",n0={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},i0={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zf=0,ph=1,Vf=2,s0=3,r0=0,Jr=1,kf=2,ir=3,$i=0,en=1,Pn=2,fi=0,cr=1,mh=2,gh=3,xh=4,Gf=5,a0=6,Ms=100,Hf=101,Wf=102,Xf=103,qf=104,Yf=200,Zf=201,Jf=202,$f=203,Nh=204,Fh=205,Kf=206,jf=207,Qf=208,tp=209,ep=210,np=211,ip=212,sp=213,rp=214,Uo=0,No=1,Fo=2,ur=3,Oo=4,Bo=5,zo=6,Vo=7,wa=0,ap=1,op=2,$n=0,Oh=1,Bh=2,zh=3,Vh=4,kh=5,Gh=6,Hh=7,_h="attached",cp="detached",bc=300,pi=301,Ki=302,$r=303,Kr=304,Mr=306,la=1e3,wn=1001,ha=1002,Oe=1003,Wh=1004,o0=1004,sr=1005,c0=1005,Re=1006,jr=1007,l0=1007,hi=1008,h0=1008,bn=1009,Xh=1010,qh=1011,dr=1012,wc=1013,zn=1014,_n=1015,Kn=1016,Tc=1017,Ec=1018,fr=1020,Yh=35902,Zh=35899,Jh=1021,$h=1022,vn=1023,mi=1026,Zi=1027,Ac=1028,Ta=1029,ji=1030,Cc=1031,u0=1032,Rc=1033,Qr=33776,ta=33777,ea=33778,na=33779,ko=35840,Go=35841,Ho=35842,Wo=35843,Xo=36196,qo=37492,Yo=37496,Zo=37488,Jo=37489,ua=37490,$o=37491,Ko=37808,jo=37809,Qo=37810,tc=37811,ec=37812,nc=37813,ic=37814,sc=37815,rc=37816,ac=37817,oc=37818,cc=37819,lc=37820,hc=37821,uc=36492,dc=36494,fc=36495,pc=36283,mc=36284,da=36285,gc=36286,lp=2200,hp=2201,up=2202,fa=2300,xc=2301,Po=2302,vh=2303,Ss=2400,bs=2401,pa=2402,Pc=2500,Kh=2501,d0=0,f0=1,p0=2,dp=3200,m0=3201,g0=3202,x0=3203,Di=0,fp=1,wi="",tn="srgb",ma="srgb-linear",ga="linear",ye="srgb",_0="",v0="rg",y0="ga",M0=0,Io=7680,S0=7681,b0=7682,w0=7683,T0=34055,E0=34056,A0=5386,C0=512,R0=513,P0=514,I0=515,L0=516,D0=517,U0=518,pp=519,mp=512,gp=513,xp=514,Ic=515,_p=516,vp=517,Lc=518,yp=519,Dc=35044,N0=35048,F0=35040,O0=35045,B0=35049,z0=35041,V0=35046,k0=35050,G0=35042,H0="100",yh="300 es",Dn=2e3,As=2001,W0={COMPUTE:"compute",RENDER:"render"},X0={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},q0={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},Y0={TEXTURE_COMPARE:"depthTextureCompare"},Z0={NONE:0,SHARED:1,FULL:2};function J0(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}const $0={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function rr(r,t){return new $0[r](t)}function Mp(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function xa(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Sp(){const r=xa("canvas");return r.style.display="block",r}const Gu={};let Qi=null;function K0(r){Qi=r}function j0(){return Qi}function _a(...r){const t="THREE."+r.shift();Qi?Qi("log",t,...r):console.log(t,...r)}function bp(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=r[1];e&&e.isStackTrace?r[0]+=" "+e.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function dt(...r){r=bp(r);const t="THREE."+r.shift();if(Qi)Qi("warn",t,...r);else{const e=r[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...r)}}function Ut(...r){r=bp(r);const t="THREE."+r.shift();if(Qi)Qi("error",t,...r);else{const e=r[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...r)}}function Ri(...r){const t=r.join(" ");t in Gu||(Gu[t]=!0,dt(...r))}function Q0(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const tg={[Uo]:No,[Fo]:zo,[Oo]:Vo,[ur]:Bo,[No]:Uo,[zo]:Fo,[Vo]:Oo,[Bo]:ur};class Qn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hu=1234567;const ws=Math.PI/180,pr=180/Math.PI;function Nn(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[r&255]+an[r>>8&255]+an[r>>16&255]+an[r>>24&255]+"-"+an[t&255]+an[t>>8&255]+"-"+an[t>>16&15|64]+an[t>>24&255]+"-"+an[e&63|128]+an[e>>8&255]+"-"+an[e>>16&255]+an[e>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function Wt(r,t,e){return Math.max(t,Math.min(e,r))}function jh(r,t){return(r%t+t)%t}function eg(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function ng(r,t,e){return r!==t?(e-r)/(t-r):0}function ia(r,t,e){return(1-e)*r+e*t}function ig(r,t,e,n){return ia(r,t,1-Math.exp(-e*n))}function sg(r,t=1){return t-Math.abs(jh(r,t*2)-t)}function rg(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function ag(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function og(r,t){return r+Math.floor(Math.random()*(t-r+1))}function cg(r,t){return r+Math.random()*(t-r)}function lg(r){return r*(.5-Math.random())}function hg(r){r!==void 0&&(Hu=r);let t=Hu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ug(r){return r*ws}function dg(r){return r*pr}function fg(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function pg(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function mg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function gg(r,t,e,n,i){const s=Math.cos,a=Math.sin,o=s(e/2),c=a(e/2),l=s((t+n)/2),h=a((t+n)/2),d=s((t-n)/2),u=a((t-n)/2),f=s((n-t)/2),p=a((n-t)/2);switch(i){case"XYX":r.set(o*h,c*d,c*u,o*l);break;case"YZY":r.set(c*u,o*h,c*d,o*l);break;case"ZXZ":r.set(c*d,c*u,o*h,o*l);break;case"XZX":r.set(o*h,c*p,c*f,o*l);break;case"YXY":r.set(c*f,o*h,c*p,o*l);break;case"ZYZ":r.set(c*p,c*f,o*h,o*l);break;default:dt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function gn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function te(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ie={DEG2RAD:ws,RAD2DEG:pr,generateUUID:Nn,clamp:Wt,euclideanModulo:jh,mapLinear:eg,inverseLerp:ng,lerp:ia,damp:ig,pingpong:sg,smoothstep:rg,smootherstep:ag,randInt:og,randFloat:cg,randFloatSpread:lg,seededRandom:hg,degToRad:ug,radToDeg:dg,isPowerOfTwo:fg,ceilPowerOfTwo:pg,floorPowerOfTwo:mg,setQuaternionFromProperEuler:gg,normalize:te,denormalize:gn};class it{static{it.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class hn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3],u=s[a+0],f=s[a+1],p=s[a+2],x=s[a+3];if(d!==x||c!==u||l!==f||h!==p){let g=c*u+l*f+h*p+d*x;g<0&&(u=-u,f=-f,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){const v=Math.acos(g),M=Math.sin(v);m=Math.sin(m*v)/M,o=Math.sin(o*v)/M,c=c*m+u*o,l=l*m+f*o,h=h*m+p*o,d=d*m+x*o}else{c=c*m+u*o,l=l*m+f*o,h=h*m+p*o,d=d*m+x*o;const v=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=v,l*=v,h*=v,d*=v}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=s[a],u=s[a+1],f=s[a+2],p=s[a+3];return t[e]=o*p+h*d+c*f-l*u,t[e+1]=c*p+h*u+l*d-o*f,t[e+2]=l*p+h*f+o*u-c*d,t[e+3]=h*p-o*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),d=o(s/2),u=c(n/2),f=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"YZX":this._x=u*h*d+l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d-u*f*p;break;case"XZY":this._x=u*h*d-l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d+u*f*p;break;default:dt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+s*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+s*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{static{C.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),h=2*(o*e-s*i),d=2*(s*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-s*d,this.z=i+c*d+s*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return gl.copy(this).projectOnVector(t),this.sub(gl)}reflect(t){return this.sub(gl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gl=new C,Wu=new hn;class $t{static{$t.prototype.isMatrix3=!0}constructor(t,e,n,i,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,c,l)}set(t,e,n,i,s,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],x=i[0],g=i[3],m=i[6],v=i[1],M=i[4],_=i[7],S=i[2],b=i[5],E=i[8];return s[0]=a*x+o*v+c*S,s[3]=a*g+o*M+c*b,s[6]=a*m+o*_+c*E,s[1]=l*x+h*v+d*S,s[4]=l*g+h*M+d*b,s[7]=l*m+h*_+d*E,s[2]=u*x+f*v+p*S,s[5]=u*g+f*M+p*b,s[8]=u*m+f*_+p*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*s,f=l*s-a*c,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return t[0]=d*x,t[1]=(i*l-h*n)*x,t[2]=(o*n-i*a)*x,t[3]=u*x,t[4]=(h*e-i*c)*x,t[5]=(i*s-o*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Ri("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xl.makeScale(t,e)),this}rotate(t){return Ri("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xl.makeRotation(-t)),this}translate(t,e){return Ri("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const xl=new $t,Xu=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qu=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xg(){const r={enabled:!0,workingColorSpace:ma,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ye&&(i.r=Pi(i.r),i.g=Pi(i.g),i.b=Pi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ye&&(i.r=lr(i.r),i.g=lr(i.g),i.b=lr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===wi?ga:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Ri("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Ri("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ma]:{primaries:t,whitePoint:n,transfer:ga,toXYZ:Xu,fromXYZ:qu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:t,whitePoint:n,transfer:ye,toXYZ:Xu,fromXYZ:qu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}}),r}const oe=xg();function Pi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function lr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ns;class wp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ns===void 0&&(Ns=xa("canvas")),Ns.width=t.width,Ns.height=t.height;const i=Ns.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Ns}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=xa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Pi(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pi(e[n]/255)*255):e[n]=Pi(e[n]);return{data:e,width:t.width,height:t.height}}else return dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let _g=0;class Ai{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=Nn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(_l(i[a].image)):s.push(_l(i[a]))}else s=_l(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function _l(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?wp.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(dt("Texture: Unable to serialize Texture."),{})}class vg extends Ai{constructor(t=null){Ri('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(t),this.isSource=!0}}let yg=0;const vl=new C;class Le extends Qn{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,n=wn,i=wn,s=Re,a=hi,o=vn,c=bn,l=Le.DEFAULT_ANISOTROPY,h=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=Nn(),this.name="",this.source=new Ai(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vl).x}get height(){return this.source.getSize(vl).y}get depth(){return this.source.getSize(vl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){dt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case la:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case ha:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case la:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case ha:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=bc;Le.DEFAULT_ANISOTROPY=1;class ce{static{ce.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,_=(f+1)/2,S=(m+1)/2,b=(h+u)/4,E=(d+x)/4,y=(p+g)/4;return M>_&&M>S?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=b/n,s=E/n):_>S?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=b/i,s=y/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=E/s,i=y/s),this.set(n,i,s,e),this}let v=Math.sqrt((g-p)*(g-p)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-x)/v,this.z=(u-h)/v,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qh extends Qn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Re,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e),this.textures=[];const i={width:t,height:e,depth:n.depth},s=new Le(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Re,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new Ai(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tn extends Qh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Uc extends Le{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mg extends Tn{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Uc(null,t,e,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Nc extends Le{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Sg extends Tn{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Nc(null,t,e,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Xt{static{Xt.prototype.isMatrix4=!0}constructor(t,e,n,i,s,a,o,c,l,h,d,u,f,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,c,l,h,d,u,f,p,x,g)}set(t,e,n,i,s,a,o,c,l,h,d,u,f,p,x,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,i=1/Fs.setFromMatrixColumn(t,0).length(),s=1/Fs.setFromMatrixColumn(t,1).length(),a=1/Fs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=a*h,f=a*d,p=o*h,x=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+p*l,e[5]=u-x*l,e[9]=-o*c,e[2]=x-u*l,e[6]=p+f*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,p=l*h,x=l*d;e[0]=u+x*o,e[4]=p*o-f,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-p,e[6]=x+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,p=l*h,x=l*d;e[0]=u-x*o,e[4]=-a*d,e[8]=p+f*o,e[1]=f+p*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*h,f=a*d,p=o*h,x=o*d;e[0]=c*h,e[4]=p*l-f,e[8]=u*l+x,e[1]=c*d,e[5]=x*l+u,e[9]=f*l-p,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,f=a*l,p=o*c,x=o*l;e[0]=c*h,e[4]=x-u*d,e[8]=p*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*d+p,e[10]=u-x*d}else if(t.order==="XZY"){const u=a*c,f=a*l,p=o*c,x=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+x,e[5]=a*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bg,t,wg)}lookAt(t,e,n){const i=this.elements;return Cn.subVectors(t,e),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),Vi.crossVectors(n,Cn),Vi.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),Vi.crossVectors(n,Cn)),Vi.normalize(),La.crossVectors(Cn,Vi),i[0]=Vi.x,i[4]=La.x,i[8]=Cn.x,i[1]=Vi.y,i[5]=La.y,i[9]=Cn.y,i[2]=Vi.z,i[6]=La.z,i[10]=Cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],x=n[6],g=n[10],m=n[14],v=n[3],M=n[7],_=n[11],S=n[15],b=i[0],E=i[4],y=i[8],T=i[12],P=i[1],R=i[5],I=i[9],U=i[13],D=i[2],F=i[6],V=i[10],O=i[14],Y=i[3],G=i[7],K=i[11],Q=i[15];return s[0]=a*b+o*P+c*D+l*Y,s[4]=a*E+o*R+c*F+l*G,s[8]=a*y+o*I+c*V+l*K,s[12]=a*T+o*U+c*O+l*Q,s[1]=h*b+d*P+u*D+f*Y,s[5]=h*E+d*R+u*F+f*G,s[9]=h*y+d*I+u*V+f*K,s[13]=h*T+d*U+u*O+f*Q,s[2]=p*b+x*P+g*D+m*Y,s[6]=p*E+x*R+g*F+m*G,s[10]=p*y+x*I+g*V+m*K,s[14]=p*T+x*U+g*O+m*Q,s[3]=v*b+M*P+_*D+S*Y,s[7]=v*E+M*R+_*F+S*G,s[11]=v*y+M*I+_*V+S*K,s[15]=v*T+M*U+_*O+S*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],x=t[7],g=t[11],m=t[15],v=c*f-l*u,M=o*f-l*d,_=o*u-c*d,S=a*f-l*h,b=a*u-c*h,E=a*d-o*h;return e*(x*v-g*M+m*_)-n*(p*v-g*S+m*b)+i*(p*M-x*S+m*E)-s*(p*_-x*b+g*E)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-n*(s*h-o*c)+i*(s*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],x=t[13],g=t[14],m=t[15],v=e*o-n*a,M=e*c-i*a,_=e*l-s*a,S=n*c-i*o,b=n*l-s*o,E=i*l-s*c,y=h*x-d*p,T=h*g-u*p,P=h*m-f*p,R=d*g-u*x,I=d*m-f*x,U=u*m-f*g,D=v*U-M*I+_*R+S*P-b*T+E*y;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/D;return t[0]=(o*U-c*I+l*R)*F,t[1]=(i*I-n*U-s*R)*F,t[2]=(x*E-g*b+m*S)*F,t[3]=(u*b-d*E-f*S)*F,t[4]=(c*P-a*U-l*T)*F,t[5]=(e*U-i*P+s*T)*F,t[6]=(g*_-p*E-m*M)*F,t[7]=(h*E-u*_+f*M)*F,t[8]=(a*I-o*P+l*y)*F,t[9]=(n*P-e*I-s*y)*F,t[10]=(p*b-x*_+m*v)*F,t[11]=(d*_-h*b-f*v)*F,t[12]=(o*T-a*R-c*y)*F,t[13]=(e*R-n*T+i*y)*F,t[14]=(x*M-p*S-g*v)*F,t[15]=(h*S-d*M+u*v)*F,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,h=a+a,d=o+o,u=s*l,f=s*h,p=s*d,x=a*h,g=a*d,m=o*d,v=c*l,M=c*h,_=c*d,S=n.x,b=n.y,E=n.z;return i[0]=(1-(x+m))*S,i[1]=(f+_)*S,i[2]=(p-M)*S,i[3]=0,i[4]=(f-_)*b,i[5]=(1-(u+m))*b,i[6]=(g+v)*b,i[7]=0,i[8]=(p+M)*E,i[9]=(g-v)*E,i[10]=(1-(u+x))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let a=Fs.set(i[0],i[1],i[2]).length();const o=Fs.set(i[4],i[5],i[6]).length(),c=Fs.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Hn.copy(this);const l=1/a,h=1/o,d=1/c;return Hn.elements[0]*=l,Hn.elements[1]*=l,Hn.elements[2]*=l,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=d,Hn.elements[9]*=d,Hn.elements[10]*=d,e.setFromRotationMatrix(Hn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,i,s,a,o=Dn,c=!1){const l=this.elements,h=2*s/(e-t),d=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let p,x;if(c)p=s/(a-s),x=a*s/(a-s);else if(o===Dn)p=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===As)p=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=Dn,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i);let p,x;if(c)p=1/(a-s),x=a/(a-s);else if(o===Dn)p=-2/(a-s),x=-(a+s)/(a-s);else if(o===As)p=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Fs=new C,Hn=new Xt,bg=new C(0,0,0),wg=new C(1,1,1),Vi=new C,La=new C,Cn=new C,Yu=new Xt,Zu=new hn;class Vn{constructor(t=0,e=0,n=0,i=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Wt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zu.setFromEuler(this),this.setFromQuaternion(Zu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class Ea{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Tg=0;const Ju=new C,Os=new hn,gi=new Xt,Da=new C,Ar=new C,Eg=new C,Ag=new hn,$u=new C(1,0,0),Ku=new C(0,1,0),ju=new C(0,0,1),Qu={type:"added"},Cg={type:"removed"},Bs={type:"childadded",child:null},yl={type:"childremoved",child:null};class de extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=de.DEFAULT_UP.clone();const t=new C,e=new Vn,n=new hn,i=new C(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Xt},normalMatrix:{value:new $t}}),this.matrix=new Xt,this.matrixWorld=new Xt,this.matrixAutoUpdate=de.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ea,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.multiply(Os),this}rotateOnWorldAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.premultiply(Os),this}rotateX(t){return this.rotateOnAxis($u,t)}rotateY(t){return this.rotateOnAxis(Ku,t)}rotateZ(t){return this.rotateOnAxis(ju,t)}translateOnAxis(t,e){return Ju.copy(t).applyQuaternion(this.quaternion),this.position.add(Ju.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($u,t)}translateY(t){return this.translateOnAxis(Ku,t)}translateZ(t){return this.translateOnAxis(ju,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Da.copy(t):Da.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(Ar,Da,this.up):gi.lookAt(Da,Ar,this.up),this.quaternion.setFromRotationMatrix(gi),i&&(gi.extractRotation(i.matrixWorld),Os.setFromRotationMatrix(gi),this.quaternion.premultiply(Os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ut("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qu),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null):Ut("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Cg),yl.child=t,this.dispatchEvent(yl),yl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qu),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,t,Eg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,Ag,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,i=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*i,s[13]+=n-s[1]*e-s[5]*n-s[9]*i,s[14]+=i-s[2]*e-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(t.shapes,d)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}de.DEFAULT_UP=new C(0,1,0);de.DEFAULT_MATRIX_AUTO_UPDATE=!0;de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Se extends de{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Rg={type:"move"};class Lo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;l.inputState.pinching&&u>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Rg)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Tp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ki={h:0,s:0,l:0},Ua={h:0,s:0,l:0};function Ml(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=oe.workingColorSpace){if(t=jh(t,1),e=Wt(e,0,1),n=Wt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Ml(a,s,t+1/3),this.g=Ml(a,s,t),this.b=Ml(a,s,t-1/3)}return oe.colorSpaceToWorking(this,i),this}setStyle(t,e=tn){function n(s){s!==void 0&&parseFloat(s)<1&&dt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:dt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=tn){const n=Tp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pi(t.r),this.g=Pi(t.g),this.b=Pi(t.b),this}copyLinearToSRGB(t){return this.r=lr(t.r),this.g=lr(t.g),this.b=lr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=tn){return oe.workingToColorSpace(on.copy(this),t),Math.round(Wt(on.r*255,0,255))*65536+Math.round(Wt(on.g*255,0,255))*256+Math.round(Wt(on.b*255,0,255))}getHexString(t=tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(on.copy(this),e);const n=on.r,i=on.g,s=on.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(i-s)/d+(i<s?6:0);break;case i:c=(s-n)/d+2;break;case s:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=tn){oe.workingToColorSpace(on.copy(this),t);const e=on.r,n=on.g,i=on.b;return t!==tn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ki),this.setHSL(ki.h+t,ki.s+e,ki.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ki),t.getHSL(Ua);const n=ia(ki.h,Ua.h,e),i=ia(ki.s,Ua.s,e),s=ia(ki.l,Ua.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new bt;bt.NAMES=Tp;class Fc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new bt(t),this.density=e}clone(){return new Fc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Oc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new bt(t),this.near=e,this.far=n}clone(){return new Oc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bc extends de{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Wn=new C,xi=new C,Sl=new C,_i=new C,zs=new C,Vs=new C,td=new C,bl=new C,wl=new C,Tl=new C,El=new ce,Al=new ce,Cl=new ce;class xn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Wn.subVectors(t,e),i.cross(Wn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Wn.subVectors(i,e),xi.subVectors(n,e),Sl.subVectors(t,e);const a=Wn.dot(Wn),o=Wn.dot(xi),c=Wn.dot(Sl),l=xi.dot(xi),h=xi.dot(Sl),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,p=(a*h-o*c)*u;return s.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(t,e,n,i,s,a,o,c){return this.getBarycoord(t,e,n,i,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,_i.x),c.addScaledVector(a,_i.y),c.addScaledVector(o,_i.z),c)}static getInterpolatedAttribute(t,e,n,i,s,a){return El.setScalar(0),Al.setScalar(0),Cl.setScalar(0),El.fromBufferAttribute(t,e),Al.fromBufferAttribute(t,n),Cl.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(El,s.x),a.addScaledVector(Al,s.y),a.addScaledVector(Cl,s.z),a}static isFrontFacing(t,e,n,i){return Wn.subVectors(n,e),xi.subVectors(t,e),Wn.cross(xi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),Wn.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return xn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let a,o;zs.subVectors(i,n),Vs.subVectors(s,n),bl.subVectors(t,n);const c=zs.dot(bl),l=Vs.dot(bl);if(c<=0&&l<=0)return e.copy(n);wl.subVectors(t,i);const h=zs.dot(wl),d=Vs.dot(wl);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(zs,a);Tl.subVectors(t,s);const f=zs.dot(Tl),p=Vs.dot(Tl);if(p>=0&&f<=p)return e.copy(s);const x=f*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),e.copy(n).addScaledVector(Vs,o);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return td.subVectors(s,i),o=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(td,o);const m=1/(g+x+u);return a=x*m,o=u*m,e.copy(n).addScaledVector(zs,a).addScaledVector(Vs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ue{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Xn):Xn.fromBufferAttribute(s,a),Xn.applyMatrix4(t.matrixWorld),this.expandByPoint(Xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Na.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Na.copy(n.boundingBox)),Na.applyMatrix4(t.matrixWorld),this.union(Na)}const i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Xn),Xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cr),Fa.subVectors(this.max,Cr),ks.subVectors(t.a,Cr),Gs.subVectors(t.b,Cr),Hs.subVectors(t.c,Cr),Gi.subVectors(Gs,ks),Hi.subVectors(Hs,Gs),as.subVectors(ks,Hs);let e=[0,-Gi.z,Gi.y,0,-Hi.z,Hi.y,0,-as.z,as.y,Gi.z,0,-Gi.x,Hi.z,0,-Hi.x,as.z,0,-as.x,-Gi.y,Gi.x,0,-Hi.y,Hi.x,0,-as.y,as.x,0];return!Rl(e,ks,Gs,Hs,Fa)||(e=[1,0,0,0,1,0,0,0,1],!Rl(e,ks,Gs,Hs,Fa))?!1:(Oa.crossVectors(Gi,Hi),e=[Oa.x,Oa.y,Oa.z],Rl(e,ks,Gs,Hs,Fa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const vi=[new C,new C,new C,new C,new C,new C,new C,new C],Xn=new C,Na=new Ue,ks=new C,Gs=new C,Hs=new C,Gi=new C,Hi=new C,as=new C,Cr=new C,Fa=new C,Oa=new C,os=new C;function Rl(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){os.fromArray(r,s);const o=i.x*Math.abs(os.x)+i.y*Math.abs(os.y)+i.z*Math.abs(os.z),c=t.dot(os),l=e.dot(os),h=n.dot(os);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Ti=Pg();function Pg(){const r=new ArrayBuffer(4),t=new Float32Array(r),e=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function Mn(r){Math.abs(r)>65504&&dt("DataUtils.toHalfFloat(): Value out of range."),r=Wt(r,-65504,65504),Ti.floatView[0]=r;const t=Ti.uint32View[0],e=t>>23&511;return Ti.baseTable[e]+((t&8388607)>>Ti.shiftTable[e])}function Wr(r){const t=r>>10;return Ti.uint32View[0]=Ti.mantissaTable[Ti.offsetTable[t]+(r&1023)]+Ti.exponentTable[t],Ti.floatView[0]}class Ig{static toHalfFloat(t){return Mn(t)}static fromHalfFloat(t){return Wr(t)}}const ze=new C,Ba=new it;let Lg=0;class we extends Qn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Dc,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ba.fromBufferAttribute(this,e),Ba.applyMatrix3(t),this.setXY(e,Ba.x,Ba.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array),s=te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Dg extends we{constructor(t,e,n){super(new Int8Array(t),e,n)}}class Ug extends we{constructor(t,e,n){super(new Uint8Array(t),e,n)}}class Ng extends we{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}}class Fg extends we{constructor(t,e,n){super(new Int16Array(t),e,n)}}class tu extends we{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Og extends we{constructor(t,e,n){super(new Int32Array(t),e,n)}}class eu extends we{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Bg extends we{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=Wr(this.array[t*this.itemSize]);return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize]=Mn(e),this}getY(t){let e=Wr(this.array[t*this.itemSize+1]);return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+1]=Mn(e),this}getZ(t){let e=Wr(this.array[t*this.itemSize+2]);return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+2]=Mn(e),this}getW(t){let e=Wr(this.array[t*this.itemSize+3]);return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+3]=Mn(e),this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.array[t+0]=Mn(e),this.array[t+1]=Mn(n),this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array)),this.array[t+0]=Mn(e),this.array[t+1]=Mn(n),this.array[t+2]=Mn(i),this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array),s=te(s,this.array)),this.array[t+0]=Mn(e),this.array[t+1]=Mn(n),this.array[t+2]=Mn(i),this.array[t+3]=Mn(s),this}}class yt extends we{constructor(t,e,n){super(new Float32Array(t),e,n)}}const zg=new Ue,Rr=new C,Pl=new C;class ke{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):zg.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rr.subVectors(t,this.center);const e=Rr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Rr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rr.copy(t.center).add(Pl)),this.expandByPoint(Rr.copy(t.center).sub(Pl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Vg=0;const On=new Xt,Il=new de,Ws=new C,Rn=new Ue,Pr=new Ue,qe=new C;class Vt extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(J0(t)?eu:tu)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new $t().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return On.makeRotationFromQuaternion(t),this.applyMatrix4(On),this}rotateX(t){return On.makeRotationX(t),this.applyMatrix4(On),this}rotateY(t){return On.makeRotationY(t),this.applyMatrix4(On),this}rotateZ(t){return On.makeRotationZ(t),this.applyMatrix4(On),this}translate(t,e,n){return On.makeTranslation(t,e,n),this.applyMatrix4(On),this}scale(t,e,n){return On.makeScale(t,e,n),this.applyMatrix4(On),this}lookAt(t){return Il.lookAt(t),Il.updateMatrix(),this.applyMatrix4(Il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new yt(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ue);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ut("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Rn.setFromBufferAttribute(s),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ut('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ke);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ut("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Rn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];Pr.setFromBufferAttribute(o),this.morphTargetsRelative?(qe.addVectors(Rn.min,Pr.min),Rn.expandByPoint(qe),qe.addVectors(Rn.max,Pr.max),Rn.expandByPoint(qe)):(Rn.expandByPoint(Pr.min),Rn.expandByPoint(Pr.max))}Rn.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)qe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(qe));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)qe.fromBufferAttribute(o,l),c&&(Ws.fromBufferAttribute(t,l),qe.add(Ws)),i=Math.max(i,n.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ut('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ut("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new we(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new C,c[y]=new C;const l=new C,h=new C,d=new C,u=new it,f=new it,p=new it,x=new C,g=new C;function m(y,T,P){l.fromBufferAttribute(n,y),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,P),u.fromBufferAttribute(s,y),f.fromBufferAttribute(s,T),p.fromBufferAttribute(s,P),h.sub(l),d.sub(l),f.sub(u),p.sub(u);const R=1/(f.x*p.y-p.x*f.y);isFinite(R)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(R),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(R),o[y].add(x),o[T].add(x),o[P].add(x),c[y].add(g),c[T].add(g),c[P].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let y=0,T=v.length;y<T;++y){const P=v[y],R=P.start,I=P.count;for(let U=R,D=R+I;U<D;U+=3)m(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const M=new C,_=new C,S=new C,b=new C;function E(y){S.fromBufferAttribute(i,y),b.copy(S);const T=o[y];M.copy(T),M.sub(S.multiplyScalar(S.dot(T))).normalize(),_.crossVectors(b,T);const R=_.dot(c[y])<0?-1:1;a.setXYZW(y,M.x,M.y,M.z,R)}for(let y=0,T=v.length;y<T;++y){const P=v[y],R=P.start,I=P.count;for(let U=R,D=R+I;U<D;U+=3)E(t.getX(U+0)),E(t.getX(U+1)),E(t.getX(U+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new we(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new C,s=new C,a=new C,o=new C,c=new C,l=new C,h=new C,d=new C;if(t)for(let u=0,f=t.count;u<f;u+=3){const p=t.getX(u+0),x=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,x),a.fromBufferAttribute(e,g),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,p=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*h;for(let m=0;m<h;m++)u[p++]=l[f++]}return new we(u,h,d)}if(this.index===null)return dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Vt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=t(c,n);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zc{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Dc,this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const fn=new C;class Un{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)fn.fromBufferAttribute(this,e),fn.applyMatrix4(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)fn.fromBufferAttribute(this,e),fn.applyNormalMatrix(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)fn.fromBufferAttribute(this,e),fn.transformDirection(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=te(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array),s=te(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){_a("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new we(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Un(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){_a("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ll=new C,kg=new C,Gg=new $t;class ci{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ll.subVectors(n,e).cross(kg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const i=t.delta(Ll),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Gg.getNormalMatrix(t),i=this.coplanarPoint(Ll).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Hg=0;class nn extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=cr,this.side=$i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nh,this.blendDst=Fh,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new bt(0,0,0),this.blendAlpha=0,this.depthFunc=ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Io,this.stencilZFail=Io,this.stencilZPass=Io,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){dt(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new bt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new ci().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new it().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new it().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ts extends nn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new bt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Xs;const Ir=new C,qs=new C,Ys=new C,Zs=new it,Lr=new it,Ep=new Xt,za=new C,Dr=new C,Va=new C,ed=new it,Dl=new it,nd=new it;class hr extends de{constructor(t=new Ts){if(super(),this.isSprite=!0,this.type="Sprite",Xs===void 0){Xs=new Vt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new zc(e,5);Xs.setIndex([0,1,2,0,2,3]),Xs.setAttribute("position",new Un(n,3,0,!1)),Xs.setAttribute("uv",new Un(n,2,3,!1))}this.geometry=Xs,this.material=t,this.center=new it(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Ut('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qs.setFromMatrixScale(this.matrixWorld),Ep.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ys.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qs.multiplyScalar(-Ys.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;ka(za.set(-.5,-.5,0),Ys,a,qs,i,s),ka(Dr.set(.5,-.5,0),Ys,a,qs,i,s),ka(Va.set(.5,.5,0),Ys,a,qs,i,s),ed.set(0,0),Dl.set(1,0),nd.set(1,1);let o=t.ray.intersectTriangle(za,Dr,Va,!1,Ir);if(o===null&&(ka(Dr.set(-.5,.5,0),Ys,a,qs,i,s),Dl.set(0,1),o=t.ray.intersectTriangle(za,Va,Dr,!1,Ir),o===null))return;const c=t.ray.origin.distanceTo(Ir);c<t.near||c>t.far||e.push({distance:c,point:Ir.clone(),uv:xn.getInterpolation(Ir,za,Dr,Va,ed,Dl,nd,new it),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ka(r,t,e,n,i,s){Zs.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Lr.x=s*Zs.x-i*Zs.y,Lr.y=i*Zs.x+s*Zs.y):Lr.copy(Zs),r.copy(t),r.x+=Lr.x,r.y+=Lr.y,r.applyMatrix4(Ep)}const Ga=new C,id=new C;class Ap extends de{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let n=0,i=e.length;n<i;n++){const s=e[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);const i=this.levels;let s;for(s=0;s<i.length&&!(e<i[s].distance);s++);return i.splice(s,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){const e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){const i=e.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i;n++){let s=e[n].distance;if(e[n].object.visible&&(s-=s*e[n].hysteresis),t<s)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){Ga.setFromMatrixPosition(this.matrixWorld);const i=t.ray.origin.distanceTo(Ga);this.getObjectForDistance(i).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){Ga.setFromMatrixPosition(t.matrixWorld),id.setFromMatrixPosition(this.matrixWorld);const n=Ga.distanceTo(id)/t.zoom;e[0].object.visible=!0;let i,s;for(i=1,s=e.length;i<s;i++){let a=e[i].distance;if(e[i].object.visible&&(a-=a*e[i].hysteresis),n>=a)e[i-1].object.visible=!1,e[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)e[i].object.visible=!1}}toJSON(t){const e=super.toJSON(t);e.object.autoUpdate=this.autoUpdate,e.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];e.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return e}}const yi=new C,Ul=new C,Ha=new C,Wa=new C;class jn{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ul.copy(t).add(e).multiplyScalar(.5),Ha.copy(e).sub(t).normalize(),Wa.copy(this.origin).sub(Ul);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Ha),o=Wa.dot(this.direction),c=-Wa.dot(Ha),l=Wa.lengthSq(),h=Math.abs(1-a*a);let d,u,f,p;if(h>0)if(d=a*c-o,u=a*o-c,p=s*h,d>=0)if(u>=-p)if(u<=p){const x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-p?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=p?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ul).addScaledVector(Ha,u),f}intersectSphere(t,e){if(t.radius<0)return null;yi.subVectors(t.center,this.origin);const n=yi.dot(this.direction),i=yi.dot(yi)-n*n,s=t.radius*t.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(s=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,n,i,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,p=e.x-a.x,x=e.y-a.y,g=e.z-a.z,m=n.x-a.x,v=n.y-a.y,M=n.z-a.z,_=Math.abs(c),S=Math.abs(l),b=Math.abs(h);let E,y,T,P,R,I,U,D,F,V,O,Y;if(_>=S&&_>=b?(T=c,I=d,F=p,Y=m,c>=0?(E=l,y=h,P=u,R=f,U=x,D=g,V=v,O=M):(E=h,y=l,P=f,R=u,U=g,D=x,V=M,O=v)):S>=b?(T=l,I=u,F=x,Y=v,l>=0?(E=h,y=c,P=f,R=d,U=g,D=p,V=M,O=m):(E=c,y=h,P=d,R=f,U=p,D=g,V=m,O=M)):(T=h,I=f,F=g,Y=M,h>=0?(E=c,y=l,P=d,R=u,U=p,D=x,V=m,O=v):(E=l,y=c,P=u,R=d,U=x,D=p,V=v,O=m)),T===0)return null;const G=E/T,K=y/T,Q=1/T,Nt=P-G*I,Ct=R-K*I,pe=U-G*F,se=D-K*F,le=V-G*Y,$=O-K*Y,et=le*se-$*pe,_t=Nt*$-Ct*le,Ht=pe*Ct-se*Nt;if(i){if(et<0||_t<0||Ht<0)return null}else if((et<0||_t<0||Ht<0)&&(et>0||_t>0||Ht>0))return null;const wt=et+_t+Ht;if(wt===0)return null;const qt=Q*(et*I+_t*F+Ht*Y);return(wt>0?qt<0:qt>0)?null:this.at(qt/wt,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class un extends nn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const sd=new Xt,cs=new jn,Xa=new ke,rd=new C,qa=new C,Ya=new C,Za=new C,Nl=new C,Ja=new C,ad=new C,$a=new C;class jt extends de{constructor(t=new Vt,e=new un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(s&&o){Ja.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],d=s[c];h!==0&&(Nl.fromBufferAttribute(d,t),a?Ja.addScaledVector(Nl,h):Ja.addScaledVector(Nl.sub(e),h))}e.add(Ja)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(s),cs.copy(t.ray).recast(t.near),!(Xa.containsPoint(cs.origin)===!1&&(cs.intersectSphere(Xa,rd)===null||cs.origin.distanceToSquared(rd)>(t.far-t.near)**2))&&(sd.copy(s).invert(),cs.copy(t.ray).applyMatrix4(sd),!(n.boundingBox!==null&&cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,cs)))}_computeIntersections(t,e,n){let i;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){const g=u[p],m=a[g.materialIndex],v=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,S=M;_<S;_+=3){const b=o.getX(_),E=o.getX(_+1),y=o.getX(_+2);i=Ka(this,m,t,n,l,h,d,b,E,y),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){const v=o.getX(g),M=o.getX(g+1),_=o.getX(g+2);i=Ka(this,a,t,n,l,h,d,v,M,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){const g=u[p],m=a[g.materialIndex],v=Math.max(g.start,f.start),M=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,S=M;_<S;_+=3){const b=_,E=_+1,y=_+2;i=Ka(this,m,t,n,l,h,d,b,E,y),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){const v=g,M=g+1,_=g+2;i=Ka(this,a,t,n,l,h,d,v,M,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Wg(r,t,e,n,i,s,a,o){let c;if(t.side===en?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,t.side===$i,o),c===null)return null;$a.copy(o),$a.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo($a);return l<e.near||l>e.far?null:{distance:l,point:$a.clone(),object:r}}function Ka(r,t,e,n,i,s,a,o,c,l){r.getVertexPosition(o,qa),r.getVertexPosition(c,Ya),r.getVertexPosition(l,Za);const h=Wg(r,t,e,n,qa,Ya,Za,ad);if(h){const d=new C;xn.getBarycoord(ad,qa,Ya,Za,d),i&&(h.uv=xn.getInterpolatedAttribute(i,o,c,l,d,new it)),s&&(h.uv1=xn.getInterpolatedAttribute(s,o,c,l,d,new it)),a&&(h.normal=xn.getInterpolatedAttribute(a,o,c,l,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new C,materialIndex:0};xn.getNormal(qa,Ya,Za,u.normal),h.face=u,h.barycoord=d}return h}const Ur=new ce,od=new ce,cd=new ce,Xg=new ce,ld=new Xt,ja=new C,Fl=new ke,hd=new Xt,Ol=new jn;class Cp extends jt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_h,this.bindMatrix=new Xt,this.bindMatrixInverse=new Xt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ue),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ja),this.boundingBox.expandByPoint(ja)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ke),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ja),this.boundingSphere.expandByPoint(ja)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fl.copy(this.boundingSphere),Fl.applyMatrix4(i),t.ray.intersectsSphere(Fl)!==!1&&(hd.copy(i).invert(),Ol.copy(t.ray).applyMatrix4(hd),!(this.boundingBox!==null&&Ol.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Ol)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ce,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===_h?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===cp?this.bindMatrixInverse.copy(this.bindMatrix).invert():dt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;od.fromBufferAttribute(i.attributes.skinIndex,t),cd.fromBufferAttribute(i.attributes.skinWeight,t),e.isVector4?(Ur.copy(e),e.set(0,0,0,0)):(Ur.set(...e,1),e.set(0,0,0)),Ur.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=cd.getComponent(s);if(a!==0){const o=od.getComponent(s);ld.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(Xg.copy(Ur).applyMatrix4(ld),a)}}return e.isVector4&&(e.w=Ur.w),e.applyMatrix4(this.bindMatrixInverse)}}class nu extends de{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Bn extends Le{constructor(t=null,e=1,n=1,i,s,a,o,c,l=Oe,h=Oe,d,u){super(null,a,o,c,l,h,i,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ud=new Xt,qg=new Xt;class Vc{constructor(t=[],e=[]){this.uuid=Nn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){dt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Xt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Xt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=t.length;s<a;s++){const o=t[s]?t[s].matrixWorld:qg;ud.multiplyMatrices(o,e[s]),ud.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Vc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Bn(e,t,t,vn,_n);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let a=e[s];a===void 0&&(dt("Skeleton: No bone found with UUID:",s),a=new nu),this.bones.push(a),this.boneInverses.push(new Xt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const a=e[i];t.bones.push(a.uuid);const o=n[i];t.boneInverses.push(o.toArray())}return t}}class ts extends we{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Js=new Xt,dd=new Xt,Qa=[],fd=new Ue,Yg=new Xt,Nr=new jt,Fr=new ke;class Rp extends jt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ts(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Yg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ue),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Js),fd.copy(t.boundingBox).applyMatrix4(Js),this.boundingBox.union(fd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ke),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Js),Fr.copy(t.boundingSphere).applyMatrix4(Js),this.boundingSphere.union(Fr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Nr.geometry=this.geometry,Nr.material=this.material,Nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(n),t.ray.intersectsSphere(Fr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Js),dd.multiplyMatrices(n,Js),Nr.matrixWorld=dd,Nr.raycast(t,Qa);for(let a=0,o=Qa.length;a<o;a++){const c=Qa[a];c.instanceId=s,c.object=this,e.push(c)}Qa.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ts(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Bn(new Float32Array(i*this.count),i,this.count,Ac,_n));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*t;return s[c]=o,s.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ls=new ke,Zg=new it(.5,.5),to=new C;class Cs{constructor(t=new ci,e=new ci,n=new ci,i=new ci,s=new ci,a=new ci){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn,n=!1){const i=this.planes,s=t.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],d=s[5],u=s[6],f=s[7],p=s[8],x=s[9],g=s[10],m=s[11],v=s[12],M=s[13],_=s[14],S=s[15];if(i[0].setComponents(l-a,f-h,m-p,S-v).normalize(),i[1].setComponents(l+a,f+h,m+p,S+v).normalize(),i[2].setComponents(l+o,f+d,m+x,S+M).normalize(),i[3].setComponents(l-o,f-d,m-x,S-M).normalize(),n)i[4].setComponents(c,u,g,_).normalize(),i[5].setComponents(l-c,f-u,m-g,S-_).normalize();else if(i[4].setComponents(l-c,f-u,m-g,S-_).normalize(),e===Dn)i[5].setComponents(l+c,f+u,m+g,S+_).normalize();else if(e===As)i[5].setComponents(c,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(t){ls.center.set(0,0,0);const e=Zg.distanceTo(t.center);return ls.radius=.7071067811865476+e,ls.applyMatrix4(t.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(to.x=i.normal.x>0?t.max.x:t.min.x,to.y=i.normal.y>0?t.max.y:t.min.y,to.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(to)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const pd=new Xt;class kc{constructor(){this.coordinateSystem=Dn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){const s=e[i];pd.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[i]===void 0&&(n[i]=new Cs),n[i].setFromProjectionMatrix(pd,s.coordinateSystem,s.reversedDepth)}return this._count=e.length,this}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new Cs),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new kc().copy(this)}}function Bl(r,t){return r-t}function Jg(r,t){return r.z-t.z}function $g(r,t){return t.z-r.z}class Kg{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=t,o.count=e,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const yn=new Xt,jg=new bt(1,1,1),Qg=new Cs,tx=new kc,eo=new Ue,hs=new ke,Or=new C,md=new C,ex=new C,zl=new Kg,cn=new jt,no=[];function nx(r,t,e=0){const n=t.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==t.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let a=0;a<n;a++)t.setComponent(s+e,a,r.getComponent(s,a))}else t.array.set(r.array,e*n);t.needsUpdate=!0}function us(r,t){if(r.constructor!==t.constructor){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++)t[n]=r[n]}else{const e=Math.min(r.length,t.length);t.set(new r.constructor(r.buffer,0,e))}}class Pp extends jt{constructor(t,e,n=e*2,i){super(new Vt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4),n=new Bn(e,t,t,vn,_n);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Uint32Array(t*t),n=new Bn(e,t,t,Ta,zn);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Float32Array(t*t*4).fill(1),n=new Bn(e,t,t,vn,_n);n.colorSpace=oe.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){const e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in t.attributes){const a=t.getAttribute(s),{array:o,itemSize:c,normalized:l}=a,h=new o.constructor(n*c),d=new we(h,c,l);e.setAttribute(s,d)}if(t.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new we(s,1))}this._geometryInitialized=!0}}_validateGeometry(t){const e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in e.attributes){if(!t.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=t.getAttribute(n),s=e.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(t){const e=this._instanceInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${t}. Instance is either out of range or has been deleted.`)}validateGeometryId(t){const e=this._geometryInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${t}. Geometry is either out of range or has been deleted.`)}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ue);const t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const s=e[n].geometryIndex;this.getMatrixAt(n,yn),this.getBoundingBoxAt(s,eo).applyMatrix4(yn),t.union(eo)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ke);const t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const s=e[n].geometryIndex;this.getMatrixAt(n,yn),this.getBoundingSphereAt(s,hs).applyMatrix4(yn),t.union(hs)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:t};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Bl),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;yn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(jg.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=e===-1?t.getAttribute("position").count:e;const a=t.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let c;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Bl),c=this._availableGeometryIds.shift(),s[c]=i):(c=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(c,t),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,c}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),a=e.getIndex(),o=this._geometryInfo[t];if(i&&a.count>o.reservedIndexCount||e.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const c=o.vertexStart,l=o.reservedVertexCount;o.vertexCount=e.getAttribute("position").count;for(const h in n.attributes){const d=e.getAttribute(h),u=n.getAttribute(h);nx(d,u,c);const f=d.itemSize;for(let p=d.count,x=l;p<x;p++){const g=c+p;for(let m=0;m<f;m++)u.setComponent(g,m,0)}u.needsUpdate=!0,u.addUpdateRange(c*f,l*f)}if(i){const h=o.indexStart,d=o.reservedIndexCount;o.indexCount=e.getIndex().count;for(let u=0;u<a.count;u++)s.setX(h+u,c+a.getX(u));for(let u=a.count,f=d;u<f;u++)s.setX(h+u,c);s.needsUpdate=!0,s.addUpdateRange(h,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,e.boundingBox!==null&&(o.boundingBox=e.boundingBox.clone()),o.boundingSphere=null,e.boundingSphere!==null&&(o.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){const e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===t&&this.deleteInstance(i);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){return this.validateInstanceId(t),this._instanceInfo[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this}optimize(){let t=0,e=0;const n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){const c=i[a],l=n[c];if(l.active!==!1){if(s.index!==null){if(l.indexStart!==e){const{indexStart:h,vertexStart:d,reservedIndexCount:u}=l,f=s.index,p=f.array,x=t-d;for(let g=h;g<h+u;g++)p[g]=p[g]+x;f.array.copyWithin(e,h,h+u),f.addUpdateRange(e,u),f.needsUpdate=!0,l.indexStart=e}e+=l.reservedIndexCount}if(l.vertexStart!==t){const{vertexStart:h,reservedVertexCount:d}=l,u=s.attributes;for(const f in u){const p=u[f],{array:x,itemSize:g}=p;x.copyWithin(t*g,h*g,(h+d)*g),p.addUpdateRange(t*g,d*g),p.needsUpdate=!0}l.vertexStart=t}t+=l.reservedVertexCount,l.start=s.index?l.indexStart:l.vertexStart}}return this._nextIndexStart=e,this._nextVertexStart=t,this._visibilityChanged=!0,this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingBox===null){const s=new Ue,a=n.index,o=n.attributes.position;for(let c=i.start,l=i.start+i.count;c<l;c++){let h=c;a&&(h=a.getX(h)),s.expandByPoint(Or.fromBufferAttribute(o,h))}i.boundingBox=s}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingSphere===null){const s=new ke;this.getBoundingBoxAt(t,eo),eo.getCenter(s.center);const a=n.index,o=n.attributes.position;let c=0;for(let l=i.start,h=i.start+i.count;l<h;l++){let d=l;a&&(d=a.getX(d)),Or.fromBufferAttribute(o,d),c=Math.max(c,s.center.distanceToSquared(Or))}s.radius=Math.sqrt(c),i.boundingSphere=s}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){this.validateInstanceId(t);const n=this._matricesTexture,i=this._matricesTexture.image.data;return e.toArray(i,t*16),n.needsUpdate=!0,this}getMatrixAt(t,e){return this.validateInstanceId(t),e.fromArray(this._matricesTexture.image.data,t*16)}setColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null&&this._initColorsTexture(),e.toArray(this._colorsTexture.image.data,t*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null?e.isVector4?e.set(1,1,1,1):e.setRGB(1,1,1):e.fromArray(this._colorsTexture.image.data,t*4)}setVisibleAt(t,e){return this.validateInstanceId(t),this._instanceInfo[t].visible===e?this:(this._instanceInfo[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){return this.validateInstanceId(t),this._instanceInfo[t].visible}setGeometryIdAt(t,e){return this.validateInstanceId(t),this.validateGeometryId(e),this._instanceInfo[t].geometryIndex=e,this._visibilityChanged=!0,this}getGeometryIdAt(t){return this.validateInstanceId(t),this._instanceInfo[t].geometryIndex}getGeometryRangeAt(t,e={}){this.validateGeometryId(t);const n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){const e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(Bl);e[e.length-1]===n.length-1;)n.pop(),e.pop();if(t<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);const i=new Int32Array(t),s=new Int32Array(t);us(this._multiDrawCounts,i),us(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=t;const a=this._indirectTexture,o=this._matricesTexture,c=this._colorsTexture;a.dispose(),this._initIndirectTexture(),us(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),us(o.image.data,this._matricesTexture.image.data),c&&(c.dispose(),this._initColorsTexture(),us(c.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(c=>c.indexStart+c.reservedIndexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Vt,this._initializeGeometry(s));const a=this.geometry;s.index&&us(s.index.array,a.index.array);for(const o in s.attributes)us(s.attributes[o].array,a.attributes[o].array)}raycast(t,e){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;cn.material=this.material,cn.geometry.index=a.index,cn.geometry.attributes=a.attributes,cn.geometry.boundingBox===null&&(cn.geometry.boundingBox=new Ue),cn.geometry.boundingSphere===null&&(cn.geometry.boundingSphere=new ke);for(let o=0,c=n.length;o<c;o++){if(!n[o].visible||!n[o].active)continue;const l=n[o].geometryIndex,h=i[l];cn.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(o,cn.matrixWorld).premultiply(s),this.getBoundingBoxAt(l,cn.geometry.boundingBox),this.getBoundingSphereAt(l,cn.geometry.boundingSphere),cn.raycast(t,no);for(let d=0,u=no.length;d<u;d++){const f=no[d];f.object=this,f.batchId=o,e.push(f)}no.length=0}cn.material=null,cn.geometry.index=null,cn.geometry.attributes={},cn.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._availableInstanceIds=t._availableInstanceIds.slice(),this._availableGeometryIds=t._availableGeometryIds.slice(),this._nextIndexStart=t._nextIndexStart,this._nextVertexStart=t._nextVertexStart,this._geometryCount=t._geometryCount,this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._multiDrawBytesPerElement=t._multiDrawBytesPerElement,this._indirectTexture=t._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(t,e,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex();let o=a===null?1:a.array.BYTES_PER_ELEMENT,c=1;s.wireframe&&(c=2,o=i.attributes.position.count>65535?4:2);const l=this._instanceInfo,h=this._multiDrawStarts,d=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,x=p.image.data,g=n.isArrayCamera?tx:Qg;f&&(n.isArrayCamera?g.setFromArrayCamera(n):(yn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(yn,n.coordinateSystem,n.reversedDepth)));let m=0;if(this.sortObjects){yn.copy(this.matrixWorld).invert(),Or.setFromMatrixPosition(n.matrixWorld).applyMatrix4(yn),md.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(yn);for(let _=0,S=l.length;_<S;_++)if(l[_].visible&&l[_].active){const b=l[_].geometryIndex;this.getMatrixAt(_,yn),this.getBoundingSphereAt(b,hs).applyMatrix4(yn);let E=!1;if(f&&(E=!g.intersectsSphere(hs)),!E){const y=u[b],T=ex.subVectors(hs.center,Or).dot(md);zl.push(y.start,y.count,T,_)}}const v=zl.list,M=this.customSort;M===null?v.sort(s.transparent?$g:Jg):M.call(this,v,n);for(let _=0,S=v.length;_<S;_++){const b=v[_];h[m]=b.start*o*c,d[m]=b.count*c,x[m]=b.index,m++}zl.reset()}else for(let v=0,M=l.length;v<M;v++)if(l[v].visible&&l[v].active){const _=l[v].geometryIndex;let S=!1;if(f&&(this.getMatrixAt(v,yn),this.getBoundingSphereAt(_,hs).applyMatrix4(yn),S=!g.intersectsSphere(hs)),!S){const b=u[_];h[m]=b.start*o*c,d[m]=b.count*c,x[m]=v,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._multiDrawBytesPerElement=o,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,s,a){this.onBeforeRender(t,null,i,s,a)}}class sn extends nn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _c=new C,vc=new C,gd=new Xt,Br=new jn,io=new ke,Vl=new C,xd=new C;class Ui extends de{constructor(t=new Vt,e=new sn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)_c.fromBufferAttribute(e,i-1),vc.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=_c.distanceTo(vc);t.setAttribute("lineDistance",new yt(n,1))}else dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(i),io.radius+=s,t.ray.intersectsSphere(io)===!1)return;gd.copy(i).invert(),Br.copy(t.ray).applyMatrix4(gd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=f,g=p-1;x<g;x+=l){const m=h.getX(x),v=h.getX(x+1),M=so(this,t,Br,c,m,v,x);M&&e.push(M)}if(this.isLineLoop){const x=h.getX(p-1),g=h.getX(f),m=so(this,t,Br,c,x,g,p-1);m&&e.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=f,g=p-1;x<g;x+=l){const m=so(this,t,Br,c,x,x+1,x);m&&e.push(m)}if(this.isLineLoop){const x=so(this,t,Br,c,p-1,f,p-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function so(r,t,e,n,i,s,a){const o=r.geometry.attributes.position;if(_c.fromBufferAttribute(o,i),vc.fromBufferAttribute(o,s),e.distanceSqToSegment(_c,vc,Vl,xd)>n)return;Vl.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Vl);if(!(l<t.near||l>t.far))return{distance:l,point:xd.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const _d=new C,vd=new C;class ti extends Ui{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)_d.fromBufferAttribute(e,i),vd.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+_d.distanceTo(vd);t.setAttribute("lineDistance",new yt(n,1))}else dt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ip extends Ui{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class iu extends nn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yd=new Xt,Mh=new jn,ro=new ke,ao=new C;class Lp extends de{constructor(t=new Vt,e=new iu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(i),ro.radius+=s,t.ray.intersectsSphere(ro)===!1)return;yd.copy(i).invert(),Mh.copy(t.ray).applyMatrix4(yd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let p=u,x=f;p<x;p++){const g=l.getX(p);ao.fromBufferAttribute(d,g),Md(ao,g,c,i,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,x=f;p<x;p++)ao.fromBufferAttribute(d,p),Md(ao,p,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Md(r,t,e,n,i,s,a){const o=Mh.distanceSqToPoint(r);if(o<e){const c=new C;Mh.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Dp extends Le{constructor(t,e,n,i,s=Re,a=Re,o,c,l){super(t,e,n,i,s,a,o,c,l),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const h=this;function d(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=t.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in t&&(this._requestVideoFrameCallbackId=t.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class ix extends Dp{constructor(t,e,n,i,s,a,o,c){super({},t,e,n,i,s,a,o,c),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(t){this.image=t,this.needsUpdate=!0}}class sx extends Le{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=Oe,this.minFilter=Oe,this.generateMipmaps=!1,this.needsUpdate=!0}}class Gc extends Le{constructor(t,e,n,i,s,a,o,c,l,h,d,u){super(null,a,o,c,l,h,i,s,d,u),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class rx extends Gc{constructor(t,e,n,i,s,a){super(t,e,n,s,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=wn,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ax extends Gc{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,pi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}}class Aa extends Le{constructor(t=[],e=pi,n,i,s,a,o,c,l,h){super(t,e,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hc extends Le{constructor(t,e,n,i,s,a,o,c,l){super(t,e,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ox extends Le{constructor(t,e,n,i,s,a,o,c,l){super(t,e,n,i,s,a,o,c,l),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const h=t?t.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){const t=this.image?this.image.parentNode:null;t!==null&&"onpaint"in t&&(t.onpaint=null),super.dispose()}}class mr extends Le{constructor(t,e,n=zn,i,s,a,o=Oe,c=Oe,l,h=mi,d=1){if(h!==mi&&h!==Zi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ai(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Up extends mr{constructor(t,e=zn,n=pi,i,s,a=Oe,o=Oe,c,l=mi){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,s,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class su extends Le{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ve extends Vt{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,e,t,a,s,0),p("z","y","x",1,-1,n,e,-t,a,s,1),p("x","z","y",1,1,t,n,e,i,a,2),p("x","z","y",1,-1,t,n,-e,i,a,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(d,2));function p(x,g,m,v,M,_,S,b,E,y,T){const P=_/E,R=S/y,I=_/2,U=S/2,D=b/2,F=E+1,V=y+1;let O=0,Y=0;const G=new C;for(let K=0;K<V;K++){const Q=K*R-U;for(let Nt=0;Nt<F;Nt++){const Ct=Nt*P-I;G[x]=Ct*v,G[g]=Q*M,G[m]=D,l.push(G.x,G.y,G.z),G[x]=0,G[g]=0,G[m]=b>0?1:-1,h.push(G.x,G.y,G.z),d.push(Nt/E),d.push(1-K/y),O+=1}}for(let K=0;K<y;K++)for(let Q=0;Q<E;Q++){const Nt=u+Q+F*K,Ct=u+Q+F*(K+1),pe=u+(Q+1)+F*(K+1),se=u+(Q+1)+F*K;c.push(Nt,Ct,se),c.push(Ct,pe,se),Y+=6}o.addGroup(f,Y,T),f+=Y,u+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ve(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Wc extends Vt{constructor(t=1,e=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:s},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const a=[],o=[],c=[],l=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,p=n*2+s,x=i+1,g=new C,m=new C;for(let v=0;v<=p;v++){let M=0,_=0,S=0,b=0;if(v<=n){const T=v/n,P=T*Math.PI/2;_=-h-t*Math.cos(P),S=t*Math.sin(P),b=-t*Math.cos(P),M=T*d}else if(v<=n+s){const T=(v-n)/s;_=-h+T*e,S=t,b=0,M=d+T*u}else{const T=(v-n-s)/n,P=T*Math.PI/2;_=h+t*Math.sin(P),S=t*Math.cos(P),b=t*Math.sin(P),M=d+u+T*d}const E=Math.max(0,Math.min(1,M/f));let y=0;v===0?y=.5/i:v===p&&(y=-.5/i);for(let T=0;T<=i;T++){const P=T/i,R=P*Math.PI*2,I=Math.sin(R),U=Math.cos(R);m.x=-S*U,m.y=_,m.z=S*I,o.push(m.x,m.y,m.z),g.set(-S*U,b,S*I),g.normalize(),c.push(g.x,g.y,g.z),l.push(P+y,E)}if(v>0){const T=(v-1)*x;for(let P=0;P<i;P++){const R=T+P,I=T+P+1,U=v*x+P,D=v*x+P+1;a.push(R,I,U),a.push(I,D,U)}}}this.setIndex(a),this.setAttribute("position",new yt(o,3)),this.setAttribute("normal",new yt(c,3)),this.setAttribute("uv",new yt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wc(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Xc extends Vt{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],a=[],o=[],c=[],l=new C,h=new it;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new yt(a,3)),this.setAttribute("normal",new yt(o,3)),this.setAttribute("uv",new yt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Je extends Vt{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],f=[];let p=0;const x=[],g=n/2;let m=0;v(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new yt(d,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(f,2));function v(){const _=new C,S=new C;let b=0;const E=(e-t)/n;for(let y=0;y<=s;y++){const T=[],P=y/s,R=P*(e-t)+t;for(let I=0;I<=i;I++){const U=I/i,D=U*c+o,F=Math.sin(D),V=Math.cos(D);S.x=R*F,S.y=-P*n+g,S.z=R*V,d.push(S.x,S.y,S.z),_.set(F,E,V).normalize(),u.push(_.x,_.y,_.z),f.push(U,1-P),T.push(p++)}x.push(T)}for(let y=0;y<i;y++)for(let T=0;T<s;T++){const P=x[T][y],R=x[T+1][y],I=x[T+1][y+1],U=x[T][y+1];(t>0||T!==0)&&(h.push(P,R,U),b+=3),(e>0||T!==s-1)&&(h.push(R,I,U),b+=3)}l.addGroup(m,b,0),m+=b}function M(_){const S=p,b=new it,E=new C;let y=0;const T=_===!0?t:e,P=_===!0?1:-1;for(let I=1;I<=i;I++)d.push(0,g*P,0),u.push(0,P,0),f.push(.5,.5),p++;const R=p;for(let I=0;I<=i;I++){const D=I/i*c+o,F=Math.cos(D),V=Math.sin(D);E.x=T*V,E.y=g*P,E.z=T*F,d.push(E.x,E.y,E.z),u.push(0,P,0),b.x=F*.5+.5,b.y=V*.5*P+.5,f.push(b.x,b.y),p++}for(let I=0;I<i;I++){const U=S+I,D=R+I;_===!0?h.push(D,D+1,U):h.push(D+1,D,U),y+=3}l.addGroup(m,y,_===!0?1:2),m+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Sr extends Je{constructor(t=1,e=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Sr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ns extends Vt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],a=[];o(i),l(n),h(),this.setAttribute("position",new yt(s,3)),this.setAttribute("normal",new yt(s.slice(),3)),this.setAttribute("uv",new yt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new C,_=new C,S=new C;for(let b=0;b<e.length;b+=3)f(e[b+0],M),f(e[b+1],_),f(e[b+2],S),c(M,_,S,v)}function c(v,M,_,S){const b=S+1,E=[];for(let y=0;y<=b;y++){E[y]=[];const T=v.clone().lerp(_,y/b),P=M.clone().lerp(_,y/b),R=b-y;for(let I=0;I<=R;I++)I===0&&y===b?E[y][I]=T:E[y][I]=T.clone().lerp(P,I/R)}for(let y=0;y<b;y++)for(let T=0;T<2*(b-y)-1;T++){const P=Math.floor(T/2);T%2===0?(u(E[y][P+1]),u(E[y+1][P]),u(E[y][P])):(u(E[y][P+1]),u(E[y+1][P+1]),u(E[y+1][P]))}}function l(v){const M=new C;for(let _=0;_<s.length;_+=3)M.x=s[_+0],M.y=s[_+1],M.z=s[_+2],M.normalize().multiplyScalar(v),s[_+0]=M.x,s[_+1]=M.y,s[_+2]=M.z}function h(){const v=new C;for(let M=0;M<s.length;M+=3){v.x=s[M+0],v.y=s[M+1],v.z=s[M+2];const _=g(v)/2/Math.PI+.5,S=m(v)/Math.PI+.5;a.push(_,1-S)}p(),d()}function d(){for(let v=0;v<a.length;v+=6){const M=a[v+0],_=a[v+2],S=a[v+4],b=Math.max(M,_,S),E=Math.min(M,_,S);b>.9&&E<.1&&(M<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),S<.2&&(a[v+4]+=1))}}function u(v){s.push(v.x,v.y,v.z)}function f(v,M){const _=v*3;M.x=t[_+0],M.y=t[_+1],M.z=t[_+2]}function p(){const v=new C,M=new C,_=new C,S=new C,b=new it,E=new it,y=new it;for(let T=0,P=0;T<s.length;T+=9,P+=6){v.set(s[T+0],s[T+1],s[T+2]),M.set(s[T+3],s[T+4],s[T+5]),_.set(s[T+6],s[T+7],s[T+8]),b.set(a[P+0],a[P+1]),E.set(a[P+2],a[P+3]),y.set(a[P+4],a[P+5]),S.copy(v).add(M).add(_).divideScalar(3);const R=g(S);x(b,P+0,v,R),x(E,P+2,M,R),x(y,P+4,_,R)}}function x(v,M,_,S){S<0&&v.x===1&&(a[M]=v.x-1),_.x===0&&_.z===0&&(a[M]=S/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ns(t.vertices,t.indices,t.radius,t.detail)}}class qc extends ns{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new qc(t.radius,t.detail)}}const oo=new C,co=new C,kl=new C,lo=new xn;class Yc extends Vt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),s=Math.cos(ws*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);const{a:x,b:g,c:m}=lo;if(x.fromBufferAttribute(o,l[0]),g.fromBufferAttribute(o,l[1]),m.fromBufferAttribute(o,l[2]),lo.getNormal(kl),d[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){const M=(v+1)%3,_=d[v],S=d[M],b=lo[h[v]],E=lo[h[M]],y=`${_}_${S}`,T=`${S}_${_}`;T in u&&u[T]?(kl.dot(u[T].normal)<=s&&(f.push(b.x,b.y,b.z),f.push(E.x,E.y,E.z)),u[T]=null):y in u||(u[y]={index0:l[v],index1:l[M],normal:kl.clone()})}}for(const p in u)if(u[p]){const{index0:x,index1:g}=u[p];oo.fromBufferAttribute(o,x),co.fromBufferAttribute(o,g),f.push(oo.x,oo.y,oo.z),f.push(co.x,co.y,co.z)}this.setAttribute("position",new yt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class ei{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){dt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const s=n.length;let a;e?a=e:a=t*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(s-1);const h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),c=e||(a.isVector2?new it:new C);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new C,i=[],s=[],a=[],o=new C,c=new Xt;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new C)}s[0]=new C,a[0]=new C;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Wt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,p))}a[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(Wt(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let p=1;p<=t;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Zc extends ei{constructor(t=0,e=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new it){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Np extends Zc{constructor(t,e,n,i,s,a){super(t,e,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ru(){let r=0,t=0,e=0,n=0;function i(s,a,o,c){r=s,t=o,e=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,d){let u=(a-s)/l-(o-s)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+d)+(c-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(s){const a=s*s,o=a*s;return r+t*s+e*a+n*o}}}const Sd=new C,bd=new C,Gl=new ru,Hl=new ru,Wl=new ru;class Fp extends ei{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new C){const n=e,i=this.points,s=i.length,a=(s-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%s]:(bd.subVectors(i[0],i[1]).add(i[0]),l=bd);const d=i[o%s],u=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(Sd.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Sd),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),Gl.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,p,x,g),Hl.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,p,x,g),Wl.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(Gl.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Hl.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Wl.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Gl.calc(c),Hl.calc(c),Wl.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new C().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function wd(r,t,e,n,i){const s=(n-t)*.5,a=(i-e)*.5,o=r*r,c=r*o;return(2*e-2*n+s+a)*c+(-3*e+3*n-2*s-a)*o+s*r+e}function cx(r,t){const e=1-r;return e*e*t}function lx(r,t){return 2*(1-r)*r*t}function hx(r,t){return r*r*t}function sa(r,t,e,n){return cx(r,t)+lx(r,e)+hx(r,n)}function ux(r,t){const e=1-r;return e*e*e*t}function dx(r,t){const e=1-r;return 3*e*e*r*t}function fx(r,t){return 3*(1-r)*r*r*t}function px(r,t){return r*r*r*t}function ra(r,t,e,n,i){return ux(r,t)+dx(r,e)+fx(r,n)+px(r,i)}class au extends ei{constructor(t=new it,e=new it,n=new it,i=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new it){const n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ra(t,i.x,s.x,a.x,o.x),ra(t,i.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Op extends ei{constructor(t=new C,e=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new C){const n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ra(t,i.x,s.x,a.x,o.x),ra(t,i.y,s.y,a.y,o.y),ra(t,i.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ou extends ei{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bp extends ei{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cu extends ei{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(sa(t,i.x,s.x,a.x),sa(t,i.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class lu extends ei{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(sa(t,i.x,s.x,a.x),sa(t,i.y,s.y,a.y),sa(t,i.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hu extends ei{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,i=this.points,s=(i.length-1)*t,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(wd(o,c.x,l.x,h.x,d.x),wd(o,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new it().fromArray(i))}return this}}var yc=Object.freeze({__proto__:null,ArcCurve:Np,CatmullRomCurve3:Fp,CubicBezierCurve:au,CubicBezierCurve3:Op,EllipseCurve:Zc,LineCurve:ou,LineCurve3:Bp,QuadraticBezierCurve:cu,QuadraticBezierCurve3:lu,SplineCurve:hu});class zp extends ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new yc[i.type]().fromJSON(i))}return this}}class gr extends zp{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ou(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new cu(this.currentPoint.clone(),new it(t,e),new it(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,a){const o=new au(this.currentPoint.clone(),new it(t,e),new it(n,i),new it(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new hu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,i,s,a),this}absarc(t,e,n,i,s,a){return this.absellipse(t,e,n,n,i,s,a),this}ellipse(t,e,n,i,s,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,s,a,o,c),this}absellipse(t,e,n,i,s,a,o,c){const l=new Zc(t,e,n,i,s,a,o,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ni extends gr{constructor(t){super(t),this.uuid=Nn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new gr().fromJSON(i))}return this}}function mx(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=Vp(r,0,i,e,!0);const a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=yx(r,t,s,e)),r.length>80*e){o=r[0],c=r[1];let h=o,d=c;for(let u=e;u<i;u+=e){const f=r[u],p=r[u+1];f<o&&(o=f),p<c&&(c=p),f>h&&(h=f),p>d&&(d=p)}l=Math.max(h-o,d-c),l=l!==0?32767/l:0}return va(s,a,e,o,c,l,0),a}function Vp(r,t,e,n,i){let s;if(i===Ix(r,t,e,n)>0)for(let a=t;a<e;a+=n)s=Td(a/n|0,r[a],r[a+1],s);else for(let a=e-n;a>=t;a-=n)s=Td(a/n|0,r[a],r[a+1],s);return s&&xr(s,s.next)&&(Ma(s),s=s.next),s}function Rs(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(xr(e,e.next)||Ie(e.prev,e,e.next)===0)){if(Ma(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function va(r,t,e,n,i,s,a){if(!r)return;!a&&s&&Tx(r,n,i,s);let o=r;for(;r.prev!==r.next;){const c=r.prev,l=r.next;if(s?xx(r,n,i,s):gx(r)){t.push(c.i,r.i,l.i),Ma(r),r=l.next,o=l.next;continue}if(r=l,r===o){a?a===1?(r=_x(Rs(r),t),va(r,t,e,n,i,s,2)):a===2&&vx(r,t,e,n,i,s):va(Rs(r),t,e,n,i,s,1);break}}}function gx(r){const t=r.prev,e=r,n=r.next;if(Ie(t,e,n)>=0)return!1;const i=t.x,s=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=Math.min(i,s,a),d=Math.min(o,c,l),u=Math.max(i,s,a),f=Math.max(o,c,l);let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&Xr(i,o,s,c,a,l,p.x,p.y)&&Ie(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function xx(r,t,e,n){const i=r.prev,s=r,a=r.next;if(Ie(i,s,a)>=0)return!1;const o=i.x,c=s.x,l=a.x,h=i.y,d=s.y,u=a.y,f=Math.min(o,c,l),p=Math.min(h,d,u),x=Math.max(o,c,l),g=Math.max(h,d,u),m=Sh(f,p,t,e,n),v=Sh(x,g,t,e,n);let M=r.prevZ,_=r.nextZ;for(;M&&M.z>=m&&_&&_.z<=v;){if(M.x>=f&&M.x<=x&&M.y>=p&&M.y<=g&&M!==i&&M!==a&&Xr(o,h,c,d,l,u,M.x,M.y)&&Ie(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=f&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&Xr(o,h,c,d,l,u,_.x,_.y)&&Ie(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=m;){if(M.x>=f&&M.x<=x&&M.y>=p&&M.y<=g&&M!==i&&M!==a&&Xr(o,h,c,d,l,u,M.x,M.y)&&Ie(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=f&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&Xr(o,h,c,d,l,u,_.x,_.y)&&Ie(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function _x(r,t){let e=r;do{const n=e.prev,i=e.next.next;!xr(n,i)&&Gp(n,e,e.next,i)&&ya(n,i)&&ya(i,n)&&(t.push(n.i,e.i,i.i),Ma(e),Ma(e.next),e=r=i),e=e.next}while(e!==r);return Rs(e)}function vx(r,t,e,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Cx(a,o)){let c=Hp(a,o);a=Rs(a,a.next),c=Rs(c,c.next),va(a,t,e,n,i,s,0),va(c,t,e,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function yx(r,t,e,n){const i=[];for(let s=0,a=t.length;s<a;s++){const o=t[s]*n,c=s<a-1?t[s+1]*n:r.length,l=Vp(r,o,c,n,!1);l===l.next&&(l.steiner=!0),i.push(Ax(l))}i.sort(Mx);for(let s=0;s<i.length;s++)e=Sx(i[s],e);return e}function Mx(r,t){let e=r.x-t.x;if(e===0&&(e=r.y-t.y,e===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Sx(r,t){const e=bx(r,t);if(!e)return t;const n=Hp(e,r);return Rs(n,n.next),Rs(e,e.next)}function bx(r,t){let e=t;const n=r.x,i=r.y;let s=-1/0,a;if(xr(r,e))return e;do{if(xr(r,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>s&&(s=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,c=a.x,l=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=c&&n!==e.x&&kp(i<l?n:s,i,c,l,i<l?s:n,i,e.x,e.y)){const d=Math.abs(i-e.y)/(n-e.x);ya(e,r)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&wx(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function wx(r,t){return Ie(r.prev,r,t.prev)<0&&Ie(t.next,r,r.next)<0}function Tx(r,t,e,n){let i=r;do i.z===0&&(i.z=Sh(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Ex(i)}function Ex(r){let t,e=1;do{let n=r,i;r=null;let s=null;for(t=0;n;){t++;let a=n,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,c--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,e*=2}while(t>1);return r}function Sh(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function Ax(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function kp(r,t,e,n,i,s,a,o){return(i-a)*(t-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(s-o)>=(i-a)*(n-o)}function Xr(r,t,e,n,i,s,a,o){return!(r===a&&t===o)&&kp(r,t,e,n,i,s,a,o)}function Cx(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!Rx(r,t)&&(ya(r,t)&&ya(t,r)&&Px(r,t)&&(Ie(r.prev,r,t.prev)||Ie(r,t.prev,t))||xr(r,t)&&Ie(r.prev,r,r.next)>0&&Ie(t.prev,t,t.next)>0)}function Ie(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function xr(r,t){return r.x===t.x&&r.y===t.y}function Gp(r,t,e,n){const i=uo(Ie(r,t,e)),s=uo(Ie(r,t,n)),a=uo(Ie(e,n,r)),o=uo(Ie(e,n,t));return!!(i!==s&&a!==o||i===0&&ho(r,e,t)||s===0&&ho(r,n,t)||a===0&&ho(e,r,n)||o===0&&ho(e,t,n))}function ho(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function uo(r){return r>0?1:r<0?-1:0}function Rx(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Gp(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function ya(r,t){return Ie(r.prev,r,r.next)<0?Ie(r,t,r.next)>=0&&Ie(r,r.prev,t)>=0:Ie(r,t,r.prev)<0||Ie(r,r.next,t)<0}function Px(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Hp(r,t){const e=bh(r.i,r.x,r.y),n=bh(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Td(r,t,e,n){const i=bh(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ma(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function bh(r,t,e){return{i:r,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ix(r,t,e,n){let i=0;for(let s=t,a=e-n;s<e;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class Lx{static triangulate(t,e,n=2){return mx(t,e,n)}}class Jn{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return Jn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];Ed(t),Ad(n,t);let a=t.length;e.forEach(Ed);for(let c=0;c<e.length;c++)i.push(a),a+=e[c].length,Ad(n,e[c]);const o=Lx.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}}function Ed(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Ad(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class br extends Vt{constructor(t=new Ni([new it(.5,.5),new it(-.5,.5),new it(-.5,-.5),new it(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let o=0,c=t.length;o<c;o++){const l=t[o];a(l)}this.setAttribute("position",new yt(i,3)),this.setAttribute("uv",new yt(s,2)),this.computeVertexNormals();function a(o){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Dx;let M,_=!1,S,b,E,y;if(m){M=m.getSpacedPoints(h),_=!0,u=!1;const nt=m.isCatmullRomCurve3?m.closed:!1;S=m.computeFrenetFrames(h,nt),b=new C,E=new C,y=new C}u||(g=0,f=0,p=0,x=0);const T=o.extractPoints(l);let P=T.shape;const R=T.holes;if(!Jn.isClockWise(P)){P=P.reverse();for(let nt=0,rt=R.length;nt<rt;nt++){const at=R[nt];Jn.isClockWise(at)&&(R[nt]=at.reverse())}}function U(nt){const at=10000000000000001e-36;let ot=nt[0];for(let ht=1;ht<=nt.length;ht++){const kt=ht%nt.length,zt=nt[kt],Yt=zt.x-ot.x,Kt=zt.y-ot.y,N=Yt*Yt+Kt*Kt,ge=Math.max(Math.abs(zt.x),Math.abs(zt.y),Math.abs(ot.x),Math.abs(ot.y)),re=at*ge*ge;if(N<=re){nt.splice(kt,1),ht--;continue}ot=zt}}U(P),R.forEach(U);const D=R.length,F=P;for(let nt=0;nt<D;nt++){const rt=R[nt];P=P.concat(rt)}function V(nt,rt,at){return rt||Ut("ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(rt,at)}const O=P.length;function Y(nt,rt,at){let ot,ht,kt;const zt=nt.x-rt.x,Yt=nt.y-rt.y,Kt=at.x-nt.x,N=at.y-nt.y,ge=zt*zt+Yt*Yt,re=zt*N-Yt*Kt;if(Math.abs(re)>Number.EPSILON){const L=Math.sqrt(ge),w=Math.sqrt(Kt*Kt+N*N),k=rt.x-Yt/L,X=rt.y+zt/L,Z=at.x-N/w,ct=at.y+Kt/w,lt=((Z-k)*N-(ct-X)*Kt)/(zt*N-Yt*Kt);ot=k+zt*lt-nt.x,ht=X+Yt*lt-nt.y;const J=ot*ot+ht*ht;if(J<=2)return new it(ot,ht);kt=Math.sqrt(J/2)}else{let L=!1;zt>Number.EPSILON?Kt>Number.EPSILON&&(L=!0):zt<-Number.EPSILON?Kt<-Number.EPSILON&&(L=!0):Math.sign(Yt)===Math.sign(N)&&(L=!0),L?(ot=-Yt,ht=zt,kt=Math.sqrt(ge)):(ot=zt,ht=Yt,kt=Math.sqrt(ge/2))}return new it(ot/kt,ht/kt)}const G=[];for(let nt=0,rt=F.length,at=rt-1,ot=nt+1;nt<rt;nt++,at++,ot++)at===rt&&(at=0),ot===rt&&(ot=0),G[nt]=Y(F[nt],F[at],F[ot]);const K=[];let Q,Nt=G.concat();for(let nt=0,rt=D;nt<rt;nt++){const at=R[nt];Q=[];for(let ot=0,ht=at.length,kt=ht-1,zt=ot+1;ot<ht;ot++,kt++,zt++)kt===ht&&(kt=0),zt===ht&&(zt=0),Q[ot]=Y(at[ot],at[kt],at[zt]);K.push(Q),Nt=Nt.concat(Q)}let Ct;if(g===0)Ct=Jn.triangulateShape(F,R);else{const nt=[],rt=[];for(let at=0;at<g;at++){const ot=at/g,ht=f*Math.cos(ot*Math.PI/2),kt=p*Math.sin(ot*Math.PI/2)+x;for(let zt=0,Yt=F.length;zt<Yt;zt++){const Kt=V(F[zt],G[zt],kt);_t(Kt.x,Kt.y,-ht),ot===0&&nt.push(Kt)}for(let zt=0,Yt=D;zt<Yt;zt++){const Kt=R[zt];Q=K[zt];const N=[];for(let ge=0,re=Kt.length;ge<re;ge++){const L=V(Kt[ge],Q[ge],kt);_t(L.x,L.y,-ht),ot===0&&N.push(L)}ot===0&&rt.push(N)}}Ct=Jn.triangulateShape(nt,rt)}const pe=Ct.length,se=p+x;for(let nt=0;nt<O;nt++){const rt=u?V(P[nt],Nt[nt],se):P[nt];_?(E.copy(S.normals[0]).multiplyScalar(rt.x),b.copy(S.binormals[0]).multiplyScalar(rt.y),y.copy(M[0]).add(E).add(b),_t(y.x,y.y,y.z)):_t(rt.x,rt.y,0)}for(let nt=1;nt<=h;nt++)for(let rt=0;rt<O;rt++){const at=u?V(P[rt],Nt[rt],se):P[rt];_?(E.copy(S.normals[nt]).multiplyScalar(at.x),b.copy(S.binormals[nt]).multiplyScalar(at.y),y.copy(M[nt]).add(E).add(b),_t(y.x,y.y,y.z)):_t(at.x,at.y,d/h*nt)}for(let nt=g-1;nt>=0;nt--){const rt=nt/g,at=f*Math.cos(rt*Math.PI/2),ot=p*Math.sin(rt*Math.PI/2)+x;for(let ht=0,kt=F.length;ht<kt;ht++){const zt=V(F[ht],G[ht],ot);_t(zt.x,zt.y,d+at)}for(let ht=0,kt=R.length;ht<kt;ht++){const zt=R[ht];Q=K[ht];for(let Yt=0,Kt=zt.length;Yt<Kt;Yt++){const N=V(zt[Yt],Q[Yt],ot);_?_t(N.x,N.y+M[h-1].y,M[h-1].x+at):_t(N.x,N.y,d+at)}}}le(),$();function le(){const nt=i.length/3;if(u){let rt=0,at=O*rt;for(let ot=0;ot<pe;ot++){const ht=Ct[ot];Ht(ht[2]+at,ht[1]+at,ht[0]+at)}rt=h+g*2,at=O*rt;for(let ot=0;ot<pe;ot++){const ht=Ct[ot];Ht(ht[0]+at,ht[1]+at,ht[2]+at)}}else{for(let rt=0;rt<pe;rt++){const at=Ct[rt];Ht(at[2],at[1],at[0])}for(let rt=0;rt<pe;rt++){const at=Ct[rt];Ht(at[0]+O*h,at[1]+O*h,at[2]+O*h)}}n.addGroup(nt,i.length/3-nt,0)}function $(){const nt=i.length/3;let rt=0;et(F,rt),rt+=F.length;for(let at=0,ot=R.length;at<ot;at++){const ht=R[at];et(ht,rt),rt+=ht.length}n.addGroup(nt,i.length/3-nt,1)}function et(nt,rt){let at=nt.length;for(;--at>=0;){const ot=at;let ht=at-1;ht<0&&(ht=nt.length-1);for(let kt=0,zt=h+g*2;kt<zt;kt++){const Yt=O*kt,Kt=O*(kt+1),N=rt+ot+Yt,ge=rt+ht+Yt,re=rt+ht+Kt,L=rt+ot+Kt;wt(N,ge,re,L)}}}function _t(nt,rt,at){c.push(nt),c.push(rt),c.push(at)}function Ht(nt,rt,at){qt(nt),qt(rt),qt(at);const ot=i.length/3,ht=v.generateTopUV(n,i,ot-3,ot-2,ot-1);Me(ht[0]),Me(ht[1]),Me(ht[2])}function wt(nt,rt,at,ot){qt(nt),qt(rt),qt(ot),qt(rt),qt(at),qt(ot);const ht=i.length/3,kt=v.generateSideWallUV(n,i,ht-6,ht-3,ht-2,ht-1);Me(kt[0]),Me(kt[1]),Me(kt[3]),Me(kt[1]),Me(kt[2]),Me(kt[3])}function qt(nt){i.push(c[nt*3+0]),i.push(c[nt*3+1]),i.push(c[nt*3+2])}function Me(nt){s.push(nt.x),s.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ux(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,a=t.shapes.length;s<a;s++){const o=e[t.shapes[s]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new yc[i.type]().fromJSON(i)),new br(n,t.options)}}const Dx={generateTopUV:function(r,t,e,n,i){const s=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new it(s,a),new it(o,c),new it(l,h)]},generateSideWallUV:function(r,t,e,n,i,s){const a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],p=t[i*3+2],x=t[s*3],g=t[s*3+1],m=t[s*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new it(a,1-c),new it(l,1-d),new it(u,1-p),new it(x,1-m)]:[new it(o,1-c),new it(h,1-d),new it(f,1-p),new it(g,1-m)]}};function Ux(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Jc extends ns{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Jc(t.radius,t.detail)}}class $c extends Vt{constructor(t=[new it(0,-.5),new it(.5,0),new it(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Wt(i,0,Math.PI*2);const s=[],a=[],o=[],c=[],l=[],h=1/e,d=new C,u=new it,f=new C,p=new C,x=new C;let g=0,m=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(p)}for(let v=0;v<=e;v++){const M=n+v*h*i,_=Math.sin(M),S=Math.cos(M);for(let b=0;b<=t.length-1;b++){d.x=t[b].x*_,d.y=t[b].y,d.z=t[b].x*S,a.push(d.x,d.y,d.z),u.x=v/e,u.y=b/(t.length-1),o.push(u.x,u.y);const E=c[3*b+0]*_,y=c[3*b+1],T=c[3*b+0]*S;l.push(E,y,T)}}for(let v=0;v<e;v++)for(let M=0;M<t.length-1;M++){const _=M+v*t.length,S=_,b=_+t.length,E=_+t.length+1,y=_+1;s.push(S,b,y),s.push(E,y,b)}this.setIndex(s),this.setAttribute("position",new yt(a,3)),this.setAttribute("uv",new yt(o,2)),this.setAttribute("normal",new yt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $c(t.points,t.segments,t.phiStart,t.phiLength)}}class Ca extends ns{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ca(t.radius,t.detail)}}class is extends Vt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,d=t/o,u=e/c,f=[],p=[],x=[],g=[];for(let m=0;m<h;m++){const v=m*u-a;for(let M=0;M<l;M++){const _=M*d-s;p.push(_,-v,0),x.push(0,0,1),g.push(M/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<o;v++){const M=v+l*m,_=v+l*(m+1),S=v+1+l*(m+1),b=v+1+l*m;f.push(M,_,b),f.push(_,S,b)}this.setIndex(f),this.setAttribute("position",new yt(p,3)),this.setAttribute("normal",new yt(x,3)),this.setAttribute("uv",new yt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new is(t.width,t.height,t.widthSegments,t.heightSegments)}}class Kc extends Vt{constructor(t=.5,e=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],h=[];let d=t;const u=(e-t)/i,f=new C,p=new it;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){const m=s+g/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}d+=u}for(let x=0;x<i;x++){const g=x*(n+1);for(let m=0;m<n;m++){const v=m+g,M=v,_=v+n+1,S=v+n+2,b=v+1;o.push(M,_,b),o.push(_,S,b)}}this.setIndex(o),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(l,3)),this.setAttribute("uv",new yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class wr extends Vt{constructor(t=new Ni([new it(0,.5),new it(-.5,-.5),new it(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],s=[],a=[];let o=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new yt(i,3)),this.setAttribute("normal",new yt(s,3)),this.setAttribute("uv",new yt(a,2));function l(h){const d=i.length/3,u=h.extractPoints(e);let f=u.shape;const p=u.holes;Jn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];Jn.isClockWise(v)===!0&&(p[g]=v.reverse())}const x=Jn.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];f=f.concat(v)}for(let g=0,m=f.length;g<m;g++){const v=f[g];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let g=0,m=x.length;g<m;g++){const v=x[g],M=v[0]+d,_=v[1]+d,S=v[2]+d;n.push(M,_,S),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Nx(e,t)}static fromJSON(t,e){const n=[];for(let i=0,s=t.shapes.length;i<s;i++){const a=e[t.shapes[i]];n.push(a)}return new wr(n,t.curveSegments)}}function Nx(r,t){if(t.shapes=[],Array.isArray(r))for(let e=0,n=r.length;e<n;e++){const i=r[e];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t}class In extends Vt{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new C,u=new C,f=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){const v=[],M=m/n,_=a+M*o,S=t*Math.cos(_),b=Math.sqrt(t*t-S*S);let E=0;m===0&&a===0?E=.5/e:m===n&&c===Math.PI&&(E=-.5/e);for(let y=0;y<=e;y++){const T=y/e,P=i+T*s;d.x=-b*Math.cos(P),d.y=S,d.z=b*Math.sin(P),p.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),g.push(T+E,1-M),v.push(l++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){const M=h[m][v+1],_=h[m][v],S=h[m+1][v],b=h[m+1][v+1];(m!==0||a>0)&&f.push(M,_,b),(m!==n-1||c<Math.PI)&&f.push(_,S,b)}this.setIndex(f),this.setAttribute("position",new yt(p,3)),this.setAttribute("normal",new yt(x,3)),this.setAttribute("uv",new yt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class jc extends ns{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new jc(t.radius,t.detail)}}class Qc extends Vt{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const c=[],l=[],h=[],d=[],u=new C,f=new C,p=new C;for(let x=0;x<=n;x++){const g=a+x/n*o;for(let m=0;m<=i;m++){const v=m/i*s;f.x=(t+e*Math.cos(g))*Math.cos(v),f.y=(t+e*Math.cos(g))*Math.sin(v),f.z=e*Math.sin(g),l.push(f.x,f.y,f.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(m/i),d.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=i;g++){const m=(i+1)*x+g-1,v=(i+1)*(x-1)+g-1,M=(i+1)*(x-1)+g,_=(i+1)*x+g;c.push(m,v,_),c.push(v,M,_)}this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class tl extends Vt{constructor(t=1,e=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);const o=[],c=[],l=[],h=[],d=new C,u=new C,f=new C,p=new C,x=new C,g=new C,m=new C;for(let M=0;M<=n;++M){const _=M/n*s*Math.PI*2;v(_,s,a,t,f),v(_+.01,s,a,t,p),g.subVectors(p,f),m.addVectors(p,f),x.crossVectors(g,m),m.crossVectors(x,g),x.normalize(),m.normalize();for(let S=0;S<=i;++S){const b=S/i*Math.PI*2,E=-e*Math.cos(b),y=e*Math.sin(b);d.x=f.x+(E*m.x+y*x.x),d.y=f.y+(E*m.y+y*x.y),d.z=f.z+(E*m.z+y*x.z),c.push(d.x,d.y,d.z),u.subVectors(d,f).normalize(),l.push(u.x,u.y,u.z),h.push(M/n),h.push(S/i)}}for(let M=1;M<=n;M++)for(let _=1;_<=i;_++){const S=(i+1)*(M-1)+(_-1),b=(i+1)*M+(_-1),E=(i+1)*M+_,y=(i+1)*(M-1)+_;o.push(S,b,y),o.push(b,E,y)}this.setIndex(o),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(l,3)),this.setAttribute("uv",new yt(h,2));function v(M,_,S,b,E){const y=Math.cos(M),T=Math.sin(M),P=S/_*M,R=Math.cos(P);E.x=b*(2+R)*.5*y,E.y=b*(2+R)*T*.5,E.z=b*Math.sin(P)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tl(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class el extends Vt{constructor(t=new lu(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const a=t.computeFrenetFrames(e,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new C,c=new C,l=new it;let h=new C;const d=[],u=[],f=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new yt(d,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(f,2));function x(){for(let M=0;M<e;M++)g(M);g(s===!1?e:0),v(),m()}function g(M){h=t.getPointAt(M/e,h);const _=a.normals[M],S=a.binormals[M];for(let b=0;b<=i;b++){const E=b/i*Math.PI*2,y=Math.sin(E),T=-Math.cos(E);c.x=T*_.x+y*S.x,c.y=T*_.y+y*S.y,c.z=T*_.z+y*S.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,d.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=e;M++)for(let _=1;_<=i;_++){const S=(i+1)*(M-1)+(_-1),b=(i+1)*M+(_-1),E=(i+1)*M+_,y=(i+1)*(M-1)+_;p.push(S,b,y),p.push(b,E,y)}}function v(){for(let M=0;M<=e;M++)for(let _=0;_<=i;_++)l.x=M/e,l.y=_/i,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new el(new yc[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class uu extends Vt{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,i=new C,s=new C;if(t.index!==null){const a=t.attributes.position,o=t.index;let c=t.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){const d=c[l],u=d.start,f=d.count;for(let p=u,x=u+f;p<x;p+=3)for(let g=0;g<3;g++){const m=o.getX(p+g),v=o.getX(p+(g+1)%3);i.fromBufferAttribute(a,m),s.fromBufferAttribute(a,v),Cd(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}}else{const a=t.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){const h=3*o+l,d=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,d),Cd(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new yt(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Cd(r,t,e){const n=`${r.x},${r.y},${r.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${r.x},${r.y},${r.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}var Rd=Object.freeze({__proto__:null,BoxGeometry:Ve,CapsuleGeometry:Wc,CircleGeometry:Xc,ConeGeometry:Sr,CylinderGeometry:Je,DodecahedronGeometry:qc,EdgesGeometry:Yc,ExtrudeGeometry:br,IcosahedronGeometry:Jc,LatheGeometry:$c,OctahedronGeometry:Ca,PlaneGeometry:is,PolyhedronGeometry:ns,RingGeometry:Kc,ShapeGeometry:wr,SphereGeometry:In,TetrahedronGeometry:jc,TorusGeometry:Qc,TorusKnotGeometry:tl,TubeGeometry:el,WireframeGeometry:uu});class Wp extends nn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new bt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}function _r(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];if(Pd(i))i.isRenderTargetTexture?(dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Pd(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();t[e][n]=s}else t[e][n]=i.slice();else t[e][n]=i}}return t}function pn(r){const t={};for(let e=0;e<r.length;e++){const n=_r(r[e]);for(const i in n)t[i]=n[i]}return t}function Pd(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Fx(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Xp(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const nl={clone:_r,merge:pn};var Ox=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class En extends nn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ox,this.fragmentShader=Bx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_r(t.uniforms),this.uniformsGroups=Fx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new bt().setHex(i.value);break;case"v2":this.uniforms[n].value=new it().fromArray(i.value);break;case"v3":this.uniforms[n].value=new C().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ce().fromArray(i.value);break;case"m3":this.uniforms[n].value=new $t().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Xt().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class du extends En{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class fu extends nn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class qp extends fu{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Wt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new bt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new bt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new bt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Yp extends nn{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new bt(16777215),this.specular=new bt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=wa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Zp extends nn{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new bt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Jp extends nn{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class $p extends nn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=wa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class pu extends nn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class mu extends nn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Kp extends nn{constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new bt(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this.fog=t.fog,this}}class jp extends sn{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}function Yn(r,t){return!r||r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function aa(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}function Qp(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function wh(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=e[s]*t;for(let c=0;c!==t;++c)i[a++]=r[o+c]}return i}function tm(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(t.push(s.time),e.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(t.push(s.time),a.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(t.push(s.time),e.push(a)),s=r[i++];while(s!==void 0)}function zx(r,t,e,n,i=30){const s=r.clone();s.name=t;const a=[];for(let c=0;c<s.tracks.length;++c){const l=s.tracks[c],h=l.getValueSize(),d=[],u=[];for(let f=0;f<l.times.length;++f){const p=l.times[f]*i;if(!(p<e||p>=n)){d.push(l.times[f]);for(let x=0;x<h;++x)u.push(l.values[f*h+x])}}d.length!==0&&(l.times=Yn(d,l.times.constructor),l.values=Yn(u,l.values.constructor),a.push(l))}s.tracks=a;let o=1/0;for(let c=0;c<s.tracks.length;++c)o>s.tracks[c].times[0]&&(o=s.tracks[c].times[0]);for(let c=0;c<s.tracks.length;++c)s.tracks[c].shift(-1*o);return s.resetDuration(),s}function Vx(r,t=0,e=r,n=30){n<=0&&(n=30);const i=e.tracks.length,s=t/n;for(let a=0;a<i;++a){const o=e.tracks[a],c=o.ValueTypeName;if(c==="bool"||c==="string")continue;const l=r.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===c});if(l===void 0)continue;let h=0;const d=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=d/3);let u=0;const f=l.getValueSize();l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=f/3);const p=o.times.length-1;let x;if(s<=o.times[0]){const m=h,v=d-h;x=o.values.slice(m,v)}else if(s>=o.times[p]){const m=p*d+h,v=m+d-h;x=o.values.slice(m,v)}else{const m=o.createInterpolant(),v=h,M=d-h;m.evaluate(s),x=m.resultBuffer.slice(v,M)}c==="quaternion"&&new hn().fromArray(x).normalize().conjugate().toArray(x);const g=l.times.length;for(let m=0;m<g;++m){const v=m*f+u;if(c==="quaternion")hn.multiplyQuaternionsFlat(l.values,v,x,0,l.values,v);else{const M=f-u*2;for(let _=0;_<M;++_)l.values[v+_]-=x[_]}}}return r.blendMode=Kh,r}class kx{static convertArray(t,e){return Yn(t,e)}static isTypedArray(t){return Mp(t)}static hasTangents(t){return aa(t)}static getKeyframeOrder(t){return Qp(t)}static sortedArray(t,e,n){return wh(t,e,n)}static flattenJSON(t,e,n,i){tm(t,e,n,i)}static subclip(t,e,n,i,s=30){return zx(t,e,n,i,s)}static makeClipAdditive(t,e=0,n=t,i=30){return Vx(t,e,n,i)}}class Tr{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=s)){const o=e[1];t<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=e[--n-1],t>=s)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class em extends Tr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ss,endingEnd:Ss}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,a=t+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case bs:s=t,o=2*e-n;break;case pa:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case bs:a=t,c=2*n-e;break;case pa:a=1,c=n+i[1]-i[0];break;default:a=t-1,c=e}const l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),x=p*p,g=x*p,m=-u*g+2*u*x-u*p,v=(1+u)*g+(-1.5-2*u)*x+(-.5+u)*p+1,M=(-1-f)*g+(1.5+f)*x+.5*p,_=f*g-f*x;for(let S=0;S!==o;++S)s[S]=m*a[h+S]+v*a[l+S]+M*a[c+S]+_*a[d+S];return s}}class gu extends Tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==o;++u)s[u]=a[l+u]*d+a[c+u]*h;return s}}class nm extends Tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class im extends Tr{interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this.inTangents,d=this.outTangents;if(!h||!d){const p=(n-e)/(i-e),x=1-p;for(let g=0;g!==o;++g)s[g]=a[l+g]*x+a[c+g]*p;return s}const u=o*2,f=t-1;for(let p=0;p!==o;++p){const x=a[l+p],g=a[c+p],m=f*u+p*2,v=d[m],M=d[m+1],_=t*u+p*2,S=h[_],b=h[_+1],E=Hx(n,e,v,S,i);s[p]=sm(E,x,M,b,g)}return s}}function sm(r,t,e,n,i){const s=1-r;return s*s*s*t+3*s*s*r*e+3*s*r*r*n+r*r*r*i}function Gx(r,t,e,n,i){const s=1-r;return 3*s*s*(e-t)+6*s*r*(n-e)+3*r*r*(i-n)}function Hx(r,t,e,n,i){let s=(r-t)/(i-t);for(let a=0;a<8;a++){const o=sm(s,t,e,n,i)-r;if(Math.abs(o)<1e-10)break;const c=Gx(s,t,e,n,i);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}class kn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Yn(e,this.TimeBufferType),this.values=Yn(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Yn(t.times,Array),values:Yn(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),aa(t.settings)&&(n.settings={inTangents:Yn(t.settings.inTangents,Array),outTangents:Yn(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new nm(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new gu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new em(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){const e=new im(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case fa:e=this.InterpolantFactoryMethodDiscrete;break;case xc:e=this.InterpolantFactoryMethodLinear;break;case Po:e=this.InterpolantFactoryMethodSmooth;break;case vh:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return dt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fa;case this.InterpolantFactoryMethodLinear:return xc;case this.InterpolantFactoryMethodSmooth:return Po;case this.InterpolantFactoryMethodBezier:return vh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;aa(this.settings)&&(Id(this.settings.inTangents,t),Id(this.settings.outTangents,t))}return this}trim(t,e){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(Ut("KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Ut("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){Ut("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Ut("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(i!==void 0&&Mp(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){Ut("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Po,s=t.length-1;let a=1;for(let o=1;o<s;++o){let c=!1;const l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(i)c=!0;else{const d=o*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){const x=e[d+p];if(x!==e[u+p]||x!==e[f+p]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];const d=o*n,u=a*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,aa(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}}function Id(r,t){for(let e=0,n=r.length;e!==n;e+=2)r[e]*=t}kn.prototype.ValueTypeName="";kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=xc;class Is extends kn{constructor(t,e,n){super(t,e,n)}}Is.prototype.ValueTypeName="bool";Is.prototype.ValueBufferType=Array;Is.prototype.DefaultInterpolation=fa;Is.prototype.InterpolantFactoryMethodLinear=void 0;Is.prototype.InterpolantFactoryMethodSmooth=void 0;class xu extends kn{constructor(t,e,n,i){super(t,e,n,i)}}xu.prototype.ValueTypeName="color";class il extends kn{constructor(t,e,n,i){super(t,e,n,i)}}il.prototype.ValueTypeName="number";class rm extends Tr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(i-e);let l=t*o;for(let h=l+o;l!==h;l+=4)hn.slerpFlat(s,0,a,l-o,a,l,c);return s}}class sl extends kn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new rm(this.times,this.values,this.getValueSize(),t)}}sl.prototype.ValueTypeName="quaternion";sl.prototype.InterpolantFactoryMethodSmooth=void 0;class Ls extends kn{constructor(t,e,n){super(t,e,n)}}Ls.prototype.ValueTypeName="string";Ls.prototype.ValueBufferType=Array;Ls.prototype.DefaultInterpolation=fa;Ls.prototype.InterpolantFactoryMethodLinear=void 0;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;class _u extends kn{constructor(t,e,n,i){super(t,e,n,i)}}_u.prototype.ValueTypeName="vector";class Sa{constructor(t="",e=-1,n=[],i=Pc){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Nn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(Xx(n[a]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s.userData=JSON.parse(t.userData||"{}"),s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let s=0,a=n.length;s!==a;++s)e.push(kn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);const h=Qp(c);c=wh(c,1,h),l=wh(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new il(".morphTargetInfluences["+e[o].name+"]",c,l).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=t.length;o<c;o++){const l=t[o],h=l.name.match(s);if(h&&h.length>1){const d=h[1];let u=i[d];u||(i[d]=u=[]),u.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function Wx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return il;case"vector":case"vector2":case"vector3":case"vector4":return _u;case"color":return xu;case"quaternion":return sl;case"bool":case"boolean":return Is;case"string":return Ls}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Xx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Wx(r.type);if(r.times===void 0){const n=[],i=[];tm(r.keys,n,i,"value"),r.times=n,r.values=i}let e;return t.parse!==void 0?e=t.parse(r):e=new t(r.name,r.times,r.values,r.interpolation),aa(r.settings)&&(e.settings={inTangents:Yn(r.settings.inTangents,Float32Array),outTangents:Yn(r.settings.outTangents,Float32Array)}),e}const ui={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(Ld(r)||(this.files[r]=t))},get:function(r){if(this.enabled!==!1&&!Ld(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function Ld(r){try{const t=r.slice(r.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class vu{constructor(t,e,n){const i=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],p=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const am=new vu;class An{constructor(t){this.manager=t!==void 0?t:am,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}An.DEFAULT_MATERIAL_NAME="__DEFAULT";const Mi={};class qx extends Error{constructor(t,e){super(t),this.response=e}}class Fi extends An{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=ui.get(`file:${t}`);if(s!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0);return}if(Mi[t]!==void 0){Mi[t].push({onLoad:e,onProgress:n,onError:i});return}Mi[t]=[],Mi[t].push({onLoad:e,onProgress:n,onError:i});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&dt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Mi[t],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0;let x=0;const g=new ReadableStream({start(m){v();function v(){d.read().then(({done:M,value:_})=>{if(M)m.close();else{x+=_.byteLength;const S=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:f});for(let b=0,E=h.length;b<E;b++){const y=h[b];y.onProgress&&y.onProgress(S)}m.enqueue(_),v()}},M=>{m.error(M)})}}});return new Response(g)}else throw new qx(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(p=>f.decode(p))}}}).then(l=>{ui.add(`file:${t}`,l);const h=Mi[t];delete Mi[t];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Mi[t];if(h===void 0)throw this.manager.itemError(t),l;delete Mi[t];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Yx extends An{constructor(t){super(t)}load(t,e,n,i){const s=this,a=new Fi(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){try{e(s.parse(JSON.parse(o)))}catch(c){i?i(c):Ut(c),s.manager.itemError(t)}},n,i)}parse(t){const e=[];for(let n=0;n<t.length;n++){const i=Sa.parse(t[n]);e.push(i)}return e}}class Zx extends An{constructor(t){super(t)}load(t,e,n,i){const s=this,a=[],o=new Gc,c=new Fi(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(s.withCredentials);let l=0;function h(d){c.load(t[d],function(u){const f=s.parse(u,!0);a[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},l+=1,l===6&&(f.mipmapCount===1&&(o.minFilter=Re),o.image=a,o.format=f.format,o.needsUpdate=!0,e&&e(o))},n,i)}if(Array.isArray(t))for(let d=0,u=t.length;d<u;++d)h(d);else c.load(t,function(d){const u=s.parse(d,!0);if(u.isCubemap){const f=u.mipmaps.length/u.mipmapCount;for(let p=0;p<f;p++){a[p]={mipmaps:[]};for(let x=0;x<u.mipmapCount;x++)a[p].mipmaps.push(u.mipmaps[p*u.mipmapCount+x]),a[p].format=u.format,a[p].width=u.width,a[p].height=u.height}o.image=a}else o.image.width=u.width,o.image.height=u.height,o.mipmaps=u.mipmaps;u.mipmapCount===1&&(o.minFilter=Re),o.format=u.format,o.needsUpdate=!0,e&&e(o)},n,i);return o}}const $s=new WeakMap;class ba extends An{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=ui.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0);else{let d=$s.get(a);d===void 0&&(d=[],$s.set(a,d)),d.push({onLoad:e,onError:i})}return a}const o=xa("img");function c(){h(),e&&e(this);const d=$s.get(this)||[];for(let u=0;u<d.length;u++){const f=d[u];f.onLoad&&f.onLoad(this)}$s.delete(this),s.manager.itemEnd(t)}function l(d){h(),i&&i(d),ui.remove(`image:${t}`);const u=$s.get(this)||[];for(let f=0;f<u.length;f++){const p=u[f];p.onError&&p.onError(d)}$s.delete(this),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ui.add(`image:${t}`,o),s.manager.itemStart(t),o.src=t,o}}class Jx extends An{constructor(t){super(t)}load(t,e,n,i){const s=new Aa;s.colorSpace=tn;const a=new ba(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function c(l){a.load(t[l],function(h){s.images[l]=h,o++,o===6&&(s.needsUpdate=!0,e&&e(s))},void 0,i)}for(let l=0;l<t.length;++l)c(l);return s}}class $x extends An{constructor(t){super(t)}load(t,e,n,i){const s=this,a=new Bn,o=new Fi(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(t,function(c){let l;try{l=s.parse(c)}catch(h){i!==void 0?i(h):Ut(h);return}s._applyTexData(a,l),e&&e(a,l)},n,i),a}createDataTexture(t){const e=new Bn;return this._applyTexData(e,this.parse(t)),e}_applyTexData(t,e){e.image!==void 0?t.image=e.image:e.data!==void 0&&(t.image.width=e.width,t.image.height=e.height,t.image.data=e.data),t.wrapS=e.wrapS!==void 0?e.wrapS:wn,t.wrapT=e.wrapT!==void 0?e.wrapT:wn,t.magFilter=e.magFilter!==void 0?e.magFilter:Re,t.minFilter=e.minFilter!==void 0?e.minFilter:Re,t.anisotropy=e.anisotropy!==void 0?e.anisotropy:1,e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.mipmaps!==void 0&&(t.mipmaps=e.mipmaps,t.minFilter=hi),e.mipmapCount===1&&(t.minFilter=Re),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),t.needsUpdate=!0}}class Kx extends An{constructor(t){super(t)}load(t,e,n,i){const s=new Le,a=new ba(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class ss extends de{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new bt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class om extends ss{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.groundColor=new bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Xl=new Xt,Dd=new C,Ud=new C;class rl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new Xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cs,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Dd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dd),Ud.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ud),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Xl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Xl,t.coordinateSystem,t.reversedDepth);const s=this._frameExtents,a=i?i.z/s.x:1,o=i?i.w/s.y:1,c=i?i.x/s.x:0,l=i?i.y/s.y:0;t.coordinateSystem===As||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(Xl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const fo=new C,po=new hn,si=new C;class al extends de{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xt,this.projectionMatrix=new Xt,this.projectionMatrixInverse=new Xt,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(fo,po,si),si.x===1&&si.y===1&&si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fo,po,si.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(fo,po,si),si.x===1&&si.y===1&&si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fo,po,si.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new C,Nd=new it,Fd=new it;class Ge extends al{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=pr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return pr*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z)}getViewSize(t,e){return this.getViewBounds(t,Nd,Fd),e.subVectors(Fd,Nd)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ws*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class jx extends rl{constructor(){super(new Ge(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=pr*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class cm extends ss{constructor(t,e,n=0,i=Math.PI/3,s=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new jx}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class Qx extends rl{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0}}class lm extends ss{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Qx}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Ra extends al{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class t_ extends rl{constructor(){super(new Ra(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hm extends ss{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.shadow=new t_}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class um extends ss{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class dm extends ss{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}class yu{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new C)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){const n=t.x,i=t.y,s=t.z,a=this.coefficients;return e.copy(a[0]).multiplyScalar(.282095),e.addScaledVector(a[1],.488603*i),e.addScaledVector(a[2],.488603*s),e.addScaledVector(a[3],.488603*n),e.addScaledVector(a[4],1.092548*(n*i)),e.addScaledVector(a[5],1.092548*(i*s)),e.addScaledVector(a[6],.315392*(3*s*s-1)),e.addScaledVector(a[7],1.092548*(n*s)),e.addScaledVector(a[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){const n=t.x,i=t.y,s=t.z,a=this.coefficients;return e.copy(a[0]).multiplyScalar(.886227),e.addScaledVector(a[1],2*.511664*i),e.addScaledVector(a[2],2*.511664*s),e.addScaledVector(a[3],2*.511664*n),e.addScaledVector(a[4],2*.429043*n*i),e.addScaledVector(a[5],2*.429043*i*s),e.addScaledVector(a[6],.743125*s*s-.247708),e.addScaledVector(a[7],2*.429043*n*s),e.addScaledVector(a[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){const n=t.x,i=t.y,s=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*s,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*s,e[6]=.315392*(3*s*s-1),e[7]=1.092548*n*s,e[8]=.546274*(n*n-i*i)}}class fm extends ss{constructor(t=new yu,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}toJSON(t){const e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}const Od={};class ol extends An{constructor(t){super(t),this.textures={}}load(t,e,n,i){const s=this,a=new Fi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(t,function(o){try{e(s.parse(JSON.parse(o)))}catch(c){i?i(c):Ut(c),s.manager.itemError(t)}},n,i)}parse(t){const e=this.createMaterialFromType(t.type);return e.fromJSON(t,this.textures),e}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return ol.createMaterialFromType(t)}static createMaterialFromType(t){const n={ShadowMaterial:Wp,SpriteMaterial:Ts,RawShaderMaterial:du,ShaderMaterial:En,PointsMaterial:iu,MeshPhysicalMaterial:qp,MeshStandardMaterial:fu,MeshPhongMaterial:Yp,MeshToonMaterial:Zp,MeshNormalMaterial:Jp,MeshLambertMaterial:$p,MeshDepthMaterial:pu,MeshDistanceMaterial:mu,MeshBasicMaterial:un,MeshMatcapMaterial:Kp,LineDashedMaterial:jp,LineBasicMaterial:sn,Material:nn,...Od}[t];let i;return n===void 0?(Ri(`MaterialLoader: Unknown material type "${t}". Use .registerMaterial() before starting the deserialization process.`),i=new nn):i=new n,i}static registerMaterial(t,e){Od[t]=e}}class Th{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Mu extends Vt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class pm extends An{constructor(t){super(t)}load(t,e,n,i){const s=this,a=new Fi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(t,function(o){try{e(s.parse(JSON.parse(o)))}catch(c){i?i(c):Ut(c),s.manager.itemError(t)}},n,i)}parse(t){const e={},n={};function i(f,p){if(e[p]!==void 0)return e[p];const g=f.interleavedBuffers[p],m=s(f,g.buffer),v=rr(g.type,m),M=new zc(v,g.stride);return M.uuid=g.uuid,g.usage!==void 0&&M.setUsage(g.usage),e[p]=M,M}function s(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const a=t.isInstancedBufferGeometry?new Mu:new Vt,o=t.data.index;if(o!==void 0){const f=rr(o.type,o.array);a.setIndex(new we(f,1))}const c=t.data.attributes;for(const f in c){const p=c[f];let x;if(p.isInterleavedBufferAttribute){const g=i(t.data,p.data);x=new Un(g,p.itemSize,p.offset,p.normalized)}else{const g=rr(p.type,p.array),m=p.isInstancedBufferAttribute?ts:we;x=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(x.name=p.name),p.usage!==void 0&&x.setUsage(p.usage),p.gpuType!==void 0&&(x.gpuType=p.gpuType),a.setAttribute(f,x)}const l=t.data.morphAttributes;if(l)for(const f in l){const p=l[f],x=[];for(let g=0,m=p.length;g<m;g++){const v=p[g];let M;if(v.isInterleavedBufferAttribute){const _=i(t.data,v.data);M=new Un(_,v.itemSize,v.offset,v.normalized)}else{const _=rr(v.type,v.array);M=new we(_,v.itemSize,v.normalized)}v.name!==void 0&&(M.name=v.name),v.usage!==void 0&&M.setUsage(v.usage),v.gpuType!==void 0&&(M.gpuType=v.gpuType),x.push(M)}a.morphAttributes[f]=x}t.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const d=t.data.groups||t.data.drawcalls||t.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){const x=d[f];a.addGroup(x.start,x.count,x.materialIndex)}const u=t.data.boundingSphere;return u!==void 0&&(a.boundingSphere=new ke().fromJSON(u)),t.name&&(a.name=t.name),t.userData&&(a.userData=t.userData),a}}const ql={};class e_ extends An{constructor(t){super(t)}load(t,e,n,i){const s=this,a=this.path===""?Th.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||a;const o=new Fi(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(c){let l=null;try{l=JSON.parse(c)}catch(d){i!==void 0&&i(d),Ut("ObjectLoader: Can't parse "+t+".",d.message);return}const h=l.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+t)),Ut("ObjectLoader: Can't load "+t);return}s.parse(l,e)},n,i)}async loadAsync(t,e){const n=this,i=this.path===""?Th.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;const s=new Fi(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const a=await s.loadAsync(t,e);let o;try{o=JSON.parse(a)}catch(l){throw new Error("THREE.ObjectLoader: Can't parse "+t+". "+l.message)}const c=o.metadata;if(c===void 0||c.type===void 0||c.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(o)}parse(t,e){const n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),s=this.parseGeometries(t.geometries,i),a=this.parseImages(t.images,function(){e!==void 0&&e(l)}),o=this.parseTextures(t.textures,a),c=this.parseMaterials(t.materials,o),l=this.parseObject(t.object,s,c,o,n),h=this.parseSkeletons(t.skeletons,l);if(this.bindSkeletons(l,h),this.bindLightTargets(l),e!==void 0){let d=!1;for(const u in a)if(a[u].data instanceof HTMLImageElement){d=!0;break}d===!1&&e(l)}return l}async parseAsync(t){const e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),s=await this.parseImagesAsync(t.images),a=this.parseTextures(t.textures,s),o=this.parseMaterials(t.materials,a),c=this.parseObject(t.object,i,o,a,e),l=this.parseSkeletons(t.skeletons,c);return this.bindSkeletons(c,l),this.bindLightTargets(c),c}static registerGeometry(t,e){ql[t]=e}parseShapes(t){const e={};if(t!==void 0)for(let n=0,i=t.length;n<i;n++){const s=new Ni().fromJSON(t[n]);e[s.uuid]=s}return e}parseSkeletons(t,e){const n={},i={};if(e.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),t!==void 0)for(let s=0,a=t.length;s<a;s++){const o=new Vc().fromJSON(t[s],i);n[o.uuid]=o}return n}parseGeometries(t,e){const n={};if(t!==void 0){const i=new pm;for(let s=0,a=t.length;s<a;s++){let o;const c=t[s];switch(c.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(c);break;default:c.type in Rd?o=Rd[c.type].fromJSON(c,e):c.type in ql?o=ql[c.type].fromJSON(c,e):dt(`ObjectLoader: Unknown geometry type "${c.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=c.uuid,c.name!==void 0&&(o.name=c.name),c.userData!==void 0&&(o.userData=c.userData),n[c.uuid]=o}}return n}parseMaterials(t,e){const n={},i={};if(t!==void 0){const s=new ol;s.setTextures(e);for(let a=0,o=t.length;a<o;a++){const c=t[a];n[c.uuid]===void 0&&(n[c.uuid]=s.parse(c)),i[c.uuid]=n[c.uuid]}}return i}parseAnimations(t){const e={};if(t!==void 0)for(let n=0;n<t.length;n++){const i=t[n],s=Sa.parse(i);e[s.uuid]=s}return e}parseImages(t,e){const n=this,i={};let s;function a(c){return c=n.manager.resolveURL(c),n.manager.itemStart(c),s.load(c,function(){n.manager.itemEnd(c)},void 0,function(){n.manager.itemError(c),n.manager.itemEnd(c)})}function o(c){if(typeof c=="string"){const l=c,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(l)?l:n.resourcePath+l;return a(h)}else return c.data?{data:rr(c.type,c.data),width:c.width,height:c.height}:null}if(t!==void 0&&t.length>0){const c=new vu(e);s=new ba(c),s.setCrossOrigin(this.crossOrigin);for(let l=0,h=t.length;l<h;l++){const d=t[l],u=d.url;if(Array.isArray(u)){const f=[];for(let p=0,x=u.length;p<x;p++){const g=u[p],m=o(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new Bn(m.data,m.width,m.height)))}i[d.uuid]=new Ai(f)}else{const f=o(d.url);i[d.uuid]=new Ai(f)}}}return i}async parseImagesAsync(t){const e=this,n={};let i;async function s(a){if(typeof a=="string"){const o=a,c=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:e.resourcePath+o;return await i.loadAsync(c)}else return a.data?{data:rr(a.type,a.data),width:a.width,height:a.height}:null}if(t!==void 0&&t.length>0){i=new ba(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=t.length;a<o;a++){const c=t[a],l=c.url;if(Array.isArray(l)){const h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d],p=await s(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new Bn(p.data,p.width,p.height)))}n[c.uuid]=new Ai(h)}else{const h=await s(c.url);n[c.uuid]=new Ai(h)}}}return n}parseTextures(t,e){function n(s,a){return typeof s=="number"?s:(dt("ObjectLoader.parseTexture: Constant should be in numeric form.",s),a[s])}const i={};if(t!==void 0)for(let s=0,a=t.length;s<a;s++){const o=t[s];o.image===void 0&&dt('ObjectLoader: No "image" specified for',o.uuid),e[o.image]===void 0&&dt("ObjectLoader: Undefined image",o.image);const c=e[o.image],l=c.data;let h;Array.isArray(l)?(h=new Aa,l.length===6&&(h.needsUpdate=!0)):(l&&l.data?h=new Bn:h=new Le,l&&(h.needsUpdate=!0)),h.source=c,h.uuid=o.uuid,o.name!==void 0&&(h.name=o.name),o.mapping!==void 0&&(h.mapping=n(o.mapping,n_)),o.channel!==void 0&&(h.channel=o.channel),o.offset!==void 0&&h.offset.fromArray(o.offset),o.repeat!==void 0&&h.repeat.fromArray(o.repeat),o.center!==void 0&&h.center.fromArray(o.center),o.rotation!==void 0&&(h.rotation=o.rotation),o.wrap!==void 0&&(h.wrapS=n(o.wrap[0],Bd),h.wrapT=n(o.wrap[1],Bd)),o.format!==void 0&&(h.format=o.format),o.internalFormat!==void 0&&(h.internalFormat=o.internalFormat),o.type!==void 0&&(h.type=o.type),o.colorSpace!==void 0&&(h.colorSpace=o.colorSpace),o.minFilter!==void 0&&(h.minFilter=n(o.minFilter,zd)),o.magFilter!==void 0&&(h.magFilter=n(o.magFilter,zd)),o.anisotropy!==void 0&&(h.anisotropy=o.anisotropy),o.flipY!==void 0&&(h.flipY=o.flipY),o.generateMipmaps!==void 0&&(h.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(h.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(h.compareFunction=o.compareFunction),o.normalized!==void 0&&(h.normalized=o.normalized),o.userData!==void 0&&(h.userData=o.userData),i[o.uuid]=h}return i}parseObject(t,e,n,i,s){let a;function o(u){return e[u]===void 0&&dt("ObjectLoader: Undefined geometry",u),e[u]}function c(u){if(u!==void 0){if(Array.isArray(u)){const f=[];for(let p=0,x=u.length;p<x;p++){const g=u[p];n[g]===void 0&&dt("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[u]===void 0&&dt("ObjectLoader: Undefined material",u),n[u]}}function l(u){return i[u]===void 0&&dt("ObjectLoader: Undefined texture",u),i[u]}let h,d;switch(t.type){case"Scene":a=new Bc,t.background!==void 0&&(Number.isInteger(t.background)?a.background=new bt(t.background):a.background=l(t.background)),t.environment!==void 0&&(a.environment=l(t.environment)),t.fog!==void 0&&(t.fog.type==="Fog"?a.fog=new Oc(t.fog.color,t.fog.near,t.fog.far):t.fog.type==="FogExp2"&&(a.fog=new Fc(t.fog.color,t.fog.density)),t.fog.name!==""&&(a.fog.name=t.fog.name)),t.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=t.backgroundBlurriness),t.backgroundIntensity!==void 0&&(a.backgroundIntensity=t.backgroundIntensity),t.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(t.backgroundRotation),t.environmentIntensity!==void 0&&(a.environmentIntensity=t.environmentIntensity),t.environmentRotation!==void 0&&a.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":a=new Ge(t.fov,t.aspect,t.near,t.far),t.focus!==void 0&&(a.focus=t.focus),t.zoom!==void 0&&(a.zoom=t.zoom),t.filmGauge!==void 0&&(a.filmGauge=t.filmGauge),t.filmOffset!==void 0&&(a.filmOffset=t.filmOffset),t.view!==void 0&&(a.view=Object.assign({},t.view));break;case"OrthographicCamera":a=new Ra(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0&&(a.zoom=t.zoom),t.view!==void 0&&(a.view=Object.assign({},t.view));break;case"AmbientLight":a=new um(t.color,t.intensity);break;case"DirectionalLight":a=new hm(t.color,t.intensity),a.target=t.target||"";break;case"PointLight":a=new lm(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":a=new dm(t.color,t.intensity,t.width,t.height);break;case"SpotLight":a=new cm(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),a.target=t.target||"";break;case"HemisphereLight":a=new om(t.color,t.groundColor,t.intensity);break;case"LightProbe":const u=new yu().fromArray(t.sh);a=new fm(u,t.intensity);break;case"SkinnedMesh":h=o(t.geometry),d=c(t.material),a=new Cp(h,d),t.bindMode!==void 0&&(a.bindMode=t.bindMode),t.bindMatrix!==void 0&&a.bindMatrix.fromArray(t.bindMatrix),t.skeleton!==void 0&&(a.skeleton=t.skeleton);break;case"Mesh":h=o(t.geometry),d=c(t.material),a=new jt(h,d);break;case"InstancedMesh":h=o(t.geometry),d=c(t.material);const f=t.count,p=t.instanceMatrix,x=t.instanceColor;a=new Rp(h,d,f),a.instanceMatrix=new ts(new Float32Array(p.array),16),x!==void 0&&(a.instanceColor=new ts(new Float32Array(x.array),x.itemSize));break;case"BatchedMesh":h=o(t.geometry),d=c(t.material),a=new Pp(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,d),a.geometry=h,a.perObjectFrustumCulled=t.perObjectFrustumCulled,a.sortObjects=t.sortObjects,a._drawRanges=t.drawRanges,a._reservedRanges=t.reservedRanges,a._geometryInfo=t.geometryInfo.map(g=>{let m=null,v=null;return g.boundingBox!==void 0&&(m=new Ue().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(v=new ke().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:v}}),a._instanceInfo=t.instanceInfo,a._availableInstanceIds=t._availableInstanceIds,a._availableGeometryIds=t._availableGeometryIds,a._nextIndexStart=t.nextIndexStart,a._nextVertexStart=t.nextVertexStart,a._geometryCount=t.geometryCount,a._maxInstanceCount=t.maxInstanceCount,a._maxVertexCount=t.maxVertexCount,a._maxIndexCount=t.maxIndexCount,a._geometryInitialized=t.geometryInitialized,a._matricesTexture=l(t.matricesTexture.uuid),a._indirectTexture=l(t.indirectTexture.uuid),t.colorsTexture!==void 0&&(a._colorsTexture=l(t.colorsTexture.uuid)),t.boundingSphere!==void 0&&(a.boundingSphere=new ke().fromJSON(t.boundingSphere)),t.boundingBox!==void 0&&(a.boundingBox=new Ue().fromJSON(t.boundingBox));break;case"LOD":a=new Ap;break;case"Line":a=new Ui(o(t.geometry),c(t.material));break;case"LineLoop":a=new Ip(o(t.geometry),c(t.material));break;case"LineSegments":a=new ti(o(t.geometry),c(t.material));break;case"PointCloud":case"Points":a=new Lp(o(t.geometry),c(t.material));break;case"Sprite":a=new hr(c(t.material));break;case"Group":a=new Se;break;case"Bone":a=new nu;break;default:a=new de}if(a.uuid=t.uuid,t.name!==void 0&&(a.name=t.name),t.matrix!==void 0?(a.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=t.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(t.position!==void 0&&a.position.fromArray(t.position),t.rotation!==void 0&&a.rotation.fromArray(t.rotation),t.quaternion!==void 0&&a.quaternion.fromArray(t.quaternion),t.scale!==void 0&&a.scale.fromArray(t.scale)),t.up!==void 0&&a.up.fromArray(t.up),t.pivot!==void 0&&(a.pivot=new C().fromArray(t.pivot)),t.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),t.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=t.morphTargetInfluences.slice()),t.castShadow!==void 0&&(a.castShadow=t.castShadow),t.receiveShadow!==void 0&&(a.receiveShadow=t.receiveShadow),t.shadow&&(t.shadow.intensity!==void 0&&(a.shadow.intensity=t.shadow.intensity),t.shadow.bias!==void 0&&(a.shadow.bias=t.shadow.bias),t.shadow.normalBias!==void 0&&(a.shadow.normalBias=t.shadow.normalBias),t.shadow.radius!==void 0&&(a.shadow.radius=t.shadow.radius),t.shadow.blurSamples!==void 0&&(a.shadow.blurSamples=t.shadow.blurSamples),t.shadow.focus!==void 0&&(a.shadow.focus=t.shadow.focus),t.shadow.aspect!==void 0&&(a.shadow.aspect=t.shadow.aspect),t.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(t.shadow.mapSize),t.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(t.shadow.camera))),t.visible!==void 0&&(a.visible=t.visible),t.frustumCulled!==void 0&&(a.frustumCulled=t.frustumCulled),t.renderOrder!==void 0&&(a.renderOrder=t.renderOrder),t.static!==void 0&&(a.static=t.static),t.userData!==void 0&&(a.userData=t.userData),t.layers!==void 0&&(a.layers.mask=t.layers),t.children!==void 0){const u=t.children;for(let f=0;f<u.length;f++)a.add(this.parseObject(u[f],e,n,i,s))}if(t.animations!==void 0){const u=t.animations;for(let f=0;f<u.length;f++){const p=u[f];a.animations.push(s[p])}}if(t.type==="LOD"){t.autoUpdate!==void 0&&(a.autoUpdate=t.autoUpdate);const u=t.levels;for(let f=0;f<u.length;f++){const p=u[f],x=a.getObjectByProperty("uuid",p.object);x!==void 0&&a.addLevel(x,p.distance,p.hysteresis)}}return a}bindSkeletons(t,e){Object.keys(e).length!==0&&t.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=e[n.skeleton];i===void 0?dt("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){const n=e.target,i=t.getObjectByProperty("uuid",n);i!==void 0?e.target=i:e.target=new de}})}}const n_={UVMapping:bc,CubeReflectionMapping:pi,CubeRefractionMapping:Ki,EquirectangularReflectionMapping:$r,EquirectangularRefractionMapping:Kr,CubeUVReflectionMapping:Mr},Bd={RepeatWrapping:la,ClampToEdgeWrapping:wn,MirroredRepeatWrapping:ha},zd={NearestFilter:Oe,NearestMipmapNearestFilter:Wh,NearestMipmapLinearFilter:sr,LinearFilter:Re,LinearMipmapNearestFilter:jr,LinearMipmapLinearFilter:hi},Yl=new WeakMap;class i_ extends An{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&dt("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&dt("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=ui.get(`image-bitmap:${t}`);if(a!==void 0){if(s.manager.itemStart(t),a.then){a.then(l=>{Yl.has(a)===!0?(i&&i(Yl.get(a)),s.manager.itemError(t),s.manager.itemEnd(t)):(e&&e(l),s.manager.itemEnd(t))});return}setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(t,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(l){return ui.add(`image-bitmap:${t}`,l),e&&e(l),s.manager.itemEnd(t),l}).catch(function(l){i&&i(l),Yl.set(c,l),ui.remove(`image-bitmap:${t}`),s.manager.itemError(t),s.manager.itemEnd(t)});ui.add(`image-bitmap:${t}`,c),s.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let mo,Su=class{static getContext(){return mo===void 0&&(mo=new(window.AudioContext||window.webkitAudioContext)),mo}static setContext(t){mo=t}};class s_ extends An{constructor(t){super(t)}load(t,e,n,i){const s=this,a=new Fi(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(c){try{const l=c.slice(0),h=Su.getContext(),d=t+"#decode";s.manager.itemStart(d),h.decodeAudioData(l,function(u){e(u),s.manager.itemEnd(d)}).catch(function(u){o(u),s.manager.itemEnd(d)})}catch(l){o(l)}},n,i);function o(c){i?i(c):Ut(c),s.manager.itemError(t)}}}const Vd=new Xt,kd=new Xt,ds=new Xt;class r_{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Ge,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Ge,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){const e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,ds.copy(t.projectionMatrix);const i=e.eyeSep/2,s=i*e.near/e.focus,a=e.near*Math.tan(ws*e.fov*.5)/e.zoom;let o,c;kd.elements[12]=-i,Vd.elements[12]=i,o=-a*e.aspect+s,c=a*e.aspect+s,ds.elements[0]=2*e.near/(c-o),ds.elements[8]=(c+o)/(c-o),this.cameraL.projectionMatrix.copy(ds),o=-a*e.aspect-s,c=a*e.aspect-s,ds.elements[0]=2*e.near/(c-o),ds.elements[8]=(c+o)/(c-o),this.cameraR.projectionMatrix.copy(ds)}this.cameraL.matrix.copy(t.matrixWorld).multiply(kd),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(t.matrixWorld).multiply(Vd),this.cameraR.matrixWorldNeedsUpdate=!0}}const Ks=-90,js=1;class mm extends de{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ge(Ks,js,t,e);i.layers=this.layers,this.add(i);const s=new Ge(Ks,js,t,e);s.layers=this.layers,this.add(s);const a=new Ge(Ks,js,t,e);a.layers=this.layers,this.add(a);const o=new Ge(Ks,js,t,e);o.layers=this.layers,this.add(o);const c=new Ge(Ks,js,t,e);c.layers=this.layers,this.add(c);const l=new Ge(Ks,js,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,c]=e;for(const l of e)this.remove(l);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===As)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(n,1,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class gm extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class bu{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=a_.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function a_(){this._document.hidden===!1&&this.reset()}const fs=new C,Zl=new hn,o_=new C,ps=new C,ms=new C;class c_ extends de{constructor(){super(),this.type="AudioListener",this.context=Su.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new bu}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t),this._timer.update();const e=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(fs,Zl,o_),ps.set(0,0,-1).applyQuaternion(Zl),ms.set(0,1,0).applyQuaternion(Zl),e.positionX){const n=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(fs.x,n),e.positionY.linearRampToValueAtTime(fs.y,n),e.positionZ.linearRampToValueAtTime(fs.z,n),e.forwardX.linearRampToValueAtTime(ps.x,n),e.forwardY.linearRampToValueAtTime(ps.y,n),e.forwardZ.linearRampToValueAtTime(ps.z,n),e.upX.linearRampToValueAtTime(ms.x,n),e.upY.linearRampToValueAtTime(ms.y,n),e.upZ.linearRampToValueAtTime(ms.z,n)}else e.setPosition(fs.x,fs.y,fs.z),e.setOrientation(ps.x,ps.y,ps.z,ms.x,ms.y,ms.z)}}class xm extends de{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){dt("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){dt("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){dt("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){dt("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){dt("Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(dt("Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){dt("Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}copy(t,e){return super.copy(t,e),t.sourceType!=="buffer"?(dt("Audio: Audio source type cannot be copied."),this):(this.autoplay=t.autoplay,this.buffer=t.buffer,this.detune=t.detune,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.offset=t.offset,this.duration=t.duration,this.playbackRate=t.playbackRate,this.hasPlaybackControl=t.hasPlaybackControl,this.sourceType=t.sourceType,this.filters=t.filters.slice(),this)}clone(t){return new this.constructor(this.listener).copy(this,t)}}const gs=new C,Gd=new hn,l_=new C,xs=new C;class h_ extends xm{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(gs,Gd,l_),xs.set(0,0,1).applyQuaternion(Gd);const e=this.panner;if(e.positionX){const n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(gs.x,n),e.positionY.linearRampToValueAtTime(gs.y,n),e.positionZ.linearRampToValueAtTime(gs.z,n),e.orientationX.linearRampToValueAtTime(xs.x,n),e.orientationY.linearRampToValueAtTime(xs.y,n),e.orientationZ.linearRampToValueAtTime(xs.z,n)}else e.setPosition(gs.x,gs.y,gs.z),e.setOrientation(xs.x,xs.y,xs.z)}}class u_{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0;const e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}}class _m{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,a;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=e*this._origIndex;this._mixBufferRegion(n,i,c,1-s,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let c=e,l=e+e;c!==l;++c)if(n[c]!==n[c+e]){o.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,a=i;s!==a;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)t[e+a]=t[n+a]}_slerp(t,e,n,i){hn.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const a=this._workIndex*s;hn.multiplyQuaternionsFlat(t,a,t,e,t,n),hn.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const c=e+o;t[c]=t[c]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,s){for(let a=0;a!==s;++a){const o=e+a;t[o]=t[o]+t[n+a]*i}}}const wu="\\[\\]\\.:\\/",d_=new RegExp("["+wu+"]","g"),Tu="[^"+wu+"]",f_="[^"+wu.replace("\\.","")+"]",p_=/((?:WC+[\/:])*)/.source.replace("WC",Tu),m_=/(WCOD+)?/.source.replace("WCOD",f_),g_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Tu),x_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Tu),__=new RegExp("^"+p_+m_+g_+x_+"$"),v_=["material","materials","bones","map"];class y_{constructor(t,e,n){const i=n||ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ue{constructor(t,e,n){this.path=e,this.parsedPath=n||ue.parseTrackName(e),this.node=ue.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ue.Composite(t,e,n):new ue(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(d_,"")}static parseTrackName(t){const e=__.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);v_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===e||o.uuid===e)return o;const c=n(o.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=ue.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){dt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ut("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ut("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ut("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ut("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Ut("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const a=t[i];if(a===void 0){const l=e.nodeName;Ut("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ue.Composite=y_;ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ue.prototype.GetterByBindingType=[ue.prototype._getValue_direct,ue.prototype._getValue_array,ue.prototype._getValue_arrayElement,ue.prototype._getValue_toArray];ue.prototype.SetterByBindingTypeAndVersioning=[[ue.prototype._setValue_direct,ue.prototype._setValue_direct_setNeedsUpdate,ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_array,ue.prototype._setValue_array_setNeedsUpdate,ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_arrayElement,ue.prototype._setValue_arrayElement_setNeedsUpdate,ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_fromArray,ue.prototype._setValue_fromArray_setNeedsUpdate,ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class M_{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Nn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const t={};this._indicesByUUID=t;for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){const t=this._objects,e=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,a=s.length;let o,c=t.length,l=this.nCachedObjects_;for(let h=0,d=arguments.length;h!==d;++h){const u=arguments[h],f=u.uuid;let p=e[f];if(p===void 0){p=c++,e[f]=p,t.push(u);for(let x=0,g=a;x!==g;++x)s[x].push(new ue(u,n[x],i[x]))}else if(p<l){o=t[p];const x=--l,g=t[x];e[g.uuid]=p,t[p]=g,e[f]=x,t[x]=u;for(let m=0,v=a;m!==v;++m){const M=s[m],_=M[x];let S=M[p];M[p]=_,S===void 0&&(S=new ue(u,n[m],i[m])),M[x]=S}}else t[p]!==o&&Ut("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=l}remove(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){const c=arguments[a],l=c.uuid,h=e[l];if(h!==void 0&&h>=s){const d=s++,u=t[d];e[u.uuid]=h,t[h]=u,e[l]=d,t[d]=c;for(let f=0,p=i;f!==p;++f){const x=n[f],g=x[d],m=x[h];x[h]=g,x[d]=m}}}this.nCachedObjects_=s}uncache(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,a=t.length;for(let o=0,c=arguments.length;o!==c;++o){const l=arguments[o],h=l.uuid,d=e[h];if(d!==void 0)if(delete e[h],d<s){const u=--s,f=t[u],p=--a,x=t[p];d!==u&&(e[f.uuid]=d),t[d]=f,u!==p&&(e[x.uuid]=u),t[u]=x,t.pop();for(let g=0,m=i;g!==m;++g){const v=n[g],M=v[u],_=v[p];v[d]=M,v[u]=_,v.pop()}}else{const u=--a,f=t[u];d!==u&&(e[f.uuid]=d),t[d]=f,t.pop();for(let p=0,x=i;p!==x;++p){const g=n[p];g[d]=g[u],g.pop()}}}this.nCachedObjects_=s}subscribe_(t,e){const n=this._bindingsIndicesByPath;let i=n[t];const s=this._bindings;if(i!==void 0)return s[i];const a=this._paths,o=this._parsedPaths,c=this._objects,l=c.length,h=this.nCachedObjects_,d=new Array(l);i=s.length,n[t]=i,a.push(t),o.push(e),s.push(d);for(let u=h,f=c.length;u!==f;++u){const p=c[u];d[u]=new ue(p,t,e)}return d}unsubscribe_(t){const e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){const i=this._paths,s=this._parsedPaths,a=this._bindings,o=a.length-1,c=a[o],l=i[o];e[l]=n,a[n]=c,a.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class vm{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,a=s.length,o=new Array(a),c={endingStart:Ss,endingEnd:Ss};for(let l=0;l!==a;++l){const h=s[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=hp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){const i=this._clip.duration,s=t._clip.duration,a=s/i,o=i/s;t._restoreTimeScale=t.timeScale,this._restoreTimeScale=this.timeScale,t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=s,c[1]=s+n,l[0]=t/a,l[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const c=(t-s)*n;c<0||n===0?e=0:(this._startTime=null,e=n*c)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Kh:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case Pc:default:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(a),l[h].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(e===0?this.paused=!0:(this._restoreTimeScale!==null&&(e=this._restoreTimeScale),this.timeScale=e),this.stopWarping())}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const a=n===up;if(t===0)return s===-1?i:a&&(s&1)===1?e-i:i;if(n===lp){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){const o=Math.floor(i/e);i-=e*o,s+=Math.abs(o);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=i;if(a&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=bs,i.endingEnd=bs):(t?i.endingStart=this.zeroSlopeAtStart?bs:Ss:i.endingStart=pa,e?i.endingEnd=this.zeroSlopeAtEnd?bs:Ss:i.endingEnd=pa)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=s,c[0]=e,o[1]=s+t,c[1]=n,this}}const S_=new Float32Array(1);class b_ extends Qn{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,a=t._propertyBindings,o=t._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let d=0;d!==s;++d){const u=i[d],f=u.name;let p=h[f];if(p!==void 0)++p.referenceCount,a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,c,f));continue}const x=e&&e._propertyBindings[d].binding.parsedPath;p=new _m(ue.create(n,f,x),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,c,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let a=s[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,a=this._actionsByClip,o=a[s],c=o.knownActions,l=c[c.length-1],h=t._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),t._byClipCacheIndex=null;const d=o.actionByRoot,u=(t._localRoot||this._root).uuid;delete d[u],c.length===0&&delete a[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],c=e[e.length-1],l=t._cacheIndex;c._cacheIndex=l,e[l]=c,e.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new gu(new Float32Array(2),new Float32Array(2),1,S_),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let a=typeof t=="string"?Sa.findByName(i,t):t;const o=a!==null?a.uuid:t,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Pc),c!==void 0){const d=c.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const h=new vm(this,a,e,n);return this._bindAction(h,l),this._addInactiveAction(h,o,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?Sa.findByName(n,t):t,a=s?s.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),a=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(i,t,s,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const h=l._cacheIndex,d=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,d._cacheIndex=h,e[h]=d,e.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[e];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class w_ extends Qh{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isRenderTarget3D=!0,this.depth=n;for(let s=0;s<this.textures.length;s++){const a=new Nc(null,t,e,n);a.isRenderTargetTexture=!0,a.renderTarget=this,this.textures[s]=a}this._setTextureOptions(i)}}class Eu{constructor(t){this.value=t}clone(){return new Eu(this.value.clone===void 0?this.value:this.value.clone())}}let T_=0;class E_ extends Qn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:T_++}),this.name="",this.usage=Dc,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){const e=this.uniforms.indexOf(t);return e!==-1&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(t){this.name=t.name,this.usage=t.usage;const e=t.uniforms;this.uniforms.length=0;for(let n=0,i=e.length;n<i;n++){const s=Array.isArray(e[n])?e[n]:[e[n]];for(let a=0;a<s.length;a++)this.uniforms.push(s[a].clone())}return this}clone(){return new this.constructor().copy(this)}}class Mc extends zc{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}class A_{constructor(t,e,n,i,s,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=a,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}}const Hd=new Xt;class ym{constructor(t,e,n=0,i=1/0){this.ray=new jn(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ea,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Ut("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Hd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hd),this}intersectObject(t,e=!0,n=[]){return Eh(t,this,n,e),n.sort(Wd),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Eh(t[i],this,n,e);return n.sort(Wd),n}}function Wd(r,t){return r.distance-t.distance}function Eh(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)Eh(s[a],t,e,!0)}}class C_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,dt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class R_{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Wt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Wt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class P_{constructor(t=1,e=0,n=0){this.radius=t,this.theta=e,this.y=n}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}}class Au{static{Au.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}}const Xd=new it;class Mm{constructor(t=new it(1/0,1/0),e=new it(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Xd.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xd).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const qd=new C,go=new C,Qs=new C,tr=new C,Jl=new C,I_=new C,L_=new C;class cl{constructor(t=new C,e=new C){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){qd.subVectors(t,this.start),go.subVectors(this.end,this.start);const n=go.dot(go);if(n===0)return 0;let s=go.dot(qd)/n;return e&&(s=Wt(s,0,1)),s}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(t,e=I_,n=L_){const i=10000000000000001e-32;let s,a;const o=this.start,c=t.start,l=this.end,h=t.end;Qs.subVectors(l,o),tr.subVectors(h,c),Jl.subVectors(o,c);const d=Qs.dot(Qs),u=tr.dot(tr),f=tr.dot(Jl);if(d<=i&&u<=i)return e.copy(o),n.copy(c),e.sub(n),e.dot(e);if(d<=i)s=0,a=f/u,a=Wt(a,0,1);else{const p=Qs.dot(Jl);if(u<=i)a=0,s=Wt(-p/d,0,1);else{const x=Qs.dot(tr),g=d*u-x*x;g!==0?s=Wt((x*f-p*u)/g,0,1):s=0,a=(x*s+f)/u,a<0?(a=0,s=Wt(-p/d,0,1)):a>1&&(a=1,s=Wt((x-p)/d,0,1))}}return e.copy(o).addScaledVector(Qs,s),n.copy(c).addScaledVector(tr,a),e.distanceToSquared(n)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Yd=new C;class D_ extends de{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";const n=new Vt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,c=32;a<c;a++,o++){const l=a/c*Math.PI*2,h=o/c*Math.PI*2;i.push(Math.cos(l),Math.sin(l),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new yt(i,3));const s=new sn({fog:!1,toneMapped:!1});this.cone=new ti(n,s),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;const t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),Yd.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Yd),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Xi=new C,xo=new Xt,$l=new Xt;class U_ extends ti{constructor(t){const e=Sm(t),n=new Vt,i=[],s=[];for(let l=0;l<e.length;l++){const h=e[l];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new yt(i,3)),n.setAttribute("color",new yt(s,3));const a=new sn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1;const o=new bt(255),c=new bt(65280);this.setColors(o,c)}updateMatrixWorld(t){const e=this.bones,n=this.geometry,i=n.getAttribute("position");$l.copy(this.root.matrixWorld).invert();for(let s=0,a=0;s<e.length;s++){const o=e[s];o.parent&&o.parent.isBone&&(xo.multiplyMatrices($l,o.matrixWorld),Xi.setFromMatrixPosition(xo),i.setXYZ(a,Xi.x,Xi.y,Xi.z),xo.multiplyMatrices($l,o.parent.matrixWorld),Xi.setFromMatrixPosition(xo),i.setXYZ(a+1,Xi.x,Xi.y,Xi.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}setColors(t,e){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,t.r,t.g,t.b),i.setXYZ(s+1,e.r,e.g,e.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function Sm(r){const t=[];r.isBone===!0&&t.push(r);for(let e=0;e<r.children.length;e++)t.push(...Sm(r.children[e]));return t}class N_ extends jt{constructor(t,e,n){const i=new In(e,4,2),s=new un({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const F_=new C,Zd=new bt,Jd=new bt;class O_ extends de{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Ca(e);i.rotateY(Math.PI*.5),this.material=new un({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),a=new Float32Array(s.count*3);i.setAttribute("color",new we(a,3)),this.add(new jt(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const e=t.geometry.getAttribute("color");Zd.copy(this.light.color),Jd.copy(this.light.groundColor);for(let n=0,i=e.count;n<i;n++){const s=n<i/2?Zd:Jd;e.setXYZ(n,s.r,s.g,s.b)}e.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),t.lookAt(F_.setFromMatrixPosition(this.light.matrixWorld).negate())}}class B_ extends ti{constructor(t=10,e=10,n=4473924,i=8947848){n=new bt(n),i=new bt(i);const s=e/2,a=t/e,o=t/2,c=[],l=[];for(let u=0,f=0,p=-o;u<=e;u++,p+=a){c.push(-o,0,p,o,0,p),c.push(p,0,-o,p,0,o);const x=u===s?n:i;x.toArray(l,f),f+=3,x.toArray(l,f),f+=3,x.toArray(l,f),f+=3,x.toArray(l,f),f+=3}const h=new Vt;h.setAttribute("position",new yt(c,3)),h.setAttribute("color",new yt(l,3));const d=new sn({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class z_ extends ti{constructor(t=10,e=16,n=8,i=64,s=4473924,a=8947848){s=new bt(s),a=new bt(a);const o=[],c=[];if(e>1)for(let d=0;d<e;d++){const u=d/e*(Math.PI*2),f=Math.sin(u)*t,p=Math.cos(u)*t;o.push(0,0,0),o.push(f,0,p);const x=d&1?s:a;c.push(x.r,x.g,x.b),c.push(x.r,x.g,x.b)}for(let d=0;d<n;d++){const u=d&1?s:a,f=t-t/n*d;for(let p=0;p<i;p++){let x=p/i*(Math.PI*2),g=Math.sin(x)*f,m=Math.cos(x)*f;o.push(g,0,m),c.push(u.r,u.g,u.b),x=(p+1)/i*(Math.PI*2),g=Math.sin(x)*f,m=Math.cos(x)*f,o.push(g,0,m),c.push(u.r,u.g,u.b)}}const l=new Vt;l.setAttribute("position",new yt(o,3)),l.setAttribute("color",new yt(c,3));const h=new sn({vertexColors:!0,toneMapped:!1});super(l,h),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}const $d=new C,_o=new C,Kd=new C;class V_ extends de{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0&&(e=1);let i=new Vt;i.setAttribute("position",new yt([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));const s=new sn({fog:!1,toneMapped:!1});this.lightPlane=new Ui(i,s),this.add(this.lightPlane),i=new Vt,i.setAttribute("position",new yt([0,0,0,0,0,1],3)),this.targetLine=new Ui(i,s),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),$d.setFromMatrixPosition(this.light.matrixWorld),_o.setFromMatrixPosition(this.light.target.matrixWorld),Kd.subVectors(_o,$d),this.lightPlane.lookAt(_o),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(_o),this.targetLine.scale.z=Kd.length()}}const vo=new C,De=new al;class k_ extends ti{constructor(t){const e=new Vt,n=new sn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(p,x){c(p),c(x)}function c(p){i.push(0,0,0),s.push(0,0,0),a[p]===void 0&&(a[p]=[]),a[p].push(i.length/3-1)}e.setAttribute("position",new yt(i,3)),e.setAttribute("color",new yt(s,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const l=new bt(16755200),h=new bt(16711680),d=new bt(43775),u=new bt(16777215),f=new bt(3355443);this.setColors(l,h,d,u,f)}setColors(t,e,n,i,s){const o=this.geometry.getAttribute("color");return o.setXYZ(0,t.r,t.g,t.b),o.setXYZ(1,t.r,t.g,t.b),o.setXYZ(2,t.r,t.g,t.b),o.setXYZ(3,t.r,t.g,t.b),o.setXYZ(4,t.r,t.g,t.b),o.setXYZ(5,t.r,t.g,t.b),o.setXYZ(6,t.r,t.g,t.b),o.setXYZ(7,t.r,t.g,t.b),o.setXYZ(8,t.r,t.g,t.b),o.setXYZ(9,t.r,t.g,t.b),o.setXYZ(10,t.r,t.g,t.b),o.setXYZ(11,t.r,t.g,t.b),o.setXYZ(12,t.r,t.g,t.b),o.setXYZ(13,t.r,t.g,t.b),o.setXYZ(14,t.r,t.g,t.b),o.setXYZ(15,t.r,t.g,t.b),o.setXYZ(16,t.r,t.g,t.b),o.setXYZ(17,t.r,t.g,t.b),o.setXYZ(18,t.r,t.g,t.b),o.setXYZ(19,t.r,t.g,t.b),o.setXYZ(20,t.r,t.g,t.b),o.setXYZ(21,t.r,t.g,t.b),o.setXYZ(22,t.r,t.g,t.b),o.setXYZ(23,t.r,t.g,t.b),o.setXYZ(24,e.r,e.g,e.b),o.setXYZ(25,e.r,e.g,e.b),o.setXYZ(26,e.r,e.g,e.b),o.setXYZ(27,e.r,e.g,e.b),o.setXYZ(28,e.r,e.g,e.b),o.setXYZ(29,e.r,e.g,e.b),o.setXYZ(30,e.r,e.g,e.b),o.setXYZ(31,e.r,e.g,e.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0,this}update(){const t=this.geometry,e=this.pointMap,n=1,i=1;let s,a;if(De.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,a=0;else if(this.camera.coordinateSystem===Dn)s=-1,a=1;else if(this.camera.coordinateSystem===As)s=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Fe("c",e,t,De,0,0,s),Fe("t",e,t,De,0,0,a),Fe("n1",e,t,De,-n,-i,s),Fe("n2",e,t,De,n,-i,s),Fe("n3",e,t,De,-n,i,s),Fe("n4",e,t,De,n,i,s),Fe("f1",e,t,De,-n,-i,a),Fe("f2",e,t,De,n,-i,a),Fe("f3",e,t,De,-n,i,a),Fe("f4",e,t,De,n,i,a),Fe("u1",e,t,De,n*.7,i*1.1,s),Fe("u2",e,t,De,-n*.7,i*1.1,s),Fe("u3",e,t,De,0,i*2,s),Fe("cf1",e,t,De,-n,0,a),Fe("cf2",e,t,De,n,0,a),Fe("cf3",e,t,De,0,-i,a),Fe("cf4",e,t,De,0,i,a),Fe("cn1",e,t,De,-n,0,s),Fe("cn2",e,t,De,n,0,s),Fe("cn3",e,t,De,0,-i,s),Fe("cn4",e,t,De,0,i,s),t.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function Fe(r,t,e,n,i,s,a){vo.set(i,s,a).unproject(n);const o=t[r];if(o!==void 0){const c=e.getAttribute("position");for(let l=0,h=o.length;l<h;l++)c.setXYZ(o[l],vo.x,vo.y,vo.z)}}const yo=new Ue;class G_ extends ti{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new Vt;s.setIndex(new we(n,1)),s.setAttribute("position",new we(i,3)),super(s,new sn({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&yo.setFromObject(this.object),yo.isEmpty())return;const t=yo.min,e=yo.max,n=this.geometry.attributes.position,i=n.array;i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=t.x,i[4]=e.y,i[5]=e.z,i[6]=t.x,i[7]=t.y,i[8]=e.z,i[9]=e.x,i[10]=t.y,i[11]=e.z,i[12]=e.x,i[13]=e.y,i[14]=t.z,i[15]=t.x,i[16]=e.y,i[17]=t.z,i[18]=t.x,i[19]=t.y,i[20]=t.z,i[21]=e.x,i[22]=t.y,i[23]=t.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class H_ extends ti{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new Vt;s.setIndex(new we(n,1)),s.setAttribute("position",new yt(i,3)),super(s,new sn({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class W_ extends Ui{constructor(t,e=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new Vt;a.setAttribute("position",new yt(s,3)),a.computeBoundingSphere(),super(a,new sn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],c=new Vt;c.setAttribute("position",new yt(o,3)),c.computeBoundingSphere(),this.add(new jt(c,new un({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const jd=new C;let Mo,Kl;class X_ extends de{constructor(t=new C(0,0,1),e=new C(0,0,0),n=1,i=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",Mo===void 0&&(Mo=new Vt,Mo.setAttribute("position",new yt([0,0,0,0,1,0],3)),Kl=new Sr(.5,1,5,1),Kl.translate(0,-.5,0)),this.position.copy(e),this.line=new Ui(Mo,new sn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new jt(Kl,new un({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,s,a)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{jd.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(jd,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class q_ extends ti{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Vt;i.setAttribute("position",new yt(e,3)),i.setAttribute("color",new yt(n,3));const s=new sn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(t,e,n){const i=new bt,s=this.geometry.attributes.color.array;return i.set(t),i.toArray(s,0),i.toArray(s,3),i.set(e),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class Y_{constructor(){this.type="ShapePath",this.color=new bt,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(t,e){return this.currentPath=new gr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,s,a){return this.currentPath.bezierCurveTo(t,e,n,i,s,a),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(){function t(c,l){let h=!1;const d=l.length;for(let u=0,f=d-1;u<d;f=u++){const p=l[u],x=l[f];p.y>c.y!=x.y>c.y&&c.x<(x.x-p.x)*(c.y-p.y)/(x.y-p.y)+p.x&&(h=!h)}return h}function e(c,l){const h=l.getCenter(new it);if(t(h,c))return h;const d=h.y,u=[],f=c.length;for(let p=0;p<f;p++){const x=c[p],g=c[(p+1)%f];if(x.y>d!=g.y>d){const m=x.x+(d-x.y)*(g.x-x.x)/(g.y-x.y);u.push(m)}}return u.length>1&&(u.sort((p,x)=>p-x),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(dt('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");const i=n==="nonzero"?(c=>c!==0):(c=>(c&1)!==0),s=[];for(const c of this.subPaths){const l=c.getPoints();if(l.length<3)continue;const h=Jn.area(l);if(h===0)continue;const d=new Mm;for(let u=0;u<l.length;u++)d.expandByPoint(l[u]);s.push({subPath:c,points:l,boundingBox:d,interiorPoint:e(l,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}s.sort((c,l)=>l.absArea-c.absArea);for(let c=0;c<s.length;c++){const l=s[c];let h=0;for(let d=c-1;d>=0;d--){const u=s[d];if(u.boundingBox.containsBox(l.boundingBox)&&t(l.interiorPoint,u.points)){l.container=u.exclude?u.container:u,h=u.winding,l.winding+=h;break}}i(l.winding)===i(h)&&(l.exclude=!0)}for(const c of s)c.exclude||(c.role=c.container===null||c.container.role==="hole"?"outer":"hole");const a=[],o=new Map;for(const c of s){if(c.exclude||c.role!=="outer")continue;const l=new Ni;l.curves=c.subPath.curves,a.push(l),o.set(c,l)}for(const c of s){if(c.exclude||c.role!=="hole")continue;const l=o.get(c.container);if(!l)continue;const h=new gr;h.curves=c.subPath.curves,l.holes.push(h)}return a}}class Z_ extends Qn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function J_(r,t){const e=r.image&&r.image.width?r.image.width/r.image.height:1;return e>t?(r.repeat.x=1,r.repeat.y=e/t,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=t/e,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function $_(r,t){const e=r.image&&r.image.width?r.image.width/r.image.height:1;return e>t?(r.repeat.x=t/e,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=e/t,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function K_(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function Ah(r,t,e,n){const i=j_(n);switch(e){case Jh:return r*t;case Ac:return r*t/i.components*i.byteLength;case Ta:return r*t/i.components*i.byteLength;case ji:return r*t*2/i.components*i.byteLength;case Cc:return r*t*2/i.components*i.byteLength;case $h:return r*t*3/i.components*i.byteLength;case vn:return r*t*4/i.components*i.byteLength;case Rc:return r*t*4/i.components*i.byteLength;case Qr:case ta:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ea:case na:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Go:case Wo:return Math.max(r,16)*Math.max(t,8)/4;case ko:case Ho:return Math.max(r,8)*Math.max(t,8)/2;case Xo:case qo:case Zo:case Jo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Yo:case ua:case $o:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ko:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case jo:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Qo:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case tc:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case ec:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case nc:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case ic:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case sc:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case rc:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case ac:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case oc:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case cc:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case lc:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case hc:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case uc:case dc:case fc:return Math.ceil(r/4)*Math.ceil(t/4)*16;case pc:case mc:return Math.ceil(r/4)*Math.ceil(t/4)*8;case da:case gc:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function j_(r){switch(r){case bn:case Xh:return{byteLength:1,components:1};case dr:case qh:case Kn:return{byteLength:2,components:1};case Tc:case Ec:return{byteLength:2,components:4};case zn:case wc:case _n:return{byteLength:4,components:1};case Yh:case Zh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}class Q_{static contain(t,e){return J_(t,e)}static cover(t,e){return $_(t,e)}static fill(t){return K_(t)}static getByteLength(t,e,n,i){return Ah(t,e,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sc}}));typeof window<"u"&&(window.__THREE__?dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bm(){let r=null,t=!1,e=null,n=null;function i(s,a){n=r.requestAnimationFrame(i),e(s,a)}return{start:function(){t!==!0&&e!==null&&r!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function tv(r){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=r.createBuffer();r.bindBuffer(c,u),r.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=r.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(r.bindBuffer(l,o),d.length===0)r.bufferSubData(l,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],x=d[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const x=d[f];r.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(r.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:a}}var ev=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nv=`#ifdef USE_ALPHAHASH
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
#endif`,iv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,av=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ov=`#ifdef USE_AOMAP
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
#endif`,cv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lv=`#ifdef USE_BATCHING
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
#endif`,hv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pv=`#ifdef USE_IRIDESCENCE
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
#endif`,mv=`#ifdef USE_BUMPMAP
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
#endif`,gv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_v=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Sv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wv=`#define PI 3.141592653589793
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
} // validated`,Tv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ev=`vec3 transformedNormal = objectNormal;
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
#endif`,Av=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Iv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dv=`#ifdef USE_ENVMAP
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
#endif`,Uv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nv=`#ifdef USE_ENVMAP
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
#endif`,Fv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ov=`#ifdef USE_ENVMAP
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
#endif`,Bv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gv=`#ifdef USE_GRADIENTMAP
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
}`,Hv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Yv=`#ifdef USE_ENVMAP
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
#endif`,Zv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$v=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jv=`PhysicalMaterial material;
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
#endif`,Qv=`uniform sampler2D dfgLUT;
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
}`,ty=`
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
#endif`,ey=`#if defined( RE_IndirectDiffuse )
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
#endif`,ny=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iy=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,sy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ry=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ay=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ly=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,uy=`#if defined( USE_POINTS_UV )
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
#endif`,dy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,py=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,my=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xy=`#ifdef USE_MORPHTARGETS
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
#endif`,_y=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,My=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,by=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,wy=`#ifdef USE_NORMALMAP
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
#endif`,Ty=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ey=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ay=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ry=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Py=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Iy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ly=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ny=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Oy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,By=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vy=`float getShadowMask() {
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
}`,ky=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gy=`#ifdef USE_SKINNING
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
#endif`,Hy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wy=`#ifdef USE_SKINNING
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
#endif`,Xy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jy=`#ifdef USE_TRANSMISSION
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
#endif`,$y=`#ifdef USE_TRANSMISSION
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
#endif`,Ky=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nM=`uniform sampler2D t2D;
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
}`,iM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oM=`#include <common>
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
}`,cM=`#if DEPTH_PACKING == 3200
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
}`,lM=`#define DISTANCE
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
}`,hM=`#define DISTANCE
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
}`,uM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fM=`uniform float scale;
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
}`,pM=`uniform vec3 diffuse;
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
}`,mM=`#include <common>
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
}`,gM=`uniform vec3 diffuse;
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
}`,xM=`#define LAMBERT
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
}`,_M=`#define LAMBERT
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
}`,vM=`#define MATCAP
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
}`,yM=`#define MATCAP
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
}`,MM=`#define NORMAL
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
}`,SM=`#define NORMAL
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
}`,bM=`#define PHONG
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
}`,wM=`#define PHONG
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
}`,TM=`#define STANDARD
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
}`,EM=`#define STANDARD
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
}`,AM=`#define TOON
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
}`,CM=`#define TOON
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
}`,RM=`uniform float size;
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
}`,PM=`uniform vec3 diffuse;
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
}`,IM=`#include <common>
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
}`,LM=`uniform vec3 color;
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
}`,DM=`uniform float rotation;
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
}`,UM=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:ev,alphahash_pars_fragment:nv,alphamap_fragment:iv,alphamap_pars_fragment:sv,alphatest_fragment:rv,alphatest_pars_fragment:av,aomap_fragment:ov,aomap_pars_fragment:cv,batching_pars_vertex:lv,batching_vertex:hv,begin_vertex:uv,beginnormal_vertex:dv,bsdfs:fv,iridescence_fragment:pv,bumpmap_pars_fragment:mv,clipping_planes_fragment:gv,clipping_planes_pars_fragment:xv,clipping_planes_pars_vertex:_v,clipping_planes_vertex:vv,color_fragment:yv,color_pars_fragment:Mv,color_pars_vertex:Sv,color_vertex:bv,common:wv,cube_uv_reflection_fragment:Tv,defaultnormal_vertex:Ev,displacementmap_pars_vertex:Av,displacementmap_vertex:Cv,emissivemap_fragment:Rv,emissivemap_pars_fragment:Pv,colorspace_fragment:Iv,colorspace_pars_fragment:Lv,envmap_fragment:Dv,envmap_common_pars_fragment:Uv,envmap_pars_fragment:Nv,envmap_pars_vertex:Fv,envmap_physical_pars_fragment:Yv,envmap_vertex:Ov,fog_vertex:Bv,fog_pars_vertex:zv,fog_fragment:Vv,fog_pars_fragment:kv,gradientmap_pars_fragment:Gv,lightmap_pars_fragment:Hv,lights_lambert_fragment:Wv,lights_lambert_pars_fragment:Xv,lights_pars_begin:qv,lights_toon_fragment:Zv,lights_toon_pars_fragment:Jv,lights_phong_fragment:$v,lights_phong_pars_fragment:Kv,lights_physical_fragment:jv,lights_physical_pars_fragment:Qv,lights_fragment_begin:ty,lights_fragment_maps:ey,lights_fragment_end:ny,lightprobes_pars_fragment:iy,logdepthbuf_fragment:sy,logdepthbuf_pars_fragment:ry,logdepthbuf_pars_vertex:ay,logdepthbuf_vertex:oy,map_fragment:cy,map_pars_fragment:ly,map_particle_fragment:hy,map_particle_pars_fragment:uy,metalnessmap_fragment:dy,metalnessmap_pars_fragment:fy,morphinstance_vertex:py,morphcolor_vertex:my,morphnormal_vertex:gy,morphtarget_pars_vertex:xy,morphtarget_vertex:_y,normal_fragment_begin:vy,normal_fragment_maps:yy,normal_pars_fragment:My,normal_pars_vertex:Sy,normal_vertex:by,normalmap_pars_fragment:wy,clearcoat_normal_fragment_begin:Ty,clearcoat_normal_fragment_maps:Ey,clearcoat_pars_fragment:Ay,iridescence_pars_fragment:Cy,opaque_fragment:Ry,packing:Py,premultiplied_alpha_fragment:Iy,project_vertex:Ly,dithering_fragment:Dy,dithering_pars_fragment:Uy,roughnessmap_fragment:Ny,roughnessmap_pars_fragment:Fy,shadowmap_pars_fragment:Oy,shadowmap_pars_vertex:By,shadowmap_vertex:zy,shadowmask_pars_fragment:Vy,skinbase_vertex:ky,skinning_pars_vertex:Gy,skinning_vertex:Hy,skinnormal_vertex:Wy,specularmap_fragment:Xy,specularmap_pars_fragment:qy,tonemapping_fragment:Yy,tonemapping_pars_fragment:Zy,transmission_fragment:Jy,transmission_pars_fragment:$y,uv_pars_fragment:Ky,uv_pars_vertex:jy,uv_vertex:Qy,worldpos_vertex:tM,background_vert:eM,background_frag:nM,backgroundCube_vert:iM,backgroundCube_frag:sM,cube_vert:rM,cube_frag:aM,depth_vert:oM,depth_frag:cM,distance_vert:lM,distance_frag:hM,equirect_vert:uM,equirect_frag:dM,linedashed_vert:fM,linedashed_frag:pM,meshbasic_vert:mM,meshbasic_frag:gM,meshlambert_vert:xM,meshlambert_frag:_M,meshmatcap_vert:vM,meshmatcap_frag:yM,meshnormal_vert:MM,meshnormal_frag:SM,meshphong_vert:bM,meshphong_frag:wM,meshphysical_vert:TM,meshphysical_frag:EM,meshtoon_vert:AM,meshtoon_frag:CM,points_vert:RM,points_frag:PM,shadow_vert:IM,shadow_frag:LM,sprite_vert:DM,sprite_frag:UM},ut={common:{diffuse:{value:new bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new bt(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},mn={basic:{uniforms:pn([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:pn([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new bt(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:pn([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new bt(0)},specular:{value:new bt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:pn([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:pn([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new bt(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:pn([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:pn([ut.points,ut.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:pn([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:pn([ut.common,ut.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:pn([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:pn([ut.sprite,ut.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:pn([ut.common,ut.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:pn([ut.lights,ut.fog,{color:{value:new bt(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};mn.physical={uniforms:pn([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new bt(0)},specularColor:{value:new bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const So={r:0,b:0,g:0},NM=new Xt,wm=new $t;wm.set(-1,0,0,0,1,0,0,0,1);function FM(r,t,e,n,i,s){const a=new bt(0);let o=i===!0?0:1,c,l,h=null,d=0,u=null;function f(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const _=v.backgroundBlurriness>0;M=t.get(M,_)}return M}function p(v){let M=!1;const _=f(v);_===null?g(a,o):_&&_.isColor&&(g(_,1),M=!0);const S=r.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(r.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function x(v,M){const _=f(M);_&&(_.isCubeTexture||_.mapping===Mr)?(l===void 0&&(l=new jt(new Ve(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:_r(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(NM.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(wm),l.material.toneMapped=oe.getTransfer(_.colorSpace)!==ye,(h!==_||d!==_.version||u!==r.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new jt(new is(2,2),new En({name:"BackgroundMaterial",uniforms:_r(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:$i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=oe.getTransfer(_.colorSpace)!==ye,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==r.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,M){v.getRGB(So,Xp(r)),e.buffers.color.setClear(So.r,So.g,So.b,M,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:p,addToRenderList:x,dispose:m}}function OM(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,a=!1;function o(R,I,U,D,F){let V=!1;const O=d(R,D,U,I);s!==O&&(s=O,l(s.object)),V=f(R,D,U,F),V&&p(R,D,U,F),F!==null&&t.update(F,r.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,_(R,I,U,D),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function c(){return r.createVertexArray()}function l(R){return r.bindVertexArray(R)}function h(R){return r.deleteVertexArray(R)}function d(R,I,U,D){const F=D.wireframe===!0;let V=n[I.id];V===void 0&&(V={},n[I.id]=V);const O=R.isInstancedMesh===!0?R.id:0;let Y=V[O];Y===void 0&&(Y={},V[O]=Y);let G=Y[U.id];G===void 0&&(G={},Y[U.id]=G);let K=G[F];return K===void 0&&(K=u(c()),G[F]=K),K}function u(R){const I=[],U=[],D=[];for(let F=0;F<e;F++)I[F]=0,U[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:D,object:R,attributes:{},index:null}}function f(R,I,U,D){const F=s.attributes,V=I.attributes;let O=0;const Y=U.getAttributes();for(const G in Y)if(Y[G].location>=0){const Q=F[G];let Nt=V[G];if(Nt===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(Nt=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(Nt=R.instanceColor)),Q===void 0||Q.attribute!==Nt||Nt&&Q.data!==Nt.data)return!0;O++}return s.attributesNum!==O||s.index!==D}function p(R,I,U,D){const F={},V=I.attributes;let O=0;const Y=U.getAttributes();for(const G in Y)if(Y[G].location>=0){let Q=V[G];Q===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor));const Nt={};Nt.attribute=Q,Q&&Q.data&&(Nt.data=Q.data),F[G]=Nt,O++}s.attributes=F,s.attributesNum=O,s.index=D}function x(){const R=s.newAttributes;for(let I=0,U=R.length;I<U;I++)R[I]=0}function g(R){m(R,0)}function m(R,I){const U=s.newAttributes,D=s.enabledAttributes,F=s.attributeDivisors;U[R]=1,D[R]===0&&(r.enableVertexAttribArray(R),D[R]=1),F[R]!==I&&(r.vertexAttribDivisor(R,I),F[R]=I)}function v(){const R=s.newAttributes,I=s.enabledAttributes;for(let U=0,D=I.length;U<D;U++)I[U]!==R[U]&&(r.disableVertexAttribArray(U),I[U]=0)}function M(R,I,U,D,F,V,O){O===!0?r.vertexAttribIPointer(R,I,U,F,V):r.vertexAttribPointer(R,I,U,D,F,V)}function _(R,I,U,D){x();const F=D.attributes,V=U.getAttributes(),O=I.defaultAttributeValues;for(const Y in V){const G=V[Y];if(G.location>=0){let K=F[Y];if(K===void 0&&(Y==="instanceMatrix"&&R.instanceMatrix&&(K=R.instanceMatrix),Y==="instanceColor"&&R.instanceColor&&(K=R.instanceColor)),K!==void 0){const Q=K.normalized,Nt=K.itemSize,Ct=t.get(K);if(Ct===void 0)continue;const pe=Ct.buffer,se=Ct.type,le=Ct.bytesPerElement,$=se===r.INT||se===r.UNSIGNED_INT||K.gpuType===wc;if(K.isInterleavedBufferAttribute){const et=K.data,_t=et.stride,Ht=K.offset;if(et.isInstancedInterleavedBuffer){for(let wt=0;wt<G.locationSize;wt++)m(G.location+wt,et.meshPerAttribute);R.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let wt=0;wt<G.locationSize;wt++)g(G.location+wt);r.bindBuffer(r.ARRAY_BUFFER,pe);for(let wt=0;wt<G.locationSize;wt++)M(G.location+wt,Nt/G.locationSize,se,Q,_t*le,(Ht+Nt/G.locationSize*wt)*le,$)}else{if(K.isInstancedBufferAttribute){for(let et=0;et<G.locationSize;et++)m(G.location+et,K.meshPerAttribute);R.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let et=0;et<G.locationSize;et++)g(G.location+et);r.bindBuffer(r.ARRAY_BUFFER,pe);for(let et=0;et<G.locationSize;et++)M(G.location+et,Nt/G.locationSize,se,Q,Nt*le,Nt/G.locationSize*et*le,$)}}else if(O!==void 0){const Q=O[Y];if(Q!==void 0)switch(Q.length){case 2:r.vertexAttrib2fv(G.location,Q);break;case 3:r.vertexAttrib3fv(G.location,Q);break;case 4:r.vertexAttrib4fv(G.location,Q);break;default:r.vertexAttrib1fv(G.location,Q)}}}}v()}function S(){T();for(const R in n){const I=n[R];for(const U in I){const D=I[U];for(const F in D){const V=D[F];for(const O in V)h(V[O].object),delete V[O];delete D[F]}}delete n[R]}}function b(R){if(n[R.id]===void 0)return;const I=n[R.id];for(const U in I){const D=I[U];for(const F in D){const V=D[F];for(const O in V)h(V[O].object),delete V[O];delete D[F]}}delete n[R.id]}function E(R){for(const I in n){const U=n[I];for(const D in U){const F=U[D];if(F[R.id]===void 0)continue;const V=F[R.id];for(const O in V)h(V[O].object),delete V[O];delete F[R.id]}}}function y(R){for(const I in n){const U=n[I],D=R.isInstancedMesh===!0?R.id:0,F=U[D];if(F!==void 0){for(const V in F){const O=F[V];for(const Y in O)h(O[Y].object),delete O[Y];delete F[V]}delete U[D],Object.keys(U).length===0&&delete n[I]}}}function T(){P(),a=!0,s!==i&&(s=i,l(s.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function BM(r,t,e){let n;function i(c){n=c}function s(c,l){r.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(r.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];e.update(u,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function zM(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){return!(E!==vn&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const y=E===Kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==bn&&E!==_n&&!y&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function c(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(dt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),_=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=r.getParameter(r.MAX_SAMPLES),b=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,maxSamples:S,samples:b}}function VM(r){const t=this;let e=null,n=0,i=!1,s=!1;const a=new ci,o=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=r.get(d);if(!i||p===null||p.length===0||s&&!g)s?h(null):l();else{const v=s?0:n,M=v*4;let _=m.clippingState||null;c.value=_,_=h(p,u,M,f);for(let S=0;S!==M;++S)_[S]=e[S];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=c.value,p!==!0||g===null){const m=f+x*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,_=f;M!==x;++M,_+=4)a.copy(d[M]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}const ar=4,kM=6,GM=20,HM=256,zr=new Ra,Qd=new bt;let jl=null,Ql=0,th=0,eh=!1;const WM=new C,_s=new C;class Ch{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,s={}){const{size:a=256,position:o=WM}=s;jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),th=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ef(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(jl,Ql,th),this._renderer.xr.enabled=eh,t.scissorTest=!1,er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===pi||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),th=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Re,minFilter:Re,generateMipmaps:!1,type:Kn,format:vn,colorSpace:ma,depthBuffer:!1},i=tf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tf(t,e,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=XM(s)),this._blurMaterial=YM(s,t,e),this._ggxMaterial=qM(s,t,e)}return i}_compileMaterial(t){const e=new jt(new Vt,t);this._renderer.compile(e,zr)}_sceneToCubeUV(t,e,n,i,s){const c=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Qd),d.toneMapping=$n,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new Ve,new un({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const v=t.background;v?v.isColor&&(g.color.copy(v),t.background=null,m=!0):(g.color.copy(Qd),m=!0);for(let M=0;M<6;M++){const _=M%3;_===0?(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[M],s.y,s.z)):_===1?(c.up.set(0,0,l[M]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[M],s.z)):(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[M]));const S=this._cubeSize;er(i,_*S,M>2?S:0,S,S),d.setRenderTarget(i),m&&d.render(x,c),d.render(t,c)}d.toneMapping=f,d.autoClear=u,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===pi||t.mapping===Ki;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=nf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ef());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;er(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,zr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,f=d*u,{_lodMax:p}=this,x=this._sizeLods[n],g=3*x*(n>p-ar?n-p+ar:0),m=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=p-e,er(s,g,m,3*x,2*x),i.setRenderTarget(s),i.render(o,zr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=p-n,er(t,g,m,3*x,2*x),i.setRenderTarget(t),i.render(o,zr)}_blur(t,e,n,i){const s=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,n,a),this._blurPass(s,t,n,n,a)}_blurPass(t,e,n,i,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[i],d=3*h*(i>this._lodMax-ar?i-this._lodMax+ar:0),u=4*(this._cubeSize-h);er(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(c,zr)}}function XM(r){const t=[],e=[];let n=r;const i=r-ar+1+kM;for(let s=0;s<i;s++){const a=Math.pow(2,n);t.push(a);const o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,f=3,p=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let m=0;m<d;m++){const v=m%3*2/3-1,M=m>2?0:-1,_=[v,M,0,v+2/3,M,0,v+2/3,M+1,0,v,M,0,v+2/3,M+1,0,v,M+1,0];p.set(_,f*u*m);for(let S=0;S<u;S++){const b=h[S*2]*2-1,E=h[S*2+1]*2-1;m===0?_s.set(1,E,b):m===1?_s.set(-b,1,-E):m===2?_s.set(-b,E,1):m===3?_s.set(-1,E,-b):m===4?_s.set(-b,-1,E):_s.set(b,E,-1),_s.toArray(x,(m*u+S)*f)}}const g=new Vt;g.setAttribute("position",new we(p,f)),g.setAttribute("outputDirection",new we(x,f)),e.push(new jt(g,null)),n>ar&&n--}return{lodMeshes:e,sizeLods:t}}function tf(r,t,e){const n=new Tn(r,t,e);return n.texture.mapping=Mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function qM(r,t,e){return new En({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:HM,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ll(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function YM(r,t,e){return new En({name:"SphericalGaussianBlur",defines:{SAMPLES:GM,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ll(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function ef(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ll(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function nf(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function ll(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Cu extends Tn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Aa(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ve(5,5,5),s=new En({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:fi});s.uniforms.tEquirect.value=e;const a=new jt(i,s),o=e.minFilter;return e.minFilter===hi&&(e.minFilter=Re),new mm(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}}function ZM(r){let t=new WeakMap,e=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){const f=u.mapping;if(f===$r||f===Kr)if(t.has(u)){const p=t.get(u).texture;return o(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const x=new Cu(p.height);return x.fromEquirectangularTexture(r,u),t.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,p=f===$r||f===Kr,x=f===pi||f===Ki;if(p||x){let g=e.get(u);const m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Ch(r)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{const v=u.image;return p&&v&&v.height>0||x&&v&&c(v)?(n===null&&(n=new Ch(r)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===$r?u.mapping=pi:f===Kr&&(u.mapping=Ki),u}function c(u){let f=0;const p=6;for(let x=0;x<p;x++)u[x]!==void 0&&f++;return f===p}function l(u){const f=u.target;f.removeEventListener("dispose",l);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function JM(r){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=r.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Ri("WebGLRenderer: "+n+" extension not supported."),i}}}function $M(r,t,e,n){const i={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete i[u.id];const f=s.get(u);f&&(t.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)t.update(u[f],r.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,p=d.attributes.position;let x=0;if(p===void 0)return;if(f!==null){const v=f.array;x=f.version;for(let M=0,_=v.length;M<_;M+=3){const S=v[M+0],b=v[M+1],E=v[M+2];u.push(S,b,b,E,E,S)}}else{const v=p.array;x=p.version;for(let M=0,_=v.length/3-1;M<_;M+=3){const S=M+0,b=M+1,E=M+2;u.push(S,b,b,E,E,S)}}const g=new(p.count>=65535?eu:tu)(u,1);g.version=x;const m=s.get(d);m&&t.remove(m),s.set(d,g)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function KM(r,t,e){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,u){r.drawElements(n,u,s,d*a),e.update(u,n,1)}function l(d,u,f){f!==0&&(r.drawElementsInstanced(n,u,s,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,f);let x=0;for(let g=0;g<f;g++)x+=u[g];e.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function jM(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:Ut("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function QM(r,t,e){const n=new WeakMap,i=new ce;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let T=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),p===!0&&(M=2),x===!0&&(M=3);let _=o.attributes.position.count*M,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const b=new Float32Array(_*S*4*d),E=new Uc(b,_,S,d);E.type=_n,E.needsUpdate=!0;const y=M*4;for(let P=0;P<d;P++){const R=g[P],I=m[P],U=v[P],D=_*S*4*P;for(let F=0;F<R.count;F++){const V=F*y;f===!0&&(i.fromBufferAttribute(R,F),b[D+V+0]=i.x,b[D+V+1]=i.y,b[D+V+2]=i.z,b[D+V+3]=0),p===!0&&(i.fromBufferAttribute(I,F),b[D+V+4]=i.x,b[D+V+5]=i.y,b[D+V+6]=i.z,b[D+V+7]=0),x===!0&&(i.fromBufferAttribute(U,F),b[D+V+8]=i.x,b[D+V+9]=i.y,b[D+V+10]=i.z,b[D+V+11]=U.itemSize===4?i.w:1)}}u={count:d,texture:E,size:new it(_,S)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];const p=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(r,"morphTargetBaseInfluence",p),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function tS(r,t,e,n,i){let s=new WeakMap;function a(l){const h=i.render.frame,d=l.geometry,u=t.get(l,d);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const eS={[Oh]:"LINEAR_TONE_MAPPING",[Bh]:"REINHARD_TONE_MAPPING",[zh]:"CINEON_TONE_MAPPING",[Vh]:"ACES_FILMIC_TONE_MAPPING",[Gh]:"AGX_TONE_MAPPING",[Hh]:"NEUTRAL_TONE_MAPPING",[kh]:"CUSTOM_TONE_MAPPING"};function nS(r,t,e,n,i,s){const a=new Tn(t,e,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Vt;l.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new yt([0,2,0,0,2,0],2));const h=new du({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new jt(l,h),u=new Ra(-1,1,1,-1,0,1);let f=null,p=null,x=!1,g,m=null,v=[],M=!1;this.setSize=function(_,S){a.setSize(_,S),o!==null&&o.setSize(_,S),c!==null&&c.setSize(_,S);for(let b=0;b<v.length;b++){const E=v[b];E.setSize&&E.setSize(_,S)}},this.setEffects=function(_){v=_,M=v.length>0&&v[0].isRenderPass===!0;const S=a.width,b=a.height;v.length>0&&o===null&&(o=new Tn(S,b,{type:Kn,depthBuffer:!1,stencilBuffer:!1}),c=new Tn(S,b,{type:Kn,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<v.length;E++){const y=v[E];y.setSize&&y.setSize(S,b)}},this.begin=function(_,S){if(x||_.toneMapping===$n&&v.length===0)return!1;if(m=S,S!==null){const b=S.width,E=S.height;(a.width!==b||a.height!==E)&&this.setSize(b,E)}return M===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=$n,!0},this.hasRenderPass=function(){return M},this.end=function(_,S){_.toneMapping=g,x=!0;let b=a,E=o;for(let y=0;y<v.length;y++){const T=v[y];T.enabled!==!1&&(T.render(_,E,b,S),T.needsSwap!==!1&&(b=E,E=E===o?c:o))}if(f!==_.outputColorSpace||p!==_.toneMapping){f=_.outputColorSpace,p=_.toneMapping,h.defines={},oe.getTransfer(f)===ye&&(h.defines.SRGB_TRANSFER="");const y=eS[p];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,_.setRenderTarget(m),_.render(d,u),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const Tm=new Le,Rh=new mr(1,1),Em=new Uc,Am=new Nc,Cm=new Aa,sf=[],rf=[],af=new Float32Array(16),of=new Float32Array(9),cf=new Float32Array(4);function Er(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=sf[i];if(s===void 0&&(s=new Float32Array(i),sf[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function We(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Xe(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function hl(r,t){let e=rf[t];e===void 0&&(e=new Int32Array(t),rf[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function iS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function sS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2fv(this.addr,t),Xe(e,t)}}function rS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;r.uniform3fv(this.addr,t),Xe(e,t)}}function aS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4fv(this.addr,t),Xe(e,t)}}function oS(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;cf.set(n),r.uniformMatrix2fv(this.addr,!1,cf),Xe(e,n)}}function cS(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;of.set(n),r.uniformMatrix3fv(this.addr,!1,of),Xe(e,n)}}function lS(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;af.set(n),r.uniformMatrix4fv(this.addr,!1,af),Xe(e,n)}}function hS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function uS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2iv(this.addr,t),Xe(e,t)}}function dS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;r.uniform3iv(this.addr,t),Xe(e,t)}}function fS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4iv(this.addr,t),Xe(e,t)}}function pS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function mS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2uiv(this.addr,t),Xe(e,t)}}function gS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;r.uniform3uiv(this.addr,t),Xe(e,t)}}function xS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4uiv(this.addr,t),Xe(e,t)}}function _S(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Rh.compareFunction=e.isReversedDepthBuffer()?Lc:Ic,s=Rh):s=Tm,e.setTexture2D(t||s,i)}function vS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Am,i)}function yS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Cm,i)}function MS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Em,i)}function SS(r){switch(r){case 5126:return iS;case 35664:return sS;case 35665:return rS;case 35666:return aS;case 35674:return oS;case 35675:return cS;case 35676:return lS;case 5124:case 35670:return hS;case 35667:case 35671:return uS;case 35668:case 35672:return dS;case 35669:case 35673:return fS;case 5125:return pS;case 36294:return mS;case 36295:return gS;case 36296:return xS;case 35678:case 36198:case 36298:case 36306:case 35682:return _S;case 35679:case 36299:case 36307:return vS;case 35680:case 36300:case 36308:case 36293:return yS;case 36289:case 36303:case 36311:case 36292:return MS}}function bS(r,t){r.uniform1fv(this.addr,t)}function wS(r,t){const e=Er(t,this.size,2);r.uniform2fv(this.addr,e)}function TS(r,t){const e=Er(t,this.size,3);r.uniform3fv(this.addr,e)}function ES(r,t){const e=Er(t,this.size,4);r.uniform4fv(this.addr,e)}function AS(r,t){const e=Er(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function CS(r,t){const e=Er(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function RS(r,t){const e=Er(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function PS(r,t){r.uniform1iv(this.addr,t)}function IS(r,t){r.uniform2iv(this.addr,t)}function LS(r,t){r.uniform3iv(this.addr,t)}function DS(r,t){r.uniform4iv(this.addr,t)}function US(r,t){r.uniform1uiv(this.addr,t)}function NS(r,t){r.uniform2uiv(this.addr,t)}function FS(r,t){r.uniform3uiv(this.addr,t)}function OS(r,t){r.uniform4uiv(this.addr,t)}function BS(r,t,e){const n=this.cache,i=t.length,s=hl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=Rh:a=Tm;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,s[o])}function zS(r,t,e){const n=this.cache,i=t.length,s=hl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Am,s[a])}function VS(r,t,e){const n=this.cache,i=t.length,s=hl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Cm,s[a])}function kS(r,t,e){const n=this.cache,i=t.length,s=hl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Em,s[a])}function GS(r){switch(r){case 5126:return bS;case 35664:return wS;case 35665:return TS;case 35666:return ES;case 35674:return AS;case 35675:return CS;case 35676:return RS;case 5124:case 35670:return PS;case 35667:case 35671:return IS;case 35668:case 35672:return LS;case 35669:case 35673:return DS;case 5125:return US;case 36294:return NS;case 36295:return FS;case 36296:return OS;case 35678:case 36198:case 36298:case 36306:case 35682:return BS;case 35679:case 36299:case 36307:return zS;case 35680:case 36300:case 36308:case 36293:return VS;case 36289:case 36303:case 36311:case 36292:return kS}}class HS{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=SS(e.type)}}class WS{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=GS(e.type)}}class XS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(t,e[o.id],n)}}}const nh=/(\w+)(\])?(\[|\.)?/g;function lf(r,t){r.seq.push(t),r.map[t.id]=t}function qS(r,t,e){const n=r.name,i=n.length;for(nh.lastIndex=0;;){const s=nh.exec(n),a=nh.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){lf(e,l===void 0?new HS(o,r,t):new WS(o,r,t));break}else{let d=e.map[o];d===void 0&&(d=new XS(o),lf(e,d)),e=d}}}class Do{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);qS(o,c,this)}const i=[],s=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function hf(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const YS=37297;let ZS=0;function JS(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const uf=new $t;function $S(r){oe._getMatrix(uf,oe.workingColorSpace,r);const t=`mat3( ${uf.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(r)){case ga:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return dt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function df(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+JS(r.getShaderSource(t),o)}else return s}function KS(r,t){const e=$S(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const jS={[Oh]:"Linear",[Bh]:"Reinhard",[zh]:"Cineon",[Vh]:"ACESFilmic",[Gh]:"AgX",[Hh]:"Neutral",[kh]:"Custom"};function QS(r,t){const e=jS[t];return e===void 0?(dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const bo=new C;function tb(){oe.getLuminanceCoefficients(bo);const r=bo.x.toFixed(4),t=bo.y.toFixed(4),e=bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function eb(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function nb(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ib(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function qr(r){return r!==""}function ff(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pf(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const sb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ph(r){return r.replace(sb,ab)}const rb=new Map;function ab(r,t){let e=ee[t];if(e===void 0){const n=rb.get(t);if(n!==void 0)e=ee[n],dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ph(e)}const ob=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mf(r){return r.replace(ob,cb)}function cb(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function gf(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const lb={[Jr]:"SHADOWMAP_TYPE_PCF",[ir]:"SHADOWMAP_TYPE_VSM"};function hb(r){return lb[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const ub={[pi]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Mr]:"ENVMAP_TYPE_CUBE_UV"};function db(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":ub[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const fb={[Ki]:"ENVMAP_MODE_REFRACTION"};function pb(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":fb[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const mb={[wa]:"ENVMAP_BLENDING_MULTIPLY",[ap]:"ENVMAP_BLENDING_MIX",[op]:"ENVMAP_BLENDING_ADD"};function gb(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":mb[r.combine]||"ENVMAP_BLENDING_NONE"}function xb(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function _b(r,t,e,n){const i=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=hb(e),l=db(e),h=pb(e),d=gb(e),u=xb(e),f=eb(e),p=nb(s),x=i.createProgram();let g,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(qr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(qr).join(`
`),m.length>0&&(m+=`
`)):(g=[gf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),m=[gf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?ee.tonemapping_pars_fragment:"",e.toneMapping!==$n?QS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,KS("linearToOutputTexel",e.outputColorSpace),tb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qr).join(`
`)),a=Ph(a),a=ff(a,e),a=pf(a,e),o=Ph(o),o=ff(o,e),o=pf(o,e),a=mf(a),o=mf(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=v+g+a,_=v+m+o,S=hf(i,i.VERTEX_SHADER,M),b=hf(i,i.FRAGMENT_SHADER,_);i.attachShader(x,S),i.attachShader(x,b),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function E(R){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(x)||"",U=i.getShaderInfoLog(S)||"",D=i.getShaderInfoLog(b)||"",F=I.trim(),V=U.trim(),O=D.trim();let Y=!0,G=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,S,b);else{const K=df(i,S,"vertex"),Q=df(i,b,"fragment");Ut("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+K+`
`+Q)}else F!==""?dt("WebGLProgram: Program Info Log:",F):(V===""||O==="")&&(G=!1);G&&(R.diagnostics={runnable:Y,programLog:F,vertexShader:{log:V,prefix:g},fragmentShader:{log:O,prefix:m}})}i.deleteShader(S),i.deleteShader(b),y=new Do(i,x),T=ib(i,x)}let y;this.getUniforms=function(){return y===void 0&&E(this),y};let T;this.getAttributes=function(){return T===void 0&&E(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(x,YS)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ZS++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=b,this}let vb=0;class yb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Mb(t),e.set(t,n)),n}}class Mb{constructor(t){this.id=vb++,this.code=t,this.usedTimes=0}}function Sb(r){return r===ji||r===ua||r===da}function bb(r,t,e,n,i,s){const a=new Ea,o=new yb,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function x(y,T,P,R,I,U){const D=R.fog,F=I.geometry,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,O=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Y=t.get(y.envMap||V,O),G=Y&&Y.mapping===Mr?Y.image.height:null,K=f[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&dt("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const Q=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Nt=Q!==void 0?Q.length:0;let Ct=0;F.morphAttributes.position!==void 0&&(Ct=1),F.morphAttributes.normal!==void 0&&(Ct=2),F.morphAttributes.color!==void 0&&(Ct=3);let pe,se,le,$;if(K){const Ee=mn[K];pe=Ee.vertexShader,se=Ee.fragmentShader}else{pe=y.vertexShader,se=y.fragmentShader;const Ee=o.getVertexShaderStage(y),xe=o.getFragmentShaderStage(y);o.update(y,Ee,xe),le=Ee.id,$=xe.id}const et=r.getRenderTarget(),_t=r.state.buffers.depth.getReversed(),Ht=I.isInstancedMesh===!0,wt=I.isBatchedMesh===!0,qt=!!y.map,Me=!!y.matcap,nt=!!Y,rt=!!y.aoMap,at=!!y.lightMap,ot=!!y.bumpMap&&y.wireframe===!1,ht=!!y.normalMap,kt=!!y.displacementMap,zt=!!y.emissiveMap,Yt=!!y.metalnessMap,Kt=!!y.roughnessMap,N=y.anisotropy>0,ge=y.clearcoat>0,re=y.dispersion>0,L=y.retroreflectivity>0,w=y.iridescence>0,k=y.sheen>0,X=y.transmission>0,Z=N&&!!y.anisotropyMap,ct=ge&&!!y.clearcoatMap,lt=ge&&!!y.clearcoatNormalMap,J=ge&&!!y.clearcoatRoughnessMap,tt=w&&!!y.iridescenceMap,ft=w&&!!y.iridescenceThicknessMap,Ft=k&&!!y.sheenColorMap,xt=k&&!!y.sheenRoughnessMap,pt=!!y.specularMap,Ot=!!y.specularColorMap,Gt=!!y.specularIntensityMap,Qt=X&&!!y.transmissionMap,z=X&&!!y.thicknessMap,mt=!!y.gradientMap,j=!!y.alphaMap,gt=y.alphaTest>0,St=!!y.alphaHash,st=!!y.extensions;let Bt=$n;y.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Bt=r.toneMapping);const It={shaderID:K,shaderType:y.type,shaderName:y.name,vertexShader:pe,fragmentShader:se,defines:y.defines,customVertexShaderID:le,customFragmentShaderID:$,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:wt,batchingColor:wt&&I._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&I.instanceColor!==null,instancingMorph:Ht&&I.morphTexture!==null,outputColorSpace:et===null?r.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:qt,matcap:Me,envMap:nt,envMapMode:nt&&Y.mapping,envMapCubeUVHeight:G,aoMap:rt,lightMap:at,bumpMap:ot,normalMap:ht,displacementMap:kt,emissiveMap:zt,normalMapObjectSpace:ht&&y.normalMapType===fp,normalMapTangentSpace:ht&&y.normalMapType===Di,packedNormalMap:ht&&y.normalMapType===Di&&Sb(y.normalMap.format),metalnessMap:Yt,roughnessMap:Kt,anisotropy:N,anisotropyMap:Z,clearcoat:ge,clearcoatMap:ct,clearcoatNormalMap:lt,clearcoatRoughnessMap:J,dispersion:re,retroreflection:L,iridescence:w,iridescenceMap:tt,iridescenceThicknessMap:ft,sheen:k,sheenColorMap:Ft,sheenRoughnessMap:xt,specularMap:pt,specularColorMap:Ot,specularIntensityMap:Gt,transmission:X,transmissionMap:Qt,thicknessMap:z,gradientMap:mt,opaque:y.transparent===!1&&y.blending===cr&&y.alphaToCoverage===!1,alphaMap:j,alphaTest:gt,alphaHash:St,combine:y.combine,mapUv:qt&&p(y.map.channel),aoMapUv:rt&&p(y.aoMap.channel),lightMapUv:at&&p(y.lightMap.channel),bumpMapUv:ot&&p(y.bumpMap.channel),normalMapUv:ht&&p(y.normalMap.channel),displacementMapUv:kt&&p(y.displacementMap.channel),emissiveMapUv:zt&&p(y.emissiveMap.channel),metalnessMapUv:Yt&&p(y.metalnessMap.channel),roughnessMapUv:Kt&&p(y.roughnessMap.channel),anisotropyMapUv:Z&&p(y.anisotropyMap.channel),clearcoatMapUv:ct&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:lt&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:xt&&p(y.sheenRoughnessMap.channel),specularMapUv:pt&&p(y.specularMap.channel),specularColorMapUv:Ot&&p(y.specularColorMap.channel),specularIntensityMapUv:Gt&&p(y.specularIntensityMap.channel),transmissionMapUv:Qt&&p(y.transmissionMap.channel),thicknessMapUv:z&&p(y.thicknessMap.channel),alphaMapUv:j&&p(y.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ht||N),vertexNormals:!!F.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!F.attributes.uv&&(qt||j),fog:!!D,useFog:y.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||F.attributes.normal===void 0&&ht===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:_t,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Nt,morphTextureStride:Ct,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Bt,decodeVideoTexture:qt&&y.map.isVideoTexture===!0&&oe.getTransfer(y.map.colorSpace)===ye,decodeVideoTextureEmissive:zt&&y.emissiveMap.isVideoTexture===!0&&oe.getTransfer(y.emissiveMap.colorSpace)===ye,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Pn,flipSided:y.side===en,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:st&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&y.extensions.multiDraw===!0||wt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return It.vertexUv1s=c.has(1),It.vertexUv2s=c.has(2),It.vertexUv3s=c.has(3),c.clear(),It}function g(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)T.push(P),T.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(m(T,y),v(T,y),T.push(r.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function m(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numSunLights),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numSunLightShadows),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function v(y,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function M(y){const T=f[y.type];let P;if(T){const R=mn[T];P=nl.clone(R.uniforms)}else P=y.uniforms;return P}function _(y,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new _b(r,T,y,i),l.push(P),h.set(T,P)),P}function S(y){if(--y.usedTimes===0){const T=l.indexOf(y);l[T]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function b(y){o.remove(y)}function E(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:M,acquireProgram:_,releaseProgram:S,releaseShaderCache:b,programs:l,dispose:E}}function wb(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,c){r.get(a)[o]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function Tb(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function xf(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function _f(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,p,x,g,m){let v=r[t];return v===void 0?(v={id:u.id,object:u,geometry:f,material:p,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},r[t]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=p,v.materialVariant=a(u),v.groupOrder=x,v.renderOrder=u.renderOrder,v.z=g,v.group=m),t++,v}function c(u,f,p,x,g,m,v){v.reversedDepth===!0&&(g=-g);const M=o(u,f,p,x,g,m);p.transmission>0?n.push(M):p.transparent===!0?i.push(M):e.push(M)}function l(u,f,p,x,g,m){const v=o(u,f,p,x,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?i.unshift(v):e.unshift(v)}function h(u,f){e.length>1&&e.sort(u||Tb),n.length>1&&n.sort(f||xf),i.length>1&&i.sort(f||xf)}function d(){for(let u=t,f=r.length;u<f;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:c,unshift:l,finish:d,sort:h}}function Eb(){let r=new WeakMap;function t(n,i){const s=r.get(n);let a;return s===void 0?(a=new _f,r.set(n,[a])):i>=s.length?(a=new _f,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function Ab(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new C,color:new bt};break;case"SpotLight":e={position:new C,direction:new C,color:new bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new bt,groundColor:new bt};break;case"RectAreaLight":e={color:new bt,position:new C,halfWidth:new C,halfHeight:new C};break}return r[t.id]=e,e}}}function Cb(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Rb=0;function Pb(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Ib(r){const t=new Ab,e=Cb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const i=new C,s=new Xt,a=new Xt;function o(l){let h=0,d=0,u=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let f=0,p=0,x=0,g=0,m=0,v=0,M=0,_=0,S=0,b=0,E=0,y=0,T=0,P=0;l.sort(Pb);for(let I=0,U=l.length;I<U;I++){const D=l[I],F=D.color,V=D.intensity,O=D.distance;let Y=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ji?Y=D.shadow.map.texture:Y=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=F.r*V,d+=F.g*V,u+=F.b*V;else if(D.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(D.sh.coefficients[G],V);P++}else if(D.isSunLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const K=D.shadow,Q=e.get(D);Q.shadowIntensity=K.intensity,Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[p]=Q,n.sunShadowMap[p]=Y;const Nt=K.getViewportCount();for(let Ct=0;Ct<Nt;Ct++)n.sunShadowMatrix[x+Ct]=K.getMatrix(Ct),n.sunShadowCascade[x+Ct]=K._cascadeData[Ct];x+=Nt,p++}n.sun[f]=G,f++}else if(D.isDirectionalLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const K=D.shadow,Q=e.get(D);Q.shadowIntensity=K.intensity,Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,n.directionalShadow[g]=Q,n.directionalShadowMap[g]=Y,n.directionalShadowMatrix[g]=D.shadow.matrix,S++}n.directional[g]=G,g++}else if(D.isSpotLight){const G=t.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(F).multiplyScalar(V),G.distance=O,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,n.spot[v]=G;const K=D.shadow;if(D.map&&(n.spotLightMap[y]=D.map,y++,K.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[v]=K.matrix,D.castShadow){const Q=e.get(D);Q.shadowIntensity=K.intensity,Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,n.spotShadow[v]=Q,n.spotShadowMap[v]=Y,E++}v++}else if(D.isRectAreaLight){const G=t.get(D);G.color.copy(F).multiplyScalar(V),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),n.rectArea[M]=G,M++}else if(D.isPointLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),G.distance=D.distance,G.decay=D.decay,D.castShadow){const K=D.shadow,Q=e.get(D);Q.shadowIntensity=K.intensity,Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,Q.shadowCameraNear=K.camera.near,Q.shadowCameraFar=K.camera.far,n.pointShadow[m]=Q,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=D.shadow.matrix,b++}n.point[m]=G,m++}else if(D.isHemisphereLight){const G=t.get(D);G.skyColor.copy(D.color).multiplyScalar(V),G.groundColor.copy(D.groundColor).multiplyScalar(V),n.hemi[_]=G,_++}}M>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const R=n.hash;(R.sunLength!==f||R.directionalLength!==g||R.pointLength!==m||R.spotLength!==v||R.rectAreaLength!==M||R.hemiLength!==_||R.numSunShadows!==p||R.numDirectionalShadows!==S||R.numPointShadows!==b||R.numSpotShadows!==E||R.numSpotMaps!==y||R.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=g,n.spot.length=v,n.rectArea.length=M,n.point.length=m,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+y-T,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,R.sunLength=f,R.directionalLength=g,R.pointLength=m,R.spotLength=v,R.rectAreaLength=M,R.hemiLength=_,R.numSunShadows=p,R.numDirectionalShadows=S,R.numPointShadows=b,R.numSpotShadows=E,R.numSpotMaps=y,R.numLightProbes=P,n.version=Rb++)}function c(l,h){let d=0,u=0,f=0,p=0,x=0,g=0;const m=h.matrixWorldInverse;for(let v=0,M=l.length;v<M;v++){const _=l[v];if(_.isSunLight){const S=n.sun[d];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),d++}else if(_.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),u++}else if(_.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const S=n.rectArea[x];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(_.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){const S=n.point[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){const S=n.hemi[g];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function vf(r){const t=new Ib(r),e=[],n=[],i=[];function s(u){d.camera=u,e.length=0,n.length=0,i.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function c(u){i.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Lb(r){let t=new WeakMap;function e(i,s=0){const a=t.get(i);let o;return a===void 0?(o=new vf(r),t.set(i,[o])):s>=a.length?(o=new vf(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Db=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ub=`uniform sampler2D shadow_pass;
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
}`,Nb=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Fb=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],yf=new Xt,Vr=new C,ih=new C;function Ob(r,t,e){let n=new Cs;const i=new it,s=new it,a=new ce,o=new pu,c=new mu,l={},h=e.maxTextureSize,d={[$i]:en,[en]:$i,[Pn]:Pn},u=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Db,fragmentShader:Ub}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new Vt;p.setAttribute("position",new we(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new jt(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jr;let m=this.type;this.render=function(b,E,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===kf&&(dt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Jr);const T=r.getRenderTarget(),P=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),I=r.state;I.setBlending(fi),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const U=m!==this.type;U&&E.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(F=>F.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,F=b.length;D<F;D++){const V=b[D],O=V.shadow;if(O===void 0){dt("WebGLShadowMap:",V,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const Y=O.getFrameExtents();i.multiply(Y),s.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Y.x),i.x=s.x*Y.x,O.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Y.y),i.y=s.y*Y.y,O.mapSize.y=s.y));const G=r.state.buffers.depth.getReversed();if(O.camera._reversedDepth=G,O.map===null||U===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===ir){if(V.isPointLight){dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Tn(i.x,i.y,{format:ji,type:Kn,minFilter:Re,magFilter:Re,generateMipmaps:!1}),O.map.texture.name=V.name+".shadowMap",O.map.depthTexture=new mr(i.x,i.y,_n),O.map.depthTexture.name=V.name+".shadowMapDepth",O.map.depthTexture.format=mi,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Oe,O.map.depthTexture.magFilter=Oe}else V.isPointLight?(O.map=new Cu(i.x),O.map.depthTexture=new Up(i.x,zn)):(O.map=new Tn(i.x,i.y),O.map.depthTexture=new mr(i.x,i.y,zn)),O.map.depthTexture.name=V.name+".shadowMap",O.map.depthTexture.format=mi,this.type===Jr?(O.map.depthTexture.compareFunction=G?Lc:Ic,O.map.depthTexture.minFilter=Re,O.map.depthTexture.magFilter=Re):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Oe,O.map.depthTexture.magFilter=Oe);O.camera.updateProjectionMatrix()}O.map.isWebGLCubeRenderTarget!==!0&&(O.map.width!==i.x||O.map.height!==i.y)&&O.map.setSize(i.x,i.y);const K=O.map.isWebGLCubeRenderTarget?6:O.getViewportCount();V.isPointLight!==!0&&O.updateMatrices(V,y);for(let Q=0;Q<K;Q++){const Nt=O.getCamera(Q);if(V.isPointLight){const Ct=O.camera,pe=O.matrix,se=V.distance||Ct.far;se!==Ct.far&&(Ct.far=se,Ct.updateProjectionMatrix()),Vr.setFromMatrixPosition(V.matrixWorld),Ct.position.copy(Vr),ih.copy(Ct.position),ih.add(Nb[Q]),Ct.up.copy(Fb[Q]),Ct.lookAt(ih),Ct.updateMatrixWorld(),pe.makeTranslation(-Vr.x,-Vr.y,-Vr.z),yf.multiplyMatrices(Ct.projectionMatrix,Ct.matrixWorldInverse),O._frustum.setFromProjectionMatrix(yf,Ct.coordinateSystem,Ct.reversedDepth)}if(O.map.isWebGLCubeRenderTarget)r.setRenderTarget(O.map,Q),r.clear();else{Q===0&&(r.setRenderTarget(O.map),r.clear());const Ct=O.getViewport(Q);a.set(s.x*Ct.x,s.y*Ct.y,s.x*Ct.z,s.y*Ct.w),I.viewport(a)}n=O.getFrustum(Q),_(E,y,Nt,V,this.type)}O.isPointLightShadow!==!0&&this.type===ir&&v(O,y),O.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(T,P,R)};function v(b,E){const y=t.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new Tn(i.x,i.y,{format:ji,type:Kn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(E,null,y,u,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(E,null,y,f,x,null)}function M(b,E,y,T){let P=null;const R=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)P=R;else if(P=y.isPointLight===!0?c:o,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const I=P.uuid,U=E.uuid;let D=l[I];D===void 0&&(D={},l[I]=D);let F=D[U];F===void 0&&(F=P.clone(),D[U]=F,E.addEventListener("dispose",S)),P=F}if(P.visible=E.visible,P.wireframe=E.wireframe,T===ir?P.side=E.shadowSide!==null?E.shadowSide:E.side:P.side=E.shadowSide!==null?E.shadowSide:d[E.side],P.alphaMap=E.alphaMap,P.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,P.map=E.map,P.clipShadows=E.clipShadows,P.clippingPlanes=E.clippingPlanes,P.clipIntersection=E.clipIntersection,P.displacementMap=E.displacementMap,P.displacementScale=E.displacementScale,P.displacementBias=E.displacementBias,P.wireframeLinewidth=E.wireframeLinewidth,P.linewidth=E.linewidth,y.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const I=r.properties.get(P);I.light=y}return P}function _(b,E,y,T,P){if(b.visible===!1)return;if(b.layers.test(E.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===ir)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);const U=t.update(b),D=b.material;if(Array.isArray(D)){const F=U.groups;for(let V=0,O=F.length;V<O;V++){const Y=F[V],G=D[Y.materialIndex];if(G&&G.visible){const K=M(b,G,T,P);b.onBeforeShadow(r,b,E,y,U,K,Y),r.renderBufferDirect(y,null,U,K,b,Y),b.onAfterShadow(r,b,E,y,U,K,Y)}}}else if(D.visible){const F=M(b,D,T,P);b.onBeforeShadow(r,b,E,y,U,F,null),r.renderBufferDirect(y,null,U,F,b,null),b.onAfterShadow(r,b,E,y,U,F,null)}}const I=b.children;for(let U=0,D=I.length;U<D;U++)_(I[U],E,y,T,P)}function S(b){b.target.removeEventListener("dispose",S);for(const y in l){const T=l[y],P=b.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function Bb(r,t){function e(){let z=!1;const mt=new ce;let j=null;const gt=new ce(0,0,0,0);return{setMask:function(St){j!==St&&!z&&(r.colorMask(St,St,St,St),j=St)},setLocked:function(St){z=St},setClear:function(St,st,Bt,It,Ee){Ee===!0&&(St*=It,st*=It,Bt*=It),mt.set(St,st,Bt,It),gt.equals(mt)===!1&&(r.clearColor(St,st,Bt,It),gt.copy(mt))},reset:function(){z=!1,j=null,gt.set(-1,0,0,0)}}}function n(){let z=!1,mt=!1,j=null,gt=null,St=null;return{setReversed:function(st){if(mt!==st){const Bt=t.get("EXT_clip_control");st?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),mt=st;const It=St;St=null,this.setClear(It)}},getReversed:function(){return mt},setTest:function(st){st?et(r.DEPTH_TEST):_t(r.DEPTH_TEST)},setMask:function(st){j!==st&&!z&&(r.depthMask(st),j=st)},setFunc:function(st){if(mt&&(st=tg[st]),gt!==st){switch(st){case Uo:r.depthFunc(r.NEVER);break;case No:r.depthFunc(r.ALWAYS);break;case Fo:r.depthFunc(r.LESS);break;case ur:r.depthFunc(r.LEQUAL);break;case Oo:r.depthFunc(r.EQUAL);break;case Bo:r.depthFunc(r.GEQUAL);break;case zo:r.depthFunc(r.GREATER);break;case Vo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}gt=st}},setLocked:function(st){z=st},setClear:function(st){St!==st&&(St=st,mt&&(st=1-st),r.clearDepth(st))},reset:function(){z=!1,j=null,gt=null,St=null,mt=!1}}}function i(){let z=!1,mt=null,j=null,gt=null,St=null,st=null,Bt=null,It=null,Ee=null;return{setTest:function(xe){z||(xe?et(r.STENCIL_TEST):_t(r.STENCIL_TEST))},setMask:function(xe){mt!==xe&&!z&&(r.stencilMask(xe),mt=xe)},setFunc:function(xe,Gn,ni){(j!==xe||gt!==Gn||St!==ni)&&(r.stencilFunc(xe,Gn,ni),j=xe,gt=Gn,St=ni)},setOp:function(xe,Gn,ni){(st!==xe||Bt!==Gn||It!==ni)&&(r.stencilOp(xe,Gn,ni),st=xe,Bt=Gn,It=ni)},setLocked:function(xe){z=xe},setClear:function(xe){Ee!==xe&&(r.clearStencil(xe),Ee=xe)},reset:function(){z=!1,mt=null,j=null,gt=null,St=null,st=null,Bt=null,It=null,Ee=null}}}const s=new e,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},d={},u={},f=new WeakMap,p=[],x=null,g=!1,m=null,v=null,M=null,_=null,S=null,b=null,E=null,y=new bt(0,0,0),T=0,P=!1,R=null,I=null,U=null,D=null,F=null;const V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,Y=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(G)[1]),O=Y>=1):G.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),O=Y>=2);let K=null,Q={};const Nt=r.getParameter(r.SCISSOR_BOX),Ct=r.getParameter(r.VIEWPORT),pe=new ce().fromArray(Nt),se=new ce().fromArray(Ct);function le(z,mt,j,gt){const St=new Uint8Array(4),st=r.createTexture();r.bindTexture(z,st),r.texParameteri(z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Bt=0;Bt<j;Bt++)z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY?r.texImage3D(mt,0,r.RGBA,1,1,gt,0,r.RGBA,r.UNSIGNED_BYTE,St):r.texImage2D(mt+Bt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,St);return st}const $={};$[r.TEXTURE_2D]=le(r.TEXTURE_2D,r.TEXTURE_2D,1),$[r.TEXTURE_CUBE_MAP]=le(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[r.TEXTURE_2D_ARRAY]=le(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),$[r.TEXTURE_3D]=le(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(r.DEPTH_TEST),a.setFunc(ur),ot(!1),ht(ph),et(r.CULL_FACE),rt(fi);function et(z){h[z]!==!0&&(r.enable(z),h[z]=!0)}function _t(z){h[z]!==!1&&(r.disable(z),h[z]=!1)}function Ht(z,mt){return u[z]!==mt?(r.bindFramebuffer(z,mt),u[z]=mt,z===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=mt),z===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=mt),!0):!1}function wt(z,mt){let j=p,gt=!1;if(z){j=f.get(mt),j===void 0&&(j=[],f.set(mt,j));const St=z.textures;if(j.length!==St.length||j[0]!==r.COLOR_ATTACHMENT0){for(let st=0,Bt=St.length;st<Bt;st++)j[st]=r.COLOR_ATTACHMENT0+st;j.length=St.length,gt=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,gt=!0);gt&&r.drawBuffers(j)}function qt(z){return x!==z?(r.useProgram(z),x=z,!0):!1}const Me={[Ms]:r.FUNC_ADD,[Hf]:r.FUNC_SUBTRACT,[Wf]:r.FUNC_REVERSE_SUBTRACT};Me[Xf]=r.MIN,Me[qf]=r.MAX;const nt={[Yf]:r.ZERO,[Zf]:r.ONE,[Jf]:r.SRC_COLOR,[Nh]:r.SRC_ALPHA,[ep]:r.SRC_ALPHA_SATURATE,[Qf]:r.DST_COLOR,[Kf]:r.DST_ALPHA,[$f]:r.ONE_MINUS_SRC_COLOR,[Fh]:r.ONE_MINUS_SRC_ALPHA,[tp]:r.ONE_MINUS_DST_COLOR,[jf]:r.ONE_MINUS_DST_ALPHA,[np]:r.CONSTANT_COLOR,[ip]:r.ONE_MINUS_CONSTANT_COLOR,[sp]:r.CONSTANT_ALPHA,[rp]:r.ONE_MINUS_CONSTANT_ALPHA};function rt(z,mt,j,gt,St,st,Bt,It,Ee,xe){if(z===fi){g===!0&&(_t(r.BLEND),g=!1);return}if(g===!1&&(et(r.BLEND),g=!0),z!==Gf){if(z!==m||xe!==P){if((v!==Ms||S!==Ms)&&(r.blendEquation(r.FUNC_ADD),v=Ms,S=Ms),xe)switch(z){case cr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mh:r.blendFunc(r.ONE,r.ONE);break;case gh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case xh:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ut("WebGLState: Invalid blending: ",z);break}else switch(z){case cr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mh:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case gh:Ut("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xh:Ut("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ut("WebGLState: Invalid blending: ",z);break}M=null,_=null,b=null,E=null,y.set(0,0,0),T=0,m=z,P=xe}return}St=St||mt,st=st||j,Bt=Bt||gt,(mt!==v||St!==S)&&(r.blendEquationSeparate(Me[mt],Me[St]),v=mt,S=St),(j!==M||gt!==_||st!==b||Bt!==E)&&(r.blendFuncSeparate(nt[j],nt[gt],nt[st],nt[Bt]),M=j,_=gt,b=st,E=Bt),(It.equals(y)===!1||Ee!==T)&&(r.blendColor(It.r,It.g,It.b,Ee),y.copy(It),T=Ee),m=z,P=!1}function at(z,mt){z.side===Pn?_t(r.CULL_FACE):et(r.CULL_FACE);let j=z.side===en;mt&&(j=!j),ot(j),z.blending===cr&&z.transparent===!1?rt(fi):rt(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const gt=z.stencilWrite;o.setTest(gt),gt&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),zt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?et(r.SAMPLE_ALPHA_TO_COVERAGE):_t(r.SAMPLE_ALPHA_TO_COVERAGE)}function ot(z){R!==z&&(z?r.frontFace(r.CW):r.frontFace(r.CCW),R=z)}function ht(z){z!==zf?(et(r.CULL_FACE),z!==I&&(z===ph?r.cullFace(r.BACK):z===Vf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):_t(r.CULL_FACE),I=z}function kt(z){z!==U&&(O&&r.lineWidth(z),U=z)}function zt(z,mt,j){z?(et(r.POLYGON_OFFSET_FILL),(D!==mt||F!==j)&&(D=mt,F=j,a.getReversed()&&(mt=-mt),r.polygonOffset(mt,j))):_t(r.POLYGON_OFFSET_FILL)}function Yt(z){z?et(r.SCISSOR_TEST):_t(r.SCISSOR_TEST)}function Kt(z){z===void 0&&(z=r.TEXTURE0+V-1),K!==z&&(r.activeTexture(z),K=z)}function N(z,mt,j){j===void 0&&(K===null?j=r.TEXTURE0+V-1:j=K);let gt=Q[j];gt===void 0&&(gt={type:void 0,texture:void 0},Q[j]=gt),(gt.type!==z||gt.texture!==mt)&&(K!==j&&(r.activeTexture(j),K=j),r.bindTexture(z,mt||$[z]),gt.type=z,gt.texture=mt)}function ge(){const z=Q[K];z!==void 0&&z.type!==void 0&&(r.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function re(){try{r.compressedTexImage2D(...arguments)}catch(z){Ut("WebGLState:",z)}}function L(){try{r.compressedTexImage3D(...arguments)}catch(z){Ut("WebGLState:",z)}}function w(){try{r.texSubImage2D(...arguments)}catch(z){Ut("WebGLState:",z)}}function k(){try{r.texSubImage3D(...arguments)}catch(z){Ut("WebGLState:",z)}}function X(){try{r.compressedTexSubImage2D(...arguments)}catch(z){Ut("WebGLState:",z)}}function Z(){try{r.compressedTexSubImage3D(...arguments)}catch(z){Ut("WebGLState:",z)}}function ct(){try{r.texStorage2D(...arguments)}catch(z){Ut("WebGLState:",z)}}function lt(){try{r.texStorage3D(...arguments)}catch(z){Ut("WebGLState:",z)}}function J(){try{r.texImage2D(...arguments)}catch(z){Ut("WebGLState:",z)}}function tt(){try{r.texImage3D(...arguments)}catch(z){Ut("WebGLState:",z)}}function ft(z){return d[z]!==void 0?d[z]:r.getParameter(z)}function Ft(z,mt){d[z]!==mt&&(r.pixelStorei(z,mt),d[z]=mt)}function xt(z){pe.equals(z)===!1&&(r.scissor(z.x,z.y,z.z,z.w),pe.copy(z))}function pt(z){se.equals(z)===!1&&(r.viewport(z.x,z.y,z.z,z.w),se.copy(z))}function Ot(z,mt){let j=l.get(mt);j===void 0&&(j=new WeakMap,l.set(mt,j));let gt=j.get(z);gt===void 0&&(gt=r.getUniformBlockIndex(mt,z.name),j.set(z,gt))}function Gt(z,mt){const gt=l.get(mt).get(z);c.get(mt)!==gt&&(r.uniformBlockBinding(mt,gt,z.__bindingPointIndex),c.set(mt,gt))}function Qt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},d={},K=null,Q={},u={},f=new WeakMap,p=[],x=null,g=!1,m=null,v=null,M=null,_=null,S=null,b=null,E=null,y=new bt(0,0,0),T=0,P=!1,R=null,I=null,U=null,D=null,F=null,pe.set(0,0,r.canvas.width,r.canvas.height),se.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:et,disable:_t,bindFramebuffer:Ht,drawBuffers:wt,useProgram:qt,setBlending:rt,setMaterial:at,setFlipSided:ot,setCullFace:ht,setLineWidth:kt,setPolygonOffset:zt,setScissorTest:Yt,activeTexture:Kt,bindTexture:N,unbindTexture:ge,compressedTexImage2D:re,compressedTexImage3D:L,texImage2D:J,texImage3D:tt,pixelStorei:Ft,getParameter:ft,updateUBOMapping:Ot,uniformBlockBinding:Gt,texStorage2D:ct,texStorage3D:lt,texSubImage2D:w,texSubImage3D:k,compressedTexSubImage2D:X,compressedTexSubImage3D:Z,scissor:xt,viewport:pt,reset:Qt}}function zb(r,t,e,n,i,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new it,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,w){return p?new OffscreenCanvas(L,w):xa("canvas")}function g(L,w,k){let X=1;const Z=re(L);if((Z.width>k||Z.height>k)&&(X=k/Math.max(Z.width,Z.height)),X<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const ct=Math.floor(X*Z.width),lt=Math.floor(X*Z.height);u===void 0&&(u=x(ct,lt));const J=w?x(ct,lt):u;return J.width=ct,J.height=lt,J.getContext("2d").drawImage(L,0,0,ct,lt),dt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ct+"x"+lt+")."),J}else return"data"in L&&dt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),L;return L}function m(L){return L.generateMipmaps}function v(L){r.generateMipmap(L)}function M(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(L,w,k,X,Z,ct=!1){if(L!==null){if(r[L]!==void 0)return r[L];dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let lt;X&&(lt=t.get("EXT_texture_norm16"),lt||dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=w;if(w===r.RED&&(k===r.FLOAT&&(J=r.R32F),k===r.HALF_FLOAT&&(J=r.R16F),k===r.UNSIGNED_BYTE&&(J=r.R8),k===r.UNSIGNED_SHORT&&lt&&(J=lt.R16_EXT),k===r.SHORT&&lt&&(J=lt.R16_SNORM_EXT)),w===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(J=r.R8UI),k===r.UNSIGNED_SHORT&&(J=r.R16UI),k===r.UNSIGNED_INT&&(J=r.R32UI),k===r.BYTE&&(J=r.R8I),k===r.SHORT&&(J=r.R16I),k===r.INT&&(J=r.R32I)),w===r.RG&&(k===r.FLOAT&&(J=r.RG32F),k===r.HALF_FLOAT&&(J=r.RG16F),k===r.UNSIGNED_BYTE&&(J=r.RG8),k===r.UNSIGNED_SHORT&&lt&&(J=lt.RG16_EXT),k===r.SHORT&&lt&&(J=lt.RG16_SNORM_EXT)),w===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(J=r.RG8UI),k===r.UNSIGNED_SHORT&&(J=r.RG16UI),k===r.UNSIGNED_INT&&(J=r.RG32UI),k===r.BYTE&&(J=r.RG8I),k===r.SHORT&&(J=r.RG16I),k===r.INT&&(J=r.RG32I)),w===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(J=r.RGB8UI),k===r.UNSIGNED_SHORT&&(J=r.RGB16UI),k===r.UNSIGNED_INT&&(J=r.RGB32UI),k===r.BYTE&&(J=r.RGB8I),k===r.SHORT&&(J=r.RGB16I),k===r.INT&&(J=r.RGB32I)),w===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(J=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(J=r.RGBA16UI),k===r.UNSIGNED_INT&&(J=r.RGBA32UI),k===r.BYTE&&(J=r.RGBA8I),k===r.SHORT&&(J=r.RGBA16I),k===r.INT&&(J=r.RGBA32I)),w===r.RGB&&(k===r.UNSIGNED_SHORT&&lt&&(J=lt.RGB16_EXT),k===r.SHORT&&lt&&(J=lt.RGB16_SNORM_EXT),k===r.UNSIGNED_INT_5_9_9_9_REV&&(J=r.RGB9_E5),k===r.UNSIGNED_INT_10F_11F_11F_REV&&(J=r.R11F_G11F_B10F)),w===r.RGBA){const tt=ct?ga:oe.getTransfer(Z);k===r.FLOAT&&(J=r.RGBA32F),k===r.HALF_FLOAT&&(J=r.RGBA16F),k===r.UNSIGNED_BYTE&&(J=tt===ye?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT&&lt&&(J=lt.RGBA16_EXT),k===r.SHORT&&lt&&(J=lt.RGBA16_SNORM_EXT),k===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function S(L,w){let k;return L?w===null||w===zn||w===fr?k=r.DEPTH24_STENCIL8:w===_n?k=r.DEPTH32F_STENCIL8:w===dr&&(k=r.DEPTH24_STENCIL8,dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===zn||w===fr?k=r.DEPTH_COMPONENT24:w===_n?k=r.DEPTH_COMPONENT32F:w===dr&&(k=r.DEPTH_COMPONENT16),k}function b(L,w){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Oe&&L.minFilter!==Re?Math.log2(Math.max(w.width,w.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?w.mipmaps.length:1}function E(L){const w=L.target;w.removeEventListener("dispose",E),T(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&d.delete(w)}function y(L){const w=L.target;w.removeEventListener("dispose",y),R(w)}function T(L){const w=n.get(L);if(w.__webglInit===void 0)return;const k=L.source,X=f.get(k);if(X){const Z=X[w.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&P(L),Object.keys(X).length===0&&f.delete(k)}n.remove(L)}function P(L){const w=n.get(L);r.deleteTexture(w.__webglTexture);const k=L.source,X=f.get(k);delete X[w.__cacheKey],a.memory.textures--}function R(L){const w=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(w.__webglFramebuffer[X]))for(let Z=0;Z<w.__webglFramebuffer[X].length;Z++)r.deleteFramebuffer(w.__webglFramebuffer[X][Z]);else r.deleteFramebuffer(w.__webglFramebuffer[X]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[X])}else{if(Array.isArray(w.__webglFramebuffer))for(let X=0;X<w.__webglFramebuffer.length;X++)r.deleteFramebuffer(w.__webglFramebuffer[X]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let X=0;X<w.__webglColorRenderbuffer.length;X++)w.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[X]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const k=L.textures;for(let X=0,Z=k.length;X<Z;X++){const ct=n.get(k[X]);ct.__webglTexture&&(r.deleteTexture(ct.__webglTexture),a.memory.textures--),n.remove(k[X])}n.remove(L)}let I=0;function U(){I=0}function D(){return I}function F(L){I=L}function V(){const L=I;return L>=i.maxTextures&&dt("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+i.maxTextures),I+=1,L}function O(L){const w=[];return w.push(L.wrapS),w.push(L.wrapT),w.push(L.wrapR||0),w.push(L.magFilter),w.push(L.minFilter),w.push(L.anisotropy),w.push(L.internalFormat),w.push(L.format),w.push(L.type),w.push(L.generateMipmaps),w.push(L.premultiplyAlpha),w.push(L.flipY),w.push(L.unpackAlignment),w.push(L.colorSpace),w.join()}function Y(L,w){const k=n.get(L);if(L.isVideoTexture&&N(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&k.__version!==L.version){const X=L.image;if(X===null)dt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)dt("WebGLRenderer: Texture marked for update but image is incomplete");else{_t(k,L,w);return}}else L.isExternalTexture&&(k.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+w)}function G(L,w){const k=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&k.__version!==L.version){_t(k,L,w);return}else L.isExternalTexture&&(k.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+w)}function K(L,w){const k=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&k.__version!==L.version){_t(k,L,w);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+w)}function Q(L,w){const k=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&k.__version!==L.version){Ht(k,L,w);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+w)}const Nt={[la]:r.REPEAT,[wn]:r.CLAMP_TO_EDGE,[ha]:r.MIRRORED_REPEAT},Ct={[Oe]:r.NEAREST,[Wh]:r.NEAREST_MIPMAP_NEAREST,[sr]:r.NEAREST_MIPMAP_LINEAR,[Re]:r.LINEAR,[jr]:r.LINEAR_MIPMAP_NEAREST,[hi]:r.LINEAR_MIPMAP_LINEAR},pe={[mp]:r.NEVER,[yp]:r.ALWAYS,[gp]:r.LESS,[Ic]:r.LEQUAL,[xp]:r.EQUAL,[Lc]:r.GEQUAL,[_p]:r.GREATER,[vp]:r.NOTEQUAL};function se(L,w){if(w.type===_n&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Re||w.magFilter===jr||w.magFilter===sr||w.magFilter===hi||w.minFilter===Re||w.minFilter===jr||w.minFilter===sr||w.minFilter===hi)&&dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,Nt[w.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,Nt[w.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,Nt[w.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,Ct[w.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,Ct[w.minFilter]),w.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,pe[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Oe||w.minFilter!==sr&&w.minFilter!==hi||w.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function le(L,w){let k=!1;L.__webglInit===void 0&&(L.__webglInit=!0,w.addEventListener("dispose",E));const X=w.source;let Z=f.get(X);Z===void 0&&(Z={},f.set(X,Z));const ct=O(w);if(ct!==L.__cacheKey){Z[ct]===void 0&&(Z[ct]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Z[ct].usedTimes++;const lt=Z[L.__cacheKey];lt!==void 0&&(Z[L.__cacheKey].usedTimes--,lt.usedTimes===0&&P(w)),L.__cacheKey=ct,L.__webglTexture=Z[ct].texture}return k}function $(L,w,k){return Math.floor(Math.floor(L/k)/w)}function et(L,w,k,X){const ct=L.updateRanges;if(ct.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,w.width,w.height,k,X,w.data);else{ct.sort((Ft,xt)=>Ft.start-xt.start);let lt=0;for(let Ft=1;Ft<ct.length;Ft++){const xt=ct[lt],pt=ct[Ft],Ot=xt.start+xt.count,Gt=$(pt.start,w.width,4),Qt=$(xt.start,w.width,4);pt.start<=Ot+1&&Gt===Qt&&$(pt.start+pt.count-1,w.width,4)===Gt?xt.count=Math.max(xt.count,pt.start+pt.count-xt.start):(++lt,ct[lt]=pt)}ct.length=lt+1;const J=e.getParameter(r.UNPACK_ROW_LENGTH),tt=e.getParameter(r.UNPACK_SKIP_PIXELS),ft=e.getParameter(r.UNPACK_SKIP_ROWS);e.pixelStorei(r.UNPACK_ROW_LENGTH,w.width);for(let Ft=0,xt=ct.length;Ft<xt;Ft++){const pt=ct[Ft],Ot=Math.floor(pt.start/4),Gt=Math.ceil(pt.count/4),Qt=Ot%w.width,z=Math.floor(Ot/w.width),mt=Gt,j=1;e.pixelStorei(r.UNPACK_SKIP_PIXELS,Qt),e.pixelStorei(r.UNPACK_SKIP_ROWS,z),e.texSubImage2D(r.TEXTURE_2D,0,Qt,z,mt,j,k,X,w.data)}L.clearUpdateRanges(),e.pixelStorei(r.UNPACK_ROW_LENGTH,J),e.pixelStorei(r.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(r.UNPACK_SKIP_ROWS,ft)}}function _t(L,w,k){let X=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(X=r.TEXTURE_3D);const Z=le(L,w),ct=w.source;e.bindTexture(X,L.__webglTexture,r.TEXTURE0+k);const lt=n.get(ct);if(ct.version!==lt.__version||Z===!0){if(e.activeTexture(r.TEXTURE0+k),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const j=oe.getPrimaries(oe.workingColorSpace),gt=w.colorSpace===wi?null:oe.getPrimaries(w.colorSpace),St=w.colorSpace===wi||j===gt?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment);let tt=g(w.image,!1,i.maxTextureSize);tt=ge(w,tt);const ft=s.convert(w.format,w.colorSpace),Ft=s.convert(w.type);let xt=_(w.internalFormat,ft,Ft,w.normalized,w.colorSpace,w.isVideoTexture);se(X,w);let pt;const Ot=w.mipmaps,Gt=w.isVideoTexture!==!0,Qt=lt.__version===void 0||Z===!0,z=ct.dataReady,mt=b(w,tt);if(w.isDepthTexture)xt=S(w.format===Zi,w.type),Qt&&(Gt?e.texStorage2D(r.TEXTURE_2D,1,xt,tt.width,tt.height):e.texImage2D(r.TEXTURE_2D,0,xt,tt.width,tt.height,0,ft,Ft,null));else if(w.isDataTexture)if(Ot.length>0){Gt&&Qt&&e.texStorage2D(r.TEXTURE_2D,mt,xt,Ot[0].width,Ot[0].height);for(let j=0,gt=Ot.length;j<gt;j++)pt=Ot[j],Gt?z&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,pt.width,pt.height,ft,Ft,pt.data):e.texImage2D(r.TEXTURE_2D,j,xt,pt.width,pt.height,0,ft,Ft,pt.data);w.generateMipmaps=!1}else Gt?(Qt&&e.texStorage2D(r.TEXTURE_2D,mt,xt,tt.width,tt.height),z&&et(w,tt,ft,Ft)):e.texImage2D(r.TEXTURE_2D,0,xt,tt.width,tt.height,0,ft,Ft,tt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Gt&&Qt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,xt,Ot[0].width,Ot[0].height,tt.depth);for(let j=0,gt=Ot.length;j<gt;j++)if(pt=Ot[j],w.format!==vn)if(ft!==null)if(Gt){if(z)if(w.layerUpdates.size>0){const St=Ah(pt.width,pt.height,w.format,w.type);for(const st of w.layerUpdates){const Bt=pt.data.subarray(st*St/pt.data.BYTES_PER_ELEMENT,(st+1)*St/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,st,pt.width,pt.height,1,ft,Bt)}}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,pt.width,pt.height,tt.depth,ft,pt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,xt,pt.width,pt.height,tt.depth,0,pt.data,0,0);else dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?z&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,pt.width,pt.height,tt.depth,ft,Ft,pt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,j,xt,pt.width,pt.height,tt.depth,0,ft,Ft,pt.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Gt&&Qt&&e.texStorage2D(r.TEXTURE_2D,mt,xt,Ot[0].width,Ot[0].height);for(let j=0,gt=Ot.length;j<gt;j++)pt=Ot[j],w.format!==vn?ft!==null?Gt?z&&e.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,pt.width,pt.height,ft,pt.data):e.compressedTexImage2D(r.TEXTURE_2D,j,xt,pt.width,pt.height,0,pt.data):dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?z&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,pt.width,pt.height,ft,Ft,pt.data):e.texImage2D(r.TEXTURE_2D,j,xt,pt.width,pt.height,0,ft,Ft,pt.data)}else if(w.isDataArrayTexture)if(Gt){if(Qt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,xt,tt.width,tt.height,tt.depth),z)if(w.layerUpdates.size>0){const j=Ah(tt.width,tt.height,w.format,w.type);for(const gt of w.layerUpdates){const St=tt.data.subarray(gt*j/tt.data.BYTES_PER_ELEMENT,(gt+1)*j/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,gt,tt.width,tt.height,1,ft,Ft,St)}w.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ft,Ft,tt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,xt,tt.width,tt.height,tt.depth,0,ft,Ft,tt.data);else if(w.isData3DTexture)Gt?(Qt&&e.texStorage3D(r.TEXTURE_3D,mt,xt,tt.width,tt.height,tt.depth),z&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ft,Ft,tt.data)):e.texImage3D(r.TEXTURE_3D,0,xt,tt.width,tt.height,tt.depth,0,ft,Ft,tt.data);else if(w.isFramebufferTexture){if(Qt)if(Gt)e.texStorage2D(r.TEXTURE_2D,mt,xt,tt.width,tt.height);else{let j=tt.width,gt=tt.height;for(let St=0;St<mt;St++)e.texImage2D(r.TEXTURE_2D,St,xt,j,gt,0,ft,Ft,null),j>>=1,gt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in r){const j=r.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),tt.parentNode!==j){j.appendChild(tt),d.add(w),j.onpaint=gt=>{const St=gt.changedElements;for(const st of d)St.includes(st.image)&&(st.needsUpdate=!0)},j.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,tt);else{const St=r.RGBA,st=r.RGBA,Bt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,St,st,Bt,tt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Ot.length>0){if(Gt&&Qt){const j=re(Ot[0]);e.texStorage2D(r.TEXTURE_2D,mt,xt,j.width,j.height)}for(let j=0,gt=Ot.length;j<gt;j++)pt=Ot[j],Gt?z&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,ft,Ft,pt):e.texImage2D(r.TEXTURE_2D,j,xt,ft,Ft,pt);w.generateMipmaps=!1}else if(Gt){if(Qt){const j=re(tt);e.texStorage2D(r.TEXTURE_2D,mt,xt,j.width,j.height)}z&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ft,Ft,tt)}else e.texImage2D(r.TEXTURE_2D,0,xt,ft,Ft,tt);m(w)&&v(X),lt.__version=ct.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function Ht(L,w,k){if(w.image.length!==6)return;const X=le(L,w),Z=w.source;e.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+k);const ct=n.get(Z);if(Z.version!==ct.__version||X===!0){e.activeTexture(r.TEXTURE0+k);const lt=oe.getPrimaries(oe.workingColorSpace),J=w.colorSpace===wi?null:oe.getPrimaries(w.colorSpace),tt=w.colorSpace===wi||lt===J?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);const ft=w.isCompressedTexture||w.image[0].isCompressedTexture,Ft=w.image[0]&&w.image[0].isDataTexture,xt=[];for(let st=0;st<6;st++)!ft&&!Ft?xt[st]=g(w.image[st],!0,i.maxCubemapSize):xt[st]=Ft?w.image[st].image:w.image[st],xt[st]=ge(w,xt[st]);const pt=xt[0],Ot=s.convert(w.format,w.colorSpace),Gt=s.convert(w.type),Qt=_(w.internalFormat,Ot,Gt,w.normalized,w.colorSpace),z=w.isVideoTexture!==!0,mt=ct.__version===void 0||X===!0,j=Z.dataReady;let gt=b(w,pt);se(r.TEXTURE_CUBE_MAP,w);let St;if(ft){z&&mt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,gt,Qt,pt.width,pt.height);for(let st=0;st<6;st++){St=xt[st].mipmaps;for(let Bt=0;Bt<St.length;Bt++){const It=St[Bt];w.format!==vn?Ot!==null?z?j&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Bt,0,0,It.width,It.height,Ot,It.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Bt,Qt,It.width,It.height,0,It.data):dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?j&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Bt,0,0,It.width,It.height,Ot,Gt,It.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Bt,Qt,It.width,It.height,0,Ot,Gt,It.data)}}}else{if(St=w.mipmaps,z&&mt){St.length>0&&gt++;const st=re(xt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,gt,Qt,st.width,st.height)}for(let st=0;st<6;st++)if(Ft){z?j&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,xt[st].width,xt[st].height,Ot,Gt,xt[st].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Qt,xt[st].width,xt[st].height,0,Ot,Gt,xt[st].data);for(let Bt=0;Bt<St.length;Bt++){const Ee=St[Bt].image[st].image;z?j&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Bt+1,0,0,Ee.width,Ee.height,Ot,Gt,Ee.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Bt+1,Qt,Ee.width,Ee.height,0,Ot,Gt,Ee.data)}}else{z?j&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Ot,Gt,xt[st]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Qt,Ot,Gt,xt[st]);for(let Bt=0;Bt<St.length;Bt++){const It=St[Bt];z?j&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Bt+1,0,0,Ot,Gt,It.image[st]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Bt+1,Qt,Ot,Gt,It.image[st])}}}m(w)&&v(r.TEXTURE_CUBE_MAP),ct.__version=Z.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function wt(L,w,k,X,Z,ct){const lt=s.convert(k.format,k.colorSpace),J=s.convert(k.type),tt=_(k.internalFormat,lt,J,k.normalized,k.colorSpace),ft=n.get(w),Ft=n.get(k);if(Ft.__renderTarget=w,!ft.__hasExternalTextures){const xt=Math.max(1,w.width>>ct),pt=Math.max(1,w.height>>ct);Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?e.texImage3D(Z,ct,tt,xt,pt,w.depth,0,lt,J,null):e.texImage2D(Z,ct,tt,xt,pt,0,lt,J,null)}e.bindFramebuffer(r.FRAMEBUFFER,L),Kt(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,Z,Ft.__webglTexture,0,Yt(w)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,Z,Ft.__webglTexture,ct),e.bindFramebuffer(r.FRAMEBUFFER,null)}function qt(L,w,k){if(r.bindRenderbuffer(r.RENDERBUFFER,L),w.depthBuffer){const X=w.depthTexture,Z=X&&X.isDepthTexture?X.type:null,ct=S(w.stencilBuffer,Z),lt=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Kt(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Yt(w),ct,w.width,w.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,Yt(w),ct,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,ct,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,lt,r.RENDERBUFFER,L)}else{const X=w.textures;for(let Z=0;Z<X.length;Z++){const ct=X[Z],lt=s.convert(ct.format,ct.colorSpace),J=s.convert(ct.type),tt=_(ct.internalFormat,lt,J,ct.normalized,ct.colorSpace);Kt(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Yt(w),tt,w.width,w.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,Yt(w),tt,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,tt,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Me(L,w,k){const X=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(r.FRAMEBUFFER,L),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(w.depthTexture);if(Z.__renderTarget=w,(!Z.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),X){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,w.depthTexture.addEventListener("dispose",E)),Z.__webglTexture===void 0){Z.__webglTexture=r.createTexture(),e.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),se(r.TEXTURE_CUBE_MAP,w.depthTexture);const ft=s.convert(w.depthTexture.format),Ft=s.convert(w.depthTexture.type);let xt;w.depthTexture.format===mi?xt=r.DEPTH_COMPONENT24:w.depthTexture.format===Zi&&(xt=r.DEPTH24_STENCIL8);for(let pt=0;pt<6;pt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,xt,w.width,w.height,0,ft,Ft,null)}}else Y(w.depthTexture,0);const ct=Z.__webglTexture,lt=Yt(w),J=X?r.TEXTURE_CUBE_MAP_POSITIVE_X+k:r.TEXTURE_2D,tt=w.depthTexture.format===Zi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(w.depthTexture.format===mi)Kt(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,tt,J,ct,0,lt):r.framebufferTexture2D(r.FRAMEBUFFER,tt,J,ct,0);else if(w.depthTexture.format===Zi)Kt(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,tt,J,ct,0,lt):r.framebufferTexture2D(r.FRAMEBUFFER,tt,J,ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(L){const w=n.get(L),k=L.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==L.depthTexture){const X=L.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),X){const Z=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,X.removeEventListener("dispose",Z)};X.addEventListener("dispose",Z),w.__depthDisposeCallback=Z}w.__boundDepthTexture=X}if(L.depthTexture&&!w.__autoAllocateDepthBuffer)if(k)for(let X=0;X<6;X++)Me(w.__webglFramebuffer[X],L,X);else{const X=L.texture.mipmaps;X&&X.length>0?Me(w.__webglFramebuffer[0],L,0):Me(w.__webglFramebuffer,L,0)}else if(k){w.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[X]),w.__webglDepthbuffer[X]===void 0)w.__webglDepthbuffer[X]=r.createRenderbuffer(),qt(w.__webglDepthbuffer[X],L,!1);else{const Z=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ct=w.__webglDepthbuffer[X];r.bindRenderbuffer(r.RENDERBUFFER,ct),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,ct)}}else{const X=L.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),qt(w.__webglDepthbuffer,L,!1);else{const Z=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ct=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ct),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,ct)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function rt(L,w,k){const X=n.get(L);w!==void 0&&wt(X.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&nt(L)}function at(L){const w=L.texture,k=n.get(L),X=n.get(w);L.addEventListener("dispose",y);const Z=L.textures,ct=L.isWebGLCubeRenderTarget===!0,lt=Z.length>1;if(lt||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=w.version,a.memory.textures++),ct){k.__webglFramebuffer=[];for(let J=0;J<6;J++)if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer[J]=[];for(let tt=0;tt<w.mipmaps.length;tt++)k.__webglFramebuffer[J][tt]=r.createFramebuffer()}else k.__webglFramebuffer[J]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer=[];for(let J=0;J<w.mipmaps.length;J++)k.__webglFramebuffer[J]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(lt)for(let J=0,tt=Z.length;J<tt;J++){const ft=n.get(Z[J]);ft.__webglTexture===void 0&&(ft.__webglTexture=r.createTexture(),a.memory.textures++)}if(L.samples>0&&Kt(L)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let J=0;J<Z.length;J++){const tt=Z[J];k.__webglColorRenderbuffer[J]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[J]);const ft=s.convert(tt.format,tt.colorSpace),Ft=s.convert(tt.type),xt=_(tt.internalFormat,ft,Ft,tt.normalized,tt.colorSpace,L.isXRRenderTarget===!0),pt=Yt(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,pt,xt,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.RENDERBUFFER,k.__webglColorRenderbuffer[J])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),qt(k.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ct){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),se(r.TEXTURE_CUBE_MAP,w);for(let J=0;J<6;J++)if(w.mipmaps&&w.mipmaps.length>0)for(let tt=0;tt<w.mipmaps.length;tt++)wt(k.__webglFramebuffer[J][tt],L,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+J,tt);else wt(k.__webglFramebuffer[J],L,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(w)&&v(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let J=0,tt=Z.length;J<tt;J++){const ft=Z[J],Ft=n.get(ft);let xt=r.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(xt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(xt,Ft.__webglTexture),se(xt,ft),wt(k.__webglFramebuffer,L,ft,r.COLOR_ATTACHMENT0+J,xt,0),m(ft)&&v(xt)}e.unbindTexture()}else{let J=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(J=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(J,X.__webglTexture),se(J,w),w.mipmaps&&w.mipmaps.length>0)for(let tt=0;tt<w.mipmaps.length;tt++)wt(k.__webglFramebuffer[tt],L,w,r.COLOR_ATTACHMENT0,J,tt);else wt(k.__webglFramebuffer,L,w,r.COLOR_ATTACHMENT0,J,0);m(w)&&v(J),e.unbindTexture()}L.depthBuffer&&nt(L)}function ot(L){const w=L.textures;for(let k=0,X=w.length;k<X;k++){const Z=w[k];if(m(Z)){const ct=M(L),lt=n.get(Z).__webglTexture;e.bindTexture(ct,lt),v(ct),e.unbindTexture()}}}const ht=[],kt=[];function zt(L){if(L.samples>0){if(Kt(L)===!1){const w=L.textures,k=L.width,X=L.height;let Z=r.COLOR_BUFFER_BIT;const ct=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=n.get(L),J=w.length>1;if(J)for(let ft=0;ft<w.length;ft++)e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const tt=L.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ft=0;ft<w.length;ft++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),J){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,lt.__webglColorRenderbuffer[ft]);const Ft=n.get(w[ft]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ft,0)}r.blitFramebuffer(0,0,k,X,0,0,k,X,Z,r.NEAREST),c===!0&&(ht.length=0,kt.length=0,ht.push(r.COLOR_ATTACHMENT0+ft),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(ht.push(ct),kt.push(ct),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,kt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ht))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),J)for(let ft=0;ft<w.length;ft++){e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,lt.__webglColorRenderbuffer[ft]);const Ft=n.get(w[ft]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,Ft,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){const w=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function Yt(L){return Math.min(i.maxSamples,L.samples)}function Kt(L){const w=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function N(L){const w=a.render.frame;h.get(L)!==w&&(h.set(L,w),L.update())}function ge(L,w){const k=L.colorSpace,X=L.format,Z=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||k!==ma&&k!==wi&&(oe.getTransfer(k)===ye?(X!==vn||Z!==bn)&&dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ut("WebGLTextures: Unsupported texture color space:",k)),w}function re(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=U,this.getTextureUnits=D,this.setTextureUnits=F,this.setTexture2D=Y,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=Q,this.rebindTextures=rt,this.setupRenderTarget=at,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=Kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Rm(r,t){function e(n,i=wi){let s;const a=oe.getTransfer(i);if(n===bn)return r.UNSIGNED_BYTE;if(n===Tc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Ec)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Yh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Zh)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Xh)return r.BYTE;if(n===qh)return r.SHORT;if(n===dr)return r.UNSIGNED_SHORT;if(n===wc)return r.INT;if(n===zn)return r.UNSIGNED_INT;if(n===_n)return r.FLOAT;if(n===Kn)return r.HALF_FLOAT;if(n===Jh)return r.ALPHA;if(n===$h)return r.RGB;if(n===vn)return r.RGBA;if(n===mi)return r.DEPTH_COMPONENT;if(n===Zi)return r.DEPTH_STENCIL;if(n===Ac)return r.RED;if(n===Ta)return r.RED_INTEGER;if(n===ji)return r.RG;if(n===Cc)return r.RG_INTEGER;if(n===Rc)return r.RGBA_INTEGER;if(n===Qr||n===ta||n===ea||n===na)if(a===ye)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Qr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===na)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Qr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ta)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===na)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ko||n===Go||n===Ho||n===Wo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ko)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Go)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ho)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xo||n===qo||n===Yo||n===Zo||n===Jo||n===ua||n===$o)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Xo||n===qo)return a===ye?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Yo)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Zo)return s.COMPRESSED_R11_EAC;if(n===Jo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ua)return s.COMPRESSED_RG11_EAC;if(n===$o)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ko||n===jo||n===Qo||n===tc||n===ec||n===nc||n===ic||n===sc||n===rc||n===ac||n===oc||n===cc||n===lc||n===hc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ko)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jo)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qo)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===tc)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ec)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===nc)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ic)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sc)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===rc)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ac)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===oc)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===cc)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===lc)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hc)return a===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===uc||n===dc||n===fc)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===uc)return a===ye?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pc||n===mc||n===da||n===gc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===pc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===mc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===da)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}const Vb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kb=`
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

}`;class Gb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new su(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new En({vertexShader:Vb,fragmentShader:kb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new jt(new is(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hb extends Qn{constructor(t,e){super();const n=this;let i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,p=null;const x=typeof XRWebGLBinding<"u",g=new Gb,m={},v=e.getContextAttributes();let M=null,_=null;const S=[],b=[],E=new it;let y=null,T=null;const P=new Ge;P.viewport=new ce;const R=new Ge;R.viewport=new ce;const I=[P,R],U=new gm;let D=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let et=S[$];return et===void 0&&(et=new Lo,S[$]=et),et.getTargetRaySpace()},this.getControllerGrip=function($){let et=S[$];return et===void 0&&(et=new Lo,S[$]=et),et.getGripSpace()},this.getHand=function($){let et=S[$];return et===void 0&&(et=new Lo,S[$]=et),et.getHandSpace()};function V($){const et=b.indexOf($.inputSource);if(et===-1)return;const _t=S[et];_t!==void 0&&(_t.update($.inputSource,$.frame,l||a),_t.dispatchEvent({type:$.type,data:$.inputSource}))}function O(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",Y);for(let $=0;$<S.length;$++){const et=b[$];et!==null&&(b[$]=null,S[$].disconnect(et))}D=null,F=null,g.reset();for(const $ in m)delete m[$];if(t.setRenderTarget(M),f=null,u=null,d=null,i=null,_=null,le.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(E.width,E.height,!1),T!==null){const $=T.camera;$.fov=T.fov,$.zoom=T.zoom,$.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(M=t.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",O),i.addEventListener("inputsourceschange",Y),v.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Ht=null,wt=null;v.depth&&(wt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=v.stencil?Zi:mi,Ht=v.stencil?fr:zn);const qt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(qt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new Tn(u.textureWidth,u.textureHeight,{format:vn,type:bn,depthTexture:new mr(u.textureWidth,u.textureHeight,Ht,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const _t={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,_t),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Tn(f.framebufferWidth,f.framebufferHeight,{format:vn,type:bn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),le.setContext(i),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y($){for(let et=0;et<$.removed.length;et++){const _t=$.removed[et],Ht=b.indexOf(_t);Ht>=0&&(b[Ht]=null,S[Ht].disconnect(_t))}for(let et=0;et<$.added.length;et++){const _t=$.added[et];let Ht=b.indexOf(_t);if(Ht===-1){for(let qt=0;qt<S.length;qt++)if(qt>=b.length){b.push(_t),Ht=qt;break}else if(b[qt]===null){b[qt]=_t,Ht=qt;break}if(Ht===-1)break}const wt=S[Ht];wt&&wt.connect(_t)}}const G=new C,K=new C;function Q($,et,_t){G.setFromMatrixPosition(et.matrixWorld),K.setFromMatrixPosition(_t.matrixWorld);const Ht=G.distanceTo(K),wt=et.projectionMatrix.elements,qt=_t.projectionMatrix.elements,Me=wt[14]/(wt[10]-1),nt=wt[14]/(wt[10]+1),rt=(wt[9]+1)/wt[5],at=(wt[9]-1)/wt[5],ot=(wt[8]-1)/wt[0],ht=(qt[8]+1)/qt[0],kt=Me*ot,zt=Me*ht,Yt=Ht/(-ot+ht),Kt=Yt*-ot;if(et.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Kt),$.translateZ(Yt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),wt[10]===-1)$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const N=Me+Yt,ge=nt+Yt,re=kt-Kt,L=zt+(Ht-Kt),w=rt*nt/ge*N,k=at*nt/ge*N;$.projectionMatrix.makePerspective(re,L,w,k,N,ge),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Nt($,et){et===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(et.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let et=$.near,_t=$.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(_t=g.depthFar)),U.near=R.near=P.near=et,U.far=R.far=P.far=_t,(D!==U.near||F!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),D=U.near,F=U.far),U.layers.mask=$.layers.mask|6,P.layers.mask=U.layers.mask&-5,R.layers.mask=U.layers.mask&-3;const Ht=$.parent,wt=U.cameras;Nt(U,Ht);for(let qt=0;qt<wt.length;qt++)Nt(wt[qt],Ht);wt.length===2?Q(U,P,R):U.projectionMatrix.copy(P.projectionMatrix),T===null&&$.isPerspectiveCamera&&(T={camera:$,fov:$.fov,zoom:$.zoom}),Ct($,U,Ht)};function Ct($,et,_t){_t===null?$.matrix.copy(et.matrixWorld):($.matrix.copy(_t.matrixWorld),$.matrix.invert(),$.matrix.multiply(et.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=pr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function($){return m[$]};let pe=null;function se($,et){if(h=et.getViewerPose(l||a),p=et,h!==null){const _t=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Ht=!1;_t.length!==U.cameras.length&&(U.cameras.length=0,Ht=!0);for(let nt=0;nt<_t.length;nt++){const rt=_t[nt];let at=null;if(f!==null)at=f.getViewport(rt);else{const ht=d.getViewSubImage(u,rt);at=ht.viewport,nt===0&&(t.setRenderTargetTextures(_,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(_))}let ot=I[nt];ot===void 0&&(ot=new Ge,ot.layers.enable(nt),ot.viewport=new ce,I[nt]=ot),ot.matrix.fromArray(rt.transform.matrix),ot.matrix.decompose(ot.position,ot.quaternion,ot.scale),ot.projectionMatrix.fromArray(rt.projectionMatrix),ot.projectionMatrixInverse.copy(ot.projectionMatrix).invert(),ot.viewport.set(at.x,at.y,at.width,at.height),nt===0&&(U.matrix.copy(ot.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ht===!0&&U.cameras.push(ot)}const wt=i.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const nt=d.getDepthInformation(_t[0]);nt&&nt.isValid&&nt.texture&&g.init(nt,i.renderState)}if(wt&&wt.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let nt=0;nt<_t.length;nt++){const rt=_t[nt].camera;if(rt){let at=m[rt];at||(at=new su,m[rt]=at);const ot=d.getCameraImage(rt);at.sourceTexture=ot}}}}for(let _t=0;_t<S.length;_t++){const Ht=b[_t],wt=S[_t];Ht!==null&&wt!==void 0&&wt.update(Ht,et,l||a)}pe&&pe($,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),p=null}const le=new bm;le.setAnimationLoop(se),this.setAnimationLoop=function($){pe=$},this.dispose=function(){}}}const Wb=new Xt,Pm=new $t;Pm.set(-1,0,0,0,1,0,0,0,1);function Xb(r,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Xp(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,M,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,_)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),x(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,v,M):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===en&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===en&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=t.get(m),M=v.envMap,_=v.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(Wb.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Pm),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,v,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=M*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===en&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const v=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function qb(r,t,e,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,S){const b=S.program;n.uniformBlockBinding(_,b)}function l(_,S){let b=i[_.id];b===void 0&&(g(_),b=h(_),i[_.id]=b,_.addEventListener("dispose",v));const E=S.program;n.updateUBOMapping(_,E);const y=t.render.frame;s[_.id]!==y&&(u(_),s[_.id]=y)}function h(_){const S=d();_.__bindingPointIndex=S;const b=r.createBuffer(),E=_.__size,y=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,E,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,b),b}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ut("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const S=i[_.id],b=_.uniforms,E=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let y=0,T=b.length;y<T;y++){const P=b[y];if(Array.isArray(P))for(let R=0,I=P.length;R<I;R++)f(P[R],y,R,E);else f(P,y,0,E)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,S,b,E){if(x(_,S,b,E)===!0){const y=_.__offset,T=_.value;if(Array.isArray(T)){let P=0;for(let R=0;R<T.length;R++){const I=T[R],U=m(I);p(I,_.__data,P),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(P+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,_.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,y,_.__data)}}function p(_,S,b){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,b)}function x(_,S,b,E){const y=_.value,T=S+"_"+b;if(E[T]===void 0)return typeof y=="number"||typeof y=="boolean"?E[T]=y:ArrayBuffer.isView(y)?E[T]=y.slice():E[T]=y.clone(),!0;{const P=E[T];if(typeof y=="number"||typeof y=="boolean"){if(P!==y)return E[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(P.equals(y)===!1)return P.copy(y),!0}}return!1}function g(_){const S=_.uniforms;let b=0;const E=16;for(let T=0,P=S.length;T<P;T++){const R=Array.isArray(S[T])?S[T]:[S[T]];for(let I=0,U=R.length;I<U;I++){const D=R[I],F=Array.isArray(D.value)?D.value:[D.value];for(let V=0,O=F.length;V<O;V++){const Y=F[V],G=m(Y),K=b%E,Q=K%G.boundary,Nt=K+Q;b+=Q,Nt!==0&&E-Nt<G.storage&&(b+=E-Nt),D.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=b,b+=G.storage}}}const y=b%E;return y>0&&(b+=E-y),_.__size=b,_.__cache={},this}function m(_){const S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):dt("WebGLRenderer: Unsupported uniform value type.",_),S}function v(_){const S=_.target;S.removeEventListener("dispose",v);const b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function M(){for(const _ in i)r.deleteBuffer(i[_]);a=[],i={},s={}}return{bind:c,update:l,dispose:M}}const Yb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ri=null;function Zb(){return ri===null&&(ri=new Bn(Yb,16,16,ji,Kn),ri.name="DFG_LUT",ri.minFilter=Re,ri.magFilter=Re,ri.wrapS=wn,ri.wrapT=wn,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}class Im{constructor(t={}){const{canvas:e=Sp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=bn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const x=f,g=new Set([Rc,Cc,Ta]),m=new Set([bn,zn,dr,fr,Tc,Ec]),v=new Uint32Array(4),M=new Int32Array(4),_=new C;let S=null,b=null;const E=[],y=[];let T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,I=null,U=null,D=null,F=null;this._outputColorSpace=tn;let V=0,O=0,Y=null,G=-1,K=null;const Q=new ce,Nt=new ce;let Ct=null;const pe=new bt(0);let se=0,le=e.width,$=e.height,et=1,_t=null,Ht=null;const wt=new ce(0,0,le,$),qt=new ce(0,0,le,$);let Me=!1;const nt=new Cs;let rt=!1,at=!1;const ot=new Xt,ht=new C,kt=new ce,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function Kt(){return Y===null?et:1}let N=n;function ge(A,B){return e.getContext(A,B)}let re,L,w,k,X,Z,ct,lt,J,tt,ft,Ft,xt,pt,Ot,Gt,Qt,z,mt,j,gt,St,st;try{const A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sc}`),e.addEventListener("webglcontextlost",Ee,!1),e.addEventListener("webglcontextrestored",xe,!1),e.addEventListener("webglcontextcreationerror",Gn,!1),N===null){const B="webgl2";if(N=ge(B,A),N===null)throw ge(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Bt()}catch(A){throw e.removeEventListener("webglcontextlost",Ee,!1),e.removeEventListener("webglcontextrestored",xe,!1),e.removeEventListener("webglcontextcreationerror",Gn,!1),Ut("WebGLRenderer: "+A.message),A}function Bt(){re=new JM(N),re.init(),gt=new Rm(N,re),L=new zM(N,re,t,gt),w=new Bb(N,re),L.reversedDepthBuffer&&u&&w.buffers.depth.setReversed(!0),U=N.createFramebuffer(),D=N.createFramebuffer(),F=N.createFramebuffer(),k=new jM(N),X=new wb,Z=new zb(N,re,w,X,L,gt,k),ct=new ZM(P),lt=new tv(N),St=new OM(N,lt),J=new $M(N,lt,k,St),tt=new tS(N,J,lt,St,k),z=new QM(N,L,Z),Ot=new VM(X),ft=new bb(P,ct,re,L,St,Ot),Ft=new Xb(P,X),xt=new Eb,pt=new Lb(re),Qt=new FM(P,ct,w,tt,p,c),Gt=new Ob(P,tt,L),st=new qb(N,k,L,w),mt=new BM(N,re,k),j=new KM(N,re,k),k.programs=ft.programs,P.capabilities=L,P.extensions=re,P.properties=X,P.renderLists=xt,P.shadowMap=Gt,P.state=w,P.info=k}x!==bn&&(T=new nS(x,e.width,e.height,o,i,s));const It=new Hb(P,N);this.xr=It,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const A=re.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=re.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(A){A!==void 0&&(et=A,this.setSize(le,$,!1))},this.getSize=function(A){return A.set(le,$)},this.setSize=function(A,B,q=!0){if(It.isPresenting){dt("WebGLRenderer: Can't change size while VR device is presenting.");return}le=A,$=B,e.width=Math.floor(A*et),e.height=Math.floor(B*et),q===!0&&(e.style.width=A+"px",e.style.height=B+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,A,B)},this.getDrawingBufferSize=function(A){return A.set(le*et,$*et).floor()},this.setDrawingBufferSize=function(A,B,q){le=A,$=B,et=q,e.width=Math.floor(A*q),e.height=Math.floor(B*q),this.setViewport(0,0,A,B)},this.setEffects=function(A){if(x===bn){Ut("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let B=0;B<A.length;B++)if(A[B].isOutputPass===!0){dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(Q)},this.getViewport=function(A){return A.copy(wt)},this.setViewport=function(A,B,q,H){A.isVector4?wt.set(A.x,A.y,A.z,A.w):wt.set(A,B,q,H),w.viewport(Q.copy(wt).multiplyScalar(et).round())},this.getScissor=function(A){return A.copy(qt)},this.setScissor=function(A,B,q,H){A.isVector4?qt.set(A.x,A.y,A.z,A.w):qt.set(A,B,q,H),w.scissor(Nt.copy(qt).multiplyScalar(et).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(A){w.setScissorTest(Me=A)},this.setOpaqueSort=function(A){_t=A},this.setTransparentSort=function(A){Ht=A},this.getClearColor=function(A){return A.copy(Qt.getClearColor())},this.setClearColor=function(){Qt.setClearColor(...arguments)},this.getClearAlpha=function(){return Qt.getClearAlpha()},this.setClearAlpha=function(){Qt.setClearAlpha(...arguments)},this.clear=function(A=!0,B=!0,q=!0){let H=0;if(A){let W=!1;if(Y!==null){const Mt=Y.texture.format;W=g.has(Mt)}if(W){const Mt=Y.texture.type,At=m.has(Mt),vt=Qt.getClearColor(),Rt=Qt.getClearAlpha(),Dt=vt.r,ne=vt.g,ae=vt.b;At?(v[0]=Dt,v[1]=ne,v[2]=ae,v[3]=Rt,N.clearBufferuiv(N.COLOR,0,v)):(M[0]=Dt,M[1]=ne,M[2]=ae,M[3]=Rt,N.clearBufferiv(N.COLOR,0,M))}else H|=N.COLOR_BUFFER_BIT}B&&(H|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){e.removeEventListener("webglcontextlost",Ee,!1),e.removeEventListener("webglcontextrestored",xe,!1),e.removeEventListener("webglcontextcreationerror",Gn,!1),Qt.dispose(),xt.dispose(),pt.dispose(),X.dispose(),ct.dispose(),tt.dispose(),St.dispose(),st.dispose(),ft.dispose(),It.dispose(),It.removeEventListener("sessionstart",Du),It.removeEventListener("sessionend",Uu),rs.stop()};function Ee(A){A.preventDefault(),_a("WebGLRenderer: Context Lost."),R=!0}function xe(){_a("WebGLRenderer: Context Restored."),R=!1;const A=k.autoReset,B=Gt.enabled,q=Gt.autoUpdate,H=Gt.needsUpdate,W=Gt.type;Bt(),k.autoReset=A,Gt.enabled=B,Gt.autoUpdate=q,Gt.needsUpdate=H,Gt.type=W}function Gn(A){Ut("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ni(A){const B=A.target;B.removeEventListener("dispose",ni),Jm(B)}function Jm(A){$m(A),X.remove(A)}function $m(A){const B=X.get(A).programs;B!==void 0&&(B.forEach(function(q){ft.releaseProgram(q)}),A.isShaderMaterial&&ft.releaseShaderCache(A))}this.renderBufferDirect=function(A,B,q,H,W,Mt){B===null&&(B=zt);const At=W.isMesh&&W.matrixWorld.determinantAffine()<0,vt=Qm(A,B,q,H,W);w.setMaterial(H,At);let Rt=q.index,Dt=1;if(H.wireframe===!0){if(Rt=J.getWireframeAttribute(q),Rt===void 0)return;Dt=2}const ne=q.drawRange,ae=q.attributes.position;let Pt=ne.start*Dt,_e=(ne.start+ne.count)*Dt;Mt!==null&&(Pt=Math.max(Pt,Mt.start*Dt),_e=Math.min(_e,(Mt.start+Mt.count)*Dt)),Rt!==null?(Pt=Math.max(Pt,0),_e=Math.min(_e,Rt.count)):ae!=null&&(Pt=Math.max(Pt,0),_e=Math.min(_e,ae.count));const Be=_e-Pt;if(Be<0||Be===1/0)return;St.setup(W,H,vt,q,Rt);let Ce,Te=mt;if(Rt!==null&&(Ce=lt.get(Rt),Te=j,Te.setIndex(Ce)),W.isMesh)H.wireframe===!0?(w.setLineWidth(H.wireframeLinewidth*Kt()),Te.setMode(N.LINES)):Te.setMode(N.TRIANGLES);else if(W.isLine){let rn=H.linewidth;rn===void 0&&(rn=1),w.setLineWidth(rn*Kt()),W.isLineSegments?Te.setMode(N.LINES):W.isLineLoop?Te.setMode(N.LINE_LOOP):Te.setMode(N.LINE_STRIP)}else W.isPoints?Te.setMode(N.POINTS):W.isSprite&&Te.setMode(N.TRIANGLES);if(W.isBatchedMesh)if(re.get("WEBGL_multi_draw"))Te.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const rn=W._multiDrawStarts,Et=W._multiDrawCounts,dn=W._multiDrawCount,he=Rt?lt.get(Rt).bytesPerElement:1,Fn=X.get(H).currentProgram.getUniforms();for(let ii=0;ii<dn;ii++)Fn.setValue(N,"_gl_DrawID",ii),Te.render(rn[ii]/he,Et[ii])}else if(W.isInstancedMesh)Te.renderInstances(Pt,Be,W.count);else if(q.isInstancedBufferGeometry){const rn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Et=Math.min(q.instanceCount,rn);Te.renderInstances(Pt,Be,Et)}else Te.render(Pt,Be)};function Lu(A,B,q,H){I!==null&&A.isNodeMaterial&&I.setObject(H,A),rt===!0&&Ot.setState(A,q,!1),A.transparent===!0&&A.side===Pn&&A.forceSinglePass===!1?(A.side=en,A.needsUpdate=!0,Ia(A,B,H),A.side=$i,A.needsUpdate=!0,Ia(A,B,H),A.side=Pn):Ia(A,B,H)}this.compile=function(A,B,q=null){q===null&&(q=A),I!==null&&I.renderStart(A,B,q),b=pt.get(q),b.init(B),y.push(b),q.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),A!==q&&A.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),b.setupLights(),I!==null&&I.updateLights(b.state.lightsArray),at=this.localClippingEnabled,rt=Ot.init(this.clippingPlanes,at),rt===!0&&Ot.setGlobalState(this.clippingPlanes,B),I!==null&&Gt.render(b.state.shadowsArray,q,B);const H=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Mt=W.material;if(Mt)if(Array.isArray(Mt))for(let At=0;At<Mt.length;At++){const vt=Mt[At];Lu(vt,q,B,W),H.add(vt)}else Lu(Mt,q,B,W),H.add(Mt)}),b=y.pop(),I!==null&&I.renderEnd(),H},this.compileAsync=function(A,B,q=null){const H=this.compile(A,B,q);return new Promise(W=>{function Mt(){if(H.forEach(function(At){const Rt=X.get(At).currentProgram;(Rt===void 0||Rt.isReady())&&H.delete(At)}),H.size===0){W(A);return}setTimeout(Mt,10)}re.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let pl=null;function Km(A){pl&&pl(A)}function Du(){rs.stop()}function Uu(){rs.start()}const rs=new bm;rs.setAnimationLoop(Km),typeof self<"u"&&rs.setContext(self),this.setAnimationLoop=function(A){pl=A,It.setAnimationLoop(A),A===null?rs.stop():rs.start()},It.addEventListener("sessionstart",Du),It.addEventListener("sessionend",Uu),this.render=function(A,B){if(B!==void 0&&B.isCamera!==!0){Ut("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;I!==null&&I.renderStart(A,B);const q=It.enabled===!0&&It.isPresenting===!0,H=T!==null&&(Y===null||q)&&T.begin(P,Y);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),It.enabled===!0&&It.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(It.cameraAutoUpdate===!0&&It.updateCamera(B),B=It.getCamera()),A.isScene===!0&&A.onBeforeRender(P,A,B,Y),b=pt.get(A,y.length),b.init(B),b.state.textureUnits=Z.getTextureUnits(),y.push(b),ot.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),nt.setFromProjectionMatrix(ot,Dn,B.reversedDepth),at=this.localClippingEnabled,rt=Ot.init(this.clippingPlanes,at),S=xt.get(A,E.length),S.init(),E.push(S),It.enabled===!0&&It.isPresenting===!0){const At=P.xr.getDepthSensingMesh();At!==null&&ml(At,B,-1/0,P.sortObjects)}ml(A,B,0,P.sortObjects),S.finish(),I!==null&&I.updateLights(b.state.lightsArray),P.sortObjects===!0&&S.sort(_t,Ht),Yt=It.enabled===!1||It.isPresenting===!1||It.hasDepthSensing()===!1,Yt&&Qt.addToRenderList(S,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),rt===!0&&Ot.beginShadows();const W=b.state.shadowsArray;if(Gt.render(W,A,B),rt===!0&&Ot.endShadows(),(H&&T.hasRenderPass())===!1){const At=S.opaque,vt=S.transmissive;if(b.setupLights(),B.isArrayCamera){const Rt=B.cameras;if(vt.length>0)for(let Dt=0,ne=Rt.length;Dt<ne;Dt++){const ae=Rt[Dt];Fu(At,vt,A,ae)}Yt&&Qt.render(A);for(let Dt=0,ne=Rt.length;Dt<ne;Dt++){const ae=Rt[Dt];Nu(S,A,ae,ae.viewport)}}else vt.length>0&&Fu(At,vt,A,B),Yt&&Qt.render(A),Nu(S,A,B)}Y!==null&&O===0&&(Z.updateMultisampleRenderTarget(Y),Z.updateRenderTargetMipmap(Y)),H&&T.end(P),A.isScene===!0&&A.onAfterRender(P,A,B),St.resetDefaultState(),G=-1,K=null,y.pop(),y.length>0?(b=y[y.length-1],Z.setTextureUnits(b.state.textureUnits),rt===!0&&Ot.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,E.pop(),E.length>0?S=E[E.length-1]:S=null,I!==null&&I.renderEnd()};function ml(A,B,q,H){if(A.visible===!1)return;if(A.layers.test(B.layers)){if(A.isGroup)q=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(B);else if(A.isLightProbeGrid)b.pushLightProbeGrid(A);else if(A.isLight)b.pushLight(A),A.castShadow&&b.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(nt)){H&&kt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ot);const At=tt.update(A),vt=A.material;vt.visible&&S.push(A,At,vt,q,kt.z,null,B)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(nt))){const At=tt.update(A),vt=A.material;if(H&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),kt.copy(A.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),kt.copy(At.boundingSphere.center)),kt.applyMatrix4(A.matrixWorld).applyMatrix4(ot)),Array.isArray(vt)){const Rt=At.groups;for(let Dt=0,ne=Rt.length;Dt<ne;Dt++){const ae=Rt[Dt],Pt=vt[ae.materialIndex];Pt&&Pt.visible&&S.push(A,At,Pt,q,kt.z,ae,B)}}else vt.visible&&S.push(A,At,vt,q,kt.z,null,B)}}const Mt=A.children;for(let At=0,vt=Mt.length;At<vt;At++)ml(Mt[At],B,q,H)}function Nu(A,B,q,H){const{opaque:W,transmissive:Mt,transparent:At}=A;b.setupLightsView(q),rt===!0&&Ot.setGlobalState(P.clippingPlanes,q),H&&w.viewport(Q.copy(H)),W.length>0&&Pa(W,B,q),Mt.length>0&&Pa(Mt,B,q),At.length>0&&Pa(At,B,q),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Fu(A,B,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[H.id]===void 0){const Pt=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[H.id]=new Tn(1,1,{generateMipmaps:!0,type:Pt?Kn:bn,minFilter:hi,samples:Math.max(4,L.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}const Mt=b.state.transmissionRenderTarget[H.id],At=H.viewport||Q;Mt.setSize(At.z*P.transmissionResolutionScale,At.w*P.transmissionResolutionScale);const vt=P.getRenderTarget(),Rt=P.getActiveCubeFace(),Dt=P.getActiveMipmapLevel();P.setRenderTarget(Mt),P.getClearColor(pe),se=P.getClearAlpha(),se<1&&P.setClearColor(16777215,.5),P.clear(),Yt&&Qt.render(q);const ne=P.toneMapping;P.toneMapping=$n;const ae=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),b.setupLightsView(H),rt===!0&&Ot.setGlobalState(P.clippingPlanes,H),Pa(A,q,H),Z.updateMultisampleRenderTarget(Mt),Z.updateRenderTargetMipmap(Mt),re.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let _e=0,Be=B.length;_e<Be;_e++){const Ce=B[_e],{object:Te,geometry:rn,material:Et,group:dn}=Ce;if(Et.side===Pn&&Te.layers.test(H.layers)){const he=Et.side;Et.side=en,Et.needsUpdate=!0,Ou(Te,q,H,rn,Et,dn),Et.side=he,Et.needsUpdate=!0,Pt=!0}}Pt===!0&&(Z.updateMultisampleRenderTarget(Mt),Z.updateRenderTargetMipmap(Mt))}P.setRenderTarget(vt,Rt,Dt),P.setClearColor(pe,se),ae!==void 0&&(H.viewport=ae),P.toneMapping=ne}function Pa(A,B,q){const H=B.isScene===!0?B.overrideMaterial:null;for(let W=0,Mt=A.length;W<Mt;W++){const At=A[W],{object:vt,geometry:Rt,group:Dt}=At;let ne=At.material;ne.allowOverride===!0&&H!==null&&(ne=H),vt.layers.test(q.layers)&&Ou(vt,B,q,Rt,ne,Dt)}}function Ou(A,B,q,H,W,Mt){I!==null&&W.isNodeMaterial&&I.setObject(A,W),A.onBeforeRender(P,B,q,H,W,Mt),A.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(P,B,q,H,A,Mt),W.transparent===!0&&W.side===Pn&&W.forceSinglePass===!1?(W.side=en,W.needsUpdate=!0,P.renderBufferDirect(q,B,H,W,A,Mt),W.side=$i,W.needsUpdate=!0,P.renderBufferDirect(q,B,H,W,A,Mt),W.side=Pn):P.renderBufferDirect(q,B,H,W,A,Mt),A.onAfterRender(P,B,q,H,W,Mt)}function Ia(A,B,q){B.isScene!==!0&&(B=zt);const H=X.get(A),W=b.state.lights,Mt=b.state.shadowsArray,At=W.state.version,vt=ft.getParameters(A,W.state,Mt,B,q,b.state.lightProbeGridArray),Rt=ft.getProgramCacheKey(vt);let Dt=H.programs;H.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?B.environment:null,H.fog=B.fog;const ne=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;H.envMap=ct.get(A.envMap||H.environment,ne),H.envMapRotation=H.environment!==null&&A.envMap===null?B.environmentRotation:A.envMapRotation,Dt===void 0&&(A.addEventListener("dispose",ni),Dt=new Map,H.programs=Dt);let ae=Dt.get(Rt);if(ae!==void 0){if(H.currentProgram===ae&&H.lightsStateVersion===At)return zu(A,vt),ae}else vt.uniforms=ft.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,q,vt),A.onBeforeCompile(vt,P),ae=ft.acquireProgram(vt,Rt),Dt.set(Rt,ae),H.uniforms=vt.uniforms;const Pt=H.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Pt.clippingPlanes=Ot.uniform),zu(A,vt),H.needsLights=e0(A),H.lightsStateVersion=At,H.needsLights&&(Pt.ambientLightColor.value=W.state.ambient,Pt.lightProbe.value=W.state.probe,Pt.sunLights.value=W.state.sun,Pt.sunLightShadows.value=W.state.sunShadow,Pt.directionalLights.value=W.state.directional,Pt.directionalLightShadows.value=W.state.directionalShadow,Pt.spotLights.value=W.state.spot,Pt.spotLightShadows.value=W.state.spotShadow,Pt.rectAreaLights.value=W.state.rectArea,Pt.ltc_1.value=W.state.rectAreaLTC1,Pt.ltc_2.value=W.state.rectAreaLTC2,Pt.pointLights.value=W.state.point,Pt.pointLightShadows.value=W.state.pointShadow,Pt.hemisphereLights.value=W.state.hemi,Pt.sunShadowMatrix.value=W.state.sunShadowMatrix,Pt.sunShadowCascade.value=W.state.sunShadowCascade,Pt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Pt.spotLightMatrix.value=W.state.spotLightMatrix,Pt.spotLightMap.value=W.state.spotLightMap,Pt.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=b.state.lightProbeGridArray.length>0,H.currentProgram=ae,H.uniformsList=null,ae}function Bu(A){if(A.uniformsList===null){const B=A.currentProgram.getUniforms();A.uniformsList=Do.seqWithValue(B.seq,A.uniforms)}return A.uniformsList}function zu(A,B){const q=X.get(A);q.outputColorSpace=B.outputColorSpace,q.batching=B.batching,q.batchingColor=B.batchingColor,q.instancing=B.instancing,q.instancingColor=B.instancingColor,q.instancingMorph=B.instancingMorph,q.skinning=B.skinning,q.morphTargets=B.morphTargets,q.morphNormals=B.morphNormals,q.morphColors=B.morphColors,q.morphTargetsCount=B.morphTargetsCount,q.numClippingPlanes=B.numClippingPlanes,q.numIntersection=B.numClipIntersection,q.vertexAlphas=B.vertexAlphas,q.vertexTangents=B.vertexTangents,q.toneMapping=B.toneMapping}function jm(A,B){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;_.setFromMatrixPosition(B.matrixWorld);for(let q=0,H=A.length;q<H;q++){const W=A[q];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function Qm(A,B,q,H,W){B.isScene!==!0&&(B=zt),Z.resetTextureUnits();const Mt=B.fog,At=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?B.environment:null,vt=Y===null?P.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:oe.workingColorSpace,Rt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Dt=ct.get(H.envMap||At,Rt),ne=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ae=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pt=!!q.morphAttributes.position,_e=!!q.morphAttributes.normal,Be=!!q.morphAttributes.color;let Ce=$n;H.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ce=P.toneMapping);const Te=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,rn=Te!==void 0?Te.length:0,Et=X.get(H),dn=b.state.lights;if(rt===!0&&(at===!0||A!==K)){const Ae=A===K&&H.id===G;Ot.setState(H,A,Ae)}let he=!1;H.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==dn.state.version||Et.outputColorSpace!==vt||W.isBatchedMesh&&Et.batching===!1||!W.isBatchedMesh&&Et.batching===!0||W.isBatchedMesh&&Et.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Et.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Et.instancing===!1||!W.isInstancedMesh&&Et.instancing===!0||W.isSkinnedMesh&&Et.skinning===!1||!W.isSkinnedMesh&&Et.skinning===!0||W.isInstancedMesh&&Et.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Et.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Et.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Et.instancingMorph===!1&&W.morphTexture!==null||Et.envMap!==Dt||H.fog===!0&&Et.fog!==Mt||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==Ot.numPlanes||Et.numIntersection!==Ot.numIntersection)||Et.vertexAlphas!==ne||Et.vertexTangents!==ae||Et.morphTargets!==Pt||Et.morphNormals!==_e||Et.morphColors!==Be||Et.toneMapping!==Ce||Et.morphTargetsCount!==rn||!!Et.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,Et.__version=H.version);let Fn=Et.currentProgram;he===!0&&(Fn=Ia(H,B,W),I&&H.isNodeMaterial&&I.onUpdateProgram(H,Fn,Et));let ii=!1,Oi=!1,Ds=!1;const be=Fn.getUniforms(),Ne=Et.uniforms;if(w.useProgram(Fn.program)&&(ii=!0,Oi=!0,Ds=!0),H.id!==G&&(G=H.id,Oi=!0),Et.needsLights){const Ae=jm(b.state.lightProbeGridArray,W);Et.lightProbeGrid!==Ae&&(Et.lightProbeGrid=Ae,Oi=!0)}if(ii||K!==A){w.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),be.setValue(N,"projectionMatrix",A.projectionMatrix),be.setValue(N,"viewMatrix",A.matrixWorldInverse);const zi=be.map.cameraPosition;zi!==void 0&&zi.setValue(N,ht.setFromMatrixPosition(A.matrixWorld)),L.logarithmicDepthBuffer&&be.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&be.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),K!==A&&(K=A,Oi=!0,Ds=!0)}if(Et.needsLights&&(dn.state.sunShadowMap.length>0&&be.setValue(N,"sunShadowMap",dn.state.sunShadowMap,Z),dn.state.directionalShadowMap.length>0&&be.setValue(N,"directionalShadowMap",dn.state.directionalShadowMap,Z),dn.state.spotShadowMap.length>0&&be.setValue(N,"spotShadowMap",dn.state.spotShadowMap,Z),dn.state.pointShadowMap.length>0&&be.setValue(N,"pointShadowMap",dn.state.pointShadowMap,Z)),W.isSkinnedMesh){be.setOptional(N,W,"bindMatrix"),be.setOptional(N,W,"bindMatrixInverse");const Ae=W.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),be.setValue(N,"boneTexture",Ae.boneTexture,Z))}W.isBatchedMesh&&(be.setOptional(N,W,"batchingTexture"),be.setValue(N,"batchingTexture",W._matricesTexture,Z),be.setOptional(N,W,"batchingIdTexture"),be.setValue(N,"batchingIdTexture",W._indirectTexture,Z),be.setOptional(N,W,"batchingColorTexture"),W._colorsTexture!==null&&be.setValue(N,"batchingColorTexture",W._colorsTexture,Z));const Bi=q.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&z.update(W,q,Fn),(Oi||Et.receiveShadow!==W.receiveShadow)&&(Et.receiveShadow=W.receiveShadow,be.setValue(N,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&B.environment!==null&&(Ne.envMapIntensity.value=B.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=Zb()),Oi){if(be.setValue(N,"toneMappingExposure",P.toneMappingExposure),Et.needsLights&&t0(Ne,Ds),Mt&&H.fog===!0&&Ft.refreshFogUniforms(Ne,Mt),Ft.refreshMaterialUniforms(Ne,H,et,$,b.state.transmissionRenderTarget[A.id]),Et.needsLights&&Et.lightProbeGrid){const Ae=Et.lightProbeGrid;Ne.probesSH.value=Ae.texture,Ne.probesMin.value.copy(Ae.boundingBox.min),Ne.probesMax.value.copy(Ae.boundingBox.max),Ne.probesResolution.value.copy(Ae.resolution)}Do.upload(N,Bu(Et),Ne,Z)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Do.upload(N,Bu(Et),Ne,Z),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&be.setValue(N,"center",W.center),be.setValue(N,"modelViewMatrix",W.modelViewMatrix),be.setValue(N,"normalMatrix",W.normalMatrix),be.setValue(N,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){const Ae=H.uniformsGroups;for(let zi=0,Us=Ae.length;zi<Us;zi++){const ku=Ae[zi];st.update(ku,Fn),st.bind(ku,Fn)}}return Fn}function t0(A,B){A.ambientLightColor.needsUpdate=B,A.lightProbe.needsUpdate=B,A.sunLights.needsUpdate=B,A.sunLightShadows.needsUpdate=B,A.directionalLights.needsUpdate=B,A.directionalLightShadows.needsUpdate=B,A.pointLights.needsUpdate=B,A.pointLightShadows.needsUpdate=B,A.spotLights.needsUpdate=B,A.spotLightShadows.needsUpdate=B,A.rectAreaLights.needsUpdate=B,A.hemisphereLights.needsUpdate=B}function e0(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(A,B,q){const H=X.get(A);H.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),X.get(A.texture).__webglTexture=B,X.get(A.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,B){const q=X.get(A);q.__webglFramebuffer=B,q.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(A,B=0,q=0){Y=A,V=B,O=q;let H=null,W=!1,Mt=!1;if(A){const vt=X.get(A);if(vt.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(N.FRAMEBUFFER,vt.__webglFramebuffer),Q.copy(A.viewport),Nt.copy(A.scissor),Ct=A.scissorTest,w.viewport(Q),w.scissor(Nt),w.setScissorTest(Ct),G=-1;return}else if(vt.__webglFramebuffer===void 0)Z.setupRenderTarget(A);else if(vt.__hasExternalTextures)Z.rebindTextures(A,X.get(A.texture).__webglTexture,X.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ne=A.depthTexture;if(vt.__boundDepthTexture!==ne){if(ne!==null&&X.has(ne)&&(A.width!==ne.image.width||A.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(A)}}const Rt=A.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Mt=!0);const Dt=X.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Dt[B])?H=Dt[B][q]:H=Dt[B],W=!0):A.samples>0&&Z.useMultisampledRTT(A)===!1?H=X.get(A).__webglMultisampledFramebuffer:Array.isArray(Dt)?H=Dt[q]:H=Dt,Q.copy(A.viewport),Nt.copy(A.scissor),Ct=A.scissorTest}else Q.copy(wt).multiplyScalar(et).floor(),Nt.copy(qt).multiplyScalar(et).floor(),Ct=Me;if(q!==0&&(H=U),w.bindFramebuffer(N.FRAMEBUFFER,H)&&w.drawBuffers(A,H),w.viewport(Q),w.scissor(Nt),w.setScissorTest(Ct),W){const vt=X.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,vt.__webglTexture,q)}else if(Mt){const vt=B;for(let Rt=0;Rt<A.textures.length;Rt++){const Dt=X.get(A.textures[Rt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Rt,Dt.__webglTexture,q,vt)}}else if(A!==null&&q!==0){const vt=X.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,vt.__webglTexture,q)}G=-1};function Vu(A){const B=X.get(A);return(B.__readFormat!==A.format||B.__readType!==A.type)&&(B.__readFormat=A.format,B.__readType=A.type,B.__formatReadable=L.textureFormatReadable(A.format),B.__typeReadable=L.textureTypeReadable(A.type)),B}this.readRenderTargetPixels=function(A,B,q,H,W,Mt,At,vt=0){if(!(A&&A.isWebGLRenderTarget)){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=X.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&At!==void 0&&(Rt=Rt[At]),Rt){w.bindFramebuffer(N.FRAMEBUFFER,Rt);try{const Dt=A.textures[vt],ne=Dt.format,ae=Dt.type;A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+vt);const Pt=Vu(Dt);if(Pt.__formatReadable===!1){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pt.__typeReadable===!1){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=A.width-H&&q>=0&&q<=A.height-W&&N.readPixels(B,q,H,W,gt.convert(ne),gt.convert(ae),Mt)}finally{const Dt=Y!==null?X.get(Y).__webglFramebuffer:null;w.bindFramebuffer(N.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(A,B,q,H,W,Mt,At,vt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=X.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&At!==void 0&&(Rt=Rt[At]),Rt)if(B>=0&&B<=A.width-H&&q>=0&&q<=A.height-W){w.bindFramebuffer(N.FRAMEBUFFER,Rt);const Dt=A.textures[vt],ne=Dt.format,ae=Dt.type;A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+vt);const Pt=Vu(Dt);if(Pt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const _e=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,_e),N.bufferData(N.PIXEL_PACK_BUFFER,Mt.byteLength,N.STREAM_READ),N.readPixels(B,q,H,W,gt.convert(ne),gt.convert(ae),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);const Be=Y!==null?X.get(Y).__webglFramebuffer:null;w.bindFramebuffer(N.FRAMEBUFFER,Be);const Ce=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Q0(N,Ce,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,_e),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Mt),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(_e),N.deleteSync(Ce),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,B=null,q=0){const H=Math.pow(2,-q),W=Math.floor(A.image.width*H),Mt=Math.floor(A.image.height*H),At=B!==null?B.x:0,vt=B!==null?B.y:0;Z.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,q,0,0,At,vt,W,Mt),w.unbindTexture()},this.copyTextureToTexture=function(A,B,q=null,H=null,W=0,Mt=0){let At,vt,Rt,Dt,ne,ae,Pt,_e,Be;const Ce=A.isCompressedTexture?A.mipmaps[Mt]:A.image;if(q!==null)At=q.max.x-q.min.x,vt=q.max.y-q.min.y,Rt=q.isBox3?q.max.z-q.min.z:1,Dt=q.min.x,ne=q.min.y,ae=q.isBox3?q.min.z:0;else{const Ne=Math.pow(2,-W);At=Math.floor(Ce.width*Ne),vt=Math.floor(Ce.height*Ne),A.isDataArrayTexture?Rt=Ce.depth:A.isData3DTexture?Rt=Math.floor(Ce.depth*Ne):Rt=1,Dt=0,ne=0,ae=0}H!==null?(Pt=H.x,_e=H.y,Be=H.z):(Pt=0,_e=0,Be=0);const Te=gt.convert(B.format),rn=gt.convert(B.type);let Et;B.isData3DTexture?(Z.setTexture3D(B,0),Et=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Z.setTexture2DArray(B,0),Et=N.TEXTURE_2D_ARRAY):(Z.setTexture2D(B,0),Et=N.TEXTURE_2D),w.activeTexture(N.TEXTURE0),w.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),w.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),w.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const dn=w.getParameter(N.UNPACK_ROW_LENGTH),he=w.getParameter(N.UNPACK_IMAGE_HEIGHT),Fn=w.getParameter(N.UNPACK_SKIP_PIXELS),ii=w.getParameter(N.UNPACK_SKIP_ROWS),Oi=w.getParameter(N.UNPACK_SKIP_IMAGES);w.pixelStorei(N.UNPACK_ROW_LENGTH,Ce.width),w.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ce.height),w.pixelStorei(N.UNPACK_SKIP_PIXELS,Dt),w.pixelStorei(N.UNPACK_SKIP_ROWS,ne),w.pixelStorei(N.UNPACK_SKIP_IMAGES,ae);const Ds=A.isDataArrayTexture||A.isData3DTexture,be=B.isDataArrayTexture||B.isData3DTexture;if(A.isDepthTexture){const Ne=X.get(A),Bi=X.get(B),Ae=X.get(Ne.__renderTarget),zi=X.get(Bi.__renderTarget);w.bindFramebuffer(N.READ_FRAMEBUFFER,Ae.__webglFramebuffer),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Us=0;Us<Rt;Us++)Ds&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,X.get(A).__webglTexture,W,ae+Us),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,X.get(B).__webglTexture,Mt,Be+Us)),N.blitFramebuffer(Dt,ne,At,vt,Pt,_e,At,vt,N.DEPTH_BUFFER_BIT,N.NEAREST);w.bindFramebuffer(N.READ_FRAMEBUFFER,null),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||X.has(A)){const Ne=X.get(A),Bi=X.get(B);w.bindFramebuffer(N.READ_FRAMEBUFFER,D),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,F);for(let Ae=0;Ae<Rt;Ae++)Ds?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ne.__webglTexture,W,ae+Ae):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ne.__webglTexture,W),be?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Bi.__webglTexture,Mt,Be+Ae):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Bi.__webglTexture,Mt),W!==0?N.blitFramebuffer(Dt,ne,At,vt,Pt,_e,At,vt,N.COLOR_BUFFER_BIT,N.NEAREST):be?N.copyTexSubImage3D(Et,Mt,Pt,_e,Be+Ae,Dt,ne,At,vt):N.copyTexSubImage2D(Et,Mt,Pt,_e,Dt,ne,At,vt);w.bindFramebuffer(N.READ_FRAMEBUFFER,null),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else be?A.isDataTexture||A.isData3DTexture?N.texSubImage3D(Et,Mt,Pt,_e,Be,At,vt,Rt,Te,rn,Ce.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(Et,Mt,Pt,_e,Be,At,vt,Rt,Te,Ce.data):N.texSubImage3D(Et,Mt,Pt,_e,Be,At,vt,Rt,Te,rn,Ce):A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Mt,Pt,_e,At,vt,Te,rn,Ce.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Mt,Pt,_e,Ce.width,Ce.height,Te,Ce.data):N.texSubImage2D(N.TEXTURE_2D,Mt,Pt,_e,At,vt,Te,rn,Ce);w.pixelStorei(N.UNPACK_ROW_LENGTH,dn),w.pixelStorei(N.UNPACK_IMAGE_HEIGHT,he),w.pixelStorei(N.UNPACK_SKIP_PIXELS,Fn),w.pixelStorei(N.UNPACK_SKIP_ROWS,ii),w.pixelStorei(N.UNPACK_SKIP_IMAGES,Oi),Mt===0&&B.generateMipmaps&&N.generateMipmap(Et),w.unbindTexture()},this.initRenderTarget=function(A){X.get(A).__webglFramebuffer===void 0&&Z.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Z.setTextureCube(A,0):A.isData3DTexture?Z.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Z.setTexture2DArray(A,0):Z.setTexture2D(A,0),w.unbindTexture()},this.resetState=function(){V=0,O=0,Y=null,w.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}}const Jb=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Vh,AddEquation:Ms,AddOperation:op,AdditiveAnimationBlendMode:Kh,AdditiveBlending:mh,AgXToneMapping:Gh,AlphaFormat:Jh,AlwaysCompare:yp,AlwaysDepth:No,AlwaysStencilFunc:pp,AmbientLight:um,AnimationAction:vm,AnimationClip:Sa,AnimationLoader:Yx,AnimationMixer:b_,AnimationObjectGroup:M_,AnimationUtils:kx,ArcCurve:Np,ArrayCamera:gm,ArrowHelper:X_,AttachedBindMode:_h,Audio:xm,AudioAnalyser:u_,AudioContext:Su,AudioListener:c_,AudioLoader:s_,AxesHelper:q_,BackSide:en,BasicDepthPacking:dp,BasicShadowMap:r0,BatchedMesh:Pp,BezierInterpolant:im,Bone:nu,BooleanKeyframeTrack:Is,Box2:Mm,Box3:Ue,Box3Helper:H_,BoxGeometry:Ve,BoxHelper:G_,BufferAttribute:we,BufferGeometry:Vt,BufferGeometryLoader:pm,ByteType:Xh,Cache:ui,Camera:al,CameraHelper:k_,CanvasTexture:Hc,CapsuleGeometry:Wc,CatmullRomCurve3:Fp,CineonToneMapping:zh,CircleGeometry:Xc,ClampToEdgeWrapping:wn,Clock:C_,Color:bt,ColorKeyframeTrack:xu,ColorManagement:oe,Compatibility:Y0,CompressedArrayTexture:rx,CompressedCubeTexture:ax,CompressedTexture:Gc,CompressedTextureLoader:Zx,ConeGeometry:Sr,ConstantAlphaFactor:sp,ConstantColorFactor:np,Controls:Z_,CubeCamera:mm,CubeDepthTexture:Up,CubeReflectionMapping:pi,CubeRefractionMapping:Ki,CubeTexture:Aa,CubeTextureLoader:Jx,CubeUVReflectionMapping:Mr,CubicBezierCurve:au,CubicBezierCurve3:Op,CubicInterpolant:em,CullFaceBack:ph,CullFaceFront:Vf,CullFaceFrontBack:s0,CullFaceNone:zf,Curve:ei,CurvePath:zp,CustomBlending:Gf,CustomToneMapping:kh,CylinderGeometry:Je,Cylindrical:P_,Data3DTexture:Nc,DataArrayTexture:Uc,DataTexture:Bn,DataTextureLoader:$x,DataUtils:Ig,DecrementStencilOp:w0,DecrementWrapStencilOp:E0,DefaultLoadingManager:am,DepthFormat:mi,DepthStencilFormat:Zi,DepthTexture:mr,DetachedBindMode:cp,DirectionalLight:hm,DirectionalLightHelper:V_,DiscreteInterpolant:nm,DodecahedronGeometry:qc,DoubleSide:Pn,DstAlphaFactor:Kf,DstColorFactor:Qf,DynamicCopyUsage:k0,DynamicDrawUsage:N0,DynamicReadUsage:B0,EdgesGeometry:Yc,EllipseCurve:Zc,EqualCompare:xp,EqualDepth:Oo,EqualStencilFunc:P0,EquirectangularReflectionMapping:$r,EquirectangularRefractionMapping:Kr,Euler:Vn,EventDispatcher:Qn,ExternalTexture:su,ExtrudeGeometry:br,FileLoader:Fi,Float16BufferAttribute:Bg,Float32BufferAttribute:yt,FloatType:_n,Fog:Oc,FogExp2:Fc,FramebufferTexture:sx,FrontSide:$i,Frustum:Cs,FrustumArray:kc,GLBufferAttribute:A_,GLSL1:H0,GLSL3:yh,GreaterCompare:_p,GreaterDepth:zo,GreaterEqualCompare:Lc,GreaterEqualDepth:Bo,GreaterEqualStencilFunc:U0,GreaterStencilFunc:L0,GridHelper:B_,Group:Se,HTMLTexture:ox,HalfFloatType:Kn,HemisphereLight:om,HemisphereLightHelper:O_,IcosahedronGeometry:Jc,ImageBitmapLoader:i_,ImageLoader:ba,ImageUtils:wp,IncrementStencilOp:b0,IncrementWrapStencilOp:T0,InstancedBufferAttribute:ts,InstancedBufferGeometry:Mu,InstancedInterleavedBuffer:Mc,InstancedMesh:Rp,Int16BufferAttribute:Fg,Int32BufferAttribute:Og,Int8BufferAttribute:Dg,IntType:wc,InterleavedBuffer:zc,InterleavedBufferAttribute:Un,Interpolant:Tr,InterpolateBezier:vh,InterpolateDiscrete:fa,InterpolateLinear:xc,InterpolateSmooth:Po,InterpolationSamplingMode:q0,InterpolationSamplingType:X0,InvertStencilOp:A0,KeepStencilOp:Io,KeyframeTrack:kn,LOD:Ap,LatheGeometry:$c,Layers:Ea,LessCompare:gp,LessDepth:Fo,LessEqualCompare:Ic,LessEqualDepth:ur,LessEqualStencilFunc:I0,LessStencilFunc:R0,Light:ss,LightProbe:fm,LightShadow:rl,Line:Ui,Line3:cl,LineBasicMaterial:sn,LineCurve:ou,LineCurve3:Bp,LineDashedMaterial:jp,LineLoop:Ip,LineSegments:ti,LinearFilter:Re,LinearInterpolant:gu,LinearMipMapLinearFilter:h0,LinearMipMapNearestFilter:l0,LinearMipmapLinearFilter:hi,LinearMipmapNearestFilter:jr,LinearSRGBColorSpace:ma,LinearToneMapping:Oh,LinearTransfer:ga,Loader:An,LoaderUtils:Th,LoadingManager:vu,LoopOnce:lp,LoopPingPong:up,LoopRepeat:hp,MOUSE:n0,Material:nn,MaterialBlending:a0,MaterialLoader:ol,MathUtils:ie,Matrix2:Au,Matrix3:$t,Matrix4:Xt,MaxEquation:qf,Mesh:jt,MeshBasicMaterial:un,MeshDepthMaterial:pu,MeshDistanceMaterial:mu,MeshLambertMaterial:$p,MeshMatcapMaterial:Kp,MeshNormalMaterial:Jp,MeshPhongMaterial:Yp,MeshPhysicalMaterial:qp,MeshStandardMaterial:fu,MeshToonMaterial:Zp,MinEquation:Xf,MirroredRepeatWrapping:ha,MixOperation:ap,MultiplyBlending:xh,MultiplyOperation:wa,NearestFilter:Oe,NearestMipMapLinearFilter:c0,NearestMipMapNearestFilter:o0,NearestMipmapLinearFilter:sr,NearestMipmapNearestFilter:Wh,NeutralToneMapping:Hh,NeverCompare:mp,NeverDepth:Uo,NeverStencilFunc:C0,NoBlending:fi,NoColorSpace:wi,NoNormalPacking:_0,NoToneMapping:$n,NormalAnimationBlendMode:Pc,NormalBlending:cr,NormalGAPacking:y0,NormalRGPacking:v0,NotEqualCompare:vp,NotEqualDepth:Vo,NotEqualStencilFunc:D0,NumberKeyframeTrack:il,Object3D:de,ObjectLoader:e_,ObjectSpaceNormalMap:fp,OctahedronGeometry:Ca,OneFactor:Zf,OneMinusConstantAlphaFactor:rp,OneMinusConstantColorFactor:ip,OneMinusDstAlphaFactor:jf,OneMinusDstColorFactor:tp,OneMinusSrcAlphaFactor:Fh,OneMinusSrcColorFactor:$f,OrthographicCamera:Ra,PCFShadowMap:Jr,PCFSoftShadowMap:kf,PMREMGenerator:Ch,Path:gr,PerspectiveCamera:Ge,Plane:ci,PlaneGeometry:is,PlaneHelper:W_,PointLight:lm,PointLightHelper:N_,Points:Lp,PointsMaterial:iu,PolarGridHelper:z_,PolyhedronGeometry:ns,PositionalAudio:h_,PropertyBinding:ue,PropertyMixer:_m,QuadraticBezierCurve:cu,QuadraticBezierCurve3:lu,Quaternion:hn,QuaternionKeyframeTrack:sl,QuaternionLinearInterpolant:rm,R11_EAC_Format:Zo,RED_GREEN_RGTC2_Format:da,RED_RGTC1_Format:pc,REVISION:Sc,RG11_EAC_Format:ua,RGBADepthPacking:m0,RGBAFormat:vn,RGBAIntegerFormat:Rc,RGBA_ASTC_10x10_Format:cc,RGBA_ASTC_10x5_Format:rc,RGBA_ASTC_10x6_Format:ac,RGBA_ASTC_10x8_Format:oc,RGBA_ASTC_12x10_Format:lc,RGBA_ASTC_12x12_Format:hc,RGBA_ASTC_4x4_Format:Ko,RGBA_ASTC_5x4_Format:jo,RGBA_ASTC_5x5_Format:Qo,RGBA_ASTC_6x5_Format:tc,RGBA_ASTC_6x6_Format:ec,RGBA_ASTC_8x5_Format:nc,RGBA_ASTC_8x6_Format:ic,RGBA_ASTC_8x8_Format:sc,RGBA_BPTC_Format:uc,RGBA_ETC2_EAC_Format:Yo,RGBA_PVRTC_2BPPV1_Format:Wo,RGBA_PVRTC_4BPPV1_Format:Ho,RGBA_S3TC_DXT1_Format:ta,RGBA_S3TC_DXT3_Format:ea,RGBA_S3TC_DXT5_Format:na,RGBDepthPacking:g0,RGBFormat:$h,RGBIntegerFormat:u0,RGB_BPTC_SIGNED_Format:dc,RGB_BPTC_UNSIGNED_Format:fc,RGB_ETC1_Format:Xo,RGB_ETC2_Format:qo,RGB_PVRTC_2BPPV1_Format:Go,RGB_PVRTC_4BPPV1_Format:ko,RGB_S3TC_DXT1_Format:Qr,RGDepthPacking:x0,RGFormat:ji,RGIntegerFormat:Cc,RawShaderMaterial:du,Ray:jn,Raycaster:ym,RectAreaLight:dm,RedFormat:Ac,RedIntegerFormat:Ta,ReinhardToneMapping:Bh,RenderObjectRefreshType:Z0,RenderTarget:Qh,RenderTarget3D:w_,RepeatWrapping:la,ReplaceStencilOp:S0,ReverseSubtractEquation:Wf,RingGeometry:Kc,SIGNED_R11_EAC_Format:Jo,SIGNED_RED_GREEN_RGTC2_Format:gc,SIGNED_RED_RGTC1_Format:mc,SIGNED_RG11_EAC_Format:$o,SRGBColorSpace:tn,SRGBTransfer:ye,Scene:Bc,ShaderChunk:ee,ShaderLib:mn,ShaderMaterial:En,ShadowMaterial:Wp,Shape:Ni,ShapeGeometry:wr,ShapePath:Y_,ShapeUtils:Jn,ShortType:qh,Skeleton:Vc,SkeletonHelper:U_,SkinnedMesh:Cp,Source:vg,Sphere:ke,SphereGeometry:In,Spherical:R_,SphericalHarmonics3:yu,SplineCurve:hu,SpotLight:cm,SpotLightHelper:D_,Sprite:hr,SpriteMaterial:Ts,SrcAlphaFactor:Nh,SrcAlphaSaturateFactor:ep,SrcColorFactor:Jf,StaticCopyUsage:V0,StaticDrawUsage:Dc,StaticReadUsage:O0,StereoCamera:r_,StreamCopyUsage:G0,StreamDrawUsage:F0,StreamReadUsage:z0,StringKeyframeTrack:Ls,SubtractEquation:Hf,SubtractiveBlending:gh,TOUCH:i0,TangentSpaceNormalMap:Di,TetrahedronGeometry:jc,Texture:Le,TextureLoader:Kx,TextureSource:Ai,TextureUtils:Q_,Timer:bu,TimestampQuery:W0,TorusGeometry:Qc,TorusKnotGeometry:tl,Triangle:xn,TriangleFanDrawMode:p0,TriangleStripDrawMode:f0,TrianglesDrawMode:d0,TubeGeometry:el,UVMapping:bc,Uint16BufferAttribute:tu,Uint32BufferAttribute:eu,Uint8BufferAttribute:Ug,Uint8ClampedBufferAttribute:Ng,Uniform:Eu,UniformsGroup:E_,UniformsLib:ut,UniformsUtils:nl,UnsignedByteType:bn,UnsignedInt101111Type:Zh,UnsignedInt248Type:fr,UnsignedInt5999Type:Yh,UnsignedIntType:zn,UnsignedShort4444Type:Tc,UnsignedShort5551Type:Ec,UnsignedShortType:dr,VSMShadowMap:ir,Vector2:it,Vector3:C,Vector4:ce,VectorKeyframeTrack:_u,VideoFrameTexture:ix,VideoTexture:Dp,WebGL3DRenderTarget:Sg,WebGLArrayRenderTarget:Mg,WebGLCoordinateSystem:Dn,WebGLCubeRenderTarget:Cu,WebGLRenderTarget:Tn,WebGLRenderer:Im,WebGLUtils:Rm,WebGPUCoordinateSystem:As,WebXRController:Lo,WireframeGeometry:uu,WrapAroundEnding:pa,ZeroCurvatureEnding:Ss,ZeroFactor:Yf,ZeroSlopeEnding:bs,ZeroStencilOp:M0,createCanvasElement:Sp,error:Ut,getConsoleFunction:j0,log:_a,setConsoleFunction:K0,warn:dt,warnOnce:Ri},Symbol.toStringTag,{value:"Module"}));class Lm{constructor(t=new C(0,0,0),e=new C(0,1,0),n=1){this.start=t,this.end=e,this.radius=n}clone(){return new this.constructor().copy(this)}set(t,e,n){return this.start.copy(t),this.end.copy(e),this.radius=n,this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this.radius=t.radius,this}getCenter(t){return t.copy(this.end).add(this.start).multiplyScalar(.5)}translate(t){return this.start.add(t),this.end.add(t),this}intersectsBox(t){return sh(this.start.x,this.start.y,this.end.x,this.end.y,t.min.x,t.max.x,t.min.y,t.max.y,this.radius)&&sh(this.start.x,this.start.z,this.end.x,this.end.z,t.min.x,t.max.x,t.min.z,t.max.z,this.radius)&&sh(this.start.y,this.start.z,this.end.y,this.end.z,t.min.y,t.max.y,t.min.z,t.max.z,this.radius)}}function sh(r,t,e,n,i,s,a,o,c){return(i-r<c||i-e<c)&&(r-s<c||e-s<c)&&(a-t<c||a-n<c)&&(t-o<c||n-o<c)}const qn=new C,kr=new C,wo=new C,Gr=new C,ln=new ci,rh=new cl,$b=new cl,To=new Ue,Eo=new ke,Hr=new Lm,Mf=new C,Kb=new C,jb=new C,Qb=new C,t1=1e-10;function e1(r,t,e=null,n=null){const i=Kb.copy(r.end).sub(r.start),s=jb.copy(t.end).sub(t.start),a=Qb.copy(t.start).sub(r.start),o=i.dot(s),c=i.dot(i),l=s.dot(s),h=s.dot(a),d=i.dot(a);let u,f;const p=c*l-o*o;if(Math.abs(p)<t1){const x=-h/l,g=(o-h)/l;Math.abs(x-.5)<Math.abs(g-.5)?(u=0,f=x):(u=1,f=g)}else u=(h*o+d*l)/p,f=(u*o-h)/l;f=Math.max(0,Math.min(1,f)),u=Math.max(0,Math.min(1,u)),e&&e.copy(i).multiplyScalar(u).add(r.start),n&&n.copy(s).multiplyScalar(f).add(t.start)}class ul{constructor(t){this.box=t,this.bounds=new Ue,this.layers=new Ea,this.trianglesPerLeaf=8,this.maxLevel=16,this.subTrees=[],this.triangles=[]}addTriangle(t){return this.bounds.min.x=Math.min(this.bounds.min.x,t.a.x,t.b.x,t.c.x),this.bounds.min.y=Math.min(this.bounds.min.y,t.a.y,t.b.y,t.c.y),this.bounds.min.z=Math.min(this.bounds.min.z,t.a.z,t.b.z,t.c.z),this.bounds.max.x=Math.max(this.bounds.max.x,t.a.x,t.b.x,t.c.x),this.bounds.max.y=Math.max(this.bounds.max.y,t.a.y,t.b.y,t.c.y),this.bounds.max.z=Math.max(this.bounds.max.z,t.a.z,t.b.z,t.c.z),this.triangles.push(t),this}calcBox(){return this.box=this.bounds.clone(),this.box.min.x-=.01,this.box.min.y-=.01,this.box.min.z-=.01,this}split(t){if(!this.box)return;const e=[],n=kr.copy(this.box.max).sub(this.box.min).multiplyScalar(.5);for(let s=0;s<2;s++)for(let a=0;a<2;a++)for(let o=0;o<2;o++){const c=new Ue,l=qn.set(s,a,o);c.min.copy(this.box.min).add(l.multiply(n)),c.max.copy(c.min).add(n),e.push(new ul(c))}let i;for(;i=this.triangles.pop();)for(let s=0;s<e.length;s++)e[s].box.intersectsTriangle(i)&&e[s].triangles.push(i);for(let s=0;s<e.length;s++){const a=e[s].triangles.length;a>this.trianglesPerLeaf&&t<this.maxLevel&&e[s].split(t+1),a!==0&&this.subTrees.push(e[s])}return this}build(){return this.calcBox(),this.split(0),this}getRayTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let s=0;s<i.triangles.length;s++)e.indexOf(i.triangles[s])===-1&&e.push(i.triangles[s]);else i.getRayTriangles(t,e)}}triangleCapsuleIntersect(t,e){e.getPlane(ln);const n=ln.distanceToPoint(t.start)-t.radius,i=ln.distanceToPoint(t.end)-t.radius;if(n>0&&i>0||n<-t.radius&&i<-t.radius)return!1;const s=Math.abs(n/(Math.abs(n)+Math.abs(i))),a=qn.copy(t.start).lerp(t.end,s);if(e.containsPoint(a))return{normal:ln.normal.clone(),point:a.clone(),depth:Math.abs(Math.min(n,i))};const o=t.radius*t.radius,c=rh.set(t.start,t.end),l=[[e.a,e.b],[e.b,e.c],[e.c,e.a]];for(let h=0;h<l.length;h++){const d=$b.set(l[h][0],l[h][1]);if(e1(c,d,wo,Gr),wo.distanceToSquared(Gr)<o)return{normal:wo.clone().sub(Gr).normalize(),point:Gr.clone(),depth:t.radius-wo.distanceTo(Gr)}}return!1}triangleBoxIntersect(t,e){if(Math.max(e.a.x,e.b.x,e.c.x)<t.min.x||Math.min(e.a.x,e.b.x,e.c.x)>t.max.x||Math.max(e.a.y,e.b.y,e.c.y)<t.min.y||Math.min(e.a.y,e.b.y,e.c.y)>t.max.y||Math.max(e.a.z,e.b.z,e.c.z)<t.min.z||Math.min(e.a.z,e.b.z,e.c.z)>t.max.z||!t.intersectsTriangle(e))return!1;e.getPlane(ln),qn.x=ln.normal.x>0?t.min.x:t.max.x,qn.y=ln.normal.y>0?t.min.y:t.max.y,qn.z=ln.normal.z>0?t.min.z:t.max.z;const n=ln.distanceToPoint(qn),i={depth:-n,normal:ln.normal.clone(),point:qn.clone()};return i.point.addScaledVector(i.normal,n),i}triangleSphereIntersect(t,e){if(e.getPlane(ln),!t.intersectsPlane(ln))return!1;const n=Math.abs(ln.distanceToSphere(t)),i=t.radius*t.radius-n*n,s=ln.projectPoint(t.center,qn);if(e.containsPoint(t.center))return{normal:ln.normal.clone(),point:s.clone(),depth:Math.abs(ln.distanceToSphere(t))};const a=[[e.a,e.b],[e.b,e.c],[e.c,e.a]];for(let o=0;o<a.length;o++){rh.set(a[o][0],a[o][1]),rh.closestPointToPoint(s,!0,kr);const c=kr.distanceToSquared(t.center);if(c<i)return{normal:t.center.clone().sub(kr).normalize(),point:kr.clone(),depth:t.radius-Math.sqrt(c)}}return!1}getSphereTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let s=0;s<i.triangles.length;s++)e.indexOf(i.triangles[s])===-1&&e.push(i.triangles[s]);else i.getSphereTriangles(t,e)}}getBoxTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let s=0;s<i.triangles.length;s++)e.indexOf(i.triangles[s])===-1&&e.push(i.triangles[s]);else i.getBoxTriangles(t,e)}}getCapsuleTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const i=this.subTrees[n];if(t.intersectsBox(i.box))if(i.triangles.length>0)for(let s=0;s<i.triangles.length;s++)e.indexOf(i.triangles[s])===-1&&e.push(i.triangles[s]);else i.getCapsuleTriangles(t,e)}}boxIntersect(t){To.copy(t);const e=[];let n,i=!1;this.getBoxTriangles(t,e);for(let s=0;s<e.length;s++)(n=this.triangleBoxIntersect(To,e[s]))&&(i=!0,To.translate(n.normal.multiplyScalar(n.depth)));if(i){const s=To.getCenter(Mf).sub(t.getCenter(qn)),a=s.length();return{normal:s.normalize(),depth:a}}return!1}sphereIntersect(t){Eo.copy(t);const e=[];let n,i=!1;this.getSphereTriangles(t,e);for(let s=0;s<e.length;s++)(n=this.triangleSphereIntersect(Eo,e[s]))&&(i=!0,Eo.center.add(n.normal.multiplyScalar(n.depth)));if(i){const s=Eo.center.clone().sub(t.center),a=s.length();return{normal:s.normalize(),depth:a}}return!1}capsuleIntersect(t){Hr.copy(t);const e=[];let n,i=!1;this.getCapsuleTriangles(Hr,e);for(let s=0;s<e.length;s++)(n=this.triangleCapsuleIntersect(Hr,e[s]))&&(i=!0,Hr.translate(n.normal.multiplyScalar(n.depth)));if(i){const s=Hr.getCenter(Mf).sub(t.getCenter(qn)),a=s.length();return{normal:s.normalize(),depth:a}}return!1}rayIntersect(t){const e=[];let n,i,s=1e100;this.getRayTriangles(t,e);for(let a=0;a<e.length;a++){const o=t.intersectTriangle(e[a].a,e[a].b,e[a].c,!0,qn);if(o){const c=o.sub(t.origin).length();s>c&&(i=o.clone().add(t.origin),s=c,n=e[a])}}return s<1e100?{distance:s,triangle:n,position:i}:!1}fromGraphNode(t){return t.updateWorldMatrix(!0,!0),t.traverse(e=>{if(e.isMesh===!0&&this.layers.test(e.layers)){let n,i=!1;e.geometry.index!==null?(i=!0,n=e.geometry.toNonIndexed()):n=e.geometry;const s=n.getAttribute("position");for(let a=0;a<s.count;a+=3){const o=new C().fromBufferAttribute(s,a),c=new C().fromBufferAttribute(s,a+1),l=new C().fromBufferAttribute(s,a+2);o.applyMatrix4(e.matrixWorld),c.applyMatrix4(e.matrixWorld),l.applyMatrix4(e.matrixWorld),this.addTriangle(new xn(o,c,l))}i&&n.dispose()}}),this.build(),this}clear(){return this.box=null,this.bounds.makeEmpty(),this.subTrees.length=0,this.triangles.length=0,this}}ut.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new it},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};mn.line={uniforms:nl.merge([ut.common,ut.fog,ut.line]),vertexShader:`
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
		`};class Dm extends En{constructor(t){super({type:"LineMaterial",uniforms:nl.clone(mn.line.uniforms),vertexShader:mn.line.vertexShader,fragmentShader:mn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Sf=new Ue,Ao=new C;class Um extends Mu{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new yt(t,3)),this.setAttribute("uv",new yt(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new Mc(e,6,1);return this.setAttribute("instanceStart",new Un(n,3,0)),this.setAttribute("instanceEnd",new Un(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new Mc(e,6,1);return this.setAttribute("instanceColorStart",new Un(n,3,0)),this.setAttribute("instanceColorEnd",new Un(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new uu(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ue);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Sf.setFromBufferAttribute(e),this.boundingBox.union(Sf))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ke),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)Ao.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ao)),Ao.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ao));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const ah=new ce,bf=new C,wf=new C,$e=new ce,Ke=new ce,ai=new ce,oh=new C,ch=new Xt,je=new cl,Tf=new C,Co=new Ue,Ro=new ke,oi=new ce;let li,Es;function Ef(r,t,e){return oi.set(0,0,-t,1).applyMatrix4(r.projectionMatrix),oi.multiplyScalar(1/oi.w),oi.x=Es/e.width,oi.y=Es/e.height,oi.applyMatrix4(r.projectionMatrixInverse),oi.multiplyScalar(1/oi.w),Math.abs(Math.max(oi.x,oi.y))}function n1(r,t){const e=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,c=a;o<c;o++){je.start.fromBufferAttribute(i,o),je.end.fromBufferAttribute(s,o),je.applyMatrix4(e);const l=new C,h=new C;li.distanceSqToSegment(je.start,je.end,h,l),h.distanceTo(l)<Es*.5&&t.push({point:h,pointOnLine:l,distance:li.origin.distanceTo(h),object:r,face:null,faceIndex:o,uv:null,uv1:null})}}function i1(r,t,e){const n=t.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,c=o.attributes.instanceStart,l=o.attributes.instanceEnd,h=Math.min(o.instanceCount,c.count),d=-t.near;li.at(1,ai),ai.w=1,ai.applyMatrix4(t.matrixWorldInverse),ai.applyMatrix4(n),ai.multiplyScalar(1/ai.w),ai.x*=s.x/2,ai.y*=s.y/2,ai.z=0,oh.copy(ai),ch.multiplyMatrices(t.matrixWorldInverse,a);for(let u=0,f=h;u<f;u++){if($e.fromBufferAttribute(c,u),Ke.fromBufferAttribute(l,u),$e.w=1,Ke.w=1,$e.applyMatrix4(ch),Ke.applyMatrix4(ch),$e.z>d&&Ke.z>d)continue;if($e.z>d){const M=$e.z-Ke.z,_=($e.z-d)/M;$e.lerp(Ke,_)}else if(Ke.z>d){const M=Ke.z-$e.z,_=(Ke.z-d)/M;Ke.lerp($e,_)}$e.applyMatrix4(n),Ke.applyMatrix4(n),$e.multiplyScalar(1/$e.w),Ke.multiplyScalar(1/Ke.w),$e.x*=s.x/2,$e.y*=s.y/2,Ke.x*=s.x/2,Ke.y*=s.y/2,je.start.copy($e),je.start.z=0,je.end.copy(Ke),je.end.z=0;const x=je.closestPointToPointParameter(oh,!0);je.at(x,Tf);const g=ie.lerp($e.z,Ke.z,x),m=g>=-1&&g<=1,v=oh.distanceTo(Tf)<Es*.5;if(m&&v){je.start.fromBufferAttribute(c,u),je.end.fromBufferAttribute(l,u),je.start.applyMatrix4(a),je.end.applyMatrix4(a);const M=new C,_=new C;li.distanceSqToSegment(je.start,je.end,_,M),e.push({point:_,pointOnLine:M,distance:li.origin.distanceTo(_),object:r,face:null,faceIndex:u,uv:null,uv1:null})}}}class s1 extends jt{constructor(t=new Um,e=new Dm({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,i=new Float32Array(2*e.count);for(let a=0,o=0,c=e.count;a<c;a++,o+=2)bf.fromBufferAttribute(e,a),wf.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+bf.distanceTo(wf);const s=new Mc(i,2,1);return t.setAttribute("instanceDistanceStart",new Un(s,1,0)),t.setAttribute("instanceDistanceEnd",new Un(s,1,1)),this}raycast(t,e){const n=this.material.worldUnits,i=t.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;li=t.ray;const a=this.matrixWorld,o=this.geometry,c=this.material;Es=c.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),Ro.copy(o.boundingSphere).applyMatrix4(a);let l;if(n)l=Es*.5;else{const d=Math.max(i.near,Ro.distanceToPoint(li.origin));l=Ef(i,d,c.resolution)}if(Ro.radius+=l,li.intersectsSphere(Ro)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Co.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=Es*.5;else{const d=Math.max(i.near,Co.distanceToPoint(li.origin));h=Ef(i,d,c.resolution)}Co.expandByScalar(h),li.intersectsBox(Co)!==!1&&(n?n1(this,e):i1(this,i,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(ah),this.material.uniforms.resolution.value.set(ah.z,ah.w))}}function Nm(r,t=!1){const e=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,c=new Vt;let l=0;for(let h=0;h<r.length;++h){const d=r[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const d=[];for(let u=0;u<r.length;++u){const f=r[u].index;for(let p=0;p<f.count;++p)d.push(f.getX(p)+h);h+=r[u].attributes.position.count}c.setIndex(d)}for(const h in s){const d=Af(s[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][u]);const p=Af(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function Af(r){let t,e,n,i=-1,s=0;for(let l=0;l<r.length;++l){const h=r[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const a=new t(s),o=new we(a,e,n);let c=0;for(let l=0;l<r.length;++l){const h=r[l];if(h.isInterleavedBufferAttribute){const d=c/e;for(let u=0,f=h.count;u<f;u++)for(let p=0;p<e;p++){const x=h.getComponent(u,p);o.setComponent(u+d,p,x)}}else a.set(h.array,c);c+=h.count*e}return i!==void 0&&(o.gpuType=i),o}const Fm=16777215,r1=1118481;function oa(r){const t=String(r);let e=2166136261;for(let n=0;n<t.length;n++)e=Math.imul(e^t.charCodeAt(n),16777619);return e>>>0}function Ji(r){let t=r>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}const a1=(r,t,e)=>`
  float tintaEscala(float z) {
    float r = max(z - ${r.toFixed(1)}, 0.0) / ${t.toFixed(1)};
    return ${e.toFixed(2)} + ${(1-e).toFixed(2)} / (1.0 + r * r);
  }`;function lh(r){const[t,e,n]=r==="arma"?[.5,3,.4]:r==="longe"?[40,120,.5]:[6,40,.22],i=new Dm({color:16777215,vertexColors:!0,linewidth:r==="arma"?1.35:1,worldUnits:!1,alphaToCoverage:!0,toneMapped:!1});return i.depthWrite=!1,i.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace("uniform float linewidth;",`uniform float linewidth;
        ${a1(t,e,n)}
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
        ${r==="arma"?`// Na arma, o traço vem uns milímetros à frente da face: não pisca.
        clipStart.z -= 0.0012 * clipStart.w;
        clipEnd.z -= 0.0012 * clipEnd.w;`:""}
        // ndc space`).replace("offset *= linewidth;","offset *= linewidth * instanceLargura * eL;"),s.fragmentShader=s.fragmentShader.replace("uniform float linewidth;",`uniform float linewidth;
        varying float vLonge;`).replace("gl_FragColor = vec4( diffuseColor.rgb, alpha );",`float nevoa = smoothstep(${r==="arma"?"50.0, 60.0":r==="longe"?"220.0, 420.0":"70.0, 190.0"}, vLonge);
         gl_FragColor = vec4( mix(diffuseColor.rgb, vec3(1.0), nevoa * 0.85), alpha );`)},i.customProgramCacheKey=()=>"tinta-"+r,i}const ca={mundo:lh("mundo"),arma:lh("arma"),longe:lh("longe")},Ih=new un({color:Fm,side:Pn,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),Cf=new un({color:Fm,side:Pn,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:2}),Lh=new un({color:r1});function o1(r,t=2.2){const e=new En({uniforms:{resolucao:ca.arma.uniforms.resolution,largura:{value:t}},vertexShader:`
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
      }`,fragmentShader:"void main() { gl_FragColor = vec4(vec3(0.07), 1.0); }",side:en,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:6}),n=new jt(r,e);return n.frustumCulled=!1,n}function Om(r,t){ca.mundo.resolution.set(r,t),ca.arma.resolution.set(r,t),ca.longe.resolution.set(r,t)}const c1={aresta:2.9,pormenor:1.8,sombra:1.1,chao:1.4},l1={aresta:.02,pormenor:.08,sombra:.42,chao:.3};function h1(r,t,e,n,i=1,s=.8){const a=Ji(t),o=new C,c=new C,l=(h,d,u)=>{const f=o.distanceTo(c),p=Math.max(1,Math.min(6,Math.ceil(f*(d-h)/s))),x=a()*6.283,g=(e==="aresta"?.7:e==="sombra"?.2:.45)*i,m=u?(a()<.5?-1:1)*(.7+a()*.7)*i:0,v=M=>m+Math.sin(M*Math.PI)*Math.sin(M*5.2+x)*g;for(let M=0;M<p;M++){const _=h+(d-h)*M/p,S=h+(d-h)*(M+1)/p;n.pos.push(o.x+(c.x-o.x)*_,o.y+(c.y-o.y)*_,o.z+(c.z-o.z)*_,o.x+(c.x-o.x)*S,o.y+(c.y-o.y)*S,o.z+(c.z-o.z)*S),n.desv.push(v(_),v(S));const b=.5+.5*Math.sin(x+M*.73);n.larg.push(c1[e]*(u?.65:.85+b*.3));for(const E of[_,S]){const y=l1[e]+(u?.3:0)+(.5+.5*Math.sin(x+E*7.1))*.08,T=.067+(1-.067)*Math.min(1,y);n.cor.push(T,T,T)}}};for(let h=0;h<r.length;h+=6){if(o.set(r[h],r[h+1],r[h+2]),c.set(r[h+3],r[h+4],r[h+5]),o.distanceToSquared(c)<1e-8)continue;l(0,1,!1);const d=e==="aresta"?.35:e==="pormenor"?.12:0;if(a()<d){const u=a()*.35;l(u,Math.min(1,u+.3+a()*.45),!0)}}}function u1(r,t="mundo",e=!1){const n=new Um().setPositions(r.pos).setColors(r.cor);n.setAttribute("instanceLargura",new ts(new Float32Array(r.larg),1)),n.setAttribute("instanceDesvio",new ts(new Float32Array(r.desv),2));const i=new s1(n,ca[t]);return i.renderOrder=2,i.frustumCulled=e,i.userData.semColisao=!0,i}class Ii{constructor(t,e=1,n=.8){this.nome=t,this.desvio=e,this.passo=n}faces=[];linhas=new Map;n=0;linha(t,e="aresta",n=!1){const i=this.linhas.get(e)??[];this.linhas.set(e,i);for(let s=1;s<t.length;s++)i.push(...t[s-1],...t[s]);n&&t.length>2&&i.push(...t[t.length-1],...t[0])}segmentos(t,e="aresta"){const n=this.linhas.get(e)??[];this.linhas.set(e,n);for(const i of t)n.push(i)}tracejar(t,e,n,i=.25,s="sombra",a=.8){const o=Ji(oa(this.nome+":"+this.n++)),c=Math.hypot(...e),l=Math.hypot(...n);if(c<.05||l<.05)return;const h=(u,f)=>[t[0]+e[0]*u/c+n[0]*f/l,t[1]+e[1]*u/c+n[1]*f/l,t[2]+e[2]*u/c+n[2]*f/l],d=a*l;for(let u=-d;u<=c;u+=i*(.8+o()*.4)){if(o()<.1)continue;let f=Math.max(0,-u/a),p=Math.min(l,(c-u)/a);if(p<=f)continue;const x=p-f;f+=x*o()*.08,p-=x*o()*.14,this.linha([h(u+a*f,f),h(u+a*p,p)],s)}}solido(t,e="aresta",n=25){if(e){const s=new Yc(t,n);this.segmentos(Array.from(s.getAttribute("position").array),e),s.dispose()}const i=t.index?t.toNonIndexed():t;i.deleteAttribute("uv"),i.deleteAttribute("normal"),this.faces.push(i)}caixa(t,e,n,i,s,a,o=0,c="aresta"){const l=new Ve(t,e,n);l.rotateY(o),l.translate(i,s,a),this.solido(l,c)}face(t,e="aresta"){const n=new Vt;n.setAttribute("position",new yt(t.flat(),3));const i=[];for(let s=1;s<t.length-1;s++)i.push(0,s,s+1);n.setIndex(i),this.solido(n,!1),e&&this.linha(t,e,!0)}acabar(t="mundo",e=Ih,n=!1){const i=new Se;if(i.name=this.nome,this.faces.length){const a=Nm(this.faces);if(a){const o=new jt(a,e);o.name=this.nome+":papel",i.add(o)}this.faces.forEach(o=>o.dispose())}const s={pos:[],cor:[],larg:[],desv:[]};for(const a of["sombra","chao","pormenor","aresta"]){const o=this.linhas.get(a);o?.length&&h1(o,oa(this.nome+a),a,s,this.desvio,this.passo)}return s.pos.length&&i.add(u1(s,t,n)),this.faces=[],this.linhas.clear(),i}}const Si=(r,t,e)=>new C(r,e,-t),Lt=(r,t,e)=>[r,e,-t];function d1(r){const t=document.createElement("canvas"),e=t.getContext("2d"),n='600 64px "Patrick Hand", "Segoe Print", cursive';e.font=n,t.width=Math.ceil(e.measureText(r.toUpperCase()).width)+90,t.height=130,e.fillStyle="#fff",e.fillRect(0,0,t.width,t.height),e.strokeStyle="#111",e.lineWidth=5,e.strokeRect(8,8,t.width-16,t.height-16),e.lineWidth=2,e.strokeRect(20,20,t.width-40,t.height-40),e.font=n,e.fillStyle="#111",e.textAlign="center",e.textBaseline="middle",e.fillText(r.toUpperCase(),t.width/2,t.height/2+3);const i=new Hc(t);i.colorSpace=tn,i.anisotropy=4;const s=.5;return new jt(new is(s*t.width/t.height,s),new un({map:i,polygonOffset:!0,polygonOffsetFactor:-2}))}function Rf(r,t,e,n){const i=t[0]-r[0],s=t[1]-r[1],a=n[0]-e[0],o=n[1]-e[1],c=i*o-s*a;if(Math.abs(c)<1e-9)return null;const l=((e[0]-r[0])*o-(e[1]-r[1])*a)/c,h=((e[0]-r[0])*s-(e[1]-r[1])*i)/c;return l>=0&&l<=1&&h>=0&&h<=1?l:null}function bi(r,t,e){let n=!1;for(let i=0,s=e.length-1;i<e.length;s=i++){const[a,o]=e[i],[c,l]=e[s];o>t!=l>t&&r<(c-a)*(t-o)/(l-o)+a&&(n=!n)}return n}const f1={"way/246397825":"way/121298535","way/1165517467":"way/1165517464"},Pf="way/41222810",hh="relation/3475986";class p1{constructor(t){this.n=t,this.nivelarClaustro();for(const e of t.edificios){const n=e.anel.map(s=>s[0]),i=e.anel.map(s=>s[1]);for(let s=Math.floor(Math.min(...n)/10);s<=Math.floor(Math.max(...n)/10);s++)for(let a=Math.floor(Math.min(...i)/10);a<=Math.floor(Math.max(...i)/10);a++){const o=s+","+a;this.grelha.has(o)||this.grelha.set(o,[]),this.grelha.get(o).push(e)}}}cena=new Se;colisao=new Se;pontos={};caminhoRota=[];grelha=new Map;quadriculas=new Map;quadricula(t,e){const n=Math.floor(t/48)+","+Math.floor(e/48);let i=this.quadriculas.get(n);return i||(i=new Ii("cidade:"+n,1,1.4),this.quadriculas.set(n,i)),i}pisoClaustro=0;nivelarClaustro(){const t=this.n.edificios.find(a=>a.osm===hh);if(!t||!t.furos[0])return;const e=this.n.dem,n=[],i=[];for(let a=0;a<e.nRow;a++)for(let o=0;o<e.nCol;o++){const c=e.x0+o*e.passo,l=e.y0+a*e.passo;bi(c,l,t.anel)&&(i.push(a*e.nCol+o),bi(c,l,t.furos[0])&&n.push(e.elev[a*e.nCol+o]))}n.sort((a,o)=>a-o);const s=n[n.length>>1];for(const a of i)e.elev[a]=Math.min(s+.4,Math.max(s-1.6,e.elev[a]));this.pisoClaustro=s+.4}chao(t,e){const n=this.n.dem,i=Math.max(0,Math.min(n.nCol-1.001,(t-n.x0)/n.passo)),s=Math.max(0,Math.min(n.nRow-1.001,(e-n.y0)/n.passo)),a=Math.floor(i),o=Math.floor(s),c=i-a,l=s-o,h=(d,u)=>n.elev[u*n.nCol+d];return(h(a,o)*(1-c)+h(a+1,o)*c)*(1-l)+(h(a,o+1)*(1-c)+h(a+1,o+1)*c)*l}edificioEm(t,e,n){for(const i of this.grelha.get(Math.floor(t/10)+","+Math.floor(e/10))??[])if(i!==n&&bi(t,e,i.anel)&&!i.furos.some(s=>bi(t,e,s)))return i;return null}construir(){this.terreno();for(const t of this.n.edificios){const e=t.anel.map(s=>s[0]),n=t.anel.map(s=>s[1]),i=this.quadricula(e.reduce((s,a)=>s+a)/e.length,n.reduce((s,a)=>s+a)/n.length);t.osm===hh?this.claustro(t,i):this.edificio(t,i)}this.chaoDesenhado(),this.muros(),this.torreUniversidade();for(const t of this.quadriculas.values())this.cena.add(t.acabar("mundo",Ih,!0));this.limites(),this.marcarPontos(),this.mobiliario()}terreno(){const t=this.n.dem,e=[],n=[];for(let l=0;l<t.nRow;l++)for(let h=0;h<t.nCol;h++)e.push(...Lt(t.x0+h*t.passo,t.y0+l*t.passo,t.elev[l*t.nCol+h]));for(let l=0;l<t.nRow-1;l++)for(let h=0;h<t.nCol-1;h++){const d=l*t.nCol+h,u=d+1,f=d+t.nCol,p=f+1;n.push(d,u,f,u,p,f)}const i=new Vt;i.setAttribute("position",new yt(e,3)),i.setIndex(n),i.computeVertexNormals();const s=new jt(i,Ih);s.name="terreno",this.cena.add(s);const a=new jt(i);a.userData.terreno=!0,this.colisao.add(a);const c=new Yc(i,46).getAttribute("position").array;for(let l=0;l<c.length;l+=6){const h=(c[l]+c[l+3])/2,d=-(c[l+2]+c[l+5])/2;this.edificioEm(h,d)||this.quadricula(h,d).segmentos(Array.from(c.subarray(l,l+6)),"pormenor")}}paredes(t,e,n,i,s=!0){const a=[];for(let c=0;c<t.length;c++){const l=t[c],h=t[(c+1)%t.length],d=e(c),u=e((c+1)%t.length);a.push(...Lt(l[0],l[1],d),...Lt(h[0],h[1],u),...Lt(h[0],h[1],n),...Lt(l[0],l[1],d),...Lt(h[0],h[1],n),...Lt(l[0],l[1],n));const f=t[(c-1+t.length)%t.length],p=Math.atan2(l[1]-f[1],l[0]-f[0]),x=Math.atan2(h[1]-l[1],h[0]-l[0]);if(Math.abs(Math.atan2(Math.sin(x-p),Math.cos(x-p)))>.2&&i.linha([Lt(l[0],l[1],Math.max(d,this.chao(l[0],l[1]))),Lt(l[0],l[1],n)],"aresta"),d<this.chao(l[0],l[1])+.2){const g=Math.hypot(h[0]-l[0],h[1]-l[1]),m=Math.max(1,Math.ceil(g/1.5)),v=[];for(let M=0;M<=m;M++){const _=l[0]+(h[0]-l[0])*M/m,S=l[1]+(h[1]-l[1])*M/m;v.push(Lt(_,S,this.chao(_,S)+.03))}i.linha(v,"aresta")}}i.linha(t.map(([c,l])=>Lt(c,l,n)),"aresta",!0);const o=new Vt;o.setAttribute("position",new yt(a,3)),i.solido(o,!1),s&&this.colisao.add(new jt(o.clone()))}tampa(t,e,n,i,s=!0){const a=new Ni(t.map(([c,l])=>new it(c,l)));for(const c of e)a.holes.push(new gr(c.map(([l,h])=>new it(l,h))));const o=new wr(a);o.rotateX(-Math.PI/2),o.translate(0,n,0),i.solido(o,!1),s&&this.colisao.add(new jt(o.clone()))}edificio(t,e){const n=f1[t.osm];if(n)return this.portaDaCidade(t,n,e);this.paredes(t.anel,()=>t.base-.8,t.topo,e),this.tampa(t.anel,t.furos,t.topo,e);for(const s of t.furos)this.paredes(s,()=>t.base-.8,t.topo,e);const i=t.osm===Pf;t.cumeeira-t.topo>1.5&&!i&&this.telhado(t,e),this.fachadas(t,e,i),i&&(this.ameias(t,e),this.contrafortes(t,e))}telhado(t,e){if(t.anel.length>8)return;const n=t.anel.map(l=>l[0]),i=t.anel.map(l=>l[1]),s=n.reduce((l,h)=>l+h)/n.length,a=i.reduce((l,h)=>l+h)/i.length,o=Math.min(t.cumeeira-t.topo,4),c=Lt(s,a,t.topo+o);for(let l=0;l<t.anel.length;l++){const h=t.anel[l],d=t.anel[(l+1)%t.anel.length];e.face([Lt(h[0],h[1],t.topo),Lt(d[0],d[1],t.topo),c],!1),e.linha([Lt(h[0],h[1],t.topo),c],"pormenor")}}pedra(t,e,n){const i=Ji(oa(e.osm+":pedra"));for(let s=0;s<t.length;s++){const a=t[s],o=t[(s+1)%t.length],c=t[(s-1+t.length)%t.length],l=Math.hypot(o[0]-a[0],o[1]-a[1]),h=(o[0]-a[0])/l,d=(o[1]-a[1])/l,u=d,f=-h,p=Math.hypot(a[0]-c[0],a[1]-c[1]),x=(c[0]-a[0])/p,g=(c[1]-a[1])/p,m=(_,S,b=h,E=d,y=u,T=f)=>Lt(a[0]+b*_+y*.05,a[1]+E*_+T*.05,S),v=Math.max(this.chao(a[0]+u,a[1]+f),e.base);let M=0;for(let _=v+.1;_+.5<e.topo-.6;_+=.52,M^=1){const S=M?.75:.4,b=M?.4:.75;n.linha([m(0,_+.5),m(S,_+.5),m(S,_)],"pormenor"),n.linha([m(0,_+.5,x,g,-g,x),m(b,_+.5,x,g,-g,x),m(b,_,x,g,-g,x)],"pormenor")}n.linha([m(0,e.topo-.45),m(l,e.topo-.45)],"pormenor");for(let _=0;_<l*(e.topo-v)*.05;_++){const S=1+i()*Math.max(.1,l-2),b=v+1+i()*(e.topo-v-3),E=.5+i()*.5;n.linha([m(S,b),m(S+E,b)],"sombra"),i()<.6&&n.linha([m(S+E,b),m(S+E,b+.32)],"sombra"),i()<.4&&n.linha([m(S+E*.4,b-.32),m(S+E*.4+E,b-.32)],"sombra")}}}portaDaCidade(t,e,n){const i=this.n.vias.find(p=>p.osm===e)?.g;if(!i)return;const s=(p,x)=>{const g=Math.hypot(p[0]-x[0],p[1]-x[1])||1;return[p[0]+(p[0]-x[0])/g*3,p[1]+(p[1]-x[1])/g*3]},a=[s(i[0],i[1]),...i.slice(1,-1),s(i[i.length-1],i[i.length-2])],o=2.9,c=new Map,l=[],h=t.anel.filter((p,x,g)=>{const m=g[(x-1+g.length)%g.length],v=g[(x+1)%g.length];if(Math.hypot(p[0]-m[0],p[1]-m[1])<.05)return!1;const M=Math.atan2(p[1]-m[1],p[0]-m[0]),_=Math.atan2(v[1]-p[1],v[0]-p[0]);return Math.abs(Math.atan2(Math.sin(_-M),Math.cos(_-M)))>.12}),d=[];for(let p=0;p<h.length;p++){const x=h[p],g=h[(p+1)%h.length],m=Math.hypot(g[0]-x[0],g[1]-x[1]);for(let v=1;v<a.length;v++){const M=Rf(x,g,a[v-1],a[v]);M!==null&&d.push({i:p,t:M,L:m})}}const u=Math.min(3.6,...d.map(p=>p.L-.8)),f=u/2;for(const{i:p,t:x,L:g}of d){if(u<2)continue;const m=h[p],v=h[(p+1)%h.length],M=ie.clamp(x*g,f+.35,g-f-.35);c.set(p,[...c.get(p)??[],[M-f,M+f,o+f]]),l.push([m[0]+(v[0]-m[0])*M/g,m[1]+(v[1]-m[1])*M/g])}if(this.paredesComAberturas(h,t.base-.8,t.topo,c,n,.7,"real"),this.tampa(h,[],t.topo,n),this.ameias({...t,anel:h},n),this.pedra(h,t,n),l.length>=2){const[p,x]=l,g=x[0]-p[0],m=x[1]-p[1],v=Math.hypot(g,m),M=g/v,_=m/v,S=-_,b=M,E=this.chao(...p),y=this.chao(...x);for(const U of[-1,1]){const D=U*(f+.35),F=Math.min(E,y)-1,V=Math.max(E,y)+o+f+.5,O=new Ve(v,V-F,.7);O.rotateY(Math.atan2(m,g)),O.translate((p[0]+x[0])/2+S*D,(F+V)/2,-((p[1]+x[1])/2+b*D)),this.colisao.add(new jt(O.clone())),n.solido(O,!1);const Y=p[0]+S*U*f,G=p[1]+b*U*f,K=x[0]+S*U*f,Q=x[1]+b*U*f;n.linha([Lt(Y,G,E+o),Lt(K,Q,y+o)],"pormenor"),n.linha([Lt(Y,G,this.chao(Y,G)+.03),Lt(K,Q,this.chao(K,Q)+.03)],"aresta")}const T=16,P=[],R=(U,D,F)=>{const V=Math.PI*(F/T);return Lt(U[0]+S*Math.cos(V)*f,U[1]+b*Math.cos(V)*f,D+o+Math.sin(V)*f)};for(let U=0;U<T;U++)P.push(...R(p,E,U),...R(x,y,U),...R(x,y,U+1),...R(p,E,U),...R(x,y,U+1),...R(p,E,U+1));const I=new Vt;I.setAttribute("position",new yt(P,3)),n.solido(I,!1);for(const U of[4,8,12])n.linha([R(p,E,U),R(x,y,U)],"sombra");for(const U of[p,x]){const D=this.chao(...U)+o+f+3;if(D+2>t.topo-1.5)continue;const F=[];for(let G=0;G<=10;G++){const K=Math.PI*(G/10);F.push(Lt(U[0]+S*Math.cos(K)*.5,U[1]+b*Math.cos(K)*.5,D+1.2+Math.sin(K)*.5))}const V=U===p?-M:M,O=U===p?-_:_,Y=G=>[G[0]+V*.06,G[1],G[2]-O*.06];n.linha([Y(Lt(U[0]+S*.5,U[1]+b*.5,D)),...F.map(Y),Y(Lt(U[0]-S*.5,U[1]-b*.5,D))],"pormenor"),n.linha([Y(Lt(U[0]+S*.5,U[1]+b*.5,D)),Y(Lt(U[0]-S*.5,U[1]-b*.5,D))],"pormenor")}}}livre(t,e,n){return!this.edificioEm(t,e,n)&&!bi(t,e,n.anel)}fachadas(t,e,n){const i=Ji(oa(t.osm)),s=t.anel;n&&this.portalSe(t,e);for(let a=0;a<s.length;a++){const o=s[a],c=s[(a+1)%s.length],l=c[0]-o[0],h=c[1]-o[1],d=Math.hypot(l,h);if(d<1.8)continue;const u=l/d,f=h/d,p=f,x=-u;(o[0]+c[0])/2,(o[1]+c[1])/2;const g=R=>this.livre(o[0]+u*R+p*1.1,o[1]+f*R+x*1.1,t),m=R=>{if(g(R))return-1/0;const I=this.edificioEm(o[0]+u*R+p*1.1,o[1]+f*R+x*1.1,t);return I?Math.max(I.topo,I.cumeeira)+.5:1/0};if(![.15,.5,.85].some(R=>m(R*d)<t.topo-2.6))continue;const v=.04,M=(R,I,U=v)=>Lt(o[0]+u*R+p*U,o[1]+f*R+x*U,I),_=R=>this.chao(o[0]+u*R+p*1.2,o[1]+f*R+x*1.2),S=(R,I,U,D,F="pormenor")=>e.linha([M(R,U),M(I,U),M(I,D),M(R,D)],F,!0),b=(R,I,U,D,F=.18)=>e.tracejar(M(R,U),[u*(I-R),0,-f*(I-R)],[0,D-U,0],F,"sombra");if(n){const R=Math.floor(d/6);for(let I=0;I<R;I++){const U=(I+.5)*d/R,D=Math.max(_(U)+7,t.base+9);D+3>t.topo-1||(S(U-.25,U+.25,D,D+2.6),b(U-.25,U+.25,D,D+2.6,.1))}continue}e.linha([M(0,t.topo-.35,.05),M(d,t.topo-.35,.05)],"pormenor");const E=Math.max(1,Math.floor(d/3.1)),y=d/E;let T=-1/0;for(let R=0;R<=d;R+=1)T=Math.max(T,_(R));const P=i()<.3;for(let R=0;R<E;R++){const I=y*(R+.5),U=m(I);if(U>=t.topo-2.6)continue;const D=U===-1/0,F=_(I);if(D&&F<t.topo-3&&F>t.base-1){const V=i();V<.45?(S(I-.55,I+.55,F,F+2.3),e.linha([M(I+.35,F+1.1),M(I+.35,F+1.2)],"pormenor"),i()<.5&&b(I-.55,I+.55,F,F+2.3,.3)):V<.75&&(S(I-1.1,I+1.1,F+.5,F+2.6),e.linha([M(I-1.1,F+2.9),M(I+1.1,F+2.9)],"pormenor"))}for(let V=Math.max(F,T-2)+3.6;V+1.6<t.topo-.6;V+=3.1){if(V<U||i()<.08)continue;const O=.5+i()*.1;if(S(I-O,I+O,V,V+1.5),e.linha([M(I,V),M(I,V+1.5)],"pormenor"),e.linha([M(I-O-.12,V-.08,.1),M(I+O+.12,V-.08,.1)],"pormenor"),i()<.35){const Y=I-O*.7;e.linha([M(Y,V+.3),M(Y+.35,V+.75)],"sombra"),e.linha([M(Y+.1,V+.2),M(Y+.45,V+.65)],"sombra")}if(i()<.12){const Y=V-.1;e.linha([M(I-O-.3,Y,.5),M(I+O+.3,Y,.5),M(I+O+.3,Y+.9,.5),M(I-O-.3,Y+.9,.5)],"pormenor",!0);for(let G=-O-.3;G<=O+.3;G+=.2)e.linha([M(I+G,Y,.5),M(I+G,Y+.9,.5)],"sombra")}}if(P&&i()<.2){const V=F+1+i()*4;e.linha([M(I+1,V),M(I+1.2,V-.4),M(I+1.1,V-.8),M(I+1.4,V-1.3)],"sombra")}}}}portalSe(t,e){const n=t.anel,i=n.length,s=S=>{const b=n[S],E=n[(S+1)%i];return Math.atan2(E[1]-b[1],E[0]-b[0])},a=[];for(let S=0;S<i;S++){const b=a[a.length-1],E=b?Math.abs(Math.atan2(Math.sin(s(S)-s(b.i1)),Math.cos(s(S)-s(b.i1)))):9;b&&E<.2?b.i1=S:a.push({i0:S,i1:S})}let o=null;for(const S of a){const b=n[S.i0],E=n[(S.i1+1)%i],y=Math.hypot(E[0]-b[0],E[1]-b[1]);y<4||(E[1]-b[1])/y>-.7||(!o||(b[0]+E[0])/2<(o.a[0]+o.c[0])/2)&&(o={a:b,c:E,L:y})}if(!o)return;const{a:c,c:l,L:h}=o,d=(l[0]-c[0])/h,u=(l[1]-c[1])/h,f=u,p=-d,x=(S,b,E=.04)=>Lt(c[0]+d*S+f*E,c[1]+u*S+p*E,b),g=S=>this.chao(c[0]+d*S+f*.6,c[1]+u*S+p*.6),m=(S,b,E,y,T=.18)=>e.tracejar(x(S,E),[d*(b-S),0,-u*(b-S)],[0,y-E,0],T,"sombra");this.portal(x,h,g,e,m);const v=h/2,M=Math.min(h/2-.3,3.4),_=(S,b)=>{const E=c[0]+d*S+f*b,y=c[1]+u*S+p*b;return Lt(E,y,this.chao(E,y)+.04)};for(let S=.4;S<=5.6;S+=.42)e.linha([_(v-M,S),_(v+M,S)],S<.5?"aresta":"chao");for(const S of[-1,1]){const b=[];for(let E=0;E<=5.6;E+=.7)b.push(_(v+S*M,E));e.linha(b,"pormenor")}this.pontos.portalSe=Si(c[0]+d*v+f*6,c[1]+u*v+p*6,this.chao(c[0]+d*v+f*6,c[1]+u*v+p*6))}portal(t,e,n,i,s){const a=e/2,o=n(a);for(let h=0;h<4;h++){const d=1.6+h*.45,u=3.2,f=[t(a-d,o,.05+h*.1)];for(let p=0;p<=20;p++){const x=Math.PI*(1-p/20);f.push(t(a+Math.cos(x)*d,o+u+Math.sin(x)*d,.05+h*.1))}f.push(t(a+d,o,.05+h*.1)),i.linha(f,h===0?"aresta":"pormenor")}s(a-1.6,a+1.6,o,o+3.2,.12);const c=o+8,l=[];for(let h=0;h<=16;h++){const d=Math.PI*(1-h/16);l.push(t(a+Math.cos(d)*1.3,c+2+Math.sin(d)*1.3))}i.linha([t(a-1.3,c),...l,t(a+1.3,c),t(a-1.3,c)],"aresta")}contrafortes(t,e){for(let n=0;n<t.anel.length;n++){const i=t.anel[n],s=t.anel[(n+1)%t.anel.length],a=Math.hypot(s[0]-i[0],s[1]-i[1]);if(a<9)continue;const o=(s[0]-i[0])/a,c=(s[1]-i[1])/a,l=c,h=-o;if(l<-.7)continue;const d=Math.max(1,Math.round(a/7)-1);for(let u=1;u<=d;u++){const f=a*u/(d+1),p=i[0]+o*f,x=i[1]+c*f;if(!this.livre(p+l*2,x+h*2,t))continue;const g=this.chao(p+l*.6,x+h*.6)-.5,m=t.topo-3.5;if(m-g<3)continue;const v=new Ve(1.3,m-g,1.1);v.rotateY(Math.atan2(c,o)),v.translate(p+l*.55,(g+m)/2,-(x+h*.55)),this.colisao.add(new jt(v.clone())),e.solido(v,"aresta");for(const M of[-.65,.65])e.face([Lt(p+o*M+l*1.1,x+c*M+h*1.1,m),Lt(p+o*M,x+c*M,m+1.4),Lt(p+o*M,x+c*M,m)],"pormenor");e.face([Lt(p-o*.65+l*1.1,x-c*.65+h*1.1,m),Lt(p+o*.65+l*1.1,x+c*.65+h*1.1,m),Lt(p+o*.65,x+c*.65,m+1.4),Lt(p-o*.65,x-c*.65,m+1.4)],"pormenor"),e.linha([Lt(p-o*.65+l*1.12,x-c*.65+h*1.12,g+.5+(m-g)*.45),Lt(p+o*.65+l*1.12,x+c*.65+h*1.12,g+.5+(m-g)*.45)],"pormenor")}}}torreUniversidade(){const s=this.edificioEm(108,-106);let a=0;if(s){let m=0;for(let v=0;v<s.anel.length;v++){const M=s.anel[v],_=s.anel[(v+1)%s.anel.length],S=Math.hypot(_[0]-M[0],_[1]-M[1]);S>m&&(m=S,a=Math.atan2(_[1]-M[1],_[0]-M[0]))}}const o=new Ii("torre-universidade",.8,1),c=Math.cos(a),l=Math.sin(a),h=-l,d=c,u=(m,v,M)=>Lt(108+c*m+h*v,-106+l*m+d*v,M),f=(m,v,M)=>{const _=new Ve(m*2,M-v,m*2);_.rotateY(a),_.translate(108,(v+M)/2,106),o.solido(_,"aresta"),this.colisao.add(new jt(_.clone()))},p=133.2-11;f(3.6,99.1-2,p),f(3.9,p,p+.5),f(3.3,p+.5,133.2-4),f(3.6,133.2-4,133.2-3.6);const x=new In(2.6,16,8,0,Math.PI*2,0,Math.PI/2);x.scale(1,.8,1),x.translate(108,133.2-3.6,106),o.solido(x,"pormenor",35);const g=new Je(.5,.6,1.6,8);g.translate(108,133.2-1,106),o.solido(g,"aresta",30);for(let m=0;m<4;m++){const v=(y,T)=>{const P=Math.cos(m*Math.PI/2),R=Math.sin(m*Math.PI/2);return[y*P-T*R,y*R+T*P]},M=(y,T,P)=>u(...v(y,P),T),_=[];for(let y=0;y<=12;y++){const T=Math.PI*(1-y/12);_.push(M(Math.cos(T)*1.4,p+4.6+Math.sin(T)*1.4,3.32))}o.linha([M(-1.4,p+1,3.32),..._,M(1.4,p+1,3.32)],"aresta");const S=M(-1.3,p+1.1,3.31),b=M(1.3,p+1.1,3.31);o.tracejar(S,[b[0]-S[0],0,b[2]-S[2]],[0,4.8,0],.14,"sombra");const E=p-3.2;o.linha(Array.from({length:21},(y,T)=>{const P=T/20*Math.PI*2;return M(Math.cos(P)*1.3,E+Math.sin(P)*1.3,3.62)}),"aresta");for(let y=0;y<12;y++){const T=y/12*Math.PI*2;o.linha([M(Math.cos(T)*1.05,E+Math.sin(T)*1.05,3.62),M(Math.cos(T)*1.25,E+Math.sin(T)*1.25,3.62)],"pormenor")}o.linha([M(0,E,3.63),M(0,E+.8,3.63)],"aresta"),o.linha([M(0,E,3.63),M(.55,E-.25,3.63)],"aresta");for(let y=99.1+6;y<E-3;y+=5)o.linha([M(-.4,y,3.62),M(.4,y,3.62),M(.4,y+1.6,3.62),M(-.4,y+1.6,3.62)],"pormenor",!0);for(let y=99.1;y<p;y+=.9)o.linha([M(3.62,y,3.62),M(3.62-(Math.round(y)%2?.9:.5),y,3.62)],"sombra")}this.cena.add(o.acabar("longe"))}ameias(t,e){const n=t.topo;for(let i=0;i<t.anel.length;i++){const s=t.anel[i],a=t.anel[(i+1)%t.anel.length],o=Math.hypot(a[0]-s[0],a[1]-s[1]),c=Math.atan2(a[1]-s[1],a[0]-s[0]);for(let l=.6;l<o-.6;l+=1.9){const h=s[0]+(a[0]-s[0])*l/o,d=s[1]+(a[1]-s[1])*l/o;e.caixa(1,1.3,.7,h,n+.65,-d,c)}}}claustro(t,e){const n=t.anel,i=t.furos[0],s=t.topo,a=t.base-.8,o=this.pontoLargo();let c=-1,l=1/0;for(let d=0;d<n.length;d++){const u=n[d],f=n[(d+1)%n.length],p=Math.hypot(f[0]-u[0],f[1]-u[1]);if(p<6)continue;const x=(u[0]+f[0])/2,g=(u[1]+f[1])/2,m=(f[1]-u[1])/p,v=-(f[0]-u[0])/p;if(!this.livre(x+m*2,g+v*2,t))continue;const M=Math.hypot(x-o[0],g-o[1]);M<l&&(l=M,c=d)}const h=new Map;if(c>=0){const d=n[c],u=n[(c+1)%n.length],f=Math.hypot(u[0]-d[0],u[1]-d[1]);h.set(c,[[f/2-1.3,f/2+1.3,3.4]]);const p=(d[0]+u[0])/2,x=(d[1]+u[1])/2,g=(u[1]-d[1])/f,m=-(u[0]-d[0])/f;this.pontos.portaClaustro=Si(p+g*2.5,x+m*2.5,this.chao(p+g*2.5,x+m*2.5)),this.pontos.dentroClaustro=Si(p-g*2.5,x-m*2.5,this.chao(p-g*2.5,x-m*2.5))}if(this.paredesComAberturas(n,a,s,h,e,.6,!1),i){const d=new Map,u=[...i].reverse();for(let m=0;m<u.length;m++){const v=u[m],M=u[(m+1)%u.length],_=Math.hypot(M[0]-v[0],M[1]-v[1]),S=Math.floor(_/3.4),b=[];for(let E=0;E<S;E++){const y=_/S*(E+.5);b.push([y-1.1,y+1.1,3])}d.set(m,b)}this.paredesComAberturas(u,a,s,d,e,.6,!0);const f=i.map(m=>m[0]),p=i.map(m=>m[1]),x=f.reduce((m,v)=>m+v)/f.length,g=p.reduce((m,v)=>m+v)/p.length;this.pontos.patio=Si(x,g,this.chao(x,g))}if(this.tampa(n,i?[i]:[],s,e),i&&this.pisoClaustro){const d=this.pisoClaustro+4.5;this.tampa(n,[i],d,e);const u=(f,p)=>f.map(([x,g],m)=>{const v=f[(m-1+f.length)%f.length],M=f[(m+1)%f.length],_=Math.hypot(x-v[0],g-v[1])||1,S=Math.hypot(M[0]-x,M[1]-g)||1,b=[(g-v[1])/_,-(x-v[0])/_],E=[(M[1]-g)/S,-(M[0]-x)/S];return Lt(x-(b[0]+E[0])*.5*p,g-(b[1]+E[1])*.5*p,d-.02)});e.linha(u(i,.03),"aresta",!0);for(let f=0;f<i.length;f++){const p=i[f],x=i[(f+1)%i.length],g=Math.hypot(x[0]-p[0],x[1]-p[1]),m=(x[0]-p[0])/g,v=(x[1]-p[1])/g;for(let M=1.2;M<g-1;M+=2.5){const _=p[0]+m*M,S=p[1]+v*M,b=-v,E=m;let y=.1;for(;y<8&&bi(_+b*y,S+E*y,n);)y+=.3;e.linha([Lt(_+b*.1,S+E*.1,d-.03),Lt(_+b*(y-.4),S+E*(y-.4),d-.03)],"pormenor")}}}if(i&&this.pisoClaustro&&this.detalhesClaustro(n,i,s,e),this.pontos.patio){const d=this.pontos.patio,u=new Je(1.4,1.6,.8,24);u.translate(d.x+3,d.y+.4,d.z+2),e.solido(u,"aresta",50);const f=new Je(1.4,1.4,.01,24,1,!0);f.translate(d.x+3,d.y+.8,d.z+2),e.solido(f,!1);const p=new Je(.15,.2,1.4,8);p.translate(d.x+3,d.y+1.1,d.z+2),e.solido(p,"pormenor",50);const x=new Je(1.6,1.6,1.4,12);x.translate(d.x+3,d.y+.7,d.z+2),this.colisao.add(new jt(x))}}detalhesClaustro(t,e,n,i){const s=this.pisoClaustro,a=s+4.5,o=Ji(oa("claustro")),c=(x,g)=>bi(x,g,e),l=(x,g)=>bi(x,g,t)&&!c(x,g),h=[...e].reverse();for(let x=0;x<h.length;x++){const g=h[x],m=h[(x+1)%h.length],v=Math.hypot(m[0]-g[0],m[1]-g[1]),M=(m[0]-g[0])/v,_=(m[1]-g[1])/v,S=_,b=-M;for(let T=1.3;T<9;T+=1.3){const P=[];for(let R=0;R<=v;R+=.5){const I=g[0]+M*R+S*T,U=g[1]+_*R+b*T;l(I,U)&&P.push([I,U])}for(let R=1;R<P.length;R++)Math.hypot(P[R][0]-P[R-1][0],P[R][1]-P[R-1][1])>.6||i.linha([Lt(...P[R-1],this.chao(...P[R-1])+.03),Lt(...P[R],this.chao(...P[R])+.03)],"chao")}for(let T=.6;T<v;T+=1.1+o()*.4)for(let P=.7;P<9;P+=1.3){const R=g[0]+M*T+S*P,I=g[1]+_*T+b*P;if(!l(R,I)||!l(R+S*1.3,I+b*1.3))continue;const U=D=>Lt(R+S*D,I+b*D,this.chao(R+S*D,I+b*D)+.03);i.linha([U(.05),U(1.25)],"chao")}const E=(T,P)=>Lt(g[0]+M*T-S*.64,g[1]+_*T-b*.64,P);i.linha([E(0,a+.1),E(v,a+.1)],"aresta"),i.linha([E(0,a+.35),E(v,a+.35)],"pormenor");const y=Math.floor(v/3.4);for(let T=0;T<y;T++){const P=v/y*(T+.5),R=a+1.3,I=Math.min(n-1,R+1.8);if(!(I-R<1)){for(const U of[-.42,.42]){const D=[E(P+U-.3,R)];for(let F=0;F<=8;F++){const V=Math.PI*(1-F/8);D.push(E(P+U+Math.cos(V)*.3,I-.3+Math.sin(V)*.3))}D.push(E(P+U+.3,R)),i.linha([...D,D[0]],"pormenor")}i.linha([E(P-.85,R-.08),E(P+.85,R-.08)],"pormenor")}}}for(let x=0;x<t.length;x++){const g=t[x],m=t[(x+1)%t.length],v=Math.hypot(m[0]-g[0],m[1]-g[1]),M=(m[0]-g[0])/v,_=(m[1]-g[1])/v,S=-_,b=M,E=(y,T)=>Lt(g[0]+M*y+S*.64,g[1]+_*y+b*.64,T);for(let y=2.2;y<v-2.2;y+=4.6){const T=g[0]+M*y+S*1.6,P=g[1]+_*y+b*1.6;if(!l(T,P)||o()<.25)continue;const R=this.chao(T,P),I=1.2,U=R+1.6,D=[];for(let O=0;O<=10;O++){const Y=Math.PI*(1-O/10);D.push(E(y+Math.cos(Y)*I,U+Math.sin(Y)*I*1.1))}i.linha([E(y-I,R),...D,E(y+I,R)],"aresta"),i.linha([E(y-I-.2,R),...D.map((O,Y)=>{const G=Math.PI*(1-Y/10);return E(y+Math.cos(G)*(I+.2),U+Math.sin(G)*(I+.2)*1.1)}),E(y+I+.2,R)],"pormenor"),i.linha([E(y-I+.1,R+.75),E(y+I-.1,R+.75)],"pormenor"),i.linha([E(y-I+.1,R+.9),E(y+I-.1,R+.9)],"pormenor");for(let O=-.7;O<=.71;O+=.7)i.linha([E(y+O-.15,R+.2),E(y+O+.15,R+.2),E(y+O+.15,R+.6),E(y+O-.15,R+.6)],"sombra",!0);const F=E(y-I+.1,R+1),V=E(y+I-.1,R+1);i.tracejar(F,[V[0]-F[0],0,V[2]-F[2]],[0,U-R-.2,0],.12,"sombra")}}const d=e.map(x=>x[0]),u=e.map(x=>x[1]),f=d.reduce((x,g)=>x+g)/d.length+3,p=u.reduce((x,g)=>x+g)/u.length-2;for(const[x,g]of[[1,1],[1,-1],[-1,1],[-1,-1]]){const m=f+x*2.8,v=f+x*7.5,M=p+g*2.8,_=p+g*7.5,S=[[m,M],[v,M],[v,_],[m,_]];if(!S.every(([E,y])=>c(E,y)))continue;const b=(E,y,T=.04)=>Lt(E,y,this.chao(E,y)+T);i.linha(S.map(([E,y])=>b(E,y)),"pormenor",!0),i.linha([[m+x*.3,M+g*.3],[v-x*.3,M+g*.3],[v-x*.3,_-g*.3],[m+x*.3,_-g*.3]].map(([E,y])=>b(E,y)),"chao",!0);for(let E=0;E<26;E++){const y=m+(v-m)*o(),T=M+(_-M)*o();i.linha([b(y-.15,T),b(y-.05,T+.08,.15),b(y+.05,T-.02,.1),b(y+.15,T+.06)],"sombra")}}}paredesComAberturas(t,e,n,i,s,a,o){for(let c=0;c<t.length;c++){const l=t[c],h=t[(c+1)%t.length],d=h[0]-l[0],u=h[1]-l[1],f=Math.hypot(d,u);if(f<.2)continue;const p=d/f,x=u/f,g=Math.atan2(u,d),m=(i.get(c)??[]).filter(([S,b])=>S>.3&&b<f-.3),v=(S,b,E,y,T=!0)=>{if(b-S<.05||y-E<.05)return;const P=(S+b)/2,R=l[0]+p*P-x*a*.5,I=l[1]+x*P+p*a*.5,U=new Ve(b-S,y-E,a);U.rotateY(g),U.translate(R,(E+y)/2,-I),this.colisao.add(new jt(U.clone())),s.solido(U,T?"aresta":!1)},M=(S,b,E)=>Lt(l[0]+p*S-x*b,l[1]+x*S+p*b,E);let _=0;for(const[S,b,E]of m){v(_,S,e,n);const y=Math.min(this.chao(l[0]+p*S,l[1]+x*S),this.chao(l[0]+p*b,l[1]+x*b));if(o==="real"){const T=(b-S)/2,P=(S+b)/2,R=y+E-T,I=y+E;v(S,b,e,y-.05,!1),v(S,b,I,n,!1),s.linha([M(S,-.01,n),M(b,-.01,n)],"aresta"),s.linha([M(S,a+.01,n),M(b,a+.01,n)],"aresta");const U=18,D=(O,Y,G=T)=>{const K=Math.PI*(1-O/U);return M(P+Math.cos(K)*G,Y,R+Math.sin(K)*G)},F=[];for(const O of[-.01,a+.01]){for(let Y=0;Y<U;Y++){const G=Y<U/2?M(S,O,I):M(b,O,I);F.push(...G,...D(Y,O),...D(Y+1,O))}F.push(...M(S,O,I),...D(U/2,O),...M(b,O,I))}for(let O=0;O<U;O++)F.push(...D(O,0),...D(O,a),...D(O+1,a),...D(O,0),...D(O+1,a),...D(O+1,0));const V=new Vt;V.setAttribute("position",new yt(F,3)),s.solido(V,!1);for(const O of[-.02,a+.02]){s.linha(Array.from({length:U+1},(Y,G)=>D(G,O)),"aresta"),s.linha(Array.from({length:U+1},(Y,G)=>D(G,O,T+.5)),"pormenor");for(let Y=1;Y<9;Y++)s.linha([D(Y*U/9,O),D(Y*U/9,O,T+.5)],"pormenor");s.linha([M(S,O,y),M(S,O,R)],"aresta"),s.linha([M(b,O,y),M(b,O,R)],"aresta")}_=b;continue}if(v(S,b,e,y-.05),v(S,b,y+E,n),o){const T=(b-S)/2,P=(S+b)/2,R=y+E-T*.6;for(const I of[-.02,a+.02]){for(const[U,D]of[[0,1],[1,1.14]]){const F=[];for(let V=0;V<=14;V++){const O=Math.PI*(V/14);F.push(M(P+Math.cos(O)*T*D,I,R+Math.sin(O)*T*.6*D))}s.linha(F,U===0?"aresta":"pormenor")}for(const U of[S,b]){const D=U===S?1:-1;s.linha([M(U-D*.12,I,R),M(U+D*.28,I,R)],"pormenor"),s.linha([M(U-D*.12,I,R-.18),M(U+D*.22,I,R-.18)],"pormenor"),s.linha([M(U+D*.1,I,y+.3),M(U+D*.1,I,R-.18)],"sombra")}}}_=b}v(_,f,e,n)}}pontoLargo(){const t=this.n.pracas.find(i=>i.osm==="way/201639837");if(!t)return[30,5];const e=t.g.map(i=>i[0]),n=t.g.map(i=>i[1]);return[e.reduce((i,s)=>i+s)/e.length,n.reduce((i,s)=>i+s)/n.length]}chaoDesenhado(){for(const n of this.n.vias){if(n.tipo!=="steps")continue;const i=n.largura??2.6,s=[0];for(let h=1;h<n.g.length;h++)s.push(s[h-1]+Math.hypot(n.g[h][0]-n.g[h-1][0],n.g[h][1]-n.g[h-1][1]));const a=s[s.length-1],o=h=>{h=Math.max(0,Math.min(a,h));let d=1;for(;d<s.length-1&&s[d]<h;)d++;const u=(h-s[d-1])/Math.max(1e-6,s[d]-s[d-1]);return[n.g[d-1][0]+(n.g[d][0]-n.g[d-1][0])*u,n.g[d-1][1]+(n.g[d][1]-n.g[d-1][1])*u]},c=h=>{const d=o(h-1.2),u=o(h+1.2),f=Math.hypot(u[0]-d[0],u[1]-d[1])||1;return[-(u[1]-d[1])/f,(u[0]-d[0])/f]},l=[[],[]];for(let h=0;h<=a;h+=.45){const[d,u]=o(h),[f,p]=c(h),x=[d+f*i/2,u+p*i/2],g=[d-f*i/2,u-p*i/2];this.quadricula(d,u).linha([Lt(...x,this.chao(...x)+.04),Lt(...g,this.chao(...g)+.04)],"chao"),l[0].push(Lt(...x,this.chao(...x)+.05)),l[1].push(Lt(...g,this.chao(...g)+.05))}for(const h of l)h.length>1&&this.quadricula(n.g[0][0],n.g[0][1]).linha(h,"pormenor")}const t=Ji(7);for(const n of this.n.pracas){const i=n.g.map(a=>a[0]),s=n.g.map(a=>a[1]);for(let a=Math.min(...i);a<Math.max(...i);a+=2.6)for(let o=Math.min(...s);o<Math.max(...s);o+=2.6){if(t()>.35)continue;const c=a+t()*2,l=o+t()*2;if(!(!bi(c,l,n.g)||this.edificioEm(c,l)))for(let h=0;h<3;h++){const d=c+(h-1)*.42,u=l+h%2*.2,f=this.chao(d,u)+.04;e(this.quadricula(d,u),Array.from({length:6},(p,x)=>{const g=Math.PI*(.15+x/5*.7);return Lt(d+Math.cos(g)*.22,u+Math.sin(g)*.22-.1,f)}))}}}function e(n,i){n.linha(i,"chao")}for(const n of this.n.vias)if(!(n.tipo==="steps"||n.tipo==="service"))for(let i=1;i<n.g.length;i++){const s=n.g[i-1],a=n.g[i],o=Math.hypot(a[0]-s[0],a[1]-s[1]);for(let c=t()*4;c<o;c+=3+t()*5){const l=s[0]+(a[0]-s[0])*c/o+(t()-.5)*3,h=s[1]+(a[1]-s[1])*c/o+(t()-.5)*3;if(this.edificioEm(l,h))continue;const d=this.chao(l,h)+.04,u=.18+t()*.15;this.quadricula(l,h).linha([Lt(l-u,h,d),Lt(l,h+u*.4,d),Lt(l+u,h,d)],"chao")}}}muros(){for(const t of this.n.muros){if(t.tipo==="retaining_wall")continue;const e=t.altura??(t.tipo==="city_wall"?4:1.6);for(let n=1;n<t.g.length;n++){const i=t.g[n-1],s=t.g[n],a=Math.hypot(s[0]-i[0],s[1]-i[1]);if(a<.3)continue;const o=[];for(const d of this.n.vias)if(!d.area)for(let u=1;u<d.g.length;u++){const f=Rf(i,s,d.g[u-1],d.g[u]);f!==null&&o.push(f)}const c=1.8/a,l=[];let h=0;for(const d of o.sort((u,f)=>u-f))d-c>h&&l.push([h,d-c]),h=Math.max(h,d+c);h<1&&l.push([h,1]);for(const[d,u]of l){const f=[i[0]+(s[0]-i[0])*d,i[1]+(s[1]-i[1])*d],p=[i[0]+(s[0]-i[0])*u,i[1]+(s[1]-i[1])*u],x=a*(u-d);if(x<.3)continue;const g=this.chao(f[0],f[1]),m=this.chao(p[0],p[1]),v=Math.min(g,m)-.5,M=Math.max(g,m)+e,_=new Ve(x,M-v,.5);_.rotateY(Math.atan2(p[1]-f[1],p[0]-f[0])),_.translate((f[0]+p[0])/2,(v+M)/2,-(f[1]+p[1])/2),this.colisao.add(new jt(_.clone())),this.quadricula(f[0],f[1]).solido(_)}}}}limites(){const[t,e]=this.n.meio,n=t-4,i=e-4;for(const[s,a]of[[[-n,-i],[n,-i]],[[n,-i],[n,i]],[[n,i],[-n,i]],[[-n,i],[-n,-i]]]){const o=Math.hypot(a[0]-s[0],a[1]-s[1]),c=new Ve(o,300,1);c.rotateY(Math.atan2(a[1]-s[1],a[0]-s[0])),c.translate((s[0]+a[0])/2,50,-(s[1]+a[1])/2),this.colisao.add(new jt(c))}}percurso=[];comprimentos=[];marcarPontos(){const t=l=>this.n.vias.find(h=>h.osm===l)?.g??[],e=[...t("way/1165517465"),...t("way/1165517464"),...t("way/41222814"),...t("way/121298535"),...t("way/121298533"),...t("way/121298534"),...t("way/1128379641"),...t("way/116224908"),[24,18],[32,6],[38,-1],[41,-9]],n=[];for(const l of e)(!n.length||Math.hypot(l[0]-n[n.length-1][0],l[1]-n[n.length-1][1])>.5)&&n.push(l);const i=(l,h)=>Si(l,h,this.chao(l,h)),s=this.pontos,a=l=>n.reduce((h,d)=>Math.hypot(d[0]-l[0],d[1]-l[1])<Math.hypot(h[0]-l[0],h[1]-l[1])?d:h);s.inicio=i(...n[0]),s.olharInicio=i(...a([-99,19])),s.arco=i(-82,12.5),s.largoArco=i(...a([-70,-1])),s.escadasBase=i(...a([-45,7])),s.escadasMeio=i(...a([-16,17])),s.escadasTopo=i(...a([16,13])),s.largo=i(32,6);const o=[s.portaClaustro,s.dentroClaustro,s.patio].filter(Boolean);this.percurso=[...n.map(([l,h])=>i(l,h)),...o];let c=0;this.comprimentos=this.percurso.map((l,h)=>c+=h?l.distanceTo(this.percurso[h-1]):0),this.caminhoRota=this.percurso}paredePerto(t,e,n=8){let i=null;const s=new Set;for(let a=Math.floor((t-n)/10);a<=Math.floor((t+n)/10);a++)for(let o=Math.floor((e-n)/10);o<=Math.floor((e+n)/10);o++)for(const c of this.grelha.get(a+","+o)??[])if(!(s.has(c)||c.osm===Pf||c.osm===hh)){s.add(c);for(let l=0;l<c.anel.length;l++){const h=c.anel[l],d=c.anel[(l+1)%c.anel.length],u=d[0]-h[0],f=d[1]-h[1],p=Math.hypot(u,f);if(p<2.5)continue;const x=ie.clamp(((t-h[0])*u+(e-h[1])*f)/(p*p),.15,.85),g=h[0]+u*x,m=h[1]+f*x,v=Math.hypot(t-g,e-m),M=f/p,_=-u/p;v<n&&(!i||v<i.d)&&(t-g)*M+(e-m)*_>0&&(i={x:g,y:m,nx:M,ny:_,ux:u/p,uy:f/p,d:v})}}return i}varandas=[];varanda(t,e,n,i){const s=this.paredePerto(t,e,8);if(!s)return;const o=this.chao(s.x+s.nx*1.2,s.y+s.ny*1.2)+.6+n*3.1,c=this.edificioEm(s.x-s.nx*.5,s.y-s.ny*.5);if(!c||o+2.8>c.topo)return;const l=(p,x,g)=>Lt(s.x+s.nx*p+s.ux*x,s.y+s.ny*p+s.uy*x,o+g),h=Math.atan2(s.uy,s.ux),d=(p,x,g,m,v,M,_)=>{const S=new Ve(m,M,v);S.rotateY(h);const[b,E,y]=l(x,p,g);S.translate(b,E,y),this.colisao.add(new jt(S.clone())),_&&i.solido(S,"aresta")};d(0,.45,-.06,1.9,.9,.12,!0),d(0,.88,.5,1.9,.06,1,!1),d(-.93,.45,.5,.06,.9,1,!1),d(.93,.45,.5,.06,.9,1,!1),i.linha([l(0,-.95,1),l(.9,-.95,1),l(.9,.95,1),l(0,.95,1)],"aresta"),i.linha([l(.9,-.95,.12),l(.9,.95,.12)],"pormenor");for(let p=-.95;p<=.96;p+=.14)i.linha([l(.9,p,0),l(.9,p,1)],"sombra");for(let p=.14;p<.9;p+=.14)for(const x of[-.95,.95])i.linha([l(p,x,0),l(p,x,1)],"sombra");for(const p of[-.7,.7])i.linha([l(.02,p,-.55),l(.7,p,-.12)],"pormenor");i.linha([l(.03,-.55,0),l(.03,-.55,2.3),l(.03,.55,2.3),l(.03,.55,0)],"aresta");const u=l(.02,-.55,0),f=l(.02,.55,0);i.tracejar(u,[f[0]-u[0],0,f[2]-u[2]],[0,2.3,0],.06,"pormenor"),this.varandas.push({pos:Si(s.x+s.nx*.45,s.y+s.ny*.45,o+.02),olhar:Si(s.x+s.nx*8,s.y+s.ny*8,o-2)})}mobiliario(){const t=new Ii("mobiliario",.4,.3),e=(c,l,h)=>this.sDe(c)+(this.sDe(l)-this.sDe(c))*h,n=this.pontos,i=[[e(n.arco,n.largoArco,.9),3,1],[e(n.largoArco,n.escadasBase,.5),-3,1],[e(n.escadasBase,n.escadasMeio,.35),3,1],[e(n.escadasBase,n.escadasMeio,.8),-3,2],[e(n.escadasMeio,n.escadasTopo,.55),3,1],[e(n.escadasTopo,n.largo,.4),-4,1]];for(const[c,l,h]of i){const d=this.noPercurso(c,l);this.varanda(d.x,-d.z,h,t)}const s=this.comprimentos[this.percurso.indexOf(this.pontos.portaClaustro)]??this.comprimentos[this.comprimentos.length-1];let a=1;for(let c=6;c<s-4;c+=13){const l=this.noPercurso(c),h=Math.min(this.percurso.length-1,this.comprimentos.findIndex(P=>P>=c)||1),d=this.percurso[h],u=this.percurso[h-1]??d,f=d.x-u.x,p=-(d.z-u.z),x=Math.hypot(f,p)||1;a=-a;const g=l.x-p/x*3*a,m=-l.z+f/x*3*a,v=this.paredePerto(g,m,7);if(!v)continue;const M=this.chao(v.x+v.nx,v.y+v.ny)+4.3,_=(P,R,I=0)=>Lt(v.x+v.nx*P+v.ux*I,v.y+v.ny*P+v.uy*I,M+R);t.linha([_(.02,0),_(.75,0)],"aresta"),t.linha([_(.02,-.45),_(.3,-.15),_(.55,-.02)],"pormenor"),t.linha(Array.from({length:9},(P,R)=>{const I=R/8*Math.PI*1.6;return _(.3+Math.cos(I)*.1,.12+Math.sin(I)*.1)}),"pormenor");const S=new Je(.2,.13,.42,6),[b,E,y]=_(.75,-.35);S.translate(b,E,y),t.solido(S,"aresta",30);const T=new Sr(.26,.2,6);T.translate(b,E+.31,y),t.solido(T,"aresta",30),t.linha([_(.75,0),_(.75,-.04)],"aresta")}this.cena.add(t.acabar());const o=[["Rua Ferreira Borges",[-106,15]],["Arco de Almedina",[-72,-1]],["Rua de Quebra-Costas",[-56,6]],["Largo da Sé Velha",[20,19]]];for(const[c,[l,h]]of o){const d=this.paredePerto(l,h,9);if(!d)continue;const u=this.chao(d.x+d.nx,d.y+d.ny)+3.1,f=d1(c),[p,x,g]=Lt(d.x+d.nx*.05,d.y+d.ny*.05,u);f.position.set(p,x,g),f.lookAt(p+d.nx,x,g-d.ny),this.cena.add(f)}}sDe(t){let e=0,n=1/0;return this.percurso.forEach((i,s)=>{const a=i.distanceTo(t);a<n&&(n=a,e=s)}),this.comprimentos[e]}noPercurso(t,e=0){const n=this.comprimentos,i=this.percurso;let s=1;for(;s<n.length-1&&n[s]<t;)s++;const a=i[s-1],o=i[s],c=ie.clamp((t-n[s-1])/Math.max(n[s]-n[s-1],.001),0,1),l=a.x+(o.x-a.x)*c,h=-(a.z+(o.z-a.z)*c),d=o.x-a.x,u=-(o.z-a.z),f=Math.hypot(d,u)||1;for(let p=1;p>=0;p-=.25){const x=l-u/f*e*p,g=h+d/f*e*p;if(!this.edificioEm(x,g))return Si(x,g,this.chao(x,g))}return Si(l,h,this.chao(l,h))}}const If=24,m1=1.62,g1=.32;class Ps{constructor(t,e=1.75,n=g1){this.raio=n,this.capsula=new Lm(t.clone().add(new C(0,n,0)),t.clone().add(new C(0,e-n,0)),n)}capsula;vel=new C;noChao=!1;get pes(){return this.capsula.start.clone().sub(new C(0,this.capsula.radius,0))}colocar(t){const e=this.capsula.end.y-this.capsula.start.y;this.capsula.start.set(t.x,t.y+this.capsula.radius,t.z),this.capsula.end.set(t.x,t.y+this.capsula.radius+e,t.z),this.vel.set(0,0,0)}static chao=null;static DECLIVE=1.2;passo(t,e){this.noChao?this.vel.y=Math.max(this.vel.y-If*t,-2):this.vel.y-=If*t;const n=this.vel.clone().multiplyScalar(t),i=Ps.chao,s=this.capsula.start.x,a=this.capsula.start.z,o=this.capsula.start.y-this.capsula.radius;if(this.capsula.translate(n),i){const c=i(s,a),l=i(this.capsula.start.x,this.capsula.start.z),h=Math.hypot(n.x,n.z);h>1e-5&&l-c>Ps.DECLIVE*h+.02&&l>o+.35&&(this.capsula.translate(new C(s-this.capsula.start.x,0,a-this.capsula.start.z)),this.vel.x=0,this.vel.z=0)}this.noChao=!1;for(let c=0;c<3;c++){const l=e.capsuleIntersect(this.capsula);if(!l)break;l.normal.y>.45?(this.noChao=!0,this.capsula.translate(new C(0,l.depth/Math.max(l.normal.y,.5),0)),this.vel.y<0&&(this.vel.y=0)):(this.vel.addScaledVector(l.normal,-l.normal.dot(this.vel)),this.capsula.translate(l.normal.multiplyScalar(l.depth)))}if(i){const c=i(this.capsula.start.x,this.capsula.start.z),l=this.capsula.start.y-this.capsula.radius;l<c?(this.capsula.translate(new C(0,c-l,0)),this.vel.y<0&&(this.vel.y=0),this.noChao=!0):l<c+.04&&this.vel.y<=0&&(this.noChao=!0)}}}class x1{constructor(t,e){this.camera=t,this.corpo=new Ps(e),document.addEventListener("keydown",n=>this.teclas.add(n.code)),document.addEventListener("keyup",n=>this.teclas.delete(n.code)),window.addEventListener("blur",()=>this.teclas.clear()),document.addEventListener("mousemove",n=>{document.pointerLockElement!==document.body||this.morto||(this.yaw-=n.movementX*.0022,this.pitch=ie.clamp(this.pitch-n.movementY*.0022,-1.5,1.5))})}corpo;yaw=0;pitch=0;teclas=new Set;vida=100;morto=!1;aCorrer=!1;distanciaPasso=0;balanco=0;onPasso=()=>{};onAterrar=()=>{};vyAntes=0;noAr=0;yOlhos=null;andar=0;get assente(){return this.noAr<.15}get posicao(){return this.corpo.pes}get olhos(){return this.camera.position}frente(){return new C(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}actualizar(t,e,n){const i=this.frente(),s=new C(-i.z,0,i.x),a=new C;this.morto||((this.teclas.has("KeyW")||this.teclas.has("ArrowUp"))&&a.add(i),(this.teclas.has("KeyS")||this.teclas.has("ArrowDown"))&&a.sub(i),(this.teclas.has("KeyD")||this.teclas.has("ArrowRight"))&&a.add(s),(this.teclas.has("KeyA")||this.teclas.has("ArrowLeft"))&&a.sub(s)),this.aCorrer=(this.teclas.has("ShiftLeft")||this.teclas.has("ShiftRight"))&&!n&&a.lengthSq()>0;const o=n?2.4:this.aCorrer?7.2:4.4;a.lengthSq()&&a.normalize().multiplyScalar(o);const c=this.corpo,l=c.noChao?14:3;c.vel.x+=(a.x-c.vel.x)*Math.min(1,l*t),c.vel.z+=(a.z-c.vel.z)*Math.min(1,l*t),c.noChao&&this.teclas.has("Space")&&!this.morto&&(c.vel.y=7.2);const h=c.noChao;this.vyAntes=c.vel.y;const d=Math.ceil(t/.008);for(let g=0;g<d;g++)c.passo(t/d,e);!h&&c.noChao&&this.vyAntes<-4&&this.onAterrar(-this.vyAntes),this.noAr=c.noChao?0:this.noAr+t;const u=Math.hypot(c.vel.x,c.vel.z);if(this.andar=ie.damp(this.andar,this.assente?Math.min(u/5,1):0,8,t),this.assente&&u>.5){this.distanciaPasso+=u*t,this.balanco+=u*t*1.9;const g=this.aCorrer?2.1:1.55;this.distanciaPasso>g&&(this.distanciaPasso=0,this.onPasso(this.aCorrer?1:n?.35:.65))}const f=this.morto?.35:m1,p=c.pes.y+f;this.yOlhos===null||Math.abs(p-this.yOlhos)>1.2||!this.assente?this.yOlhos=p:this.yOlhos=ie.damp(this.yOlhos,p,16,t),this.camera.position.copy(c.pes),this.camera.position.y=this.yOlhos;const x=this.andar*.7;this.camera.position.y+=Math.sin(this.balanco*2)*.04*x,this.camera.position.addScaledVector(s,Math.cos(this.balanco)*.025*x),this.camera.rotation.set(this.pitch,this.yaw,this.morto?.5:Math.cos(this.balanco)*.004*x,"YXZ")}}class _1{cena=new Bc;camera=new Ge(52,1,.04,6);raiz=new Se;modelo=new Se;carregador=new Se;clarao;pente=30;reserva=120;capacidade=30;cadencia=.095;espera=0;aRecarregar=0;mira=0;recuo=0;calor=0;balancoX=0;balancoY=0;tempo=0;corrida=0;constructor(t){this.cena.add(this.raiz),this.raiz.add(this.modelo),this.construir(),this.clarao=new hr(new Ts({map:t,transparent:!0,depthWrite:!1,depthTest:!1})),this.clarao.scale.setScalar(.3),this.clarao.position.set(0,.035,-.98),this.clarao.visible=!1,this.modelo.add(this.clarao)}construir(){const t=new Ii("arma",.12,.05),e=[],n=f=>{const p=f.index?f.toNonIndexed():f.clone();p.deleteAttribute("uv"),p.getAttribute("normal")||p.computeVertexNormals(),e.push(p)},i=(f,p,x,g,m,v,M=0)=>{const _=new Ve(f,p,x);_.rotateX(M),_.translate(g,m,v),t.solido(_,"aresta",20)};i(.06,.07,.34,0,0,-.1),i(.056,.025,.3,0,.045,-.1),i(.07,.065,.2,0,.005,-.37),i(.05,.03,.18,0,.045,-.36);const s=new Je(.011,.011,.36,10);s.rotateX(Math.PI/2),s.translate(0,.035,-.62),n(s),t.solido(s,"aresta",50);const a=new Je(.016,.016,.22,10);a.rotateX(Math.PI/2),a.translate(0,.068,-.4),n(a),t.solido(a,"aresta",50),i(.012,.05,.015,0,.065,-.78),i(.04,.014,.012,0,.05,-.78),i(.03,.03,.04,0,.07,-.2),i(.035,.055,.09,0,-.03,.14,-.2),i(.04,.11,.26,0,-.035,.28,-.12),i(.035,.1,.045,0,-.08,.02,.35),i(.01,.03,.06,0,-.045,-.05);const o=new Ni;o.moveTo(-.035,0),o.lineTo(.035,0),o.quadraticCurveTo(.06,-.12,.1,-.2),o.lineTo(.03,-.22),o.quadraticCurveTo(-.01,-.12,-.035,0);const c=new br(o,{depth:.04,bevelEnabled:!1,curveSegments:6});c.translate(0,0,-.02),c.rotateY(Math.PI/2);const l=new Ii("carregador",.12,.05);l.solido(c,"aresta",25);for(let f=0;f<3;f++)l.linha([[.021,-.05-f*.04,.02+f*.012],[.021,-.06-f*.04,-.03+f*.015]],"sombra");this.carregador.add(l.acabar("arma",Cf)),this.carregador.position.set(0,-.03,-.2),this.modelo.add(this.carregador);const h=(f,p,x)=>{const g=p.clone().sub(f),m=new Je(x*.85,x,g.length(),12,1,!0);m.translate(0,g.length()/2,0),m.applyQuaternion(new hn().setFromUnitVectors(new C(0,1,0),g.clone().normalize())),m.translate(f.x,f.y,f.z),n(m),t.solido(m,!1);const v=new C().crossVectors(g,new C(0,1,0)).normalize().multiplyScalar(x);t.linha([f.clone().add(v).toArray(),p.clone().add(v.clone().multiplyScalar(.85)).toArray()],"aresta"),t.linha([f.clone().sub(v).toArray(),p.clone().sub(v.clone().multiplyScalar(.85)).toArray()],"aresta")};h(new C(.28,-.35,.55),new C(.02,-.1,.05),.05),h(new C(-.3,-.4,.3),new C(-.02,-.03,-.36),.045);const d=(f,p,x,g,m,v)=>{const M=new In(1,10,8);M.scale(g,m,v),M.translate(f,p,x),n(M),t.solido(M,!1);const _=[];for(let S=0;S<=16;S++){const b=S/16*Math.PI*2;_.push([f+Math.cos(b)*g*1.02,p+Math.sin(b)*m*1.02,x])}t.linha(_,"aresta");for(let S=0;S<3;S++)t.linha([[f-g*.6,p+m*(.4-S*.35),x-v*.9],[f+g*.5,p+m*(.5-S*.35),x-v*.95]],"pormenor")};d(.01,-.075,.03,.045,.05,.05),d(-.01,-.02,-.37,.05,.04,.06),this.modelo.add(t.acabar("arma",Cf));const u=Nm(e);u&&this.modelo.add(o1(u,1.6)),this.modelo.traverse(f=>{f.frustumCulled=!1,f.renderOrder+=10})}redimensionar(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}podeDisparar(){return this.espera<=0&&this.aRecarregar<=0&&this.pente>0}disparar(){this.pente--,this.espera=this.cadencia,this.recuo=Math.min(1,this.recuo+.55),this.calor=Math.min(1,this.calor+.12),this.clarao.visible=!0,this.clarao.material.rotation=Math.random()*6.28,this.clarao.scale.setScalar(.22+Math.random()*.14)}recarregar(){return this.aRecarregar>0||this.pente===this.capacidade||this.reserva<=0?!1:(this.aRecarregar=1.6,!0)}dispersao(t,e){return ie.lerp(.02,.003,this.mira)+this.calor*ie.lerp(.035,.012,this.mira)+t*.006*(1-this.mira*.6)+(e?0:.05)}actualizar(t,e,n,i,s,a,o){if(this.tempo+=t,this.espera-=t,this.recuo=Math.max(0,this.recuo-t*7),this.calor=Math.max(0,this.calor-t*(this.espera>-.15?.6:2.5)),this.espera<this.cadencia-.04&&(this.clarao.visible=!1),this.aRecarregar>0&&(this.aRecarregar-=t,this.aRecarregar<=0)){const x=this.capacidade-this.pente,g=Math.min(x,this.reserva);this.pente+=g,this.reserva-=g}this.mira=ie.damp(this.mira,o&&this.aRecarregar<=0&&!a?1:0,14,t),this.corrida=ie.damp(this.corrida,a?1:0,8,t),this.balancoX=ie.damp(this.balancoX,ie.clamp(-e*3,-.06,.06),10,t),this.balancoY=ie.damp(this.balancoY,ie.clamp(n*3,-.06,.06),10,t);const c=this.mira,l=i*(1-c*.8),h=ie.lerp(.2,0,c)+this.balancoX+Math.cos(s)*.012*l,d=ie.lerp(-.25,-.108,c)+this.balancoY+Math.abs(Math.sin(s))*.016*l-this.corrida*.06,u=ie.lerp(-.36,-.3,c)+this.recuo*.05;this.raiz.position.set(h,d+Math.sin(this.tempo*1.4)*.002*(1-c),u),this.raiz.rotation.set(this.recuo*.08+this.corrida*-.35+(1-c)*.03,this.corrida*.7+this.balancoX*2+(1-c)*.05,this.corrida*.3);const f=this.aRecarregar>0?1-this.aRecarregar/1.6:0,p=f>0?Math.sin(Math.min(1,f*1.15)*Math.PI):0;this.modelo.rotation.set(-p*.25,0,p*.55),this.carregador.position.y=-.03-(f>.1&&f<.55?Math.sin((f-.1)/.45*Math.PI)*.25:0),this.camera.fov=ie.lerp(52,40,c),this.camera.updateProjectionMatrix()}}class v1{ctx;mestre;eco;ecoEnvio;ruido;ruidoRosa;vozes=new Map;falaActual=null;ultimaFalaInimigo=0;ouvinte=new C;frenteOuvinte=new C(0,0,-1);pronto=!1;legenda=()=>{};textos={};async iniciar(){if(this.pronto)return;this.ctx=new AudioContext,this.mestre=this.ctx.createGain(),this.mestre.gain.value=.9;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=6,t.attack.value=.002,t.release.value=.2,this.mestre.connect(t).connect(this.ctx.destination),this.eco=this.ctx.createConvolver(),this.eco.buffer=this.respostaRuela(1.2),this.ecoEnvio=this.ctx.createGain(),this.ecoEnvio.gain.value=.4,this.ecoEnvio.connect(this.eco).connect(this.mestre),this.ruido=this.bufferRuido(2,"branco"),this.ruidoRosa=this.bufferRuido(4,"castanho"),this.pronto=!0,this.ambiente();const e=await(await fetch("/tinta-na-alta/falas.json")).json();for(const[n,i]of Object.entries(e))this.textos[n]=i.texto;await Promise.all(Object.keys(e).map(async n=>{try{const i=await(await fetch(`/tinta-na-alta/vozes/${n}.wav`)).arrayBuffer();this.vozes.set(n,await this.ctx.decodeAudioData(i))}catch{}}))}bufferRuido(t,e){const n=this.ctx.sampleRate*t,i=this.ctx.createBuffer(1,n,this.ctx.sampleRate),s=i.getChannelData(0);let a=0;for(let o=0;o<n;o++){const c=Math.random()*2-1;e==="branco"?s[o]=c:(a=(a+.02*c)/1.02,s[o]=a*3.5)}return i}respostaRuela(t){const e=this.ctx.sampleRate,n=Math.floor(e*t),i=this.ctx.createBuffer(2,n,e);for(let s=0;s<2;s++){const a=i.getChannelData(s);for(let o=0;o<n;o++){const c=o/e;a[o]=(Math.random()*2-1)*Math.pow(1-c/t,5)*.22*Math.min(1,c*60)}for(const[o,c]of[[7,.9],[13,.7],[21,.55],[29,.5],[44,.35],[63,.25],[95,.12]]){const l=Math.floor((o+(s?3:0)+Math.random()*4)*e/1e3);for(let h=0;h<40;h++)a[l+h]+=(Math.random()*2-1)*c*(1-h/40)}}return i}ocluido=()=>!1;espacial(t,e=60,n=1,i=!1){const s=this.ctx.createGain();if(!t)return s.connect(this.mestre),{entrada:s,dist:0};const a=t.clone().sub(this.ouvinte),o=a.length(),c=o>2&&this.ocluido(t),l=this.ctx.createGain();l.gain.value=(i?Math.pow(Math.min(1,3.5/Math.max(o,.1)),1.15):1/(1+Math.pow(o/(e*.18),1.4)))*(c?.55:1);const h=this.ctx.createBiquadFilter();h.type="lowpass";const d=i?Math.max(1100,9e3/(1+o/10)):Math.max(700,18e3/(1+o/18));h.frequency.value=c?Math.max(350,d*.3):d;let u=s;if(i){const m=this.ctx.createBiquadFilter();m.type="highpass",m.frequency.value=Math.min(450,90+o*8),u=u.connect(m)}const f=this.ctx.createStereoPanner(),p=this.frenteOuvinte,x=new C(-p.z,0,p.x);if(f.pan.value=o>.5?ie.clamp(a.clone().normalize().dot(x),-1,1)*(c?.5:.8):0,u.connect(h).connect(l).connect(f).connect(this.mestre),i&&o>5){const m=this.ctx.createDelay(.3);m.delayTime.value=Math.min(.12,.025+o*.0018);const v=this.ctx.createGain();v.gain.value=Math.min(.35,.1+o/120),l.connect(m).connect(v).connect(f)}const g=this.ctx.createGain();return g.gain.value=(i?.05+Math.min(.35,o/55):Math.min(.75,.15+o/90)*n)*(c?1.8:1),f.connect(g).connect(this.ecoEnvio),{entrada:s,dist:o}}ruidoEm(t,e,n,i,s,a,o,c=.001,l,h=this.ruido){const d=this.ctx.createBufferSource();d.buffer=h,d.playbackRate.value=.9+Math.random()*.2;const u=this.ctx.createBiquadFilter();u.type=i,u.frequency.setValueAtTime(s,e),l&&u.frequency.exponentialRampToValueAtTime(l,e+n),u.Q.value=a;const f=this.ctx.createGain();f.gain.setValueAtTime(1e-4,e),f.gain.exponentialRampToValueAtTime(o,e+c),f.gain.exponentialRampToValueAtTime(1e-4,e+n),d.connect(u).connect(f).connect(t),d.start(e,Math.random()*1.5),d.stop(e+n+.05)}tom(t,e,n,i,s,a,o="sine"){const c=this.ctx.createOscillator();c.type=o,c.frequency.setValueAtTime(i,e),c.frequency.exponentialRampToValueAtTime(Math.max(1,s),e+n);const l=this.ctx.createGain();l.gain.setValueAtTime(a,e),l.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(l).connect(t),c.start(e),c.stop(e+n+.02)}tiro(t,e=!1){if(!this.pronto)return;const{entrada:n,dist:i}=this.espacial(t,160),s=this.ctx.currentTime+i/343,a=e?.8:1;this.ruidoEm(n,s,.03,"highpass",2500,.7,1.4*a),this.ruidoEm(n,s,.16,"lowpass",4200,.8,1.1*a,.001,300),this.ruidoEm(n,s+.004,.32,"bandpass",900,1.2,.5*a,.003,200),this.tom(n,s,.18,130,38,1.3*a),this.tom(n,s,.05,2400,900,.12*a,"square"),t||(this.ruidoEm(n,s+.045,.03,"bandpass",3800,6,.25),this.tom(n,s+.05,.04,5200,4700,.04,"triangle"))}vazio(){if(!this.pronto)return;const t=this.ctx.currentTime,{entrada:e}=this.espacial(null);this.ruidoEm(e,t,.025,"bandpass",3200,8,.5),this.tom(e,t,.03,2600,2200,.08,"triangle")}recarregar(){if(!this.pronto)return;const t=this.ctx.currentTime,{entrada:e}=this.espacial(null),n=(i,s,a)=>{this.ruidoEm(e,t+i,.05,"bandpass",s,5,a),this.tom(e,t+i,.06,s*1.3,s*1.1,a*.15,"triangle")};n(.05,1800,.5),this.ruidoEm(e,t+.12,.25,"bandpass",1200,1,.12,.05),n(.75,1500,.8),n(.8,2600,.4),n(1.25,2200,.6),n(1.38,3e3,.7)}passo(t,e,n=!1){if(!this.pronto)return;const{entrada:i}=this.espacial(t,30),s=this.ctx.currentTime,a=1+(Math.random()-.5)*.25;this.ruidoEm(i,s,.05,"bandpass",1900*a,1.3,.35*e),this.ruidoEm(i,s+.008,.09,"lowpass",500*a,.9,.5*e),this.tom(i,s,.06,n?150:110,60,.35*e),Math.random()<.4&&this.ruidoEm(i,s+.03,.05,"highpass",5e3,.5,.06*e)}aterrar(t){if(!this.pronto)return;const{entrada:e}=this.espacial(null),n=this.ctx.currentTime,i=Math.min(1,t/12);this.tom(e,n,.15,90,40,.8*i),this.ruidoEm(e,n,.12,"lowpass",900,1,.6*i)}zumbido(t){if(!this.pronto)return;const e=this.ctx.currentTime,n=this.ctx.createStereoPanner();n.pan.value=t,n.connect(this.mestre),this.ruidoEm(n,e,.18,"bandpass",3e3,5,.45,.04,1200),this.ruidoEm(n,e,.015,"highpass",4e3,.7,.5)}impacto(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,40),i=this.ctx.currentTime;this.ruidoEm(n,i,.08,"bandpass",2400+Math.random()*1500,2,.45),this.ruidoEm(n,i,.2,"lowpass",1200,.7,.15,.002),e&&this.tom(n,i+.01,.35+Math.random()*.2,2800+Math.random()*1200,900,.08,"sine")}acerto(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,50),i=this.ctx.currentTime;this.ruidoEm(n,i,.1,"lowpass",700,1.5,.9),this.tom(n,i,.1,e?220:140,70,.6);const s=this.ctx.createGain();s.connect(this.mestre),this.tom(s,i,.05,e?1800:1300,e?1600:1100,.12,"triangle")}queda(t){if(!this.pronto)return;const{entrada:e}=this.espacial(t,40),n=this.ctx.currentTime+.35;this.tom(e,n,.25,80,35,.9),this.ruidoEm(e,n,.3,"lowpass",600,.8,.6),this.ruidoEm(e,n+.18,.12,"bandpass",2600,3,.2),this.tom(e,n+.18,.2,3100,2900,.05,"triangle")}dor(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;this.tom(t,e,.2,90,50,.9),this.ruidoEm(t,e,.25,"lowpass",400,1,.7),this.tom(t,e,1.2,3900,3800,.03,"sine")}bater(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;for(const[n,i]of[[0,.5],[.33,.4]])this.tom(t,e+n,.12,70,45,i),this.tom(t,e+n+.12,.1,60,40,i*.6)}corda(){if(!this.pronto)return;const{entrada:t}=this.espacial(null),e=this.ctx.currentTime;for(let n=0;n<5;n++)this.ruidoEm(t,e+n*.12+Math.random()*.05,.1,"bandpass",1500+Math.random()*800,2,.2,.02)}guitarra(t,e){if(!this.pronto)return;const{entrada:n}=this.espacial(t,50),i=this.ctx.sampleRate,s=this.ctx.currentTime+.05;for(const[a,o,c]of e)for(const l of[0,.06]){const h=440*Math.pow(2,(o-69)/12)*(1+l/100),d=Math.floor(i*(c+.6)),u=this.ctx.createBuffer(1,d,i),f=u.getChannelData(0),p=Math.max(2,Math.round(i/h));for(let v=0;v<p;v++)f[v]=Math.random()*2-1;for(let v=p;v<d;v++)f[v]=.4985*(f[v-p]+f[v-p+1]);const x=this.ctx.createBufferSource();x.buffer=u;const g=this.ctx.createGain();g.gain.value=.22;const m=this.ctx.createBiquadFilter();m.type="peaking",m.frequency.value=2800,m.gain.value=5,x.connect(m).connect(g).connect(n),x.start(s+a+l*.2)}}sino(t,e=1){if(!this.pronto)return;const{entrada:n}=this.espacial(t,400),i=196;for(let s=0;s<e;s++){const a=this.ctx.currentTime+s*2.6;for(const[o,c,l]of[[.5,.3,6],[1,.4,4.5],[1.19,.25,3.5],[1.5,.15,3],[2,.12,2.5],[2.52,.08,1.8],[3.01,.05,1.3]])this.tom(n,a,l,i*o,i*o*.999,c*.5);this.ruidoEm(n,a,.04,"bandpass",1500,2,.2)}}ambiente(){const t=this.ctx.createBufferSource();t.buffer=this.ruidoRosa,t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="bandpass",e.frequency.value=400,e.Q.value=.6;const n=this.ctx.createGain();n.gain.value=.05;const i=this.ctx.createOscillator();i.frequency.value=.07;const s=this.ctx.createGain();s.gain.value=.035,i.connect(s).connect(n.gain);const a=this.ctx.createOscillator();a.frequency.value=.043;const o=this.ctx.createGain();o.gain.value=180,a.connect(o).connect(e.frequency),t.connect(e).connect(n).connect(this.mestre),t.start(),i.start(),a.start();const c=this.ctx.createBufferSource();c.buffer=this.ruidoRosa,c.loop=!0;const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.value=160;const h=this.ctx.createGain();h.gain.value=.06,c.connect(l).connect(h).connect(this.mestre),c.start(0,1.3);const d=()=>{if(!this.pronto)return;const u=this.ctx.currentTime,f=this.ouvinte.clone().add(new C((Math.random()-.5)*60,15,(Math.random()-.5)*60)),{entrada:p}=this.espacial(f,80);if(Math.random()<.5)for(let x=0;x<3;x++)this.tom(p,u+x*.28,.22,420,330,.06);else for(let x=0;x<4;x++)this.tom(p,u+x*.09,.07,5200+Math.random()*800,6500,.03,"triangle");setTimeout(d,5e3+Math.random()*12e3)};setTimeout(d,4e3)}coracao(t){if(!this.pronto)return;const e=this.ctx.currentTime,{entrada:n}=this.espacial(null);this.tom(n,e,.12,60,40,.5*t),this.tom(n,e+.18,.1,55,38,.35*t)}falar(t,e,n=null,i=!1){if(!this.pronto)return 0;const s=this.vozes.get(t),a=this.ctx.currentTime,o=e==="radio"?3:e==="fadista"?2:1;if(typeof e=="object"){if(a-this.ultimaFalaInimigo<1.6&&!i)return 0;this.ultimaFalaInimigo=a}if(this.falaActual&&this.falaActual.ate>a){if(this.falaActual.prioridade>o&&o!==1)return 0;if(o>=this.falaActual.prioridade&&this.falaActual.prioridade<3&&o>1)try{this.falaActual.fonte.stop()}catch{}}const c=e==="radio"?"Central":e==="fadista"?"Fadista":"Borrão";if(this.legenda(c,this.textos[t]??""),!s)return 2.5;const l=this.ctx.createBufferSource();if(l.buffer=s,e==="radio"){l.playbackRate.value=1;const d=this.ctx.createBiquadFilter();d.type="highpass",d.frequency.value=450;const u=this.ctx.createBiquadFilter();u.type="lowpass",u.frequency.value=3e3;const f=this.ctx.createWaveShaper();f.curve=Lf(3);const p=this.ctx.createGain();p.gain.value=1.1,l.connect(d).connect(f).connect(u).connect(p).connect(this.mestre),this.ruidoEm(this.mestre,a,.06,"bandpass",2e3,1,.15),this.ruidoEm(this.mestre,a+s.duration,.1,"bandpass",2e3,1,.15)}else if(e==="fadista"){l.playbackRate.value=.86;const{entrada:d}=this.espacial(n,40,1,!0),u=this.ctx.createGain();u.gain.value=1.6,l.connect(u).connect(d)}else{const d=e.inimigo;l.playbackRate.value=.7+d%5*.035;const{entrada:u}=this.espacial(n,70,1,!0),f=this.ctx.createWaveShaper();f.curve=Lf(2);const p=this.ctx.createBiquadFilter();p.type="peaking",p.frequency.value=220,p.gain.value=6;const x=this.ctx.createBiquadFilter();x.type="peaking",x.frequency.value=1700,x.Q.value=.8,x.gain.value=5;const g=this.ctx.createGain();g.gain.value=2.2,l.connect(f).connect(p).connect(x).connect(g).connect(u)}l.start();const h=s.duration/l.playbackRate.value;return this.falaActual={fonte:l,prioridade:o,ate:a+h},h}get aFalar(){return!!this.falaActual&&this.falaActual.ate>(this.ctx?.currentTime??0)}}function Lf(r){const e=new Float32Array(1024);for(let n=0;n<1024;n++){const i=n/1023*2-1;e[n]=Math.tanh(i*r)/Math.tanh(r)}return e}function uh(r,t,e=!0){const n=document.createElement("canvas");n.width=n.height=128;const i=n.getContext("2d"),s=Ji(t);i.fillStyle=r,i.beginPath();const a=18;for(let c=0;c<=a;c++){const l=c/a*Math.PI*2,h=22+s()*16,d=64+Math.cos(l)*h,u=64+Math.sin(l)*h;c===0?i.moveTo(d,u):i.lineTo(d,u)}i.fill();for(let c=0;c<12;c++){const l=s()*Math.PI*2,h=30+s()*28,d=2+s()*6;i.beginPath(),i.arc(64+Math.cos(l)*h,64+Math.sin(l)*h,d,0,7),i.fill()}if(e){i.strokeStyle=r;for(let c=0;c<7;c++){const l=s()*Math.PI*2;i.lineWidth=1.5+s()*2.5,i.beginPath(),i.moveTo(64+Math.cos(l)*26,64+Math.sin(l)*26),i.lineTo(64+Math.cos(l)*(46+s()*16),64+Math.sin(l)*(46+s()*16)),i.stroke()}}const o=new Hc(n);return o.colorSpace=tn,o}function y1(r){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=Ji(r);e.strokeStyle="#111",e.lineCap="round";for(let s=0;s<14;s++){const a=n()*Math.PI*2,o=6+n()*10,c=30+n()*30;e.lineWidth=1.5+n()*2.5,e.beginPath(),e.moveTo(64+Math.cos(a)*o,64+Math.sin(a)*o),e.lineTo(64+Math.cos(a)*c,64+Math.sin(a)*c),e.stroke()}e.lineWidth=2,e.beginPath();for(let s=0;s<=10;s++){const a=s/10*Math.PI*2,o=s%2?10:20+n()*8,c=64+Math.cos(a)*o,l=64+Math.sin(a)*o;s===0?e.moveTo(c,l):e.lineTo(c,l)}e.stroke();const i=new Hc(t);return i.colorSpace=tn,i}class M1{grupo=new Se;vivos=[];decalques=[];manchasTinta=[1,2,3,4].map(t=>uh("#111",t*31));manchasVermelhas=[1,2,3,4].map(t=>uh("#b3121b",t*77));buracos=[1,2,3].map(t=>uh("#222",t*13,!1));claroes=[1,2,3].map(t=>y1(t*5));t=0;actualizar(t){this.t+=t;for(let e=this.vivos.length-1;e>=0;e--){const n=this.vivos[e],i=(this.t-n.nasceu)/(n.ate-n.nasceu);if(i>=1){this.grupo.remove(n.obj),n.obj.traverse(s=>{s.geometry?.dispose()}),this.vivos.splice(e,1);continue}if(n.tipo==="fade")n.obj.traverse(s=>{const a=s.material;a&&"opacity"in a&&(a.opacity=(1-i)*(a.userData.op??1))});else if(n.vel){const s=n.obj,a=s.geometry.getAttribute("position");for(let o=0;o<n.vel.length;o++){n.vel[o].y-=9.8*t;for(const c of[0,1]){const l=o*2+c;a.setXYZ(l,a.getX(l)+n.vel[o].x*t*(c?1:.8),a.getY(l)+n.vel[o].y*t*(c?1:.8),a.getZ(l)+n.vel[o].z*t*(c?1:.8))}}a.needsUpdate=!0,s.material.opacity=1-i}}}rasto(t,e,n=!1){const i=new Vt().setFromPoints([t,e]),s=new sn({color:n?4473924:2236962,transparent:!0,opacity:.6});s.userData.op=.6;const a=new Ui(i,s);a.renderOrder=3,this.grupo.add(a),this.vivos.push({obj:a,nasceu:this.t,ate:this.t+(n?.12:.07),tipo:"fade"})}decalque(t,e,n,i,s=140){const a=new un({map:t,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4}),o=new jt(new is(i,i),a);if(o.position.copy(e).addScaledVector(n,.02),o.lookAt(e.clone().add(n)),o.rotateZ(Math.random()*6.28),o.renderOrder=1,this.grupo.add(o),this.decalques.push(o),this.decalques.length>s){const c=this.decalques.shift();this.grupo.remove(c),c.geometry.dispose()}}riscos(t,e,n,i,s=3,a=.5){const o=[],c=[];for(let d=0;d<n;d++){const u=e.clone().multiplyScalar(.6).add(new C(Math.random()-.5,Math.random()-.2,Math.random()-.5)).normalize().multiplyScalar(s*(.5+Math.random()));c.push(u);const f=t.clone(),p=t.clone().addScaledVector(u,.03);o.push(f.x,f.y,f.z,p.x,p.y,p.z)}const l=new Vt;l.setAttribute("position",new yt(o,3));const h=new ti(l,new sn({color:i,transparent:!0}));h.frustumCulled=!1,this.grupo.add(h),this.vivos.push({obj:h,nasceu:this.t,ate:this.t+a,tipo:"part",vel:c})}impactoParede(t,e){this.decalque(this.buracos[Math.floor(Math.random()*3)],t,e,.12+Math.random()*.06),this.riscos(t,e,7,3355443,2.5,.45);const n=new hr(new Ts({map:this.claroes[1],transparent:!0,opacity:.35,depthWrite:!1}));n.material.userData.op=.35,n.position.copy(t).addScaledVector(e,.1),n.scale.setScalar(.35),this.grupo.add(n),this.vivos.push({obj:n,nasceu:this.t,ate:this.t+.18,tipo:"fade"})}sangue(t,e,n){this.riscos(t,e,n?22:12,11735579,n?4:2.5,.6);const i=new hr(new Ts({map:this.manchasVermelhas[Math.floor(Math.random()*4)],transparent:!0,depthWrite:!1}));i.position.copy(t),i.scale.setScalar(n?.55:.35),this.grupo.add(i),this.vivos.push({obj:i,nasceu:this.t,ate:this.t+.25,tipo:"fade"})}poca(t,e=!0){const n=e?this.manchasVermelhas:this.manchasTinta;this.decalque(n[Math.floor(Math.random()*4)],t,new C(0,1,0),.9+Math.random()*.6,200)}manchaParede(t,e){this.decalque(this.manchasVermelhas[Math.floor(Math.random()*4)],t,e,.6+Math.random()*.4)}clarao(t,e=.9){const n=new hr(new Ts({map:this.claroes[Math.floor(Math.random()*3)],transparent:!0,depthWrite:!1}));n.position.copy(t),n.scale.setScalar(e),n.material.rotation=Math.random()*6.28,this.grupo.add(n),this.vivos.push({obj:n,nasceu:this.t,ate:this.t+.06,tipo:"fade"})}}const S1=new un({visible:!1});function vs(r,t,e,n,i,s){const a=r==="cabeca"?new In(t,8,6):new Ve(t,e,n);a.translate(0,i,0);const o=new jt(a,S1);return o.userData.parte=r,s.push(o),o}function nr(r,t,e,n){if(t==="tinta")return new jt(r,Lh);const i=new Ii("boneco",.25,.3);i.solido(r.clone(),"aresta",40);const s=i.acabar();if(r.type==="SphereGeometry"||r.type==="CylinderGeometry"||r.type==="CapsuleGeometry"){const a=new jt(r.clone().scale(1.12,1.06,1.12),new un({color:1118481,side:en}));s.add(a)}return s}class Bm{constructor(t,e=!0){this.estilo=t;const n=.035,i=(o,c=n)=>{const l=new Je(c,c,o,8);return l.translate(0,-o/2,0),l};this.raiz.add(this.corpo),this.corpo.add(this.anca),this.anca.position.y=.92,this.anca.add(this.peito);const s=i(.52,t==="tinta"?.05:.045);s.translate(0,.52,0),this.peito.add(nr(s,t,"tronco",this.alvos)),this.peito.add(vs("tronco",.34,.6,.24,.28,this.alvos)),this.anca.add(vs("virilha",.24,.22,.24,-.1,this.alvos)),this.peito.add(this.cabeca),this.cabeca.position.y=.68,this.cabeca.add(nr(new In(.14,16,12),t,"cabeca",this.alvos)),this.cabeca.add(vs("cabeca",.19,0,0,0,this.alvos));const a=.48;for(const[o,c,l]of[[this.bracoE,this.antebracoE,-1],[this.bracoD,this.antebracoD,1]])this.peito.add(o),o.position.set(l*.02,a,0),o.add(nr(i(.3),t,"membro",this.alvos)),o.add(c),c.position.y=-.3,c.add(nr(i(.3),t,"membro",this.alvos)),o.add(vs("membro",.13,.3,.13,-.15,this.alvos)),c.add(vs("membro",.13,.3,.13,-.15,this.alvos));for(const[o,c,l]of[[this.pernaE,this.canelaE,-1],[this.pernaD,this.canelaD,1]])this.anca.add(o),o.position.set(l*.07,0,0),o.add(nr(i(.46,.04),t,"membro",this.alvos)),o.add(c),c.position.y=-.46,c.add(nr(i(.46,.038),t,"membro",this.alvos)),o.add(vs("membro",.17,.46,.17,-.23,this.alvos)),c.add(vs("membro",.15,.46,.15,-.23,this.alvos));if(t==="tinta"&&this.acessorio(),e){const o=new Se,c=(l,h,d,u,f,p)=>{const x=new jt(new Ve(l,h,d),Lh);x.position.set(u,f,p),o.add(x)};c(.05,.08,.62,0,0,-.18),c(.02,.02,.3,0,.02,-.62),c(.04,.16,.05,0,-.1,-.12),c(.04,.1,.18,0,-.03,.2),this.arma.add(o),this.peito.add(this.arma),this.arma.position.set(.12,.34,-.25)}if(t==="contorno"){const o=new Ni;o.moveTo(-.2,0),o.lineTo(.2,0),o.lineTo(.3,-.95),o.quadraticCurveTo(0,-1.02,-.3,-.95),o.lineTo(-.2,0);const c=new wr(o,6);this.capa=new jt(c,new un({color:1381653,side:Pn})),this.capa.position.set(0,.55,.08),this.capa.rotation.x=.12,this.peito.add(this.capa);const l=new Ni;l.moveTo(0,.12),l.bezierCurveTo(.16,.12,.2,-.12,.13,-.25),l.bezierCurveTo(.06,-.34,-.06,-.34,-.13,-.25),l.bezierCurveTo(-.2,-.12,-.16,.12,0,.12);const h=new Ii("guitarra",.2,.2),d=new br(l,{depth:.08,bevelEnabled:!1,curveSegments:10});h.solido(d,"aresta",40),h.caixa(.04,.42,.03,0,.32,.04,0,"aresta");const u=new In(.035,8,6);u.translate(0,.56,.04),h.solido(u,"aresta",40);const f=[];for(let x=-2;x<=2;x++)f.push([x*.008,-.2,.085],[x*.008,.52,.06]);for(let x=0;x<f.length;x+=2)h.linha([f[x],f[x+1]],"sombra");const p=h.acabar();p.position.set(.05,.3,.14),p.rotation.set(.1,Math.PI,.35),this.peito.add(p)}this.raiz.traverse(o=>{o.frustumCulled=!1})}raiz=new Se;corpo=new Se;alvos=[];anca=new Se;peito=new Se;cabeca=new Se;bracoE=new Se;antebracoE=new Se;bracoD=new Se;antebracoD=new Se;pernaE=new Se;canelaE=new Se;pernaD=new Se;canelaD=new Se;arma=new Se;capa;fase=Math.random()*10;queda=0;quedaDir=1;dobrado=0;acessorio(){const t=Math.random(),e=n=>{const i=new jt(n,Lh);return this.cabeca.add(i),i};if(t<.22)e(new In(.15,12,6,0,Math.PI*2,0,Math.PI/2)).position.y=.03,e(new Ve(.2,.02,.14)).position.set(0,.04,-.17);else if(t<.42){const n=e(new In(.155,12,8,0,Math.PI*2,0,Math.PI/1.8));n.position.y=.02,e(new In(.05,8,6)).position.y=.19}else if(t<.58)e(new Je(.26,.26,.015,16)).position.y=.08,e(new Je(.12,.14,.14,12)).position.y=.15;else if(t<.72){const n=e(new Je(.147,.147,.06,14));n.position.y=.05;const i=e(new Ve(.04,.12,.03));i.position.set(.05,-.02,.15),i.rotation.z=.4}this.raiz.scale.setScalar(.93+Math.random()*.14)}animar(t,e,n,i=!1){if(this.queda>0)return this.cair(t);this.fase+=t*(e>.2?2.2+e*1.2:1);const s=this.fase,a=Math.min(e/4,1);if(i){this.anca.position.y=.5,this.pernaE.rotation.x=this.pernaD.rotation.x=-1.4,this.canelaE.rotation.x=this.canelaD.rotation.x=1.4,this.peito.rotation.x=.05+Math.sin(s)*.03,this.bracoE.rotation.set(.5,0,-.25+Math.sin(s*3)*.08),this.bracoD.rotation.set(.5,0,.25-Math.sin(s*3)*.08),this.antebracoE.rotation.x=this.antebracoD.rotation.x=-1.2,this.cabeca.rotation.y=Math.sin(s*.7)*.5;return}if(this.dobrado>0){this.dobrado-=t;const l=Math.min(1,this.dobrado*3,1);this.anca.position.y=.92-.12*l,this.peito.rotation.x=.9*l,this.pernaE.rotation.set(-.2*l,0,.15*l),this.pernaD.rotation.set(-.2*l,0,-.15*l),this.canelaE.rotation.x=this.canelaD.rotation.x=.4*l,this.bracoE.rotation.set(-.3*l,0,.3*l),this.bracoD.rotation.set(-.3*l,0,-.3*l),this.antebracoE.rotation.x=this.antebracoD.rotation.x=-.6*l,this.cabeca.rotation.y=Math.sin(this.fase*9)*.15*l,this.fase+=t;return}this.pernaE.rotation.z=this.pernaD.rotation.z=0,this.anca.position.y=.92+Math.abs(Math.sin(s))*.05*a-n*.06,this.pernaE.rotation.x=Math.sin(s)*.7*a-n*.15,this.pernaD.rotation.x=-Math.sin(s)*.7*a-n*.15,this.canelaE.rotation.x=Math.max(0,-Math.sin(s+1.2))*1.1*a+n*.25,this.canelaD.rotation.x=Math.max(0,Math.sin(s+1.2))*1.1*a+n*.25,this.peito.rotation.x=.08*a+n*.1+Math.sin(s*.5)*.015,this.cabeca.rotation.y=0;const o=-Math.sin(s)*.5*a,c=Math.sin(s)*.5*a;this.bracoE.rotation.set(ie.lerp(o,-1.25,n),ie.lerp(0,.5,n),-.1),this.antebracoE.rotation.x=ie.lerp(-.3,-.4,n),this.bracoD.rotation.set(ie.lerp(c-.3,-1.1,n),ie.lerp(0,-.2,n),.1),this.antebracoD.rotation.x=ie.lerp(-.5,-.9,n),this.arma.rotation.x=ie.lerp(.9,0,n),this.arma.position.set(.12,ie.lerp(.18,.36,n),ie.lerp(-.1,-.28,n)),this.capa&&(this.capa.rotation.x=.12+a*.4+Math.sin(s*2)*.05*a)}morrer(t){this.queda>0||(this.queda=.001,this.quedaDir=t)}cair(t){this.queda=Math.min(1,this.queda+t*2.2);const e=this.queda,n=e<1?1-Math.pow(1-e,3):1;this.anca.position.y=ie.lerp(.92,.12,n),this.corpo.rotation.x=-this.quedaDir*n*1.45,this.pernaE.rotation.x=-.6*n,this.canelaE.rotation.x=1.2*n,this.pernaD.rotation.x=.2*n,this.canelaD.rotation.x=.4*n,this.bracoE.rotation.set(-2.2*n,0,-.8*n),this.bracoD.rotation.set(-1.4*n,0,1*n),this.cabeca.rotation.x=-.5*n,this.arma.visible=e<.5}}const ys=r=>r[Math.floor(Math.random()*r.length)];let b1=1;class w1{constructor(t,e,n=!1){this.telhado=n,this.corpo=new Ps(t,1.75,.3),this.yaw=this.yawGuarda=e,this.boneco.raiz.position.copy(t);for(const i of this.boneco.alvos)i.userData.inimigo=this}id=b1++;boneco=new Bm("tinta");corpo;vida=100;estado="guarda";yaw;yawGuarda;tempo=Math.random()*10;reaccao=0;rajada=0;proximoTiro=0;pente=25;recarga=0;strafe=0;strafeAte=0;ultimaVista=new C;vistoHa=99;alvoMov=null;mira=0;morreuHa=0;falouViu=!1;patrulha=[];idxPatrulha=0;aDescansar=0;vel=0;rota=[];pressa=!1;get cabeca(){return this.corpo.pes.add(new C(0,1.6,0))}get vivo(){return this.estado!=="morto"}ouvir(t,e){!this.vivo||this.estado==="combate"||(this.ultimaVista.copy(t),this.estado==="guarda"&&(this.estado="alerta",this.reaccao=.4+Math.random()*.5,Math.random()<.5&&e.falar(ys(["inimigo_alerta_1","inimigo_alerta_2","inimigo_alerta_3"]),{inimigo:this.id},this.cabeca)),this.alvoMov=t.clone())}ferir(t,e,n,i,s,a){if(!this.vivo)return!1;this.vida-=t;const o=a.clone().sub(n).normalize();if(s.sangue(a,o.clone().negate().add(o.clone().multiplyScalar(2)).normalize(),e==="cabeca"),i.acerto(a,e==="cabeca"),this.ultimaVista.copy(n),this.vistoHa=0,this.estado!=="combate"&&(this.estado="combate",this.reaccao=.35),this.vida<=0){this.estado="morto";const c=new C(-Math.sin(this.yaw),0,-Math.cos(this.yaw));return this.boneco.morrer(c.dot(o)<0?1:-1),i.queda(this.corpo.pes),!0}return e==="virilha"?(this.boneco.dobrado=1.4,this.reaccao=Math.max(this.reaccao,1.4),i.falar(ys(["inimigo_tomates_1","inimigo_tomates_2"]),{inimigo:this.id},this.cabeca,!0)):Math.random()<.5&&i.falar(ys(["inimigo_ferido_1","inimigo_ferido_2"]),{inimigo:this.id},this.cabeca),this.strafeAte=0,!1}vejo(t,e,n,i){const s=this.cabeca,o=t.olhos().clone().sub(s),c=o.length();if(c>n)return!1;if(i){const h=new C(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),d=new C(o.x,0,o.z).normalize();if(h.dot(d)<Math.cos(ie.degToRad(62))&&c>4)return!1}const l=e.rayIntersect(new jn(s,o.clone().normalize()));return!l||l.distance>c-.4}actualizar(t,e,n,i,s,a,o){if(this.tempo+=t,!this.vivo){this.morreuHa+=t,this.morreuHa>.45&&this.morreuHa-t<=.45&&a.poca(this.corpo.pes.add(new C(0,.03,0))),this.boneco.animar(t,0,0);return}const c=this.estado==="guarda"?45:75,l=n.vivo()&&this.vejo(n,e,c,this.estado==="guarda"||this.estado==="alerta"),h=i&&i.vivo()&&this.vejo(i,e,50,this.estado!=="combate"),d=l?h&&Math.random()<.004?i:n:h?i:null;d?(this.estado!=="combate"&&(this.estado="combate",this.reaccao=(this.telhado?1.1:.75)+Math.random()*.6,(!this.falouViu||Math.random()<.3)&&(s.falar(ys(["inimigo_viu_1","inimigo_viu_2","inimigo_viu_3","inimigo_viu_4"]),{inimigo:this.id},this.cabeca),this.falouViu=!0)),this.ultimaVista.copy(d.pes()),this.vistoHa=0):this.vistoHa+=t;let u=null,f=null,p=!1;switch(this.estado){case"guarda":{if(this.patrulha.length){const M=this.patrulha[this.idxPatrulha];this.aDescansar>0?this.aDescansar-=t:M.distanceTo(this.corpo.pes)<.8?(this.idxPatrulha=(this.idxPatrulha+1)%this.patrulha.length,this.aDescansar=2+Math.random()*3):u=M}u||(this.yaw=this.yawGuarda+Math.sin(this.tempo*.35)*.7);break}case"alerta":{if(this.rota.length){for(;this.rota.length&&this.rota[0].distanceTo(this.corpo.pes)<1.6;)this.rota.shift();u=this.rota[0]??this.alvoMov,f=u,p=!0;break}this.reaccao-=t,this.alvoMov&&this.reaccao<0&&(this.alvoMov.distanceTo(this.corpo.pes)>3&&!this.telhado?u=this.alvoMov:(this.estado="procura",this.vistoHa=0)),f=this.alvoMov??null;break}case"combate":{if(this.reaccao-=t,f=d?d.olhos():this.ultimaVista,this.vistoHa>2.5){this.estado="procura",this.alvoMov=this.ultimaVista.clone();const _=["inimigo_perdeu_1","inimigo_perdeu_2","inimigo_alerta_3",...this.ultimaVista.distanceTo(this.corpo.pes)<14?["inimigo_medo_1","inimigo_medo_2"]:[]];Math.random()<.65&&s.falar(ys(_),{inimigo:this.id},this.cabeca);break}if(!this.telhado&&(this.tempo>this.strafeAte&&(this.strafe=Math.random()<.35?0:Math.random()<.5?-1:1,this.strafeAte=this.tempo+.8+Math.random()*1.6,Math.random()<.15&&s.falar(ys(["inimigo_combate_1","inimigo_combate_2","inimigo_combate_3","inimigo_combate_4","inimigo_combate_5"]),{inimigo:this.id},this.cabeca)),this.strafe&&f)){const M=f.clone().sub(this.corpo.pes).setY(0).normalize(),_=new C(-M.z,0,M.x).multiplyScalar(this.strafe);f.distanceTo(this.corpo.pes)>30&&_.add(M.multiplyScalar(.8)),u=this.corpo.pes.add(_.multiplyScalar(3))}if(this.recarga>0)this.recarga-=t,this.recarga<=0&&(this.pente=25);else if(d&&this.reaccao<=0&&this.mira>.8&&(this.proximoTiro-=t,this.proximoTiro<=0)){this.rajada<=0&&(this.rajada=3+Math.floor(Math.random()*4)),this.rajada--,this.pente--,this.proximoTiro=this.rajada>0?.11+Math.random()*.04:.9+Math.random()*1.1;const M=d.olhos().distanceTo(this.cabeca);let _=.24*Math.exp(-M/40)+.04;_*=d.velocidade()>5?.5:d.velocidade()>1?.75:1,this.vistoHa<.1&&this.reaccao>-1&&(_*=.6),d===i&&(_*=.3);const S=Math.random()<_,b=this.boneco.arma.localToWorld(new C(0,.02,-.85));s.tiro(b,!0),a.clarao(b,.6);const E=d.olhos().add(new C((Math.random()-.5)*1.6,(Math.random()-.3)*1.2,(Math.random()-.5)*1.6));o(b,d,S,S?d.olhos().add(new C(0,-.3,0)):E),this.pente<=0&&(this.recarga=2.2,this.rajada=0,Math.random()<.6&&s.falar(ys(["inimigo_recarregar_1","inimigo_recarregar_2"]),{inimigo:this.id},this.cabeca))}break}case"procura":{f=this.ultimaVista,!this.telhado&&this.ultimaVista.distanceTo(this.corpo.pes)>2.5?(u=this.ultimaVista,p=!0):this.yaw+=t*.8,this.vistoHa>16&&(this.estado="guarda",this.yawGuarda=this.yaw);break}}const x=this.corpo,g=new C;if(u){const M=u.clone().sub(x.pes).setY(0);M.length()>.4&&g.copy(M.normalize().multiplyScalar(this.estado==="combate"?2.2:this.pressa&&(p||this.estado==="alerta")?6.5:p||this.estado==="alerta"?3.8:1.4)),f||(f=u)}this.boneco.dobrado>0&&g.set(0,0,0),x.vel.x+=(g.x-x.vel.x)*Math.min(1,10*t),x.vel.z+=(g.z-x.vel.z)*Math.min(1,10*t);const m=x.pes;for(let M=0;M<2;M++)x.passo(t/2,e);const v=x.pes;if(this.vel=Math.hypot(v.x-m.x,v.z-m.z)/Math.max(t,1e-4),this.estado==="combate"&&this.strafe&&this.vel<.3&&(this.strafeAte=0),f){const M=f.clone().sub(x.pes);let S=Math.atan2(-M.x,-M.z)-this.yaw;S=Math.atan2(Math.sin(S),Math.cos(S)),this.yaw+=S*Math.min(1,t*(this.estado==="combate"?7:3))}this.mira=ie.damp(this.mira,this.estado==="combate"&&this.recarga<=0?1:0,6,t),this.boneco.raiz.position.copy(x.pes),this.boneco.raiz.rotation.y=this.yaw,this.boneco.animar(t,this.vel,this.mira),this.vel>1&&Math.floor(this.tempo*(this.vel>3?2.6:1.8))!==Math.floor((this.tempo-t)*(this.vel>3?2.6:1.8))&&s.passo(x.pes,this.vel>3?.8:.5)}}class T1{boneco=new Bm("contorno",!1);corpo;estado="preso";vida=100;rasto=[];yaw=0;presoHa=0;ultimaPos=new C;vel=0;cadeira;constructor(t,e){this.corpo=new Ps(t,1.75,.3),this.yaw=e,this.boneco.raiz.position.copy(t),this.boneco.raiz.rotation.y=e;const n=new Ii("banco",.3,.3);n.caixa(.5,.05,.45,0,.47,.05);for(const[i,s]of[[-.22,-.17],[.22,-.17],[-.22,.27],[.22,.27]])n.caixa(.04,.47,.04,i,.235,s);n.caixa(.5,.5,.04,0,.75,.27);for(let i=0;i<4;i++)n.linha([[-.26,.6+i*.06,.3],[.26,.62+i*.06,.3],[.2,.58+i*.06,-.05],[-.2,.6+i*.06,-.05]],"pormenor",!0);this.cadeira=n.acabar(),this.cadeira.position.copy(t),this.cadeira.rotation.y=e}olhos(){return this.corpo.pes.add(new C(0,this.estado==="preso"?1.1:1.55,0))}soltar(){this.estado="livre",this.cadeira.children.forEach(t=>{t.visible=!0}),this.corpo.colocar(this.corpo.pes.add(new C(0,.05,0)))}actualizar(t,e,n,i){if(this.estado==="morto"){this.boneco.animar(t,0,0);return}if(this.estado==="preso"){this.boneco.animar(t,0,0,!0);return}const s=this.rasto[this.rasto.length-1];(!s||s.distanceTo(n)>.8)&&this.rasto.push(n.clone()),this.rasto.length>400&&this.rasto.shift();const a=this.corpo,o=a.pes.distanceTo(n);for(;this.rasto.length>1&&this.rasto[0].distanceTo(a.pes)<.7;)this.rasto.shift();const c=this.rasto[0],l=new C;if(o>2.6&&c){const p=c.clone().sub(a.pes).setY(0);p.length()>.2&&l.copy(p.normalize().multiplyScalar(o>8||i?6.8:4.4))}a.vel.x+=(l.x-a.vel.x)*Math.min(1,10*t),a.vel.z+=(l.z-a.vel.z)*Math.min(1,10*t);for(let p=0;p<2;p++)a.passo(t/2,e);const h=a.pes;this.vel=Math.hypot(h.x-this.ultimaPos.x,h.z-this.ultimaPos.z)/Math.max(t,1e-4),this.ultimaPos.copy(h),l.lengthSq()>1&&this.vel<.4?(this.presoHa+=t,this.presoHa>.6&&a.noChao&&(a.vel.y=6),this.presoHa>2.5&&this.rasto.length>2&&(a.colocar(this.rasto[1].clone().add(new C(0,.2,0))),this.rasto.shift(),this.presoHa=0)):this.presoHa=0,o>25&&this.rasto.length>4&&(a.colocar(this.rasto[this.rasto.length-4].clone()),this.rasto=this.rasto.slice(-4));const d=l.lengthSq()>.5?l:n.clone().sub(a.pes);let f=Math.atan2(-d.x,-d.z)-this.yaw;f=Math.atan2(Math.sin(f),Math.cos(f)),this.yaw+=f*Math.min(1,t*8),this.boneco.raiz.position.copy(a.pes),this.boneco.raiz.rotation.y=this.yaw,this.boneco.animar(t,this.vel,0)}}const Ye=r=>document.querySelector(r);class E1{mira=Ye("#mira");acertoEl=Ye("#acerto");vidaEl=Ye("#vida-n");coracao=Ye("#coracao");penteEl=Ye("#pente");reservaEl=Ye("#reserva");objEl=Ye("#objectivo");marcador=Ye("#marcador");marcadorDist=Ye("#marcador-dist");legendas=Ye("#legendas");accao=Ye("#accao");accaoTexto=Ye("#accao-texto");barra=Ye("#accao-barra");dano=Ye("#dano");vinheta=Ye("#vinheta");fadistaEl=Ye("#fadista-vida");tempoAcerto=0;legendaAte=0;objectivo(t){const e=this.objEl.querySelector(".actual");e&&(e.classList.remove("actual"),e.classList.add("feito"),setTimeout(()=>e.remove(),2200));const n=document.createElement("div");n.className="actual novo",n.textContent=t,this.objEl.appendChild(n),setTimeout(()=>n.classList.remove("novo"),50)}legenda(t,e){this.legendas.innerHTML=`<b>${t}:</b> ${e}`,this.legendas.style.opacity="1",this.legendaAte=performance.now()+1200+e.length*65}acerto(t){this.acertoEl.classList.remove("mostra","morto"),this.acertoEl.offsetWidth,this.acertoEl.classList.add("mostra"),t&&this.acertoEl.classList.add("morto"),this.tempoAcerto=performance.now()}ferido(t){const e=document.createElement("div");e.className="seta-dano",e.style.transform=`translate(-50%, -50%) rotate(${t}rad)`,this.dano.appendChild(e),setTimeout(()=>e.remove(),900)}actualizar(t,e,n,i,s,a,o){this.vidaEl.textContent=String(Math.max(0,Math.ceil(t))),this.coracao.classList.toggle("fraco",t<35),this.penteEl.textContent=a?"··":String(e),this.penteEl.classList.toggle("pouco",e<=8),this.reservaEl.textContent=`${Math.ceil(n/30)} ×`;const c=6+i*900;this.mira.style.setProperty("--abre",`${Math.min(c,60)}px`),this.mira.style.opacity=s?"0":"1",this.vinheta.style.opacity=String(Math.max(0,(60-t)/60)),performance.now()>this.legendaAte&&(this.legendas.style.opacity="0"),o===null?this.fadistaEl.style.display="none":(this.fadistaEl.style.display="block",this.fadistaEl.querySelector("i").style.width=`${Math.max(0,o)}%`)}marcar(t,e,n){if(!t){this.marcador.style.display="none";return}const i=t.clone().add(new C(0,2.2,0)).project(e),s=i.z>1;let a=(i.x*.5+.5)*innerWidth,o=(-i.y*.5+.5)*innerHeight;s&&(a=innerWidth-a,o=innerHeight-130),a=ie.clamp(a,60,innerWidth-60),o=ie.clamp(o,70,innerHeight-130),this.marcador.style.display="block",this.marcador.style.transform=`translate(${a}px, ${o}px)`,this.marcadorDist.textContent=`${Math.round(t.distanceTo(n))} m`}accaoMostrar(t,e=0){this.accao.style.display=t?"flex":"none",t&&(this.accaoTexto.textContent=t),this.barra.style.width=`${e*100}%`}ecra(t,e){for(const n of["inicio","pausa","fim"])Ye("#"+n).style.display=n===t?"flex":"none";t==="fim"&&e&&(Ye("#fim .folha").innerHTML=e),document.body.classList.toggle("em-jogo",t===null)}}const Zn=new Im({antialias:!0});Zn.setPixelRatio(Math.min(devicePixelRatio,2));Zn.setSize(innerWidth,innerHeight);Zn.setClearColor(16777215);Zn.autoClear=!1;document.body.prepend(Zn.domElement);const es=new Bc,Ln=new Ge(72,innerWidth/innerHeight,.05,420);Om(innerWidth,innerHeight);const Ze=new E1;Ze.ecra("inicio");const Ru=document.querySelector("#comecar"),A1=document.querySelector("#carregar");Ru.disabled=!0;const Pu=await(await fetch("/tinta-na-alta/nivel.json")).json();await Promise.race([document.fonts.load('64px "Patrick Hand"'),new Promise(r=>setTimeout(r,2500))]).catch(()=>{});const He=new p1(Pu);He.construir();es.add(He.cena);const zm=new ul;zm.fromGraphNode(He.colisao);const Vm=new Se;for(const r of[...He.colisao.children])r.userData.terreno||Vm.add(r);const km=new ul;km.fromGraphNode(Vm);const Ci={capsuleIntersect:r=>km.capsuleIntersect(r),rayIntersect:r=>zm.rayIntersect(r)};Ps.chao=(r,t)=>He.chao(r,-t);const Jt=He.pontos,Sn=new M1;es.add(Sn.grupo);const Zt=new v1;Zt.legenda=(r,t)=>Ze.legenda(r,t);Zt.ocluido=r=>{const t=Zt.ouvinte.clone().sub(r),e=t.length(),n=Ci.rayIntersect(new jn(r,t.normalize()));return!!n&&n.distance<e-.5};const Pe=new _1(Sn.claroes[0]);Pe.redimensionar(innerWidth/innerHeight);const Tt=new x1(Ln,Jt.inicio),Gm=r=>{const t=r.clone().sub(Tt.corpo.pes);Tt.yaw=Math.atan2(-t.x,-t.z)};Gm(Jt.olharInicio);const C1=r=>[r.x,-r.z];function fe(r,t,e,n){const i=He.sDe(r),s=He.sDe(t);return He.noPercurso(i+(s-i)*e,n)}function dh(r,t){const[e,n]=C1(r),i=He.chao(e,n);let s=null;for(const a of Pu.edificios){if(t.has(a.osm)||a.passagem||a.furos.length)continue;const o=a.topo-i;if(o<4||o>13||a.cumeeira-a.topo>1.5)continue;const c=a.anel.map(m=>m[0]),l=a.anel.map(m=>m[1]),h=c.reduce((m,v)=>m+v)/c.length,d=l.reduce((m,v)=>m+v)/l.length;let u=a.anel[0],f=1/0;for(let m=0;m<a.anel.length;m++){const v=a.anel[m],M=a.anel[(m+1)%a.anel.length],_=M[0]-v[0],S=M[1]-v[1],b=_*_+S*S,E=b?Math.max(0,Math.min(1,((e-v[0])*_+(n-v[1])*S)/b)):0,y=v[0]+_*E,T=v[1]+S*E,P=Math.hypot(e-y,n-T);P<f&&(f=P,u=[y,T])}if(f>16||f<3)continue;const p=Math.hypot(h-u[0],d-u[1]);if(p<3)continue;const x=u[0]+(h-u[0])/p*1.4,g=u[1]+(d-u[1])/p*1.4;(!s||f<s.d)&&(s={pos:new C(x,a.topo+.05,-g),d:f,osm:a.osm})}return s&&t.add(s.osm),s?.pos??null}const di=[];function ve(r,t,e={}){if(!e.telhado)for(let s=0;s<12&&di.some(a=>a.corpo.pes.distanceTo(r)<1.4);s++){const a=s*2.4,o=1.5+s*.25,c=r.x+Math.cos(a)*o,l=-r.z+Math.sin(a)*o;He.edificioEm(c,l)||(r=new C(c,He.chao(c,l),-l))}const n=t.clone().sub(r),i=new w1(r.clone().add(new C(0,.1,0)),Math.atan2(-n.x,-n.z),!!e.telhado);return e.patrulha&&(i.patrulha=e.patrulha),es.add(i.boneco.raiz),di.push(i),e.alerta&&i.ouvir(e.alerta,Zt),i}const Hm=[Jt.inicio,Jt.olharInicio,Jt.arco,Jt.largoArco,Jt.escadasBase,Jt.escadasMeio,Jt.escadasTopo,Jt.largo,Jt.portaClaustro,Jt.dentroClaustro,Jt.patio];function R1(){const r=new Set,[,t,e,n,i,s,a,o,c,l,h]=Hm;ve(fe(e,n,.9,2.5),e),ve(fe(n,i,.35,-2),e,{patrulha:[fe(n,i,.2,0),fe(n,i,.8,0)]}),ve(fe(n,i,.95,1.2),n),ve(fe(i,s,.55,.8),i),ve(fe(i,s,.85,-.8),i,{patrulha:[fe(i,s,.7,0),fe(s,a,.2,0)]});const d=dh(fe(i,s,.5,0),r);d&&ve(d,i,{telhado:!0}),ve(fe(s,a,.6,1),s);const u=dh(fe(s,a,.7,0),r);u&&ve(u,s,{telhado:!0}),ve(fe(a,o,.3,-2),a),ve(fe(a,o,.9,3),a,{patrulha:[fe(a,o,.9,3),fe(o,c,.4,0)]}),ve(fe(o,c,.6,-3),o);const f=dh(o,r);f&&ve(f,a,{telhado:!0}),ve(fe(o,c,.95,2),o),ve(fe(c,l,1,0).add(new C(0,0,0)),c),ve(fe(l,h,.35,5),l),ve(fe(l,h,.35,-5),l),ve(fe(l,h,.75,4),l),ve(fe(l,h,1.05,-3),l,{patrulha:[fe(l,h,1.05,-3),fe(l,h,1.05,4)]}),P1();for(const p of He.varandas)ve(p.pos,p.olhar,{telhado:!0})}function P1(){const r=Pu.edificios.find(l=>l.osm==="relation/3475986")?.furos[0];if(!r)return;const t=Jt.patio.x,e=-Jt.patio.z,n=[t+3,e-2],i=(l,h)=>{let d=!1;for(let u=0,f=r.length-1;u<r.length;f=u++){const[p,x]=r[u],[g,m]=r[f];x>h!=m>h&&l<(g-p)*(h-x)/(m-x)+p&&(d=!d)}return d&&Math.hypot(l-n[0],h-n[1])>2.4},s=(l,h)=>{for(let d=h;d>1.6;d-=.4){const u=t+Math.cos(l)*d,f=e+Math.sin(l)*d;if(i(u,f))return new C(u,He.chao(u,f),-f)}return null},a=Math.atan2(-Jt.dentroClaustro.z-e,Jt.dentroClaustro.x-t);for(const l of[0,2.1,-2.1]){const h=s(a+l,3.2);h&&ve(h,h.clone().add(h.clone().sub(Jt.patio).setY(0).multiplyScalar(4)))}const o=[0,1,2,3].map(l=>s(a+.8+l*Math.PI/2,5.5)).filter(l=>!!l);o.length>=2&&ve(o[0],Jt.patio,{patrulha:o});const c=s(a+Math.PI,7);c&&ve(c,Jt.dentroClaustro)}function I1(){const r=Tt.corpo.pes,[,,t,e,n,i,s,a,o]=Hm;ve(fe(a,o,.2,4),o,{alerta:r}),ve(fe(s,a,.6,-2),o,{alerta:r}),ve(fe(i,s,.3,.8),s,{alerta:r}),ve(fe(n,i,.2,1),i,{alerta:r}),ve(fe(n,i,.3,-1),i,{alerta:r}),ve(fe(e,n,.6,1.5),n),ve(fe(t,e,.4,-1.5),n)}const L1=(()=>{const r=Jt.dentroClaustro.clone().sub(Jt.patio);return Math.atan2(-r.x,-r.z)})(),me=new T1(Jt.patio.clone(),L1);es.add(me.boneco.raiz,me.cadeira);const Wm={olhos:()=>Tt.olhos.clone(),pes:()=>Tt.corpo.pes,velocidade:()=>Math.hypot(Tt.corpo.vel.x,Tt.corpo.vel.z),ferir:()=>{},vivo:()=>!Tt.morto},D1={olhos:()=>me.olhos(),pes:()=>me.corpo.pes,velocidade:()=>me.vel,ferir:()=>{},vivo:()=>me.estado==="livre"},Yr=[];function U1(r){const t=new Ii("pente",.3,.2);t.caixa(.08,.04,.22,0,.02,0),t.caixa(.05,.03,.2,.09,.015,.03,.4);const e=t.acabar();e.position.copy(r).add(new C(.5,.02,.2)),es.add(e),Yr.push({obj:e,pos:e.position.clone()})}let qi=null;function N1(){const r=Jt.portalSe??Jt.largo,t=He.sDe(Tt.corpo.pes),e=He.sDe(Jt.largo),n=ve(r,Jt.largo);n.rota=He.percurso.filter((i,s)=>{const a=He.comprimentos[s];return a>=t&&a<=e}).reverse(),n.pressa=!0,n.ouvir(Tt.corpo.pes,Zt),qi={e:n,desde:Ei,gritou:!1}}let Qe="arco",Li=!1,vr=!1,Ei=0,Xm=0,Dh=0,qm=0,Yi=0,Ym=-99,Df=!1,Uf=0;const Uh={arco:"Passa o Arco de Almedina",largo:"Sobe o Quebra-Costas até ao Largo da Sé Velha",claustro:"Entra no claustro da Sé Velha",soltar:"Solta o fadista no pátio do claustro",fuga:"Leva o fadista até ao Arco de Almedina",fim:""},F1=()=>Qe==="arco"?Jt.arco:Qe==="largo"?Jt.largo:Qe==="claustro"?Jt.dentroClaustro:Qe==="soltar"?Jt.patio:Qe==="fuga"?Jt.olharInicio:null;function or(r,t){Qe=r,Uh[r]&&Ze.objectivo(Uh[r]),t&&setTimeout(()=>Zt.falar(t,"radio"),400)}const Nf=[[0,57,1.2],[.05,64,.4],[.3,69,.4],[.6,72,.4],[.9,71,.3],[1.2,69,.7],[1.2,53,1.2],[1.8,67,.3],[2.1,65,.3],[2.4,64,1.2],[2.4,52,1.2],[3.2,68,.3],[3.5,71,.3],[3.8,69,1.4],[3.8,57,1.4]];function dl(r,t){if(vr)return;vr=!0,Qe="fim";const e=Dh?Math.round(qm/Dh*100):0,n=Math.floor(Ei/60),i=Math.floor(Ei%60);setTimeout(()=>{document.exitPointerLock(),Ze.ecra("fim",`
      <p class="carimbo">${r?"cumprida":"falhada"}</p>
      <h2>${r?"A Serenata está salva":"Missão falhada"}</h2>
      <p>${t}</p>
      <table>
        <tr><td>tempo</td><td>${n}:${String(i).padStart(2,"0")}</td></tr>
        <tr><td>Borrões abatidos</td><td>${Xm}</td></tr>
        <tr><td>pontaria</td><td>${e}%</td></tr>
      </table>
      <button onclick="location.reload()">Outra vez</button>`)},r?6500:3500)}let yr=!1,fl=!1;document.addEventListener("mousedown",r=>{!Li||document.pointerLockElement!==document.body||(r.button===0&&(yr=!0),r.button===2&&(fl=!0))});document.addEventListener("mouseup",r=>{r.button===0&&(yr=!1),r.button===2&&(fl=!1)});document.addEventListener("contextmenu",r=>r.preventDefault());document.addEventListener("keydown",r=>{!Li||Tt.morto||r.code==="KeyR"&&Pe.recarregar()&&Zt.recarregar()});Ru.addEventListener("click",()=>{document.body.requestPointerLock(),Zt.iniciar(),Li||(Li=!0,Ze.ecra(null),or("arco","radio_inicio"),setTimeout(()=>Zt.sino(Jt.largo.clone().add(new C(40,30,0)),3),9e3))});document.addEventListener("pointerlockchange",()=>{if(!Li||vr)return;const r=document.pointerLockElement===document.body;Ze.ecra(r?null:"pausa"),r||(yr=!1,fl=!1,Tt.teclas.clear()),Zt.pronto&&(r?Zt.ctx.resume():Zt.ctx.suspend())});document.querySelector("#pausa").addEventListener("click",()=>document.body.requestPointerLock());addEventListener("resize",()=>{Zn.setSize(innerWidth,innerHeight),Ln.aspect=innerWidth/innerHeight,Ln.updateProjectionMatrix(),Pe.redimensionar(Ln.aspect),Om(innerWidth,innerHeight)});Tt.onPasso=r=>Zt.passo(null,r);Tt.onAterrar=r=>{Zt.aterrar(r),r>13&&Iu((r-13)*8,Tt.corpo.pes.clone().add(new C(0,-1,0)))};const fh=new ym,O1={cabeca:100,tronco:38,membro:24,virilha:55};function Zm(){Pe.disparar(),Dh++,Zt.tiro(null);const r=Pe.dispersao(Math.hypot(Tt.corpo.vel.x,Tt.corpo.vel.z)/4,Tt.corpo.noChao),t=new C(0,0,-1).applyEuler(new Vn((Math.random()-.5)*r*2,(Math.random()-.5)*r*2,0)).applyQuaternion(Ln.quaternion),e=Ln.position.clone();Tt.pitch=Math.min(1.5,Tt.pitch+.009+Math.random()*.006*(1-Pe.mira*.5)),Tt.yaw+=(Math.random()-.5)*.006,fh.set(e,t),fh.far=250;const n=di.filter(o=>o.vivo&&o.corpo.pes.distanceTo(e)<250).flatMap(o=>o.boneco.alvos),i=fh.intersectObjects(n,!1)[0],s=Ci.rayIntersect(new jn(e,t)),a=new C(.12,-.08,-.9).applyQuaternion(Ln.quaternion).add(e);if(i&&(!s||i.distance<s.distance)){const o=i.object.userData.inimigo,c=i.object.userData.parte;qm++;const l=o.ferir(O1[c]*(.9+Math.random()*.2),c,e,Zt,Sn,i.point);Ze.acerto(l),Sn.rasto(a,i.point);const h=Ci.rayIntersect(new jn(i.point,t));if(h&&h.distance<2.5&&Sn.manchaParede(h.position,h.triangle.getNormal(new C)),l){Xm++,U1(o.corpo.pes);const d=di.find(u=>u.vivo&&u!==o&&u.corpo.pes.distanceTo(o.corpo.pes)<25);d&&setTimeout(()=>Zt.falar(Math.random()<.5?"inimigo_baixa_1":"inimigo_baixa_2",{inimigo:d.id},d.cabeca),700);for(const u of di)u.vivo&&u.corpo.pes.distanceTo(o.corpo.pes)<22&&u.ouvir(Tt.corpo.pes,Zt)}}else if(s){const o=s.triangle.getNormal(new C);o.dot(t)>0&&o.negate(),Sn.impactoParede(s.position,o),Sn.rasto(a,s.position),Zt.impacto(s.position,Math.random()<.25)}else Sn.rasto(a,e.clone().addScaledVector(t,120));for(const o of di)o.vivo&&o.corpo.pes.distanceTo(e)<65&&o.ouvir(Tt.corpo.pes,Zt)}function Iu(r,t){if(Tt.morto||vr)return;Tt.vida-=r,Ym=Ei,Zt.dor();const e=t.clone().sub(Tt.corpo.pes),n=Math.atan2(e.x,-e.z)+Tt.yaw;Ze.ferido(-n),Tt.pitch+=.02,Tt.vida<35&&!Df&&(Df=!0,Zt.falar("radio_ferido","radio")),Tt.vida<=0&&(Tt.morto=!0,yr=!1,Zt.falar("radio_morreste","radio"),dl(!1,"Caíste nas ruelas da Alta. Os Borrões ficaram com o fadista."))}function B1(r,t,e,n){const i=n.clone().sub(r).normalize(),s=Ci.rayIntersect(new jn(r,i)),a=n.distanceTo(r),o=s&&s.distance<a-.3;if(e&&!o){Sn.rasto(r,n,!0),t===Wm?Iu(7+Math.random()*4,r):me.estado==="livre"&&(me.vida-=6,Sn.sangue(n,i,!1),Math.random()<.5&&Zt.falar(Math.random()<.5?"fadista_medo_1":"fadista_medo_2","fadista",me.olhos()),me.vida<=0&&(me.estado="morto",me.boneco.morrer(1),Zt.queda(me.corpo.pes),Zt.falar("radio_fadista_caiu","radio"),dl(!1,"O fadista não chegou à Serenata.")));return}const c=o||s&&s.distance<200?s.position:r.clone().addScaledVector(i,150);if(Sn.rasto(r,c,!0),s&&s.distance<200){const u=s.triangle.getNormal(new C);u.dot(i)>0&&u.negate(),Sn.impactoParede(s.position,u),s.position.distanceTo(Tt.olhos)<12&&Zt.impacto(s.position,Math.random()<.35)}const l=Tt.olhos,h=ie.clamp(l.clone().sub(r).dot(i),0,r.distanceTo(c)),d=r.clone().addScaledVector(i,h);if(d.distanceTo(l)<2.2){const u=d.clone().sub(l).dot(new C(Math.cos(Tt.yaw),0,-Math.sin(Tt.yaw)));Zt.zumbido(ie.clamp(u,-1,1))}}R1();A1.textContent="";Ru.disabled=!1;const Zr=new URLSearchParams(location.search);Zr.get("em")&&Jt[Zr.get("em")]&&(Tt.corpo.colocar(Jt[Zr.get("em")]),Gm(Jt[Zr.get("olhar")??"largo"]??Jt.largo));window.dbg={THREE:Jb,octree:Ci,mundo:He,jog:Tt,camera:Ln,inimigos:di,fadista:me,P:Jt,arma:Pe,som:Zt,hud:Ze,cena:es,comecar:()=>{Li=!0,Ze.ecra(null),or("arco")},disparar:()=>Zm(),ferir:r=>Iu(r,Tt.corpo.pes),soltar:()=>{Yi=1},fase:()=>Qe,vencer:()=>dl(!0,"Teste.")};const Ff=new bu;let Of=Tt.yaw,Bf=Tt.pitch;Zn.setAnimationLoop(()=>{Ff.update();const r=Math.min(Ff.getDelta(),.05);if(Li&&(document.pointerLockElement===document.body||Zr.has("auto"))){Ei+=r,Tt.actualizar(r,Ci,Pe.mira>.5);const e=Tt.corpo.pes;yr&&!Tt.morto&&!Tt.aCorrer&&(Pe.podeDisparar()?Zm():Pe.pente===0&&Pe.aRecarregar<=0&&(Pe.reserva>0?Pe.recarregar()&&Zt.recarregar():(Zt.vazio(),yr=!1))),Pe.actualizar(r,Tt.yaw-Of,Tt.pitch-Bf,Tt.andar,Tt.balanco,Tt.aCorrer,fl),Of=Tt.yaw,Bf=Tt.pitch,Ln.fov=ie.lerp(72,56,Pe.mira),Ln.updateProjectionMatrix(),!Tt.morto&&Ei-Ym>6&&(Tt.vida=Math.min(100,Tt.vida+r*5)),Tt.vida<35&&!Tt.morto&&Ei>Uf&&(Zt.coracao(1-Tt.vida/35),Uf=Ei+.9);for(let i=Yr.length-1;i>=0;i--)Yr[i].pos.distanceTo(e)<1.6&&Pe.reserva<240&&(Pe.reserva+=30,Zt.recarregar(),es.remove(Yr[i].obj),Yr.splice(i,1),Ze.legenda("","+1 carregador"));const n=me.estado==="livre"?D1:null;for(const i of di)!i.vivo&&i.corpo.pes.distanceTo(e)>200||i.actualizar(r,Ci,Wm,n,Zt,Sn,B1);if(me.actualizar(r,Ci,e,Tt.aCorrer),!vr){if(!qi&&Qe!=="arco"&&e.distanceTo(Jt.escadasBase)<8&&N1(),qi&&!qi.gritou&&qi.e.vivo){const i=qi.e;(di.some(a=>a!==i&&a.vivo&&a.corpo.pes.distanceTo(i.corpo.pes)<3.5)||Ei-qi.desde>8)&&(Zt.falar("inimigo_guedes",{inimigo:i.id},i.cabeca,!0),qi.gritou=!0)}if(Qe==="arco"&&e.distanceTo(Jt.arco)<7?or("largo","radio_arco"):Qe==="largo"&&e.distanceTo(Jt.largo)<14?or("claustro","radio_largo"):Qe==="claustro"&&e.distanceTo(Jt.dentroClaustro)<6&&or("soltar","radio_claustro"),Qe==="soltar"||Qe!=="fuga"&&me.estado==="preso"&&e.distanceTo(Jt.patio)<2.4)if(e.distanceTo(Jt.patio)<2.4){const s=Tt.teclas.has("KeyF");if(Yi=s?Yi+r/1.4:Math.max(0,Yi-r),s&&Math.floor(Yi*5)!==Math.floor((Yi-r/1.4)*5)&&Zt.corda(),Ze.accaoMostrar("Desatar o fadista (manter)",Yi),Yi>=1){Ze.accaoMostrar(null),me.soltar(),Qe!=="soltar"&&Ze.objectivo(Uh.soltar);const a=Zt.falar("fadista_solto","fadista",me.olhos());Zt.guitarra(me.olhos(),Nf.slice(0,10)),setTimeout(()=>{or("fuga","radio_fuga"),I1()},(a+.6)*1e3),Qe="fuga",Ze.objectivo("…")}}else Ze.accaoMostrar(null);if(Qe==="fuga"&&me.estado==="livre")if(e.distanceTo(Jt.olharInicio)<9&&me.corpo.pes.distanceTo(e)<14){me.estado="salvo";const i=Zt.falar("fadista_fim","fadista",me.olhos());Zt.guitarra(me.olhos(),Nf),setTimeout(()=>Zt.falar("radio_fim","radio"),(i+.5)*1e3),Zt.sino(Jt.largo.clone().add(new C(40,30,0)),4),dl(!0,"O fadista desceu o Quebra-Costas contigo. À meia-noite, nas escadas da Sé Velha, canta para ti.")}else me.corpo.pes.distanceTo(e)>18&&Math.random()<r*.15?Zt.falar("fadista_segue_2","fadista",me.olhos()):Math.random()<r*.02&&Zt.falar("fadista_segue_1","fadista",me.olhos())}Sn.actualizar(r),Zt.ouvinte.copy(Ln.position),Zt.frenteOuvinte.copy(Tt.frente())}else if(!Li){Tt.yaw+=Math.sin(performance.now()/3e3)*4e-4,Tt.actualizar(r,Ci,!1);for(const e of di)e.boneco.animar(r,0,0);me.boneco.animar(r,0,0,!0)}Ze.actualizar(Tt.vida,Pe.pente,Pe.reserva,Pe.dispersao(Math.hypot(Tt.corpo.vel.x,Tt.corpo.vel.z)/4,Tt.corpo.noChao),Pe.mira>.7,Pe.aRecarregar>0,me.estado==="livre"?me.vida:null),Ze.marcar(Li&&!vr?F1():null,Ln,Tt.corpo.pes),Zn.clear(),Zn.render(es,Ln),Tt.morto||(Zn.clearDepth(),Zn.render(Pe.cena,Pe.camera))});
