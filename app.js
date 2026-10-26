(function () {
  "use strict";
  const CR = window.CREDITS || {};
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- language ---------- */
  const TABS = ["overview", "days", "places", "trains", "flights", "detours", "info"];
  const Q = new URLSearchParams(location.search);
  let LANG = Q.get("lang");
  if (LANG !== "tr" && LANG !== "en") {
    let saved = null; try { saved = localStorage.getItem("lang"); } catch (e) {}
    LANG = saved === "tr" || saved === "en" ? saved : ((navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en");
  }
  let U, T;
  function merge(base, over) {
    if (Array.isArray(base)) {
      if (!Array.isArray(over)) return base;
      if (base.length && typeof base[0] === "object") return base.map((b, i) => (over[i] ? merge(b, over[i]) : b));
      return over.slice();
    }
    if (base && typeof base === "object") {
      const out = {};
      Object.keys(base).forEach((k) => { out[k] = over && k in over ? merge(base[k], over[k]) : base[k]; });
      if (over) Object.keys(over).forEach((k) => { if (!(k in out)) out[k] = over[k]; });
      return out;
    }
    return over === undefined ? base : over;
  }
  function setLang(l) {
    LANG = l; U = window.I18N[l];
    T = l === "tr" ? merge(window.TRIP, window.TRIP_TR) : window.TRIP;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.documentElement.lang = U.htmlLang;
    document.title = U.title;
    const md = $('meta[name="description"]'); if (md) md.setAttribute("content", U.desc);
    $$("[data-i18n]").forEach((el) => { const v = el.dataset.i18n.split(".").reduce((o, k) => (o ? o[k] : undefined), U); if (typeof v === "string") el.textContent = v; });
    $("#shareBtn").title = U.b.shareTitle;
    $("#themeBtn").title = U.b.theme; $("#themeBtn").setAttribute("aria-label", U.b.theme);
    $("#langBtn").title = U.b.langTitle;
  }
  const ph = (s) => (LANG === "tr" && window.TRIP_TR.phrases[s]) || s;

  /* ---------- dates & formats ---------- */
  const D = (isoStr) => { const [y, m, d] = isoStr.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const add = (dt, n) => new Date(dt.getTime() + n * 864e5);
  const iso = (dt) => dt.toISOString().slice(0, 10);
  const fmt = (dt) => U.date(U.WD[dt.getUTCDay()], dt.getUTCDate(), U.MO[dt.getUTCMonth()]);
  const fullDate = (isoStr) => { const dt = D(isoStr); return `${dt.getUTCDate()} ${U.MO[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`; };
  const fmtShort = (dt) => `${dt.getUTCDate()} ${U.MO[dt.getUTCMonth()]}`;
  const yymmdd = (s) => s.slice(2, 4) + s.slice(5, 7) + s.slice(8, 10);
  const mins = (s) => { const m = /(\d+)h(\d+)?/.exec(s || ""); return m ? (+m[1]) * 60 + (+(m[2] || 0)) : 0; };
  const dur = (s) => String(s || "").replace(/(\d+)h(\d+)?/g, (_, h, m) => U.dur(+h, m ? +m : 0));
  const hm = (n) => U.hm(Math.floor(n / 60), n % 60);
  const EN_WD = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const wdays = (s) => LANG === "en" ? s : s.replace(/\b(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\b/g, (w) => U.WD[EN_WD[w]]);
  const num = (n) => Number(n).toLocaleString(U.locale);

  /* ---------- money ---------- */
  const FX = { eur: 55.67, cny: 7.457, when: "2026-10-23", live: false }; // ECB reference via Frankfurter
  const tl = (n) => "₺" + num(Math.round(n / 10) * 10);
  const fxWhen = () => fullDate(FX.when);
  const E = (e) => `€${num(e)}<small class="try">${U.approx} ${tl(e * FX.eur)}</small>`;
  const Y = (c) => `¥${num(c)}<small class="try">${U.approx} ${tl(c * FX.cny)}</small>`;
  const Ytxt = (c) => `¥${num(c)} (${U.approx} ${tl(c * FX.cny)})`;
  function loadFX() {
    if (!window.fetch) return;
    fetch("https://open.er-api.com/v6/latest/EUR").then((r) => r.json()).then((j) => {
      if (!j || j.result !== "success" || !j.rates || !j.rates.TRY || !j.rates.CNY) return;
      FX.eur = Math.round(j.rates.TRY * 100) / 100;
      FX.cny = Math.round((j.rates.TRY / j.rates.CNY) * 1000) / 1000;
      FX.when = new Date(j.time_last_update_unix * 1000).toISOString().slice(0, 10);
      FX.live = true;
      update();
    }).catch(() => {});
  }

  /* ---------- state ---------- */
  const S = { w: "A", dir: "fwd", via: "xian", zjj: false, zc: false, pax: 1 };
  let tab = "overview", placeFilter = "route";
  if (Q.get("w") === "B") S.w = "B";
  if (Q.get("dir") === "rev") S.dir = "rev";
  if (Q.get("via") === "wh") S.via = "wh";
  S.zjj = Q.get("zjj") === "1"; S.zc = Q.get("zc") === "1";
  { const p = parseInt(Q.get("pax"), 10); if (p > 0 && p < 20) S.pax = p; }
  { const h = location.hash.slice(1); if (TABS.includes(h)) tab = h; }
  function writeURL() {
    const q = new URLSearchParams();
    q.set("lang", LANG);
    if (S.w !== "A") q.set("w", S.w);
    if (S.dir !== "fwd") q.set("dir", S.dir);
    if (S.via !== "xian") q.set("via", S.via);
    if (S.zjj) q.set("zjj", "1");
    if (S.zc) q.set("zc", "1");
    if (S.pax !== 1) q.set("pax", S.pax);
    history.replaceState(null, "", location.pathname + "?" + q.toString() + "#" + tab);
  }

  /* ---------- model ---------- */
  const city = (code) => code === "XIAN" ? T.cities.MID_XIAN : code === "WH" ? T.cities.MID_WH : T.cities[code];
  const sn = (c) => c.short || c.name.split(" · ")[0];
  const SLUG = { CKG: "chongqing", XIAN: "xian", WH: "wuhan", BJ: "beijing", SH: "shanghai", ZJJ: "zhangjiajie", SQ: "shangqiu" };
  const AIR = { CKG: "CKG", TFU: "TFU", SH: "PVG", XIAN: "XIY", ZJJ: "DYG", IST: "IST" };
  const SKY = { CKG: "ckg", TFU: "tfu", SH: "csha", XIAN: "xiy", ZJJ: "dyg", IST: "ista" };

  function pathFor(a, b) {
    let p = T.paths[`${a}-${b}`], rev = false;
    if (!p) { p = T.paths[`${b}-${a}`]; rev = true; }
    if (p === "flight" || !p) {
      const A = city(a).ll, B = city(b).ll, out = [];
      for (let i = 0; i <= 24; i++) { const t = i / 24; out.push([A[0] + (B[0] - A[0]) * t + Math.sin(Math.PI * t) * 0.9, A[1] + (B[1] - A[1]) * t]); }
      return { pts: out, flight: true };
    }
    return { pts: rev ? p.slice().reverse() : p.slice(), flight: false };
  }

  function build() {
    const W = T.windows[S.w];
    let roles = ["CKG", S.zjj && "ZJJ", "MID", S.zc && "SQ", "BJ", "SH"].filter(Boolean);
    if (S.dir === "rev") roles = roles.reverse();
    const key = S.zjj && S.zc ? "both" : S.zjj ? "zjj" : S.zc ? "zc" : "none";
    const nights = T.nights[S.w][S.dir][key];
    const mid = S.via === "xian" ? "XIAN" : "WH";
    let cur = D(W.start);
    const stops = roles.map((r) => {
      const code = r === "MID" ? mid : r, n = nights[r];
      const st = { code, role: r, n, c: city(code), arrive: cur, depart: add(cur, n) };
      cur = st.depart; return st;
    });
    if (iso(cur) !== W.end) console.error("Night allocation does not reach end date", iso(cur), W.end);
    const legs = [];
    for (let i = 1; i < stops.length; i++) {
      const a = stops[i - 1].code, b = stops[i].code, k = `${a}-${b}`;
      legs.push({ k, a, b, d: T.legs[k], date: stops[i].arrive, path: pathFor(a, b), to: stops[i] });
    }
    const rail = legs.filter((l) => !l.d.flight), fl = legs.filter((l) => l.d.flight);
    return {
      W, stops, legs, key,
      railMin: rail.reduce((s, l) => s + mins(l.d.rec[5]), 0),
      railYen: rail.reduce((s, l) => s + (l.d.rec[6] || 0), 0),
      railYen1: rail.reduce((s, l) => s + (l.d.rec[7] || 0), 0),
      flightEur: fl.reduce((s, l) => s + (l.d.eur || 0), 0),
      nRail: rail.length, nFlight: fl.length
    };
  }
  function flightSet() {
    const F = T.flights[S.w], fwd = S.dir === "fwd";
    return { out: fwd ? F.outCKG : F.outSH, back: fwd ? F.backSH : F.backCKG, outTo: fwd ? U.flights.ckgTFU : U.flights.sh, backFrom: fwd ? U.flights.sh : U.flights.ckgTFU };
  }
  const minEur = (arr) => Math.min.apply(null, arr.map((o) => o.eur));

  /* ---------- links ---------- */
  // Google Flights search state is a base64 protobuf ("tfs"): legs (date, from, to), passengers, seat, trip type.
  function tfs(legs) {
    const vint = (n) => { const b = []; while (n > 127) { b.push((n & 127) | 128); n >>>= 7; } b.push(n); return b; };
    const str = (f, s) => { const u = Array.from(new TextEncoder().encode(s)); return [(f << 3) | 2].concat(vint(u.length), u); };
    const msg = (f, bytes) => [(f << 3) | 2].concat(vint(bytes.length), bytes);
    const int = (f, v) => vint((f << 3) | 0).concat(vint(v));
    let b = [];
    legs.forEach(([date, from, to]) => { b = b.concat(msg(3, str(2, date).concat(msg(13, str(2, from)), msg(14, str(2, to))))); });
    for (let i = 0; i < S.pax; i++) b = b.concat(int(8, 1));
    b = b.concat(int(9, 1), int(19, legs.length > 1 ? 3 : 2));
    return btoa(String.fromCharCode.apply(null, b));
  }
  const gfURL = (legs) => `https://www.google.com/travel/flights/search?tfs=${encodeURIComponent(tfs(legs))}&hl=${LANG}&curr=${LANG === "tr" ? "TRY" : "EUR"}`;
  const skyHost = () => (LANG === "tr" ? "https://www.skyscanner.com.tr" : "https://www.skyscanner.net");
  const sky1 = (from, to, date) => `${skyHost()}/transport/flights/${from}/${to}/${yymmdd(date)}/?adultsv2=${S.pax}&cabinclass=economy&rtn=0`;
  const skyMulti = (o1, d1, t1, o2, d2, t2) => `${skyHost()}/transport/d/${o1}/${t1}/${d1}/${o2}/${t2}/${d2}/?adultsv2=${S.pax}&cabinclass=economy`;
  const tripRoute = (a, b) => `https://${LANG === "tr" ? "tr" : "www"}.trip.com/trains/china/route/${SLUG[a]}-to-${SLUG[b]}/`;
  const A = (cls, href, label) => `<a class="lnk ${cls}" target="_blank" rel="noopener" href="${href}">${label}</a>`;
  const img = (k) => (CR[k] ? CR[k].file : `img/${k}.jpg`);
  const credit = (k) => CR[k] ? `${U.ov.photo}: ${esc(CR[k].author || "Wikimedia Commons")} · ${esc(CR[k].license)}` : "";

  /* ---------- builder / chrome ---------- */
  function syncBuilder() {
    $$(".seg[data-key]").forEach((seg) => { const k = seg.dataset.key; $$("button", seg).forEach((b) => b.classList.toggle("on", b.dataset.val === S[k])); });
    $$(".chip-t").forEach((b) => b.setAttribute("aria-pressed", S[b.dataset.key] ? "true" : "false"));
    $("#langBtn").textContent = U.b.lang;
  }
  $$(".seg[data-key]").forEach((seg) => seg.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    S[seg.dataset.key] = b.dataset.val; update();
  }));
  $$(".chip-t").forEach((b) => b.addEventListener("click", () => { S[b.dataset.key] = !S[b.dataset.key]; update(); }));
  $("#langBtn").addEventListener("click", () => { setLang(LANG === "tr" ? "en" : "tr"); $("#foot").innerHTML = footer(); update(); showTab(tab); });
  $("#shareBtn").addEventListener("click", async () => {
    writeURL();
    try { await navigator.clipboard.writeText(location.href); toast(U.toast.copied); }
    catch (e) { toast(U.toast.copy); }
  });
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("on"), 2400); }

  (function theme() {
    let saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (saved) document.documentElement.dataset.theme = saved;
    $("#themeBtn").addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      if (map) setTiles();
    });
  })();
  function isDark() { const t = document.documentElement.dataset.theme; return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; }

  function showTab(t) {
    tab = t;
    if (t !== "overview" && trainTimer) { cancelAnimationFrame(trainTimer); trainTimer = null; mapDirty = true; }
    $$(".view").forEach((v) => v.classList.toggle("on", v.id === "v-" + t));
    $$("#tabs a").forEach((a) => a.classList.toggle("on", a.dataset.tab === t));
    writeURL();
    if (t === "overview") setTimeout(() => { if (mapDirty || !map) { mapDirty = false; drawMap(lastR); } else { map.invalidateSize(); fitRoute(); } }, 30);
    const act = $(`#tabs a[data-tab="${t}"]`); if (act && act.scrollIntoView) act.scrollIntoView({ block: "nearest", inline: "center" });
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-tab]"); if (!a) return;
    e.preventDefault(); showTab(a.dataset.tab); window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (TABS.includes(h) && h !== tab) showTab(h); });

  /* ---------- views ---------- */
  const routeName = (R) => R.stops.map((s) => sn(s.c)).join(" → ");
  const gwLegs = (R) => { const g = new Set(R.W.goldenWeek); return R.legs.filter((l) => g.has(iso(l.date))); };

  function vOverview(R) {
    const first = R.stops[0], last = R.stops[R.stops.length - 1], W = R.W, fs = flightSet(), o = U.ov;
    const heroKey = S.zjj ? "avatar" : (S.via === "xian" ? "terracotta" : "crane");
    const names = R.stops.map((s, i) => i === 0 || i === R.stops.length - 1 ? esc(sn(s.c)) : `<em>${esc(sn(s.c))}</em>`).join(" → ");
    const flyFrom = minEur(fs.out) + minEur(fs.back);
    const longest = Math.max.apply(null, R.legs.filter((l) => !l.d.flight).map((l) => mins(l.d.rec[5])));
    const why = [];
    why.push(S.w === "A" ? o.gwA(esc(sn(first.c)), S.zjj && S.dir === "fwd", fmt(R.legs[0].date)) : o.gwB);
    why.push(o.rides(R.nRail, hm(R.railMin), hm(longest)));
    why.push(o.jaw(esc(sn(first.c)), esc(sn(last.c)), `€${num(flyFrom)} (${U.approx} ${tl(flyFrom * FX.eur)})`));
    why.push(S.via === "xian" ? o.xian : o.wh);
    if (R.nFlight) why.push(o.fl);
    return `
      <div class="hero">
        <div class="hero-txt">
          <p class="kick">${o.kick}</p>
          <h1>${names}</h1>
          <p>${esc(W.note)}</p>
          <span class="pill">${o.pillDates(fmt(D(W.start)), fmt(D(W.end)))}</span>
          <span class="pill">${o.pillFly(fmt(D(W.flyOut)))}</span>
          ${S.w === "A" ? `<span class="pill gw">${o.pillGW}</span>` : ""}
        </div>
        <div class="hero-img"><img src="${img(heroKey)}" alt="" loading="eager"><span class="cap">${credit(heroKey)}</span></div>
      </div>
      <div class="stats">
        <div class="stat"><b>15</b><span>${o.st.nights}</span></div>
        <div class="stat"><b>${R.stops.length}</b><span>${o.st.stops}</span></div>
        <div class="stat"><b>${R.nRail}${R.nFlight ? " + ✈️" : ""}</b><span>${o.st.rides}</span></div>
        <div class="stat"><b>${hm(R.railMin)}</b><span>${o.st.time}</span></div>
        <div class="stat"><b>${Y(R.railYen)}</b><span>${o.st.fares}${R.flightEur ? o.st.plusFlight("€" + R.flightEur) : ""}</span></div>
        <div class="stat"><b>~${E(flyFrom)}</b><span>${o.st.flights}</span></div>
      </div>
      ${ribbon(R)}
      <div class="grid2">
        <div>
          <div id="map" role="img" aria-label="${esc(routeName(R))}"></div>
          <div class="maplegend"><span><i></i>${o.legend.route}</span>${R.nFlight ? `<span><i class="f"></i>${o.legend.flight}</span>` : ""}<span><i class="g"></i>${o.legend.other}</span><span>${o.legend.tap}</span></div>
        </div>
        <div class="side-list">
          <div class="card"><h3>${o.whyT}</h3><ul class="why">${why.map((w) => `<li>${w}</li>`).join("")}</ul></div>
          <div class="card"><h3>${o.jumpT}</h3>
            <div class="links">
              <a class="lnk pri" href="#days" data-tab="days">${o.jump.days}</a>
              <a class="lnk" href="#trains" data-tab="trains">${o.jump.trains}</a>
              <a class="lnk" href="#flights" data-tab="flights">${o.jump.flights}</a>
              <a class="lnk" href="#detours" data-tab="detours">${o.jump.detours}</a>
              <a class="lnk" href="#info" data-tab="info">${esc(o.jump.info)}</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  function ribbon(R) {
    let h = `<div class="ribbon">`;
    R.stops.forEach((s, i) => {
      if (i > 0) { const l = R.legs[i - 1]; h += `<div class="rleg">${l.d.flight ? "✈️" : "🚄"} ${esc(dur(l.d.rec[5]))}</div>`; }
      h += `<div class="rstop" style="--c:${s.c.color}"><div class="dot">${s.c.emoji}</div><div class="nm">${esc(sn(s.c))}</div><div class="dt">${fmtShort(s.arrive)} – ${fmtShort(s.depart)}</div><span class="nt">${U.nights(s.n)}</span></div>`;
    });
    return h + `</div>`;
  }

  function miniTicket(l) {
    const r = l.d.rec;
    const price = l.d.flight ? `~€${l.d.eur} (${U.approx} ${tl(l.d.eur * FX.eur)})` : `${Ytxt(r[6])} ${U.days.second}`;
    return `<div class="mini-ticket"><span class="no">${esc(r[0])}</span><span>${esc(r[1])} <b>${esc(r[2])}</b> → ${esc(r[3])} <b>${esc(r[4])}</b></span><span class="mut">${esc(dur(r[5]))} · ${price}</span></div>`;
  }

  function vDays(R) {
    const W = R.W, gw = new Set(W.goldenWeek), last = R.stops[R.stops.length - 1], u = U.days;
    let h = `<div class="sh"><div><h2>${u.h}</h2><p>${u.intro(fmt(D(W.start)), fmt(D(W.end)), esc(routeName(R)))}</p></div></div>`;
    R.stops.forEach((s, i) => {
      const plan = T.days[s.code];
      h += `<div class="citygrp" style="--c:${s.c.color}"><div class="citygrp-h"><img src="${img(s.c.img)}" alt=""><div><h3>${s.c.emoji} ${esc(s.c.name)}<span class="zh">${esc(s.c.zh)}</span></h3><div class="mut">${fmt(s.arrive)} – ${fmt(s.depart)} · ${U.nights(s.n)} · ${u.stay}: ${esc(s.c.stay)}</div></div></div>`;
      let tipShown = false;
      for (let k = 0; k < s.n; k++) {
        const dt = add(s.arrive, k), isGW = gw.has(iso(dt));
        let cls = "day", body = "", badges = isGW ? `<span class="badge gw">${u.gw}</span>` : "";
        if (k === 0 && i === 0) {
          cls += " fly";
          badges = `<span class="badge fl">${u.arrive}</span>` + badges;
          body = `<div class="t">${esc(u.arriveIn(sn(s.c)))}</div><p>${s.code === "CKG" ? u.howCKG : u.howSH}</p><p>${esc(plan.a)}</p>`;
        } else if (k === 0) {
          const l = R.legs[i - 1];
          cls += " travel";
          badges = `<span class="badge tr">${l.d.flight ? u.fly : u.train}</span>` + badges;
          const late = !l.d.flight && /^(1[89]|2\d)/.test(l.d.rec[4]);
          body = `<div class="t">${esc(sn(R.stops[i - 1].c))} → ${esc(sn(s.c))}</div>${miniTicket(l)}<p>${late ? (s.code === "ZJJ" ? u.lateZJJ : u.late) : esc(plan.a)}</p>`;
        } else {
          body = `<div class="t">${esc(sn(s.c))}</div><p>${esc(plan.d[(k - 1) % plan.d.length])}</p>`;
        }
        if (isGW && plan.gw && !tipShown) { body += `<p class="tip">💡 ${esc(plan.gw)}</p>`; tipShown = true; }
        h += `<div class="${cls}"><div class="d"><b>${dt.getUTCDate()} ${U.MO[dt.getUTCMonth()]}</b><span>${U.WD[dt.getUTCDay()]}</span></div><div>${badges}${body}</div></div>`;
      }
      h += `</div>`;
    });
    const end = D(W.end);
    h += `<div class="citygrp" style="--c:var(--violet)"><div class="day fly"><div class="d"><b>${end.getUTCDate()} ${U.MO[end.getUTCMonth()]}</b><span>${U.WD[end.getUTCDay()]}</span></div><div><span class="badge fl">${u.home}</span><div class="t">${esc(sn(last.c))} → ${u.toIst}</div><p>${last.code === "SH" ? u.homeSH : u.homeCKG}</p></div></div></div>`;
    return h;
  }

  function vPlaces(R) {
    const onRoute = new Set(R.stops.map((s) => s.code)), u = U.places;
    const order = ["CKG", "XIAN", "WH", "ZJJ", "SQ", "BJ", "SH"];
    const btn = (v, label) => `<button data-pf="${v}" class="${placeFilter === v ? "on" : ""}">${label}</button>`;
    let h = `<div class="sh"><div><h2>${u.h}</h2><p>${u.intro}</p></div></div>
      <div class="filters">${btn("route", u.route)}${btn("all", u.all)}${order.map((c) => btn(c, `${city(c).emoji} ${esc(sn(city(c)))}`)).join("")}</div><div class="pgrid">`;
    T.places.filter((p) => placeFilter === "all" ? true : placeFilter === "route" ? onRoute.has(p.c) : p.c === placeFilter)
      .sort((a, b) => order.indexOf(a.c) - order.indexOf(b.c))
      .forEach((p) => {
        const c = city(p.c), off = !onRoute.has(p.c);
        h += `<article class="pcard${off && placeFilter === "all" ? " dim" : ""}" style="--c:${c.color}"><div class="ph"><img src="${img(p.img)}" alt="${esc(p.t)}" loading="lazy"><span class="ct">${c.emoji} ${esc(sn(c))}</span>${off ? `<span class="off">${u.optional}</span>` : ""}</div>
          <div class="bd"><h4>${esc(p.t)}<span class="zh">${esc(p.zh)}</span></h4><p>${esc(p.d)}</p><div class="tm">⏱ ${esc(p.time)}</div></div></article>`;
      });
    return h + `</div>`;
  }

  const altFare = (v) => v == null ? "—" : typeof v === "number" ? Y(v) : "~" + Y(parseInt(String(v).replace(/\D/g, ""), 10));
  const altName = (s) => String(s).replace(/^Rail:/, U.trains.rail);

  function vTrains(R) {
    const u = U.trains, th = u.th;
    const g = gwLegs(R);
    const gwTxt = S.w === "A" ? (g.length ? u.gwLeg(fmt(g[0].date), esc(g[0].d.rec[0]), fmt(add(g[0].date, -15))) : u.gwNone) : "";
    let h = `<div class="sh"><div><h2>${u.h}</h2><p>${u.intro}</p></div></div>
      <div class="callout warn"><b>${u.warnT}</b>${u.warn(gwTxt)}</div>
      <div class="card" style="margin-bottom:18px"><table class="alts" style="margin:0"><tr><th>${th.date}</th><th>${th.ride}</th><th>${th.train}</th><th class="hide-s">${th.time}</th><th>${th.second}</th></tr>
      ${R.legs.map((l) => `<tr><td>${fmt(l.date)}</td><td>${esc(sn(city(l.a)))} → ${esc(sn(city(l.b)))}</td><td><b>${esc(l.d.rec[0])}</b></td><td class="hide-s">${esc(l.d.rec[2])}–${esc(l.d.rec[4])} (${esc(dur(l.d.rec[5]))})</td><td>${l.d.flight ? "~" + E(l.d.eur) : Y(l.d.rec[6])}</td></tr>`).join("")}
      <tr><td colspan="2"><b>${u.total}</b></td><td></td><td class="hide-s"><b>${hm(R.railMin)}</b> ${u.onTrains}</td><td><b>${Y(R.railYen)}</b>${R.flightEur ? ` + ${E(R.flightEur)}` : ""}</td></tr></table>
      <p class="note-in">${u.first(Ytxt(R.railYen1))} ${U.tryNote(FX.eur, FX.cny, fxWhen(), FX.live)}</p></div>`;
    R.legs.forEach((l, i) => {
      const r = l.d.rec, c = l.to.c;
      const links = l.d.flight
        ? A("gf", gfURL([[iso(l.date), AIR[l.a], AIR[l.b]]]), "Google Flights") + A("sky", sky1(SKY[l.a], SKY[l.b], iso(l.date)), "Skyscanner") + A("", "https://www.trip.com/flights/", u.tripFl)
        : A("pri", tripRoute(l.a, l.b), u.book) + A("", "https://www.12306.cn/en/index.html", u.official);
      h += `<div class="ticket" style="--c:${c.color}"><div class="main">
        <div class="hd"><span class="num">${u.ride(i + 1)}</span><span class="date">${fmt(l.date)}</span><span class="mut">· ${l.d.flight ? u.flight : u.perDay(l.d.daily)} · ${l.d.flight ? u.anyTime : u.opens(fmt(add(l.date, -15)))}</span></div>
        <div class="route"><div class="st"><b>${esc(r[2])}</b><span>${esc(r[1])}</span></div><div class="mid"><span class="tn">${esc(r[0])}</span><div class="line"></div>${esc(dur(r[5]))}</div><div class="st r"><b>${esc(r[4]) || "—"}</b><span>${esc(r[3])}</span></div></div>
        <p class="note-in">${esc(l.d.note)}</p>
        <table class="alts"><tr><th>${th.also}</th><th>${th.from}</th><th class="hide-s">${th.to}</th><th>${th.time}</th><th>${th.fare}</th></tr>
        ${l.d.alts.map((a) => `<tr><td><b>${esc(altName(a[0]))}</b></td><td>${esc(a[1])} ${esc(a[2])}</td><td class="hide-s">${esc(a[3])} ${esc(a[4])}</td><td>${esc(dur(a[5]))}</td><td>${altFare(a[6])}</td></tr>`).join("")}</table>
        <div class="links">${links}</div></div>
        <div class="stub"><div class="price"><b>${l.d.flight ? "~" + E(l.d.eur) : Y(r[6])}</b><span>${l.d.flight ? u.econ : u.pp2}</span></div>${r[7] ? `<div class="price"><b style="font-size:17px">${Y(r[7])}</b><span>${u.first1}</span></div>` : ""}</div></div>`;
    });
    h += `<div class="card"><h3>${u.stations}</h3><ul class="why">${R.stops.map((s) => `<li><b>${esc(s.c.name)}:</b> ${esc(s.c.stations)}</li>`).join("")}</ul></div>`;
    return h;
  }

  function fOpts(list) {
    const u = U.flights;
    return list.map((o) => `<div class="fopt"><div class="al">${esc(o.a)}</div><div class="pr">${E(o.eur)}</div><div class="tt">${esc(wdays(o.t))} <span class="mut">· ${esc(dur(o.dur))}</span></div><div class="via">${esc(ph(o.via))}${o.note ? " · " + esc(ph(o.note)) : ""}</div><div class="tags">${o.pick ? `<span class="tag pick">${u.pick}</span>` : ""}${o.cheap ? `<span class="tag cheap">${u.cheap}</span>` : ""}</div></div>`).join("");
  }

  function vFlights(R) {
    const W = R.W, fs = flightSet(), fwd = S.dir === "fwd", u = U.flights;
    const out = W.flyOut, back = W.flyBack;
    const pick = (l) => l.find((o) => o.pick) || l[0];
    const sumPick = pick(fs.out).eur + pick(fs.back).eur, sumCheap = minEur(fs.out) + minEur(fs.back);
    const n = (k) => sn(city(k));
    const cd = LANG === "tr" ? "Çengdu" : "Chengdu";
    const outLinks = fwd
      ? A("gf", gfURL([[out, "IST", AIR.CKG]]), `Google: IST → ${n("CKG")}`) + A("gf", gfURL([[out, "IST", AIR.TFU]]), `Google: IST → ${cd}`) + A("sky", sky1(SKY.IST, SKY.CKG, out), "Skyscanner → CKG") + A("sky", sky1(SKY.IST, SKY.TFU, out), "Skyscanner → TFU")
      : A("gf", gfURL([[out, "IST", AIR.SH]]), `Google: IST → ${n("SH")}`) + A("sky", sky1(SKY.IST, SKY.SH, out), `Skyscanner → ${n("SH")}`);
    const backLinks = fwd
      ? A("gf", gfURL([[back, AIR.SH, "IST"]]), `Google: ${n("SH")} → IST`) + A("sky", sky1(SKY.SH, SKY.IST, back), `Skyscanner: ${n("SH")} → IST`)
      : A("gf", gfURL([[back, AIR.CKG, "IST"]]), `Google: ${n("CKG")} → IST`) + A("gf", gfURL([[back, AIR.TFU, "IST"]]), `Google: ${cd} → IST`) + A("sky", sky1(SKY.CKG, SKY.IST, back), "Skyscanner: CKG → IST") + A("sky", sky1(SKY.TFU, SKY.IST, back), "Skyscanner: TFU → IST");
    const jaws = fwd
      ? [[AIR.CKG, SKY.CKG, n("CKG"), AIR.SH, SKY.SH, n("SH")], [AIR.TFU, SKY.TFU, cd, AIR.SH, SKY.SH, n("SH")]]
      : [[AIR.SH, SKY.SH, n("SH"), AIR.CKG, SKY.CKG, n("CKG")], [AIR.SH, SKY.SH, n("SH"), AIR.TFU, SKY.TFU, cd]];
    const jawRows = jaws.map(([ga, sa, na, gb, sb, nb]) => {
      const label = `IST → ${na} · ${nb} → IST`;
      return `<div class="jaw"><b>${esc(label)}</b><div class="links">${A("gf", gfURL([[out, "IST", ga], [back, gb, "IST"]]), u.gfMulti)}${A("sky", skyMulti(SKY.IST, sa, out, sb, SKY.IST, back), u.skyMulti)}</div></div>`;
    }).join("");
    const group = S.pax > 1 ? u.group(S.pax, `€${num(sumPick * S.pax)} (${U.approx} ${tl(sumPick * S.pax * FX.eur)})`) : "";
    return `<div class="sh"><div><h2>${u.h}</h2><p>${u.intro(fmt(D(out)), fmt(D(W.start)), fmt(D(back)), fullDate("2026-10-26"))}</p></div>
      <div class="ctl"><span class="ctl-lbl">${u.pax}</span><div class="seg"><button data-pax="-1" aria-label="−">−</button><button class="on" disabled style="opacity:1">${S.pax}</button><button data-pax="1" aria-label="+">+</button></div></div></div>
      <div class="callout ok"><b>${fwd ? u.tipFwdT : u.tipRevT}</b>${fwd ? u.tipFwd : u.tipRev}</div>
      <div class="fgrid">
        <div class="card fcard"><h3>${u.outT(fmt(D(out)), esc(fs.outTo))}</h3>${fOpts(fs.out)}<div class="links">${outLinks}</div></div>
        <div class="card fcard"><h3>${u.backT(fmt(D(back)), esc(fs.backFrom))}</h3>${fOpts(fs.back)}<div class="links">${backLinks}</div></div>
      </div>
      <div class="card" style="margin-top:18px"><h3>${u.jawT}</h3>
        <p>${u.jaw(`€${num(sumPick)} (${U.approx} ${tl(sumPick * FX.eur)})`, `€${num(sumCheap)} (${U.approx} ${tl(sumCheap * FX.eur)})`, group)}</p>
        ${jawRows}
        <p class="note-in">${u.watch}</p>
        <p class="note-in">${U.tryNote(FX.eur, FX.cny, fxWhen(), FX.live)}</p></div>`;
  }

  function vDetours() {
    const base = T.nights[S.w][S.dir], u = U.det;
    const diff = (withK, withoutK) => {
      const a = base[withK], b = base[withoutK], out = [];
      Object.keys(b).forEach((k) => { const d = (a[k] || 0) - b[k]; if (d) out.push(`${sn(city(k === "MID" ? (S.via === "xian" ? "XIAN" : "WH") : k))} ${d > 0 ? "+" : "−"}${Math.abs(d)}`); });
      return out.join(", ");
    };
    const withZ = S.zc ? "both" : "zjj", noZ = S.zc ? "zc" : "none";
    const withC = S.zjj ? "both" : "zc", noC = S.zjj ? "zjj" : "none";
    const xian = S.via === "xian", fwd = S.dir === "fwd";
    const dz = diff(withZ, noZ), dc = diff(withC, noC);
    return `<div class="sh"><div><h2>${u.h}</h2><p>${u.intro}</p></div></div>
      <div class="dcard"><div class="imgs"><img src="${img("avatar")}" alt="" loading="lazy"><img src="${img("bailong")}" alt="" loading="lazy"><img src="${img("tianmen")}" alt="" loading="lazy"></div>
        <div class="bd"><span class="badge tr" style="--c:var(--green)">${u.zBadge}</span><h3>${u.zT}</h3><p>${u.zP}</p>
          <ul><li><b>${u.get}</b> ${fwd ? u.zHowFwd(xian) : u.zHowRev(xian)}</li>
          <li><b>${u.do}</b> ${u.zDo}</li>
          <li><b>${u.stay}</b> ${u.zStay}</li>
          <li><b>${u.costs}</b> ${dz ? dz + " " + u.nightsWord : u.none}${S.w === "A" && fwd ? u.zGW : ""}.</li></ul>
          <button class="addbtn zjj ${S.zjj ? "on" : ""}" data-toggle="zjj">${S.zjj ? u.added : u.add}</button></div></div>
      <div class="dcard"><div class="imgs"><img src="${img("labdiamond")}" alt="" loading="lazy"><img src="${img("zhecheng")}" alt="" loading="lazy"><img src="${img("shangqiu")}" alt="" loading="lazy"></div>
        <div class="bd"><span class="badge tr" style="--c:var(--cyan)">${u.cBadge}</span><h3>${u.cT}</h3><p>${u.cP}</p>
          <ul><li><b>${u.get}</b> ${fwd ? u.cHowFwd(xian) : u.cHowRev(xian)}</li>
          <li><b>${u.do}</b> ${u.cDo}</li>
          <li><b>${u.tips}</b> ${u.cTips}</li>
          <li><b>${u.costs}</b> ${dc ? dc + " " + u.nightsWord : u.none}${u.cCar}.</li></ul>
          <button class="addbtn zc ${S.zc ? "on" : ""}" data-toggle="zc">${S.zc ? u.added : u.add}</button></div></div>
      <div class="callout info"><b>${u.alsoT}</b>${u.also}</div>`;
  }

  function vInfo(R) {
    const u = U.info, li = (arr) => arr.map((x) => `<li>${x}</li>`).join("");
    const temps = R.stops.map((s) => `<tr><td>${s.c.emoji} ${esc(s.c.name)}</td><td>~${s.c.temp}°C</td></tr>`).join("");
    const g = gwLegs(R);
    const gwPlan = (S.w === "A" ? (g.length ? u.gwLeg(fmt(g[0].date)) : u.gwNone) : u.gwB) + u.gwSat;
    return `<div class="sh"><div><h2>${u.h}</h2><p>${u.intro}</p></div></div>
      <div class="igrid">
        <div class="card"><h3>${u.visaT}</h3><ul>${li(u.visa)}</ul></div>
        <div class="card"><h3>${u.gwT}</h3><ul>${li(u.gw.concat([gwPlan]))}</ul></div>
        <div class="card"><h3>${u.bookT}</h3><ul>${li(u.book)}</ul></div>
        <div class="card"><h3>${u.moneyT}</h3><ul>${li(u.money)}</ul><p class="note-in">${u.fx(FX.eur, FX.cny, fxWhen(), FX.live)}</p></div>
        <div class="card"><h3>${u.netT}</h3><ul>${li(u.net)}</ul></div>
        <div class="card"><h3>${u.wxT}</h3><table class="wx">${temps}</table><p class="note-in">${u.wx}</p></div>
        <div class="card"><h3>${u.aheadT}</h3><ul>${li(u.ahead)}</ul></div>
        <div class="card"><h3>${u.partyT}</h3><ul>${li(u.party)}</ul></div>
      </div>`;
  }

  function footer() {
    const cr = Object.entries(CR).map(([k, v]) => `<div><a href="${esc(v.src)}" target="_blank" rel="noopener">${esc(k)}</a>: ${esc(v.author || "Wikimedia Commons")} · ${esc(v.license)}</div>`).join("");
    return `<div>${U.foot(fullDate("2026-10-26"))}</div><details><summary>${U.credits}</summary><div class="cr">${cr}</div></details>`;
  }

  /* ---------- map ---------- */
  let map = null, tiles = null, layer = null, trainTimer = null, routeBounds = null, mapDirty = false, lastR = null;
  function setTiles() {
    if (tiles) map.removeLayer(tiles);
    const Eb = "https://server.arcgisonline.com/ArcGIS/rest/services/", attr = "Tiles © Esri, HERE, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors";
    tiles = isDark()
      ? L.layerGroup([L.tileLayer(Eb + "Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", { maxZoom: 12, attribution: attr }), L.tileLayer(Eb + "Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", { maxZoom: 12 })])
      : L.tileLayer(Eb + "World_Topo_Map/MapServer/tile/{z}/{y}/{x}", { maxZoom: 12, attribution: attr });
    tiles.addTo(map);
  }
  function fitRoute() { if (map && routeBounds) map.fitBounds(routeBounds, { paddingTopLeft: [30, 40], paddingBottomRight: [130, 30] }); }
  function drawMap(R) {
    const el = $("#map"); if (!el || !R) return;
    if (typeof L === "undefined") { el.innerHTML = `<div style="padding:24px" class="mut">${U.ov.noMap}</div>`; return; }
    if (map) { map.remove(); map = null; tiles = null; }
    if (trainTimer) { cancelAnimationFrame(trainTimer); trainTimer = null; }
    map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25 });
    setTiles();
    layer = L.layerGroup().addTo(map);
    const used = new Set(R.legs.map((l) => [l.a, l.b].sort().join("-")));
    Object.keys(T.paths).forEach((k) => {
      const [a, b] = k.split("-"); if (used.has([a, b].sort().join("-")) || T.paths[k] === "flight") return;
      L.polyline(T.paths[k], { color: "#b9b2a6", weight: 3, opacity: .7, dashArray: "6 7" }).addTo(layer)
        .bindTooltip(`${esc(sn(city(a)))} – ${esc(sn(city(b)))} (${U.ov.other})`, { sticky: true });
    });
    const all = [];
    R.legs.forEach((l) => {
      if (!l.path.flight) L.polyline(l.path.pts, { color: "#fff", weight: 9, opacity: .9 }).addTo(layer);
      L.polyline(l.path.pts, { color: l.path.flight ? "#7c3aed" : l.to.c.color, weight: 5, opacity: 1, dashArray: l.path.flight ? "2 9" : null, lineCap: "round" }).addTo(layer)
        .bindTooltip(`${esc(l.d.rec[0])} · ${esc(dur(l.d.rec[5]))} · ${fmt(l.date)}`, { sticky: true });
      all.push.apply(all, l.path.pts);
    });
    T.waypoints.forEach((w) => {
      L.marker(w.ll, { icon: L.divIcon({ className: "", html: `<div class="wp"></div>`, iconSize: [10, 10], iconAnchor: [5, 5] }) }).addTo(layer)
        .bindPopup(`<div class="pop"><div><b>${esc(w.n)}</b> <span class="zh">${esc(w.zh)}</span><br>${esc(w.t)}</div></div>`);
    });
    R.stops.forEach((s, i) => {
      const html = `<div class="mk"><span class="n" style="background:${s.c.color}">${i + 1}</span><span class="l">${s.c.emoji} ${esc(sn(s.c))} <small>${s.n}${U.nShort}</small></span></div>`;
      L.marker(s.c.ll, { icon: L.divIcon({ className: "", html, iconSize: [0, 0] }), zIndexOffset: 1000 }).addTo(layer)
        .bindPopup(`<div class="pop"><img src="${img(s.c.img)}" alt=""><div><b>${esc(s.c.name)}</b> <span class="zh">${esc(s.c.zh)}</span><br><span class="mut">${fmt(s.arrive)} – ${fmt(s.depart)} · ${U.nights(s.n)}</span><br>${esc(s.c.blurb)}</div></div>`, { maxWidth: 260 });
    });
    routeBounds = L.latLngBounds(all);
    fitRoute();
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && all.length > 1) {
      const seg = [], cum = [0];
      for (let i = 1; i < all.length; i++) { const d = Math.hypot(all[i][0] - all[i - 1][0], all[i][1] - all[i - 1][1]); seg.push(d); cum.push(cum[i - 1] + d); }
      const total = cum[cum.length - 1];
      const tm = L.marker(all[0], { icon: L.divIcon({ className: "", html: `<div class="trainmk">🚄</div>`, iconSize: [0, 0] }), interactive: false, zIndexOffset: 2000 }).addTo(layer);
      const t0 = performance.now(), period = 22000;
      const step = (now) => {
        const p = ((now - t0) % period) / period * total;
        let i = 1; while (i < cum.length && cum[i] < p) i++;
        const f = seg[i - 1] ? (p - cum[i - 1]) / seg[i - 1] : 0, a = all[i - 1], b = all[Math.min(i, all.length - 1)];
        tm.setLatLng([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
        trainTimer = requestAnimationFrame(step);
      };
      trainTimer = requestAnimationFrame(step);
    }
  }

  /* ---------- render ---------- */
  function update() {
    syncBuilder(); writeURL();
    const R = build();
    $("#v-overview").innerHTML = vOverview(R);
    $("#v-days").innerHTML = vDays(R);
    $("#v-places").innerHTML = vPlaces(R);
    $("#v-trains").innerHTML = vTrains(R);
    $("#v-flights").innerHTML = vFlights(R);
    $("#v-detours").innerHTML = vDetours(R);
    $("#v-info").innerHTML = vInfo(R);
    lastR = R;
    if (tab === "overview") drawMap(R); else mapDirty = true;
  }
  document.addEventListener("click", (e) => {
    const pf = e.target.closest("[data-pf]");
    if (pf) { placeFilter = pf.dataset.pf; $("#v-places").innerHTML = vPlaces(build()); return; }
    const tg = e.target.closest("[data-toggle]");
    if (tg) { S[tg.dataset.toggle] = !S[tg.dataset.toggle]; update(); toast(S[tg.dataset.toggle] ? U.toast.added : U.toast.removed); return; }
    const px = e.target.closest("[data-pax]");
    if (px) { S.pax = Math.max(1, Math.min(19, S.pax + Number(px.dataset.pax))); writeURL(); $("#v-flights").innerHTML = vFlights(build()); }
  });

  setLang(LANG);
  $("#foot").innerHTML = footer();
  update();
  showTab(tab);
  loadFX();
})();
