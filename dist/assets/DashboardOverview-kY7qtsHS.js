import{c as d,u as l,S as n,j as e}from"./index-DpFV69xX.js";/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=d("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=d("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]),h=({title:a,value:s,icon:r,color:o})=>e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-6 flex items-start justify-between border border-gray-100",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500 text-sm font-medium mb-1",children:a}),e.jsx("h3",{className:"text-2xl font-bold text-gray-800",children:s})]}),e.jsx("div",{className:`p-3 rounded-lg ${o}`,children:e.jsx(r,{className:"w-6 h-6 text-white"})})]}),b=()=>{const a=l(t=>t.products),s=l(t=>t.orders)||[],r=a.length,o=s.length,c=[{title:"Total Sales",value:`₹${s.reduce((t,i)=>t+(i.total||0),0).toLocaleString()}`,icon:x,color:"bg-green-500"},{title:"Total Orders",value:o,icon:n,color:"bg-indigo-500"},{title:"Total Products",value:r,icon:g,color:"bg-orange-500"}];return e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-6",children:"Dashboard Overview"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:c.map(t=>e.jsx(h,{...t},t.title))}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-6 border border-gray-100",children:[e.jsx("h3",{className:"text-lg font-bold text-gray-800 mb-4",children:"Welcome Back, Admin"}),e.jsx("p",{className:"text-gray-600",children:"Use the sidebar navigation to manage products and view customer orders."})]})]})};export{b as default};
