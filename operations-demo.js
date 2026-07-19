(function(){
  "use strict";
  var root=document.documentElement;
  var body=document.body;
  var sidebar=document.getElementById("demo-sidebar");
  var overlay=document.getElementById("sidebar-overlay");
  var mobileMenu=document.getElementById("mobile-menu");
  var topTitle=document.getElementById("top-title");
  var languageButton=document.getElementById("language-button");
  var themeButton=document.getElementById("theme-button");
  var dialog=document.getElementById("command-dialog");
  var commandOpen=document.getElementById("command-open");
  var commandClose=document.getElementById("command-close");
  var commandInput=document.getElementById("command-input");
  var commandResults=document.getElementById("command-results");
  var toastStack=document.getElementById("toast-stack");
  var navButtons=Array.from(document.querySelectorAll(".demo-nav [data-view]"));

  function isEnglish(){return body.classList.contains("en")}
  function closeSidebar(){sidebar.classList.remove("open");overlay.classList.remove("open")}
  function activeButton(){return document.querySelector(".demo-nav [data-view].active")||navButtons[0]}
  function syncTitle(){var button=activeButton();topTitle.textContent=isEnglish()?button.dataset.titleEn:button.dataset.titleAr}
  function setLanguage(language){
    var en=language==="en";body.classList.toggle("en",en);root.lang=en?"en":"ar";root.dir=en?"ltr":"rtl";syncTitle();renderCommands(commandInput.value);
    try{localStorage.setItem("cp-language",en?"en":"ar")}catch(_error){}
  }
  function setTheme(theme){root.dataset.theme=theme;themeButton.textContent=theme==="dark"?"◒":"◐";try{localStorage.setItem("cp-demo-theme",theme)}catch(_error){}}
  function showView(view){
    navButtons.forEach(function(button){button.classList.toggle("active",button.dataset.view===view)});
    document.querySelectorAll("[data-view-panel]").forEach(function(panel){panel.hidden=panel.dataset.viewPanel!==view});
    syncTitle();closeSidebar();try{window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}catch(_error){}
  }
  function showToast(ar,en){
    var toast=document.createElement("div");toast.className="toast";toast.textContent=isEnglish()?en:ar;toastStack.appendChild(toast);setTimeout(function(){toast.remove()},3300);
  }
  function renderCommands(query){
    var q=(query||"").trim().toLowerCase();commandResults.replaceChildren();
    navButtons.filter(function(button){return !q||(button.dataset.titleAr+" "+button.dataset.titleEn).toLowerCase().includes(q)}).forEach(function(button){
      var item=document.createElement("button");item.type="button";item.dataset.commandView=button.dataset.view;
      var icon=document.createElement("span");icon.textContent=button.querySelector(".nav-icon").textContent;
      var label=document.createElement("b");label.textContent=isEnglish()?button.dataset.titleEn:button.dataset.titleAr;
      item.append(icon,label);item.addEventListener("click",function(){showView(button.dataset.view);dialog.close()});commandResults.appendChild(item);
    });
  }

  navButtons.forEach(function(button){button.addEventListener("click",function(){showView(button.dataset.view)})});
  document.querySelectorAll("[data-view-jump]").forEach(function(button){button.addEventListener("click",function(){showView(button.dataset.viewJump)})});
  document.querySelectorAll("[data-toast-ar]").forEach(function(button){button.addEventListener("click",function(){showToast(button.dataset.toastAr,button.dataset.toastEn)})});
  document.querySelectorAll("[data-approval]").forEach(function(button){button.addEventListener("click",function(){button.disabled=true;button.textContent=isEnglish()?"Approved (demo)":"تم الاعتماد (تجريبي)";showToast("تم تسجيل الاعتماد داخل العرض فقط","Approval recorded inside the demo only")})});
  document.querySelectorAll("[data-table-search]").forEach(function(input){input.addEventListener("input",function(){var table=document.getElementById(input.dataset.tableSearch);var q=input.value.trim().toLowerCase();table.querySelectorAll("tbody tr").forEach(function(row){row.hidden=q&&!row.textContent.toLowerCase().includes(q)})})});
  mobileMenu.addEventListener("click",function(){sidebar.classList.add("open");overlay.classList.add("open")});overlay.addEventListener("click",closeSidebar);
  languageButton.addEventListener("click",function(){setLanguage(isEnglish()?"ar":"en")});themeButton.addEventListener("click",function(){setTheme(root.dataset.theme==="dark"?"light":"dark")});
  commandOpen.addEventListener("click",function(){renderCommands("");dialog.showModal();commandInput.value="";commandInput.focus()});commandClose.addEventListener("click",function(){dialog.close()});commandInput.addEventListener("input",function(){renderCommands(commandInput.value)});
  dialog.addEventListener("click",function(event){if(event.target===dialog)dialog.close()});
  document.addEventListener("keydown",function(event){if((event.key==="/"||((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"))&&!dialog.open){event.preventDefault();commandOpen.click()}});

  var savedLanguage="ar",savedTheme="light";try{savedLanguage=localStorage.getItem("cp-language")||"ar";savedTheme=localStorage.getItem("cp-demo-theme")||"light"}catch(_error){}
  setTheme(savedTheme==="dark"?"dark":"light");setLanguage(savedLanguage==="en"?"en":"ar");showView("dashboard");
})();
