/* China by Rail · May 2027 — all trip data in one place.
   Train times/fares: China Railway 12306, sample date Thu 5 Nov 2026 (Q4-2026 timetable).
   Flight fares: Google Flights, checked 26 Oct 2026, EUR, 1 adult, economy, one-way. */

window.TRIP = {
  checked: "26 Oct 2026",

  windows: {
    A: {
      id: "A", label: "Sat 1 – Sun 16 May", start: "2027-05-01", end: "2027-05-16",
      flyOut: "2027-04-30", flyBack: "2027-05-16",
      note: "Includes all of 7–15 May. Starts in Golden Week (1–5 May), so you stay put in the first city until it ends.",
      goldenWeek: ["2027-05-01", "2027-05-02", "2027-05-03", "2027-05-04", "2027-05-05"]
    },
    B: {
      id: "B", label: "Sat 8 – Sun 23 May", start: "2027-05-08", end: "2027-05-23",
      flyOut: "2027-05-07", flyBack: "2027-05-23",
      note: "No holiday crowds. Misses Fri 7 May (you fly out that evening).",
      goldenWeek: []
    }
  },

  /* Nights per stop. Roles: first city on the route, ZJJ, MID (Xi'an/Wuhan), SQ (Shangqiu/Zhecheng), BJ, and the last city.
     Every row adds up to 15 nights. */
  nights: {
    A: {
      fwd: { none: { CKG: 5, MID: 2, BJ: 4, SH: 4 }, zjj: { CKG: 4, ZJJ: 2, MID: 2, BJ: 4, SH: 3 }, zc: { CKG: 5, MID: 2, SQ: 1, BJ: 4, SH: 3 }, both: { CKG: 4, ZJJ: 2, MID: 2, SQ: 1, BJ: 3, SH: 3 } },
      rev: { none: { SH: 5, BJ: 4, MID: 2, CKG: 4 }, zjj: { SH: 5, BJ: 4, MID: 2, ZJJ: 2, CKG: 2 }, zc: { SH: 5, BJ: 4, SQ: 1, MID: 2, CKG: 3 }, both: { SH: 5, BJ: 3, SQ: 1, MID: 2, ZJJ: 2, CKG: 2 } }
    },
    B: {
      fwd: { none: { CKG: 3, MID: 2, BJ: 5, SH: 5 }, zjj: { CKG: 3, ZJJ: 2, MID: 2, BJ: 4, SH: 4 }, zc: { CKG: 3, MID: 2, SQ: 1, BJ: 5, SH: 4 }, both: { CKG: 3, ZJJ: 2, MID: 2, SQ: 1, BJ: 4, SH: 3 } },
      rev: { none: { SH: 5, BJ: 5, MID: 2, CKG: 3 }, zjj: { SH: 4, BJ: 4, MID: 2, ZJJ: 2, CKG: 3 }, zc: { SH: 4, BJ: 5, SQ: 1, MID: 2, CKG: 3 }, both: { SH: 3, BJ: 4, SQ: 1, MID: 2, ZJJ: 2, CKG: 3 } }
    }
  },

  cities: {
    CKG: { name: "Chongqing", zh: "重庆", ll: [29.557, 106.577], color: "#e8452c", emoji: "🌶️", img: "hongyadong", temp: 27,
      tag: "Neon mountain megacity",
      blurb: "Cliffside city on the Yangtze: monorails through buildings, glowing stilt houses, fiery hotpot.",
      stay: "Jiefangbei, Yuzhong.",
      stations: "West (Xi'an trains), North (Wuhan trains), East (Zhangjiajie trains). Check your ticket." },
    MID_XIAN: { key: "XIAN", name: "Xi'an", zh: "西安", ll: [34.341, 108.94], color: "#d97706", emoji: "🗿", img: "terracotta", temp: 26,
      tag: "Terracotta Army city",
      blurb: "Old Silk Road capital: Terracotta Army, a Ming wall you can cycle, night-market food.",
      stay: "Inside the wall, near the Bell Tower.",
      stations: "Xi'an North (Metro 2, 4, 14)." },
    MID_WH: { key: "WH", name: "Wuhan", zh: "武汉", ll: [30.593, 114.305], color: "#0ea5e9", emoji: "🏯", img: "crane", temp: 27,
      tag: "River city, short rides",
      blurb: "Yangtze city with the Yellow Crane Tower, East Lake and a top museum.",
      stay: "Hankou riverside.",
      stations: "Hankou (Chongqing trains) or Wuhan (Beijing, Zhangjiajie, Shangqiu trains), 40 min apart." },
    BJ: { name: "Beijing", zh: "北京", ll: [39.904, 116.397], color: "#dc2626", emoji: "🏮", img: "forbidden", temp: 26,
      tag: "Emperors and the Great Wall",
      blurb: "Forbidden City, Temple of Heaven, hutongs, Peking duck, Great Wall.",
      stay: "Dongcheng, near Wangfujing or the hutongs.",
      stations: "Arrive at Beijing West, leave from Beijing South (30 min apart)." },
    SH: { name: "Shanghai", zh: "上海", ll: [31.230, 121.474], color: "#7c3aed", emoji: "🌃", img: "lujiazui", temp: 24,
      tag: "Skyline and garden day trips",
      blurb: "The Bund, old lanes, Yu Garden. Suzhou (25 min) and Hangzhou (1 h) as day trips.",
      stay: "People's Square or Jing'an.",
      stations: "Hongqiao (next to SHA airport). Pudong airport is 1 h away." },
    ZJJ: { name: "Zhangjiajie", zh: "张家界", ll: [29.346, 110.546], color: "#16a34a", emoji: "🏔️", img: "avatar", temp: 25, detour: "zjj",
      tag: "The real Avatar mountains",
      blurb: "Misty sandstone pillars that inspired Avatar's floating mountains. UNESCO.",
      stay: "Wulingyuan town, at the park gate.",
      stations: "Zhangjiajie West (train), Hehua (DYG, airport)." },
    SQ: { name: "Shangqiu · Zhecheng", short: "Zhecheng", zh: "商丘 · 柘城", ll: [34.414, 115.656], color: "#0891b2", emoji: "💎", img: "labdiamond", temp: 26, detour: "zc",
      tag: "China's diamond capital",
      blurb: "Zhecheng makes over 60% of China's lab-grown diamonds. Shangqiu has a walled old town.",
      stay: "Shangqiu old town or by the station.",
      stations: "Shangqiu station. Zhecheng is 1 h by car." }
  },

  /* Map waypoints follow the real lines the recommended trains use (12306 stop lists). */
  paths: {
    "CKG-XIAN": [[29.557, 106.577], [29.60, 105.06], [30.63, 104.14], [31.78, 104.75], [32.44, 105.84], [33.07, 107.02], [33.52, 107.99], [34.341, 108.94]],
    "CKG-WH": [[29.557, 106.577], [29.72, 106.62], [30.81, 108.41], [31.2, 110.0], [30.75, 111.30], [30.62, 114.25], [30.593, 114.305]],
    "XIAN-BJ": [[34.341, 108.94], [34.62, 112.45], [34.76, 113.78], [36.10, 114.39], [38.04, 114.51], [38.87, 115.46], [39.904, 116.397]],
    "WH-BJ": [[30.593, 114.305], [32.13, 114.07], [33.0, 114.0], [33.58, 114.0], [34.76, 113.78], [36.10, 114.39], [38.04, 114.51], [38.87, 115.46], [39.904, 116.397]],
    "BJ-SH": [[39.904, 116.397], [39.06, 117.06], [38.30, 116.84], [37.43, 116.36], [36.67, 116.89], [34.27, 117.29], [32.85, 117.39], [31.97, 118.80], [31.30, 120.59], [31.230, 121.474]],
    "CKG-ZJJ": [[29.557, 106.577], [29.70, 107.39], [29.32, 107.76], [29.29, 108.17], [29.53, 108.77], [29.15, 110.44], [29.346, 110.546]],
    "ZJJ-WH": [[29.346, 110.546], [29.15, 110.44], [28.84, 109.97], [28.27, 109.74], [27.96, 109.60], [27.55, 109.98], [27.70, 111.99], [27.92, 112.90], [28.15, 113.06], [29.37, 113.13], [29.88, 114.32], [30.593, 114.305]],
    "ZJJ-XIAN": "flight",
    "XIAN-SQ": [[34.341, 108.94], [34.62, 112.45], [34.76, 113.78], [34.79, 114.31], [34.414, 115.656]],
    "WH-SQ": [[30.593, 114.305], [32.13, 114.07], [33.0, 114.0], [33.58, 114.0], [34.76, 113.78], [34.79, 114.31], [34.414, 115.656]],
    "SQ-BJ": [[34.414, 115.656], [35.25, 115.45], [35.97, 115.87], [36.45, 115.98], [37.06, 115.67], [37.74, 115.67], [38.71, 116.10], [39.03, 115.98], [39.51, 116.41], [39.904, 116.397]]
  },

  /* Extra map markers (context only) */
  waypoints: [
    { n: "Chengdu", zh: "成都", ll: [30.66, 104.06], t: "Alternative gateway with nonstops to Istanbul. 1–1.5 h by train to Chongqing. Pandas." },
    { n: "Zhecheng", zh: "柘城", ll: [34.09, 115.31], t: "Diamond capital, 1 h by car from Shangqiu." },
    { n: "Fenghuang", zh: "凤凰", ll: [27.96, 109.60], t: "The Zhangjiajie–Wuhan train stops here." },
    { n: "Suzhou", zh: "苏州", ll: [31.30, 120.59], t: "Gardens, 25 min from Shanghai." },
    { n: "Hangzhou", zh: "杭州", ll: [30.27, 120.15], t: "West Lake, 1 h from Shanghai." }
  ],

  /* Recommended trains (2nd / 1st class ¥, per person). Keys are directional. */
  legs: {
    "CKG-XIAN": { rec: ["G1834", "Chongqing West", "10:57", "Xi'an North", "16:19", "5h22", 434, 694],
      alts: [["G1308", "Chongqing West", "08:36", "Xi'an North", "14:04", "5h28", 418], ["G2234", "Chongqing West", "09:53", "Xi'an North", "15:46", "5h53", 443], ["D1713", "Chongqing North", "07:19", "Xi'an North", "13:02", "5h43", 302]],
      daily: 31, note: "Via Chengdu and over the Qinling mountains. Most scenic ride." },
    "XIAN-CKG": { rec: ["G3359", "Xi'an North", "09:41", "Chongqing West", "14:56", "5h15", 443, 708],
      alts: [["G2239", "Xi'an North", "07:38", "Chongqing West", "13:11", "5h33", 438], ["G3351", "Xi'an North", "11:05", "Chongqing West", "16:20", "5h15", 451], ["D1979", "Xi'an North", "12:07", "Chongqing North", "17:19", "5h12", 312]],
      daily: 29, note: "Over the Qinling mountains via Chengdu. Sit by the window." },
    "CKG-WH": { rec: ["G3982", "Chongqing North", "09:52", "Hankou", "13:45", "3h53", 419, 668],
      alts: [["G3392", "Chongqing North", "08:38", "Hankou", "12:59", "4h21", 445], ["G3966", "Chongqing North", "16:37", "Hankou", "20:51", "4h14", 456]],
      daily: 44, note: "New line (Sep 2026) via the Three Gorges area." },
    "WH-CKG": { rec: ["G3965", "Hankou", "09:34", "Chongqing North", "14:00", "4h26", 445, 711],
      alts: [["G3391", "Hankou", "12:32", "Chongqing North", "16:57", "4h25", 458], ["G3981", "Hankou", "16:33", "Chongqing North", "20:27", "3h54", 415]],
      daily: 49, note: "Via the Three Gorges area." },
    "XIAN-BJ": { rec: ["G366", "Xi'an North", "09:10", "Beijing West", "13:30", "4h20", 587, 939],
      alts: [["G322", "Xi'an North", "10:09", "Beijing West", "14:26", "4h17", 525], ["G354", "Xi'an North", "12:04", "Beijing West", "16:32", "4h28", 618], ["G368", "Xi'an North", "14:26", "Beijing West", "18:37", "4h11", 587]],
      daily: 36, note: "Plenty of trains. Pick by time." },
    "BJ-XIAN": { rec: ["G365", "Beijing West", "09:55", "Xi'an North", "14:05", "4h10", 587, 939],
      alts: [["G351", "Beijing West", "07:55", "Xi'an North", "12:05", "4h10", 587], ["G353", "Beijing West", "12:55", "Xi'an North", "17:08", "4h13", 618], ["G323", "Beijing West", "15:00", "Xi'an North", "19:12", "4h12", 587]],
      daily: 36, note: "Plenty of trains. Pick by time." },
    "WH-BJ": { rec: ["G344", "Wuhan", "08:36", "Beijing West", "12:24", "3h48", 623, 997],
      alts: [["G318", "Wuhan", "09:21", "Beijing West", "13:35", "4h14", 498], ["G346", "Hankou", "11:28", "Beijing West", "15:30", "4h02", 623], ["G336", "Wuhan", "13:35", "Beijing West", "17:23", "3h48", 623]],
      daily: 46, note: "Leaves from Wuhan station, not Hankou." },
    "BJ-WH": { rec: ["G339", "Beijing West", "09:05", "Wuhan", "12:53", "3h48", 623, 997],
      alts: [["G381", "Beijing West", "10:00", "Wuhan", "13:55", "3h55", 623], ["G315", "Beijing West", "13:00", "Wuhan", "16:55", "3h55", 561], ["G343", "Beijing West", "13:05", "Hankou", "17:07", "4h02", 623]],
      daily: 47, note: "Plenty of trains. Pick by time." },
    "BJ-SH": { rec: ["G7", "Beijing South", "09:00", "Shanghai Hongqiao", "13:37", "4h37", 692, 1107],
      alts: [["G11", "Beijing South", "10:03", "Shanghai Hongqiao", "14:39", "4h36", 661], ["G13", "Beijing South", "16:00", "Shanghai Hongqiao", "20:28", "4h28", 661], ["G25", "Beijing South", "17:00", "Shanghai Hongqiao", "21:18", "4h18", 661]],
      daily: 51, note: "350 km/h flagship. Leaves from Beijing South." },
    "SH-BJ": { rec: ["G8", "Shanghai Hongqiao", "08:00", "Beijing South", "12:26", "4h26", 692, 1107],
      alts: [["G12", "Shanghai Hongqiao", "10:00", "Beijing South", "14:24", "4h24", 692], ["G22", "Shanghai Hongqiao", "15:00", "Beijing South", "19:33", "4h33", 661], ["G44", "Shanghai Hongqiao", "15:04", "Beijing South", "19:37", "4h33", 553]],
      daily: 49, note: "350 km/h flagship. Arrives at Beijing South." },
    "CKG-ZJJ": { rec: ["G2445", "Chongqing East", "09:52", "Zhangjiajie West", "11:58", "2h06", 235, 357],
      alts: [["G3869", "Chongqing East", "07:12", "Zhangjiajie West", "09:41", "2h29", 207], ["G2427", "Chongqing East", "08:08", "Zhangjiajie West", "10:42", "2h34", 215], ["G2447", "Chongqing East", "16:21", "Zhangjiajie West", "18:49", "2h28", 216]],
      daily: 24, note: "From Chongqing East, 45 min from the centre." },
    "ZJJ-CKG": { rec: ["G2450", "Zhangjiajie West", "09:55", "Chongqing East", "12:07", "2h12", 206, 331],
      alts: [["G2418", "Zhangjiajie West", "11:50", "Chongqing East", "14:20", "2h30", 206], ["G2446", "Zhangjiajie West", "15:54", "Chongqing East", "17:59", "2h05", 235]],
      daily: 24, note: "Through the Wuling mountains." },
    "ZJJ-WH": { rec: ["G3847", "Zhangjiajie West", "10:02", "Wuhan", "15:08", "5h06", 455, 740],
      alts: [["G3647", "Zhangjiajie West", "07:39", "Wuhan", "12:40", "5h01", 443], ["C7785 + G", "Zhangjiajie West", "08:00", "Changsha → Changsha South → Wuhan", "~12:00", "~4h", "~300"]],
      daily: 2, note: "Only 2 direct trains a day, past Fenghuang. Fallback: change in Changsha." },
    "WH-ZJJ": { rec: ["G3845", "Wuhan", "14:04", "Zhangjiajie West", "19:04", "5h00", 467, 746],
      alts: [["G389 + C7782", "Wuhan", "08:00", "Changsha South → Changsha → Zhangjiajie West", "12:53", "4h53", 343], ["G3649", "Wuhan", "17:08", "Zhangjiajie West", "22:24", "5h16", 411]],
      daily: 2, note: "Direct train arrives late. For a free afternoon, change in Changsha." },
    "ZJJ-XIAN": { flight: true, rec: ["3U · Sichuan Airlines", "Zhangjiajie DYG", "11:05", "Xi'an XIY", "12:30", "1h25", null, null],
      alts: [["MU · China Eastern", "Zhangjiajie DYG", "22:45", "Xi'an XIY", "00:15+1", "1h30", null], ["Rail: C7785 + G404", "Zhangjiajie West", "08:00", "Changsha South → Xi'an North", "16:50", "8h50", 857]],
      eur: 124, daily: 2, note: "No direct train, so fly. Rail fallback via Changsha takes ~9 h." },
    "XIAN-ZJJ": { flight: true, rec: ["3U · Sichuan Airlines", "Xi'an XIY", "08:50", "Zhangjiajie DYG", "10:20", "1h30", null, null],
      alts: [["MU · China Eastern", "Xi'an XIY", "20:00", "Zhangjiajie DYG", "21:45", "1h45", null], ["Rail: G412 + G2446", "Xi'an North", "07:27", "Changsha South → Changsha → Zhangjiajie West", "15:51", "8h24", 804]],
      eur: 124, daily: 2, note: "No direct train, so fly. Rail fallback via Changsha takes ~8.5 h." },
    "XIAN-SQ": { rec: ["G2238", "Xi'an North", "08:18", "Shangqiu", "11:01", "2h43", 323, 518],
      alts: [["G1900", "Xi'an North", "07:23", "Shangqiu", "10:26", "3h03", 323], ["G862", "Xi'an North", "11:50", "Shangqiu", "14:49", "2h59", 323]],
      daily: 53, note: "Arrives before noon: afternoon in Zhecheng." },
    "SQ-XIAN": { rec: ["G465", "Shangqiu", "10:48", "Xi'an North", "13:40", "2h52", 323, 518],
      alts: [["G2027", "Shangqiu", "12:56", "Xi'an North", "15:56", "3h00", 323], ["G3165", "Shangqiu", "14:50", "Xi'an North", "17:47", "2h57", 323]],
      daily: 50, note: "Via Zhengzhou." },
    "WH-SQ": { rec: ["G1848", "Wuhan", "10:10", "Shangqiu", "13:17", "3h07", 368, 588],
      alts: [["G934", "Wuhan", "12:20", "Shangqiu", "15:13", "2h53", 348]],
      daily: 6, note: "Only ~6 trains a day. Book early." },
    "SQ-WH": { rec: ["G2065", "Shangqiu", "11:34", "Wuhan", "14:28", "2h54", 368, 588],
      alts: [["G2689", "Shangqiu", "10:36", "Wuhan", "13:40", "3h04", 329], ["G1311", "Shangqiu", "10:59", "Wuhan", "14:07", "3h08", 348]],
      daily: 8, note: "Via Zhengzhou." },
    "SQ-BJ": { rec: ["G3938", "Shangqiu", "09:02", "Beijing West", "12:50", "3h48", 316, 507],
      alts: [["G3946", "Shangqiu", "10:19", "Beijing West", "14:00", "3h41", 338], ["G3976", "Shangqiu", "11:24", "Beijing West", "15:03", "3h39", 316]],
      daily: 11, note: "New Xiong'an line (Sep 2026)." },
    "BJ-SQ": { rec: ["G3939", "Beijing West", "10:30", "Shangqiu", "13:49", "3h19", 303, 485],
      alts: [["G3975", "Daxing Airport", "13:45", "Shangqiu", "17:17", "3h32", 292]],
      daily: 12, note: "New Xiong'an line. Arrives early afternoon." }
  },

  /* Day plans per stop: a = arrival afternoon/evening; d = full days in order (cycled if more nights). */
  days: {
    CKG: { a: "Hongyadong lit up, then hotpot.",
      d: ["Ciqikou, Liziba monorail, Yangtze cableway, Eling Park at dusk.",
          "Day trip: Dazu Rock Carvings (1.5 h).",
          "Day trip: Wulong Karst (2.5–3 h).",
          "Three Gorges Museum, night river cruise.",
          "Slow day: Shibati steps, noodles."],
      gw: "Golden Week: go early or late to the big sights." },
    XIAN: { a: "Bell Tower lit up, Muslim Quarter dinner.",
      d: ["Terracotta Army (book ahead), Big Wild Goose Pagoda at night.",
          "Cycle the city wall, Shaanxi History Museum.",
          "Optional: Mount Huashan."] },
    WH: { a: "Hankou riverside food crawl.",
      d: ["Yellow Crane Tower, Hubei Museum, East Lake by bike.",
          "Reganmian breakfast, walk the Yangtze Bridge."] },
    BJ: { a: "Qianmen, Tiananmen at dusk, Peking duck.",
      d: ["Forbidden City (book 7 days ahead), Jingshan Park view.",
          "Great Wall at Mutianyu.",
          "Temple of Heaven, hutongs, Houhai.",
          "Summer Palace, Olympic Park at night.",
          "Lama Temple, 798 Art District."] },
    SH: { a: "The Bund at night.",
      d: ["Yu Garden, Shanghai Tower at sunset.",
          "Day trip: Suzhou gardens (25 min).",
          "Former French Concession, soup dumplings.",
          "Day trip: Hangzhou West Lake (1 h).",
          "Zhujiajiao water town or shopping."],
      gw: "Golden Week: save Suzhou and Hangzhou for after 5 May." },
    ZJJ: { a: "Transfer to Wulingyuan (40 min), Golden Whip Stream walk.",
      d: ["Forest Park: Avatar Mountain, Bailong Elevator, Tianzi Mountain.",
          "Tianmen Mountain or the glass bridge."] },
    SQ: { a: "Car to Zhecheng (1 h): diamond showrooms. Evening in Shangqiu old town.",
      d: ["Shangqiu old town walls."] }
  },


  /* Open-jaw round trips on one search, layovers allowed. Checked 26 Oct 2026, EUR per adult.
     Skyscanner prices were in TRY and converted at €1 = ₺55.82. "fri" = lands Friday evening (one extra night). */
  jaw: {
    A: {
      fwd: [
        { tag: "cheap", eur: 510, src: "Skyscanner", fri: true, out: ["China Southern", "Fri 00:30 → Fri 19:35", "IST → CAN → TFU"], back: ["China Southern", "Sun 22:05 → Mon 22:10", "PVG → CAN → IST"] },
        { tag: "sat", eur: 637, src: "Google", out: ["China Southern", "Fri 00:30 → Sat 09:35", "IST → CAN → CKG"], back: ["China Southern", "Sun 20:00 → Mon 07:15", "SHA → CAN → IST"] },
        { tag: "comfort", eur: 808, sep: true, out: ["Sichuan Airlines", "Fri 15:40 → Sat 05:20", "IST → TFU"], back: ["Sichuan Airlines", "Sun 20:15 → Mon 06:30", "PVG → TFU → IST"] }
      ],
      rev: [
        { tag: "cheap", eur: 528, src: "Skyscanner", fri: true, out: ["China Southern", "Fri 00:30 → Fri 20:30", "IST → CAN → SHA"], back: ["China Southern", "Sun 23:40 → Mon 22:10", "CKG → CAN → IST"] },
        { tag: "sat", eur: 633, src: "Google", out: ["China Southern", "Fri 14:20 → Sat 09:20", "IST → CAN → SHA"], back: ["China Southern", "Sun 23:40 → Mon 22:10", "CKG → CAN → IST"] },
        { tag: "comfort", eur: 895, sep: true, out: ["China Eastern", "Fri 14:00 → Sat 05:15", "IST → PVG"], back: ["Turkish Airlines", "Sun 23:50 → Mon 04:50", "TFU → IST"] }
      ]
    },
    B: {
      fwd: [
        { tag: "cheap", eur: 654, src: "Skyscanner", fri: true, out: ["China Southern", "Fri 01:15 → Fri 18:45", "IST → URC → TFU"], back: ["China Southern", "Sun 19:45 → Mon 06:35", "SHA → PKX → IST"] },
        { tag: "sat", eur: 705, src: "Google", sep: true, out: ["THAI", "Fri 16:30 → Sat 15:00", "IST → BKK → TFU"], back: ["Gulf Air", "Sun 16:30 → Mon 05:30", "PVG → BAH → IST"] },
        { tag: "comfort", eur: 776, sep: true, out: ["Sichuan Airlines", "Fri 15:40 → Sat 05:20", "IST → TFU"], back: ["China Southern", "Sun 19:45 → Mon 06:35", "SHA → PKX → IST"] }
      ],
      rev: [
        { tag: "cheapsat", eur: 667, src: "Skyscanner", out: ["Sichuan Airlines", "Fri 15:40 → Sat 10:40", "IST → TFU → PVG"], back: ["China Southern", "Sun 19:55 → Mon 06:35", "CKG → PKX → IST"] },
        { tag: "comfort", eur: 1013, sep: true, out: ["China Eastern", "Fri 14:00 → Sat 05:15", "IST → PVG"], back: ["Turkish Airlines", "Sun 23:50 → Mon 04:50", "TFU → IST"] }
      ]
    }
  },

  flights: {
    /* outbound: depart Istanbul Friday, land Saturday. back: leave China Sunday, land Istanbul Monday morning. */
    A: {
      outCKG: [
        { a: "Sichuan Airlines", t: "Fri 15:40 → Sat 05:20", dur: "8h40", via: "Nonstop to Chengdu Tianfu (TFU)", eur: 452, pick: true, note: "Then 1–1.5 h by train to Chongqing." },
        { a: "China Eastern", t: "Fri 14:00 → Sat 14:10", dur: "19h10", via: "1 stop, Shanghai PVG (5h40)", eur: 353, cheap: true },
        { a: "China Eastern", t: "Fri 14:00 → Sat 11:55", dur: "16h55", via: "1 stop, Shanghai (airport change PVG→SHA)", eur: 353, note: "Airport change in Shanghai." },
        { a: "Turkish Airlines", t: "Fri 01:40 → Fri 15:15", dur: "8h35", via: "Nonstop to Chengdu Tianfu", eur: 437, note: "Lands Friday." }
      ],
      outSH: [
        { a: "Sichuan Airlines", t: "Fri 15:40 → Sat 10:40", dur: "14h", via: "1 stop, Chengdu TFU (2h40)", eur: 301, cheap: true },
        { a: "China Eastern", t: "Fri 14:00 → Sat 05:15", dur: "10h15", via: "Nonstop to Pudong (PVG)", eur: 461, pick: true },
        { a: "Turkish Airlines", t: "Fri 15:20 → Sat 06:15", dur: "9h55", via: "Nonstop to Pudong (PVG)", eur: 725 }
      ],
      backSH: [
        { a: "Gulf Air", t: "Sun 16:30 → Mon 05:30", dur: "18h", via: "1 stop, Bahrain (2h20)", eur: 292, cheap: true },
        { a: "Sichuan Airlines", t: "Sun 20:15 → Mon 06:30", dur: "15h15", via: "1 stop, Chengdu TFU (2h25)", eur: 356, pick: true },
        { a: "China Southern", t: "Sun 20:00 → Mon 07:15", dur: "16h15", via: "From Hongqiao (SHA), 1 stop Guangzhou", eur: 496, note: "Next to Hongqiao station." },
        { a: "Turkish Airlines", t: "Sun 22:25 → Mon 05:15", dur: "11h50", via: "Nonstop from Pudong (PVG)", eur: 637 }
      ],
      backCKG: [
        { a: "Shanghai Airlines / China Eastern", t: "Sun 20:35 → Mon 08:00", dur: "16h25", via: "1 stop, Shanghai PVG (2h05)", eur: 364, pick: true },
        { a: "Turkish Airlines", t: "Sun 23:50 → Mon 04:50", dur: "10h", via: "Nonstop from Chengdu Tianfu (TFU)", eur: 434, note: "Train to Chengdu first (1–1.5 h)." },
        { a: "China Southern", t: "Sun 21:05 → Mon 07:15", dur: "15h10", via: "1 stop, Guangzhou (2h15)", eur: 496 },
        { a: "China Southern", t: "Sun 23:40 → Mon 22:10", dur: "27h30", via: "1 stop, Guangzhou (14h10)", eur: 291, cheap: true, note: "14 h layover." }
      ]
    },
    B: {
      outCKG: [
        { a: "Sichuan Airlines", t: "Fri 15:40 → Sat 05:20", dur: "8h40", via: "Nonstop to Chengdu Tianfu (TFU)", eur: 442, pick: true, note: "Then 1–1.5 h by train to Chongqing." },
        { a: "Turkish Airlines", t: "Fri 01:40 → Fri 15:15", dur: "8h35", via: "Nonstop to Chengdu Tianfu", eur: 437, note: "Lands Friday." },
        { a: "Sichuan Airlines", t: "Fri 15:40 → Sat 14:25", dur: "17h45", via: "2 stops via Chengdu, into Chongqing", eur: 534 },
        { a: "China Eastern", t: "Fri 14:00 → Sat 14:10", dur: "19h10", via: "1 stop, Shanghai PVG (5h40)", eur: 588 }
      ],
      outSH: [
        { a: "Sichuan Airlines", t: "Fri 15:40 → Sat 10:40", dur: "14h", via: "1 stop, Chengdu TFU (2h40)", eur: 301, cheap: true, pick: true },
        { a: "Etihad", t: "Fri 13:50 → Sat 10:05", dur: "15h15", via: "1 stop, Abu Dhabi (1h50)", eur: 429 },
        { a: "China Eastern", t: "Fri 14:00 → Sat 05:15", dur: "10h15", via: "Nonstop to Pudong (PVG)", eur: 579 },
        { a: "Turkish Airlines", t: "Fri 15:20 → Sat 06:15", dur: "9h55", via: "Nonstop to Pudong (PVG)", eur: 725 }
      ],
      backSH: [
        { a: "Gulf Air", t: "Sun 16:30 → Mon 05:30", dur: "18h", via: "1 stop, Bahrain (2h20)", eur: 292, cheap: true },
        { a: "China Southern", t: "Sun 19:45 → Mon 06:35", dur: "15h50", via: "From Hongqiao (SHA), 1 stop Beijing Daxing", eur: 334, pick: true },
        { a: "Sichuan Airlines", t: "Sun 20:15 → Mon 06:30", dur: "15h15", via: "1 stop, Chengdu TFU", eur: 366 },
        { a: "Turkish Airlines", t: "Sun 22:25 → Mon 05:15", dur: "11h50", via: "Nonstop from Pudong (PVG)", eur: 719 }
      ],
      backCKG: [
        { a: "China Southern", t: "Sun 21:05 → Mon 06:35", dur: "14h30", via: "1 stop, Beijing Daxing (1h40)", eur: 334, pick: true, note: "From €327 with long layovers." },
        { a: "Shanghai Airlines / China Eastern", t: "Sun 20:35 → Mon 08:00", dur: "16h25", via: "1 stop, Shanghai PVG (2h05)", eur: 365 },
        { a: "Turkish Airlines", t: "Sun 23:50 → Mon 04:50", dur: "10h", via: "Nonstop from Chengdu Tianfu (TFU)", eur: 434, note: "Train to Chengdu first (1–1.5 h)." }
      ]
    }
  },

  places: [
    { c: "CKG", img: "hongyadong", t: "Hongyadong", zh: "洪崖洞", time: "1–2 h, after dark", d: "11-storey stilt houses glowing gold on the cliffs." },
    { c: "CKG", img: "liziba", t: "Liziba monorail", zh: "李子坝", time: "30 min", d: "A monorail straight through an apartment block." },
    { c: "CKG", img: "ciqikou", t: "Ciqikou old town", zh: "磁器口", time: "2–3 h", d: "Old porcelain port, now a snack street." },
    { c: "CKG", img: "hotpot", t: "Chongqing hotpot", zh: "重庆火锅", time: "Every night", d: "Spicy beef-tallow broth. Ask for a half-mild pot." },
    { c: "CKG", img: "dazu", t: "Dazu Rock Carvings", zh: "大足石刻", time: "Day trip, about 1.5 h each way", d: "UNESCO Buddhist cliff carvings, 9th–13th century." },
    { c: "CKG", img: "wulong", t: "Wulong Karst", zh: "武隆", time: "Day trip, about 2.5–3 h each way", d: "Three giant natural stone bridges over a gorge." },
    { c: "XIAN", img: "terracotta", t: "Terracotta Army", zh: "兵马俑", time: "Half day", d: "8,000 life-size clay soldiers from 210 BC." },
    { c: "XIAN", img: "xianwall", t: "Ming City Wall", zh: "西安城墙", time: "2–3 h by bike", d: "China's best-kept city wall. Ride the 14 km loop." },
    { c: "XIAN", img: "muslim", t: "Muslim Quarter", zh: "回民街", time: "Evening", d: "Lamb skewers, noodles and the Great Mosque." },
    { c: "XIAN", img: "goose", t: "Big Wild Goose Pagoda", zh: "大雁塔", time: "1–2 h", d: "Tang dynasty pagoda, fountain show at night." },
    { c: "XIAN", img: "huashan", t: "Mount Huashan", zh: "华山", time: "Full day, optional", d: "Sacred peak with cliff paths. Cable cars help." },
    { c: "WH", img: "crane", t: "Yellow Crane Tower", zh: "黄鹤楼", time: "1–2 h", d: "Legendary tower with Yangtze views." },
    { c: "WH", img: "hubeimuseum", t: "Hubei Provincial Museum", zh: "湖北省博物馆", time: "2–3 h", d: "2,400-year-old bronze bells, the Sword of Goujian." },
    { c: "WH", img: "eastlake", t: "East Lake", zh: "东湖", time: "Half day", d: "Huge lake with a 100 km bike path." },
    { c: "WH", img: "wuhanbridge", t: "Yangtze River Bridge", zh: "武汉长江大桥", time: "1 h", d: "The Yangtze's first bridge (1957)." },
    { c: "BJ", img: "forbidden", t: "Forbidden City", zh: "故宫", time: "Half day", d: "The imperial palace. Book 7 days ahead. Closed Mondays." },
    { c: "BJ", img: "mutianyu", t: "Great Wall at Mutianyu", zh: "慕田峪长城", time: "Full day", d: "Cable car up, toboggan down." },
    { c: "BJ", img: "heaven", t: "Temple of Heaven", zh: "天坛", time: "2 h, mornings", d: "Go early for the tai chi crowd." },
    { c: "BJ", img: "summer", t: "Summer Palace", zh: "颐和园", time: "Half day", d: "Lakeside imperial retreat." },
    { c: "BJ", img: "hutong", t: "Hutongs", zh: "胡同", time: "Afternoon", d: "Old alleys, best by bike." },
    { c: "SH", img: "bund", t: "The Bund", zh: "外滩", time: "Evening", d: "1920s riverfront facing the skyline. Go at night." },
    { c: "SH", img: "lujiazui", t: "Lujiazui & Shanghai Tower", zh: "陆家嘴", time: "2 h", d: "632 m tower with an observation deck." },
    { c: "SH", img: "yugarden", t: "Yu Garden", zh: "豫园", time: "2 h", d: "Ming garden. Soup dumplings next door." },
    { c: "SH", img: "suzhou", t: "Suzhou gardens", zh: "苏州园林", time: "Day trip, 25 min", d: "UNESCO classical gardens and canals." },
    { c: "SH", img: "westlake", t: "Hangzhou West Lake", zh: "西湖", time: "Day trip, about 1 h", d: "Lake, pagodas and tea hills." },
    { c: "ZJJ", img: "avatar", t: "Avatar Hallelujah Mountain", zh: "乾坤柱", time: "Half day", d: "The pillar renamed after the film it inspired." },
    { c: "ZJJ", img: "zjjpark", t: "Zhangjiajie Forest Park", zh: "张家界国家森林公园", time: "1–2 days", d: "Thousands of 200 m sandstone pillars." },
    { c: "ZJJ", img: "bailong", t: "Bailong Elevator", zh: "百龙天梯", time: "Short ride", d: "326 m glass lift up a cliff." },
    { c: "ZJJ", img: "tianmen", t: "Tianmen Mountain", zh: "天门山", time: "Full day", d: "Cable car, cliff skywalk and Heaven's Gate." },
    { c: "ZJJ", img: "glassbridge", t: "Grand Canyon glass bridge", zh: "大峡谷玻璃桥", time: "Half day", d: "Glass-floored bridge 300 m up. Not for everyone." },
    { c: "SQ", img: "labdiamond", t: "Zhecheng lab-grown diamonds", zh: "柘城培育钻石", time: "Afternoon", d: "Factory showrooms. Stones at 1/5–1/10 of natural prices." },
    { c: "SQ", img: "zhecheng", t: "Zhecheng & Ronghu Lake", zh: "柘城 · 容湖", time: "1 h", d: "Lakeside park and pagoda." },
    { c: "SQ", img: "shangqiu", t: "Guide Ancient City", zh: "商丘古城", time: "Evening", d: "Ming walled town with a moat." }
  ]
};
