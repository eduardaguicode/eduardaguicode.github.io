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
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

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

/* Ferramentas: as mesmas palavras dos chips, em linhas que correm em sentidos alternados */
function marquee(tools) {
  const col = ["c", "p", "w"], speeds = [30, 38, 26];
  const half = r => {
    const seq = tools.map((_, i) => tools[(i + r) % tools.length]);
    let out = "";
    for (let k = 0; k < 4; k++) seq.forEach((w, i) => { out += `<span class="${col[(i + k + r) % 3]}">${w}</span>`; });
    return out;
  };
  return `<div class="mq" aria-hidden="true">${[0, 1, 2].map(r =>
    `<div class="mq-row ${r % 2 ? "rtl" : "ltr"}" style="--d:${speeds[r]}s"><div class="mq-track"><div class="mq-half">${half(r)}</div><div class="mq-half">${half(r)}</div></div></div>`).join("")}</div>`;
}

function home() {
  const D = DATA, h = D.hero, c = D.contact, cd = h.code[lang] || h.code.pt;
  const item = (e, i, cls = "") => `<li class="item ${cls} rv" style="--i:${i}">${ico(e.icon)}<div><h3>${L(e.title)}</h3><p class="date">${L(e.period)}</p><p>${L(e.text)}</p>${
    e.bullets ? `<ul class="dots">${e.bullets.map(b => `<li>${L(b)}</li>`).join("")}</ul>` : ""}</div></li>`;
  const fold = '<svg class="pj-fold" viewBox="0 0 380 364" preserveAspectRatio="none" aria-hidden="true"><path d="M0 364V100H122Q140 100 152 110L176 128Q184 131 196 131H350Q380 131 380 161V364Z" fill="currentColor"/></svg>';
  const card = (p, i) => `<a class="pj" href="#/notes/${p.slug}"><div class="pj-in">${p.cover ? `<img class="pj-img" src="${p.cover}" alt="" loading="lazy">` : '<div class="pj-img gen" aria-hidden="true"></div>'}
      <span class="pj-top">${(p.tools || []).join(" · ")}</span>${fold}<h3 class="pj-title">${L(p.title)}</h3><p class="pj-sub">${L(p.summary)}</p>
      <div class="pj-num"><b>${String(i + 1).padStart(2, "0")}</b><span>${t("projLabel")}</span></div><span class="pj-act">${t("open")} →</span></div></a>`;
  const ghost = `<article class="pj ghost"><div class="pj-in"><div class="pj-img gen" aria-hidden="true"></div>
      <span class="pj-top">eduardaguicode</span>${fold}<h3 class="pj-title">${t("soon")}</h3><p class="pj-sub">${t("wip")}</p>
      <div class="pj-num"><b>01</b><span>${t("projLabel")}</span></div></div></article>`;
  const grid = D.projects.length ? D.projects.map(card).join("") : ghost;
  const arrow = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return `
  <header class="hero"><div class="hwrap">
    <div class="banner rv">
      <img class="bme" src="${h.photo}" alt="${L(h.photoAlt)}" width="720" height="767">
      <div class="btxt"><p class="hi">${t("hello")}</p><h1>${h.name}</h1></div>
    </div>
    <div class="code rv" style="--i:1"><pre><code><span class="k">def</span> <span class="f">${cd.fn}</span><span class="p">()</span><span class="k">:</span>
    <span class="k">return</span> <span class="k">f</span><span class="s">"${esc(cd.text)}"</span>

<span class="f">print</span>(<span class="f">${cd.fn}</span><span class="p">()</span>)</code></pre></div>
  </div></header>

  <section id="education" class="edu"><div class="wrap">
    <h2 class="rv">${t("education")}</h2>
    <p class="lattes rv" style="--i:1"><a href="http://lattes.cnpq.br/0288624939282144" target="_blank" rel="noopener" aria-label="${t("lattesFull")}">${t("lattes")}${arrow}</a></p>
    <div class="edu3">
      <div><h3 class="vh">${t("degrees")}</h3><ul class="list">${D.education.degrees.map((e, i) => item(e, i, "pink")).join("")}</ul></div>
      <div class="emark" aria-hidden="true">e_</div>
      <div><h3 class="vh">${t("courses")}</h3><ul class="list">${D.education.courses.map((e, i) => item(e, i, "rev")).join("")}</ul></div>
    </div></div></section>

  <section id="tools" class="tools"><div class="tpanel">
    ${marquee(D.tools)}
    <div class="tright"><h2 class="rv">${t("tools")}</h2>
      <ul class="chips rv" style="--i:1">${D.tools.map(x => `<li class="chip">${x}</li>`).join("")}</ul></div>
  </div></section>

  <section id="experience" class="exp"><div class="wrap"><h2 class="rv">${t("experience")}</h2>
    <ol class="tl">${D.experience.map((e, i) => item(e, i)).join("")}</ol></div></section>

  <div class="fin">
  <section id="projects" class="proj"><div class="wrap"><h2 class="rv">${t("projects")}</h2>
    <p class="lattes rv" style="--i:1"><a href="#/notes">${t("notesLink")}${arrow}</a></p></div>
    <div class="pj-view rv" style="--i:1"><div class="pj-track">${grid}</div></div>
    <div class="pj-ctl"><button class="arr" type="button" data-d="-1" aria-label="${t("prev")}">←</button><button class="arr" type="button" data-d="1" aria-label="${t("next")}">→</button></div>
  </section>

  <section id="contact" class="contact"><div class="wrap"><h2 class="rv">${t("contact")}</h2>
    <div class="cgrid">
      <form id="f" class="rv" style="--i:2" novalidate>
        <label>${t("name")}<input name="n" autocomplete="name"><small class="err" id="en">${t("eName")}</small></label>
        <label>${t("email")}<input name="e" type="email" autocomplete="email"><small class="err" id="ee">${t("eMail")}</small></label>
        <label>${t("msg")}<textarea name="m" rows="5"></textarea><small class="err" id="em">${t("eMsg")}</small></label>
        <button class="btn" type="submit">${t("send")}</button>
      </form>
      <div class="soc rv" style="--i:3">
        <a class="btn alt" href="${c.instagram}" target="_blank" rel="noopener">Instagram</a>
        <a class="btn alt" href="${c.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
    </div></div></section>
  </div>`;
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

addEventListener("scroll", () => $("#nav").classList.toggle("solid", scrollY > 24), { passive: true });

/* Projetos: cards que correm para a esquerda; param no hover/foco; setas avançam ou voltam um card */
let pjRaf = 0, pjOff = null;
function initCarousel() {
  cancelAnimationFrame(pjRaf);
  if (pjOff) pjOff();
  const view = $(".pj-view"); if (!view) return;
  const track = $(".pj-track"), base = [...track.children];
  const gap = parseFloat(getComputedStyle(track).columnGap) || 28;
  const measure = () => base.reduce((n, el) => n + el.offsetWidth + gap, 0);
  let setW = measure(), x = 0, last = performance.now(), paused = false, anim = null;
  const copies = Math.min(14, Math.ceil((Math.max(innerWidth, 1920) + setW) / setW));
  for (let c = 1; c < copies; c++) base.forEach(el => { const k = el.cloneNode(true); k.setAttribute("aria-hidden", "true"); k.inert = true; track.appendChild(k); });
  const reduce = matchMedia("(prefers-reduced-motion: reduce)"), speed = 30;
  const pause = () => { paused = true; }, play = () => { paused = false; };
  const sec = view.parentElement;
  view.addEventListener("mouseenter", pause); view.addEventListener("mouseleave", play);
  sec.addEventListener("focusin", pause); sec.addEventListener("focusout", play);
  const onResize = () => { setW = measure(); };
  addEventListener("resize", onResize);
  pjOff = () => removeEventListener("resize", onResize);
  document.querySelectorAll(".pj-ctl .arr").forEach(b => b.onclick = () => {
    const step = base[0].offsetWidth + gap, now = performance.now();
    anim = { from: x, to: (anim ? anim.to : x) + (+b.dataset.d) * step, t0: now, d: 480 };
  });
  const loop = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (anim) {
      const p = Math.min(1, (now - anim.t0) / anim.d);
      x = anim.from + (anim.to - anim.from) * (1 - Math.pow(1 - p, 3));
      if (p >= 1) anim = null;
    } else if (!paused && !reduce.matches && !document.hidden) x += speed * dt;
    x = ((x % setW) + setW) % setW;
    track.style.transform = `translate3d(${-x}px,0,0)`;
    pjRaf = requestAnimationFrame(loop);
  };
  pjRaf = requestAnimationFrame(loop);
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
  bindForm(); initCarousel();
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
