webpackJsonp([4],{"7wMH":function(t,i){},I7eg:function(t,i){},Rs1J:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});e("9++/");var n=e("QhyB"),a=(e("OWWB"),e("1fWZ")),s=(e("qVvv"),e("8aUD")),o=(e("FO5P"),e("woHG")),l=(e("eqfM"),e("/QYm")),c=(e("jti4"),e("uk7J")),r=(e("k3b4"),e("+2ln")),u=(e("yffH"),e("sdMh")),d=e("7+uW"),f={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]};var v=e("VU/8")({name:"App"},f,!1,function(t){e("7wMH")},null,null).exports,h=e("/ocq"),g=e("BO1k"),m=e.n(g),p=e("1lyH"),_={data:function(){return{id:null,list:null,loading:!1,finished:!1,liHeight:null,isLoading:!1}},components:{},mounted:function(){this.setImgBoxHeight2()},created:function(){var t=p.utils.getUrlParams();this.id=t.activityid,this.id?this.getData():p.utils.toast(this,"未知活动","fail")},methods:{setImgBoxHeight2:function(){var t=document.body.clientHeight,i=this.$refs.header.offsetHeight;console.log("windowHeight: "+t+", headerHeight: "+i),document.getElementById("img-box").style.height=t-i+"px"},onClickLeft:function(){window.history.back()},onRefresh:function(){var t=this;setTimeout(function(){t.$toast("刷新成功"),t.isLoading=!1},500)},clickCheck:function(t){window.GoToPage("","index.html",{activityid:t})},getData:function(){var t=this;p.utils.toast(this,"","loading"),Object(p.postData)("/MyActivitys",{ActivityId:this.id}).then(function(i){console.log(i),p.utils.toast(t,"","clear"),t.list=i.Data;var e=!0,n=!1,a=void 0;try{for(var s,o=m()(t.list);!(e=(s=o.next()).done);e=!0){var l=s.value;p.utils.formatObj(l,!1)}}catch(t){n=!0,a=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw a}}})}}},C={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"album"},[e("div",{ref:"header",staticClass:"header"},[e("van-nav-bar",{attrs:{title:"我的历史活动记录","left-text":"","right-text":"","left-arrow":""},on:{"click-left":t.onClickLeft,"click-right":function(t){}}})],1),t._v(" "),e("van-pull-refresh",{ref:"img-box",staticClass:"img-box",attrs:{disabled:"",id:"img-box"},on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(i){t.isLoading=i},expression:"isLoading"}},[e("ul",{ref:"img-ul",staticClass:"img-ul"},t._l(t.list,function(i,n){return e("li",{key:n,ref:"img-li",refInFor:!0,staticClass:"img-li"},[e("div",{staticClass:"li-box"},[e("img",{staticClass:"li-img",attrs:{src:i.CMA1_IMG_URL,alt:""}}),t._v(" "),e("div",{staticClass:"li-mid"},[e("div",{staticClass:"li-mid-top"},[t._v(t._s(i.CMA1_SPONSOR))]),t._v(" "),e("div",{staticClass:"li-mid-btm"},[e("p",[t._v(t._s(i.CMA1_START_DATE))]),t._v(" "),e("p",[t._v(t._s(i.CMA1_ADDRESS))])])]),t._v(" "),e("div",{staticClass:"li-action"},[e("div",{staticClass:"li-btn",on:{click:function(e){t.clickCheck(i.CMA1_ID)}}},[t._v("查 看")])])])])}))])],1)},staticRenderFns:[]};var k=e("VU/8")(_,C,!1,function(t){e("kCe5")},"data-v-7915ee82",null).exports;d.a.use(h.a);var w=new h.a({routes:[{path:"/",name:"MyActivity",component:k}]});e("kf6B"),e("XRwP");d.a.use(n.a).use(a.a).use(s.a).use(o.a).use(l.a).use(c.a).use(r.a).use(u.a),d.a.config.productionTip=!1,new d.a({el:"#app",router:w,components:{App:v},template:"<App/>"})},XRwP:function(t,i){},ZZgd:function(t,i){},kCe5:function(t,i){},kXkE:function(t,i){},kf6B:function(t,i){var e,n,a,s,o;e=document,n=window,a=e.documentElement,s="orientationchange"in window?"orientationchange":"resize",o=function(){var t=a.clientWidth;t&&(a.style.fontSize=t/750*40+"px")},e.addEventListener&&(n.addEventListener(s,o,!1),e.addEventListener("DOMContentLoaded",o,!1))},nLpc:function(t,i){}},["Rs1J"]);
//# sourceMappingURL=myActivity.51289e0b29c0e73d5fd3.js.map