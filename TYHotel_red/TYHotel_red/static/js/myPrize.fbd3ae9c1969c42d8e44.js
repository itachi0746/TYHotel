webpackJsonp([2],{"/h03":function(t,i){},I7eg:function(t,i){},QckZ:function(t,i,e){t.exports=e.p+"static/img/other.fcfadbe.png"},T9bG:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});e("9++/");var n=e("QhyB"),a=(e("OWWB"),e("1fWZ")),s=(e("qVvv"),e("8aUD")),o=(e("FO5P"),e("woHG")),l=(e("eqfM"),e("/QYm")),r=(e("jti4"),e("uk7J")),c=(e("k3b4"),e("+2ln")),d=(e("yffH"),e("sdMh")),u=e("7+uW"),f={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]};var g=e("VU/8")({name:"App"},f,!1,function(t){e("aeZd")},null,null).exports,h=e("/ocq"),v=e("BO1k"),p=e.n(v),m=e("1lyH"),x={data:function(){return{id:null,list:null,loading:!1,finished:!1,isLoading:!1,pageIndex:1,pageCount:null,imgObj:{CMF801:e("s99S"),CMF802:e("um2h"),CMF803:e("QckZ")}}},components:{},mounted:function(){this.setImgBoxHeight2()},created:function(){var t=m.utils.getUrlParams();this.id=t.activityid,this.id?this.getData():m.utils.toast(this,"未知活动","fail")},methods:{setImgBoxHeight2:function(){var t=document.body.clientHeight,i=this.$refs.header.offsetHeight;console.log("windowHeight: "+t+", headerHeight: "+i),document.getElementById("img-box").style.height=t-i+"px"},onLoad:function(){if(this.pageCount===this.pageIndex)return this.finished=!0,void(this.loading=!1);this.pageIndex++,this.getData()},onClickLeft:function(){window.history.back()},onRefresh:function(){this.pageIndex=1,this.pageCount=null,this.list=null,this.getData()},getData:function(){var t=this,i={ActivityId:this.id,PageIndex:this.pageIndex};m.utils.toast(this,"","loading"),Object(m.postData)("/MyActivityPrizes",i).then(function(i){console.log(i),m.utils.toast(t,"","clear"),t.pageCount=i.PageCount,t.pageIndex=i.PageIndex,t.loading=!1,t.isLoading=!1,t.list=null===t.list?i.Data:t.list.concat(i.Data);var e=!0,n=!1,a=void 0;try{for(var s,o=p()(t.list);!(e=(s=o.next()).done);e=!0){var l=s.value;m.utils.formatObj(l,!1)}}catch(t){n=!0,a=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw a}}})}}},C={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"album"},[e("div",{ref:"header",staticClass:"header"},[e("van-nav-bar",{attrs:{title:"我的奖品","left-text":"","right-text":"","left-arrow":""},on:{"click-left":t.onClickLeft,"click-right":function(t){}}})],1),t._v(" "),e("van-pull-refresh",{ref:"img-box",staticClass:"img-box",attrs:{id:"img-box"},on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(i){t.isLoading=i},expression:"isLoading"}},[e("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(i){t.loading=i},expression:"loading"}},[e("ul",{ref:"img-ul",staticClass:"img-ul"},t._l(t.list,function(i,n){return e("li",{key:n,ref:"img-li",refInFor:!0,staticClass:"img-li"},[e("div",{staticClass:"li-box",style:{backgroundImage:"url("+t.imgObj[i.CMF3_PRIZE_TYPE]+")"}},[e("div",{staticClass:"li-box-inner"},[e("div",{staticClass:"li-box-left"},[e("div",{staticClass:"money-box"},[e("i",{staticClass:"rmb"},[t._v("￥")]),t._v(" "),e("span",{staticClass:"money"},[t._v(t._s(i.CMF3_VALUE))])])]),t._v(" "),e("div",{staticClass:"li-box-right"},[e("div",{staticClass:"li-box-right-inner"},[e("div",{staticClass:"prize-name"},[t._v(t._s(i.CMF3_PRIZE_NAME))]),t._v(" "),e("div",{staticClass:"prize-time"},[t._v("获奖日期："+t._s(i.CMF3_SEND_TIME))])])])])])])}))])],1)],1)},staticRenderFns:[]};var b=e("VU/8")(x,C,!1,function(t){e("/h03")},"data-v-526fcf6f",null).exports;u.a.use(h.a);var _=new h.a({routes:[{path:"/",name:"MyPrize",component:b}]});e("kf6B"),e("XRwP");u.a.use(n.a).use(a.a).use(s.a).use(o.a).use(l.a).use(r.a).use(c.a).use(d.a),u.a.config.productionTip=!1,new u.a({el:"#app",router:_,components:{App:g},template:"<App/>"})},XRwP:function(t,i){},ZZgd:function(t,i){},aeZd:function(t,i){},kXkE:function(t,i){},kf6B:function(t,i){var e,n,a,s,o;e=document,n=window,a=e.documentElement,s="orientationchange"in window?"orientationchange":"resize",o=function(){var t=a.clientWidth;t&&(a.style.fontSize=t/750*40+"px")},e.addEventListener&&(n.addEventListener(s,o,!1),e.addEventListener("DOMContentLoaded",o,!1))},nLpc:function(t,i){},s99S:function(t,i,e){t.exports=e.p+"static/img/hongbao.350c5ff.png"},um2h:function(t,i,e){t.exports=e.p+"static/img/quan.d1c1409.png"}},["T9bG"]);
//# sourceMappingURL=myPrize.fbd3ae9c1969c42d8e44.js.map