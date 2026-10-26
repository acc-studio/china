/* More things to do: sights (tourism), local life and extra dishes. Loaded after extras.js. */
(function (T) {
  T.places.push(
    /* Tourism */
    { c: "CKG", img: "t_3gorges", t: "Three Gorges Museum", zh: "三峡博物馆", time: "2 h", d: "Chongqing, the Yangtze and the Three Gorges, before and after the dam." },
    { c: "CKG", img: "t_cableway", t: "Yangtze River Cableway", zh: "长江索道", time: "15 min", d: "Cable car across the Yangtze since 1987. Queue early or late." },
    { c: "CKG", img: "t_hall", t: "People's Great Hall", zh: "人民大礼堂", time: "1 h", d: "1950s hall modelled on Beijing's Temple of Heaven." },
    { c: "XIAN", img: "t_shaanxi", t: "Shaanxi History Museum", zh: "陕西历史博物馆", time: "2–3 h", d: "Tang gold, murals and bronzes. Free tickets go fast, so book ahead." },
    { c: "XIAN", img: "t_mosque", t: "Great Mosque", zh: "化觉巷清真大寺", time: "1 h", d: "Chinese-style mosque from the Ming era, hidden in the Muslim Quarter." },
    { c: "XIAN", img: "t_drum", t: "Bell & Drum Towers", zh: "钟鼓楼", time: "1 h", d: "Ming towers in the old centre, lit up at night." },
    { c: "WH", img: "t_guiyuan", t: "Guiyuan Temple", zh: "归元寺", time: "1 h", d: "Buddhist temple with a hall of 500 arhat statues." },
    { c: "BJ", img: "t_lama", t: "Lama Temple", zh: "雍和宫", time: "1–2 h", d: "Tibetan Buddhist temple with an 18 m sandalwood Buddha." },
    { c: "BJ", img: "t_jingshan", t: "Jingshan Park", zh: "景山公园", time: "1 h", d: "Climb the hill for the view over the Forbidden City roofs." },
    { c: "BJ", img: "t_beihai", t: "Beihai Park", zh: "北海公园", time: "2 h", d: "Lake, white dagoba and rowing boats." },
    { c: "BJ", img: "t_nest", t: "Olympic Park & Bird's Nest", zh: "鸟巢", time: "1–2 h", d: "2008 Olympic stadium. Best lit up at night." },
    { c: "SH", img: "t_shmuseum", t: "Shanghai Museum", zh: "上海博物馆", time: "2–3 h", d: "Bronzes, ceramics and calligraphy. Free, but book ahead." },
    { c: "SH", img: "t_jadebuddha", t: "Jade Buddha Temple", zh: "玉佛寺", time: "1 h", d: "Two Burmese jade Buddhas in a working temple." },
    { c: "SH", img: "t_zhujiajiao", t: "Zhujiajiao water town", zh: "朱家角", time: "Half day", d: "Canals and stone bridges, about 1 h by Metro Line 17." },
    { c: "SH", img: "t_nanjingrd", t: "Nanjing Road", zh: "南京路", time: "1–2 h", d: "Neon shopping street from People's Square to the Bund." },
    { c: "ZJJ", img: "t_tianzi", t: "Tianzi Mountain", zh: "天子山", time: "Half day", d: "A sea of pillars seen from above. Cable car up." },
    { c: "ZJJ", img: "t_fenghuang", t: "Fenghuang Ancient Town", zh: "凤凰古城", time: "Full day", d: "Stilt houses along a river, 1 h by train from Zhangjiajie West." },
    { c: "SQ", img: "t_henanmuseum", t: "Henan Museum", zh: "河南博物院", time: "2 h", d: "One of China's best museums, in Zhengzhou (good for the Zhengzhou stop)." },
    /* Life */
    { c: "CKG", local: "🍵", t: "Jiaotong Teahouse", zh: "交通茶馆", time: "1 h", d: "Smoky old teahouse in Huangjueping, unchanged for decades." },
    { c: "CKG", local: "🌃", t: "Yikeshu Viewpoint", zh: "一棵树观景台", time: "Evening", d: "Night view over the whole city from Nanshan." },
    { c: "CKG", local: "🚶", t: "Jiefangbei at night", zh: "解放碑", time: "Evening", d: "The pedestrian heart of the city, busy until late." },
    { c: "XIAN", local: "🍜", t: "Yongxingfang", zh: "永兴坊", time: "Evening", d: "Lane of Shaanxi snacks. Try the bowl-smashing rice wine." },
    { c: "XIAN", local: "🌃", t: "Big Tang Night Street", zh: "大唐不夜城", time: "Evening", d: "Boulevard of lights and street shows below the Goose Pagoda." },
    { c: "WH", local: "🍸", t: "Wuhan Tiandi", zh: "武汉天地", time: "Evening", d: "Restaurants and bars in restored old-style blocks." },
    { c: "WH", local: "🚶", t: "Chu River & Han Street", zh: "楚河汉街", time: "Evening", d: "Canal-side shopping street, busy at night." },
    { c: "BJ", local: "🍸", t: "Houhai", zh: "后海", time: "Night", d: "Lakeside bars with live music." },
    { c: "BJ", local: "🍸", t: "Gulou lanes", zh: "鼓楼", time: "Evening", d: "Small bars and cafés around the old Drum and Bell Towers." },
    { c: "BJ", local: "🚶", t: "Nanluoguxiang", zh: "南锣鼓巷", time: "1 h", d: "Busy hutong of snacks and shops. The side lanes are quieter." },
    { c: "SH", local: "🍸", t: "Xintiandi", zh: "新天地", time: "Evening", d: "Old shikumen lanes turned restaurants and bars." },
    { c: "SH", local: "🚶", t: "Tianzifang", zh: "田子坊", time: "1–2 h", d: "Maze of lanes with small shops and cafés." },
    { c: "SH", local: "🚶", t: "Anfu & Wukang Road", zh: "安福路 · 武康路", time: "2 h", d: "Plane-tree streets, cafés and the Wukang Mansion." },
    { c: "SH", local: "👀", t: "People's Park marriage market", zh: "人民公园相亲角", time: "Weekend afternoon", d: "Parents trade their children's CVs on umbrellas. Only on weekends." },
    { c: "ZJJ", local: "🎭", t: "Fox Fairy show", zh: "天门狐仙", time: "Evening", d: "Open-air musical staged in a canyon at Tianmen Mountain." }
  );

  const add = (code, key, items) => { const f = T.food.find((x) => x.c === code); f[key] = f[key].concat(items); };
  add("CKG", "street", [["Wanza mian", "豌杂面", "Noodles with mushy peas and pork mince.", "p"], ["Liangfen", "凉粉", "Cold jelly noodles in chili sauce."]]);
  add("CKG", "sit", [["Jianghu cai", "江湖菜", "Rustic, fiery Chongqing family dishes."]]);
  add("XIAN", "street", [["Persimmon cakes", "柿子饼", "Fried persimmon pastries, a Muslim Quarter sweet."], ["Jinggao", "甑糕", "Sticky rice with dates, sold from huge pots."]]);
  add("XIAN", "sit", [["Lao Sun Jia", "老孙家", "Famous old house for yangrou paomo."]]);
  add("WH", "street", [["Mianwo", "面窝", "Crispy fried rice-batter rings."], ["Hubu Alley", "户部巷", "A whole alley of Wuhan breakfasts."]]);
  add("WH", "sit", [["Lotus root soup", "莲藕排骨汤", "Slow-cooked lotus root and pork rib soup.", "p"]]);
  add("BJ", "street", [["Luzhu huoshao", "卤煮火烧", "Old-Beijing offal stew with bread.", "p"], ["Tanghulu", "糖葫芦", "Candied hawthorn on a stick."]]);
  add("BJ", "sit", [["Donglaishun", "东来顺", "Copper-pot lamb hotpot, a halal institution."]]);
  add("SH", "street", [["Scallion pancakes", "葱油饼", "Flaky, crispy, cheap."], ["Pork chop rice cakes", "排骨年糕", "Fried pork chop with chewy rice cakes.", "p"]]);
  add("SH", "sit", [["Lost Heaven", "花马天堂", "Yunnan food in a lantern-lit room."]]);
  add("ZJJ", "street", [["Hunan rice noodles", "米粉", "Breakfast rice noodles with chili."]]);
})(window.TRIP);
