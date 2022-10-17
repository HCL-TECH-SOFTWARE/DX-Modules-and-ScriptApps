var stNotice={newNotice:function(_1,_2){
if(document.getElementById("stNoticeBox")==null){
this._generateNewMarkup(_1,_2);
}else{
var _3=document.getElementById("stNoticeBox"),_4=document.getElementById("stNoticeTitle"),_5=document.getElementById("stNoticeDescription");
_4.innerHTML=_1;
_5.innerHTML=_2;
_3.className+=" open";
}
},dismiss:function(){
var _6=document.getElementById("stNoticeBox");
if(_6!=null){
_6.className="stNotice";
}
},_generateNewMarkup:function(_7,_8){
var _9=document.createElement("div");
_9.setAttribute("tabindex","0");
_9.setAttribute("aria-label","Notice box");
_9.id="stNoticeBox";
_9.className="stNotice open";
var _a=document.createElement("div");
_a.setAttribute("tabindex","0");
_a.id="stNoticeTitle";
_a.className="stNoticeTitle";
_a.innerHTML=_7;
_9.appendChild(_a);
var _b=document.createElement("div");
_b.setAttribute("tabindex","0");
_b.id="stNoticeDescription";
_b.className="stNoticeDescription";
_b.innerHTML=_8;
_9.appendChild(_b);
var _c=document.createElement("a");
_c.setAttribute("aria-label","close");
_c.href="javascript:void(0);";
_c.className="stNoticeClose";
_c.onclick=function(){
stNotice.dismiss();
};
_c.title="Close notice box";
_9.appendChild(_c);
var _d=document.createElement("span");
_d.setAttribute("aria-hidden","true");
_d.innerHTML="&times;";
_c.appendChild(_d);
document.body.appendChild(_9);
}};

