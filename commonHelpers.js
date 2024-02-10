import{i as c,S as p}from"./assets/vendor-5b791d57.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const n={formBlock:document.querySelector(".form-block"),formElem:document.querySelector(".form-elem"),formInput:document.querySelector(".form-input"),formBtn:document.querySelector(".form-btn"),loader:document.querySelector(".loader-block"),gallery:document.querySelector(".gallery")};function u(){n.loader.classList.remove("hidden")}function m(){n.loader.classList.add("hidden")}n.formElem.addEventListener("submit",a=>{a.preventDefault(),n.gallery.inserHTML="";const r=n.formInput.value.trim();if(r==="")return c.show({message:"You have not entered what to search for",position:"topRight"});d(r),a.target.reset()});function d(a){const r="42281278-b9f49de06a3dfc9ed42173e47",l="https://pixabay.com",i="/api/",e=`q=${a}&image_type=photo&orientation=horizontal&safesearch=true`,t=`${l}${i}?key=${r}&${e}`;u(),fetch(t).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()}).then(o=>{if(o.hits.length===0)c.error({message:`Sorry, there are no images matching
 your search query. Please try again!`,position:"topRight"});else{const f=o.hits.map(s=>`
                <li class="gallery-item">
                <a class="gallery-link" href="${s.largeImageURL}">
                  <img
                    class="gallery-image"
                    src="${s.webformatURL}"
                    alt="${s.tags}"
                  />
                </a>
                <div class="modal-info">
                  <p>Likes <span class="gallery-info">${s.likes}</span></p>
                  <p>Views <span class="gallery-info">${s.views}</span></p>
                  <p>Comments <span class="gallery-info">${s.comments}</span></p>
                  <p>Downloads <span class="gallery-info">${s.downloads}</span></p>
                </div>
              </li>`).join("");n.gallery.innerHTML=f,new p(".gallery a",y).refresh()}}).catch(o=>{console.error("Error fetching data:",o)}).finally(()=>{m()})}const y={captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionSelector:"img",captionDelay:250};
//# sourceMappingURL=commonHelpers.js.map
