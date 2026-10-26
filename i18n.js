/* Interface strings. Functions receive already-escaped/formatted values. */
/* Turkish case suffix with vowel harmony: kind = "dat" (-e/-a), "loc" (-de/-da/-te/-ta), "abl" (-den/-dan/-ten/-tan) */
function trSfx(word, kind) {
  const w = String(word), low = w.toLocaleLowerCase("tr-TR");
  const vowels = low.match(/[aeıioöuü]/g) || ["e"], v = vowels[vowels.length - 1];
  const front = "eiöü".includes(v), last = low[low.length - 1];
  const endsVowel = "aeıioöuü".includes(last), hard = "çfhkpsşt".includes(last);
  if (kind === "dat") return w + "'" + (endsVowel ? "y" : "") + (front ? "e" : "a");
  const d = hard ? "t" : "d";
  if (kind === "loc") return w + "'" + d + (front ? "e" : "a");
  return w + "'" + d + (front ? "en" : "an");
}
window.I18N = {
  en: {
    code: "en", locale: "en-US", htmlLang: "en",
    WD: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    MO: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    date: (wd, d, mo) => `${wd} ${d} ${mo}`,
    dur: (h, m) => m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`,
    hm: (h, m) => `${h}h ${String(m).padStart(2, "0")}`,
    nights: (n) => `${n} night${n > 1 ? "s" : ""}`, nShort: "n",
    title: "China by Rail · May 2027",
    desc: "Two weeks in China by high-speed rail, May 2027: Chongqing, Xi'an or Wuhan, Beijing, Shanghai, plus optional detours.",
    brand: "China by Rail", brandSub: "May 2027 · trip planner",
    tabs: { overview: "Overview", days: "Days", places: "Places", trains: "Trains", flights: "Flights", detours: "Detours", info: "Tips" },
    b: { dates: "Dates", dir: "Direction", mid: "Middle stop", detours: "Detours", A: "1 – 16 May", B: "8 – 23 May", fwd: "Chongqing → Shanghai", rev: "Shanghai → Chongqing", xian: "Xi'an", wh: "Wuhan", zjj: "🏔️ Avatar mtns", zc: "💎 Zhecheng", share: "🔗 Share", shareTitle: "Copy a link to this plan", theme: "Dark mode", lang: "TR", langTitle: "Türkçe" },
    toast: { copied: "Link copied", copy: "Copy the address bar to share", added: "Added to the plan", removed: "Removed from the plan" },
    tryNote: (eur, cny, when, live) => `₺ at €1 = ₺${eur}, ¥1 = ₺${cny} (${live ? "live" : "ECB"}, ${when}).`,
    approx: "≈",
    ov: {
      kick: "15 nights · high-speed rail",
      pillDates: (a, b) => `📅 ${a} – ${b} 2027`,
      pillFly: (d) => `✈️ Fly out ${d}`,
      pillGW: "🎏 Golden Week 1–5 May",
      st: { nights: "nights", stops: "stops", rides: "train rides", time: "on trains", fares: "rail, 2nd class pp", plusFlight: (e) => ` + ${e} flight`, flights: "flights pp, from" },
      legend: { route: "Your route", flight: "Flight", other: "Other options", tap: "Tap a stop" },
      whyT: "Why it works", jumpT: "Go to",
      jump: { days: "📅 Days", trains: "🚄 Trains", flights: "✈️ Flights", detours: "🏔️💎 Detours", info: "🛂 Tips" },
      gwA: (city, zjjFwd, firstTrain) => zjjFwd
        ? `<b>Golden Week sorted.</b> You sit out the holiday in ${city} and leave on 5 May, against the crowds.`
        : `<b>Golden Week sorted.</b> You sit out the 1–5 May holiday in ${city}. First train: ${firstTrain}.`,
      gwB: "<b>No holiday crowds.</b> Golden Week is over before you land.",
      rides: (n, total, longest) => `<b>${n} train rides, ${total} in total.</b> Longest ${longest}, all in daylight.`,
      jaw: (a, b, cheap, sat) => `<b>Open-jaw flights</b> into ${a}, home from ${b}: from ${cheap}${sat ? `, or ${sat} landing Saturday` : ""}.`,
      xian: "<b>Xi'an</b> for the Terracotta Army. <b>Wuhan</b> for shorter rides.",
      wh: "<b>Wuhan</b> for the shortest rides. <b>Xi'an</b> for the Terracotta Army.",
      fl: "<b>One short flight</b> links Zhangjiajie and Xi'an (no direct train).",
      noMap: "The map needs an internet connection.",
      other: "other option", photo: "Photo"
    },
    days: {
      h: "Day by day",
      intro: (a, b, route) => `${a} – ${b}: ${route}. Suggestions only.`,
      stay: "Stay", gw: "🎏 Golden Week", arrive: "✈️ Arrive", train: "🚄 Train", fly: "✈️ Fly", home: "✈️ Home",
      arriveIn: (c) => `Arrive in ${c}`,
      howCKG: "Land at Chongqing (CKG), or at Chengdu (TFU) and take the 1–1.5 h train.",
      howSH: "Land at Pudong (PVG). Metro or Maglev into town (1 h).",
      lateZJJ: "Evening arrival. Transfer to Wulingyuan (40 min).",
      late: "Evening arrival.",
      homeSH: "Easy morning. Evening flight from Pudong (PVG) or Hongqiao (SHA).",
      homeCKG: "Easy morning. Evening flight from Chongqing (CKG), or from Chengdu (TFU, 1–1.5 h by train).",
      toIst: "Istanbul", second: "2nd"
    },
    places: { h: "Places", intro: "Highlights at every stop. Faded cards aren't on your route.", route: "⭐ My route", all: "All", optional: "optional" },
    trains: {
      h: "Trains",
      intro: "From China Railway's 12306 timetable (Nov 2026). Times may shift slightly by May. Station names as on tickets.",
      warnT: "⏰ Sales open 15 days before each train.",
      warn: (gw) => `${gw}Book on Trip.com (foreign cards, pre-orders).`,
      gwLeg: (d, t, open) => `Your ${d} ride (${t}) is on the last holiday day: book the minute sales open (${open}). `,
      gwNone: "",
      th: { date: "Date", ride: "Ride", train: "Train", time: "Time", second: "2nd class", also: "Also good", from: "From", to: "To", fare: "Fare" },
      total: "Total pp", onTrains: "on trains",
      first: (y) => `1st class: about ${y} in total.`,
      ride: (n) => `Ride ${n}`, flight: "flight", perDay: (n) => `${n}/day`, anyTime: "book any time", opens: (d) => `on sale ${d}`,
      book: "Trip.com", official: "12306", tripFl: "Trip.com",
      econ: "economy, 1 adult", pp2: "2nd class pp", first1: "1st class",
      stations: "Stations", rail: "Rail:"
    },
    flights: {
      h: "Flights",
      intro: (out, land, back, checked) => `Fly out ${out}, land ${land}. Home ${back}. Prices per person, economy, checked ${checked}.`,
      pax: "Travellers",
      jawT: "🧾 Open-jaw round trip",
      jawIntro: "In to one city, home from another, on one booking. Layovers included.",
      tags: { cheap: "Cheapest", sat: "Cheapest landing Sat", comfort: "Fastest", cheapsat: "Cheapest · lands Sat" },
      fri: "Lands Friday evening: add one hotel night.",
      sep: "Two separate tickets.",
      outL: "Out", backL: "Back",
      perPerson: "pp", group: (n, total) => `${n} people: ${total}`,
      search: "Search these dates:", gfMulti: "Google Flights", skyMulti: "Skyscanner",
      watch: "Long layovers (up to 16 h in Guangzhou) and a visa needed before booking.",
      oneWayT: "One-way options",
      outT: (d, to) => `🛫 ${d} → ${to}`, backT: (d, from) => `🛬 ${d} · ${from} → IST`,
      ckgTFU: "Chongqing / Chengdu", sh: "Shanghai",
      pick: "Good pick", cheap: "Cheapest"
    },
    det: {
      h: "Detours", intro: "Two optional add-ons. Toggle them here or in the bar above.",
      get: "Getting there:", do: "Do:", stay: "Stay:", costs: "Costs:", tips: "Buying:", none: "no nights elsewhere", nightsWord: "nights",
      add: "+ Add to plan", added: "✓ Added · remove",
      zBadge: "🏔️ Zhangjiajie · Hunan", zT: "The Avatar mountains",
      zP: "Misty sandstone pillars up to 200 m tall: the model for Avatar's floating mountains. UNESCO.",
      zHowFwd: (xian) => `Train from Chongqing East (2–3 h), then ${xian ? "fly to Xi'an (1h25)" : "train to Wuhan (5 h)"}.`,
      zHowRev: (xian) => `${xian ? "Fly from Xi'an (1h30)" : "Train from Wuhan (5 h)"}, then train to Chongqing East (2–2.5 h).`,
      zDo: "Avatar Mountain, Bailong Elevator, Tianmen Mountain.",
      zStay: "Wulingyuan town. 2 nights minimum. Bring a rain jacket.",
      zGW: "",
      cBadge: "💎 Zhecheng · Henan", cT: "The diamond capital",
      cP: "A farming county that makes <b>over 60% of China's lab-grown diamonds</b>.",
      cHowFwd: (xian) => `Train to Shangqiu (${xian ? "2h43 from Xi'an" : "3h07 from Wuhan"}), 1 h by car to Zhecheng, then train to Beijing (3h40).`,
      cHowRev: (xian) => `Train from Beijing to Shangqiu (3h19), 1 h by car to Zhecheng, then train to ${xian ? "Xi'an (2h52)" : "Wuhan (2h54)"}.`,
      cDo: "Liliang and Huifeng factory showrooms, the Diamond Fashion Street, Shangqiu old town at night.",
      cTips: "about 1/5–1/10 of natural prices. Ask for an IGI, GIA or NGTC report and buy at factory stores. Book visits via your hotel.",
      cCar: " + a car (1 h each way)",
      alsoT: "Also possible", also: "Zhecheng also fits between Beijing and Shanghai (Shangqiu → Shanghai 3–4 h)."
    },
    info: {
      h: "Tips", intro: "For a Turkish passport group.",
      visaT: "🛂 Visa",
      visa: ["<b>Turkish passports need a tourist (L) visa.</b>", "Apply at the Chinese Visa Application Center in Istanbul, 1–2 months ahead, with flight and hotel bookings.", "Other passports (e.g. EU) may get 30 days visa-free: check it still runs in 2027."],
      gwT: "🎏 Golden Week",
      gw: ["Expected <b>1–5 May 2027</b>. The official dates come out in Nov–Dec 2026.", "Trains sell out, sights are packed, hotels cost more."],
      gwLeg: (d) => `Your plan has one ride in the holiday (${d}, last day). Book it the minute sales open.`,
      gwNone: "Your plan has no trains during the holiday.",
      gwB: "The 8–23 May dates avoid it completely.",
      gwSat: "",
      bookT: "🚄 Trains",
      book: ["Sales open <b>15 days</b> ahead. Low-frequency rides sell out first.", "<b>Trip.com</b> takes foreign cards. <b>12306</b> is cheapest.", "Scan your passport at the gate. Arrive 45 min early.", "About 20 kg luggage each, no check-in."],
      moneyT: "💳 Money",
      money: ["Set up <b>Alipay</b> or <b>WeChat Pay</b> with your card before you go.", "Carry some cash (¥) as backup."],
      netT: "📱 Internet & apps",
      net: ["Google, WhatsApp and Instagram are blocked. A roaming plan or travel eSIM gets around it.", "Get <b>Trip.com</b>, <b>Alipay</b>, <b>Amap</b>, <b>Didi</b>, <b>WeChat</b> and a translator."],
      wxT: "🌤️ May weather (typical highs)", wx: "Warm, with some showers. Pack layers and a rain jacket.",
      aheadT: "🎟️ Book ahead",
      ahead: ["<b>Forbidden City:</b> 7 days ahead, closed Mondays.", "<b>Terracotta Army, Shaanxi History Museum:</b> timed tickets.", "<b>Zhangjiajie, Tianmen:</b> book on Trip.com."],
      partyT: "🧭 Group",
      party: ["Book train seats in one order to sit together.", "Groups over 4: Didi XL or two cars.", "Use 🔗 Share to send everyone the same plan."],
      fxT: "💱 Money conversions",
      fx: (eur, cny, when, live) => `₺ amounts are approximate: €1 = ₺${eur}, ¥1 = ₺${cny} (${live ? "live" : "ECB"}, ${when}).`
    },
    foot: (checked) => `<b>Sources:</b> trains from <a href="https://www.12306.cn/en/index.html" target="_blank" rel="noopener">12306</a> and <a href="https://www.trip.com/trains/" target="_blank" rel="noopener">Trip.com</a>; flights from Google Flights and Skyscanner (${checked}); rates from the ECB and open.er-api.com. Train numbers can change at timetable revisions, so confirm when booking. Map © Esri, © OpenStreetMap.`,
    credits: "Photo credits (Wikimedia Commons)"
  },

  tr: {
    code: "tr", locale: "tr-TR", htmlLang: "tr",
    WD: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
    MO: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
    date: (wd, d, mo) => `${d} ${mo} ${wd}`,
    dur: (h, m) => m ? `${h} sa ${String(m).padStart(2, "0")} dk` : `${h} sa`,
    hm: (h, m) => `${h} sa ${String(m).padStart(2, "0")} dk`,
    nights: (n) => `${n} gece`, nShort: "g",
    title: "Trenle Çin · Mayıs 2027",
    desc: "Mayıs 2027'de hızlı trenle iki hafta Çin: Çongçing, Şian ya da Vuhan, Pekin, Şanghay ve isteğe bağlı ek rotalar.",
    brand: "Trenle Çin", brandSub: "Mayıs 2027 · gezi planı",
    tabs: { overview: "Genel", days: "Günler", places: "Yerler", trains: "Trenler", flights: "Uçuşlar", detours: "Ek rotalar", info: "İpuçları" },
    b: { dates: "Tarihler", dir: "Yön", mid: "Ara durak", detours: "Ek rotalar", A: "1 – 16 Mayıs", B: "8 – 23 Mayıs", fwd: "Çongçing → Şanghay", rev: "Şanghay → Çongçing", xian: "Şian", wh: "Vuhan", zjj: "🏔️ Avatar dağları", zc: "💎 Zhecheng", share: "🔗 Paylaş", shareTitle: "Bu planın bağlantısını kopyala", theme: "Koyu mod", lang: "EN", langTitle: "English" },
    toast: { copied: "Bağlantı kopyalandı", copy: "Paylaşmak için adres çubuğunu kopyalayın", added: "Plana eklendi", removed: "Plandan çıkarıldı" },
    tryNote: (eur, cny, when, live) => `₺: 1 € = ₺${eur}, 1 ¥ = ₺${cny} (${live ? "güncel" : "ECB"}, ${when}).`,
    approx: "≈",
    ov: {
      kick: "15 gece · hızlı tren",
      pillDates: (a, b) => `📅 ${a} – ${b} 2027`,
      pillFly: (d) => `✈️ Çıkış ${d}`,
      pillGW: "🎏 Altın Hafta 1–5 Mayıs",
      st: { nights: "gece", stops: "durak", rides: "tren yolculuğu", time: "trende", fares: "tren, 2. sınıf, kişi başı", plusFlight: (e) => ` + ${e} uçuş`, flights: "uçuş, kişi başı, en az" },
      legend: { route: "Rotanız", flight: "Uçuş", other: "Diğer seçenekler", tap: "Durağa dokunun" },
      whyT: "Neden bu plan", jumpT: "Git",
      jump: { days: "📅 Günler", trains: "🚄 Trenler", flights: "✈️ Uçuşlar", detours: "🏔️💎 Ek rotalar", info: "🛂 İpuçları" },
      gwA: (city, zjjFwd, firstTrain) => zjjFwd
        ? `<b>Altın Hafta sorun değil.</b> Tatili ${trSfx(city, "loc")} geçirip 5 Mayıs'ta, kalabalığın tersine yola çıkıyorsunuz.`
        : `<b>Altın Hafta sorun değil.</b> 1–5 Mayıs tatilini ${trSfx(city, "loc")} geçiriyorsunuz. İlk tren: ${firstTrain}.`,
      gwB: "<b>Tatil kalabalığı yok.</b> Altın Hafta siz inmeden bitiyor.",
      rides: (n, total, longest) => `<b>${n} tren yolculuğu, toplam ${total}.</b> En uzunu ${longest}, hepsi gündüz.`,
      jaw: (a, b, cheap, sat) => `<b>Açık uçlu uçuş:</b> ${trSfx(a, "dat")} gidiş, ${trSfx(b, "abl")} dönüş. En ucuzu ${cheap}${sat ? `; Cumartesi inişlisi ${sat}` : ""}.`,
      xian: "Terracotta Ordusu için <b>Şian</b>. Daha kısa yolculuk için <b>Vuhan</b>.",
      wh: "En kısa yolculuklar için <b>Vuhan</b>. Terracotta Ordusu için <b>Şian</b>.",
      fl: "Zhangjiajie ile Şian arasında <b>kısa bir uçuş</b> var (direkt tren yok).",
      noMap: "Harita için internet bağlantısı gerekiyor.",
      other: "diğer seçenek", photo: "Fotoğraf"
    },
    days: {
      h: "Gün gün",
      intro: (a, b, route) => `${a} – ${b}: ${route}. Sadece öneri.`,
      stay: "Konaklama", gw: "🎏 Altın Hafta", arrive: "✈️ Varış", train: "🚄 Tren", fly: "✈️ Uçuş", home: "✈️ Dönüş",
      arriveIn: (c) => `${trSfx(c, "dat")} varış`,
      howCKG: "Çongçing'e (CKG) ya da Çengdu'ya (TFU) inin; Çengdu'dan trenle 1–1,5 sa.",
      howSH: "Pudong'a (PVG) iniş. Metro ya da Maglev ile şehre 1 sa.",
      lateZJJ: "Akşam varış. Wulingyuan'a transfer (40 dk).",
      late: "Akşam varış.",
      homeSH: "Rahat bir sabah. Akşam Pudong (PVG) ya da Hongqiao'dan (SHA) uçuş.",
      homeCKG: "Rahat bir sabah. Akşam Çongçing'den (CKG) ya da Çengdu'dan (TFU, trenle 1–1,5 sa) uçuş.",
      toIst: "İstanbul", second: "2. sınıf"
    },
    places: { h: "Yerler", intro: "Her duraktaki öne çıkanlar. Soluk kartlar rotanızda değil.", route: "⭐ Rotam", all: "Tümü", optional: "isteğe bağlı" },
    trains: {
      h: "Trenler",
      intro: "China Railway 12306 tarifesinden (Kasım 2026). Mayıs'a kadar saatler biraz değişebilir. İstasyon adları biletteki gibi.",
      warnT: "⏰ Satış her trenden 15 gün önce açılır.",
      warn: (gw) => `${gw}Trip.com'dan alın (yabancı kart, ön sipariş).`,
      gwLeg: (d, t, open) => `${d} yolculuğunuz (${t}) tatilin son günü: satış açılır açılmaz alın (${open}). `,
      gwNone: "",
      th: { date: "Tarih", ride: "Yolculuk", train: "Tren", time: "Saat", second: "2. sınıf", also: "Alternatifler", from: "Kalkış", to: "Varış", fare: "Ücret" },
      total: "Kişi başı toplam", onTrains: "trende",
      first: (y) => `1. sınıf: toplam yaklaşık ${y}.`,
      ride: (n) => `${n}. yolculuk`, flight: "uçuş", perDay: (n) => `günde ${n}`, anyTime: "her zaman alınır", opens: (d) => `satış ${d}`,
      book: "Trip.com", official: "12306", tripFl: "Trip.com",
      econ: "ekonomi, 1 yetişkin", pp2: "2. sınıf, kişi başı", first1: "1. sınıf",
      stations: "İstasyonlar", rail: "Tren:"
    },
    flights: {
      h: "Uçuşlar",
      intro: (out, land, back, checked) => `Çıkış ${out}, varış ${land}. Dönüş ${back}. Kişi başı ekonomi fiyatları, ${checked} tarihinde bakıldı.`,
      pax: "Yolcu",
      jawT: "🧾 Açık uçlu gidiş-dönüş",
      jawIntro: "Bir şehre gidiş, başka şehirden dönüş, tek rezervasyonda. Aktarmalar dahil.",
      tags: { cheap: "En ucuz", sat: "Cumartesi iniş, en ucuz", comfort: "En hızlı", cheapsat: "En ucuz · Cumartesi iniş" },
      fri: "Cuma akşamı iner: bir gece otel ekleyin.",
      sep: "İki ayrı bilet.",
      outL: "Gidiş", backL: "Dönüş",
      perPerson: "kişi başı", group: (n, total) => `${n} kişi: ${total}`,
      search: "Bu tarihlerle ara:", gfMulti: "Google Flights", skyMulti: "Skyscanner",
      watch: "Uzun aktarmalar var (Guangzhou'da 16 saate kadar). Bilet almadan önce vize gerekli.",
      oneWayT: "Tek yön seçenekler",
      outT: (d, to) => `🛫 ${d} → ${to}`, backT: (d, from) => `🛬 ${d} · ${from} → IST`,
      ckgTFU: "Çongçing / Çengdu", sh: "Şanghay",
      pick: "İyi seçim", cheap: "En ucuz"
    },
    det: {
      h: "Ek rotalar", intro: "İki isteğe bağlı ek. Buradan ya da üstteki çubuktan açıp kapatın.",
      get: "Ulaşım:", do: "Yapılacaklar:", stay: "Konaklama:", costs: "Maliyet:", tips: "Alışveriş:", none: "başka yerden gece eksilmiyor", nightsWord: "gece",
      add: "+ Plana ekle", added: "✓ Eklendi · çıkar",
      zBadge: "🏔️ Zhangjiajie · Hunan", zT: "Avatar dağları",
      zP: "200 m'ye varan sisli kumtaşı sütunlar: Avatar'ın uçan dağlarının modeli. UNESCO.",
      zHowFwd: (xian) => `Chongqing East'ten trenle (2–3 sa), ardından ${xian ? "Şian'a uçuş (1 sa 25 dk)" : "Vuhan'a tren (5 sa)"}.`,
      zHowRev: (xian) => `${xian ? "Şian'dan uçuş (1 sa 30 dk)" : "Vuhan'dan tren (5 sa)"}, ardından Chongqing East'e tren (2–2,5 sa).`,
      zDo: "Avatar Dağı, Bailong Asansörü, Tianmen Dağı.",
      zStay: "Wulingyuan kasabası. En az 2 gece. Yağmurluk alın.",
      zGW: "",
      cBadge: "💎 Zhecheng · Henan", cT: "Elmas başkenti",
      cP: "<b>Çin'in laboratuvar elmaslarının %60'ından fazlasını</b> üreten bir tarım ilçesi.",
      cHowFwd: (xian) => `Trenle Şangçiu (${xian ? "Şian'dan 2 sa 43 dk" : "Vuhan'dan 3 sa 07 dk"}), arabayla Zhecheng 1 sa, ardından Pekin'e tren (3 sa 40 dk).`,
      cHowRev: (xian) => `Pekin'den Şangçiu'ya tren (3 sa 19 dk), arabayla Zhecheng 1 sa, ardından ${xian ? "Şian'a tren (2 sa 52 dk)" : "Vuhan'a tren (2 sa 54 dk)"}.`,
      cDo: "Liliang ve Huifeng fabrika showroomları, Elmas Moda Sokağı, akşam Şangçiu eski şehri.",
      cTips: "doğalın yaklaşık 1/5–1/10'u fiyatına. IGI, GIA ya da NGTC raporu isteyin, fabrika mağazasından alın. Ziyareti otel aracılığıyla ayarlayın.",
      cCar: " + araç (yön başına 1 sa)",
      alsoT: "Bu da olur", also: "Zhecheng, Pekin ile Şanghay arasına da sığar (Şangçiu → Şanghay 3–4 sa)."
    },
    info: {
      h: "İpuçları", intro: "Türk pasaportlu bir grup için.",
      visaT: "🛂 Vize",
      visa: ["<b>Türk pasaportuyla turist (L) vizesi gerekiyor.</b>", "İstanbul'daki Çin Vizesi Başvuru Merkezi'ne 1–2 ay önce, uçuş ve otel rezervasyonlarıyla başvurun.", "Başka pasaportu (ör. AB) olanlar 30 gün vizesiz girebilir: 2027'de de geçerli mi kontrol edin."],
      gwT: "🎏 Altın Hafta",
      gw: ["<b>1–5 Mayıs 2027</b> olması bekleniyor. Resmî tarihler Kasım–Aralık 2026'da açıklanır.", "Trenler dolar, gezilecek yerler kalabalık, oteller pahalı olur."],
      gwLeg: (d) => `Planınızda tatile denk gelen bir yolculuk var (${d}, son gün). Satış açılır açılmaz alın.`,
      gwNone: "Planınızda tatil günlerinde tren yok.",
      gwB: "8–23 Mayıs tarihleri tatile hiç denk gelmiyor.",
      gwSat: "",
      bookT: "🚄 Trenler",
      book: ["Satış <b>15 gün</b> önce açılır. Az seferli trenler önce dolar.", "<b>Trip.com</b> yabancı kart kabul eder. <b>12306</b> en ucuzu.", "Kapıda pasaportu okutun. 45 dk erken gelin.", "Kişi başı yaklaşık 20 kg bagaj, teslim yok."],
      moneyT: "💳 Para",
      money: ["Yola çıkmadan kartınızla <b>Alipay</b> ya da <b>WeChat Pay</b> kurun.", "Yedek olarak biraz nakit (¥) taşıyın."],
      netT: "📱 İnternet ve uygulamalar",
      net: ["Google, WhatsApp ve Instagram engelli. Yurt dışı paketi ya da seyahat eSIM'i bunu aşar.", "<b>Trip.com</b>, <b>Alipay</b>, <b>Amap</b>, <b>Didi</b>, <b>WeChat</b> ve bir çeviri uygulaması indirin."],
      wxT: "🌤️ Mayıs'ta hava (ortalama en yüksek)", wx: "Ilık, ara ara sağanak. Kat kat giyinin, yağmurluk alın.",
      aheadT: "🎟️ Önceden alın",
      ahead: ["<b>Yasak Şehir:</b> 7 gün önceden, Pazartesi kapalı.", "<b>Terracotta Ordusu, Shaanxi Tarih Müzesi:</b> saatli bilet.", "<b>Zhangjiajie, Tianmen:</b> Trip.com'dan alın."],
      partyT: "🧭 Grup",
      party: ["Yan yana oturmak için tren koltuklarını tek siparişte alın.", "4 kişiden fazlaysanız Didi XL ya da iki araç.", "Herkese aynı planı göndermek için 🔗 Paylaş'ı kullanın."],
      fxT: "💱 Kur çevirileri",
      fx: (eur, cny, when, live) => `₺ tutarları yaklaşıktır: 1 € = ₺${eur}, 1 ¥ = ₺${cny} (${live ? "güncel" : "ECB"}, ${when}).`
    },
    foot: (checked) => `<b>Kaynaklar:</b> trenler <a href="https://www.12306.cn/en/index.html" target="_blank" rel="noopener">12306</a> ve <a href="https://www.trip.com/trains/" target="_blank" rel="noopener">Trip.com</a>; uçuşlar Google Flights ve Skyscanner (${checked}); kurlar ECB ve open.er-api.com. Tren numaraları tarife değişikliklerinde değişebilir; bilet alırken doğrulayın. Harita © Esri, © OpenStreetMap.`,
    credits: "Fotoğraf kaynakları (Wikimedia Commons)"
  }
};

