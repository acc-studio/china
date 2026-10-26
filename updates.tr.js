/* Türkçe: Zhecheng kaldırıldı, Zhengzhou ve Zhangjiajie günübirlik gezi. more.tr.js'ten sonra yüklenir. */
(function (R) {
  R.cities.SQ = { name: "Zhengzhou", short: "Zhengzhou", tag: "Henan'ın başkenti, elmas merkezi", blurb: "Henan'ın başkenti ve Çin'in laboratuvar elması ticaretinin merkezi.", stay: "", stations: "Zhengzhou East (hızlı tren merkezi)." };
  R.places[30] = { t: "Zhengzhou elmas ticaret merkezi", time: "2 sa", d: "2025'te Havalimanı Bölgesi'nde açıldı, Zhengzhou East'e yaklaşık 40 dk. Çoğunlukla toptan, ama perakende de satıyor. Derecelendirme raporu (IGI, GIA ya da NGTC) isteyin." };
  R.places[31] = { t: "Erqi Anıt Kulesi", time: "30 dk", d: "Şehir merkezinde çift pagodalı kule; Zhengzhou'nun simgesi." };
  R.places.splice(32, 1);
  R.food[6].sit = [["Heji huimian", "合记烩面", "Zhengzhou'nun en bilinen huimian lokantası."]];
  R.waypoints.splice(1, 1);
  R.legs["CKG-ZJJ-DAY"] = { note: "Günün ilk treni. Chongqing East merkeze yaklaşık 45 dk; 06:15'te çıkın." };
  R.legs["ZJJ-CKG-DAY"] = { note: "Dönüşteki son tren. Sabah treniyle birlikte alın." };
})(window.TRIP_TR);
