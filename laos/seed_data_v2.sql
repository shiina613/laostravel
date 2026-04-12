-- ============================================================
-- SEED DATA v2 - Laos Travel (UTF8MB4)
-- ============================================================
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

USE laostravel;

-- DESTINATIONS
INSERT INTO destinations (name, slug, short_description, description, province, thumbnail, category_id, status, created_at, view_count) VALUES
(
  'Luang Prabang',
  'luang-prabang',
  'Thành phố cổ kính được UNESCO công nhận, nổi tiếng với những ngôi chùa vàng và phố cổ bên sông Mekong.',
  'Luang Prabang là cố đô của Lào, được UNESCO công nhận là Di sản Thế giới năm 1995. Thành phố nằm ở ngã ba sông Mekong và sông Nam Khan, bao quanh bởi những ngọn núi xanh mướt. Nơi đây nổi tiếng với hơn 30 ngôi chùa cổ kính, trong đó Wat Xieng Thong là đẹp nhất. Mỗi buổi sáng sớm, du khách có thể chứng kiến nghi lễ dâng cơm (Tak Bat) của các nhà sư mặc áo vàng rực rỡ.',
  'Tỉnh Luang Prabang',
  '/uploads/destinations/2/thumbnail.jpg',
  4, 'ACTIVE', NOW(), 0
),
(
  'Vientiane',
  'vientiane',
  'Thủ đô yên bình của Lào với kiến trúc Pháp-Lào độc đáo, bảo tàng phong phú và cuộc sống nhẹ nhàng bên sông Mekong.',
  'Vientiane là thủ đô và thành phố lớn nhất của Lào, nằm bên bờ sông Mekong. Đây là một trong những thủ đô yên tĩnh nhất Đông Nam Á. Điểm nhấn là Pha That Luang - biểu tượng quốc gia, một tháp vàng rực rỡ xây từ thế kỷ 16. Patuxai - Khải Hoàn Môn của Lào - là công trình kiến trúc ấn tượng không thể bỏ qua. Dọc bờ sông Mekong có con đường đi bộ tuyệt đẹp để ngắm hoàng hôn.',
  'Thủ đô Vientiane',
  '/uploads/destinations/3/thumbnail.jpg',
  4, 'ACTIVE', NOW(), 0
),
(
  'Thác Kuang Si',
  'thac-kuang-si',
  'Thác nước ba tầng huyền ảo với làn nước xanh ngọc bích, cách Luang Prabang 29km - điểm đến không thể bỏ qua.',
  'Thác Kuang Si là một trong những thác nước đẹp nhất Đông Nam Á, nằm cách Luang Prabang khoảng 29km về phía nam. Thác có ba tầng chính với chiều cao tổng cộng khoảng 60m, nước chảy qua các tầng đá vôi tạo thành những hồ bơi tự nhiên với màu xanh ngọc bích tuyệt đẹp. Du khách có thể tắm trong các hồ nước mát lạnh hoặc đi bộ theo đường mòn lên đỉnh thác.',
  'Tỉnh Luang Prabang',
  '/uploads/destinations/4/thumbnail.jpg',
  2, 'ACTIVE', NOW(), 0
),
(
  'Vang Vieng',
  'vang-vieng',
  'Thị trấn phiêu lưu nằm giữa những núi đá vôi hùng vĩ, nổi tiếng với kayaking, leo núi và hang động kỳ bí.',
  'Vang Vieng là thị trấn du lịch nằm bên bờ sông Nam Song, bao quanh bởi những dãy núi đá vôi hùng vĩ. Đây là thiên đường cho người yêu thích hoạt động ngoài trời: kayaking trên sông, leo núi, đi xe đạp qua cánh đồng lúa xanh, hay khám phá các hang động như Tham Jang, Tham Phu Kham với hồ nước xanh trong vắt bên trong.',
  'Tỉnh Vientiane',
  '/uploads/destinations/5/thumbnail.jpg',
  2, 'ACTIVE', NOW(), 0
),
(
  'Wat Xieng Thong',
  'wat-xieng-thong',
  'Ngôi chùa hoàng gia đẹp nhất Lào tại Luang Prabang, kiệt tác kiến trúc Phật giáo với mái cong chạm đất và khảm kính rực rỡ.',
  'Wat Xieng Thong được xây dựng năm 1560 dưới triều vua Setthathirath, là ngôi chùa quan trọng và đẹp nhất trong số hơn 30 ngôi chùa tại Luang Prabang. Kiến trúc đặc trưng với mái cong nhiều tầng chạm gần đến mặt đất, được trang trí bằng những mảnh kính màu ghép thành tranh mô tả cây sự sống và các cảnh trong thần thoại Phật giáo.',
  'Tỉnh Luang Prabang',
  '/uploads/destinations/6/thumbnail.jpg',
  3, 'ACTIVE', NOW(), 0
),
(
  'Quần đảo 4000 Đảo (Si Phan Don)',
  'si-phan-don-4000-dao',
  'Quần đảo huyền bí trên sông Mekong ở cực nam Lào, nơi thời gian như ngừng trôi với làng chài yên bình và thác Khone Phapheng hùng vĩ.',
  'Si Phan Don hay 4000 Đảo là quần đảo nằm trên sông Mekong thuộc tỉnh Champasak, cực nam Lào. Nơi đây nổi tiếng với thác Khone Phapheng - thác nước rộng nhất Đông Nam Á, và là một trong số ít nơi có thể ngắm cá heo sông Irrawaddy đang có nguy cơ tuyệt chủng. Cuộc sống trên đảo diễn ra chậm rãi, yên bình với những chiếc võng mắc giữa hàng dừa.',
  'Tỉnh Champasak',
  '/uploads/destinations/7/thumbnail.jpg',
  2, 'ACTIVE', NOW(), 0
);

