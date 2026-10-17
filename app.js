/* Lógica do site (não precisa editar). Os conteúdos ficam em js/data.js */
let lang = "pt";
try { lang = localStorage.getItem("lang") || (navigator.language || "pt").slice(0, 2); } catch (e) {}
if (lang !== "en") lang = "pt";
const t = k => UI[k][lang];
const L = o => o[lang] || o.pt;
const $ = (s, r = document) => r.querySelector(s);
const SEC = ["education", "tools", "experience", "projects", "contact"];

const P = {
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h4"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3M12 15v2"/>',
  teach: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>',
  code: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
  book: '<path d="M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-7v16h7z"/>'
};
const ico = n => `<span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24">${P[n] || P.book}</svg></span>`;
const tags = a => `<ul class="tags">${a.map(x => `<li class="tag">${x}</li>`).join("")}</ul>`;
const sv = d => `<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">${d}</svg>`;

function renderNav(route) {
  const links = SEC.map(s => `<a href="#/${s}" data-s="${s}">${t(s)}</a>`).join("") +
    `<a href="#/notes" data-s="notes"${route === "notes" ? ' class="on" aria-current="page"' : ""}>${t("notes")}</a>`;
  $("#nav").innerHTML = `<a class="logo" href="#/" aria-label="eduardaguicode">eduardaguicode<span class="cur">_</span></a>
    <div class="links">${links}</div><button class="lang" type="button" aria-label="Português / English">${lang === "pt" ? "EN" : "PT"}</button>`;
  $(".lang").onclick = () => {
    lang = lang === "pt" ? "en" : "pt";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    route_(true);
  };
  $(".skip").textContent = t("skip");
  $("#foot").innerHTML = `<p>${t("foot")}</p><p><a href="#/notes">${t("notes")}</a> · <a href="#/">${t("top")} ↑</a></p>`;
}

function home() {
  const D = DATA, h = D.hero, c = D.contact, cd = h.code[lang] || h.code.pt;
  const item = (e, i) => `<li class="item rv" style="--i:${i}">${ico(e.icon)}<div><h3>${L(e.title)}</h3><p class="date">${L(e.period)}</p><p>${L(e.text)}</p>${
    e.bullets ? `<ul class="dots">${e.bullets.map(b => `<li>${L(b)}</li>`).join("")}</ul>` : ""}</div></li>`;
  const cards = D.projects.map(p => `<a class="pcard rv" href="#/notes/${p.slug}">
      <div class="pimg">${p.cover ? `<img src="${p.cover}" alt="" loading="lazy">` : `<span aria-hidden="true">${L(p.title)[0]}</span>`}</div>
      <div class="pbody"><h3>${L(p.title)}</h3><p>${L(p.summary)}</p>${tags(p.tools || [])}<span class="more">${t("open")} →</span></div></a>`).join("");
  const ghost = `<article class="pcard ghost rv"><div class="pimg"></div><div class="pbody"><h3>${t("soon")}</h3><p>${t("wip")} ${t("wipSub")}</p></div></article>`;
  return `
  <header class="hero wrap">
    <div class="intro">
      <h1 class="rv">${h.name}</h1>
      <p class="sub rv" style="--i:1">${L(h.subtitle)}</p>
      <div class="code rv" style="--i:2"><pre><code><span class="k">def</span> <span class="f">${cd.fn}</span><span class="p">()</span><span class="k">:</span>
    <span class="k">return</span> <span class="k">f</span>"${cd.text}"

<span class="f">print</span>(<span class="f">${cd.fn}</span><span class="p">()</span>)</code></pre></div>
    </div>
    <figure class="frame rv" style="--i:3">
      <div class="chrome"><i></i><i></i><i></i>${sv('<rect x="1.5" y="2.5" width="13" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M6 2.5v11" stroke="currentColor" stroke-width="1.4"/>')}<span>${h.photoLabel}</span>
        ${sv('<circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 10.5L14 14M5 7h4" stroke="currentColor" stroke-width="1.4"/>')}
        ${sv('<circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 10.5L14 14M5 7h4M7 5v4" stroke="currentColor" stroke-width="1.4"/>')}</div>
      <img src="${h.photo}" alt="${L(h.photoAlt)}" width="626" height="804">
    </figure>
  </header>

  <div class="band">
    <section id="education" class="wrap"><h2 class="rv">${t("education")}</h2>
      <p class="lede rv" style="--i:1"><a href="http://lattes.cnpq.br/0288624939282144" target="_blank" rel="noopener">${t("lattes")}</a></p>
      <div class="edu">
        <div><h3 class="vh">${t("degrees")}</h3><ul class="list">${D.education.degrees.map(item).join("")}</ul></div>
        <div class="bar" aria-hidden="true"></div>
        <div><h3 class="vh">${t("courses")}</h3><ul class="list">${D.education.courses.map(item).join("")}</ul></div>
      </div></section>
    <section id="tools" class="wrap narrow"><h2 class="rv">${t("tools")}</h2><p class="lede rv" style="--i:1">${t("toolsSub")}</p>${tags(D.tools)}</section>
    <section id="experience" class="wrap"><h2 class="rv">${t("experience")}</h2>
      <ol class="tl">${D.experience.map(item).join("")}</ol></section>
  </div>

  <section id="projects" class="wrap"><h2 class="rv">${t("projects")}</h2><p class="lede rv" style="--i:1">${t("projSub")}</p>
    <div class="pgrid">${D.projects.length ? cards : ghost}</div>
    <p class="cta"><a class="btn" href="#/notes">${t("openAll")}</a></p></section>

  <section id="contact" class="wrap contact"><h2 class="rv">${t("contact")}</h2><p class="lede rv" style="--i:1">${t("contactSub")}</p>
    <div class="cgrid">
      <form id="f" class="rv" style="--i:2" novalidate>
        <label>${t("name")}<input name="n" autocomplete="name"><small class="err" id="en">${t("eName")}</small></label>
        <label>${t("email")}<input name="e" type="email" autocomplete="email"><small class="err" id="ee">${t("eMail")}</small></label>
        <label>${t("msg")}<textarea name="m" rows="5"></textarea><small class="err" id="em">${t("eMsg")}</small></label>
        <button class="btn" type="submit">${t("send")}</button>
      </form>
      <div class="soc rv" style="--i:3"><a class="btn alt" href="mailto:${c.email}">${c.email}</a>
        <a class="btn alt" href="${c.instagram}" target="_blank" rel="noopener">Instagram</a>
        <a class="btn alt" href="${c.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
    </div></section>`;
}

