(function(){
  "use strict";

  var root=document.documentElement;
  var body=document.body;
  var header=document.getElementById("site-header");
  var menu=document.getElementById("nav-panel");
  var menuToggle=document.getElementById("menu-toggle");
  var langToggle=document.getElementById("lang-toggle");
  var themeToggle=document.getElementById("theme-toggle");
  var sector=document.getElementById("finder-sector");
  var goal=document.getElementById("finder-goal");
  var finderButton=document.getElementById("finder-button");
  var finderResult=document.getElementById("finder-result");

  var copy={
    operations:{
      visibility:["منصة تشغيل مرحلية","ابدأ بغرفة عمليات موحدة للأصول والتنبيهات والتقارير، ثم أضف الصيانة والاعتمادات حسب الأولوية.","Phased operations platform","Start with one command center for assets, alerts, and reports, then add maintenance and approvals by priority."],
      workflow:["أتمتة تدفق تشغيلي","اختر أكثر إجراء يدوي تكراراً، حوّله إلى مسار واضح، ثم قِس الوقت والأخطاء قبل التوسع.","Operations workflow automation","Choose the most repetitive manual task, turn it into a clear workflow, and measure time and errors before expanding."],
      control:["مركز صلاحيات واعتمادات","ابدأ بالأدوار وحدود الوصول وسجل التدقيق، ثم اربط الموافقات بالإجراءات الحساسة.","Access and approval center","Start with roles, access boundaries, and audit trails, then connect approvals to sensitive actions."],
      growth:["منصة متعددة الوحدات","ابنِ نواة مشتركة للبيانات والصلاحيات، ثم أضف الوحدات والفروع دون تكرار البنية.","Multi-module platform","Build a shared data and access core, then add modules and branches without duplicating architecture."]
    },
    restaurant:{
      visibility:["لوحة مطعم وفروع","وحّد الطلبات والمطبخ والمخزون ومؤشرات الفروع في لوحة واضحة للإدارة.","Restaurant and branch dashboard","Unify orders, kitchen, stock, and branch indicators in one clear management view."],
      workflow:["تدفق الطلب إلى المطبخ","ابدأ بدورة الطلب والطاولة والمطبخ والتسليم لتقليل التأخير والأخطاء.","Order-to-kitchen flow","Start with the order, table, kitchen, and handoff cycle to reduce delays and errors."],
      control:["صلاحيات وتشغيل الوردية","حدّد إجراءات الإلغاء والخصم والإقفال والتقارير ضمن أدوار قابلة للمراجعة.","Shift controls and access","Define cancellation, discount, closing, and reporting actions under reviewable roles."],
      growth:["نظام مطاعم متعدد الفروع","وحّد القائمة والتقارير والمعايير، مع فصل التشغيل اليومي لكل فرع.","Multi-branch restaurant system","Unify menu, reporting, and standards while separating daily operations by branch."]
    },
    service:{
      visibility:["بوابة طلبات وتقارير","اجمع طلبات العملاء وحالاتها ومؤشرات الخدمة في مسار واحد قابل للبحث.","Request and reporting portal","Bring customer requests, statuses, and service indicators into one searchable flow."],
      workflow:["مسار خدمة مؤتمت","اربط الطلب بالتوزيع والتنفيذ والاعتماد والإغلاق مع إشعارات واضحة.","Automated service workflow","Connect request intake, assignment, execution, approval, and closure with clear notifications."],
      control:["اعتمادات وسجل خدمة","وثّق من شاهد وعدّل واعتمد كل طلب، وفق أقل صلاحية لازمة.","Approvals and service trail","Document who viewed, changed, and approved each request using least privilege."],
      growth:["منصة خدمات قابلة للتوسع","ابدأ بخدمة واحدة ثم أضف أنواع الطلبات والفرق والقنوات تدريجياً.","Scalable service platform","Start with one service and gradually add request types, teams, and channels."]
    },
    existing:{
      visibility:["مراجعة تجربة وتقارير","ابدأ بتدقيق الواجهات ومصادر الأرقام قبل إضافة ميزات جديدة.","UX and reporting review","Audit interfaces and metric sources before adding new features."],
      workflow:["إعادة تصميم مرحلية","حدّد أكثر التدفقات تعثراً، أصلحها بقياس قبل/بعد، ثم انتقل للمرحلة التالية.","Phased modernization","Identify the most blocked workflows, improve them with before/after measures, then proceed."],
      control:["مراجعة أمان وصلاحيات","راجع الوصول والجلسات والمدخلات والسجلات وحدّد أولويات المعالجة حسب المخاطر.","Security and access review","Review access, sessions, inputs, and logs, then prioritize remediation by risk."],
      growth:["تحديث بنية قابل للتوسع","افصل المشكلات الحرجة عن التحسينات، وضع خارطة انتقال تحافظ على استمرارية التشغيل.","Scalable architecture modernization","Separate critical issues from improvements and create a continuity-focused migration roadmap."]
    }
  };

  function isEnglish(){return body.classList.contains("en")}
  function applyLanguage(value){
    var en=value==="en";
    body.classList.toggle("en",en);
    root.lang=en?"en":"ar";
    root.dir=en?"ltr":"rtl";
    document.querySelectorAll("option[data-ar-option]").forEach(function(option){option.textContent=en?option.dataset.enOption:option.dataset.arOption});
    try{localStorage.setItem("cp-language",en?"en":"ar")}catch(_error){}
    updateFinder();
  }
  function applyTheme(value){
    root.dataset.theme=value;
    themeToggle.textContent=value==="light"?"◒":"◐";
    try{localStorage.setItem("cp-theme",value)}catch(_error){}
  }
  function updateFinder(){
    var item=copy[sector.value]&&copy[sector.value][goal.value];
    if(!item)return;
    var en=isEnglish();
    finderResult.querySelector("h3").textContent=en?item[2]:item[0];
    finderResult.querySelector("p").textContent=en?item[3]:item[1];
  }
  function closeMenu(){menu.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}

  menuToggle.addEventListener("click",function(){var open=menu.classList.toggle("open");this.setAttribute("aria-expanded",String(open))});
  menu.querySelectorAll("a").forEach(function(link){link.addEventListener("click",closeMenu)});
  langToggle.addEventListener("click",function(){applyLanguage(isEnglish()?"ar":"en")});
  themeToggle.addEventListener("click",function(){applyTheme(root.dataset.theme==="light"?"dark":"light")});
  finderButton.addEventListener("click",updateFinder);
  sector.addEventListener("change",updateFinder);goal.addEventListener("change",updateFinder);
  window.addEventListener("scroll",function(){header.classList.toggle("scrolled",window.scrollY>12)},{passive:true});
  document.addEventListener("click",function(event){
    if(window.innerWidth<=780&&!menu.contains(event.target)&&!menuToggle.contains(event.target))closeMenu();
    document.querySelectorAll(".nav-dropdown[open]").forEach(function(dropdown){if(!dropdown.contains(event.target))dropdown.removeAttribute("open")});
  });
  document.querySelectorAll(".accordion details").forEach(function(detail){detail.addEventListener("toggle",function(){if(!detail.open)return;document.querySelectorAll(".accordion details[open]").forEach(function(other){if(other!==detail)other.removeAttribute("open")})})});

  var savedLang="ar",savedTheme="dark";
  try{savedLang=localStorage.getItem("cp-language")||"ar";savedTheme=localStorage.getItem("cp-theme")||"dark"}catch(_error){}
  applyTheme(savedTheme==="light"?"light":"dark");
  applyLanguage(savedLang==="en"?"en":"ar");
  header.classList.toggle("scrolled",window.scrollY>12);
})();
