var stmobilenav={topHeight:91,toggleMobileNavigation:function(){
var _1=document.getElementById("stNavigation");
var _2=document.getElementById("stMobileNavToggle");
var _3=document.getElementById("stMobileNavBackground");
i$.bindDomEvt(window,"resize",function(){
stmobilenav.closeNavMenu(_1,_2,_3);
});
if(_1.className.indexOf("stNavigationShow")>-1){
this.closeNavMenu(_1,_2,_3);
_1.setAttribute("aria-hidden","true");
}else{
_1.className=_1.className.replace("stNavigation","stNavigationShow");
_1.setAttribute("aria-hidden","false");
_1.style.top=document.getElementById("stBanner").getBoundingClientRect().bottom+"px";
_3.className=_3.className.replace("stMobileNavBackground","stMobileNavBackgroundShow");
document.getElementById("stNavToggleMenuIcon").className.baseVal="fade-out";
document.getElementById("stNavToggleCloseIcon").className.baseVal="fade-in";
document.getElementById("stMobileNavBackground").style.height=window.outerHeight-this.topHeight+"px";
var _4=(document.getElementById("stNavContainer")!=null)?document.getElementById("stNavContainer"):document.getElementById("stBootstrapNav");
if(_4!=null){
_4.style.height=window.outerHeight-this.topHeight+"px";
}
_2.className+=" selected";
if(stnav.openParentId!=null){
this.toggleMobileNavigationParent(stnav.openParentId);
}
this.manageNavScroll();
i$.bindDomEvt(document.getElementById("stPageFrame"),"keyup",function(e){
if(e.keyCode==9&&!_1.contains(e.target)){
stmobilenav.closeNavMenu(_1,_2,_3);
}
});
}
},toggleMobileNavigationParent:function(id){
var _5=id.substring(0,id.lastIndexOf("_toggle"));
var _6=document.getElementById(_5+"_container");
if(_6.className.indexOf("stDisplayNone")>-1){
_6.className=_6.className.replace("stDisplayNone","stOpenNavLevel");
document.getElementById(_5+"_toggleOpen").className.baseVal="stDisplayNone";
document.getElementById(_5+"_toggleClose").className.baseVal="stDisplayInherit";
document.getElementById("stMobileNavBackground").style.height=window.outerHeight-this.topHeight+"px";
var _7=(document.getElementById("stNavContainer")!=null)?document.getElementById("stNavContainer"):document.getElementById("stBootstrapNav");
if(_7!=null){
_7.style.height=window.outerHeight-this.topHeight+"px";
}
}else{
_6.className=_6.className.replace("stOpenNavLevel","stDisplayNone");
document.getElementById(_5+"_toggleOpen").className.baseVal="stDisplayInherit";
document.getElementById(_5+"_toggleClose").className.baseVal="stDisplayNone";
}
this.manageNavScroll();
},closeNavMenu:function(_8,_9,_a){
var _b=document.getElementsByClassName("stOpenNavLevel");
for(var i=0;i<_b.length;i++){
var _c=_b[i].id.substring(0,_b[i].id.indexOf("_"));
document.getElementById(_c+"_toggleOpen").className.baseVal="stDisplayInherit";
document.getElementById(_c+"_toggleClose").className.baseVal="stDisplayNone";
_b[i].className=_b[i].className.replace("stOpenNavLevel","stDisplayNone");
}
document.getElementById("stNavToggleMenuIcon").className.baseVal="fade-in";
document.getElementById("stNavToggleCloseIcon").className.baseVal="fade-out";
_9.className=_9.className.replace(" selected","");
var _d=_8.clientHeight;
_8.className=_8.className.replace("stNavigationShow","stNavigation");
_8.style.height=_d+"px";
if(_a){
_a.style.height=0;
}
var _e=(document.getElementById("stNavContainer")!=null)?document.getElementById("stNavContainer"):document.getElementById("stBootstrapNav");
if(_e!=null){
_e.style.height="";
}
window.setTimeout(function(){
if(_a){
_a.className=_a.className.replace("stMobileNavBackgroundShow","stMobileNavBackground");
}
_8.removeAttribute("style");
},250);
},manageNavScroll:function(){
var _f=document.getElementById("stNavContent").scrollHeight;
if((window.innerHeight-this.topHeight)<_f){
document.getElementById("stNavigation").style.overflowY="scroll";
}else{
document.getElementById("stNavigation").style.overflowY="hidden";
}
},manageBootstrapNavScroll:function(id){
var _10=id.substring(0,id.lastIndexOf("_toggle"));
var _11=document.getElementById(_10+"_container");
if(_11.className=="collapse"){
$("#"+_10+"_container").on("shown.bs.collapse",function(){
document.getElementById(_10+"_toggleOpen").className.baseVal="stDisplayNone";
document.getElementById(_10+"_toggleClose").className.baseVal="stDisplayInherit";
stmobilenav.manageNavScroll();
});
}else{
$("#"+_10+"_container").on("hidden.bs.collapse",function(){
document.getElementById(_10+"_toggleOpen").className.baseVal="stDisplayInherit";
document.getElementById(_10+"_toggleClose").className.baseVal="stDisplayNone";
$("#"+_10+"_container").removeAttr("style");
stmobilenav.manageNavScroll();
});
}
}};

