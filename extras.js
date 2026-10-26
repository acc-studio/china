/* Food, local picks and the Zhengzhou day stop. Loaded after data.js. */
(function (T) {
  /* Zhengzhou day stop: split the middle-stop ⇄ Beijing ride at Zhengzhou East (12306, sample date 5 Nov 2026). */
  Object.assign(T.legs, {
    "XIAN-ZZ": { rec: ["G2238", "Xi'an North", "08:18", "Zhengzhou East", "10:07", "1h49", 243, null], alts: [["G652", "Xi'an North", "07:07", "Zhengzhou East", "09:02", "1h55", 236], ["G92", "Xi'an North", "08:51", "Zhengzhou East", "10:40", "1h49", 257]], daily: 108, note: "Morning train, then about 5 hours in Zhengzhou." },
    "ZZ-BJ": { rec: ["G376", "Zhengzhou East", "15:06", "Beijing West", "17:18", "2h12", 371, null], alts: [["G336", "Zhengzhou East", "15:12", "Beijing West", "17:23", "2h11", 371], ["G382", "Zhengzhou East", "17:11", "Beijing West", "19:30", "2h19", 371]], daily: 94, note: "Later trains run every few minutes until about 19:00." },
    "WH-ZZ": { rec: ["G344", "Wuhan", "08:36", "Zhengzhou East", "10:09", "1h33", 293, null], alts: [["G340", "Wuhan", "07:40", "Zhengzhou East", "09:13", "1h33", 293], ["G318", "Wuhan", "09:21", "Zhengzhou East", "11:04", "1h43", 234]], daily: 77, note: "Morning train, then about 5 hours in Zhengzhou." },
    "ZZ-WH": { rec: ["G427", "Zhengzhou East", "15:16", "Wuhan", "16:50", "1h34", 293, null], alts: [["G335", "Zhengzhou East", "14:22", "Wuhan", "15:55", "1h33", 293], ["G305", "Zhengzhou East", "16:29", "Wuhan", "18:11", "1h42", 293]], daily: 76, note: "Later trains run until the evening." },
    "BJ-ZZ": { rec: ["G307", "Beijing West", "07:05", "Zhengzhou East", "09:23", "2h18", 371, null], alts: [["G351", "Beijing West", "07:55", "Zhengzhou East", "10:14", "2h19", 352], ["G339", "Beijing West", "09:05", "Zhengzhou East", "11:16", "2h11", 371]], daily: 82, note: "Early start for a full afternoon in Zhengzhou." },
    "ZZ-XIAN": { rec: ["G671", "Zhengzhou East", "15:01", "Xi'an North", "16:54", "1h53", 243, null], alts: [["G2007", "Zhengzhou East", "14:50", "Xi'an North", "16:45", "1h55", 239], ["G353", "Zhengzhou East", "15:17", "Xi'an North", "17:08", "1h51", 286]], daily: 85, note: "Later trains run until the evening." }
  });
  T.zz = { name: "Zhengzhou", zh: "郑州", ll: [34.76, 113.78], color: "#0891b2" };

  /* Local picks: shown on the Places tab as compact cards. */
  T.places.push(
    { c: "CKG", local: "🚶", t: "Huangjueping Graffiti Street", zh: "黄桷坪涂鸦街", time: "1 h", d: "Whole apartment blocks painted by art students, next to the Sichuan Fine Arts Institute." },
    { c: "CKG", local: "🚶", t: "Kuixing Building", zh: "魁星楼", time: "30 min", d: "A tower whose 22nd floor is street level. Very Chongqing." },
    { c: "CKG", local: "🚶", t: "Shancheng Alley", zh: "山城巷", time: "1–2 h", d: "Cliffside lanes and stairways with teahouses and river views." },
    { c: "CKG", local: "🍸", t: "Raffles City & The Crystal", zh: "来福士 · 水晶连廊", time: "1 h", d: "Sky bridge over the river junction. Go at sunset." },
    { c: "XIAN", local: "🍜", t: "Sajinqiao", zh: "洒金桥", time: "Evening", d: "Where locals eat: cheaper and less crowded than the Muslim Quarter." },
    { c: "XIAN", local: "🍸", t: "Defu Alley", zh: "德福巷", time: "Evening", d: "Small bar street near the South Gate." },
    { c: "XIAN", local: "🚶", t: "Dahua 1935", zh: "大华1935", time: "1–2 h", d: "1930s cotton mill turned cafés, shops and small theatres." },
    { c: "WH", local: "🍜", t: "Jiqing Street", zh: "吉庆街", time: "Night", d: "Wuhan's late-night eating street (renovated in 2026, now indoors)." },
    { c: "WH", local: "🚶", t: "Li Huangpi Road", zh: "黎黄陂路", time: "1 h", d: "Leafy old concession street with cafés." },
    { c: "WH", local: "🚶", t: "Hankou riverside", zh: "汉口江滩", time: "Evening", d: "Where locals walk, dance and fly kites along the Yangtze." },
    { c: "BJ", local: "🍸", t: "Wudaoying Hutong", zh: "五道营胡同", time: "Evening", d: "Hutong of cafés, bars and small shops by the Lama Temple." },
    { c: "BJ", local: "🍸", t: "Sanlitun", zh: "三里屯", time: "Night", d: "Beijing's main bar and rooftop district." },
    { c: "BJ", local: "🍜", t: "Guijie (Ghost Street)", zh: "簋街", time: "Night", d: "A kilometre of late-night restaurants: crayfish, hotpot, skewers." },
    { c: "BJ", local: "🚶", t: "Panjiayuan Market", zh: "潘家园", time: "Weekend morning", d: "Huge antiques and curios market. Bargain hard." },
    { c: "SH", local: "🍸", t: "Speak Low", zh: "", time: "Evening", d: "Award-winning speakeasy behind a bar-tools shop (579 Fuxing Middle Rd)." },
    { c: "SH", local: "🍸", t: "Julu Road", zh: "巨鹿路", time: "Night", d: "Bar strip in the former French Concession." },
    { c: "SH", local: "🚶", t: "Columbia Circle", zh: "上生新所", time: "1–2 h", d: "1920s country club turned cafés, pool and shops." },
    { c: "SH", local: "🚶", t: "M50", zh: "M50创意园", time: "1–2 h", d: "Art galleries in old textile mills by Suzhou Creek." },
    { c: "ZJJ", local: "🍜", t: "Xibu Street", zh: "溪布街", time: "Evening", d: "Wulingyuan's evening street: Tujia food and folk shows." }
  );

  /* Food: street eats and sit-down picks per stop. */
  T.food = [
    { c: "CKG", img: "hotpot",
      street: [["Xiaomian", "小面", "Breakfast noodles in chili oil with peanuts."], ["Suanla fen", "酸辣粉", "Hot and sour sweet-potato noodles."], ["Chuanchuan", "串串", "Hotpot on skewers, paid per stick."], ["Kaoyu", "烤鱼", "Whole grilled fish in a tray of chili oil."]],
      sit: [["Bomb-shelter hotpot", "防空洞火锅", "Hotpot inside an old WWII air-raid tunnel."], ["Laziji", "辣子鸡", "Fried chicken buried in dried chilies."]] },
    { c: "XIAN", img: "f_roujiamo", img2: "f_biang",
      street: [["Roujiamo", "肉夹馍", "Stewed beef or lamb in a crisp flatbread."], ["Biangbiang noodles", "biangbiang面", "Belt-wide hand-pulled noodles."], ["Yangrou paomo", "羊肉泡馍", "Tear bread into a lamb broth."], ["Liangpi", "凉皮", "Cold, chewy noodles with chili and vinegar."]],
      sit: [["De Fa Chang dumpling banquet", "德发长饺子宴", "Dozens of dumpling shapes in one sitting, by the Bell Tower."], ["Tang Dynasty Show dinner", "唐乐宫", "Dinner with a Tang-era music and dance show."]] },
    { c: "WH", img: "f_reganmian", img2: "f_crayfish",
      street: [["Reganmian", "热干面", "Hot dry noodles with sesame paste: Wuhan's breakfast."], ["Doupi", "豆皮", "Sticky rice and pork under a crisp egg skin.", "p"], ["Crayfish", "油焖大虾", "Braised crayfish. May is peak season."]],
      sit: [["Lao Tong Cheng", "老通城", "Famous old house for doupi.", "p"], ["Si Ji Mei", "四季美", "Classic soup dumplings (tangbao).", "p"], ["Wuchang fish", "清蒸武昌鱼", "Steamed local bream."]] },
    { c: "BJ", img: "f_duck", img2: "f_jianbing",
      street: [["Jianbing", "煎饼", "Crepe with egg and crispy cracker, made to order."], ["Zhajiangmian", "炸酱面", "Noodles with fermented soybean pork sauce.", "p"], ["Lamb skewers", "羊肉串", "Cumin lamb, best with a cold beer."]],
      sit: [["Siji Minfu", "四季民福", "Popular Peking duck. Expect a queue."], ["Quanjude", "全聚德", "The classic duck house, since 1864."], ["Xin Rong Ji (Xinyuan South Rd)", "新荣记", "Three Michelin stars (2026): Taizhou seafood. Splurge."], ["King's Joy", "京兆尹", "Michelin-starred vegetarian (2025) by the Lama Temple."]] },
    { c: "SH", img: "f_xlb", img2: "f_shengjian",
      street: [["Shengjianbao", "生煎", "Pan-fried soup buns, e.g. at Xiaoyang Shengjian.", "p"], ["Xiaolongbao", "小笼包", "Steamed soup dumplings.", "p"], ["Scallion oil noodles", "葱油拌面", "Simple, fragrant, cheap."], ["Shouning Road", "寿宁路", "Crayfish street, buzzing on summer nights."]],
      sit: [["Old Jesse", "老吉士", "Classic Shanghainese home cooking."], ["Taian Table", "泰安门", "Shanghai's only three-Michelin-star restaurant (2026). Splurge."], ["Fu He Hui", "福和慧", "Two Michelin stars (2025), vegetarian."]] },
    { c: "ZJJ",
      street: [["Tujia san xia guo", "三下锅", "Dry pot of three meats, Tujia style.", "p"], ["Smoked pork", "腊肉", "Smoky cured pork, a Hunan staple.", "p"]],
      sit: [["Xibu Street dinner", "溪布街", "Tujia dishes with a folk show in Wulingyuan."]] },
    { c: "SQ",
      street: [["Hulatang", "胡辣汤", "Peppery Henan breakfast soup."], ["Huimian", "烩面", "Wide noodles in lamb broth, Henan's signature."]],
      sit: [["Old-town dinner", "归德古城", "Henan home cooking inside Guide Ancient City."]] }
  ];
})(window.TRIP);
