(function(){
var _1=document.getElementById("stBanner");
var _2=window.scrollY||window.pageYOffset;
window.onscroll=function(){
if((document.getElementById("stNavigation").className.indexOf("stNavigationShow")==-1)&&document.getElementsByClassName("wpthemeMenuShow").length==0){
var y=window.scrollY||window.pageYOffset;
if(y>_2&&y!=0){
_1.className="stBanner stGroup compressed";
}else{
_1.className="stBanner stGroup";
}
_2=y;
}
};
})();

