/* China by Rail · May 2027 — all trip data in one place.
   Train times/fares: China Railway 12306, sample date Thu 5 Nov 2026 (Q4-2026 timetable).
   Flight fares: Google Flights, checked 26 Oct 2026, EUR, 1 adult, economy, one-way. */

window.TRIP = {
  checked: "26 Oct 2026",

  windows: {
    A: {
      id: "A", label: "Sat 1 – Sun 16 May", start: "2027-05-01", end: "2027-05-16",
      flyOut: "2027-04-30", flyBack: "2027-05-16",
      note: "Covers all of 7–15 May. The first five days fall in China's Labour Day Golden Week, so the plan stays put in the first city until the holiday ends.",
      goldenWeek: ["2027-05-01", "2027-05-02", "2027-05-03", "2027-05-04", "2027-05-05"]
    },
    B: {
      id: "B", label: "Sat 8 – Sun 23 May", start: "2027-05-08", end: "2027-05-23",
      flyOut: "2027-05-07", flyBack: "2027-05-23",
      note: "Calmer, no holiday crowds, and fares inside China are at normal levels. Misses Fri 7 May: you would leave Istanbul that evening.",
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
      tag: "Cyberpunk mountain megacity",
      blurb: "A city stacked on cliffs where the Yangtze and Jialing rivers meet: monorails through buildings, neon-lit stilt houses and the spiciest hotpot in China.",
      stay: "Yuzhong peninsula, around Jiefangbei: walkable to Hongyadong and the cableway.",
      stations: "Three stations matter: Chongqing West (most Xi'an trains), Chongqing North (Wuhan trains), Chongqing East (Zhangjiajie trains). Always check the station on the ticket." },
    MID_XIAN: { key: "XIAN", name: "Xi'an", zh: "西安", ll: [34.341, 108.94], color: "#d97706", emoji: "🗿", img: "terracotta", temp: 26,
      tag: "Thirteen dynasties and the Terracotta Army",
      blurb: "The old Silk Road capital: the Terracotta Army, a complete Ming city wall you can cycle on, and the Muslim Quarter's night-market food.",
      stay: "Inside the city wall near the Bell Tower: everything is a walk or one metro stop away.",
      stations: "Xi'an North (Metro Lines 2, 4 and 14) for almost everything; some trains use the new Xi'an East." },
    MID_WH: { key: "WH", name: "Wuhan", zh: "武汉", ll: [30.593, 114.305], color: "#0ea5e9", emoji: "🏯", img: "crane", temp: 27,
      tag: "River city at the heart of China",
      blurb: "Where the Han meets the Yangtze: the Yellow Crane Tower, East Lake's greenway and one of China's best museums. Also the best breakfast noodles in China (reganmian).",
      stay: "Hankou riverside or Jianghan Road for food and nightlife; Wuchang for the Tower and museum.",
      stations: "Three big stations: Hankou (trains from Chongqing), Wuhan (Beijing, Zhangjiajie and Shangqiu trains) and Wuchang. Wuhan and Hankou are about 40 minutes apart by metro." },
    BJ: { name: "Beijing", zh: "北京", ll: [39.904, 116.397], color: "#dc2626", emoji: "🏮", img: "forbidden", temp: 26,
      tag: "Emperors, hutongs and the Great Wall",
      blurb: "The Forbidden City, the Temple of Heaven, the Summer Palace, hutong alleys, Peking duck, and the Great Wall about an hour north.",
      stay: "Dongcheng: Wangfujing or a courtyard hotel in the hutongs near Nanluoguxiang.",
      stations: "You arrive at Beijing West (Metro 7 and 9) from Xi'an, Wuhan or Shangqiu and leave from Beijing South (Metro 4 and 14) for Shanghai. They are different stations, about 30 minutes apart." },
    SH: { name: "Shanghai", zh: "上海", ll: [31.230, 121.474], color: "#7c3aed", emoji: "🌃", img: "lujiazui", temp: 24,
      tag: "Skyline, water towns and garden day trips",
      blurb: "The Bund facing the Pudong skyline, 1930s lanes in the former French Concession, Yu Garden, plus Suzhou (25 min) and Hangzhou (about 1 h) as easy day trips.",
      stay: "Around People's Square or Jing'an: central and on several metro lines.",
      stations: "Shanghai Hongqiao (Metro 2, 10 and 17) is next to Hongqiao airport. Pudong airport (PVG), where most long-haul flights go, is about an hour away by metro or Maglev." },
    ZJJ: { name: "Zhangjiajie", zh: "张家界", ll: [29.346, 110.546], color: "#16a34a", emoji: "🏔️", img: "avatar", temp: 25, detour: "zjj",
      tag: "The real Avatar mountains",
      blurb: "Wulingyuan's thousands of sandstone pillars, wrapped in mist, inspired the floating Hallelujah Mountains in Avatar. UNESCO-listed, with the world's tallest outdoor elevator.",
      stay: "Wulingyuan town, next to the Forest Park's Wulingyuan gate, about 40 min from Zhangjiajie West station.",
      stations: "Zhangjiajie West (high-speed). Hehua airport (DYG) is on the edge of town." },
    SQ: { name: "Shangqiu · Zhecheng", short: "Zhecheng", zh: "商丘 · 柘城", ll: [34.414, 115.656], color: "#0891b2", emoji: "💎", img: "labdiamond", temp: 26, detour: "zc",
      tag: "China's diamond capital",
      blurb: "Zhecheng county, about an hour from Shangqiu, makes over 60% of China's lab-grown diamonds. Factory showrooms sell stones at a fraction of natural-diamond prices. Shangqiu itself has a walled Ming-era old town.",
      stay: "Shangqiu, inside or near Guide Ancient City (Shangqiu Gucheng), or by Shangqiu station for an early train.",
      stations: "Shangqiu station: high-speed lines to Xi'an, Wuhan, Beijing (new Xiong'an line, opened 28 Sep 2026) and Shanghai. Zhecheng has no high-speed station, so the last hour is by car." }
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
    { n: "Chengdu", zh: "成都", ll: [30.66, 104.06], t: "Alternative gateway: nonstop flights to and from Istanbul (Sichuan Airlines, Turkish Airlines) land at Tianfu airport (TFU). Chengdu East to Chongqing takes 1–1.5 h by train. Giant pandas." },
    { n: "Zhecheng", zh: "柘城", ll: [34.09, 115.31], t: "China's diamond capital, about 1 h by car from Shangqiu station." },
    { n: "Fenghuang", zh: "凤凰", ll: [27.96, 109.60], t: "The Zhangjiajie–Wuhan train stops at Fenghuang Ancient Town, a riverside town of stilt houses." },
    { n: "Suzhou", zh: "苏州", ll: [31.30, 120.59], t: "Classical gardens, 25 min from Shanghai." },
    { n: "Hangzhou", zh: "杭州", ll: [30.27, 120.15], t: "West Lake, about 1 h from Shanghai." }
  ],

  /* Recommended trains (2nd / 1st class ¥, per person). Keys are directional. */
  legs: {
    "CKG-XIAN": { rec: ["G1834", "Chongqing West", "10:57", "Xi'an North", "16:19", "5h22", 434, 694],
      alts: [["G1308", "Chongqing West", "08:36", "Xi'an North", "14:04", "5h28", 418], ["G2234", "Chongqing West", "09:53", "Xi'an North", "15:46", "5h53", 443], ["D1713", "Chongqing North", "07:19", "Xi'an North", "13:02", "5h43", 302]],
      daily: 31, note: "Runs via Chengdu and then north over the Qinling mountains through Guangyuan and Hanzhong, the most scenic leg of the trip. A direct Chongqing–Xi'an line (about 2.5 h) is due around 2028." },
    "XIAN-CKG": { rec: ["G3359", "Xi'an North", "09:41", "Chongqing West", "14:56", "5h15", 443, 708],
      alts: [["G2239", "Xi'an North", "07:38", "Chongqing West", "13:11", "5h33", 438], ["G3351", "Xi'an North", "11:05", "Chongqing West", "16:20", "5h15", 451], ["D1979", "Xi'an North", "12:07", "Chongqing North", "17:19", "5h12", 312]],
      daily: 29, note: "Over the Qinling mountains and down through Chengdu. Sit by the window." },
    "CKG-WH": { rec: ["G3982", "Chongqing North", "09:52", "Hankou", "13:45", "3h53", 419, 668],
      alts: [["G3392", "Chongqing North", "08:38", "Hankou", "12:59", "4h21", 445], ["G3966", "Chongqing North", "16:37", "Hankou", "20:51", "4h14", 456]],
      daily: 44, note: "Uses the new Yichang–Xingshan line (opened 28 Sep 2026), which put Chongqing–Wuhan under 4 hours. The route passes the Three Gorges region via Wanzhou and Yichang." },
    "WH-CKG": { rec: ["G3965", "Hankou", "09:34", "Chongqing North", "14:00", "4h26", 445, 711],
      alts: [["G3391", "Hankou", "12:32", "Chongqing North", "16:57", "4h25", 458], ["G3981", "Hankou", "16:33", "Chongqing North", "20:27", "3h54", 415]],
      daily: 49, note: "Via Yichang and Wanzhou, through the Three Gorges region." },
    "XIAN-BJ": { rec: ["G366", "Xi'an North", "09:10", "Beijing West", "13:30", "4h20", 587, 939],
      alts: [["G322", "Xi'an North", "10:09", "Beijing West", "14:26", "4h17", 525], ["G354", "Xi'an North", "12:04", "Beijing West", "16:32", "4h28", 618], ["G368", "Xi'an North", "14:26", "Beijing West", "18:37", "4h11", 587]],
      daily: 36, note: "Via Zhengzhou and Shijiazhuang. Plenty of trains, so pick on timing." },
    "BJ-XIAN": { rec: ["G365", "Beijing West", "09:55", "Xi'an North", "14:05", "4h10", 587, 939],
      alts: [["G351", "Beijing West", "07:55", "Xi'an North", "12:05", "4h10", 587], ["G353", "Beijing West", "12:55", "Xi'an North", "17:08", "4h13", 618], ["G323", "Beijing West", "15:00", "Xi'an North", "19:12", "4h12", 587]],
      daily: 36, note: "Via Shijiazhuang and Zhengzhou." },
    "WH-BJ": { rec: ["G344", "Wuhan", "08:36", "Beijing West", "12:24", "3h48", 623, 997],
      alts: [["G318", "Wuhan", "09:21", "Beijing West", "13:35", "4h14", 498], ["G346", "Hankou", "11:28", "Beijing West", "15:30", "4h02", 623], ["G336", "Wuhan", "13:35", "Beijing West", "17:23", "3h48", 623]],
      daily: 46, note: "Most Beijing trains leave from Wuhan station (Wuchang side), not Hankou. Check the ticket." },
    "BJ-WH": { rec: ["G339", "Beijing West", "09:05", "Wuhan", "12:53", "3h48", 623, 997],
      alts: [["G381", "Beijing West", "10:00", "Wuhan", "13:55", "3h55", 623], ["G315", "Beijing West", "13:00", "Wuhan", "16:55", "3h55", 561], ["G343", "Beijing West", "13:05", "Hankou", "17:07", "4h02", 623]],
      daily: 47, note: "Beijing–Guangzhou high-speed line, via Zhengzhou." },
    "BJ-SH": { rec: ["G7", "Beijing South", "09:00", "Shanghai Hongqiao", "13:37", "4h37", 692, 1107],
      alts: [["G11", "Beijing South", "10:03", "Shanghai Hongqiao", "14:39", "4h36", 661], ["G13", "Beijing South", "16:00", "Shanghai Hongqiao", "20:28", "4h28", 661], ["G25", "Beijing South", "17:00", "Shanghai Hongqiao", "21:18", "4h18", 661]],
      daily: 51, note: "The flagship 350 km/h line. You leave from Beijing South, not Beijing West." },
    "SH-BJ": { rec: ["G8", "Shanghai Hongqiao", "08:00", "Beijing South", "12:26", "4h26", 692, 1107],
      alts: [["G12", "Shanghai Hongqiao", "10:00", "Beijing South", "14:24", "4h24", 692], ["G22", "Shanghai Hongqiao", "15:00", "Beijing South", "19:33", "4h33", 661], ["G44", "Shanghai Hongqiao", "15:04", "Beijing South", "19:37", "4h33", 553]],
      daily: 49, note: "The flagship 350 km/h line, into Beijing South." },
    "CKG-ZJJ": { rec: ["G2445", "Chongqing East", "09:52", "Zhangjiajie West", "11:58", "2h06", 235, 357],
      alts: [["G3869", "Chongqing East", "07:12", "Zhangjiajie West", "09:41", "2h29", 207], ["G2427", "Chongqing East", "08:08", "Zhangjiajie West", "10:42", "2h34", 215], ["G2447", "Chongqing East", "16:21", "Zhangjiajie West", "18:49", "2h28", 216]],
      daily: 24, note: "Leaves from Chongqing East, the newest station (opened June 2025). Allow about 45 min from Yuzhong by taxi." },
    "ZJJ-CKG": { rec: ["G2450", "Zhangjiajie West", "09:55", "Chongqing East", "12:07", "2h12", 206, 331],
      alts: [["G2418", "Zhangjiajie West", "11:50", "Chongqing East", "14:20", "2h30", 206], ["G2446", "Zhangjiajie West", "15:54", "Chongqing East", "17:59", "2h05", 235]],
      daily: 24, note: "Through the Wuling mountains via Qianjiang." },
    "ZJJ-WH": { rec: ["G3847", "Zhangjiajie West", "10:02", "Wuhan", "15:08", "5h06", 455, 740],
      alts: [["G3647", "Zhangjiajie West", "07:39", "Wuhan", "12:40", "5h01", 443], ["C7785 + G", "Zhangjiajie West", "08:00", "Changsha → Changsha South → Wuhan", "~12:00", "~4h", "~300"]],
      daily: 2, note: "Only two direct trains a day. They loop south past Fenghuang Ancient Town and Changsha, no change needed. If both sell out, take a C train to Changsha, ride Metro Line 2 to Changsha South, then take any of about 128 daily trains to Wuhan (1h12–1h40)." },
    "WH-ZJJ": { rec: ["G3845", "Wuhan", "14:04", "Zhangjiajie West", "19:04", "5h00", 467, 746],
      alts: [["G389 + C7782", "Wuhan", "08:00", "Changsha South → Changsha → Zhangjiajie West", "12:53", "4h53", 343], ["G3649", "Wuhan", "17:08", "Zhangjiajie West", "22:24", "5h16", 411]],
      daily: 2, note: "The direct train arrives in the evening. For a full afternoon in Wulingyuan, change at Changsha instead: G389 to Changsha South (09:19), Metro Line 2 to Changsha station, then C7782 at 11:00." },
    "ZJJ-XIAN": { flight: true, rec: ["3U · Sichuan Airlines", "Zhangjiajie DYG", "11:05", "Xi'an XIY", "12:30", "1h25", null, null],
      alts: [["MU · China Eastern", "Zhangjiajie DYG", "22:45", "Xi'an XIY", "00:15+1", "1h30", null], ["Rail: C7785 + G404", "Zhangjiajie West", "08:00", "Changsha South → Xi'an North", "16:50", "8h50", 857]],
      eur: 124, daily: 2, note: "There's no direct rail line between Zhangjiajie and Xi'an, so fly. Two nonstops a day were listed (from about €104). The rail fallback changes at Changsha: C7785 08:00 → Changsha 09:52, Metro Line 2 to Changsha South, then G404 11:54 → Xi'an North 16:50." },
    "XIAN-ZJJ": { flight: true, rec: ["3U · Sichuan Airlines", "Xi'an XIY", "08:50", "Zhangjiajie DYG", "10:20", "1h30", null, null],
      alts: [["MU · China Eastern", "Xi'an XIY", "20:00", "Zhangjiajie DYG", "21:45", "1h45", null], ["Rail: G412 + G2446", "Xi'an North", "07:27", "Changsha South → Changsha → Zhangjiajie West", "15:51", "8h24", 804]],
      eur: 124, daily: 2, note: "Fly: two nonstops a day were listed for May 2027 (from about €104). Rail fallback: G412 Xi'an North 07:27 → Changsha South 12:32, Metro Line 2 to Changsha station, then G2446 14:06 → Zhangjiajie West 15:51." },
    "XIAN-SQ": { rec: ["G2238", "Xi'an North", "08:18", "Shangqiu", "11:01", "2h43", 323, 518],
      alts: [["G1900", "Xi'an North", "07:23", "Shangqiu", "10:26", "3h03", 323], ["G862", "Xi'an North", "11:50", "Shangqiu", "14:49", "2h59", 323]],
      daily: 53, note: "Via Zhengzhou. Arriving before noon leaves the afternoon free for Zhecheng." },
    "SQ-XIAN": { rec: ["G465", "Shangqiu", "10:48", "Xi'an North", "13:40", "2h52", 323, 518],
      alts: [["G2027", "Shangqiu", "12:56", "Xi'an North", "15:56", "3h00", 323], ["G3165", "Shangqiu", "14:50", "Xi'an North", "17:47", "2h57", 323]],
      daily: 50, note: "Via Zhengzhou." },
    "WH-SQ": { rec: ["G1848", "Wuhan", "10:10", "Shangqiu", "13:17", "3h07", 368, 588],
      alts: [["G934", "Wuhan", "12:20", "Shangqiu", "15:13", "2h53", 348]],
      daily: 6, note: "Only about six direct trains a day, so book as soon as sales open." },
    "SQ-WH": { rec: ["G2065", "Shangqiu", "11:34", "Wuhan", "14:28", "2h54", 368, 588],
      alts: [["G2689", "Shangqiu", "10:36", "Wuhan", "13:40", "3h04", 329], ["G1311", "Shangqiu", "10:59", "Wuhan", "14:07", "3h08", 348]],
      daily: 8, note: "Via Zhengzhou." },
    "SQ-BJ": { rec: ["G3938", "Shangqiu", "09:02", "Beijing West", "12:50", "3h48", 316, 507],
      alts: [["G3946", "Shangqiu", "10:19", "Beijing West", "14:00", "3h41", 338], ["G3976", "Shangqiu", "11:24", "Beijing West", "15:03", "3h39", 316]],
      daily: 11, note: "On the new Xiong'an–Shangqiu line (opened 28 Sep 2026). G3938 also stops at Beijing Daxing Airport." },
    "BJ-SQ": { rec: ["G3939", "Beijing West", "10:30", "Shangqiu", "13:49", "3h19", 303, 485],
      alts: [["G3975", "Daxing Airport", "13:45", "Shangqiu", "17:17", "3h32", 292]],
      daily: 12, note: "On the new Xiong'an–Shangqiu line. Arriving early afternoon leaves time for Zhecheng." }
  },

  /* Day plans per stop: a = arrival afternoon/evening; d = full days in order (cycled if more nights). */
  days: {
    CKG: { a: "Hongyadong lit up after dark, then dinner at a proper Chongqing hotpot.",
      d: ["Ciqikou old town, the Liziba monorail that runs through a residential block, the Yangtze cableway and Eling Park at dusk.",
          "Day trip to the Dazu Rock Carvings (UNESCO, about 1.5 h): Tang and Song-era Buddhist cliff sculpture.",
          "Day trip to Wulong Karst (about 2.5–3 h): the Three Natural Bridges and gorges.",
          "Three Gorges Museum and Chaotianmen, then an evening Two Rivers night cruise.",
          "Slow day: Jiefangbei, Shibati old steps, and dan dan noodles and xiaomian."],
      gw: "Golden Week: Hongyadong and Liziba are at their busiest. Go early morning or late evening, and do the day trips mid-holiday." },
    XIAN: { a: "Bell and Drum Towers lit up, then dinner in the Muslim Quarter (roujiamo, biangbiang noodles, yangrou paomo).",
      d: ["Terracotta Army first thing (about 1 h out; book timed tickets), then the Big Wild Goose Pagoda fountain show in the evening.",
          "Cycle the full 14 km on top of the Ming city wall, then the Shaanxi History Museum (book ahead, passports required).",
          "Optional: Mount Huashan day trip by high-speed train and cable car, for the brave."] },
    WH: { a: "Jianghan Road and the Hankou riverside at night, with a riverside food crawl.",
      d: ["Yellow Crane Tower, then Hubei Provincial Museum (the Marquis Yi bronze bells and the Sword of Goujian). Cycle the East Lake greenway at sunset.",
          "Hubu Alley breakfast (reganmian, hot dry noodles), walk the 1957 Yangtze River Bridge, Tanhualin art street."] },
    BJ: { a: "Qianmen, then Tiananmen Square at dusk. Peking duck dinner.",
      d: ["Forbidden City (tickets released 7 days ahead, real-name with passport), then climb Jingshan Park for the rooftop view.",
          "The Great Wall at Mutianyu: cable car up, toboggan down. Leave early.",
          "Temple of Heaven in the morning with the locals' tai chi, then hutongs and Houhai by bike or rickshaw.",
          "Summer Palace and Kunming Lake, then the Olympic Park (Bird's Nest) lit up at night.",
          "Lama Temple, 798 Art District, and a last hotpot or dumpling feast."] },
    SH: { a: "The Bund at night facing the Pudong skyline, then a stroll on Nanjing Road.",
      d: ["Yu Garden and the old city, then Lujiazui: Shanghai Tower observation deck at sunset.",
          "Day trip to Suzhou (25–30 min): the Humble Administrator's Garden and the Pingjiang Road canals.",
          "Former French Concession: Wukang Road, Anfu Road and Tianzifang, plus soup dumplings.",
          "Day trip to Hangzhou (about 1 h): a West Lake boat, Lingyin Temple and Longjing tea village.",
          "Zhujiajiao water town or the Shanghai Museum, and last-minute shopping."],
      gw: "Golden Week: the Bund and Yu Garden are packed. Do Suzhou and Hangzhou after 5 May." },
    ZJJ: { a: "Transfer to Wulingyuan (about 40 min), then an easy afternoon walk along Golden Whip Stream.",
      d: ["Zhangjiajie Forest Park: Yuanjiajie and the Avatar Hallelujah Mountain, the Bailong Elevator (326 m), and Tianzi Mountain views.",
          "Tianmen Mountain: one of the world's longest cable cars, the cliff-side glass skywalk and the 999 steps to Heaven's Gate. Or the Grand Canyon glass bridge instead."] },
    SQ: { a: "Car to Zhecheng (about 1 h): factory showrooms and the Diamond Fashion Street. Back to Shangqiu for the walled Guide Ancient City at night.",
      d: ["Explore Guide Ancient City walls and moat."] }
  },

  flights: {
    /* outbound: depart Istanbul Friday, land Saturday. back: leave China Sunday, land Istanbul Monday morning. */
    A: {
      outCKG: [
        { a: "Sichuan Airlines", t: "Fri 15:40 → Sat 05:20", dur: "8h40", via: "Nonstop to Chengdu Tianfu (TFU)", eur: 452, pick: true, note: "Then metro or taxi to Chengdu East (about 1 h) and a 1–1.5 h train to Chongqing: in Chongqing by late morning." },
        { a: "China Eastern", t: "Fri 14:00 → Sat 14:10", dur: "19h10", via: "1 stop, Shanghai PVG (5h40)", eur: 353, cheap: true },
        { a: "China Eastern", t: "Fri 14:00 → Sat 11:55", dur: "16h55", via: "1 stop, Shanghai (airport change PVG→SHA)", eur: 353, note: "Airport change. Avoid unless it's on one ticket." },
        { a: "Turkish Airlines", t: "Fri 01:40 → Fri 15:15", dur: "8h35", via: "Nonstop to Chengdu Tianfu", eur: 437, note: "Lands a day early (Friday)." }
      ],
      outSH: [
        { a: "Sichuan Airlines", t: "Fri 15:40 → Sat 10:40", dur: "14h", via: "1 stop, Chengdu TFU (2h40)", eur: 301, cheap: true },
        { a: "China Eastern", t: "Fri 14:00 → Sat 05:15", dur: "10h15", via: "Nonstop to Pudong (PVG)", eur: 461, pick: true },
        { a: "Turkish Airlines", t: "Fri 15:20 → Sat 06:15", dur: "9h55", via: "Nonstop to Pudong (PVG)", eur: 725 }
      ],
      backSH: [
        { a: "Gulf Air", t: "Sun 16:30 → Mon 05:30", dur: "18h", via: "1 stop, Bahrain (2h20)", eur: 292, cheap: true },
        { a: "Sichuan Airlines", t: "Sun 20:15 → Mon 06:30", dur: "15h15", via: "1 stop, Chengdu TFU (2h25)", eur: 356, pick: true },
        { a: "China Southern", t: "Sun 20:00 → Mon 07:15", dur: "16h15", via: "From Hongqiao (SHA), 1 stop Guangzhou", eur: 496, note: "Leaves from Hongqiao, next door to the train station." },
        { a: "Turkish Airlines", t: "Sun 22:25 → Mon 05:15", dur: "11h50", via: "Nonstop from Pudong (PVG)", eur: 637 }
      ],
      backCKG: [
        { a: "Shanghai Airlines / China Eastern", t: "Sun 20:35 → Mon 08:00", dur: "16h25", via: "1 stop, Shanghai PVG (2h05)", eur: 364, pick: true },
        { a: "Turkish Airlines", t: "Sun 23:50 → Mon 04:50", dur: "10h", via: "Nonstop from Chengdu Tianfu (TFU)", eur: 434, note: "Afternoon train to Chengdu East (1–1.5 h), then about 1 h to Tianfu airport." },
        { a: "China Southern", t: "Sun 21:05 → Mon 07:15", dur: "15h10", via: "1 stop, Guangzhou (2h15)", eur: 496 },
        { a: "China Southern", t: "Sun 23:40 → Mon 22:10", dur: "27h30", via: "1 stop, Guangzhou (14h10)", eur: 291, cheap: true, note: "Cheapest, but a 14 h layover." }
      ]
    },
    B: {
      outCKG: [
        { a: "Sichuan Airlines", t: "Fri 15:40 → Sat 05:20", dur: "8h40", via: "Nonstop to Chengdu Tianfu (TFU)", eur: 442, pick: true, note: "Then metro or taxi to Chengdu East (about 1 h) and a 1–1.5 h train to Chongqing." },
        { a: "Turkish Airlines", t: "Fri 01:40 → Fri 15:15", dur: "8h35", via: "Nonstop to Chengdu Tianfu", eur: 437, note: "Lands a day early (Friday)." },
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
        { a: "Turkish Airlines", t: "Sun 23:50 → Mon 04:50", dur: "10h", via: "Nonstop from Chengdu Tianfu (TFU)", eur: 434, note: "Afternoon train to Chengdu East (1–1.5 h), then about 1 h to Tianfu airport." }
      ]
    }
  },

  places: [
    { c: "CKG", img: "hongyadong", t: "Hongyadong", zh: "洪崖洞", time: "1–2 h, after dark", d: "An 11-storey stilt-house complex lit gold every night on the Jialing cliffs. The classic Chongqing photo." },
    { c: "CKG", img: "liziba", t: "Liziba monorail", zh: "李子坝", time: "30 min", d: "Line 2 runs straight through the 6th–8th floors of an apartment block. Watch from the viewing deck below." },
    { c: "CKG", img: "ciqikou", t: "Ciqikou old town", zh: "磁器口", time: "2–3 h", d: "Ming-era porcelain port turned snack street: mahua twists, spicy everything, teahouses with Sichuan opera." },
    { c: "CKG", img: "hotpot", t: "Chongqing hotpot", zh: "重庆火锅", time: "Every night", d: "Beef-tallow broth with mouth-numbing Sichuan pepper. Order a yuanyang split pot (half not spicy) for the timid." },
    { c: "CKG", img: "dazu", t: "Dazu Rock Carvings", zh: "大足石刻", time: "Day trip, about 1.5 h each way", d: "UNESCO-listed Buddhist cliff carvings from the 9th–13th centuries, including a giant reclining Buddha." },
    { c: "CKG", img: "wulong", t: "Wulong Karst", zh: "武隆", time: "Day trip, about 2.5–3 h each way", d: "Three colossal natural stone bridges over a gorge. You may recognise it from Transformers 4." },
    { c: "XIAN", img: "terracotta", t: "Terracotta Army", zh: "兵马俑", time: "Half day", d: "About 8,000 life-size clay soldiers guarding the First Emperor since 210 BC. Pit 1 stops you in your tracks." },
    { c: "XIAN", img: "xianwall", t: "Ming City Wall", zh: "西安城墙", time: "2–3 h by bike", d: "The best-preserved city wall in China. Rent bikes on top and ride the full 14 km loop." },
    { c: "XIAN", img: "muslim", t: "Muslim Quarter", zh: "回民街", time: "Evening", d: "Smoky lanes of lamb skewers, roujiamo, persimmon cakes and hand-pulled noodles, plus the Great Mosque." },
    { c: "XIAN", img: "goose", t: "Big Wild Goose Pagoda", zh: "大雁塔", time: "1–2 h", d: "Tang dynasty pagoda built for the scriptures Xuanzang brought from India. Fountain show at night." },
    { c: "XIAN", img: "huashan", t: "Mount Huashan", zh: "华山", time: "Full day, optional", d: "One of China's five sacred peaks, famous for vertiginous cliff paths. Cable cars do most of the work." },
    { c: "WH", img: "crane", t: "Yellow Crane Tower", zh: "黄鹤楼", time: "1–2 h", d: "A legendary tower celebrated in Tang poetry, with sweeping views over the Yangtze." },
    { c: "WH", img: "hubeimuseum", t: "Hubei Provincial Museum", zh: "湖北省博物馆", time: "2–3 h", d: "Home to the 2,400-year-old Marquis Yi bronze bells (concerts some days) and the still-sharp Sword of Goujian." },
    { c: "WH", img: "eastlake", t: "East Lake", zh: "东湖", time: "Half day", d: "A huge urban lake with a 100 km+ greenway. Rent bikes and ride at golden hour." },
    { c: "WH", img: "wuhanbridge", t: "Yangtze River Bridge", zh: "武汉长江大桥", time: "1 h", d: "The first bridge ever built across the Yangtze (1957), with road above and rail below. Walk it for the river views." },
    { c: "BJ", img: "forbidden", t: "Forbidden City", zh: "故宫", time: "Half day", d: "980 buildings of imperial palace. Book exactly 7 days ahead with your passport. Closed Mondays." },
    { c: "BJ", img: "mutianyu", t: "Great Wall at Mutianyu", zh: "慕田峪长城", time: "Full day", d: "Restored but beautiful, about 1.5 h from the city. Cable car up and a toboggan run down." },
    { c: "BJ", img: "heaven", t: "Temple of Heaven", zh: "天坛", time: "2 h, mornings", d: "Where emperors prayed for harvests. Come early to join the park's tai chi, dancing and singing locals." },
    { c: "BJ", img: "summer", t: "Summer Palace", zh: "颐和园", time: "Half day", d: "Imperial lakeside retreat: the Long Corridor, Longevity Hill and boats on Kunming Lake." },
    { c: "BJ", img: "hutong", t: "Hutongs", zh: "胡同", time: "Afternoon", d: "Old courtyard alleys around Nanluoguxiang, Shichahai and Houhai. Best seen by bike." },
    { c: "SH", img: "bund", t: "The Bund", zh: "外滩", time: "Evening", d: "A riverfront of 1920s banks facing the Pudong skyline. Go at night when both sides light up." },
    { c: "SH", img: "lujiazui", t: "Lujiazui & Shanghai Tower", zh: "陆家嘴", time: "2 h", d: "The Pearl Tower, the 'bottle opener' and the 632 m Shanghai Tower, with one of the world's highest observation decks." },
    { c: "SH", img: "yugarden", t: "Yu Garden", zh: "豫园", time: "2 h", d: "A Ming dynasty garden of rockeries, koi and pavilions, inside the old-city bazaar. Get soup dumplings next door." },
    { c: "SH", img: "suzhou", t: "Suzhou gardens", zh: "苏州园林", time: "Day trip, 25 min", d: "UNESCO classical gardens: the Humble Administrator's Garden, plus canal-side Pingjiang Road." },
    { c: "SH", img: "westlake", t: "Hangzhou West Lake", zh: "西湖", time: "Day trip, about 1 h", d: "Willow-lined causeways, pagodas and Longjing tea plantations in the hills. Classic China." },
    { c: "ZJJ", img: "avatar", t: "Avatar Hallelujah Mountain", zh: "乾坤柱", time: "Half day", d: "The Southern Sky Column in Yuanjiajie was renamed after the film it inspired. Mist makes it magical." },
    { c: "ZJJ", img: "zjjpark", t: "Zhangjiajie Forest Park", zh: "张家界国家森林公园", time: "1–2 days", d: "China's first national forest park: thousands of quartz-sandstone pillars, some over 200 m tall. UNESCO (Wulingyuan)." },
    { c: "ZJJ", img: "bailong", t: "Bailong Elevator", zh: "百龙天梯", time: "Short ride", d: "A 326 m glass elevator bolted to a cliff face, the world's tallest outdoor lift." },
    { c: "ZJJ", img: "tianmen", t: "Tianmen Mountain", zh: "天门山", time: "Full day", d: "A cable car from the city centre, a glass skywalk on the cliff edge and a natural 131 m arch called Heaven's Gate." },
    { c: "ZJJ", img: "glassbridge", t: "Grand Canyon glass bridge", zh: "大峡谷玻璃桥", time: "Half day", d: "A glass-bottomed footbridge about 300 m above a canyon floor. Not for everyone." },
    { c: "SQ", img: "labdiamond", t: "Zhecheng lab-grown diamonds", zh: "柘城培育钻石", time: "Afternoon", d: "Factory stores (Liliang and Huifeng) show rough stones being grown and sell finished jewellery. Lab-grown stones sell for roughly 1/5 to 1/10 of natural prices." },
    { c: "SQ", img: "zhecheng", t: "Zhecheng & Ronghu Lake", zh: "柘城 · 容湖", time: "1 h", d: "The county seat's lakeside park and pagoda. The planned diamond trading centre sits on the Ronghu wetland shore." },
    { c: "SQ", img: "shangqiu", t: "Guide Ancient City", zh: "商丘古城", time: "Evening", d: "A Ming-era walled town with gates, a moat and lanes, one of the best-preserved in central China." }
  ]
};