const win = (path, inner) => `<div class="wrap nb"><a class="back" href="#/">${t("home")}</a>
  <article class="note"><div class="chrome"><i></i><i></i><i></i><span>${path}</span></div><div class="body">${inner}</div></article></div>`;
const wipBox = () => `<div class="wipbox"><p class="big">${t("wip")}</p><p>${t("wipSub")}</p></div>`;

function notes() {
  const Pj = DATA.projects;
  const list = Pj.length ? `<ul class="nlist">${Pj.map(p => `<li><a href="#/notes/${p.slug}"><span>${L(p.title)}</span><span aria-hidden="true">→</span></a></li>`).join("")}</ul>` : wipBox();
  return win("notas /", `<h1>${t("nbTitle")}</h1><p class="pitch">${t("nbIntro")}</p><p><a class="back" href="#/notes/purpose">${t("nbWhy")}</a></p>${list}`);
}
const purpose = () => win("notas / sobre", `<a class="back" href="#/notes">${t("back")}</a><h1>${t("whyTitle")}</h1><p>${t("why1")}</p><p>${t("why2")}</p>`);
const project = p => win("notas / " + p.slug, `<a class="back" href="#/notes">${t("back")}</a><h1>${L(p.title)}</h1>
  <h2>${t("how")}</h2><ol class="steps">${(p.steps || []).map(s => `<li><h3>${L(s.title)}</h3><p>${L(s.text)}</p></li>`).join("")}</ol>
  <h2>${t("product")}</h2><p class="pitch">${L(p.pitch)}</p>
  <p class="row">${p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">${t("repo")}</a>` : ""}${p.video ? `<a class="btn alt" href="${p.video}" target="_blank" rel="noopener">${t("video")}</a>` : ""}</p>
  <h2>${t("stack")}</h2>${tags(p.tools || [])}`);

function bindForm() {
  const f = $("#f"); if (!f) return;
  f.onsubmit = e => {
    e.preventDefault();
    const chk = [["n", "en", v => v.trim()], ["e", "ee", v => /^\S+@\S+\.\S+$/.test(v.trim())], ["m", "em", v => v.trim()]];
    let first = null;
    chk.forEach(([k, id, ok]) => {
      const bad = !ok(f[k].value);
      $("#" + id).classList.toggle("show", bad);
      f[k].setAttribute("aria-invalid", bad);
      if (bad && !first) first = f[k];
    });
    if (first) return first.focus();
    const body = f.m.value + "\n\n— " + f.n.value + " (" + f.e.value + ")";
    location.href = `mailto:${DATA.contact.email}?subject=${encodeURIComponent(t("subject"))}&body=${encodeURIComponent(body)}`;
  };
}

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
let spy;
function route_(keep) {
  const h = location.hash.replace(/^#\/?/, "").split("/");
  const inNotes = h[0] === "notes";
  let html, target = null;
  if (inNotes) {
    const p = DATA.projects.find(x => x.slug === h[1]);
    html = h[1] === "purpose" ? purpose() : p ? project(p) : notes();
  } else { html = home(); if (SEC.includes(h[0])) target = h[0]; }
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  renderNav(inNotes ? "notes" : "");
  $("#main").innerHTML = html;
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
  bindForm();
  if (spy) spy.disconnect();
  if (!inNotes) {
    spy = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      document.querySelectorAll("#nav .links a").forEach(a => { const on = a.dataset.s === e.target.id; a.classList.toggle("on", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
    }), { rootMargin: "-45% 0px -50% 0px" });
    SEC.forEach(s => spy.observe($("#" + s)));
  }
  if (target) $("#" + target).scrollIntoView(); else if (!keep) scrollTo(0, 0);
}
document.documentElement.classList.add("js");
addEventListener("hashchange", () => route_());
route_();
