"use strict";(self["webpackChunkjoinstu_index_vue"]=self["webpackChunkjoinstu_index_vue"]||[]).push([[220],{6678:function(t,e,n){n.d(e,{Z:function(){return f}});var i=n(3396),a=n(7139);const s={class:"container m-0",style:{"max-width":"100vw!important"}},o={class:"row mw-auto",style:{"font-size":"300%"}},l={class:"col-md-6 col-xxl-2 d-sm-flex d-md-flex d-lg-flex justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-end align-items-xl-center",style:{"max-width":"none",width:"auto"}},r={class:"col-md-3 col-lg-2 col-xxl-10 d-sm-flex d-md-flex d-lg-flex align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-xl-center",style:{width:"5em"}},d={class:"d-lg-flex align-items-lg-center",style:{"font-weight":"bold","text-align":"left",width:"55em","margin-right":"0.5em"},id:"title"},c={class:"col text-end d-sm-flex d-md-flex d-lg-flex justify-content-sm-end align-items-sm-center justify-content-md-end align-items-md-center justify-content-lg-end align-items-lg-center"},g=["id","disabled"],u={key:0},p=(0,i._)("div",{class:"spinner-border text-white",role:"status"},null,-1),m=[p],b={key:1},h={key:2};function x(t,e,n,p,x,w){return(0,i.wg)(),(0,i.iD)("div",s,[(0,i._)("div",o,[(0,i._)("div",l,[(0,i._)("i",{class:(0,a.C_)(`bi ${n.icon}`),fill:"currentColor"},null,2)]),(0,i._)("div",r,[(0,i._)("h3",d,(0,a.zw)(n.title),1)]),(0,i._)("div",c,[0!=n.buttonContents?((0,i.wg)(),(0,i.iD)("button",{key:0,class:(0,a.C_)(`btn btn-${void 0==n.buttonColor?"primary":n.buttonColor}`),id:`btn_${void 0==n.buttonId?"button":n.buttonId}`,disabled:n.buttonIsDisabled,onClick:e[0]||(e[0]=(...t)=>n.buttonOnclick&&n.buttonOnclick(...t)),type:"button"},[void 0==n.buttonContents?((0,i.wg)(),(0,i.iD)("div",u,m)):void 0==n.buttonIcon?((0,i.wg)(),(0,i.iD)("div",b,(0,a.zw)(n.buttonContents),1)):((0,i.wg)(),(0,i.iD)("div",h,[(0,i._)("i",{class:(0,a.C_)(`bi ${n.buttonIcon}`)},null,2)]))],10,g)):(0,i.kq)("",!0)])])])}var w={props:["title","icon","buttonIsDisabled","buttonContents","buttonColor","buttonId","buttonOnclick","buttonIcon"]},y=n(89);const v=(0,y.Z)(w,[["render",x]]);var f=v},1220:function(t,e,n){n.r(e),n.d(e,{default:function(){return U}});var i=n(3396),a=n(7139);const s={style:{margin:"5px"}},o={key:0},l=(0,i._)("div",{class:"spinner-border text-primary",style:{height:"2em","margin-left":"calc(50vw - 2em)"},role:"status"},null,-1),r=[l],d={key:1},c={class:"card-hover card card-item",style:{"border-radius":"10px","border-width":"0px","border-color":"rgb(0,0,0)","margin-bottom":"5px","box-shadow":"0px 0px 1px 0px"}},g={class:"card-body",style:{"border-top-width":"2px","border-top-color":"var(--bs-gray)"}},u={class:"card-title"},p=["textContent"],m={class:"text-muted card-subtitle mb-2"},b=["textContent"],h={class:"card-text"},x=["textContent"],w={style:{"text-align":"right","font-family":"ABeeZee, sans-serif"}},y=["textContent"],v={class:"pagination"},f={class:"page-item"},_=(0,i._)("span",{"aria-hidden":"true"},"«",-1),k=[_],C={key:1,class:"page-link disabled","aria-label":"Previous"},D=(0,i._)("span",{"aria-hidden":"true"},"«",-1),j=[D],$={class:"page-item"},z={key:0,class:"page-link active"},q=["onClick"],I={class:"page-item"},L=(0,i._)("span",{"aria-hidden":"true"},"»",-1),P=[L],Z={key:1,class:"page-link disabled","aria-label":"Next"},O=(0,i._)("span",{"aria-hidden":"true"},"»",-1),A=[O];function H(t,e,n,l,_,D){const L=(0,i.up)("titleCard"),O=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",s,[(0,i.Wm)(L,{title:"議案",icon:"bi-phone-landscape",buttonContents:!1}),void 0==_.cardData?((0,i.wg)(),(0,i.iD)("div",o,r)):((0,i.wg)(),(0,i.iD)("div",d,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(_.cardData,(t=>((0,i.wg)(),(0,i.j4)(O,{key:t.id,to:{name:"proposeDetails",params:{id:t.id}},style:{"text-decoration":"none",color:"black"}},{default:(0,i.w5)((()=>[(0,i._)("div",c,[(0,i._)("div",g,[(0,i._)("h4",u,[(0,i._)("span",{textContent:(0,a.zw)(t.title)},null,8,p)]),(0,i._)("h6",m,[(0,i.Uk)("附議數:"),(0,i._)("span",{textContent:(0,a.zw)(t.num)},null,8,b)]),(0,i._)("p",h,[(0,i._)("span",{textContent:(0,a.zw)(t.details)},null,8,x)]),(0,i._)("p",w,[(0,i._)("span",{textContent:(0,a.zw)(new Date(t.date).toLocaleDateString("zh-tw"))},null,8,y)])])])])),_:2},1032,["to"])))),128))])),(0,i._)("div",null,[(0,i._)("ul",v,[(0,i._)("li",f,[1!=_.page?((0,i.wg)(),(0,i.iD)("a",{key:0,class:"page-link","aria-label":"Previous",onClick:e[0]||(e[0]=t=>D.gotoPage(_.page-1))},k)):((0,i.wg)(),(0,i.iD)("a",C,j))]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(_.pages,(t=>((0,i.wg)(),(0,i.iD)("div",{key:t},[(0,i._)("li",$,[t==_.page?((0,i.wg)(),(0,i.iD)("a",z,(0,a.zw)(t),1)):((0,i.wg)(),(0,i.iD)("a",{key:1,class:"page-link",onClick:e=>D.gotoPage(t)},(0,a.zw)(t),9,q))])])))),128)),(0,i._)("li",I,[_.page!=_.pages?((0,i.wg)(),(0,i.iD)("a",{key:0,class:"page-link","aria-label":"Next",onClick:e[1]||(e[1]=t=>D.gotoPage(_.page+1))},P)):((0,i.wg)(),(0,i.iD)("a",Z,A))])])])])}n(7658);var K=n(9314),N=n(6678),Y={components:{titleCard:N.Z},name:"proposeList",data(){return{cardData:void 0,page:void 0==this.$route.query.page?1:this.$route.query.page,pages:0}},watch:{$route(t){this.page=void 0==t.query.page?1:t.query.page,this.getList()}},methods:{gotoPage(t){this.cardData=void 0,this.page=t,this.$router.push({name:"proposeList",query:{page:t}}),this.getList()},gotoConfirmPropose(){this.$router.push({name:"proposeAddConfirm"})},getList(){K.h.post("propose/list",{page:this.page},(t=>{this.cardData=t.data.data,this.pages=t.data.pages}),(t=>{console.error(t)}))}},created(){void 0==this.$route.query.page&&this.$router.push({name:"proposeList",query:{page:1}}),this.getList()}},B=n(89);const S=(0,B.Z)(Y,[["render",H]]);var U=S}}]);
//# sourceMappingURL=220.9cfdc7dd.js.map