/* Food tab, local picks, Zhengzhou day stop */
(function (I) {
  const en = I.en, tr = I.tr;
  en.tabs.food = "Food"; tr.tabs.food = "Yemek";
  en.ov.jump.food = "🍜 Food"; tr.ov.jump.food = "🍜 Yemek";
  en.b.zz = "💎 Zhengzhou stop"; tr.b.zz = "💎 Zhengzhou molası";
  en.places.local = "🧭 Local picks"; tr.places.local = "🧭 Yerel öneriler";
  en.places.localTag = "local"; tr.places.localTag = "yerel";
  en.food = { h: "Food", intro: "Street eats and sit-down picks at each stop. Pork is common; Xi'an's Muslim Quarter is best for halal food.", street: "Street food", sit: "Sit-down", pork: "pork", henan: "Henan", other: "Optional stops" };
  tr.food = { h: "Yemek", intro: "Her durakta sokak lezzetleri ve oturmalı mekânlar. Domuz eti yaygın; helal yemek için en iyi yer Şian'ın Müslüman Mahallesi.", street: "Sokak lezzetleri", sit: "Oturmalı", pork: "domuz", henan: "Henan", other: "İsteğe bağlı duraklar" };
  en.zz = { name: "Zhengzhou", day: (a, b) => `Zhengzhou stop (${a}–${b}): leave bags at the station, then Didi to the Lab-grown Diamond Trading Centre in the Airport Zone (about 40 min).`, stop: "stop" };
  tr.zz = { name: "Zhengzhou", day: (a, b) => `Zhengzhou molası (${a}–${b}): bavulları istasyonda bırakın, Didi ile Havalimanı Bölgesi'ndeki Laboratuvar Elması Ticaret Merkezi'ne gidin (yaklaşık 40 dk).`, stop: "mola" };
  Object.assign(en.det, {
    zzBadge: "💎 Zhengzhou · Henan", zzT: "Diamond day stop",
    zzP: "Break the train ride at Zhengzhou East for about 5 hours. No extra night, about ¥30 more.",
    zzHowFwd: (mid, t1, t2) => `${mid} → Zhengzhou East (${t1}), afternoon train to Beijing West (${t2}).`,
    zzHowRev: (mid, t1, t2) => `Beijing West → Zhengzhou East (${t1}), afternoon train to ${mid} (${t2}).`,
    zzDo: "Zhengzhou Lab-grown Diamond Trading Centre (opened 2025, Airport Zone, ~40 min by car). Mostly wholesale, but it sells retail too.",
    zzVs: "Easier than Zhecheng and no extra night, but you see showrooms, not factories. You can't combine the two."
  });
  Object.assign(tr.det, {
    zzBadge: "💎 Zhengzhou · Henan", zzT: "Elmas için gün içi mola",
    zzP: "Tren yolculuğunu Zhengzhou East'te yaklaşık 5 saat bölün. Ekstra gece yok, yaklaşık ¥30 fark.",
    zzHowFwd: (mid, t1, t2) => `${mid} → Zhengzhou East (${t1}), öğleden sonra Beijing West'e tren (${t2}).`,
    zzHowRev: (mid, t1, t2) => `Beijing West → Zhengzhou East (${t1}), öğleden sonra ${mid} yönüne tren (${t2}).`,
    zzDo: "Zhengzhou Laboratuvar Elması Uluslararası Ticaret Merkezi (2025'te açıldı, Havalimanı Bölgesi, arabayla ~40 dk). Çoğunlukla toptan, ama perakende de satıyor.",
    zzVs: "Zhecheng'den kolay ve ekstra gece yok; ama fabrika değil showroom görürsünüz. İkisi birlikte seçilemez."
  });
})(window.I18N);

