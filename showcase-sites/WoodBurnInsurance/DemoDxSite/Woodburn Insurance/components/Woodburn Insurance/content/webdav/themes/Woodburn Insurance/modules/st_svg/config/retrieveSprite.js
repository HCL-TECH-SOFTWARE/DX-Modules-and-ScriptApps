(function(){
var _1=new XMLHttpRequest();
_1.open("GET",ibmCfg.themeConfig.themeRootURI+"/css/images/sprite.svg",true);
_1.send();
_1.onload=function(e){
var _2=document.createElement("div");
_2.className="stDisplayNone";
_2.innerHTML=_1.responseText;
document.getElementById("wpthemeComplementaryContent").appendChild(_2);
};
})();

