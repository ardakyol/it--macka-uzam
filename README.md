# it--macka-uzam

 **İTÜ Maçka Kampüsü için mobil harita uygulaması**

Bu proje, İTÜ Maçka Kampüsü içerisinde önemli konumları harita üzerinde işaretlemek ve bu konumlara rota çizmek amacıyla geliştirilmiştir.

##  Kullanılan Teknolojiler

- **React Native** (Expo)
- **TypeScript**
- **React Navigation**
- **React Native Maps**
- **Google Maps Directions API**
- **VS Code**

##  Uygulama Özellikleri

- İTÜ Maçka kampüsündeki konumları harita üzerinde görüntüleme
- Marker tıklanınca isim ve yön bilgisi
- Konumdan seçilen noktaya rota çizimi (Google Maps Directions API ile)
- Responsive ve kullanıcı dostu arayüz
- Expo ile test edilebilir

##  Projeyi Çalıştırma

1. Expo CLI yüklü değilse:
   ```bash
   npm install -g expo-cli
   npm install
   expo start
## Proje yapısı

├── app/                # Navigation sayfaları
├── assets/             # Görsel ve fontlar
├── components/         # Marker, Harita bileşenleri
├── constants/          # Konum listesi ve sabitler
├── hooks/              # Tema ve renk yönetimi
├── scripts/            # Varsayılan expo scriptleri
├── README.md
