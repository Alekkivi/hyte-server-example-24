import"./modulepreload-polyfill-B5Qt9EMX.js";import{f as a}from"./fetch-DJ5P6f8c.js";import{s as r}from"./snackbar-BNtgsuzo.js";const i=document.querySelector(".loginuser");i.addEventListener("click",async n=>{n.preventDefault(),console.log("Login activated");const t="http://localhost:3000/api/auth/login",o=document.querySelector(".login_form"),s={username:o.querySelector("input[name=username]").value,password:o.querySelector("input[name=password]").value},l={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)};a(t,l).then(e=>{if(console.log(e),e.token==null)r("incorrectLogin");else{const c=e.user.user_level;localStorage.setItem("token",e.token),c==="admin"?(console.log("Admin logged in"),window.location.href="admin.html"):c==="regular"&&(console.log("Regular logged in"),window.location.href="regular.html")}})});const u=document.querySelector(".createuser");u.addEventListener("click",async n=>{n.preventDefault(),console.log("Create account activated");const t="http://127.0.0.1:3000/api/users",o=document.querySelector(".create_user_form"),s={username:o.querySelector("input[name=username]").value,password:o.querySelector("input[name=password]").value,email:o.querySelector("input[name=email]").value},l={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)};a(t,l).then(e=>{console.log(e),e.error?e.error==="Username taken"?r("crimson",e.error):r("crimson",e.error):(r("darkgreen","New user created!"),console.log(e))})});
