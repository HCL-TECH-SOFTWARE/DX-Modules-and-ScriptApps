var stnav={openParentId:null,setSelectedPage:function(_1){
var _2=document.getElementById("stSelectedPage");
if(typeof _2!="undefined"){
(typeof _2.dataset!="undefined")?_2.dataset.selectedPage=_1:_2.setAttribute("data-selected-page",_1);
}
},navMenuClick:function(_3,_4,_5){
var _6=document.getElementById(_4);
if(_6==null||window.innerWidth<=768){
document.location.href=_3;
}else{
var _7=_6.className;
if(_7.indexOf("stDisplayNone")>-1){
var _8=document.getElementById("stNavigation");
_6.style.top=_8.getBoundingClientRect().bottom+"px";
_7=_7.replace("stDisplayNone","stOpenNavLevel");
_6.className=_7;
i$.bindDomEvt(window,"resize",function(){
stnav.closeSubMenu(_7,_6);
});
i$.bindDomEvt(document.getElementById("stPageFrame"),"click",function(e){
if(!_5.contains(e.target)){
stnav.closeSubMenu(_7,_6);
}
});
var _9=i$.bindDomEvt(document.getElementById("stPageFrame"),"keyup",function(e){
if(e.keyCode==9&&(!_6.contains(e.target)&&!_5.contains(e.target))){
stnav.closeSubMenu(_7,_6);
i$.unbindDomEvt(_9);
}
});
}else{
document.location.href=_3;
}
}
},bootstrapNavMenuClick:function(_a,_b,_c){
var _d=document.getElementById(_b);
if(_d==null||window.innerWidth<=768){
document.location.href=_a;
}else{
if(_d.className.indexOf("in")>-1){
document.location.href=_a;
}else{
_d.className+=" in";
}
i$.bindDomEvt(window,"resize",function(){
_d.className="collapse";
});
i$.bindDomEvt(document.getElementById("stPageFrame"),"click",function(e){
if(!_c.contains(e.target)){
_d.className="collapse";
}
});
i$.bindDomEvt(document.getElementById("stPageFrame"),"keyup",function(e){
if(e.keyCode==9&&!_d.contains(e.target)){
_d.className="collapse";
}
});
}
},closeSubMenu:function(_e,_f){
_e=_e.replace("stOpenNavLevel","stDisplayNone");
_f.className=_e;
}};

