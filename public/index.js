
let content = document.querySelectorAll(".content");
content.forEach(e=>{
    let arrE=e.innerText.split(" ").slice(0,99).join(" ");
    e.innerText=arrE+"...";
});

