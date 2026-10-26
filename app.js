(function () {
  "use strict";
  const T = window.TRIP, CR = window.CREDITS || {};
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- dates ---------- */
  const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const D = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const add = (dt, n) => new Date(dt.getTime() + n * 864e5);
  const iso = (dt) => dt.toISOString().slice(0, 10);
  const fmt = (dt) => `${WD[dt.getUTCDay()]} ${dt.getUTCDate()} ${MO[dt.getUTCMonth()]}`;
  const fmtShort = (dt) => `${dt.getUTCDate()} ${MO[dt.getUTCMonth()]}`;
  const yymmdd = (s) => s.slice(2, 4) + s.slice(5, 7) + s.slice(8, 10);
  const mins = (s) => { const m = /(\d+)h(\d+)?/.exec(s || ""); return m ? (+m[1]) * 60 + (+(m[2] || 0)) : 0; };
  const hm = (n) => `${Math.floor(n / 60)}h ${String(n % 60).padStart(2, "0")}`;
  const yen = (n) => "¥" + Number(n).toLocaleString("en-US");

  /* ---------- state ---------- */
  const DEF = { w: "A", dir: "fwd", via: "xian", zjj: false, zc: false, pax: 1 };
  const S = Object.assign({}, DEF);
  const TABS = ["overview", "days", "places", "trains", "flights", "detours", "info"];
  let tab = "overview", placeFilter = "route";
  (function readURL() {
    const q = new URLSearchParams(location.search);
    if (q.get("w") === "B") S.w = "B";
    if (q.get("dir") === "rev") S.dir = "rev";
    if (q.get("via") === "wh") S.via = "wh";
    S.zjj = q.get("zjj") === "1"; S.zc = q.get("zc") === "1";
    const p = parseInt(q.get("pax"), 10); if (p > 0 && p < 20) S.pax = p;
    const h = location.hash.slice(1); if (TABS.includes(h)) tab = h;
  })();
  function writeURL() {
    const q = new URLSearchParams();
    if (S.w !== "A") q.set("w", S.w);
    if (S.dir !== "fwd") q.set("dir", S.dir);
    if (S.via !== "xian") q.set("via", S.via);
    if (S.zjj) q.set("zjj", "1");
    if (S.zc) q.set("zc", "1");
    if (S.pax !== 1) q.set("pax", S.pax);
    const qs = q.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + "#" + tab);
  }

  /* ---------- model ---------- */
  const sn = (c) => c.short || c.name.split(" · ")[0];
  const city = (code) => code === "XIAN" ? T.cities.MID_XIAN : code === "WH" ? T.cities.MID_WH : T.cities[code];
  const SLUG = { CKG: "chongqing", XIAN: "xian", WH: "wuhan", BJ: "beijing", SH: "shanghai", ZJJ: "zhangjiajie", SQ: "shangqiu" };
  const SKY = { CKG: "ckg", XIAN: "xiy", WH: "wuh", BJ: "bjsa", SH: "csha", ZJJ: "dyg", SQ: "" };

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
    const rail = legs.filter((l) => !l.d.flight);
    const flightLegs = legs.filter((l) => l.d.flight);
    return {
      W, stops, legs, key,
      railMin: rail.reduce((s, l) => s + mins(l.d.rec[5]), 0),
      railYen: rail.reduce((s, l) => s + (l.d.rec[6] || 0), 0),
      railYen1: rail.reduce((s, l) => s + (l.d.rec[7] || 0), 0),
      flightEur: flightLegs.reduce((s, l) => s + (l.d.eur || 0), 0),
      nRail: rail.length, nFlight: flightLegs.length
    };
  }

  function flightSet(R) {
    const F = T.flights[S.w];
    const fwd = S.dir === "fwd";
    return { out: fwd ? F.outCKG : F.outSH, back: fwd ? F.backSH : F.backCKG, outTo: fwd ? "Chongqing / Chengdu" : "Shanghai", backFrom: fwd ? "Shanghai" : "Chongqing / Chengdu" };
  }
  const minEur = (arr) => Math.min.apply(null, arr.map((o) => o.eur));

  /* ---------- links ---------- */
  const gf = (to, from, date) => `https://www.google.com/travel/flights?q=${encodeURIComponent(`Flights to ${to} from ${from} on ${date} one way`)}&curr=EUR&hl=en`;
  const sky1 = (from, to, date) => `https://www.skyscanner.com.tr/transport/flights/${from}/${to}/${yymmdd(date)}/?adultsv2=${S.pax}&cabinclass=economy&rtn=0`;
  const skyMulti = (o1, d1, t1, o2, d2, t2) => `https://www.skyscanner.com.tr/transport/d/${o1}/${t1}/${d1}/${o2}/${t2}/${d2}/?adultsv2=${S.pax}&cabinclass=economy`;
  const tripRoute = (a, b) => `https://www.trip.com/trains/china/route/${SLUG[a]}-to-${SLUG[b]}/`;
  const img = (k) => (CR[k] ? CR[k].file : `img/${k}.jpg`);
  const credit = (k) => CR[k] ? `Photo: ${esc(CR[k].author || "Wikimedia Commons")} · ${esc(CR[k].license)}` : "";

  /* ---------- UI: builder ---------- */
  function syncBuilder() {
    $$(".seg").forEach((seg) => { const k = seg.dataset.key; $$("button", seg).forEach((b) => b.classList.toggle("on", b.dataset.val === S[k])); });
    $$(".chip-t").forEach((b) => b.setAttribute("aria-pressed", S[b.dataset.key] ? "true" : "false"));
  }
  $$(".seg").forEach((seg) => seg.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    S[seg.dataset.key] = b.dataset.val; update();
  }));
  $$(".chip-t").forEach((b) => b.addEventListener("click", () => { S[b.dataset.key] = !S[b.dataset.key]; update(); }));
  $("#shareBtn").addEventListener("click", async () => {
    writeURL();
    try { await navigator.clipboard.writeText(location.href); toast("Link copied: it opens this exact plan"); }
    catch (e) { toast("Copy the address bar to share this plan"); }
  });
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("on"), 2400); }

  /* theme */
  (function theme() {
    let saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (saved) document.documentElement.dataset.theme = saved;
    $("#themeBtn").addEventListener("click", () => {
      const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      const next = dark ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      if (map) setTiles();
    });
  })();
  const isDark = () => { const t = document.documentElement.dataset.theme; return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; };

  /* tabs */
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
  function routeName(R) { return R.stops.map((s) => sn(s.c)).join(" → "); }

  function vOverview(R) {
    const first = R.stops[0], last = R.stops[R.stops.length - 1], W = R.W;
    const fs = flightSet(R);
    const heroKey = S.zjj ? "avatar" : (S.via === "xian" ? "terracotta" : "crane");
    const names = R.stops.map((s, i) => i === 0 || i === R.stops.length - 1 ? esc(sn(s.c)) : `<em>${esc(sn(s.c))}</em>`).join(" → ");
    const flyFrom = minEur(fs.out) + minEur(fs.back);
    const why = [];
    if (S.w === "A") why.push(`<b>Golden Week is handled.</b> You land on the first day of the 1–5 May holiday and stay in ${esc(sn(first.c))} until it ends, so you never queue for a holiday train. ${S.zjj && S.dir === "fwd" ? "The move to Zhangjiajie is on 5 May, the last holiday day, heading away from the big city while everyone else heads home. The park itself is on the 6th, once the crowds have left." : `The first train is on ${fmt(R.legs[0].date)}.`}`);
    else why.push("<b>No holiday crowds.</b> Golden Week is over by 8 May, so trains, sights and hotels are back to normal levels.");
    why.push(`<b>${R.nRail} train rides, ${hm(R.railMin)} on board in total.</b> The longest is ${hm(Math.max.apply(null, R.legs.filter((l) => !l.d.flight).map((l) => mins(l.d.rec[5]))))}, and every ride is in daylight.`);
    why.push(`<b>Open-jaw flights:</b> fly into ${esc(sn(first.c))} and home from ${esc(sn(last.c))}. No backtracking, and fares from about €${flyFrom} per person for both flights.`);
    if (S.via === "xian") why.push("<b>Xi'an</b> means the Terracotta Army and the city wall bike ride. Switch to <b>Wuhan</b> for shorter rides (Chongqing–Wuhan is now under 4 h).");
    else why.push("<b>Wuhan</b> gives the shortest rides on the whole route. Switch to <b>Xi'an</b> if the Terracotta Army is a must.");
    if (R.nFlight) why.push("<b>One short domestic flight</b> links Zhangjiajie and Xi'an, because there's no direct rail line between them.");

    return `
      <div class="hero">
        <div class="hero-txt">
          <p class="kick">Two weeks · 15 nights · high-speed rail</p>
          <h1>${names}</h1>
          <p>${esc(W.note)}</p>
          <span class="pill">📅 ${fmt(D(W.start))} – ${fmt(D(W.end))} 2027</span>
          <span class="pill">✈️ Leave Istanbul ${fmt(D(W.flyOut))} evening</span>
          ${S.w === "A" ? `<span class="pill gw">🎏 Golden Week 1–5 May</span>` : ""}
        </div>
        <div class="hero-img"><img src="${img(heroKey)}" alt="" loading="eager"><span class="cap">${credit(heroKey)}</span></div>
      </div>
      <div class="stats">
        <div class="stat"><b>15</b><span>nights in China</span></div>
        <div class="stat"><b>${R.stops.length}</b><span>stops</span></div>
        <div class="stat"><b>${R.nRail}${R.nFlight ? " + ✈️" : ""}</b><span>train rides</span></div>
        <div class="stat"><b>${hm(R.railMin)}</b><span>time on trains</span></div>
        <div class="stat"><b>${yen(R.railYen)}</b><span>rail fares, 2nd class pp${R.flightEur ? ` + €${R.flightEur} flight` : ""}</span></div>
        <div class="stat"><b>~€${flyFrom}</b><span>Istanbul flights pp, from</span></div>
      </div>
      ${ribbon(R)}
      <div class="grid2">
        <div>
          <div id="map" role="img" aria-label="Map of the route"></div>
          <div class="maplegend"><span><i></i>Your route (train)</span>${R.nFlight ? `<span><i class="f"></i>Domestic flight</span>` : ""}<span><i class="g"></i>Other options</span><span>Tap a stop for details</span></div>
        </div>
        <div class="side-list">
          <div class="card"><h3>Why this plan works</h3><ul class="why">${why.map((w) => `<li>${w}</li>`).join("")}</ul></div>
          <div class="card"><h3>Jump to</h3>
            <div class="links">
              <a class="lnk pri" href="#days" data-tab="days">📅 Day by day</a>
              <a class="lnk" href="#trains" data-tab="trains">🚄 Trains</a>
              <a class="lnk" href="#flights" data-tab="flights">✈️ Flights</a>
              <a class="lnk" href="#detours" data-tab="detours">🏔️💎 Detours</a>
              <a class="lnk" href="#info" data-tab="info">🛂 Visa &amp; tips</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  function ribbon(R) {
    let h = `<div class="ribbon">`;
    R.stops.forEach((s, i) => {
      if (i > 0) { const l = R.legs[i - 1]; h += `<div class="rleg">${l.d.flight ? "✈️" : "🚄"} ${esc(l.d.rec[5])}</div>`; }
      h += `<div class="rstop" style="--c:${s.c.color}"><div class="dot">${s.c.emoji}</div><div class="nm">${esc(sn(s.c))}</div><div class="dt">${fmtShort(s.arrive)} – ${fmtShort(s.depart)}</div><span class="nt">${s.n} night${s.n > 1 ? "s" : ""}</span></div>`;
    });
    return h + `</div>`;
  }

  function miniTicket(l) {
    const r = l.d.rec;
    const price = l.d.flight ? `~€${l.d.eur}` : `${yen(r[6])} 2nd`;
    return `<div class="mini-ticket"><span class="no">${esc(r[0])}</span><span>${esc(r[1])} <b>${esc(r[2])}</b> → ${esc(r[3])} <b>${esc(r[4])}</b></span><span class="mut">${esc(r[5])} · ${price}</span></div>`;
  }

  function vDays(R) {
    const W = R.W, gw = new Set(W.goldenWeek);
    const first = R.stops[0], last = R.stops[R.stops.length - 1];
    let h = `<div class="sh"><div><h2>Day by day</h2><p>${fmt(D(W.start))} to ${fmt(D(W.end))}: ${esc(routeName(R))}. Travel days are marked with the city colour. Activities are suggestions, so swap freely.</p></div></div>`;
    R.stops.forEach((s, i) => {
      const plan = T.days[s.code];
      h += `<div class="citygrp" style="--c:${s.c.color}"><div class="citygrp-h"><img src="${img(s.c.img)}" alt=""><div><h3>${s.c.emoji} ${esc(s.c.name)}<span class="zh">${esc(s.c.zh)}</span></h3><div class="mut">${fmt(s.arrive)} – ${fmt(s.depart)} · ${s.n} night${s.n > 1 ? "s" : ""} · Stay: ${esc(s.c.stay)}</div></div></div>`;
      let tipShown = false;
      for (let k = 0; k < s.n; k++) {
        const dt = add(s.arrive, k), isGW = gw.has(iso(dt));
        let cls = "day", body = "", badges = isGW ? `<span class="badge gw">🎏 Golden Week</span>` : "";
        if (k === 0 && i === 0) {
          cls += " fly";
          badges = `<span class="badge fl">✈️ Arrive</span>` + badges;
          const how = s.code === "CKG"
            ? "Land at Chongqing Jiangbei (CKG), or fly nonstop to Chengdu Tianfu (TFU) and take the train from Chengdu East (1–1.5 h). See Flights."
            : "Land at Shanghai Pudong (PVG). Metro Line 2 or the Maglev into town, about an hour.";
          body = `<div class="t">Arrive in ${esc(s.c.name)}</div><p>${how}</p><p>${esc(plan.a)}</p>`;
        } else if (k === 0) {
          const l = R.legs[i - 1];
          cls += " travel";
          badges = `<span class="badge tr">${l.d.flight ? "✈️ Fly" : "🚄 Train"}</span>` + badges;
          const late = !l.d.flight && /^(1[89]|2\d)/.test(l.d.rec[4]);
          body = `<div class="t">${esc(sn(R.stops[i - 1].c))} → ${esc(sn(s.c))}</div>${miniTicket(l)}<p>${late ? (s.code === "ZJJ" ? "Evening arrival: transfer to Wulingyuan (about 40 min) and check in. Or take the morning Changsha connection for a free afternoon (see Trains)." : "Evening arrival: check in and eat nearby.") : esc(plan.a)}</p>`;
        } else {
          const txt = plan.d[(k - 1) % plan.d.length];
          body = `<div class="t">${esc(sn(s.c))}</div><p>${esc(txt)}</p>`;
        }
        if (isGW && plan.gw && !tipShown) { body += `<p class="tip">💡 ${esc(plan.gw)}</p>`; tipShown = true; }
        h += `<div class="${cls}"><div class="d"><b>${dt.getUTCDate()} ${MO[dt.getUTCMonth()]}</b><span>${WD[dt.getUTCDay()]}</span></div><div>${badges}${body}</div></div>`;
      }
      h += `</div>`;
    });
    const end = D(W.end);
    const homeTxt = last.code === "SH"
      ? "Easy morning and a last round of soup dumplings. Evening flight from Pudong (PVG, about 1 h by metro or Maglev) or Hongqiao (SHA, next to the rail station). Land in Istanbul on Monday morning."
      : "Last bowl of Chongqing xiaomian. Evening flight from Jiangbei (CKG), or an afternoon train to Chengdu for the Turkish Airlines nonstop at 23:50 from Tianfu (TFU). Land in Istanbul on Monday morning.";
    h += `<div class="citygrp" style="--c:var(--violet)"><div class="day fly"><div class="d"><b>${end.getUTCDate()} ${MO[end.getUTCMonth()]}</b><span>${WD[end.getUTCDay()]}</span></div><div><span class="badge fl">✈️ Fly home</span><div class="t">${esc(sn(last.c))} → Istanbul</div><p>${homeTxt}</p></div></div></div>`;
    return h;
  }

  function vPlaces(R) {
    const onRoute = new Set(R.stops.map((s) => s.code));
    const order = ["CKG", "XIAN", "WH", "ZJJ", "SQ", "BJ", "SH"];
    const btn = (v, label) => `<button data-pf="${v}" class="${placeFilter === v ? "on" : ""}">${label}</button>`;
    let h = `<div class="sh"><div><h2>Places</h2><p>The highlights at every stop, including the ones you can add. Faded cards aren't on your current route.</p></div></div>
      <div class="filters">${btn("route", "⭐ On my route")}${btn("all", "All")}${order.map((c) => btn(c, `${city(c).emoji} ${esc(sn(city(c)))}`)).join("")}</div><div class="pgrid">`;
    const list = T.places.filter((p) => placeFilter === "all" ? true : placeFilter === "route" ? onRoute.has(p.c) : p.c === placeFilter)
      .sort((a, b) => order.indexOf(a.c) - order.indexOf(b.c));
    list.forEach((p) => {
      const c = city(p.c), off = !onRoute.has(p.c);
      h += `<article class="pcard${off && placeFilter === "all" ? " dim" : ""}" style="--c:${c.color}"><div class="ph"><img src="${img(p.img)}" alt="${esc(p.t)}" loading="lazy"><span class="ct">${c.emoji} ${esc(sn(c))}</span>${off ? `<span class="off">optional</span>` : ""}</div>
        <div class="bd"><h4>${esc(p.t)}<span class="zh">${esc(p.zh)}</span></h4><p>${esc(p.d)}</p><div class="tm">⏱ ${esc(p.time)}</div></div></article>`;
    });
    return h + `</div>`;
  }

  function gwLegs(R) { const g = new Set(R.W.goldenWeek); return R.legs.filter((l) => g.has(iso(l.date))); }
  function gwTrainText(R) {
    const g = gwLegs(R);
    return g.length
      ? `Golden Week tickets sell out in minutes. Your ${fmt(g[0].date)} ride (${esc(g[0].d.rec[0])}) is on the last holiday day, so set an alarm for the moment sales open on ${fmt(add(g[0].date, -15))}, or fall back on the alternatives listed.`
      : "Golden Week tickets sell out in minutes. This plan has no rides on 1–5 May, but the first post-holiday days are busy too, so book the moment sales open.";
  }
  function vTrains(R) {
    let h = `<div class="sh"><div><h2>Trains</h2><p>Recommended departures for your plan, with alternatives. Times and 2nd-class fares come from China Railway 12306 (sample date 5 Nov 2026, current timetable). Expect small changes by May.</p></div></div>
      <div class="callout warn"><b>⏰ You can't book these yet: sales open 15 days before each train.</b>Each ride below shows its opening day. ${S.w === "A" ? gwTrainText(R) : ""} Trip.com takes foreign cards and passports and will hold a pre-order before sales open.</div>
      <div class="card" style="margin-bottom:18px"><table class="alts" style="margin:0"><tr><th>Date</th><th>Ride</th><th>Train</th><th class="hide-s">Time</th><th>2nd class</th></tr>
      ${R.legs.map((l) => `<tr><td>${fmt(l.date)}</td><td>${esc(sn(city(l.a)))} → ${esc(sn(city(l.b)))}</td><td><b>${esc(l.d.rec[0])}</b></td><td class="hide-s">${esc(l.d.rec[2])}–${esc(l.d.rec[4])} (${esc(l.d.rec[5])})</td><td>${l.d.flight ? `~€${l.d.eur}` : yen(l.d.rec[6])}</td></tr>`).join("")}
      <tr><td colspan="2"><b>Total per person</b></td><td></td><td class="hide-s"><b>${hm(R.railMin)}</b> on trains</td><td><b>${yen(R.railYen)}</b>${R.flightEur ? ` + €${R.flightEur}` : ""}</td></tr></table>
      <p class="note-in">1st class on the same trains: about ${yen(R.railYen1)} in total. Prices use flexible pricing and can vary by date.</p></div>`;
    R.legs.forEach((l, i) => {
      const r = l.d.rec, open = add(l.date, -15), c = l.to.c;
      const links = l.d.flight
        ? `<a class="lnk gf" target="_blank" rel="noopener" href="${gf(city(l.b).name, city(l.a).name, iso(l.date))}">Google Flights</a><a class="lnk sky" target="_blank" rel="noopener" href="${sky1(SKY[l.a], SKY[l.b], iso(l.date))}">Skyscanner</a><a class="lnk" target="_blank" rel="noopener" href="https://www.trip.com/flights/">Trip.com flights</a>`
        : `<a class="lnk pri" target="_blank" rel="noopener" href="${tripRoute(l.a, l.b)}">Book on Trip.com</a><a class="lnk" target="_blank" rel="noopener" href="https://www.12306.cn/en/index.html">12306 (official)</a>`;
      h += `<div class="ticket" style="--c:${c.color}"><div class="main">
        <div class="hd"><span class="num">Ride ${i + 1}</span><span class="date">${fmt(l.date)}</span><span class="mut">· ${l.d.flight ? "flight" : `${l.d.daily} trains/day`} · ${l.d.flight ? "book any time" : `sales open ${fmt(open)}`}</span></div>
        <div class="route"><div class="st"><b>${esc(r[2])}</b><span>${esc(r[1])}</span></div><div class="mid"><span class="tn">${esc(r[0])}</span><div class="line"></div>${esc(r[5])}</div><div class="st r"><b>${esc(r[4]) || "—"}</b><span>${esc(r[3])}</span></div></div>
        <p class="note-in">${esc(l.d.note)}</p>
        <table class="alts"><tr><th>Also good</th><th>From</th><th class="hide-s">To</th><th>Time</th><th>Fare</th></tr>
        ${l.d.alts.map((a) => `<tr><td><b>${esc(a[0])}</b></td><td>${esc(a[1])} ${esc(a[2])}</td><td class="hide-s">${esc(a[3])} ${esc(a[4])}</td><td>${esc(a[5])}</td><td>${a[6] == null ? "—" : (typeof a[6] === "number" ? yen(a[6]) : "~" + yen(String(a[6]).replace(/D/g, "")))}</td></tr>`).join("")}</table>
        <div class="links">${links}</div></div>
        <div class="stub"><div class="price"><b>${l.d.flight ? `~€${l.d.eur}` : yen(r[6])}</b><span>${l.d.flight ? "economy, 1 adult" : "2nd class, per person"}</span></div>${r[7] ? `<div class="price"><b style="font-size:17px">${yen(r[7])}</b><span>1st class</span></div>` : ""}</div></div>`;
    });
    h += `<div class="card"><h3>Stations you'll use</h3><ul class="why">${R.stops.map((s) => `<li><b>${esc(s.c.name)}:</b> ${esc(s.c.stations)}</li>`).join("")}</ul></div>`;
    return h;
  }

  function fOpts(list) {
    return list.map((o) => `<div class="fopt"><div class="al">${esc(o.a)}</div><div class="pr">€${o.eur}</div><div class="tt">${esc(o.t)} <span class="mut">· ${esc(o.dur)}</span></div><div class="via">${esc(o.via)}${o.note ? " · " + esc(o.note) : ""}</div><div class="tags">${o.pick ? `<span class="tag pick">Best pick</span>` : ""}${o.cheap ? `<span class="tag cheap">Cheapest</span>` : ""}</div></div>`).join("");
  }

  function vFlights(R) {
    const W = R.W, fs = flightSet(R), fwd = S.dir === "fwd";
    const out = W.flyOut, back = W.flyBack;
    const pick = (l) => l.find((o) => o.pick) || l[0];
    const sumPick = pick(fs.out).eur + pick(fs.back).eur, sumCheap = minEur(fs.out) + minEur(fs.back);
    const outLinks = fwd
      ? `<a class="lnk gf" target="_blank" rel="noopener" href="${gf("CKG", "Istanbul", out)}">Google: IST → Chongqing</a><a class="lnk gf" target="_blank" rel="noopener" href="${gf("Chengdu", "Istanbul", out)}">Google: IST → Chengdu</a><a class="lnk sky" target="_blank" rel="noopener" href="${sky1("ista", "ckg", out)}">Skyscanner → CKG</a><a class="lnk sky" target="_blank" rel="noopener" href="${sky1("ista", "tfu", out)}">Skyscanner → TFU</a>`
      : `<a class="lnk gf" target="_blank" rel="noopener" href="${gf("Shanghai", "Istanbul", out)}">Google: IST → Shanghai</a><a class="lnk sky" target="_blank" rel="noopener" href="${sky1("ista", "csha", out)}">Skyscanner → Shanghai</a>`;
    const backLinks = fwd
      ? `<a class="lnk gf" target="_blank" rel="noopener" href="${gf("Istanbul", "Shanghai", back)}">Google: Shanghai → IST</a><a class="lnk sky" target="_blank" rel="noopener" href="${sky1("csha", "ista", back)}">Skyscanner: Shanghai → IST</a>`
      : `<a class="lnk gf" target="_blank" rel="noopener" href="${gf("Istanbul", "CKG", back)}">Google: Chongqing → IST</a><a class="lnk gf" target="_blank" rel="noopener" href="${gf("Istanbul", "Chengdu", back)}">Google: Chengdu → IST</a><a class="lnk sky" target="_blank" rel="noopener" href="${sky1("ckg", "ista", back)}">Skyscanner: CKG → IST</a><a class="lnk sky" target="_blank" rel="noopener" href="${sky1("tfu", "ista", back)}">Skyscanner: TFU → IST</a>`;
    const multi = fwd
      ? `<a class="lnk sky" target="_blank" rel="noopener" href="${skyMulti("ista", "ckg", out, "csha", "ista", back)}">IST → Chongqing · Shanghai → IST</a><a class="lnk sky" target="_blank" rel="noopener" href="${skyMulti("ista", "tfu", out, "csha", "ista", back)}">IST → Chengdu · Shanghai → IST</a>`
      : `<a class="lnk sky" target="_blank" rel="noopener" href="${skyMulti("ista", "csha", out, "ckg", "ista", back)}">IST → Shanghai · Chongqing → IST</a><a class="lnk sky" target="_blank" rel="noopener" href="${skyMulti("ista", "csha", out, "tfu", "ista", back)}">IST → Shanghai · Chengdu → IST</a>`;
    return `<div class="sh"><div><h2>Flights from Istanbul</h2><p>Leave Istanbul on ${fmt(D(out))}, land ${fmt(D(W.start))}. Fly home ${fmt(D(back))}, land Monday morning. Fares are one-way economy per adult in EUR, as listed on Google Flights on ${esc(T.checked)}. They change daily, so use the buttons for live prices.</p></div>
      <div class="ctl"><span class="ctl-lbl">Travellers (for Skyscanner links)</span><div class="seg" id="paxSeg"><button data-pax="-1">−</button><button class="on" disabled style="opacity:1">${S.pax}</button><button data-pax="1">+</button></div></div></div>
      <div class="callout ok"><b>💡 ${fwd ? "Fly into Chengdu, not Chongqing" : "Fly home from Chengdu for the nonstop"}</b>${fwd
        ? "No airline flies Istanbul–Chongqing nonstop. Sichuan Airlines flies <b>Istanbul → Chengdu Tianfu nonstop</b> (Fri 15:40 → Sat 05:20), and Chengdu East to Chongqing is 1–1.5 h by train (143 trains a day). That puts you in Chongqing by late morning on Saturday, rested, instead of after a 17–19 h connection."
        : "Chongqing has no nonstop to Istanbul. Turkish Airlines flies <b>Chengdu Tianfu → Istanbul nonstop</b> on Sunday nights (23:50 → 04:50). Take a 1–1.5 h train from Chongqing to Chengdu East in the afternoon, then allow about 1 h to Tianfu airport. Or connect via Shanghai from Chongqing itself."}</div>
      <div class="fgrid">
        <div class="card fcard"><h3>🛫 Outbound · ${fmt(D(out))} → ${esc(fs.outTo)}</h3>${fOpts(fs.out)}<div class="links">${outLinks}</div></div>
        <div class="card fcard"><h3>🛬 Home · ${fmt(D(back))} · ${esc(fs.backFrom)} → IST</h3>${fOpts(fs.back)}<div class="links">${backLinks}</div></div>
      </div>
      <div class="card" style="margin-top:18px"><h3>🧾 Book it as one open-jaw ticket</h3>
        <p>Best-pick pair: about <b>€${sumPick}</b> per person (cheapest pair about €${sumCheap}).${S.pax > 1 ? ` For ${S.pax} travellers: about <b>€${(sumPick * S.pax).toLocaleString("en-US")}</b>.` : ""} An open-jaw ticket (in to one city, home from another) is often cheaper than two one-ways and keeps you protected if a connection misses. Skyscanner's multi-city search, with your dates already filled in:</p>
        <div class="links">${multi}</div>
        <p class="note-in">Watch out for: China Eastern's "airport change" itineraries (PVG ↔ SHA on separate tickets), very long layovers on the cheapest China Southern fares, and the China Eastern 01:20 Pudong departure, which leaves at 01:20 on the night before the date shown. Everyone needs their visa before booking non-refundable fares (see Need to know).</p></div>`;
  }

  function vDetours(R) {
    const base = T.nights[S.w][S.dir];
    const diff = (with_, without) => {
      const a = base[with_], b = base[without], out = [];
      Object.keys(b).forEach((k) => { const d = (a[k] || 0) - b[k]; if (d) out.push(`${k === "MID" ? city(S.via === "xian" ? "XIAN" : "WH").name : sn(city(k))} ${d > 0 ? "+" : ""}${d}`); });
      return out.join(", ");
    };
    const withZ = S.zc ? "both" : "zjj", noZ = S.zc ? "zc" : "none";
    const withC = S.zjj ? "both" : "zc", noC = S.zjj ? "zjj" : "none";
    const xian = S.via === "xian", fwd = S.dir === "fwd";
    const zjjHow = fwd
      ? `Chongqing East → Zhangjiajie West by G-train (2h06–2h50, 24 a day). Then ${xian ? "fly Zhangjiajie → Xi'an (1h25, two nonstops a day), since there's no direct rail" : "a direct G-train to Wuhan (about 5 h, via Fenghuang Ancient Town), or change at Changsha"}.`
      : `${xian ? "Fly Xi'an → Zhangjiajie (1h30, morning nonstop)" : "Wuhan → Zhangjiajie West by direct G-train (5 h), or change at Changsha for an earlier arrival"}. Then Zhangjiajie West → Chongqing East (2h05–2h30).`;
    const zcHow = fwd
      ? `${xian ? "Xi'an North → Shangqiu (2h43)" : "Wuhan → Shangqiu (3h07)"}, about 1 h by car to Zhecheng and back, then Shangqiu → Beijing West on the new Xiong'an line (3h40–3h50).`
      : `Beijing West → Shangqiu (3h19), car to Zhecheng and back, then Shangqiu → ${xian ? "Xi'an North (2h52)" : "Wuhan (2h54)"}.`;
    return `<div class="sh"><div><h2>Detours</h2><p>Two optional add-ons. Toggle them here or in the bar above, and the map, days, trains and costs update to match.</p></div></div>
      <div class="dcard"><div class="imgs"><img src="${img("avatar")}" alt="Avatar Hallelujah Mountain" loading="lazy"><img src="${img("bailong")}" alt="Bailong Elevator" loading="lazy"><img src="${img("tianmen")}" alt="Tianmen Mountain" loading="lazy"></div>
        <div class="bd"><span class="badge tr" style="--c:var(--green)">🏔️ Zhangjiajie · Hunan</span><h3>The Avatar mountains</h3>
          <p>Wulingyuan's thousands of mist-wrapped sandstone pillars, some over 200 m tall, are the real-world model for Pandora's floating Hallelujah Mountains. The best-known pillar was renamed "Avatar Hallelujah Mountain" in 2010. UNESCO World Heritage.</p>
          <ul><li><b>Getting there:</b> ${zjjHow}</li>
          <li><b>Do:</b> Yuanjiajie and Avatar Mountain, the 326 m Bailong cliff elevator, and Tianzi Mountain. With more time, Tianmen Mountain's cable car, glass skywalk and Heaven's Gate.</li>
          <li><b>Stay:</b> Wulingyuan town, at the park gate. 2 nights minimum. In May, mist is part of the magic but bring a rain layer.</li>
          <li><b>Costs you:</b> ${diff(withZ, noZ) || "no nights elsewhere"} nights${S.w === "A" && fwd ? ". In the 1–16 May plan you travel on 5 May, the last holiday day, heading away from the big city while everyone else heads home, and visit the park on the 6th, once the crowds have left" : ""}.</li></ul>
          <button class="addbtn zjj ${S.zjj ? "on" : ""}" data-toggle="zjj">${S.zjj ? "✓ Added. Remove from plan" : "+ Add to plan"}</button></div></div>
      <div class="dcard"><div class="imgs"><img src="${img("labdiamond")}" alt="Lab-grown diamonds" loading="lazy"><img src="${img("zhecheng")}" alt="Zhecheng" loading="lazy"><img src="${img("shangqiu")}" alt="Shangqiu ancient city gate" loading="lazy"></div>
        <div class="bd"><span class="badge tr" style="--c:var(--cyan)">💎 Zhecheng · Henan</span><h3>The diamond capital</h3>
          <p>An agricultural county with no mines that became China's "Diamond Capital". It produces <b>over 60% of China's lab-grown diamonds</b> and over 90% of its diamond micro-powder. China makes most of the world's lab-grown rough.</p>
          <ul><li><b>Getting there:</b> ${zcHow}</li>
          <li><b>Do:</b> the factory showrooms of Henan Liliang Diamond and Huifeng Diamond (see rough stones grown, buy finished jewellery), the Diamond Fashion Street, and Ronghu Lake. In the evening, Shangqiu's walled Guide Ancient City.</li>
          <li><b>Buying tips:</b> lab-grown stones cost roughly 1/5 to 1/10 of natural ones. Insist on a grading report (IGI, GIA or China's NGTC) with the laser inscription. Local regulators have cracked down on fake "Zhecheng" stones, so buy at the factory stores. Arrange showroom visits ahead through your hotel or a local guide. A Mandarin speaker helps.</li>
          <li><b>Costs you:</b> ${diff(withC, noC) || "no nights elsewhere"} nights, plus a hired car (Didi) between Shangqiu and Zhecheng, about 1 h each way.</li></ul>
          <button class="addbtn zc ${S.zc ? "on" : ""}" data-toggle="zc">${S.zc ? "✓ Added. Remove from plan" : "+ Add to plan"}</button></div></div>
      <div class="callout info"><b>Also possible</b>Zhecheng also fits between Beijing and Shanghai: Shangqiu → Shanghai Hongqiao is 3h12–4h (about 42 trains a day). Chengdu (giant pandas) is easy to add for a night if you fly in or out of Tianfu.</div>`;
  }

  function vInfo(R) {
    const temps = R.stops.map((s) => `<tr><td>${s.c.emoji} ${esc(s.c.name)}</td><td>~${s.c.temp}°C</td></tr>`).join("");
    return `<div class="sh"><div><h2>Need to know</h2><p>The practical stuff, written for a Turkish passport group.</p></div></div>
      <div class="igrid">
        <div class="card"><h3>🛂 Visa</h3><ul>
          <li><b>Turkish passports need a visa.</b> Turkey is not on China's visa-free list, so apply for a tourist (L) visa.</li>
          <li>Apply through the Chinese Visa Application Service Center in Istanbul, roughly 1–2 months before. You'll typically need the flight booking, hotel bookings and an itinerary (this site helps).</li>
          <li>The 240-hour visa-free transit doesn't work for a round trip from Istanbul.</li>
          <li>Anyone with another passport (e.g. EU) may qualify for 30-day visa-free entry, a scheme currently set to run to 31 Dec 2026. Check whether it's extended into 2027.</li></ul></div>
        <div class="card"><h3>🎏 Golden Week</h3><ul>
          <li>China's Labour Day holiday is expected to be <b>1–5 May 2027</b>. The State Council publishes the official 2027 calendar around Nov–Dec 2026, so check it then.</li>
          <li>Hundreds of millions travel: trains sell out, sights are packed, hotel prices jump.</li>
          <li>${S.w === "A" ? (gwLegs(R).length ? `Your current plan has one ride inside the holiday (${fmt(gwLegs(R)[0].date)}, the last day, heading away from the big city while everyone else heads home). Book it the second sales open.` : "Your current plan has no intercity trains on 1–5 May.") : "The 8–23 May window avoids the holiday entirely."} Sat 8 May may be a make-up working day, which doesn't affect you.</li></ul></div>
        <div class="card"><h3>🚄 Booking trains</h3><ul>
          <li>Sales open <b>15 days</b> before departure. Book the moment they open, especially Golden Week-adjacent and low-frequency rides (Zhangjiajie–Wuhan has 2 trains a day, Wuhan–Shangqiu about 6).</li>
          <li><b>Trip.com</b>: English, foreign cards, pre-orders. <b>12306</b>: official and cheapest; foreigners can register with a passport.</li>
          <li>E-tickets: scan your passport at the gate (use the manual lane if the machine won't read it). Arrive 45 min early. Big stations are airport-sized.</li>
          <li>Luggage: about 20 kg per adult; any single bag's L+W+H must be ≤130 cm. No check-in, so pack light.</li></ul></div>
        <div class="card"><h3>💳 Money</h3><ul>
          <li>China runs on <b>Alipay</b> and <b>WeChat Pay</b>. Both accept Visa or Mastercard for foreigners, so set them up before you go.</li>
          <li>Carry some cash (¥) as backup. Many small vendors only take QR payments, but cash must legally be accepted.</li>
          <li>Hotels and big stores take cards. Street food and taxis are QR only.</li></ul></div>
        <div class="card"><h3>📱 Internet & apps</h3><ul>
          <li>Google, WhatsApp, Instagram and Gmail are blocked on Chinese networks. A Turkish roaming plan or a travel eSIM (data routed abroad) usually works around this.</li>
          <li>Download before you go: <b>Trip.com</b>, <b>Alipay</b>, <b>Amap</b> or Apple Maps (Google Maps is weak in China), <b>Didi</b> (inside Alipay), a translator, and <b>WeChat</b>.</li>
          <li>Metro: pay by Alipay QR in most cities.</li></ul></div>
        <div class="card"><h3>🌤️ May weather (typical highs)</h3><table class="wx">${temps}</table><p class="note-in">Warm and green everywhere, with occasional showers in Chongqing, Zhangjiajie and Shanghai. Pack layers, a light rain jacket and good walking shoes.</p></div>
        <div class="card"><h3>🎟️ Book ahead</h3><ul>
          <li><b>Forbidden City:</b> released 7 days ahead, passport real-name, closed Mondays (except holidays).</li>
          <li><b>Terracotta Army</b> and <b>Shaanxi History Museum:</b> timed tickets. Book early.</li>
          <li><b>Zhangjiajie park</b> and <b>Tianmen Mountain:</b> book on Trip.com. Avoid holiday dates.</li>
          <li>Many museums are closed on Mondays.</li></ul></div>
        <div class="card"><h3>🧭 Party logistics</h3><ul>
          <li>Train seats: book everyone in one order so the seats are together. 2nd class seats 3+2 per row.</li>
          <li>Didi XL or two cars for groups over 4.</li>
          <li>Hotels must register foreign guests, so book places that accept foreigners (Trip.com shows this).</li>
          <li>Use the 🔗 Share plan button to send everyone the exact option you're discussing.</li></ul></div>
      </div>`;
  }

  function footer() {
    const cr = Object.entries(CR).map(([k, v]) => `<div><a href="${esc(v.src)}" target="_blank" rel="noopener">${esc(k)}</a>: ${esc(v.author || "Wikimedia Commons")} · ${esc(v.license)}</div>`).join("");
    return `<div><b>Sources.</b> Train times and fares: <a href="https://www.12306.cn/en/index.html" target="_blank" rel="noopener">China Railway 12306</a> (sample date 5 Nov 2026) and <a href="https://www.trip.com/trains/" target="_blank" rel="noopener">Trip.com</a>. Flights: Google Flights, checked ${esc(T.checked)}. New lines: Xi'an–Ankang (opened 28 Sep 2026), Yichang–Xingshan (28 Sep 2026), Xiong'an–Shangqiu (28 Sep 2026), Xi'an–Shiyan (30 Jun 2026). Zhecheng: Science and Technology Daily (Oct 2026) and Xinhua (Jun 2026). Timetables change at each national timetable revision, so treat train numbers as a strong hint and confirm when booking. Map tiles © Esri and © OpenStreetMap contributors.</div>
      <details><summary>Photo credits (Wikimedia Commons)</summary><div class="cr">${cr}</div></details>`;
  }

  /* ---------- map ---------- */
  let map = null, tiles = null, layer = null, trainTimer = null, routeBounds = null, mapDirty = false, lastR = null;
  function setTiles() {
    if (tiles) map.removeLayer(tiles);
    const E = "https://server.arcgisonline.com/ArcGIS/rest/services/", attr = "Tiles © Esri, HERE, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors";
    tiles = isDark()
      ? L.layerGroup([L.tileLayer(E + "Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", { maxZoom: 12, attribution: attr }), L.tileLayer(E + "Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", { maxZoom: 12 })])
      : L.tileLayer(E + "World_Topo_Map/MapServer/tile/{z}/{y}/{x}", { maxZoom: 12, attribution: attr });
    tiles.addTo(map);
  }
  function fitRoute() { if (map && routeBounds) map.fitBounds(routeBounds, { paddingTopLeft: [30, 40], paddingBottomRight: [130, 30] }); }
  function drawMap(R) {
    const el = $("#map"); if (!el) return;
    if (typeof L === "undefined") { el.innerHTML = `<div style="padding:24px" class="mut">The map needs an internet connection. The route strip above shows the same plan.</div>`; return; }
    if (map) { map.remove(); map = null; tiles = null; }
    if (trainTimer) { cancelAnimationFrame(trainTimer); trainTimer = null; }
    map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25 });
    setTiles();
    layer = L.layerGroup().addTo(map);
    const used = new Set(R.legs.map((l) => [l.a, l.b].sort().join("-")));
    Object.keys(T.paths).forEach((k) => {
      const [a, b] = k.split("-"); if (used.has([a, b].sort().join("-")) || T.paths[k] === "flight") return;
      L.polyline(T.paths[k], { color: "#b9b2a6", weight: 3, opacity: .7, dashArray: "6 7" }).addTo(layer)
        .bindTooltip(`${sn(city(a))} – ${sn(city(b))} (other option)`, { sticky: true });
    });
    const all = [];
    R.legs.forEach((l) => {
      const c = l.to.c.color;
      if (!l.path.flight) L.polyline(l.path.pts, { color: "#fff", weight: 9, opacity: .9 }).addTo(layer);
      L.polyline(l.path.pts, { color: l.path.flight ? "#7c3aed" : c, weight: 5, opacity: 1, dashArray: l.path.flight ? "2 9" : null, lineCap: "round" }).addTo(layer)
        .bindTooltip(`${l.d.rec[0]} · ${l.d.rec[5]} · ${fmt(l.date)}`, { sticky: true });
      all.push.apply(all, l.path.pts);
    });
    T.waypoints.forEach((w) => {
      L.marker(w.ll, { icon: L.divIcon({ className: "", html: `<div class="wp"></div>`, iconSize: [10, 10], iconAnchor: [5, 5] }) }).addTo(layer)
        .bindPopup(`<div class="pop"><div><b>${esc(w.n)}</b> <span class="zh">${esc(w.zh)}</span><br>${esc(w.t)}</div></div>`);
    });
    R.stops.forEach((s, i) => {
      const html = `<div class="mk"><span class="n" style="background:${s.c.color}">${i + 1}</span><span class="l">${s.c.emoji} ${esc(sn(s.c))} <small>${s.n}n</small></span></div>`;
      L.marker(s.c.ll, { icon: L.divIcon({ className: "", html, iconSize: [0, 0] }), zIndexOffset: 1000 }).addTo(layer)
        .bindPopup(`<div class="pop"><img src="${img(s.c.img)}" alt=""><div><b>${esc(s.c.name)}</b> <span class="zh">${esc(s.c.zh)}</span><br><span class="mut">${fmt(s.arrive)} – ${fmt(s.depart)} · ${s.n} night${s.n > 1 ? "s" : ""}</span><br>${esc(s.c.blurb)}</div></div>`, { maxWidth: 260 });
    });
    routeBounds = L.latLngBounds(all);
    fitRoute();
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && all.length > 1) {
      const seg = [], cum = [0];
      for (let i = 1; i < all.length; i++) { const d = Math.hypot(all[i][0] - all[i - 1][0], all[i][1] - all[i - 1][1]); seg.push(d); cum.push(cum[i - 1] + d); }
      const total = cum[cum.length - 1];
      const tm = L.marker(all[0], { icon: L.divIcon({ className: "", html: `<div class="trainmk">🚄</div>`, iconSize: [0, 0] }), interactive: false, zIndexOffset: 2000 }).addTo(layer);
      const t0 = performance.now(), dur = 22000;
      const step = (now) => {
        const p = ((now - t0) % dur) / dur * total;
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
    if (tg) { S[tg.dataset.toggle] = !S[tg.dataset.toggle]; update(); toast(S[tg.dataset.toggle] ? "Added to the plan: map and days updated" : "Removed from the plan"); return; }
    const px = e.target.closest("[data-pax]");
    if (px) { S.pax = Math.max(1, Math.min(19, S.pax + Number(px.dataset.pax))); writeURL(); $("#v-flights").innerHTML = vFlights(build()); }
  });

  $("#foot").innerHTML = footer();
  update();
  showTab(tab);
})();
