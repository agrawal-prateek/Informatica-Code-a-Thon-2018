var $crr={ck0name:"_col_uuid",ck1name:"optout",ck2name:"_col_ot",url:("https:"==document.location.protocol?"https://":"http://")+"ase.clmbtech.com/msg",log:function(a){if(typeof console!="undefined"){console.log(a)}},createIframe:function(e,t){try{var o=document.createElement("iframe");o.style.border="none",o.style.width="1px",o.style.height="1px",o.style.display="none",document.body.appendChild(o),e===!0?(o.contentWindow.document.write(t),o.contentWindow.document.close()):o.src=t}catch(a){return e;}return true;},getCookieOt:function(a){var cObj=document.cookie.split(";");for(var v in cObj){if(cObj[v].toString().indexOf(a)>=0){var cok=cObj[v].split("=");if(cok[1]==1){return true;};};};return false;},setCookieOt:function(a,b,c){try{var d,e,f,g;c?(e=new Date,e.setTime(e.getTime()+24*c*60*60*1e3),f="; expires="+e.toGMTString()):f="",g=location.host,1===g.split(".").length?document.cookie=a+"="+b+f+"; path=/":(d=(location.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/)||[])[0],document.cookie=a+"="+b+f+"; path=/; domain="+d)}catch(a){$crr.log("ck :: "+a)}}};$crr.act=function(flag){if(flag){$crr.setCookieOt($crr.ck1name,1,3650);}$crr.setCookieOt($crr.ck0name,"",-1);$cr={};if(!$crr.getCookieOt($crr.ck2name)){if($crr.createIframe(false,$crr.url)){$crr.setCookieOt($crr.ck2name,1,3650);}};};$crr.run=function(){if(!$crr.getCookieOt($crr.ck1name)){$crr.setCookieOt($crr.ck2name,1,-1);$cr={cid:"2826%3A743",cnl:function(b,a){return document.querySelector("link[rel='canonical']")!=null?$cr.pcnl(document.querySelector("link[rel='canonical']").href,b,a):$cr.pcnl(document.location.href,b,a)
},bsrc:0,dn:document.domain,url:("https:"==document.location.protocol?"https://":"http://")+"ase.clmbtech.com/message",ckname:"_col_uuid",ccflag:false,ext:function(){try{if($cr.dn!=null&&typeof $cr.cnl("/","-")!="undefined"){return($cr.url+"?cid="+$cr.cid+"&val_101="+$cr.cid+"&val_102="+$cr.dn+"&val_120="+$cr.bsrc+"&val_101=int:"+$cr.cnl("/","-")+"&val_122="+$cr.gck())
}else{if($cr.dn!=null){return($cr.url+"?cid="+$cr.cid+"&val_101="+$cr.cid+"&val_102="+$cr.dn+"&val_120="+$cr.bsrc+"&val_122="+$cr.gck())
}}}catch(a){if(typeof console!="undefined"){console.log("Error in processing Rules: "+a)}}}};$cr.cc=function(i,h,n){try{var m,l,k,j;
n?(l=new Date,l.setTime(l.getTime()+24*n*60*60*1000),k="; expires="+l.toGMTString()):k="",j=location.host,1===j.split(".").length?document.cookie=i+"="+h+k+"; path=/":(m=(location.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/)||[])[0],document.cookie=i+"="+h+k+"; path=/; domain="+m)
}catch(i){console.log("ck :: "+i)}};$cr.gck=function(){var c="";var b=document.cookie.split(";");for(var a=0;
a<b.length;a++){if($cr.ckname==b[a].split("=")[0].trim()){c=b[a].split("=")[1];break}}if(c.indexOf("~1")>0){$cr.ccflag=true
}return c};$cr.pcnl=function(a,g,e){if(typeof a==="undefined"||a.indexOf("?")>-1){a=undefined;return a
}else{var f=a.replace(/\/\//g,"/").split(g);if(f.length>2){var d=0;var c;for(var b=2;b<f.length;b++){if(f[2].length==0){a=undefined;
return a}if(f[b].length>d){d=f[b].length;c=f[b]}}if(c.split(e).length>3){if(f.indexOf(c)>2){exl=f.length-f.indexOf(c);
for(var b=0;b<exl;b++){f.pop()}if(f[0]==="http:"||f[0]==="https:"){f.shift()}return f.join(g)}else{a=undefined;
return a}}else{if(c.split(e).length===3){if(f.indexOf(c)>1){exl=f.length-f.indexOf(c)-1;for(var b=0;b<exl;
b++){f.pop()}if(f[0]==="http:"||f[0]==="https:"){f.shift()}return f.join(g)}else{a=undefined;return a
}}else{if(f[0]==="http:"||f[0]==="https:"){f.shift()}if(f[f.length-1].indexOf("cms")>-1||f[f.length-1].indexOf("htm")>-1){f.pop();
if(f.length===1){a=undefined;return a}else{return f.join(g)}}else{return f.join(g)}}}}else{a=undefined;
return a}}};$cr.TrgImgSrc=function(img){try{if(!$crr.getCookieOt($crr.ck1name)){(new Image()).src=(img);}}catch(e){}};$cr.gdpb=function(){var l="adedmpdxirsmeips";var b=document.querySelectorAll("iframe[id^=google_ads_iframe]");
var f=new Map();for(var a=0;a<b.length;a++){var i=b[a];var h=null;try{h=i.contentDocument;if(h==null||typeof h=="undefined"){continue
}}catch(j){continue}var c=h.querySelectorAll('a[href^="http://googleads.g.doubleclick.net/pcs/click"] , a[href^="https://googleads.g.doubleclick.net/pcs/click"]');
var k=null;for(var m=0;m<c.length;m++){var d=c[m].getAttribute("href");var g=d.indexOf(l);if(g!=-1){k=d.substring(g+l.length,d.length).split("&")[0].split("%26")[0].split("%3D")[1];k=parseInt(k).toString();
}}if(k==null){continue}else{f.set(h.body,k)}h.body.onclick=function(o){var n=f.get(this);if(n==undefined){return
}revReq=n.split("").reverse().join("");var p=$cr.url+"?cid="+$cr.cid+"&val_101="+$cr.cid+"&val_102="+$cr.dn+"&val_120="+$cr.bsrc+"&val_101=dfp:clk:"+revReq+"&val_122="+$cr.gck();
$cr.TrgImgSrc(p);}}};$cr.cbkf=function(rp){try{var res;res="undefined"==typeof JSON?eval(response):JSON.parse(rp);
for(var i=0;i<res.length;i++){var ckValOptOut=res[i].optout;var ckVal=res[i].uuid;if(ckValOptOut==1){$crr.act(true);}if($cr.ccflag!=true){$cr.cc($cr.ckname,ckVal,3650)
}}}catch(a){console.log("jsonback:"+a)}};$cr.jp=function(){var b={};return b.send=function(i,h){var n=h.callbackName,m=h.onSuccess||function(){},l=h.onTimeout||function(){};
timeout=h.timeout||10;var k=window.setTimeout(function(){window[n]=function(){},l()},1000*timeout);window[n]=function(c){window.clearTimeout(k),m(c)
};var j=document.createElement("script");j.type="application/javascript",j.async=!0,j.src=i,j.onerror=function(){console.log("Error!")
},document.getElementsByTagName("head")[0].appendChild(j)},b}();$cr.cll=function(){$cr.jp.send($cr.ext().replace(/'/g,"%27"),{callbackName:"$cr.cbkf",onSuccess:function(b){$cr.cbkf(b)
},onTimeout:function(){},timeout:15});$cr.gdpb();$cr.gdpb();};var _comscore=_comscore||[];function fcomp(){try{_comscore.push({c1:"7",c2:"6036484",c3:"84"});
(function(){var c=document.createElement("script"),b=document.getElementsByTagName("script")[0];c.async=true;
c.src=(document.location.protocol=="https:"?"https://sb":"http://b")+".scorecardresearch.com/beacon.js";
b.parentNode.insertBefore(c,b)})()}catch(a){}}$cr.cll();}else{$crr.act(false);}};$crr.run();
