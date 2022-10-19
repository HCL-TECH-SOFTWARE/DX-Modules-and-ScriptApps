function toggleSearchButton(){
var _1=document.getElementById("sqf"),_2=document.getElementById("stSearchBoxInput"),_3=document.getElementById("stSearchBoxButton"),_4=document.getElementById("stSearchIcon"),_5=document.getElementById("stNavigation"),_6=document.getElementById("stMobileNavToggle"),_7=document.getElementById("stMobileNavBackground");
var _8=function(_9,_a){
_2.setAttribute("tabindex",_9?"-1":"0");
_2.setAttribute("aria-hidden",_9?"true":"false");
_3.setAttribute("tabindex",_9?"-1":"0");
_3.setAttribute("aria-hidden",_9?"true":"false");
if(_9){
_1.className="stSearch stLeft";
}else{
_1.className+=" open";
}
if(_a){
_a.focus();
}
};
if(_1.className.indexOf("open")!=-1){
if(_2.value==""){
_8(true);
}else{
var _b=document.getElementById("stSelectedPage");
if(typeof _b!="undefined"){
var _c=document.getElementById("sourceContentNode");
if(typeof _c!="undefined"){
_c.setAttribute("value",(typeof _b.dataset!="undefined")?_b.dataset.selectedPage:_b.getAttribute("data-selected-page"));
}
}
document.searchQueryForm.submit();
}
}else{
stmobilenav.closeNavMenu(_5,_6,_7);
_8(false,_2);
i$.bindDomEvt(_2,"keyup",function(e){
if(e.keyCode==27){
_8(true,_4);
}
});
i$.bindDomEvt(_3,"keyup",function(e){
if(e.keyCode==9){
_8(true,_4);
}
});
i$.bindDomEvt(_4,"keyup",function(e){
if(e.keyCode==9){
_8(true,_4);
}
});
}
};

