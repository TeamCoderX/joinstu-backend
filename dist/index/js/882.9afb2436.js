"use strict";(self["webpackChunkjoinstu_index_vue"]=self["webpackChunkjoinstu_index_vue"]||[]).push([[882],{6678:function(t,e,n){n.d(e,{Z:function(){return v}});var i=n(3396),a=n(7139);const l={class:"container m-0",style:{"max-width":"100vw!important"}},s={class:"row mw-auto",style:{"font-size":"300%"}},o={class:"col-md-6 col-xxl-2 d-sm-flex d-md-flex d-lg-flex justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-end align-items-xl-center",style:{"max-width":"none",width:"auto"}},r={class:"col-md-3 col-lg-2 col-xxl-10 d-sm-flex d-md-flex d-lg-flex align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-xl-center",style:{width:"5em"}},d={class:"d-lg-flex align-items-lg-center",style:{"font-weight":"bold","text-align":"left",width:"55em","margin-right":"0.5em"},id:"title"},c={class:"col text-end d-sm-flex d-md-flex d-lg-flex justify-content-sm-end align-items-sm-center justify-content-md-end align-items-md-center justify-content-lg-end align-items-lg-center"},u=["id","disabled"],g={key:0},m=(0,i._)("div",{class:"spinner-border text-white",role:"status"},null,-1),p=[m],b={key:1},x={key:2};function h(t,e,n,m,h,w){return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("div",s,[(0,i._)("div",o,[(0,i._)("i",{class:(0,a.C_)(`bi ${n.icon}`),fill:"currentColor"},null,2)]),(0,i._)("div",r,[(0,i._)("h3",d,(0,a.zw)(n.title),1)]),(0,i._)("div",c,[0!=n.buttonContents?((0,i.wg)(),(0,i.iD)("button",{key:0,class:(0,a.C_)(`btn btn-${void 0==n.buttonColor?"primary":n.buttonColor}`),id:`btn_${void 0==n.buttonId?"button":n.buttonId}`,disabled:n.buttonIsDisabled,onClick:e[0]||(e[0]=(...t)=>n.buttonOnclick&&n.buttonOnclick(...t)),type:"button"},[void 0==n.buttonContents?((0,i.wg)(),(0,i.iD)("div",g,p)):void 0==n.buttonIcon?((0,i.wg)(),(0,i.iD)("div",b,(0,a.zw)(n.buttonContents),1)):((0,i.wg)(),(0,i.iD)("div",x,[(0,i._)("i",{class:(0,a.C_)(`bi ${n.buttonIcon}`)},null,2)]))],10,u)):(0,i.kq)("",!0)])])])}var w={props:["title","icon","buttonIsDisabled","buttonContents","buttonColor","buttonId","buttonOnclick","buttonIcon"]},y=n(89);const f=(0,y.Z)(w,[["render",h]]);var v=f},882:function(t,e,n){n.r(e),n.d(e,{default:function(){return N}});var i=n(3396),a=n(7139);const l={style:{margin:"5px"}},s={key:0},o=(0,i._)("div",{class:"spinner-border text-primary",style:{height:"2em","margin-left":"calc(50vw - 2em)"},role:"status"},null,-1),r=[o],d={class:"card-hover card card-item",style:{"border-radius":"10px","border-width":"0px","border-color":"rgb(0,0,0)","margin-bottom":"5px","box-shadow":"0px 0px 1px 0px"}},c={class:"card-body",style:{"border-top-width":"2px","border-top-color":"var(--bs-gray)"}},u={class:"card-title"},g=["textContent"],m=(0,i._)("h6",{class:"text-muted card-subtitle mb-2"},null,-1),p={class:"card-text"},b=["textContent"],x={style:{"text-align":"right","font-family":"ABeeZee, sans-serif"}},h=["textContent"],w={class:"pagination"},y={class:"page-item"},f=(0,i._)("span",{"aria-hidden":"true"},"«",-1),v=[f],k={key:1,class:"page-link disabled","aria-label":"Previous"},_=(0,i._)("span",{"aria-hidden":"true"},"«",-1),C=[_],D={class:"page-item"},j={key:0,class:"page-link active"},z=["onClick"],I={class:"page-item"},$=(0,i._)("span",{"aria-hidden":"true"},"»",-1),q=[$],L={key:1,class:"page-link disabled","aria-label":"Next"},P=(0,i._)("span",{"aria-hidden":"true"},"»",-1),Z=[P];function A(t,e,n,o,f,_){const $=(0,i.up)("titleCard"),P=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",l,[(0,i.Wm)($,{title:"論壇",icon:"bi-chat-square-text",buttonContents:"icon",buttonIcon:"bi-pencil-square",onClick:_.gotoForumAdd},null,8,["onClick"]),void 0==f.cardData?((0,i.wg)(),(0,i.iD)("div",s,r)):((0,i.wg)(!0),(0,i.iD)(i.HY,{key:1},(0,i.Ko)(f.cardData,(t=>((0,i.wg)(),(0,i.j4)(P,{key:t.url,to:{name:"forumDetails",params:{id:t.url}},style:{"text-decoration":"none",color:"black"}},{default:(0,i.w5)((()=>[(0,i._)("div",d,[(0,i._)("div",c,[(0,i._)("h4",u,[(0,i._)("span",{textContent:(0,a.zw)(t.title)},null,8,g)]),m,(0,i._)("p",p,[(0,i._)("span",{textContent:(0,a.zw)(t.contents.length>300?`${t.contents.substr(0,300)}...`:t.contents)},null,8,b)]),(0,i._)("p",x,[(0,i._)("span",{textContent:(0,a.zw)(new Date(t.date).toLocaleDateString("zh-tw"))},null,8,h)])])])])),_:2},1032,["to"])))),128))]),(0,i._)("div",null,[(0,i._)("ul",w,[(0,i._)("li",y,[1!=f.page?((0,i.wg)(),(0,i.iD)("a",{key:0,class:"page-link","aria-label":"Previous",onClick:e[0]||(e[0]=t=>_.gotoPage(f.page-1))},v)):((0,i.wg)(),(0,i.iD)("a",k,C))]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(f.pages,(t=>((0,i.wg)(),(0,i.iD)("div",{key:t},[(0,i._)("li",D,[t==f.page?((0,i.wg)(),(0,i.iD)("a",j,(0,a.zw)(t),1)):((0,i.wg)(),(0,i.iD)("a",{key:1,class:"page-link",onClick:e=>_.gotoPage(t)},(0,a.zw)(t),9,z))])])))),128)),(0,i._)("li",I,[f.page!=f.pages?((0,i.wg)(),(0,i.iD)("a",{key:0,class:"page-link","aria-label":"Next",onClick:e[1]||(e[1]=t=>_.gotoPage(f.page+1))},q)):((0,i.wg)(),(0,i.iD)("a",L,Z))])])])],64)}n(7658);var H=n(9314),O=n(6678),Y={components:{titleCard:O.Z},name:"forumList",data(){return{cardData:void 0,page:void 0==this.$route.query.page?1:this.$route.query.page,pages:0}},watch:{$route(t){this.page=void 0==t.query.page?1:t.query.page,this.getList()}},methods:{gotoPage(t){this.cardData=void 0,this.page=t,this.getList()},gotoForumAdd(){this.$router.push({name:"forumAdd"})},getList(){H.h.post("forum/list",{page:this.page},(t=>{this.cardData=t.data.data,this.pages=t.data.pages}),(t=>{console.error(t)}))}},created(){this.getList()}},F=n(89);const K=(0,F.Z)(Y,[["render",A]]);var N=K}}]);
//# sourceMappingURL=882.9afb2436.js.map