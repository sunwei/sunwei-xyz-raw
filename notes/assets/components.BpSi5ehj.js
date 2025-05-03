var wn=Object.defineProperty,jn=Object.defineProperties;var yn=Object.getOwnPropertyDescriptors;var ae=Object.getOwnPropertySymbols;var Ae=Object.prototype.hasOwnProperty,$e=Object.prototype.propertyIsEnumerable;var pe=(e,n,r)=>n in e?wn(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,T=(e,n)=>{for(var r in n||(n={}))Ae.call(n,r)&&pe(e,r,n[r]);if(ae)for(var r of ae(n))$e.call(n,r)&&pe(e,r,n[r]);return e},P=(e,n)=>jn(e,yn(n));var xe=(e,n)=>{var r={};for(var o in e)Ae.call(e,o)&&n.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&ae)for(var o of ae(e))n.indexOf(o)<0&&$e.call(e,o)&&(r[o]=e[o]);return r};var O=(e,n,r)=>pe(e,typeof n!="symbol"?n+"":n,r);var N=(e,n,r)=>new Promise((o,s)=>{var a=c=>{try{d(r.next(c))}catch(u){s(u)}},l=c=>{try{d(r.throw(c))}catch(u){s(u)}},d=c=>c.done?o(c.value):Promise.resolve(c.value).then(a,l);d((r=r.apply(e,n)).next())});import{r as i,j as t,R as _e,a as vn}from"./react-core.zo7RGMO7.js";import{p as Be,i as Oe,s as Sn,b as G,a as He,c as Ue,d as fe,e as Ne,f as Ee,g as Ce,m as K,n as kn,h as Te,j as Nn,l as Pe,k as re,o as En,q as Cn,r as Mn,t as Rn,u as In,v as An,w as $n,x as Tn}from"./ui-libs.ClE-r2MV.js";import{d as Pn,u as Y,c as Fn,C as Ln,S as zn,a as Dn,b as L,t as le,D as _n,e as be,f as Bn,P as On,E as me,g as Hn,h as Un,m as Wn,i as We}from"./vendor.ClvBES_g.js";const qn={production:"https://mdfriday.sunwei.xyz"},D=qn.production,U={IMAGES:`${D}/api/images`,IMAGE_SEARCH:`${D}/api/image/search`,IMAGE_TAGS:`${D}/api/image/tags`,SHORTCODES:`${D}/api/scs`,SHORTCODE_SEARCH:`${D}/api/sc/search`,SHORTCODE_TAGS:`${D}/api/sc/tags`,SHORTCODE_DETAILS:`${D}/api/sc`},ie={type:"Image",count:10,offset:0,order:"desc"},X={type:"ShortCode",count:10,offset:0,order:"desc"},we=new Map;class ce extends Error{constructor(r,o){super(r);O(this,"status");this.status=o,this.name="ApiError"}}function Gn(e,n){if(!n)return e;const r=new URLSearchParams;Object.entries(n).forEach(([s,a])=>{a!==void 0&&r.append(s,String(a))});let o=r.toString();if(n.q){const s=`q=${encodeURIComponent(String(n.q))}`,a=new RegExp("q=[^&]*");o=o.replace(a,s)}return o?`${e}?${o}`:e}function de(r){return N(this,arguments,function*(e,n={}){var u;const c=n,{params:o,disableCache:s=!1}=c,a=xe(c,["params","disableCache"]),l=Gn(e,o),d=new Headers(a.headers||{});!d.has("Content-Type")&&!((u=a.method)!=null&&u.toUpperCase().includes("GET"))&&d.set("Content-Type","application/json"),!s&&we.has(l)&&d.set("If-None-Match",we.get(l));try{const h=yield fetch(l,P(T({},a),{headers:d})),f=h.headers.get("Etag");if(f&&we.set(l,f),h.status===304){const p=localStorage.getItem(`api_cache_${l}`);if(p)return JSON.parse(p);console.log(`Received 304 but no cached data for URL: ${l}`)}if(!h.ok)throw new ce(`API request failed: ${h.statusText}`,h.status);if(h.status===204)return{};const b=yield h.text();if(!b)return console.error(`Empty response body for URL: ${l}`),{};try{const p=JSON.parse(b);return!s&&h.ok&&localStorage.setItem(`api_cache_${l}`,JSON.stringify(p)),p}catch(p){throw console.error(`Error parsing JSON for URL: ${l}`,b,p),new ce(`Invalid JSON response: ${p.message}`,h.status)}}catch(h){throw h instanceof ce?h:(console.error(`Network error for URL: ${l}`,h),new ce(`Network error: ${h.message}`,0))}})}const H={get:(e,n={})=>de(e,P(T({},n),{method:"GET"})),post:(e,n,r={})=>de(e,P(T({},r),{method:"POST",body:JSON.stringify(n)})),put:(e,n,r={})=>de(e,P(T({},r),{method:"PUT",body:JSON.stringify(n)})),delete:(e,n={})=>de(e,P(T({},n),{method:"DELETE"}))};function qe(e,n,r,o){const s=e/n;let a=r,l=o;return s>1?(l=a/s,l>o&&(l=o,a=l*s)):(a=l*s,a>r&&(a=r,l=a/s)),{width:Math.round(a),height:Math.round(l)}}function Vn({id:e,assetUrl:n,width:r,height:o,maxWidth:s=300,maxHeight:a=300}){if(n.startsWith("http"))return n;const l=n.startsWith("/")?n.substring(1):n;return qe(r,o,s,a),`${D}/${l}`}function Jn(e,n,r,o,s=300,a=200){const l=Ge(n),{width:d,height:c}=qe(r,o,s,a);return{url:l,displayWidth:d,displayHeight:c}}function Ge(e){if(e.startsWith("http"))return e;const n=e.startsWith("/")?e:`/${e}`;return`${D}${n}`}function ue(e){return{id:e.uuid,title:e.name,slug:e.slug,description:e.desc,template:e.template,example:e.example,tags:e.tags,asset:Ge(e.asset),thumbnail:Vn({id:e.id,assetUrl:e.asset,width:e.width,height:e.height}),width:e.width,height:e.height}}function Yn(e){return e.flat().filter(Boolean)}function Qn(e,n){const r=[];if(e.trim()){const s=e.trim(),a=[`name:${s}`,`slug:${s}`,`tags:${s}`];r.push(a.join(" OR ")),console.log("Added search term conditions:",a.join(" OR "))}if(n.length>0){const s=n.map(a=>`tags:${a}`).join(" OR ");r.push(s),console.log("Added tag filter conditions:",s)}let o="";return r.length>1?o=r.map(s=>`(${s})`).join(" AND "):o=r[0]||"",console.log("Final constructed query:",o),o}const Se={fetchShortcodes(){return N(this,arguments,function*(e=1,n=X.count,r=[],o=""){return this.searchShortcodes(e,n,o,r)})},searchShortcodes(){return N(this,arguments,function*(e=1,n=X.count,r="",o=[]){const s=e-1;try{console.log("Searching shortcodes with:",{page:e,limit:n,searchTerm:r,selectedTags:o});const a=r.trim()!==""||o.length>0;let l;const d={type:X.type,count:n,offset:s,order:X.order};if(a){const h=Qn(r,o);if(h){const f=P(T({},d),{q:h});console.log("Search query:",h),console.log("Search params:",f),l=yield H.get(U.SHORTCODE_SEARCH,{params:f})}else console.log("Empty search query, using regular endpoint"),l=yield H.get(U.SHORTCODES,{params:d})}else l=yield H.get(U.SHORTCODES,{params:d});if(!l||!l.data)return console.error("Invalid API response:",l),{shortcodes:[],hasMore:!1};const c=l.data.map(h=>{try{return ue(h)}catch(f){return console.error("Error mapping API shortcode:",h,f),null}}).filter(Boolean),u=c.length===n;return console.log(`Fetched ${c.length} shortcodes, hasMore: ${u}`),{shortcodes:c,hasMore:u}}catch(a){return console.error("Error searching shortcodes:",a),{shortcodes:[],hasMore:!1}}})},fetchAllTags(){return N(this,null,function*(){try{console.log("Fetching all shortcode tags");const e={type:X.type},n=yield H.get(U.SHORTCODE_TAGS,{params:e});return!n||!n.data?(console.error("Invalid API response for tags:",n),[]):Array.isArray(n.data)?Yn(n.data):(console.error("Tags data is not an array:",n.data),[])}catch(e){return console.error("Error fetching tags:",e),[]}})},fetchShortcodeById(e){return N(this,null,function*(){try{console.log(`Fetching shortcode with ID: ${e}`);const n={type:X.type,id:e,status:void 0},r=yield H.get(U.SHORTCODE_DETAILS,{params:n});return console.log("Shortcode details API response:",JSON.stringify(r,null,2)),!r||!r.data||!Array.isArray(r.data)||r.data.length===0?(console.error("Invalid API response for shortcode details:",r),null):ue(r.data[0])}catch(n){return console.error(`Error fetching shortcode with ID: ${e}`,n),null}})},fetchShortcodeBySlug(e){return N(this,null,function*(){try{console.log(`Fetching shortcode with slug: ${e}`);const n={type:X.type,count:1,offset:0,q:`slug:${e}`},r=yield H.get(U.SHORTCODE_SEARCH,{params:n});return console.log("Shortcode by slug API response:",JSON.stringify(r,null,2)),!r||!r.data||!Array.isArray(r.data)||r.data.length===0?(console.error("Invalid API response for shortcode by slug:",r),null):ue(r.data[0])}catch(n){return console.error(`Error fetching shortcode with slug: ${e}`,n),null}})},createShortcodeMetadata(e){return{id:parseInt(e.id,10)||0,name:e.title,template:e.template,uuid:e.id,tags:e.tags}},fetchShortcodeByName(e){return N(this,null,function*(){try{console.log(`Fetching shortcode by name: ${e}`);const n=`${D}/api/sc/hash?name=${encodeURIComponent(e)}`,r=yield H.get(n);if(!r||!r.data||!Array.isArray(r.data)||r.data.length===0)return console.error("Invalid or empty response when fetching shortcode by name:",r),null;const o=r.data[0];return ue(o)}catch(n){return console.error(`Error fetching shortcode by name '${e}':`,n),null}})}},q=new Pn.Shortcode;function Fe(e){try{const n=atob(e),r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);return new TextDecoder("utf-8").decode(r)}catch(n){return console.error("Error decoding base64 string:",n),""}}function Xn(e){try{return JSON.parse(e)}catch(n){return console.error("Error parsing JSON:",n),null}}const Z={getInstance(){return q},registerShortcode(e){if(!e||!e.template){console.error("Invalid shortcode item or missing template:",e);return}try{const n=Fe(e.template);if(!n){console.error(`Failed to decode template for shortcode: ${e.title}`),console.log("Original template:",e.template.substring(0,100)+"..."),this.registerWithOriginalTemplate(e);return}const r=Xn(n);if(r&&typeof r=="object"){console.log(`Decoded template JSON for ${e.title} with ${Object.keys(r).length} shortcodes`);const o=r[e.title];if(o){const s={id:parseInt(e.id,10),name:e.title,template:o,uuid:e.id,tags:e.tags};let a=q.registerShortcode(s);console.log(`Registered main shortcode: ${e.title}, with ${o}, result: ${a}`),Object.entries(r).forEach(([l,d],c)=>{if(l===e.title)return;const h={id:parseInt(e.id,10)+1e4+c,name:l,template:d,uuid:e.id+"-"+l,tags:[]};let f=q.registerShortcode(h);console.log(`Registered sub-shortcode: ${l}, with ${d}, result: ${f}`)})}else{console.error(`Main template not found for shortcode: ${e.title}`),console.log("Available keys:",Object.keys(r));const s=Object.keys(r)[0];if(s){console.log(`Using first available template key: ${s}`);const a={id:parseInt(e.id,10),name:e.title,template:r[s],uuid:e.id,tags:e.tags};q.registerShortcode(a)}else this.registerWithOriginalTemplate(e)}}else{console.warn(`Template for ${e.title} is not in the expected JSON format, using as plain template`),console.log("Decoded template sample:",n.substring(0,100)+"...");const o={id:parseInt(e.id,10),name:e.title,template:n,uuid:e.id,tags:e.tags};q.registerShortcode(o)}}catch(n){console.error(`Error registering shortcode ${e.title}:`,n),this.registerWithOriginalTemplate(e)}},registerWithOriginalTemplate(e){console.warn(`Falling back to original template for shortcode: ${e.title}`);try{const n={id:parseInt(e.id,10),name:e.title,template:e.template,uuid:e.id,tags:e.tags};q.registerShortcode(n),console.log(`Registered shortcode with original template: ${e.title}`)}catch(n){console.error(`Critical failure registering shortcode ${e.title}:`,n)}},isShortcodeRegistered(e){return!!q.findByName(e)},extractShortcodeNames(e){return q.extractShortcodeNames(e)},fetchShortcodeByName(e){return N(this,null,function*(){return Se.fetchShortcodeByName(e)})},decodeExample(e){if(!e||!e.example)return console.log("No example content to decode"),"";try{const n=Fe(e.example);return n?n.startsWith("http://")||n.startsWith("https://")?(console.log("Example content is a URL:",n),n):(console.log(`Successfully decoded example for ${e.title}`),n):(console.warn(`Failed to decode example for ${e.title}, using original`),e.example)}catch(n){return console.error(`Error decoding example for ${e.title}:`,n),e.example}},ensureShortcodesRegistered(e){return N(this,null,function*(){const n=this.extractShortcodeNames(e);if(console.log("Extracted shortcode names:",n),n.length===0){console.log("No shortcodes found in content");return}const r=n.filter(s=>!this.isShortcodeRegistered(s));if(console.log("Unregistered shortcodes:",r),r.length===0){console.log("All shortcodes are already registered");return}const o=r.map(s=>N(this,null,function*(){const a=yield this.fetchShortcodeByName(s);a?(this.registerShortcode(a),console.log(`Registered shortcode: ${s}`)):console.warn(`Failed to fetch shortcode: ${s}`)}));yield Promise.all(o)})},stepRender(e){return q.stepRender(e)},finalRender(e){return q.finalRender(e)}},je={error:e=>console.error(e),success:e=>console.log(e)},Ve=Z.getInstance(),Je=i.createContext({isCreatingProject:!1,shortcodeTags:[],selectedTags:[],searchTerm:"",shortcodes:[],hasMoreShortcodes:!1,isLoadingShortcodes:!1,selectedShortcode:null,shortcodeInstance:Ve,setCreatingProject:()=>{},selectTag:()=>{},loadMoreShortcodes:()=>{},selectShortcode:()=>{},createProjectFromShortcode:()=>N(void 0,null,function*(){return null}),setSearchTerm:()=>{},clearFilters:()=>{},stepRender:e=>e,finalRender:e=>e});function Zn(e){return N(this,null,function*(){try{const n=yield fetch(e);if(!n.ok)throw new Error(`Failed to fetch: ${n.status} ${n.statusText}`);return yield n.text()}catch(n){throw console.error("Error fetching remote content:",n),n}})}const Xt=({children:e})=>{const{i18n:n}=Y(),[r,o]=i.useState(!1),[s,a]=i.useState([]),[l,d]=i.useState([]),[c,u]=i.useState(""),[h,f]=i.useState([]),[b,p]=i.useState(!1),[w,m]=i.useState(!1),[g,v]=i.useState(1),[k,$]=i.useState(null);i.useEffect(()=>{S()},[]),i.useEffect(()=>{C(1)},[c,l]);const S=()=>N(void 0,null,function*(){try{const y=yield Se.fetchAllTags();a(y)}catch(y){console.error("Error loading shortcode tags:",y)}}),R=i.useCallback(()=>{u(""),d([])},[]),C=y=>N(void 0,null,function*(){m(!0);try{const A=yield Se.searchShortcodes(y,10,c,l);f(y===1?A.shortcodes:V=>[...V,...A.shortcodes]),p(A.hasMore),v(y)}catch(A){console.error("Error loading shortcodes:",A)}finally{m(!1)}}),I={isCreatingProject:r,shortcodeTags:s,selectedTags:l,searchTerm:c,shortcodes:h,hasMoreShortcodes:b,isLoadingShortcodes:w,selectedShortcode:k,shortcodeInstance:Ve,setCreatingProject:o,selectTag:y=>{d(A=>A.includes(y)?A.filter(V=>V!==y):[...A,y])},loadMoreShortcodes:()=>{!w&&b&&C(g+1)},selectShortcode:y=>{$(y),Z.registerShortcode(y)},createProjectFromShortcode:y=>N(void 0,null,function*(){m(!0);try{if(console.log("Creating project from shortcode:",y),!y)throw new Error("No shortcode selected");Z.registerShortcode(y);let A=Z.decodeExample(y)||`{{< ${y.title} >}}`;if(A.startsWith("https://"))try{je.success("正在下载模板内容..."),A=yield Zn(A)}catch(ge){console.error("Error fetching remote example:",ge),je.error("下载模板内容失败，将使用默认内容"),A=`{{< ${y.title} >}}`}yield Z.ensureShortcodesRegistered(A);const V=Date.now().toString(),W={id:`project_${V}`,name:y.title,type:y.tags.includes("resume")?"resume":y.tags.includes("website")?"website":"xiaohongshu",templateId:y.id,files:[{id:`file_${V}`,name:"index.md",content:A,path:"/index.md",isDirectory:!1}],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},ne=JSON.parse(localStorage.getItem("md_friday_projects")||"[]");ne.push(W),localStorage.setItem("md_friday_projects",JSON.stringify(ne)),localStorage.setItem("md_friday_current_project_id",W.id),$(null);const se=new CustomEvent("project-changed",{detail:{projectId:W.id}});return window.dispatchEvent(se),console.log("Project created successfully:",W),W}catch(A){return console.error("Failed to create project from shortcode:",A),je.error("Failed to create project from shortcode"),null}finally{m(!1)}}),setSearchTerm:u,clearFilters:R,stepRender:y=>Z.stepRender(y),finalRender:y=>Z.finalRender(y)};return t.jsx(Je.Provider,{value:I,children:e})},Kn=()=>{const e=i.useContext(Je);if(e===void 0)throw new Error("useProject must be used within a ProjectProvider");return e},ye={navItems:[]},et=o=>{var s=o,{size:e=24,height:n}=s,r=xe(s,["size","height"]);return t.jsx("svg",P(T({xmlns:"http://www.w3.org/2000/svg",viewBox:"203.83 275.21 201.06 201.06",width:e,height:n!=null?n:e},r),{children:t.jsx("path",{fill:"#004ea2",d:`M259.32,275.21c-37.47,0-49.64,20.5-53.59,50.89h13l35.62,54.28
      l35.38-54.28h43.42V426.75h17l-40.36,38.19l-42.15-38.19H289V360.58l-42.72,66.17H242L203.83,369v6.78
      c0,55.52,0,100.53,55.49,100.53s145.57-45,145.57-100.53S314.84,275.21,259.32,275.21Z`})}))},Me=()=>t.jsx("svg",{fill:"none",height:"14",viewBox:"0 0 24 24",width:"14",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{d:"M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z",fill:"currentColor"})});var nt=`.container-layout{
  background-color: #e5e5e5;
  padding: 32px;
}

/* light */
.article {
  padding: 32px;
  border-radius: 8px;
  background: white;
  color-scheme: light;
  color: #1f2328;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
}

h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #d1d9e0b3;
}

h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #d1d9e0b3;
}

h3 {
  font-size: 1.25em;
}

h4 {
  font-size: 1em;
}

h5 {
  font-size: 0.875em;
}

h6 {
  font-size: 0.85em;
  color: #59636e;
}

p,
blockquote,
ul,
ol,
dl,
table,
pre,
details {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: #0969da;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  border-style: none;
  width: 100%;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
}

th,
td {
  padding: 6px 13px;
  border: 1px solid #d1d9e0;
}

blockquote {
  margin: 0;
  padding: 0 1em;
  color: #59636e;
  border-left: 0.25em solid #d1d9e0;
}

ul {
  list-style-type: disc;
  padding-left: 2em;
}

code {
  margin: 0 2px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 3px 4px;
}

pre {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
}

pre code {
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  word-wrap: normal;
  max-width: initial;
  display: inline;
  overflow: initial;
  line-height: inherit;
}

ol {
  padding-left: 2em;
  list-style-type: auto;
}

hr {
  border-bottom: 1px solid #d1d9e0b3;
  margin: 1.5rem 0;
}

details {
  display: block;
}

summary {
  display: list-item;
}

[hidden] {
  display: none !important;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #383a42;
  background: #fafafa;
}

.hljs-comment,
.hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #a626a4;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e45649;
}

.hljs-literal {
  color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #50a14f;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #986801;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #4078f2;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #c18401;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`,tt=`.container-layout{
  background-color: #c0c0c0;
  padding: 16px;
}

.article {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  background-color: #f5f5f5;
  padding: 32px;
  border-radius: 8px;
  color: #333333;
  line-height: 1.6;
}

/* 标题样式 */
h1 {
  font-size: 36px;
  text-align: center;
  font-weight: bold;
  color: #333333;
  border-bottom: 2px solid #333333;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  font-weight: bold;
  color: #222222;
  margin-top: 30px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #bbbbbb;
}

/* 段落样式 */
p {
  font-size: 16px;
  margin-bottom: 20px;
  text-align: justify;
}

/* 引用样式 */
blockquote {
  border-left: 4px solid #333333;
  margin: 20px 0;
  padding: 10px 20px;
  font-style: italic;
  color: #555555;
  background-color: #f0f0f0;
}

/* 列表样式 */
ul {
  list-style-type: square;
  padding-left: 20px;
  margin-bottom: 20px;
}

li {
  margin: 10px 0;
}

/* 图片样式 */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
  border: 2px solid #dddddd;
}

/* 代码块样式 */
pre {
  background-color: #fafafa;
  padding: 15px;
  border: 1px solid #dddddd;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.4;
}

code {
  background-color: #fafafa;
  padding: 2px 4px;
  font-size: 14px;
  color: #d6336c;
}

/* 表格样式 */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

thead th {
  background-color: #333333;
  color: #ffffff;
  padding: 10px;
  text-align: left;
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

tbody td,
thead th {
  padding: 10px;
  border: 1px solid #dddddd;
}

/* 链接样式 */
a {
  color: #006699;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 按钮与输入框样式 */
input[type="checkbox"] {
  margin-right: 8px;
}

/* 分割线 */
hr {
  border: none;
  border-top: 2px solid #cccccc;
  margin: 40px 0;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #383a42;
  background: #fafafa;
}

.hljs-comment,
.hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #a626a4;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e45649;
}

.hljs-literal {
  color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #50a14f;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #986801;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #4078f2;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #c18401;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`,rt=`.container-layout{
  background-color: #39236b;
  padding: 32px;
}

/* 通用设置 */
.article {
  gap: 16px;
  padding: 32px;
  background: linear-gradient(
    to bottom right,
    #6b46c1,
    rgba(79, 70, 229, 0.9),
    #5a34b0
  );
  line-height: 1.5;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  user-select: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: center;
}

h1 {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #fff;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

h2 {
  font-size: 28px;
  margin-top: 24px;
  padding-bottom: 6px;
  border-bottom: 1px solid #fff;
  margin-bottom: 12px;
}

ul,
ol {
  list-style-type: auto;
  padding-left: 2em;
}

p {
  font-size: 16px;
  text-align: center;
}

a {
  color: #fff;
  text-decoration: underline;
}

blockquote {
  font-size: 18px;
  font-style: italic;
  padding: 12px;
  background-color: #f9f9f9;
  border-left: 4px solid #333333;
  color: #666666;
  margin: 12px 0;
}

img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  margin: 16px 0;
}

ol {
  list-style-type: decimal;
  padding-left: 24px;
}

li {
  margin: 8px 0;
}

strong {
  font-weight: bold;
}

code {
  background-color: #fff;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #ef4444;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  width: max-content;
  max-width: 100%;
  overflow: auto;
}

th,
td {
  padding: 6px 13px;
  border: 1px solid #fff;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #abb2bf;
  background: #282c34;
}

.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #c678dd;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75;
}

.hljs-literal {
  color: #56b6c2;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #98c379;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #d19a66;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #e6c07b;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`,ot=`.container-layout{
  background-color: #000000;
  padding: 24px;
}

/* 文章内容设置 */
.article {
  padding: 2em 60px;
  font-size: 16px;
  border-radius: 8px;
  color: #333;
  background: #fff;
  font-family:
    PingFang SC,
    Verdana,
    Helvetica Neue,
    Microsoft Yahei,
    Hiragino Sans GB,
    Microsoft Sans Serif,
    WenQuanYi Micro Hei,
    sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
}

/* 标题样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
  color: #333;
  line-height: 1.35;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.4em;
  padding-bottom: 1em;
  border-bottom: 3px double #eee;
}
h2 {
  font-size: 1.8em;
}
h3 {
  font-size: 1.6em;
}
h4 {
  font-size: 1.4em;
}
h5,
h6 {
  font-size: 1.2em;
}

/* 段落样式 */
p {
  font-weight: 300;
  margin-bottom: 1.2em;
}

strong {
  font-weight: bolder;
  color: #000;
}

em {
  font-style: italic;
}

/* 列表样式 */
ul,
ol {
  font-weight: 300;
  margin-left: 1.3em;
}

ul {
  font-weight: 300;
  list-style: circle;
}

ol {
  font-weight: 300;
  list-style: decimal;
}

li ul {
  font-weight: 300;
  list-style: circle;
}

/* 引用块样式 */
blockquote {
  color: #999;
  border-left: 1px solid #1abc9c;
  padding-left: 1em;
  margin: 1em 3em 1em 2em;
}

/* 链接样式 */
a {
  color: #1abc9c;
  text-decoration: none;
  border-bottom: 1px solid #1abc9c;
}

a:hover {
  text-decoration: underline;
  color: #555;
  border-bottom-color: #555;
}

/* 水平分割线 */
hr {
  border: none;
  border-bottom: 1px solid #cfcfcf;
  margin-bottom: 0.8em;
  height: 10px;
}

/* 代码块和内联代码 */
pre,
code {
  font-family: "Courier New", monospace;
  background: #ededeb;
  color: #eb5757;
  border-radius: 4px;
  padding: 0.2em 0.4em;
}

pre {
  margin: 1rem 0;
  border: 1px solid #ddd;
  padding: 1em 0.5em;
  overflow-x: auto;
}

code {
  /*font-size: 85%;*/
}

/* 表格样式 */
table {
  font-weight: 300;
  border-collapse: collapse;
  width: 100%;
}

thead th {
  background: #f1f1f1;
  border: 1px solid #ddd;
}

tbody td {
  border: 1px solid #ddd;
  padding: 0.5em 1em;
  color: #666;
}

/* 图片样式 */
img {
  max-width: 100%;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #383a42;
  /*background: #fafafa;*/
}

.hljs-comment,
.hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #a626a4;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e45649;
}

.hljs-literal {
  color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #50a14f;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #986801;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #4078f2;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #c18401;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`,st=`.container-layout{
    background-color: #efe7db;
    padding: 36px;
}

/* light */
.article {
    padding: 32px;
    border-radius: 8px;
    background: white;
    color-scheme: light;
    color: #222222;
    font-family: AvenirNext-Regular, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
}

/* title */
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 1.5rem 0 0.75em;
    font-family: AvenirNext-Medium, serif;
    font-weight: 600;
    line-height: 1.5em;
    color: #262626;
}

h1 {
    font-size: 1.5em;
}

h2 {
    font-size: 1.3em;
}

h3 {
    font-size: 1.1em;
}

h4 {
    font-size: 1em;
}

h5 {
    font-size: 1em;
}

h6 {
    font-size: 1em;
}

/* general themes */
p, pre, ul, ol, dl, form, details, dl, blockquote, table, xmp, plaintext, listing, figure,
pre[class*="language-"] {
    margin: 0.75em 0 0.45em;
}

/* 段落样式 */
p {
    margin-left: 0;
    margin-right: 0;
}

/* 引用样式 */
blockquote {
    background-color: #ffffff;
    padding-left: 0.8em;
    border-left: 0.2em solid #007acb;
    margin: 1rem 0;
}

blockquote > blockquote {
    margin: 0;
    border-left: 0.2em double #007acb;
}

li > blockquote {
    margin: 0.5rem;
    margin-left: -0.8rem;
}

/* 列表样式 */
ul ul, ul ol, ol ul, ol ol {
    margin-bottom: 0px;
    margin-top: 0.25em;
    margin-left: 2em;
}
li ul, li ol {
    margin-top: 0.25em;
    margin-left: 2em;
}

li {
    word-wrap: break-all;
}

ul, ol {
    list-style-type: disc;
}

ul {
    margin-left: 1.3em;
    padding: 0;
}

ol {
    margin-left: 1.3em;
    padding: 0;
    counter-reset: ol_counter;
    list-style-type: auto;
}

ul > li {
    position: relative;
}

ol > li {
    position: relative;
}

li + li {
    margin-top: 0.25em;
}

/* 图片样式 */
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px auto;
    border: 2px solid #dddddd;
}

/* 代码块样式 */
pre, pre[class*="language-"] {
    padding: 0;
    border: 0;
}
pre, xmp, plaintext, listing, code, kbd, tt, samp {
    font-family: Menlo-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

code {
    display: inline;
    border: solid 2px #f3f5f7;
    padding: 0.2em 0.5em;
    font-size: 0.9em;
    color: #444444;
    background-color: #f3f5f7;
}

pre > code {
    display: block;
    border: none;
    padding: 0.7em 1em;
    font-size: 0.9em;
    overflow-x: auto
}

pre {
    background-color: #fafafa;
    padding: 15px;
    border: 1px solid #dddddd;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.4;
}

mark {
    color: inherit;
    display: inline;
    padding: 0.2em 0.5em;
    background-color: #fcffc0;
}

figcaption {
    text-align: center;
}

/* 表格样式 */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 0px;
    margin-right: 0px;
    color: #222222;
    background-color: white;
    font-size: 1em;
    border-spacing: 0;
    border: 1px solid #cecece;
}

th, td {
    padding: 0.7em 1em;
    font-size: 0.9em;
    border: 1px solid #cecece;
    border-top: none;
    border-bottom: none;
}

caption, th, td {
    text-align: left;
    font-weight: normal;
    vertical-align: middle
}

thead th {
    background-color: #f3f4f6;
    color: #434343;
    font-weight: bold;
    padding: 10px;
    text-align: left;
}

tbody tr:nth-child(even) {
    background-color: #f3f4f6;
}

/* 链接样式 */
a {
    color: #007acb;
    text-decoration: underline;
}

/* divider */

hr {
    height: 1px;
    border: 0;
    background-color: #bfbfbf;
    border-style: inset;
    border-width: 1px;
}

details {
    display: block;
}

summary {
    display: list-item;
}

[hidden] {
    display: none !important;
}

/* Highlight.js */

pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
}

code.hljs {
    padding: 3px 5px;
}

.hljs {
    color: #444444;
    background: #fafafa;
}

.hljs-comment,
.hljs-quote {
    color: #a0a1a7;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
    color: #007acb;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
    color: #e45649;
}

.hljs-literal {
    color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
    color: #c92626;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
    color: #005f87;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
    color: #4078f2;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
    color: #c18401;
}

.hljs-emphasis {
    font-style: italic;
}

.hljs-strong {
    font-weight: bold;
}

.hljs-link {
    text-decoration: underline;
}
`,at=`.container-layout{
  background-color: #163c4d;
  padding: 28px;
}

/* light */
.article {
  padding: 32px;
  background: #ffffff;
  color-scheme: light;
  color: #1f2328;
  font-family: Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
  color: #e16a7c;
}

h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #d1d9e0b3;
}

h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #d1d9e0b3;
}

h3 {
  font-size: 1.25em;
}

h4 {
  font-size: 1em;
}

h5 {
  font-size: 0.875em;
}

h6 {
  font-size: 0.85em;
}

p,
blockquote,
ul,
ol,
dl,
table,
pre,
details {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: #0969da;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  border-style: none;
  width: 100%;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
}

th,
td {
  padding: 6px 13px;
  border: 1px solid #d1d9e0;
}

blockquote {
  margin: 0;
  padding: 0 1em;
  color: #59636e;
  border-left: 0.25em solid #d1d9e0;
}

ul {
  list-style-type: disc;
  padding-left: 2em;
}

code {
  margin: 0 2px;
  padding: 2px 3px;
  background-color: #eef1f3;
  border: 1px solid #ddd;
  /*border-radius: 4px;*/
}

pre {
  background-color: #eef1f3;
  border: 1px solid #ddd;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  /*border-radius: 6px;*/
}

pre code {
  margin: 0;
  padding: 0;
  background-color: #eef1f3;
  border: none;
  word-wrap: normal;
  max-width: initial;
  display: inline;
  overflow: initial;
  line-height: inherit;
}

ol {
  padding-left: 2em;
  list-style-type: auto;
}

hr {
  border-bottom: 1px solid #d1d9e0b3;
  margin: 1.5rem 0;
}

details {
  display: block;
}

summary {
  display: list-item;
}

[hidden] {
  display: none !important;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #000000;
  background-color: #eef1f3;
}

.hljs-comment,
.hljs-quote {
  color: #6a737d;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #f2617a;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #634f7d;
}

.hljs-literal {
  color: #6b9e78;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #47a1ad;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #cc850a;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #6b9e78;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #47a1ad;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`;const Re=[{name:"github",css:nt},{name:"newspaper",css:tt},{name:"poster",css:rt},{name:"slim",css:ot},{name:"note",css:st},{name:"tw",css:at}],Ye=e=>{var n;return(n=Re.find(r=>r.name===e))==null?void 0:n.css};var lt=`{{< cardBanner

logo="不黑学长"
avatar="https://notes.sunwei.xyz/avatar.png"
mainTitle="让完播率>50% (3/3)"
subtitle="6种文案公式"
description="爆款拆解/爆款要素/文案结构"
newTagText="全新整理"
footerContent="运营技巧,爆款选题,文案写作,数据复盘"

/>}}`,it=`{{< mdfFormulaSingle
    title="[爆款文案结构公式]"
    brand="BUHEIXUEZHANG"
    pageNumber="3"
>}}

{{< mdfFormulaSingleSection
    number="05"
    title="强化IP结构"
    formulaItems="痛点,用户获得感,IP信任感,解决方案"
    caseTitle="案例解析"
    footerText="价值内容的来源/多去收集与行业相关的知识信息与行业内比较厉害的人的交流或者故事也能成为你知识的载体|注意/千万不要说教式的去表达，内容见好就收（控制时长/预留观众想象与思考的空间）；本身平台就是娱乐性质，知识类内容也要寓教于乐！"
>}}
{{< mdfFormulaSinglePoint
    number="1"
    title="痛点"
    description="将痛点放到视频开头的好处是，吸引来的都是精准粉丝；所以要思考你的目标群体的真正痛点！"
    examples="如何免F读书还能每个月3000+|年轻人如何不靠打工才能够养活自己"
/>}}

{{< mdfFormulaSinglePoint
    number="2"
    title="获得感"
    description="你需要在2秒钟内告诉用户我将会为你提供巨大的价值，例如速成类知识"
    examples="3步教大家快速学习新的赚0技能|5分钟教会你7种减脂做法，简单好吃"
/>}}

{{< mdfFormulaSinglePoint
    number="3"
    title="信任感"
    description="强化你将要陈述的内容的可信度，以及你本人的可信度/别人为什么信任你、同时也是为吸引用户看下去的钩子，递进式塑造期待感"
    examples="我曾经帮助2000+学员解决什么问题|曾经获得官方的什么认证/奖项/技能"
/>}}

{{< mdfFormulaSinglePoint
    number="4"
    title="解决方案"
    description="价值是前面所有铺垫工作的最终结果，同时也是观众是否点赞关注的重要因素，如果故弄玄虚只会让用户厌烦"
    examples="盘点真正有用的信息|展示卖点1/卖点2/卖点3"
/>}}

{{< /mdfFormulaSingleSection >}}
{{< /mdfFormulaSingle >}}
`,ct=`{{< mdfFormulaPair
    headerTitle="[爆款文案结构公式]"
    headerLogo="BUHEIXUEZHANG"
    pageNumber="2"
>}}

{{< mdfFormulaPairCard
    number="03"
    name="FIRE结构"
    items="Fact事实+Interpret解读+Reaction反应+Ends结果"
>}}
{{< mdfFormulaPairExample 
    number="1" 
    label="Fact/事实" 
    content="最近好多博主都在抱怨流量不如之前了" 
/>}}
{{< mdfFormulaPairExample 
    number="2" 
    label="Interpret解读" 
    content="那是因为机制从流量转化效率调整到了曝光转化效率" 
/>}}
{{< mdfFormulaPairExample 
    number="3" 
    label="Reaction反应" 
    content="不光短视频，直播间的流量也是一样的结果" 
/>}}
{{< mdfFormulaPairExample 
    number="4" 
    label="Ends结果" 
    content="我们需要优化前两秒使用视听语言" 
/>}}

{{< /mdfFormulaPairCard >}}

{{< mdfFormulaPairCard
    number="04"
    name="RIDE结构"
    items="Risk风险+Interest利益+Difference差异+Effect影响"
>}}
{{< mdfFormulaPairExample
    number="1" 
    label="Risk风险" 
    content="消极口头禅会影响运气" 
/>}}
{{< mdfFormulaPairExample 
    number="2" 
    label="Interest利益" 
    content="使用积极的口头禅来吸引好运对你最有利" 
/>}}
{{< mdfFormulaPairExample 
    number="3" 
    label="Difference差异" 
    content="说我会成功而不是我可能会失败" 
/>}}
{{< mdfFormulaPairExample 
    number="4" 
    label="Effect影响" 
    content="积极的口头禅对人的心态和运气有显著影响" 
/>}}
{{< /mdfFormulaPairCard >}}

{{< /mdfFormulaPair >}}
`,dt=`{{< mdfFormulaFlow
    title="[爆款文案结构公式]"
    brand="BUHEIXUEZHANG"
    number="06"
    name="脚本模式化结构"
    subtitle="(细化版)"
    pageNumber="4"
>}}
    {{< mdfFormulaFlowBlock
        number="1"
        title="故事类爆款脚本结构"
        flowItems="猎奇抓眼球的开头|故事的起因|钩子|故事的经过|钩子|故事的高潮|钩子|结果|引出观点|总结观点"
    />}}
    
    {{< mdfFormulaFlowBlock
        number="2"
        title="爆款短视频结构"
        flowItems="抛出利益点或者痛点|通过案例或者数据证明这个利益点或者痛点来增加信任|针对目标群体强调看这条视频的重要性|如果不看产生的损失跟后|具体的方法或者解决办法|总结/利他感性的结尾"
        usePlusSigns="true"
    />}}

{{< /mdfFormulaFlow >}}
`;const Qe=[{name:"empty",md:""},{name:"cardBanner",md:lt},{name:"formulaSingle",md:it},{name:"formulaPair",md:ct},{name:"formulaFlow",md:dt}],Xe=e=>{var n;return(n=Qe.find(r=>r.name===e))==null?void 0:n.md},ut=[{name:"default",value:0},{name:"1080p",value:1080},{name:"720p",value:720},{name:"540p",value:540},{name:"360p",value:360}],ht=()=>{const[e,n]=i.useState(Re[0].name),[r,o]=i.useState(Ye(e)),[s,a]=i.useState(Qe[0].name),[l,d]=i.useState(Xe(s)),[c,u]=i.useState(0);return{selectedStyle:e,setSelectedStyle:n,articleStyle:r,setArticleStyle:o,selectedTemplate:s,setSelectedTemplate:a,template:l,setTemplate:d,rightPaneWidth:c,setRightPaneWidth:u}},Ze=Fn(ht),Le=e=>Object.entries(e).map(([n,r])=>`${n}: ${r};`).join(" "),mt=e=>{const n={};return e.split(";").filter(Boolean).forEach(o=>{const[s,a]=o.split(":").map(l=>l.trim());s&&a&&(n[s]=a)}),n},ze=e=>{const n=e.match(/\.container-layout\s*\{([^}]+)}/);return n?n[1].trim():""},ft=({newStyle:e,setNewStyle:n})=>t.jsxs(He,{showArrow:!0,offset:10,placement:"bottom",shouldBlockScroll:!0,children:[t.jsx(Ue,{children:t.jsx("div",{className:"size-6 rounded-full flex-shrink-0",style:{backgroundColor:e["background-color"]}})}),t.jsx(Be,{className:"p-0",children:t.jsx(Ln,{color:e["background-color"],disableAlpha:!0,onChange:r=>{n(P(T({},e),{"background-color":`${r.hex}`,background:`${r.hex}`}))}})})]}),gt=()=>{const{t:e}=Y(),{articleStyle:n,setArticleStyle:r,setRightPaneWidth:o}=Ze.useContainer(),[s,a]=i.useState(mt(ze(n)));i.useEffect(()=>{Le(s)&&r(d=>d.replace(ze(d),Le(s)))},[s]);const l=d=>{o(d),setTimeout(()=>{window.dispatchEvent(new Event("resize"))},10)};return t.jsx(Be,{className:"w-[360px]",children:d=>t.jsxs("div",{className:"px-1 py-2 w-full",children:[t.jsx("p",P(T({className:"text-small font-bold text-foreground pb-3"},d),{children:e("customize.layoutCustomizer")})),t.jsx(Oe,{label:e("customize.containerBackground"),labelPlacement:"outside",startContent:t.jsx("div",{style:{cursor:"pointer"},children:t.jsx(ft,{newStyle:s,setNewStyle:a})}),value:s["background-color"],onChange:c=>{a(P(T({},s),{"background-color":`${c.target.value}`,background:`${c.target.value}`}))}}),t.jsx("div",{className:"mt-4 flex flex-col gap-3 w-full",children:t.jsx(Sn,{className:"max-w-md",defaultValue:Number(s.padding.slice(0,-2))||16,getValue:c=>`${c}px`,label:e("customize.containerPadding"),maxValue:64,minValue:0,step:4,onChange:c=>{a(P(T({},s),{padding:`${c}px`}))}})}),t.jsxs("div",{className:"mt-4",children:[t.jsx("p",{className:"text-small font-medium mb-2",children:e("toolbar.quickSizeText")}),t.jsxs("div",{className:"flex flex-wrap gap-2",children:[t.jsx(G,{size:"sm",variant:"flat",onClick:()=>l(0),children:e("toolbar.defaultSize")}),ut.filter(c=>c.name!=="default").map(c=>t.jsx(G,{size:"sm",variant:"flat",onClick:()=>l(c.value+40),children:`${c.value}px`},c.name))]})]})]})})},pt=()=>{const{t:e}=Y();return t.jsx(fe,{className:"w-full",variant:"flat",children:t.jsxs(He,{showArrow:!0,offset:10,placement:"bottom",shouldBlockScroll:!0,children:[t.jsx(Ue,{children:t.jsxs(G,{className:"h-[40px] w-full",children:[t.jsx(zn,{size:18}),e("customize.buttonName")]})}),t.jsx(gt,{})]})})},xt=e=>N(void 0,null,function*(){const n=document.getElementById(e);if(!n){console.error("Element not found");return}const r=n.cloneNode(!0),o=l=>{const d=window.getComputedStyle(l),c=Array.from(d);for(const u of c)l.style[u]=d.getPropertyValue(u)},s=l=>{o(l),Array.from(l.children).forEach(d=>s(d))};s(r);const a=r.outerHTML;try{yield navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([a],{type:"text/html"})})])}catch(l){console.error("Failed to copy content with style:",l)}}),Ke=/^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);function bt(){const{t:e}=Y(),[n,r]=_e.useState(new Set(["email"])),o={email:e("copyEmail.buttonDescription"),image:e("copyImage.buttonDescription")},s={email:e("copyEmail.buttonName"),image:e("copyImage.buttonName")},a=Array.from(n)[0],l=c=>N(this,null,function*(){return yield le(c),yield le(c),yield le(c)}),d=()=>{if(n.has("email"))xt("markdown-body"),L.success(e("copyEmail.successMessage"),{description:e("copyEmail.successDescription"),duration:4e3,position:"top-center"});else if(n.has("image")){const c=document.getElementById("markdown-body");if(!c)return;if(L.success(e("commonToast.processing"),{duration:4e3,position:"top-center"}),Ke){const u=new ClipboardItem({"image/png":l(c).then(h=>h)});navigator.clipboard.write([u]),L.success(e("copyImage.successMessage"),{duration:4e3,position:"top-center"})}else le(c).then(function(u){navigator.clipboard.write([new ClipboardItem({"image/png":u})]).then(()=>{L.success(e("copyImage.successMessage"),{duration:4e3,position:"top-center"})}).catch(h=>{L.error(e("copyImage.failedMessage")),console.error("Failed to copy image to clipboard:",h)})}).catch(function(u){L.error(e("copyImage.failedMessage")),console.error("oops, something went wrong!",u)})}};return t.jsxs(fe,{className:"w-full",variant:"flat",children:[t.jsxs(G,{className:"h-[40px] w-full",onClick:d,children:[t.jsx(Dn,{size:18}),s[a]]}),t.jsxs(Ne,{placement:"bottom-end",children:[t.jsx(Ee,{children:t.jsx(G,{isIconOnly:!0,className:"h-[40px]",children:t.jsx(Me,{})})}),t.jsxs(Ce,{disallowEmptySelection:!0,"aria-label":"Merge options",className:"max-w-[300px]",selectedKeys:n,selectionMode:"single",onSelectionChange:r,children:[t.jsx(K,{description:o.email,children:s.email},"email"),t.jsx(K,{description:o.image,children:s.image},"image")]})]})]})}function wt({markdown:e}){const{t:n}=Y(),[r,o]=_e.useState(new Set(["image"])),s={image:n("downloadImage.buttonDescription"),pdf:n("downloadPDF.buttonDescription"),html:n("downloadHTML.buttonDescription"),markdown:n("downloadMarkdown.buttonDescription")},a={image:n("downloadImage.buttonName"),pdf:n("downloadPDF.buttonName"),html:n("downloadHTML.buttonName"),markdown:n("downloadMarkdown.buttonName")},l=Array.from(r)[0],d=()=>N(this,null,function*(){const c=document.getElementById("markdown-body");if(c){if(r.has("pdf"))L.success(n("commonToast.developing"),{duration:4e3,position:"top-center"});else if(r.has("image")){L.success(n("commonToast.processing"),{duration:4e3,position:"top-center"});try{Ke&&(yield be(c),yield be(c));const u=yield be(c),h=document.createElement("a");h.download="markdown-post.png",h.href=u,h.click(),L.success(n("downloadImage.successMessage"),{description:n("downloadImage.successDescription"),duration:4e3,position:"top-center"})}catch(u){console.error("oops, something went wrong!",u),L.error(n("downloadImage.failedMessage"))}}else if(r.has("html"))try{const u=c.outerHTML,h=new Blob([u],{type:"text/html"}),f=URL.createObjectURL(h),b=document.createElement("a");b.download="markdown-post.html",b.href=f,b.click(),URL.revokeObjectURL(f),L.success(n("downloadHTML.successMessage"),{description:n("downloadHTML.successDescription"),duration:4e3,position:"top-center"})}catch(u){console.error("Failed to download HTML:",u),L.error(n("downloadHTML.failedMessage"))}else if(r.has("markdown"))try{const u=new Blob([e],{type:"text/markdown"}),h=URL.createObjectURL(u),f=document.createElement("a");f.download="markdown-post.md",f.href=h,f.click(),URL.revokeObjectURL(h),L.success(n("downloadMarkdown.successMessage"),{description:n("downloadMarkdown.successDescription"),duration:4e3,position:"top-center"})}catch(u){console.error("Failed to download Markdown:",u),L.error(n("downloadMarkdown.failedMessage"))}}});return t.jsxs(fe,{className:"w-full",variant:"flat",children:[t.jsxs(G,{className:"h-[40px] w-full",onClick:d,children:[t.jsx(_n,{size:18}),a[l]]}),t.jsxs(Ne,{placement:"bottom-end",children:[t.jsx(Ee,{children:t.jsx(G,{isIconOnly:!0,className:"h-[40px]",children:t.jsx(Me,{})})}),t.jsxs(Ce,{disallowEmptySelection:!0,"aria-label":"Merge options",className:"max-w-[300px]",selectedKeys:r,selectionMode:"single",onSelectionChange:o,children:[t.jsx(K,{description:s.image,children:a.image},"image"),t.jsx(K,{description:s.html,children:a.html},"html"),t.jsx(K,{description:s.markdown,children:a.markdown},"markdown"),t.jsx(K,{description:s.pdf,children:a.pdf},"pdf")]})]})]})}const Zt=({markdown:e})=>{const{t:n,i18n:r}=Y(),{selectedStyle:o,setSelectedStyle:s,setArticleStyle:a,selectedTemplate:l,setSelectedTemplate:d,setTemplate:c}=Ze.useContainer();return i.useEffect(()=>{a(Ye(o))},[o]),i.useEffect(()=>{c(Xe(l))},[l]),t.jsxs(kn,{maxWidth:"full",position:"sticky",className:"px-4 shadow-sm",children:[t.jsxs(Te,{className:"basis-auto",justify:"start",children:[t.jsx(Nn,{className:"gap-2 max-w-fit mr-4",children:t.jsxs(Pe,{className:"flex justify-start items-center gap-1",color:"foreground",href:"/",children:[t.jsx(et,{}),t.jsx("p",{className:"font-bold text-inherit",children:"MDFriday Notes"})]})}),t.jsx("div",{className:"flex gap-2 justify-start items-center",children:ye.navItems&&ye.navItems.length>0&&ye.navItems.map(u=>t.jsx(re,{children:t.jsx(Pe,{className:Bn(En({color:"foreground"}),"data-[active=true]:text-primary data-[active=true]:font-medium"),color:"foreground",href:u.href,children:u.label})},u.href))})]}),t.jsxs(Te,{justify:"end",className:"gap-2",children:[t.jsx(re,{children:t.jsxs(fe,{className:"w-full",variant:"flat",children:[t.jsxs(G,{className:"h-[40px] w-full",onClick:()=>{},children:[t.jsx(On,{size:18}),n(`postStyle.${o}`)]}),t.jsxs(Ne,{placement:"bottom-end",children:[t.jsx(Ee,{children:t.jsx(G,{isIconOnly:!0,className:"h-[40px]",children:t.jsx(Me,{})})}),t.jsx(Ce,{disallowEmptySelection:!0,"aria-label":n("toolbar.selectStyleText"),className:"max-w-[300px]",selectedKeys:[o],selectionMode:"single",onSelectionChange:u=>{const h=Array.from(u)[0];s(h)},children:Re.map(u=>t.jsx(K,{children:n(`postStyle.${u.name}`)},u.name))})]})]})}),t.jsx(re,{children:t.jsx(pt,{})}),t.jsx(re,{children:t.jsx(bt,{})}),t.jsx(re,{children:t.jsx(wt,{markdown:e})})]})]})};function jt(){const[e,n]=i.useState({width:null,height:null});return i.useLayoutEffect(()=>{const r=()=>{n({width:window.innerWidth,height:window.innerHeight})};return r(),window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}},[]),e}const oe={sm:640,md:768,lg:1024,xl:1280,"2xl":1536},yt=()=>{const[e,n]=i.useState(new Set),{width:r}=jt();return i.useLayoutEffect(()=>{if(r===null)return;const o=new Set;r<oe["2xl"]&&o.add("2xl"),r<oe.xl&&o.add("xl"),r<oe.lg&&o.add("lg"),r<oe.md&&o.add("md"),r<oe.sm&&o.add("sm"),n(o)},[r]),e};function Kt({leftPane:e,rightPane:n,initialLeftWidth:r=50,minLeftWidth:o=20,maxLeftWidth:s=80,rightPaneWidth:a=0}){const l=i.useRef(null),[d,c]=i.useState(r),[u,h]=i.useState(!1),f=i.useRef(a),b=i.useRef({isDragging:!1,startX:0,startLeftWidth:0}),p=i.useRef(null),w=yt();i.useEffect(()=>{if(a!==f.current)if(f.current=a,l.current&&a>0){const S=l.current.getBoundingClientRect().width;if(S>0){const R=(S-a-6)/S*100,C=Math.min(Math.max(R,o),s);c(C)}}else a===0&&c(r)},[a,o,s,r]);const m=i.useCallback(S=>{S.preventDefault(),b.current={isDragging:!0,startX:S.clientX,startLeftWidth:d},h(!0)},[d]),g=i.useCallback(()=>{b.current.isDragging=!1,h(!1),p.current&&(cancelAnimationFrame(p.current),p.current=null)},[]),v=i.useCallback(()=>{if(!b.current.isDragging||!l.current)return;const S=l.current.getBoundingClientRect(),R=S.width,F=((b.current.currentX||0)-S.left)/R*100,Q=Math.min(Math.max(F,o),s);c(Q),b.current.isDragging&&(p.current=requestAnimationFrame(v))},[o,s]),k=i.useCallback(S=>{b.current.isDragging&&(b.current.currentX=S.clientX,p.current||(p.current=requestAnimationFrame(v)))},[v]),$=i.useCallback(()=>{c(r)},[r]);return i.useEffect(()=>(document.addEventListener("mousemove",k),document.addEventListener("mouseup",g),()=>{document.removeEventListener("mousemove",k),document.removeEventListener("mouseup",g),p.current&&cancelAnimationFrame(p.current)}),[k,g]),t.jsx("div",{className:"h-full w-full",children:w.has("md")?t.jsxs("div",{className:"flex flex-col border border-solid border-gray-200 shadow-sm overflow-hidden h-full bg-white",children:[t.jsx("div",{className:"flex-1 overflow-auto",children:n}),t.jsx("div",{className:"h-1 bg-gray-200"}),t.jsx("div",{className:"flex-1 overflow-auto",children:e})]}):t.jsxs("div",{ref:l,className:"flex h-full w-full overflow-hidden border border-solid border-gray-200 shadow-sm bg-white",children:[t.jsx("div",{className:"h-full overflow-auto",style:{width:`${d}%`},children:e}),t.jsx("div",{className:"cursor-col-resize bg-gray-200 hover:bg-gray-300 transition-colors",style:{width:"6px"},onDoubleClick:$,onMouseDown:m}),t.jsx("div",{className:"h-full overflow-auto flex-1",children:n})]})})}const en={};function vt(e){const n=Nt();return en[n]=e,n}function St(e){return en[e]}function er(e){if(!e.includes("browser://"))return e;const n=/<img[^>]*src="browser:\/\/([^"]+)"[^>]*>/g;return e.replace(n,(r,o)=>{const s=St(o);return s?r.replace(`browser://${o}`,s):r})}function kt(e){return`![Image](browser://${e})`}function Nt(){return"img_"+Math.random().toString(36).substr(2,9)}const Et=me.baseTheme({"&":{fontSize:"16px",height:"100%"},"&.cm-focused":{outline:"none"},".cm-gutters":{fontWeight:"bold",border:"none",backgroundColor:"white"},".cm-scroller":{fontFamily:"var(--font-mono)",height:"100%"},".cm-content":{padding:"10px"}}),nr=({value:e,onChange:n})=>{const{t:r}=Y(),o=i.useRef(null),s=i.useRef(),a=i.useCallback(l=>N(void 0,null,function*(){var c;const d=(c=l.clipboardData)==null?void 0:c.items;if(d){for(let u=0;u<d.length;u++)if(d[u].type.indexOf("image")!==-1){l.preventDefault();const h=d[u].getAsFile();if(h)try{const f=new FileReader;f.onload=b=>N(void 0,null,function*(){var g;const p=(g=b.target)==null?void 0:g.result,w=vt(p),m=kt(w);if(s.current){const v=s.current.state.selection.main.head;s.current.dispatch({changes:{from:v,insert:m}})}}),f.readAsDataURL(h)}catch(f){console.error(f),L.error(r("commonToast.error"))}break}}}),[]);return i.useEffect(()=>{if(!o.current)return;const l=Hn.create({doc:e,extensions:[Un,Wn(),me.lineWrapping,me.updateListener.of(c=>{if(c.docChanged){const u=c.state.doc.toString();n(u)}}),Et]}),d=new me({state:l,parent:o.current});return s.current=d,()=>{d.destroy()}},[]),i.useEffect(()=>{if(!s.current)return;const l=s.current.state.doc.toString();e!==l&&s.current.dispatch({changes:{from:0,to:s.current.state.doc.length,insert:e}})},[e]),t.jsx("div",{ref:o,onPaste:a,className:"h-full"})};function Ct(e){if(e.startsWith("http://")||e.startsWith("https://"))return e;const n=e.startsWith("/")?e:`/${e}`;return`${D}${n}`}function nn(e,n,r,o){if(e<=r&&n<=o)return{width:e,height:n};const s=e/n;let a=r,l=r/s;return l>o&&(l=o,a=o*s),{width:Math.round(a),height:Math.round(l)}}function Mt(e,n,r={}){const{maxWidth:o=200,maxHeight:s=300,maintainAspectRatio:a=!0}=r;let l=r.width,d=r.height;if(a&&l&&d){const c=nn(e,n,o,s);l=c.width,d=c.height}return l=l||o,d=d||s,`${D}/image/id/${r.id}/${l}/${d}`}function tn(e,n,r){return Mt(n,r,{id:e,width:n,height:r,maintainAspectRatio:!0})}let rn=class ke{constructor(n){O(this,"id");O(this,"uuid");O(this,"url");O(this,"title");O(this,"description");O(this,"width");O(this,"height");O(this,"tags");O(this,"asset");this.id=n.id,this.uuid=n.uuid,this.url=n.url,this.title=n.title,this.description=n.description,this.width=n.width,this.height=n.height,this.tags=n.tags,this.asset=n.asset}getAspectRatio(){return this.width/this.height}getDisplayDimensions(n,r){return nn(this.width,this.height,n,r)}toImageItem(){return{id:this.id,uuid:this.uuid,url:this.url,title:this.title,description:this.description,width:this.width,height:this.height,tags:this.tags,asset:this.asset}}static fromImageItem(n){return new ke(n)}static fromImageItems(n){return n.map(r=>new ke(r))}};const on=({isVisible:e,position:n,children:r,onPositionChange:o,zIndex:s=50})=>{const a=i.useRef(null);return i.useEffect(()=>{if(a.current&&o&&e){const l=a.current.getBoundingClientRect();o(l)}},[e,o]),e?vn.createPortal(t.jsx("div",{ref:a,className:"fixed origin-top-left",style:{top:n.top,left:n.left,width:280,opacity:1,backgroundColor:"rgba(31, 41, 55, 0.9)",borderRadius:"0.5rem",backdropFilter:"blur(4px)",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",padding:"1rem",animation:"fadeIn 0.2s ease-out forwards",zIndex:s},children:r}),document.body):null},Rt=()=>{if(typeof document!="undefined"&&!document.getElementById("ui-popover-styles")){const e=document.createElement("style");e.id="ui-popover-styles",e.innerHTML=`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    `,document.head.appendChild(e)}};typeof document!="undefined"&&Rt();const sn=({triggerRect:e,popoverWidth:n=280,popoverHeight:r=300,gap:o=16,minMargin:s=20})=>{const a=window.innerWidth,l=window.innerHeight;let d=e.top,c=e.right+o;return c+n>a-s&&(e.left>n+s?c=e.left-n-o:(c=e.left,d=e.bottom+o,d+r>l-s&&(d=e.top-r-o))),d<s&&(d=s),c<s&&(c=s),{top:d,left:c}},It=({image:e,onClick:n,prefetched:r=!1})=>{const{id:o,title:s,description:a,tags:l,width:d,height:c}=e;new rn(e);const u=tn(o,d,c),[h,f]=i.useState(r),[b,p]=i.useState(!1),[w,m]=i.useState(!1),[g,v]=i.useState({top:0,left:0}),[k,$]=i.useState({width:0,height:0}),S=i.useRef(null),R=i.useRef(null);i.useEffect(()=>{const j=u.match(/\/(\d+)\/(\d+)$/);if(j){const I=parseInt(j[1],10),y=parseInt(j[2],10);$({width:I,height:y})}},[u]);const C=()=>{n(e)},_=()=>{f(!0)},F=()=>{b&&S.current&&(z(),m(!0))},Q=()=>{m(!1)},z=()=>{if(!S.current)return;const j=S.current.getBoundingClientRect(),I=sn({triggerRect:j});v(I)};i.useEffect(()=>{if(w){const j=()=>{z()};return window.addEventListener("resize",j),window.addEventListener("scroll",j),()=>{window.removeEventListener("resize",j),window.removeEventListener("scroll",j)}}},[w]),i.useEffect(()=>{if(r){f(!0);return}if(b&&!h&&R.current){R.current.loading="eager";const j=new window.Image;return j.crossOrigin="anonymous",j.onload=_,j.onerror=()=>{console.error(`Failed to load image: ${u}`)},j.src=u,()=>{j.onload=null,j.onerror=null}}},[u,b,h,r]),i.useEffect(()=>{if(r){p(!0);return}const j=S.current;if(!j)return;const I=new IntersectionObserver(y=>{y[0].isIntersecting&&(p(!0),I.unobserve(j))},{rootMargin:"200px",threshold:.01});return I.observe(j),()=>{I.unobserve(j),I.disconnect()}},[r]);const B=16;return t.jsxs("div",{ref:S,className:"relative group overflow-hidden rounded-lg shadow-md bg-white mb-4 transition-transform hover:shadow-xl hover:-translate-y-1 cursor-pointer",onClick:C,onMouseEnter:F,onMouseLeave:Q,style:{width:k.width>0?k.width+B*2:"auto"},children:[t.jsxs("div",{className:"relative overflow-hidden",style:{height:k.height>0?k.height+B:0,padding:B/2},children:[!h&&t.jsx("div",{className:"absolute inset-0 bg-gray-100 animate-pulse"}),(b||r)&&t.jsx("img",{ref:R,src:u,alt:s,className:`transition-opacity duration-300 ${h?"opacity-100":"opacity-0"}`,loading:r?"eager":"lazy",decoding:"async",onLoad:_,width:k.width,height:k.height,style:{display:"block",margin:"0 auto"}})]}),b&&t.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300",children:t.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300",children:[t.jsx("h3",{className:"text-white font-semibold text-base line-clamp-1",children:s}),l.length>0&&t.jsxs("div",{className:"mt-1 text-xs text-gray-200",children:[l.length," 个标签"]})]})}),t.jsxs(on,{isVisible:b&&w,position:g,zIndex:50,children:[t.jsx("h3",{className:"font-semibold text-lg text-white",children:s}),a&&t.jsx("div",{className:"mt-2 max-h-48 overflow-y-auto custom-scrollbar",children:t.jsx("p",{className:"text-gray-200 text-sm whitespace-pre-line",children:a})}),l.length>0&&t.jsx("div",{className:"flex flex-wrap gap-2 mt-3",children:l.map(j=>t.jsx("span",{className:"text-xs px-2 py-1 bg-white/20 text-white rounded-full",children:j},j))}),t.jsx("div",{className:"mt-3 text-xs text-gray-300",children:k.width>0?`${k.width} × ${k.height}`:`${d} × ${c}`})]})]})};var At=i.memo(It);const $t=({image:e,isOpen:n,onClose:r})=>{const[o,s]=i.useState(!1),[a,l]=i.useState({width:0,height:0}),[d,c]=i.useState("idle");i.useEffect(()=>{s(!1),c("idle")},[e]);const u=i.useCallback(()=>{const v=Math.round(window.innerWidth*.9),k=Math.round(window.innerHeight*(1-2*.05));l({width:v,height:k}),console.log("Modal dimensions:",v,k)},[]);if(i.useEffect(()=>{if(n)return u(),window.addEventListener("resize",u),()=>{window.removeEventListener("resize",u)}},[n,u]),i.useEffect(()=>{const g=v=>{n&&v.key==="Escape"&&r()};return window.addEventListener("keydown",g),()=>{window.removeEventListener("keydown",g)}},[n,r]),i.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[n]),i.useEffect(()=>{let g;return d==="copied"&&(g=window.setTimeout(()=>{c("idle")},2e3)),()=>{g&&clearTimeout(g)}},[d]),!e||!n)return null;const h=new rn(e),f=e.asset?Ct(e.asset):e.url,b=()=>`${D}/image/id/${e.id}/${e.width}/${e.height}`,p=()=>N(void 0,null,function*(){const g=b();try{yield navigator.clipboard.writeText(g),c("copied")}catch(v){console.error("Failed to copy",v)}}),w=()=>{s(!0)},m=h.getDisplayDimensions(a.width*.95,a.height*.75);return t.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[t.jsx("div",{className:"absolute inset-0 bg-black/80 backdrop-blur-sm",onClick:r}),t.jsxs("div",{className:"relative z-10 flex flex-col bg-white rounded-xl overflow-hidden shadow-2xl",style:{width:`${a.width}px`,height:`${a.height}px`},children:[t.jsx("button",{onClick:r,className:"absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-gray-700 hover:text-gray-900 transition-colors shadow-md","aria-label":"Close",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),!o&&t.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-gray-100",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"})}),t.jsx("div",{className:"relative flex-grow overflow-hidden flex items-center justify-center p-4",children:t.jsx("img",{src:f,alt:e.title,className:`transition-opacity duration-200 ${o?"opacity-100":"opacity-0"}`,loading:"eager",decoding:"async",onLoad:w,style:{width:`${m.width}px`,height:`${m.height}px`,objectFit:"contain"}})}),t.jsx("div",{className:"p-6 bg-white border-t border-gray-200",children:t.jsxs("div",{className:"flex flex-col",children:[t.jsx("h2",{className:"text-xl font-bold text-gray-900",children:e.title}),e.description&&t.jsx("p",{className:"mt-2 text-gray-600",children:e.description}),e.tags&&e.tags.length>0&&t.jsx("div",{className:"mt-4 flex flex-wrap gap-2",children:e.tags.map(g=>t.jsx("span",{className:"px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full",children:g},g))}),t.jsxs("div",{className:"mt-3 flex justify-between items-center",children:[t.jsxs("div",{className:"text-sm text-gray-500",children:["Dimensions: ",e.width," × ",e.height]}),t.jsx(G,{color:d==="copied"?"success":"primary",variant:"flat",size:"sm",onClick:p,className:"transition-colors",children:d==="copied"?t.jsxs("div",{className:"flex items-center",children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"已复制"]}):t.jsxs("div",{className:"flex items-center",children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"})}),"复制链接"]})})]})]})})]})]})};var Tt=i.memo($t);const Pt={mobile:1,tablet:2,desktop:3},an=i.memo(({children:e,columnCount:n=Pt,gap:r="1rem",autoLayout:o=!0,minItemWidth:s=200})=>{const[a,l]=i.useState(n.desktop),d=i.useRef(null),c=i.useRef(null),u=i.useRef(null),[h,f]=i.useState(!1);i.useEffect(()=>{if(!o)if(typeof ResizeObserver!="undefined"){const w=m=>{m.length&&(u.current&&window.clearTimeout(u.current),u.current=window.setTimeout(()=>{const g=m[0].contentRect.width;f(!0),g<640?l(n.mobile):g<1024?l(n.tablet):l(n.desktop),u.current=window.setTimeout(()=>{f(!1)},50)},100))};return c.current=new ResizeObserver(w),d.current&&c.current.observe(d.current),()=>{c.current&&c.current.disconnect(),u.current&&clearTimeout(u.current)}}else{const w=()=>{const v=window.innerWidth;v<640?l(n.mobile):v<1024?l(n.tablet):l(n.desktop)};w();let m;const g=()=>{clearTimeout(m),f(!0),m=window.setTimeout(()=>{w(),f(!1)},100)};return window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g),clearTimeout(m)}}},[n,o]);const b=i.useMemo(()=>{if(o)return[e];if(!e||e.length===0)return Array(a).fill([]);const w=Array(a).fill(null).map(()=>[]);return e.forEach((m,g)=>{const v=g%a;w[v].push(m)}),w},[e,a,o]),p=h?"masonry-grid-layouting":"";return o?t.jsx("div",{ref:d,className:`w-full ${p}`,style:{display:"grid",gridTemplateColumns:`repeat(auto-fill, minmax(${s}px, max-content))`,gap:r,justifyContent:"center",contain:"paint layout style"},children:e}):t.jsx("div",{ref:d,className:`w-full ${p}`,style:{display:"grid",gridTemplateColumns:`repeat(${a}, 1fr)`,gap:r,containIntrinsicSize:"auto",contain:"paint layout style",willChange:"contents",contentVisibility:"auto"},children:b.map((w,m)=>t.jsx("div",{className:"flex flex-col",style:{gap:r,transform:"translateZ(0)",willChange:"contents",contain:"layout paint"},children:w.map((g,v)=>{const k=`item-${m}-${v}`;return t.jsx("div",{style:{willChange:h?"transform":"auto",contain:"content",transform:"translateZ(0)",margin:0,padding:0},children:g},k)})},`column-${m}`))})});an.displayName="MasonryGrid";function Ft(e){return{id:String(e.id),uuid:e.uuid,url:e.asset,title:e.name,description:e.desc,width:e.width,height:e.height,tags:e.tags,asset:e.asset}}function Lt(e){return e.flat().filter(Boolean)}function zt(e,n){const r=[];if(e.trim()){const s=e.trim(),a=[`name:${s}`,`description:${s}`,`tags:${s}`];r.push(a.join(" OR ")),console.log("Added search term conditions:",a.join(" OR "))}if(n.length>0){const s=n.map(a=>`tags:${a}`).join(" OR ");r.push(s),console.log("Added tag filter conditions:",s)}let o="";return r.length>1?o=r.map(s=>`(${s})`).join(" AND "):o=r[0]||"",console.log("Final constructed query:",o),o}const ln={fetchImages(){return N(this,arguments,function*(e=1,n=ie.count,r="",o=[]){const s=e-1;try{const a=r.trim()!==""||o.length>0,l={type:ie.type,count:n,offset:s,order:ie.order};console.log("Fetching images with:",{endpoint:a?"search":"list",page:e,limit:n,searchTerm:r.trim(),selectedTags:o,params:l});let d;if(a){const h=zt(r,o);if(h){const f=P(T({},l),{q:h});console.log("Search query:",h),console.log("Search params:",f);const b=U.IMAGE_SEARCH;console.log("Search API URL format:",`${b}?${new URLSearchParams(f).toString()}`),console.log("After encoding fixes, the URL should use %20 instead of + for spaces"),d=yield H.get(U.IMAGE_SEARCH,{params:f})}else console.log("Empty search query, using regular endpoint"),d=yield H.get(U.IMAGES,{params:l})}else d=yield H.get(U.IMAGES,{params:l});if(!d)return console.error("Empty API response"),{images:[],hasMore:!1};if(!d.data)return console.error("API response missing data field:",d),{images:[],hasMore:!1};if(!Array.isArray(d.data))return console.error("API response data is not an array:",d.data),{images:[],hasMore:!1};const c=d.data.map(h=>{try{return Ft(h)}catch(f){return console.error("Error mapping API image:",h,f),null}}).filter(Boolean),u=c.length===n;return console.log(`Fetched ${c.length} images, hasMore: ${u}`),{images:c,hasMore:u}}catch(a){return console.error("Error fetching images:",a),{images:[],hasMore:!1}}})},fetchAllTags(){return N(this,null,function*(){try{console.log("Fetching all image tags");const e={type:ie.type},n=yield H.get(U.IMAGE_TAGS,{params:e});return!n||!n.data?(console.error("Invalid API response for tags:",n),[]):Array.isArray(n.data)?Lt(n.data):(console.error("Tags data is not an array:",n.data),[])}catch(e){return console.error("Error fetching tags:",e),[]}})}},Dt=()=>N(void 0,null,function*(){return yield ln.fetchAllTags()}),De=(...s)=>N(void 0,[...s],function*(e=1,n=15,r="",o=[]){return yield ln.fetchImages(e,n,r,o)}),cn=({onSearch:e,initialValue:n="",placeholder:r="Search...",className:o="",showKeyboardShortcut:s=!1,autoFocus:a=!1})=>{const[l,d]=i.useState(n),[c,u]=i.useState(!1),h=i.useRef(null),f=i.useRef(null);i.useEffect(()=>{d(n)},[n]),i.useEffect(()=>{a&&f.current&&f.current.focus()},[a]);const b=m=>{const g=m.target.value;d(g),h.current&&clearTimeout(h.current),h.current=setTimeout(()=>{e&&e(g)},500)};i.useEffect(()=>()=>{h.current&&clearTimeout(h.current)},[]);const p=m=>{m.preventDefault(),h.current&&clearTimeout(h.current),e&&e(l)},w=()=>{d(""),e&&e(""),f.current&&f.current.focus()};return t.jsxs("form",{onSubmit:p,className:`relative transition-all duration-200 ${c?"ring-2 ring-offset-2 ring-primary/60":""} ${o}`,children:[t.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:t.jsx("svg",{className:"w-5 h-5 text-gray-500","aria-hidden":"true",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})}),t.jsx("input",{ref:f,type:"search",className:"block w-full p-3 pl-10 pr-12 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none",placeholder:r,value:l,onChange:b,onFocus:()=>u(!0),onBlur:()=>u(!1)}),l&&t.jsx("button",{type:"button",className:"absolute inset-y-0 right-12 flex items-center px-2 text-gray-500 hover:text-gray-700",onClick:w,"aria-label":"Clear search",children:t.jsx("svg",{className:"w-5 h-5",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})}),s&&t.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none",children:t.jsx("span",{className:"border border-gray-300 rounded px-1.5 py-0.5 text-xs font-mono",children:"⌘K"})}),!s&&t.jsxs("button",{type:"submit",className:"absolute inset-y-0 right-0 flex items-center px-3 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors",children:[t.jsx("span",{className:"sr-only",children:"Search"}),t.jsx("svg",{className:"w-5 h-5 text-gray-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 5l7 7-7 7"})})]})]})},ve=new Map,_t=(e,n=300)=>{if(!e)return!1;const r=e.getBoundingClientRect();return r.top<=window.innerHeight+n&&r.bottom>=-n},dn=()=>{const[e,n]=i.useState([]),[r,o]=i.useState(!0),[s,a]=i.useState(!0),[l,d]=i.useState(null),[c,u]=i.useState(null),[h,f]=i.useState(!1),[b,p]=i.useState(1),[w,m]=i.useState(!0),[g,v]=i.useState(""),[k,$]=i.useState([]),[S,R]=i.useState([]),[C,_]=i.useState(0),[F,Q]=i.useState(20),z=i.useRef(null),B=i.useRef(null),j=i.useRef(null),I=i.useRef(new Map),y=i.useRef(null),A=i.useRef(0),V=i.useCallback(x=>{const E=tn(x.id,x.width,x.height);if(ve.has(E))return ve.get(E);const M=new Image;return M.crossOrigin="anonymous",M.src=E,ve.set(E,M),M},[]),W=i.useCallback((x,E=!1)=>{const M=J=>{J.forEach(te=>V(te))};E?(M(x.slice(0,8)),x.length>8&&("requestIdleCallback"in window?window.requestIdleCallback(()=>{M(x.slice(8))}):setTimeout(()=>M(x.slice(8)),200))):"requestIdleCallback"in window?window.requestIdleCallback(()=>{M(x)}):setTimeout(()=>M(x),500)},[V]);i.useEffect(()=>{N(void 0,null,function*(){try{a(!0),o(!0),p(1);const E=yield Dt();$(E);const{images:M,hasMore:J}=yield De(1,10,g,S);n(M),m(J),d(null),W(M,!0)}catch(E){d("Failed to load images. Please try again later."),console.error("Error loading images:",E)}finally{a(!1),o(!1)}})},[g,S,W]);const ne=i.useCallback(()=>N(void 0,null,function*(){if(!r&&w)try{o(!0),A.current=window.scrollY;const x=b+1,{images:E,hasMore:M}=yield De(x,10,g,S);n(J=>{const te=[...J,...E];return W(E,!1),te}),p(x),m(M)}catch(x){console.error("Error loading more images:",x)}finally{o(!1)}}),[r,w,b,g,S,W]),se=i.useCallback(()=>{y.current&&window.clearTimeout(y.current),y.current=window.setTimeout(()=>{if(!j.current)return;const x={start:Math.max(0,C-4),end:Math.min(e.length-1,F+4)};I.current.forEach((E,M)=>{const J=e.findIndex(te=>te.id===M);J!==-1&&_t(E)&&(x.start=Math.min(x.start,J),x.end=Math.max(x.end,J))}),x.start=Math.max(0,x.start-8),x.end=Math.min(e.length-1,x.end+8),(x.start!==C||x.end!==F)&&(_(x.start),Q(x.end)),y.current=null},100)},[e.length,C,F]),ge=i.useCallback((x,E)=>{E?I.current.set(x,E):I.current.delete(x)},[]);i.useEffect(()=>{const x=()=>{se()};return window.addEventListener("scroll",x,{passive:!0}),()=>{window.removeEventListener("scroll",x),y.current&&window.clearTimeout(y.current)}},[se]),i.useEffect(()=>{const x=B.current;if(x)return z.current&&z.current.disconnect(),z.current=new IntersectionObserver(E=>{E[0].isIntersecting&&w&&!r&&ne()},{threshold:.1,rootMargin:"300px"}),z.current.observe(x),()=>{z.current&&x&&z.current.unobserve(x)}},[w,r,ne]),i.useMemo(()=>e.length===0?[]:e.slice(C,F+1),[e,C,F]);const pn=i.useCallback(x=>{v(x)},[]),xn=i.useCallback(x=>{R(E=>E.includes(x)?E.filter(M=>M!==x):[...E,x])},[]),bn=i.useCallback(()=>{v(""),R([])},[]);return s?t.jsx("div",{className:"flex justify-center items-center min-h-[60vh]",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"})}):l&&e.length===0?t.jsx("div",{className:"flex justify-center items-center min-h-[60vh]",children:t.jsxs("div",{className:"text-center p-4 bg-red-50 rounded-lg max-w-md",children:[t.jsx("h3",{className:"text-red-800 text-lg font-semibold mb-2",children:"Error"}),t.jsx("p",{className:"text-red-600",children:l})]})}):t.jsxs("div",{ref:j,className:"w-full h-full flex flex-col",children:[t.jsxs("div",{className:"flex flex-col items-center justify-center mb-8",children:[t.jsx("h1",{className:"text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6",children:"Image Gallery"}),t.jsx("div",{className:"w-full max-w-xl mx-auto mb-6",children:t.jsx(cn,{onSearch:pn,initialValue:g,placeholder:"Search images...",autoFocus:!1})}),k.length>0&&t.jsx("div",{className:"w-full max-w-2xl mx-auto",children:t.jsxs("div",{className:"flex flex-wrap justify-center gap-2 mt-2",children:[S.length>0&&t.jsx("button",{onClick:bn,className:"px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-full text-sm font-medium transition-colors",children:"Clear Filters"}),k.map(x=>t.jsx("button",{onClick:()=>xn(x),className:`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${S.includes(x)?"bg-blue-500 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}
                  `,children:x},x))]})})]}),t.jsxs("div",{className:"w-full flex-grow",children:[r&&e.length===0?t.jsx("div",{className:"w-full h-64 flex items-center justify-center",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-gray-200"})}):l?t.jsxs("div",{className:"w-full p-8 text-center",children:[t.jsx("p",{className:"text-red-500",children:l}),t.jsx("button",{className:"mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",onClick:()=>window.location.reload(),children:"Retry"})]}):e.length===0?t.jsx("div",{className:"w-full p-8 text-center",children:t.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"No images found. Try adjusting your search criteria."})}):t.jsx(an,{children:e.map((x,E)=>E>=C&&E<=F&&t.jsx("div",{ref:M=>M&&ge(x.id,M),children:t.jsx(At,{image:x,onClick:M=>{u(M),f(!0)},prefetched:E<12})},x.id))}),!s&&w&&t.jsx("div",{ref:B,className:"w-full flex justify-center py-8",children:r&&t.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 dark:border-gray-300"})})]}),t.jsx(Tt,{image:c,isOpen:h,onClose:()=>f(!1)})]})};var tr=Object.freeze({__proto__:null,default:dn});const un="md_friday_projects",Ie="md_friday_current_project_id",ee=()=>{const e=localStorage.getItem(un);return e?JSON.parse(e):[]},hn=()=>localStorage.getItem(Ie),mn=e=>{localStorage.setItem(Ie,e)},Bt=()=>{const e=hn();return e?ee().find(r=>r.id===e)||null:(console.log("MD_FRIDAY_DEBUG: getCurrentProject - 没有当前项目ID"),null)},fn=e=>ee().find(r=>r.id===e)||null,Ot=e=>{try{const n=JSON.stringify(e);localStorage.setItem(un,n)}catch(n){console.error("MD_FRIDAY_DEBUG: saveProjects - 保存失败，错误:",n)}},Ht=e=>{const n=ee(),r=n.findIndex(o=>o.id===e.id);if(r!==-1){const o=new Date().toISOString();n[r]=P(T({},e),{updatedAt:o}),Ot(n)}else console.warn("MD_FRIDAY_DEBUG: updateProject - 未找到项目，无法更新",e.id)},rr=(e,n)=>{const r=fn(e);if(!r)return null;const o=s=>{for(const a of s){if(a.id===n)return a;if(a.isDirectory&&a.children){const l=o(a.children);if(l)return l}}return null};return o(r.files)},or=(e,n,r)=>{const o=fn(e);if(!o){console.warn("MD_FRIDAY_DEBUG: updateFileContent - 未找到项目，无法更新",e);return}const s=a=>{for(let l=0;l<a.length;l++){if(a[l].id===n)return a[l].content=r,!0;if(a[l].isDirectory&&a[l].children){const d=a[l].children||[];if(s(d))return!0}}return!1};try{const a=JSON.parse(JSON.stringify(o.files));if(s(a)){const d=P(T({},o),{files:a,updatedAt:new Date().toISOString()});Ht(d)}else console.warn("MD_FRIDAY_DEBUG: updateFileContent - 未找到文件，无法更新",n)}catch(a){console.error("MD_FRIDAY_DEBUG: updateFileContent - 更新过程中发生错误",a)}},sr=(e="zh")=>{const n=ee();if(n.length===0)return localStorage.removeItem(Ie),null;const r=hn();return!r||!n.some(o=>o.id===r)?(mn(n[0].id),n[0]):Bt()},gn=({isOpen:e,onClose:n,title:r,searchTerm:o="",onSearch:s,tags:a=[],selectedTags:l=[],onTagSelect:d,onClearFilters:c,children:u,isLoading:h=!1,loadingMessage:f="加载中...",onScroll:b})=>{const p={wrapper:"p-0",base:"max-w-[90%] w-[90%] h-[90%] max-h-[90%] m-auto",body:"p-0 h-full",backdrop:"bg-black/80"};return t.jsx(Cn,{isOpen:e,onClose:n,size:"full",classNames:p,scrollBehavior:"inside",children:t.jsxs(Mn,{children:[t.jsx(Rn,{className:"border-b pb-3",children:t.jsx("h3",{className:"text-lg font-semibold",children:r})}),t.jsx(In,{children:t.jsxs("div",{className:"px-4 py-3 flex flex-col h-full modal-content-container",children:[s&&t.jsx("div",{className:"w-full max-w-xl mx-auto mb-6",children:t.jsx(cn,{onSearch:s,initialValue:o,placeholder:"搜索...",autoFocus:!1})}),a.length>0&&d&&t.jsx("div",{className:"w-full max-w-2xl mx-auto mb-4",children:t.jsxs("div",{className:"flex flex-wrap justify-center gap-2 mt-2",children:[l&&l.length>0&&c&&t.jsx("button",{onClick:c,className:"px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-full text-sm font-medium transition-colors",children:"清除筛选"}),a.map(w=>t.jsx("button",{onClick:()=>d(w),className:`
                        px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                        ${l&&l.includes(w)?"bg-blue-500 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}
                      `,children:w},w))]})}),t.jsxs("div",{className:"flex-1 overflow-y-auto modal-body-content no-scrollbar",onScroll:b,children:[u,h&&t.jsxs("div",{className:"py-4 text-center",children:[t.jsx(An,{size:"sm",color:"primary"}),t.jsx("span",{className:"ml-2",children:f})]})]})]})})]})})},Ut=({shortcode:e,isSelected:n,onClick:r,prefetched:o=!1})=>{const{id:s,title:a,description:l,tags:d,asset:c,width:u,height:h}=e,f=Jn(s,c,u,h,300,200),[b,p]=i.useState(o),[w,m]=i.useState(!1),[g,v]=i.useState(!1),[k,$]=i.useState({top:0,left:0}),S=i.useRef(null),R=i.useRef(null),C=()=>{r(e)},_=()=>{p(!0)},F=()=>{w&&S.current&&(z(),v(!0))},Q=()=>{v(!1)},z=()=>{if(!S.current)return;const j=S.current.getBoundingClientRect(),I=sn({triggerRect:j});$(I)};i.useEffect(()=>{if(g){const j=()=>{z()};return window.addEventListener("resize",j),window.addEventListener("scroll",j),()=>{window.removeEventListener("resize",j),window.removeEventListener("scroll",j)}}},[g]),i.useEffect(()=>{if(o){p(!0);return}if(w&&!b&&R.current){const j=new window.Image;return j.crossOrigin="anonymous",j.onload=_,j.onerror=()=>{console.error(`Failed to load image: ${f.url}`)},j.src=f.url,()=>{j.onload=null,j.onerror=null}}},[f.url,w,b,o]),i.useEffect(()=>{if(o){m(!0);return}const j=S.current;if(!j)return;const I=new IntersectionObserver(y=>{y[0].isIntersecting&&(m(!0),I.unobserve(j))},{rootMargin:"200px",threshold:.01});return I.observe(j),()=>{I.unobserve(j),I.disconnect()}},[o]);const B=16;return t.jsxs("div",{ref:S,className:`relative group overflow-hidden rounded-lg shadow-md bg-white transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer optimized-card ${n?"ring-2 ring-blue-500 border-blue-500":"border border-gray-200"}`,onClick:C,onMouseEnter:F,onMouseLeave:Q,style:{width:f.displayWidth>0?f.displayWidth+B*2:"auto"},children:[t.jsxs("div",{className:"relative overflow-hidden optimized-card-image-container",style:{height:f.displayHeight>0?f.displayHeight+B:0,padding:B/2},children:[!b&&t.jsx("div",{className:"absolute inset-0 bg-gray-100 animate-pulse optimized-card-loading"}),(w||o)&&t.jsx("img",{ref:R,src:f.url,alt:a,className:`transition-opacity duration-300 optimized-card-image ${b?"opacity-100":"opacity-0"}`,loading:o?"eager":"lazy",decoding:"async",onLoad:_,width:f.displayWidth,height:f.displayHeight,style:{display:"block",margin:"0 auto",objectFit:"contain",maxWidth:"100%",maxHeight:"100%"}})]}),w&&t.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300",children:t.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300",children:[t.jsx("h3",{className:"text-white font-semibold text-base line-clamp-1",children:a}),d.length>0&&t.jsxs("div",{className:"mt-1 text-xs text-gray-200",children:[d.length," 个标签"]})]})}),t.jsxs(on,{isVisible:w&&g,position:k,zIndex:50,children:[t.jsx("h3",{className:"font-semibold text-lg text-white",children:a}),l&&t.jsx("div",{className:"mt-2 max-h-48 overflow-y-auto custom-scrollbar",children:t.jsx("p",{className:"text-gray-200 text-sm whitespace-pre-line",children:l})}),d.length>0&&t.jsx("div",{className:"flex flex-wrap gap-2 mt-3",children:d.map(j=>t.jsx("span",{className:"text-xs px-2 py-1 bg-white/20 text-white rounded-full",children:j},j))}),t.jsxs("div",{className:"mt-3 text-xs text-gray-300",children:[u," × ",h]})]})]})};var Wt=i.memo(Ut);const qt=({shortcodes:e,selectedShortcode:n,onShortcodeSelect:r,emptyMessage:o="没有找到模板",isLoading:s=!1})=>{const[a,l]=i.useState(!1),d=i.useRef(null),c=i.useRef(null),u=i.useRef(null),h=i.useMemo(()=>e.slice(0,9),[e]),f=p=>h.some(w=>w.id===p.id);if(i.useEffect(()=>{if(typeof ResizeObserver!="undefined"){const p=w=>{w.length&&(u.current&&window.clearTimeout(u.current),u.current=window.setTimeout(()=>{l(!0),u.current=window.setTimeout(()=>{l(!1)},50)},100))};return c.current=new ResizeObserver(p),d.current&&c.current.observe(d.current),()=>{c.current&&c.current.disconnect(),u.current&&clearTimeout(u.current)}}},[]),e.length===0&&!s)return t.jsx("div",{className:"flex justify-center items-center py-12 text-gray-500",children:o});const b=a?"masonry-grid-layouting":"";return t.jsx("div",{ref:d,className:`w-full ${b}`,style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))",gap:"1.5rem",justifyContent:"center",containIntrinsicSize:"auto",contain:"paint layout style"},children:e.map(p=>t.jsx("div",{style:{willChange:a?"transform":"auto",contain:"content",transform:"translateZ(0)"},children:t.jsx(Wt,{shortcode:p,isSelected:(n==null?void 0:n.id)===p.id,onClick:r,prefetched:f(p)})},p.id))})},he={success:e=>console.log("SUCCESS:",e),error:e=>console.error("ERROR:",e)},Gt=({isOpen:e,onClose:n,onProjectCreated:r})=>{const{t:o}=Y(),{shortcodeTags:s,searchTerm:a,selectedTags:l,shortcodes:d,hasMoreShortcodes:c,isLoadingShortcodes:u,selectedShortcode:h,setCreatingProject:f,selectTag:b,loadMoreShortcodes:p,selectShortcode:w,createProjectFromShortcode:m,setSearchTerm:g,clearFilters:v}=Kn();i.useEffect(()=>{f(!!e)},[e,f]);const k=i.useCallback(R=>{g(R)},[g]),$=i.useCallback(R=>{const{scrollTop:C,scrollHeight:_,clientHeight:F}=R.currentTarget;_-C<=F*1.5&&c&&!u&&p()},[c,u,p]),S=R=>N(void 0,null,function*(){try{w(R),he.success("正在创建项目...");const C=yield m(R);C?(he.success(`项目 "${C.name}" 创建成功`),n(),r&&C.id&&r(C.id)):he.error("项目创建失败，请重试")}catch(C){console.error("Error creating project:",C),he.error(C instanceof Error?C.message:"创建项目时发生错误")}});return t.jsx(gn,{isOpen:e,onClose:n,title:o("选择模板"),searchTerm:a,onSearch:k,tags:s,selectedTags:l,onTagSelect:b,onClearFilters:v,isLoading:u,loadingMessage:o("加载模板中..."),onScroll:$,children:t.jsx(qt,{shortcodes:d,selectedShortcode:h,onShortcodeSelect:S,emptyMessage:o(a?"没有找到匹配的模板":"没有找到模板"),isLoading:u})})};function ar({isOpen:e,onToggle:n,onProjectSelect:r}){const{i18n:o,t:s}=Y(),[a,l]=i.useState([]),[d,c]=i.useState(null),[u,h]=i.useState(!1),[f,b]=i.useState(!1);i.useEffect(()=>{const m=()=>{const k=ee();l(k);const $=localStorage.getItem("md_friday_current_project_id");c($)};m();const g=()=>{m()},v=()=>{m()};return window.addEventListener("storage",g),window.addEventListener("project-updated",v),()=>{window.removeEventListener("storage",g),window.removeEventListener("project-updated",v)}},[]);const p=m=>{mn(m),c(m),r&&r(m),window.dispatchEvent(new CustomEvent("project-changed",{detail:{projectId:m}}))},w=m=>{const g=ee();l(g),c(m),r&&r(m),window.dispatchEvent(new CustomEvent("project-changed",{detail:{projectId:m}})),console.log("Project created and selected:",m)};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white transition-all duration-300 z-10 border-r border-gray-200 shadow-sm flex flex-col ${e?"w-64":"w-14"}`,children:[t.jsx("button",{onClick:n,className:"absolute -right-3 top-5 bg-white rounded-full p-1 border border-gray-200 shadow-sm hover:shadow-md transition-shadow",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:`w-4 h-4 transition-transform ${e?"rotate-0":"rotate-180"}`,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5L8.25 12l7.5-7.5"})})}),t.jsxs("div",{className:"p-3 overflow-y-auto flex-grow",children:[t.jsxs("div",{className:"mb-4",children:[t.jsxs("div",{className:"flex items-center justify-between mb-2",children:[t.jsx("h3",{className:`font-medium text-sm ${e?"opacity-100":"opacity-0"} transition-opacity`,children:e?"项目":""}),t.jsx("button",{onClick:()=>h(!0),className:"text-blue-600 hover:text-blue-800 mr-1",title:"创建新项目",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})})})]}),t.jsx("div",{className:"space-y-1.5",children:a.length>0?a.map(m=>t.jsxs("div",{className:`flex items-center p-2 rounded-md cursor-pointer transition-colors ${m.id===d?"bg-blue-100 text-blue-700":"hover:bg-gray-100"}`,onClick:()=>p(m.id),children:[t.jsxs("div",{className:"mr-2",children:[m.type==="xiaohongshu"&&t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"})}),m.type==="resume"&&t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"})}),m.type==="website"&&t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"})})]}),t.jsx("div",{className:`truncate ${e?"block":"hidden"}`,children:m.name})]},m.id)):t.jsxs("div",{className:`p-2 ${e?"block":"hidden"}`,children:[t.jsx("div",{className:"text-sm text-gray-500",children:"还没有项目，点击上方 + 按钮创建"}),t.jsx("button",{onClick:()=>h(!0),className:"mt-2 w-full py-2 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200",children:"创建第一个项目"})]})})]}),t.jsx($n,{className:"my-3"}),t.jsxs("div",{className:`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${e?"justify-start":"justify-center"}`,onClick:()=>b(!0),children:[t.jsx("div",{className:"",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"})})}),t.jsx("div",{className:`truncate ${e?"block":"hidden"}`,children:"素材库"})]})]})]}),t.jsx(Gt,{isOpen:u,onClose:()=>h(!1),onProjectCreated:w}),t.jsx(gn,{isOpen:f,onClose:()=>b(!1),title:"素材库",children:t.jsx(dn,{})})]})}const lr=({project:e,onFileSelect:n,onProjectUpdate:r,selectedFileId:o,isCollapsed:s,onToggleCollapse:a,className:l=""})=>{const[d,c]=i.useState(!1),[u,h]=i.useState(e.name),[f,b]=i.useState(e.updatedAt);i.useEffect(()=>{h(e.name)},[e.name]),i.useEffect(()=>{b(e.updatedAt),console.log("ProjectExplorer - 项目更新时间已更新",new Date(e.updatedAt).toLocaleString())},[e.updatedAt]);const p=()=>{if(u.trim()!==e.name){const m=P(T({},e),{name:u.trim(),updatedAt:new Date().toISOString()});r(m)}c(!1)},w=(m,g=0)=>{var $;const v=m.id===o,k=`${g*12+8}px`;return m.isDirectory?t.jsxs("div",{children:[t.jsxs("div",{className:"flex items-center px-2 py-1.5 hover:bg-gray-100 cursor-pointer",style:{paddingLeft:k},children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4 mr-1.5 text-gray-600",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"})}),t.jsx("span",{className:"truncate",children:m.name})]}),($=m.children)==null?void 0:$.map(S=>w(S,g+1))]},m.id):t.jsxs("div",{className:`flex items-center px-2 py-1.5 hover:bg-gray-100 cursor-pointer ${v?"bg-blue-100 text-blue-700":""}`,style:{paddingLeft:k},onClick:()=>n(m.id),children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4 mr-1.5 text-gray-600",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"})}),t.jsx("span",{className:"truncate",children:m.name})]},m.id)};return s?t.jsx("div",{className:`h-full flex flex-col border-r border-gray-200 ${l}`,children:t.jsx("button",{onClick:a,className:"p-2 hover:bg-gray-100 text-center",title:"展开项目浏览器",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5 mx-auto",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 4.5l7.5 7.5-7.5 7.5"})})})}):t.jsxs("div",{className:`h-full flex flex-col border-r border-gray-200 w-64 ${l}`,children:[t.jsxs("div",{className:"p-3 border-b border-gray-200",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h3",{className:"font-medium text-sm text-gray-700",children:"项目信息"}),t.jsx("button",{onClick:a,className:"text-gray-500 p-1 hover:bg-gray-100 rounded",title:"收起项目浏览器",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5L8.25 12l7.5-7.5"})})})]}),d?t.jsx("div",{className:"mt-2 flex items-center",children:t.jsx(Oe,{value:u,onChange:m=>h(m.target.value),onBlur:p,onKeyDown:m=>{m.key==="Enter"&&p(),m.key==="Escape"&&(h(e.name),c(!1))},size:"sm",autoFocus:!0,className:"flex-1"})}):t.jsxs("div",{className:"mt-2 font-semibold cursor-pointer hover:bg-gray-100 py-1 px-2 rounded",onClick:()=>c(!0),children:[e.name,t.jsx(Tn,{content:"点击编辑项目名称",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-3.5 h-3.5 ml-2 inline text-gray-500",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"})})})]}),t.jsxs("div",{className:"mt-1 text-xs text-gray-500 flex items-center",children:[t.jsx("span",{className:"mr-2",children:"类型:"}),t.jsxs("span",{children:[e.type==="xiaohongshu"&&"小红书",e.type==="resume"&&"简历",e.type==="website"&&"网站"]})]}),t.jsxs("div",{className:"mt-1 text-xs text-gray-500",children:["更新时间: ",new Date(f).toLocaleString()]})]}),t.jsx("div",{className:"flex-1 overflow-y-auto",children:t.jsxs("div",{className:"py-2",children:[t.jsx("h3",{className:"px-3 text-xs font-medium text-gray-700 mb-1",children:"文件"}),t.jsx("div",{className:"text-sm",children:e.files.map(m=>w(m))})]})})]})},ir=We({base:"tracking-tight inline font-semibold",variants:{color:{violet:"from-[#FF1CF7] to-[#b249f8]",yellow:"from-[#FF705B] to-[#FFB457]",blue:"from-[#5EA2EF] to-[#0072F5]",cyan:"from-[#00b7fa] to-[#01cfea]",green:"from-[#6FEE8D] to-[#17c964]",pink:"from-[#FF72E1] to-[#F54C7A]",foreground:"dark:from-[#FFFFFF] dark:to-[#4B4B4B]"},size:{sm:"text-3xl lg:text-4xl",md:"text-[2.3rem] lg:text-5xl leading-9",lg:"text-4xl lg:text-6xl"},fullWidth:{true:"w-full block"}},defaultVariants:{size:"md"},compoundVariants:[{color:["violet","yellow","blue","cyan","green","pink","foreground"],class:"bg-clip-text text-transparent bg-gradient-to-b"}]});We({base:"w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",variants:{fullWidth:{true:"!w-full"}},defaultVariants:{fullWidth:!0}});export{tr as G,Zt as I,nr as M,lr as P,Kt as R,ar as S,Ze as T,Ht as a,rr as b,or as c,Xt as d,Bt as g,sr as i,er as r,Z as s,ir as t,Kn as u};
