"use strict";(self["webpackChunkjoinstu_admin_vue"]=self["webpackChunkjoinstu_admin_vue"]||[]).push([[151],{4151:function(e,t,s){s.r(t),s.d(t,{default:function(){return Z}});var l=s(3396),n=s(7139);const a={class:"container mw-100",style:{"padding-right":"0px","padding-left":"0px",margin:"0","margin-right":"0px"}},i={class:"row",style:{margin:"0"}},o={class:"col-md-12"},c={class:"card"},r=(0,l._)("div",{class:"card-body"},[(0,l._)("h5",{class:"text-uppercase card-title mb-0"},"用戶管理")],-1),d={class:"table-responsive"},u={class:"table no-wrap user-table mb-0"},b=(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",{class:"text-uppercase border-0 font-medium",scope:"col"},"姓名"),(0,l._)("th",{class:"text-uppercase border-0 font-medium",scope:"col"},"ID"),(0,l._)("th",{class:"text-uppercase border-0 font-medium",scope:"col"},"學校"),(0,l._)("th",{class:"text-uppercase border-0 font-medium",scope:"col"},"加入日期"),(0,l._)("th",{class:"text-uppercase border-0 font-medium",scope:"col"},"身分"),(0,l._)("th",{class:"text-uppercase border-0 font-medium",scope:"col"},"管理")])],-1),p={class:"font-medium mb-0"},m={class:"text-muted"},_=(0,l._)("br",null,null,-1),g={class:"text-muted"},h=(0,l._)("br",null,null,-1),x={class:"text-muted"},U=(0,l._)("br",null,null,-1),w={style:{padding:"0"}},y={class:"container d-flex justify-content-around"},k=(0,l._)("i",{class:"bi bi-pencil-square"},null,-1),f=["onClick"],v=(0,l._)("i",{class:"bi bi-x-circle"},null,-1),D=[v],C=["onClick"],z=(0,l._)("i",{class:"bi bi-x-circle"},null,-1),j=[z],H=["onClick"],I=(0,l._)("i",{class:"bi bi-trash"},null,-1),q=[I],A=["onClick"],B=(0,l._)("i",{class:"bi bi-magic"},null,-1),E=[B];function K(e,t,s,v,z,I){const B=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("div",a,[(0,l._)("div",i,[(0,l._)("div",o,[(0,l._)("div",c,[r,(0,l._)("div",d,[(0,l._)("table",u,[b,(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(z.accountsData,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e.id},[(0,l._)("td",null,[(0,l._)("h5",p,(0,n.zw)(e.name),1)]),(0,l._)("td",null,[(0,l._)("span",m,(0,n.zw)(e.id),1),_]),(0,l._)("td",null,[(0,l._)("span",g,(0,n.zw)(e.school),1),h]),(0,l._)("td",null,[(0,l._)("span",x,(0,n.zw)(new Date(e.joindate).toLocaleDateString()),1),U]),(0,l._)("td",null,[(0,l._)("span",null,(0,n.zw)(1==e.isAdmin?"管理員":"學生"),1)]),(0,l._)("td",w,[(0,l._)("div",y,[(0,l.Wm)(B,{class:"col btn btn-secondary mx-1",type:"button",title:"edit",to:{name:"accountsEditing",params:{id:e.id}}},{default:(0,l.w5)((()=>[k])),_:2},1032,["to"]),0==e.isBanned?((0,l.wg)(),(0,l.iD)("button",{key:0,class:"col btn btn-secondary mx-1",type:"button",title:"ban",onClick:t=>I.banUser(e.id)},D,8,f)):((0,l.wg)(),(0,l.iD)("button",{key:1,class:"col btn btn-danger mx-1",type:"button",title:"active",onClick:t=>I.unbanUser(e.id)},j,8,C)),0==e.isDeleted?((0,l.wg)(),(0,l.iD)("button",{key:2,class:"col btn btn-secondary mx-1",type:"button",title:"delete",onClick:t=>I.deleteUser(e.id)},q,8,H)):((0,l.wg)(),(0,l.iD)("button",{key:3,class:"col btn btn-danger mx-1",type:"button",title:"active",onClick:t=>I.restoreUser(e.id)},E,8,A))])])])))),128))])])])])])])])}var L=s(9314),S={name:"accountHome",data(){return{accountsData:void 0}},methods:{getUsers(){L.h.get("admin/getUsers",{},(e=>{this.accountsData=e.data}),(e=>{console.log(e)}))},banUser(e){L.h.post("admin/banUser",{id:e},(()=>{this.getUsers(),alert("已停權用戶")}),(e=>{console.log(e)}))},unbanUser(e){L.h.post("admin/unbanUser",{id:e},(()=>{this.getUsers(),alert("已復權用戶")}),(e=>{console.log(e)}))},deleteUser(e){L.h.post("admin/deleteUser",{id:e},(()=>{this.getUsers(),alert("已將用戶排定刪除")}),(e=>{console.log(e)}))},restoreUser(e){L.h.post("admin/restoreUser",{id:e},(()=>{this.getUsers(),alert("已重啟用戶")}),(e=>{console.log(e)}))}},created(){this.getUsers(),setInterval((()=>{this.getUsers()}),1e4)}},W=s(89);const Y=(0,W.Z)(S,[["render",K]]);var Z=Y}}]);
//# sourceMappingURL=151.084bb4cc.js.map