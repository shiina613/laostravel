# Thư mục lưu ảnh cho Frontend

Cấu trúc thư mục:

```
images/
├── hero/              # Ảnh hero section
├── destinations/      # Ảnh điểm đến
├── festivals/         # Ảnh lễ hội
└── articles/          # Ảnh bài viết
```

## Hướng dẫn thay ảnh

### Hero Section
- Thay `THAY_LINK_ANH_HERO_O_DAY` bằng: `/images/hero/hero.jpg`

### Destinations
- `THAY_LINK_ANH_DESTINATION_1` → `/images/destinations/luang-prabang.jpg`
- `THAY_LINK_ANH_DESTINATION_2` → `/images/destinations/vientiane.jpg`
- `THAY_LINK_ANH_DESTINATION_3` → `/images/destinations/wat-xieng-thong.jpg`
- `THAY_LINK_ANH_DESTINATION_4` → `/images/destinations/kuang-si.jpg`
- `THAY_LINK_ANH_DESTINATION_5` → `/images/destinations/vang-vieng.jpg`
- `THAY_LINK_ANH_DESTINATION_6` → `/images/destinations/4000-islands.jpg`

### Festivals
- `THAY_LINK_ANH_FESTIVAL_1` → `/images/festivals/bunpimay.jpg`
- `THAY_LINK_ANH_FESTIVAL_2` → `/images/festivals/that-luong.jpg`
- `THAY_LINK_ANH_FESTIVAL_3` → `/images/festivals/boat-racing.jpg`

### Articles
- `THAY_LINK_ANH_ARTICLE_1` → `/images/articles/article-1.jpg`
- `THAY_LINK_ANH_ARTICLE_2` → `/images/articles/article-2.jpg`
- `THAY_LINK_ANH_ARTICLE_3` → `/images/articles/article-3.jpg`

## Cách sử dụng

1. Tải ảnh vào các thư mục tương ứng
2. Mở file component cần sửa (ví dụ: `HeroSection.js`)
3. Thay placeholder bằng đường dẫn ảnh thực tế
4. Ví dụ:
   ```javascript
   // Trước
   backgroundImage: `url('THAY_LINK_ANH_HERO_O_DAY')`
   
   // Sau
   backgroundImage: `url('/images/hero/hero.jpg')`
   ```
