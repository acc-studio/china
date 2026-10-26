/* Türkçe: ek gezilecek yerler, yaşam ve yemekler (more.js ile aynı sıra). extras.tr.js'ten sonra yüklenir. */
(function (R) {
  while (R.places.length < 52) R.places.push({});
  R.places.push(
    { t: "Üç Boğaz Müzesi", time: "2 sa", d: "Barajdan önce ve sonra Çongçing, Yangtze ve Üç Boğaz." },
    { t: "Yangtze Teleferiği", time: "15 dk", d: "1987'den beri Yangtze'yi geçen teleferik. Erken ya da geç gidin." },
    { t: "Halkın Büyük Salonu", time: "1 sa", d: "Pekin'deki Cennet Tapınağı örnek alınarak yapılmış 1950'ler salonu." },
    { t: "Shaanxi Tarih Müzesi", time: "2–3 sa", d: "Tang altınları, freskler ve bronzlar. Ücretsiz biletler çabuk biter, önceden alın." },
    { t: "Büyük Cami", time: "1 sa", d: "Müslüman Mahallesi'nde saklı, Ming döneminden Çin üslubu cami." },
    { t: "Çan ve Davul Kuleleri", time: "1 sa", d: "Eski şehir merkezindeki Ming kuleleri, gece ışıklandırılıyor." },
    { t: "Guiyuan Tapınağı", time: "1 sa", d: "500 arhat heykelinin bulunduğu salonuyla Budist tapınağı." },
    { t: "Lama Tapınağı", time: "1–2 sa", d: "18 m'lik sandal ağacı Buda heykeliyle Tibet Budist tapınağı." },
    { t: "Jingshan Parkı", time: "1 sa", d: "Yasak Şehir'in çatılarına bakan manzara için tepeye çıkın." },
    { t: "Beihai Parkı", time: "2 sa", d: "Göl, beyaz stupa ve kürekli tekneler." },
    { t: "Olimpiyat Parkı ve Kuş Yuvası", time: "1–2 sa", d: "2008 Olimpiyat stadı. En güzeli gece, ışıklar yanınca." },
    { t: "Şanghay Müzesi", time: "2–3 sa", d: "Bronzlar, seramikler ve hat sanatı. Ücretsiz, ama önceden rezervasyon gerekli." },
    { t: "Yeşim Buda Tapınağı", time: "1 sa", d: "Hâlâ ibadet edilen tapınakta iki Birmanya yeşimi Buda." },
    { t: "Zhujiajiao su kasabası", time: "Yarım gün", d: "Kanallar ve taş köprüler; Metro 17. hatla yaklaşık 1 sa." },
    { t: "Nanjing Caddesi", time: "1–2 sa", d: "People's Square'den Bund'a uzanan neon ışıklı alışveriş caddesi." },
    { t: "Tianzi Dağı", time: "Yarım gün", d: "Yukarıdan bakınca bir sütun denizi. Teleferikle çıkılır." },
    { t: "Fenghuang Antik Kenti", time: "Tam gün", d: "Nehir boyunca kazık evler; Zhangjiajie West'ten trenle 1 sa." },
    { t: "Henan Müzesi", time: "2 sa", d: "Çin'in en iyi müzelerinden biri, Zhengzhou'da (Zhengzhou molasına uygun)." },
    { t: "Jiaotong Çay Evi", time: "1 sa", d: "Huangjueping'de, onlarca yıldır değişmemiş dumanlı eski çay evi." },
    { t: "Yikeshu Seyir Terası", time: "Akşam", d: "Nanshan'dan tüm şehrin gece manzarası." },
    { t: "Gece Jiefangbei", time: "Akşam", d: "Şehrin yaya kalbi; geç saate kadar hareketli." },
    { t: "Yongxingfang", time: "Akşam", d: "Shaanxi atıştırmalıkları sokağı. Kâse kırmalı pirinç şarabını deneyin." },
    { t: "Büyük Tang Gece Bulvarı", time: "Akşam", d: "Kaz Pagodası'nın eteğinde ışıklar ve sokak gösterileri bulvarı." },
    { t: "Wuhan Tiandi", time: "Akşam", d: "Restore edilmiş eski tarz bloklarda restoranlar ve barlar." },
    { t: "Chu Nehri ve Han Caddesi", time: "Akşam", d: "Kanal kenarında, geceleri hareketli alışveriş caddesi." },
    { t: "Houhai", time: "Gece", d: "Canlı müzikli göl kenarı barları." },
    { t: "Gulou sokakları", time: "Akşam", d: "Eski Davul ve Çan Kuleleri çevresinde küçük barlar ve kafeler." },
    { t: "Nanluoguxiang", time: "1 sa", d: "Atıştırmalık ve dükkânlarla dolu kalabalık hutong. Yan sokaklar daha sakin." },
    { t: "Xintiandi", time: "Akşam", d: "Restoran ve bara dönüşmüş eski shikumen sokakları." },
    { t: "Tianzifang", time: "1–2 sa", d: "Küçük dükkân ve kafelerle dolu sokaklar labirenti." },
    { t: "Anfu ve Wukang Caddeleri", time: "2 sa", d: "Çınar ağaçlı caddeler, kafeler ve Wukang Binası." },
    { t: "People's Park evlilik pazarı", time: "Hafta sonu öğleden sonra", d: "Ebeveynler şemsiyelere çocuklarının özgeçmişini asıyor. Sadece hafta sonları." },
    { t: "Tilki Peri gösterisi", time: "Akşam", d: "Tianmen Dağı'nda bir kanyonda sahnelenen açık hava müzikali." }
  );

  const add = (i, key, items) => { R.food[i][key] = R.food[i][key].concat(items); };
  add(0, "street", [["Wanza mian", "豌杂面", "Bezelye püresi ve kıymalı (domuz) erişte."], ["Liangfen", "凉粉", "Acı soslu soğuk jöle eriştesi."]]);
  add(0, "sit", [["Jianghu cai", "江湖菜", "Rustik ve ateşli Çongçing ev yemekleri."]]);
  add(1, "street", [["Hurma çöreği", "柿子饼", "Kızarmış hurma (trabzon hurması) hamur işi; Müslüman Mahallesi tatlısı."], ["Jinggao", "甑糕", "Dev kazanlardan satılan hurmalı yapışkan pirinç."]]);
  add(1, "sit", [["Lao Sun Jia", "老孙家", "Yangrou paomo'suyla ünlü eski lokanta."]]);
  add(2, "street", [["Mianwo", "面窝", "Çıtır kızarmış pirinç hamuru halkaları."], ["Hubu Sokağı", "户部巷", "Baştan sona Vuhan kahvaltısı sokağı."]]);
  add(2, "sit", [["Lotus kökü çorbası", "莲藕排骨汤", "Uzun pişmiş lotus kökü ve domuz kaburga çorbası."]]);
  add(3, "street", [["Luzhu huoshao", "卤煮火烧", "Ekmekli eski Pekin sakatat yahnisi."], ["Tanghulu", "糖葫芦", "Çubukta şekerli alıç."]]);
  add(3, "sit", [["Donglaishun", "东来顺", "Bakır kazanda kuzu hotpot; köklü bir helal lokanta."]]);
  add(4, "street", [["Yeşil soğanlı börek", "葱油饼", "Katmerli, çıtır, ucuz."], ["Pirzola ve pirinç keki", "排骨年糕", "Kızarmış domuz pirzolası ve çiğnemelik pirinç keki."]]);
  add(4, "sit", [["Lost Heaven", "花马天堂", "Fenerlerle aydınlanan salonda Yunnan yemekleri."]]);
  add(5, "street", [["Hunan pirinç eriştesi", "米粉", "Acılı kahvaltı pirinç eriştesi."]]);
})(window.TRIP_TR);
