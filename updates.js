/* Zhecheng dropped (diamonds = Zhengzhou day stop); Zhangjiajie as a train day trip from Chongqing. Loaded after more.js. */
(function (T) {
  /* "SQ" is now the Henan/Zhengzhou entry used by Things To Do */
  T.cities.SQ = { name: "Zhengzhou", short: "Zhengzhou", zh: "郑州", ll: [34.75, 113.66], color: "#0891b2", emoji: "💎", img: "t_erqi", temp: 27,
    tag: "Henan's capital, diamond hub", blurb: "Henan's capital and the hub of China's lab-grown diamond trade.", stay: "", stations: "Zhengzhou East (high-speed hub)." };
  T.places[30] = { c: "SQ", img: "labdiamond", t: "Zhengzhou diamond trading centre", zh: "郑州培育钻石国际交易中心", time: "2 h", d: "Opened in 2025 in the Airport Zone, about 40 min from Zhengzhou East. Mostly wholesale, but it sells retail too. Ask for a grading report (IGI, GIA or NGTC)." };
  T.places[31] = { c: "SQ", img: "t_erqi", t: "Erqi Memorial Tower", zh: "二七纪念塔", time: "30 min", d: "Twin-pagoda tower in the city centre, Zhengzhou's landmark." };
  T.places.splice(32, 1);
  T.food.find((f) => f.c === "SQ").sit = [["Heji huimian", "合记烩面", "Zhengzhou's best-known huimian house."]];
  T.waypoints.splice(1, 1);
  ["XIAN-SQ", "WH-SQ", "SQ-BJ", "ZJJ-XIAN"].forEach((k) => delete T.paths[k]);

  /* Day trip trains (12306, sample date 5 Nov 2026) */
  T.legs["CKG-ZJJ-DAY"] = { rec: ["G3869", "Chongqing East", "07:12", "Zhangjiajie West", "09:41", "2h29", 207, 332],
    alts: [["G2425", "Chongqing East", "07:17", "Zhangjiajie West", "10:08", "2h51", 199], ["G2427", "Chongqing East", "08:08", "Zhangjiajie West", "10:42", "2h34", 215]],
    daily: 24, note: "First train of the day. Chongqing East is about 45 min from the centre, so leave by 06:15." };
  T.legs["ZJJ-CKG-DAY"] = { rec: ["G2440", "Zhangjiajie West", "19:47", "Chongqing East", "22:16", "2h29", 207, 332],
    alts: [["G3870", "Zhangjiajie West", "19:24", "Chongqing East", "22:10", "2h46", 207], ["G3376", "Zhangjiajie West", "17:57", "Chongqing East", "20:25", "2h28", 221]],
    daily: 24, note: "Last train back. Book it together with the morning train." };
})(window.TRIP);
