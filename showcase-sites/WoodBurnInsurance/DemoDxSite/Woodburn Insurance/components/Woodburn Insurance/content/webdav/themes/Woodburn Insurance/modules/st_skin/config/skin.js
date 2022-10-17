(function(){
i$.addOnLoad(function(){
var _1=document.querySelector(".stComplementaryContent");
if(i$.hasClass(_1.ownerDocument.body,"edit-mode")){
var _2=document.querySelectorAll(".stControl");
for(var i=0;i<_2.length;i++){
(function(_3){
if(_3.offsetParent!==null){
i$.bindDomEvt(_3,"onmouseenter",function(){
i$.addClass(_3,"stHover");
});
i$.bindDomEvt(_3,"onmouseleave",function(_4){
var _5=_4.toElement||_4.relatedTarget;
if(!_1.contains(_5)&&!_3.contains(_5)){
i$.removeClass(_3,"stHover");
}
});
var _6=_3.querySelectorAll(".stFocusableLink");
for(var j=0;j<_6.length;j++){
(function(_7){
i$.bindDomEvt(_7,"onfocus",function(){
if(i$.hasClass(_3,"stFocus")){
if(i$.hasClass(_3,"stHeaderVisible")){
i$.removeClass(_3,"stFocus");
}else{
i$.addClass(_3,"stHeaderVisible");
}
}else{
if(i$.hasClass(_3,"stHeaderVisible")){
i$.removeClass(_3,"stHeaderVisible");
}else{
i$.addClass(_3,"stFocus");
}
}
});
})(_6[j]);
}
}
})(_2[i]);
}
}
});
})();

