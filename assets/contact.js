/* GUARDIAN:BEGIN
   🛡️ مَوْلِدي | Mawlidi — © 2026 Artist Altayeb Amer
   الفنان الطيب عامر  ·  https://mawlidi.com
   GUARDIAN:END */
/* نموذج التواصل — يُرسل عبر contact.007.gallery بلا مغادرة الصفحة.
   الموقع شجرتان منفصلتان (arb/ و eng/) فاللغة تُستنتج من المسار. */
(function (global) {
  "use strict";
  var ENDPOINT = "https://contact.007.gallery/send";
  var doc = global.document, loadedAt = Date.now();
  var EN = global.location.pathname.indexOf("/eng/") === 0;

  var T = {
    sending:["جارٍ الإرسال…","Sending…"],
    ok:["✓ وصلت رسالتك. نقرأ كل رسالة ونردّ على بريدك.","✓ Your message arrived. We read every one and reply to your email."],
    email:["تحقّق من بريدك الإلكتروني — يبدو غير صحيح.","Please check your email address — it looks invalid."],
    subject:["اكتب موضوعاً قصيراً.","Please add a short subject."],
    message_short:["الرسالة قصيرة جداً — اكتب عشرة أحرف على الأقل.","That message is too short — please write at least ten characters."],
    message_long:["الرسالة طويلة جداً. اختصرها قليلاً.","That message is too long. Please shorten it a little."],
    offline:["تعذّر الاتصال. تحقّق من الإنترنت وأعد المحاولة.","Could not connect. Check your connection and try again."],
    failed:["تعذّر الإرسال الآن. أعد المحاولة بعد قليل.","Sending failed right now. Please try again shortly."]
  };
  function say(k){ return (T[k]||T.failed)[EN?1:0]; }

  var EMAIL_RE=/^[^\s@,;:<>()[\]\\]+@[^\s@.,;:<>()[\]\\]+\.[A-Za-z]{2,}$/;
  var LIM={email:254,subject:200,message:5000,min_message:10};
  function localError(d){
    if(!EMAIL_RE.test(d.email)||d.email.length>LIM.email) return "email";
    if(!d.subject||d.subject.length>LIM.subject) return "subject";
    if(d.message.length<LIM.min_message) return "message_short";
    if(d.message.length>LIM.message) return "message_long";
    return null;
  }

  function ready(){
    var card=doc.getElementById("mailCard"), panel=doc.getElementById("mailPanel"),
        form=doc.getElementById("mailForm");
    if(!card||!panel||!form) return;
    var note=doc.getElementById("mailNote"), btn=doc.getElementById("mailSend");

    card.addEventListener("click",function(){
      var open=panel.hidden;
      panel.hidden=!open;
      card.setAttribute("aria-expanded",open?"true":"false");
      if(open){ var f=doc.getElementById("mailEmail"); if(f) setTimeout(function(){f.focus();},250); }
    });

    function show(msg,kind){ note.textContent=msg; note.dataset.kind=kind; note.hidden=false; }

    form.addEventListener("submit",function(ev){
      ev.preventDefault();
      var payload={
        email:doc.getElementById("mailEmail").value.trim(),
        subject:doc.getElementById("mailSubject").value.trim(),
        message:doc.getElementById("mailMessage").value.trim(),
        _trap:doc.getElementById("mailTrap").value,
        elapsed:Date.now()-loadedAt
      };
      var bad=localError(payload);
      if(bad){
        show(say(bad),"err");
        var map={email:"mailEmail",subject:"mailSubject",message_short:"mailMessage",message_long:"mailMessage"};
        var el=doc.getElementById(map[bad]); if(el) el.focus();
        return;
      }
      btn.disabled=true; show(say("sending"),"wait");
      global.fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)})
        .then(function(r){ return r.json().catch(function(){return {ok:false,error:"failed"};}); })
        .then(function(d){
          if(d&&d.ok){ form.reset(); show(say("ok"),"ok");
            setTimeout(function(){btn.disabled=false;},4000); return; }
          show(say(d&&d.error?d.error:"failed"),"err"); btn.disabled=false;
        })
        .catch(function(){ show(say("offline"),"err"); btn.disabled=false; });
    });
  }
  if(doc.readyState==="loading") doc.addEventListener("DOMContentLoaded",ready); else ready();
})(typeof window!=="undefined"?window:globalThis);