-- FESTIVALS
INSERT INTO festivals (name, slug, short_description, description, province, thumbnail, start_date, end_date, status, created_at, view_count) VALUES
(
  'Tết Bunpimay (Năm Mới Lào)',
  'tet-bunpimay',
  'Lễ hội Năm Mới lớn nhất của người Lào diễn ra vào tháng 4, với những màn té nước vui nhộn và nghi lễ tắm tượng Phật thiêng liêng.',
  'Bunpimay là lễ hội Năm Mới truyền thống của người Lào, thường diễn ra từ ngày 13 đến 15 tháng 4 hàng năm. Điểm nhấn là tục té nước - người dân và du khách té nước vào nhau như cách chúc phúc, rửa trôi điều xui xẻo của năm cũ. Ngoài ra còn có nghi lễ tắm tượng Phật bằng nước thơm, diễu hành trên đường phố và biểu diễn âm nhạc truyền thống.',
  'Toàn quốc',
  '/uploads/festivals/1/thumbnail.jpg',
  '2026-04-13', '2026-04-15',
  'ACTIVE', NOW(), 0
),
(
  'Lễ hội Thạt Luổng',
  'le-hoi-that-luang',
  'Lễ hội Phật giáo lớn nhất Lào tổ chức tại tháp vàng Pha That Luang ở Vientiane, thu hút hàng chục nghìn người hành hương mỗi năm.',
  'Lễ hội Thạt Luổng là lễ hội tôn giáo và văn hóa lớn nhất của Lào, diễn ra vào tháng 11 tại khuôn viên tháp vàng Pha That Luang ở Vientiane. Lễ hội kéo dài khoảng một tuần với các nhà sư và người dân từ khắp nơi đổ về hành hương. Ban đêm, hàng nghìn ngọn nến và đèn lồng được thắp sáng tạo nên khung cảnh huyền ảo lung linh.',
  'Vientiane',
  '/uploads/festivals/2/thumbnail.jpg',
  '2026-11-10', '2026-11-17',
  'ACTIVE', NOW(), 0
),
(
  'Lễ hội Đèn Lồng (Boun Lai Heua Fai)',
  'le-hoi-den-long-boun-lai-heua-fai',
  'Lễ hội thả thuyền đèn lồng lung linh trên sông Mekong vào cuối mùa mưa, một trong những cảnh tượng đẹp nhất ở Lào.',
  'Boun Lai Heua Fai là lễ hội đẹp nhất và lãng mạn nhất của Lào, diễn ra vào cuối tháng 10 đánh dấu sự kết thúc mùa mưa. Người dân thả những chiếc thuyền nhỏ làm từ lá chuối, trang trí bằng hoa và nến xuống sông Mekong. Hàng nghìn chiếc thuyền đèn lung linh trôi theo dòng nước tạo nên cảnh tượng huyền ảo như trong cổ tích.',
  'Luang Prabang, Vientiane',
  '/uploads/festivals/3/thumbnail.jpg',
  '2026-10-20', '2026-10-21',
  'ACTIVE', NOW(), 0
),
(
  'Lễ hội Đua Thuyền (Boun Souang Heua)',
  'le-hoi-dua-thuyen-boun-souang-heua',
  'Cuộc đua thuyền truyền thống sôi động trên sông Mekong, diễn ra sau mùa mưa với sự tham gia của hàng trăm đội thuyền từ khắp cả nước.',
  'Boun Souang Heua là lễ hội thể thao truyền thống quan trọng của Lào, thường diễn ra vào tháng 10 sau khi mùa mưa kết thúc. Hàng trăm đội thuyền với những chiếc thuyền dài được sơn màu sặc sỡ, mỗi thuyền có từ 50-60 tay chèo, thi đấu trong tiếng trống và tiếng hò reo cổ vũ của hàng nghìn khán giả.',
  'Vientiane, Luang Prabang',
  '/uploads/festivals/4/thumbnail.jpg',
  '2026-10-05', '2026-10-07',
  'ACTIVE', NOW(), 0
);