/* Things To Do tab */
(function (I) {
  I.en.tabs.todo = "Things To Do"; I.tr.tabs.todo = "Yapılacaklar";
  I.en.ov.jump.todo = "🎯 Things To Do"; I.tr.ov.jump.todo = "🎯 Yapılacaklar";
  I.en.todo = { h: "Things To Do", intro: "What to eat, see and do at each stop. Pick a section, then filter by city.", food: "🍜 Food", tour: "🏛️ Tourism", life: "🌃 Life", route: "⭐ My route", all: "All", optional: "optional", street: "Street food", sit: "Sit-down", pork: "pork", henan: "Henan", foodNote: "Pork is common (marked 🐖). For halal food, head to Xi'an's Muslim Quarter or look for 清真 signs." };
  I.tr.todo = { h: "Yapılacaklar", intro: "Her durakta ne yenir, ne görülür, ne yapılır. Bir bölüm seçin, sonra şehre göre filtreleyin.", food: "🍜 Yemek", tour: "🏛️ Turistik", life: "🌃 Yaşam", route: "⭐ Rotam", all: "Tümü", optional: "isteğe bağlı", street: "Sokak lezzetleri", sit: "Oturmalı", pork: "domuz", henan: "Henan", foodNote: "Domuz eti yaygın (🐖 ile işaretli). Helal yemek için Şian'ın Müslüman Mahallesi'ne gidin ya da 清真 tabelalarını arayın." };
})(window.I18N);
