const s=async(e,o={})=>{let t;try{const r=await fetch(e,o);if(!r.ok){const a=await r.json();return t={error:a.error.message,status:a.error.status},t}t=await r.json()}catch(r){t={error:r.message}}return t};async function n(e){const t={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};return s(e,t).then(r=>r)}export{s as f,n as g};