-- ARTICLES
INSERT INTO articles (title, slug, summary, content, thumbnail, author_id, status, created_at, view_count) VALUES
(
  'Kinh nghiệm du lịch Lào tự túc từ A đến Z',
  'kinh-nghiem-du-lich-lao-tu-tuc',
  'Hướng dẫn chi tiết về cách du lịch Lào tự túc với ngân sách hợp lý: từ visa, vé máy bay, phương tiện di chuyển đến chỗ ở và ẩm thực.',
  'Du lịch Lào tự túc ngày càng phổ biến với du khách Việt Nam nhờ khoảng cách gần và chi phí hợp lý. Công dân Việt Nam được miễn visa 30 ngày. Có thể đến bằng máy bay, xe khách qua cửa khẩu Cầu Treo hoặc Lao Bảo. Bữa ăn tại nhà hàng địa phương chỉ từ 20.000-50.000 kip. Thời điểm đẹp nhất là tháng 11 đến tháng 3.',
  '/uploads/articles/1/thumbnail.jpg',
  2, 'ACTIVE', NOW(), 0
),
(
  'Top 10 điểm đến không thể bỏ qua khi du lịch Lào',
  'top-10-diem-den-khong-the-bo-qua-khi-du-lich-lao',
  'Danh sách những địa điểm đẹp nhất và ấn tượng nhất tại Lào mà bất kỳ du khách nào cũng nên ghé thăm ít nhất một lần trong đời.',
  'Lào ẩn chứa vô số điểm đến tuyệt vời. Top 10 không thể bỏ qua: Luang Prabang, Thác Kuang Si, Vientiane, Vang Vieng, Si Phan Don (4000 Đảo), Cánh đồng Chum, Pakse, Wat Phu, Nong Khiaw và Muang Ngoi. Mỗi nơi mang một vẻ đẹp và trải nghiệm hoàn toàn khác biệt.',
  '/uploads/articles/2/thumbnail.jpg',
  2, 'ACTIVE', NOW(), 0
),
(
  'Những lưu ý quan trọng khi du lịch Lào dành cho người Việt',
  'nhung-luu-y-quan-trong-khi-du-lich-lao',
  'Tổng hợp những điều cần biết trước khi đặt chân đến Lào: văn hóa, phong tục, tiền tệ, sức khỏe và an toàn để có chuyến đi suôn sẻ.',
  'Khi vào chùa cần ăn mặc kín đáo và bỏ giày dép. Không chạm vào đầu người khác. Đơn vị tiền tệ là Kip (LAK), 1 USD xấp xỉ 21.000 kip. Uống nước đóng chai, mang thuốc chống muỗi. Lào là một trong những nước an toàn nhất Đông Nam Á.',
  '/uploads/articles/3/thumbnail.jpg',
  2, 'ACTIVE', NOW(), 0
);
