(function(){
var _1=document.getElementsByTagName("header")[0],_2=document.getElementsByClassName("stMainContent")[0],_3=document.getElementsByClassName("wpToolbarActionBar"),_4=document.getElementById("stFooter");
_1.className+=" stFixedNavbar";
_2.className+=" stFixedNavbar";
_2.style.paddingTop=_1.offsetHeight+"px";
_2.style.paddingBottom=_4.offsetHeight+"px";
window.onresize=function(){
_2.style.paddingTop=_1.offsetHeight+"px";
_2.style.paddingBottom=_4.offsetHeight+"px";
};
})();

