!function(){var t=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]");t.addEventListener("click",(function(){null===e&&(e=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),t.classList.add("disabled"),a.classList.remove("disabled")}),1e3))})),a.addEventListener("click",(function(){null!==e&&(clearInterval(e),t.classList.remove("disabled"),a.classList.add("disabled"))})),a.classList.add("disabled");var e=null}();
//# sourceMappingURL=01-color-switcher.658ecf7e.js.map
