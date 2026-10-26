/* Türkçe: yemek, yerel öneriler ve Zhengzhou gün içi durağı. tr.js'ten sonra yüklenir. */
(function (R) {
  Object.assign(R.legs, {
    "XIAN-ZZ": { note: "Sabah treni, ardından Zhengzhou'da yaklaşık 5 saat." },
    "ZZ-BJ": { note: "Saat 19:00'a kadar birkaç dakikada bir tren var." },
    "WH-ZZ": { note: "Sabah treni, ardından Zhengzhou'da yaklaşık 5 saat." },
    "ZZ-WH": { note: "Akşama kadar tren var." },
    "BJ-ZZ": { note: "Zhengzhou'da tam bir öğleden sonra için erken kalkış." },
    "ZZ-XIAN": { note: "Akşama kadar tren var." }
  });
  R.zz = { name: "Zhengzhou" };

  /* places.js sırasıyla aynı: önce 33 mevcut yer, sonra yerel öneriler */
  while (R.places.length < 33) R.places.push({});
  R.places.push(
    { t: "Huangjueping Grafiti Sokağı", time: "1 sa", d: "Sichuan Güzel Sanatlar Enstitüsü'nün yanında, öğrencilerin baştan aşağı boyadığı apartmanlar." },
    { t: "Kuixing Binası", time: "30 dk", d: "22. katı sokak seviyesinde olan bir kule. Tam Çongçing." },
    { t: "Shancheng Sokağı", time: "1–2 sa", d: "Çay evleri ve nehir manzaralı yamaç sokakları, merdivenler." },
    { t: "Raffles City ve The Crystal", time: "1 sa", d: "Nehirlerin birleştiği yerin üstünde gökyüzü köprüsü. Gün batımında gidin." },
    { t: "Sajinqiao", time: "Akşam", d: "Yerlilerin yediği yer: Müslüman Mahallesi'nden ucuz ve sakin." },
    { t: "Defu Sokağı", time: "Akşam", d: "Güney Kapısı yakınında küçük bir barlar sokağı." },
    { t: "Dahua 1935", time: "1–2 sa", d: "Kafe, dükkân ve küçük tiyatrolara dönüşmüş 1930'lar pamuk fabrikası." },
    { t: "Jiqing Sokağı", time: "Gece", d: "Vuhan'ın gece yemek sokağı (2026'da yenilendi, artık kapalı mekânlarda)." },
    { t: "Li Huangpi Caddesi", time: "1 sa", d: "Kafeleriyle ağaçlı, eski imtiyaz bölgesi caddesi." },
    { t: "Hankou nehir kıyısı", time: "Akşam", d: "Yerlilerin Yangtze boyunca yürüdüğü, dans edip uçurtma uçurduğu yer." },
    { t: "Wudaoying Hutongu", time: "Akşam", d: "Lama Tapınağı'nın yanında kafeler, barlar ve küçük dükkânlar." },
    { t: "Sanlitun", time: "Gece", d: "Pekin'in ana barlar ve teras bölgesi." },
    { t: "Guijie (Hayalet Sokağı)", time: "Gece", d: "Bir kilometre boyunca gece restoranları: kerevit, hotpot, şiş." },
    { t: "Panjiayuan Pazarı", time: "Hafta sonu sabahı", d: "Dev antika ve eski eşya pazarı. Sıkı pazarlık edin." },
    { t: "Speak Low", time: "Akşam", d: "Bar ekipmanı dükkânının arkasında ödüllü gizli bar (579 Fuxing Middle Rd)." },
    { t: "Julu Caddesi", time: "Gece", d: "Eski Fransız Bölgesi'nde barlar caddesi." },
    { t: "Columbia Circle", time: "1–2 sa", d: "Kafe, havuz ve dükkânlara dönüşmüş 1920'ler kulübü." },
    { t: "M50", time: "1–2 sa", d: "Suzhou Deresi kıyısında eski tekstil fabrikalarında sanat galerileri." },
    { t: "Xibu Sokağı", time: "Akşam", d: "Wulingyuan'ın akşam sokağı: Tujia yemekleri ve halk gösterileri." }
  );

  R.food = [
    { street: [["Xiaomian", "小面", "Acı yağlı, fıstıklı kahvaltı eriştesi."], ["Suanla fen", "酸辣粉", "Ekşi-acı tatlı patates eriştesi."], ["Chuanchuan", "串串", "Şişte hotpot; çubuk başına ödenir."], ["Kaoyu", "烤鱼", "Acı yağ dolu tepside bütün ızgara balık."]],
      sit: [["Sığınak hotpot'u", "防空洞火锅", "2. Dünya Savaşı'ndan kalma hava saldırısı tünelinde hotpot."], ["Laziji", "辣子鸡", "Kuru biber yığınının içinde kızarmış tavuk."]] },
    { street: [["Roujiamo", "肉夹馍", "Çıtır yassı ekmekte haşlanmış sığır ya da kuzu."], ["Biangbiang eriştesi", "biangbiang面", "Kemer genişliğinde el açması erişte."], ["Yangrou paomo", "羊肉泡馍", "Ekmeği doğrayıp kuzu suyuna katın."], ["Liangpi", "凉皮", "Acı ve sirkeli soğuk, çiğnemelik erişte."]],
      sit: [["De Fa Chang mantı ziyafeti", "德发长饺子宴", "Çan Kulesi yanında, tek oturuşta onlarca çeşit mantı."], ["Tang Hanedanı şovlu akşam yemeği", "唐乐宫", "Tang dönemi müzik ve dans gösterisiyle akşam yemeği."]] },
    { street: [["Reganmian", "热干面", "Susam ezmeli sıcak kuru erişte: Vuhan kahvaltısı."], ["Doupi", "豆皮", "Çıtır yumurta tabakası altında yapışkan pirinç ve et."], ["Kerevit", "油焖大虾", "Buğulanmış kerevit. Mayıs tam mevsimi."]],
      sit: [["Lao Tong Cheng", "老通城", "Doupi'siyle ünlü eski lokanta."], ["Si Ji Mei", "四季美", "Klasik çorbalı mantı (tangbao)."], ["Wuchang balığı", "清蒸武昌鱼", "Buğulanmış yerel çipura."]] },
    { street: [["Jianbing", "煎饼", "Yumurtalı, çıtır krakerli krep; anında yapılır."], ["Zhajiangmian", "炸酱面", "Fermente soya soslu etli erişte."], ["Kuzu şiş", "羊肉串", "Kimyonlu kuzu; soğuk biranın yanında."]],
      sit: [["Siji Minfu", "四季民福", "Popüler Pekin ördeği. Kuyruk olur."], ["Quanjude", "全聚德", "1864'ten beri klasik ördek lokantası."], ["Xin Rong Ji (Xinyuan South Rd)", "新荣记", "Üç Michelin yıldızı (2026): Taizhou deniz ürünleri. Lüks."], ["King's Joy", "京兆尹", "Lama Tapınağı yanında Michelin yıldızlı (2025) vejetaryen."]] },
    { street: [["Shengjianbao", "生煎", "Tavada çorbalı çörek; örneğin Xiaoyang Shengjian."], ["Xiaolongbao", "小笼包", "Buharda çorbalı mantı."], ["Yeşil soğan yağlı erişte", "葱油拌面", "Sade, kokulu, ucuz."], ["Shouning Caddesi", "寿宁路", "Yaz geceleri hareketli kerevit sokağı."]],
      sit: [["Old Jesse", "老吉士", "Klasik Şanghay ev yemekleri."], ["Taian Table", "泰安门", "Şanghay'ın tek üç Michelin yıldızlı restoranı (2026). Lüks."], ["Fu He Hui", "福和慧", "İki Michelin yıldızlı (2025) vejetaryen."]] },
    { street: [["Tujia san xia guo", "三下锅", "Tujia usulü üç etli kuru tencere."], ["Füme et", "腊肉", "İsli kurutulmuş domuz eti; Hunan klasiği."]],
      sit: [["Xibu Sokağı'nda akşam yemeği", "溪布街", "Wulingyuan'da halk gösterisi eşliğinde Tujia yemekleri."]] },
    { street: [["Hulatang", "胡辣汤", "Biberli Henan kahvaltı çorbası."], ["Huimian", "烩面", "Kuzu suyunda geniş erişte; Henan'ın simgesi."]],
      sit: [["Eski şehirde akşam yemeği", "归德古城", "Guide Antik Kenti'nde Henan ev yemekleri."]] }
  ];
})(window.TRIP_TR);
