!function(){function t(t,n,e,o){let s,r,l=t.currentTime+o,h=0,f=t.createGain();if(f.gain.value=(n[0]/9)**3,n[5]&&((r=t.createOscillator()).type=n[5],r.frequency.value=(n[7]/3)**3,(s=t.createGain()).gain.value=(n[6]+3)**3,r.connect(s)),n[1]){let i=t.createBiquadFilter();i.type=n[1],i.frequency.value=2**n[2],i.Q.value=n[3]**1.5,s&&n[4]&&s.connect(i.detune),f.connect(i),i.connect(t.destination)}else f.connect(t.destination);for(let o of n[8]){let n=t.createGain();n.connect(f);let r=(o[1]/9)**3,u=(o[2]/9)**3,a=(o[3]/9)**3,c=u+a+(o[4]/6)**3;if(n.gain.setValueAtTime(0,l),n.gain.linearRampToValueAtTime(r,l+u),n.gain.setValueAtTime(r,l+u+a),n.gain.exponentialRampToValueAtTime(1e-5,l+c),o[0]){let i=t.createOscillator();i.type=o[0],i.connect(n),i.detune.value=3*(o[5]-7.5)**3,s&&o[6]&&s.connect(i.detune);let r=440*2**((e-69)/12);if(o[7]){let t=(o[8]/9)**3,n=(o[9]/9)**3,e=(o[10]/6)**3;i.frequency.linearRampToValueAtTime(0,l),i.frequency.linearRampToValueAtTime(r,l+t),i.frequency.setValueAtTime(r,l+t+n),i.frequency.exponentialRampToValueAtTime(1e-5,l+t+n+e)}else i.frequency.setValueAtTime(r,l);i.start(l),i.stop(l+c)}else{let e=t.createBufferSource();e.buffer=i(t),e.loop=1,e.connect(n),e.start(l),e.stop(l+c)}c>h&&(h=c)}r&&(r.start(l),r.stop(l+h))}function i(t){if(!x){let i=(x=t.createBuffer(1,2*t.sampleRate,t.sampleRate)).getChannelData(0);for(let t=0;t<i.length;t++)i[t]=2*Math.random()-1}return x}function n(i,n,e){let o=i[0][n];if(o.t&&(!o.i||o.o>o.i.s)){let n=60/(o.t.l||120)/4;for(let e of o.t.h)for(let s=0;s<e.u.length;s++)e.u[s]&&t(i.Audio,e.m,e.u[s]+o.M,s*n);o.i=o.t,o.o=0}else o.o+=e;o.t=o.g}function e(t,i){return t[0]=-i[0],t[1]=-i[1],t}function o(t,i){var n,e;(n=i.p)[0]=(e=t.T)[4],n[1]=e[5],i.v[0]=i.p[0]-i._[0]/2,i.v[1]=i.p[1]-i._[1]/2,i.k[0]=i.p[0]+i._[0]/2,i.k[1]=i.p[1]+i._[1]/2}function s(t,i,n){for(let l=0;l<n;l++){let n=i[l];if((o=t).v[0]<(s=n).k[0]&&o.k[0]>s.v[0]&&o.v[1]<s.k[1]&&o.k[1]>s.v[1]){let i=r(t,n);t.C.push({S:n,U:i}),n.C.push({S:t,U:e([0,0],i)})}}var o,s}function r(t,i){let n=t.p[0]-i.p[0],e=t._[0]/2+i._[0]/2-Math.abs(n),o=t.p[1]-i.p[1],s=t._[1]/2+i._[1]/2-Math.abs(o);return e<s?[e*Math.sign(n),0]:[0,s*Math.sign(o)]}function l(t=1,i){return(n,e)=>{n.T[e]|=2,n[1][e]={I:e,$:1,A:t,_:i,v:[0,0],k:[0,0],p:[0,0],C:[]}}}function h(t,i,n,e=1,o="none"){return(s,r)=>{s.T[r]|=32,s[5][r]={D:1,N:t,F:i,H:n,R:e,W:o}}}function f(t,i){return(n,e)=>{n.T[e]|=64,n[6][e]={O:[Math.cos(t),Math.sin(t)],q:i}}}function u(t=.1){return(i,n)=>{i.T[n]|=1024,i[10][n]={B:t}}}function a(t,i){let n=t[8][i],e=t[6][i],o=t[1][i],s=t[0][i];if(n.K[0]<0&&(n.K[0]=0,e.O[0]=-e.O[0],s.t=D,s.M=0),n.K[0]>t.j&&(n.K[0]=t.j,e.O[0]=-e.O[0],s.t=D,s.M=0),n.K[1]<0&&(n.K[1]=0,e.O[1]=-e.O[1],s.t=D,s.M=0),n.K[1]>t.G&&(n.K[1]=t.G,e.O[1]=-e.O[1],s.t=D,s.M=0),o.C.length>0){t[9][t.L].J=.2;let r=o.C[0];if(r.U[0]){n.K[0]+=r.U[0];let t=o.p[1]-r.S.p[1],i=r.S._[1]/2;e.O[0]=-e.O[0],e.O[1]=t/i}if(r.U[1]&&(n.K[1]+=r.U[1],e.O[0]=(o.p[0]-r.S.p[0])/(r.S._[0]/2),e.O[1]=-e.O[1]),8&t.T[r.S.I]){let n=t[2][i];n.P+=1,s.t=$,s.M=n.P}if(16&t.T[r.S.I]&&(t[2][i].P=0,s.t=A,s.M=0),function(t,i){let n=i[0],e=i[1],o=n*n+e*e;o>0&&(o=1/Math.sqrt(o)),t[0]=i[0]*o,t[1]=i[1]*o}(e.O,e.O),t.V(b(n.K[0],n.K[1],"white",15)),Math.random()>.95){let i=t.V({...U(t),K:[n.K[0],n.K[1]]});t[8][t.L].X.push(t[8][i]),t[8][i].Y=t[8][t.L]}}let r=Math.atan(e.O[1]/e.O[0]);n.Z=r,t.V({...I(20,20,"orange"),K:[...n.K],Z:r})}function c(t){return t}function d(t){return(t-=.5)<0?(.02+.01/t)*Math.sin(50*t):(.02-.01/t)*Math.sin(50*t)+1}function m(t,i){let n=t[8][i].K,e=t[11][i];t[1][i].C.length>0&&(t[10][i].B=.025,e.tt=n,e.it=[n[0],t.G+20],e.o=.5,e.nt=0,e.et=c,t.T[i]|=2048)}function w(t,i){let n=t[8][i],e=t[4][i],o=n.K[0]+t.InputEvent.mouse_x;n.K[0]=o<e.N/2?e.N/2:t.j-e.N/2<o?t.j-e.N/2:o,n.ot=1}function M(t,i){t.st.globalAlpha=i.R,t.st.fillStyle=i.H,t.st.filter=i.W,t.st.fillRect(-i.N/2,-i.F/2,i.N,i.F)}function g(t,i,n){let e=t[11][i],o=t[8][i],s=t[1][i];if(e.nt<=e.o){let i=e.et(e.nt/e.o);o.K=function(t,i,n,e){let o=i[0],s=i[1];return t[0]=o+e*(n[0]-o),t[1]=s+e*(n[1]-s),t}([0,0],e.tt,e.it,i),e.nt+=n,o.ot=1,t.V({...I(100,20,"green"),K:[...o.K]}),s&&(s.$=1)}else o.K=[...e.it],t.T[i]&=-2049}function p(t,i,n){let e=t[5][i],o=t[8][i];e.R>0&&(e.R-=t[10][i].B,o.rt=[Math.max(0,e.R),Math.max(0,e.R)],o.ot=1,e.R<=0&&t.lt(i))}function T(t,i,n){let e=t[8][i],o=t[6][i];e.K[0]+=o.O[0]*o.q*n,e.K[1]+=o.O[1]*o.q*n,e.ot=1}function v(t,i,n){let e=t[9][i];if(e.J>0){e.J-=n;let o=t[8][i];o.K=[e.ht-2*Math.random()*e.ht,e.ht-2*Math.random()*e.ht],o.ot=1,t.ft=`rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`,e.J<=0&&(e.J=0,o.K=[0,0],t.ft="black")}}function y(t,...i){return t.reduce((t,n)=>t+function(t){let i=t.shift();return 0==i||void 0===i?"":Array.isArray(i)?i.join(""):i}(i)+n)}function _(t,i){let n=y`<divstyle="position: absolute;top: 0;background-color: #000;color: #fff;"></div>`;n!==E&&(t.ut.innerHTML=E=n)}function k(t,i,n){return(e,o)=>{e.T[o]|=2048,e[11][o]={tt:t,it:i,o:n,nt:0,et:d}}}function C(t,i,n,e,o){return{at:[(t,i)=>{t.T[i]|=8,t[3][i]={}},l(0,[t,i]),h(t,i,"green"),u(0),k([n,-100],[n,e],o)]}}function S(t=0,i=5){return(n,e)=>{n.T[e]|=512,n[9][e]={J:t,ht:i}}}let x,E,U=function(t){return{K:[t.j/2,t.G-100],at:[(t,i)=>{t.T[i]|=4,t[2][i]={P:0}},f(1.75*Math.PI,500),l(1,[20,20]),h(20,20,"orange"),(t,i)=>{t.T[i]|=1,t[0][i]={g:void 0,o:0,M:0}}]}},b=function(t,i,n,e){let o=[],s=1/e;for(let t=0;t<32;t++)o.push({at:[h(20,20,n),f(.19634954084936207*t,1e3),u(s)]});return{K:[t,i],X:o}},I=function(t,i,n){return{at:[h(t,i,n),u(.05)]}},$={h:[{m:[4,"lowpass",11,8,0,0,8,8,[["sine",5,1,2,4,8,0,0,8,8,8],["triangle",4,2,2,7,10,0,0,8,8,7]]],u:[72]}],s:0},A={h:[{m:[4,"lowpass",11,4,0,0,8,3,[["triangle",8,1,2,9,8,0,1,0,2,10],[0,5,1,1,4]]],u:[69]}],s:0},D={h:[{m:[4,"lowpass",8,8,0,0,8,8,[["sine",8,2,2,3,8,0,0,8,8,8],[0,3,1,2,6]]],u:[64]}],s:0},N=document.getElementById("tick"),F=document.getElementById("fps"),H=function(t){let i=t.j/2,n=t.G-20;return{K:[i,n],at:[(t,i)=>{t.T[i]|=16,t[4][i]={N:100}},l(1,[100,20]),h(100,20,"red"),k([i,-10],[i,n],1)]}},R=new class{constructor(){this.T=[],this[0]=[],this[1]=[],this[2]=[],this[3]=[],this[4]=[],this[5]=[],this[6]=[],this[7]=[],this[8]=[],this[9]=[],this[10]=[],this[11]=[],this.j=window.innerWidth,this.G=window.innerHeight,this.ut=document.querySelector("main"),this.Audio=new AudioContext,this.ct={mouse_x:0,mouse_y:0},this.InputEvent={mouse_x:0,mouse_y:0,wheel_y:0},this.L=0,this.ft="white",this.dt=0,document.addEventListener("visibilitychange",()=>document.hidden?this.wt():this.Mt()),window.addEventListener("keydown",t=>this.ct[t.code]=1),window.addEventListener("keyup",t=>this.ct[t.code]=0),this.ut.addEventListener("contextmenu",t=>t.preventDefault()),this.ut.addEventListener("mousedown",t=>{this.ct[`mouse_${t.button}`]=1,this.InputEvent[`mouse_${t.button}_down`]=1}),this.ut.addEventListener("mouseup",t=>{this.ct[`mouse_${t.button}`]=0,this.InputEvent[`mouse_${t.button}_up`]=1}),this.ut.addEventListener("mousemove",t=>{this.ct.mouse_x=t.offsetX,this.ct.mouse_y=t.offsetY,this.InputEvent.mouse_x=t.movementX,this.InputEvent.mouse_y=t.movementY}),this.ut.addEventListener("wheel",t=>{this.InputEvent.wheel_y=t.deltaY}),this.ut.addEventListener("click",()=>this.ut.requestPointerLock());let t=document.querySelector("canvas");t.width=this.j,t.height=this.G,this.st=t.getContext("2d")}gt(t=0){for(let i=0;i<1e4;i++)if(!this.T[i])return this.T[i]=t,i;throw Error("No more entities available.")}pt(t){let i=performance.now();!function(t,i){for(let i=0;i<t.T.length;i++)272==(272&t.T[i])&&w(t,i)}(this),function(t,i){for(let i=0;i<t.T.length;i++)327==(327&t.T[i])&&a(t,i)}(this),function(t,i){for(let i=0;i<t.T.length;i++)1290==(1290&t.T[i])&&m(t,i)}(this),function(t,i){for(let n=0;n<t.T.length;n++)768==(768&t.T[n])&&v(t,n,i)}(this,t),function(t,i){for(let i=0;i<t.T.length;i++)1280==(1280&t.T[i])&&p(t,i)}(this),function(t,i){for(let n=0;n<t.T.length;n++)2304==(2304&t.T[n])&&g(t,n,i)}(this,t),function(t,i){for(let n=0;n<t.T.length;n++)320==(320&t.T[n])&&T(t,n,i)}(this,t),function(t,i){for(let i=0;i<t.T.length;i++)256==(256&t.T[i])&&(e=void 0,o=void 0,(n=t[8][i]).ot&&(n.ot=0,function t(i){for(let n of i.X)n.ot=1,t(n)}(n),o=n.K,(e=n.T)[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=o[0],e[5]=o[1],function(t,i,n){let e=i[0],o=i[1],s=i[2],r=i[3],l=i[4],h=i[5],f=Math.sin(n),u=Math.cos(n);t[0]=e*u+s*f,t[1]=o*u+r*f,t[2]=e*-f+s*u,t[3]=o*-f+r*u,t[4]=l,t[5]=h}(n.T,n.T,n.Z),function(t,i,n){let e=i[1],o=i[2],s=i[3],r=i[4],l=i[5],h=n[0],f=n[1];t[0]=i[0]*h,t[1]=e*h,t[2]=o*f,t[3]=s*f,t[4]=r,t[5]=l}(n.T,n.T,n.rt),n.Y&&function(t,i,n){let e=i[0],o=i[1],s=i[2],r=i[3],l=i[4],h=i[5],f=n[0],u=n[1],a=n[2],c=n[3],d=n[4],m=n[5];t[0]=e*f+s*u,t[1]=o*f+r*u,t[2]=e*a+s*c,t[3]=o*a+r*c,t[4]=e*d+s*m+l,t[5]=o*d+r*m+h}(n.T,n.Y.T,n.T),function(t,i){let n=i[0],e=i[1],o=i[2],s=i[3],r=i[4],l=i[5],h=n*s-e*o;h&&(t[0]=s*(h=1/h),t[1]=-e*h,t[2]=-o*h,t[3]=n*h,t[4]=(o*l-s*r)*h,t[5]=(e*r-n*l)*h)}(n.Tt,n.T)));var n,e,o}(this),function(t,i){let n=[],e=[];for(let i=0;i<t.T.length;i++)if(258==(258&t.T[i])){let s=t[8][i],r=t[1][i];r.C=[],r.$?(r.$=0,o(s,r)):r.A?(o(s,r),e.push(r)):n.push(r)}for(let t=0;t<e.length;t++)s(e[t],n,n.length),s(e[t],e,t)}(this),function(t,i){for(let e=0;e<t.T.length;e++)1==(1&t.T[e])&&n(t,e,i)}(this,t),function(t,i){t.st.resetTransform(),t.st.fillStyle=t.ft,t.st.fillRect(0,0,t.j,t.G);for(let i=0;i<t.T.length;i++)if(288==(288&t.T[i])){let n=t[8][i];t.st.setTransform(n.T[0],n.T[1],n.T[2],n.T[3],n.T[4],n.T[5]);let e=t[5][i];switch(e.D){case 1:M(t,e)}}}(this),_(this),function(t,i){N&&(N.textContent=(1e3*i).toFixed(1)),F&&(F.textContent=(1/i).toFixed())}(0,t),function(t,i,n){n&&(n.textContent=i.toFixed(1))}(0,performance.now()-i,document.querySelector("#frame"))}Mt(){let t=performance.now(),i=n=>{this.pt((n-t)/1e3);for(let t in this.InputEvent)this.InputEvent[t]=0;t=n,this.dt=requestAnimationFrame(i)};this.wt(),this.Audio.resume(),i(t)}wt(){this.Audio.suspend(),cancelAnimationFrame(this.dt)}V({K:t,Z:i,rt:n,at:e=[],X:o=[]}){let s=this.gt();!function(t=[0,0],i=0,n=[1,1]){return(e,o)=>{e.T[o]|=256,e[8][o]={I:o,T:[1,0,0,1,0,0],Tt:[1,0,0,1,0,0],K:t,Z:i,rt:n,X:[],ot:1}}}(t,i,n)(this,s);for(let t of e)t(this,s);let r=this[8][s];for(let t of o){let i=this.V(t),n=this[8][i];n.Y=r,r.X.push(n)}return s}lt(t){if(256&this.T[t])for(let i of this[8][t].X)this.lt(i.I);this.T[t]=0}};!function(t){t.T=[],t.ft="black";let i=(t.j-500-40)/2,n=[];for(let t=0;t<5;t++){let e=110+30*t;for(let t=0;t<5;t++){let o=i+110*t+50;n.push({K:[o,e],...C(100,20,o,e,.5+Math.random())})}}t.L=t.V({at:[S(0,10)],X:[{...H(t)},{...U(t)},...n]})}(R),R.Mt(),window.$=(...t)=>void 0,window.game=R}();
