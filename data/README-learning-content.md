# Learning Content Veri Yapisi (Coklu JSON)

Tek bir buyuk JSON yerine, icerik parcali ve klasor bazli yonetilir.

## Klasor yapisi

```txt
data/
  categories.json
  001_java/
    subcategories.json
    001_threads/
      topic/
        001_topic.json
      interviews/
        index.json
        001_thread-interview-1.json
        002_thread-interview-2.json
```

## Dosya rolleri

1. `data/categories.json`
- Tum ana kategorileri listeler.
- Her kategori `subcategoriesFile` ile kendi alt-kategori dosyasina gider.

2. `data/<category-folder>/subcategories.json`
- O kategoriye ait alt kategorileri listeler.
- Her alt kategori:
  - `topicFile`
  - `interviewsFile`
  yollarini tasir.

3. `topic/001_topic.json`
- Sadece konu anlatimi icerigini tutar.
- `blocks` dizisinde `paragraph`, `list`, `code` tipleri desteklenir.

4. `interviews/index.json`
- Interview listesini tutar.
- Her interview satiri kendi detay dosyasini `file` ile gosterir.

5. `interviews/00x_*.json`
- Tek bir interview'e ait tum sorular burada tutulur.

## Isimlendirme kurali

- Klasor ve dosyalarda siralama icin `001_`, `002_` gibi prefix kullan.
- UI siralamasi icin JSON icinde ayrica `order` alanini doldur.

## Soru tipleri

1. `mcq`
- `singleChoice`: `true/false`
- `choices`: `[{ id, text }]`
- `correctChoiceIds`: `["A"]` veya `["A","C"]`
- `answerBody`
- `questionKind`: `direct` veya `code-output`
- `questionCode`: opsiyonel, soru icinde kod blogu gosterir
- `optionExplanations`: her secenek icin detayli aciklama listesi

2. `code`
- `starterCode`
- `answerCode`
- `answerBody`
- `publicSolutionUrl` (opsiyonel)

3. `direct`
- Acik-uclu mulakat sorulari icin kullanilir
- `question`
- `answerBody` (opsiyonel)
- `answerCode` (opsiyonel)

## Yeni icerik ekleme akisi

1. Yeni ana kategori ise `categories.json` icine kategori ekle.
2. Kategori klasorunde `subcategories.json` dosyasina alt kategori ekle.
3. Alt kategori altinda `topic/001_topic.json` olustur.
4. `interviews/index.json` icine interview metadata ekle.
5. Her interview icin ayri `00x_*.json` dosyasi olustur.
